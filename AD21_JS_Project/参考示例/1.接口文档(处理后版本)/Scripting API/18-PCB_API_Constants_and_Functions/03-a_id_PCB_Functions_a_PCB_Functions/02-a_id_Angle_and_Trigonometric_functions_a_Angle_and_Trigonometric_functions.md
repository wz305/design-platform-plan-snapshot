### <a id="Angle_and_Trigonometric_functions"></a>Angle and Trigonometric functions

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