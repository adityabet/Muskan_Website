import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "view" | "tap" | "drag">("default");
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Hide cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if element or parent has specific cursor triggers
      const viewTrigger = target.closest("[data-cursor='view']");
      const tapTrigger = target.closest("[data-cursor='tap']");
      const dragTrigger = target.closest("[data-cursor='drag']");
      const buttonTrigger = target.closest("button, a, input, select, textarea");

      if (viewTrigger) {
        setCursorType("view");
      } else if (dragTrigger) {
        setCursorType("drag");
      } else if (tapTrigger || buttonTrigger) {
        setCursorType("tap");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "var(--cursor-bg, #b5945b)",
      border: "0px solid transparent",
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(181, 148, 91, 0.15)",
      border: "1px solid rgba(181, 148, 91, 0.8)",
      backdropFilter: "blur(4px)",
    },
    tap: {
      width: 48,
      height: 48,
      backgroundColor: "transparent",
      border: "1.5px solid var(--cursor-border, #b5945b)",
    },
    drag: {
      width: 72,
      height: 72,
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      border: "1px dashed var(--cursor-border, #b5945b)",
    }
  };

  return (
    <>
      {/* Spring follower cursor */}
      <motion.div
        id="custom-cursor"
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={cursorType}
        variants={variants}
        transition={{ type: "spring", stiffness: 400, damping: 45 }}
      >
        {cursorType === "view" && (
          <motion.span 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[9px] font-mono tracking-widest text-[#b5945b] font-semibold"
          >
            VIEW
          </motion.span>
        )}
        {cursorType === "drag" && (
          <motion.span 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[9px] font-mono tracking-widest text-[#b5945b] font-semibold"
          >
            DRAG
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
