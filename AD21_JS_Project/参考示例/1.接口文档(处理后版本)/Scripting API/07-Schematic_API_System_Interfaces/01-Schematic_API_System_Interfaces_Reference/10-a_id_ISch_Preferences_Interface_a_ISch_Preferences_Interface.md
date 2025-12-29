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

#### ISch\_Preferences Methods

##### Get\_AddTemplateToClipBoard method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AddTemplateToClipBoard : Boolean;  
__Description__  
The Get\_AddTemplateToClipBoard function when true, adds the current sheet template to the clipboard when you copy or cut from the current schematic sheet\.  
__Example__  
AddTemp := Prefs\.Get\_AddTemplateToClipBoard;  
__See also__  
ISch\_Preferences interface

##### Get\_AlwaysDrag method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AlwaysDrag : Boolean;  
__Description__  
The Get\_AlwaysDrag function returns true if you can drag a group of objects on a schematic document and the electrical wiring stay connected\. Note, to keep the connections clean while dragging, press the spacebar to cycle through the different corner modes in Altium Designer\.  
The function returns false if if wiring are left alone and become disconnected when previously connected objects are being dragged\.  
__Example__  
AlwaysDrag := Prefs\.Get\_AlwaysDrag;  
__See also__  
ISch\_Preferences interface

##### Get\_AutoPanJumpDistance method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AutoPanJumpDistance : TCoord;  
__Description__  
The Get\_AutoPanJumpDistance function gets the size of each auto\-panning step\. The step size determines how fast the document pans when auto\-panning is enabled\. The smaller the value, the slower or finer the auto\-panning movement\.  
__Example__  
PanJumpDist := CoordToDxps\(Prefs\.Get\_AutoPanJumpDistance\);  
__See also__  
ISch\_Preferences interface

##### Get\_AutoPanShiftJumpDistance method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AutoPanShiftJumpDistance : TCoord;  
__Description__  
The Get\_AutoPanShiftJumpDistance function returns a value of TCoord type which determines the size of each step when the SHIFT key is held during auto\-panning in Altium Designer\. The shift step size determines how fast the document pans when auto\-panning is enabled and the SHIFT key is pressed\. The smaller the value, the slower or finer the auto\-panning movement\.  
__Example__  
JumpDist := Prefs\.GetAutoPanShiftJumpDistance;  
__See also__  
ISch\_Preferences interface

