# Schematic API Constants

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Schematic API Constants for version 22](https://www.altium.com/documentation/altium-designer/schematic-api-constants)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Schematic API](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


The Schematic API Constants reference includes the following content:

[Internal Unit constants](https://www.altium.com/documentation/altium-designer/schematic-api-constants?version=21#Internal Unit constants)  
[MM to Internal Units Values](https://www.altium.com/documentation/altium-designer/schematic-api-constants?version=21#MM to Internal Units Values)  
[Other Constants](https://www.altium.com/documentation/altium-designer/schematic-api-constants?version=21#Other Constants)  
[Power Object constants](https://www.altium.com/documentation/altium-designer/schematic-api-constants?version=21#Power Object constants)  
[Parameter Set constants](https://www.altium.com/documentation/altium-designer/schematic-api-constants?version=21#Parameter Set constants)  
[Title Block constants](https://www.altium.com/documentation/altium-designer/schematic-api-constants?version=21#Title Block constants)  
[Differential Pair constants](https://www.altium.com/documentation/altium-designer/schematic-api-constants?version=21#Differential Pair constants)

 


cUnits : Array \[TUnit\] Of TDynamicString   = \('mil', 'mm', 'in', 'cm', '', 'm', 'AutoImperial', 'AutoMetric'\);  
cUnitSystems : Array\[TUnitSystem\] Of TUnitSet = \(\[eMil, eIN, eDXP, eAutoImperial\], \[eMM,  eCM, eM, eAutoMetric\]\);  
cAutoUnits = \[eAutoImperial, eAutoMetric\];  
cDefaultUnit             : Array\[TUnitSystem\] Of TUnit = \(eDXP, eMM\);  
cDefaultGridSettingsUnit : Array\[TUnitSystem\] Of TUnit = \(eMil, eMM\);  
   
//1 DXP 2004 SP1 Internal Unit =   
// 100000 DXP 2004 SP2 Internal Unit \(= 10 mils\)  
cBaseUnit           = 100000;  
   
//1 mil = 10000 DXP 2004 SP2 internal units  
cInternalPrecision  = 10000;  
   
//Size of workspace in DXP 2004 SP1 base logical unit  
cMaxWorkspace       = 6500;  
   
//Size of workspace in DXP 2004 SP1 base logical unit  
cMinWorkspace       = 10;  
   
//Size of workspace in the new logical unit \- max  
cMaxWorkspaceSize   = cMaxWorkspace\*cBaseUnit;  
   
//Size of workspace in the new logical unit \- min  
cMinWorkspaceSize   = cMinWorkspace\*cBaseUnit;  
CMaxTextParamLength = 32000;  
   
cSchInternalTolerance\_Metric = 2\*cInternalPrecision;  
   
//0 for imperial and 0\.004318mm for metric  
cSchInternalTolerance : Array\[TUnitSystem\] Of TCoord = \(0, cSchInternalTolerance\_Metric\);  
   
cSymbolLineWidthArray : Array \[TSize\] of  Integer  = \(0,1\*cBaseUnit,3\*cBaseUnit,5\*cBaseUnit\);  
   
cDefaultCustomSizeX\_Sheet    : Array\[TUnitSystem\] Of Integer = \(1500\*cBaseUnit,   30\*c10\_0MM\);  
cDefaultCustomSizeY\_Sheet    : Array\[TUnitSystem\] Of Integer = \(950 \*cBaseUnit,   20\*c10\_0MM\);  
cDefaultCustomSizeX\_Library  : Array\[TUnitSystem\] Of Integer = \(2000\*cBaseUnit,   40\*c10\_0MM\);  
cDefaultCustomSizeY\_Library  : Array\[TUnitSystem\] Of Integer = \(2000\*cBaseUnit,   40\*c10\_0MM\);  
cDefaultCustomMarginWidth    : Array\[TUnitSystem\] Of Integer = \(20  \*cBaseUnit,      c5\_0MM \);  
   
cPolylineCutterBoxHeight      =  3 \*cBaseUnit;  
cDefaultSheetFileNamePosition       : Array\[TUnitSystem\] Of Integer = \(10 \*cBaseUnit, c2\_5MM\);  
cBusEntryLength                     : Array\[TUnitSystem\] Of Integer = \(10 \*cBaseUnit, c2\_0MM\);  
cDefaultPortWidth                   : Array\[TUnitSystem\] Of Integer = \(50 \*cBaseUnit, c10\_0MM\);  
cDefaultSheetSymbolXSize            : Array\[TUnitSystem\] Of Integer = \(80 \*cBaseUnit, 5\*c7\_5MM\);  
cDefaultSheetSymbolYSize            : Array\[TUnitSystem\] Of Integer = \(50 \*cBaseUnit, 5\*c5\_0MM\);  
cDefaultSheetEntryGridSize          : Array\[TUnitSystem\] Of Integer = \(10 \*cBaseUnit, c2\_5MM\);  
cDefaultPolylineCutterFixedLength   : Array\[TUnitSystem\] Of Integer = \(10 \*cBaseUnit, c2\_5MM\);  
cDefaultAutoPanJumpDistance         : Array\[TUnitSystem\] Of Integer = \(30 \*cBaseUnit, c7\_5MM\);  
cDefaultAutoPanShiftJumpDistance    : Array\[TUnitSystem\] Of Integer = \(100\*cBaseUnit, c25\_0MM\);  
cDefaultPinLength                   : Array\[TUnitSystem\] Of Integer = \(30 \*cBaseUnit, c0\_50MM\);  
cDefaultCircleRadius                : Array\[TUnitSystem\] Of Integer = \(100\*cBaseUnit, c7\_5MM\);  
cDefaultArcRadius                   : Array\[TUnitSystem\] Of Integer = \(10 \*cBaseUnit, c5\_0MM\);  
cDefaultStartAngle                  = 30;  
cDefaultEndAngle                    = 330;  
cDefaultEllipseRadius               : Array\[TUnitSystem\] Of Integer = \(20 \* cBaseUnit, c5\_0MM\);  
cDefaultEllipseSecondaryRadius      : Array\[TUnitSystem\] Of Integer = \(10 \* cBaseUnit, c2\_5MM\);  
cDefaultEllipticalArcSecondaryRadius: Array\[TUnitSystem\] Of Integer = \(10 \* cBaseUnit, c2\_5MM\);  
cDefaultRectangleCornerX            : Array\[TUnitSystem\] Of Integer = \(50 \* cBaseUnit, c5\_0MM\);  
cDefaultRectangleCornerY            : Array\[TUnitSystem\] Of Integer = \(50 \* cBaseUnit, c5\_0MM\);  
cDefaultIEESymbolScale              : Array\[TUnitSystem\] Of Integer = \(10 \* cBaseUnit, c2\_5MM\);  
cDefaultRoundRectCornerXRadius      : Array\[TUnitSystem\] Of Integer = \(20 \* cBaseUnit, c0\_50MM\);  
cDefaultRoundRectCornerYRadius      : Array\[TUnitSystem\] Of Integer = \(20 \* cBaseUnit, c0\_50MM\);  
cDefaultLabelXSize                  : Array\[TUnitSystem\] Of Integer = \(40 \* cBaseUnit, c0\_25MM\);  
cDefaultLabelYSize                  : Array\[TUnitSystem\] Of Integer = \(10 \* cBaseUnit, c0\_50MM\);  
cIEESymbolScale\_Min                 = 1   \* cBaseUnit;  
cIEESymbolScale\_Max                 = 200 \* cBaseUnit;  
cIEESymbolScale\_Step                = 1  \* cBaseUnit;  
   
cDuplicateOffsetX                   : Array\[TUnitSystem\] Of Integer = \( 20 \* cBaseUnit,  c5\_0MM\);  
cDuplicateOffsetY                   : Array\[TUnitSystem\] Of Integer = \(\-20 \* cBaseUnit, \-c5\_0MM\);  
   
cJumpLocationZoomRectWidth          = 200 \* cBaseUnit;  
cJumpLocationZoomRectHeight         = 200 \* cBaseUnit;  
cSheetSymbolBoundingRectInflate     = 20  \* cBaseUnit;  
cPinFullBoundingRectInflate         = 5   \* cBaseUnit;  
cPolylineBoundingRectInflate        = 10  \* cBaseUnit;  
cFindReplaceRectInflate             = 50  \* cBaseUnit;  
cPinIEEESymbolRectInflateBy         = 6   \* cBaseUnit;  
cPortWidthInflate                   = 10  \* cBaseUnit;  
cMinPortWidth                       = 30  \* cBaseUnit;  
cMinSheetSymbolBorderGap            : Array\[TUnitSystem\] Of Integer = \(10 \* cBaseUnit, c2\_5MM\);  
 


Each Millimetre constant value is expressed in internal units \(rounded to nearest integer value\)\.  
c0\_25MM = 98425;  
c0\_50MM = 196850;  
c0\_75MM = 295275;  
c1\_00MM = 393701;  
c1\_5MM  = 590551;  
c2\_0MM  = 787402;  
c2\_5MM  = 984252;  
c3\_0MM  = 1181102;  
c3\_5MM  = 1377953;  
c4\_0MM  = 1574803;  
c4\_5MM  = 1771654;  
c5\_0MM  = 1968504;  
c5\_5MM  = 2165354;  
c6\_0MM  = 2362205;  
c6\_5MM  = 2559055;  
c7\_0MM  = 2755906;  
c7\_5MM  = 2952756;  
c8\_0MM  = 3149606;  
c8\_5MM  = 3346457;  
c9\_0MM  = 3543307;  
c9\_5MM  = 3740157;  
c10\_0MM = 3937008;  
c15\_0MM = 5905512;  
c20\_0MM = 7874016;  
c25\_0MM = 9842520;  
c30\_0MM = 11811024;  
c35\_0MM = 13779528;  
c40\_0MM = 15748031;  
c45\_0MM = 17716535;  
c50\_0MM = 19685039;  
c55\_0MM = 21653543;  
c60\_0MM = 23622047;  
c65\_0MM = 25590551;  
c70\_0MM = 27559055;  
c75\_0MM = 29527559;  
c80\_0MM = 31496063;  
c85\_0MM = 33464567;  
c90\_0MM = 35433071;  
c95\_0MM = 37401575;  
c100\_0MM  = 39370078;  
c1000\_0MM = 393700787;



cMaxShortStringLength = 254;


cOldSheetEntryGrid = 10;


cOldMaxPolygonVertices = 50;  
cCharacterApproximativeWidth  = 8  \* cBaseUnit;  
cCharacterApproximativeHeight = 10 \* cBaseUnit;  
cCharacterWidthTolerance      = 4  \* cBaseUnit;  
cConnectionDrawingThreshold   = 3;  
   
cPinBoundingRectInflate = 2  \*cBaseUnit;  
cMinWireUnderlineWidth  = 5  \*cBaseUnit;  
cMinBusUnderlineWidth   = 7  \*cBaseUnit;  
cCompilationMaskedPopupString = 'Removed by Compilation Mask';


LibPrimitiveSet:  TObjectSet = \[eRectangle,  
                                eLine,  
                                eArc,  
                                eBus,  
                                eBusEntry,  
                                eEllipticalArc,  
                                eRoundRectangle,  
                                eImage,  
                                ePie,  
                                eEllipse,  
                                ePolygon,  
                                ePolyline,  
                                ePort,  
                                eBezier,  
                                eLabel,  
                                eNetlabel,  
                                eTextFrame,  
                                eSymbol,  
                                ePin,  
                                eParameterSet  
                                eWire\];  
   
cObjectInspectorViewname    = 'SchObjectInspector';  
cLibObjectInspectorViewname = 'SchLibObjectInspector';  
   
cGroundTypeSet = \[ePowerGndPower, ePowerGndSignal, ePowerGndEarth\];  
   
CLineShapeArrowRatio = 2;  
CLineShapeSizeCoefs : Array\[TSize\] Of Integer = \(1, 2, 3, 4\);  
   
cNoUnionIndex = 0;  
   
cStringIncrementStyleStrings : Array\[TStringIncrementStyle\] Of String = \('None','Horizontal First', 'Vertical First'\);


cBooleanEditorAttributes =  
    \[eObjectAttribute\_IsHidden,  
     eObjectAttribute\_Locked,  
     eObjectAttribute\_Accessible,  
     eObjectAttribute\_Solid,  
     eObjectAttribute\_ShowName,  
     eObjectAttribute\_IsMirrored,  
     eObjectAttribute\_DesignatorLocked,  
     eObjectAttribute\_PartIdLocked,  
     eObjectAttribute\_PinsMoveable,  
     eObjectAttribute\_ImageKeepAspect,  
     eObjectAttribute\_ImageEmbed,  
     eObjectAttribute\_ParameterAllowLibrarySynchronize,  
     eObjectAttribute\_ParameterAllowDatabaseSynchronize,  
     eObjectAttribute\_TextAutoPosition,  
     eObjectAttribute\_PinShowDesignator,  
     eObjectAttribute\_ShowHiddenFields,  
     eObjectAttribute\_ShowHiddenPins,  
     eObjectAttribute\_ShowDesignator,  
     eObjectAttribute\_TextFrameWordWrap,  
     eObjectAttribute\_TextFrameShowBorder,  
     eObjectAttribute\_TextFrameClipToRect,  
     eObjectAttribute\_PowerObjectShowNetName\];


cStringEditorAttributes =  
    \[eObjectAttribute\_LocationX,  
     eObjectAttribute\_LocationY,  
     eObjectAttribute\_CornerLocationX,  
     eObjectAttribute\_CornerLocationY,  
     eObjectAttribute\_Width,  
     eObjectAttribute\_Radius,  
     eObjectAttribute\_StartAngle,  
     eObjectAttribute\_EndAngle,  
     eObjectAttribute\_SecondaryRadius,  
     eObjectAttribute\_StringText,  
     eObjectAttribute\_Name,  
     eObjectAttribute\_Description,  
     eObjectAttribute\_ParameterValue,  
     eObjectAttribute\_ParameterName,  
     eObjectAttribute\_PinWidth,  
     eObjectAttribute\_PinDefaultValue,  
     eObjectAttribute\_PinDesignator,  
     eObjectAttribute\_PinHiddenNetName,  
     eObjectAttribute\_PinLength,  
     eObjectAttribute\_RoundRectangleCornerRadiusX,  
     eObjectAttribute\_RoundRectangleCornerRadiusY,  
     eObjectAttribute\_SchComponentLibReference,  
     eObjectAttribute\_SchComponentDesignator,  
     eObjectAttribute\_SheetEntryDistanceFromTop,  
     eObjectAttribute\_SymbolScaleFactor,  
     eObjectAttribute\_TaskHolderInstanceName,  
     eObjectAttribute\_SheetName,  
     eObjectAttribute\_OwnerName,  
     eObjectAttribute\_SchComponentComment,   
     eObjectAttribute\_SchComponentLibraryName,  
     eObjectAttribute\_SchComponentFootprint,  
     eObjectAttribute\_SelectedVertex\_X,  
     eObjectAttribute\_SelectedVertex\_Y,  
     eObjectAttribute\_SelectedVertex2\_X,  
     eObjectAttribute\_SelectedVertex2\_Y\];


cComboBoxEditorAttributes =  
    \[eObjectAttribute\_OwnerPartId,  
     eObjectAttribute\_OwnerPartDisplayMode,  
     eObjectAttribute\_LineStyle,  
     eObjectAttribute\_StartLineShape,  
     eObjectAttribute\_EndLineShape,  
     eObjectAttribute\_LineShapeSize,  
     eObjectAttribute\_Orientation,  
     eObjectAttribute\_Alignment,  
     eObjectAttribute\_BorderWidth,  
     eObjectAttribute\_LineWidth,  
     eObjectAttribute\_JunctionSize,  
     eObjectAttribute\_ParameterType,  
     eObjectAttribute\_ParameterReadOnlyState,  
     eObjectAttribute\_PinSwapId\_Pin,  
     eObjectAttribute\_PinSwapId\_Part,  
     eObjectAttribute\_PinSwapId\_PartPin,  
     eObjectAttribute\_PinFormalType,  
     eObjectAttribute\_PinElectrical,  
     eObjectAttribute\_PinIeeeSymbolInner,  
     eObjectAttribute\_PinIeeeSymbolOuter,  
     eObjectAttribute\_PinIeeeSymbolInnerEdge,  
     eObjectAttribute\_PinIeeeSymbolOuterEdge,  
     eObjectAttribute\_SheetEntrySide,  
     eObjectAttribute\_PortArrowStyle,  
     eObjectAttribute\_PortIOType,  
     eObjectAttribute\_PowerObjectStyle,  
     eObjectAttribute\_CrossSheetConnectorStyle,  
     eObjectAttribute\_SchComponentDisplayMode,  
     eObjectAttribute\_SchComponentPartId,  
     eObjectAttribute\_SchComponentKind,  
     eObjectAttribute\_IeeeSymbol\];


cColorEditorAttributes =  
    \[eObjectAttribute\_Color,  
     eObjectAttribute\_TextColor,  
     eObjectAttribute\_AreaColor\];


cContextHelpStringsByObjectId : Array\[TObjectId\] Of TDynamicString =   
\( 'FirstObjectID',  
'ClipBoardContainer',  
'Note',  
'Probe',  
'Rectangle',  
'Line',  
'ConnectionLine',  
'BusEntry',  
'Arc',  
'EllipticalArc',  
'RoundRectangle',  
'Image',  
'Pie',  
'TextFrame',  
'Ellipse',  
'Junction',  
'Polygon',  
'Polyline',  
'Wire',  
'Bus',  
'Bezier',  
'Label',  
'NetLabel',  
'Designator',  
'SchComponent',  
'Parameter',  
'ParameterSet',  
'ParameterList',  
'SheetName',  
'SheetFileName',  
'Sheet',  
'SchLib',  
'Symbol',  
'NoERC',  
'ErrorMarker',  
'Pin',  
'Port',  
'PowerObject',  
'SheetEntry',  
'SheetSymbol',  
'Template',  
'TaskHolder',  
'MapDefiner',  
'ImplementationMap',  
'Implementation',  
'ImplementationsList',  
'CrossSheetConnector',  
'CompileMask',  
'OpenBusComponent',  
'OpenBusLink',  
'OpenBusDesignator',  
'HarnessConnector',  
'HarnessEntry',  
'HarnessConnectorType',  
'SignalHarness',  
'OpenBusPort',  
'LastObjectId'  
\);


cPowerObjectLineWidth  = 1 \* cBaseUnit;  
cPowerGndPowerXOffset1 = 0 \* cBaseUnit;  
cPowerGndPowerXOffset2 = 3 \* cBaseUnit;  
cPowerGndPowerXOffset3 = 6 \* cBaseUnit;  
cPowerGndPowerXOffset4 = 9 \* cBaseUnit;  
cPowerGndPowerYOffset1 = 10 \* cBaseUnit;  
cPowerGndPowerYOffset2 = 7  \* cBaseUnit;  
cPowerGndPowerYOffset3 = 4  \* cBaseUnit;  
cPowerGndPowerYOffset4 = 1  \* cBaseUnit;  
cPowerNameXOffset1     = 2  \* cBaseUnit;


cParameterSetLineWidth          = 1   \*cBaseUnit;  
cParameterSetLineLength         = 6   \*cBaseUnit;  
cParameterSetCircleRadius       = 6   \*cBaseUnit;  
cParameterSetCircleCenterOffset = 12  \*cBaseUnit;  
cParameterSetIOffsetX           = 12  \*cBaseUnit;  
cParameterSetIOffsetY           = 5   \*cBaseUnit;  
cParameterSetTextOffetX         = 20  \*cBaseUnit;  
cParameterSetParamDefaultLength = 5   \*cBaseUnit;  
cParameterSetParam000XOffset    = 32  \*cBaseUnit;  
cParameterSetParam090XOffset    = 4   \*cBaseUnit;  
cParameterSetParam090YOffset    = 24  \*cBaseUnit;  
cParameterSetParam180XOffset    = 12   \*cBaseUnit  
cParameterSetParam270XOffset    = 10   \*cBaseUnit  
cParameterSetParam270YOffset    = 22  \*cBaseUnit;  
cParameterSetParamYOffset       = 2   \*cBaseUnit;  
cParameterSetParamDeltaYOffset1 = 12  \*cBaseUnit;  
 


cTitleBlockWidth               = 350 \*cBaseUnit;  
cTitleBlockWidth1              = 100 \*cBaseUnit;  
cTitleBlockWidth2              = 150 \*cBaseUnit;  
cTitleBlockWidth3              = 300 \*cBaseUnit;  
cTitleBlockHeight              = 80  \*cBaseUnit;  
cTitleBlockHeight1             = 50  \*cBaseUnit;  
cTitleBlockHeight2             = 20  \*cBaseUnit;  
cTitleBlockHeight3             = 10  \*cBaseUnit;  
cTitleBlockTextXPos\_Title      = 345 \*cBaseUnit;  
cTitleBlockTextXPos\_Number     = 295 \*cBaseUnit;  
cTitleBlockTextXPos\_Revision   = 95  \*cBaseUnit;  
cTitleBlockTextXPos\_Size       = 345 \*cBaseUnit;  
cTitleBlockTextXPos\_SheetStyle = 340 \*cBaseUnit;  
cTitleBlockTextYPos\_SheetStyle = 35  \*cBaseUnit;  
cTitleBlockTextXPos\_Date1      = 345 \*cBaseUnit;  
cTitleBlockTextXPos\_Date2      = 300 \*cBaseUnit;  
cTitleBlockTextXPos\_SheetNbr   = 145 \*cBaseUnit;  
cTitleBlockTextXPos\_File1      = 345 \*cBaseUnit;  
cTitleBlockTextXPos\_File2      = 300 \*cBaseUnit;  
cTitleBlockTextXPos\_DrawnBy    = 145 \*cBaseUnit;  
cTitleBlockTextYPos\_TextLine1  = 20  \*cBaseUnit;  
cTitleBlockTextYPos\_TextLine2  = 10  \*cBaseUnit;  
cAnsiTitleBlock1               = 175 \*cBaseUnit;  
cAnsiTitleBlock2               = 625 \*cBaseUnit;  
cAnsiTitleBlock3               = 425 \*cBaseUnit;  
cAnsiTitleBlock4               = 125 \*cBaseUnit;  
cAnsiTitleBlock5               = 63  \*cBaseUnit;  
cAnsiTitleBlock6               = 25  \*cBaseUnit;  
cAnsiTitleBlock7               = 387 \*cBaseUnit;  
cAnsiTitleBlock8               = 325 \*cBaseUnit;  
cAnsiTitleBlock9               = 276 \*cBaseUnit;  
cAnsiTitleBlock10              = 36  \*cBaseUnit;  
cAnsiTitleBlock11              = 420 \*cBaseUnit;  
cAnsiTitleBlock12              = 170 \*cBaseUnit;  
cAnsiTitleBlock13              = 420 \*cBaseUnit;  
cAnsiTitleBlock14              = 382 \*cBaseUnit;  
cAnsiTitleBlock15              = 271 \*cBaseUnit;  
cAnsiTitleBlock16              = 31  \*cBaseUnit;


cDifferentialPairWidth          = 21 \* cBaseUnit \+ cParameterSetLineWidth Div 2;  
cDifferentialPairHeight         =  9 \* cBaseUnit \+ cParameterSetLineWidth;  
cDifferentialPairShadowSize     = cParameterSetLineWidth;  
cDiffPairPosNetNaming           = '\_P';  
cDiffPairNegNetNaming           = '\_N';  
cDefaultDiffPairName  : TDynamicString = 'DIFFPAIR';  
cDiffPairParam        : TDynamicString = 'DifferentialPair';  
cDefaultDiffPair      : TDynamicString = 'DefaultDiffPair'

## 子章节

- [Schematic API: Constants Reference](01-Schematic_API_Constants_Reference.md/README.md)
