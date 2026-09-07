import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../lib/api";

export function useDocuments(projectId) {
  return useQuery({
    queryKey: ["documents", projectId],
    queryFn: async () => {
      const res = await api.get(`/projects/${projectId}/documents`);
      return res.data.documents;
    },
    refetchInterval: (query) => {
      const docs = query.state.data;
      const stillProcessing = docs?.some(
        (d) => d.parseStatus === "PENDING" || d.parseStatus === "PROCESSING"
      );
      return stillProcessing ? 2000 : false;
    },
  });
}

export function useUploadDocument(projectId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await api.post(`/projects/${projectId}/documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.document;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents", projectId] });
    },
  });
}