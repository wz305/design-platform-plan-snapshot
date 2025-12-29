#### ISch\_Sheet Properties

##### BusConnections property

\(ISch\_Sheet interface\)  
__Syntax__  
Property BusConnections : IConnectionsArray Read GetState\_BusConnections;  
__Description__  
This property fetches the connections of busses on the schematic document\. This property is supported by the GetState\_BusConnections method\.  
__Example__  
__See also__  
ISch\_Sheet interface

##### WireConnections property

\(ISch\_Sheet interface\)  
__Syntax__  
Property WireConnections : IConnectionsArray Read GetState\_WireConnections;  
__Description__  
This property fetches the connections of wires on the schematic document\. This property is supported by the GetState\_WireConnections method\.  
__Example__  
__See also__  
ISch\_Sheet interface

##### HarnessDefinitionsChanged property

\(ISch\_Sheet interface\)  
__Syntax__  
Property HarnessDefinitionsChanged : Boolean Read GetState\_HarnessDefinitionsChanged;  
__Description__  
This property is supported by the GetState\_HarnessDefinitionsChanged method\.  
__Example__  
__See also__  
ISch\_Sheet interface

### <a id="ISch_Lib_Interface"></a>ISch\_Lib Interface

__Overview__  
This interface represents an existing library document open in Altium Designer\. A library is composed of library pages and each page represents the symbol \(schematic library component\)\.

- You can modify or set the document's preference settings\.
- You can invoke the ChooseLocationInteractively or ChooseRectangleInteractively methods to obtain coordinates from the Schematic sheet or library sheet\.
- You can check whether objects exist on a particular point on a schematic or library document\.
- You can iterate design objects in a library document, with the library iterator\. This iterator is created by the SchLibIterator\_Create function\.
- You can invoke the LibIsEmpty method to check if the library is empty \(ie no symbols in the library\) or not\.

__Notes__  
Due to the nature of a library document, all symbols \(library components\) are displayed on their library pages, so you iterate through the library to fetch symbols\.

The ISch\_Lib interface hierarchy is as follows;  
ISch\_BasicContainer  
    ISch\_GraphicalObject  
        ISch\_ParameterizedGroup  
            ISch\_Document  
                ISch\_Lib

__ISch\_Lib methods__  
AddSchComponent  
LibIsEmpty  
RemoveSchComponent  
Sch\_LibraryRuleChecker\_Create  
Sch\_LibraryRuleChecker\_Destroy  
SchLibIterator\_Create  
TransferComponentsPrimitivesBackFromEditor  
TransferComponentsPrimitivesToEditor  
GetState\_Current\_SchComponent  
GetState\_CurrentSchComponentDisplayMode  
GetState\_CurrentSchComponentPartId  
GetState\_Description  
GetState\_ShowHiddenPins  
SetState\_Current\_SchComponent  
SetState\_CurrentSchComponentAddDisplayMode  
SetState\_CurrentSchComponentAddPart  
SetState\_CurrentSchComponentDisplayMode  
SetState\_CurrentSchComponentPartId  
SetState\_CurrentSchComponentRemoveDisplayMode  
SetState\_CurrentSchComponentRemovePart  
SetState\_Description  
SetState\_ShowHiddenPins

__ISch\_Lib properties__  
CurrentSchComponent  
Description  
ShowHiddenPins

__See also__  
ISch\_Iterator interface  
ILibCompInfoReader interface  
IComponentINfo interface