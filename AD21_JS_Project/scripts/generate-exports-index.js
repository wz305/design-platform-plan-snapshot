/**
 * Export Surface 聚合器
 *
 * 从 `docs/当前文档/模块文档/**.md` 抽取 “导出列表（Export Surface）” 表格，
 * 生成机器可消费的 `reports/exports-index.json`（以及便于 grep 的 TSV），
 * 并输出一份人类可读的 `docs/当前文档/对接资源包.md`。
 *
 * 约束：
 * - 以文档为事实来源（不直接解析源码）。
 * - 解析失败/缺失字段必须允许：在 JSON 中用 null/空数组表达。
 *
 * 运行：
 *   node scripts/generate-exports-index.js
 */
/* eslint-disable no-console */

var fs = require("fs");
var path = require("path");

var PROJECT_ROOT = path.join(__dirname, "..");
var DOCS_ROOT = path.join(PROJECT_ROOT, "docs", "当前文档", "模块文档");
var REPORTS_DIR = path.join(PROJECT_ROOT, "reports");

var OUTPUT_JSON = path.join(REPORTS_DIR, "exports-index.json");
var OUTPUT_TSV = path.join(REPORTS_DIR, "exports-index.tsv");
var OUTPUT_MD = path.join(PROJECT_ROOT, "docs", "当前文档", "对接资源包.md");

