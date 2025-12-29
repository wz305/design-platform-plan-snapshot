### IRoom Interface

__Overview__  
The IRoom interface is a PCB room object\. A room is controlled by the room design rule\. This room serves as a boundary constraint for a group of specified components as a component or channel class\.

__IRoom methods__  
DM\_LX  
DM\_LY  
DM\_HX  
DM\_HY  
DM\_RoomName  
DM\_Scope1Expression  
DM\_Layer

__IRoom properties__

#### Methods

##### DM\_HX method

\(IRoom interface\)  
__Syntax__  
Function DM\_HX : Integer;  
__Description__  
Returns the higher X coordinate of the room object\.  
__Example__  
__See also__  
IRoom interface

##### DM\_HY method

\(IRoom interface\)  
__Syntax__  
Function DM\_HY : Integer;  
__Description__  
Returns the higher Y coordinate of the room object\.  
__Example__  
__See also__  
IRoom interface

##### DM\_Layer method

\(IRoom interface\)  
__Syntax__  
Function DM\_Layer : Integer;  
__Description__  
Returns the PCB Layer value of the room object that it is on\.  
__Example__  
__See also__  
IRoom interface

##### DM\_LX method

\(IRoom interface\)  
__Syntax__  
Function DM\_LX : Integer;  
__Description__  
Returns the lower X coordinate of the room object\.  
__Example__  
__See also__  
IRoom interface

##### DM\_LY method

\(IRoom interface\)  
__Syntax__  
Function DM\_LY : Integer;  
__Description__  
Returns the lower Y coordinate of the room object\.  
__Example__  
__See also__  
IRoom interface

##### DM\_RoomName method

\(IRoom interface\)  
__Syntax__  
Function DM\_RoomName : WideString;  
__Description__  
The function returns the room name\.  
__Example__  
__See also__  
IRoom interface

##### DM\_Scope1Expression method

\(IRoom interface\)  
__Syntax__  
Function DM\_Scope1Expression : WideString;  
__Description__  
The function returns the scope 1 expression which describes the scope of this room object\.  
__Example__  
__See also__  
IRoom interface