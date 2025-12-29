# PCB API Constants and Functions

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [PCB API Constants and Functions for version 22](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- PCB API](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


The PCB API Constants and Functions reference includes the following sections and content:

[__PCB Constants__](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#PCB Constants)

[__PCB Functions__](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#PCB Functions)

[PCB Constants](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#PCB Constants)  
[AllLayers](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#AllLayers)  
[AllObjects](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#AllObjects)  
[AllPrimitives](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#AllPrimitives)  
[cAdvPCB](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cAdvPCB)  
[cBoardSideStrings constant](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cBoardSideStrings constant)  
[cComonentCollisionCheckModeStrings constant](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cComonentCollisionCheckModeStrings constant)  
[cDefaultLayerDrawingOrder constant](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cDefaultLayerDrawingOrder constant)  
[cDir\_NONE](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cDir_NONE)  
[cDir\_ANY](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cDir_ANY)  
[cDir\_Diagonal](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cDir_Diagonal)  
[cDir\_HorVert](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cDir_HorVert)  
[cLayerStrings](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cLayerStrings)  
[cMaxTestPointStyle](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cMaxTestPointStyle)  
[cMinTestPointStyle](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cMinTestPointStyle)  
[cMidLayers](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cMidLayers)  
[cMinLayer\_WidthRule](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cMinLayer_WidthRule)  
[cMaxLayer\_WidthRule](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cMaxLayer_WidthRule)  
[cRoutingWidthModeStrings](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cRoutingWidthModeStrings)  
[cRuleIdStrings](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cRuleIdStrings)  
[cTextAutopositionStrings](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cTextAutopositionStrings)  
[cTestPointPriorityHigh](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cTestPointPriorityHigh)  
[cTestPointPriorityLow](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cTestPointPriorityLow)  
[cWidthRuleLayers](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#cWidthRuleLayers)  
[FirstObjectId](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#FirstObjectId)  
[InternalUnits](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#InternalUnits)

[InternalPlanes](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#InternalPlanes)  
[kDiameterSymbolANSI](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#kDiameterSymbolANSI)  
[kDiameterSymbolUnicode](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#kDiameterSymbolUnicode)  
[kDegreeSymbol](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#kDegreeSymbol)  
[k1Inch](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#k1Inch)  
[kDefaultArcResolution](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#kDefaultArcResolution)  
[k1Mil](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#k1Mil)  
[kMaxCoord](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#kMaxCoord)  
[kMinCoord](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#kMinCoord)  
[kMaxInternalPlane](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#kMaxInternalPlane)  
[kMinInternalPlane](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#kMinInternalPlane)  
[kMaxPolySize](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#kMaxPolySize)  
[LastObjectId](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#LastObjectId)  
[kMaxStrokes](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#kMaxStrokes)  
[MaxLayer](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#MaxLayer)  
[MaxBoardLayer](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#MaxBoardLayer)  
[MaxLogicalTextSize](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#MaxLogicalTextSize)  
[MaxRouteLayer](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#MaxRouteLayer)  
[MaxMechanicalLayer constant](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#MaxMechanicalLayer constant)  
[MechanicalLayers](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#MechanicalLayers)  
[MinLayer](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#MinLayer)  
[MinMechanicalLayer constant](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#MinMechanicalLayer constant)  
[Numbers](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#Numbers)  
[WideStringObjects](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#WideStringObjects)  
[PCB Messages](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#PCB Messages)  
[SignalLayers](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#SignalLayers)

[Unit conversion functions](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#Unit conversion functions)  
[Angle and Trigonometric functions](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#Angle and Trigonometric functions)  
[Object Boundary Functions](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#Object Boundary Functions)  
[Layer conversion functions](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#Layer conversion functions)  
[Font Functions](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#Font Functions)  
[Locale Functions](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#Locale Functions)  
[General Functions](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21#General Functions)

 



AllLayers = \[MinLayer\.\.eConnectLayer\];


AllObjects = \[FirstObjectId\.\.LastObjectId\];


AllPrimitives = \[ eArcObject         ,  
                  eViaObject         ,  
                  eTrackObject       ,  
                  eTextObject        ,  
                  eFillObject        ,  
                  ePadObject         ,  
                  eComponentObject   ,  
                  eNetObject         ,  
                  ePolyObject        ,  
                  eDimensionObject   ,  
                  eCoordinateObject  ,  
                  eEmbeddedObject    ,  
                  eEmbeddedBoardObject,  
                  eFromToObject      ,  
                  eConnectionObject,  
                  ePolyRegionObject,  
                  eComponentBodyObject  
                  \]; 


cAdvPCB = 'AdvPCB';


cBoardSideStrings : Array \[TBoardSide\] Of String\[20\] =   
\('Top Side','Bottom Side'\);


cComponentCollisionCheckModeStings : Array \[TComponentCollisionCheckMode\] Of String\[22\]= \('Quick Check Mode','Multi\-Layer Check Mode','Full Check Mode','Component Body Mode'\);


cDefaultLayerDrawingOrder : TDrawingOrderArray = \(  
eBackGroundLayer,  
eMultiLayer,  
eTopOverlay,  
eBottomOverlay,  
eConnectLayer,  
eNoLayer,  
eTopLayer,  
eMidLayer1,  
eMidLayer2,  
eMidLayer3,  
eMidLayer4,  
eMidLayer5,  
eMidLayer6,  
eMidLayer7,  
eMidLayer8,  
eMidLayer9,  
eMidLayer10,  
eMidLayer11,  
eMidLayer12,  
eMidLayer13,  
eMidLayer14,  
eMidLayer15,  
eMidLayer16,  
eMidLayer17,  
eMidLayer18,  
eMidLayer19,  
eMidLayer20,  
eMidLayer21,  
eMidLayer22,  
eMidLayer23,  
eMidLayer24,  
eMidLayer25,  
eMidLayer26,  
eMidLayer27,  
eMidLayer28,  
eMidLayer29,  
eMidLayer30,  
eBottomLayer,  
eTopPaste,  
eBottomPaste,  
eTopSolder,  
eBottomSolder,  
eInternalPlane1,  
eInternalPlane2,  
eInternalPlane3,  
eInternalPlane4,  
eInternalPlane5,  
eInternalPlane6,  
eInternalPlane7,  
eInternalPlane8,  
eInternalPlane9,  
eInternalPlane10,  
eInternalPlane11,  
eInternalPlane12,  
eInternalPlane13,  
eInternalPlane14,  
eInternalPlane15,  
eInternalPlane16,  
eDrillGuide,  
eKeepOutLayer,  
eMechanical1,  
eMechanical2,  
eMechanical3,  
eMechanical4,  
eMechanical5,  
eMechanical6,  
eMechanical7,  
eMechanical8,  
eMechanical9,  
eMechanical10,  
eMechanical11,  
eMechanical12,  
eMechanical13,  
eMechanical14,  
eMechanical15,  
eMechanical16,  
eDrillDrawing,  
eGridColor1,  
eBackGroundLayer,  
eBackGroundLayer,  
eBackGroundLayer,  
eBackGroundLayer,  
eBackGroundLayer\);


cDir\_NONE     = \[\];


cDir\_ANY      = \[eDir\_N\.\.eDir\_NW\];


cDir\_Diagonal = \[eDir\_NE, eDir\_SE, eDir\_SW, eDir\_NW\];


cDir\_HorVert  = cDir\_ANY \- cDir\_Diagonal;


cLayerStrings : Array\[TLayer\] Of String  
              = \( 'NoLayer'        ,  
                  'TopLayer'       ,  
                  'MidLayer1'      ,  
                  'MidLayer2'      ,  
                  'MidLayer3'      ,  
                  'MidLayer4'      ,  
                  'MidLayer5'      ,  
                  'MidLayer6'      ,  
                  'MidLayer7'      ,  
                  'MidLayer8'      ,  
                  'MidLayer9'      ,  
                  'MidLayer10'     ,  
                  'MidLayer11'     ,  
                  'MidLayer12'     ,  
                  'MidLayer13'     ,  
                  'MidLayer14'     ,  
                  'MidLayer15'     ,  
                  'MidLayer16'     ,  
                  'MidLayer17'     ,  
                  'MidLayer18'     ,  
                  'MidLayer19'     ,  
                  'MidLayer20'     ,  
                  'MidLayer21'     ,  
                  'MidLayer22'     ,  
                  'MidLayer23'     ,  
                  'MidLayer24'     ,  
                  'MidLayer25'     ,  
                  'MidLayer26'     ,  
                  'MidLayer27'     ,  
                  'MidLayer28'     ,  
                  'MidLayer29'     ,  
                  'MidLayer30'     ,  
                  'BottomLayer'    ,  
                  'TopOverlay'     ,  
                  'BottomOverlay'  ,  
                  'TopPaste'       ,  
                  'BottomPaste'    ,  
                  'TopSolder'      ,  
                  'BottomSolder'   ,  
                  'InternalPlane1' ,  
                  'InternalPlane2' ,  
                  'InternalPlane3' ,  
                  'InternalPlane4' ,  
                  'InternalPlane5' ,  
                  'InternalPlane6' ,  
                  'InternalPlane7' ,  
                  'InternalPlane8' ,  
                  'InternalPlane9' ,  
                  'InternalPlane10',  
                  'InternalPlane11',  
                  'InternalPlane12',  
                  'InternalPlane13',  
                  'InternalPlane14',  
                  'InternalPlane15',  
                  'InternalPlane16',  
                  'DrillGuide'     ,  
                  'KeepOutLayer'   ,  
                  'Mechanical1'    ,  
                  'Mechanical2'    ,  
                  'Mechanical3'    ,  
                  'Mechanical4'    ,  
                  'Mechanical5'    ,  
                  'Mechanical6'    ,  
                  'Mechanical7'    ,  
                  'Mechanical8'    ,  
                  'Mechanical9'    ,  
                  'Mechanical10'   ,  
                  'Mechanical11'   ,  
                  'Mechanical12'   ,  
                  'Mechanical13'   ,  
                  'Mechanical14'   ,  
                  'Mechanical15'   ,  
                  'Mechanical16'   ,  
                  'DrillDrawing'   ,  
                  'MultiLayer'     ,  
                  'ConnectLayer'   ,  
                  'BackGroundLayer',  
                  'DRCErrorLayer'  ,  
                  'HighlightLayer' ,  
                  'GridColor1'     ,  
                  'GridColor10'    ,  
                  'PadHoleLayer'   ,  
                  'ViaHoleLayer'\);


cMaxTestPointStyle             = eNewTHTop;


cMinTestPointStyle = eExistingSMDBottom;


cMidLayers       : Set Of TLayer = \[eMidLayer1 \.\. eMidLayer30\];


cMinLayer\_WidthRule = eTopLayer;


cMaxLayer\_WidthRule = eBottomLayer;


cRoutingWidthModeStrings : Array\[TRoutingWidthMode\] Of String\[20\]  
                           = \('User Choice'   , //eRoutingWidth\_Default  
                              'Rule Minimum'  , //eRoutingWidth\_Min  
                              'Rule Preferred', //eRoutingWidth\_Preferred  
                              'Rule Maximum'    //eRoutingWidth\_Max\);


cRuleIdStrings : Array \[TRuleKind\] Of String\[21\]  
               = \( 'Clearance'            ,  
                   'ParallelSegment'      ,  
                   'Width'                ,  
                   'Length'               ,  
                   'MatchedLengths'       ,  
                   'StubLength'           ,  
                   'PlaneConnect'         ,  
                   'RoutingTopology'      ,  
                   'RoutingPriority'      ,  
                   'RoutingLayers'        ,  
                   'RoutingCorners'       ,  
                   'RoutingVias'          ,  
                   'PlaneClearance'       ,  
                   'SolderMaskExpansion'  ,  
                   'PasteMaskExpansion'   ,  
                   'ShortCircuit'         ,  
                   'UnRoutedNet'          ,  
                   'ViasUnderSMD'         ,  
                   'MaximumViaCount'      ,  
                   'MinimumAnnularRing'   ,  
                   'PolygonConnect'       ,  
                   'AcuteAngle'           ,  
                   'RoomDefinition'       ,  
                   'SMDToCorner'          ,  
                   'ComponentClearance'   ,  
                   'ComponentOrientations',  
                   'PermittedLayers'      ,  
                   'NetsToIgnore'         ,  
                   'SignalStimulus'       ,  
                   'OvershootFalling'     ,  
                   'OvershootRising'      ,  
                   'UndershootFalling'    ,  
                   'UndershootRising'     ,  
                   'MaxMinImpedance'      ,  
                   'SignalTopValue'       ,  
                   'SignalBaseValue'      ,  
                   'FlightTimeRising'     ,  
                   'FlightTimeFalling'    ,  
                   'LayerStack'           ,  
                   'SlopeRising'          ,  
                   'SlopeFalling'         ,  
                   'SupplyNets'           ,  
                   'HoleSize'             ,  
                   'Testpoint'            ,  
                   'TestPointUsage'       ,  
                   'UnConnectedPin'       ,  
                   'SMDToPlane'           ,  
                   'SMDNeckDown'          ,  
                   'LayerPairs'           ,  
                   'FanoutControl'        ,  
                   'Height',  
                   'DiffPairsRouting'  
\);


cTextAutopositionStrings : Array\[TTextAutoPosition\] Of String\[20\]  
                         = \( 'Manual'      ,  
                             'Left\-Above'  ,  
                             'Left\-Center' ,  
                             'Left\-Below'  ,  
                             'Center\-Above',  
                             'Center'      ,  
                             'Center\-Below',  
                             'Right\-Above' ,  
                             'Right\-Center',  
                             'Right\-Below'\);


cTestPointPriorityHigh = Ord\(cMinTestPointStyle\);


cTestPointPriorityLow = Ord\(cMaxTestPointStyle\);


cWidthRuleLayers = \[cMinLayer\_WidthRule\.\.cMaxLayer\_WidthRule\];


FirstObjectId = eArcObject;


InternalUnits = 10000;


InternalPlanes   : Set Of TLayer = \[eInternalPlane1\.\.eInternalPlane16\];


kDiameterSymbolANSI    = \#$F8;


kDiameterSymbolUnicode = \#$3A6;


kDegreeSymbol          = \#$B0;


k1Inch = 1000 \* InternalUnits;  
__Notes__  
1 mil = 10000 internal units  
1 inch = 1000 mils  
1 inch = 2\.54 cm  
1 inch = 25\.4 mm and 1 cm = 10 mm  
PCB object's coordinates are usually in mils or mm depending on the board's current measurement units\.


kDefaultArcResolution            = k1Mil Div 2;  
__Notes__  
1 mil = 10000 internal units  
1 inch = 1000 mils  
1 inch = 2\.54 cm  
1 inch = 25\.4 mm and 1 cm = 10 mm  
PCB object's coordinates are usually in mils or mm depending on the board's current measurement units\.


k1Mil = 1 \* InternalUnits;  
__Notes__  
1 mil = 10000 internal units  
1 inch = 1000 mils  
1 inch = 2\.54 cm  
1 inch = 25\.4 mm and 1 cm = 10 mm  
PCB object's coordinates are usually in mils or mm depending on the board's current measurement units\.


kMaxCoord = 99999  \* InternalUnits;


kMinCoord = 0 \* InternalUnits;


kMaxInternalPlane = eInternalPlane16;


kMinInternalPlane = eInternalPlane1;


kMaxPolySize = 5000;


LastObjectId = eEmbeddedBoardObject;


kMaxStrokes = 2000;


MaxLayer = eViaHoleLayer;  
__Notes__  
Refer to Layer2String and String2Layer functions in the PCB Functions topic\.


MaxBoardLayer = eMultiLayer;


MaxLogicalTextSize = k1Inch;


MaxRouteLayer = eBottomLayer;


MaxMechanicalLayer = eMechanical16;


MechanicalLayers : Set Of TLayer = \[eMechanical1\.\.eMechanical16\];


MinLayer = eTopLayer;  
__Notes__  
Refer to Layer2String and String2Layer functions in the PCB Functions topic\.


MinMechanicalLayer = eMechanical1;


Numbers          : Set Of Char   = \['0'\.\.'9'\];


WideStringObjects = \[ eTextObject, eDimensionObject, eCoordinateObject, eComponentObject\];


__Overview__  
The PCB Messages are messages that are broadcasted by the PCB Editor server\. There are different types of messages that describe a specific action within the PCB server\.  
Normally the PCB message constants are used for the __IPCB\_ServerInterface\.SendMessageToRobots__ method\.  
__Syntax__  
PCBM\_NullMessage         = 0;  
PCBM\_BeginModify         = 1;  
PCBM\_BoardRegisteration  = 2;  
PCBM\_EndModify           = 3;  
PCBM\_CancelModify        = 4;  
PCBM\_Create              = 5;  
PCBM\_Destroy             = 6;  
PCBM\_ProcessStart        = 7;  
PCBM\_ProcessEnd          = 8;  
PCBM\_ProcessCancel       = 9;  
PCBM\_YieldToRobots       = 10;  
PCBM\_CycleEnd            = 11;  
PCBM\_CycleStart          = 12;  
PCBM\_SystemInvalid       = 13;  
PCBM\_SystemValid         = 14;  
PCBM\_ViewUpdate          = 15;  
PCBM\_UnDoRegister        = 16;  
c\_BroadCast   = Nil;  
c\_NoEventData = Nil;  
c\_FromSystem  = Nil;  
__See also__  
SendMessageToRobots method


SignalLayers     : Set Of TLayer = \[eTopLayer\.\. eBottomLayer\];

 


The major PCB Functions are defined and implemented in the RT\_PCBProcs unit\.


Function  RealToMils     \(C : TReal\)  : TReal;  
Function  RealToMMs      \(C : TReal\)  : TReal;  
Function  CoordToMils    \(C : TCoord\) : TReal;  
Function  CoordToMMs     \(C : TCoord\) : TReal;  
Function  MilsToCoord    \(M : TReal\)  : TCoord;  
Function  MMsToCoord     \(M : TReal\)  : TCoord;  
Function  MilsToRealCoord\(M : TReal\)  : TReal;  
Function  MMsToRealCoord \(M : TReal\)  : TReal;  
Function  MetricString  \(Var S        : TString;  
                         DefaultUnits : TUnit\)  : Boolean;  
Function  ImperialString\(Var S        : TString;  
                         DefaultUnits : TUnit\)  : Boolean;  
   
Procedure StringToCoordUnit\(S     : TString;  
                            Var C : TCoord;  
                            Var U : TUnit\);  
   
Procedure StringToRealUnit \(S     : TString;  
                            Var R : TReal;  
                            Var U : TUnit\);  
   
Function  CoordUnitToString\(C : TCoord;  
                            U : TUnit\) : TString;  
   
Function  RealUnitToString \(R : TReal;  
                            U : TUnit\) : TString;


Function  Degrees2Radians       \(Angle             : TAngle\)        : TReal;  
Function  AngleToFormattedString\(TextValue         : TReal;  
                                 TextFormat        : TString;  
                                 TextDimensionUnit : TDimensionUnit;  
                                 TextPrecision     : Integer;  
                                 TextPrefix        : TString;  
                                 TextSuffix        : TString;  
                                 UseTTFonts        : Boolean\) : TString;  
   
Function  DistanceToFormattedString    \(TextValue         : TReal;  
                                        TextFormat        : TString;  
                                        TextDimensionUnit : TDimensionUnit;  
                                        TextPrecision     : Integer;  
                                        TextPrefix        : TString;  
                                        TextSuffix        : TString;  
                                        DisplayUnit       : TUnit;  
                                        DimensionKind     : TDimensionKind;  
                                        UseTTFonts        : Boolean\)        : TString;  
   
Procedure NormalizeAngle               \(Var Angle         : TAngle\);  
   
Procedure RotateCoordsAroundXY         \(Var x, y          : TCoord;  
                                        Xr, Yr            : TCoord;  
                                        Angle             : TAngle\);  
   
Procedure FindZoomRect\(Const FarRect, CloseRect : TCoordRect; Out ZoomRect : TCoordRect\); Overload;  
Procedure FindZoomRect\(Const FarRect, CloseRect : TCoordRect; Out ZoomRect : TCoordRect; Const PrecisionFactor : Double\); Overload;  
   
 


Function  GetFillBLX                   \(P                 : TPCBObjectHandle;  
                                        ExpandBy          : TCoord\)         : TCoord;  
Function  GetFillBLY                   \(P                 : TPCBObjectHandle;  
                                        ExpandBy          : TCoord\)         : TCoord;  
Function  GetFillTLX                   \(P                 : TPCBObjectHandle;  
                                        ExpandBy          : TCoord\)         : TCoord;  
Function  GetFillTLY                   \(P                 : TPCBObjectHandle;  
                                        ExpandBy          : TCoord\)         : TCoord;  
Function  GetFillTRX                   \(P                 : TPCBObjectHandle;  
                                        ExpandBy          : TCoord\)         : TCoord;  
Function  GetFillTRY                   \(P                 : TPCBObjectHandle;  
                                        ExpandBy          : TCoord\)         : TCoord;  
Function  GetFillBRX                   \(P                 : TPCBObjectHandle;  
                                        ExpandBy          : TCoord\)         : TCoord;  
Function  GetFillBRY                   \(P                 : TPCBObjectHandle;  
                                        ExpandBy          : TCoord\)         : TCoord;


Function  Layer2String \(Layer : TLayer\) : TString;  
Function  String2Layer \(Layer : TString\): TLayer;


Procedure EnumFontsW                   \(DC                : HDC;  
                                        Const AFontName   : TPCBString;  
                                        Items             : TWideStrings\);  
Procedure EnumFontsA                   \(DC                : HDC;  
                                        Const AFontName   : TPCBString;  
                                        Items             : TStrings\);  
Function  LoadFontNamesW               \(Items             : TWideStrings\)   : Integer;  
Function  LoadFontNamesA               \(Items             : TStrings\)       : Integer;  
Function  GetLocalizedFontName         \(Const FontName    : TPCBString\)     : TPCBString;


Function  GetLocaleData\(AID   : LCID; AFlag : DWORD\) : TDynamicString;  
Function  IsLocaleLanguageJapanese : Boolean;  
Function  IsLocaleLanguageEnglish  : Boolean;  
Function  IsLocaleLanguageAsian    : Boolean;



Function GetIniFileName : AnsiString;


Function  CoordsEqual \(c1, c2 : Double\) : Boolean;


Function  ConvertEncodedText2WideString\(Const EncodedText : TDynamicString\) : TPCBString;


Function  ConvertWideString2EncodedText\(Const WString     : TPCBString\)     : TDynamicString;


Function  StringListCopy               \(AWideStringList : TWideStringList;  
                                        AAnsiStringList : TStringList\)      : Boolean;


Function  StringToWideString           \(const Str         : string\)         : TPCBString;

## 子章节

- [PCB API: Constants and Functions Reference](01-PCB_API_Constants_and_Functions_Reference.md/README.md)
- [<a id="PCB_Constants"></a>PCB Constants](02-a_id_PCB_Constants_a_PCB_Constants.md/README.md)
- [<a id="PCB_Functions"></a>PCB Functions](03-a_id_PCB_Functions_a_PCB_Functions.md/README.md)
