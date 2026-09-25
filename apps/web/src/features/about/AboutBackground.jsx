import { motion, useReducedMotion } from "framer-motion";

export default function AboutBackground() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Subtle architectural grid with radial vignette mask */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(15, 17, 21, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 17, 21, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 85% 65% at 50% 25%, black 40%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 65% at 50% 25%, black 40%, transparent 95%)",
        }}
      />

      {/* Floating Ambient Glow 1: Electric Indigo (Top Center-Left) */}
      <motion.div
        style={{
          position: "absolute",
          width: "52vw",
          height: "52vw",
          maxWidth: "700px",
          maxHeight: "700px",
          top: "-12vw",
          left: "8vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79, 70, 229, 0.14) 0%, rgba(79, 70, 229, 0) 70%)",
          filter: "blur(60px)",
        }}
        animate={reduce ? {} : { x: [0, 35, -25, 0], y: [0, 25, -20, 0], scale: [1, 1.06, 0.97, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Ambient Glow 2: Fresh Mint (Middle-Right) */}
      <motion.div
        style={{
          position: "absolute",
          width: "44vw",
          height: "44vw",
          maxWidth: "580px",
          maxHeight: "580px",
          top: "22vh",
          right: "-6vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.11) 0%, rgba(16, 185, 129, 0) 70%)",
          filter: "blur(55px)",
        }}
        animate={reduce ? {} : { x: [0, -40, 20, 0], y: [0, 35, -25, 0], scale: [1, 0.95, 1.07, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating Ambient Glow 3: Warm Coral / Purple (Lower) */}
      <motion.div
        style={{
          position: "absolute",
          width: "48vw",
          height: "48vw",
          maxWidth: "640px",
          maxHeight: "640px",
          bottom: "10vh",
          left: "22vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, rgba(147, 51, 234, 0) 70%)",
          filter: "blur(65px)",
        }}
        animate={reduce ? {} : { x: [0, 25, -35, 0], y: [0, -25, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Fine subtle constellation connection points */}
      {[
        { left: "14%", top: "18%", size: 6, delay: 0 },
        { left: "84%", top: "26%", size: 5, delay: 1.2 },
        { left: "22%", top: "58%", size: 7, delay: 2.1 },
        { left: "78%", top: "66%", size: 6, delay: 0.8 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            background: "#4f46e5",
            boxShadow: "0 0 10px rgba(79, 70, 229, 0.6)",
          }}
          animate={reduce ? { opacity: 0.25 } : { opacity: [0.15, 0.65, 0.15], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
        />
      ))}
    </div>
  );
}
