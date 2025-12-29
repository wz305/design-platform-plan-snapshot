/**
 * 检查_禁止遮蔽宿主全局.js
 *
 * 目的：
 * - 防止合并后的同一作用域中出现 `var PCBServer` 等遮蔽
 * - 出现即构建失败
 */
var fs = require("fs");
var path = require("path");

var ROOT = path.join(__dirname, "..", "src");
var RESERVED = ["PCBServer", "Client", "SchServer", "GetWorkspace", "Workspace"];
var PATTERNS = [
    function (n) { return new RegExp("\\bvar\\s+" + n + "\\b"); },
    function (n) { return new RegExp("\\bfunction\\s+" + n + "\\b"); },
    function (n) { return new RegExp("\\b" + n + "\\s*=(?!=)"); }
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
        var text = fs.readFileSync(fp, "utf8");
        for (var j = 0; j < RESERVED.length; j++) {
            var name = RESERVED[j];
            for (var k = 0; k < PATTERNS.length; k++) {
                var re = PATTERNS[k](name);
                if (re.test(text)) {
                    errors.push({ file: fp, name: name, pattern: re.toString() });
                }
            }
        }
    }

    if (errors.length) {
        console.error("❌ 检测到遮蔽/覆盖宿主全局符号（必须修复）：");
        for (var e = 0; e < errors.length; e++) {
            console.error("- " + errors[e].file + " -> " + errors[e].name + " (" + errors[e].pattern + ")");
        }
        process.exit(1);
    }

    console.log("✅ 未发现遮蔽宿主全局符号的代码。");
}

main();
