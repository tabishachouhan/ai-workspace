import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FolderOpen,
  LayoutGrid,
  Search,
  Sparkles,
  Archive,
  LogOut,
  Plus,
  FileText,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { useProjects, useCreateProject, useArchiveProject } from "./useProjects";
import DashboardBackground from "./DashboardBackground";
import "./dashboard.css";

export default function ProjectsPage() {
  const { user, logout } = useAuth();
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const archiveProject = useArchiveProject();
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const prefersReducedMotion = useReducedMotion();

  function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    createProject.mutate(
      { name: newName },
      {
        onSuccess: () => {
          setNewName("");
          toast.success("Project created");
        },
        onError: (err) =>
          toast.error(err.response?.data?.error || "Failed to create project"),
      }
    );
  }

  function handleArchive(projectId) {
    archiveProject.mutate(projectId, {
      onSuccess: () => toast.success("Project archived"),
      onError: () => toast.error("Failed to archive project"),
    });
  }

  const filtered = (projects || []).filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const initials = (user?.name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <Link to="/" className="brand" aria-label="AI Workspace home">
          <span className="brand-mark" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span>AI Workspace</span>
        </Link>
        <nav>
          <span className="sidebar-link active">
            <LayoutGrid size={16} />
            <span className="link-label">Projects</span>
          </span>
        </nav>
        <div className="sidebar-insight">
          <Sparkles size={16} />
          <p>
            <b>{projects?.length || 0} projects</b>
            <span>Ready to search and ask</span>
          </p>
        </div>
        <div className="sidebar-user">
          <span className="user-avatar">{initials}</span>
          <span>
            <b>{user?.name}</b>
            <small>{user?.email}</small>
          </span>
        </div>
        <div className="sidebar-footer">
          <button type="button" onClick={logout}>
            <LogOut size={14} /> Log out
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        {/* Living background with drifting aurora gradients & subtle architectural dots */}
        <DashboardBackground />

        <motion.div
          className="dashboard-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <p className="dashboard-kicker">YOUR WORKSPACE</p>
            <h1>Projects</h1>
            <p>Every document and answer, organized by project.</p>
          </div>
          <div className="dashboard-search">
            <Search size={15} />
            <input
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.form
          className="new-project"
          onSubmit={handleCreate}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="new-project-icon">
            <Plus size={18} />
          </span>
          <div>
            <label htmlFor="new-project-name">New project</label>
            <input
              id="new-project-name"
              placeholder="Name your project..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="new-project-submit"
            disabled={createProject.isPending}
            style={{
              backgroundColor: "#0f1115",
              color: "#ffffff",
            }}
          >
            {createProject.isPending ? (
              "Creating..."
            ) : (
              <>
                <Plus size={15} strokeWidth={2.5} />
                <span>Create</span>
              </>
            )}
          </button>
        </motion.form>

        <motion.div
          className="projects-heading"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.12 }}
        >
          <div>
            <h2>All projects</h2>
            <span>{filtered.length} total</span>
          </div>
        </motion.div>

        {isLoading && (
          <p style={{ padding: "40px 0", color: "var(--dp-muted-foreground)" }}>
            Loading...
          </p>
        )}

        {!isLoading && filtered.length === 0 && (
          <motion.div
            className="projects-empty"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <FolderOpen size={34} />
            <h3>No projects yet</h3>
            <p>Create your first project above to get started.</p>
          </motion.div>
        )}

        {filtered.map((project, i) => (
          <motion.article
            className="project-row"
            key={project.id}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: prefersReducedMotion ? 0 : 0.15 + Math.min(i * 0.05, 0.35),
              ease: [0.16, 1, 0.3, 1],
            }}
            layout
          >
            <span className="project-index">{String(i + 1).padStart(2, "0")}</span>
            <div className="project-copy">
              <h3>{project.name}</h3>
              <p>{project.description || "No description"}</p>
              <span>
                <FileText size={11} /> {project.isFavorite ? "Favorite" : "Project"}
              </span>
            </div>
            <span className="project-updated">
              Updated {new Date(project.updatedAt).toLocaleDateString()}
            </span>
            <button
              type="button"
              className="project-archive"
              onClick={() => handleArchive(project.id)}
              aria-label="Archive project"
            >
              <Archive size={15} />
            </button>
            <Link to={`/projects/${project.id}`} className="project-open">
              <span>Open</span>
              <ArrowRight size={13} />
            </Link>
          </motion.article>
        ))}
      </main>
    </div>
  );
}
