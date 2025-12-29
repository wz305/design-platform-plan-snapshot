/**
 * demo_runner.ts
 * --------------------------------------------------------------------
 * Dev-only demo runner for ADMockES3. Loads ES3/IIFE modules in order
 * and executes a minimal task to validate CreateTrack/GetObjects/RunProcess.
 * --------------------------------------------------------------------
 */

import "./module_exporter.js";
import "./util_logger.js";
import "./util_timestamp.js";
import "./ref_resolver.js";
import "./step_registry.js";
import "./mock_board_store.js";
import "./mock_pcbserver_factory.js";
import "./mock_iterator.js";
import "./mock_cad_adapter.js";
import "./task_runtime_core.js";
import "./entry_export_admock_es3.js";

export function runADMockES3Demo() {
  const g = window as any;
  if (!g.Entry_ExportADMockES3 || !g.Entry_ExportADMockES3.install) {
    throw new Error("ADMockES3 entry not found on window");
  }

  const api = g.Entry_ExportADMockES3.install();
  const store = api.mock.store.createDefaultStore();
  api.mock.pcb.bindStore(store);

  const pcbServer = api.mock.pcb.PCBServer();
  const adapter = api.mock.adapter.create(store, pcbServer, api.log);

  const milToTCoord = (mil: number) => Math.round(mil * 10000);

  const task = {
    id: "pcb-demo",
    version: "0.2",
    coordUnit: "tcoord",
    steps: [
      {
        id: "t1",
        op: "CreateTrack",
        args: {
          net: "GND",
          layer: "Top",
          from: { x: milToTCoord(10), y: milToTCoord(20) },
          to: { x: milToTCoord(50), y: milToTCoord(20) },
          width: milToTCoord(1),
        },
        saveAs: "track1",
      },
      {
        id: "q1",
        op: "GetObjects",
        args: { type: "Track", net: "GND" },
        saveAs: "gndTracks",
      },
      {
        id: "z1",
        op: "RunProcess",
        args: { server: "PCB", process: "PCB:Zoom", params: "Action=Redraw" },
      },
    ],
  };

  const result = api.runtime.runTask(task, adapter, { logger: api.log });

  return { result, store, api };
}
