# Schematic API Types

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Schematic API Types for version 22](https://www.altium.com/documentation/altium-designer/schematic-api-types)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Schematic API](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


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

 


TAngle = TReal;


TAutoPanStyle = \(  
    eAutoPanOff,  
    eAutoPanFixedJump,  
    eAutoPanReCenter  
     \);


TCrossSheetConnectorStyle = \(  
        eCrossSheetLeft,  
        eCrossSheetRight  
    \);


TCoordRect                   = Record  
        Case Integer of  
           0 :\(left, bottom, right, top : TCoord\);  
           1 :\(x1,   y1,     x2,    y2  : TCoord\);  
           2 :\(Location1,    Location2  : TLocation\);  
End;


TCoord = Integer;


TConnectivityScope = \(eConnectivity\_ConnectionOnly, eConnectivity\_WholeNet\);


TConnectionNodeType = \(eConnectionNode\_IntraSheetLink, eConnectionNode\_InterSheetLink, eConnectionNode\_Hidden\);


TComponentDisplay = \(  
    eCompBlock,  
    eCompDevice,  
    eCompPower,  
    eCompSymbol  
     \);


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


TChosenDocumentScope = \(eScope\_None, eScope\_SingleDocument, eScope\_ProjectDocuments, eScope\_OpenDocuments\);


TCursorMove = \(  
    eCursorLeft,  
    eCursorRight,  
    eCursorTop,  
    eCursorBottom\);


TCursorShape = \(  
       eLargeCursor90,  
       eSmallCursor90,  
       eSmallCursor45,  
       eTinyCursor45\);


TDistance = Integer;


TDrawMode = \(  
    eDrawFull,  
    eDrawDraft,  
    eDrawHidden\);


TDrawQuality = \(eFullQuality,eDraftQuality\);


TDynamicString = AnsiString;


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


TFindReplaceIdentifierScope = \(  
       eFindReplace\_AllIdentifiers,  
       eFindReplace\_NetIdentifiersOnly,  
       eFindReplace\_DesignatorsOnly\);


   THorizontalAlign = \(  
       eHorizontalCentreAlign, // eVerticalCentreAlign  
       eLeftAlign,             // eTopAlign  
       eRightAlign             // eBottomAlign  
        \);


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


THitTestMode = \(  
       eHitTest\_AllObjects,  
       eHitTest\_OnlyAccessible  
       \);


TEditingAction = \(eEditAction\_DontCare, eEditAction\_Move, eEditAction\_Change,eEditAction\_Delete,eEditAction\_Select\);


TFontName = String\[lf\_FaceSize \+ 1\];


TFontID = Integer;


TFileName = TString;


TGridPreset = \(eDXPPreset, eCoarse2, eCoarse3, eFine2, eFine3, eElectrical\);


TIterationDepth     = \(eIterateFirstLevel, eIterateFilteredLevels, eIterateAllLevels\);


TLeftRightSide = \(  
    eLeftSide,  
    eRightSide,  
    eTopSide,  
    eBottomSide  
     \);


TLibraryAutoZoom = \(lazNoZoomChange, lazRememberLast, lazCenter\);


TLibraryScope = \(lsCurrentComponnet, lsAllComponents\);


TLinePlaceMode  = \(eLineAnyAngle,  
                   eLine90Start,  
                   eLine90End,  
                   eLine45Start,  
                   eLine45End,  
                   eLineArcStart,  
                   eLineArcEnd,  
                   eAutoWire \);


   TLineShape = \(  
       eLineShapeNone,  
       eLineShapeArrow,  
       eLineShapeSolidArrow,  
       eLineShapeTail,  
       eLineShapeSolidTail,  
       eLineShapeCircle,  
       eLineShapeSquare  
   \);


   TLineStyle = \(  
       eLineStyleSolid,  
       eLineStyleDashed,  
       eLineStyleDotted  
        \);


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


TMyRect = Record  
    Left,Right,Top, Bottom, Width, Height : Integer;  
End;


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


TObjectCreationMode = \(eCreate\_Default, eCreate\_GlobalCopy\);


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


TObjectSet = Set Of TObjectID;


TOpenBusPortType      = \(obptUnspecified, obptMaster, obptSlave\);


TOpenBusComponentKind = \(obckProcessor, obckArbiter, obckInterconnect, obckPeripheral, obckMemory, obckConnector, obckTerminator\);


TOpenBusPortKind      = \(obpkPeripheralMaster, obpkPeripheralSlave,  
                             obpkArbiterMaster   , obpkArbiterSlave,  
                             obpkInterconMaster  , obpkInterconSlave,  
                             obpkConnectorMaster , obpkConnectorSlave\)


TOpenBusInternalPinType = \(iptInterrupt, iptReset, iptClock\);


TParameter\_ReadOnlyState = \(  
       eReadOnly\_None,  
       eReadOnly\_Name,  
       eReadOnly\_Value,  
       eReadOnly\_NameAndValue  
       \);


TParameterType = \(eParameterType\_String,  
                  eParameterType\_Boolean,  
                  eParameterType\_Integer,  
                  eParameterType\_Float\);


TPinElectrical = \(  
       eElectricInput,  
       eElectricIO,  
       eElectricOutput,  
       eElectricOpenCollector,  
       eElectricPassive,  
       eElectricHiZ,  
       eElectricOpenEmitter,  
       eElectricPower\);


TPlacementMode   = \(ePlacementMode\_Single, ePlacementMode\_Multiple\);


TPolylineCutterMode    = \(eCutterSnapToSegment, eCutterGridSize, eCutterFixedLength\);


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


TPortConnectedEnd = \(  
    ePortConnectedEnd\_None,  
    ePortConnectedEnd\_Origin,    //connected at port Location  
    ePortConnectedEnd\_Extremity, //connected at the other end  
    ePortConnectedEnd\_Both       //connected at both ends  
     \);


TPortIO = \(  
    ePortUnspecified,  
    ePortOutput,  
    ePortInput,  
    ePortBidirectional  
     \);


TPowerObjectStyle = \(  
       ePowerCircle,  
       ePowerArrow,  
       ePowerBar,  
       ePowerWave,  
       ePowerGndPower,  
       ePowerGndSignal,  
       ePowerGndEarth  
        \);


TProbeMethod = \(  
    eProbeMethodAllNets,  
    eProbeMethodProbedNetsOnly  
     \);


TRotationBy90 =   
    eRotate0,  
    eRotate90,  
    eRotate180,  
    eRotate270  
     \);


