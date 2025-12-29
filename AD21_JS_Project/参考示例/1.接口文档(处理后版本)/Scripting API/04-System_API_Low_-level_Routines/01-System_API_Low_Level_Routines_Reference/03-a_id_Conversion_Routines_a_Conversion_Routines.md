### <a id="Conversion_Routines"></a>Conversion Routines

Function GetPrevSettings\_Count : Integer;  
Function GetPrevSettings\_Name                                \(AIndex : Integer\) : TDynamicString;  
Function GetPrevSettings\_SpecialKey\_SoftwareAltiumApp        \(AIndex : Integer\) : TDynamicString;  
Function GetPrevSettings\_SpecialKey\_SoftwareAltiumAppDXP     \(AIndex : Integer\) : TDynamicString;  
Function GetPrevSettings\_SpecialFolder\_AltiumApplicationData \(AIndex : Integer\) : TDynamicString;  
   
Function ConvertMeasureUnits\(Const AValue : Double; FromUnit, ToUnit : TMeasureUnit\) : Double;  
   
Function StripMeasureUnits\(Var S : TDynamicString; Var Value : Double; Var UsedUnits : TMeasureUnit\) : Boolean;