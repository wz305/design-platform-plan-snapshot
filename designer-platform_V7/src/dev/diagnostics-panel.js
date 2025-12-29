/**
 * diagnostics-panel.js
 *
 * 浏览器侧 Diagnostics 面板：
 * - Ping：GET /ping
 * - Command：POST /api/command
 * - 输出：页面日志区 + console
 *
 * 约束：ES3 风格（var/function），避免现代语法。
 * 说明：依赖浏览器原生 fetch/Promise（不引入第三方依赖）。
 */
(function () {
  var DEFAULT_BASE_URL = "";

  function safeStringify(obj) {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return String(obj);
    }
  }

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) {
      var k;
      for (k in attrs) {
        if (attrs.hasOwnProperty(k)) node.setAttribute(k, attrs[k]);
      }
    }
    if (text != null) node.appendChild(document.createTextNode(text));
    return node;
  }

  var _root = null;
  var _logEl = null;
  var _baseInput = null;
  var _cmdSelect = null;
  var _paramsTextarea = null;

  function now() {
    var d = new Date();
    function pad(n) {
      return (n < 10 ? "0" : "") + n;
    }
    return (
      d.getFullYear() +
      "-" +
      pad(d.getMonth() + 1) +
      "-" +
      pad(d.getDate()) +
      " " +
      pad(d.getHours()) +
      ":" +
      pad(d.getMinutes()) +
      ":" +
      pad(d.getSeconds())
    );
  }

  function log(line, obj) {
    var msg = "[" + now() + "] " + line;
    if (obj !== undefined) msg += "\n" + safeStringify(obj);

    try {
      if (console && console.log) console.log(msg);
    } catch (e1) {}

    if (_logEl) {
      _logEl.textContent += msg + "\n\n";
      _logEl.scrollTop = _logEl.scrollHeight;
    }
  }

  function getBaseUrl() {
    var v = _baseInput ? _baseInput.value : "";
    v = (v || "").replace(/\s+/g, "");
    return v || DEFAULT_BASE_URL;
  }

  function doPing() {
    var base = getBaseUrl();
    log("Ping -> " + base + "/ping");

    fetch(base + "/ping")
      .then(function (r) {
        return r.text();
      })
      .then(function (t) {
        log("Ping OK", { text: t });
      })
      .catch(function (e) {
        log("Ping FAIL", { error: e && e.message ? e.message : String(e) });
      });
  }

  function doCommand() {
    var base = getBaseUrl();
    var cmd = _cmdSelect ? _cmdSelect.value : "mock.echo";

    var paramsText = _paramsTextarea ? _paramsTextarea.value : "{}";
    var paramsObj = {};
    try {
      paramsObj = JSON.parse(paramsText || "{}");
    } catch (e0) {
      log("Params JSON 解析失败", { error: String(e0), paramsText: paramsText });
      return;
    }

    var req = {
      id: String(new Date().getTime()),
      cmd: cmd,
      params: paramsObj
    };

    log("Command -> " + cmd, req);

    fetch(base + "/api/command", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req)
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (j) {
        log("Command OK", j);
      })
      .catch(function (e) {
        log("Command FAIL", { error: e && e.message ? e.message : String(e) });
      });
  }

  function doClear() {
    if (_logEl) _logEl.textContent = "";
    log("Log cleared");
  }

  function toggleMinimize() {
    try {
      if (!_root) return;
      var minimized = _root.getAttribute("data-min") === "1";
      _root.setAttribute("data-min", minimized ? "0" : "1");
      if (_logEl) _logEl.style.display = minimized ? "block" : "none";
      if (_paramsTextarea) _paramsTextarea.style.display = minimized ? "block" : "none";
    } catch (e) {}
  }

  function buildPanel() {
    var root = el("div", {
      id: "diagnostics-panel",
      style:
        "position:fixed;right:12px;bottom:12px;width:360px;z-index:99999;" +
        "background:#111;color:#ddd;border:1px solid #333;border-radius:8px;" +
        "font-family:Consolas,monospace;font-size:12px;box-shadow:0 6px 18px rgba(0,0,0,0.4);"
    });

    var header = el("div", {
      style: "padding:10px 10px 6px 10px;border-bottom:1px solid #222;"
    });

    var titleRow = el("div", { style: "display:flex;align-items:center;gap:8px;margin-bottom:6px;cursor:move;user-select:none;" });
    titleRow.appendChild(el("div", { style: "font-weight:bold;flex:1;" }, "Diagnostics"));
    var btnMin = el(
      "button",
      {
        title: "Minimize/Expand",
        style:
          "padding:2px 8px;border-radius:999px;border:1px solid #333;background:#222;color:#ddd;cursor:pointer;"
      },
      "—"
    );
    btnMin.onclick = toggleMinimize;
    titleRow.appendChild(btnMin);
    header.appendChild(titleRow);

    var baseRow = el("div", { style: "display:flex;gap:6px;align-items:center;margin-bottom:6px;" });
    baseRow.appendChild(el("span", null, "Base:"));
    _baseInput = el("input", {
      type: "text",
      value: "",
      placeholder: "blank = same-origin",
      style:
        "flex:1;background:#1a1a1a;color:#ddd;border:1px solid #333;border-radius:4px;padding:4px;"
    });
    baseRow.appendChild(_baseInput);
    header.appendChild(baseRow);

    var row2 = el("div", { style: "display:flex;gap:6px;align-items:center;margin-bottom:6px;" });
    _cmdSelect = el("select", {
      style:
        "flex:1;background:#1a1a1a;color:#ddd;border:1px solid #333;border-radius:4px;padding:4px;"
    });
    _cmdSelect.appendChild(el("option", { value: "mock.echo" }, "mock.echo"));
    _cmdSelect.appendChild(el("option", { value: "mock.board.summary" }, "mock.board.summary"));
    _cmdSelect.appendChild(el("option", { value: "mock.unknown" }, "mock.unknown（失败用）"));
    row2.appendChild(_cmdSelect);

    var btnPing = el(
      "button",
      {
        style:
          "padding:4px 8px;border-radius:4px;border:1px solid #333;background:#222;color:#ddd;cursor:pointer;"
      },
      "Ping"
    );
    var btnCmd = el(
      "button",
      {
        style:
          "padding:4px 8px;border-radius:4px;border:1px solid #333;background:#222;color:#ddd;cursor:pointer;"
      },
      "Send"
    );
    var btnClr = el(
      "button",
      {
        style:
          "padding:4px 8px;border-radius:4px;border-radius:4px;border:1px solid #333;background:#222;color:#ddd;cursor:pointer;"
      },
      "Clear"
    );

    btnPing.onclick = doPing;
    btnCmd.onclick = doCommand;
    btnClr.onclick = doClear;

    row2.appendChild(btnPing);
    row2.appendChild(btnCmd);
    row2.appendChild(btnClr);
    header.appendChild(row2);

    _paramsTextarea = el("textarea", {
      style:
        "width:100%;height:70px;resize:vertical;background:#1a1a1a;color:#ddd;" +
        "border:1px solid #333;border-radius:4px;padding:6px;box-sizing:border-box;"
    });
    _paramsTextarea.value = "{\n  \"from\": \"browser\"\n}";
    header.appendChild(_paramsTextarea);

    _logEl = el("pre", {
      style:
        "margin:0;padding:10px;height:220px;overflow:auto;white-space:pre-wrap;" +
        "border-top:1px solid #222;background:#0b0b0b;border-radius:0 0 8px 8px;"
    });

    root.appendChild(header);
    root.appendChild(_logEl);

    return root;
  }

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

  function _mountNow() {
    if (_root) return;
    if (!document || !document.body) return;
    _root = buildPanel();
    document.body.appendChild(_root);
    try {
      var header = _root.firstChild ? _root.firstChild.firstChild : null;
      if (header) enableDrag(_root, header);
    } catch (e) {}
    log("Diagnostics panel mounted", { baseUrl: DEFAULT_BASE_URL || "(same-origin)" });
  }

  function mount() {
    if (_root) return;
    if (!document || !document.body) {
      try {
        document.addEventListener("DOMContentLoaded", function () {
          _mountNow();
        });
      } catch (e) {}
      return;
    }
    _mountNow();
  }

  try {
    if (typeof window !== "undefined") {
      window.DiagnosticsPanel = { mount: mount };
    }
  } catch (e) {}
})();
