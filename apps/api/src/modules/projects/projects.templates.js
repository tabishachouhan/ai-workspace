export const PROJECT_TEMPLATES = [
  {
    id: "research",
    label: "Research Project",
    description: "Organize papers, notes, and sources for a research topic.",
    tags: ["research"],
  },
  {
    id: "meeting-hub",
    label: "Meeting Notes Hub",
    description: "Collect meeting notes, action items, and follow-ups in one place.",
    tags: ["meetings"],
  },
  {
    id: "reading-list",
    label: "Reading List",
    description: "Track documents and articles you want to read and summarize.",
    tags: ["reading"],
  },
];

export function getTemplateById(templateId) {
  return PROJECT_TEMPLATES.find((t) => t.id === templateId) ?? null;
}