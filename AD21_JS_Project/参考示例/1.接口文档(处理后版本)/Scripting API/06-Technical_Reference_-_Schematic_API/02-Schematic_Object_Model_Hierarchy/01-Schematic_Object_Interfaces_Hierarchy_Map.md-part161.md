#### Properties

##### HoleCount property

\(IPCB\_PrimitiveCounter interface\)  
__Syntax__  
Property HoleCount : Cardinal Read GetHoleCount;  
__Description__  
This property obtains the hole count from the PCB document \(Pads and Vias\)\.  
__Example__  
__See also__  
IPCB\_PrimitiveCounter interface

##### StringCount property

\(IPCB\_PrimitiveCounter interface\)  
__Syntax__  
Property StringCount : Cardinal Read GetStringCount;  
__Description__  
This property obtains string \(text object\) count from the PCB document\.  
__Example__  
__See also__  
IPCB\_PrimitiveCounter interface  
 

## <a id="PCB_Options_Interfaces"></a>PCB Options Interfaces 

### <a id="IPCB_AbstractOptions"></a>IPCB\_AbstractOptions

__Overview__  
The IPCB\_AbstractOptions interface is the base interface for other options related interfaces such as SystemOptions and InteractiveRoutingOptions through IPCB\_ServerInterface\. These option objects are global objects created by the PCB Server\.

The other OutputOptions, ECOOptions, GerberOptions, PrinterOptions and PlacerOptions interfaces are referenced through IPCB\_Board interface\.

__Notes__  
Ancestor interface for ECO Options, Output Options, Gerber Options, Printer Options, Advanced Placer Options, SystemOptions, Design Rule Checker Options, SpecctraRouter Options and Interactive Routing options interfaces\.

__Methods__  
Procedure Import\_FromParameters          \(DisplayUnit : TUnit;  
                                          Parameters  : PChar\);  
Procedure Export\_ToParameters            \(Parameters  : PChar\);  
Procedure Import\_FromParameters\_Version4 \(DisplayUnit : TUnit;  
                                          Parameters  : PChar\);  
Procedure Export\_ToParameters\_Version4   \(Parameters  : PChar\);  
Procedure Import\_FromParameters\_Version3 \(DisplayUnit : TUnit;  
                                          Parameters  : PChar\);  
Procedure Export\_ToParameters\_Version3   \(Parameters  : PChar\);  
Function  I\_ObjectAddress : TPCBObjectHandle;  
__Properties__  
OptionsObjectID : TOptionsObjectId  
__See also__  
IPCB\_ECOOptions interface  
IPCB\_OutputOptions interface  
IPCB\_GerberOptions interface  
IPCB\_PrinterOptions interface  
IPCB\_AdvancedPlacerOptions interface  
IPCB\_SystemOptions interface  
IPCB\_DesignRuleCheckerOptions interface  
IPCB\_SpecctraRouterOptions interface  
IPCB\_InteractiveRoutingOptions interface

### <a id="IPCB_AdvancedPlacerOptions"></a>IPCB\_AdvancedPlacerOptions

__Overview__  
The IPCB\_AdvancedPlacerOptions interface represents the options for the placement application\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__IPCB\_ Properties__  
Property PlaceLargeClear       : TCoord   
Property PlaceSmallClear       : TCoord   
Property PlaceUseRotation      : Boolean  
Property PlaceUseLayerSwap     : Boolean  
Property PlaceByPassNet1       : TPCBString   
Property PlaceByPassNet2       : TPCBString   
Property PlaceUseAdvancedPlace : Boolean  
Property PlaceUseGrouping      : Boolean  
__See also__  
IPCB\_AbstractOptions interface

### <a id="IPCB_DesignRuleCheckerOptions"></a>IPCB\_DesignRuleCheckerOptions

