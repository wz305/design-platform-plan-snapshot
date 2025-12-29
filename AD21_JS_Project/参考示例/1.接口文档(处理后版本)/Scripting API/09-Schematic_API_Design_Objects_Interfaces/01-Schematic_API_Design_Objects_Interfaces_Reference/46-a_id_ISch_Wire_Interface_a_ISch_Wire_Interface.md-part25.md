#### Sch\_GetOwnerProject

Function Sch\_GetOwnerProject\(Const AContainer : ISch\_BasicContainer\) : IProject;

### <a id="Measurement_Conversion_functions"></a>Measurement Conversion functions

//Imperial functions  
Function  CoordToMils        \(    C : TCoord\) : TReal;  
Function  CoordToDxps        \(    C : TCoord\) : TReal;  
Function  CoordToInches      \(    C : TCoord\) : TReal;  
Function  MilsToCoord        \(    M : TReal\)  : TCoord;  
Function  DxpsToCoord        \(    M : TReal\)  : TCoord;  
Function  InchesToCoord      \(    M : TReal\)  : TCoord;  
   
//Metric functions  
Function  CoordToMMs         \(    C : TCoord\) : TReal;  
Function  CoordToCMs         \(    C : TCoord\) : TReal;  
Function  CoordToMs          \(    C : TCoord\) : TReal;  
Function  MMsToCoord         \(    M : TReal\)  : TCoord;  
Function  CMsToCoord         \(    M : TReal\)  : TCoord;  
Function   MsToCoord         \(    M : TReal\)  : TCoord;  
   
Function  MetricString\(Var S : TDynamicString; DefaultUnits : TUnit\) : Boolean;  
Function  ImperialString\(Var S : TDynamicString; DefaultUnits : TUnit\) : Boolean;  
   
Function  CoordUnitToString       \(C : TCoord; U : TUnit\) : TDynamicString;  
   
Function  CoordUnitToStringWithAccuracy  \(ACoord         : TCoord;  
                                          AUnit          : TUnit;  
                                          ARounding      : Integer;  
                                          AFixedDecimals : Integer\) : TDynamicString;  
   
Function  ExtractValueAndUnitFromString\(AInString : TDynamicString;  
                                        ADefaultUnit : TUnit;  
                                    Var AValue       : TDynamicString;  
                                    Var AUnit        : TUnit\) : Boolean;  
   
Function  StringToCoordUnit       \(S : TDynamicString; Var C : TCoord; ADefaultUnit : TUnit\) : Boolean;  
   
Function  CoordUnitToString       \(C : TCoord; U : TUnit\) : TDynamicString;  
   
Function  CoordUnitToStringFixedDecimals \(C : TCoord; U : TUnit; AFixedDecimals : Integer\) : TDynamicString;  
   
Function  CoordUnitToStringNoUnit \(C : TCoord; U : TUnit\) : TDynamicString;  
Function  CoordUnitToStringWithAccuracy  \(ACoord         : TCoord;  
                                          AUnit          : TUnit;  
                                          ARounding      : Integer;  
                                          AFixedDecimals : Integer\) : TDynamicString;  
   
Function  GetDisplayStringFromLocation\(ALocation : TLocation; AUnit : TUnit\) : TDynamicString;  
   
Function GetCurrentDocumentUnit : TUnit;  
Function GetCurrentDocumentUnitSystem : TUnitSystem;  
Function GetSchObjectOwnerDocumentUnit\(Const AObject : ISch\_BasicContainer\) : TUnit;

### <a id="Conversion_functions"></a>Conversion functions

Function  GetStateString\_ObjectId                 \(N : TObjectId                 \) : TString;  
Function  GetStateString\_HorizontalAlign          \(N : THorizontalAlign          \) : TString;  
Function  GetStateString\_IeeeSymbol               \(N : TIeeeSymbol               \) : TString;  
Function  GetStateString\_LeftRightSide            \(N : TLeftRightSide            \) : TString;  
Function  GetStateString\_LineStyle                \(N : TLineStyle                \) : TString;  
Function  GetStateString\_PinElectrical            \(N : TPinElectrical            \) : TString;  
Function  GetStateString\_PortArrowStyle           \(N : TPortArrowStyle           \) : TString;  
Function  GetStateString\_PortIO                   \(N : TPortIO                   \) : TString;  
Function  GetStateString\_PowerObjectStyle         \(N : TPowerObjectStyle         \) : TString;  
Function  GetStateString\_CrossSheetConnectorStyle \(N : TCrossSheetConnectorStyle \) : TString;  
Function  GetStateString\_RotationBy90             \(N : TRotationBy90             \) : TString;  
Function  GetStateString\_Justification            \(N : TTextJustification        \) : TString;  
Function  GetStateString\_HorizontalJustification  \(N : TTextJustification        \) : TString;  
Function  GetStateString\_VerticalJustification    \(N : TTextJustification        \) : TString;  
Function  GetStateString\_SheetStyle               \(N : TSheetStyle               \) : TString;  
Function  GetStateString\_Size                     \(N : TSize                     \) : TString;  
Function  GetStateString\_Location                 \(N : TLocation                 \) : TString;  
Function  GetStateString\_DisplayMode              \(N : TDisplayMode              \) : TString;  
   
Function  GetStateString\_LineShape    \(N : TLineShape\) : TString;  
Function  GetStateString\_ObjectIdPlural\(N : TObjectId\) : TString;