/**
 * dev_console_types.ts
 * --------------------------------------------------------------------
 * Dev Console data structures.
 * --------------------------------------------------------------------
 */

export type DevConsoleLevel = "log" | "info" | "warn" | "error" | "debug";

export interface DevConsoleEntry {
  id: number;
  ts: number;
  level: DevConsoleLevel;
  text: string;
  args: any[];
  source?: string;
}
