/**
 * dev_console_bus.ts
 * --------------------------------------------------------------------
 * Dev Console bus (global singleton).
 *
 * Notes:
 * - No React dependency
 * - subscribe/snapshot/clear
 * - No console calls (avoid recursion)
 * - Max capacity to prevent memory blow-up
 * --------------------------------------------------------------------
 */

import type { DevConsoleEntry, DevConsoleLevel } from "./dev_console_types";

export interface DevConsoleBus {
  push: (level: DevConsoleLevel, args: any[], source?: string) => DevConsoleEntry;
  clear: () => void;
  getSnapshot: () => readonly DevConsoleEntry[];
  subscribe: (listener: () => void) => () => void;
  setMaxEntries: (max: number) => void;
}

function toShortString(v: any): string {
  try {
    if (v == null) return String(v);
    const t = typeof v;
    if (t === "string") return v;
    if (t === "number" || t === "boolean") return String(v);
    if (t === "function") return `[Function ${v.name || "anonymous"}]`;

    if (v instanceof Date) return v.toISOString();
    if (v instanceof Error) return `${v.name}: ${v.message}`;

    try {
      const s = JSON.stringify(v);
      if (s && s.length <= 300) return s;
      if (s) return s.slice(0, 300) + "...";
    } catch (_e) {
      // ignore
    }

    const s2 = String(v);
    if (s2.length <= 300) return s2;
    return s2.slice(0, 300) + "...";
  } catch (e) {
    return `[Unprintable: ${String(e)}]`;
  }
}

function formatArgs(args: any[]): string {
  const parts: string[] = [];
  for (let i = 0; i < args.length; i++) {
    parts.push(toShortString(args[i]));
  }
  return parts.join(" ");
}

export function createDevConsoleBus(): DevConsoleBus {
  let nextId = 1;
  let maxEntries = 2000;

  const entries: DevConsoleEntry[] = [];
  let snapshot: readonly DevConsoleEntry[] = [];
  const listeners = new Set<() => void>();

  function emit() {
    snapshot = entries.slice();
    listeners.forEach((fn) => {
      try {
        fn();
      } catch (_e) {
        // ignore subscriber errors
      }
    });
  }

  function push(level: DevConsoleLevel, args: any[], source?: string): DevConsoleEntry {
    const entry: DevConsoleEntry = {
      id: nextId++,
      ts: Date.now(),
      level,
      text: formatArgs(args),
      args,
      source,
    };

    entries.push(entry);

    if (entries.length > maxEntries) {
      entries.splice(0, entries.length - maxEntries);
    }

    emit();
    return entry;
  }

  function clear() {
    entries.length = 0;
    emit();
  }

  function getSnapshot() {
    return snapshot;
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function setMaxEntries(max: number) {
    maxEntries = Math.max(200, Math.floor(max));
    if (entries.length > maxEntries) {
      entries.splice(0, entries.length - maxEntries);
      emit();
    }
  }

  return { push, clear, getSnapshot, subscribe, setMaxEntries };
}
