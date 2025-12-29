# <a id="IServerModel_Interface"></a>IServerModel Interface

__Overview__  
The IServerModel interface represents the model set up by the server to be used by the integrated library server\.

__IServerModel Methods and Properties Table__

__IServerModel methods__  
Name  
PortCount  
PortName  
AddPort  
CheckSchPins  
CheckModelPins

__IServerModel properties__  
PortNames

__See also__  
IModelEditor interface



\(IServerModel interface\)  
__Syntax__  
Procedure AddPort \(AName : PChar\);  
__Description__  
__See also__  
IServerModel interface


\(IServerModel interface\)  
__Syntax__  
Function Name : PChar;  
__Description__  
The function gives the name for the Server Model\.  
__See also__  
IServerModel interface


\(IServerModel interface\)  
__Syntax__  
Function PortName \(AnIndex : Integer\) : PChar;  
__Description__  
__Example__  
__See also__  
IServerModel interface


\(IServerModel interface\)  
__Syntax__  
Function PortCount : Integer;  
__Description__  
This function returns the number of ports for this Server Model\.  
__See also__  
IServerModel interface


\(IServerModel interface\)  
__Syntax__  
Function CheckSchPins : Boolean  
__Description__  
__Example__  
__See also__  
IServerModel interface


\(IServerModel interface\)  
__Syntax__  
Function CheckModelPins : Boolean;  
__Description__  
__Example__  
__See also__  
IServerModel interface



\(IServerModel interface\)  
__Syntax__  
Property PortNames\[AnIndex : Integer\] : PChar Read PortName;  
__Description__  
__Example__  
__See also__  
IServerModel interface

## 子章节

- [<a id="IServerModel_Methods"></a>IServerModel Methods](01-a_id_IServerModel_Methods_a_IServerModel_Methods.md.md)
- [<a id="IServerModel_Properties"></a>IServerModel Properties](02-a_id_IServerModel_Properties_a_IServerModel_Properties.md.md)
