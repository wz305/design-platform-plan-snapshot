### <a id="Other_Constants"></a>Other Constants

#### cMaxShortStringLength

cMaxShortStringLength = 254;

#### cOldSheetEntryGrid

cOldSheetEntryGrid = 10;

#### cOldMaxPolygonVertices

cOldMaxPolygonVertices = 50;  
cCharacterApproximativeWidth  = 8  \* cBaseUnit;  
cCharacterApproximativeHeight = 10 \* cBaseUnit;  
cCharacterWidthTolerance      = 4  \* cBaseUnit;  
cConnectionDrawingThreshold   = 3;  
   
cPinBoundingRectInflate = 2  \*cBaseUnit;  
cMinWireUnderlineWidth  = 5  \*cBaseUnit;  
cMinBusUnderlineWidth   = 7  \*cBaseUnit;  
cCompilationMaskedPopupString = 'Removed by Compilation Mask';

#### LibPrimitiveSet

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

#### cBooleanEditorAttributes

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

#### cStringEditorAttributes

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

#### cComboBoxEditorAttributes

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

#### cColorEditorAttributes

cColorEditorAttributes =  
    \[eObjectAttribute\_Color,  
     eObjectAttribute\_TextColor,  
     eObjectAttribute\_AreaColor\];

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