var SCHEMA_ID = "exports-index/v1";

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function readUtf8(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function splitLines(text) {
  return String(text || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
}

function listMarkdownFiles(dirPath) {
  var results = [];
  if (!fs.existsSync(dirPath)) {
    return results;
  }

  var entries = fs.readdirSync(dirPath);
  for (var i = 0; i < entries.length; i++) {
    var full = path.join(dirPath, entries[i]);
    var stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(listMarkdownFiles(full));
    } else if (stat.isFile() && /\.md$/i.test(entries[i])) {
      results.push(full);
    }
  }
  return results;
}

function trimStr(s) {
  return String(s || "").replace(/^\s+|\s+$/g, "");
}

function stripBackticks(s) {
  var t = trimStr(s);
  // 只去掉最外层成对反引号，避免破坏内部格式
  if (t.length >= 2 && t.charAt(0) === "`" && t.charAt(t.length - 1) === "`") {
    return t.substring(1, t.length - 1);
  }
  return t;
}

function firstBacktickedValue(line) {
  // 匹配 `...`（不跨行）
  var m = String(line || "").match(/`([^`]+)`/);
  return m ? m[1] : null;
}

function indexOfLine(lines, exactText) {
  for (var i = 0; i < lines.length; i++) {
    if (trimStr(lines[i]) === exactText) {
      return i;
    }
  }
  return -1;
}

function findLineStartingWith(lines, prefix) {
  for (var i = 0; i < lines.length; i++) {
    var t = trimStr(lines[i]);
    if (t.indexOf(prefix) === 0) {
      return { index: i, text: t };
    }
  }
  return null;
}

function parseDomainAndModule(docPath) {
  var rel = path.relative(DOCS_ROOT, docPath);
  var parts = rel.split(path.sep);
  var domain = parts.length >= 2 ? parts[0] : "unknown";
  var moduleName = path.basename(docPath, ".md");
  return { domain: domain, module: moduleName };
}

function parseModuleEnvironment(lines) {
  var hit = findLineStartingWith(lines, "适用环境：");
  if (!hit) return null;
  return trimStr(hit.text.replace(/^适用环境：/g, ""));
}

function parseEntryPath(lines) {
  // 在“入口文件（路径）”之后向下找第一条反引号路径
  var start = indexOfLine(lines, "入口文件（路径）");
  if (start === -1) return null;

  for (var i = start + 1; i < Math.min(lines.length, start + 40); i++) {
    var raw = trimStr(lines[i]);
    if (!raw) continue;
    // 遇到下一节就停止（避免把后续内容误判为入口）
    if (raw.indexOf("导出列表（Export Surface）") === 0) break;

    var val = firstBacktickedValue(raw);
    if (val) return val;

    // 允许非反引号的“裸路径”（常见写法）
    var candidate = raw.replace(/^\-\s+/, "");
    // 排除明显不是路径的情况
    if (candidate.indexOf(" ") === -1 &&
        (candidate.indexOf("/") >= 0 || candidate.indexOf("\\") >= 0) &&
        (/\.(js|ts|dfm|json|bat|ps1)$/i.test(candidate) || candidate.indexOf("AD21_JS_Project/") === 0)) {
      return candidate;
    }
  }
  return null;
}

function normalizeExportRowCells(cells) {
  // cells 预期 7 列：导出符号 类型 参数 返回 环境 副作用 备注
  function get(n) {
    return n < cells.length ? stripBackticks(cells[n]) : "";
  }
  return {
    name: get(0),
    type: get(1),
    params: get(2),
    returns: get(3),
    env: get(4),
    sideEffects: get(5),
    notes: get(6)
  };
}

function parseExportSurfaceTable(lines) {
  // 1) Markdown pipe table
  var headerIdx = -1;
  for (var i = 0; i < lines.length; i++) {
    var t = trimStr(lines[i]);
    // 允许两种表头写法：全匹配或包含关键列名
    if (t.indexOf("| 导出符号 |") >= 0 &&
        t.indexOf("| 类型 |") >= 0 &&
        t.indexOf("| 参数 |") >= 0 &&
        t.indexOf("| 返回 |") >= 0 &&
        t.indexOf("| 环境 |") >= 0 &&
        t.indexOf("| 副作用 |") >= 0 &&
        t.indexOf("| 备注 |") >= 0) {
      headerIdx = i;
      break;
    }
  }
  if (headerIdx === -1) return [];

  var exportsList = [];

  // 从 headerIdx+2 开始读（跳过分隔行），直到遇到非表格行
  for (var j = headerIdx + 1; j < lines.length; j++) {
    var line = trimStr(lines[j]);
    if (!line) break;
    if (line.indexOf("|") !== 0) break;
    // 分隔行：| --- | --- |
    if (/^\|\s*-{2,}/.test(line)) continue;

    // split: | a | b | -> ["", " a ", " b ", ""]
    var raw = line.split("|");
    if (raw.length < 3) continue;
    var cells = [];
    for (var k = 1; k < raw.length - 1; k++) {
      cells.push(trimStr(raw[k]));
    }

    // 允许行内多余列：截断到 7；不足补空
    while (cells.length < 7) cells.push("");
    if (cells.length > 7) cells = cells.slice(0, 7);

    var row = normalizeExportRowCells(cells);
    // 跳过空行（例如某些格式化残留）
    if (!row.name && !row.type && !row.params && !row.returns) continue;
    exportsList.push(row);
  }

  return exportsList;
}

function parseExportSurfaceTSV(lines) {
  // 2) TSV（模块文档 v1 主格式：Tab 分隔）
  var headerIdx = -1;
  for (var i = 0; i < lines.length; i++) {
    var t = trimStr(lines[i]);
    if (!t) continue;
    // 必须包含 Tab，且包含全部列名（允许多个 Tab）
    if (t.indexOf("\t") >= 0 &&
        t.indexOf("导出符号") >= 0 &&
        t.indexOf("类型") >= 0 &&
        t.indexOf("参数") >= 0 &&
        t.indexOf("返回") >= 0 &&
        t.indexOf("环境") >= 0 &&
        t.indexOf("副作用") >= 0 &&
        t.indexOf("备注") >= 0) {
      headerIdx = i;
      break;
    }
  }
  if (headerIdx === -1) return [];

  var exportsList = [];
  for (var j = headerIdx + 1; j < lines.length; j++) {
    var line = trimStr(lines[j]);
    if (!line) break;
    // 遇到下一节标题即停止（兼容“最小使用示例”紧跟在表后）
    if (line === "最小使用示例：3~10 行，能跑") break;
    if (line.indexOf("```") === 0) break;

    // split by 1+ tabs
    var parts = line.split(/\t+/);
    if (!parts || parts.length === 0) continue;
    while (parts.length < 7) parts.push("");
    if (parts.length > 7) parts = parts.slice(0, 7);

    var row = normalizeExportRowCells(parts);
    if (!row.name && !row.type && !row.params && !row.returns) continue;
    exportsList.push(row);
  }

  return exportsList;
}

