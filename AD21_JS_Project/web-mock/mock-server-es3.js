/**
 * mock-server-es3.js
 * 浏览器侧（本地服务）Mock Server：为 AD 提供最小可用 HTTP 接口
 *
 * M0: GET  /ping -> "pong"
 * M1: POST /api/command -> JSON { ok, id, data/error }
 *
 * 注意：
 * - 采用 Node http 原生实现，避免引入框架
 * - 代码保持 ES3 风格（var/function），便于对齐 AD 侧编码习惯
 */

var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");

var PORT = 8080;

// -----------------------------
// 运行时状态（给 /api/status）
// -----------------------------
var runtimeState = {
  serverStartedAt: Date.now(),
  lastUploadAt: 0,
  lastUploadFile: "",
  lastUploadSize: 0,
  lastObjectUploadAt: 0,
  lastObjectUploadFile: "",
  lastObjectUploadSize: 0,
  lastObjectUploadCount: 0,
  lastEventAt: 0,
  lastEventName: "",
  lastCommandAt: 0,
  lastReport: null
};

// -----------------------------
// SSE 客户端池
// -----------------------------
var sseClients = []; // [{ id, res, connectedAt }]

function sendJson(res, statusCode, obj) {
  var body = JSON.stringify(obj);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(body);
}

function sendText(res, statusCode, text) {
  res.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "Access-Control-Allow-Origin": "*"
  });
  res.end(text);
}

function sendFile(res, statusCode, filePath, contentType) {
  try {
    var buf = fs.readFileSync(filePath);
    res.writeHead(statusCode, {
      "Content-Type": contentType || "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    });
    res.end(buf);
  } catch (e) {
    sendText(res, 404, "Not Found: " + filePath);
  }
}

function readBody(req, cb) {
  var chunks = [];
  req.on("data", function (c) {
    chunks.push(c);
  });
  req.on("end", function () {
    var body = Buffer.concat(chunks).toString("utf8");
    cb(null, body);
  });
  req.on("error", function (e) {
    cb(e, null);
  });
}

/**
 * SSE：向所有已连接的浏览器推送事件
 * @param {String} eventName
 * @param {Object} data
 */
function broadcastSSE(eventName, data) {
  var payload = "";
  payload += "event: " + eventName + "\n";
  payload += "data: " + JSON.stringify(data) + "\n\n";

  runtimeState.lastEventAt = Date.now();
  runtimeState.lastEventName = eventName;

  var next = [];
  var i;
  for (i = 0; i < sseClients.length; i++) {
    try {
      sseClients[i].res.write(payload);
      next.push(sseClients[i]);
    } catch (e) {}
  }
  sseClients = next;
}

function ensureDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  } catch (e) {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);
  }
}

function saveReportFile(baseDir, jsonText) {
  ensureDir(baseDir);

  var ts = new Date();
  var stamp =
    ts.getFullYear() +
    "-" + ("0" + (ts.getMonth() + 1)).slice(-2) +
    "-" + ("0" + ts.getDate()).slice(-2) +
    "_" + ("0" + ts.getHours()).slice(-2) +
    "-" + ("0" + ts.getMinutes()).slice(-2) +
    "-" + ("0" + ts.getSeconds()).slice(-2) +
    "-" + ("00" + ts.getMilliseconds()).slice(-3);

  var filename = "environment-probe-report-" + stamp + ".json";
  var savedAs = path.join(baseDir, filename);

  fs.writeFileSync(savedAs, jsonText, "utf8");

  runtimeState.lastUploadAt = Date.now();
  runtimeState.lastUploadFile = savedAs;
  runtimeState.lastUploadSize = Buffer.byteLength(jsonText, "utf8");

  return savedAs;
}

