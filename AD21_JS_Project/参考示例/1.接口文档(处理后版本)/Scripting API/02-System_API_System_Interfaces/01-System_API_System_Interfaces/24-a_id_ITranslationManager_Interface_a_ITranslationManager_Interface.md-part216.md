#### IConnectionsArray Methods

##### AddConnectionXY method

\(IConnectionsArray interface\)  
__Syntax__  
Procedure AddConnectionXY\(X, Y : TCoord\);  
__Description__  
This procedure adds a connection with X,Y parameters into the IConnectionsArray object\.  
__See also__  
IConnectionsArray interface  
AddConnection method

##### AddConnection method

\(IConnectionsArray interface\)  
__Syntax__  
Procedure AddConnection \(ALocation : TLocation\);  
__Description__  
This procedure adds a connection with a location parameter into the IConnectionsArray object\.  
__See also__  
IConnectionsArray interface  
AddConnectionXY method

##### GetConnectionAt method

\(IConnectionsArray interface\)  
__Syntax__  
Function GetConnectionAt\(ALocation : TLocation\) : IConnection;  
__Description__  
This function retrieves the connection of IConnection type based on the Location parameter\.  
__Example__

1

Connection :=  Connections\.GetConnectionAt\(ALocation\);

2

If Connection <> Nil Then ShowMessage\(IntToStr\(Connection\.ObjectsCount\)\);

__See also__  
IConnectionsArray interface

##### GetState\_Connection method

\(IConnectionsArray interface\)  
__Syntax__  
Function GetState\_Connection\(Index : Integer\) : IConnection;  
__Description__  
This function retrieves the indexed connection of IConnection type from the IConnectionsArray interface\.  
__Example__

1

For J := 0 To TheBusConnections\.GetState\_ConnectionsCount \- 1 Do

2

Begin

3

    BusConnection := TheBusConnections\.GetState\_Connection\(J\); //IConnection

4

    If BusConnection <> Nil Then

5

    Begin

6

        // statements here

7

    End; 

8

End;

__See also__  
IConnectionsArray interface  
Connection property

##### GetState\_ConnectionsCount method

\(IConnectionsArray interface\)  
__Syntax__  
Function GetState\_ConnectionsCount : Integer;  
__Description__  
This function returns the number of connections for wires or buses on the schematic sheet\. For each  
__Example__

1

For J := 0 To TheBusConnections\.GetState\_ConnectionsCount \- 1 Do

2

Begin

3

    BusConnection := TheBusConnections\.GetState\_Connection\(J\); //IConnection

4

    If BusConnection <> Nil Then

5

    Begin

6

        // statements here

7

    End; 

8

End;

__See also__  
IConnectionsArray interface  
ConnectionsCount property

##### GraphicallyInvalidate method

\(IConnectionsArray interface\)  
__Syntax__  
Procedure GraphicallyInvalidate;  
__Description__  
This procedure puts the group of design objects \(bus or wire objects in an connection array\) in an invalid state\. A redraw is required to update the schematic sheet\.  
__Example__

1

TheWireConnections\.GraphicallyInvalidate; 

2

// puts the wires part of the connection group in an invalid state that requires a graphical redraw

__See also__  
IConnectionsArray interface

##### RemoveAllConnectionsAt method

\(IConnectionsArray interface\)  
__Syntax__  
Function RemoveAllConnectionsAt\(ALocation : TLocation\) : Boolean;  
__Description__  
This function removes all connections at this specified location on the schematic document\.  
__Example__

1

If BusConnection\.ObjectsCount > 1 Then

2

    TheBusConnections\.RemoveAllConnectionsAt\(BusConnection\.Location\); 

3

// BusConnection = IConnection type, TheBusConnections = IConnectionsArray type

__See also__  
IConnectionsArray interface

##### RemoveAllConnectionsForLine method

\(IConnectionsArray interface\)  
__Syntax__  
Function RemoveAllConnectionsForLine\(L1, L2 : TLocation\) : Boolean;  
__Description__  
This function removes all connections for the specified line with L1 and L2 parameters\. If the call was successful, a true value is returned\. The Connections can either represent bus or wire connections\.  
__See also__  
IConnectionsArray interface

##### ResetAllConnections method

\(IConnectionsArray interface\)  
__Syntax__  
Procedure ResetAllConnections;  
__Description__  
This procedure resets all connections \(frees all items\) in the IConnectionsArray interface for either wire or bus connections\.  
__Example__

1

TheBusConnections\.ResetAllConnections;

2

//TheBusConnections = IConnectionsArray type

__See also__  
IConnectionsArray interface