#### <a id="IPCB_LayerObject_V7_properties"></a>IPCB\_LayerObject\_V7 properties

##### Name property

__Syntax__  
Property  Name : TPCBString;  
__Read/Write syntax__  
GetState\_Name;  
SetState\_Name;  
__Description__  
The Name property returns a string representing the current layer object name\.

##### UsedByPrims property

__Syntax__  
Property  UsedByPrims : Boolean;  
__Read/Write syntax__  
GetState\_UsedByPrims;  
SetState\_UsedByPrims;  
__Description__  
The UsedByPrims property indicates whether the layer object is used by primitives\.

##### CopperThickness property

__Syntax__  
Property  CopperThickness : Tcoord;  
__Read/Write syntax__  
GetState\_CopperThickness;  
SetState\_CopperThickness;  
__Description__  
The CopperThickness property returns \(or sets\) the copper thickness for the current layer object as a Tcood value type\. If needed, use the value conversion methods such as CoodToMils to change the value type\.

##### IsDisplayed property

__Syntax__  
Property  IsDisplayed \[Board : IPCB\_Board\] : Boolean  
__Read/Write syntax__  
GetState\_IsDisplayed;  
SetState\_IsDisplayed;  
__Description__  
The IsDisplayed property returns the display state \(on/off\) of the layer object, as determined by the nominated board interface, Board\. See line 18 in the V6\_LayerID method example above\.

### <a id="IPCB_MechanicalLayer"></a>IPCB\_MechanicalLayer

__Overview__  
Altium Designer offers 32 general purpose mechanical layers for defining the board layout, placing dimensions on, including fabrication details on, or any other mechanical details the design requires\.

Mechanical layers can be obtained by iterating though the layers on a PCB document, and once a layer is determined as mechanical, the layer can be wrapped as a IPCB\_MechanicalLayer interface\.

The LayerObject function from the IPCB\_LayerStack interface \(or the LayerObject property from the IPCB\_LayerStack\_V7 interface\) can be used to fetch all layers using a loop\.  
  
The IPCB\_MechanicalLayer interface inherits layers and properties from the IPCB\_LayerObject interface\.

__Methods and properties__

[__IPCB\_MechanicalLayer methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_MechanicalLayer methods)

[__IPCB\_MechanicalLayer properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_MechanicalLayer properties)

I\_ObjectAddress  
IsInLayerStack  
V6\_LayerID  
V7\_LayerID  
LayerStack  
^ Above methods inherited from IPCB\_LayerObject

Name  
UsedByPrims  
^ Above methods inherited from IPCB\_LayerObject  
MechanicalLayerEnabled  
DisplayInSingleLayerMode  
LinkToSheet

__Example__

01

Procedure EnabledMechLayers;

02

Var

03

   Board      : IPCB\_Board;

04

   Stack      : IPCB\_LayerStack;

05

   mLyrObj    : IPCB\_MechanicalLayer;

06

   Lyr        : TLayer;

07

 

08

Begin

09

   Board := PCBServer\.GetCurrentPCBBoard;

10

   Stack := Board\.LayerStack;

11

 

12

   for Lyr := eMechanical1 to eMechanical16 do

13

   begin

14

      mLyrObj := Stack\.LayerObject\[Lyr\];

15

      If mLyrObj\.MechanicalLayerEnabled then ShowInfo\(mLyrObj\.Name\);

16

   end;

17

End;