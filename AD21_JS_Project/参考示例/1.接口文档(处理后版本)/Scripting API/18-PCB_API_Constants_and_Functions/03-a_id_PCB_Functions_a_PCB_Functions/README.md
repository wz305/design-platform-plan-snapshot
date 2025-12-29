# <a id="PCB_Functions"></a>PCB Functions

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

- [<a id="Unit_conversion_functions"></a>Unit conversion functions](01-a_id_Unit_conversion_functions_a_Unit_conversion_functions.md.md)
- [<a id="Angle_and_Trigonometric_functions"></a>Angle and Trigonometric functions](02-a_id_Angle_and_Trigonometric_functions_a_Angle_and_Trigonometric_functions.md.md)
- [<a id="Object_Boundary_Functions"></a>Object Boundary Functions](03-a_id_Object_Boundary_Functions_a_Object_Boundary_Functions.md.md)
- [<a id="Layer_conversion_functions"></a>Layer conversion functions](04-a_id_Layer_conversion_functions_a_Layer_conversion_functions.md.md)
- [<a id="Font_Functions"></a>Font Functions](05-a_id_Font_Functions_a_Font_Functions.md.md)
- [<a id="Locale_Functions"></a>Locale Functions](06-a_id_Locale_Functions_a_Locale_Functions.md.md)
- [General Functions](07-General_Functions.md.md)
