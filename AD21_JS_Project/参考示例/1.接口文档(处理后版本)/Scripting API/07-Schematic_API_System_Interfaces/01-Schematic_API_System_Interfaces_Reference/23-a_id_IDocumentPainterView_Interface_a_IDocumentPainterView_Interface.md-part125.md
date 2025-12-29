#### <a id="IPCB_LayerStack_V7_methods"></a>IPCB\_LayerStack\_V7 methods

##### FirstLayer method

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

##### NextLayer method

__Syntax__  
Function  NextLayer\(L : IPCB\_LayerObject\_V7\) : IPCB\_LayerObject\_V7;  
__Description__  
The NextLayer function fetches the next layer stored in the PCB document's layer stack, relative to the passed layer L\. In practice, the NextLayer method is normally used after the FirstLayer function has been invoked, so layer L is that first retrieved layer \- see line 19 in the above example\. Note that the layer stack only stores signal and internal \(copper based\) layers\.

##### PreviousLayer method

__Syntax__  
Function  PreviousLayer\(L : IPCB\_LayerObject\_V7\) : IPCB\_LayerObject\_V7;  
__Description__  
The PreviousLayer function fetches the previous layer stored in the PCB document's layer stack, relative to the passed layer L\.

##### LastLayer method

__Syntax__  
Function LastLayer : IPCB\_LayerObject\_V7;  
__Description__  
The LastLayer function fetches the last layer stored in the layer stack for the PCB document\. Note that the basic layer stack only stores signal and internal \(copper based\) layers, so the last layer will usually be the Bottom Layer\.

##### FirstAvailableSignalLayer method

__Syntax__  
Function  FirstAvailableSignalLayer : IPCB\_LayerObject\_V7;  
__Description__  
This function retrieves the first available signal layer from the layer stack\. The IPCB\_LayerStack\_V7 interface only offers stores copper based layers such as signal and internal plane layers\.

##### FirstAvailableInternalPlane method

__Syntax__  
Function  FirstAvailableInternalPlane : IPCB\_InternalPlane\_V7;  
__Description__  
This function retrieves the first available internal plane object interface for the PCB document\.

##### LastInternalPlane method

__Syntax__  
Function  LastInternalPlane : IPCB\_InternalPlane\_V7;  
__Description__  
This function retrieves the last internal plane from the layer stack if it exists\. If there is no internal planes in the layer stack, the function will return a Nil value\.

##### SignalLayerCount method

__Syntax__  
Function SignalLayerCount : Integer;  
__Description__  
This function returns the number of signal layers in the layer stack for the PCB document\. See the InsertLayer example below\.

##### InsertLayer method

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

##### RemoveFromStack method

__Syntax__  
Procedure  RemoveFromStack \(L : IPCB\_LayerObject\_V7\)  
__Description__  
The RemoveFromStack procedure removes the layer object specified by L from the stack\. See line 20 in the above example\.

##### InsertInStackBelow method

__Syntax__  
Procedure  InsertInStackBelow \(RefL : IPCB\_LayerObject\_V7, L : IPCB\_LayerObject\_V7\);  
__Description__  
The InsertInStackBelow procedure inserts layer object L below the existing layer RefL in the stack\.

##### InsertInStackAbove method

__Syntax__  
Procedure  InsertInStackAbove \(RefL : IPCB\_LayerObject\_V7, L : IPCB\_LayerObject\_V7\);  
__Description__  
The InsertInStackAbove procedure inserts layer object L above the existing layer RefL in the stack\.

##### LayersInStackCount method

__Syntax__  
Function  LayersInStackCount : Integer;  
__Description__  
This function returns the number of layers in the stack for the PCB document\. See also the SignalLayerCount method\.

##### GetState\_LayerStackStyle method

__Syntax__  
Function  GetState\_LayerStackStyle : TLayerStackStyle;  
__Description__  
This function returns the style the current layer stack as a TLayerStackStyle type \- Layer Paris, Build\-up etc\.  See also the  SetState\_LayerStackStyle method below\.

##### SetState\_LayerStackStyle method

__Syntax__  
Procedure  SetState\_LayerStackStyle \(SS : TLayerStackStyle\);  
__Description__  
This procedure sets the current layer stack style as passed by SS, of the TLayerStackStyle type \- Layer Paris, Build\-up etc\.