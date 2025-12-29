### <a id="ISch_JunctionConvertSettings_Interface"></a>ISch\_JunctionConvertSettings Interface

__Overview__  
The ISch\_JunctionConvertSettings interface hierarchy is as follows;

__ISch\_JunctionConvertSettings Methods and Properties Table__

__ISch\_JunctionConvertSettings methods__  
GetJunctionConversion  
SetJunctionConversion  
GetMiterSize  
SetMiterSize  
GetBatchMode  
SetBatchMode  
GetShowDialog  
SetShowDialog  
Export\_ToIniFile  
Import\_FromIniFile

__ISch\_JunctionConvertSettings properties__  
JunctionConversion  
MiterSize  
BatchMode  
ShowDialog

#### ISch\_JunctionConvertSettings Methods

##### SetShowDialog method

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure SetShowDialog \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### SetMiterSize method

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure SetMiterSize \(Value : TDistance\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### SetJunctionConversion method

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure SetJunctionConversion\(Value : TJunctionConversionKind\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### SetBatchMode method

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure SetBatchMode \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### Import\_FromIniFile method

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure Import\_FromIniFile\(Const OptionsReader : IOptionsReader\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### GetShowDialog method

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Function GetShowDialog : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### GetMiterSize method

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Function GetMiterSize : TDistance;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### GetJunctionConversion method

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Function GetJunctionConversion : TJunctionConversionKind;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### GetBatchMode method

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Function GetBatchMode : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### Export\_ToIniFile method

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure Export\_ToIniFile \(Const OptionsWriter : IOptionsWriter\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

#### ISch\_JunctionConvertSettings Properties

##### MiterSize property

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Property MiterSize : TDistance Read GetMiterSize Write SetMiterSize;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### JunctionConversion property

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Property JunctionConversion : TJunctionConversionKind Read GetJunctionConversion Write SetJunctionConversion;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### BatchMode property

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Property BatchMode : Boolean Read GetBatchMode Write SetBatchMode;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface

##### ShowDialog property

\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Property ShowDialog : Boolean Read GetShowDialog Write SetShowDialog;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface