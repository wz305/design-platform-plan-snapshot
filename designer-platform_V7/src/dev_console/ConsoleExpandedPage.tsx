/**
 * ConsoleExpandedPage.tsx
 * --------------------------------------------------------------------
 * Console expanded view content (DEV-only data source).
 * --------------------------------------------------------------------
 */

import React from "react";
import { DevConsoleView } from "./DevConsoleView";
import type { DevConsoleBus } from "./dev_console_bus";

export function ConsoleExpandedPage() {
  const bus = (window as any).__devConsoleBus as DevConsoleBus | undefined;

  if (!bus) {
    return (
      <div style={{ padding: 12, opacity: 0.7, color: "var(--app-console-dim)" }}>
        控制台未初始化。
      </div>
    );
  }

  return <DevConsoleView bus={bus} />;
}
