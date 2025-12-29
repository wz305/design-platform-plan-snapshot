#### <a id="IPCB_LayerStack_V7_properties"></a>IPCB\_LayerStack\_V7 properties

##### Board property

__Syntax__  
Property Board : IPCB\_Board;  
__Read syntax__  
GetState\_Board;  
__Description__  
This property returns the PCB document, represented by the IPCB\_Board interface, associated with the layer stack\.

##### LayerObject property

__Syntax__  
Property  LayerObject \[L : TV6\_Layer\] : IPCB\_LayerObject\_V7;  
__Read syntax__  
GetState\_LayerObject;  
__Description__  
The LayerObject property retrieves the layer object interface for the specified layer L of the TV6\_TLayer type\. It is a read only property\. See the InsertLayer method example above\.  
__Notes__  
In scripting TLayer is generally equivalent to TV6\_Layer, so in the above syntax for example, a specified type of eBottomLayer will producuce the same result as eV6\_BottomLayer\.

##### LayerObject\_V7 property

__Syntax__  
Property  LayerObject\_V7 \[L : TLayer\] : IPCB\_LayerObject\_V7;  
__Read syntax__  
GetState\_LayerObject\_V7;  
__Description__  
The LayerObject\_V7 property retrieves the layer object interface for the specified layer L of TLayer type\. It is a read only property\.  
__Example__

01

// Returns Bottom Layer \(layer  32\) from stack\.

02

 

03

Procedure FetchBottomLayer;

04

Var

05

   Board      : IPCB\_Board;

06

   Stack      : IPCB\_LayerStack\_V7;

07

   LyrObj     : IPCB\_LayerObject\_V7;

08

 

09

Begin

10

   Board := PCBServer\.GetCurrentPCBBoard;

11

   Stack := Board\.LayerStack\_V7;

12

 

13

   LyrObj := Stack\.LayerObject\_V7\(32\);

14

   ShowInfo\(Layer2String\(LyrObj\.LayerID\)\);

15

End;

##### DielectricBottom property

__Syntax__  
Property  DielectricBottom : IPCB\_DielectricObject;  
__Read syntax__  
GetState\_DielectricBottom;  
__Description__  
This property returns the IPCB\_DielectricObject interface associated with the dielectric information for the bottom layer of the layer stack\.

##### DielectricTop property

__Syntax__  
Property  DielectricTop : IPCB\_DielectricObject;  
__Read syntax__  
GetState\_DielectricTop;  
__Description__  
This property returns the IPCB\_DielectricObject interface associated with the dielectric information for the top layer of the layer stack\.

##### ShowDielectricBottom property

__Syntax__  
Property  ShowDielectricBottom : Boolean  
__Read/Write syntax__  
GetState\_ShowBotDielectric  
SetState\_ShowBotDielectric;  
__Description__  
This property enables or disables the dielectric layer for the bottom layer\.

##### ShowDielectricTop property

__Syntax__  
Property  ShowDielectricTop : Boolean  
__Read/Write syntax__  
GetState\_ShowTopDielectric  
SetState\_ShowTopDielectric;  
__Description__  
This property enables or disables the dielectric layer for the top layer\.

 

# PCB API Layer Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [PCB API Layer Interfaces for version 22](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- PCB API](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

The PCB API Layer Interfaces reference covers the following interfaces and content:

- [IPCB\_LayerObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject)
- [IPCB\_LayerObject\_V7](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject_V7)
- [IPCB\_MechanicalLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_MechanicalLayer)
- [IPCB\_DielectricLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DielectricLayer)
- [IPCB\_DielectricObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DielectricObject)
- [IPCB\_SolderMaskLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_SolderMaskLayer)
- [IPCB\_OverlayLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_OverlayLayer)
- [IPCB\_PasteMaskLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_PasteMaskLayer)
- [IPCB\_SignalLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_SignalLayer)
- [IPCB\_InternalPlane](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_InternalPlane)
- [IPCB\_InternalPlane\_V7](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_InternalPlane_V7)
- [IPCB\_DrillLayerPair](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DrillLayerPair)
- [IPCB\_MechanicalLayerPairs](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_MechanicalLayerPairs)

See also:

[PCB API Layer Stack Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21)

[PCB API System Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21)

__Interface inheritance map:__

IPCB\_LayerObject  
\.  IPCB\_MechanicalLayer  
\.  IPCB\_PhysicalLayer  
\.  \.  IPCB\_ElectricalLayer  
\.  \.  \.  IPCB\_LayerObject\_V7  
\.  \.  \.  IPCB\_SignalLayer  
\.  \.  \.  IPCB\_InternalPlane  
\.  \.  \.  \.  IPCB\_InternalPlane\_V7  
\.  \.  IPCB\_DielectricLayer  
\.  \.  \.  IPCB\_DielectricObject  
\.  \.  \.  IPCB\_SolderMaskLayer  
\.  \.  IPCB\_OverlayLayer  
\.  \.  IPCB\_PasteMaskLayer  
\.  
IPCB\_DrillLayerPair  
IPCB\_MechanicalLayerPairs

### <a id="IPCB_LayerObject"></a>IPCB\_LayerObject

__Overview__  
The IPCB\_LayerObject interface represents a layer used in a PCB document\. Each layer has properties such as layer name and used by primitive, for example\.

This interface is returned by the LayerObject function in the IPCB\_LayerStack interface, and is property in the IPCB\_LayerStack\_V7 interface\.

__Methods and properties:__

[__IPCB\_LayerObject methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)

[__IPCB\_LayerObject properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)

I\_ObjectAddress  
IsInLayerStack  
V6\_LayerID  
V7\_LayerID  
LayerStack

Name  
UsedByPrims