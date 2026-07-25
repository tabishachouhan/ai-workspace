import { prisma } from "../../lib/prisma.js";

function notFoundError() {
  const err = new Error("Project not found");
  err.statusCode = 404;
  return err;
}

export async function createProject(ownerId, data) {
  return prisma.project.create({
    data: { ...data, ownerId },
  });
}

export async function listProjects(ownerId, { page = 1, limit = 20, includeArchived = false }) {
  const where = {
    ownerId,
    ...(includeArchived ? {} : { isArchived: false }),
  };

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.project.count({ where }),
  ]);

  return {
    projects,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

async function getOwnedProject(ownerId, projectId) {
  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project || project.ownerId !== ownerId) {
    throw notFoundError();
  }
  return project;
}

export async function getProject(ownerId, projectId) {
  return getOwnedProject(ownerId, projectId);
}

export async function updateProject(ownerId, projectId, data) {
  await getOwnedProject(ownerId, projectId); // throws if not found/not owned
  return prisma.project.update({ where: { id: projectId }, data });
}

export async function deleteProject(ownerId, projectId) {
  await getOwnedProject(ownerId, projectId);
  await prisma.project.delete({ where: { id: projectId } });
}