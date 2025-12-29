#!/usr/bin/env node

/**
 * NPM Documentation Fetcher
 * 
 * 功能：从 npm registry 获取指定包的最新文档和 README
 * 使用方式：
 *   node npm-doc-fetcher.js <package-name>
 *   node npm-doc-fetcher.js <package-name> --version <version>
 *   node npm-doc-fetcher.js <package-name> --output <output-file>
 */

var https = require("https");
var fs = require("fs");
var path = require("path");

// 配置
var CONFIG = {
  registryUrl: "registry.npmjs.org",
  timeout: 30000,
  outputDir: "docs/npm-docs"
};

// 日志函数
function log(message, level) {
  level = level || "info";
  var timestamp = new Date().toISOString();
  console.log("[" + timestamp + "] [" + level.toUpperCase() + "] " + message);
}

function logError(message) {
  log(message, "error");
}

function logInfo(message) {
  log(message, "info");
}

function logSuccess(message) {
  log(message, "success");
}

// HTTP 请求函数
function makeHttpsRequest(options) {
  return new Promise(function(resolve, reject) {
    var timeoutId;
    
    var req = https.request(options, function(res) {
      var data = "";
      
      res.on("data", function(chunk) {
        data += chunk;
      });
      
      res.on("end", function() {
        clearTimeout(timeoutId);
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            var result = JSON.parse(data);
            resolve(result);
          } else {
            reject(new Error("HTTP " + res.statusCode + ": " + res.statusMessage));
          }
        } catch (error) {
          reject(new Error("Failed to parse response: " + error.message));
        }
      });
    });
    
    req.on("error", function(error) {
      clearTimeout(timeoutId);
      reject(error);
    });
    
    timeoutId = setTimeout(function() {
      req.destroy();
      reject(new Error("Request timeout after " + CONFIG.timeout + "ms"));
    }, CONFIG.timeout);
    
    req.end();
  });
}

// 获取包信息
function getPackageInfo(packageName, version) {
  logInfo("Fetching package info for: " + packageName + (version ? "@" + version : ""));
  
  var options = {
    hostname: CONFIG.registryUrl,
    path: "/" + packageName,
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  };
  
  return makeHttpsRequest(options).then(function(data) {
    if (version && !data.versions[version]) {
      var availableVersions = Object.keys(data.versions).slice(0, 10).join(", ");
      throw new Error("Version " + version + " not found. Available versions: " + availableVersions + "...");
    }
    
    var targetVersion = version || data["dist-tags"].latest;
    var versionInfo = data.versions[targetVersion];
    
    return {
      name: data.name,
      version: targetVersion,
      description: data.description || "No description available",
      author: data.author ? data.author.name || data.author : "Unknown",
      license: versionInfo.license || "Unknown",
      homepage: data.homepage || "",
      repository: data.repository ? data.repository.url : "",
      keywords: data.keywords || [],
      latestVersion: data["dist-tags"].latest,
      versions: Object.keys(data.versions).slice(0, 20),
      readme: data.readme || "No README available"
    };
  });
}

// 格式化文档
function formatDocumentation(pkgInfo) {
  var sections = [];
  
  // 头部信息
  sections.push("# " + pkgInfo.name);
  sections.push("");
  sections.push("## Package Information");
  sections.push("");
  sections.push("- **Name**: " + pkgInfo.name);
  sections.push("- **Version**: " + pkgInfo.version + (pkgInfo.version !== pkgInfo.latestVersion ? " (Latest: " + pkgInfo.latestVersion + ")" : ""));
  sections.push("- **Description**: " + pkgInfo.description);
  sections.push("- **Author**: " + pkgInfo.author);
  sections.push("- **License**: " + pkgInfo.license);
  if (pkgInfo.homepage) {
    sections.push("- **Homepage**: " + pkgInfo.homepage);
  }
  if (pkgInfo.repository) {
    sections.push("- **Repository**: " + pkgInfo.repository);
  }
  if (pkgInfo.keywords.length > 0) {
    sections.push("- **Keywords**: " + pkgInfo.keywords.join(", "));
  }
  
  // 版本列表
  sections.push("");
  sections.push("## Available Versions");
  sections.push("");
  sections.push(pkgInfo.versions.join(", "));
  
  // README
  sections.push("");
  sections.push("## README");
  sections.push("");
  sections.push(pkgInfo.readme);
  
  return sections.join("\n");
}

// 保存文档到文件
function saveDocumentation(packageName, version, content) {
  var filename = packageName + (version ? "-" + version : "") + ".md";
  var filepath = path.join(CONFIG.outputDir, filename);
  
  // 确保输出目录存在
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }
  
  fs.writeFileSync(filepath, content, "utf8");
  logSuccess("Documentation saved to: " + filepath);
  
  return filepath;
}

// 解析命令行参数
function parseArguments(args) {
  var result = {
    packageName: null,
    version: null,
    outputFile: null
  };
  
  for (var i = 0; i < args.length; i++) {
    var arg = args[i];
    
    if (arg === "--version" && i + 1 < args.length) {
      result.version = args[i + 1];
      i++;
    } else if (arg === "--output" && i + 1 < args.length) {
      result.outputFile = args[i + 1];
      i++;
    } else if (!arg.startsWith("--")) {
      result.packageName = arg;
    }
  }
  
  return result;
}

// 主函数
function main() {
  var args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log("");
    console.log("NPM Documentation Fetcher");
    console.log("");
    console.log("Usage:");
    console.log("  node npm-doc-fetcher.js <package-name>");
    console.log("  node npm-doc-fetcher.js <package-name> --version <version>");
    console.log("  node npm-doc-fetcher.js <package-name> --output <output-file>");
    console.log("");
    console.log("Examples:");
    console.log("  node npm-doc-fetcher.js express");
    console.log("  node npm-doc-fetcher.js lodash --version 4.17.21");
    console.log("  node npm-doc-fetcher.js react --output my-react-doc.md");
    console.log("");
    process.exit(1);
  }
  
  var options = parseArguments(args);
  
  if (!options.packageName) {
    logError("Package name is required");
    process.exit(1);
  }
  
  logInfo("Starting documentation fetch...");
  
  getPackageInfo(options.packageName, options.version)
    .then(function(pkgInfo) {
      logSuccess("Package info fetched successfully");
      logInfo("Version: " + pkgInfo.version);
      logInfo("Description: " + pkgInfo.description);
      
      var content = formatDocumentation(pkgInfo);
      var outputFile = options.outputFile || path.join(CONFIG.outputDir, pkgInfo.name + (options.version ? "-" + options.version : "") + ".md");
      
      // 确保输出目录存在
      var outputDir = path.dirname(outputFile);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      fs.writeFileSync(outputFile, content, "utf8");
      logSuccess("Documentation saved to: " + outputFile);
      
      logInfo("Done!");
    })
    .catch(function(error) {
      logError("Failed to fetch documentation: " + error.message);
      process.exit(1);
    });
}

// 运行主函数
main();
