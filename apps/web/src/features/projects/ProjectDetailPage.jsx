import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDocuments, useUploadDocument } from "../documents/useDocuments";
import { useChat } from "../chat/useChat";

const STATUS_STYLES = {
  PENDING: "text-gray-400",
  PROCESSING: "text-amber-600",
  DONE: "text-green-600",
  FAILED: "text-red-600",
};

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const { data: documents, isLoading } = useDocuments(projectId);
  const uploadDocument = useUploadDocument(projectId);
  const { messages, sendMessage, loading: chatLoading } = useChat(projectId);
  const [question, setQuestion] = useState("");
  const fileInputRef = useRef(null);

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadDocument.mutate(file, {
      onSuccess: () => toast.success("File uploaded, processing..."),
      onError: (err) => toast.error(err.response?.data?.error || "Upload failed"),
    });

    e.target.value = "";
  }

  function handleAsk(e) {
    e.preventDefault();
    if (!question.trim() || chatLoading) return;
    sendMessage(question);
    setQuestion("");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">
          ← Back to projects
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Documents</h2>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadDocument.isPending}
            className="w-full mb-4 border border-dashed border-gray-300 rounded-md py-3 text-sm text-gray-500 hover:border-gray-400 hover:text-gray-700 disabled:opacity-50"
          >
            {uploadDocument.isPending ? "Uploading..." : "+ Upload PDF"}
          </button>

          {isLoading && <p className="text-xs text-gray-400">Loading...</p>}

          <div className="space-y-2">
            {documents?.map((doc) => (
              <div key={doc.id} className="bg-white border border-gray-200 rounded-md p-3">
                <p className="text-sm text-gray-900 truncate">{doc.originalFilename}</p>
                <p className={`text-xs mt-0.5 ${STATUS_STYLES[doc.parseStatus]}`}>
                  {doc.parseStatus}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-white border border-gray-200 rounded-lg flex flex-col h-[600px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <p className="text-sm text-gray-400 text-center mt-8">
                Ask a question about your uploaded documents.
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] rounded-lg px-4 py-2 text-sm whitespace-pre-wrap ${
                  msg.role === "USER"
                    ? "bg-gray-900 text-white ml-auto"
                    : msg.isError
                    ? "bg-red-50 text-red-700"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {chatLoading && (
              <div className="bg-gray-100 text-gray-400 text-sm rounded-lg px-4 py-2 max-w-[80%]">
                Thinking...
              </div>
            )}
          </div>

          <form onSubmit={handleAsk} className="border-t border-gray-200 p-3 flex gap-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask about your documents..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button
              type="submit"
              disabled={chatLoading}
              className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
            >
              Ask
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}