__Overview__  
The IPCB\_DesignRuleCheckerOptions interface deals with the DRC options\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__IPCB\_DesignRuleCheckerOptions Methods__  
Procedure Export\_ToParameters\_GeneralOptions        \(Parameters : PChar\);   
Procedure Export\_ToParameters\_RulesToCheck          \(Parameters : PChar\);   
Procedure Export\_ToParameters\_RulesToCheck\_Version3 \(Parameters : PChar\);   
Procedure Import\_FromParameters\_GeneralOptions      \(Parameters : PChar\);   
Procedure Import\_FromParameters\_RulesToCheck        \(Parameters : PChar\);  
__IPCB\_DesignRuleCheckerOptions Properties__  
Property OnLineRuleSetToCheck            : TRuleSet  
Property DoMakeDRCFile                   : Boolean   
Property DoMakeDRCErrorList              : Boolean   
Property DoSubNetDetails                 : Boolean   
Property RuleSetToCheck                  : TRuleSet  
Property ReportFilename                  : TPCBString   
Property ExternalNetListFileName         : TPCBString   
Property CheckExternalNetList            : Boolean   
Property MaxViolationCount               : Integer   
Property InternalPlaneWarnings           : Boolean   
Property VerifyShortingCopper            : Boolean  
__See also__  
IPCB\_AbstractOptions interface

### <a id="IPCB_ECOOptions"></a>IPCB\_ECOOptions

__Overview__  
The IPCB\_ECOOptions represents an existing Engineering Change Order options object in a PCB document\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Properties__  
Property ECOIsActive : Boolean  
Property ECOFileName : TString  
__See also__  
IPCB\_AbstractOptions interface

### <a id="IPCB_GerberOptions"></a>IPCB\_GerberOptions

__Overview__  
The tolerance range used when matching apertures for each item in the plots\. If no exact match for an item is available in the current aperture list, the software checks to see if a larger aperture exists within this tolerance range and uses it instead\.  
If no suitable aperture exists within the tolerance range, the software will attempt to "paint" with a larger aperture to create the required shape\. This requires that a suitable larger aperture is available, and that this aperture can be used for "painting"\.  
Note: Match tolerances are normally only used when you are targeting a vector photoplotter, which require a fixed, or supplied aperture file\. They will not be required if the apertures have been created from the PCB\. If match tolerances are not required they should be left at the default of 0\.005 mil\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Properties__  
Property SortOutput          : Boolean  
Property UseSoftwareArcs     : Boolean  
Property CenterPhotoPlots    : Boolean  
Property EmbedApertures      : Boolean  
Property Panelize            : Boolean  
Property G54                 : Boolean  
Property PlusTol             : TCoord   
Property MinusTol            : TCoord   
Property FilmSizeX           : TCoord   
Property FilmSizeY           : TCoord   
Property BorderSize          : TCoord   
Property AptTable            : TPCBString  
Property MaxAperSize         : TCoord   
Property ReliefShapesAllowed : Boolean  
Property PadsFlashOnly       : Boolean  
Property GerberUnits         : Integer  
Property GerberDecs          : Integer  
__See also__  
IPCB\_AbstractOptions interface

### <a id="IPCB_InteractiveRoutingOptions"></a>IPCB\_InteractiveRoutingOptions

__Overview__  
The IPCB\_InteractiveRoutingOptions interface represents the options for the interactive routing module in the PCB editor\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Methods__  
Procedure Export\_ToParameters\_GeneralOptions\(Parameters : PChar\);  
Procedure Export\_ToParameters\_LayerOptions  \(Parameters : PChar\);  
Procedure Export\_ToParameters\_LayerOptions\_Version3\(Parameters : PChar\);  
__Properties__  
PlaceTrackMode    : TPlaceTrackMode  
OldTrackDrawLayer : TLayer  
TrackArcX         : TCoord  
TrackArcY         : TCoord  
TrackArcRadius    : TCoord  
TrackArcAngle1    : TCoord  
TrackArcAngle2    : TCoord  
OldTrackArcX      : TCoord  
OldTrackArcY      : TCoord  
OldTrackArcRadius : TCoord  
OldTrackArcAngle1 : TCoord  
OldTrackArcAngle2 : TCoord  
OldTrackDrawSize  : TCoord  
OldMidx           : TCoord  
OldMidy           : TCoord  
OldCx             : TCoord  
OldCy             : TCoord  
EndLineX          : TCoord  
EndLineY          : TCoord  
Midx              : TCoord  
MidY              : TCoord  
StartX            : TCoord  
StartY            : TCoord  
Beginx            : TCoord  
Beginy            : TCoord  
__See also__  
IPCB\_AbstractOptions interface

