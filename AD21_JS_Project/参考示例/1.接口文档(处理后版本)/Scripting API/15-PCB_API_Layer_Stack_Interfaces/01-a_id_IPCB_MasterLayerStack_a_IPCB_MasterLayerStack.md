### <a id="IPCB_MasterLayerStack"></a>IPCB\_MasterLayerStack

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

#### <a id="IPCB_MasterLayerStack_methods"></a>IPCB\_MasterLayerStack methods

##### I\_ObjectAddress method

__Syntax__  
Function  I\_ObjectAddress : TPCBObjectHandle;  
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
The Count function returns and integer representing the total number of layers in the currently selected layer stack\.

##### Iterator method

__Syntax__  
Function  Iterator : IPCB\_LayerObjectIterator;  
__Description__  
The Iterator function retrieves the Layer Object Iterator\.

##### First method

__Syntax__  
Function  First \(T: TLayerClassID\) : IPCB\_LayerObject;  
__Description__  
The First function fetches the first layer of type TLayerClassID stored in the current layer stack\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\.  
To fetch the next layer in the layer stack, invoke the Next function \(see below\)\. Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.

See the [IPCB\_LayerStack](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack) entry for an example of the First, Next etc methods\.

##### Last method

__Syntax__  
Function  Last \(T: TLayerClassID\) : IPCB\_LayerObject;  
__Description__  
The Last function fetches the last layer of type TLayerClassID stored in the current layer stack \- see the First method above\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\. Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.

##### Next method

__Syntax__  
Function  Next \(T: TLayerClassID; ARefLayer: IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The Next function fetches the next layer of type TLayerClassID stored in the current layer stack, relative to the nominated ARefLayer object \(typically the current layer\)\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\.  
To fetch the previous layer in the layer stack, invoke the Previous function \(see example in the [IPCB\_LayerStack](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21#IPCB_LayerStack) entry\)\. Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.

##### Previous method

__Syntax__  
Function Previous \(T : TLayerClassID; ARefLayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The Previous function fetches the Previous layer of type TLayerClassID stored in the current layer stack, relative to the nominated ARefLayer object \(typically the current layer\)\. The TLayerClassID type includes layers classes such as eLayerClass\_Signal for all signal layers in the stack, eLayerClass\_Overlay for overlay layers in the stack, and so on\. See the [TLayerClassID type](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt) for the full class list\.  
Note that the layer stack only stores the physical layers for the board design, such as signal, dielectric and overlay layers, etc\.

##### Board method

__Syntax__  
Function  Board : IPCB\_Board;  
__Description__  
The Board function returns the current PCB document \(represented by the IPCB\_Board interface\) associated with the Master Layer stack\.

##### SubstackCount method

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

##### CreateLayer method

__Syntax__  
Function  CreateLayer \(ALayer : TV7\_Layer\) : IPCB\_LayerObject;  
__Description__  
The CreateLayer function creates a new layer object, ALayer\. It returns the layer object, represented by the IPCB\_LayerObject interface\.

##### RemoveLayer method

__Syntax__  
Function  RemoveLayer \(Layer : IPCB\_LayerObject\) : Boolean;  
__Description__  
The RemoveLayer function removes the layer object, nominated by Layer, from the stack\.

##### InsertOnTop method

__Syntax__  
Function  InsertOnTop \(ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The InsertOnTop function inserts a new layer object, nominated by ALayer, at the top of the current layer stack\.

##### InsertOnBottom method

__Syntax__  
Function  InsertOnBottom \(ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The InsertOnBottom function inserts a new layer object, nominated by ALayer, at the bottom of the current layer stack\.

##### InsertBelow method

__Syntax__  
Function  InsertBelow \(ARefLayer, ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The InsertBelow function inserts a new layer object, nominated by ALayer, below the existing stack layer nominated by ARefLayer\.

##### InsertAbove method

__Syntax__  
Function  InsertAbove \(ARefLayer, ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
__Description__  
The InsertAbove function inserts a new layer object, nominated by ALayer, above the existing stack layer nominated by ARefLayer\.

##### DisableLayer method

__Syntax__  
Procedure DisableLayer \(ASubstack : IPCB\_LayerStack; ALayer : IPCB\_LayerObject\);  
__Description__  
The DisableLayer function disables layer ALayer in the sub stack nominated by ASubStack\.

##### EnableLayer method

__Syntax__  
Procedure EnableLayer \(ASubstack : IPCB\_LayerStack; ALayer : IPCB\_LayerObject\);  
__Description__  
The EnableLayer function enables layer ALayer in the sub stack nominated by ASubStack\.

##### GetSubstack method

__Syntax__  
Function  GetSubstack \(ASubstackID : TPCBString\) : IPCB\_LayerStack;  
__Description__  
The GetSubstack function retrieves a sub stack nominated by the ID ASubstackID, which is represented by the IPCB\_LayerStack interface\.

##### CreateSubstack method

__Syntax__  
Function  CreateSubstack : IPCB\_LayerStack;  
__Description__  
The CreateSubstack function creates a new layer sub stack and returns the stack object, represented by the IPCB\_LayerObject interface\.

##### RemoveSubstack method

__Syntax__  
Function  RemoveSubstack \(Substack : IPCB\_LayerStack\) : Boolean;  
__Description__  
The RemoveSubstack function removes the layer sub stack nominated by Substack\.

##### Import\_FromParameters method

__Syntax__  
Procedure Import\_FromParameters \(Params : PChar\);  
__Description__  
The Import\_FromParameters procedure imports the stack parameters as defined by Params\.

##### Export\_ToParameters method

__Syntax__  
Procedure Export\_ToParameters \(Params : PChar\);  
__Description__  
The Import\_FromParameters procedure exports the stack parameters as defined by Params\.

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