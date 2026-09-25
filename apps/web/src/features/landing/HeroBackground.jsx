import { motion, useReducedMotion } from "framer-motion";

export default function HeroBackground() {
  const reduce = useReducedMotion();

  const blobTransition = (duration, delay = 0) => ({
    duration,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
    delay,
  });

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#fdfcfa",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: -40,
          backgroundImage: `linear-gradient(rgba(15,17,21,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,17,21,0.06) 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(80% 70% at 50% 30%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(80% 70% at 50% 30%, black 40%, transparent 100%)",
        }}
        animate={reduce ? {} : { x: [0, 30, 0], y: [0, 18, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        style={{
          position: "absolute",
          width: "48vw",
          height: "48vw",
          left: "-8vw",
          top: "-14vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.28) 0%, rgba(79,70,229,0) 68%)",
        }}
        animate={reduce ? {} : { x: [0, 90, -20, 0], y: [0, 60, 40, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={blobTransition(14)}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "42vw",
          height: "42vw",
          right: "-10vw",
          top: "0vh",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(147,51,234,0.22) 0%, rgba(147,51,234,0) 68%)",
        }}
        animate={reduce ? {} : { x: [0, -80, 30, 0], y: [0, 70, -30, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={blobTransition(17, 1)}
      />
      <motion.div
        style={{
          position: "absolute",
          width: "34vw",
          height: "34vw",
          left: "28vw",
          bottom: "-16vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0) 68%)",
        }}
        animate={reduce ? {} : { x: [0, 50, -40, 0], y: [0, -50, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={blobTransition(15, 2)}
      />

      {[
        { left: "18%", top: "24%", size: 8 },
        { left: "72%", top: "20%", size: 6 },
        { left: "58%", top: "55%", size: 10 },
        { left: "35%", top: "68%", size: 6 },
        { left: "82%", top: "62%", size: 7 },
      ].map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            borderRadius: 999,
            background: "#4f46e5",
            boxShadow: "0 0 14px rgba(79,70,229,0.8)",
          }}
          animate={reduce ? { opacity: 0.3 } : { opacity: [0, 0.7, 0], scale: [0.6, 1.3, 0.6] }}
          transition={{ duration: 5 + i * 1.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
        />
      ))}
    </div>
  );
}
