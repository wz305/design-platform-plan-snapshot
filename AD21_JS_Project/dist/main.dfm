object MainForm: TMainForm
  Left = 100
  Top = 100
  Caption = 'AD21 JS Project - Main Interface'
  ClientHeight = 600
  ClientWidth = 800
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'Tahoma'
  Font.Style = []
  OldCreateOrder = False
  Position = poScreenCenter
  PixelsPerInch = 96
  TextHeight = 13
  object pnlTop: TPanel
    Left = 0
    Top = 0
    Width = 800
    Height = 140
    Align = alTop
    BevelOuter = bvLowered
    TabOrder = 0
    object pnlTasks: TPanel
      Left = 10
      Top = 8
      Width = 780
      Height = 30
      BevelOuter = bvNone
      TabOrder = 0
      object lblTasks: TLabel
        Left = 0
        Top = 7
        Width = 70
        Height = 13
        Caption = '任务入口:'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'Tahoma'
        Font.Style = [fsBold]
        ParentFont = False
      end
      object btnHttpSmokeTest: TButton
        Left = 75
        Top = 5
        Width = 120
        Height = 22
        Caption = 'HTTP最小测试'
        TabOrder = 0
        OnClick = btnHttpSmokeTestClick
      end
      object btnComponentTest: TButton
        Left = 200
        Top = 5
        Width = 90
        Height = 22
        Caption = '组件测试'
        TabOrder = 1
        OnClick = btnComponentTestClick
      end
      object cmbProbeScope: TComboBox
        Left = 295
        Top = 5
        Width = 160
        Height = 21
        Style = csDropDownList
        ItemIndex = 1
        TabOrder = 2
        Items.Strings = (
          'safe(v3)'
          'safe+maybe(v3)'
          'all(v3 safe+maybe+risky)'
        )
      end
    end
    object pnlLogOps: TPanel
      Left = 10
      Top = 42
      Width = 780
      Height = 30
      BevelOuter = bvNone
      TabOrder = 1
      object lblLogOps: TLabel
        Left = 0
        Top = 7
        Width = 70
        Height = 13
        Caption = '日志操作:'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'Tahoma'
        Font.Style = [fsBold]
        ParentFont = False
      end
      object btnOutputLog: TButton
        Left = 75
        Top = 5
        Width = 80
        Height = 22
        Caption = '输出日志'
        TabOrder = 0
        OnClick = btnOutputLogClick
      end
      object btnSaveLog: TButton
        Left = 160
        Top = 5
        Width = 80
        Height = 22
        Caption = '保存日志'
        TabOrder = 1
        OnClick = btnSaveLogClick
      end
      object btnClearDisplay: TButton
        Left = 245
        Top = 5
        Width = 80
        Height = 22
        Caption = '清空显示'
        TabOrder = 2
        OnClick = btnClearDisplayClick
      end
    end
    object pnlGeneration: TPanel
      Left = 10
      Top = 76
      Width = 380
      Height = 30
      BevelOuter = bvNone
      TabOrder = 2
      object lblGeneration: TLabel
        Left = 0
        Top = 7
        Width = 70
        Height = 13
        Caption = '生成控制:'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'Tahoma'
        Font.Style = [fsBold]
        ParentFont = False
      end
      object chkGenDebug: TCheckBox
        Left = 75
        Top = 5
        Width = 60
        Height = 17
        Caption = 'DEBUG'
        Checked = True
        State = cbChecked
        TabOrder = 0
        OnClick = chkGenDebugClick
      end
      object chkGenInfo: TCheckBox
        Left = 140
        Top = 5
        Width = 50
        Height = 17
        Caption = 'INFO'
        Checked = True
        State = cbChecked
        TabOrder = 1
        OnClick = chkGenInfoClick
      end
      object chkGenWarn: TCheckBox
        Left = 195
        Top = 5
        Width = 55
        Height = 17
        Caption = 'WARN'
        Checked = True
        State = cbChecked
        TabOrder = 2
        OnClick = chkGenWarnClick
      end
      object chkGenError: TCheckBox
        Left = 255
        Top = 5
        Width = 55
        Height = 17
        Caption = 'ERROR'
        Checked = True
        State = cbChecked
        TabOrder = 3
        OnClick = chkGenErrorClick
      end
    end
    object pnlDisplay: TPanel
      Left = 410
      Top = 76
      Width = 380
      Height = 30
      BevelOuter = bvNone
      TabOrder = 3
      object lblDisplay: TLabel
        Left = 0
        Top = 7
        Width = 70
        Height = 13
        Caption = '显示控制:'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'Tahoma'
        Font.Style = [fsBold]
        ParentFont = False
      end
      object chkUIDebug: TCheckBox
        Left = 75
        Top = 5
        Width = 60
        Height = 17
        Caption = 'DEBUG'
        Checked = True
        State = cbChecked
        TabOrder = 0
        OnClick = chkUIDebugClick
      end
      object chkUIInfo: TCheckBox
        Left = 140
        Top = 5
        Width = 50
        Height = 17
        Caption = 'INFO'
        Checked = True
        State = cbChecked
        TabOrder = 1
        OnClick = chkUIInfoClick
      end
      object chkUIWarn: TCheckBox
        Left = 195
        Top = 5
        Width = 55
        Height = 17
        Caption = 'WARN'
        Checked = True
        State = cbChecked
        TabOrder = 2
        OnClick = chkUIWarnClick
      end
      object chkUIError: TCheckBox
        Left = 255
        Top = 5
        Width = 55
        Height = 17
        Caption = 'ERROR'
        Checked = True
        State = cbChecked
        TabOrder = 3
        OnClick = chkUIErrorClick
      end
    end
    object pnlModes: TPanel
      Left = 10
      Top = 108
      Width = 780
      Height = 25
      BevelOuter = bvNone
      TabOrder = 4
      object lblModes: TLabel
        Left = 0
        Top = 4
        Width = 70
        Height = 13
        Caption = '快捷模式:'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'Tahoma'
        Font.Style = [fsBold]
        ParentFont = False
      end
      object btnDevMode: TButton
        Left = 75
        Top = 0
        Width = 80
        Height = 22
        Caption = '开发模式'
        TabOrder = 0
        OnClick = btnDevModeClick
      end
      object btnProdMode: TButton
        Left = 165
        Top = 0
        Width = 80
        Height = 22
        Caption = '生产模式'
        TabOrder = 1
        OnClick = btnProdModeClick
      end
      object btnDebugMode: TButton
        Left = 255
        Top = 0
        Width = 80
        Height = 22
        Caption = '调试模式'
        TabOrder = 2
        OnClick = btnDebugModeClick
      end
      object btnSilentMode: TButton
        Left = 345
        Top = 0
        Width = 80
        Height = 22
        Caption = '静默模式'
        TabOrder = 3
        OnClick = btnSilentModeClick
      end
    end
  end
  object pnlMain: TPanel
    Left = 0
    Top = 140
    Width = 800
    Height = 460
    Align = alClient
    BevelOuter = bvNone
    TabOrder = 1
    object pnlConsoleHeader: TPanel
      Left = 0
      Top = 0
      Width = 800
      Height = 24
      Align = alTop
      BevelOuter = bvNone
      TabOrder = 0
      object lblConsole: TLabel
        Left = 8
        Top = 5
        Width = 46
        Height = 13
        Caption = '控制台'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'Tahoma'
        Font.Style = [fsBold]
        ParentFont = False
      end
    end
    object memLog: TMemo
      Left = 0
      Top = 24
      Width = 800
      Height = 436
      Align = alClient
      ScrollBars = ssBoth
      TabOrder = 1
    end
  end
end
