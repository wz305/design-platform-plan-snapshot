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

### <a id="IGridSetting_interface"></a>IGridSetting interface

__Overview__  
The IGridSetting interface represents the grid settings for the Schematic documents part of a project\.

The IGridSetting interface hierarchy is a standalone\.

__IGridSetting methods__  
GetState\_SnapGridOn  
GetState\_HotspotGridOn  
GetState\_VisibleGridOn  
GetState\_SnapGridSize  
GetState\_HotspotGridSize  
GetState\_VisibleGridSize  
SetState\_SnapGridOn  
SetState\_HotspotGridOn  
SetState\_VisibleGridOn  
SetState\_SnapGridSize  
SetState\_HotspotGridSize  
SetState\_VisibleGridSize  
I\_ObjectAddress  
CopyTo  
SameAs

__IGridSetting properties__  
SnapGridOn  
HotspotGridOn  
VisibleGridOn  
SnapGridSize  
HotspotGridSize  
VisibleGridSize

__See also__  
ISch\_Preferences interface