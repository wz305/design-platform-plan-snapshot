#### IConnection GetState and SetState Methods

##### GetState\_Location method

\(ISch\_Connection interface\)  
__Syntax__  
Function GetState\_Location : TLocation;  
__Description__  
The GetState\_Location method retrieves the X,Y location of the wire or bus connection on the schematic document\. This method is used by the Location property\.  
__See also__  
ISch\_Connection interface  
Location Property and Example  
TLocation type

##### GetState\_ObjectsCount method

\(ISch\_Connection interface\)  
__Syntax__  
Function GetState\_ObjectsCount  
__Description__  
The GetState\_ObjectsCount method reports the number of wire or bus connections at a location on the schematic sheet\.  
__See also__  
ISch\_Connection interface  
ObjectsCount Property and Example

##### GetState\_Location method

\(ISch\_Connection interface\)  
__Syntax__  
Function  GetState\_IsManualJunction  : Boolean;  
__Description__  
The GetState\_IsManualJunction function determines whether the connection has a manual junction or not\.  
__See also__  
ISch\_Connection interface  
Location property and example

##### SetState\_Location method

\(ISch\_Connection interface\)  
__Syntax__  
Procedure SetState\_Location \(AValue : TLocation\);  
__Description__  
The procedure adds a location to the IConnection object\.  
__See also__  
ISch\_Connection interface

##### SetState\_ObjectsCount method

\(ISch\_Connection interface\)  
__Syntax__  
Procedure SetState\_ObjectsCount \(AValue : Integer\);  
__Description__  
This procedure sets the objects count for the IConnection object\.  
__See also__  
ISch\_Connection interface

##### SetState\_IsManualJunction method

\(ISch\_Connection interface\)  
__Syntax__  
Procedure SetState\_IsManualJunction\(AValue : Boolean\);  
__Description__  
This procedure sets the IsManualJunction Boolean setting for the IConnection object\.  
__See also__  
ISch\_Connection interface