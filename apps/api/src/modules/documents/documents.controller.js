import { uploadDocument, listDocuments, getDocument, deleteDocument } from "./documents.service.js";

export async function upload(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const document = await uploadDocument({
      ownerId: req.user.id,
      projectId: req.params.projectId,
      file: req.file,
    });

    res.status(201).json({ document });
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const documents = await listDocuments(req.user.id, req.params.projectId);
    res.status(200).json({ documents });
  } catch (err) {
    next(err);
  }
}

export async function getOne(req, res, next) {
  try {
    const document = await getDocument(req.user.id, req.params.id);
    res.status(200).json({ document });
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await deleteDocument(req.user.id, req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}