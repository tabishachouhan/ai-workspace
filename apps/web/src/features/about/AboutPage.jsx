import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Database,
  ExternalLink,
  FileSearch,
  Github,
  Linkedin,
  Mail,
  Palette,
  Sparkles,
} from "lucide-react";
import "./about.css";
import AboutBackground from "./AboutBackground";

const buildHighlights = [
  {
    icon: FileSearch,
    title: "Real document understanding",
    text: "Uploads are parsed and chunked, then a local embedding model and Gemini answer strictly from the source text, with page-level citations.",
  },
  {
    icon: Code2,
    title: "Modern full-stack build",
    text: "React, Express, Prisma, and Postgres with pgvector, wired together as a real working RAG pipeline, not a demo.",
  },
  {
    icon: Palette,
    title: "A deliberate design system",
    text: "Custom tokens, an editorial serif/sans pairing, and consistent components across auth, dashboard, and workspace.",
  },
  {
    icon: Database,
    title: "Cloud-backed, privacy-first",
    text: "Documents live in Supabase Storage, scoped to their owner. Every project, chunk, and chat message is ownership-checked.",
  },
];

const builderSkills = [
  "RAG & Vector Retrieval",
  "pgvector & Supabase",
  "React 19 & Vite",
  "Node.js & Express Monorepo",
  "Local MiniLM & Gemini",
  "Design Systems & Motion",
];

export default function AboutPage() {
  const reduce = useReducedMotion();

  return (
    <main className="about-page">
      <AboutBackground />

      <header className="project-topbar">
        <motion.div whileHover={reduce ? {} : { x: -3 }}>
          <Link to="/" className="project-back">
            <ArrowLeft size={16} /> Back to AI Workspace
          </Link>
        </motion.div>

        {/* Clean, single-line status capsule pill */}
        <div className="project-topbar-status">
          <span className="status-dot-wrapper">
            <span className="status-dot"></span>
            <span className="status-ping"></span>
          </span>
          <span className="status-text">ABOUT THE BUILDER</span>
        </div>
      </header>

      <section className="about-hero">
        <div className="about-hero-content">
          {/* Builder Monogram / Profile Seal */}
          <motion.div
            className="builder-avatar-wrap"
            initial={reduce ? {} : { opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="builder-avatar-ring" aria-hidden="true" />
            <div className="builder-avatar">
              <span>TC</span>
            </div>
            <span className="builder-badge">
              <Sparkles size={11} /> Creator
            </span>
          </motion.div>

          <motion.p
            className="panel-kicker"
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            DESIGNED &amp; ENGINEERED BY
          </motion.p>

          <motion.h1
            initial={reduce ? {} : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Tabisha Chouhan
          </motion.h1>

          <motion.div
            className="builder-tagline"
            initial={reduce ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Full-Stack Software Engineer &middot; AI Systems &amp; RAG Architecture
          </motion.div>

          <motion.p
            className="about-lede"
            initial={reduce ? {} : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            AI Workspace started as a simple question: <em>why do we re-read the same document five times to find one fact?</em>{" "}
            I designed and engineered this product end-to-end — from the document parsing and pgvector similarity search to the
            grounded Gemini citations and editorial interface.
          </motion.p>

          {/* Builder Skill / Architecture Pills */}
          <motion.div
            className="builder-skills"
            initial={reduce ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {builderSkills.map((skill) => (
              <span key={skill} className="skill-pill">
                <span className="skill-pill-dot" />
                {skill}
              </span>
            ))}
          </motion.div>

          {/* Interactive Social Links */}
          <motion.div
            className="about-links"
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              { href: "https://github.com/tabishachouhan/ai-workspace", icon: Github, label: "GitHub" },
              { href: "https://www.linkedin.com/in/tabisha-chouhan-9473243b3/", icon: Linkedin, label: "LinkedIn" },
              { href: "mailto:tabishachouhan001@gmail.com", icon: Mail, label: "tabishachouhan001@gmail.com" },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="about-link"
                  whileHover={reduce ? {} : { y: -3, scale: 1.02 }}
                  whileTap={reduce ? {} : { scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                  {link.href.startsWith("http") && <ExternalLink size={12} style={{ opacity: 0.6 }} />}
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Under The Hood Architecture Section */}
      <section className="about-build" aria-label="How AI Workspace is built">
        <motion.div
          className="section-heading"
          initial={reduce ? {} : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="panel-kicker">UNDER THE HOOD</p>
          <h2>How it was built</h2>
        </motion.div>

        <div className="about-grid">
          {buildHighlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                className="about-card"
                key={item.title}
                initial={reduce ? {} : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduce ? {} : { y: -6, transition: { duration: 0.22 } }}
              >
                <span className="about-card-icon"><Icon size={20} /></span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="about-cta"
        initial={reduce ? {} : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2>Try it with your own documents.</h2>
        <p>Upload a PDF, ask a real question, and check the citations for yourself.</p>

        <motion.div
          style={{ display: "inline-block" }}
          whileHover={reduce ? {} : { scale: 1.03 }}
          whileTap={reduce ? {} : { scale: 0.98 }}
        >
          <Link to="/register" className="about-button">
            Open the workspace <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );
}