### <a id="IPCB_OutputOptions"></a>IPCB\_OutputOptions

__Overview__  
The IPCB\_OutputOptions interface represents the options for the generation of PCB output such as including mechanical layers in plots etc\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Methods__  
Procedure Import\_FromParameters\_GeneralOptions \(DisplayUnit : TUnit;  
                                                       Parameters  : PChar\);  
Procedure Import\_FromParameters\_LayerOptions   \(Parameters  : PChar\);  
Procedure Import\_FromParameters\_LayerOptions\_Version3 \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_GeneralOptions   \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_LayerOptions     \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_LayerOptions\_Version3   \(Parameters  : PChar\);  
__Properties__  
Property DrillGuideHoleSize              : TCoord   
Property DrillDrawSymbolSize             : TCoord   
Property DrillSymbolKind                 : TDrillS  
Property MultiLayerOnPadMaster           : Boolean  
Property TopLayerOnPadMaster             : Boolean  
Property BottomLayerOnPadMaster          : Boolean  
Property IncludeViasInSolderMask         : Boolean  
   
Property IncludeUnconnectedPads          : Boolean  
Property PlotLayer \[PL : TPlotLayer\]     : Boolean  
Property FlipLayer \[PL : TPlotLayer\]     : Boolean  
__See also__  
IPCB\_AbstractOptions interface

### <a id="IPCB_PrinterOptions"></a>IPCB\_PrinterOptions

__Overview__  
The __IPCB\_PrinterOptions__ interface represents the Printer options setup in the PCB Editor server\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Methods__  
Procedure Import\_FromParameters\_GeneralOptions        \(DisplayUnit : TUnit;  
                                                       Parameters  : PChar\);  
Procedure Import\_FromParameters\_LayerOptions          \(Parameters  : PChar\);  
Procedure Import\_FromParameters\_LayerOptions\_Version3 \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_GeneralOptions          \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_LayerOptions            \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_LayerOptions\_Version3   \(Parameters  : PChar\);  
__Properties__  
Property Device           : TPCBString  
Property Driver           : TPCBString  
Property OutPut           : TPCBString  
Property OutputDriverType : TOutputDriverType  
Property ShowHoles        : Boolean            
Property ScaleToFitPage   : Boolean            
Property UsePrinterFonts  : Boolean            
Property UseSoftwareArcs  : Boolean            
Property BatchType        : TPrinterBatch      
Property CompositeType    : TPrinterComposite  
Property cBorderSize      : TCoord             
Property Scale            : TGeometry          
Property XCorrect         : TGeometry          
Property YCorrect         : TGeometry          
Property PlotMode \[OId : TObjectId\]            : TDrawMode          
Property PlotPadNets      : Boolean            
Property PlotPadNumbers   : Boolean            
Property PlotterScale     : TGeometry          
Property PlotterXCorrect  : TGeometry          
Property PlotterYCorrect  : TGeometry          
Property PlotterXOffset   : TCoord             
Property PlotterYOffset   : TCoord             
Property PlotterShowHoles : Boolean            
Property PlotterUseSoftwareArcs : Boolean            
Property PlotterWaitBetweenSheets : Boolean            
Property PlotterOutputPort                     : TOutputPort        
Property PlotterLanguage                       : TPlotterLanguage   
Property PlotterPens \[PId : Integer\]           : TPlotterPen        
Property CompositePlotMonoLayers  \[L : TLayer\] : TColor             
Property CompositePlotColorLayers \[L : TLayer\] : TColor             
Property CompositePlotLayers      \[L : TLayer\] : Boolean            
Property CompositePlotPens        \[L : TLayer\] : Integer            
__See also__  
IPCB\_AbstractOptions interface

### <a id="IPCB_SpecctraRouterOptions"></a>IPCB\_SpecctraRouterOptions

