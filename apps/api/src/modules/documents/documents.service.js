import { randomUUID } from "crypto";
import { prisma } from "../../lib/prisma.js";
import { supabase } from "../../lib/supabase.js";
import { MIME_TO_DOCUMENT_TYPE } from "./document.constants.js";
import { getParser } from "./parsers/index.js";

const BUCKET = "documents";

function notFoundError() {
  const err = new Error("Document not found");
  err.statusCode = 404;
  return err;
}

async function assertProjectOwnership(ownerId, projectId) {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project || project.ownerId !== ownerId) {
    const err = new Error("Project not found");
    err.statusCode = 404;
    throw err;
  }
}

export async function uploadDocument({ ownerId, projectId, file }) {
  await assertProjectOwnership(ownerId, projectId);

  const documentType = MIME_TO_DOCUMENT_TYPE[file.mimetype];
  const storagePath = `${projectId}/${randomUUID()}-${file.originalname}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, file.buffer, { contentType: file.mimetype });

  if (uploadError) {
    const err = new Error(`Failed to upload file: ${uploadError.message}`);
    err.statusCode = 502;
    throw err;
  }

  const document = await prisma.document.create({
    data: {
      projectId,
      uploadedById: ownerId,
      type: documentType,
      originalFilename: file.originalname,
      storageUrl: storagePath,
      sizeBytes: file.size,
      parseStatus: "PENDING",
    },
  });

  return document;
}

export async function listDocuments(ownerId, projectId) {
  await assertProjectOwnership(ownerId, projectId);
  return prisma.document.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDocument(ownerId, documentId) {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { project: true },
  });
  if (!document || document.project.ownerId !== ownerId) {
    throw notFoundError();
  }
  return document;
}

export async function deleteDocument(ownerId, documentId) {
  const document = await getDocument(ownerId, documentId);
  await supabase.storage.from(BUCKET).remove([document.storageUrl]);
  await prisma.document.delete({ where: { id: document.id } });
}

export async function parseDocument(documentId) {
  const document = await prisma.document.findUnique({ where: { id: documentId } });
  if (!document) return;

  await prisma.document.update({
    where: { id: documentId },
    data: { parseStatus: "PROCESSING" },
  });

  try {
    const { data, error } = await supabase.storage.from(BUCKET).download(document.storageUrl);
    if (error) throw new Error(`Failed to download file: ${error.message}`);

    const buffer = Buffer.from(await data.arrayBuffer());
    const parser = getParser(document.type);
    const text = await parser(buffer);

    await prisma.document.update({
      where: { id: documentId },
      data: { parseStatus: "DONE" },
    });

    return text;
  } catch (err) {
    await prisma.document.update({
      where: { id: documentId },
      data: { parseStatus: "FAILED", parseError: err.message },
    });
    throw err;
  }
}