##### Get\_AutoPanStyle method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AutoPanStyle : TAutoPanStyle;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_AutoZoom method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AutoZoom : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_BufferedPainting method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_BufferedPainting : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_BusAutoJunctionsColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_BusAutoJunctionsColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_ClickClearsSelection method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ClickClearsSelection : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_ComponentsCutWires method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ComponentsCutWires : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_ConfirmSelectionMemoryClear method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ConfirmSelectionMemoryClear : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_ConvertSpecialStrings method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ConvertSpecialStrings : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_CtrlDbleClickGoesDown method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_CtrlDbleClickGoesDown : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_CutterFixedLength method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_CutterFixedLength : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_CutterGridSizeMultiple method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_CutterGridSizeMultiple : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DefaultEarthName method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultEarthName : WideString;  
__Description__  
The DefaultEarthName property denotes the default signal ground name to be used for objects on the schematic document\. The default name is EARTH\.  
The Get\_DefaultEarthName function retrieves the earth name string\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DefaultPowerGndName method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultPowerGndName : WideString;  
__Description__  
The DefaultPowerGndName property denotes the default power ground name to be used for objects on the schematic document\. The default name is GND\.  
The Get\_DefaultPowerGndName function retrieves the power ground name string\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DefaultPrimsPermanent method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultPrimsPermanent : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DefaultSheetStyle method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultSheetStyle : TSheetStyle;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DefaultSignalGndName method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultSignalGndName : WideString;  
__Description__  
The DefaultSignalGndName property denotes the default signal ground name to be used for objects on the schematic document\. The default name is SGND\.  
The Get\_DefaultSignalGndName function retrieves the signal ground name string\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DefaultTemplateFileName method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultTemplateFileName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DefaultUnit method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultUnit : TUnit;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DefaultUnitSystem method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultUnitSystem : TUnitSystem;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DisplayPrinterFonts method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DisplayPrinterFonts : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DocMenuID method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DocMenuID : Widestring;  
__Description__  
The DocMenuID property determines which pop up menu to pop up depending on whether it is a schematic or a library document\. The property returns a widestring format which can be either PUSCHMENU or PUSCHLIBMENU strings and they correspond to the entries in the Schematic Editor's resources file \(ADVSCH\.RCS file\)\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DocumentScope method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DocumentScope : TChosenDocumentScope;  
__Description__  
The DocumentScope property determines the scope for filtering and selection to be applied to the current document or to any open document in Altium Designer\. The Get\_DocumentScope method sets the Chosen Document scope\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_DoubleClickRunsInspector method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DoubleClickRunsInspector : Boolean;  
__Description__  
This method represents the option to bring up the Inspector dialog instead of the design object's properties dialog when you double click on a design object\.  
Invoke this function to check if design object's properties dialog is invoked \(False\) or the Inspector dialog \(True\) when you double click on a design object\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_GraphicsCursorStyle method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_GraphicsCursorStyle : TCursorShape;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_HotSpotGridDistance method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_HotSpotGridDistance : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_IgnoreSelection method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_IgnoreSelection : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_LastModelType method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_LastModelType : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_LibMenuID method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_LibMenuID : Widestring;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_LibraryScope method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_LibraryScope : TLibraryScope;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_MaintainOrthogonal method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_MaintainOrthogonal : Boolean;  
__Description__  
The MaintainOrthogonal property if set to true then when you drag components, any wiring that is dragged with the component is kept orthogonal \(i\.e\. corners at 90 degrees\)\. If this option is disabled, wiring dragged with a component will be repositioned obliquely\.  
This method gets the property true or false and is used in the MaintainOrthogonal property\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_ManualJunctionsColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ManualJunctionsColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_MarkManualParameters method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_MarkManualParameters : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_Metafile\_NoERCMarkers method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_Metafile\_NoERCMarkers : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_Metafile\_ParameterSets method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_Metafile\_ParameterSets : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_MetaFile\_Probes method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_Metafile\_Probes : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_MultiPartNamingMethod method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_MultiPartNamingMethod : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_MultiSelectionColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_MultiSelectionColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_OptimizePolylines method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_OptimizePolylines : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_OrcadFootPrint method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_OrcadFootPrint : TOrcadFootPrint;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_PinNameMargin method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_PinNameMargin : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_PinNumberMargin method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_PinNumberMargin : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_PolylineCutterMode method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_PolylineCutterMode : TPolylineCutterMode;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_ResizeColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ResizeColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_RunInPlaceEditing method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_RunInPlaceEditing : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_SelectionColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SelectionColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_SelectionReference method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SelectionReference : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_Sensitivity method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_Sensitivity : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_SheetStyle\_MarginWidth method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SheetStyle\_MarginWidth \(S : TSheetStyle\) : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_SheetStyle\_XSize method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SheetStyle\_XSize \(S : TSheetStyle\) : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_SheetStyle\_XZones method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SheetStyle\_XZones \(S : TSheetStyle\) : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_SheetStyle\_YSize method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SheetStyle\_YSize \(S : TSheetStyle\) : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_SheetStyle\_YZones method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SheetStyle\_YZones \(S : TSheetStyle\) : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_ShowCutterBoxMode method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ShowCutterBoxMode : TShowCutterBoxMode;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_ShowCutterMarkersMode method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ShowCutterMarkersMode : TShowCutterMarkersMode;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_SingleSlashNegation method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SingleSlashNegation : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_SnapToCenter method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SnapToCenter : Boolean;  
__Description__  
This property represents the action where you hold the object being moved or dragged by its reference point \(for objects that have one, such as library components or ports\), or its center \(for objects which do not have a reference point such as a rectangle\)\.  
This function returns a boolean value whether the you can snap to the center of a object or not before being moved or dragged by its reference point\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_SnapToHotSpot method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SnapToHotSpot : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_StringIncA method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_StringIncA : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_StringIncB method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_StringIncB : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_TranslateRotateColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_TranslateRotateColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_UndoRedoStackSize method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_UndoRedoStackSize : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_UseOrcadPortWidth method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_UseOrcadPortWidth : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_ViolationColorByLevel method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ViolationColorByLevel \(ALevel : TErrorLevel\) : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_ViolationDisplayByLevel method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ViolationDisplayByLevel \(ALevel : TErrorLevel\) : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_VisibleGridColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_VisibleGridColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_VisibleGridStyle method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_VisibleGridStyle : TVisibleGrid;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Get\_WireAutoJunctionsColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_WireAutoJunctionsColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### GridPresetsCount method

\(ISch\_Preferences interface\)  
__Syntax__  
Function GridPresetsCount\(AUnit : TUnitSystem\) : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### GridPresetAt method

\(ISch\_Preferences interface\)  
__Syntax__  
Function GridPresetAt \(AUnit : TUnitSystem; AnIndex : Integer\) : IGridSetting;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_AddTemplateToClipBoard method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AddTemplateToClipBoard \(AValue : Boolean\);  
__Description__  
The Set\_AddTemplateToClipBoard procedure adds the current sheet template to the clipboard when you copy or cut from the current schematic sheet if the True value is passed in as a parameter\. Otherwise the template is not copied ot the clipboard when the value is False\.  
__Example__  
Prefs\.Set\_AddTemplateToClipBoard\(True\);  
__See also__  
ISch\_Preferences interface

##### Set\_AlwaysDrag method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AlwaysDrag \(AValue : Boolean\);  
__Description__  
The Set\_AlwaysDrag procedure if set true you can drag a group of objects on a schematic document and the electrical wiring stay connected\. Note, to keep the connections clean while dragging, press the spacebar to cycle through the different corner modes in Altium Designer\. Set a false value to leave wiring alone and become disconnected when previously connected objects are being dragged\.  
__Example__  
Prefs\.Set\_AlwaysDrag\(True\);  
__See also__  
ISch\_Preferences interface

##### Set\_AutoBackupFileCount method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoBackupFileCount \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_AutoBackupTime method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoBackupTime \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_AutoPanJumpDistance method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoPanJumpDistance \(AValue : TCoord\);  
__Description__  
The Set\_AutoPanJumpDistance function sets the size of each auto\-panning step with a TCoord value\. The step size determines how fast the document pans when auto\-panning is enabled\. The smaller the value, the slower or finer the auto\-panning movement\.  
__Example__  
Prefs\.Set\_AutoPanJumpDistance\(CoordToDxps\(Value\)\);  
__See also__  
ISch\_Preferences interface

