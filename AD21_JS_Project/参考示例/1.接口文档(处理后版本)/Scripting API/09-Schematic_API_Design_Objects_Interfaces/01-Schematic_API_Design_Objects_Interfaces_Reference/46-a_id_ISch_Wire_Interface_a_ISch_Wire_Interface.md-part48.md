#### <a id="IPCB_LayerObject_methods"></a>IPCB\_LayerObject methods

##### I\_ObjectAddress method

__Syntax__  
Function  I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
The I\_ObjectAddress function retrieves the Pointer handle for the layer object\.

##### IsInLayerStack method

__Syntax__  
Function  IsInLayerStack : Boolean;  
__Description__  
This function determines if the layer object is in the current layer stack for the PCB document\.

##### V6\_LayerID method

__Syntax__  
Function  V6\_LayerID : TV6\_Layer;  
__Description__  
The V6\_LayerID function returns the layer object's layer ID within the layer stack\.  
__Example__

01

Procedure SigLayers;

02

Var

03

   Board      : IPCB\_Board;

04

   Stack      : IPCB\_LayerStack;

05

   LyrObj     : IPCB\_LayerObject;

06

   LyrClass   : string;

07

 

08

Begin

09

   // nominate layer class

10

   LyrClass : = eLayerClass\_Signal;

11

 

12

   Board := PCBServer\.GetCurrentPCBBoard;

13

   Stack := Board\.LayerStack;

14

 

15

   // get first layer in class

16

   LyrObj := Stack\.First\(LyrClass\);

17

 

18

   // exit if layer type is not available in stack

19

   If LyrObj = Nil then

20

   Begin

21

      ShowError\('Stackup does not have this type of layer\.'\);

22

      exit;

23

   End;

24

 

25

   // iterate through layers and display each layer ID & name

26

  Repeat

27

     ShowMessage\('LayerID: ' \+ OleStrToString\(LyrObj\.V6\_LayerID\) \+ '  Name: ' \+ LyrObj\.Name\);

28

     LyrObj := Stack\.Next\(LyrClass, LyrObj\);

29

  Until LyrObj = Nil;

30

 

31

End;

[TLayerClassID reference](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt)

##### V7\_LayerID method

__Syntax__  
Function  V7\_LayerID : TV7\_Layer; \(IDispatch\)  
__Description__  
The V7\_LayerID function returns the layer object's layer ID within the layer stack as a TV7\_Layer type\.

##### LayerStack method

__Syntax__  
Function  LayerStack : IPCB\_LayerStackBase;  
__Description__  
This function returns the layer stack, referenced by the IPCB\_LayerStackBase interface, associated with the current layer object\. Note that both the IPCB\_MasterLayerStack and IPCB\_LayerStack interfaces inherit methods and properties from the IPCB\_LayerStackBase interface\.