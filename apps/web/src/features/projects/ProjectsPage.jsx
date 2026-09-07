import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../auth/AuthContext";
import { useProjects, useCreateProject, useArchiveProject } from "./useProjects";

export default function ProjectsPage() {
  const { user, logout } = useAuth();
  const { data: projects, isLoading, isError } = useProjects();
  const createProject = useCreateProject();
  const archiveProject = useArchiveProject();
  const [newName, setNewName] = useState("");

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
        onError: (err) => {
          toast.error(err.response?.data?.error || "Failed to create project");
        },
      }
    );
  }

  function handleArchive(projectId) {
    archiveProject.mutate(projectId, {
      onSuccess: () => toast.success("Project archived"),
      onError: () => toast.error("Failed to archive project"),
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">AI Workspace</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.name}</span>
          <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-900">
            Log out
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleCreate} className="flex gap-2 mb-8">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New project name..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button
            type="submit"
            disabled={createProject.isPending}
            className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
          >
            {createProject.isPending ? "Creating..." : "Create"}
          </button>
        </form>

        {isLoading && <p className="text-sm text-gray-400">Loading projects...</p>}
        {isError && <p className="text-sm text-red-600">Failed to load projects.</p>}

        {projects && projects.length === 0 && (
          <p className="text-sm text-gray-400">No projects yet. Create your first one above.</p>
        )}

        <div className="space-y-3">
          {projects?.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-gray-300"
            >
              <Link to={`/projects/${project.id}`} className="flex-1">
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                {project.description && (
                  <p className="text-sm text-gray-500 mt-0.5">{project.description}</p>
                )}
              </Link>
              <button
                onClick={() => handleArchive(project.id)}
                className="text-xs text-gray-400 hover:text-gray-700 ml-4"
              >
                Archive
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}