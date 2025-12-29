### <a id="ISch_Note_Interface"></a>ISch\_Note Interface

__Overview__  
The ISch\_Note interface represents the note object on the schematic sheet\. This note object stores textual information and can be collapsed upon user's mouse click on the schematic sheet\.  
The interface hierarchy for the ISch\_Note interface is as follows:  
ISch\_GraphicalObject  
ISch\_Rectangle  
ISch\_TextFrame  
ISch\_Note

__ISch\_Note methods__  
SetState\_Author  
SetState\_Collapsed  
GetState\_Author  
GetState\_Collapsed

__ISch\_Note properties__  
Author  
Collapsed

__See also__  
ISch\_GraphicalObject  
ISch\_Rectangle  
ISch\_TextFrame

#### Methods

##### SetState\_Author method

\(ISch\_Note interface\)  
__Syntax__  
Procedure SetState\_Author \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Note interface

##### GetState\_Collapsed method

\(ISch\_Note interface\)  
__Syntax__  
Function GetState\_Collapsed : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Note interface

##### GetState\_Author method

\(ISch\_Note interface\)  
__Syntax__  
Function GetState\_Author : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Note interface

##### SetState\_Collapsed method

\(ISch\_Note interface\)  
__Syntax__  
Procedure SetState\_Collapsed\(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Note interface

#### Properties

##### Collapsed property

\(ISch\_Note interface\)  
__Syntax__  
Property Collapsed : Boolean Read GetState\_Collapsed Write SetState\_Collapsed;  
__Description__  
__Example__  
__See also__  
ISch\_Note interface

##### Author property

\(ISch\_Note interface\)  
__Syntax__  
Property Author : WideString Read GetState\_Author Write SetState\_Author;  
__Description__  
__Example__  
__See also__  
ISch\_Note interface