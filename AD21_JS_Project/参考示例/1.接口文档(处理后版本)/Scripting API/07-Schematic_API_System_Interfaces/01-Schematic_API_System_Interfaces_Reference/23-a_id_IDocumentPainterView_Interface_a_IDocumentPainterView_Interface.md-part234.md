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

### <a id="IRule_Interface"></a>IRule Interface

__Overview__  
The IRule interface represents the one of the rules attached to a parameter within the PCB Layout directive \(as a Parameter Set object with a small flag symbol\) on a net aware object on a schematic object\. A parameter set object can be placed on the schematic sheet by the Place » Directives » PCB Layout menu item\.

This PCB Layout directive allows you to assign PCB layout information to a net in the schematic\. When a PCB is created from the schematic, the information in the PCB layout directive is used to create relevant PCB design rules\.

__IRule methods__  
DM\_RuleKind  
DM\_Scope1Expression  
DM\_Scope2Expression  
DM\_MaxWidth  
DM\_MinWidth  
DM\_PreferedWidth  
DM\_ViaHole  
DM\_ViaWidth  
DM\_MinViaHole  
DM\_MaxViaHole  
DM\_MinViaWidth  
DM\_MaxViaWidth  
DM\_ViaStyle  
DM\_Topology  
DM\_Priority  
DM\_RoutingLayers  
DM\_Attributes  
DM\_Description  
DM\_RuleName  
DM\_UniqueId

__IRule properties__