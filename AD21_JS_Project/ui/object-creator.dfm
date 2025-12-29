object ObjectCreatorForm: TObjectCreatorForm
  Left = 200
  Top = 100
  Caption = 'PCB对象创建器'
  ClientHeight = 400
  ClientWidth = 500
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
object pnlMain: TPanel
    Left = 0
    Top = 0
    Width = 500
    Height = 400
    Align = alClient
    BevelOuter = bvLowered
    TabOrder = 0
    object pnlTypeSelection: TPanel
      Left = 10
      Top = 10
      Width = 480
      Height = 60
      BevelOuter = bvNone
      TabOrder = 0
      object lblObjectType: TLabel
        Left = 0
        Top = 5
        Width = 70
        Height = 13
        Caption = '对象类型:'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'Tahoma'
        Font.Style = [fsBold]
        ParentFont = False
      end
      object cmbObjectType: TComboBox
        Left = 75
        Top = 2
        Width = 150
        Height = 21
        Style = csDropDownList
        TabOrder = 0
        OnChange = cmbObjectTypeChange
        Items.Strings = (
          'Track'
          'Pad'
          'Via'
          'Arc'
        )
      end
      object lblDescription: TLabel
        Left = 0
        Top = 30
        Width = 480
        Height = 25
        AutoSize = False
        Caption = '请选择要创建的PCB对象类型'
        WordWrap = True
      end
    end
    object pnlPosition: TPanel
      Left = 10
      Top = 80
      Width = 480
      Height = 80
      BevelOuter = bvNone
      TabOrder = 1
      object lblPosition: TLabel
        Left = 0
        Top = 5
        Width = 70
        Height = 13
        Caption = '位置坐标:'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'Tahoma'
        Font.Style = [fsBold]
        ParentFont = False
      end
      object lblX: TLabel
        Left = 75
        Top = 8
        Width = 10
        Height = 13
        Caption = 'X:'
      end
      object edtX: TEdit
        Left = 90
        Top = 5
        Width = 80
        Height = 21
        TabOrder = 0
        Text = '0'
      end
      object lblY: TLabel
        Left = 180
        Top = 8
        Width = 10
        Height = 13
        Caption = 'Y:'
      end
      object edtY: TEdit
        Left = 195
        Top = 5
        Width = 80
        Height = 21
        TabOrder = 1
        Text = '0'
      end
      object btnSetOrigin: TButton
        Left = 285
        Top = 3
        Width = 80
        Height = 25
        Caption = '设为原点'
        TabOrder = 2
        OnClick = btnSetOriginClick
      end
      object chkGridSnap: TCheckBox
        Left = 75
        Top = 35
        Width = 100
        Height = 17
        Caption = '网格对齐'
        Checked = True
        State = cbChecked
        TabOrder = 3
        OnClick = chkGridSnapClick
      end
      object lblGridSize: TLabel
        Left = 180
        Top = 37
        Width = 50
        Height = 13
        Caption = '网格大小:'
      end
      object edtGridSize: TEdit
        Left = 235
        Top = 34
        Width = 40
        Height = 21
        TabOrder = 4
        Text = '5'
        OnChange = edtGridSizeChange
      end
      object lblPositionInfo: TLabel
        Left = 0
        Top = 55
        Width = 480
        Height = 20
        AutoSize = False
        Caption = '当前位置: (0, 0) - 原点位置'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clBlue
        Font.Height = -11
        Font.Name = 'Tahoma'
        Font.Style = []
        ParentFont = False
      end
    end
    object pnlParameters: TPanel
      Left = 10
      Top = 170
      Width = 480
      Height = 150
      BevelOuter = bvNone
      TabOrder = 2
      object lblParameters: TLabel
        Left = 0
        Top = 5
        Width = 70
        Height = 13
        Caption = '对象参数:'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clWindowText
        Font.Height = -11
        Font.Name = 'Tahoma'
        Font.Style = [fsBold]
        ParentFont = False
      end
      object grpTrack: TGroupBox
        Left = 75
        Top = 5
        Width = 400
        Height = 140
        Caption = 'Track 参数'
        TabOrder = 0
        object lblTrackWidth: TLabel
          Left = 10
          Top = 25
          Width = 50
          Height = 13
          Caption = '线宽:'
        end
        object edtTrackWidth: TEdit
          Left = 65
          Top = 22
          Width = 80
          Height = 21
          TabOrder = 0
          Text = '10'
        end
        object lblTrackLayer: TLabel
          Left = 10
          Top = 50
          Width = 50
          Height = 13
          Caption = '图层:'
        end
        object cmbTrackLayer: TComboBox
          Left = 65
          Top = 47
          Width = 120
          Height = 21
          Style = csDropDownList
          TabOrder = 1
          Items.Strings = (
            'Top Layer'
            'Bottom Layer'
            'Mid Layer 1'
            'Mid Layer 2'
          )
        end
        object lblTrackEndX: TLabel
          Left = 200
          Top = 25
          Width = 50
          Height = 13
          Caption = '终点X:'
        end
        object edtTrackEndX: TEdit
          Left = 255
          Top = 22
          Width = 80
          Height = 21
          TabOrder = 2
          Text = '1000'
        end
        object lblTrackEndY: TLabel
          Left = 200
          Top = 50
          Width = 50
          Height = 13
          Caption = '终点Y:'
        end
        object edtTrackEndY: TEdit
          Left = 255
          Top = 47
          Width = 80
          Height = 21
          TabOrder = 3
          Text = '0'
        end
      end
      object grpPad: TGroupBox
        Left = 75
        Top = 5
        Width = 400
        Height = 140
        Caption = 'Pad 参数'
        TabOrder = 1
        Visible = False
        object lblPadSize: TLabel
          Left = 10
          Top = 25
          Width = 50
          Height = 13
          Caption = '尺寸:'
        end
        object edtPadSize: TEdit
          Left = 65
          Top = 22
          Width = 80
          Height = 21
          TabOrder = 0
          Text = '100'
        end
        object lblPadShape: TLabel
          Left = 10
          Top = 50
          Width = 50
          Height = 13
          Caption = '形状:'
        end
        object cmbPadShape: TComboBox
          Left = 65
          Top = 47
          Width = 120
          Height = 21
          Style = csDropDownList
          TabOrder = 1
          Items.Strings = (
            'Rectangular'
            'Rounded'
            'Circular'
          )
        end
        object lblPadLayer: TLabel
          Left = 10
          Top = 75
          Width = 50
          Height = 13
          Caption = '图层:'
        end
        object cmbPadLayer: TComboBox
          Left = 65
          Top = 72
          Width = 120
          Height = 21
          Style = csDropDownList
          TabOrder = 2
          Items.Strings = (
            'Top Layer'
            'Bottom Layer'
            'Multi-Layer'
          )
        end
        object lblPadDesignator: TLabel
          Left = 200
          Top = 25
          Width = 50
          Height = 13
          Caption = '标号:'
        end
        object edtPadDesignator: TEdit
          Left = 255
          Top = 22
          Width = 80
          Height = 21
          TabOrder = 3
          Text = '1'
        end
      end
      object grpVia: TGroupBox
        Left = 75
        Top = 5
        Width = 400
        Height = 140
        Caption = 'Via 参数'
        TabOrder = 2
        Visible = False
        object lblViaSize: TLabel
          Left = 10
          Top = 25
          Width = 50
          Height = 13
          Caption = '尺寸:'
        end
        object edtViaSize: TEdit
          Left = 65
          Top = 22
          Width = 80
          Height = 21
          TabOrder = 0
          Text = '50'
        end
        object lblViaHoleSize: TLabel
          Left = 10
          Top = 50
          Width = 50
          Height = 13
          Caption = '孔径:'
        end
        object edtViaHoleSize: TEdit
          Left = 65
          Top = 47
          Width = 80
          Height = 21
          TabOrder = 1
          Text = '25'
        end
        object lblViaStartLayer: TLabel
          Left = 200
          Top = 25
          Width = 50
          Height = 13
          Caption = '起始层:'
        end
        object cmbViaStartLayer: TComboBox
          Left = 255
          Top = 22
          Width = 120
          Height = 21
          Style = csDropDownList
          TabOrder = 2
          Items.Strings = (
            'Top Layer'
            'Mid Layer 1'
            'Mid Layer 2'
          )
        end
        object lblViaEndLayer: TLabel
          Left = 200
          Top = 50
          Width = 50
          Height = 13
          Caption = '结束层:'
        end
        object cmbViaEndLayer: TComboBox
          Left = 255
          Top = 47
          Width = 120
          Height = 21
          Style = csDropDownList
          TabOrder = 3
          Items.Strings = (
            'Bottom Layer'
            'Mid Layer 1'
            'Mid Layer 2'
          )
        end
      end
      object grpArc: TGroupBox
        Left = 75
        Top = 5
        Width = 400
        Height = 140
        Caption = 'Arc 参数'
        TabOrder = 3
        Visible = False
        object lblArcRadius: TLabel
          Left = 10
          Top = 25
          Width = 50
          Height = 13
          Caption = '半径:'
        end
        object edtArcRadius: TEdit
          Left = 65
          Top = 22
          Width = 80
          Height = 21
          TabOrder = 0
          Text = '500'
        end
        object lblArcStartAngle: TLabel
          Left = 10
          Top = 50
          Width = 50
          Height = 13
          Caption = '起始角:'
        end
        object edtArcStartAngle: TEdit
          Left = 65
          Top = 47
          Width = 80
          Height = 21
          TabOrder = 1
          Text = '0'
        end
        object lblArcEndAngle: TLabel
          Left = 10
          Top = 75
          Width = 50
          Height = 13
          Caption = '结束角:'
        end
        object edtArcEndAngle: TEdit
          Left = 65
          Top = 72
          Width = 80
          Height = 21
          TabOrder = 2
          Text = '90'
        end
        object lblArcLayer: TLabel
          Left = 200
          Top = 25
          Width = 50
          Height = 13
          Caption = '图层:'
        end
        object cmbArcLayer: TComboBox
          Left = 255
          Top = 22
          Width = 120
          Height = 21
          Style = csDropDownList
          TabOrder = 3
          Items.Strings = (
            'Top Layer'
            'Bottom Layer'
            'Mid Layer 1'
          )
        end
      end
    end
    object pnlActions: TPanel
      Left = 10
      Top = 330
      Width = 480
      Height = 85
      BevelOuter = bvNone
      TabOrder = 3
      object btnCreate: TButton
        Left = 200
        Top = 5
        Width = 80
        Height = 25
        Caption = '创建对象'
        TabOrder = 0
        OnClick = btnCreateClick
      end
      object btnCreateAtOrigin: TButton
        Left = 290
        Top = 5
        Width = 90
        Height = 25
        Caption = '在原点创建'
        TabOrder = 1
        OnClick = btnCreateAtOriginClick
      end
      object btnCancel: TButton
        Left = 390
        Top = 5
        Width = 80
        Height = 25
        Caption = '取消'
        TabOrder = 2
        OnClick = btnCancelClick
      end
      object btnValidate: TButton
        Left = 10
        Top = 5
        Width = 80
        Height = 25
        Caption = '验证参数'
        TabOrder = 3
        OnClick = btnValidateClick
      end
      object btnReset: TButton
        Left = 100
        Top = 5
        Width = 80
        Height = 25
        Caption = '重置'
        TabOrder = 4
        OnClick = btnResetClick
      end
      object btnHttpSmokeTest: TButton
        Left = 10
        Top = 32
        Width = 170
        Height = 25
        Caption = '最小通信测试(HTTP)'
        TabOrder = 5
        OnClick = btnHttpSmokeTestClick
      end
      object lblStatus: TLabel
        Left = 0
        Top = 60
        Width = 480
        Height = 20
        AutoSize = False
        Caption = '就绪'
        Font.Charset = DEFAULT_CHARSET
        Font.Color = clGreen
        Font.Height = -11
        Font.Name = 'Tahoma'
        Font.Style = []
        ParentFont = False
      end
    end
  end
end
