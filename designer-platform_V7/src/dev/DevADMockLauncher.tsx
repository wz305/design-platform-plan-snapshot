/**
 * DevADMockLauncher.tsx
 * --------------------------------------------------------------------
 * Dev-only launcher for ADMockES3 demo (UI-independent, low coupling).
 *
 * Features:
 * 1) Expose window.runADMockES3Demo()
 * 2) Optional floating button to run the demo
 * 3) Optional auto-run smoke test in DEV
 * --------------------------------------------------------------------
 */

import React from "react";
import { createDevConsoleBus } from "@/dev_console/dev_console_bus";
import { installConsoleBridge } from "@/dev_console/console_bridge";

declare global {
  interface Window {
    __devConsoleBus?: ReturnType<typeof createDevConsoleBus>;
    runADMockES3Demo?: () => Promise<{ result: any; store: any }>;
    __lastTaskResult?: any;
    __lastMockStore?: any;
  }
}

const SHOW_FLOATING_BUTTON = true;
const AUTO_RUN_ON_MOUNT = false;

async function loadRunner() {
  const mod = await import("@/admock_es3/demo_runner");
  return mod;
}

async function runDemo() {
  const { runADMockES3Demo } = await loadRunner();
  const { result, store } = runADMockES3Demo();

  window.__lastTaskResult = result;
  window.__lastMockStore = store;

  console.log("[ADMockES3] 演示完成，是否成功=", result?.success);
  console.log("[ADMockES3] 对象数量=", store?.objects?.length);
  console.log("[ADMockES3] 日志数量=", store?.logs?.length);

  return { result, store };
}

export function DevADMockLauncher() {
  React.useEffect(() => {
    if (!window.__devConsoleBus) {
      window.__devConsoleBus = createDevConsoleBus();
      window.__devConsoleBus.setMaxEntries(3000);
    }

    const bridge = installConsoleBridge(window.__devConsoleBus, {
      mirrorClear: true,
      enableDebug: true,
      enableInfo: true,
      sourcePrefix: "console",
    });

    window.runADMockES3Demo = runDemo;

    if (AUTO_RUN_ON_MOUNT) {
      void runDemo();
    }

    return () => {
      bridge.uninstall();
      if (window.runADMockES3Demo === runDemo) {
        delete window.runADMockES3Demo;
      }
    };
  }, []);

  if (!SHOW_FLOATING_BUTTON) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        right: 12,
        bottom: 12,
        zIndex: 9999,
        display: "flex",
        gap: 8,
        alignItems: "center",
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={() => void runDemo()}
        style={{
          padding: "6px 10px",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(0,0,0,0.35)",
          color: "rgba(255,255,255,0.85)",
          cursor: "pointer",
        }}
        title="运行 ADMock 演示（仅开发）"
      >
        运行 ADMock 演示
      </button>
    </div>
  );
}
