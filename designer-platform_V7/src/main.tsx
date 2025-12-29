
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import "./dev/diagnostics-panel.js";
import "./dev/connection-panel.js";

  createRoot(document.getElementById("root")!).render(<App />);

  // -----------------------------
  // Diagnostics 面板（仅用于本地调试）
  // -----------------------------
  try {
    if (
      typeof window !== "undefined" &&
      (location.hostname === "127.0.0.1" || location.hostname === "localhost") &&
      (window as any).DiagnosticsPanel &&
      (window as any).DiagnosticsPanel.mount
    ) {
      (window as any).DiagnosticsPanel.mount();
    }
  } catch (e) {}
  
