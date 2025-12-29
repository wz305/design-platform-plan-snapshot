import React, { useState, useEffect, useRef } from 'react';
import anime from "animejs";
import { motion, AnimatePresence } from 'motion/react';

export interface RadialMenuItem {
  id: string;
  label: string;
  action: () => void;
}

export interface RadialMenuRing {
  id: string;
  label: string;
  items: RadialMenuItem[];
}

interface RadialMenuProps {
  position: { x: number; y: number };
  rings: RadialMenuRing[];
  onClose: () => void;
  onSelect?: (item: RadialMenuItem) => void;
}

export function RadialMenu({ position, rings, onClose, onSelect }: RadialMenuProps) {
  const [activeRing, setActiveRing] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoveredRingIndex, setHoveredRingIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState(position);
  const [mouseDown, setMouseDown] = useState(true);
  const outerRingRef = useRef<SVGGElement>(null);
  const innerRingRef = useRef<SVGGElement>(null);

  const currentRing = rings[activeRing];
  const itemCount = currentRing.items.length;
  const angleStep = (Math.PI * 2) / itemCount;

  const innerRadiusMin = 40; // Cancel zone
  const innerRadiusMax = 130;
  const outerRadiusMin = 135;
  const outerRadiusMax = 260;
  const outerRadiusMid = (outerRadiusMin + outerRadiusMax) / 2;
  const outerHaloRadius = outerRadiusMax * 1.35;
  const outerHaloStart = (outerRadiusMin / outerHaloRadius) * 100;
  const outerFadeEdge = outerRadiusMax + 48;
  const outerFadeStartFill = 50;
  const outerFadeEdgeStart = 75;
  const menuRadius = outerFadeEdge + 20;

  // Track mouse position for glowing cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      const dx = e.clientX - position.x;
      const dy = e.clientY - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      // Check if in outer ring (category switcher)
      if (distance >= outerRadiusMin && distance <= outerRadiusMax) {
        const ringAngleStep = (Math.PI * 2) / rings.length;
        const normalizedAngle = (angle + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);
        const ringIndex = Math.floor(normalizedAngle / ringAngleStep);
        
        if (ringIndex !== activeRing) {
          setActiveRing(ringIndex);
        }
        setHoveredRingIndex(ringIndex);
        setHoveredItem(null);
      }
      // Check if in inner ring (actions)
      else if (distance >= innerRadiusMin && distance <= innerRadiusMax) {
        const normalizedAngle = (angle + Math.PI / 2 + Math.PI * 2) % (Math.PI * 2);
        const itemIndex = Math.floor(normalizedAngle / angleStep);
        const item = currentRing.items[itemIndex];
        
        setHoveredItem(item?.id || null);
        setHoveredRingIndex(null);
      }
      // Outside all rings - cancel
      else if (distance > outerRadiusMax) {
        setHoveredItem(null);
        setHoveredRingIndex(null);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      setMouseDown(false);
      
      const dx = e.clientX - position.x;
      const dy = e.clientY - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only select if in inner action zone
      if (distance >= innerRadiusMin && distance <= innerRadiusMax && hoveredItem) {
        const item = currentRing.items.find(i => i.id === hoveredItem);
        if (item) {
          item.action();
          if (onSelect) onSelect(item);
        }
      }

      onClose();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position, hoveredItem, currentRing, activeRing, rings.length, onClose, onSelect, angleStep]);

  useEffect(() => {
    if (!outerRingRef.current) return;
    anime.remove(outerRingRef.current);
    anime({
      targets: outerRingRef.current,
      rotate: [-10, 0],
      duration: 420,
      easing: "easeOutBack",
    });
  }, []);

  useEffect(() => {
    if (!innerRingRef.current) return;
    anime.remove(innerRingRef.current);
    anime({
      targets: innerRingRef.current,
      rotate: [6, 0],
      duration: 360,
      easing: "easeOutBack",
    });
  }, []);

  return (
    <>
      {/* Hide default cursor and show glowing light point */}
      <style>{`
        body { cursor: none !important; }
        * { cursor: none !important; }
      `}</style>

      {/* Glowing cursor light point */}
      <div
        className="fixed pointer-events-none z-[100]"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2">
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-40"
              style={{ backgroundColor: "var(--app-accent)" }}
            />
            <div
              className="absolute inset-0 rounded-full blur-lg opacity-60"
              style={{ backgroundColor: "var(--app-accent)" }}
            />
          </div>
          {/* Core light point */}
          <div className="relative w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg" />
        </div>
      </div>

      {/* Radial Menu */}
      <motion.div
        className="fixed z-[60] pointer-events-none"
        style={{
          left: position.x,
          top: position.y,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.15 }}
      >
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          width={menuRadius * 2}
          height={menuRadius * 2}
          viewBox={`-${menuRadius} -${menuRadius} ${menuRadius * 2} ${menuRadius * 2}`}
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={(e) => {
            if (e.button === 2) {
              e.preventDefault();
            }
            e.stopPropagation();
          }}
        >
          <defs>
            {/* Gradient for outer ring fade */}
            <radialGradient
              id="outerHalo"
              gradientUnits="userSpaceOnUse"
              cx="0"
              cy="0"
              r={outerHaloRadius}
            >
              <stop offset={`${outerHaloStart}%`} stopColor="var(--app-border-strong)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--app-border-strong)" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="outerFade"
              gradientUnits="userSpaceOnUse"
              cx="0"
              cy="0"
              r={outerFadeEdge}
            >
              <stop offset="0%" stopColor="var(--app-bg)" stopOpacity="0.25" />
              <stop offset={`${outerFadeStartFill}%`} stopColor="var(--app-bg)" stopOpacity="0.25" />
              <stop offset="70%" stopColor="var(--app-bg)" stopOpacity="0.14" />
              <stop offset="85%" stopColor="var(--app-bg)" stopOpacity="0.05" />
              <stop offset="100%" stopColor="var(--app-bg)" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="outerFadeActive"
              gradientUnits="userSpaceOnUse"
              cx="0"
              cy="0"
              r={outerFadeEdge}
            >
              <stop offset="0%" stopColor="var(--app-accent)" stopOpacity="0.18" />
              <stop offset={`${outerFadeStartFill}%`} stopColor="var(--app-accent)" stopOpacity="0.18" />
              <stop offset="70%" stopColor="var(--app-accent)" stopOpacity="0.08" />
              <stop offset="85%" stopColor="var(--app-accent)" stopOpacity="0.03" />
              <stop offset="100%" stopColor="var(--app-accent)" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="outerStroke"
              gradientUnits="userSpaceOnUse"
              cx="0"
              cy="0"
              r={outerFadeEdge}
            >
              <stop offset={`${outerFadeEdgeStart}%`} stopColor="var(--app-text-muted)" stopOpacity="0.6" />
              <stop offset="87%" stopColor="var(--app-text-muted)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--app-text-muted)" stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="outerStrokeActive"
              gradientUnits="userSpaceOnUse"
              cx="0"
              cy="0"
              r={outerFadeEdge}
            >
              <stop offset={`${outerFadeEdgeStart}%`} stopColor="var(--app-accent-glow)" stopOpacity="0.75" />
              <stop offset="87%" stopColor="var(--app-accent-glow)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--app-accent-glow)" stopOpacity="0" />
            </radialGradient>
            
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Outer Ring - Category Switcher */}
          <circle cx="0" cy="0" r={outerHaloRadius} fill="url(#outerHalo)" />
          <g ref={outerRingRef}>
            {rings.map((ring, ringIndex) => {
            const segmentAngle = (Math.PI * 2) / rings.length;
            const startAngle = ringIndex * segmentAngle - Math.PI / 2;
            const endAngle = startAngle + segmentAngle;
            const isActive = ringIndex === activeRing;
            const isHovered = hoveredRingIndex === ringIndex;
            const isHot = isActive || isHovered;

            const x1 = Math.cos(startAngle) * outerRadiusMin;
            const y1 = Math.sin(startAngle) * outerRadiusMin;
            const x2 = Math.cos(startAngle) * outerRadiusMax;
            const y2 = Math.sin(startAngle) * outerRadiusMax;
            const x3 = Math.cos(endAngle) * outerRadiusMax;
            const y3 = Math.sin(endAngle) * outerRadiusMax;
            const x4 = Math.cos(endAngle) * outerRadiusMin;
            const y4 = Math.sin(endAngle) * outerRadiusMin;

            const pathData = `
              M ${x1} ${y1}
              L ${x2} ${y2}
              A ${outerRadiusMax} ${outerRadiusMax} 0 0 1 ${x3} ${y3}
              L ${x4} ${y4}
              A ${outerRadiusMin} ${outerRadiusMin} 0 0 0 ${x1} ${y1}
            `;
            const innerArcPath = `
              M ${x4} ${y4}
              A ${outerRadiusMin} ${outerRadiusMin} 0 0 0 ${x1} ${y1}
            `;
            const radialEdgesPath = `
              M ${x1} ${y1} L ${x2} ${y2}
              M ${x4} ${y4} L ${x3} ${y3}
            `;
            const radialEdgesOuterPath = `
              M ${x2} ${y2} L ${Math.cos(startAngle) * outerFadeEdge} ${Math.sin(startAngle) * outerFadeEdge}
              M ${x3} ${y3} L ${Math.cos(endAngle) * outerFadeEdge} ${Math.sin(endAngle) * outerFadeEdge}
            `;

            const labelAngle = startAngle + segmentAngle / 2;
            const labelRadius = outerRadiusMid;
            const labelX = Math.cos(labelAngle) * labelRadius;
            const labelY = Math.sin(labelAngle) * labelRadius;

            return (
              <g key={ring.id}>
                <path
                  d={pathData}
                  fill={isHot ? 'url(#outerFadeActive)' : 'url(#outerFade)'}
                  filter={isHot ? 'url(#glow)' : undefined}
                  className="transition-all duration-100"
                />
                <path
                  d={innerArcPath}
                  fill="none"
                  stroke={isHot ? 'url(#outerStrokeActive)' : 'url(#outerStroke)'}
                  strokeWidth={isHot ? 1.5 : 1}
                  className="transition-all duration-100"
                />
                <path
                  d={radialEdgesPath}
                  fill="none"
                  stroke={isHot ? 'url(#outerStrokeActive)' : 'url(#outerStroke)'}
                  strokeWidth={isHot ? 1.5 : 1}
                  className="transition-all duration-100"
                />
                <path
                  d={radialEdgesOuterPath}
                  fill="none"
                  stroke={isHot ? 'url(#outerFadeActive)' : 'url(#outerFade)'}
                  strokeWidth={isHot ? 1.5 : 1}
                  className="transition-all duration-100"
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isHot ? 'var(--app-text)' : 'var(--app-text-muted)'}
                  className="text-xs select-none pointer-events-none"
                >
                  {ring.label}
                </text>
              </g>
            );
          })}
          </g>

          {/* Inner Ring - Action Items */}
          <g ref={innerRingRef}>
            {currentRing.items.map((item, index) => {
            const angle = index * angleStep - Math.PI / 2;
            const isHovered = hoveredItem === item.id;

            const nextAngle = angle + angleStep;

            const x1 = Math.cos(angle) * innerRadiusMin;
            const y1 = Math.sin(angle) * innerRadiusMin;
            const x2 = Math.cos(angle) * innerRadiusMax;
            const y2 = Math.sin(angle) * innerRadiusMax;
            const x3 = Math.cos(nextAngle) * innerRadiusMax;
            const y3 = Math.sin(nextAngle) * innerRadiusMax;
            const x4 = Math.cos(nextAngle) * innerRadiusMin;
            const y4 = Math.sin(nextAngle) * innerRadiusMin;

            const largeArcFlag = angleStep > Math.PI ? 1 : 0;

            const pathData = `
              M ${x1} ${y1}
              L ${x2} ${y2}
              A ${innerRadiusMax} ${innerRadiusMax} 0 ${largeArcFlag} 1 ${x3} ${y3}
              L ${x4} ${y4}
              A ${innerRadiusMin} ${innerRadiusMin} 0 ${largeArcFlag} 0 ${x1} ${y1}
            `;

            const labelAngle = angle + angleStep / 2;
            const labelRadius = 85;
            const labelX = Math.cos(labelAngle) * labelRadius;
            const labelY = Math.sin(labelAngle) * labelRadius;

            return (
              <g key={item.id}>
                <path
                  d={pathData}
                  fill={isHovered ? 'var(--app-accent)' : 'var(--app-panel-hover)'}
                  stroke={isHovered ? 'var(--app-accent)' : 'var(--app-border)'}
                  strokeWidth={isHovered ? '2' : '1'}
                  opacity={isHovered ? 0.95 : 0.7}
                  filter={isHovered ? 'url(#glow)' : undefined}
                  className="transition-all duration-100"
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isHovered ? 'var(--app-text-invert)' : 'var(--app-text-muted)'}
                  className="text-sm select-none pointer-events-none"
                >
                  {item.label}
                </text>
              </g>
            );
          })}
          </g>

          {/* Center cancel zone circle */}
          <circle
            cx="0"
            cy="0"
            r={innerRadiusMin}
            fill="var(--app-panel-alt)"
            opacity="0.9"
            stroke="var(--app-border)"
            strokeWidth="1"
          />
          
          {/* Center cancel indicator */}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--app-text-subtle)"
            className="text-xs select-none pointer-events-none"
          >
            取消
          </text>
        </svg>
      </motion.div>
    </>
  );
}
