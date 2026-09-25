import { useState } from "react";
import api from "../../lib/api";

export function useChat(projectId) {
  const [queries, setQueries] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function sendMessage(question) {
    setLoading(true);
    const timestamp = new Date();

    try {
      const res = await api.post(`/projects/${projectId}/chat`, {
        question,
        sessionId: sessionId ?? undefined,
      });

      setSessionId(res.data.sessionId);
      setQueries((prev) => [
        ...prev,
        { question, answer: res.data.answer, citedChunkIds: res.data.citedChunkIds || [], timestamp, isError: false },
      ]);
    } catch (err) {
      setQueries((prev) => [
        ...prev,
        { question, answer: "Sorry, something went wrong answering that.", citedChunkIds: [], timestamp, isError: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return { queries, sendMessage, loading };
}
