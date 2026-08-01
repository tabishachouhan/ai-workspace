import { prisma } from "../../lib/prisma.js";
import { embedText } from "../../lib/embeddings.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../../config/env.js";

const genAI = new GoogleGenerativeAI(env.gemini.apiKey);
const TOP_K = 5;

async function assertProjectOwnership(ownerId, projectId) {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project || project.ownerId !== ownerId) {
    const err = new Error("Project not found");
    err.statusCode = 404;
    throw err;
  }
}

async function findRelevantChunks(projectId, questionEmbedding) {
  const vectorLiteral = `[${questionEmbedding.join(",")}]`;

  const chunks = await prisma.$queryRaw`
    SELECT dc.id, dc.content, dc."documentId", d."originalFilename",
           dc.embedding <=> ${vectorLiteral}::vector AS distance
    FROM "DocumentChunk" dc
    JOIN "Document" d ON d.id = dc."documentId"
    WHERE d."projectId" = ${projectId}
      AND dc.embedding IS NOT NULL
    ORDER BY distance ASC
    LIMIT ${TOP_K}
  `;

  return chunks;
}

function buildPrompt(question, chunks) {
  const context = chunks
    .map((c, i) => `[${i + 1}] (from ${c.originalFilename})\n${c.content}`)
    .join("\n\n");

  return `You are answering questions using ONLY the context below, extracted from the user's own uploaded documents. If the answer isn't in the context, say so honestly - do not make anything up.

Context:
${context}

Question: ${question}

Answer, and reference sources like [1], [2] where relevant.`;
}

export async function askQuestion(ownerId, projectId, { question, sessionId }) {
  await assertProjectOwnership(ownerId, projectId);

  let session;
  if (sessionId) {
    session = await prisma.chatSession.findUnique({ where: { id: sessionId } });
    if (!session || session.projectId !== projectId || session.userId !== ownerId) {
      const err = new Error("Chat session not found");
      err.statusCode = 404;
      throw err;
    }
  } else {
    session = await prisma.chatSession.create({
      data: { projectId, userId: ownerId },
    });
  }

  await prisma.chatMessage.create({
    data: { sessionId: session.id, role: "USER", content: question },
  });

  const questionEmbedding = await embedText(question);
  const chunks = await findRelevantChunks(projectId, questionEmbedding);

  let answer;
  let citedChunkIds = [];

  if (chunks.length === 0) {
    answer = "I don't have any processed documents in this project yet to answer from.";
  } else {
    const prompt = buildPrompt(question, chunks);
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const result = await model.generateContent(prompt);
    answer = result.response.text();
    citedChunkIds = chunks.map((c) => c.id);
  }

  await prisma.chatMessage.create({
    data: { sessionId: session.id, role: "ASSISTANT", content: answer, citedChunkIds },
  });

  return { sessionId: session.id, answer, citedChunkIds };
}