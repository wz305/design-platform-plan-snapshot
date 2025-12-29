var fs = require("fs");
var path = require("path");

var PCBObjectPool = require("../src/modules/pcb-interfaces/core/PCBObjectPool.js");

function run() {
  var results = [];
  function check(name, ok, detail) {
    results.push({ name: name, ok: !!ok, detail: detail || "" });
  }

  PCBObjectPool.reset("test");

  var wrapper = { handle: 1001, address: 2001, objectType: "Track", directRef: { I_ObjectAddress: 1001 } };
  PCBObjectPool.register(wrapper);

  check("register/getByHandle", PCBObjectPool.getByHandle(1001) === wrapper, "handle=1001");
  check("register/getByAddress", PCBObjectPool.getByAddress(2001) === wrapper, "address=2001");

  PCBObjectPool.invalidate(1001);
  check("invalidate", PCBObjectPool.getByHandle(1001) === null, "after invalidate");

  PCBObjectPool.register(wrapper);
  PCBObjectPool.reset("test-reset");
  check("reset", PCBObjectPool.getByHandle(1001) === null, "after reset");

  var stats = PCBObjectPool.stats();
  check("stats", stats && stats.total === 0, "total=" + (stats ? stats.total : "null"));

  return results;
}

var report = {
  ok: true,
  at: new Date().toISOString(),
  results: run()
};

for (var i = 0; i < report.results.length; i++) {
  if (!report.results[i].ok) report.ok = false;
}

var outPath = path.join(__dirname, "..", "reports", "pcb-object-pool-test-report.json");
fs.writeFileSync(outPath, JSON.stringify(report, null, 2), "utf8");

console.log("[pcb-object-pool-test] ok=" + report.ok + " -> " + outPath);
