### <a id="ISch_Sheet_Interface"></a>ISch\_Sheet Interface

__Overview__  
The ISch\_Sheet interface represents an existing schematic document open in Altium Designer\. A schematic document can have bus and wiring connections which are represented by the IConnectionsArray interface\.

- You can modify or set the document's preference settings\.
- You can iterate design objects in a Schematic or library document, see ISch\_Iterator interface for details\.
- You can invoke the ChooseLocationInteractively or ChooseRectangleInteractively methods to obtain coordinates from the Schematic sheet or library sheet\.
- You can create a library from a project that has components
- You can check whether objects exist on a particular point on a schematic or library document\.

__Notes__  
The ISch\_Sheet interface hierarchy is as follows;  
ISch\_BasicContainer  
    ISch\_GraphicalObject  
        ISch\_ParameterizedGroup  
        ISch\_Document  
            ISch\_Sheet

__ISch\_Sheet methods__  
GetState\_WireConnections  
GetState\_BusConnections  
OptimizeUseOfPolylines  
GetState\_HarnessDefinitionsChanged  
Reset\_HarnessDefinitionsChanged  
Raise\_HarnessDefinitionsChanged

__ISch\_Sheet properties__  
WireConnections  
BusConnections  
HarnessDefinitionsChanged

__See also__  
ISch\_Document interface  
ISch\_Lib interface

#### ISch\_Sheet Methods

##### GetState\_BusConnections method

\(ISch\_Sheet interface\)  
__Syntax__  
Function GetState\_BusConnections : IConnectionsArray;  
__Description__  
This function fetches the connections of the busses on a schematic document\. This method is used in the BusConnections property\.  
__Example__  
__See also__  
ISch\_Sheet interface

##### GetState\_WireConnections method

\(ISch\_Sheet interface\)  
__Syntax__  
Function GetState\_WireConnections : IConnectionsArray;  
__Description__  
This function fetches the connections of the wires on a schematic document\. This method is used in the WireConnections property\.  
__Example__  
__See also__  
ISch\_Sheet interface

##### OptimizeUseOfPolylines method

\(ISch\_Sheet interface\)  
__Syntax__  
Procedure OptimizeUseOfPolylines;  
__Description__  
This procedure forces the optimal connection of polylines graphically and in the datastructure\.  
__Example__  
__See also__  
ISch\_Sheet interface

##### GetState\_HarnessDefinitionsChanged

\(ISch\_Sheet interface\)  
__Syntax__  
Function  GetState\_HarnessDefinitionsChanged : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Sheet interface

##### Reset\_HarnessDefinitionsChanged

\(ISch\_Sheet interface\)  
__Syntax__  
Procedure Reset\_HarnessDefinitionsChanged;    
__Description__  
__Example__  
__See also__  
ISch\_Sheet interface

##### Raise\_HarnessDefinitionsChanged

\(ISch\_Sheet interface\)  
__Syntax__  
Procedure Raise\_HarnessDefinitionsChanged;  
__Description__  
__Example__  
__See also__  
ISch\_Sheet interface

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