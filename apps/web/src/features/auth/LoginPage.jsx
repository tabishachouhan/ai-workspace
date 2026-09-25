import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";
import { Eye, EyeOff, ShieldCheck, FileCheck, Search } from "lucide-react";
import api from "../../lib/api";
import { useAuth } from "./AuthContext";
import "./auth.css";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const reduce = useReducedMotion();

  async function onSubmit(data) {
    setSubmitting(true);
    try {
      const res = await api.post("/auth/login", data);
      login({ accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <aside className="auth-story">
        <div className="auth-story-grid" aria-hidden="true" />
        <div className="auth-ambient-glow" aria-hidden="true" />

        <motion.div
          whileHover={reduce ? {} : { x: 2 }}
          transition={{ duration: 0.2 }}
        >
          <Link to="/" className="brand brand-light" aria-label="AI Workspace home">
            <span className="brand-mark" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <span>AI Workspace</span>
          </Link>
        </motion.div>

        <motion.div
          className="auth-story-copy"
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="auth-kicker"><span></span> WELCOME BACK</p>
          <h1>Pick up right<br />where you <em>left off.</em></h1>
          <p>Your documents, notes, and past answers are exactly where you left them, ready to search again.</p>
          
          <ul>
            {[
              { icon: ShieldCheck, text: "Private by default" },
              { icon: FileCheck, text: "Page-level citations" },
              { icon: Search, text: "Search across every source" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.text}
                  initial={reduce ? {} : { opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Icon size={16} /> {item.text}
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div
          className="auth-proof"
          animate={reduce ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ShieldCheck size={18} />
          <span>
            18% quarter-over-quarter
            <small>Verified in Q3 Market Review &middot; page 14</small>
          </span>
          <FileCheck size={16} />
        </motion.div>
      </aside>

      <div className="auth-form-side">
        <motion.div
          className="auth-form"
          initial={reduce ? {} : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="auth-step">YOUR PRIVATE WORKSPACE</p>
          <h2>Welcome back</h2>
          <p className="auth-subtitle">Sign in to your workspace.</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="field-error">{errors.email.message}</p>}

            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="field-error">{errors.password.message}</p>}

            <motion.button
              type="submit"
              className="auth-submit"
              disabled={submitting}
              whileHover={reduce || submitting ? {} : { scale: 1.02 }}
              whileTap={reduce || submitting ? {} : { scale: 0.98 }}
            >
              {submitting ? "Signing in..." : "Sign in"}
            </motion.button>
          </form>

          <div className="auth-divider">or</div>

          <motion.a
            href="/api/auth/google"
            className="google-button"
            whileHover={reduce ? {} : { scale: 1.01 }}
            whileTap={reduce ? {} : { scale: 0.99 }}
          >
            <span className="google-mark">G</span> Continue with Google
          </motion.a>

          <p className="auth-login">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </motion.div>
        
        <p className="auth-terms">By continuing, you agree to our Terms and Privacy Policy.</p>
      </div>
    </div>
  );
}
