### <a id="IPCB_InternalPlane"></a>IPCB\_InternalPlane

__Overview__  
This IPCB\_InternalPlane interface represents an internal copper plane used on a PCB document\. 16 internal planes are supported, A net can be assigned to each of these layers, or a number of nets can share a power plane by splitting it into two or more isolated areas \(a Split Plane\)

Pad and via connections to power planes are controlled by the Plane design rules\.

The IPCB\_InternalPlane interface is used by the IPCB\_LayerStack\_V7 interface \- the LastInternalPlane and FirstAvailableInternalPlane methods\. IPCB\_InternalPlane inherits methods and properties from the IPCB\_ElectricalLayer and IPCB\_LayerObject interfaces\.

__Methods and properties__

[__IPCB\_InternalPlane methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_InternalPlane methods)

[__IPCB\_InternalPlane properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_InternalPlane properties)

I\_ObjectAddress  
IsInLayerStack  
V6\_LayerID  
V7\_LayerID  
LayerStack  
^ Above methods inherited from IPCB\_LayerObject

Name  
UsedByPrims  
^ Above methods inherited from IPCB\_LayerObject  
CopperThickness  
^ Above method inherited from IPCB\_ElectricalLayer  
PullBackDistance  
NetName

#### <a id="IPCB_InternalPlane_methods"></a>IPCB\_InternalPlane methods

All methods inherited from the IPCB\_LayerObject interface\. See [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.

#### <a id="IPCB_InternalPlane_properties"></a>IPCB\_InternalPlane properties

##### Name property

\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.

##### UsedByPrims property

\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.

##### CopperThickness property

__Syntax__  
Property  CopperThickness : Tcoord;  
__Read/Write syntax__  
GetState\_CopperThickness;  
SetState\_CopperThickness;  
__Description__  
The CopperThickness property returns \(or sets\) the copper thickness for the current layer object as a Tcood value type\. If needed, use the value conversion methods such as CoodToMils to change the value type\.

##### PullBackDistance property

__Syntax__  
Property  PullBackDistance : TCoord;  
__Read/Write syntax__  
GetState\_PullBackDistance;  
SetState\_PullBackDistance;  
__Description__  
The PullBackDistance property returns \(or sets\) the internal plane copper pullback distance, as a Tcood value type, for the current layer object\.

##### NetName property

__Syntax__  
Property  NetName : TPCBString;  
__Read/Write syntax__  
GetState\_NetName;  
SetState\_NetName;  
__Description__  
The NetName property is a string value that defines the net name for the current internal plane layer object\.