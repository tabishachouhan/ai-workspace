import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../lib/api";
import { useAuth } from "./AuthContext";

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (!accessToken || !refreshToken) {
      navigate("/login?error=oauth_failed");
      return;
    }

    localStorage.setItem("accessToken", accessToken);

    api
      .get("/auth/me")
      .then((res) => {
        login({ accessToken, refreshToken }, res.data.user);
        navigate("/dashboard");
      })
      .catch(() => navigate("/login?error=oauth_failed"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-500 text-sm">Signing you in...</p>
    </div>
  );
}