function toPosixRel(p) {
  if (!p) return null;
  return p.split(path.sep).join("/");
}

function generateTSV(modules) {
  var lines = [];
  lines.push([
    "domain",
    "module",
    "docPath",
    "entryPath",
    "moduleEnv",
    "exportName",
    "exportType",
    "params",
    "returns",
    "exportEnv",
    "sideEffects",
    "notes"
  ].join("\t"));

  for (var i = 0; i < modules.length; i++) {
    var mod = modules[i];
    if (!mod.exports || mod.exports.length === 0) {
      lines.push([
        mod.domain,
        mod.module,
        mod.docPath,
        mod.entryPath || "",
        mod.environment || "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
      ].join("\t"));
      continue;
    }

    for (var j = 0; j < mod.exports.length; j++) {
      var ex = mod.exports[j];
      lines.push([
        mod.domain,
        mod.module,
        mod.docPath,
        mod.entryPath || "",
        mod.environment || "",
        ex.name || "",
        ex.type || "",
        ex.params || "",
        ex.returns || "",
        ex.env || "",
        ex.sideEffects || "",
        ex.notes || ""
      ].join("\t"));
    }
  }

  return lines.join("\n") + "\n";
}

function generateHumanMd(modules, meta) {
  // 统计
  var byDomain = {};
  var totalExports = 0;
  for (var i = 0; i < modules.length; i++) {
    var d = modules[i].domain || "unknown";
    if (!byDomain[d]) byDomain[d] = { modules: 0, exports: 0 };
    byDomain[d].modules++;
    byDomain[d].exports += modules[i].exports ? modules[i].exports.length : 0;
    totalExports += modules[i].exports ? modules[i].exports.length : 0;
  }

  function mdTable(rows) {
    return rows.join("\n") + "\n";
  }

  var lines = [];
  lines.push("# 对接资源包（Export Surface 聚合）");
  lines.push("");
  lines.push("- 生成时间：`" + meta.generatedAt + "`");
  lines.push("- Schema：`" + meta.schema + "`");
  lines.push("- 机器索引：`reports/exports-index.json`、`reports/exports-index.tsv`");
  lines.push("- 来源：`docs/当前文档/模块文档/**.md` 的 “导出列表（Export Surface）” 表格");
  lines.push("");
  lines.push("## 快速使用");
  lines.push("");
  lines.push("- 重新生成：`node scripts/generate-exports-index.js`");
  lines.push("- 典型消费：按 `domain/module/exportName` 检索，或用 TSV 做全文检索");
  lines.push("");
  lines.push("## 汇总");
  lines.push("");
  lines.push("- 模块数：`" + modules.length + "`");
  lines.push("- 导出行数（Export Surface 行）：`" + totalExports + "`");
  lines.push("");
  lines.push("域\t模块数\t导出行数");
  for (var domain in byDomain) {
    if (byDomain.hasOwnProperty(domain)) {
      lines.push(domain + "\t" + byDomain[domain].modules + "\t" + byDomain[domain].exports);
    }
  }
  lines.push("");
  lines.push("## 按域汇总（模块级）");
  lines.push("");

  // 稳定输出：域名排序
  var domainNames = [];
  for (var d in byDomain) {
    if (byDomain.hasOwnProperty(d)) domainNames.push(d);
  }
  domainNames.sort();

  for (var di = 0; di < domainNames.length; di++) {
    var domainName = domainNames[di];
    lines.push("### " + domainName);
    lines.push("");
    var table = [];
    table.push("| 模块 | 入口 | 环境 | 导出数 | 文档 | 关键导出(前3) |");
    table.push("| --- | --- | --- | --- | --- | --- |");

    // 过滤该域模块并按模块名排序
    var domainModules = [];
    for (var mi = 0; mi < modules.length; mi++) {
      if (modules[mi].domain === domainName) domainModules.push(modules[mi]);
    }
    domainModules.sort(function(a, b) {
      return String(a.module).localeCompare(String(b.module));
    });

    for (var mj = 0; mj < domainModules.length; mj++) {
      var mod = domainModules[mj];
      var exportNames = [];
      if (mod.exports) {
        for (var ej = 0; ej < mod.exports.length; ej++) {
          if (mod.exports[ej] && mod.exports[ej].name) exportNames.push(mod.exports[ej].name);
        }
      }
      var top3 = exportNames.slice(0, 3).join(", ");
      table.push("| " +
        stripBackticks(mod.module) + " | " +
        (mod.entryPath ? "`" + mod.entryPath + "`" : "未确认") + " | " +
        (mod.environment || "未确认") + " | " +
        String(mod.exports ? mod.exports.length : 0) + " | " +
        "`" + mod.docPath + "`" + " | " +
        (top3 ? "`" + top3 + "`" : "") +
        " |");
    }

    lines.push(mdTable(table));
  }

  lines.push("## 说明与约束");
  lines.push("");
  lines.push("- 本文件不替代单模块文档；单模块文档仍是“唯一事实来源”。");
  lines.push("- 若某模块缺失 entryPath/moduleEnv，表示文档中未解析到对应字段（不代表不存在）。");
  lines.push("");

  return lines.join("\n") + "\n";
}

