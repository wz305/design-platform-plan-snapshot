# <a id="PCB_Constants"></a>PCB Constants

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

## 子章节

- [<a id="AllLayers"></a>AllLayers](01-a_id_AllLayers_a_AllLayers.md.md)
- [<a id="AllObjects"></a>AllObjects](02-a_id_AllObjects_a_AllObjects.md.md)
- [<a id="AllPrimitives"></a>AllPrimitives](03-a_id_AllPrimitives_a_AllPrimitives.md.md)
- [<a id="cAdvPCB"></a>cAdvPCB](04-a_id_cAdvPCB_a_cAdvPCB.md.md)
- [<a id="cBoardSideStrings_constant"></a>cBoardSideStrings constant](05-a_id_cBoardSideStrings_constant_a_cBoardSideStrings_constant.md.md)
- [<a id="cComonentCollisionCheckModeStrings_const"></a>cComonentCollisionCheckModeStrings constant](06-a_id_cComonentCollisionCheckModeStrings_const_a_cComonentCollisionCheckModeStrings_constant.md.md)
- [<a id="cDefaultLayerDrawingOrder_constant"></a>cDefaultLayerDrawingOrder constant](07-a_id_cDefaultLayerDrawingOrder_constant_a_cDefaultLayerDrawingOrder_constant.md.md)
- [<a id="cDir_NONE"></a>cDir\_NONE](08-a_id_cDir_NONE_a_cDir_NONE.md.md)
- [<a id="cDir_ANY"></a>cDir\_ANY](09-a_id_cDir_ANY_a_cDir_ANY.md.md)
- [<a id="cDir_Diagonal"></a>cDir\_Diagonal](10-a_id_cDir_Diagonal_a_cDir_Diagonal.md.md)
- [<a id="cDir_HorVert"></a>cDir\_HorVert](11-a_id_cDir_HorVert_a_cDir_HorVert.md.md)
- [<a id="cLayerStrings"></a>cLayerStrings](12-a_id_cLayerStrings_a_cLayerStrings.md.md)
- [<a id="cMaxTestPointStyle"></a>cMaxTestPointStyle](13-a_id_cMaxTestPointStyle_a_cMaxTestPointStyle.md.md)
- [<a id="cMinTestPointStyle"></a>cMinTestPointStyle](14-a_id_cMinTestPointStyle_a_cMinTestPointStyle.md.md)
- [<a id="cMidLayers"></a>cMidLayers](15-a_id_cMidLayers_a_cMidLayers.md.md)
- [<a id="cMinLayer_WidthRule"></a>cMinLayer\_WidthRule](16-a_id_cMinLayer_WidthRule_a_cMinLayer_WidthRule.md.md)
- [<a id="cMaxLayer_WidthRule"></a>cMaxLayer\_WidthRule](17-a_id_cMaxLayer_WidthRule_a_cMaxLayer_WidthRule.md.md)
- [<a id="cRoutingWidthModeStrings"></a>cRoutingWidthModeStrings](18-a_id_cRoutingWidthModeStrings_a_cRoutingWidthModeStrings.md.md)
- [<a id="cRuleIdStrings"></a>cRuleIdStrings](19-a_id_cRuleIdStrings_a_cRuleIdStrings.md.md)
- [<a id="cTextAutopositionStrings"></a>cTextAutopositionStrings](20-a_id_cTextAutopositionStrings_a_cTextAutopositionStrings.md.md)
- [<a id="cTestPointPriorityHigh"></a>cTestPointPriorityHigh](21-a_id_cTestPointPriorityHigh_a_cTestPointPriorityHigh.md.md)
- [<a id="cTestPointPriorityLow"></a>cTestPointPriorityLow](22-a_id_cTestPointPriorityLow_a_cTestPointPriorityLow.md.md)
- [<a id="cWidthRuleLayers"></a>cWidthRuleLayers](23-a_id_cWidthRuleLayers_a_cWidthRuleLayers.md.md)
- [<a id="FirstObjectId"></a>FirstObjectId](24-a_id_FirstObjectId_a_FirstObjectId.md.md)
- [<a id="InternalUnits"></a>InternalUnits](25-a_id_InternalUnits_a_InternalUnits.md.md)
- [<a id="InternalPlanes"></a>InternalPlanes](26-a_id_InternalPlanes_a_InternalPlanes.md.md)
- [<a id="kDiameterSymbolANSI"></a>kDiameterSymbolANSI](27-a_id_kDiameterSymbolANSI_a_kDiameterSymbolANSI.md.md)
- [<a id="kDiameterSymbolUnicode"></a>kDiameterSymbolUnicode](28-a_id_kDiameterSymbolUnicode_a_kDiameterSymbolUnicode.md.md)
- [<a id="kDegreeSymbol"></a>kDegreeSymbol](29-a_id_kDegreeSymbol_a_kDegreeSymbol.md.md)
- [<a id="k1Inch"></a>k1Inch](30-a_id_k1Inch_a_k1Inch.md.md)
- [<a id="kDefaultArcResolution"></a>kDefaultArcResolution](31-a_id_kDefaultArcResolution_a_kDefaultArcResolution.md.md)
- [<a id="k1Mil"></a>k1Mil](32-a_id_k1Mil_a_k1Mil.md.md)
- [<a id="kMaxCoord"></a>kMaxCoord](33-a_id_kMaxCoord_a_kMaxCoord.md.md)
- [<a id="kMinCoord"></a>kMinCoord](34-a_id_kMinCoord_a_kMinCoord.md.md)
- [<a id="kMaxInternalPlane"></a>kMaxInternalPlane](35-a_id_kMaxInternalPlane_a_kMaxInternalPlane.md.md)
- [<a id="kMinInternalPlane"></a>kMinInternalPlane](36-a_id_kMinInternalPlane_a_kMinInternalPlane.md.md)
- [<a id="kMaxPolySize"></a>kMaxPolySize](37-a_id_kMaxPolySize_a_kMaxPolySize.md.md)
- [<a id="LastObjectId"></a>LastObjectId](38-a_id_LastObjectId_a_LastObjectId.md.md)
- [<a id="kMaxStrokes"></a>kMaxStrokes](39-a_id_kMaxStrokes_a_kMaxStrokes.md.md)
- [<a id="MaxLayer"></a>MaxLayer](40-a_id_MaxLayer_a_MaxLayer.md.md)
- [<a id="MaxBoardLayer"></a>MaxBoardLayer](41-a_id_MaxBoardLayer_a_MaxBoardLayer.md.md)
- [<a id="MaxLogicalTextSize"></a>MaxLogicalTextSize](42-a_id_MaxLogicalTextSize_a_MaxLogicalTextSize.md.md)
- [<a id="MaxRouteLayer"></a>MaxRouteLayer](43-a_id_MaxRouteLayer_a_MaxRouteLayer.md.md)
- [<a id="MaxMechanicalLayer_constant"></a>MaxMechanicalLayer constant](44-a_id_MaxMechanicalLayer_constant_a_MaxMechanicalLayer_constant.md.md)
- [<a id="MechanicalLayers"></a>MechanicalLayers](45-a_id_MechanicalLayers_a_MechanicalLayers.md.md)
- [<a id="MinLayer"></a>MinLayer](46-a_id_MinLayer_a_MinLayer.md.md)
- [<a id="MinMechanicalLayer_constant"></a>MinMechanicalLayer constant](47-a_id_MinMechanicalLayer_constant_a_MinMechanicalLayer_constant.md.md)
- [<a id="Numbers"></a>Numbers](48-a_id_Numbers_a_Numbers.md.md)
- [<a id="WideStringObjects"></a>WideStringObjects](49-a_id_WideStringObjects_a_WideStringObjects.md.md)
- [<a id="PCB_Messages"></a>PCB Messages](50-a_id_PCB_Messages_a_PCB_Messages.md.md)
- [<a id="SignalLayers"></a>SignalLayers](51-a_id_SignalLayers_a_SignalLayers.md.md)
