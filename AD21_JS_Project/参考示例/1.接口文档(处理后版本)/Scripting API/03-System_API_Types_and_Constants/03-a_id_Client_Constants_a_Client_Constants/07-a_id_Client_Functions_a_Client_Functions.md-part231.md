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