TPrintKind = \(ePrintKind\_FullColor,ePrintKind\_GrayScale,ePrintKind\_Monochrome\);


TPlacementResult = \(eSingleObjectPlacementProcessAborted,eWholeObjectPlacementAborted, eObjectPlacementSuccessfull\);


TReal = Double;


TRectangleStyle = \(  
    eRectangleHollow,  
    eRectangleSolid  
     \);


TSchDropAction = \(eDropAction\_None,  
                  eDropAction\_AskOpenOrInsertText,  
                  eDropAction\_WarnBinaryAsText,  
                  eDropAction\_OpenInEditor,  
                  eDropAction\_OpenAsText,  
                  eDropAction\_Insert\);


TSelectionState  = \(eSelectionState\_None,  
                    eSelectionState\_FirstSelected,  
                    eSelectionState\_MultiSelected,  
                    eSelectionState\_VerticesSelected\);


TypeTSelectionMatch = \(  
    eMatchSelected,  
    eMatchedNotSelected,  
    eMatchAnySelection  
     \);


TSheetDocumentBorderStyle = \(  
    eSheetStandard,  
    eSheetAnsi  
     \);


TSheetOrientation = \(eLandscape, ePortrait\);


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


TShowCutterMarkersMode = \(eMarkersNever, eMarkersAlways, eMarkersOnPolyline\);


TShowCutterBoxMode     = \(eBoxNever, eBoxAlways, eBoxOnPolyline\);


TSide = \(  
    eLeft,  
    eBottom,  
    eRight,  
    eTop  
     \);


TSize = \(  
    eZeroSize,  
    eSmall,  
    eMedium,  
    eLarge  
     \);


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


TStdLogicState = \(eStdLogic\_Unitialized,  
                  eStdLogic\_ForcingUnknown,  
                  eStdLogic\_Forcing0,  
                  eStdLogic\_Forcing1,  
                  eStdLogic\_HiZ,  
                  eStdLogic\_WeakUnknown,  
                  eStdLogic\_Weak0,  
                  eStdLogic\_Weak1,  
                  eStdLogic\_DontCare\);


TStringIncrementStyle = \(eSIS\_None, eSIS\_HorizontalFirst, eSIS\_VerticalFirst\);


TTextHorzAnchor = \(  
       eTextHorzAnchor\_None,  
       eTextHorzAnchor\_Both,  
       eTextHorzAnchor\_Left,  
       eTextHorzAnchor\_Right  
       \);


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


TTextVertAnchor = \(  
       eTextVertAnchor\_None,  
       eTextVertAnchor\_Both,  
       eTextVertAnchor\_Top,  
       eTextVertAnchor\_Bottom  
       \);


TUpperLowerCase = \(eUpperCase, eLowerCase, eAnyCase\);


TUnit = \(eMil, eMM, eIN, eCM, eDXP, eM, eAutoImperial, eAutoMetric\);


TUnitSet = Set Of TUnit;


TUnitSystem = \(eImperial, eMetric\);


TVerticalAlign = \(  
    eVerticalCentreAlign,  
    eTopAlign,  
    eBottomAlign  
     \);


TVisibleGrid = \(  
    eDotGrid,  
    eLineGrid  
     \);


THVOrientation = \(  
    eHorizontal,  
    eVertical  
     \);


TWidthArray = Array \[TSize\] of Integer;

## 子章节

- [Schematic API: Enumerated Types Reference](01-Schematic_API_Enumerated_Types_Reference.md/README.md)