__Overview__  
The IPCB\_SpecctraRouterOptions interface represents the options for the Specctra Router application\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Properties__  
Property Setback      \[I : Integer\]      : TCoord         
Property DoSetback    \[I : Integer\]      : Boolean        
Property DoBus                           : Boolean        
Property BusDiagonal                     : Boolean        
Property DoQuit                          : Boolean        
Property WireGrid                        : TReal          
Property ViaGrid                         : TReal          
Property DoSeedVias                      : Boolean        
Property NoConflicts                     : Boolean        
Property AdvancedDo                      : Boolean        
Property ReorderNets                     : Boolean        
Property ProtectPreRoutes                : Boolean        
Property SeedViaLimit                    : TCoord         
Property RoutePasses                     : Integer        
Property CleanPasses                     : Integer        
Property FilterPasses                    : Integer        
Property LayerCost    \[L : TLayer\]       : TCCTCost       
Property LayerWWCost  \[L : TLayer\]       : TCCTCost       
Property WwCost                          : TCCTCost       
Property CrossCost                       : TCCTCost       
Property ViaCost                         : TCCTCost       
Property OffGridCost                     : TCCTCost       
Property OffCenterCost                   : TCCTCost       
Property SideExitCost                    : TCCTCost       
Property SqueezeCost                     : TCCTCost       
Property LayerTax     \[L : TLayer\]       : TCCTTax        
Property LayerWWTax   \[L : TLayer\]       : TCCTTax        
Property WwTax                           : TCCTTax        
Property CrossTax                        : TCCTTax        
Property ViaTax                          : TCCTTax        
Property OffGridTax                      : TCCTTax        
Property OffCenterTax                    : TCCTTax        
Property SideExitTax                     : TCCTTax        
Property SqueezeTax                      : TCCTTax        
Property DoCritic                        : Boolean        
Property DoMiter                         : Boolean        
Property DoRecorner                      : Boolean        
Property DoFanout                        : Boolean        
Property FoPower                         : Boolean        
Property FoSignal                        : Boolean        
Property FoIn                            : Boolean        
Property FoOut                           : Boolean        
Property FoVias                          : Boolean        
Property FoPads                          : Boolean        
Property FoPasses                        : Integer        
Property ForceVias                       : Boolean        
Property DoSpread                        : Boolean        
Property SortKind                        : TCCTSort       
Property SortDir                         : TCCTSortDir    
Property Adv10                           : Boolean        
Property Dfm10                           : Boolean        
Property Hyb10                           : Boolean        
Property SpVersion                       : Integer        
Property MinimizePads                    : Boolean        
__See also__  
IPCB\_AbstractOptions interface

### <a id="IPCB_SystemOptions"></a>IPCB\_SystemOptions

__Overview__  
The __IPCB\_SystemOptions__ interface represents the global system options in the PCB Editor server\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Methods__  
Procedure Import\_FromIniFile;  
Procedure Export\_ToIniFile;  
Procedure AddComponentMapping \(Value : TComponentTypeMapping\);  
__Properties__  
\{DisplayOptions\}  
Property UndoRedoStackSize                  : Integer          
Property SingleLayerMode                    : Boolean          
Property LockPreRoutes                      : Boolean          
Property DrawMode  \[OId : TObjectID\]        : TDrawMode        
Property FromTosDisplayMode                 : TFromToDisplayMode  
Property PadTypesDisplayMode                : TFromToDisplayMode  
Property DraftTrackThreshold                : TCoord           
Property CleanRedraw                        : Boolean          
Property ShowInvisibleObjects               : Boolean          
Property DisplaySpecialStrings              : Boolean          
Property RedrawLayerOnToggle                : Boolean          
Property UseCurrentForMultiLayer            : Boolean          
Property UseNetColorForHighlight            : Boolean          
Property HighlightFull                      : Boolean          
Property ShowAllPrimitivesInHighlightedNets : Boolean          
Property UseTransparent                     : Boolean          
Property UseDithered                        : Boolean          
Property ShowPadNets                        : Boolean          
Property ShowPadNumbers                     : Boolean          
Property ShowTestPoints                     : Boolean          
Property ShowViaNets                        : Boolean          
Property ShowStatusInfo                     : Boolean          
Property ShowStatusInterval                 : Integer          
Property BoardCursorType                    : TGraphicsCursor  
Property TextToRectSize                     : Integer          
Property AutoPan                            : Boolean          
Property LayerDrawingOrder \[I : Integer\]    : TLayer           
   
