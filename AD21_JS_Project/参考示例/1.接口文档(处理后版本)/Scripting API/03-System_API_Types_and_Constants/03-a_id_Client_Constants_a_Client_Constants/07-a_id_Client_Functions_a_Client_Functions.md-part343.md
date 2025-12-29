#### cContextHelpStringsByObjectId

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

### <a id="Power_Object_constants"></a>Power Object constants

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

### <a id="Parameter_Set_constants"></a>Parameter Set constants

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
 

### <a id="Title_Block_constants"></a>Title Block constants

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

### <a id="Differential_Pair_constants"></a>Differential Pair constants

cDifferentialPairWidth          = 21 \* cBaseUnit \+ cParameterSetLineWidth Div 2;  
cDifferentialPairHeight         =  9 \* cBaseUnit \+ cParameterSetLineWidth;  
cDifferentialPairShadowSize     = cParameterSetLineWidth;  
cDiffPairPosNetNaming           = '\_P';  
cDiffPairNegNetNaming           = '\_N';  
cDefaultDiffPairName  : TDynamicString = 'DIFFPAIR';  
cDiffPairParam        : TDynamicString = 'DifferentialPair';  
cDefaultDiffPair      : TDynamicString = 'DefaultDiffPair'

# Schematic API Types

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Schematic API Types for version 22](https://www.altium.com/documentation/altium-designer/schematic-api-types)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Schematic API](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## Schematic API: Enumerated Types Reference 

The Enumerated Types are used for many of the Schematic Interfaces methods covered in this section\. For example the ISch\_Port interface has a ConnectedEnd property which returns a TPortConnectedEnd type\. You can use the Enumerated Types reference to check the range for the TPortConnectedEnd type\.

The Schematic API Enumerated Types reference includes the following content:

[TAngle](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TAngle)  
[TAutoPanStyle](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TAutoPanStyle)  
[TCrossSheetConnectorStyle](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TCrossSheetConnectorStyle)  
[TCoordRect](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TCoordRect)  
[TCoord](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TCoord)  
[TConnectivityScope](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TConnectivityScope)  
[TConnectionNodeType](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TConnectionNodeType)  
[TComponentDisplay](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TComponentDisplay)  
[TColor](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TColor)  
[TChosenDocumentScope](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TChosenDocumentScope)  
[TCursorMove](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TCursorMove)  
[TCursorShape](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TCursorShape)  
[TDistance](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TDistance)  
[TDrawMode](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TDrawMode)  
[TDrawQuality](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TDrawQuality)  
[TDynamicStirng](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TDynamicStirng)  
[TIeeeSymbol](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TIeeeSymbol)  
[TFindReplaceIdentifierScope](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TFindReplaceIdentifierScope)  
[THorizontalAlign](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#THorizontalAlign)  
[THitTestResult](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#THitTestResult)  
[THitTestMode](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#THitTestMode)  
[TEditingAction](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TEditingAction)  
[TFontName](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TFontName)  
[TFontID](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TFontID)  
[TFileName](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TFileName)  
[TGridPreset](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TGridPreset)  
[TIterationDepth](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TIterationDepth)  
[TLeftRightSide](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLeftRightSide)

[TLibraryAutoZoom](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLibraryAutoZoom)  
[TLibraryScope](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLibraryScope)  
[TLinePlaceMode](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLinePlaceMode)  
[TLineShape](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLineShape)  
[TLineStyle](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLineStyle)  
[TLocation](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLocation)  
[TMyRect](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TMyRect)  
[TOrcadFootprint](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TOrcadFootprint)  
[TObjectAttribute](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TObjectAttribute)  
[TObjectCreationMode](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TObjectCreationMode)  
[TObjectId](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TObjectId)  
[TObjectSet](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TObjectSet)  
[TOpenBusPortType](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TOpenBusPortType)  
[TOpenBusComponentKind](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TOpenBusComponentKind)  
[TOpenBusPortKind](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TOpenBusPortKind)  
[TOpenBusInternalPinType](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TOpenBusInternalPinType)  
[TParameter\_ReadOnlyState](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TParameter_ReadOnlyState)  
[TParameterType](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TParameterType)  
[TPinElectrical](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPinElectrical)  
[TPlacementMode](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPlacementMode)  
[TPolylineCutterMode](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPolylineCutterMode)  
[TPortArrowStyle](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPortArrowStyle)  
[TPortConnectedEnd](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPortConnectedEnd)  
[TPortIO](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPortIO)  
[TPowerObjectStyle](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPowerObjectStyle)  
[TProbeMethod](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TProbeMethod)  
[TRotationBy90](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TRotationBy90)  
[TPrintKind](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPrintKind)

[TLibraryAutoZoom](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLibraryAutoZoom)  
[TLibraryScope](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLibraryScope)  
[TLinePlaceMode](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLinePlaceMode)  
[TLineShape](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLineShape)  
[TLineStyle](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLineStyle)  
[TLocation](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TLocation)  
[TMyRect](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TMyRect)  
[TOrcadFootprint](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TOrcadFootprint)  
[TObjectAttribute](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TObjectAttribute)  
[TObjectCreationMode](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TObjectCreationMode)  
[TObjectId](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TObjectId)  
[TObjectSet](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TObjectSet)  
[TOpenBusPortType](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TOpenBusPortType)  
[TOpenBusComponentKind](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TOpenBusComponentKind)  
[TOpenBusPortKind](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TOpenBusPortKind)  
[TOpenBusInternalPinType](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TOpenBusInternalPinType)  
[TParameter\_ReadOnlyState](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TParameter_ReadOnlyState)  
[TParameterType](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TParameterType)  
[TPinElectrical](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPinElectrical)  
[TPlacementMode](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPlacementMode)  
[TPolylineCutterMode](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPolylineCutterMode)  
[TPortArrowStyle](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPortArrowStyle)  
[TPortConnectedEnd](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPortConnectedEnd)  
[TPortIO](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPortIO)  
[TPowerObjectStyle](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPowerObjectStyle)  
[TProbeMethod](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TProbeMethod)  
[TRotationBy90](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TRotationBy90)  
[TPrintKind](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21#TPrintKind)

 

### <a id="TAutoPanStyle"></a>TAngle

TAngle = TReal;

### TAutoPanStyle

TAutoPanStyle = \(  
    eAutoPanOff,  
    eAutoPanFixedJump,  
    eAutoPanReCenter  
     \);

### <a id="TCrossSheetConnectorStyle"></a>TCrossSheetConnectorStyle

TCrossSheetConnectorStyle = \(  
        eCrossSheetLeft,  
        eCrossSheetRight  
    \);

### <a id="TCoordRect"></a>TCoordRect

TCoordRect                   = Record  
        Case Integer of  
           0 :\(left, bottom, right, top : TCoord\);  
           1 :\(x1,   y1,     x2,    y2  : TCoord\);  
           2 :\(Location1,    Location2  : TLocation\);  
End;

### <a id="TCoord"></a>TCoord

TCoord = Integer;

### <a id="TConnectivityScope"></a>TConnectivityScope

TConnectivityScope = \(eConnectivity\_ConnectionOnly, eConnectivity\_WholeNet\);

### <a id="TConnectionNodeType"></a>TConnectionNodeType

TConnectionNodeType = \(eConnectionNode\_IntraSheetLink, eConnectionNode\_InterSheetLink, eConnectionNode\_Hidden\);

### <a id="TComponentDisplay"></a>TComponentDisplay

TComponentDisplay = \(  
    eCompBlock,  
    eCompDevice,  
    eCompPower,  
    eCompSymbol  
     \);

### <a id="TColor"></a>TColor

__Syntax__  
TColor  = Graphics\.TColor;  
__Notes__  
The __TColor__ value specifies a 6 digit hexadecimal number of the $FFFFFF format\.  For example the color blue would be RGB:0,0,255 and Hex:FF0000 therefore the converted decimal value would be 16711680\.  The following formula may be used to calculate the required value, R\+256\*\(G\+\(256\*B\)\)\. 

This TColor value is defined from the Graphics Unit of the Borland Delphi's VCL library\.

__Example__s  
Color=0 is black, Color=255 is red, Color=65280 is green   Color=16711680 is blue   Color=16777215 is white\. Decimal or hexadecimal values can be assigned\.  
__See also__  
ISch\_Preferences  
IComponentPainterView  
ISch\_GraphicalObject  
ISch\_TextFrame  
ISch\_SheetEntry  
ISch\_HarnessEntry  
ISch\_Component

### <a id="TChosenDocumentScope"></a>TChosenDocumentScope

TChosenDocumentScope = \(eScope\_None, eScope\_SingleDocument, eScope\_ProjectDocuments, eScope\_OpenDocuments\);

### <a id="TCursorMove"></a>TCursorMove

TCursorMove = \(  
    eCursorLeft,  
    eCursorRight,  
    eCursorTop,  
    eCursorBottom\);

### <a id="TCursorShape"></a>TCursorShape

TCursorShape = \(  
       eLargeCursor90,  
       eSmallCursor90,  
       eSmallCursor45,  
       eTinyCursor45\);

### <a id="TDistance"></a>TDistance

TDistance = Integer;

### <a id="TDrawMode"></a>TDrawMode

TDrawMode = \(  
    eDrawFull,  
    eDrawDraft,  
    eDrawHidden\);

### <a id="TDrawQuality"></a>TDrawQuality

TDrawQuality = \(eFullQuality,eDraftQuality\);

### <a id="TDynamicStirng"></a>TDynamicStirng

TDynamicString = AnsiString;

### <a id="TIeeeSymbol"></a>TIeeeSymbol

TIeeeSymbol = \(  
    eNoSymbol,  
    eDot,  
    eRightLeftSignalFlow,  
    eClock,  
    eActiveLowInput,  
    eAnalogSignalIn,  
    eNotLogicConnection,  
    eShiftRight,  
    ePostPonedOutput,  
    eOpenCollector,  
    eHiz,  
    eHighCurrent,  
    ePulse,  
    eSchmitt,  
    eDelay,  
    eGroupLine,  
    eGroupBin,  
    eActiveLowOutput,  
    ePiSymbol,  
    eGreaterEqual,  
    eLessEqual,  
    eSigma,  
    eOpenCollectorPullUp,  
    eOpenEmitter,  
    eOpenEmitterPullUp,  
    eDigitalSignalIn,  
    eAnd,  
    eInvertor,  
    eOr,  
    eXor,  
    eShiftLeft,  
    eInputOutput,  
    eOpenCircuitOutput,  
    eLeftRightSignalFlow,  
    eBidirectionalSignalFlow\);

### <a id="TFindReplaceIdentifierScope"></a>TFindReplaceIdentifierScope

TFindReplaceIdentifierScope = \(  
       eFindReplace\_AllIdentifiers,  
       eFindReplace\_NetIdentifiersOnly,  
       eFindReplace\_DesignatorsOnly\);

### <a id="THorizontalAlign"></a>THorizontalAlign

   THorizontalAlign = \(  
       eHorizontalCentreAlign, // eVerticalCentreAlign  
       eLeftAlign,             // eTopAlign  
       eRightAlign             // eBottomAlign  
        \);

### <a id="THitTestResult"></a>THitTestResult

THitTestResult   = \(eHitTest\_Fail,  
                    eHitTest\_NoAction,  
                    eHitTest\_Move,  
                    eHitTest\_InPlaceEdit,  
                    eHitTest\_CopyPaste,  
                    eHitTest\_Resize\_Any,  
                    eHitTest\_Resize\_EndAngle,  
                    eHitTest\_Resize\_StartAngle,  
                    eHitTest\_Resize\_SecondaryRadius,  
                    eHitTest\_Resize\_Radius,  
                    eHitTest\_Resize\_CornerTopLeft,  
                    eHitTest\_Resize\_CornerTopRight,  
                    eHitTest\_Resize\_CornerBottomRight,  
                    eHitTest\_Resize\_CornerBottomLeft,  
                    eHitTest\_Resize\_SideLeft,  
                    eHitTest\_Resize\_SideRight,  
                    eHitTest\_Resize\_SideTop  ,  
                    eHitTest\_Resize\_SideBottom,  
                    eHitTest\_Resize\_Vertical,  
                    eHitTest\_Resize\_Horizontal,  
                    eHitTest\_Resize\_SE\_NW,  
                    eHitTest\_Resize\_SW\_NE\);

### <a id="THitTestMode"></a>THitTestMode

THitTestMode = \(  
       eHitTest\_AllObjects,  
       eHitTest\_OnlyAccessible  
       \);

### <a id="TEditingAction"></a>TEditingAction

TEditingAction = \(eEditAction\_DontCare, eEditAction\_Move, eEditAction\_Change,eEditAction\_Delete,eEditAction\_Select\);

### <a id="TFontName"></a>TFontName

TFontName = String\[lf\_FaceSize \+ 1\];

### <a id="TFontID"></a>TFontID

TFontID = Integer;

### <a id="TFileName"></a>TFileName

TFileName = TString;

### <a id="TGridPreset"></a>TGridPreset

TGridPreset = \(eDXPPreset, eCoarse2, eCoarse3, eFine2, eFine3, eElectrical\);

### <a id="TIterationDepth"></a>TIterationDepth

TIterationDepth     = \(eIterateFirstLevel, eIterateFilteredLevels, eIterateAllLevels\);

### <a id="TLeftRightSide"></a>TLeftRightSide

TLeftRightSide = \(  
    eLeftSide,  
    eRightSide,  
    eTopSide,  
    eBottomSide  
     \);

### <a id="TLibraryAutoZoom"></a>TLibraryAutoZoom

TLibraryAutoZoom = \(lazNoZoomChange, lazRememberLast, lazCenter\);

### <a id="TLibraryScope"></a>TLibraryScope

TLibraryScope = \(lsCurrentComponnet, lsAllComponents\);

### <a id="TLinePlaceMode"></a>TLinePlaceMode

TLinePlaceMode  = \(eLineAnyAngle,  
                   eLine90Start,  
                   eLine90End,  
                   eLine45Start,  
                   eLine45End,  
                   eLineArcStart,  
                   eLineArcEnd,  
                   eAutoWire \);

### <a id="TLineShape"></a>TLineShape

   TLineShape = \(  
       eLineShapeNone,  
       eLineShapeArrow,  
       eLineShapeSolidArrow,  
       eLineShapeTail,  
       eLineShapeSolidTail,  
       eLineShapeCircle,  
       eLineShapeSquare  
   \);

### <a id="TLineStyle"></a>TLineStyle

   TLineStyle = \(  
       eLineStyleSolid,  
       eLineStyleDashed,  
       eLineStyleDotted  
        \);

### <a id="TLocation"></a>TLocation

__Type__  
TLocation = TPoint;  
__Description__  
The TLocation type is used to define a point in X,Y coordinates for a design object\.  
Where the TPoint = packed record  X: Longint;  Y: Longint;end;  
__See also__  
ISch\_GraphicalObject interface  
ISch\_Line  
ISch\_Rectangle  
ISch\_HarnessConnector  
ISch\_Polygon  
IConnection  
IConnectionArray

### <a id="TMyRect"></a>TMyRect

TMyRect = Record  
    Left,Right,Top, Bottom, Width, Height : Integer;  
End;

### <a id="TOrcadFootprint"></a>TOrcadFootprint

TOrcadFootPrint = \(  
    ePartfield1,  
    ePartfield2,  
    ePartfield3,  
    ePartfield4,  
    ePartfield5,  
    ePartfield6,  
    ePartfield7,  
    ePartfield8,  
    eIgnore\);

### <a id="TObjectAttribute"></a>TObjectAttribute

TObjectAttribute = \(eObjectAttribute\_ObjectId,  
                    eObjectAttribute\_DocumentName,  
                    eObjectAttribute\_Color,  
                    eObjectAttribute\_TextColor,  
                    eObjectAttribute\_AreaColor,  
                    eObjectAttribute\_LocationX,  
                    eObjectAttribute\_LocationY,  
                    eObjectAttribute\_CornerLocationX,  
                    eObjectAttribute\_CornerLocationY,  
                    eObjectAttribute\_OwnerPartId,  
                    eObjectAttribute\_OwnerPartDisplayMode,  
                    eObjectAttribute\_Width,  
                    eObjectAttribute\_Radius,  
                    eObjectAttribute\_Solid,  
                    eObjectAttribute\_Transparent,  
                    eObjectAttribute\_StartAngle,  
                    eObjectAttribute\_EndAngle,  
                    eObjectAttribute\_SecondaryRadius,  
                    eObjectAttribute\_StringText,  
                    eObjectAttribute\_LongStringText,  
                    eObjectAttribute\_LineStyle,  
                    eObjectAttribute\_StartLineShape,  
                    eObjectAttribute\_EndLineShape,  
                    eObjectAttribute\_LineShapeSize,  
                    eObjectAttribute\_IsHidden,  
                    eObjectAttribute\_FontId,  
                    eObjectAttribute\_Orientation,  
                    eObjectAttribute\_HorizontalJustification,  
                    eObjectAttribute\_VerticalJustification,  
                    eObjectAttribute\_TextHorizontalAnchor,  
                    eObjectAttribute\_TextVerticalAnchor,  
                    eObjectAttribute\_Alignment,  
                    eObjectAttribute\_BorderWidth,  
                    eObjectAttribute\_LineWidth,  
                    eObjectAttribute\_JunctionSize,  
                    eObjectAttribute\_Locked,  
                    eObjectAttribute\_Accessible,  
                    eObjectAttribute\_Name,  
                    eObjectAttribute\_OwnerName,  
                    eObjectAttribute\_Description,  
                    eObjectAttribute\_ShowName,  
                    eObjectAttribute\_IsMirrored,  
                    eObjectAttribute\_DesignatorLocked,  
                    eObjectAttribute\_PartIdLocked,  
                    eObjectAttribute\_PinsMoveable,  
                    eObjectAttribute\_FileName,  
                    eObjectAttribute\_TargetFileName,  
                    eObjectAttribute\_ImageKeepAspect,  
                    eObjectAttribute\_ImageEmbed,  
                    eObjectAttribute\_ParametersList,  
                    eObjectAttribute\_ParameterValue,  
                    eObjectAttribute\_ParameterName,  
                    eObjectAttribute\_ParameterType,  
                    eObjectAttribute\_ParameterReadOnlyState,  
                    eObjectAttribute\_ParameterAllowLibrarySynchronize,  
                    eObjectAttribute\_ParameterAllowDatabaseSynchronize,  
                    eObjectAttribute\_TextAutoposition,  
                    eObjectAttribute\_PinWidth,  
                    eObjectAttribute\_PinFormalType,  
                    eObjectAttribute\_PinDefaultValue,  
                    eObjectAttribute\_PinDesignator,  
                    eObjectAttribute\_PinHiddenNetName,  
                    eObjectAttribute\_PinShowDesignator,  
                    eObjectAttribute\_PinElectrical,  
                    eObjectAttribute\_PinLength,  
                    eObjectAttribute\_PinIeeeSymbolInner,  
                    eObjectAttribute\_PinIeeeSymbolOuter,  
                    eObjectAttribute\_PinIeeeSymbolInnerEdge,  
                    eObjectAttribute\_PinIeeeSymbolOuterEdge,  
                    eObjectAttribute\_PinSwapId\_Pin,  
                    eObjectAttribute\_PinSwapId\_Part,  
                    eObjectAttribute\_PinSwapId\_PartPin,  
                    eObjectAttribute\_PortArrowStyle,  
                    eObjectAttribute\_PortIOType,  
                    eObjectAttribute\_PowerObjectStyle,  
                    eObjectAttribute\_PowerObjectShowNetName,  
                    eObjectAttribute\_CrossSheetConnectorStyle,  
                    eObjectAttribute\_RoundRectangleCornerRadiusX,  
                    eObjectAttribute\_RoundRectangleCornerRadiusY,  
                    eObjectAttribute\_SchComponentLibraryName,  
                    eObjectAttribute\_SchComponentLibReference,  
                    eObjectAttribute\_SchComponentDesignator,  
                    eObjectAttribute\_SchComponentDisplayMode,  
                    eObjectAttribute\_SchComponentPartId,  
                    eObjectAttribute\_SchComponentComment,  
                    eObjectAttribute\_SchComponentFootprint,  
                    eObjectAttribute\_SchComponentKind,  
                    eObjectAttribute\_ShowHiddenFields,  
                    eObjectAttribute\_ShowHiddenPins,  
                    eObjectAttribute\_ShowDesignator,  
                    eObjectAttribute\_SheetFileName,  
                    eObjectAttribute\_SheetName,  
                    eObjectAttribute\_SheetEntrySide,  
                    eObjectAttribute\_SheetEntryDistanceFromTop,  
                    eObjectAttribute\_IeeeSymbol,  
                    eObjectAttribute\_SymbolScaleFactor,  
                    eObjectAttribute\_TaskHolderProcess,  
                    eObjectAttribute\_TaskHolderInstanceName,  
                    eObjectAttribute\_TaskHolderConfiguration,  
                    eObjectAttribute\_TextFrameWordWrap,  
                    eObjectAttribute\_TextFrameShowBorder,  
                    eObjectAttribute\_TextFrameClipToRect,  
                    eObjectAttribute\_Author,  
                    eObjectAttribute\_Collapsed,  
                    eObjectAttribute\_ErrorKind,  
                    eObjectAttribute\_SelectedVertex\_X,  
                    eObjectAttribute\_SelectedVertex\_Y,  
                    eObjectAttribute\_SelectedVertex2\_X,  
                    eObjectAttribute\_SelectedVertex2\_Y,  
                    eObjectAttribute\_UnionIndex,  
                    eObjectAttribute\_DatabaseTableName,  
                    eObjectAttribute\_SchComponentUseLibraryName,  
                    eObjectAttribute\_SchComponentUseDBTableName,  
                    eObjectAttribute\_DesignItemID,  
                    eObjectAttribute\_OpenBusComponentKind,  
                    eobjectAttribute\_PrimaryConnectionPosition,  
                    eObjectAttribute\_HarnessConnectorSide,  
                    eObjectAttribute\_HarnessType,  
                    eObjectAttribute\_HideHarnessConnectorType,  
                    eObjectAttribute\_BusTextStyle,  
                    eObjectAttribute\_ArrowKind,  
                    eObjectAttribute\_OpenBusPortType,  
                    eObjectAttribute\_OpenBusPortLink,  
                    eObjectAttribute\_OpenBusLinkMasterPort,  
                    eObjectAttribute\_OpenBusLinkSlavePort  
                    \);

### <a id="TObjectCreationMode"></a>TObjectCreationMode

TObjectCreationMode = \(eCreate\_Default, eCreate\_GlobalCopy\);

### <a id="TObjectId"></a>TObjectId

TObjectId     = \(eFirstObjectID,  
                 eClipBoardContainer,  
                 eNote,  
                 eProbe,  
                 eRectangle,  
                 eLine,  
                 eConnectionLine,  
                 eBusEntry,  
                 eArc,  
                 eEllipticalArc,  
                 eRoundRectangle,  
                 eImage,  
                 ePie,  
                 eTextFrame,  
                 eEllipse,  
                 eJunction,  
                 ePolygon,  
                 ePolyline,  
                 eWire,  
                 eBus,  
                 eBezier,  
                 eLabel,  
                 eNetLabel,  
                 eDesignator,  
                 eSchComponent,  
                 eParameter,  
                 eParameterSet,  
                 eParameterList,  
                 eSheetName,  
                 eSheetFileName,  
                 eSheet,  
                 eSchLib,  
                 eSymbol,  
                 eNoERC,  
                 eErrorMarker,  
                 ePin,  
                 ePort,  
                 ePowerObject,  
                 eSheetEntry,  
                 eSheetSymbol,  
                 eTemplate,  
                 eTaskHolder,  
                 eMapDefiner,  
                 eImplementationMap,  
                 eImplementation,  
                 eImplementationsList,  
                 eCrossSheetConnector,  
                 eCompileMask,  
                 eOpenBusComponent,  
                 eOpenBusLink,  
                 eOpenBusDesignator,  
                 eHarnessConnector,  
                 eHarnessEntry,  
                 eHarnessConnectorType,  
                 eSignalHarness,  
                 eOpenBusPort,  
                 eLastObjectId  
                \);

### <a id="TObjectSet"></a>TObjectSet

TObjectSet = Set Of TObjectID;

### <a id="TOpenBusPortType"></a>TOpenBusPortType

TOpenBusPortType      = \(obptUnspecified, obptMaster, obptSlave\);

### <a id="TOpenBusComponentKind"></a>TOpenBusComponentKind

TOpenBusComponentKind = \(obckProcessor, obckArbiter, obckInterconnect, obckPeripheral, obckMemory, obckConnector, obckTerminator\);

### <a id="TOpenBusPortKind"></a>TOpenBusPortKind

TOpenBusPortKind      = \(obpkPeripheralMaster, obpkPeripheralSlave,  
                             obpkArbiterMaster   , obpkArbiterSlave,  
                             obpkInterconMaster  , obpkInterconSlave,  
                             obpkConnectorMaster , obpkConnectorSlave\)

### <a id="TOpenBusInternalPinType"></a>TOpenBusInternalPinType

TOpenBusInternalPinType = \(iptInterrupt, iptReset, iptClock\);

### <a id="TParameter_ReadOnlyState"></a>TParameter\_ReadOnlyState

TParameter\_ReadOnlyState = \(  
       eReadOnly\_None,  
       eReadOnly\_Name,  
       eReadOnly\_Value,  
       eReadOnly\_NameAndValue  
       \);

### <a id="TParameterType"></a>TParameterType

TParameterType = \(eParameterType\_String,  
                  eParameterType\_Boolean,  
                  eParameterType\_Integer,  
                  eParameterType\_Float\);

### <a id="TPinElectrical"></a>TPinElectrical

TPinElectrical = \(  
       eElectricInput,  
       eElectricIO,  
       eElectricOutput,  
       eElectricOpenCollector,  
       eElectricPassive,  
       eElectricHiZ,  
       eElectricOpenEmitter,  
       eElectricPower\);

### <a id="TPlacementMode"></a>TPlacementMode

TPlacementMode   = \(ePlacementMode\_Single, ePlacementMode\_Multiple\);

### <a id="TPolylineCutterMode"></a>TPolylineCutterMode

TPolylineCutterMode    = \(eCutterSnapToSegment, eCutterGridSize, eCutterFixedLength\);

### <a id="TPortArrowStyle"></a>TPortArrowStyle

TPortArrowStyle = \(  
       ePortNone,  
       ePortLeft,  
       ePortRight,  
       ePortLeftRight,  
       ePortNoneVertical,  
       ePortTop,  
       ePortBottom,  
       ePortTopBottom  
        \);

### <a id="TPortConnectedEnd"></a>TPortConnectedEnd

TPortConnectedEnd = \(  
    ePortConnectedEnd\_None,  
    ePortConnectedEnd\_Origin,    //connected at port Location  
    ePortConnectedEnd\_Extremity, //connected at the other end  
    ePortConnectedEnd\_Both       //connected at both ends  
     \);

### <a id="TPortIO"></a>TPortIO

TPortIO = \(  
    ePortUnspecified,  
    ePortOutput,  
    ePortInput,  
    ePortBidirectional  
     \);

### <a id="TPowerObjectStyle"></a>TPowerObjectStyle

TPowerObjectStyle = \(  
       ePowerCircle,  
       ePowerArrow,  
       ePowerBar,  
       ePowerWave,  
       ePowerGndPower,  
       ePowerGndSignal,  
       ePowerGndEarth  
        \);

### <a id="TProbeMethod"></a>TProbeMethod

TProbeMethod = \(  
    eProbeMethodAllNets,  
    eProbeMethodProbedNetsOnly  
     \);

### <a id="TRotationBy90"></a>TRotationBy90

TRotationBy90 =   
    eRotate0,  
    eRotate90,  
    eRotate180,  
    eRotate270  
     \);

### <a id="TPrintKind"></a>TPrintKind

TPrintKind = \(ePrintKind\_FullColor,ePrintKind\_GrayScale,ePrintKind\_Monochrome\);

### <a id="TPlacementResult"></a>TPlacementResult

TPlacementResult = \(eSingleObjectPlacementProcessAborted,eWholeObjectPlacementAborted, eObjectPlacementSuccessfull\);

### <a id="TReal"></a>TReal

TReal = Double;

### <a id="TRectangleStyle"></a>TRectangleStyle

TRectangleStyle = \(  
    eRectangleHollow,  
    eRectangleSolid  
     \);

### <a id="TSchDropAction"></a>TSchDropAction

TSchDropAction = \(eDropAction\_None,  
                  eDropAction\_AskOpenOrInsertText,  
                  eDropAction\_WarnBinaryAsText,  
                  eDropAction\_OpenInEditor,  
                  eDropAction\_OpenAsText,  
                  eDropAction\_Insert\);

### <a id="TSelectionState"></a>TSelectionState

TSelectionState  = \(eSelectionState\_None,  
                    eSelectionState\_FirstSelected,  
                    eSelectionState\_MultiSelected,  
                    eSelectionState\_VerticesSelected\);

### <a id="TSelectionMatch"></a>TSelectionMatch

TypeTSelectionMatch = \(  
    eMatchSelected,  
    eMatchedNotSelected,  
    eMatchAnySelection  
     \);

### <a id="TSheetDocumentBorderStyle"></a>TSheetDocumentBorderStyle

TSheetDocumentBorderStyle = \(  
    eSheetStandard,  
    eSheetAnsi  
     \);

### <a id="TSheetOrientation"></a>TSheetOrientation

TSheetOrientation = \(eLandscape, ePortrait\);

### <a id="TSheetStyle"></a>TSheetStyle

TSheetStyle = \(  
    eSheetA4,  
    eSheetA3,  
    eSheetA2,  
    eSheetA1,  
    eSheetA0,  
    eSheetA,  
    eSheetB,  
    eSheetC,  
    eSheetD,  
    eSheetE,  
    eSheetLetter,  
    eSheetLegal,  
    eSheetTabloid,  
    eSheetOrcadA,  
    eSheetOrcadB,  
    eSheetOrcadC,  
    eSheetOrcadD,  
    eSheetOrcadE  
     \);

### <a id="TShowCutterMarkersMode"></a>TShowCutterMarkersMode

TShowCutterMarkersMode = \(eMarkersNever, eMarkersAlways, eMarkersOnPolyline\);

### <a id="TShowCutterBoxMode"></a>TShowCutterBoxMode

TShowCutterBoxMode     = \(eBoxNever, eBoxAlways, eBoxOnPolyline\);

### <a id="TSide"></a>TSide

TSide = \(  
    eLeft,  
    eBottom,  
    eRight,  
    eTop  
     \);

### <a id="TSize"></a>TSize

TSize = \(  
    eZeroSize,  
    eSmall,  
    eMedium,  
    eLarge  
     \);

### <a id="TSignalLayer"></a>TSignalLayer

TSignalLayer = \(  
    eNoSignalLayer,  
    eTopSignalLayer,  
    eMidSignalLayer1,  
    eMidSignalLayer2,  
    eMidSignalLayer3,  
    eMidSignalLayer4,  
    eMidSignalLayer5,  
    eMidSignalLayer6,  
    eMidSignalLayer7,  
    eMidSignalLayer8,  
    eMidSignalLayer9,  
    eMidSignalLayer10,  
    eMidSignalLayer11,  
    eMidSignalLayer12,  
    eMidSignalLayer13,  
    eMidSignalLayer14,  
    eBottomSignalLayer,  
    eMultiSignalLayer,  
    ePowerLayer1,  
    ePowerLayer2,  
    ePowerLayer3,  
    ePowerLayer4  
     \);

### <a id="TStdLogicState"></a>TStdLogicState

TStdLogicState = \(eStdLogic\_Unitialized,  
                  eStdLogic\_ForcingUnknown,  
                  eStdLogic\_Forcing0,  
                  eStdLogic\_Forcing1,  
                  eStdLogic\_HiZ,  
                  eStdLogic\_WeakUnknown,  
                  eStdLogic\_Weak0,  
                  eStdLogic\_Weak1,  
                  eStdLogic\_DontCare\);

### <a id="TStringIncrementStyle"></a>TStringIncrementStyle

TStringIncrementStyle = \(eSIS\_None, eSIS\_HorizontalFirst, eSIS\_VerticalFirst\);

### <a id="TTextHorzAnchor"></a>TTextHorzAnchor

TTextHorzAnchor = \(  
       eTextHorzAnchor\_None,  
       eTextHorzAnchor\_Both,  
       eTextHorzAnchor\_Left,  
       eTextHorzAnchor\_Right  
       \);

### <a id="TTextJustification"></a>TTextJustification

TTextJustification = \(  
    eJustify\_BottomLeft,  
    eJustify\_BottomCenter,  
    eJustify\_BottomRight,  
    eJustify\_CenterLeft,  
    eJustify\_Center,  
    eJustify\_CenterRight,  
    eJustify\_TopLeft,  
    eJustify\_TopCenter,  
    eJustify\_TopRight  
    \);

### <a id="TTextVertAnchor"></a>TTextVertAnchor

TTextVertAnchor = \(  
       eTextVertAnchor\_None,  
       eTextVertAnchor\_Both,  
       eTextVertAnchor\_Top,  
       eTextVertAnchor\_Bottom  
       \);

### <a id="TUpperLowerCase"></a>TUpperLowerCase

TUpperLowerCase = \(eUpperCase, eLowerCase, eAnyCase\);

### <a id="TUnit"></a>TUnit

TUnit = \(eMil, eMM, eIN, eCM, eDXP, eM, eAutoImperial, eAutoMetric\);

### <a id="TUnitSet"></a>TUnitSet

TUnitSet = Set Of TUnit;

### <a id="TUnitSystem"></a>TUnitSystem

TUnitSystem = \(eImperial, eMetric\);

### <a id="TVerticalAlign"></a>TVerticalAlign

TVerticalAlign = \(  
    eVerticalCentreAlign,  
    eTopAlign,  
    eBottomAlign  
     \);

### <a id="TVisibleGrid"></a>TVisibleGrid

TVisibleGrid = \(  
    eDotGrid,  
    eLineGrid  
     \);

### <a id="TVHOrientation"></a>TVHOrientation

THVOrientation = \(  
    eHorizontal,  
    eVertical  
     \);

### <a id="TWidthArray"></a>TWidthArray

TWidthArray = Array \[TSize\] of Integer;

# Schematic API Functions

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Schematic API Functions for version 22](https://www.altium.com/documentation/altium-designer/schematic-api-functions)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Schematic API](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## Schematic API: Functions Reference 

The Schematic API Functions reference includes the following content:

[SchServer Interface](https://www.altium.com/documentation/altium-designer/schematic-api-functions?version=21#SchServer Interface)  
[General functions](https://www.altium.com/documentation/altium-designer/schematic-api-functions?version=21#General functions)  
[Measurement Conversion functions](https://www.altium.com/documentation/altium-designer/schematic-api-functions?version=21#Measurement Conversion functions)  
[Conversion functions](https://www.altium.com/documentation/altium-designer/schematic-api-functions?version=21#Conversion functions)

### <a id="SchServer_Interface"></a>SchServer Interface

Function SchServer : ISch\_ServerInterface;

__Description__  
The SchServer function returns the interface of the loaded Schematic Editor module in Altium Designer\. To work with Schematic objects, you need to have access to the ISch\_ServerInterface interface first\. To obtain the current schematic document, invoke the SchServer\.GetCurrentSchDocument for instance\.

Refer to the ISch\_ServerInterface’s methods and properties for more information\.

__Example 1__

1

    // Grab current schematic document\.

2

    SchDoc := SchServer\.GetCurrentSchDocument;

3

    If SchDoc = Nil Then Exit;

4

  

5

    // Component is a container that has child objects

6

    // Create component, and its rectangle, pin and parameter objects\.

7

    Component := SchServer\.SchObjectFactory \(eSchComponent, eCreate\_Default\);

__Example 2__

01

   Try

02

       SchServer\.ProcessControl\.PreProcess\(SchDoc, ''\);

03

  

04

       // Add the parameter to the pin with undo stack also enabled

05

       Param\.Name := 'Added Parameter';

06

       Param\.Text := 'Param added to the pin\. Press Undo and this will disappear\.  Press undo twice to remove the component';

07

       Param\.Location := Point\(InchesToCoord\(3\), InchesToCoord\(2\.4\)\);

08

  

09

       Pin\.AddSchObject\(Param\);

10

       SchServer\.RobotManager\.SendMessage\(Component\.I\_ObjectAddress, c\_BroadCast, SCHM\_PrimitiveRegistration, Param\.I\_ObjectAddress\);

11

   Finally

12

       SchServer\.ProcessControl\.PostProcess\(SchDoc, ''\);

13

   End;

__See also__  
ISch\_ServerInterface interface

### <a id="General_functions"></a>General functions