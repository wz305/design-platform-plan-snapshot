/**
 * connection-panel.js
 *
 * Connection Manager 子面板（ES3）
 * - SSE: /api/events
 * - 状态: /api/status
 * - 最新报告: /api/latest-report
 */
(function () {
  var isLocal = false;
  try {
    var host = (location && location.hostname) ? location.hostname : "";
    isLocal = (host === "127.0.0.1" || host === "localhost");
  } catch (e0) {}
  if (!isLocal) return;

  var state = {
    es: null,
    connected: false,
    baseUrl: "",
    lastEvent: "",
    lastError: ""
  };

  function nowStr() {
    var d = new Date();
    return d.toLocaleString();
  }

  function apiUrl(path) {
    if (state.baseUrl) return state.baseUrl + path;
    return path;
  }

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) {
      var k;
      for (k in attrs) node.setAttribute(k, attrs[k]);
    }
    if (typeof text === "string") node.textContent = text;
    return node;
  }

  var root = el("div", { style:
    "position:fixed; right:16px; bottom:16px; width:360px;" +
    "background:#111; color:#eee; border:1px solid #333; border-radius:10px;" +
    "font:12px/1.4 Consolas,monospace; z-index:999999; padding:10px;"
  });

  var header = el("div", { style: "display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; cursor:move; user-select:none;" });
  header.appendChild(el("div", { style: "font-weight:bold;" }, "Connection Manager"));
  var badge = el("div", { style: "padding:2px 8px; border-radius:999px; background:#333;" }, "DISCONNECTED");
  header.appendChild(badge);
  root.appendChild(header);

  var rowBase = el("div", { style: "display:flex; gap:6px; margin-bottom:8px;" });
  var inputBase = el("input", { style: "flex:1; padding:4px 6px; background:#222; color:#eee; border:1px solid #333; border-radius:6px;",
    placeholder: "API Base (blank = same-origin /api)"
  });
  var btnApply = el("button", { style: "padding:4px 8px; background:#222; color:#eee; border:1px solid #444; border-radius:6px; cursor:pointer;" }, "Apply");
  rowBase.appendChild(inputBase);
  rowBase.appendChild(btnApply);
  root.appendChild(rowBase);

  var rowBtns = el("div", { style: "display:flex; gap:6px; margin-bottom:8px;" });
  var btnConnect = el("button", { style: "flex:1; padding:6px 8px; background:#1f2937; color:#fff; border:1px solid #334155; border-radius:6px; cursor:pointer;" }, "Connect SSE");
  var btnDisconnect = el("button", { style: "flex:1; padding:6px 8px; background:#3f1f1f; color:#fff; border:1px solid #553333; border-radius:6px; cursor:pointer;" }, "Disconnect");
  var btnRefresh = el("button", { style: "flex:1; padding:6px 8px; background:#222; color:#fff; border:1px solid #444; border-radius:6px; cursor:pointer;" }, "Refresh");
  rowBtns.appendChild(btnConnect);
  rowBtns.appendChild(btnDisconnect);
  rowBtns.appendChild(btnRefresh);
  root.appendChild(rowBtns);

  var info = el("pre", { style: "white-space:pre-wrap; background:#0b0b0b; border:1px solid #222; border-radius:8px; padding:8px; margin:0;" }, "");
  root.appendChild(info);

  document.body.appendChild(root);

  function enableDrag(rootEl, handleEl) {
    var dragging = false;
    var startX = 0;
    var startY = 0;
    var startLeft = 0;
    var startTop = 0;

    function onMove(e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      var nextLeft = startLeft + dx;
      var nextTop = startTop + dy;
      var maxLeft = Math.max(0, window.innerWidth - rootEl.offsetWidth);
      var maxTop = Math.max(0, window.innerHeight - rootEl.offsetHeight);
      if (nextLeft < 0) nextLeft = 0;
      if (nextTop < 0) nextTop = 0;
      if (nextLeft > maxLeft) nextLeft = maxLeft;
      if (nextTop > maxTop) nextTop = maxTop;
      rootEl.style.left = nextLeft + "px";
      rootEl.style.top = nextTop + "px";
    }

    function onUp() {
      if (!dragging) return;
      dragging = false;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    }

    function onDown(e) {
      if (e.button !== 0) return;
      dragging = true;
      var rect = rootEl.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      startLeft = rect.left;
      startTop = rect.top;
      rootEl.style.left = rect.left + "px";
      rootEl.style.top = rect.top + "px";
      rootEl.style.right = "auto";
      rootEl.style.bottom = "auto";
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
      try { e.preventDefault(); } catch (e0) {}
    }

    handleEl.addEventListener("mousedown", onDown);
  }

  enableDrag(root, header);

  function setBadge(ok) {
    state.connected = ok;
    if (ok) {
      badge.textContent = "CONNECTED";
      badge.style.background = "#14532d";
    } else {
      badge.textContent = "DISCONNECTED";
      badge.style.background = "#333";
    }
  }

  function render(text) {
    info.textContent = text;
  }

  function fetchJson(url, cb) {
    fetch(url).then(function (r) {
      return r.json();
    }).then(function (j) {
      cb(null, j);
    }).catch(function (e) {
      cb(e, null);
    });
  }

  function refreshAll() {
    var lines = [];
    lines.push("Time: " + nowStr());
    lines.push("BaseUrl: " + (state.baseUrl || "(same-origin)"));
    lines.push("SSE: " + (state.connected ? "connected" : "disconnected"));
    if (state.lastEvent) lines.push("LastEvent: " + state.lastEvent);
    if (state.lastError) lines.push("LastError: " + state.lastError);

    fetchJson(apiUrl("/api/status"), function (err, data) {
      if (err || !data || !data.ok) {
        lines.push("");
        lines.push("[/api/status] failed");
        render(lines.join("\n"));
        return;
      }
      lines.push("");
      lines.push("[/api/status]");
      lines.push("serverStartedAt: " + data.state.serverStartedAt);
      lines.push("lastUploadAt: " + data.state.lastUploadAt);
      lines.push("lastUploadFile: " + data.state.lastUploadFile);
      lines.push("sseClients: " + data.sseClients);

      fetchJson(apiUrl("/api/latest-report?full=0"), function (err2, data2) {
        lines.push("");
        lines.push("[/api/latest-report]");
        if (err2 || !data2 || !data2.ok) {
          lines.push("no report");
          render(lines.join("\n"));
          return;
        }
        if (data2.meta && data2.meta.type === "command") {
          lines.push("type: command");
          if (data2.report) {
            lines.push("cmd: " + data2.report.cmd);
            lines.push("ok: " + data2.report.ok);
            lines.push("at: " + data2.report.at);
          }
        } else if (data2.meta) {
          lines.push("type: upload");
          lines.push("savedAs: " + data2.meta.savedAs);
          lines.push("uploadedAt: " + data2.meta.uploadedAt);
          lines.push("size: " + data2.meta.size);
        }
        render(lines.join("\n"));
      });
    });
  }

  function connectSSE() {
    try {
      if (state.es) {
        state.es.close();
        state.es = null;
      }

      var url = apiUrl("/api/events");
      state.es = new EventSource(url);

      state.es.onopen = function () {
        state.lastError = "";
        setBadge(true);
        refreshAll();
      };

      state.es.onerror = function () {
        state.lastError = "SSE error @ " + nowStr();
        setBadge(false);
        refreshAll();
      };

      state.es.addEventListener("report_uploaded", function () {
        state.lastEvent = "report_uploaded @ " + nowStr();
        refreshAll();
      });

      state.es.addEventListener("report", function () {
        state.lastEvent = "report @ " + nowStr();
        refreshAll();
      });

      state.es.addEventListener("status", function () {
        state.lastEvent = "status @ " + nowStr();
      });
    } catch (e) {
      state.lastError = "" + e;
      setBadge(false);
      refreshAll();
    }
  }

  function disconnectSSE() {
    if (state.es) {
      try { state.es.close(); } catch (e) {}
      state.es = null;
    }
    setBadge(false);
    refreshAll();
  }

  btnApply.onclick = function () {
    state.baseUrl = (inputBase.value || "").replace(/\/+$/, "");
    refreshAll();
  };
  btnConnect.onclick = function () { connectSSE(); };
  btnDisconnect.onclick = function () { disconnectSSE(); };
  btnRefresh.onclick = function () { refreshAll(); };

  refreshAll();
  connectSSE();
})();
