/**
 * EnvironmentProbeModule
 *
 * AD 脚本环境“可用组件/能力”探测器（尽可能多 & 尽可能安全）
 *
 * 设计目标：
 * 1) 探测 ActiveX/COM 组件：按 ProgID 列表尝试实例化，记录成功/失败与错误信息
 * 2) 探测全局对象：Client / PCBServer / WorkspaceManager / ShowMessage / memLog / UILoggerModule 等
 * 3) 探测关键能力：JSON/Date/Math、HTTP、TEMP路径、MSXML loadXML
 * 4) 输出统一报告：仅通过 LoggerModule 输出摘要；报告可上传到 Node
 *
 * 风险控制：
 * - 默认“安全模式”：只实例化对象，不调用可能有副作用的方法
 * - Office/IE/Outlook 等“高风险组件”默认不测，除非显式开启 allowRiskyProbes
 *
 * 兼容性：
 * - ES3 风格（var/function）
 * - AD 环境：new ActiveXObject(progId)
 */
var EnvironmentProbeModule = (function () {

    // -----------------------------
    // 配置区
    // -----------------------------
    var CONFIG = {
        /** 是否启用安全模式（默认 true：只创建对象，不做危险调用） */
        safeMode: true,

        /** 是否探测高风险组件（默认 false：Office/IE/Outlook 等不测） */
        allowRiskyProbes: false,

        /** 是否扫描 maybe 组（默认 true） */
        includeMaybeProbes: true,

        /** risky 扫描后尝试清理进程（默认 false） */
        cleanupRisky: false,

        /** ProgID 候选清单路径（外置 JSON） */
        progIdCandidatesPath: "config\\ActiveX-ProgID-超级候选清单.v2.json",

        /** HTTP 基地址（ping/upload） */
        httpBaseUrl: "http://127.0.0.1:8080",

        /** 上传报告接口 */
        uploadPath: "/api/upload-report",

        /** 是否上传报告（默认 true） */
        enableUploadReport: true,

        /** 输出到 UI 的最大单行长度（避免 UI 爆） */
        maxLineLen: 400
    };

    // -----------------------------
    // 日志输出（只走 LoggerModule）
    // -----------------------------
    var _loggerInstance = null;

    function _getLogger() {
        try {
            if (typeof LoggerModuleIndex !== "undefined" && LoggerModuleIndex && LoggerModuleIndex.getLogger) {
                return LoggerModuleIndex.getLogger("EnvironmentProbeModule");
            }
        } catch (e1) {}

        try {
            if (typeof LoggerModuleIndex !== "undefined" && LoggerModuleIndex && LoggerModuleIndex.info) {
                return LoggerModuleIndex;
            }
        } catch (e2) {}

        try {
            if (typeof LoggerModule !== "undefined" && LoggerModule && LoggerModule.create) {
                if (!_loggerInstance) {
                    _loggerInstance = LoggerModule.create({
                        moduleName: "EnvironmentProbeModule",
                        autoInit: true,
                        threshold: 1,
                        enabled: true
                    });
                    if (_loggerInstance && _loggerInstance.init) {
                        _loggerInstance.init();
                    }
                }
                return _loggerInstance;
            }
        } catch (e3) {}

        return null;
    }

    function _log(level, msg, ctx, functionName) {
        var logger = _getLogger();
        if (!logger) return;

        var text = _trimLine(String(msg), CONFIG.maxLineLen);
        try {
            if (typeof logger[level] === "function") {
                logger[level](text, ctx || null, "EnvironmentProbeModule", functionName || "");
            }
        } catch (e1) {}
    }

    function _logInfo(msg, ctx, fn) {
        _log("info", msg, ctx, fn);
    }

    function _logWarn(msg, ctx, fn) {
        _log("warn", msg, ctx, fn);
    }

    function _logError(msg, ctx, fn) {
        _log("error", msg, ctx, fn);
    }

    // -----------------------------
    // 工具：安全 stringify / 截断
    // -----------------------------
    function _safeStringify(obj) {
        try {
            if (typeof JSON !== "undefined" && JSON && JSON.stringify) {
                return JSON.stringify(obj);
            }
        } catch (e1) {}
        try { return String(obj); } catch (e2) {}
        return "[unstringifiable]";
    }

    function _trimLine(s, maxLen) {
        var str = String(s);
        if (str.length <= maxLen) return str;
        return str.substring(0, maxLen) + "...(trimmed)";
    }

    // -----------------------------
    // 错误信息提取（AD 环境常见：number/description/message）
    // -----------------------------
    function _getErrorInfo(e) {
        var info = {};
        try { info.name = e && e.name ? String(e.name) : ""; } catch (x1) {}
        try { info.message = e && e.message ? String(e.message) : ""; } catch (x2) {}
        try { info.description = e && e.description ? String(e.description) : ""; } catch (x3) {}
        try { info.number = (e && typeof e.number !== "undefined") ? e.number : null; } catch (x4) {}
        try { info.toString = e ? String(e) : ""; } catch (x5) {}
        return info;
    }

    function _compactError(e) {
        var info = _getErrorInfo(e);
        return {
            number: info.number,
            message: info.message || info.description || info.toString || ""
        };
    }

    // -----------------------------
    // 外置 ProgID 清单（默认值）
    // -----------------------------
    var DEFAULT_PROGID_CANDIDATES = {
        safe: {
            http: [
                "WinHttp.WinHttpRequest.5.1",
                "MSXML2.ServerXMLHTTP",
                "MSXML2.ServerXMLHTTP.3.0",
                "MSXML2.ServerXMLHTTP.6.0",
                "MSXML2.XMLHTTP",
                "MSXML2.XMLHTTP.3.0",
                "MSXML2.XMLHTTP.6.0",
                "Microsoft.XMLHTTP"
            ],
            xml_dom_sax_xslt: [
                "MSXML2.DOMDocument",
                "MSXML2.DOMDocument.3.0",
                "MSXML2.DOMDocument.4.0",
                "MSXML2.DOMDocument.6.0",
                "Microsoft.XMLDOM",
                "MSXML2.FreeThreadedDOMDocument",
                "MSXML2.FreeThreadedDOMDocument.3.0",
                "MSXML2.FreeThreadedDOMDocument.6.0",
                "MSXML2.SAXXMLReader",
                "MSXML2.SAXXMLReader.3.0",
                "MSXML2.SAXXMLReader.6.0",
                "MSXML2.MXXMLWriter",
                "MSXML2.MXXMLWriter.3.0",
                "MSXML2.MXXMLWriter.6.0",
                "MSXML2.XMLSchemaCache",
                "MSXML2.XMLSchemaCache.3.0",
                "MSXML2.XMLSchemaCache.6.0",
                "MSXML2.XSLTemplate",
                "MSXML2.XSLTemplate.3.0",
                "MSXML2.XSLTemplate.6.0"
            ],
            html_dom: ["htmlfile"],
            collections: ["Scripting.Dictionary"],
            wsh_core: ["WScript.Shell", "WScript.Network", "VBScript.RegExp", "Scriptlet.TypeLib"],
            file_io_stream: ["Scripting.FileSystemObject", "ADODB.Stream"],
            ado_db: ["ADODB.Connection", "ADODB.Recordset", "ADODB.Command"],
            wmi: ["WbemScripting.SWbemLocator", "WbemScripting.SWbemNamedValueSet", "WbemScripting.SWbemRefresher"],
            msi: ["WindowsInstaller.Installer"],
            sapi: ["SAPI.SpVoice", "SAPI.SpFileStream", "SAPI.SpMemoryStream"],
            imaging_wia: ["WIA.ImageFile", "WIA.CommonDialog", "WIA.Vector"],
            xml_signature_maybe: ["Microsoft.XMLDSig"],
            clipboard_maybe: ["MSForms.DataObject"],
            update_maybe: ["Microsoft.Update.Session", "Microsoft.Update.ServiceManager"],
            compression_maybe: ["ADODB.Stream"],
            net_misc_maybe: ["Msxml2.XMLHTTP.6.0", "Msxml2.ServerXMLHTTP.6.0"]
        },
        maybe: {
            type_library_introspection: ["TLI.TLIApplication", "TLBINF32.TLIApplication", "OLEVIEW.OLEView"],
            crypto_capicom: ["CAPICOM.HashedData", "CAPICOM.Utilities", "CAPICOM.SignedData", "CAPICOM.Store"],
            crypto_csp_maybe: [
                "X509Enrollment.CX509Enrollment",
                "X509Enrollment.CX509CertificateRequestPkcs10",
                "X509Enrollment.CObjectId",
                "X509Enrollment.CX500DistinguishedName"
            ],
            cert_store_maybe: ["CAPICom.Store"],
            json_maybe: ["MSScriptControl.ScriptControl"],
            windows_scripting_extra: ["Scripting.Encoder", "Scripting.Signer", "Scripting.Dictionary.1"],
            zip_maybe: ["CompressedFolder"],
            network_discovery_maybe: ["HNetCfg.FwMgr", "HNetCfg.FwPolicy2"],
            http_alt_maybe: ["Microsoft.WinHttp.WinHttpRequest.5.1"],
            msxml_alt_maybe: ["Msxml2.DOMDocument.6.0", "Msxml2.FreeThreadedDOMDocument.6.0", "Msxml2.XMLSchemaCache.6.0"],
            shell_exec_maybe: ["WScript.Shell.1"],
            windows_task_scheduler_maybe: ["Schedule.Service"],
            windows_management_maybe: ["Microsoft.WMI"]
        },
        risky: {
            shell: ["Shell.Application"],
            browser: ["InternetExplorer.Application"],
            office: ["Excel.Application", "Word.Application", "Outlook.Application", "PowerPoint.Application", "Access.Application"],
            process: ["WScript.Shell"],
            scheduler: ["Schedule.Service"]
        }
    };

    // -----------------------------
    // 读取外置 JSON
    // -----------------------------
    function _readTextFile(path) {
        try {
            if (typeof ActiveXObject !== "undefined") {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                if (!fso.FileExists(path)) {
                    return { ok: false, error: { message: "file not found: " + path } };
                }
                var file = fso.OpenTextFile(path, 1, false);
                var text = file.ReadAll();
                file.Close();
                return { ok: true, text: text };
            }
        } catch (e1) {
            return { ok: false, error: _compactError(e1) };
        }

        try {
            if (typeof require !== "undefined") {
                var fs = require("fs");
                if (!fs.existsSync(path)) {
                    return { ok: false, error: { message: "file not found: " + path } };
                }
                return { ok: true, text: String(fs.readFileSync(path, "utf8")) };
            }
        } catch (e2) {
            return { ok: false, error: _compactError(e2) };
        }

        return { ok: false, error: { message: "no file reader available" } };
    }

    function _normalizeProgIdCandidates(obj) {
        if (!obj || typeof obj !== "object") return null;
        if (!obj.safe || typeof obj.safe !== "object") obj.safe = {};
        if (!obj.maybe || typeof obj.maybe !== "object") obj.maybe = {};
        if (!obj.risky || typeof obj.risky !== "object") obj.risky = {};
        return obj;
    }

    function _loadProgIdCandidates() {
        var r = _readTextFile(CONFIG.progIdCandidatesPath);
        if (!r.ok) return null;

        try {
            if (typeof JSON !== "undefined" && JSON && JSON.parse) {
                return _normalizeProgIdCandidates(JSON.parse(r.text || "{}"));
            }
        } catch (e1) {
            _logWarn("ProgID candidates JSON parse failed", _compactError(e1), "_loadProgIdCandidates");
        }

        return null;
    }

    function _getProgIdCandidates() {
        var candidates = _loadProgIdCandidates();
        if (candidates) return candidates;
        return DEFAULT_PROGID_CANDIDATES;
    }

    // -----------------------------
    // 探测：ActiveX/COM 实例化
    // -----------------------------
    function _tryCreateActiveX(progId) {
        var r = {
            progId: progId,
            ok: false,
            error: null,
            _obj: null
        };

        if (typeof ActiveXObject === "undefined") {
            r.ok = false;
            r.error = { number: null, message: "ActiveXObject is undefined" };
            return r;
        }

        try {
            var obj = new ActiveXObject(progId);
            r.ok = true;
            r._obj = obj;
            try { r.type = (obj && obj.toString) ? String(obj.toString()) : ""; } catch (e1) {}
            return r;

        } catch (e) {
            r.ok = false;
            r.error = _compactError(e);
            return r;
        }
    }

    function _cleanupRiskyObject(progId, obj) {
        if (!obj) return;
        var lower = String(progId || "").toLowerCase();
        var skipQuit = (lower.indexOf("outlook.application") >= 0);

        try {
            if (typeof obj.Visible !== "undefined") {
                obj.Visible = false;
            }
        } catch (e1) {}

        if (skipQuit) return;

        try {
            if (obj.Quit && typeof obj.Quit === "function") {
                obj.Quit();
            }
        } catch (e2) {}
    }

    /**
     * 扫描指定 ProgID 列表
     * @param {String} groupType safe/risky
     * @param {String} groupName 分组名
     * @param {Array} progIds ProgID 列表
     * @param {Object} report 报告对象
     */
    function _probeProgIdGroup(groupType, groupName, progIds, report) {
        var i;
        var resultGroup = {
            ok: 0,
            fail: 0,
            skipped: 0,
            total: progIds.length,
            items: []
        };

        for (i = 0; i < progIds.length; i++) {
            var progId = progIds[i];

            if (groupType === "risky" && !CONFIG.allowRiskyProbes) {
                resultGroup.skipped++;
                resultGroup.items.push({
                    progId: progId,
                    ok: false,
                    skipped: true,
                    reason: "risky probe disabled"
                });
                continue;
            }

            var r = _tryCreateActiveX(progId);
            if (r.ok && groupType === "risky" && CONFIG.cleanupRisky) {
                _cleanupRiskyObject(progId, r._obj);
            }
            r._obj = null;
            if (r.ok) {
                resultGroup.ok++;
            } else {
                resultGroup.fail++;
            }
            resultGroup.items.push(r);
        }

        if (!report.progIdResults[groupType]) {
            report.progIdResults[groupType] = {
                groups: {},
                totals: { ok: 0, fail: 0, skipped: 0, total: 0 }
            };
        }

        report.progIdResults[groupType].groups[groupName] = resultGroup;
        report.progIdResults[groupType].totals.ok += resultGroup.ok;
        report.progIdResults[groupType].totals.fail += resultGroup.fail;
        report.progIdResults[groupType].totals.skipped += resultGroup.skipped;
        report.progIdResults[groupType].totals.total += resultGroup.total;

        _logInfo("ProgID group done: " + groupType + "." + groupName, {
            ok: resultGroup.ok,
            fail: resultGroup.fail,
            skipped: resultGroup.skipped,
            total: resultGroup.total
        }, "_probeProgIdGroup");
    }

    function _probeProgIdGroups(groupType, groups, report) {
        var groupName;
        for (groupName in groups) {
            if (groups.hasOwnProperty(groupName)) {
                _probeProgIdGroup(groupType, groupName, groups[groupName], report);
            }
        }
    }

    // -----------------------------
    // 探测：全局对象/函数是否存在（AD 内置）
    // -----------------------------
    function _probeGlobals(report) {
        var names = [
            "window",
            "Client",
            "WorkspaceManager",
            "PCBServer",
            "SchServer",
            "IntegratedLibraryManager",
            "ServerProcess",
            "ShowMessage",
            "memLog",
            "UILoggerModule",
            "UIEventManager",
            "exportModule",
            "module"
        ];

        report.globals = [];

        function _getGlobalByName(name) {
            try {
                if (name === "window") return (typeof window !== "undefined") ? window : undefined;
                if (name === "Client") return (typeof Client !== "undefined") ? Client : undefined;
                if (name === "WorkspaceManager") return (typeof WorkspaceManager !== "undefined") ? WorkspaceManager : undefined;
                if (name === "PCBServer") return (typeof PCBServer !== "undefined") ? PCBServer : undefined;
                if (name === "SchServer") return (typeof SchServer !== "undefined") ? SchServer : undefined;
                if (name === "IntegratedLibraryManager") return (typeof IntegratedLibraryManager !== "undefined") ? IntegratedLibraryManager : undefined;
                if (name === "ServerProcess") return (typeof ServerProcess !== "undefined") ? ServerProcess : undefined;
                if (name === "ShowMessage") return (typeof ShowMessage !== "undefined") ? ShowMessage : undefined;
                if (name === "memLog") return (typeof memLog !== "undefined") ? memLog : undefined;
                if (name === "UILoggerModule") return (typeof UILoggerModule !== "undefined") ? UILoggerModule : undefined;
                if (name === "UIEventManager") return (typeof UIEventManager !== "undefined") ? UIEventManager : undefined;
                if (name === "exportModule") return (typeof exportModule !== "undefined") ? exportModule : undefined;
                if (name === "module") return (typeof module !== "undefined") ? module : undefined;
            } catch (e1) {}
            return undefined;
        }

        var i;
        for (i = 0; i < names.length; i++) {
            var name = names[i];
            var item = { name: name, exists: false, type: "" };
            try {
                var v = _getGlobalByName(name);
                item.exists = (typeof v !== "undefined" && v !== null);
                if (item.exists) item.type = typeof v;
            } catch (e) {
                item.exists = false;
                item.error = _compactError(e);
            }
            report.globals.push(item);
        }

        _logInfo("Global probe done", { count: report.globals.length }, "_probeGlobals");
    }

    // -----------------------------
    // 探测：基础语言能力
    // -----------------------------
    function _probeLanguage(report) {
        report.language = {
            hasJSON: false,
            jsonSource: "",
            hasDate: false,
            hasMath: false,
            hasActiveXObject: false
        };

        try { report.language.hasJSON = (typeof JSON !== "undefined" && JSON && JSON.parse && JSON.stringify); } catch (e1) {}
        if (report.language.hasJSON) {
            report.language.jsonSource = "projectProvided(json2.js)";
        }
        try { report.language.hasDate = (typeof Date !== "undefined"); } catch (e2) {}
        try { report.language.hasMath = (typeof Math !== "undefined"); } catch (e3) {}
        try { report.language.hasActiveXObject = (typeof ActiveXObject !== "undefined"); } catch (e4) {}

        _logInfo("Language probe done", report.language, "_probeLanguage");
    }

    // -----------------------------
    // 探测：关键能力
    // -----------------------------
    function _probeCapabilities(report) {
        report.capabilityChecks = {
            json: { ok: false, source: "", error: null },
            tempPath: { ok: false, value: "", error: null },
            httpPing: { ok: false, status: 0, text: "", via: "", error: null },
            msxmlLoadXml: { ok: false, via: "", error: null }
        };

        var hasJSON = false;
        try { hasJSON = (typeof JSON !== "undefined" && JSON && JSON.parse && JSON.stringify); } catch (e1) {}
        report.capabilityChecks.json.ok = hasJSON;
        report.capabilityChecks.json.source = hasJSON ? "projectProvided(json2.js)" : "missing";
        if (!hasJSON) report.capabilityChecks.json.error = { message: "JSON unavailable" };

        // TEMP 路径
        try {
            var shell = null;
            if (typeof ActiveXObject !== "undefined") {
                shell = new ActiveXObject("WScript.Shell");
            }
            if (shell && shell.ExpandEnvironmentStrings) {
                var tempPath = shell.ExpandEnvironmentStrings("%TEMP%");
                report.capabilityChecks.tempPath.value = String(tempPath);
                report.capabilityChecks.tempPath.ok = (String(tempPath).length > 0);
            } else {
                report.capabilityChecks.tempPath.error = { message: "WScript.Shell unavailable" };
            }
        } catch (e2) {
            report.capabilityChecks.tempPath.error = _compactError(e2);
        }

        // HTTP ping
        report.capabilityChecks.httpPing = _httpPing(CONFIG.httpBaseUrl);

        // MSXML loadXML
        report.capabilityChecks.msxmlLoadXml = _probeMsxmlLoadXml();

        _logInfo("Capability checks done", report.capabilityChecks, "_probeCapabilities");
    }

    function _httpPing(baseUrl) {
        var result = { ok: false, status: 0, text: "", via: "", error: null };
        var url = baseUrl + "/ping";
        var progIds = [
            "WinHttp.WinHttpRequest.5.1",
            "MSXML2.ServerXMLHTTP.6.0",
            "MSXML2.ServerXMLHTTP.3.0",
            "MSXML2.XMLHTTP.6.0",
            "MSXML2.XMLHTTP.3.0",
            "MSXML2.XMLHTTP",
            "Microsoft.XMLHTTP"
        ];

        var i;
        for (i = 0; i < progIds.length; i++) {
            var progId = progIds[i];
            try {
                var http = new ActiveXObject(progId);
                if (!http) continue;

                if (progId.indexOf("WinHttp.") === 0 || progId.indexOf("WinHttp") === 0) {
                    http.Open("GET", url, false);
                    http.Send();
                    try { result.status = http.Status; } catch (e1) { result.status = http.status; }
                    try { result.text = http.ResponseText; } catch (e2) { result.text = http.responseText; }
                } else {
                    http.open("GET", url, false);
                    http.send();
                    try { result.status = http.status; } catch (e3) { result.status = 0; }
                    try { result.text = http.responseText; } catch (e4) { result.text = ""; }
                }

                result.via = progId;
                result.ok = (result.status >= 200 && result.status < 300 && String(result.text) === "pong");
                if (result.ok) return result;
            } catch (e5) {
                result.error = _compactError(e5);
            }
        }

        if (!result.error) {
            result.error = { message: "HTTP ping failed" };
        }
        return result;
    }

    function _probeMsxmlLoadXml() {
        var result = { ok: false, via: "", error: null };
        var progIds = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.4.0", "Microsoft.XMLDOM", "MSXML2.DOMDocument"];
        var i;
        for (i = 0; i < progIds.length; i++) {
            try {
                var dom = new ActiveXObject(progIds[i]);
                if (!dom) continue;
                try { dom.async = false; } catch (e1) {}
                var ok = false;
                try { ok = dom.loadXML("<a/>"); } catch (e2) { ok = false; }
                if (ok && dom.documentElement && dom.documentElement.nodeName) {
                    result.ok = true;
                    result.via = progIds[i];
                    return result;
                }
            } catch (e3) {
                result.error = _compactError(e3);
            }
        }
        if (!result.error) result.error = { message: "MSXML loadXML failed" };
        return result;
    }

    // -----------------------------
    // 报告上传
    // -----------------------------
    function _uploadReport(report) {
        if (!CONFIG.enableUploadReport) {
            _logWarn("Report upload skipped by config", null, "_uploadReport");
            return { ok: false, skipped: true };
        }

        if (typeof HTTPClientModule === "undefined" || !HTTPClientModule || !HTTPClientModule.request) {
            _logWarn("HTTPClientModule not available for report upload", null, "_uploadReport");
            return { ok: false, error: { code: "NO_HTTP_CLIENT", message: "HTTPClientModule unavailable" } };
        }

        var url = CONFIG.httpBaseUrl + CONFIG.uploadPath;
        var body = _safeStringify(report);
        var r = HTTPClientModule.request("POST", url, body, { "Content-Type": "application/json" });

        if (r && r.ok) {
            _logInfo("Report upload ok", { status: r.status, url: url }, "_uploadReport");
            return { ok: true, status: r.status, text: r.text || "" };
        }

        _logWarn("Report upload failed", { status: r ? r.status : 0, text: r ? r.text : "" }, "_uploadReport");
        return {
            ok: false,
            status: r ? r.status : 0,
            error: { message: r ? r.text : "upload failed" }
        };
    }

    // -----------------------------
    // 主入口：运行全部探测
    // -----------------------------
    function runAll(customConfig) {
        if (customConfig) {
            var k;
            for (k in customConfig) {
                if (customConfig.hasOwnProperty(k)) {
                    CONFIG[k] = customConfig[k];
                }
            }
        }

        var report = {
            schema: "environment-probe/v2",
            generatedAt: (function () { try { return new Date().toISOString(); } catch (e) { return String(new Date()); } })(),
            config: {
                safeMode: CONFIG.safeMode,
                allowRiskyProbes: CONFIG.allowRiskyProbes,
                includeMaybeProbes: CONFIG.includeMaybeProbes,
                cleanupRisky: CONFIG.cleanupRisky,
                progIdCandidatesPath: CONFIG.progIdCandidatesPath,
                httpBaseUrl: CONFIG.httpBaseUrl,
                uploadPath: CONFIG.uploadPath,
                enableUploadReport: CONFIG.enableUploadReport
            },
            language: {},
            globals: [],
            capabilityChecks: {},
            progIdResults: {},
            uploadReport: null
        };

        _logInfo("=== 开始环境可用组件/能力探测 ===", report.config, "runAll");

        _probeLanguage(report);
        _probeGlobals(report);
        _probeCapabilities(report);

        var candidates = _getProgIdCandidates();
        _probeProgIdGroups("safe", candidates.safe || {}, report);
        if (CONFIG.includeMaybeProbes) {
            _probeProgIdGroups("maybe", candidates.maybe || {}, report);
        } else {
            report.progIdResults.maybe = {
                groups: {},
                totals: { ok: 0, fail: 0, skipped: 0, total: 0 }
            };
            _logInfo("ProgID maybe group skipped by config", null, "runAll");
        }
        _probeProgIdGroups("risky", candidates.risky || {}, report);

        report.uploadReport = _uploadReport(report);

        _logInfo("=== 环境探测完成 ===", {
            uploaded: report.uploadReport && report.uploadReport.ok
        }, "runAll");

        return report;
    }

    // -----------------------------
    // 对外导出
    // -----------------------------
    return {
        /** 运行全部探测（返回报告对象） */
        runAll: runAll,

        /** 读取当前配置（便于 UI 调试） */
        getConfig: function () { return CONFIG; },

        /** 设置配置（例如启用 allowRiskyProbes） */
        setConfig: function (cfg) { runAll(cfg); }
    };
})();

// -----------------------------
// 模块导出：兼容你们“模块即接口”习惯
// -----------------------------
try {
    if (typeof exportModule !== "undefined" && exportModule) {
        exportModule("EnvironmentProbeModule", EnvironmentProbeModule);
    } else if (typeof window !== "undefined") {
        window.EnvironmentProbeModule = EnvironmentProbeModule;
    }
} catch (e1) {}

try {
    if (typeof module !== "undefined" && module.exports) {
        module.exports = EnvironmentProbeModule;
    }
} catch (e2) {}
