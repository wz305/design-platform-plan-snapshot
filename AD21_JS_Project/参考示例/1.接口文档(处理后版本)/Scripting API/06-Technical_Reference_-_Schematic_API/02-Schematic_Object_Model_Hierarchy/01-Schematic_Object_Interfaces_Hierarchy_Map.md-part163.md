#### <a id="IPCB_MasterLayerStack_properties"></a>IPCB\_MasterLayerStack properties

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
__Example__  
See lines 16 and 23 in the example below\.

##### Substacks property

__Syntax__  
Property  Substacks\[Index : Integer\] : IPCB\_LayerStack;  
__Read syntax__  
GetState\_Substacks;  
__Description__  
The Substacks property indicates a specific sub stack under the Master Layer Stack, and returns the IPCB\_LayerStack representing that layer stack\. This is 0 for the first sub stack \(typically a Rigid layer stack\) then 1 for the following sub stack \(say a Flex layer stack\), and so on\.  
__Example__

01

// Use of IPCB\_MasterLayerStack interface to show Sub Stack information:

02

 

03

Procedure SubStackInfo;

04

Var

05

  Board       : IPCB\_Board;

06

  masterStack : IPCB\_MasterLayerStack;

07

  subStack    : IPCB\_LayerStack;

08

 

09

Begin

10

  Board := PCBServer\.GetCurrentPCBBoard;

11

  masterStack := Board\.MasterLayerStack;

12

  subStack := masterStack\.Substacks\[0\]; // nominate first substack: 0

13

 

14

  ShowInfo\('Number of sub stacks: ' \+ OleStrToString\(masterStack\.SubstackCount\)\);

15

  ShowInfo\('Layers in first sub stack: ' \+ OleStrToString\(subStack\.Count\)\);

16

  ShowInfo\('Is a flex layer: ' \+ OleStrToString\(subStack\.IsFlex\)\);

17

 

18

// if available, select second substack: 1

19

  if masterStack\.SubstackCount > 1 then

20

  begin

21

    subStack := masterStack\.Substacks\[1\];

22

    ShowInfo\('Layers in second sub stack: ' \+ OleStrToString\(subStack\.Count\)\);

23

    ShowInfo\('Is a flex layer: ' \+ OleStrToString\(subStack\.IsFlex\)\);

24

  end

25

  else Exit;

26

 

27

End;

##### LayerStackStyle property

__Syntax__  
Property  LayerStackStyle : TLayerStackStyle;  
__Read/Write syntax__  
GetState\_LayerStackStyle;  
SetState\_LayerStackStyle;  
__Description__  
The LayerStackStyle property returns the current layer style as the [TLayerStackStyle type](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLayerStackStyle)\.

### IPCB\_LayerStack

__Overview__  
The IPCB\_LayerStack interface represents a layer stack in the current PCB document\. This Layer Stack interface is a property within the IPCB\_Board interface\. For PCB designs with more that one layer stack \(say, Rigid\-Flex board designs\) use the IPCB\_MaterLayerStack interface to select or directly access the available layer stacks\.

In essence, the IPCB\_LayerStack interface represents the board layer stack and therefore only has layers used in the board construction, such as copper based and overlay layers\. However the interface's LayerObject function \(with a passed Layer parameter\) can be used to obtain a specific PCB layer for the PCB document\.

A predefined layer class can be nominated when iterating through the stack, such as eLayerClass\_Mechanical or eLayerClass\_SolderMask\. To query the layers of a particular class, say Mechanical layers, the class type is passed to the First, Next, Previous, Last functions of the IPCB\_LayerStack interaface to iterate through the mechanical layers \- IPCB\_LayerStack\.First\(eLayerClass\_Mechanical\);

[TLayerClassID reference](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt)

__Notes__  
Depending on its type, each layer can be represented as a IPCB\_LayerObject, IPCB\_InternalPlane, IPCB\_DrillLayerPair, IPCB\_MechanicalLayerPairs, etc interface\. A layer can also have dielectric properties which are represented by the IPCB\_DielectricObject interface\.  
The IPCB\_LayerStack interface inherits methods and properties from the IPCB\_LayerStackBase interface\.

[__IPCB\_LayerStack methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack methods)

[__IPCB\_LayerStack properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack properties)

I\_ObjectAddress  
ID  
StateID  
Count  
Iterator  
First  
Last  
Next  
Previous  
^ Above methods inherited from IPCB\_LayerStackBase  
Board  
LayerObject  
DielectricTop  
DielectricBottom

Name  
IsFlex  
^ Above properties inherited from IPCB\_LayerStackBase  
ShowDielectricTop  
ShowDielectricBottom