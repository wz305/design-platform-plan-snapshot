### <a id="Unit_conversion_functions"></a>Unit conversion functions

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