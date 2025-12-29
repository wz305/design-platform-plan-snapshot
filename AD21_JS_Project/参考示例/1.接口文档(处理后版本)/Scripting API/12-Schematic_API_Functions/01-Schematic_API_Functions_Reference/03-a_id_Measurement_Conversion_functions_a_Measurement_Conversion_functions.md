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