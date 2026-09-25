import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Upload,
  FileText,
  BookOpenCheck,
  Search,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Copy,
  Quote,
  Trash2,
  Download,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useDocuments, useUploadDocument, useDeleteDocument } from "../documents/useDocuments";
import { useChat } from "../chat/useChat";
import DashboardBackground from "./DashboardBackground";
import "./workspace.css";

const promptStarters = [
  {
    number: "01",
    title: "Executive Summary",
    description: "Synthesize the core findings, objectives, and conclusions.",
    prompt: "Provide an executive summary of this document with key takeaways and conclusions.",
  },
  {
    number: "02",
    title: "Qualifications & Achievements",
    description: "Extract highlighted skills, credentials, and track record.",
    prompt: "What are the primary qualifications, achievements, and core competencies highlighted in this document?",
  },
  {
    number: "03",
    title: "Key Metrics & Timeline",
    description: "Identify all quantifiable data points, numbers, and dates.",
    prompt: "Extract all specific metrics, numbers, measurable results, and key dates mentioned in this document.",
  },
];

function downloadBlob(content, mimeType, filename) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { data: documents, isLoading } = useDocuments(projectId);
  const uploadDocument = useUploadDocument(projectId);
  const deleteDocument = useDeleteDocument(projectId);
  const { queries, sendMessage, loading: chatLoading } = useChat(projectId);
  const [question, setQuestion] = useState("");
  const [exportFormat, setExportFormat] = useState("md");
  const fileInputRef = useRef(null);
  const searchInputRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadDocument.mutate(file, {
      onSuccess: () => toast.success("File uploaded, indexing sources..."),
      onError: (err) => toast.error(err.response?.data?.error || "Upload failed"),
    });
    e.target.value = "";
  }

  function handleDelete(documentId) {
    deleteDocument.mutate(documentId, {
      onSuccess: () => toast.success("Document removed"),
      onError: () => toast.error("Failed to delete document"),
    });
  }

  function handleAsk(e) {
    e.preventDefault();
    if (!question.trim() || chatLoading) return;
    sendMessage(question);
    setQuestion("");
  }

  function handlePromptClick(promptText) {
    setQuestion(promptText);
    searchInputRef.current?.focus();
  }

  function handleCopy(text) {
    navigator.clipboard.writeText(text);
    toast.success("Briefing copied to clipboard");
  }

  function buildFindingsHtml() {
    const rows = queries
      .map((q, i) => {
        const sourceLine = q.isError
          ? ""
          : `<p style="color:#4f46e5;font-size:12px;font-weight:bold;">Verified against ${q.citedChunkIds.length} source${q.citedChunkIds.length === 1 ? "" : "s"}</p>`;
        return `<h2 style="font-size:18px;margin:24px 0 8px;">${i + 1}. ${q.question}</h2><p style="line-height:1.7;color:#222;">${q.answer.replace(/\n/g, "<br/>")}</p>${sourceLine}`;
      })
      .join("");
    return `<html><head><meta charset="utf-8"><title>AI Workspace Findings</title></head><body style="font-family:'Inter',system-ui,sans-serif;color:#111;max-width:740px;margin:40px auto;padding:0 20px;"><h1 style="font-size:26px;border-bottom:2px solid #4f46e5;padding-bottom:10px;">AI Workspace Findings Dossier</h1><p style="color:#666;font-size:12px;">Exported ${new Date().toLocaleString()}</p><hr style="border:0;border-top:1px solid #eee;margin:20px 0;"/>${rows}</body></html>`;
  }

  function handleExport() {
    if (queries.length === 0) {
      toast.error("No findings to export yet");
      return;
    }

    const filenameBase = `findings-${projectId.slice(0, 8)}`;

    if (exportFormat === "md") {
      const lines = [`# AI Workspace Findings Dossier`, ``, `_Exported ${new Date().toLocaleString()}_`, ``];
      queries.forEach((q, i) => {
        lines.push(`## ${i + 1}. ${q.question}`, ``, q.answer, ``);
        if (!q.isError) lines.push(`*Verified against ${q.citedChunkIds.length} source${q.citedChunkIds.length === 1 ? "" : "s"}*`, ``);
      });
      downloadBlob(lines.join("\n"), "text/markdown", `${filenameBase}.md`);
    } else if (exportFormat === "txt") {
      const lines = [`AI Workspace Findings Dossier`, `Exported ${new Date().toLocaleString()}`, ``];
      queries.forEach((q, i) => {
        lines.push(`${i + 1}. ${q.question}`, ``, q.answer, ``);
      });
      downloadBlob(lines.join("\n"), "text/plain", `${filenameBase}.txt`);
    } else if (exportFormat === "doc") {
      downloadBlob(buildFindingsHtml(), "application/msword", `${filenameBase}.doc`);
    } else if (exportFormat === "pdf") {
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        toast.error("Please allow popups to export as PDF");
        return;
      }
      printWindow.document.write(buildFindingsHtml());
      printWindow.document.close();
      printWindow.onload = () => printWindow.print();
    }

    toast.success("Export generated");
  }

  const hasDocs = documents && documents.length > 0;
  const allDone = hasDocs && documents.every((d) => d.parseStatus === "DONE");

  return (
    <div className="workspace-page">
      {/* Living background with drifting aurora gradients & sweeping laser scan */}
      <DashboardBackground />

      <motion.aside
        className="workspace-sidebar"
        initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to="/dashboard" className="workspace-back">
          <ArrowLeft size={13} />
          <span>Back to projects</span>
        </Link>

        <p className="docs-kicker">YOUR SOURCES</p>
        <div className="docs-heading-row">
          <h2 className="docs-heading">Documents</h2>
          <span className="docs-count-pill">{documents?.length || 0} active</span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />

        <button
          type="button"
          className="upload-dropzone"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadDocument.isPending}
        >
          <div className="upload-dropzone-icon">
            {uploadDocument.isPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Upload size={18} />
            )}
          </div>
          <div className="upload-dropzone-text">
            <b>{uploadDocument.isPending ? "Indexing PDF..." : "Upload source PDF"}</b>
            <span>Drag and drop or browse files</span>
          </div>
        </button>

        {!isLoading && !hasDocs && (
          <div className="upload-empty-hint">
            <Upload size={22} />
            <span>Upload a PDF to ground your AI answers in verified source pages.</span>
          </div>
        )}

        {documents?.map((doc) => (
          <div className="doc-card" key={doc.id}>
            <div className="doc-card-badge">
              <FileText size={17} />
            </div>
            <div className="doc-card-info">
              <p className="doc-card-name" title={doc.originalFilename}>
                {doc.originalFilename}
              </p>
              <div className="doc-card-meta">
                <span className={`status-pill status-${doc.parseStatus}`}>
                  <span className="status-dot" />
                  {doc.parseStatus === "DONE"
                    ? "Ready"
                    : doc.parseStatus === "PROCESSING"
                    ? "Indexing..."
                    : doc.parseStatus}
                </span>
                <span className="doc-card-type">PDF</span>
              </div>
            </div>
            <button
              type="button"
              className="doc-delete"
              onClick={() => handleDelete(doc.id)}
              aria-label="Delete document"
              title="Delete source"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        <div className="sidebar-note">
          <Sparkles size={16} />
          <div>
            <b>Clear answers, with receipts.</b>
            <span>Every finding stays strictly grounded in the indexed source documents you provide.</span>
          </div>
        </div>
      </motion.aside>

      <motion.section
        className="workspace-panel"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="workspace-panel-header">
          <div>
            <p className="panel-kicker">ANALYSIS</p>
            <h2>Document intelligence</h2>
          </div>
          <div className="panel-header-actions">
            <div className="export-group">
              <select
                className="export-select"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                aria-label="Export format"
              >
                <option value="md">Markdown (.md)</option>
                <option value="txt">Plain Text (.txt)</option>
                <option value="doc">Word (.doc)</option>
                <option value="pdf">PDF Dossier</option>
              </select>
              <button
                type="button"
                className="export-button"
                onClick={handleExport}
                disabled={queries.length === 0}
              >
                <Download size={13} />
                <span>Export</span>
              </button>
            </div>
            <div className="panel-status-pill">
              <span
                className={`status-beacon ${
                  allDone ? "done" : hasDocs ? "processing" : "idle"
                }`}
              />
              <span>
                {allDone
                  ? "Analysis complete"
                  : hasDocs
                  ? "Processing sources"
                  : "Waiting for sources"}
              </span>
            </div>
          </div>
        </div>

        <div className="chat-scroll">
          <form className="ask-bar" onSubmit={handleAsk}>
            <div className="ask-bar-input">
              <Search size={16} className="ask-search-icon" />
              <input
                ref={searchInputRef}
                placeholder="Ask a question across your documents..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={chatLoading}
              />
              {question && (
                <button
                  type="button"
                  className="ask-clear-btn"
                  onClick={() => setQuestion("")}
                  aria-label="Clear input"
                >
                  ✕
                </button>
              )}
              <div className="ask-kbd-hint">
                <span>↵ Enter</span>
              </div>
            </div>
            <button
              type="submit"
              className="ask-submit"
              disabled={chatLoading || !question.trim()}
            >
              {chatLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <ArrowRight size={14} className="ask-submit-arrow" />
                </>
              )}
            </button>
          </form>

          {queries.length === 0 && !chatLoading && (
            <div className="chat-empty">
              <div className="chat-empty-beacon">
                <BookOpenCheck size={26} />
              </div>
              <h3>Your research desk is ready.</h3>
              <p>
                Bring in a source, ask a question, and receive a cited briefing, never a guess. Click any prompt below to get started.
              </p>
              <div className="chat-step-list">
                {promptStarters.map((starter) => (
                  <div
                    className="chat-step-card"
                    key={starter.number}
                    onClick={() => handlePromptClick(starter.prompt)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handlePromptClick(starter.prompt)}
                  >
                    <div className="chat-step-left">
                      <span className="chat-step-badge">{starter.number}</span>
                      <div className="chat-step-content">
                        <b>{starter.title}</b>
                        <span>{starter.description}</span>
                      </div>
                    </div>
                    <ArrowRight size={15} className="chat-step-arrow" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {queries.map((q, i) => (
            <motion.div
              className={`query-card ${q.isError ? "error" : ""}`}
              key={i}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="query-label-row">
                <span className="query-label">
                  <Quote size={11} /> QUERY #{String(i + 1).padStart(2, "0")}
                </span>
                <span className="query-time">
                  {q.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <h3 className="query-question">{q.question}</h3>
              <p className="query-answer">{q.answer}</p>
              {!q.isError && (
                <div className="query-footer">
                  <span className="query-verified">
                    <ShieldCheck size={14} />
                    <span>
                      Verified against {q.citedChunkIds.length} source
                      {q.citedChunkIds.length === 1 ? "" : "s"}
                    </span>
                  </span>
                  <button
                    type="button"
                    className="query-copy"
                    onClick={() => handleCopy(q.answer)}
                  >
                    <Copy size={13} />
                    <span>Copy</span>
                  </button>
                </div>
              )}
            </motion.div>
          ))}

          {chatLoading && (
            <div className="chat-thinking-card">
              <div className="thinking-beacon">
                <span />
                <span />
                <span />
              </div>
              <p>Synthesizing cited answer across your indexed sources...</p>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
