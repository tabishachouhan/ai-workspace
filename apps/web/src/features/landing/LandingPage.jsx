import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, FileText, MessageSquareText, Quote, ShieldCheck, Sparkles, Upload } from "lucide-react";
import "./landing.css";
import HeroBackground from "./HeroBackground";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Bring your sources",
    description: "Drop in reports, research papers, notes, or contracts. Your workspace stays organized and private.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "We map the context",
    description: "AI Workspace reads across every page, connecting names, claims, figures, and supporting evidence.",
  },
  {
    number: "03",
    icon: MessageSquareText,
    title: "Ask. Verify. Move on.",
    description: "Get a direct answer with citations, so you can check the source without searching again.",
  },
];

function Logo() {
  return (
    <Link to="/" className="brand" aria-label="AI Workspace home">
      <span className="brand-mark" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <span>AI Workspace</span>
    </Link>
  );
}

function ProductScene() {
  const reduce = useReducedMotion();
  const [activeCitation, setActiveCitation] = useState(1);

  // Mouse tilt tracking physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 140, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 140, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="product-wrap"
      aria-label="AI Workspace document analysis preview"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-glow"></div>
      
      <motion.div
        className="floating-note floating-note-top"
        animate={reduce ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ShieldCheck size={15} /> Private workspace
      </motion.div>

      <motion.div
        className="product-shell"
        style={reduce ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className="window-bar">
          <div className="window-dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>Q3 MARKET REVIEW</span>
          <span className="processing"><i></i> Analysis complete</span>
        </div>

        <div className="workspace">
          <aside className="document-pane">
            <div className="document-heading">
              <span className="file-icon"><FileText size={17} /></span>
              <span><b>Q3 Market Review.pdf</b><small>38 pages &middot; 2.4 MB</small></span>
            </div>
            <div className="paper-sheet">
              <span className="paper-label">03 &mdash; PERFORMANCE</span>
              <h3>Quarterly performance overview</h3>
              <p>Revenue continued its upward trajectory, supported by enterprise expansion and stronger retention.</p>
              
              <div className={`mini-chart ${activeCitation === 2 ? "chart-cited-active" : ""}`} aria-hidden="true">
                <span className="bar bar-1"></span>
                <span className="bar bar-2"></span>
                <span className="bar bar-3"></span>
                <span className="bar bar-4"></span>
                <span className="bar bar-5"></span>
              </div>
              
              <div className={`highlight ${activeCitation === 1 ? "cited-active" : ""}`}>
                <p style={{ margin: 0, fontSize: "9.5px", lineHeight: "1.5" }}>
                  Revenue grew 18% quarter-over-quarter, driven primarily by enterprise accounts.
                </p>
                {activeCitation === 1 && (
                  <span className="highlight-badge">
                    <Check size={11} /> Cited in finding #1
                  </span>
                )}
                {activeCitation === 2 && (
                  <span className="highlight-badge" style={{ color: "var(--lp-coral)" }}>
                    <Check size={11} /> Chart data cited in finding #2
                  </span>
                )}
              </div>
            </div>
          </aside>

          <div className="conversation-pane">
            <div className="conversation-label">ASK AI WORKSPACE</div>
            <div className="question-bubble">What were the key findings in the Q3 report?</div>
            
            <div className="answer-row">
              <div className="ai-mark"><Sparkles size={16} /></div>
              <div className="answer-copy">
                <p>
                  Revenue grew <strong>18% quarter-over-quarter</strong>, led by enterprise expansion. Customer churn also fell to <strong>2.1%</strong>.
                </p>
                <div className="citations">
                  <button
                    type="button"
                    className={activeCitation === 1 ? "active" : ""}
                    onClick={() => setActiveCitation(1)}
                    onMouseEnter={() => setActiveCitation(1)}
                    title="Click or hover to inspect source chunk"
                  >
                    [1] Page 14
                  </button>
                  <button
                    type="button"
                    className={activeCitation === 2 ? "active" : ""}
                    onClick={() => setActiveCitation(2)}
                    onMouseEnter={() => setActiveCitation(2)}
                    title="Click or hover to inspect metrics chart"
                  >
                    [2] Page 22
                  </button>
                </div>
              </div>
            </div>

            <motion.div
              className="source-card"
              key={activeCitation}
              initial={reduce ? {} : { opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <FileText size={15} />
                <span>
                  <b>Source verified</b>
                  <small>
                    {activeCitation === 1
                      ? "Q3 Market Review · page 14 (Executive Summary)"
                      : "Q3 Market Review · page 22 (Metrics & Chart)"}
                  </small>
                </span>
              </div>
              <Check size={16} />
            </motion.div>

            <div className="prompt-box">
              <span>Ask a follow-up question...</span>
              <span className="send-button"><ArrowRight size={16} /></span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="floating-note floating-note-bottom"
        animate={reduce ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className="pulse-dot"></span> 2 sources cited
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const reduce = useReducedMotion();

  return (
    <main id="top" className="site-shell">
      <nav className="nav-shell" aria-label="Main navigation">
        <Logo />
        <div className="nav-links">
          <a href="#workflow">How it works</a>
          <a href="#security">Security</a>
          <a href="/about">About</a>
        </div>
        <div className="nav-actions">
          <Link to="/login" className="text-link">Sign in</Link>
          <Link to="/register" className="lp-button button-small">Start for free <ArrowRight size={15} /></Link>
        </div>
      </nav>

      <section className="hero-section">
        <HeroBackground />
        
        <motion.div
          className="hero-copy"
          initial={reduce ? {} : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow"><span></span> INTELLIGENCE, WITH RECEIPTS</div>
          <h1>Your documents.<br /><em>Finally understood.</em></h1>
          <p className="hero-lede">
            Ask questions across PDFs, reports, and notes. Get a precise answer, grounded in your sources, with every citation attached.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="lp-button">Start for free <ArrowRight size={17} /></Link>
            <a href="#workflow" className="secondary-link">See how it works <span>&darr;</span></a>
          </div>
          <div className="trust-line">
            <span><Check size={14} /> No credit card</span>
            <span><Check size={14} /> Private by default</span>
          </div>
        </motion.div>

        <ProductScene />
      </section>

      {/* Clean, Dark-Shaded Workflow Section */}
      <section id="workflow" className="workflow-section">
        <motion.div
          className="section-heading"
          initial={reduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <p>FROM FILE TO FINDING</p>
          <h2>Less searching.<br /><em>More knowing.</em></h2>
        </motion.div>

        <div className="steps-grid">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.article
                className="step"
                key={step.number}
                initial={reduce ? {} : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduce ? {} : { y: -4, transition: { duration: 0.2 } }}
              >
                <div className="step-top">
                  <motion.span
                    className="step-icon"
                    whileHover={reduce ? {} : { scale: 1.08 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon size={20} />
                  </motion.span>
                  <span className="step-number">{step.number}</span>
                </div>

                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <motion.section
        id="security"
        className="quote-section"
        initial={reduce ? {} : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="quote-ambient-glow" aria-hidden="true" />

        <motion.div
          className="quote-mark-wrap"
          animate={reduce ? {} : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Quote size={40} className="quote-mark" />
        </motion.div>

        <blockquote>
          &ldquo;Stop re-reading the same document five times looking for one fact.{" "}
          <em className="quote-accent">Just ask.</em>&rdquo;
        </blockquote>

        <div className="quote-rule">
          <span></span>
        </div>

        <p>BUILT FOR PEOPLE WHO NEED TO KNOW, NOT GUESS</p>
      </motion.section>

      <section id="workspace" className="cta-section">
        <div className="cta-grid" aria-hidden="true"></div>
        <div className="cta-core-glow" aria-hidden="true"></div>

        <motion.div
          className="cta-orbit orbit-one"
          aria-hidden="true"
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        >
          <span className="orbit-node node-indigo" />
        </motion.div>

        <motion.div
          className="cta-orbit orbit-two"
          aria-hidden="true"
          animate={reduce ? {} : { rotate: -360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          <span className="orbit-node node-coral" />
        </motion.div>

        <motion.div
          className="cta-orbit orbit-three"
          aria-hidden="true"
          animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="cta-content"
          initial={reduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="eyebrow eyebrow-light"><span></span> YOUR NEXT ANSWER IS ALREADY IN THERE</div>
          <h2>
            Ready to stop searching<br />and start <em className="cta-highlight">asking?</em>
          </h2>
          <p>Create a private workspace and turn your first document into answers in minutes.</p>

          <motion.div
            style={{ display: "inline-block" }}
            whileHover={reduce ? {} : { scale: 1.03 }}
            whileTap={reduce ? {} : { scale: 0.98 }}
          >
            <Link to="/register" className="lp-button button-light cta-btn">
              <span>Create your workspace</span>
              <span className="btn-arrow"><ArrowRight size={17} /></span>
            </Link>
          </motion.div>

          <small>Free to use &middot; No credit card required</small>
        </motion.div>
      </section>

      <footer className="lp-footer">
        <Logo />
        <p>&copy; 2026 AI Workspace. Your documents, made useful.</p>
        <div>
          <a href="#security">Privacy</a>
          <a href="#security">Security</a>
          <a href="/about">About</a>
          <a href="mailto:tabishachouhan001@gmail.com">Contact</a>
        </div>
      </footer>
    </main>
  );
}