function main() {
  if (!fs.existsSync(DOCS_ROOT)) {
    console.error("[exports-index] docs root not found:", DOCS_ROOT);
    process.exit(1);
  }

  ensureDir(REPORTS_DIR);

  var files = listMarkdownFiles(DOCS_ROOT);
  files.sort();

  var modules = [];
  for (var i = 0; i < files.length; i++) {
    var docPathAbs = files[i];
    var relDocPath = toPosixRel(path.relative(PROJECT_ROOT, docPathAbs));

    var text = readUtf8(docPathAbs);
    var lines = splitLines(text);

    var dm = parseDomainAndModule(docPathAbs);
    var moduleEnv = parseModuleEnvironment(lines);
    var entryPath = parseEntryPath(lines);
    var exportsList = parseExportSurfaceTable(lines);
    if (!exportsList || exportsList.length === 0) {
      exportsList = parseExportSurfaceTSV(lines);
    }

    modules.push({
      domain: dm.domain,
      module: dm.module,
      docPath: relDocPath,
      entryPath: entryPath,
      environment: moduleEnv,
      exports: exportsList
    });
  }

  var generatedAt = new Date().toISOString();
  var jsonObj = {
    generatedAt: generatedAt,
    schema: SCHEMA_ID,
    modules: modules
  };

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(jsonObj, null, 2), "utf8");
  fs.writeFileSync(OUTPUT_TSV, generateTSV(modules), "utf8");
  fs.writeFileSync(OUTPUT_MD, generateHumanMd(modules, { generatedAt: generatedAt, schema: SCHEMA_ID }), "utf8");

  console.log("[exports-index] modules:", modules.length);
  console.log("[exports-index] wrote:", toPosixRel(path.relative(PROJECT_ROOT, OUTPUT_JSON)));
  console.log("[exports-index] wrote:", toPosixRel(path.relative(PROJECT_ROOT, OUTPUT_TSV)));
  console.log("[exports-index] wrote:", toPosixRel(path.relative(PROJECT_ROOT, OUTPUT_MD)));
}

main();