##### Set\_AutoPanShiftJumpDistance method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoPanShiftJumpDistance \(AValue : TCoord\);  
__Description__  
The Set\_AutoPanShiftJumpDistance sets a value of TCoord type which determines the size of each step when the SHIFT key is held during auto\-panning in Altium Designer\. The shift step size determines how fast the document pans when auto\-panning is enabled and the SHIFT key is pressed\. The smaller the value, the slower or finer the auto\-panning movement\.  
__Example__  
Prefs\.Set\_AutoPanShiftJumpDistance\(DxpsToCoord\(100\)\);  
__See also__  
ISch\_Preferences interface

##### Set\_AutoPanStyle method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoPanStyle \(AValue : TAutoPanStyle\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_AutoZoom method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoZoom \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_BufferedPainting method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_BufferedPainting \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_BusAutoJunctionsColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_BusAutoJunctionsColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_ClickClearsSelection method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ClickClearsSelection \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_ComponentsCutWires method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ComponentsCutWires \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_ConfirmSelectionMemoryClear method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ConfirmSelectionMemoryClear \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_ConvertSpecialStrings method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ConvertSpecialStrings \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_CtrlDbleClickGoesDown method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_CtrlDbleClickGoesDown \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_CutterFixedLength method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_CutterFixedLength \(AValue : TCoord\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_CutterGridSizeMultiple method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_CutterGridSizeMultiple \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_DefaultEarthName method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultEarthName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_DefaultPowerGndName method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultPowerGndName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_DefaultPrimsPermanent method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultPrimsPermanent \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_DefaultSheetStyle method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultSheetStyle \(AValue : TSheetStyle\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_DefaultSignalGndName method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultSignalGndName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_DefaultTemplateFileName method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultTemplateFileName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_DefaultUnit method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultUnit \(AValue : TUnit\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_DisplayPrinterFonts method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DisplayPrinterFonts \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_DocMenuID method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DocMenuID \(Const AValue : Widestring\);  
__Description__  
The DocMenuID property determines which pop up menu to pop up depending on whether it is a schematic or a library document\. The property returns a widestring format which can be either PUSCHMENU or PUSCHLIBMENU strings and they correspond to the entries in the Schematic Editor's resources file \(ADVSCH\.RCS file\)\.  
The procedure sets the new Document Menu ID value\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_DocumentScope method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DocumentScope \(AValue : TChosenDocumentScope\);  
__Description__  
The DocumentScope property determines the scope for filtering and selection to be applied to the current document or to any open document in Altium Designer\. The Set\_DocumentScope method sets the Chosen Document scope\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_DoubleClickRunsInspector method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DoubleClickRunsInspector \(AValue : Boolean\);  
__Description__  
This method represents the option to bring up the Inspector dialog instead of the design object's properties dialog when you double click on a design object\.  
Assign false to this AValue parameter to disable this option if you want to see the design object's properties dialog when you double click on a design object\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_GraphicsCursorStyle method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_GraphicsCursorStyle \(AValue : TCursorShape\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_HotSpotGridDistance method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_HotSpotGridDistance \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_IgnoreSelection method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_IgnoreSelection \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_LastModelType method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_LastModelType \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_LibMenuID method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_LibMenuID \(Const AValue : Widestring\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_LibraryScope method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_LibraryScope \(AValue : TLibraryScope\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_MaintainOrthogonal method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_MaintainOrthogonal \(AValue : Boolean\);  
__Description__  
The MaintainOrthogonal property if set to true then when you drag components, any wiring that is dragged with the component is kept orthogonal \(i\.e\. corners at 90 degrees\)\. If this option is disabled, wiring dragged with a component will be repositioned obliquely\.  
This method sets the property true or false and is used in the MaintainOrthogonal property\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_ManualJunctionsColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ManualJunctionsColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_MarkManualParameters method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_MarkManualParameters \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_Metafile\_NoERCMarkers method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_Metafile\_NoERCMarkers \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_Metafile\_ParameterSets method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_Metafile\_ParameterSets \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_MetaFile\_Probes method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_Metafile\_Probes\(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_MultiPartNamingMethod method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_MultiPartNamingMethod \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_MultiSelectionColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_MultiSelectionColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_OptimizePolylines method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_OptimizePolylines \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_OrcadFootPrint method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_OrcadFootPrint \(AValue : TOrcadFootPrint\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_PinNameMargin method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_PinNameMargin \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_PinNumberMargin method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_PinNumberMargin \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_PolylineCutterMode method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_PolylineCutterMode \(AValue : TPolylineCutterMode\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_ResizeColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ResizeColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_RunInPlaceEditing method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_RunInPlaceEditing \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_SelectionColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_SelectionColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_SelectionReference method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_SelectionReference \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_Sensitivity method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_Sensitivity \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_ShowCutterBoxMode method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ShowCutterBoxMode \(AValue : TShowCutterBoxMode\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_ShowCutterMarkersMode method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ShowCutterMarkersMode \(AValue : TShowCutterMarkersMode\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_SingleSlashNegation method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_SingleSlashNegation \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_SnapToCenter method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_SnapToCenter \(AValue : Boolean\);  
__Description__  
This SnapToCenter property represents the action where you hold the object being moved or dragged by its reference point \(for objects that have one, such as library components or ports\), or its center \(for objects which do not have a reference point such as a rectangle\)\.  
The procedure sets whether you can snap to center of the objects or not\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_SnapToHotSpot method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_SnapToHotSpot \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_StringIncA method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_StringIncA \(AValue : WideString\);  
__Description__  
The Set\_StringIncA method represents a value to auto\-increment on pin designators of a component when you are placing pins for a component\. This is used for building components in the Library editor\.  Normally you would use a positive increment value for pin designators and negative increment value for pin names\. Eg  1, 2,3  for pin designators and D8, D7, D6 for pin names\. Thus Primary = 1 and Secondary = \-1 and set Display Name to D8 and Designator to 1 in the Pin Properties dialog before you place the first pin\.  
This method sets the increment value for the pin designators and the StringIncB method sets the increment value for the pin names\.  
This method is used by the StringIncA property\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_StringIncB method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_StringIncB \(AValue : WideString\);  
__Description__  
The Set\_StringIncB method represents a value to auto\-increment on pin designators of a component when you are placing pins for a component\. This is used for building components in the Library editor\.  Normally you would use a positive increment value for pin designators and negative increment value for pin names\. Eg  1, 2,3  for pin designators and D8, D7, D6 for pin names\. Thus Primary = 1 and Secondary = \-1 and set Display Name to D8 and Designator to 1 in the Pin Properties dialog before you place the first pin\.  
This method sets the increment value for the pin names and the StringIncA method sets the increment value for the pin designators\.  
This method is used by the StringIncB property\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_TranslateRotateColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_TranslateRotateColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_UndoRedoStackSize method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_UndoRedoStackSize \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_UseOrcadPortWidth method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_UseOrcadPortWidth \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_ViolationColorByLevel method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ViolationColorByLevel \(ALevel : TErrorLevel;AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_ViolationDisplayByLevel method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ViolationDisplayByLevel \(ALevel : TErrorLevel;AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_VisibleGridColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_VisibleGridColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_VisibleGridStyle method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_VisibleGridStyle \(AValue : TVisibleGrid\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Set\_WireAutoJunctionsColor method

\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_WireAutoJunctionsColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

#### ISch\_Preferences Properties

##### WireAutoJunctionsColor property

\(ISch\_Preferences interface\)  
__Syntax__  
Property WireAutoJunctionsColor : TColor Read Get\_WireAutoJunctionsColor Write Set\_WireAutoJunctionsColor;  
__Description__  
This property determines the color of the auto generated junctions on the schematic document\. This property is supported by the GetState\_WireAutoJunctionsColor and SetState\_WireAutoJunctionsColor methods\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type

##### VisibleGridStyle property

\(ISch\_Preferences interface\)  
__Syntax__  
Property VisibleGridStyle : TVisibleGrid Read Get\_VisibleGridStyle Write Set\_VisibleGridStyle ;  
__Description__  
This property determines the lined or dotted style of the visible grid on the schematic document\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TVisibleGrid type

##### VisibleGridColor property

\(ISch\_Preferences interface\)  
__Syntax__  
Property VisibleGridColor : TColor Read Get\_VisibleGridColor Write Set\_VisibleGridColor ;  
__Description__  
This property determines the color of the visible grid on schematic sheets\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type

##### ViolationDisplay property

\(ISch\_Preferences interface\)  
__Syntax__  
Property ViolationDisplay \[L : TErrorLevel\] : Boolean Read Get\_ViolationDisplayByLevel Write Set\_ViolationDisplayByLevel;  
__Description__  
This ViolationDisplay property determines the error level for the violation display\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TErrorLevel type from Workspace Manager API

##### ViolationColor property

\(ISch\_Preferences interface\)  
__Syntax__  
Property ViolationColor \[L : TErrorLevel\] : TColor Read Get\_ViolationColorByLevel Write Set\_ViolationColorByLevel ;  
__Description__  
This ViolationColor property determines the color of the violation depending on the error level\. This property is supported by the Get\_ViolationColorByLevel and Set\_ViolationColorByLevel methods\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type  
TErrorLevel type in Workspace Manager API

##### UseOrcadPortWidth property

\(ISch\_Preferences interface\)  
__Syntax__  
Property UseOrcadPortWidth : Boolean Read Get\_UseOrcadPortWidth Write Set\_UseOrcadPortWidth;  
__Description__  
The UseOrcadPortWidth property determines whether the ports can be re\-sized in the Schematic Editor\. This is important if the design has to go back to Orcad\(TM\) \(which does not support re\-sizing ports\)\.  
This property is supported by the Get\_UseOrcadPortWidth and Set\_UseOrcadPortWidth methods\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### UndoRedoStackSize property

\(ISch\_Preferences interface\)  
__Syntax__  
Property UndoRedoStackSize : Integer Read Get\_UndoRedoStackSize Write Set\_UndoRedoStackSize ;  
__Description__  
This property shows the number of actions held in the Undo Buffer\. The default value is 50\. Define a value to set the Undo Buffer size\. There is no limit to the size of the Undo Buffer, however, the larger the size, the more main memory is used to store undo information\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### TranslateRotateColor property

\(ISch\_Preferences interface\)  
__Syntax__  
Property TranslateRotateColor : TColor Read Get\_TranslateRotateColor Write Set\_TranslateRotateColor ;  
__Description__  
This property sets or gets the color associated with translation or rotation\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type

##### StringIncB property

\(ISch\_Preferences interface\)  
__Syntax__  
Property StringIncB : WideString Read Get\_StringIncB Write Set\_StringIncB ;  
__Description__  
This property represents a value to auto\-increment on pin names of a component when you are placing pins for a component\. This can be used for building components in the Library editor\.  
Normally you would use a positive increment value for pin designators and negative increment value for pin names\. Eg  1, 2,3  for pin designators and D8, D7, D6 for pin names\. Thus Primary = 1 and Secondary = \-1 and set Display Name to D8 and Designator to 1 in the Pin Properties dialog before you place the first pin\.  
This property is supported by the Get\_StringIncB and Set\_StringIncB methods\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### StringIncA property

\(ISch\_Preferences interface\)  
__Syntax__  
Property StringIncA : WideString Read Get\_StringIncA Write Set\_StringIncA ;  
__Description__  
This property represents a value to auto\-increment on pin designators of a component when you are placing pins for a component\. This is used for building components in the Library editor\.  Normally you would use a positive increment value for pin designators and negative increment value for pin names\. Eg  1, 2,3  for pin designators and D8, D7, D6 for pin names\. Thus Primary = 1 and Secondary = \-1 and set Display Name to D8 and Designator to 1 in the Pin Properties dialog before you place the first pin\.  
This property is supported by the Get\_StringIncA and Set\_StringIncA methods\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### SnapToHotSpot property

\(ISch\_Preferences interface\)  
__Syntax__  
Property SnapToHotSpot : Boolean Read Get\_SnapToHotSpot Write Set\_SnapToHotSpot ;  
__Description__  
This property represents the action where you hold the object being moved or dragged by the nearest electrical hot spot \(eg, the end of a pin\) when moving or dragging\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### SnapToCenter property

\(ISch\_Preferences interface\)  
__Syntax__  
Property SnapToCenter : Boolean Read Get\_SnapToCenter Write Set\_SnapToCenter ;  
__Description__  
This property represents the action where you hold the object being moved or dragged by its reference point \(for objects that have one, such as library components or ports\), or its center \(for objects which do not have a reference point such as a rectangle\)\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### SingleSlashNegation property

\(ISch\_Preferences interface\)  
__Syntax__  
Property SingleSlashNegation : Boolean Read Get\_SingleSlashNegation Write Set\_SingleSlashNegation ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### ShowCutterMarkersMode property

\(ISch\_Preferences interface\)  
__Syntax__  
Property ShowCutterMarkersMode : TShowCutterMarkersMode Read Get\_ShowCutterMarkersMode Write Set\_ShowCutterMarkersMode ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### ShowCutterBoxMode property

\(ISch\_Preferences interface\)  
__Syntax__  
Property ShowCutterBoxMode : TShowCutterBoxMode Read Get\_ShowCutterBoxMode Write Set\_ShowCutterBoxMode ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### SheetStyle\_YZones property

\(ISch\_Preferences interface\)  
__Syntax__  
Property SheetStyle\_YZones \[S : TSheetStyle\]: TCoord Read Get\_SheetStyle\_YZones;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### SheetStyle\_YSize property

\(ISch\_Preferences interface\)  
__Syntax__  
Property SheetStyle\_YSize \[S : TSheetStyle\]: TCoord Read Get\_SheetStyle\_YSize;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### SheetStyle\_XZones property

\(ISch\_Preferences interface\)  
__Syntax__  
Property SheetStyle\_XZones \[S : TSheetStyle\]: TCoord Read Get\_SheetStyle\_XZones;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### SheetStyle\_XSize property

\(ISch\_Preferences interface\)  
__Syntax__  
Property SheetStyle\_XSize \[S : TSheetStyle\]: TCoord Read Get\_SheetStyle\_XSize;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### SheetStyle\_MarginWidth\[S property

\(ISch\_Preferences interface\)  
__Syntax__  
Property SheetStyle\_MarginWidth\[S : TSheetStyle\]: TCoord Read Get\_SheetStyle\_MarginWidth;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Sensitivity property

\(ISch\_Preferences interface\)  
__Syntax__  
Property Sensitivity : Integer Read Get\_Sensitivity Write Set\_Sensitivity ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### SelectionReference property

\(ISch\_Preferences interface\)  
__Syntax__  
Property SelectionReference : Boolean Read Get\_SelectionReference Write Set\_SelectionReference ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### SelectionColor property

\(ISch\_Preferences interface\)  
__Syntax__  
Property SelectionColor : TColor Read Get\_SelectionColor Write Set\_SelectionColor ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### RunInPlaceEditing property

\(ISch\_Preferences interface\)  
__Syntax__  
Property RunInPlaceEditing : Boolean Read Get\_RunInPlaceEditing Write Set\_RunInPlaceEditing ;  
__Description__  
This property if set to true, then the focused text field may be directly edited within the Schematic Editor, rather than in a dialog box\.  After focusing the field you wish to modify, clicking upon it again or pressing the F2 shortcut key will open the field for editing\.  
If this property is set to false, you cannot edit the text directly and you have to edit it from the Parameter Properties dialog\. You can just graphically move this text field\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### ResizeColor property

\(ISch\_Preferences interface\)  
__Syntax__  
Property ResizeColor : TColor Read Get\_ResizeColor Write Set\_ResizeColor ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type

##### PolylineCutterMode property

\(ISch\_Preferences interface\)  
__Syntax__  
Property PolylineCutterMode : TPolylineCutterMode Read Get\_PolylineCutterMode Write Set\_PolylineCutterMode ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### PinNumberMargin property

\(ISch\_Preferences interface\)  
__Syntax__  
Property PinNumberMargin : Integer Read Get\_PinNumberMargin Write Set\_PinNumberMargin ;  
__Description__  
Normally, component pin numbers are displayed outside the body of the component, directly above the corresponding pin line\. This property controls the placement of the pin numbers\. It specifies the distance \(in hundredths of an inch\) from the component outline to the start of the pin number text\. The default is 8\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### PinNameMargin property

\(ISch\_Preferences interface\)  
__Syntax__  
Property PinNameMargin : Integer Read Get\_PinNameMargin Write Set\_PinNameMargin ;  
__Description__  
Normally, component pin names are displayed inside the body of the component, adjacent to the corresponding pin\. This property controls the placement of component pin names\. It specifies the distance \(in hundredths of an inch\) from the component outline to the start of the pin name text\. The default is 5\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### OrcadFootPrint property

\(ISch\_Preferences interface\)  
__Syntax__  
Property OrcadFootPrint : TOrcadFootPrint Read Get\_OrcadFootPrint Write Set\_OrcadFootPrint ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### OptimizePolylines property

\(ISch\_Preferences interface\)  
__Syntax__  
Property OptimizePolylines : Boolean Read Get\_OptimizePolylines Write Set\_OptimizePolylines ;  
__Description__  
If this property is set to true, then extra wires, poly\-lines or buses are prevented from overlapping on top of each other and the overlapping wires, poly\-lines or busses are removed automatically\.  
Note: You need to enable this option to have the ability to automatically cut a wire and terminate onto any two pins of this component when this component is dropped onto this wire\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### MultiSelectionColor property

\(ISch\_Preferences interface\)  
__Syntax__  
Property MultiSelectionColor : TColor Read Get\_MultiSelectionColor Write Set\_MultiSelectionColor ;  
__Description__  
This property determines the color of the multi\_selection, that is multiple objects on the schematic object is being selected\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type

##### MultiPartNamingMethod property

\(ISch\_Preferences interface\)  
__Syntax__  
Property MultiPartNamingMethod : Integer Read Get\_MultiPartNamingMethod Write Set\_MultiPartNamingMethod ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Metafile\_ParameterSets property

\(ISch\_Preferences interface\)  
__Syntax__  
Property Metafile\_ParameterSets : Boolean Read Get\_Metafile\_ParameterSets Write Set\_Metafile\_ParameterSets ;  
__Description__  
This property if set to true includes Parameter Sets design objects when copying to the clipboard or when printing a schematic document\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### Metafile\_NoERCMarkers property

\(ISch\_Preferences interface\)  
__Syntax__  
Property Metafile\_NoERCMarkers : Boolean Read Get\_Metafile\_NoERCMarkers Write Set\_Metafile\_NoERCMarkers ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### MarkManualParameters property

\(ISch\_Preferences interface\)  
__Syntax__  
Property MarkManualParameters : Boolean Read Get\_MarkManualParameters Write Set\_MarkManualParameters;  
__Description__  
The MarkManualParameters property denotes whether the dots will be displayed or not when parameters of components for example are auto positioned\. If true, the dot for the parameter will appear when its associated component has been rotated/moved on the schematic document\.  
This property is supported by the Get\_MarkManualParameters and Set\_MarkManualParameters methods\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### ManualJunctionsColor property

\(ISch\_Preferences interface\)  
__Syntax__  
Property ManualJunctionsColor : TColor Read Get\_ManualJunctionsColor Write Set\_ManualJunctionsColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type

##### MaintainOrthogonal property

\(ISch\_Preferences interface\)  
__Syntax__  
Property MaintainOrthogonal : Boolean Read Get\_MaintainOrthogonal Write Set\_MaintainOrthogonal ;  
__Description__  
This property if set to true then when you drag components, any wiring that is dragged with the component is kept orthogonal \(i\.e\. corners at 90 degrees\)\. If this option is disabled, wiring dragged with a component will be repositioned obliquely\.  
This property is supported by the Get\_MaintainOrthogonal and Set\_MaintainOrthogonal methods\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### LibraryScope property

\(ISch\_Preferences interface\)  
__Syntax__  
Property LibraryScope : TLibraryScope Read Get\_LibraryScope Write Set\_LibraryScope ;  
__Description__  
This property represents scope for filtering and selection to be applied to the current component on a library sheet or to all components of an open library in Altium Designer\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TLibraryScope type

##### LibMenuID property

\(ISch\_Preferences interface\)  
__Syntax__  
Property LibMenuID : Widestring Read Get\_LibMenuID Write Set\_LibMenuID;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### LastModelType property

\(ISch\_Preferences interface\)  
__Syntax__  
Property LastModelType : WideString Read Get\_LastModelType Write Set\_LastModelType ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### Import\_FromUser method

\(ISch\_Preferences interface\)  
__Syntax__  
Function Import\_FromUser : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### IgnoreSelection property

\(ISch\_Preferences interface\)  
__Syntax__  
Property IgnoreSelection : Boolean Read Get\_IgnoreSelection Write Set\_IgnoreSelection ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### HotSpotGridDistance property

\(ISch\_Preferences interface\)  
__Syntax__  
Property HotSpotGridDistance : Integer Read Get\_HotSpotGridDistance Write Set\_HotSpotGridDistance ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### GraphicsCursorStyle property

\(ISch\_Preferences interface\)  
__Syntax__  
Property GraphicsCursorStyle : TCursorShape Read Get\_GraphicsCursorStyle Write Set\_GraphicsCursorStyle ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### AddTemplateToClipBoard property

\(ISch\_Preferences interface\)  
__Syntax__  
Property AddTemplateToClipBoard : Boolean Read Get\_AddTemplateToClipBoard Write Set\_AddTemplateToClipBoard ;  
__Description__  
The AddTemplateToClipBoard property determines whether  the current sheet template can be added to to the clipboard when you copy or cut from the current schematic sheet\.  
__Example__  
Prefs\.AddTemplateToClipBoard := True;  
__See also__  
ISch\_Preferences interface

##### AlwaysDrag property

\(ISch\_Preferences interface\)  
__Syntax__  
Property AlwaysDrag : Boolean Read Get\_AlwaysDrag Write Set\_AlwaysDrag;  
__Description__  
This property represents the AlwaysDrag option and every time you are dragging a group of objects on a schematic document, the electrical wiring stay connected if it is true\. Note, to keep the connections clean while dragging, press the spacebar to cycle through the different corner modes\.  
Set it to false and the wiring are left alone and become disconnected when previously connected objects are being dragged\.  
__Example__  
Prefs\.AlwaysDrag := True;  
__See also__  
ISch\_Preferences interface

##### AutoPanJumpDistance property

\(ISch\_Preferences interface\)  
__Syntax__  
Property AutoPanJumpDistance : TCoord Read Get\_AutoPanJumpDistance Write Set\_AutoPanJumpDistance ;  
__Description__  
This property represents the value to set/get the size of each auto\-panning step\. The step size determines how fast the document pans when auto\-panning is enabled\. The smaller the value, the slower or finer the auto\-panning movement\.  
This property is supported by the GetState\_AutoPanJumpDistance and SetState\_AutoPanJumpDistance methods\.  
__Example__  
Prefs\.AutoPanJumpDistance := CoordToDxps\(10\);  
__See also__  
ISch\_Preferences interface

##### AutoPanShiftJumpDistance property

\(ISch\_Preferences interface\)  
__Syntax__  
Property AutoPanShiftJumpDistance : TCoord Read Get\_AutoPanShiftJumpDistance Write Set\_AutoPanShiftJumpDistance ;  
__Description__  
This property represents a value to get/set the size of each step when the SHIFT key is held during auto\-panning\. The shift step size determines how fast the document pans when auto\-panning is enabled and the SHIFT key is pressed\. The smaller the value, the slower or finer the auto\-panning movement\. This property is supported by the Get\_AutoPanShiftJumpDistance and Set\_AutoPanShiftJumpDistance methods\.  
__Example__  
Prefs\.AutoPanShiftJumpDistance := DxpsToCoord\(100\);  
__See also__  
ISch\_Preferences interface

##### AutoPanStyle property

\(ISch\_Preferences interface\)  
__Syntax__  
Property AutoPanStyle : TAutoPanStyle Read Get\_AutoPanStyle Write Set\_AutoPanStyle ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### AutoZoom property

\(ISch\_Preferences interface\)  
__Syntax__  
Property AutoZoom : Boolean Read Get\_AutoZoom Write Set\_AutoZoom ;  
__Description__  
This property if set to true the schematic sheet is automatically zoomed when jumping to a component\. Zoom level remains as it was if this option is not enabled\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### BufferedPainting property

\(ISch\_Preferences interface\)  
__Syntax__  
Property BufferedPainting : Boolean Read Get\_BufferedPainting Write Set\_BufferedPainting ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### BusAutoJunctionsColor property

\(ISch\_Preferences interface\)  
__Syntax__  
Property BusAutoJunctionsColor : TColor Read Get\_BusAutoJunctionsColor Write Set\_BusAutoJunctionsColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type

##### ClickClearsSelection property

\(ISch\_Preferences interface\)  
__Syntax__  
Property ClickClearsSelection : Boolean Read Get\_ClickClearsSelection Write Set\_ClickClearsSelection ;  
__Description__  
If this property is set to true, then all design objects are de\-selected by clicking any where on the schematic workspace\. Set this property to false if you do not want to have this click anywhere to deselect all ability and the selection is cumulative\.  
Note: regardless of the setting, you can de\-select a selected design object by clicking on it\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### ComponentsCutWires property

\(ISch\_Preferences interface\)  
__Syntax__  
Property ComponentsCutWires : Boolean Read Get\_ComponentsCutWires Write Set\_ComponentsCutWires ;  
__Description__  
Set the property to true so you can drop a component onto a schematic wire and then the wire is cut into two segments and the segments are terminated onto any two hot pins of this component automatically\. You will need to set the Optimize Wires & Buses option to true first\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### ConfirmSelectionMemoryClear property

\(ISch\_Preferences interface\)  
__Syntax__  
Property ConfirmSelectionMemoryClear : Boolean Read Get\_ConfirmSelectionMemoryClear Write Set\_ConfirmSelectionMemoryClear;  
__Description__  
The selection memories can be used to store the selection state of a set of objects\. To prevent inadvertent overwriting of a selection memory, set the property to true\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### ConvertSpecialStrings property

\(ISch\_Preferences interface\)  
__Syntax__  
Property ConvertSpecialStrings : Boolean Read Get\_ConvertSpecialStrings Write Set\_ConvertSpecialStrings ;  
__Description__  
This property when set to true, the contents of the special strings on screen are displayed, as they appear on a printout\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### CtrlDbleClickGoesDown property

\(ISch\_Preferences interface\)  
__Syntax__  
Property CtrlDbleClickGoesDown : Boolean Read Get\_CtrlDbleClickGoesDown Write Set\_CtrlDbleClickGoesDown ;  
__Description__  
This property when set to true, the sub\-sheet of its associated sheet symbol by double clicking on this sheet symbol opens in Altium Designer\.  
Set it to false and when you double\-click on a sheet symbol, the change properties dialog is displayed instead\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### CutterFixedLength property

\(ISch\_Preferences interface\)  
__Syntax__  
Property CutterFixedLength : TCoord Read Get\_CutterFixedLength Write Set\_CutterFixedLength ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### CutterGridSizeMultiple property

\(ISch\_Preferences interface\)  
__Syntax__  
Property CutterGridSizeMultiple : Integer Read Get\_CutterGridSizeMultiple Write Set\_CutterGridSizeMultiple ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### DefaultDisplayUnit property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultDisplayUnit : TUnit Read Get\_DefaultUnit Write Set\_DefaultUnit;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### DefaultEarthName property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultEarthName : WideString Read Get\_DefaultEarthName Write Set\_DefaultEarthName ;  
__Description__  
The DefaultEarthName denotes the default signal ground name to be used for objects on the schematic document\. The default name is EARTH\.  
This property is supported by the Get\_DefaultEarthName and Set\_DefaultEarthName methods\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### DefaultPowerGndName property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultPowerGndName : WideString Read Get\_DefaultPowerGndName Write Set\_DefaultPowerGndName ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### DefaultPrimsPermanent property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultPrimsPermanent : Boolean Read Get\_DefaultPrimsPermanent Write Set\_DefaultPrimsPermanent ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### DefaultSheetStyle property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultSheetStyle : TSheetStyle Read Get\_DefaultSheetStyle Write Set\_DefaultSheetStyle;  
__Description__  
The DefaultSheetStyle property denotes the sheet style used for the workspace\.  
There are various sheet styles; A4,A3,A2,A1,A0, A,C,D,E,Letter, Legal, Tabloid, Orcad A, Orcad B, Orcad C, Orcad D, Orcad E\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TSheetStyle type

##### DefaultSignalGndName property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultSignalGndName : WideString Read Get\_DefaultSignalGndName Write Set\_DefaultSignalGndName ;  
__Description__  
The DefaultSignalGndName denotes the default signal ground name to be used for objects on the schematic document\. The default name is SGND\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### DefaultTemplateFileName property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultTemplateFileName : WideString Read Get\_DefaultTemplateFileName Write Set\_DefaultTemplateFileName ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### DefaultUnitSystem property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultUnitSystem : TUnitSystem Read Get\_DefaultUnitSystem;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface

##### DisplayPrinterFonts property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DisplayPrinterFonts : Boolean Read Get\_DisplayPrinterFonts Write Set\_DisplayPrinterFonts ;  
__Description__  
The DisplayPrinterFonts property denotes whether the printer fonts can be displayed or not\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### DocMenuID property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DocMenuID : Widestring Read Get\_DocMenuID Write Set\_DocMenuID;  
__Description__  
The DocMenuID property determines which pop up menu to pop up depending on whether it is a schematic or a library document\. The property returns a widestring format which can be either PUSCHMENU or PUSCHLIBMENU strings and they correspond to the entries in the Schematic Editor's resources file \(ADVSCH\.RCS file\)\.  
__Example__  
__See also__  
ISch\_Preferences interface

##### DocumentScope property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DocumentScope : TChosenDocumentScope Read Get\_DocumentScope Write Set\_DocumentScope ;  
__Description__  
The DocumentScope property determines the scope for filtering and selection to be applied to the current document or to any open document in Altium Designer\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TChosenDocumentScope type

##### DoubleClickRunsInspector property

\(ISch\_Preferences interface\)  
__Syntax__  
Property DoubleClickRunsInspector : Boolean Read Get\_DoubleClickRunsInspector Write Set\_DoubleClickRunsInspector ;  
__Description__  
This property represents the option to bring up the Inspector dialog instead of the design object's properties dialog when you double click on a design object\.  
Assign false to this property to disable this option if you want to see the design object's properties dialog when you double click on a design object\. Invoke this property to check if design object's properties dialog is invoked \(False\) or the Inspector dialog \(True\) when you double click on a design object\.  
__Example__  
__See also__  
ISch\_Preferences interface