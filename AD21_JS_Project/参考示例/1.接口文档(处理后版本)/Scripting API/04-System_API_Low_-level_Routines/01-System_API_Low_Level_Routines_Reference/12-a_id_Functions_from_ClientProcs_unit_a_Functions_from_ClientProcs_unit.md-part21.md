#### ISch\_ServerInterface Properties

##### FontManager property

\(ISch\_ServerInterface interface\)  
__Syntax__  
Property FontManager : ISch\_FontManager Read GetState\_FontManager;  
__Description__  
This property retrieves the Font manager object which is represented by the ISch\_FontManager interface\. The property is supported by the GetState\_FontManager method\.  
__Example__  
__See also__  
ISch\_Font interface  
ISch\_FontManager2 interface  
ISch\_ServerInterface interface

##### JunctionConvertSettings property

\(ISch\_ServerInterface interface\)  
__Syntax__  
Property JunctionConvertSettings : ISch\_JunctionConvertSettings Read GetState\_JunctionConvertSettings;  
__Description__  
The JunctionConvertSettings property represents a crossing of wiring on a schematic sheet\. When an addition of a wire would create a four\-way junction, this is converted to into two adjacent three way junctions\. If it is disabled and when a four way junction is created, the two wires crossing at the intersection are not joined electrically and if the Display Cross Overs option is enabled, a cross over is shown on this intersection\.  
This property is supported by the GetState\_JunctionConvertSettings method\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
ISch\_JunctionConvertSettings interface

##### Preferences property

\(ISch\_ServerInterface interface\)  
__Syntax__  
Property Preferences : ISch\_Preferences Read GetState\_SchPreferences;  
__Description__  
This Preferences property retrieves the ISch\_Preferences interface which represents the Preferences object for the Schematic Editor\. This read only property is supported by the GetState\_SchPreference method\.  
__Example__

1

Preferences := SchServer\.Preferences;

2

Preferences\.WatermarkDeviceSheet\.True;

3

Preferences\.WatermarkReadOnlySheet := True;

__See also__  
ISch\_Preferences interface  
ISch\_ServerInterface interface

##### ProbesTimerEnabled property

\(ISch\_ServerInterface interface\)  
__Syntax__  
Property ProbesTimerEnabled : Boolean Read GetState\_ProbesTimerEnabled Write SetState\_ProbesTimerEnabled;  
__Description__  
The ProbesTimerEnabled property determines whether the Probes are active or not\. This feature is used in the LiveDesign process in Altium Designer\.  
This property is supported by the GetState\_ProbesTimerEnabled and SetState\_ProbesTimerEnabled methods\.  
__Example__  
__See also__  
ISch\_ServerInterface interface

##### RobotManager property

\(ISch\_ServerInterface interface\)  
__Syntax__  
Property RobotManager : ISch\_RobotManager Read GetState\_RobotManager;  
__Description__  
This property returns the ISch\_RobotManager interface\. This interface deals with sending Schematic notification messages in the system\. To have the ability to send a specific message when a specific event in the Schematic Editor occurs can be achieved with the ISch\_RobotManager interface\.  
This property is supported by the GetState\_RobotManager method\.  
DelphiScript __Example__

01

SchPort := SchServer\.SchObjectFactory\(ePort,eCreate\_GlobalCopy\);

02

If SchPort = Nil Then Exit;

03

SchPort\.Location  := Point\(MilsToCoord\(2500\),MilsToCoord\(2500\)\);

04

SchPort\.Style     := ePortRight;

05

SchPort\.IOType    := ePortBidirectional;

06

SchPort\.Alignment := eHorizontalCentreAlign;

07

SchPort\.Width     := MilsToCoord\(500\);

08

SchPort\.AreaColor := 0;

09

SchPort\.TextColor := $FF00FF;

10

SchPort\.Name      := 'New Port 4';

11

  

12

// Add a new port object in the existing Schematic document\.

13

Doc\.RegisterSchObjectInContainer\(SchPort\);

14

SchServer\.RobotManager\.SendMessage\(Doc\.I\_ObjectAddress,c\_BroadCast,

15

                                   SCHM\_PrimitiveRegistration,SchPort\.I\_ObjectAddress\);

