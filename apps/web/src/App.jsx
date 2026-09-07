import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./features/auth/AuthContext";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import OAuthCallback from "./features/auth/OAuthCallback";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProjectsPage from "./features/projects/ProjectsPage";



function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/oauth/callback" element={<OAuthCallback />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <ProjectsPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;