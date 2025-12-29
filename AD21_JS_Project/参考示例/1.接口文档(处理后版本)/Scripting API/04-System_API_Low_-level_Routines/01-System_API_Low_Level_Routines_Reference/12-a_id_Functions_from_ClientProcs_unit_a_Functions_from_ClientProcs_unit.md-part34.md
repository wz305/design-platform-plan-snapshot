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

### <a id="ISch_HitTest_Interface"></a>ISch\_HitTest Interface

__Overview__  
This ISch\_HitTest interface returns you the number of objects and object type at a particular point on the schematic document\.

__Notes__  
To specify the location where the objects can be checked on the schematic document, pass in the location \(of TLocation type\) and invoke the CreateHitTest method from the ISchDocument interface\. This location parameter can be set either programmatically or by the ChooseLocationInteractively method form the ISch\_Document interface\.

__ISch\_HitTest methods__  
GetState\_HitTestCount  
GetState\_HitObject

__ISch\_HitTest properties__  
HitTestCount  
HitObject

__See also__  
ISch\_Document interface  
CreateHitTest method  
ChooseLocationInteractively method  
ChooseRectangleInteractively method  
TLocation type