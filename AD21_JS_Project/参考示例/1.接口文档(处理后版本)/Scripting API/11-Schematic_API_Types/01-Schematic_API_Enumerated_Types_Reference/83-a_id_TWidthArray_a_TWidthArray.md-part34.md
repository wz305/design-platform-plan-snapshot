#### <a id="IPCB_LayerStack_properties"></a>IPCB\_LayerStack properties

##### Name property

__Syntax__  
Property  Name : TPCBString;  
__Read/Write syntax__  
GetState\_Name;  
SetState\_Name;  
__Description__  
The Name property returns a string representing the current layer name\.

##### IsFlex property

__Syntax__  
Property  IsFlex : Boolean;  
__Read/Write syntax__  
GetState\_IsFlex  
SetState\_IsFlex;  
__Description__  
The IsFlex property is True if the layer is designated as Flex, or False for a Rigid layer\.

##### ShowDielectricTop property

__Syntax__  
Property  ShowDielectricTop : Boolean;  
__Read/Write syntax__  
GetState\_ShowTopDielectric;  
SetState\_ShowTopDielectric;  
__Description__  
This property enables or disables the dielectric layer for the top solder layer\.

##### ShowDielectricBottom property

__Syntax__  
Property  ShowDielectricBottom : Boolean  
__Read/Write syntax__  
GetState\_ShowBotDielectric;  
SetState\_ShowBotDielectric;  
__Description__  
This property enables or disables the dielectric layer for the bottom layer\.

### <a id="IPCB_LayerStack_V7"></a>IPCB\_LayerStack\_V7

__Overview__  
Both the IPCB\_LayerStack\_V7 and IPCB\_LayerStack interfaces represent the layer stack for the current PCB document, but offer different sets of methods and properties where:

- IPCB\_LayerStack caters for PCB designs that make use of the Altium Designer's current Layer and Stack capabilities such as Flex board construction, Layer classes and large layer counts\.
- IPCB\_LayerStack\_V7 offers the methods and properties of the older, now deprecated, version of the IPCB\_LayerStack interface\. In essence, this interface is constrained to copper based layers\.

As an alternative interface to the current IPCB\_LayerStack interface, the IPCB\_LayerStack\_V7 interface therefore offers backward compatibility for legacy scripts\. In most cases just a few interface reference changes in the code should return an older script to a fully functional state\.

Like the IPCB\_LayerStack interface, the IPCB\_LayerStack\_V7 interface is a property within in the IPCB\_Board interface\.

The IPCB\_LayerStack\_V7 interface represents the basic layer stack and therefore only retrieves copper based layers such as top, mids, and bottom layers\. The LayerObject property with a passed TLayer parameter can be used to obtain any PCB layer for the PCB document\.

To query or iterate through existing copper layers \(signal layers etc\) within the layer stack, the interface's FirstLayer and NextLayer properties can be used \- along with the PreviousLayer and LastLayer methods where needed\.

__Notes__  
Each layer can be represented as a IPCB\_LayerObject, IPCB\_InternalPlane, IPCB\_DrillLayerPair or IPCB\_MechanicalLayerPairs interface\.  
A layer can have dielectric properties which is represented by a IPCB\_DielectricObject interface\.  
To have access to other layers of the PCB document, use the LayerObject property of the IPCB\_LayerStack\_V7 interface\.

[__IPCB\_LayerStack\_V7 methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack_V7 methods)

[__IPCB\_V7\_LayerStack properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack_V7 properties)

FirstLayer  
NextLayer  
PreviousLayer  
LastLayer  
FirstAvailableSignalLayer  
FirstAvailableInternalPlane  
LastInternalPlane  
SignalLayerCount  
InsertLayer  
RemoveFromStack  
InsertInStackBelow  
InsertInStackAbove  
LayersInStackCount  
GetState\_LayerStackStyle  
SetState\_LayerStackStyle

Board  
LayerObject  
LayerObject\_V7  
DielectricBottom  
DielectricTop  
ShowDielectricBottom  
ShowDielectricTop