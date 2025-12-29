/**
 * DevConsoleView.tsx
 * --------------------------------------------------------------------
 * UI console view for the Console expanded panel.
 *
 * Notes:
 * - No dependency on Dock/Panel implementation
 * - Requires a bus instance
 * - Supports filter/search/clear/auto-scroll
 * --------------------------------------------------------------------
 */

import React from "react";
import anime from "animejs";
import type { DevConsoleBus } from "./dev_console_bus";
import type { DevConsoleEntry, DevConsoleLevel } from "./dev_console_types";

function useBusSnapshot(bus: DevConsoleBus): readonly DevConsoleEntry[] {
  return React.useSyncExternalStore(bus.subscribe, bus.getSnapshot, bus.getSnapshot);
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  return `${hh}:${mm}:${ss}.${ms}`;
}

const LEVELS: DevConsoleLevel[] = ["log", "info", "warn", "error", "debug"];
const LEVEL_LABELS: Record<DevConsoleLevel, string> = {
  log: "日志",
  info: "信息",
  warn: "警告",
  error: "错误",
  debug: "调试",
};

export function DevConsoleView(props: { bus: DevConsoleBus }) {
  const { bus } = props;
  const entries = useBusSnapshot(bus);

  const [levelEnabled, setLevelEnabled] = React.useState<Record<DevConsoleLevel, boolean>>({
    log: true,
    info: true,
    warn: true,
    error: true,
    debug: true,
  });

  const [search, setSearch] = React.useState<string>("");
  const [autoScroll, setAutoScroll] = React.useState<boolean>(true);

  const listRef = React.useRef<HTMLDivElement | null>(null);
  const lastAnimatedIdRef = React.useRef<number>(0);
  const reduceMotionRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reduceMotionRef.current = media.matches;
    };
    update();
    if ("addEventListener" in media) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  React.useEffect(() => {
    if (!listRef.current) return;
    if (entries.length === 0) {
      lastAnimatedIdRef.current = 0;
      return;
    }

    const newestId = entries[entries.length - 1].id;
    const lastSeen = lastAnimatedIdRef.current;
    if (newestId <= lastSeen) return;

    const newIds = entries.filter((entry) => entry.id > lastSeen).map((entry) => entry.id);
    lastAnimatedIdRef.current = newestId;

    if (reduceMotionRef.current) return;

    const highlight =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--app-console-highlight")
        .trim() || "rgba(59,130,246,0.18)";
    const container = listRef.current;
    requestAnimationFrame(() => {
      newIds.forEach((id) => {
        const row = container.querySelector(`[data-entry-id="${id}"]`) as HTMLElement | null;
        if (!row) return;
        row.style.backgroundColor = highlight;
        anime.remove(row);
        anime({
          targets: row,
          translateY: [6, 0],
          opacity: [0, 1],
          duration: 240,
          easing: "easeOutCubic",
        });
        anime({
          targets: row,
          backgroundColor: [highlight, "rgba(0,0,0,0)"],
          duration: 520,
          easing: "easeOutQuad",
          delay: 60,
        });
      });
    });
  }, [entries]);

  React.useEffect(() => {
    if (!autoScroll) return;
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [entries.length, autoScroll]);

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    const out: DevConsoleEntry[] = [];
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      if (!levelEnabled[e.level]) continue;
      if (q) {
        const t = (e.text || "").toLowerCase();
        const s = (e.source || "").toLowerCase();
        if (t.indexOf(q) === -1 && s.indexOf(q) === -1) continue;
      }
      out.push(e);
    }
    return out;
  }, [entries, levelEnabled, search]);

  function toggleLevel(level: DevConsoleLevel) {
    setLevelEnabled((prev) => ({ ...prev, [level]: !prev[level] }));
  }

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          padding: 8,
          color: "var(--app-console-muted)",
          backgroundColor: "var(--app-console-bg)",
          borderBottom: "1px solid var(--app-console-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <strong style={{ opacity: 0.9, color: "var(--app-console-text)" }}>控制台</strong>
          <div style={{ flex: 1 }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索..."
            style={{
              width: 200,
              padding: "2px 6px",
              borderRadius: 4,
              border: "1px solid var(--app-console-border)",
              backgroundColor: "var(--app-console-bg)",
              color: "var(--app-console-text)",
            }}
          />
          <button
            onClick={() => bus.clear()}
            style={{
              padding: "2px 8px",
              borderRadius: 4,
              border: "1px solid var(--app-console-border)",
              backgroundColor: "var(--app-panel-alt)",
              color: "var(--app-console-text)",
            }}
          >
            清空
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, opacity: 0.85 }}>筛选</span>
          {LEVELS.map((lv) => (
            <label
              key={lv}
              style={{ display: "flex", gap: 4, alignItems: "center", opacity: 0.85 }}
            >
              <input
                type="checkbox"
                checked={levelEnabled[lv]}
                onChange={() => toggleLevel(lv)}
              />
              <span>{LEVEL_LABELS[lv]}</span>
            </label>
          ))}
          <div style={{ flex: 1 }} />
          <label style={{ display: "flex", gap: 6, alignItems: "center", opacity: 0.85 }}>
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
            />
            <span>自动滚动</span>
          </label>
        </div>
      </div>

      <div
        ref={listRef}
        style={{
          flex: 1,
          overflow: "auto",
          padding: 8,
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 12,
          lineHeight: 1.4,
          backgroundColor: "var(--app-console-bg)",
          color: "var(--app-console-text)",
          borderTop: "1px solid var(--app-console-border)",
        }}
      >
        {filtered.length === 0 ? (
          <div style={{ opacity: 0.6, color: "var(--app-console-dim)" }}>暂无日志。</div>
        ) : (
          filtered.map((e) => {
            const sourceTagRaw = e.source || "系统";
            const sourceTag =
              sourceTagRaw === "console" ? "控制台" : sourceTagRaw;
            const levelTag = LEVEL_LABELS[e.level] || e.level;
            return (
              <div
                key={e.id}
                data-entry-id={e.id}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "4px 6px",
                  opacity: 0.9,
                  borderBottom: "1px dashed var(--app-console-divider)",
                  borderRadius: 6,
                }}
                title={e.source || ""}
              >
                <span
                  style={{ opacity: 0.7, whiteSpace: "nowrap", color: "var(--app-console-time)" }}
                >
                  {formatTime(e.ts)}
                </span>
                <span
                  style={{ flex: 1, whiteSpace: "pre-wrap", color: "var(--app-console-text)" }}
                >
                  [{sourceTag}][{levelTag}] {e.text}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
