# PCB API Layer Stack Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [PCB API Layer Stack Interfaces for version 22](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- PCB API](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

The PCB Layer Stack Interfaces reference covers the following interfaces and content:

- [IPCB\_MasterLayerStack](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_MasterLayerStack)
- [IPCB\_LayerStack](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack)
- [IPCB\_LayerStack\_V7](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack_V7)

See also:

[PCB API System Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21)

[PCB API Layer Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21)

__Interface inheritance map:__

IPCB\_LayerStackBase  
\.  IPCB\_MasterLayerStack  
\.  IPCB\_LayerStack  
IPCB\_LayerStack\_V7


__Overview__

The IPCB\_MasterLayerStack interface represents the high\-level \(master\) layer stack for the current PCB document\. The Master Layer Stack interface is a property within in the IPCB\_Board interface \(IPCB\_Board\.MasterLayerStack\) and provides access to the available sub stacks in the overall layer stack structure\.

Individual sub stacks are represented by the IPCB\_LayerStack interface, and can be nominated using the SubStacks property of the IPCB\_MasterLayerStack interface\. Sub stacks are managed in Altium Designer's Layer Stack manager and are typically present in Rigid\-Flex PCB designs\.

See the[ Layer Stack Manger dialog](https://www.altium.com/documentation/node/210599?version=21) and[ Flex and Rigid\-Flex Printed Circuit Design](https://www.altium.com/documentation/node/231354?version=21) pages for more information\.

The IPCB\_MasterLayerStack interface provides methods for accessing and managing sub stacks, including the ability to create and remove sub stacks and query their individual layers\.

IPCB\_MasterLayerStack inherits methods and properties from the IPCB\_LayerStackBase interface\.

__Methods and properties:__

[__IPCB\_MasterLayerStack methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_MasterLayerStack methods)

[__IPCB\_MasterLayerStack properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_MasterLayerStack properties)

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
SubstackCount  
CreateLayer  
RemoveLayer  
InsertOnTop  
InsertOnBottom  
InsertBelow  
InsertAbove  
DisableLayer  
EnableLayer  
GetSubstack  
CreateSubstack  
RemoveSubstack  
Import\_FromParameters  
Export\_ToParameters

Name  
IsFlex  
^ Above properties inherited from IPCB\_LayerStackBase  
Substacks  
LayerStackStyle



__Syntax__  
Function  I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
The I\_ObjectAddress function retrieves the Pointer handle for the Stack object\.


__Syntax__  
Function  ID : TPCBString;  
__Description__  
The ID function returns a unique \(and persistent\) layer identifier as a string\.


__Syntax__  
Function  StateID : Integer;  
__Description__  
The StateID function returns an integer representing the layer state, which changes on each modification\.


__Syntax__  
Function  Count : Integer;  
__Description__  
The Count function returns and integer representing the total number of layers in the currently selected layer stack\.


__Syntax__  
Function  Iterator : IPCB\_LayerObjectIterator;  
__Description__  
The Iterator function retrieves the Layer Object Iterator\.


__Syntax__  
Function  First \(T: TLayerClassID\) : IPCB\_LayerObject;  
__Description__  
The First function fetches the first layer of type TLayerClassID stored in the current layer stack\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\.  
To fetch the next layer in the layer stack, invoke the Next function \(see below\)\. Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.

See the [IPCB\_LayerStack](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack) entry for an example of the First, Next etc methods\.


__Syntax__  
Function  Last \(T: TLayerClassID\) : IPCB\_LayerObject;  
__Description__  
The Last function fetches the last layer of type TLayerClassID stored in the current layer stack \- see the First method above\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\. Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.


__Syntax__  
Function  Next \(T: TLayerClassID; ARefLayer: IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The Next function fetches the next layer of type TLayerClassID stored in the current layer stack, relative to the nominated ARefLayer object \(typically the current layer\)\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\.  
To fetch the previous layer in the layer stack, invoke the Previous function \(see example in the [IPCB\_LayerStack](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack) entry\)\. Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.


__Syntax__  
Function Previous \(T : TLayerClassID; ARefLayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The Previous function fetches the Previous layer of type TLayerClassID stored in the current layer stack, relative to the nominated ARefLayer object \(typically the current layer\)\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\.  
Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.


__Syntax__  
Function  Board : IPCB\_Board;  
__Description__  
The Board function returns the current PCB document \(represented by the IPCB\_Board interface\) associated with the Master Layer stack\.


__Syntax__  
SubstackCount : Integer;  
__Description__  
The SubstackCount function returns the number of sub stacks in the Master Layer stack as an integer\.  
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


__Syntax__  
Function  CreateLayer \(ALayer : TV7\_Layer\) : IPCB\_LayerObject;  
__Description__  
The CreateLayer function creates a new layer object, ALayer\. It returns the layer object, represented by the IPCB\_LayerObject interface\.


__Syntax__  
Function  RemoveLayer \(Layer : IPCB\_LayerObject\) : Boolean;  
__Description__  
The RemoveLayer function removes the layer object, nominated by Layer, from the stack\.


__Syntax__  
Function  InsertOnTop \(ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The InsertOnTop function inserts a new layer object, nominated by ALayer, at the top of the current layer stack\.


__Syntax__  
Function  InsertOnBottom \(ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The InsertOnBottom function inserts a new layer object, nominated by ALayer, at the bottom of the current layer stack\.


__Syntax__  
Function  InsertBelow \(ARefLayer, ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The InsertBelow function inserts a new layer object, nominated by ALayer, below the existing stack layer nominated by ARefLayer\.


__Syntax__  
Function  InsertAbove \(ARefLayer, ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The InsertAbove function inserts a new layer object, nominated by ALayer, above the existing stack layer nominated by ARefLayer\.


__Syntax__  
Procedure DisableLayer \(ASubstack : IPCB\_LayerStack; ALayer : IPCB\_LayerObject\);  
__Description__  
The DisableLayer function disables layer ALayer in the sub stack nominated by ASubStack\.


__Syntax__  
Procedure EnableLayer \(ASubstack : IPCB\_LayerStack; ALayer : IPCB\_LayerObject\);  
__Description__  
The EnableLayer function enables layer ALayer in the sub stack nominated by ASubStack\.


__Syntax__  
Function  GetSubstack \(ASubstackID : TPCBString\) : IPCB\_LayerStack;  
__Description__  
The GetSubstack function retrieves a sub stack nominated by the ID ASubstackID, which is represented by the IPCB\_LayerStack interface\.


__Syntax__  
Function  CreateSubstack : IPCB\_LayerStack;  
__Description__  
The CreateSubstack function creates a new layer sub stack and returns the stack object, represented by the IPCB\_LayerObject interface\.


__Syntax__  
Function  RemoveSubstack \(Substack : IPCB\_LayerStack\) : Boolean;  
__Description__  
The RemoveSubstack function removes the layer sub stack nominated by Substack\.


__Syntax__  
Procedure Import\_FromParameters \(Params : PChar\);  
__Description__  
The Import\_FromParameters procedure imports the stack parameters as defined by Params\.


__Syntax__  
Procedure Export\_ToParameters \(Params : PChar\);  
__Description__  
The Import\_FromParameters procedure exports the stack parameters as defined by Params\.



__Syntax__  
Property  Name : TPCBString;  
__Read/Write syntax__  
GetState\_Name;  
SetState\_Name;  
__Description__  
The Name property returns a string representing the current layer name\.


__Syntax__  
Property  IsFlex : Boolean;  
__Read/Write syntax__  
GetState\_IsFlex  
SetState\_IsFlex;  
__Description__  
The IsFlex property is True if the layer is designated as Flex, or False for a Rigid layer\.  
__Example__  
See lines 16 and 23 in the example below\.


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


__Syntax__  
Property  LayerStackStyle : TLayerStackStyle;  
__Read/Write syntax__  
GetState\_LayerStackStyle;  
SetState\_LayerStackStyle;  
__Description__  
The LayerStackStyle property returns the current layer style as the [TLayerStackStyle type](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLayerStackStyle)\.


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



__Syntax__  
Function  I\_ObjectAddress : Pointer TPCBObjectHandle;  
__Description__  
The I\_ObjectAddress function retrieves the Pointer handle for the Stack object\.


__Syntax__  
Function  ID : TPCBString;  
__Description__  
The ID function returns a unique \(and persistent\) layer identifier as a string\.


__Syntax__  
Function  StateID : Integer;  
__Description__  
The StateID function returns an integer representing the layer state, which changes on each modification\.


__Syntax__  
Function  Count : Integer;  
__Description__  
The Count function returns and integer representing the total number of layers in the layer stack\.


__Syntax__  
Function  Iterator : IPCB\_LayerObjectIterator;  
__Description__  
The Iterator function retrieves the Layer Object Iterator\.


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


__Syntax__  
Function  Last \(T: TLayerClassID\) : IPCB\_LayerObject;  
__Description__  
The Last function fetches the last layer of type TLayerClassID stored in the layer stack \- see the First method above\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\. Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.


__Syntax__  
Function  Next \(T: TLayerClassID; ARefLayer: IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The Next function fetches the next layer of type TLayerClassID stored in the layer stack, relative to the nominated ARefLayer object \(typically the current layer\)\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\. Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.


__Syntax__  
Function  Previous \(T : TLayerClassID; ARefLayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The Previous function fetches the Previous layer of type TLayerClassID stored in the layer stack, relative to the nominated ARefLayer object \(typically the current layer\)\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\.  
Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.


__Syntax__  
Function  Board : IPCB\_Board;  
__Description__  
This function returns the PCB document that the layer stack is associated with, which is represented by the IPCB\_Board interface\.


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


__Syntax__  
Function  DielectricBottom : IPCB\_SolderMaskLayer;  
__Description__  
The DielectricBottom function returns the stack's bottom solder layer \(eBottomSolder\), referenced by the IPCB\_SolderMaskLayer interface\. See example above\.



__Syntax__  
Property  Name : TPCBString;  
__Read/Write syntax__  
GetState\_Name;  
SetState\_Name;  
__Description__  
The Name property returns a string representing the current layer name\.


__Syntax__  
Property  IsFlex : Boolean;  
__Read/Write syntax__  
GetState\_IsFlex  
SetState\_IsFlex;  
__Description__  
The IsFlex property is True if the layer is designated as Flex, or False for a Rigid layer\.


__Syntax__  
Property  ShowDielectricTop : Boolean;  
__Read/Write syntax__  
GetState\_ShowTopDielectric;  
SetState\_ShowTopDielectric;  
__Description__  
This property enables or disables the dielectric layer for the top solder layer\.


__Syntax__  
Property  ShowDielectricBottom : Boolean  
__Read/Write syntax__  
GetState\_ShowBotDielectric;  
SetState\_ShowBotDielectric;  
__Description__  
This property enables or disables the dielectric layer for the bottom layer\.


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



__Syntax__  
Function  FirstLayer : IPCB\_LayerObject\_V7;  
__Description__  
The Firstlayer function fetches the first layer stored in the layer stack for the PCB document\. To fetch the next layer in the layer stack, invoke the NextLayer method\. Note that the basic layer stack only stores signal and internal \(copper based\) layers, so the first layer will be the Top Layer\.  
__Example__

01

// Prodedure LegacyLayerInfo

02

 

03

Var

04

    PCBBoard      : IPCB\_Board;

05

    TheLayerStack : IPCB\_LayerStack\_V7;

06

    i             : Integer;

07

    LayerObj      : IPCB\_LayerObject;

08

    LS            : String;

09

Begin

10

    PCBBoard := PCBServer\.GetCurrentPCBBoard;

11

    If PCBBoard = Nil Then Exit;

12

  

13

    TheLayerStack := PCBBoard\.LayerStack\_V7;

14

    If TheLayerStack = Nil Then Exit;

15

    LS       := '';

16

    LayerObj := TheLayerStack\.FirstLayer;

17

    Repeat

18

        LS       := LS \+ Layer2String\(LayerObj\.LayerID\) \+ \#13\#10;

19

        LayerObj := TheLayerStack\.NextLayer\(LayerObj\);

20

    Until LayerObj = Nil;

21

    ShowInfo\('The Layer Stack has :'\#13\#10 \+ LS\);

22

End;


__Syntax__  
Function  NextLayer\(L : IPCB\_LayerObject\_V7\) : IPCB\_LayerObject\_V7;  
__Description__  
The NextLayer function fetches the next layer stored in the PCB document's layer stack, relative to the passed layer L\. In practice, the NextLayer method is normally used after the FirstLayer function has been invoked, so layer L is that first retrieved layer \- see line 19 in the above example\. Note that the layer stack only stores signal and internal \(copper based\) layers\.


__Syntax__  
Function  PreviousLayer\(L : IPCB\_LayerObject\_V7\) : IPCB\_LayerObject\_V7;  
__Description__  
The PreviousLayer function fetches the previous layer stored in the PCB document's layer stack, relative to the passed layer L\.


__Syntax__  
Function LastLayer : IPCB\_LayerObject\_V7;  
__Description__  
The LastLayer function fetches the last layer stored in the layer stack for the PCB document\. Note that the basic layer stack only stores signal and internal \(copper based\) layers, so the last layer will usually be the Bottom Layer\.


__Syntax__  
Function  FirstAvailableSignalLayer : IPCB\_LayerObject\_V7;  
__Description__  
This function retrieves the first available signal layer from the layer stack\. The IPCB\_LayerStack\_V7 interface only offers stores copper based layers such as signal and internal plane layers\.


__Syntax__  
Function  FirstAvailableInternalPlane : IPCB\_InternalPlane\_V7;  
__Description__  
This function retrieves the first available internal plane object interface for the PCB document\.


__Syntax__  
Function  LastInternalPlane : IPCB\_InternalPlane\_V7;  
__Description__  
This function retrieves the last internal plane from the layer stack if it exists\. If there is no internal planes in the layer stack, the function will return a Nil value\.


__Syntax__  
Function SignalLayerCount : Integer;  
__Description__  
This function returns the number of signal layers in the layer stack for the PCB document\. See the InsertLayer example below\.


__Syntax__  
Procedure InsertLayer\(L : TV6\_TLayer\);  
__Description__  
The InsertLayer procedure inserts a layer in the stack on the type specified by L\. The corresponding RemoveFromStack method removes a specified layer object\.  
__Example__

01

Procedure AddRemoveLayer;

02

Var

03

   Board      : IPCB\_Board;

04

   Stack      : IPCB\_LayerStack\_V7;

05

   LyrObj     : IPCB\_LayerObject;

06

 

07

Begin

08

 

09

   Board := PCBServer\.GetCurrentPCBBoard;

10

   Stack := Board\.LayerStack\_V7;

11

 

12

   ShowInfo\('Signal layer count = ' \+ IntToStr\(Stack\.SignallayerCount\) \+ \#13\#10 \+ 'Inserting a Mid Layer\.\.\.'\);

13

 

14

   Stack\.InsertLayer\(eV6\_MidLayer10\);

15

   LyrObj := Stack\.LayerObject\(eV6\_MidLayer10\);  // or pass eMidlayer10

16

 

17

   ShowInfo\('New Layer is ' \+ LyrObj\.Name \+ \#13\#10 \+'Signal layer count = ' \+ IntToStr\(Stack\.SignallayerCount\)\);

18

 

19

   ShowInfo\('Removing ' \+ LyrObj\.Name\);

20

   Stack\.RemoveFromStack\(LyrObj\);

21

   ShowInfo\('Signal layer count = ' \+ IntToStr\(Stack\.SignallayerCount\)\);

22

End;


__Syntax__  
Procedure  RemoveFromStack \(L : IPCB\_LayerObject\_V7\)  
__Description__  
The RemoveFromStack procedure removes the layer object specified by L from the stack\. See line 20 in the above example\.


__Syntax__  
Procedure  InsertInStackBelow \(RefL : IPCB\_LayerObject\_V7, L : IPCB\_LayerObject\_V7\);  
__Description__  
The InsertInStackBelow procedure inserts layer object L below the existing layer RefL in the stack\.


__Syntax__  
Procedure  InsertInStackAbove \(RefL : IPCB\_LayerObject\_V7, L : IPCB\_LayerObject\_V7\);  
__Description__  
The InsertInStackAbove procedure inserts layer object L above the existing layer RefL in the stack\.


__Syntax__  
Function  LayersInStackCount : Integer;  
__Description__  
This function returns the number of layers in the stack for the PCB document\. See also the SignalLayerCount method\.


__Syntax__  
Function  GetState\_LayerStackStyle : TLayerStackStyle;  
__Description__  
This function returns the style the current layer stack as a TLayerStackStyle type \- Layer Paris, Build\-up etc\.  See also the  SetState\_LayerStackStyle method below\.


__Syntax__  
Procedure  SetState\_LayerStackStyle \(SS : TLayerStackStyle\);  
__Description__  
This procedure sets the current layer stack style as passed by SS, of the TLayerStackStyle type \- Layer Paris, Build\-up etc\.



__Syntax__  
Property Board : IPCB\_Board;  
__Read syntax__  
GetState\_Board;  
__Description__  
This property returns the PCB document, represented by the IPCB\_Board interface, associated with the layer stack\.


__Syntax__  
Property  LayerObject \[L : TV6\_Layer\] : IPCB\_LayerObject\_V7;  
__Read syntax__  
GetState\_LayerObject;  
__Description__  
The LayerObject property retrieves the layer object interface for the specified layer L of the TV6\_TLayer type\. It is a read only property\. See the InsertLayer method example above\.  
__Notes__  
In scripting TLayer is generally equivalent to TV6\_Layer, so in the above syntax for example, a specified type of eBottomLayer will producuce the same result as eV6\_BottomLayer\.


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


__Syntax__  
Property  DielectricBottom : IPCB\_DielectricObject;  
__Read syntax__  
GetState\_DielectricBottom;  
__Description__  
This property returns the IPCB\_DielectricObject interface associated with the dielectric information for the bottom layer of the layer stack\.


__Syntax__  
Property  DielectricTop : IPCB\_DielectricObject;  
__Read syntax__  
GetState\_DielectricTop;  
__Description__  
This property returns the IPCB\_DielectricObject interface associated with the dielectric information for the top layer of the layer stack\.


__Syntax__  
Property  ShowDielectricBottom : Boolean  
__Read/Write syntax__  
GetState\_ShowBotDielectric  
SetState\_ShowBotDielectric;  
__Description__  
This property enables or disables the dielectric layer for the bottom layer\.


__Syntax__  
Property  ShowDielectricTop : Boolean  
__Read/Write syntax__  
GetState\_ShowTopDielectric  
SetState\_ShowTopDielectric;  
__Description__  
This property enables or disables the dielectric layer for the top layer\.

## 子章节

- [<a id="IPCB_MasterLayerStack"></a>IPCB\_MasterLayerStack](01-a_id_IPCB_MasterLayerStack_a_IPCB_MasterLayerStack.md.md)
- [IPCB\_LayerStack](02-IPCB_LayerStack.md.md)
- [<a id="IPCB_LayerStack_V7"></a>IPCB\_LayerStack\_V7](03-a_id_IPCB_LayerStack_V7_a_IPCB_LayerStack_V7.md.md)
