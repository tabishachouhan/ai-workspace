import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function DashboardBackground() {
  const reduce = useReducedMotion();

  // Smooth mouse-follow spotlight
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const cursorOpacity = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 28, stiffness: 180 });
  const springY = useSpring(mouseY, { damping: 28, stiffness: 180 });

  useEffect(() => {
    function handleMouseMove(e) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      cursorOpacity.set(1);
    }
    function handleMouseLeave() {
      cursorOpacity.set(0);
    }
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, cursorOpacity]);

  return (
    <div
      aria-hidden="true"
      className="dashboard-bg-container"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* 1. Crisp Architectural Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(15, 17, 21, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 17, 21, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse 95% 85% at 50% 20%, black 55%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 95% 85% at 50% 20%, black 55%, transparent 95%)",
        }}
      />

      {/* 2. Floating Aurora Fluid 1: Electric Indigo (Top Right) */}
      <motion.div
        style={{
          position: "absolute",
          width: "640px",
          height: "640px",
          top: "-140px",
          right: "0%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79, 70, 229, 0.26) 0%, rgba(99, 102, 241, 0.14) 45%, transparent 72%)",
          filter: "blur(45px)",
        }}
        animate={
          reduce
            ? {}
            : {
                x: [0, 80, -60, 30, 0],
                y: [0, 50, -40, 25, 0],
                scale: [1, 1.2, 0.9, 1.12, 1],
              }
        }
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3. Floating Aurora Fluid 2: Violet / Magenta (Center-Left) */}
      <motion.div
        style={{
          position: "absolute",
          width: "580px",
          height: "580px",
          top: "25%",
          left: "-8%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.24) 0%, rgba(217, 70, 239, 0.12) 45%, transparent 72%)",
          filter: "blur(45px)",
        }}
        animate={
          reduce
            ? {}
            : {
                x: [0, -70, 50, -20, 0],
                y: [0, 60, -45, 30, 0],
                scale: [1, 0.9, 1.18, 0.95, 1],
              }
        }
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      {/* 4. Floating Aurora Fluid 3: Vivid Cyan & Emerald (Bottom Right) */}
      <motion.div
        style={{
          position: "absolute",
          width: "560px",
          height: "560px",
          bottom: "2%",
          right: "10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(16, 185, 129, 0.12) 45%, transparent 72%)",
          filter: "blur(48px)",
        }}
        animate={
          reduce
            ? {}
            : {
                x: [0, 60, -50, 40, 0],
                y: [0, -45, 50, -25, 0],
                scale: [1, 1.15, 0.88, 1.1, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.6,
        }}
      />

      {/* 5. Floating Aurora Fluid 4: Warm Coral / Amber (Middle Accent) */}
      <motion.div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          top: "55%",
          left: "25%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(244, 63, 94, 0.16) 0%, rgba(251, 146, 60, 0.08) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={
          reduce
            ? {}
            : {
                x: [0, 45, -55, 0],
                y: [0, -35, 40, 0],
                scale: [1, 1.12, 0.94, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.4,
        }}
      />

      {/* 6. Interactive Mouse Follow Spotlight */}
      {!reduce && (
        <motion.div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            x: springX,
            y: springY,
            width: "440px",
            height: "440px",
            marginLeft: "-220px",
            marginTop: "-220px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, rgba(168, 85, 247, 0.10) 40%, transparent 70%)",
            filter: "blur(38px)",
            pointerEvents: "none",
            zIndex: 1,
            opacity: cursorOpacity,
          }}
        />
      )}

      {/* 7. Floating Glowing Stars / Firefly Beacons */}
      {[
        { top: "14%", left: "16%", size: 8, color: "#4f46e5", dur: 5, delay: 0 },
        { top: "24%", left: "76%", size: 9, color: "#06b6d4", dur: 6, delay: 0.8 },
        { top: "44%", left: "86%", size: 7, color: "#a855f7", dur: 5.2, delay: 1.5 },
        { top: "58%", left: "12%", size: 9, color: "#4f46e5", dur: 6.5, delay: 0.4 },
        { top: "74%", left: "68%", size: 8, color: "#06b6d4", dur: 5.8, delay: 1.2 },
        { top: "86%", left: "30%", size: 7, color: "#ec4899", dur: 5.4, delay: 2 },
      ].map((pt, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: pt.top,
            left: pt.left,
            width: pt.size,
            height: pt.size,
            borderRadius: "50%",
            background: pt.color,
            boxShadow: `0 0 14px ${pt.color}, 0 0 28px ${pt.color}`,
          }}
          animate={
            reduce
              ? { opacity: 0.4 }
              : {
                  opacity: [0.25, 1, 0.25],
                  y: [0, -28, 0],
                  x: [0, i % 2 === 0 ? 16 : -16, 0],
                  scale: [0.85, 1.4, 0.85],
                }
          }
          transition={{
            duration: pt.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: pt.delay,
          }}
        />
      ))}
    </div>
  );
}
