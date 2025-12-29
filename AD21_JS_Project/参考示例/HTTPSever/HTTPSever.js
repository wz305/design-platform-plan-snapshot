// 全局变量
var SERVER_URL = "http://127.0.0.1:8080";
var PCB_Board;
var testmode = 0; // 测试模式开关

// -----------------------------
// 测试服务器连接
// -----------------------------
function testServerConnection() {
    try {
        var http = new ActiveXObject("MSXML2.XMLHTTP");
        http.open("GET", SERVER_URL + "/ping", false);
        http.send();
        
        if (http.status == 200 && http.responseText == "pong") {
            if (testmode) ShowMessage("连接测试成功！服务器正常运行");
            return true;
        } else {
            ShowMessage("连接测试失败: " + http.status + " - " + http.statusText);
            return false;
        }
    } catch (e) {
        handleConnectionError(e);
        return false;
    }
}

// -----------------------------
// 处理连接错误
// -----------------------------
function handleConnectionError(e) {
    var errorMsg = "连接异常: ";
    
    if (e.number === -2147012894) {
        errorMsg += "连接服务器超时，请检查服务器是否运行";
    } else if (e.number === -2147012867) {
        errorMsg += "无法连接到服务器，请检查网络连接";
    } else {
        errorMsg += e.message;
    }
    
    ShowMessage(errorMsg);
}

// -----------------------------
// 获取板框数据
// -----------------------------
function getBoardOutlineData() {
    if (!PCB_Board) PCB_Board = PCBServer.GetCurrentPCBBoard;
    if (!PCB_Board) {
        ShowMessage("没有 PCB 板！");
        return null;
    }

    var outlineData = [];
    PCB_Board.BoardOutline.Invalidate();
    PCB_Board.BoardOutline.Rebuild();
    PCB_Board.BoardOutline.Validate();

    for (var i = 0; i < PCB_Board.BoardOutline.PointCount; i++) {
        var j = (i == PCB_Board.BoardOutline.PointCount - 1) ? 0 : i + 1;
        var seg = PCB_Board.BoardOutline.Segments(i);

        if (seg.Kind == ePolySegmentLine) {
            outlineData.push({
                kind: "line",
                x1: seg.vx,
                y1: seg.vy,
                x2: PCB_Board.BoardOutline.Segments(j).vx,
                y2: PCB_Board.BoardOutline.Segments(j).vy
            });
        } else {
            outlineData.push({
                kind: "arc",
                cx: seg.cx,
                cy: seg.cy,
                radius: seg.Radius,
                startAngle: seg.Angle1,
                endAngle: seg.Angle2
            });
        }
    }

    return {
        type: "outline",
        data: outlineData
    };
}

// -----------------------------
// 创建线段对象
// -----------------------------
function create_line(seg, layer, width) {
    if (!PCB_Board) {
        ShowMessage("PCB板未初始化");
        return;
    }
    
    if (seg.kind == "line") {
        var track = PCBServer.PCBObjectFactory(eTrackObject, eNoDimension, eCreate_Default);
        track.X1 = seg.x1;
        track.Y1 = seg.y1;
        track.X2 = seg.x2;
        track.Y2 = seg.y2;
        track.Layer = layer;
        track.Width = width;
        PCB_Board.AddPCBObject(track);
    }
    else if (seg.kind == "arc") {
        var arc = PCBServer.PCBObjectFactory(eArcObject, eNoDimension, eCreate_Default);
        arc.XCenter = seg.cx;
        arc.YCenter = seg.cy;
        arc.Radius = seg.radius;
        arc.StartAngle = seg.startAngle;
        arc.EndAngle = seg.endAngle;
        arc.Layer = layer;
        arc.LineWidth = width;
        PCB_Board.AddPCBObject(arc);
    }
}

// -----------------------------
// 创建板框轮廓
// -----------------------------
function createBoardOutline(data, layer, width) {
    if (!PCB_Board) PCB_Board = PCBServer.GetCurrentPCBBoard;
    if (!PCB_Board) {
        ShowMessage("没有PCB板！");
        return;
    }
    
    if (!data || !data.data || data.data.length === 0) {
        ShowMessage("没有可用数据");
        return;
    }
    
    PCBServer.PreProcess();
    
    for (var i = 0; i < data.data.length; i++) {
        var seg = data.data[i];
        if (seg.kind == "line" || seg.kind == "arc") {
            create_line(seg, layer, width);
        }
    }
    
    PCBServer.PostProcess();
    PCB_Board.LayerIsDisplayed(layer) = true;
    ResetParameters();
    AddStringParameter("Action", "Redraw");
    RunProcess("PCB:Zoom");
}

// -----------------------------
// 获取层ID
// -----------------------------
function getLayerByName(layerName) {
    switch(layerName) {
        case "Mechanical1": return eMechanical1;
        case "Mechanical2": return eMechanical2;
        case "Mechanical3": return eMechanical3;
        case "Mechanical4": return eMechanical4;
        case "TopLayer": return eTopLayer;
        case "BottomLayer": return eBottomLayer;
        default: return eMechanical1;
    }
}

// -----------------------------
// 发送处理请求（修改重点）
// -----------------------------
function sendProcessingRequest(data, offsetX, offsetY, layer, width) {
    if (!testServerConnection()) {
        if (testmode) ShowMessage("无法连接到服务器");
        return null;
    }
    
    var payload = {
        report_type: "sync", // 新增的同步类型任务
        type: "board_outline",
        data: data.data,
        parameters: {
            offset_x: offsetX,
            offset_y: offsetY,
            layer: layer,
            width: width
        }
    };
    
    try {
        var http = new ActiveXObject("MSXML2.XMLHTTP");
        http.open("POST", SERVER_URL + "/process", false);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(payload));
        
        if (http.status == 200) {
            return JSON.parse(http.responseText);
        } else {
            ShowMessage("请求失败: " + http.status);
            return null;
        }
    } catch (e) {
        handleConnectionError(e);
        return null;
    }
}

// -----------------------------
// 处理服务器响应
// -----------------------------
function handleProcessingResponse(response) {
    if (!response || !response.data) {
        ShowMessage("无效的响应数据");
        return;
    }
    
    var taskData = {
        type: response.type,
        data: response.data
    };
    
    var layer = getLayerByName(response.parameters.layer);
    var width = response.parameters.width;
    
    createBoardOutline(taskData, layer, width);
    if (testmode) ShowMessage("成功创建处理后的线段");
}


// ========================
// 主入口
// ========================
function Main() {
    if (testServerConnection()) {
        if (testmode) ShowMessage("AD与Godot服务器连接正常");
    } else {
        ShowMessage("请检查Godot服务器是否运行在127.0.0.1:8080");
        return;
    }
    
    PCB_Board = PCBServer.GetCurrentPCBBoard;
    if (!PCB_Board) {
        ShowMessage("没有 PCB 板！");
        return;
    }
    
    var outlineData = getBoardOutlineData();
    if (!outlineData) {
        ShowMessage("无法获取板框数据");
        return;
    }
    
    if (testmode) ShowMessage("获取板框数据成功，包含 " + outlineData.data.length + " 个线段");

    // 发送请求并立即处理响应
    var response = sendProcessingRequest(
        outlineData, 
        10000000, 
        10000000, 
        "Mechanical1", 
        100000
    );
    
    if (response) {
        handleProcessingResponse(response);
    } else {
        ShowMessage("处理请求失败");
    }
}

// ========================
// 按钮事件
// ========================
function bCancelClick(Sender) {
    Close();
}