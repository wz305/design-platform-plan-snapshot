#### <a id="IPCB_DielectricObject_properties"></a>IPCB\_DielectricObject properties

##### Name property

\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.

##### UsedByPrims property

\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.

##### DielectricMaterial property

__Syntax__  
Property  DielectricMaterial : TPCBString;  
__Read/Write syntax__  
GetState\_DielectricMaterial;  
SetState\_DielectricMaterial;  
__Description__  
The DielectricMaterial property determines the dielectric material type for the current dielectric layer, such as FR\-4, Solder Resist, Polyamide etc\.

##### DielectricType property

__Syntax__  
Property  DielectricType : TDielectricType;  
__Read/Write syntax__  
GetState\_DielectricType;  
SetState\_DielectricType;  
__Description__  
The DielectricType property determines the dielectric type for the current dielectric layer\. It returns a TDielectricType type string such as eCore or ePrePreg \(or a type number equivalent\)\.

##### DielectricConstant property

__Syntax__  
Property  DielectricConstant : TReal;  
__Read/Write syntax__  
GetState\_DielectricConstant;  
SetState\_DielectricConstant;  
__Description__  
The DielectricConstant property defines the dielectric constant rating for the current dielectric layer\.

##### DielectricHeight property

__Syntax__  
Property  DielectricHeight : TCoord  
__Read/Write syntax__  
GetState\_DielectricHeight;  
SetState\_DielectricHeight;  
__Description__  
The DielectricHeight property determines the dielectric material height \(thickness\) of the current dielectric layer in Tcood units\.

### <a id="IPCB_SolderMaskLayer"></a>IPCB\_SolderMaskLayer

Inherits all methods and properties from the IPCB\_DielectricLayer interface, which inherits from the [IPCB\_DielectricObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DielectricObject) interface\.

### <a id="IPCB_OverlayLayer"></a>IPCB\_OverlayLayer

Inherits all methods and properties from the [IPCB\_LayerObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject) interface\.

### <a id="IPCB_PasteMaskLayer"></a>IPCB\_PasteMaskLayer

Inherits all methods and properties from the [IPCB\_LayerObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject) interface\.

### <a id="IPCB_SignalLayer"></a>IPCB\_SignalLayer

The IPCB\_SignalLayer interface represents a signal layer in the layer stack for a PCB document\.

The IPCB\_SignalLayer interface inherits methods and properties from the IPCB\_ElectricalLayer and IPCB\_LayerObject\.

__Methods and properties__

__IPCB\_SignalLayer methods__

__IPCB\_SignalLayer properties__

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
ComponentPlacement

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