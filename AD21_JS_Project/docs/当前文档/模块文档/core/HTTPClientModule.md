模块定位

一句话：提供 AD(JScript/ES3) 环境下的最小 HTTP 同步调用能力，用于与本地 Node/浏览器侧服务做闭环联调。

适用环境：AD

稳定程度：实验

入口与导出

入口文件（路径）

AD21_JS_Project/src/modules/http-client/index.js

导出列表（Export Surface）：导出符号、类型、用途（表格）

导出符号	类型	参数	返回	环境	副作用	备注
HTTPClientModule	Object	-	-	AD	ActiveX/写UI日志	IIFE模块导出
HTTP客户端	Object	-	-	AD	ActiveX/写UI日志	兼容中文变量名（别名）
request	Function	method,url,body,headers	{ok,status,text,json}	AD	发起同步HTTP	内部创建XMLHTTP
ping	Function	baseUrl:string	boolean	AD	发起HTTP/写UI日志	GET /ping -> pong
sendCommand	Function	baseUrl,cmd,params	Object	AD	发起HTTP/写UI日志	POST /api/command(JSON)
ui	Function	msg:string	void	AD	写UILogger/memLog/ShowMessage	日志通道封装

最小使用示例：3~10 行，能跑

```js
// AD侧：先启动 node AD21_JS_Project/web-mock/mock-server-es3.js
var baseUrl = "http://127.0.0.1:8080";
HTTPClientModule.ping(baseUrl);
var r = HTTPClientModule.sendCommand(baseUrl, "mock.echo", { hello: "world" });
```

依赖与耦合

直接依赖模块列表（路径 + 依赖原因）

- AD21_JS_Project/src/modules/http-client/index.js：不依赖其他业务模块；可选使用UILoggerModule输出

运行时依赖（AD API / ActiveX / UI控件 / 外部文件）

- ActiveXObject("MSXML2.XMLHTTP"/"Microsoft.XMLHTTP")：发起同步 HTTP
- memLog：可选UI日志输出（若存在）
- UILoggerModule：可选UI日志输出（若存在）

运行行为

初始化时做什么

- 无显式初始化；按需创建 XMLHTTP 并发送请求

运行时会写哪里（UI 控制台 / Output 面板 / 文件 / 弹窗）

- 优先 UILoggerModule.uiInfo，其次 memLog，最后 ShowMessage（若存在）

测试与验证

如何在 Node 跑（启动Mock服务）

- node AD21_JS_Project/web-mock/mock-server-es3.js

如何在 AD 验证

- 运行：测试_最小通信流程()（定义于 AD21_JS_Project/src/core/global-events.js）

