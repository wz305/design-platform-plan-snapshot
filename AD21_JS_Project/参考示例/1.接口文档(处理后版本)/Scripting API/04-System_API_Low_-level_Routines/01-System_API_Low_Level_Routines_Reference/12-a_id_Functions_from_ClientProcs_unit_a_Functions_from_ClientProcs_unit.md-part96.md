#### Properties

##### Width property

\(ISch\_Pin interface\)  
__Syntax__  
Property Width : Integer Read GetState\_Width Write SetState\_Width ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### OwnerSchComponent method

\(ISch\_Pin interface\)  
__Syntax__  
Function OwnerSchComponent : ISch\_Component;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Orientation property

\(ISch\_Pin interface\)  
__Syntax__  
Property Orientation : TRotationBy90 Read GetState\_Orientation Write SetState\_Orientation ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Name property

\(ISch\_Pin interface\)  
__Syntax__  
Property Name : WideString Read GetState\_Name Write SetState\_Name ;  
__Description__  
The Name property determines the name for the Pin object\. This property is supported by the GetState\_Name and SetState\_Name methods\.  
__Example__  
PinName := Pin\.Name;  
__See also__  
ISch\_Pin interface

##### FullDesignator method

\(ISch\_Pin interface\)  
__Syntax__  
Function FullDesignator : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### FormalType property

\(ISch\_Pin interface\)  
__Syntax__  
Property FormalType : TStdLogicState Read GetState\_FormalType Write SetState\_FormalType ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Designator property

\(ISch\_Pin interface\)  
__Syntax__  
Property Designator : WideString Read GetState\_Designator Write SetState\_Designator ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Description property

\(ISch\_Pin interface\)  
__Syntax__  
Property Description : WideString Read GetState\_Description Write SetState\_Description ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### DefaultValue property

\(ISch\_Pin interface\)  
__Syntax__  
Property DefaultValue : WideString Read GetState\_DefaultValue Write SetState\_DefaultValue ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### UniqueId property

\(ISch\_Pin interface\)  
__Syntax__  
Property UniqueId : WideString Read GetState\_UniqueId Write SetState\_UniqueId ;  
__Description__  
The UniqueID property sets the new ID for the pin\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current sheet symbol\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__

1

UID := WSM\.DM\_GenerateUniqueID; // interface and method from Workspace Manager API\.

2

Pin\.UniqueID\(UID\);

__See also__  
ISch\_Pin interface

##### Symbol\_OuterEdge property

\(ISch\_Pin interface\)  
__Syntax__  
Property Symbol\_OuterEdge : TIeeeSymbol Read GetState\_Symbol\_OuterEdge Write SetState\_Symbol\_OuterEdge;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Symbol\_Outer property

\(ISch\_Pin interface\)  
__Syntax__  
Property Symbol\_Outer : TIeeeSymbol Read GetState\_Symbol\_Outer Write SetState\_Symbol\_Outer ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Symbol\_InnerEdge property

\(ISch\_Pin interface\)  
__Syntax__  
Property Symbol\_InnerEdge : TIeeeSymbol Read GetState\_Symbol\_InnerEdge Write SetState\_Symbol\_InnerEdge;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Symbol\_Inner property

\(ISch\_Pin interface\)  
__Syntax__  
Property Symbol\_Inner : TIeeeSymbol Read GetState\_Symbol\_Inner Write SetState\_Symbol\_Inner ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SwapId\_Pin property

\(ISch\_Pin interface\)  
__Syntax__  
Property SwapId\_Pin : WideString Read GetState\_SwapIdPin Write SetState\_SwapIdPin ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SwapId\_PartPin property

\(ISch\_Pin interface\)  
__Syntax__  
Property SwapId\_PartPin : WideString Read GetState\_SwapIdPartPin Write SetState\_SwapIdPartPin ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SwapId\_Part property

\(ISch\_Pin interface\)  
__Syntax__  
Property SwapId\_Part : WideString Read GetState\_SwapIdPart Write SetState\_SwapIdPart ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### ShowName property

\(ISch\_Pin interface\)  
__Syntax__  
Property ShowName : Boolean Read GetState\_ShowName Write SetState\_ShowName ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### ShowDesignator property

\(ISch\_Pin interface\)  
__Syntax__  
Property ShowDesignator : Boolean Read GetState\_ShowDesignator Write SetState\_ShowDesignator ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### PinLength property

\(ISch\_Pin interface\)  
__Syntax__  
Property PinLength : TCoord Read GetState\_PinLength Write SetState\_PinLength ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### IsHidden property

\(ISch\_Pin interface\)  
__Syntax__  
Property IsHidden : Boolean Read GetState\_IsHidden Write SetState\_IsHidden ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### HiddenNetName property

\(ISch\_Pin interface\)  
__Syntax__  
Property HiddenNetName : WideString Read GetState\_HiddenNetName Write SetState\_HiddenNetName ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Electrical property

\(ISch\_Pin interface\)  
__Syntax__  
Property Electrical : TPinElectrical Read GetState\_Electrical Write SetState\_Electrical ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

### <a id="ISch_Polygon_Interface"></a>ISch\_Polygon Interface

__Overview__  
Polygons are multi\-sided graphical elements\.  The vertices of a polygon object denote the link of lines to describe its outline\.

The ISch\_Polygon interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Polygon interface

__ISch\_Polygon methods__  
SetState\_LineWidth  
SetState\_IsSolid  
SetState\_Vertex  
SetState\_VerticesCount  
SetState\_Transparent  
GetState\_LineWidth  
GetState\_IsSolid  
GetState\_Vertex  
GetState\_VerticesCount  
GetState\_Transparent  
InsertVertex  
RemoveVertex  
ClearAllVertices

__ISch\_Polygon properties__  
IsSolid  
LineWidth  
Vertex  
VerticesCount  
Transparent

__See also__  
ISch\_GraphicalObject interface  
ISch\_Polyline interface  
ISch\_Wire interface  
ISch\_Bus interface  
TLocation values  
TSize enumerated values