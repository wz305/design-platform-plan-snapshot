### <a id="IRoom_Interface"></a>IRoom interface

__Overview__  
The IRoom interface is a PCB room object\. A room is controlled by the room design rule\. This room serves as a boundary constraint for a group of specified components as a component or channel class\.  
__Interface Methods__

__Method__

__Description__

Function    DM\_LX : Integer;

Returns the lower X coordinate of the room object\.

Function    DM\_LY : Integer;

Returns the lower Y coordinate of the room object\.

Function    DM\_HX : Integer;

Returns the higher X coordinate of the room object\.

Function    DM\_HY : Integer;

Returns the higher Y coordinate of the room object\.

Function    DM\_RoomName : WideString;

Returns the name of this room object\.

Function    DM\_Scope1Expression : WideString;

Returns the scope 1 expression which describes the scope of this room object\.

Function    DM\_Layer : Integer;  

Returns the PCB layer where the room resides on\.