function saveObjectsFile(baseDir, jsonText) {
  ensureDir(baseDir);

  var ts = new Date();
  var stamp =
    ts.getFullYear() +
    "-" + ("0" + (ts.getMonth() + 1)).slice(-2) +
    "-" + ("0" + ts.getDate()).slice(-2) +
    "_" + ("0" + ts.getHours()).slice(-2) +
    "-" + ("0" + ts.getMinutes()).slice(-2) +
    "-" + ("0" + ts.getSeconds()).slice(-2);

  var filename = "object-index-" + stamp + ".json";
  var savedAs = path.join(baseDir, filename);

  fs.writeFileSync(savedAs, jsonText, "utf8");

  runtimeState.lastObjectUploadAt = Date.now();
  runtimeState.lastObjectUploadFile = savedAs;
  runtimeState.lastObjectUploadSize = Buffer.byteLength(jsonText, "utf8");

  return savedAs;
}

function dispatchCommand(reqObj) {
  var cmd = reqObj && reqObj.cmd;
  var params = (reqObj && reqObj.params) || {};

  if (cmd === "mock.echo") {
    return { ok: true, data: { echo: params } };
  }

  if (cmd === "mock.board.summary") {
    return {
      ok: true,
      data: {
        name: "MockBoard",
        units: "mil",
        bounds: { x1: 0, y1: 0, x2: 100000, y2: 80000 },
        primitives: { track: 123, via: 45, pad: 67 },
        note: "Replace with real AD query later"
      }
    };
  }

  return {
    ok: false,
    error: { code: "UNKNOWN_CMD", message: "Unknown cmd: " + cmd }
  };
}

