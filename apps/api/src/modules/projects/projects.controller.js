import { createProjectSchema, updateProjectSchema } from "./projects.validation.js";
import {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
  archiveProject,
  unarchiveProject,
} from "./projects.service.js";
import { PROJECT_TEMPLATES } from "./projects.templates.js";


export async function create(req, res, next) {
  try {
    const parsed = createProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const project = await createProject(req.user.id, parsed.data);
    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
}

export async function list(req, res, next) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const includeArchived = req.query.includeArchived === "true";

    const result = await listProjects(req.user.id, { page, limit, includeArchived });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getOne(req, res, next) {
  try {
    const project = await getProject(req.user.id, req.params.id);
    res.status(200).json({ project });
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const parsed = updateProjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const project = await updateProject(req.user.id, req.params.id, parsed.data);
    res.status(200).json({ project });
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await deleteProject(req.user.id, req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function archive(req, res, next) {
  try {
    const project = await archiveProject(req.user.id, req.params.id);
    res.status(200).json({ project });
  } catch (err) {
    next(err);
  }
}

export async function unarchive(req, res, next) {
  try {
    const project = await unarchiveProject(req.user.id, req.params.id);
    res.status(200).json({ project });
  } catch (err) {
    next(err);
  }
}

export async function listTemplates(req, res) {
  res.status(200).json({ templates: PROJECT_TEMPLATES });
}