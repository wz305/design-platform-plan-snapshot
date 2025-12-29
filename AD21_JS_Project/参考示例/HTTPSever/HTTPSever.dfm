object CopyBoardOutlineForm: TCopyBoardOutlineForm
  Left = 30
  Top = 110
  BorderStyle = bsDialog
  Caption = 'Copy Board Outline'
  ClientHeight = 208
  ClientWidth = 240
  Color = clBtnFace
  Font.Charset = GB2312_CHARSET
  Font.Color = clWindowText
  Font.Height = -14
  Font.Name = 'Microsoft Sans Serif'
  Font.Style = []
  OldCreateOrder = False
  Position = poMainFormCenter
  FormKind = fkServerPanel
  PixelsPerInch = 120
  TextHeight = 17
  object lEnterWidth: TLabel
    Left = 11
    Top = 20
    Width = 206
    Height = 17
    Margins.Left = 4
    Margins.Top = 4
    Margins.Right = 4
    Margins.Bottom = 4
    Caption = 'Enter Width for Tracks and Arcs:'
  end
  object lEnterLayer: TLabel
    Left = 14
    Top = 90
    Width = 130
    Height = 17
    Margins.Left = 4
    Margins.Top = 4
    Margins.Right = 4
    Margins.Bottom = 4
    Caption = 'Choose a PCB layer:'
  end
  object eWidth: TEdit
    Left = 10
    Top = 40
    Width = 180
    Height = 25
    Margins.Left = 4
    Margins.Top = 4
    Margins.Right = 4
    Margins.Bottom = 4
    TabOrder = 0
    Text = '10mil'
  end
  object cbLayers: TComboBox
    Left = 10
    Top = 110
    Width = 181
    Height = 25
    Margins.Left = 4
    Margins.Top = 4
    Margins.Right = 4
    Margins.Bottom = 4
    Style = csDropDownList
    ItemIndex = 0
    TabOrder = 1
    Text = 'Mechanical Layer 1'
    Items.Strings = (
      'Mechanical Layer 1'
      'Mechanical Layer 2'
      'Mechanical Layer 3'
      'Mechanical Layer 4'
      'Mechanical Layer 5'
      'Mechanical Layer 6'
      'Mechanical Layer 7'
      'Mechanical Layer 8'
      'Mechanical Layer 9'
      'Mechanical Layer 10'
      'Mechanical Layer 11'
      'Mechanical Layer 12'
      'Mechanical Layer 13'
      'Mechanical Layer 14'
      'Mechanical Layer 15'
      'Mechanical Layer 16'
      'Drill Guide'
      'Keep Out'
      'Drill Drawing')
  end
  object bReceive: TButton
    Left = 6
    Top = 141
    Width = 94
    Height = 31
    Margins.Left = 4
    Margins.Top = 4
    Margins.Right = 4
    Margins.Bottom = 4
    Cancel = True
    Caption = 'Receive'
    Default = True
    TabOrder = 2
    OnClick = bReceiveClick
  end
  object bCancel: TButton
    Left = 106
    Top = 141
    Width = 94
    Height = 31
    Margins.Left = 4
    Margins.Top = 4
    Margins.Right = 4
    Margins.Bottom = 4
    Cancel = True
    Caption = 'Cancel'
    Default = True
    TabOrder = 4
    OnClick = bCancelClick
  end
  object XPButton1: TXPButton
    Left = 48
    Top = 160
    Width = 0
    Height = 0
    Caption = 'XPButton1'
    ParentColor = False
    TabOrder = 5
    TabStop = False
  end
  object bSend: TButton
    Left = 8
    Top = 176
    Width = 75
    Height = 25
    Cancel = True
    Caption = 'Send'
    Default = True
    TabOrder = 3
    OnClick = bSendClick
  end
end
