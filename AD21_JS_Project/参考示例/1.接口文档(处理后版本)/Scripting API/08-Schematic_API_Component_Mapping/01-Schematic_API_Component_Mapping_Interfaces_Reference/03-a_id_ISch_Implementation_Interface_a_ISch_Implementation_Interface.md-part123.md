#### <a id="IPCB_LayerObject_properties"></a>IPCB\_LayerObject properties

##### Name property

__Syntax__  
Property  Name : TPCBString;  
__Read/Write syntax__  
GetState\_Name;  
SetState\_Name;  
__Description__  
The Name property returns a string representing the current layer object name\. See line 27 in the V6\_LayerID method example above\.

##### UsedByPrims property

__Syntax__  
Property  UsedByPrims : Boolean;  
__Read/Write syntax__  
GetState\_UsedByPrims;  
SetState\_UsedByPrims;  
__Description__  
The UsedByPrims property indicates whether the layer object is used by primitives\.

### <a id="IPCB_LayerObject_V7"></a>IPCB\_LayerObject\_V7

__Overview__  
The IPCB\_LayerObject\_V7 interface, like the IPCB\_LayerObject interface, represents a layer used in a PCB document\. Each layer has properties such as layer Name and whether it is used by primitives, for example\. This interface is a property of the IPCB\_LayerStack\_V7 interface, and is returned by methods such as FirstLayer and NextLayer\.

The IPCB\_LayerObject\_V7 interface offers the methods and properties of the older, now deprecated, version of the IPCB\_LayerObject interface\.

As an alternative interface to the current IPCB\_LayerObject interface, the IPCB\_LayerObject\_V7 interface therefore offers backward compatibility for legacy scripts\. In most cases just a few interface reference changes in the code should return an older script to a fully functional state\.

The layer stack for a PCB document, when referenced by the IPCB\_LayerStack\_V7 interface, only deals with copper based layers such as signal and internal plane layers\. Each layer in the layer stack can have dielectric information and layer pairs can be specified\. However the LayerObject\_V7 interface can provide access to any layer for the PCB board\.

IPCB\_LayerObject\_V7 inherits methods and properties from the IPCB\_LayerObject and IPCB\_ElectricalLayer interfaces\.

__Methods and properties:__

[__IPCB\_LayerObject\_V7 methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject_V7 methods)

[__IPCB\_LayerObject\_V7 properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject_V7 properties)

I\_ObjectAddress  
IsInLayerStack  
V6\_LayerID  
V7\_LayerID  
LayerStack  
^ Above methods inherited from IPCB\_LayerObject  
Dielectric  
LayerID

Name  
UsedByPrims  
^ Above methods inherited from IPCB\_LayerObject  
CopperThickness  
^ Above method inherited from IPCB\_ElectricalLayer  
IsDisplayed