/**
 * HTTPClientModule
 *
 * AD 侧同步 HTTP 客户端（ES3）：
 * - GET /ping
 * - POST /api/command
 * - GET /api/latest-report?full=0|1
 *
 * 统一返回：
 * { ok:Boolean, status:Number, text:String, json:Object|null, error:String|null }
 */
var HTTPClientModule = (function () {
  var DEFAULT_BASE_URL = "http://127.0.0.1:8080";

  function createHttp() {
    var progIds = [
      "MSXML2.XMLHTTP",
      "MSXML2.ServerXMLHTTP",
      "Microsoft.XMLHTTP",
      "WinHttp.WinHttpRequest.5.1"
    ];

    var i;
    for (i = 0; i < progIds.length; i++) {
      try {
        return new ActiveXObject(progIds[i]);
      } catch (e) {}
    }
    return null;
  }

  function ui(level, msg, ctx) {
    var text = String(msg);
    var payload = ctx || null;

    try {
      if (typeof UILoggerModule !== "undefined" && UILoggerModule) {
        if (level === "error" && UILoggerModule.uiError) {
          UILoggerModule.uiError(text, payload, "HTTPClientModule", "ui");
          return;
        }
        if (level === "warn" && UILoggerModule.uiWarn) {
          UILoggerModule.uiWarn(text, payload, "HTTPClientModule", "ui");
          return;
        }
        if (UILoggerModule.uiInfo) {
          UILoggerModule.uiInfo(text, payload, "HTTPClientModule", "ui");
          return;
        }
      }
    } catch (e1) {}

    try {
      if (typeof memLog !== "undefined" && memLog && memLog.Lines && memLog.Lines.Add) {
        var line = "[" + String(level).toUpperCase() + "] " + text;
        if (payload) {
          try {
            line += " " + JSON.stringify(payload);
          } catch (e2) {}
        }
        memLog.Lines.Add(line);
        return;
      }
    } catch (e3) {}

    try {
      if (typeof ShowMessage !== "undefined") {
        ShowMessage(text);
      }
    } catch (e4) {}
  }

  function request(method, url, body, headers) {
    var http = createHttp();
    if (!http) {
      return { ok: false, status: 0, text: "", json: null, error: "XMLHTTP not available" };
    }

    try {
      http.open(method, url, false);

      if (headers) {
        var k;
        for (k in headers) {
          if (headers.hasOwnProperty(k)) {
            try {
              http.setRequestHeader(k, headers[k]);
            } catch (e1) {}
          }
        }
      }

      http.send(body || "");

      var status = 0;
      var text = "";
      try {
        status = http.status;
      } catch (e2) {}
      try {
        text = http.responseText;
      } catch (e3) {}

      var json = null;
      var parseError = null;
      try {
        if (typeof JsonUtil !== "undefined" && JsonUtil && JsonUtil.parse) {
          json = JsonUtil.parse(text);
          if (!json) parseError = "JsonUtil.parse returned null";
        } else {
          parseError = "JsonUtil missing";
        }
      } catch (e4) {
        parseError = "parse throws: " + String(e4);
      }

      return {
        ok: status >= 200 && status < 300,
        status: status,
        text: text,
        json: json,
        parseError: parseError,
        error: null
      };
    } catch (e) {
      return { ok: false, status: 0, text: "", json: null, error: String(e) };
    }
  }

  function getBaseUrl() {
    return DEFAULT_BASE_URL;
  }

  function setBaseUrl(url) {
    if (typeof url === "string" && url) {
      DEFAULT_BASE_URL = url;
    }
  }

  function _resolveBaseUrl(baseUrl) {
    if (typeof baseUrl === "string" && baseUrl) return baseUrl;
    return DEFAULT_BASE_URL;
  }

  function ping(baseUrl) {
    var base = _resolveBaseUrl(baseUrl);
    var r = request("GET", base + "/ping", "", null);
    ui(r.ok ? "info" : "error", "PING", {
      url: base + "/ping",
      status: r.status,
      text: r.text,
      error: r.error
    });
    return r.ok && String(r.text) === "pong";
  }

  function _normalizeCommandArgs(baseUrl, cmd, params) {
    if (typeof cmd === "string") {
      return { baseUrl: _resolveBaseUrl(baseUrl), cmd: cmd, params: params || {} };
    }
    return { baseUrl: DEFAULT_BASE_URL, cmd: String(baseUrl || ""), params: cmd || {} };
  }

  function sendCommand(baseUrl, cmd, params) {
    var args = _normalizeCommandArgs(baseUrl, cmd, params);
    var reqObj = {
      id: String(new Date().getTime()),
      cmd: args.cmd,
      params: args.params || {}
    };

    var body = "{}";
    try {
      if (typeof JsonUtil !== "undefined" && JsonUtil && JsonUtil.stringify) {
        body = JsonUtil.stringify(reqObj);
      } else if (typeof JSON !== "undefined" && JSON && JSON.stringify) {
        body = JSON.stringify(reqObj);
      }
    } catch (e1) {}

    var r = request("POST", args.baseUrl + "/api/command", body, { "Content-Type": "application/json" });

    if (r.json) {
      ui(r.json.ok ? "info" : "warn", "COMMAND " + args.cmd, {
        ok: r.json.ok,
        id: r.json.id || null,
        error: r.json.error || null
      });
      return r.json;
    }

    ui("error", "COMMAND " + args.cmd + " (json-parse-failed)", {
      status: r.status,
      parseError: r.parseError,
      textHead: r.text ? r.text.substring(0, 80) : "",
      error: r.error
    });
    return { ok: false, error: { code: "NON_JSON", message: r.text || r.error } };
  }

  function command(cmd, params) {
    return sendCommand(DEFAULT_BASE_URL, cmd, params);
  }

  function latestReport(full, baseUrl) {
    if (typeof full === "string") {
      baseUrl = full;
      full = false;
    }
    var base = _resolveBaseUrl(baseUrl);
    var q = full ? "1" : "0";
    var r = request("GET", base + "/api/latest-report?full=" + q, "", null);
    ui(r.ok ? "info" : "warn", "LATEST_REPORT", {
      status: r.status,
      hasJson: !!r.json,
      parseError: r.parseError
    });
    return r.json || null;
  }

  return {
    getBaseUrl: getBaseUrl,
    setBaseUrl: setBaseUrl,
    request: request,
    ping: ping,
    sendCommand: sendCommand,
    command: command,
    latestReport: latestReport,
    ui: ui
  };
})();

// 兼容中文命名的最小闭环示例（便于AD侧手动调用）
try {
  if (typeof HTTP客户端 === "undefined") {
    var HTTP客户端 = HTTPClientModule;
  }
} catch (e) {}

// 可选导出（模块即接口）
try {
  if (typeof exportModule !== "undefined" && exportModule) {
    exportModule("HTTPClientModule", HTTPClientModule);
  }
} catch (e1) {}
