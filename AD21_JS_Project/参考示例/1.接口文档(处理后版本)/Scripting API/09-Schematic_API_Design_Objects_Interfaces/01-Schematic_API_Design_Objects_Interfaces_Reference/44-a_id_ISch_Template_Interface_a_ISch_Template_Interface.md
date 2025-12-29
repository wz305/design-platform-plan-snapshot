### <a id="ISch_Template_Interface"></a>ISch\_Template Interface

__Overview__  
The schematic templates represent the sheet border, title block and graphics for a schematic document\.  
__Notes__  
The __ISch\_Template__ interface hierarchy is as follows:  
ISch\_GraphicalObject  
ISch\_Template

__ISch\_Template methods__  
SetState\_FileName  
GetState\_FileName

__ISch\_Template properties__  
FileName

__See also__  
ISch\_GraphicalObject interface

#### Methods

##### SetState\_FileName method

\(ISch\_Template interface\)  
__Syntax__  
Procedure SetState\_FileName\(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Template interface

##### GetState\_FileName method

\(ISch\_Template interface\)  
__Syntax__  
Function GetState\_FileName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Template interface

#### Properties

##### FileName property

\(ISch\_Template interface\)  
__Syntax__  
Property FileName : WideString Read GetState\_FileName Write SetState\_FileName;  
__Description__  
__Example__  
__See also__  
ISch\_Template interface