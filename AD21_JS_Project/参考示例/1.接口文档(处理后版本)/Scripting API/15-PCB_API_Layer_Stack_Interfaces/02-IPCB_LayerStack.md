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

#### <a id="IPCB_LayerStack_methods"></a>IPCB\_LayerStack methods

##### I\_ObjectAddress method

__Syntax__  
Function  I\_ObjectAddress : Pointer TPCBObjectHandle;  
__Description__  
The I\_ObjectAddress function retrieves the Pointer handle for the Stack object\.

##### ID method

__Syntax__  
Function  ID : TPCBString;  
__Description__  
The ID function returns a unique \(and persistent\) layer identifier as a string\.

##### StateID method

__Syntax__  
Function  StateID : Integer;  
__Description__  
The StateID function returns an integer representing the layer state, which changes on each modification\.

##### Count method

__Syntax__  
Function  Count : Integer;  
__Description__  
The Count function returns and integer representing the total number of layers in the layer stack\.

##### Iterator method

__Syntax__  
Function  Iterator : IPCB\_LayerObjectIterator;  
__Description__  
The Iterator function retrieves the Layer Object Iterator\.

##### First method

__Syntax__  
Function  First \(T: TLayerClassID\) : IPCB\_LayerObject;  
__Description__  
The First function fetches the first layer of type TLayerClassID stored in the layer stack\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) type for the full class list\.  
To fetch the next layer in the layer stack, invoke the Next function\. Note that the layer stack stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.  
__Example__

01

// Use of IPCB\_LayerStack interface to show available layers by class

02

 

03

\{\-\-\-\-\- for reference \-\-\-\-\-\- 

04

TLayerClassID:

05

  eLayerClass\_All

06

  eLayerClass\_Mechanical

07

  eLayerClass\_Physical

08

  eLayerClass\_Electrical

09

  eLayerClass\_Dielectric

10

  eLayerClass\_Signal

11

  eLayerClass\_InternalPlane

12

  eLayerClass\_SolderMask

13

  eLayerClass\_Overlay

14

  eLayerClass\_PasteMask

15

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\}

16

 

17

Procedure LayerInfo;

18

Var

19

  Board      : IPCB\_Board;

20

  Stack      : IPCB\_LayerStack;

21

  LyrObj     : IPCB\_LayerObject;

22

  LyrClass   : string;

23

 

24

Begin

25

  // layer class type nominated \(see TLayerClassID list above\)\.

26

  LyrClass : = eLayerClass\_Signal;

27

 

28

  Board := PCBServer\.GetCurrentPCBBoard;

29

  Stack := Board\.LayerStack;

30

 

31

  // get first layer of the class type\.

32

  LyrObj := Stack\.First\(LyrClass\);

33

 

34

  // exit if layer type is not available in stack

35

  If LyrObj = Nil then Exit;

36

 

37

  // iterate through layers and display each layer name

38

  Repeat

39

    ShowMessage\(LyrObj\.Name\);

40

    LyrObj := Stack\.Next\(LyrClass, LyrObj\);

41

  Until LyrObj = Nil;

42

 

43

End;

##### Last method

__Syntax__  
Function  Last \(T: TLayerClassID\) : IPCB\_LayerObject;  
__Description__  
The Last function fetches the last layer of type TLayerClassID stored in the layer stack \- see the First method above\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\. Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.

##### Next method

__Syntax__  
Function  Next \(T: TLayerClassID; ARefLayer: IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The Next function fetches the next layer of type TLayerClassID stored in the layer stack, relative to the nominated ARefLayer object \(typically the current layer\)\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\. Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.

##### Previous method

__Syntax__  
Function  Previous \(T : TLayerClassID; ARefLayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The Previous function fetches the Previous layer of type TLayerClassID stored in the layer stack, relative to the nominated ARefLayer object \(typically the current layer\)\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\.  
Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.

##### Board method

__Syntax__  
Function  Board : IPCB\_Board;  
__Description__  
This function returns the PCB document that the layer stack is associated with, which is represented by the IPCB\_Board interface\.

##### LayerObject method

__Syntax__  
Function  LayerObject\(ALayer : TLayer\) : IPCB\_LayerObject;  
__Description__  
The LayerObject function retrieves the layer object interface \(IPCB\_LayerObject\) for the specified layer, ALayer of TLayer type\.  
__Example__

01

/Use of LayerObject method to display specific layers

02

 

03

Procedure ShowMechLayers;

04

Var

05

   Board      : IPCB\_Board;

06

   Stack      : IPCB\_LayerStack;

07

   LyrObj     : IPCB\_LayerObject;

08

   Lyr        : TLayer;

09

 

10

Begin

11

   Board := PCBServer\.GetCurrentPCBBoard;

12

   Stack := Board\.LayerStack;

13

 

14

   for Lyr := eMechanical1 to eMechanical16 do

15

   begin

16

      LyrObj := Stack\.LayerObject\[Lyr\];

17

      If LyrObj\.MechanicalLayerEnabled then ShowInfo\(LyrObj\.Name\);

18

   end;

19

End;

##### DielectricTop method

__Syntax__  
Function  DielectricTop : IPCB\_SolderMaskLayer;  
__Description__  
The DielectricTop function returns the stack's top solder layer \(eTopSolder\), referenced by the IPCB\_SolderMaskLayer interface\.  
__Example__

01

Procedure TopDielectricMaterial;

02

Var

03

    Board      : IPCB\_Board;

04

    Stack      : IPCB\_LayerStack;

05

    TopDielectric : IPCB\_SolderMaskLayer;

06

 

07

Begin

08

   Board := PCBServer\.GetCurrentPCBBoard;

09

   Stack := Board\.LayerStack;

10

   TopDielectric := Stack\.DielectricTop;

11

 

12

   ShowMessage\(TopDielectric\.DielectricMaterial\);

13

End;

##### DielectricBottom method

__Syntax__  
Function  DielectricBottom : IPCB\_SolderMaskLayer;  
__Description__  
The DielectricBottom function returns the stack's bottom solder layer \(eBottomSolder\), referenced by the IPCB\_SolderMaskLayer interface\. See example above\.

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