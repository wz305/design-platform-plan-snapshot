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

#### <a id="IPCB_MechanicalLayer_methods"></a>IPCB\_MechanicalLayer methods

##### I\_ObjectAddress method

\- see [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.

##### IsInLayerStack method

\- see [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.

##### V6\_LayerID method

\- see [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.

##### V7\_LayerID method

\- see [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.

##### LayerStack method

\- see [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.

#### <a id="IPCB_MechanicalLayer_properties"></a>IPCB\_MechanicalLayer properties

##### Name property

\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.

##### UsedByPrims property

\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.

##### MechanicalLayerEnabled property

__Syntax__  
Property  MechanicalLayerEnabled : Boolean;  
__Read/Write syntax__  
GetState\_MechLayerEnabled;  
SetState\_MechLayerEnabled;  
__Description__  
The MechanicalLayerEnabled property determines if this mechanical layer is enabled for the current PCB document\. Mechanical layers that already have design objects on them cannot be disabled\.

##### LinkToSheet property

__Syntax__  
Property  LinkToSheet : Boolean;  
__Read/Write syntax__  
GetState\_LinkToSheet;  
SetState\_LinkToSheet;  
__Description__  
This property determines if this mechanical layer is linked to the sheet on the PCB document\. Once a sheet is linked to the mechanical layer, the sheet is automatically resized to fit the objects on the linked layer when a zoom command is executed\.

##### DisplayInSingleLayerMode property

__Syntax__  
Property  DisplayInSingleLayerMode : Boolean;  
__Read/Write syntax__  
GetState\_DisplayInSingleLayerMode;  
SetState\_DisplayInSingleLayerMode;  
__Description__  
This property determines if the document is displayed in the single layer mode\. When set to True the system's single layer mode setting is overridden, so design objects on mechanical layers where the single layer mode is enabled will show up in the single layer mode\.