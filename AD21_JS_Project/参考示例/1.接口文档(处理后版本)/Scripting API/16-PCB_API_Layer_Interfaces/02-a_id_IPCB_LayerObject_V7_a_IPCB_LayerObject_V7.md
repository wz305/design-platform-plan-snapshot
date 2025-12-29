### <a id="IPCB_LayerObject_V7"></a>IPCB\_LayerObject\_V7

__Overview__  
The IPCB\_LayerObject\_V7 interface, like the IPCB\_LayerObject interface, represents a layer used in a PCB document\. Each layer has properties such as layer Name and whether it is used by primitives, for example\. This interface is a property of the IPCB\_LayerStack\_V7 interface, and is returned by methods such as FirstLayer and NextLayer\.

The IPCB\_LayerObject\_V7 interface offers the methods and properties of the older, now deprecated, version of the IPCB\_LayerObject interface\.

As an alternative interface to the current IPCB\_LayerObject interface, the IPCB\_LayerObject\_V7 interface therefore offers backward compatibility for legacy scripts\. In most cases just a few interface reference changes in the code should return an older script to a fully functional state\.

The layer stack for a PCB document, when referenced by the IPCB\_LayerStack\_V7 interface, only deals with copper based layers such as signal and internal plane layers\. Each layer in the layer stack can have dielectric information and layer pairs can be specified\. However the LayerObject\_V7 interface can provide access to any layer for the PCB board\.

IPCB\_LayerObject\_V7 inherits methods and properties from the IPCB\_LayerObject and IPCB\_ElectricalLayer interfaces\.

__Methods and properties:__

[__IPCB\_LayerObject\_V7 methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject_V7 methods)

[__IPCB\_LayerObject\_V7 properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject_V7 properties)

I\_ObjectAddress  
IsInLayerStack  
V6\_LayerID  
V7\_LayerID  
LayerStack  
^ Above methods inherited from IPCB\_LayerObject  
Dielectric  
LayerID

Name  
UsedByPrims  
^ Above methods inherited from IPCB\_LayerObject  
CopperThickness  
^ Above method inherited from IPCB\_ElectricalLayer  
IsDisplayed

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