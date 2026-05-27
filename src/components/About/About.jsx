import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useSiteContent } from "../../context/SiteContentContext";
import Section from "../ui/Section";

/* ── inject Google Fonts once ── */
if (
  typeof document !== "undefined" &&
  !document.getElementById("about-fonts")
) {
  const link = document.createElement("link");
  link.id = "about-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@700;800&display=swap";
  document.head.appendChild(link);
}

/* ─────────────────────────────────────────────────
   RepelWord
   Each word subscribes to the shared mouse MotionValues
   and springs away when the cursor gets close.
───────────────────────────────────────────────── */
function RepelWord({ children, mouseX, mouseY, index }) {
  const ref = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.4 });

  useEffect(() => {
    const RADIUS = 110;
    const STRENGTH = 65;

    function update() {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - mouseX.get();
      const dy = cy - mouseY.get();
      const dist = Math.hypot(dx, dy);
      if (dist < RADIUS && dist > 0) {
        const force = (1 - dist / RADIUS) * STRENGTH;
        rawX.set((dx / dist) * force);
        rawY.set((dy / dist) * force);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    }

    const unsubX = mouseX.on("change", update);
    const unsubY = mouseY.on("change", update);
    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, rawX, rawY]);

  return (
    <motion.span
      ref={ref}
      style={{
        x: springX,
        y: springY,
        display: "inline-block",
        whiteSpace: "pre",
        fontFamily: "'Space Mono', monospace",
        fontSize: "14px",
        lineHeight: 2,
        color: "rgba(148,163,184,0.9)",
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.006, duration: 0.3 }}
    >
      {children}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────
   Skill chip
───────────────────────────────────────────────── */

function Chip({ label, index }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 1 + index * 0.04,
        type: "spring",
        stiffness: 280,
        damping: 22,
      }}
      whileHover={{
        y: -3,
        borderColor: "rgba(103,232,249,0.65)",
        color: "#67e8f9",
        background: "rgba(103,232,249,0.08)",
      }}
      style={{
        display: "inline-block",
        fontFamily: "'Space Mono', monospace",
        fontSize: "11px",
        padding: "5px 13px",
        borderRadius: "6px",
        border: "1px solid rgba(103,232,249,0.18)",
        color: "rgba(148,163,184,0.8)",
        background: "rgba(103,232,249,0.04)",
        cursor: "default",
      }}
    >
      {label}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────
   Decorative floating ring
───────────────────────────────────────────────── */
function DecoRing({ size, style, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -14, 0], rotate: [0, 18, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        border: "1px solid rgba(103,232,249,0.1)",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────
   About
───────────────────────────────────────────────── */
function About() {
  const { siteContent } = useSiteContent();
  const fullText = siteContent.about?.fullText || "";
  const paragraphs = fullText.split("\n").filter(Boolean);
  const hasText = paragraphs.length > 0;

  /* shared mouse MotionValues (no state → no re-renders) */
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const cursorOpacity = useMotionValue(0);

  /* smooth cursor dot */
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      cursorOpacity.set(1);
    };
    const onLeave = () => {
      mouseX.set(-9999);
      mouseY.set(-9999);
      cursorOpacity.set(0);
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseX, mouseY, cursorOpacity]);

  /* flatten paragraphs → word list with para index */
  const paraGroups = paragraphs.map((para) =>
    para.split(" ").map((word, wi) => ({ text: (wi > 0 ? " " : "") + word })),
  );

  /* running index for stagger delay */
  let wordIndex = 0;

  return (
    <Section id="about" className="relative">
      {/* ── cursor dot ── */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          opacity: cursorOpacity,
          position: "fixed",
          top: 0,
          left: 0,
          translateX: "-50%",
          translateY: "-50%",
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#67e8f9",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "screen",
        }}
      />

      {/* ── decorative rings ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <DecoRing size={320} style={{ top: -80, right: -80 }} delay={0} />
        <DecoRing
          size={180}
          style={{ top: 20, right: 60, opacity: 0.6 }}
          delay={4}
        />
        <DecoRing
          size={90}
          style={{ bottom: 60, left: "8%", opacity: 0.5 }}
          delay={2}
        />
      </div>

      <div
        className="container mx-auto px-6 lg:px-16"
        style={{ cursor: "none" }}
      >
        <div className="lg:col-span-7 space-y-6">
          {/* ── badge ── */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(103,232,249,0.7)",
              border: "1px solid rgba(103,232,249,0.2)",
              borderRadius: 999,
              padding: "6px 16px",
              background: "rgba(103,232,249,0.05)",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "inline-block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#67e8f9",
              }}
            />
            about.me
          </motion.div>

          {/* ── headline ── */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              lineHeight: 1.06,
              color: "#f1f5f9",
              margin: "0 0 1.6rem",
              letterSpacing: "-0.02em",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
              style={{
                display: "inline-block",
                color: "#67e8f9",
                WebkitTextFillColor: "#67e8f9",
                marginLeft: 3,
              }}
            >
              _
            </motion.span>
          </motion.h2>

          {/* ── repel text ── */}
          {hasText && (
            <div style={{ userSelect: "none" }}>
              {paraGroups.map((words, pi) => (
                <p key={pi} style={{ margin: "0 0 1rem" }}>
                  {words.map((w) => {
                    const idx = wordIndex++;
                    return (
                      <RepelWord
                        key={idx}
                        mouseX={mouseX}
                        mouseY={mouseY}
                        index={idx}
                      >
                        {w.text}
                      </RepelWord>
                    );
                  })}
                </p>
              ))}
            </div>
          )}

          {/* ── hint ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "rgba(148,163,184,0.4)",
              margin: "0.4rem 0 0",
            }}
          ></motion.p>

          {/* ── skill chips ── */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: "1.5rem",
            }}
          ></div>
        </div>
      </div>
    </Section>
  );
}

export default About;
