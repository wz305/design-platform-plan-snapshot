# PCB API Types

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [PCB API Types for version 22](https://www.altium.com/documentation/altium-designer/pcb-api-types)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- PCB API](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


The PCB API Enumerated Types reference includes the following content:

[TAdvPCBFileFormatVersion](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TAdvPCBFileFormatVersion)  
[TAngle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TAngle)  
[TApertureUse](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TApertureUse)  
[TAutoPanMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TAutoPanMode)  
[TAutoPanUnit](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TAutoPanUnit)  
[TBaud](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TBaud)  
[TBGAFanoutDirection](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TBGAFanoutDirection)  
[TBGAFanoutViaMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TBGAFanoutViaMode)  
[TBoardSide type](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TBoardSide type)  
[TCacheState](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCacheState)  
[TChangeScope](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TChangeScope)  
[TClassMemberKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TClassMemberKind)  
[TComponentCollisionCheckMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TComponentCollisionCheckMode)  
[TComponentMoveKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TComponentMoveKind)  
[TComponentStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TComponentStyle)  
[TComponentType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TComponentType)  
[TConfinementStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TConfinementStyle)  
[TConnectionMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TConnectionMode)  
[TCoord](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCoord)  
[TCoordPoint](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCoordPoint)  
[TCoordRect](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCoordRect)  
[TCopyMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCopyMode)  
[TCornerStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCornerStyle)  
[TDaisyChainStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDaisyChainStyle)  
[TDataBits](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDataBits)  
[TDielectricType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDielectricType)  
[TDimensionArrowPosition](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDimensionArrowPosition)  
[TDimensionReference](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDimensionReference)  
[TDimensionTextPosition](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDimensionTextPosition)  
[TDimensionKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDimensionKind)  
[TDimensionUnit](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDimensionUnit)  
[TDirection](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDirection)  
[TDirectionSet](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDirectionSet)  
[TDisplay](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDisplay)  
[TDrawingOrderArray](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDrawingOrderArray)  
[TDrawMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDrawMode)  
[TDrillSymbol](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDrillSymbol)  
[TDXColorMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDXColorMode)  
[TDynamicString](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDynamicString)

[TEditingAction](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TEditingAction)  
[TEmbeddedBoardOriginMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TEmbeddedBoardOriginMode)  
[TEnabledRoutingLayers](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TEnabledRoutingLayers)  
[TExtendedDrillType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TExtendedDrillType)  
[TExtendedHoleType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TExtendedHoleType)  
[TTestpointAllowedSide](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TTestpointAllowedSide)  
[TFanoutDirection](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFanoutDirection)  
[TFanoutStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFanoutStyle)  
[TFontName](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFontName)  
[TFontID](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFontID)  
[TFullFontName](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFullFontName)  
[TFromToDisplayMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFromToDisplayMode)  
[TGraphicsCursor](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TGraphicsCursor)  
[THandshaking](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#THandshaking)  
[TInteractiveRouteMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TInteractiveRouteMode)  
[TIterationMethod](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TIterationMethod)  
[TLayer](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLayer)  
[TLayerSet](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLayerSet)  
[TLayerStackStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLayerStackStyle)  
[TLengthenerStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLengthenerStyle)  
[TLogicalDrawingMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLogicalDrawingMode)  
[TMechanicalLayerPair](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TMechanicalLayerPair)  
[TMirrorOperation](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TMirrorOperation)  
[TNetScope](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TNetScope)  
[TNetTopology](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TNetTopology)  
[TObjectCreationMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TObjectCreationMode)  
[TObjectId](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TObjectId)  
[TObjectSet](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TObjectSet)  
[TOptionsObjectId](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TOptionsObjectId)  
[TOutputDriverType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TOutputDriverType)  
[TOutputPort](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TOutputPort)  
[TPadCache](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPadCache)  
[TPadMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPadMode)  
[TParity](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TParity)  
[TPCBDragMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPCBDragMode)  
[TPCBObjectHandle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPCBObjectHandle)  
[TPCBString](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPCBString)  
[TPlaceTrackMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlaceTrackMode)  
[TPlaneConnectionStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlaneConnectionStyle)

[TPlaneConnectStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlaneConnectStyle)  
[TPlaneDrawMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlaneDrawMode)  
[TPlotLayer](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlotLayer)  
[TPlotPolygonProc](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlotPolygonProc)  
[TPlotterLanguage](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlotterLanguage)  
[TPolygonReliefAngle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolygonReliefAngle)  
[TPolygonRepourMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolygonRepourMode)  
[TPolygonType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolygonType)  
[TPolyHatchStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolyHatchStyle)  
[TPolyRegionKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolyRegionKind)  
[TPolySegmentType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolySegmentType)  
[TPrinterBatch](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPrinterBatch)  
[TPrinterComposite](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPrinterComposite)  
[TRouteLayer](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TRouteLayer)  
[TRouteVia](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TRouteVia)  
[TRoutingWidthMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TRoutingWidthMode)  
[TRuleKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TRuleKind)  
[TRuleLayerKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TRuleLayerKind)  
[TSameNamePadstackReplacementMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TSameNamePadstackReplacementMode)  
[TScopeId](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TScopeId)  
[TScopeKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TScopeKind)  
[TScopeObjectId](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TScopeObjectId)  
[TShape](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TShape)  
[TSignalLevel](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TSignalLevel)  
[TSortBy](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TSortBy)  
[TSmartRouteMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TSmartRouteMode)  
[TStimulusType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TStimulusType)  
[TStopBits](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TStopBits)  
[TString \(PCB\)](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TString (PCB))  
[TStrokeArray](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TStrokeArray)  
[TStrokeRecord](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TStrokeRecord)  
[TTestPointStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TTestPointStyle)  
[TTestpointValid](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TTestpointValid)  
[TTextAlignment](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TTextAlignment)  
[TTextAutoposition](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TTextAutoposition)  
[TUnit](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TUnit)  
[TUnitStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TUnitStyle)  
[TViewableObjectID](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TViewableObjectID)  
[TWidthArray](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TWidthArray)

The enumerated types are used for many of the PCB object interfaces methods covered in this section\.

For example the IPCB\_Board interface has a LayerIsUsed \[L : TLayer\] : Boolean property — you can use this Enumerated Types section to check the range for the TLayer type\.

__See also__  
PCB API Reference


TAdvPCBFileFormatVersion  =   
\(ePCBFileFormatNone,  
 eAdvPCBFormat\_Binary\_V3,  
 eAdvPCBFormat\_Library\_V3,  
 eAdvPCBFormat\_ASCII\_V3,  
 eAdvPCBFormat\_Binary\_V4,  
 eAdvPCBFormat\_Library\_V4,  
 eAdvPCBFormat\_ASCII\_V4,  
 eAdvPCBFormat\_Binary\_V5,  
 eAdvPCBFormat\_Library\_V5,  
 eAdvPCBFormat\_ASCII\_V5\);


Double type\.


TApertureUse = \( eNoApertureUse,  
                 eMultiUse,  
                 eDrawUse,  
                 eFlashUse\);


TAutoPanMode = \( eNoAutoPan           
                 eReCentre            
                 eFixedJump           
                 eShiftAccellerator   
                 eShiftDeccellerator  
                 eBallistic           
                 eAdaptive\);


TAutoPanUnit  = \( eAutoPanByMils     
                  eAutoPanByPixels\);


TBaud                = \( eBaud110                                   ,  
                         eBaud150                                   ,  
                         eBaud300                                   ,  
                         eBaud600                                   ,  
                         eBaud1200                                  ,  
                         eBaud2400                                  ,  
                         eBaud4800                                  ,  
                         eBaud9600                                  ,  
                         eBaud19200  
                       \);


TBGAFanoutDirection  = \( eBGAFanoutDirection\_Out                    ,  
                         eBGAFanoutDirection\_NE                     ,  
                         eBGAFanoutDirection\_SE                     ,  
                         eBGAFanoutDirection\_SW                     ,  
                         eBGAFanoutDirection\_NW                     ,  
                         eBGAFanoutDirection\_In  
                        \);


TBGAFanoutViaMode    = \( eBGAFanoutVia\_Closest                      ,  
                         eBGAFanoutVia\_Centered  
                       \);


TBoardSide = \( eBoardSide\_Top, eBoardSide\_Bottom\);


TCacheState = \( eCacheInvalid,  
                eCacheValid,  
                eCacheManual\);


TChangeScope         = \( eChangeNone                                ,  
                         eChangeThisItem                            ,  
                         eChangeAllPrimitives                       ,  
                         eChangeAllFreePrimitives                   ,  
                         eChangeComponentDesignators                ,  
                         eChangeComponentComments                   ,  
                         eChangeLibraryAllComponents                ,  
                         eChangeCancelled  
                       \);


TClassMemberKind = \(eClassMemberKind\_Net,  
                    eClassMemberKind\_Component,  
                    eClassMemberKind\_FromTo,  
                    eClassMemberKind\_Pad,  
                    eClassMemberKind\_Layer,  
                    eClassMemberKind\_DesignChannel,  
                    eClassMemberKind\_DifferentialPair  
\);


TComponentCollisionCheckMode  
                     = \(eQuickCheck,       
                        eMultiLayerCheck,  
                        eFullCheck,  
                        eComponentBodyCheck,  
                       \);


TComponentMoveKind   = \( eNoComponentMoveNoAction  
                         eJumpToComponent          
                         eMoveComponentToCursor  
                       \);


TComponentStyle      = \( eComponentStyle\_Unknown                    ,  
                         eComponentStyle\_Small                      ,  
                         eComponentStyle\_SmallSMT                   ,  
                         eComponentStyle\_Edge                       ,  
                         eComponentStyle\_DIP                        ,  
                         eComponentStyle\_SIP                        ,  
                         eComponentStyle\_SMSIP                      ,  
                         eComponentStyle\_SMDIP                      ,  
                         eComponentStyle\_LCC                        ,  
                         eComponentStyle\_BGA                        ,  
                         eComponentStyle\_PGA  
                       \);


TComponentType       = \( eBJT                                       ,  
                         eCapactitor                                ,  
                         eConnector                                 ,  
                         eDiode                                     ,  
                         eIC                                        ,  
                         eInductor                                  ,  
                         eResistor  
                       \);


TConfinementStyle    = \( eConfineIn,  
                         eConfineOut\);


TConnectionMode      = \( eRatsNestConnection  
                         eBrokenNetMarker  
                       \);


TCoord = Integer;


TCoordPoint = Record  
        x,  
        y : TCoord;  
End;


TCoordRect   = Record  
    Case Integer of  
       0 :\(left,bottom,right,top : TCoord\);  
       1 :\(x1,y1,x2,y2           : TCoord\);  
       2 :\(Location1,Location2   : TCoordPoint\);  
End; Note TPoint is a Borland Delphi defined type in the Types\.pas unit\.


TCopyMode = \( eFullCopy,  
              eFieldCopy\);


TCornerStyle         = \( eCornerStyle\_90,  
                         eCornerStyle\_45,  
                         eCornerStyle\_Round\);


TDaisyChainStyle     = \( eDaisyChainLoad                            ,  
                         eDaisyChainTerminator                      ,  
                         eDaisyChainSource  
                       \);


TDataBits            = \( eDataBits5                                 ,  
                         eDataBits6                                 ,  
                         eDataBits7                                 ,  
                         eDataBits8  
                       \);


TDielectricType = \(eNoDielectric,  
                   eCore,  
                   ePrePreg,  
                   eSurfaceMaterial\);


TDimensionArrowPosition = \( eInside,eOutside\);


 TDimensionReference            = Record  
     Primitive                  : IPCB\_Primitive;  
     Point                      : TCoordPoint;  
     Anchor                     : Integer;  
 End;


TDimensionTextPosition  
                     = \( eTextAuto                                  ,  
                         eTextCenter                                ,  
                         eTextTop                                   ,  
                         eTextBottom                                ,  
                         eTextRight                                 ,  
                         eTextLeft                                  ,  
                         eTextInsideRight                           ,  
                         eTextInsideLeft                            ,  
                         eTextUniDirectional                        ,  
                         eTextManual  
                       \);


    TDimensionKind       = \( eNoDimension                               ,  
                             eLinearDimension                           ,  
                             eAngularDimension                          ,  
                             eRadialDimension                           ,  
                             eLeaderDimension                           ,  
                             eDatumDimension                            ,  
                             eBaselineDimension                         ,  
                             eCenterDimension                           ,  
                             eOriginalDimension                         ,  
                             eLinearDiameterDimension                   ,  
                             eRadialDiameterDimension  
                           \);


TDimensionUnit = \( eMils,  
                   eInches,  
                   eMillimeters,  
                   eCentimeters,  
                   eDegrees,  
                   eRadians,  
                   eAutomaticUnit\);


TDirection =  \(eDir\_N ,  
               eDir\_NE,  
               eDir\_E ,  
               eDir\_SE,  
               eDir\_S ,  
               eDir\_SW,  
               eDir\_W ,  
               eDir\_NW\);


TDirectionSet = Set Of TDirection;


TDisplay             = \( eOverWrite  
                         eHide       
                         eShow       
                         eInvert     
                         eHighLight  
                       \);


Type TDrawingOrderArray = Array \[0\.\.Ord\(MaxLayer\)\] Of TLayer;


TDrawMode = \( eDrawFull,  
              eDrawDraft,  
              eDrawHidden\);


TDrillSymbol         = \( eSymbols                                   ,  
                         eNumbers                                   ,  
                         eLetters  
                       \); \{Used by gerber and Print/ Plot\}


TDXColorMode = \( eDXPrimitive\_DisplayNormal      ,           
                eDXPrimitive\_DisplayDimm        ,           
                eDXPrimitive\_DisplayHighlight   ,           
                eDXPrimitive\_DisplayTransparent ,           
                eDXPrimitive\_DisplayGrayScale   ,           
                eDXPrimitive\_DisplayMonochrome  ,           
                eDXPrimitive\_DisplayDRCError             ,  
                eDXPrimitive\_DisplayGrayScaleTransparent ,  
                eDXPrimitive\_DisplayMonochromeTRansparent,  
                eDXPrimitive\_DisplayDimmTransparent      ,  
                eDXPrimitive\_DisplayHighlightTransparent    
                \);


TDynamicString = AnsiString;


TEditingAction=\(eEditAction\_Focus,  
                eEditAction\_Move,  
                eEditAction\_Change,  
                eEditAction\_Delete,  
                eEditAction\_Select,  
                eEditAction\_NonGraphicalSelect,  
                eEditAction\_Measure,  
                eEditAction\_Dimension\);


TEmbeddedBoardOriginMode = \(eOriginMode\_BoardOrigin,  
                            eOriginMode\_BottomLeft\);


TEnabledRoutingLayers = Array \[eTopLayer\.\.eBottomLayer\] Of Boolean;


TExtendedDrillType             = \( eDrilledHole,        
                                   ePunchedHole,        
                                   eLaserDrilledHole,   
                                   ePlasmaDrilledHole   
                                 \);                   


TExtendedHoleType              = \( eRoundHole,   
                                   eSquareHole,  
                                   eSlotHole     
                                 \);            


TTestpointAllowedSide  
                     = \( eAllowTopSide                              ,  
                         eAllowBottomSide                           ,  
                         eAllowThruHoleTop                          ,  
                         eAllowThruHoleBottom  
                       \);


TFanoutDirection = \(eFanoutDirection\_None,  
                    eFanoutDirection\_InOnly,  
                    eFanoutDirection\_OutOnly,  
                    eFanoutDirection\_InThenOut,  
                    eFanoutDirection\_OutThenIn,  
                    eFanoutDirection\_Alternating\);


TFanoutStyle = \(eFanoutStyle\_Auto,  
                eFanoutStyle\_Rows,  
                eFanoutStyle\_Staggered,  
                eFanoutStyle\_BGA,  
                eFanoutStyle\_UnderPads\);


TFontName            = Array \[0\.\.LF\_FACESIZE \- 1\] Of WideChar;


TFontID = SmallInt;


TFullFontName        = Array \[0\.\.LF\_FULLFACESIZE \- 1\] Of WideChar;


TFromToDisplayMode   = \( eFromToDisplayMode\_Automatic,  
                         eFromToDisplayMode\_Hide,  
                         eFromToDisplayMode\_Show\);


TGraphicsCursor = \( eCurShapeCross90,  
                    eCurShapeBigCross,  
                    eCurShapeCross45\);


THandshaking         = \( eHandshakingNone                           ,  
                         eHandshakingXonXOff                        ,  
                         eHandshakingHardwire  
                       \);


 TInteractiveRouteMode  
                      = \( eIgnoreObstacle  
                          eAvoidObstacle   
                          ePushObstacle  
                        \);


TIterationMethod = \( eProcessAll, eProcessFree, eProcessComponent\);


TLayer = \(eNoLayer          ,  
          eTopLayer         ,  
          eMidLayer1        ,  
          eMidLayer2        ,  
          eMidLayer3        ,  
          eMidLayer4        ,  
          eMidLayer5        ,  
          eMidLayer6        ,  
          eMidLayer7        ,  
          eMidLayer8        ,  
          eMidLayer9        ,  
          eMidLayer10       ,  
          eMidLayer11       ,  
          eMidLayer12       ,  
          eMidLayer13       ,  
          eMidLayer14       ,  
          eMidLayer15       ,  
          eMidLayer16       ,  
          eMidLayer17       ,  
          eMidLayer18       ,  
          eMidLayer19       ,  
          eMidLayer20       ,  
          eMidLayer21       ,  
          eMidLayer22       ,  
          eMidLayer23       ,  
          eMidLayer24       ,  
          eMidLayer25       ,  
          eMidLayer26       ,  
          eMidLayer27       ,  
          eMidLayer28       ,  
          eMidLayer29       ,  
          eMidLayer30       ,  
          eBottomLayer      ,  
          eTopOverlay       ,  
          eBottomOverlay    ,  
          eTopPaste         ,  
          eBottomPaste      ,  
          eTopSolder        ,  
          eBottomSolder     ,  
          eInternalPlane1   ,  
          eInternalPlane2   ,  
          eInternalPlane3   ,  
          eInternalPlane4   ,  
          eInternalPlane5   ,  
          eInternalPlane6   ,  
          eInternalPlane7   ,  
          eInternalPlane8   ,  
          eInternalPlane9   ,  
          eInternalPlane10  ,  
          eInternalPlane11  ,  
          eInternalPlane12  ,  
          eInternalPlane13  ,  
          eInternalPlane14  ,  
          eInternalPlane15  ,  
          eInternalPlane16  ,  
          eDrillGuide       ,  
          eKeepOutLayer     ,  
          eMechanical1      ,  
          eMechanical2      ,  
          eMechanical3      ,  
          eMechanical4      ,  
          eMechanical5      ,  
          eMechanical6      ,  
          eMechanical7      ,  
          eMechanical8      ,  
          eMechanical9      ,  
          eMechanical10     ,  
          eMechanical11     ,  
          eMechanical12     ,  
          eMechanical13     ,  
          eMechanical14     ,  
          eMechanical15     ,  
          eMechanical16     ,  
          eDrillDrawing     ,  
          eMultiLayer       ,  
          eConnectLayer     ,  
          eBackGroundLayer  ,  
          eDRCErrorLayer    ,  
          eHighlightLayer   ,  
          eGridColor1       ,  
          eGridColor10      ,  
          ePadHoleLayer     ,  
          eViaHoleLayer  
        \);


TLayerSet = Set of TLayer;  
__See also__  
TLayer


TLayerStackStyle     = \( eLayerStack\_Pairs       ,  
                         eLayerStacks\_InsidePairs,  
                         eLayerStackBuildup\);


TLengthenerStyle = \(eLengthenerStyle\_90,  
                    eLengthenerStyle\_45,  
                    eLengthenerStyle\_Round\);


TLogicalDrawingMode  = \( eDisplaySolid                              ,  
                         eDisplayHollow                             ,  
                         eDisplaySelected                           ,  
                         eDisplayDRC                                ,  
                         eDisplayFocused                            ,  
                         eDisplayMultiFocused                       ,  
                         eDisplayHollowDashed  
                       \);


TMechanicalLayerPair = Record  
    Layer1 : TLayer;  
    Layer2 : TLayer;  
End;


TMirrorOperation = \(eHMirror,eVMirror\);


TNetScope = \(eNetScope\_DifferentNetsOnly,  
             eNetScope\_SameNetOnly,  
             eNetScope\_AnyNet\);


TNetTopology         = \( eNetTopology\_Shortest                      ,  
                         eNetTopology\_Horizontal                    ,  
                         eNetTopology\_Vertical                      ,  
                         eNetTopology\_DaisyChain\_Simple             ,  
                         eNetTopology\_DaisyChain\_MidDriven          ,  
                         eNetTopology\_DaisyChain\_Balanced           ,  
                         eNetTopology\_Starburst  
                       \);


TObjectCreationMode  = \( eCreate\_Default,  
                         eCreate\_GlobalCopy\);


TObjectId = \( eNoObject           ,  
             eArcObject          ,  
             ePadObject          ,  
             eViaObject          ,  
             eTrackObject        ,  
             eTextObject         ,  
             eFillObject         ,  
             eConnectionObject   ,  
             eNetObject          ,  
             eComponentObject    ,  
             ePolyObject         ,  
             eRegionObject       ,  
             eComponentBodyObject,  
             eDimensionObject    ,  
             eCoordinateObject   ,  
             eClassObject        ,  
             eRuleObject         ,  
             eFromToObject       ,  
             eDifferentialPairObject,  
             eViolationObject    ,  
             eEmbeddedObject     ,  
             eEmbeddedBoardObject,  
             eTraceObject        ,  
             eSpareViaObject     ,  
             eBoardObject        ,  
             eBoardOutlineObject,  
           \); Note, the eTraceObject and eSpareViaObject values are for internal use only and are not used directly with PCB documents \(these values are used for Signal Integrity and Situs auto routing modules\)\.


TObjectSet = Set of TObjectId;  
__See also__  
TObjectId


TOptionsObjectId = \(eAbstractOptions,  
                    eOutputOptions,  
                    ePrinterOptions,  
                    eGerberOptions,  
                    eAdvancedPlacerOptions,  
                    eDesignRuleCheckerOptions,  
                    eSpecctraRouterOptions,  
                    eAdvancedRouterOptions,  
                    eEngineeringChangeOrderOptions,  
                    eInteractiveRoutingOptions,  
                    eSystemOptions,  
                    ePinSwapOptions\);


TOutputDriverType    = \( eUnknownDriver                             ,  
                         eProtelGerber                              ,  
                         eProtelPlot\_Composite                      ,  
                         eProtelPlot\_Final                          ,  
                         eStandardDriver\_Composite                  ,  
                         eStandardDriver\_Final  
                       \);


TOutputPort = \(eOutputPortCom1,  
               eOutputPortCom2,  
               eOutputPortCom3,  
               eOutputPortCom4,  
               eOutputPortFile\);


TPadCache                          = Record  
    PlaneConnectionStyle           : TPlaneConnectionStyle;  
    ReliefConductorWidth           : TCoord;  
    ReliefEntries                  : SmallInt;  
    ReliefAirGap                   : TCoord;  
    PowerPlaneReliefExpansion      : TCoord;  
    PowerPlaneClearance            : TCoord;  
    PasteMaskExpansion             : TCoord;  
    SolderMaskExpansion            : TCoord;  
    Planes                         : Word;  
    PlaneConnectionStyleValid      : TCacheState;  
    ReliefConductorWidthValid      : TCacheState;  
    ReliefEntriesValid             : TCacheState;  
    ReliefAirGapValid              : TCacheState;  
    PowerPlaneReliefExpansionValid : TCacheState;  
    PasteMaskExpansionValid        : TCacheState;  
    SolderMaskExpansionValid       : TCacheState;  
    PowerPlaneClearanceValid       : TCacheState;  
    PlanesValid                    : TCacheState;  
End;


TPadMode = \( ePadMode\_Simple,  
             ePadMode\_LocalStack,  
             ePadMode\_ExternalStack\);


TParity = \(eParityNone,  
           eParityEven,  
           eParityOdd,  
           eParityMark,  
           eParitySpace\);


TPcbDragMode = \( eDragNone              
                 eDragAllTracks         
                 eDragConnectedTracks\);


TPCBObjectHandle = Pointer;


TPCBString  = WideString;


TPlaceTrackMode = \( ePlaceTrackNone,  
                   ePlaceTrackAny,  
                   ePlaceTrack9090,  
                   ePlaceTrack4590,  
                   ePlaceTrack90Arc\);


TPlaneConnectionStyle = \( ePlaneNoConnect,  
                          ePlaneReliefConnect,  
                          ePlaneDirectConnect\);


TPlaneConnectStyle = \(eReliefConnectToPlane,  
                      eDirectConnectToPlane,  
                      eNoConnect\);


TPlaneDrawMode       = \( ePlaneDrawoOutlineLayerColoured // <\- Protel 99 SE style\.  
                         ePlaneDrawOutlineNetColoured,  
                         ePlaneDrawInvertedNetColoured\);


TPlotLayer = \(eNullPlot,  
              eTopLayerPlot,  
              eMidLayer1Plot,  
              eMidLayer2Plot,  
              eMidLayer3Plot,  
              eMidLayer4Plot,  
              eMidLayer5Plot,  
              eMidLayer6Plot,  
              eMidLayer7Plot,  
              eMidLayer8Plot,  
              eMidLayer9Plot,  
              eMidLayer10Plot,  
              eMidLayer11Plot,  
              eMidLayer12Plot,  
              eMidLayer13Plot,  
              eMidLayer14Plot,  
              eMidLayer15Plot,  
              eMidLayer16Plot,  
              eMidLayer17Plot,  
              eMidLayer18Plot,  
              eMidLayer19Plot,  
              eMidLayer20Plot,  
              eMidLayer21Plot,  
              eMidLayer22Plot,  
              eMidLayer23Plot,  
              eMidLayer24Plot,  
              eMidLayer25Plot,  
              eMidLayer26Plot,  
              eMidLayer27Plot,  
              eMidLayer28Plot,  
              eMidLayer29Plot,  
              eMidLayer30Plot,  
              eBottomLayerPlot,  
              eTopOverlayPlot,  
              eBottomOverlayPlot,  
              eTopPastePlot,  
              eBottomPastePlot,  
              eTopSolderPlot,  
              eBottomSolderPlot,  
              eInternalPlane1Plot,  
              eInternalPlane2Plot,  
              eInternalPlane3Plot,  
              eInternalPlane4Plot,  
              eInternalPlane5Plot,  
              eInternalPlane6Plot,  
              eInternalPlane7Plot,  
              eInternalPlane8Plot,  
              eInternalPlane9Plot,  
              eInternalPlane10Plot,  
              eInternalPlane11Plot,  
              eInternalPlane12Plot,  
              eInternalPlane13Plot,  
              eInternalPlane14Plot,  
              eInternalPlane15Plot,  
              eInternalPlane16Plot,  
              eDrillGuide\_Top\_BottomPlot,  
              eDrillGuide\_Top\_Mid1Plot,  
              eDrillGuide\_Mid2\_Mid3Plot,  
              eDrillGuide\_Mid4\_Mid5Plot,  
              eDrillGuide\_Mid6\_Mid7Plot,  
              eDrillGuide\_Mid8\_Mid9Plot,  
              eDrillGuide\_Mid10\_Mid11Plot,  
              eDrillGuide\_Mid12\_Mid13Plot,  
              eDrillGuide\_Mid14\_Mid15Plot,  
              eDrillGuide\_Mid16\_Mid17Plot,  
              eDrillGuide\_Mid18\_Mid19Plot,  
              eDrillGuide\_Mid20\_Mid21Plot,  
              eDrillGuide\_Mid22\_Mid23Plot,  
              eDrillGuide\_Mid24\_Mid25Plot,  
              eDrillGuide\_Mid26\_Mid27Plot,  
              eDrillGuide\_Mid28\_Mid29Plot,  
              eDrillGuide\_Mid30\_BottomPlot,  
              eDrillGuide\_SpecialPlot,  
              eKeepOutLayerPlot,  
              eMechanical1Plot,  
              eMechanical2Plot,  
              eMechanical3Plot,  
              eMechanical4Plot,  
              eMechanical5Plot,  
              eMechanical6Plot,  
              eMechanical7Plot,  
              eMechanical8Plot,  
              eMechanical9Plot,  
              eMechanical10Plot,  
              eMechanical11Plot,  
              eMechanical12Plot,  
              eMechanical13Plot,  
              eMechanical14Plot,  
              eMechanical15Plot,  
              eMechanical16Plot,  
              eDrillDrawing\_Top\_BottomPlot,  
              eDrillDrawing\_Top\_Mid1Plot,  
              eDrillDrawing\_Mid2\_Mid3Plot,  
              eDrillDrawing\_Mid4\_Mid5Plot,  
              eDrillDrawing\_Mid6\_Mid7Plot,  
              eDrillDrawing\_Mid8\_Mid9Plot,  
              eDrillDrawing\_Mid10\_Mid11Plot,  
              eDrillDrawing\_Mid12\_Mid13Plot,  
              eDrillDrawing\_Mid14\_Mid15Plot,  
              eDrillDrawing\_Mid16\_Mid17Plot,  
              eDrillDrawing\_Mid18\_Mid19Plot,  
              eDrillDrawing\_Mid20\_Mid21Plot,  
              eDrillDrawing\_Mid22\_Mid23Plot,  
              eDrillDrawing\_Mid24\_Mid25Plot,  
              eDrillDrawing\_Mid26\_Mid27Plot,  
              eDrillDrawing\_Mid28\_Mid29Plot,  
              eDrillDrawing\_Mid30\_BottomPlot,  
              eDrillDrawing\_SpecialPlot,  
              eTopPadMasterPlot,  
              eBottomPadMasterPlot\);


TPlotPolygonProc  = Procedure\(APoly : PGPC\_Polygon\) Of Object;


TPlotterLanguage = \( ePlotterLanguageHPGL,  
                     ePlotterLanguageDMPL\);


TPolygonReliefAngle  = \( ePolygonReliefAngle\_45,  
                         ePolygonReliefAngle\_90\);


TPolygonRepourMode = \( eNeverRepour      
                       eThresholdRepour  
                       eAlwaysRepour\);


TPolygonType = \( eSignalLayerPolygon,  
                 eSplitPlanePolygon\);


TPolyHatchStyle = \( ePolyHatch90,  
                    ePolyHatch45,  
                    ePolyVHatch,  
                    ePolyHHatch,  
                    ePolyNoHatch,  
                    ePolySolid\);


TPolyRegionKind = \( ePolyRegionKind\_Copper,   
                    ePolyRegionKind\_Cutout,   
                    ePolyRegionKind\_NamedRegion\);


TPolySegmentType = \( ePolySegmentLine,  
                     ePolySegmentArc\);


TPrinterBatch = \( ePlotPerSheet,  
                  ePanelize\);


TPrinterComposite    = \( eColorComposite,  
                         eMonoComposite\);


TRouteLayer = \(eRLLayerNotUsed,  
               eRLRouteHorizontal,  
               eRLRouteVertical,  
               eRLRouteSingleLayer,  
               eRLRoute\_1\_OClock,  
               eRLRoute\_2\_OClock,  
               eRLRoute\_4\_OClock,  
               eRLRoute\_5\_OClock,  
               eRLRoute\_45\_Up,  
               eRLRoute\_45\_Down,  
               eRLRouteFanout,  
               eRLRouteAuto\);


TRouteVia = \(eViaThruHole,  
             eViaBlindBuriedPair,  
             eViaBlindBuriedAny,  
             eViaNone\);


TRoutingWidthMode =    \(eRoutingWidth\_Default,  
                        eRoutingWidth\_Min,  
                        eRoutingWidth\_Preferred,  
                        eRoutingWidth\_Max\);


TRuleKind = \( eRule\_Clearance,  
              eRule\_ParallelSegment,  
              eRule\_MaxMinWidth,  
              eRule\_MaxMinLength,  
              eRule\_MatchedLengths,  
              eRule\_DaisyChainStubLength,  
              eRule\_PowerPlaneConnectStyle,  
              eRule\_RoutingTopology,  
              eRule\_RoutingPriority,  
              eRule\_RoutingLayers,  
              eRule\_RoutingCornerStyle,  
              eRule\_RoutingViaStyle,  
              eRule\_PowerPlaneClearance,  
              eRule\_SolderMaskExpansion,  
              eRule\_PasteMaskExpansion,  
              eRule\_ShortCircuit,  
              eRule\_BrokenNets,  
              eRule\_ViasUnderSMD,  
              eRule\_MaximumViaCount,  
              eRule\_MinimumAnnularRing,  
              eRule\_PolygonConnectStyle,  
              eRule\_AcuteAngle,  
              eRule\_ConfinementConstraint,  
              eRule\_SMDToCorner,  
              eRule\_ComponentClearance,  
              eRule\_ComponentRotations,  
              eRule\_PermittedLayers,  
              eRule\_NetsToIgnore,  
              eRule\_SignalStimulus,  
              eRule\_Overshoot\_FallingEdge,  
              eRule\_Overshoot\_RisingEdge,  
              eRule\_Undershoot\_FallingEdge,  
              eRule\_Undershoot\_RisingEdge,  
              eRule\_MaxMinImpedance,  
              eRule\_SignalTopValue,  
              eRule\_SignalBaseValue,  
              eRule\_FlightTime\_RisingEdge,  
              eRule\_FlightTime\_FallingEdge,  
              eRule\_LayerStack,  
              eRule\_MaxSlope\_RisingEdge,  
              eRule\_MaxSlope\_FallingEdge,  
              eRule\_SupplyNets,  
              eRule\_MaxMinHoleSize,  
              eRule\_TestPointStyle,  
              eRule\_TestPointUsage,  
              eRule\_UnconnectedPin,  
              eRule\_SMDToPlane,  
              eRule\_SMDNeckDown,  
              eRule\_LayerPair,  
              eRule\_FanoutControl,  
              eRule\_MaxMinHeight,  
              eRule\_DifferentialPairsRouting\);


TRuleLayerKind = \(eRuleLayerKind\_SameLayer,  
                  eRuleLayerKind\_AdjacentLayer\);


TSameNamePadstackReplacementMode  
                     = \( eAskUser          
                         eReplaceOne       
                         eReplaceAll       
                         eRenameOne        
                         eRenameAll        
                         eKeepOneExisting  
                         eKeepAllExisting  
                       \);


ScopeId = \(eScope1, eScope2\);


TScopeKind = \( eScopeKindBoard,  
               \{Lowest Precedence\}  
               eScopeKindLayerClass,  
               eScopeKindLayer,  
               eScopeKindObjectKind,  
               eScopeKindFootprint,  
               eScopeKindComponentClass,  
               eScopeKindComponent,  
               eScopeKindNetClass,  
               eScopeKindNet,  
               eScopeKindFromToClass,  
               eScopeKindFromTo,  
               eScopeKindPadClass,  
               eScopeKindPadSpec,  
               eScopeKindViaSpec,  
               eScopeKindFootprintPad,  
               eScopeKindPad,  
               eScopeKindRegion  
               \{Highest Precedence\}\);


TScopeObjectId = \( eRuleObject\_None,  
                   eRuleObject\_Wire,  
                   eRuleObject\_Pin,  
                   eRuleObject\_Smd,  
                   eRuleObject\_Via,  
                   eRuleObject\_Fill,  
                   eRuleObject\_Polygon,  
                   eRuleObject\_KeepOut\);


TShape = \(eNoShape,  
          eRounded,  
          eRectangular,  
          eOctagonal,  
          eCircleShape,  
          eArcShape,  
          eTerminator,  
          eRoundRectShape,  
          eRotatedRectShape  
          eRoundedRectangular  
\);


TSignalLevel = \( eLowLevel,  
                eHighLevel\);


TSortBy = \(eSortByAXThenAY,  
           eSortByAXThenDY,  
           eSortByAYThenAX,  
           eSortByDYThenAX,  
           eSortByName\);


TSmartRouteMode = \(eSRIgnoreObstacle,  
                   eSRAvoidObstacle,  
                   eSRWalkAroundObstacle,  
                   eSRPushObstacle\);


TStimulusType = \(eConstantLevel,  
                 eSinglePulse,  
                 ePeriodicPulse\);


TStopBits            = \( eStopBits1                                 ,  
                         eStopBits1\_5                               ,  
                         eDataBits2  
                       \);


TString = ShortString;


TStrokeArray = Array\[1\.\.kMaxStrokes\] Of TStrokeRecord;


TStrokeRecord = Record  
   X1, Y1, X2, Y2 : TCoord;  
End;


TTestPointStyle = \(eExistingSMDBottom,  
                   eExistingTHPadBottom,  
                   eExistingTHViaBottom,  
                   eNewSMDBottom,  
                   eNewTHBottom,  
                   eExistingSMDTop,  
                   eExistingTHPadTop,  
                   eExistingTHViaTop,  
                   eNewSMDTop,  
                   eNewTHTop\);


TTestpointValid      = \( eRequire,  
                         eInvalid,  
                         eIgnore\);


TTextAlignment       = \( eNoneAlign                                 ,  
                         eCentreAlign                               ,  
                         eLeftAlign                                 ,  
                         eRightAlign                                ,  
                         eTopAlign                                  ,  
                         eBottomAlign  
                       \);


TTextAutoposition    = \( eAutoPos\_Manual,  
                         eAutoPos\_TopLeft,  
                         eAutoPos\_CenterLeft,  
                         eAutoPos\_BottomLeft,  
                         eAutoPos\_TopCenter,  
                         eAutoPos\_CenterCenter,  
                         eAutoPos\_BottomCenter,  
                         eAutoPos\_TopRight,  
                         eAutoPos\_CenterRight,  
                         eAutoPos\_BottomRight\);


TUnit = \(eMetric, eImperial\);


TUnitStyle = \( eNoUnits,  
               eYesUnits,  
               eParenthUnits\);


TViewableObjectID = \(eViewableObject\_None                       ,  
                     eViewableObject\_Arc                        ,  
                     eViewableObject\_Pad                        ,  
                     eViewableObject\_Via                        ,  
                     eViewableObject\_Track                      ,  
                     eViewableObject\_Text                       ,  
                     eViewableObject\_Fill                       ,  
                     eViewableObject\_Connection                 ,  
                     eViewableObject\_Net                        ,  
                     eViewableObject\_Component                  ,  
                     eViewableObject\_Poly                       ,  
                     eViewableObject\_LinearDimension            ,  
                     eViewableObject\_AngularDimension           ,  
                     eViewableObject\_RadialDimension            ,  
                     eViewableObject\_LeaderDimension            ,  
                     eViewableObject\_DatumDimension             ,  
                     eViewableObject\_BaselineDimension          ,  
                     eViewableObject\_CenterDimension            ,  
                     eViewableObject\_OriginalDimension          ,  
                     eViewableObject\_LinearDiameterDimension    ,  
                     eViewableObject\_RadialDiameterDimension    ,  
                     eViewableObject\_Coordinate                 ,  
                     eViewableObject\_Class                      ,  
                     eViewableObject\_Rule\_Clearance             ,  
                     eViewableObject\_Rule\_ParallelSegment       ,  
                     eViewableObject\_Rule\_MaxMinWidth           ,  
                     eViewableObject\_Rule\_MaxMinLength          ,  
                     eViewableObject\_Rule\_MatchedLengths        ,  
                     eViewableObject\_Rule\_DaisyChainStubLength  ,  
                     eViewableObject\_Rule\_PowerPlaneConnectStyle,  
                     eViewableObject\_Rule\_RoutingTopology       ,  
                     eViewableObject\_Rule\_RoutingPriority       ,  
                     eViewableObject\_Rule\_RoutingLayers         ,  
                     eViewableObject\_Rule\_RoutingCornerStyle    ,  
                     eViewableObject\_Rule\_RoutingViaStyle       ,  
                     eViewableObject\_Rule\_PowerPlaneClearance   ,  
                     eViewableObject\_Rule\_SolderMaskExpansion   ,  
                     eViewableObject\_Rule\_PasteMaskExpansion    ,  
                     eViewableObject\_Rule\_ShortCircuit          ,  
                     eViewableObject\_Rule\_BrokenNets            ,  
                     eViewableObject\_Rule\_ViasUnderSMD          ,  
                     eViewableObject\_Rule\_MaximumViaCount       ,  
                     eViewableObject\_Rule\_MinimumAnnularRing    ,  
                     eViewableObject\_Rule\_PolygonConnectStyle   ,  
                     eViewableObject\_Rule\_AcuteAngle            ,  
                     eViewableObject\_Rule\_ConfinementConstraint ,  
                     eViewableObject\_Rule\_SMDToCorner           ,  
                     eViewableObject\_Rule\_ComponentClearance    ,  
                     eViewableObject\_Rule\_ComponentRotations    ,  
                     eViewableObject\_Rule\_PermittedLayers       ,  
                     eViewableObject\_Rule\_NetsToIgnore          ,  
                     eViewableObject\_Rule\_SignalStimulus        ,  
                     eViewableObject\_Rule\_Overshoot\_FallingEdge ,  
                     eViewableObject\_Rule\_Overshoot\_RisingEdge  ,  
                     eViewableObject\_Rule\_Undershoot\_FallingEdge,  
                     eViewableObject\_Rule\_Undershoot\_RisingEdge ,  
                     eViewableObject\_Rule\_MaxMinImpedance       ,  
                     eViewableObject\_Rule\_SignalTopValue        ,  
                     eViewableObject\_Rule\_SignalBaseValue       ,  
                     eViewableObject\_Rule\_FlightTime\_RisingEdge ,  
                     eViewableObject\_Rule\_FlightTime\_FallingEdge,  
                     eViewableObject\_Rule\_LayerStack            ,  
                     eViewableObject\_Rule\_MaxSlope\_RisingEdge   ,  
                     eViewableObject\_Rule\_MaxSlope\_FallingEdge  ,  
                     eViewableObject\_Rule\_SupplyNets            ,  
                     eViewableObject\_Rule\_MaxMinHoleSize        ,  
                     eViewableObject\_Rule\_TestPointStyle        ,  
                     eViewableObject\_Rule\_TestPointUsage        ,  
                     eViewableObject\_Rule\_UnconnectedPin        ,  
                     eViewableObject\_Rule\_SMDToPlane            ,  
                     eViewableObject\_Rule\_SMDNeckDown           ,  
                     eViewableObject\_Rule\_LayerPair             ,  
                     eViewableObject\_Rule\_FanoutControl         ,  
                     eViewableObject\_Rule\_MaxMinHeight          ,  
                     eViewableObject\_Rule\_DifferentialPairs     ,  
                     eViewableObject\_FromTo                     ,  
                     eViewableObject\_DifferentialPair           ,  
                     eViewableObject\_Violation                  ,  
                     eViewableObject\_Board                      ,  
                     eViewableObject\_BoardOutline               ,  
                     eViewableObject\_Group                      ,  
                     eViewableObject\_Clipboard                  ,  
                     eViewableObject\_SplitPlane,  
                     eViewableObject\_EmbeddedBoard,  
                     eViewableObject\_Region,  
                     eViewableObject\_ComponentBody\); __Notes__  
This TViewableObjectID type is mainly used by the Inspector and List views in Altium Designer and is an extension of TObjectID type\.


TWidthArray  = Array\[cMinLayer\_WidthRule\.\.cMaxLayer\_WidthRule\] Of TCoord;

## 子章节

- [PCB API: PCB Enumerated Types Reference](01-PCB_API_PCB_Enumerated_Types_Reference.md/README.md)