var server = http.createServer(function (req, res) {
  var parsed = new url.URL(req.url, "http://127.0.0.1:" + PORT);
  var pathname = parsed.pathname;

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    res.end();
    return;
  }

  if (req.method === "GET" && pathname === "/ping") {
    sendText(res, 200, "pong");
    return;
  }

  if (req.method === "GET" && (pathname === "/" || pathname === "/status" || pathname === "/diagnostics")) {
    var statusPath = path.join(__dirname, "status.html");
    sendFile(res, 200, statusPath, "text/html; charset=utf-8");
    return;
  }

  if (req.method === "GET" && pathname === "/api/events") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*"
    });

    res.write(": connected\n\n");

    var client = {
      id: "c_" + Date.now() + "_" + Math.floor(Math.random() * 100000),
      res: res,
      connectedAt: Date.now()
    };
    sseClients.push(client);

    broadcastSSE("status", {
      ok: true,
      serverStartedAt: runtimeState.serverStartedAt,
      lastUploadAt: runtimeState.lastUploadAt,
      lastUploadFile: runtimeState.lastUploadFile
    });

    req.on("close", function () {
      var next = [];
      var i;
      for (i = 0; i < sseClients.length; i++) {
        if (sseClients[i].id !== client.id) next.push(sseClients[i]);
      }
      sseClients = next;
    });

    return;
  }

  if (req.method === "GET" && pathname === "/api/status") {
    sendJson(res, 200, {
      ok: true,
      state: runtimeState,
      sseClients: sseClients.length
    });
    return;
  }

  if (req.method === "GET" && pathname === "/api/latest-report") {
    var full = parsed && parsed.query && parsed.query.full === "1";
    var result = { ok: true, meta: null, report: null };

    if (runtimeState.lastReport) {
      result.meta = {
        type: "command",
        at: runtimeState.lastCommandAt
      };
      result.report = runtimeState.lastReport;
    } else if (runtimeState.lastUploadFile && fs.existsSync(runtimeState.lastUploadFile)) {
      result.meta = {
        type: "upload",
        savedAs: runtimeState.lastUploadFile,
        uploadedAt: runtimeState.lastUploadAt,
        size: runtimeState.lastUploadSize
      };
      if (full) {
        try {
          result.report = JSON.parse(fs.readFileSync(runtimeState.lastUploadFile, "utf8"));
        } catch (e0) {
          result.ok = false;
          result.error = "Report parse failed: " + String(e0);
        }
      }
    } else {
      result.ok = false;
      result.error = "No report available";
    }

    sendJson(res, 200, result);
    return;
  }

  if (req.method === "POST" && pathname === "/api/command") {
    readBody(req, function (err, bodyText) {
      if (err) {
        sendJson(res, 500, {
          ok: false,
          error: { code: "READ_BODY_FAILED", message: String(err) }
        });
        return;
      }

      var reqObj = null;
      try {
        reqObj = JSON.parse(bodyText || "{}");
      } catch (e) {
        sendJson(res, 400, {
          ok: false,
          error: { code: "BAD_JSON", message: String(e) }
        });
        return;
      }

      var result = dispatchCommand(reqObj);
      if (result.ok) {
        runtimeState.lastCommandAt = Date.now();
        runtimeState.lastReport = {
          id: reqObj.id || null,
          cmd: reqObj.cmd || "",
          ok: true,
          data: result.data,
          at: runtimeState.lastCommandAt
        };
        broadcastSSE("report", runtimeState.lastReport);
        sendJson(res, 200, { ok: true, id: reqObj.id || null, data: result.data });
      } else {
        runtimeState.lastCommandAt = Date.now();
        runtimeState.lastReport = {
          id: reqObj.id || null,
          cmd: reqObj.cmd || "",
          ok: false,
          error: result.error,
          at: runtimeState.lastCommandAt
        };
        broadcastSSE("report", runtimeState.lastReport);
        sendJson(res, 200, { ok: false, id: reqObj.id || null, error: result.error });
      }
    });
    return;
  }

  if (req.method === "POST" && pathname === "/api/upload-report") {
    readBody(req, function (err, bodyText) {
      if (err) {
        sendJson(res, 500, {
          ok: false,
          error: { code: "READ_BODY_FAILED", message: String(err) }
        });
        return;
      }

      var reportObj = null;
      try {
        reportObj = JSON.parse(bodyText || "{}");
      } catch (e1) {
        sendJson(res, 400, {
          ok: false,
          error: { code: "BAD_JSON", message: String(e1) }
        });
        return;
      }

      try {
        var reportsDir = path.resolve(__dirname, "..", "reports");
        var savedAs = saveReportFile(reportsDir, bodyText);

        broadcastSSE("report_uploaded", {
          savedAs: savedAs,
          uploadedAt: runtimeState.lastUploadAt,
          size: runtimeState.lastUploadSize
        });

        sendJson(res, 200, {
          ok: true,
          savedAs: savedAs,
          path: savedAs,
          size: runtimeState.lastUploadSize
        });
        return;
      } catch (e2) {
        sendJson(res, 500, {
          ok: false,
          error: { code: "WRITE_FAILED", message: String(e2) }
        });
        return;
      }
    });
    return;
  }

  if (req.method === "POST" && pathname === "/api/upload-objects") {
    readBody(req, function (err, bodyText) {
      if (err) {
        sendJson(res, 500, {
          ok: false,
          error: { code: "READ_BODY_FAILED", message: String(err) }
        });
        return;
      }

      var reportObj = null;
      try {
        reportObj = JSON.parse(bodyText || "{}");
      } catch (e1) {
        sendJson(res, 400, {
          ok: false,
          error: { code: "BAD_JSON", message: String(e1) }
        });
        return;
      }

      try {
        var reportsDir = path.resolve(__dirname, "..", "reports");
        var savedAs = saveObjectsFile(reportsDir, bodyText);
        var count = 0;
        try {
          if (reportObj && reportObj.payload && typeof reportObj.payload.count === "number") {
            count = reportObj.payload.count;
          } else if (reportObj && reportObj.payload && reportObj.payload.items && reportObj.payload.items.length) {
            count = reportObj.payload.items.length;
          }
        } catch (eCount) {}

        runtimeState.lastObjectUploadCount = count;

        broadcastSSE("objects_uploaded", {
          savedAs: savedAs,
          uploadedAt: runtimeState.lastObjectUploadAt,
          size: runtimeState.lastObjectUploadSize,
          count: count
        });

        sendJson(res, 200, {
          ok: true,
          savedAs: savedAs,
          path: savedAs,
          size: runtimeState.lastObjectUploadSize,
          count: count
        });
        return;
      } catch (e2) {
        sendJson(res, 500, {
          ok: false,
          error: { code: "WRITE_FAILED", message: String(e2) }
        });
        return;
      }
    });
    return;
  }

  sendText(res, 404, "Not Found: " + pathname);
});

server.listen(PORT, "127.0.0.1", function () {
  console.log("[mock-server] listening on http://127.0.0.1:" + PORT);
});
