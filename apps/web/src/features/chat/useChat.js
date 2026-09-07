import { useState } from "react";
import api from "../../lib/api";

export function useChat(projectId) {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function sendMessage(question) {
    setMessages((prev) => [...prev, { role: "USER", content: question }]);
    setLoading(true);

    try {
      const res = await api.post(`/projects/${projectId}/chat`, {
        question,
        sessionId: sessionId ?? undefined,
      });

      setSessionId(res.data.sessionId);
      setMessages((prev) => [...prev, { role: "ASSISTANT", content: res.data.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ASSISTANT", content: "Sorry, something went wrong answering that.", isError: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return { messages, sendMessage, loading };
}