#### Properties

##### LineStyle property

\(ISch\_Polyline interface\)  
__Syntax__  
Property LineStyle : TLineStyle Read GetState\_LineStyle Write SetState\_LineStyle;  
__Description__  
__Example__  
__See also__  
ISch\_Polyline interface

### <a id="ISch_Port_Interface"></a>ISch\_Port Interface

__Overview__  
A port is used to connect a net on one sheet to Ports with the same name on other sheets\.  Ports can also connect from child sheets to Sheet entries, in the appropriate sheet symbol on the parent sheet\.

The port cross referencing information for ports on different schematics linked to sheet entries of a sheet symbol can be added to schematic sheets by executing the Reports » Port Cross Reference » Add To Sheet or Add to Project command within Schematic Editor in Altium Designer\.  
__Notes__  
To obtain the cross reference field of a port, the design project needs to be compiled first and then port cross\-referencing information added to the project or the sheet\.

Port cross references are a calculated attribute of ports, they can not be edited and are not stored with the design\.

The location of each port reference is determined by the location of the port on the sheet and the position of the connecting wire\.

The CrossReference property returns the name of the sheet the port is linked to and the grid where the port is located at\. __Example__ : 4 Port Serial Interface \[3C\]\.

The ISch\_Port hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_ParametrizedGroup  
        ISch\_Port

__ISch\_Port methods__  
SetState\_Name  
SetState\_Style  
SetState\_IOType  
SetState\_Alignment  
SetState\_TextColor  
SetState\_Width  
SetState\_CrossRef  
SetState\_UniqueId  
SetState\_ConnectedEnd  
SetState\_OverrideDisplayString  
GetState\_Name  
GetState\_Style  
GetState\_IOType  
GetState\_Alignment  
GetState\_TextColor  
GetState\_Width  
GetState\_CrossRef  
GetState\_UniqueId  
GetState\_ConnectedEnd  
GetState\_OverrideDisplayString  
IsVertical

__ISch\_Port properties__  
Name  
Style  
IOType  
Alignment  
TextColor  
Width  
CrossReference  
UniqueId  
ConnectedEnd  
OverrideDisplayString

__See also__  
ISch\_GraphicalObject interface  
ISch\_ParametrizedGroup interface