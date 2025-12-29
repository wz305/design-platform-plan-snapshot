#### Methods

##### GetState\_Designator\_Implementation method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designator\_Implementation\(Index : Integer\) : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### GetState\_Designator\_ImplementationCount method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designator\_ImplementationCount : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### GetState\_Designator\_Interface method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designator\_Interface : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### SetState\_AllFromString method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_AllFromString \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### SetState\_Designator\_ImplementationAdd method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_Designator\_ImplementationAdd\(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### SetState\_Designator\_Interface method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_Designator\_Interface\(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### SetState\_Designator\_ImplementationClear method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_Designator\_ImplementationClear;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### GetState\_IsTrivial method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_IsTrivial : Boolean;  
__Description__  
This function determines whether the mapping is trivial or not\. Basically the mapping is trivial if there is no other possible mappings\. For example if there is only 1 schematic pin and one PCB pad then the map is trivial\.  
This function is used by the IsTrivial property\.  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### GetState\_Designators\_Implementation\_AsString method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designators\_Implementation\_AsString : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface