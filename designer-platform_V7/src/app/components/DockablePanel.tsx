import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { animate } from "motion";

export type AttachmentSide = "top" | "bottom" | "left" | "right";

export interface SubPanel {
  id: string;
  icon: React.ReactNode;
  name: string;
  summary: string;
  content: React.ReactNode;
}

interface DockablePanelProps {
  attachmentSide: AttachmentSide;
  subPanels: SubPanel[];
  radialMenuActive?: boolean;
  // External control for testing
  externalExpand?: boolean;
}

export function DockablePanel({
  attachmentSide,
  subPanels,
  radialMenuActive = false,
  externalExpand,
}: DockablePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [activeSubId, setActiveSubId] = useState(subPanels[0]?.id);
  const [isHovered, setIsHovered] = useState(false);
  const [switchTick, setSwitchTick] = useState(0);
  const motherPanelRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dashedRef = useRef<HTMLDivElement>(null);
  const trailTimerRef = useRef<number | null>(null);
  const railGlowRef = useRef<HTMLDivElement>(null);
  const subPanelListRef = useRef<HTMLDivElement>(null);
  const pinPulseRef = useRef<HTMLDivElement>(null);
  const pinBreathRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);
  const resizeHintRef = useRef<HTMLDivElement>(null);
  const panelX = useMotionValue(0);
  const panelY = useMotionValue(0);
  const [expandedThickness, setExpandedThickness] = useState(384);
  const expandedThicknessMotion = useMotionValue(expandedThickness);
  const resizeStateRef = useRef<{
    start: number;
    startThickness: number;
    lastRaw: number;
    lastTime: number;
    lastSnapped: number;
    velocity: number;
  } | null>(null);
  const isDraggingRef = useRef(false);
  const [isResizeHover, setIsResizeHover] = useState(false);

  // Use external control if provided, otherwise use local state
  const effectiveExpanded = externalExpand ?? isExpanded;

  // Auto-expand on hover (unless radial menu is active)
  const handleMouseEnter = () => {
    if (radialMenuActive) return;
    if (externalExpand === undefined) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (radialMenuActive) return;
    if (!isPinned && externalExpand === undefined) {
      setIsExpanded(false);
    }
  };

  // Space key toggle pin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " && isHovered && effectiveExpanded) {
        e.preventDefault();
        setIsPinned(!isPinned);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isHovered, effectiveExpanded, isPinned]);

  const handleSubPanelClick = (subId: string) => {
    setActiveSubId(subId);
    setSwitchTick((prev) => prev + 1);
  };

  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned(!isPinned);
  };

  const activeSubPanel = subPanels.find((s) => s.id === activeSubId);

  // Rail orientation - PERPENDICULAR to attachmentSide
  // left/right → rail is horizontal
  // top/bottom → rail is vertical
  const isRailHorizontal =
    attachmentSide === "left" || attachmentSide === "right";

  // Mother panel dimensions
  const motherThickness = isRailHorizontal ? 64 : 56;
  const edgeCoverage = 60; // percentage
  const viewportOffset = 24;

  // Rail thickness as structural divider
  const railThickness = 9;
  const railBorder = 2;
  const railHalf = railThickness / 2;
  const railInnerSize = Math.max(railThickness - railBorder * 2, 2);
  const railGlowHeight = railThickness * 3;
  const capsuleSize = railThickness * 2;
  const stepSize = capsuleSize * 2;

  // Expanded panel thickness
  const minExpandedThickness = 260;
  const maxExpandedThickness = 560;

  const expandedTotalThickness = useTransform(expandedThicknessMotion, (value) =>
    Math.round(value + motherThickness)
  );

  const clampThickness = (value: number) =>
    Math.max(minExpandedThickness, Math.min(maxExpandedThickness, value));

  const snapThickness = (value: number) => {
    const steps = Math.round((value - minExpandedThickness) / stepSize);
    return clampThickness(minExpandedThickness + steps * stepSize);
  };

  const getThicknessFromDelta = (startThickness: number, delta: number) => {
    if (attachmentSide === "left") return startThickness + delta;
    if (attachmentSide === "right") return startThickness - delta;
    if (attachmentSide === "top") return startThickness + delta;
    return startThickness - delta;
  };

  // Get mother panel positioning
  const getMotherPanelStyle = (): React.CSSProperties => {
    switch (attachmentSide) {
      case "top":
        return {
          position: "fixed",
          top: viewportOffset,
          left: "20%",
          width: `${edgeCoverage}%`,
          height: `${motherThickness}px`,
        };
      case "bottom":
        return {
          position: "fixed",
          bottom: viewportOffset,
          left: "20%",
          width: `${edgeCoverage}%`,
          height: `${motherThickness}px`,
        };
      case "left":
        return {
          position: "fixed",
          left: viewportOffset,
          top: "20%",
          height: `${edgeCoverage}%`,
          width: `${motherThickness}px`,
        };
      case "right":
        return {
          position: "fixed",
          right: viewportOffset,
          top: "20%",
          height: `${edgeCoverage}%`,
          width: `${motherThickness}px`,
        };
    }
  };

  // Get expanded panel positioning (base, thickness is animated separately)
  const getExpandedPanelBaseStyle = (): React.CSSProperties => {
    switch (attachmentSide) {
      case "top":
        return {
          position: "fixed",
          top: viewportOffset,
          left: "20%",
          width: `${edgeCoverage}%`,
        };
      case "bottom":
        return {
          position: "fixed",
          bottom: viewportOffset,
          left: "20%",
          width: `${edgeCoverage}%`,
        };
      case "left":
        return {
          position: "fixed",
          left: viewportOffset,
          top: "20%",
          height: `${edgeCoverage}%`,
        };
      case "right":
        return {
          position: "fixed",
          right: viewportOffset,
          top: "20%",
          height: `${edgeCoverage}%`,
        };
    }
  };

  const handleCapsulePointerDown = (e: React.PointerEvent) => {
    if (!effectiveExpanded) return;
    e.preventDefault();
    const start = isRailHorizontal ? e.clientX : e.clientY;
    const currentThickness = expandedThicknessMotion.get();
    resizeStateRef.current = {
      start,
      startThickness: currentThickness,
      lastRaw: currentThickness,
      lastTime: performance.now(),
      lastSnapped: currentThickness,
      velocity: 0,
    };
    isDraggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleCapsulePointerMove = (e: React.PointerEvent) => {
    if (!resizeStateRef.current) return;
    const current = isRailHorizontal ? e.clientX : e.clientY;
    const delta = current - resizeStateRef.current.start;
    const raw = getThicknessFromDelta(resizeStateRef.current.startThickness, delta);
    const snapped = snapThickness(raw);
    expandedThicknessMotion.set(snapped);

    const now = performance.now();
    const dt = Math.max(now - resizeStateRef.current.lastTime, 16);
    resizeStateRef.current.velocity = (raw - resizeStateRef.current.lastRaw) / dt;
    resizeStateRef.current.lastRaw = raw;
    resizeStateRef.current.lastTime = now;
    resizeStateRef.current.lastSnapped = snapped;
  };

  const handleCapsulePointerEnd = (e: React.PointerEvent) => {
    if (!resizeStateRef.current) return;
    const drag = resizeStateRef.current;
    resizeStateRef.current = null;
    isDraggingRef.current = false;

    const velocity = drag.velocity;
    let target = snapThickness(drag.lastSnapped);
    if (Math.abs(velocity) > 0.35) {
      const extraSteps = Math.min(2, Math.max(1, Math.round(Math.abs(velocity) * 1.5)));
      target = snapThickness(target + Math.sign(velocity) * stepSize * extraSteps);
    }
    setExpandedThickness(target);
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Slide rail positioning - PERPENDICULAR to attachmentSide
  // Positioned as structural divider
  const getSlideRailStyle = (): React.CSSProperties => {
    const railMargin = railThickness;

    if (isRailHorizontal) {
      // left/right panels: horizontal rail at TOP
      return {
        position: "absolute",
        top: `${railMargin}px`,
        left: `${railThickness}px`,
        right: `${railThickness}px`,
        height: `${railThickness}px`,
      };
    } else {
      // top/bottom panels: vertical rail at RIGHT
      return {
        position: "absolute",
        right: `${railMargin}px`,
        top: `${railThickness}px`,
        bottom: `${railThickness}px`,
        width: `${railThickness}px`,
      };
    }
  };

  // Solid capsule animation in mother panel - moves toward expansion direction
  const getSolidCapsuleAnimation = () => {
    if (!effectiveExpanded) {
      // Collapsed: fill entire rail
      // For left/top panels, use the same positioning anchor (right/bottom) as expanded state
      // Use left: 0 (or top: 0) for proper fill direction, but ensure the anchor edge stays consistent
      if (isRailHorizontal) {
        // Horizontal rail
        switch (attachmentSide) {
          case "left":
            // Left panel: fill entire width, but keep right edge fixed during animations
            // Use left: 0 for proper fill direction, and set right: 0 to ensure right edge is anchored
            return { left: 0, right: 0, height: "100%", top: 0 };
          case "right":
            // Right panel: use left anchor (same as expanded)
            return { left: 0, width: "100%", height: "100%", right: "auto", top: 0 };
        }
      } else {
        // Vertical rail
        switch (attachmentSide) {
          case "top":
            // Top panel: fill entire height, but keep bottom edge fixed during animations
            return { top: 0, bottom: 0, width: "100%", left: 0 };
          case "bottom":
            // Bottom panel: use top anchor (same as expanded)
            return { top: 0, height: "100%", width: "100%", bottom: "auto", left: 0 };
        }
      }
    }

    // Expanded: shrink to a CIRCLE (width = height = railThickness = 6px)
    const circleSize = `${railThickness}px`;

    if (isRailHorizontal) {
      // Horizontal rail
      switch (attachmentSide) {
        case "left":
          // Left panel expands to RIGHT: solid capsule moves to RIGHT edge
          // Keep right: 0 for anchor, set left explicitly to calc(100% - 6px) to position from right
          // This ensures right edge stays fixed during animation transitions
          return {
            right: 0,
            left: `calc(100% - ${circleSize})`,
            width: circleSize,
            height: circleSize,
            top: 0,
          };
        case "right":
          // Right panel expands to LEFT: solid capsule stays at LEFT edge
          return {
            left: 0,
            width: circleSize,
            height: circleSize,
            right: "auto",
            top: 0,
          };
      }
    } else {
      // Vertical rail
      switch (attachmentSide) {
        case "top":
          // Top panel expands DOWN: solid capsule moves to BOTTOM edge
          // Keep bottom: 0 for anchor, set top explicitly to calc(100% - 6px) to position from bottom
          // This ensures bottom edge stays fixed during animation transitions
          return {
            bottom: 0,
            top: `calc(100% - ${circleSize})`,
            height: circleSize,
            width: circleSize,
            left: 0,
          };
        case "bottom":
          // Bottom panel expands UP: solid capsule stays at TOP edge
          return {
            top: 0,
            height: circleSize,
            width: circleSize,
            bottom: "auto",
            left: 0,
          };
      }
    }
  };

  // Dashed circle anchor - follows the opposite end of the solid capsule
  const getDashedCircleBaseStyle = (): React.CSSProperties => {
    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
  };

  const getDashedCircleAnimation = (): React.CSSProperties => {
    const startOffset = `${railHalf}px`;
    const endOffset = `calc(100% - ${railHalf}px)`;

    if (isRailHorizontal) {
      if (attachmentSide === "left") {
        return { left: effectiveExpanded ? endOffset : startOffset, top: "50%" };
      }

      return { left: effectiveExpanded ? startOffset : endOffset, top: "50%" };
    }

    if (attachmentSide === "top") {
      return { top: effectiveExpanded ? endOffset : startOffset, left: "50%" };
    }

    return { top: effectiveExpanded ? startOffset : endOffset, left: "50%" };
  };

  // Expanded panel rail positioning - continuous with mother rail
  const getExpandedRailStyle = (): React.CSSProperties => {
    const railMargin = railThickness;

    if (isRailHorizontal) {
      // Horizontal rail continues
      switch (attachmentSide) {
        case "left":
          return {
            position: "absolute",
            top: `${railMargin}px`,
            left: `${motherThickness + railThickness}px`,
            right: `${railThickness}px`,
            height: `${railThickness}px`,
          };
        case "right":
          return {
            position: "absolute",
            top: `${railMargin}px`,
            left: `${railThickness}px`,
            right: `${motherThickness + railThickness}px`,
            height: `${railThickness}px`,
          };
      }
    } else {
      // Vertical rail continues
      switch (attachmentSide) {
        case "top":
          return {
            position: "absolute",
            right: `${railMargin}px`,
            top: `${motherThickness + railThickness}px`,
            bottom: `${railThickness}px`,
            width: `${railThickness}px`,
          };
        case "bottom":
          return {
            position: "absolute",
            right: `${railMargin}px`,
            top: `${railThickness}px`,
            bottom: `${motherThickness + railThickness}px`,
            width: `${railThickness}px`,
          };
      }
    }
  };

  // Expanded panel capsule - extends into the mother panel side
  const getExpandedCapsuleStyle = (): React.CSSProperties => {
    const overlap = effectiveExpanded ? railThickness * 5 : 0;

    if (isRailHorizontal) {
      const base: React.CSSProperties = {
        position: "absolute",
        top: 0,
        width: `calc(100% + ${overlap}px)`,
        height: "100%",
      };

      if (attachmentSide === "left") {
        return { ...base, left: `-${overlap}px` };
      }

      return { ...base, left: 0 };
    }

    const base: React.CSSProperties = {
      position: "absolute",
      left: 0,
      width: "100%",
      height: `calc(100% + ${overlap}px)`,
    };

    if (attachmentSide === "top") {
      return { ...base, top: `-${overlap}px` };
    }

    return { ...base, top: 0 };
  };

  const getExpandedDividerStyle = (): React.CSSProperties => {
    const railMargin = railThickness;
    const dividerGap = railThickness;
    const dividerThickness = 1;

    if (isRailHorizontal) {
      return {
        position: "absolute",
        top: `${railMargin + railThickness + dividerGap}px`,
        left: `${railThickness}px`,
        right: `${railThickness}px`,
        height: `${dividerThickness}px`,
      };
    }

    return {
      position: "absolute",
      right: `${railMargin + railThickness + dividerGap}px`,
      top: `${railThickness}px`,
      bottom: `${railThickness}px`,
      width: `${dividerThickness}px`,
    };
  };

  const getExpandedContentStyle = (): React.CSSProperties => {
    const railMargin = railThickness;
    const dividerGap = railThickness;
    const dividerThickness = 1;
    const offset = railMargin + railThickness + dividerGap + dividerThickness;

    if (isRailHorizontal) {
      return {
        position: "absolute",
        top: `${offset}px`,
        left: 0,
        right: 0,
        bottom: 0,
      };
    }

    return {
      position: "absolute",
      top: 0,
      left: 0,
      right: `${offset}px`,
      bottom: 0,
    };
  };

  const expandedPanelClip = useTransform([panelX, panelY], ([x, y]) => {
    const travel = Math.abs(isRailHorizontal ? x : y);
    const clip = Math.max(0, Math.round(travel * 1.5 + railThickness * 2));

    switch (attachmentSide) {
      case "left":
        return `inset(0 0 0 ${clip}px)`;
      case "right":
        return `inset(0 ${clip}px 0 0)`;
      case "top":
        return `inset(${clip}px 0 0 0)`;
      case "bottom":
        return `inset(0 0 ${clip}px 0)`;
    }
  });

  // Sub-panel rotation: 90° CLOCKWISE for left/right
  const getSubPanelRotation = () => {
    if (attachmentSide === "left" || attachmentSide === "right") {
      return "rotate(90deg)";
    }
    return "none";
  };

  // Sub-panel container positioning - AFTER the rail
  const getSubPanelContainerStyle = (): React.CSSProperties => {
    const railMargin = railThickness;
    const railGap = railThickness;
    const railSpace = railMargin + railThickness + railGap;

    if (isRailHorizontal) {
      // left/right: rail is at top, sub-panels below
      return {
        position: "absolute",
        top: `${railSpace}px`,
        left: 0,
        right: 0,
        bottom: 0,
      };
    } else {
      // top/bottom: rail is at right, sub-panels to the left
      return {
        position: "absolute",
        top: 0,
        left: 0,
        right: `${railSpace}px`,
        bottom: 0,
      };
    }
  };

  useEffect(() => {
    if (!effectiveExpanded || !railGlowRef.current) return;

    anime.remove(railGlowRef.current);
    if (isRailHorizontal) {
      anime({
        targets: railGlowRef.current,
        translateX: ["-60%", "160%"],
        opacity: [0, 0.85, 0],
        duration: 1400,
        easing: "easeInOutSine",
      });
    } else {
      anime({
        targets: railGlowRef.current,
        translateY: ["-60%", "160%"],
        opacity: [0, 0.85, 0],
        duration: 1400,
        easing: "easeInOutSine",
      });
    }
  }, [effectiveExpanded, isRailHorizontal]);

  useEffect(() => {
    if (!effectiveExpanded || !cometRef.current) return;
    anime.remove(cometRef.current);
    anime({
      targets: cometRef.current,
      opacity: [0, 0.9, 0],
      scaleX: isRailHorizontal ? [0.4, 1] : 1,
      scaleY: isRailHorizontal ? 1 : [0.4, 1],
      duration: 320,
      easing: "easeOutQuad",
    });
  }, [effectiveExpanded, isRailHorizontal]);

  useEffect(() => {
    if (!railRef.current || !dashedRef.current) return;
    if (trailTimerRef.current) {
      window.clearInterval(trailTimerRef.current);
      trailTimerRef.current = null;
    }

    const railEl = railRef.current;
    const dashEl = dashedRef.current;
    const duration = 260;
    const start = performance.now();

    const spawnTrail = () => {
      const railRect = railEl.getBoundingClientRect();
      const dashRect = dashEl.getBoundingClientRect();
      const mark = document.createElement("div");
      const size = railThickness * 1.12;
      mark.style.position = "absolute";
      mark.style.left = `${dashRect.left + dashRect.width / 2 - railRect.left}px`;
      mark.style.top = `${dashRect.top + dashRect.height / 2 - railRect.top}px`;
      mark.style.width = `${size}px`;
      mark.style.height = `${size}px`;
      mark.style.transform = "translate(-50%, -50%)";
      mark.style.borderRadius = "999px";
      mark.style.background = "var(--app-accent-glow-soft)";
      mark.style.filter = "blur(2px)";
      mark.style.pointerEvents = "none";
      railEl.appendChild(mark);
      anime({
        targets: mark,
        opacity: [0.55, 0],
        scale: [1, 1.68],
        duration: 360,
        easing: "easeOutQuad",
        complete: () => mark.remove(),
      });
    };

    spawnTrail();
    trailTimerRef.current = window.setInterval(() => {
      if (performance.now() - start > duration) {
        if (trailTimerRef.current) {
          window.clearInterval(trailTimerRef.current);
          trailTimerRef.current = null;
        }
        return;
      }
      spawnTrail();
    }, 40);

    return () => {
      if (trailTimerRef.current) {
        window.clearInterval(trailTimerRef.current);
        trailTimerRef.current = null;
      }
    };
  }, [effectiveExpanded, railThickness]);

  useEffect(() => {
    if (!effectiveExpanded || !subPanelListRef.current) return;
    const items = subPanelListRef.current.querySelectorAll("[data-subpanel]");
    if (!items.length) return;

    anime.remove(items);
    anime({
      targets: items,
      opacity: [0, 1],
      translateY: isRailHorizontal ? [6, 0] : 0,
      translateX: isRailHorizontal ? 0 : [6, 0],
      duration: 360,
      delay: anime.stagger(45),
      easing: "easeOutQuad",
    });
  }, [effectiveExpanded, isRailHorizontal, activeSubId]);

  useEffect(() => {
    if (!subPanelListRef.current) return;
    anime.remove(subPanelListRef.current);
    anime({
      targets: subPanelListRef.current,
      scaleY: [0.98, 1],
      duration: 140,
      easing: "easeOutQuad",
    });
  }, [switchTick]);

  useEffect(() => {
    if (!isPinned || !pinPulseRef.current) return;

    anime.remove(pinPulseRef.current);
    anime({
      targets: pinPulseRef.current,
      opacity: [0.9, 0],
      scale: [1, 1.7],
      duration: 520,
      easing: "easeOutQuad",
    });
  }, [isPinned]);

  useEffect(() => {
    if (!isPinned || !pinBreathRef.current) return;
    anime.remove(pinBreathRef.current);
    const cycle = 900;
    anime({
      targets: pinBreathRef.current,
      opacity: [0.6, 0],
      scale: [1, 1.7],
      duration: cycle,
      delay: cycle,
      loop: true,
      easing: "easeOutQuad",
    });
  }, [isPinned]);

  useEffect(() => {
    if (isDraggingRef.current) return;
    const controls = animate(expandedThicknessMotion, expandedThickness, {
      type: "spring",
      stiffness: 220,
      damping: 24,
      mass: 0.7,
    });
    return () => controls.stop();
  }, [expandedThickness, expandedThicknessMotion]);

  useEffect(() => {
    if (!isResizeHover || !resizeHintRef.current) return;
    anime.remove(resizeHintRef.current);
    anime({
      targets: resizeHintRef.current,
      translateY: isRailHorizontal ? 0 : [-6, 6],
      translateX: isRailHorizontal ? [-6, 6] : 0,
      opacity: [0.5, 1],
      duration: 900,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });
    return () => anime.remove(resizeHintRef.current);
  }, [isResizeHover, isRailHorizontal]);

  return (
    <>
      {/* Expanded Panel Layer - appears UNDER mother panel */}
      <AnimatePresence>
        {effectiveExpanded && (
          <motion.div
            style={{
              ...getExpandedPanelBaseStyle(),
              ...(isRailHorizontal
                ? { width: expandedTotalThickness }
                : { height: expandedTotalThickness }),
              zIndex: 10,
              pointerEvents: effectiveExpanded ? "auto" : "none",
              clipPath: expandedPanelClip,
              x: panelX,
              y: panelY,
            }}
            className="bg-[var(--app-panel)] border border-[var(--app-border)] rounded-lg shadow-xl overflow-hidden"
            initial={
              attachmentSide === "top"
                ? { y: -120, opacity: 0 }
                : attachmentSide === "bottom"
                  ? { y: 120, opacity: 0 }
                  : attachmentSide === "left"
                    ? { x: -120, opacity: 0 }
                    : { x: 120, opacity: 0 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={
              attachmentSide === "top"
                ? { y: -120, opacity: 0 }
                : attachmentSide === "bottom"
                  ? { y: 120, opacity: 0 }
                  : attachmentSide === "left"
                    ? { x: -120, opacity: 0 }
                    : { x: 120, opacity: 0 }
            }
            transition={{ duration: 0.28, ease: [0.45, 0, 0.15, 1] }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Expanded rail segment - continuous with mother rail */}
            <div style={getExpandedRailStyle()}>
              {/* Hollow capsule */}
              <div
                className="absolute inset-0 border-2 rounded-full"
                style={{ borderColor: "var(--app-accent)", opacity: 0.4 }}
              />

              {/* Solid capsule segment - extends to the left of expanded panel */}
              <motion.div
                className="absolute bg-[var(--app-accent)] rounded-full"
                style={getExpandedCapsuleStyle()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.28, ease: [0.45, 0, 0.15, 1] }}
              />

              {/* Drag handle overlay */}
              <div
                className="absolute inset-0"
                style={{ cursor: isRailHorizontal ? "ew-resize" : "ns-resize" }}
                onPointerDown={handleCapsulePointerDown}
                onPointerMove={handleCapsulePointerMove}
                onPointerUp={handleCapsulePointerEnd}
                onPointerCancel={handleCapsulePointerEnd}
                onPointerEnter={() => setIsResizeHover(true)}
                onPointerLeave={() => setIsResizeHover(false)}
              >
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    ref={resizeHintRef}
                    className={`flex ${isRailHorizontal ? "flex-row" : "flex-col"} items-center`}
                    style={{ gap: `${Math.max(2, Math.round(capsuleSize / 6))}px` }}
                  >
                    <span
                      style={{
                        width: `${Math.max(2, Math.round(capsuleSize / 3.5))}px`,
                        height: `${Math.max(2, Math.round(capsuleSize / 3.5))}px`,
                        borderRadius: "999px",
                        background: "var(--app-accent-glow)",
                        opacity: 0.8,
                        display: "block",
                      }}
                    />
                    <span
                      style={{
                        width: `${Math.max(2, Math.round(capsuleSize / 3.5))}px`,
                        height: `${Math.max(2, Math.round(capsuleSize / 3.5))}px`,
                        borderRadius: "999px",
                        background: "var(--app-accent-glow)",
                        opacity: 0.8,
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div style={getExpandedDividerStyle()} className="bg-[var(--app-border)]" />

            {/* Expanded content area */}
            <div
              style={getExpandedContentStyle()}
              className={`${
                isRailHorizontal ? "flex flex-row" : "flex flex-col"
              }`}
            >
              {/* Spacer for mother panel - based on attachment side */}
              {(attachmentSide === "top" || attachmentSide === "left") && (
                <div
                  style={
                    isRailHorizontal
                      ? { width: `${motherThickness}px`, flexShrink: 0 }
                      : { height: `${motherThickness}px`, flexShrink: 0 }
                  }
                />
              )}

              {/* Detail content */}
              <motion.div
                className="flex-1 overflow-auto p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.2 }}
              >
                {activeSubPanel?.content}
              </motion.div>

              {/* Spacer for mother panel - based on attachment side */}
              {(attachmentSide === "bottom" || attachmentSide === "right") && (
                <div
                  style={
                    isRailHorizontal
                      ? { width: `${motherThickness}px`, flexShrink: 0 }
                      : { height: `${motherThickness}px`, flexShrink: 0 }
                  }
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mother Panel - appears ABOVE expanded panel */}
      <div
        ref={motherPanelRef}
        style={{
          ...getMotherPanelStyle(),
          zIndex: 20,
        }}
        className="bg-[var(--app-panel)] border border-[var(--app-border)] rounded-lg shadow-xl relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {/* Slide Rail - perpendicular to attachmentSide, structural divider */}
        <div style={getSlideRailStyle()} ref={railRef}>
          {/* Hollow capsule */}
          <div
            className="absolute inset-0 border-2 rounded-full"
            style={{ borderColor: "var(--app-accent)", opacity: 0.4 }}
          />

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              ref={railGlowRef}
              className={`absolute opacity-0 ${
                isRailHorizontal ? "left-0 w-16" : "top-0 h-16"
              }`}
              style={{
                backgroundImage: isRailHorizontal
                  ? "linear-gradient(90deg, transparent, var(--app-accent-glow), transparent)"
                  : "linear-gradient(180deg, transparent, var(--app-accent-glow), transparent)",
                height: isRailHorizontal ? `${railGlowHeight}px` : "auto",
                width: isRailHorizontal ? "auto" : `${railGlowHeight}px`,
                top: isRailHorizontal ? "50%" : undefined,
                left: isRailHorizontal ? undefined : "50%",
                marginTop: isRailHorizontal ? `-${railGlowHeight / 2}px` : undefined,
                marginLeft: isRailHorizontal ? undefined : `-${railGlowHeight / 2}px`,
              }}
            />
          </div>

          {/* Solid capsule - same size as hollow capsule */}
          <motion.div
            className="absolute bg-[var(--app-accent)] rounded-full"
            initial={false}
            animate={getSolidCapsuleAnimation()}
            transition={{ duration: 0.28, ease: [0.45, 0, 0.15, 1] }}
          />

          {/* Dashed circle - bound to the opposite end of solid capsule's expansion direction */}
          <motion.div
            style={getDashedCircleBaseStyle()}
            className="cursor-pointer relative"
            onClick={handlePinClick}
            initial={false}
            animate={getDashedCircleAnimation()}
            transition={{ duration: 0.28, ease: [0.45, 0, 0.15, 1] }}
            ref={dashedRef}
          >
            {isPinned && (
              <div
                ref={pinBreathRef}
                className="absolute inset-0 rounded-full border opacity-0"
                style={{ borderColor: "var(--app-accent-purple)" }}
              />
            )}
            <div
              ref={cometRef}
              className={`absolute left-1/2 top-1/2 opacity-0 pointer-events-none ${
                isRailHorizontal
                  ? "h-2 w-6 -translate-x-1/2 -translate-y-1/2"
                  : "w-2 h-6 -translate-x-1/2 -translate-y-1/2"
              }`}
              style={{
                filter: "blur(1.5px)",
                backgroundImage: isRailHorizontal
                  ? "linear-gradient(90deg, var(--app-accent-glow), transparent)"
                  : "linear-gradient(180deg, var(--app-accent-glow), transparent)",
              }}
            />
            <div
              ref={pinPulseRef}
              className="absolute inset-0 rounded-full border opacity-0"
              style={{ transformOrigin: "center", borderColor: "var(--app-accent-purple)" }}
            />
            <motion.svg
              width={railThickness * 2}
              height={railThickness * 2}
              viewBox={`0 0 ${railThickness * 2} ${railThickness * 2}`}
              className="overflow-visible"
              style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              animate={{ rotate: effectiveExpanded ? 360 : 0 }}
              transition={{
                duration: 60,
                repeat: effectiveExpanded ? Infinity : 0,
                ease: "linear",
              }}
            >
              <circle
                cx={railThickness}
                cy={railThickness}
                r={railThickness}
                fill="none"
                stroke={isPinned || effectiveExpanded ? "var(--app-accent-purple)" : "var(--app-accent)"}
                strokeWidth="1.5"
                strokeDasharray="2 2"
                className={`transition-all ${
                  isPinned || isHovered ? "opacity-100" : "opacity-50"
                }`}
              />
              <circle
                cx={railThickness}
                cy={railThickness}
                r={railThickness * 0.25}
                fill="var(--app-panel)"
              />
              {isPinned && (
                <circle
                  cx={railThickness}
                  cy={railThickness}
                  r={railThickness * 0.35}
                  fill="var(--app-accent-purple)"
                />
              )}
            </motion.svg>
          </motion.div>
        </div>

        {/* Sub-panels - positioned AFTER the rail */}
        <div
          style={getSubPanelContainerStyle()}
          className={
            isRailHorizontal ? "border-t border-[var(--app-border)]" : "border-r border-[var(--app-border)]"
          }
        >
          <div
            ref={subPanelListRef}
            className={`h-full w-full ${
              isRailHorizontal
                ? "flex flex-col items-stretch justify-center px-2 py-0"
                : "flex flex-row items-stretch py-2 pl-2 pr-0 gap-0"
            }`}
          >
            {subPanels.map((sub, index) => (
              <React.Fragment key={sub.id}>
                <button
                  onClick={() => handleSubPanelClick(sub.id)}
                  className={`
                    group relative
                    flex-1 flex items-center
                    ${isRailHorizontal ? "justify-center" : "justify-start"}
                    ${isRailHorizontal ? "py-3 w-full" : "px-4 h-full"}
                    ${
                      activeSubId === sub.id && effectiveExpanded
                        ? "text-[var(--app-accent)]"
                        : "text-[var(--app-text-muted)] hover:text-[var(--app-text)]"
                    }
                  `}
                  data-subpanel
                >
                  <div
                    className="flex items-center gap-2"
                    style={{ transform: getSubPanelRotation(), transformOrigin: "center" }}
                  >
                    <div className={`flex-shrink-0 ${isRailHorizontal ? "" : "mt-0.5"}`}>
                      {sub.icon}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="text-xs font-medium whitespace-nowrap truncate">
                        {sub.name}
                      </div>
                      <div className="text-[10px] text-[var(--app-text-faint)] whitespace-nowrap truncate mt-0.5">
                        {sub.summary}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Divider */}
                {index < subPanels.length - 1 && (
                  <div
                    className={`
                      bg-[var(--app-border)] flex-shrink-0
                      ${isRailHorizontal ? "h-px w-full mx-2" : "w-px h-8"}
                    `}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