\{Paste Options\}  
Property  Paste\_InSameClass       : Boolean  
Property  Paste\_OnSameLayer       : Boolean  
Property  Paste\_InSameNet         : Boolean  
Property  Paste\_HasSameDesignator : Boolean  
   
\{PlaceArray Options\}  
Property RepeatRotateItem                   : Boolean    
Property RepeatCircular                     : Boolean    
Property RepeatDegrees                      : TGeometry  
Property RepeatX                            : TGeometry  
Property RepeatY                            : TGeometry  
Property RepeatXUnit                        : TUnit      
Property RepeatYUnit                        : TUnit      
Property RepeatCountDefault                 : Integer    
Property RepeatInc                          : TPCBString     
   
\{Com Port Options\}  
Property Com1Parameters    : TSerialParameters  
Property Com2Parameters    : TSerialParameters  
Property Com3Parameters    : TSerialParameters  
Property Com4Parameters    : TSerialParameters  
   
\{Netlist load options\}  
Property CheckPatterns          : Boolean  
Property CheckComments          : Boolean  
Property NetlistReportFile      : Boolean  
Property NetlistReportDialog    : Boolean  
Property DeleteUnconnectedComps : Boolean  
Property DeleteUnconnectedPrims : Boolean  
   
\{Misc System Options\}  
Property GlobalEditIncludeArcsWithTracks : Boolean  
Property ValidateOnLoad                  : Boolean  
Property SaveDefs                        : Boolean  
Property DoOnlineDRC                     : Boolean  
Property LoopRemoval                     : Boolean  
Property UseSmartTrackEnds               : Boolean  
Property DeleteDeadEnds                  : Boolean  
Property QuestionDelete                  : Boolean  
Property QuestionGlobalChange            : Boolean  
Property QuestionDrag                    : Boolean  
Property NearestComponent                : Boolean  
Property RemoveDuplicatesOnOutput        : Boolean  
Property DuplicateDesignatorsAllowed     : Boolean  
Property AutoVia                         : Boolean  
Property SnapToCentre                    : Boolean  
Property ReportsCSV                      : Boolean  
Property ClickClearsSelection            : Boolean  
Property HoldShiftToSelectObjectId \[OId : TObjectID\] : Boolean  
Property MustHoldShiftToSelect           : Boolean  
Property DoubleClickRunsInspector        : Boolean  
Property DefaultPrimsPermanent           : Boolean  
Property DragMode                        : TPcbDragMode  
Property RotationStep                    : TAngle  
Property OnlySelectVisible               : Boolean  
Property PlaceShoveDepth                 : Integer  
Property LayerColors\[L : TLayer\]         : TColor  
Property AutoPanMode                     : TAutoPanMode  
Property AutoPanSmallStep                : Integer  
Property AutoPanLargeStep                : Integer  
Property AutoPanUnit                     : TAutoPanUnit  
Property AutoPanSpeed                    : Integer  
Property InteractiveRouteMode            : TInteractiveRouteMode  
Property PolygonThreshold                : Integer  
Property PolygonRepour                   : TPolygonRepourMode  
Property PlowThroughPolygons             : Boolean  
Property ProtectLockedPrimitives         : Boolean  
Property ConfirmSelectionMemoryClear     : Boolean  
Property ComponentMoveKind               : TComponentMoveKind  
Property SameNamePadstackReplacementMode : TSameNamePadstackReplacementMode  
Property PadstackUpdateFromGlobalsOnLoad : TSameNamePadstackReplacementMode  
Property PlaneDrawMode          : TPlaneDrawMode  
Property BoardAreaColor         : TColor  
Property BoardLineColor         : TColor  
Property SheetAreaColor         : TColor  
Property SheetLineColor         : TColor  
Property WorkspaceColor1        : TColor  
Property WorkspaceColor2        : TColor  
   
