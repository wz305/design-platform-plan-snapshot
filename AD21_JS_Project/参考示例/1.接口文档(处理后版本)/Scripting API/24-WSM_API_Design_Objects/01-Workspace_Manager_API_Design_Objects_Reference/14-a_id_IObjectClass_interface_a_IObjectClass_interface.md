### <a id="IObjectClass_interface"></a>IObjectClass interface

__Overview__  
The IObjectClass interface is the ancestor object class interface for Channel Class, Component Class and Net Class interfaces\.

__IObjectClass methods__  
DM\_Name  
DM\_MemberCount  
DM\_Members

__IObjectClass properties__

#### Methods

##### DM\_MemberCount method

\(IObjectClass interface\)  
__Syntax__  
Function DM\_MemberCount : Integer;  
__Description__  
The function returns the number of members associated with the object class \(one of its descendants ie Channel Class, Component class or Net class\)\.  
This method is to be used in conjunction with the DM\_Members\(index\) method\.  
__Example__  
__See also__  
IObjectClass interface

##### DM\_Members method

\(IObjectClass interface\)  
__Syntax__  
Function DM\_Members \(Index : Integer\) : WideString;  
__Description__  
The function returns the indexed member of the object class \(one of its descendants that is, a channel class, component class or a net class\)\.  
__Example__  
__See also__  
IObjectClass interface

##### DM\_Name method

\(IObjectClass interface\)  
__Syntax__  
Function DM\_Name : WideString;  
__Description__  
The function returns the name of the Object class \(one of its descendants ie Channel Class, Component class or Net class\)  
__Example__  
__See also__  
IObjectClass interface