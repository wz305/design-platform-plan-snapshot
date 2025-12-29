### <a id="Internal_Unit_constants"></a>Internal Unit constants

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