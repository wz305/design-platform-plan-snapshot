/**
 * console_bridge.ts
 * --------------------------------------------------------------------
 * Console bridge: intercept window.console and push logs into DevConsoleBus.
 *
 * Constraints:
 * - Preserve original console behavior
 * - Avoid recursion
 * - Provide uninstall for HMR
 * --------------------------------------------------------------------
 */

import type { DevConsoleBus } from "./dev_console_bus";
import type { DevConsoleLevel } from "./dev_console_types";

export interface ConsoleBridgeOptions {
  enableDebug?: boolean;
  enableInfo?: boolean;
  mirrorClear?: boolean;
  sourcePrefix?: string;
}

export interface ConsoleBridgeHandle {
  uninstall: () => void;
}

export function installConsoleBridge(
  bus: DevConsoleBus,
  options?: ConsoleBridgeOptions
): ConsoleBridgeHandle {
  const opt: Required<ConsoleBridgeOptions> = {
    enableDebug: options?.enableDebug ?? true,
    enableInfo: options?.enableInfo ?? true,
    mirrorClear: options?.mirrorClear ?? true,
    sourcePrefix: options?.sourcePrefix ?? "console",
  };

  const c = window.console;
  const original = {
    log: c.log?.bind(c),
    warn: c.warn?.bind(c),
    error: c.error?.bind(c),
    debug: c.debug?.bind(c),
    info: c.info?.bind(c),
    clear: c.clear?.bind(c),
  };

  let locked = false;

  function wrap(level: DevConsoleLevel, fn?: (...args: any[]) => void) {
    return (...args: any[]) => {
      try {
        fn?.(...args);
      } catch (_e) {
        // ignore
      }

      if (locked) return;

      locked = true;
      try {
        bus.push(level, args, `${opt.sourcePrefix}.${level}`);
      } finally {
        locked = false;
      }
    };
  }

  c.log = wrap("log", original.log) as any;
  c.warn = wrap("warn", original.warn) as any;
  c.error = wrap("error", original.error) as any;

  if (opt.enableDebug && c.debug) c.debug = wrap("debug", original.debug) as any;
  if (opt.enableInfo && c.info) c.info = wrap("info", original.info) as any;

  if (opt.mirrorClear && c.clear) {
    c.clear = (() => {
      try {
        original.clear?.();
      } catch (_e) {
        // ignore
      }
      if (locked) return;
      locked = true;
      try {
        bus.clear();
      } finally {
        locked = false;
      }
    }) as any;
  }

  return {
    uninstall: () => {
      if (original.log) c.log = original.log as any;
      if (original.warn) c.warn = original.warn as any;
      if (original.error) c.error = original.error as any;
      if (original.debug) c.debug = original.debug as any;
      if (original.info) c.info = original.info as any;
      if (original.clear) c.clear = original.clear as any;
    },
  };
}
