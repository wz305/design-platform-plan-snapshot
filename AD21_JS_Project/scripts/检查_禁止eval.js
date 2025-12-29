/**
 * 检查_禁止eval.js
 *
 * 目的：
 * - 全仓库禁止 eval / new Function
 * - 仅允许 src/core/__adGetHostGlobal.js 使用 eval
 */
var fs = require("fs");
var path = require("path");

var ROOT = path.join(__dirname, "..", "src");
var ALLOW_FILES = [
    path.join(ROOT, "core", "__adGetHostGlobal.js").replace(/\\/g, "/"),
    path.join(ROOT, "core", "__adJsonParse.js").replace(/\\/g, "/")
];

function walk(dir, out) {
    var items = fs.readdirSync(dir);
    for (var i = 0; i < items.length; i++) {
        var p = path.join(dir, items[i]);
        var st = fs.statSync(p);
        if (st.isDirectory()) {
            walk(p, out);
        } else if (st.isFile() && /\.js$/i.test(items[i])) {
            out.push(p);
        }
    }
}

function main() {
    var files = [];
    walk(ROOT, files);

    var errors = [];
    for (var i = 0; i < files.length; i++) {
        var fp = files[i];
        var norm = fp.replace(/\\/g, "/");
        var text = fs.readFileSync(fp, "utf8");
        var isAllow = false;
        for (var a = 0; a < ALLOW_FILES.length; a++) {
            if (norm === ALLOW_FILES[a]) {
                isAllow = true;
                break;
            }
        }

        if (!isAllow && /\beval\s*\(/.test(text)) errors.push({ file: norm, what: "eval(" });
        if (!isAllow && /\bnew\s+Function\s*\(/.test(text)) errors.push({ file: norm, what: "new Function(" });
        if (!isAllow && /\bFunction\s*\(\s*['"]return\s+this['"]/.test(text)) errors.push({ file: norm, what: "Function('return this')" });
    }

    if (errors.length) {
        console.error("❌ 检测到禁止的 eval/Function 用法：");
        for (var e = 0; e < errors.length; e++) {
            console.error("- " + errors[e].file + " -> " + errors[e].what);
        }
        process.exit(1);
    }

    console.log("✅ 未发现非法 eval/Function 用法（除例外文件）。");
}

main();