DefaultTTFont                
PadViaFontName               
PadViaFontColor              
PadViaFontStyle              
PadViaMinFontSize            
PadViaFontBkColor            
MinPadViaObjectSizeInPixels

__Example__

01

Var

02

    PCBSystemOptions : IPCB\_SystemOptions;

03

Begin

04

    PCBSystemOptions := PCBServer\.SystemOptions;

05

    If PCBSystemOptions = Nil Then Exit;

06

    If PcbSystemOptions\.BoardCursorType = eCurShapeCross90 Then

07

        PcbSystemOptions\.BoardCursorType := eCurShapeBigCross

08

    Else If PcbSystemOptions\.BoardCursorType = eCurShapeBigCross Then

09

        PcbSystemOptions\.BoardCursorType := eCurShapeCross45

10

    Else

11

        PcbSystemOptions\.BoardCursorType := eCurShapeCross90;

12

End\.

__See also__  
IPCB\_AbstractOptions interface  
TPCBDragMode enumerated values  
TGraphicsCursor enumerated values  
TComponentTypeMapping enumerated values  
TComponentMoveKind enumerated values  
TPolygonRepourMode enumerated values  
TSameNamePadstackReplacementMode enumerated values  
TPlaneDrawMode enumerated values  
TAutoPanUnit enumerated values  
TAutoPanMode enumerated values  
TInteractiveRouteMode enumerated values

# PCB API Layer Stack Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [PCB API Layer Stack Interfaces for version 22](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- PCB API](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

The PCB Layer Stack Interfaces reference covers the following interfaces and content:

- [IPCB\_MasterLayerStack](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_MasterLayerStack)
- [IPCB\_LayerStack](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack)
- [IPCB\_LayerStack\_V7](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack_V7)

See also:

[PCB API System Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21)

[PCB API Layer Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21)

__Interface inheritance map:__

IPCB\_LayerStackBase  
\.  IPCB\_MasterLayerStack  
\.  IPCB\_LayerStack  
IPCB\_LayerStack\_V7

### <a id="IPCB_MasterLayerStack"></a>IPCB\_MasterLayerStack

__Overview__

The IPCB\_MasterLayerStack interface represents the high\-level \(master\) layer stack for the current PCB document\. The Master Layer Stack interface is a property within in the IPCB\_Board interface \(IPCB\_Board\.MasterLayerStack\) and provides access to the available sub stacks in the overall layer stack structure\.

Individual sub stacks are represented by the IPCB\_LayerStack interface, and can be nominated using the SubStacks property of the IPCB\_MasterLayerStack interface\. Sub stacks are managed in Altium Designer's Layer Stack manager and are typically present in Rigid\-Flex PCB designs\.

See the[ Layer Stack Manger dialog](https://www.altium.com/documentation/node/210599?version=21) and[ Flex and Rigid\-Flex Printed Circuit Design](https://www.altium.com/documentation/node/231354?version=21) pages for more information\.

The IPCB\_MasterLayerStack interface provides methods for accessing and managing sub stacks, including the ability to create and remove sub stacks and query their individual layers\.

IPCB\_MasterLayerStack inherits methods and properties from the IPCB\_LayerStackBase interface\.

__Methods and properties:__

[__IPCB\_MasterLayerStack methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_MasterLayerStack methods)

[__IPCB\_MasterLayerStack properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_MasterLayerStack properties)

I\_ObjectAddress  
ID  
StateID  
Count  
Iterator  
First  
Last  
Next  
Previous  
^ Above methods inherited from IPCB\_LayerStackBase  
Board  
SubstackCount  
CreateLayer  
RemoveLayer  
InsertOnTop  
InsertOnBottom  
InsertBelow  
InsertAbove  
DisableLayer  
EnableLayer  
GetSubstack  
CreateSubstack  
RemoveSubstack  
Import\_FromParameters  
Export\_ToParameters

Name  
IsFlex  
^ Above properties inherited from IPCB\_LayerStackBase  
Substacks  
LayerStackStyle