__See also__  
ISch\_ServerInterface interface  
ISch\_RobotManager interface

### <a id="ISch_Preferences_Interface"></a>ISch\_Preferences Interface

__Overview__  
The ISch\_Preferences interface represents the global preferences for the Schematic Editor and the settings are the same for any PCB project that has schematics in Altium Designer\.

The ISch\_ServerInterface interface represents the Schematic Editor and this interface has an ISch\_Preferences aggregate object interface\.

__ISch\_Preferences Methods and Properties Table__

__ISch\_Preferences methods__  
Import\_FromUser  
Get\_SelectionColor  
Get\_MultiSelectionColor  
Get\_ResizeColor  
Get\_TranslateRotateColor  
Get\_VisibleGridColor  
Get\_VisibleGridStyle  
Get\_GraphicsCursorStyle  
Get\_OrcadFootPrint  
Get\_SnapToCenter  
Get\_UseOrcadPortWidth  
Get\_AutoBackupTime  
Get\_AutoBackupFileCount  
Get\_SelectionReference  
Get\_UndoRedoStackSize  
Get\_ConvertSpecialStrings  
Get\_MaintainOrthogonal  
Get\_DisplayPrinterFonts  
Get\_AutoZoom  
Get\_HotSpotGridDistance  
Get\_SnapToHotSpot  
Get\_OptimizePolylines  
Get\_ComponentsCutWires  
Get\_AddTemplateToClipBoard  
Get\_AutoPanStyle  
Get\_AutoPanJumpDistance  
Get\_AutoPanShiftJumpDistance  
Get\_PinNameMargin  
Get\_PinNumberMargin  
Get\_DefaultPrimsPermanent  
Get\_IgnoreSelection  
Get\_ClickClearsSelection  
Get\_DoubleClickRunsInspector  
Get\_MultiPartNamingMethod  
Get\_Sensitivity  
Get\_SingleSlashNegation  
Get\_RunInPlaceEditing  
Get\_DefaultPowerGndName  
Get\_DefaultSignalGndName  
Get\_DefaultEarthName  
Get\_DefaultTemplateFileName  
Get\_BufferedPainting  
Get\_Metafile\_NoERCMarkers  
Get\_Metafile\_ParameterSets  
Get\_Metafile\_Probes  
Get\_DocumentScope  
Get\_LibraryScope  
Get\_ConfirmSelectionMemoryClear  
Get\_LastModelType  
Get\_StringIncA  
Get\_StringIncB  
Get\_MarkManualParameters  
Get\_CtrlDbleClickGoesDown  
Get\_SheetStyle\_XSize  
Get\_SheetStyle\_YSize  
Get\_SheetStyle\_XZones  
Get\_SheetStyle\_YZones  
Get\_SheetStyle\_MarginWidth  
Get\_PolylineCutterMode  
Get\_CutterGridSizeMultiple  
Get\_CutterFixedLength  
Get\_ShowCutterBoxMode  
Get\_ShowCutterMarkersMode  
Get\_ViolationDisplayByLevel  
Get\_ViolationColorByLevel  
Get\_AlwaysDrag  
Get\_DocMenuID  
Get\_LibMenuID  
Get\_DefaultSheetStyle  
Get\_WireAutoJunctionsColor  
Get\_ManualJunctionsColor  
Get\_BusAutoJunctionsColor  
Get\_DefaultUnit  
Get\_DefaultUnitSystem  
Set\_SelectionColor  
Set\_MultiSelectionColor  
Set\_ResizeColor  
Set\_TranslateRotateColor  
Set\_VisibleGridColor  
Set\_VisibleGridStyle  
Set\_GraphicsCursorStyle  
Set\_OrcadFootPrint  
Set\_SnapToCenter  
Set\_UseOrcadPortWidth  
Set\_AutoBackupTime  
Set\_AutoBackupFileCount  
Set\_SelectionReference  
Set\_UndoRedoStackSize  
Set\_ConvertSpecialStrings  
Set\_MaintainOrthogonal  
Set\_DisplayPrinterFonts  
Set\_AutoZoom  
Set\_HotSpotGridDistance  
Set\_SnapToHotSpot  
Set\_OptimizePolylines  
Set\_ComponentsCutWires  
Set\_AddTemplateToClipBoard  
Set\_AutoPanStyle  
Set\_AutoPanJumpDistance  
Set\_AutoPanShiftJumpDistance  
Set\_PinNameMargin  
Set\_PinNumberMargin  
Set\_DefaultPrimsPermanent  
Set\_IgnoreSelection  
Set\_ClickClearsSelection  
Set\_DoubleClickRunsInspector  
Set\_MultiPartNamingMethod  
Set\_Sensitivity  
Set\_SingleSlashNegation  
Set\_RunInPlaceEditing  
Set\_DefaultPowerGndName  
Set\_DefaultSignalGndName  
Set\_DefaultEarthName  
Set\_DefaultTemplateFileName  
Set\_BufferedPainting  
Set\_Metafile\_NoERCMarkers  
Set\_Metafile\_ParameterSets  
Set\_Metafile\_Probes  
Set\_DocumentScope  
Set\_LibraryScope  
Set\_ConfirmSelectionMemoryClear  
Set\_LastModelType  
Set\_StringIncA  
Set\_StringIncB  
Set\_MarkManualParameters  
Set\_CtrlDbleClickGoesDown  
Set\_PolylineCutterMode  
Set\_CutterGridSizeMultiple  
Set\_CutterFixedLength  
Set\_ShowCutterBoxMode  
Set\_ShowCutterMarkersMode  
Set\_ViolationDisplayByLevel  
Set\_ViolationColorByLevel  
Set\_AlwaysDrag  
Set\_DocMenuID  
Set\_LibMenuID  
Set\_DefaultSheetStyle  
Set\_WireAutoJunctionsColor  
Set\_ManualJunctionsColor  
Set\_BusAutoJunctionsColor  
Set\_DefaultUnit  
GridPresetsCount  
GridPresetAt

