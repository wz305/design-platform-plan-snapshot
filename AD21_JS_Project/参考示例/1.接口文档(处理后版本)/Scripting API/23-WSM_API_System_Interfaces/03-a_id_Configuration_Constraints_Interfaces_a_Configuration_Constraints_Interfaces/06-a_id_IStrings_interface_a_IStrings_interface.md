### <a id="IStrings_interface"></a>IStrings interface

__Overview__  
The IStrings interface represents the strings container – more like a list of strings\.  
__Interface Methods__  
Function GetCount : Integer;                           
Function GetItem\(Index : Integer\) : WideString;        
Function IndexOf\(Const Value : WideString\) : Integer;  
__Interface Properties__  
Property Count : Integer read GetCount;  
Property Items\[Index : Integer\] : WideString read GetItem; default;  
__See also__  
Workspace Manager Interfaces