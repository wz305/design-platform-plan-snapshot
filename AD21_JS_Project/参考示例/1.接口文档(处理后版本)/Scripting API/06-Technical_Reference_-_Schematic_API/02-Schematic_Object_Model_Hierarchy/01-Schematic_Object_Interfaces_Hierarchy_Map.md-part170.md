#### <a id="IPCB_LayerObject_V7_methods"></a>IPCB\_LayerObject\_V7 methods

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
The V6\_LayerID function returns the layer object's layer ID within the layer stack\. This is equivalent to the IPCB\_LayerObject\_V7\.LayerID method\. See line 23 in the below example\.  
__Example__

01

Procedure LayerINFO;

02

Var

03

   Board      : IPCB\_Board;

04

   Stack      : IPCB\_LayerStack\_V7;

05

   Lyr        : TLayer;

06

   LyrObj     : IPCB\_LayerObject\_V7;

07

   OnOff      : string;

08

 

09

Begin

10

   Board := PCBServer\.GetCurrentPCBBoard;

11

   Stack := Board\.LayerStack\_V7;

12

 

13

   // Obtain the first layer of the layer stack

14

   LyrObj := Stack\.FirstLayer;

15

 

16

   while LyrObj <> Nil do

17

   begin

18

      if LyrObj\.IsDisplayed\[Board\] then

19

         OnOff := 'On'

20

      else

21

         OnOff := 'Off';

22

 

23

   Lyr := LyrObj\.LayerID;  // or use the V6\_LayerID function

24

   ShowMessage\('Layer ' \+ OleStrToString\(Lyr\) \+ ' is ' \+ Layer2String\(Lyr\) \+ \#13\#10 \+ 'The layer display is ' \+ OnOff\);

25

 

26

   // Obtain the next layer of the layer stack

27

   LyrObj := Stack\.NextLayer\(LyrObj\);

28

   end;

29

End;

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

##### Dielectric method

__Syntax__  
Function  Dielectric : IPCB\_DielectricObject;  
__Description__  
The Dielectric function returns the IPCB\_DielectricObject interface for the current layer object, providing access to the object's dielectric properties\.

##### LayerID method

__Syntax__  
Function  LayerID : TV6\_Layer;  
__Description__  
The LayerID function returns the layer object's layer ID within the layer stack, as a TV6\_Layer or equivalent TLayer type\. See line 23 in the above example\.