__ISch\_Preferences properties__  
SelectionColor  
MultiSelectionColor  
ResizeColor  
TranslateRotateColor  
VisibleGridColor  
VisibleGridStyle  
GraphicsCursorStyle  
OrcadFootPrint  
SnapToCenter  
UseOrcadPortWidth  
AutoBackupTime  
AutoBackupFileCount  
SelectionReference  
UndoRedoStackSize  
ConvertSpecialStrings  
MaintainOrthogonal  
DisplayPrinterFonts  
AutoZoom  
HotSpotGridDistance  
SnapToHotSpot  
OptimizePolylines  
ComponentsCutWires  
AddTemplateToClipBoard  
AutoPanStyle  
AutoPanJumpDistance  
AutoPanShiftJumpDistance  
PinNameMargin  
PinNumberMargin  
DefaultPrimsPermanent  
IgnoreSelection  
ClickClearsSelection  
DoubleClickRunsInspector  
MultiPartNamingMethod  
Sensitivity  
SingleSlashNegation  
RunInPlaceEditing  
DefaultPowerGndName  
DefaultSignalGndName  
DefaultEarthName  
DefaultTemplateFileName  
BufferedPainting  
Metafile\_NoERCMarkers  
Metafile\_ParameterSets  
Metafile\_Probes  
DocumentScope  
LibraryScope  
ConfirmSelectionMemoryClear  
LastModelType  
StringIncA  
StringIncB  
MarkManualParameters  
CtrlDbleClickGoesDown  
SheetStyle\_XSize  
SheetStyle\_YSize  
SheetStyle\_XZones  
SheetStyle\_YZones  
SheetStyle\_MarginWidth  
PolylineCutterMode  
CutterGridSizeMultiple  
CutterFixedLength  
ShowCutterBoxMode  
ShowCutterMarkersMode  
ViolationDisplay  
ViolationColor  
AlwaysDrag  
DocMenuID  
LibMenuID  
DefaultSheetStyle  
WireAutoJunctionsColor  
ManualJunctionsColor  
BusAutoJunctionsColor  
DefaultDisplayUnit  
DefaultUnitSystem

__See also__  
ISch\_ServerInterface interface  
ISch\_Document interface