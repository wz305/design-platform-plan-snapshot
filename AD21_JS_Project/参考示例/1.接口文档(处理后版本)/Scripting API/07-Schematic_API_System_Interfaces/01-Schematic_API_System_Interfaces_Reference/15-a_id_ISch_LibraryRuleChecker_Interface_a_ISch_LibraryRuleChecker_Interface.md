### <a id="ISch_LibraryRuleChecker_Interface"></a>ISch\_LibraryRuleChecker Interface

__Overview__  
The ISch\_LibraryRuleChecker interface represents the internal library rule checker facility that checks the validity of symbols in schematic libraries\.

__ISch\_LIbraryRuleChecker Methods and Properties Table__

__ISch\_LibraryRuleChecker methods__  
GetState\_Duplicate\_Pins  
GetState\_Duplicate\_Component  
GetState\_Missing\_Pin\_Number  
GetState\_Missing\_Default\_Designator  
GetState\_Missing\_Footprint  
GetState\_Missing\_Description  
GetState\_Missing\_Pin\_Name  
GetState\_Missing\_Pins\_In\_Sequence  
GetState\_ShowReport  
SetState\_Duplicate\_Pins  
SetState\_Duplicate\_Component  
SetState\_Missing\_Pin\_Number  
SetState\_Missing\_Default\_Designator  
SetState\_Missing\_Footprint  
SetState\_Missing\_Description  
SetState\_Missing\_Pin\_Name  
SetState\_Missing\_Pins\_In\_Sequence  
SetState\_ShowReport  
SetState\_FromParameters  
Import\_FromUser  
Run  
I\_ObjectAddress

__ISch\_LibraryRuleChecker properties__  
Duplicate\_Pins  
Duplicate\_Component  
Missing\_Pin\_Number  
Missing\_Default\_Designator  
Missing\_Footprint  
Missing\_Description  
Missing\_Pin\_Name  
Missing\_Pins\_In\_Sequence  
ShowReport

#### ISch\_LibraryRuleChecker Methods

##### GetState\_Duplicate\_Component method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Duplicate\_Component : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### GetState\_Duplicate\_Pins method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Duplicate\_Pins : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### GetState\_Missing\_Default\_Designator method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Default\_Designator : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### GetState\_Missing\_____Description____ method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Description : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### GetState\_Missing\_Footprint method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Footprint : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### GetState\_Missing\_Pin\_Name method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Pin\_Name : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### GetState\_Missing\_Pin\_Number method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Pin\_Number : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### GetState\_Missing\_Pins\_In\_Sequence method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Pins\_In\_Sequence : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### GetState\_ShowReport method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_ShowReport : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### SetState\_Duplicate\_Component method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Duplicate\_Component \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### SetState\_Duplicate\_Pins method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Duplicate\_Pins \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### SetState\_FromParameters method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function SetState\_FromParameters\(Parameters : PChar\) : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### SetState\_Missing\_Default\_Designator method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\_Default\_Designator\(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### SetState\_Missing\_____Description____ method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\___Description__ \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### SetState\_Missing\_Footprint method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\_Footprint \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### SetState\_Missing\_Pin\_Name method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\_Pin\_Name \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### SetState\_Missing\_Pin\_Number method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\_Pin\_Number \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### SetState\_Missing\_Pins\_In\_Sequence method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\_Pins\_In\_Sequence \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### SetState\_ShowReport method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_ShowReport \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### Import\_FromUser method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function Import\_FromUser : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### I\_ObjectAddress method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function I\_ObjectAddress : TSCHObjectHandle;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### Run method

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function Run : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

#### ISch\_LibraryRuleChecker Properties

##### Duplicate\_Component property

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Duplicate\_Component : Boolean Read GetState\_Duplicate\_Component Write SetState\_Duplicate\_Component ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### Duplicate\_Pins property

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Duplicate\_Pins : Boolean Read GetState\_Duplicate\_Pins Write SetState\_Duplicate\_Pins ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### Missing\_Default\_Designator property

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Default\_Designator : Boolean Read GetState\_Missing\_Default\_Designator Write SetState\_Missing\_Default\_Designator;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### Missing\_Description property

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Description : Boolean Read GetState\_Missing\_Description Write SetState\_Missing\_Description ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### Missing\_Footprint property

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Footprint : Boolean Read GetState\_Missing\_Footprint Write SetState\_Missing\_Footprint ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### Missing\_Pins\_In\_Sequence property

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Pins\_In\_Sequence : Boolean Read GetState\_Missing\_Pins\_In\_Sequence Write SetState\_Missing\_Pins\_In\_Sequence ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### Missing\_Pin\_Name property

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Pin\_Name : Boolean Read GetState\_Missing\_Pin\_Name Write SetState\_Missing\_Pin\_Name ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### Missing\_Pin\_Number property

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Pin\_Number : Boolean Read GetState\_Missing\_Pin\_Number Write SetState\_Missing\_Pin\_Number ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface

##### ShowReport property

\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property ShowReport : Boolean Read GetState\_ShowReport Write SetState\_ShowReport ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface