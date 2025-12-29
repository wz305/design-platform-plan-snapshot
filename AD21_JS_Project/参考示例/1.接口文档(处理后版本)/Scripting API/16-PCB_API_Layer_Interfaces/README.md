# PCB API Layer Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [PCB API Layer Interfaces for version 22](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- PCB API](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

The PCB API Layer Interfaces reference covers the following interfaces and content:

- [IPCB\_LayerObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject)
- [IPCB\_LayerObject\_V7](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject_V7)
- [IPCB\_MechanicalLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_MechanicalLayer)
- [IPCB\_DielectricLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DielectricLayer)
- [IPCB\_DielectricObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DielectricObject)
- [IPCB\_SolderMaskLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_SolderMaskLayer)
- [IPCB\_OverlayLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_OverlayLayer)
- [IPCB\_PasteMaskLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_PasteMaskLayer)
- [IPCB\_SignalLayer](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_SignalLayer)
- [IPCB\_InternalPlane](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_InternalPlane)
- [IPCB\_InternalPlane\_V7](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_InternalPlane_V7)
- [IPCB\_DrillLayerPair](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DrillLayerPair)
- [IPCB\_MechanicalLayerPairs](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_MechanicalLayerPairs)

See also:

[PCB API Layer Stack Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21)

[PCB API System Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21)

__Interface inheritance map:__

IPCB\_LayerObject  
\.  IPCB\_MechanicalLayer  
\.  IPCB\_PhysicalLayer  
\.  \.  IPCB\_ElectricalLayer  
\.  \.  \.  IPCB\_LayerObject\_V7  
\.  \.  \.  IPCB\_SignalLayer  
\.  \.  \.  IPCB\_InternalPlane  
\.  \.  \.  \.  IPCB\_InternalPlane\_V7  
\.  \.  IPCB\_DielectricLayer  
\.  \.  \.  IPCB\_DielectricObject  
\.  \.  \.  IPCB\_SolderMaskLayer  
\.  \.  IPCB\_OverlayLayer  
\.  \.  IPCB\_PasteMaskLayer  
\.  
IPCB\_DrillLayerPair  
IPCB\_MechanicalLayerPairs


__Overview__  
The IPCB\_LayerObject interface represents a layer used in a PCB document\. Each layer has properties such as layer name and used by primitive, for example\.

This interface is returned by the LayerObject function in the IPCB\_LayerStack interface, and is property in the IPCB\_LayerStack\_V7 interface\.

__Methods and properties:__

[__IPCB\_LayerObject methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)

[__IPCB\_LayerObject properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)

I\_ObjectAddress  
IsInLayerStack  
V6\_LayerID  
V7\_LayerID  
LayerStack

Name  
UsedByPrims



__Syntax__  
Function  I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
The I\_ObjectAddress function retrieves the Pointer handle for the layer object\.


__Syntax__  
Function  IsInLayerStack : Boolean;  
__Description__  
This function determines if the layer object is in the current layer stack for the PCB document\.


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


__Syntax__  
Function  V7\_LayerID : TV7\_Layer; \(IDispatch\)  
__Description__  
The V7\_LayerID function returns the layer object's layer ID within the layer stack as a TV7\_Layer type\.


__Syntax__  
Function  LayerStack : IPCB\_LayerStackBase;  
__Description__  
This function returns the layer stack, referenced by the IPCB\_LayerStackBase interface, associated with the current layer object\. Note that both the IPCB\_MasterLayerStack and IPCB\_LayerStack interfaces inherit methods and properties from the IPCB\_LayerStackBase interface\.



__Syntax__  
Property  Name : TPCBString;  
__Read/Write syntax__  
GetState\_Name;  
SetState\_Name;  
__Description__  
The Name property returns a string representing the current layer object name\. See line 27 in the V6\_LayerID method example above\.


__Syntax__  
Property  UsedByPrims : Boolean;  
__Read/Write syntax__  
GetState\_UsedByPrims;  
SetState\_UsedByPrims;  
__Description__  
The UsedByPrims property indicates whether the layer object is used by primitives\.


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



__Syntax__  
Function  I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
The I\_ObjectAddress function retrieves the Pointer handle for the layer object\.


__Syntax__  
Function  IsInLayerStack : Boolean;  
__Description__  
This function determines if the layer object is in the current layer stack for the PCB document\.


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


__Syntax__  
Function  V7\_LayerID : TV7\_Layer; \(IDispatch\)  
__Description__  
The V7\_LayerID function returns the layer object's layer ID within the layer stack as a TV7\_Layer type\.


__Syntax__  
Function  LayerStack : IPCB\_LayerStackBase;  
__Description__  
This function returns the layer stack, referenced by the IPCB\_LayerStackBase interface, associated with the current layer object\. Note that both the IPCB\_MasterLayerStack and IPCB\_LayerStack interfaces inherit methods and properties from the IPCB\_LayerStackBase interface\.


__Syntax__  
Function  Dielectric : IPCB\_DielectricObject;  
__Description__  
The Dielectric function returns the IPCB\_DielectricObject interface for the current layer object, providing access to the object's dielectric properties\.


__Syntax__  
Function  LayerID : TV6\_Layer;  
__Description__  
The LayerID function returns the layer object's layer ID within the layer stack, as a TV6\_Layer or equivalent TLayer type\. See line 23 in the above example\.



__Syntax__  
Property  Name : TPCBString;  
__Read/Write syntax__  
GetState\_Name;  
SetState\_Name;  
__Description__  
The Name property returns a string representing the current layer object name\.


__Syntax__  
Property  UsedByPrims : Boolean;  
__Read/Write syntax__  
GetState\_UsedByPrims;  
SetState\_UsedByPrims;  
__Description__  
The UsedByPrims property indicates whether the layer object is used by primitives\.


__Syntax__  
Property  CopperThickness : Tcoord;  
__Read/Write syntax__  
GetState\_CopperThickness;  
SetState\_CopperThickness;  
__Description__  
The CopperThickness property returns \(or sets\) the copper thickness for the current layer object as a Tcood value type\. If needed, use the value conversion methods such as CoodToMils to change the value type\.


__Syntax__  
Property  IsDisplayed \[Board : IPCB\_Board\] : Boolean  
__Read/Write syntax__  
GetState\_IsDisplayed;  
SetState\_IsDisplayed;  
__Description__  
The IsDisplayed property returns the display state \(on/off\) of the layer object, as determined by the nominated board interface, Board\. See line 18 in the V6\_LayerID method example above\.


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



\- see [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.


\- see [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.


\- see [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.


\- see [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.


\- see [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.



\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.


\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.


__Syntax__  
Property  MechanicalLayerEnabled : Boolean;  
__Read/Write syntax__  
GetState\_MechLayerEnabled;  
SetState\_MechLayerEnabled;  
__Description__  
The MechanicalLayerEnabled property determines if this mechanical layer is enabled for the current PCB document\. Mechanical layers that already have design objects on them cannot be disabled\.


__Syntax__  
Property  LinkToSheet : Boolean;  
__Read/Write syntax__  
GetState\_LinkToSheet;  
SetState\_LinkToSheet;  
__Description__  
This property determines if this mechanical layer is linked to the sheet on the PCB document\. Once a sheet is linked to the mechanical layer, the sheet is automatically resized to fit the objects on the linked layer when a zoom command is executed\.


__Syntax__  
Property  DisplayInSingleLayerMode : Boolean;  
__Read/Write syntax__  
GetState\_DisplayInSingleLayerMode;  
SetState\_DisplayInSingleLayerMode;  
__Description__  
This property determines if the document is displayed in the single layer mode\. When set to True the system's single layer mode setting is overridden, so design objects on mechanical layers where the single layer mode is enabled will show up in the single layer mode\.


All methods inherited from the [IPCB\_DielectricObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DielectricObject) interface — see below\.


__Overview__  
The IPCB\_DielectricObject interface represents the dielectric properties for the specified PCB layer\.

Dielectric layer objects can be retrieved using the LayerObject function of the IPCB\_LayerStack interface, then accessed via the IPCB\_LayerObject interface\.

The the IPCB\_DielectricObject interface inherits all methods and properties from the the IPCB\_DielectricLayer interface, which in turn inherits from the IPCB\_LayerObject interface\. The IPCB\_DielectricObject and IPCB\_DielectricLayer interfaces offer identical methods and properties\.

__Methods and properties__

[__IPCB\_DielectricObject methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DielectricObject methods)

[__IPCB\_DielectricObject properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DielectricObject properties)

I\_ObjectAddress  
IsInLayerStack  
V6\_LayerID  
V7\_LayerID  
LayerStack  
^ Above methods inherited from IPCB\_LayerObject

Name  
UsedByPrims  
^ Above methods inherited from IPCB\_LayerObject  
DielectricMaterial  
DielectricType  
DielectricConstant  
DielectricHeight

__Example__

01

Procedure DielectricInfo;

02

Var

03

    Board      : IPCB\_Board;

04

    LayerStack : IPCB\_LayerStack;

05

    dObj       : IPCB\_DielectricObject;

06

    dType      : TDielectricType;

07

    dTypeS     : string;

08

    Str        : string;

09

 

10

Begin

11

    Board := PCBServer\.GetCurrentPCBBoard;

12

    LayerStack := Board\.LayerStack;

13

 

14

    // Use layer classes to retrieve board's first available dielectric layer\.

15

    dObj := LayerStack\.First\(eLayerClass\_Dielectric\);

16

 

17

    Str := 'Name, Layer Material, Thickness, Dielectric Material, Dielectric' \+ \#13\#10;

18

 

19

    Repeat

20

      // Retrieve dielectric object type property\.

21

      dType := dObj\.DielectricType;

22

 

23

      // Convert dielectric type to string\. Detected case could also be 0,1,2,3\.

24

      Case dType Of

25

        eNoDielectric    : dTypeS := 'None'; 

26

        eCore            : dTypeS := 'Core';

27

        ePrePreg         : dTypeS := 'PrePreg';

28

        eSurfaceMaterial : dTypeS := 'Surface Material';

29

      End;

30

 

31

      // Use DielectricObject interface to extract dielectric layer properties

32

      ShowInfo\(Str \+ dObj\.Name \+ ', ' \+ dTypeS \+ ', ' \+

33

                   FloatToStr\(dObj\.DielectricHeight / 10000\) \+ 'mil, ' \+

34

                   dObj\.DielectricMaterial \+  ', ' \+ FloatToStr\(dObj\.DielectricConstant\)\);

35

 

36

      // Call next dielectric layer

37

      dObj := LayerStack\.Next\(eLayerClass\_Dielectric, dObj\);

38

    Until dObj = Nil;

39

End;

[TLayerClassID reference](https://files.doc.altium.com/sites/default/files/wiki_attachments/272666/TLayerClassID.txt)


All methods inherited from the IPCB\_LayerObject interface\. See [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.



\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.


\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.


__Syntax__  
Property  DielectricMaterial : TPCBString;  
__Read/Write syntax__  
GetState\_DielectricMaterial;  
SetState\_DielectricMaterial;  
__Description__  
The DielectricMaterial property determines the dielectric material type for the current dielectric layer, such as FR\-4, Solder Resist, Polyamide etc\.


__Syntax__  
Property  DielectricType : TDielectricType;  
__Read/Write syntax__  
GetState\_DielectricType;  
SetState\_DielectricType;  
__Description__  
The DielectricType property determines the dielectric type for the current dielectric layer\. It returns a TDielectricType type string such as eCore or ePrePreg \(or a type number equivalent\)\.


__Syntax__  
Property  DielectricConstant : TReal;  
__Read/Write syntax__  
GetState\_DielectricConstant;  
SetState\_DielectricConstant;  
__Description__  
The DielectricConstant property defines the dielectric constant rating for the current dielectric layer\.


__Syntax__  
Property  DielectricHeight : TCoord  
__Read/Write syntax__  
GetState\_DielectricHeight;  
SetState\_DielectricHeight;  
__Description__  
The DielectricHeight property determines the dielectric material height \(thickness\) of the current dielectric layer in Tcood units\.


Inherits all methods and properties from the IPCB\_DielectricLayer interface, which inherits from the [IPCB\_DielectricObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DielectricObject) interface\.


Inherits all methods and properties from the [IPCB\_LayerObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject) interface\.


Inherits all methods and properties from the [IPCB\_LayerObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject) interface\.


The IPCB\_SignalLayer interface represents a signal layer in the layer stack for a PCB document\.

The IPCB\_SignalLayer interface inherits methods and properties from the IPCB\_ElectricalLayer and IPCB\_LayerObject\.

__Methods and properties__

__IPCB\_SignalLayer methods__

__IPCB\_SignalLayer properties__

I\_ObjectAddress  
IsInLayerStack  
V6\_LayerID  
V7\_LayerID  
LayerStack  
^ Above methods inherited from IPCB\_LayerObject  
 

Name  
UsedByPrims  
^ Above methods inherited from IPCB\_LayerObject  
CopperThickness  
^ Above method inherited from IPCB\_ElectricalLayer  
ComponentPlacement


__Overview__  
This IPCB\_InternalPlane interface represents an internal copper plane used on a PCB document\. 16 internal planes are supported, A net can be assigned to each of these layers, or a number of nets can share a power plane by splitting it into two or more isolated areas \(a Split Plane\)

Pad and via connections to power planes are controlled by the Plane design rules\.

The IPCB\_InternalPlane interface is used by the IPCB\_LayerStack\_V7 interface \- the LastInternalPlane and FirstAvailableInternalPlane methods\. IPCB\_InternalPlane inherits methods and properties from the IPCB\_ElectricalLayer and IPCB\_LayerObject interfaces\.

__Methods and properties__

[__IPCB\_InternalPlane methods__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_InternalPlane methods)

[__IPCB\_InternalPlane properties__](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_InternalPlane properties)

I\_ObjectAddress  
IsInLayerStack  
V6\_LayerID  
V7\_LayerID  
LayerStack  
^ Above methods inherited from IPCB\_LayerObject

Name  
UsedByPrims  
^ Above methods inherited from IPCB\_LayerObject  
CopperThickness  
^ Above method inherited from IPCB\_ElectricalLayer  
PullBackDistance  
NetName


All methods inherited from the IPCB\_LayerObject interface\. See [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.



\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.


\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.


__Syntax__  
Property  CopperThickness : Tcoord;  
__Read/Write syntax__  
GetState\_CopperThickness;  
SetState\_CopperThickness;  
__Description__  
The CopperThickness property returns \(or sets\) the copper thickness for the current layer object as a Tcood value type\. If needed, use the value conversion methods such as CoodToMils to change the value type\.


__Syntax__  
Property  PullBackDistance : TCoord;  
__Read/Write syntax__  
GetState\_PullBackDistance;  
SetState\_PullBackDistance;  
__Description__  
The PullBackDistance property returns \(or sets\) the internal plane copper pullback distance, as a Tcood value type, for the current layer object\.


__Syntax__  
Property  NetName : TPCBString;  
__Read/Write syntax__  
GetState\_NetName;  
SetState\_NetName;  
__Description__  
The NetName property is a string value that defines the net name for the current internal plane layer object\.


Inherits all methods and properties from the [IPCB\_InternalPlane](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_InternalPlane) interface\.


__Overview__  
The IPCB\_DrillLayerPair interface represents the paired drill layer for the layer stack up for the PCB document\.  
__Notes__  
The IPCB\_DrillLayerPair interface is a standalone interface\.  
The IPCB\_DrillLayerPair interface is a DrillLayerPair property from the IPCB\_Board interface\.

__DrillLayerPair methods__

__DrillLayerPair properties__

I\_ObjectAddress  
GetState\_Description  
IsSimilarTo  
OrderLayers

LowLayer  
HighLayer  
StartLayer  
StopLayer  
Board  
PlotDrillDrawing  
PlotDrillGuide

__Example__

01

Procedure ReportDrillPairs;

02

Var

03

    PCBBoard     : IPCB\_Board;

04

    i            : Integer;

05

    LayerPairs   : TStringList;

06

    PCBLayerPair : IPCB\_DrillLayerPair;

07

    LowLayerObj  : IPCB\_LayerObject;

08

    HighLayerObj : IPCB\_LayerObject;

09

    LowPos       : Integer;

10

    HighPos      : Integer;

11

    LS           : String;

12

 

13

Begin

14

    PCBBoard := PCBServer\.GetCurrentPCBBoard;

15

    If PCBBoard = Nil Then Exit;

16

 

17

    // Show number of drill layer pairs on board

18

    ShowInfo\('Number of Drill Layer pairs: ' \+ IntToStr\(PCBBoard\.DrillLayerPairsCount\)\);

19

 

20

    LayerPairs := TStringList\.Create;

21

    For i := 0 To PCBBoard\.DrillLayerPairsCount \- 1 Do

22

    Begin

23

        PCBLayerPair := PCBBoard\.LayerPair\[i\];

24

        LowLayerObj  := PCBBoard\.LayerStack\.LayerObject\[PCBLayerPair\.LowLayer\];

25

        HighLayerObj := PCBBoard\.LayerStack\.LayerObject\[PCBLayerPair\.HighLayer\];

26

        LowPos       := PCBBoard\.LayerPositionInSet\(SignalLayers, LowLayerObj\);

27

        HighPos      := PCBBoard\.LayerPositionInSet\(SignalLayers, HighLayerObj\);

28

 

29

        If LowPos <= HighPos Then

30

            LayerPairs\.Add\(LowLayerObj \.Name \+ ' \- ' \+ HighLayerObj\.Name\)

31

        Else

32

            LayerPairs\.Add\(HighLayerObj\.Name \+ ' \- ' \+ LowLayerObj \.Name\);

33

    End;

34

 

35

    //Display layer pairs\.

36

    LS := '';

37

    For i := 0 to LayerPairs\.Count \- 1 Do

38

        LS := LS \+ LayerPairs\[i\] \+ \#13\#10;

39

    ShowInfo\('Layer Pairs:'\#13\#10 \+ LS\);

40

    LayerPairs\.Free;

41

End;


__Overview__  
In Altium Designer there are 32 general purpose mechanical layers for defining the board layout, placing dimensions on, including fabrication details on, or any other mechanical details the design requires\. The purpose of the IPCB\_MechanicalLayerPairs Interface is to see and manipulate which Mechanical layers are paired to one another\.

When a component incorporates objects on one or more Mechanical layers that have been paired, the Layer property of those objects changes when the Layer property of the component is toggled \(between the Top and Bottom layers\), just like objects on the non\-Mechanical layers that have always been paired to one another, such as the Top and Bottom \(copper\) layers, the Top and Bottom Overlay layers, the Top and Bottom Paste Mask layers, and the Top and Bottom Solder Mask layers\.

__Notes__  
The IPCB\_MechanicalLayerPairs interface is a MechanicalPairs property of the IPCB\_Board interface — IPCB\_Board\.MechanicalPairs returns the IPCB\_MechanicalLayerPairs interface\.

Invoke the Count method to obtain the number of mechanical layer pairs for the existing PCB document\. The LayerPair\[I : Integer\] property defines indexed layer pairs and returns a TMechanicalLayerPair record of two PCB layers\.

__Methods and properties__

__IPCB\_MechanicalLayerPairs methods__

__IPCB\_MechanicalLayerPairs properties__

Clear  
Count  
AddPair  
RemovePair  
PairDefined  
LayerUsed  
FlipLayer  
FlipLayerV7  
Import\_FromParameters  
Export\_ToParameters

LayerPair

__Example__

01

Procedure AddMechPairs;

02

Var

03

    Board     : IPCB\_Board;

04

    MechPairs : IPCB\_MechanicalLayerPairs;

05

 

06

Begin

07

    Board := PCBServer\.GetCurrentPCBBoard;

08

    If Board = Nil Then Exit;

09

 

10

    MechPairs := Board\.MechanicalPairs;

11

 

12

    ShowInfo\('This Board has ' \+ IntToStr\(MechPairs\.Count\) \+ ' Mechanical Pairs'

13

              \+ \#13\#10 \+ 'Add a new pair?'\);

14

    // Pair mechanical layers 10 and 12 

15

    MechPairs\.AddPair\(66, 68\);

16

    ShowInfo\('Board now has ' \+ IntToStr\(MechPairs\.Count \) \+ ' Mechanical Pairs'

17

              \+ \#13\#10 \+ 'Clear mechanical pairs?'\);

18

    MechPairs\.Clear;

19

    ShowInfo\('Board now has ' \+ IntToStr\(MechPairs\.Count\) \+ ' Mechanical Pairs'\);

20

End;

__PCB API Design Objects Interfaces__

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [PCB API Design Objects Interfaces for version 22](https://www.altium.com/documentation/altium-designer/pcb-api-design-objects-interfaces)

*Parent page:* [Technical Reference \- PCB API](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

__PCB API: Design Objects Reference __

The PCB API Design Objects reference includes the following sections and content:

[__PCB Design Objects Interfaces__](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#PCB Design Objects Interfaces)

[__PCB Rule Objects Interfaces__](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#PCB Rule Objects Interfaces)

[__PCB Object Iterators__](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#PCB Object Iterators)

[IPCB\_Primitive Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Primitive Interface)  
[IPCB\_Arc Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Arc Interface)  
[IPCB\_BoardOutline](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_BoardOutline)  
[IPCB\_Component Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Component Interface)  
[IPCB\_ComponentBody Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ComponentBody Interface)  
[IPCB\_Coordinate](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Coordinate)  
[IPCB\_Connection Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Connection Interface)  
[IPCB\_ DifferentialPair Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ DifferentialPair Interface)  
[IPCB\_Embedded Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Embedded Interface)  
[IPCB\_EmbeddedBoard Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_EmbeddedBoard Interface)  
[IPCB\_Fill](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Fill)  
[IPCB\_FromTo Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_FromTo Interface)  
[IPCB\_Group](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Group)  
[IPCB\_LettersCache Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_LettersCache Interface)  
[IPCB\_LibComponent Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_LibComponent Interface)  
[IPCB\_Net Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Net Interface)  
[IPCB\_ObjectClass Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ObjectClass Interface)  
[IPCB\_Pad Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Pad Interface)  
[IPCB\_Pad2 Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Pad2 Interface)  
[IPCB\_Polygon Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Polygon Interface)  
[IPCB\_RectangularPrimitive Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RectangularPrimitive Interface)  
[IPCB\_Region Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Region Interface)  
[IPCB\_Text Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Text Interface)  
[IPCB\_Track Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Track Interface)  
[IPCB\_TTFontsCache Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_TTFontsCache Interface)  
[IPCB\_TTFontData Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_TTFontData Interface)  
[IPCB\_Via Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Via Interface)  
[IPCB\_Violation Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Violation Interface)  
[IPCB\_ContourPoint Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ContourPoint Interface)  
[IPCB\_Contour Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Contour Interface)  
[IPCB\_ContourMaker Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ContourMaker Interface)  
[Dimension Object Interfaces](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#Dimension Object Interfaces)

[IPCB\_Rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Rule)  
[IPCB\_AcuteAngle rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_AcuteAngle rule)  
[IPCB\_BrokenNetRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_BrokenNetRule rule)  
[IPCB\_ComponentClearanceConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ComponentClearanceConstraint rule)  
[IPCB\_ComponentRotationsRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ComponentRotationsRule rule)  
[IPCB\_ConfinementConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ConfinementConstraint rule)  
[IPCB\_ClearanceConstraint Rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ClearanceConstraint Rule)  
[IPCB\_DaisyChainStubLengthConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_DaisyChainStubLengthConstraint rule)  
[IPCB\_ DifferentialPairsRoutingRule Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ DifferentialPairsRoutingRule Interface)  
[IPCB\_FanoutControlRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_FanoutControlRule rule)  
[IPCB\_LayerPairsRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_LayerPairsRule rule)  
[IPCB\_MatchedNetLengthsConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MatchedNetLengthsConstraint rule)  
[IPCB\_MaxMinHeightConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MaxMinHeightConstraint rule)  
[IPCB\_MaxMinHoleSizeConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MaxMinHoleSizeConstraint rule)  
[IPCB\_MaxMinWidthConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MaxMinWidthConstraint rule)  
[IPCB\_MaxMinLengthConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MaxMinLengthConstraint rule)  
[IPCB\_MinimumAnnularRing rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MinimumAnnularRing rule)  
[IPCB\_MaximumViaCountRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MaximumViaCountRule rule)  
[IPCB\_NetsToIgnoreRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_NetsToIgnoreRule rule)  
[IPCB\_ParallelSegmentConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ParallelSegmentConstraint rule)  
[IPCB\_PasteMaskExpansionRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_PasteMaskExpansionRule rule)  
[IPCB\_PermittedLayersRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_PermittedLayersRule rule)  
[IPCB\_PowerPlaneClearanceRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_PowerPlaneClearanceRule rule)  
[IPCB\_PowerPlaneConnectStyleRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_PowerPlaneConnectStyleRule rule)  
[IPCB\_PolygonConnectStyleRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_PolygonConnectStyleRule rule)  
[IPCB\_RoutingCornerStyleRule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RoutingCornerStyleRule)  
[IPCB\_RoutingLayersRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RoutingLayersRule rule)  
[IPCB\_RoutingPriorityRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RoutingPriorityRule rule)  
[IPCB\_RoutingTopologyRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RoutingTopologyRule rule)  
[IPCB\_RoutingViaStyleRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RoutingViaStyleRule rule)  
[IPCB\_RuleSupplyNets rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RuleSupplyNets rule)  
[IPCB\_ShortCircuitConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ShortCircuitConstraint rule)  
[IPCB\_SMDNeckDownConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_SMDNeckDownConstraint rule)  
[IPCB\_SMDToCornerConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_SMDToCornerConstraint rule)  
[IPCB\_SMDToPlaneConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_SMDToPlaneConstraint rule)  
[IPCB\_SolderMaskExpansionRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_SolderMaskExpansionRule rule)  
[IPCB\_TestPointStyleRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_TestPointStyleRule rule)  
[IPCB\_TestPointUsage rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_TestPointUsage rule)  
[IPCB\_UnConnectedPinRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_UnConnectedPinRule rule)  
[IPCB\_ViasUnderSMDConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ViasUnderSMDConstraint rule)  
[Signal Integrity Design Rules](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#Signal Integrity Design Rules)

[IPCB\_AbstractIterator](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_AbstractIterator)  
[IPCB\_BoardIterator](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_BoardIterator)  
[IPCB\_LibraryIterator](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_LibraryIterator)  
[IPCB\_SpatialIterator](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_SpatialIterator)  
[IPCB\_GroupIterator](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_GroupIterator)

 

<a id="PCB_Design_Objects_Interfaces"></a>__PCB Design Objects Interfaces __

A PCB design object on a PCB document is represented by its interface\. An interface represents an existing object in memory and its properties and methods can be invoked\.

A PCB design object is basically a primitive or a group object\. A primitive can be a track or an arc object\. A group object is an object that is composed of child objects\. For example a board outline or a component is a group object\.  
Since many design objects are descended from ancestor interfaces and thus the ancestor methods and properties are also available to use\.

For example the IPCB\_Text interface is inherited from an immediate IPCB\_RectangularPrimitive interface and in turn inherited from the IPCB\_Primitive interface\. If you check the IPCB\_Text entry in this document you will see the following information:  
__The IPCB\_Text Interface hierarchy is as follows:__  
IPCB\_Primitive  
IPCB\_RectangularPrimitive  
IPCB\_Text  
and so on\.

This PCB Design Objects section is broken up into several categories — Primitives, Dimensions, Group Objects and Rectangular Objects:

- Primitives include arcs, embedded objects, fills, fromtos, pads, nets, tracks, vias, violations, object classes and connections\.
- Dimensions include Linear, Angular, Radial, Leader, Datum, Baseline, Center, Linear Diameter and Radial Diameter objects
- Group objects include board outlines, coordinates, components, polygons, library components \(footprints\) and nets\.
- Rectangular objects include text objects\.

__See also__  
[IPCB\_Primitive interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Primitive Interface)  
[IPCB\_Group interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Group)  
[IPCB\_Arc](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Arc Interface)  
[IPCB\_ObjectClass](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ObjectClass Interface)  
[IPCB\_Pad](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Pad Interface)  
[IPCB\_Via](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Via Interface)  
[IPCB\_Track](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Track Interface)  
[IPCB\_Embedded](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Embedded Interface)  
[IPCB\_Violation](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Violation Interface)  
[IPCB\_Text](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Text Interface)  
[IPCB\_Fill](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Fill)  
[IPCB\_Coordinate](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Coordinate)  
[IPCB\_Dimension](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#Dimension Object Interfaces)  
[IPCB\_Component](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Component Interface)  
[IPCB\_Polygon](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Polygon Interface)  
[IPCB\_Net](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Net Interface)  
[IPCB\_LibComponent](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_LibComponent Interface)

<a id="IPCB_Primitive_Interface"></a>__IPCB\_Primitive Interface__

__Overview__  
The __IPCB\_Primitive__ interface is the ancestor interface object for all other PCB interface objects and therefore the methods and properties declared in the __IPCB\_Primitive__ interface are also declared in the descendant interfaces\.

__Notes__  
Every PCB object has an unique object address stored in a PCB design database for that document this object resides on\. Each PCB object address has the __TPCBObjectHandle__ type\.  
Every existing PCB design object on a PCB document has the Board owner which represents the specific board document\.  
Each existing PCB design object on a PCB document has Query Rule Properties which can be queried\.  
A primitive has a bounding rectangle which encapsulates the region of the primitive\. There are two other bounding rectangles which are for selection and for painting \(refreshing and updating\)\.

__IPCB\_Primitive methods__  
GetState\_Board  
GetState\_ObjectId  
GetState\_Layer  
GetState\_Selected  
SetState\_Selected  
GetState\_IsPreRoute  
SetState\_IsPreRoute  
GetState\_InSelectionMemory  
SetState\_InSelectionMemory  
GetState\_PadCacheRobotFlag  
SetState\_PadCacheRobotFlag  
GetState\_Enabled  
SetState\_Enabled  
GetState\_Enabled\_Direct  
SetState\_Enabled\_Direct  
GetState\_Enabled\_vNet  
SetState\_Enabled\_vNet  
GetState\_Enabled\_vPolygon  
SetState\_Enabled\_vPolygon  
GetState\_Enabled\_vComponent  
SetState\_Enabled\_vComponent  
GetState\_Enabled\_vCoordinate  
SetState\_Enabled\_vCoordinate  
GetState\_Enabled\_vDimension  
SetState\_Enabled\_vDimension  
GetState\_Used  
SetState\_Used  
GetState\_DRCError  
SetState\_DRCError  
GetState\_MiscFlag1  
SetState\_MiscFlag1  
GetState\_MiscFlag2  
SetState\_MiscFlag2  
GetState\_MiscFlag3  
SetState\_MiscFlag3  
GetState\_EnableDraw  
SetState\_EnableDraw  
GetState\_Moveable  
SetState\_Moveable  
GetState\_UserRouted  
SetState\_UserRouted  
GetState\_TearDrop  
SetState\_TearDrop  
GetState\_IsTenting  
SetState\_IsTenting  
GetState\_IsTenting\_Top  
SetState\_IsTenting\_Top  
GetState\_IsTenting\_Bottom  
SetState\_IsTenting\_Bottom  
GetState\_IsTestPoint\_Top  
SetState\_IsTestPoint\_Top  
GetState\_IsTestPoint\_Bottom  
SetState\_IsTestPoint\_Bottom  
GetState\_IsKeepout  
SetState\_IsKeepout  
GetState\_AllowGlobalEdit  
SetState\_AllowGlobalEdit  
GetState\_PolygonOutline  
SetState\_PolygonOutline  
GetState\_InBoard  
SetState\_InBoard  
GetState\_InPolygon  
SetState\_InPolygon  
GetState\_InComponent  
SetState\_InComponent  
GetState\_InNet  
SetState\_InNet  
GetState\_InCoordinate  
SetState\_InCoordinate  
GetState\_InDimension  
SetState\_InDimension  
GetState\_IsElectricalPrim  
SetState\_Board  
SetState\_Layer  
GetState\_ObjectIDString  
GetState\_Identifier  
GetState\_DescriptorString  
GetState\_DetailString  
GetState\_Index  
SetState\_Index  
   
GetState\_UnionIndex  
SetState\_UnionIndex  
   
GetState\_PowerPlaneConnectStyle  
GetState\_ReliefConductorWidth  
GetState\_ReliefEntries  
GetState\_ReliefAirGap  
GetState\_PasteMaskExpansion  
GetState\_SolderMaskExpansion  
GetState\_PowerPlaneClearance  
GetState\_PowerPlaneReliefExpansion  
GetState\_Net  
GetState\_Component  
GetState\_Polygon  
GetState\_Coordinate  
GetState\_Dimension  
GetState\_ViewableObjectID  
SetState\_Net  
SetState\_Component  
SetState\_Polygon  
SetState\_Coordinate  
SetState\_Dimension  
   
I\_ObjectAddress  
BoundingRectangle  
BoundingRectangleForSelection  
BoundingRectangleForPainting  
IsHidden  
IsFreePrimitive  
IsSaveable  
AddPCBObject  
RemovePCBObject  
   
MoveByXY  
MoveToXY  
RotateBy  
FlipXY  
Mirror  
SwapLayerPairs  
GraphicallyInvalidate  
   
BeginModify  
EndModify  
CancelModify  
   
Export\_ToParameters  
RequiredParamterSpace

__IPCB\_Primitive properties__  
Board  
ObjectId  
Layer  
Index  
Selected  
IsPreRoute  
InSelectionMemory  
PadCacheRobotFlag  
Enabled  
Enabled\_Direct  
Enabled\_vNet  
Enabled\_vPolygon  
Enabled\_vComponent  
Enabled\_vCoordinate  
Enabled\_vDimension  
Used  
DRCError  
MiscFlag1  
MiscFlag2  
MiscFlag3  
EnableDraw  
Moveable  
UserRouted  
TearDrop  
IsTenting  
IsTenting\_Top  
IsTenting\_Bottom  
IsTestpoint\_Top  
IsTestpoint\_Bottom  
IsKeepout  
AllowGlobalEdit  
PolygonOutline  
InBoard  
InPolygon  
InComponent  
InNet  
InCoordinate  
InDimension  
IsElectricalPrim  
ObjectIDString  
Identifier  
Descriptor  
Detail  
PowerPlaneConnectStyle  
ReliefConductorWidth  
ReliefEntries  
ReliefAirGap  
PasteMaskExpansion  
SolderMaskExpansion  
PowerPlaneClearance  
PowerPlaneReliefExpansion  
Net  
Component  
Polygon  
Coordinate  
Dimension  
ViewableObjectID  
UnionIndex

__See also__  
PCB Design Objects

__Methods__

__BeginModify method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure BeginModify;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Primitive interface

__BoundingRectangle method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function BoundingRectangle : TCoordRect;  
__Description__  
This function returns the coordinates of the bounding rectangle that encapsulates the design object on a PCB document\. There are other two bounding rectangle methods\.  
__Example__

01

Var

02

    R : TCoordRect;

03

Begin

04

    // check for comment / name objects

05

    If P\.ObjectId <> eTextObject Then

06

    Begin

07

        R := P\.BoundingRectangle;

08

        If R\.left   < MinX Then MinX := R\.left;

09

        If R\.bottom < MinY Then MinY := R\.bottom;

10

        If R\.right  > MaxX Then MaxX := R\.right;

11

        If R\.top    > MaxY Then MaxY := R\.top;

12

    End;

13

End;

__See also__  
IPCB\_Primitive interface  
TCoordRect type  
BoundingRectangle script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder\.

__BoundingRectangleForSelection method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function BoundingRectangleForSelection : TCoordRect;  
__Description__  
The bounding rectangle of a design object used for selection is a bit bigger than the bounding rectangle of a design object itself\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__BoundingRectangleForPainting method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function BoundingRectangleForPainting : TCoordRect;  
__Description__  
The bounding rectangle of a design object for painting is potentially the largest of all bounding rectangles because for example a component can have comment and designator objects as well\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__CancelModify method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure CancelModify;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Primitive interface

__EndModify method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure EndModify;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Primitive interface

__FlipXY method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure FlipXY \(Axis : TCoord;MirrOp : TMirrorOperation\);  
__Description__  
This procedure flips the object about the axis depending on Axis and MirrOp parameters\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TMirrorOperation type

__GraphicallyInvalidate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure GraphicallyInvalidate;  
__Description__  
This procedure renders the object graphically invalidate which forces a system graphical update /refresh on the PCB document\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__I\_ObjectAddress method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
This function returns the true pointer value of the object interface of a design object\.  
Note  
The IPCB\_ServerInterface\.__SendMessageToRobots__ method needs the __I\_ObjectAddress__ parameter which is the handle of a design object\.  
__Example__

1

//Notify PCB that the fill object is going to be changed\.

2

PCBServer\.SendMessageToRobots\(

3

        Fill\.I\_ObjectAddress, 

4

        c\_Broadcast, 

5

        PCBM\_BeginModify , 

6

        c\_NoEventData\);

__See also__  
IPCB\_Primitive interface

__IsFreePrimitive method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function IsFreePrimitive : Boolean;  
__Description__  
This function determines whether the object is a free primitive \(not connected to a net\) or just a standalone object\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsHidden method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function IsHidden : Boolean;  
__Description__  
This function determines whether this object is hidden from view or not\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsSaveable method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function IsSaveable \(AVer : TAdvPCBFileFormatVersion\) : Boolean;  
__Description__  
This function determines whether this particular object can be saved in a specified file format version according to the __TAdvPCBFileFormatVersion__ type\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TAdvPCBFileFormatVersion type

__Mirror method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure Mirror \(Axis : TCoord;MirrOp : TMirrorOperation\);  
__Description__  
This procedure mirrors the design object across the axis depending on the mirror operation\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TMirrorOperation type

__MoveByXY method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure MoveByXY \(AX, AY : TCoord\);  
__Description__  
This procedure moves the design object by an offset in horizontal and vertical directions specified by the AX and AY parameters\.  
__Example__

1

//Move the object by a specified offset

2

XStep := DistanceStep \* Cos\(AngleStep\);

3

YStep := DistanceStep \* Sin\(AngleStep\);

4

PcbObject\.MoveByXY\(XStep,YStep\);

__See also__  
IPCB\_Primitive interface

__MoveToXY method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure MoveToXY \(AX, AY : TCoord\);  
__Description__  
This procedure moves the design object to a new location specified by the AX and AY parameters\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__RotateBy method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure RotateBy \(Angle : TAngle\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SwapLayerPairs method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SwapLayerPairs;  
__Description__  
This procedure swaps the current layer pair that the PCB design object \(vias and pads only\) has\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState and SetState Methods__

__GetState\_AllowGlobalEdit method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_AllowGlobalEdit : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Board method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Board : IPCB\_Board;  
__Description__  
The Board property determines the PCB document that the object itself is associated with\. This method is used by the Board property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Component method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Component : IPCB\_Component;  
__Description__  
This property determines whether the object itself is associated with the component or not\. This method retrieves the Component and is used in the Component property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Coordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Coordinate : IPCB\_Coordinate;  
__Description__  
This property determines whether the object itself is associated with the coordinate object or not\. This method retrieves the coordinate object and is used in the Coordinate property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_DescriptorString method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_DescriptorString : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_DetailString method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_DetailString : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Dimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Dimension : IPCB\_Dimension;  
__Description__  
This property determines whether the object itself is associated with the dimension object or not\. This method retrieves the Dimension and is used in the Dimension property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_EnableDraw method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_EnableDraw : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Identifier method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Identifier : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InBoard method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InBoard : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InComponent method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InComponent : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InCoordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InCoordinate : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Index method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Index : Word;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InDimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InDimension : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_vDimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_vDimension : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InNet method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InNet : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_vPolygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_vPolygon : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_vNet method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_vNet : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_DRCError method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_DRCError : Boolean;  
__Description__  
The DRCError property determines whether the object is affected by the Design Rule Checker and thus if the object breaks one of the design rules, the DRCError is true\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_Direct method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_Direct : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_vComponent method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_vComponent : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_vCoordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_vCoordinate : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InPolygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InPolygon : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InSelectionMemory method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InSelectionMemory \(Index : Integer\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsElectricalPrim method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsElectricalPrim : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsTenting method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsTenting : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsKeepout method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsKeepout : Boolean;  
__Description__  
The keepout layer generally defines areas on the PCB document that you don't want automatically or manually routed, and this can include clearance areas around mounting hole pads or high voltage components for example\.  
This function determines whether the object itself is used for the keep out boundary\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Moveable method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Moveable : Boolean;  
__Description__  
This method determines whether this design object can be moved or not \(by the autorouter for example\)\.  
This method is used by the Moveable property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsTenting\_Bottom method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsTenting\_Bottom : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsTenting\_Top method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsTenting\_Top : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsTestPoint\_Bottom method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsTestPoint\_Bottom : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsTestPoint\_Top method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsTestPoint\_Top : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Layer method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Layer : TLayer;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_MiscFlag1 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_MiscFlag1 : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_MiscFlag3 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_MiscFlag3 : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Net method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Net : IPCB\_Net;  
__Description__  
The net property of an object denotes it has an electrical property, meaning it is connected from one node to another\. The method fetches the net of an object \(if it has one\)\.  
This method is used for the Net property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_MiscFlag2 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_MiscFlag2 : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsPreRoute method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsPreRoute : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ReliefEntries method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ReliefEntries : Integer;  
__Description__  
This method retrieves the number of relief entries for a pad/via object\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PasteMaskExpansion method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PasteMaskExpansion : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Polygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Polygon : IPCB\_Polygon;  
__Description__  
This function retrieves the IPCB\_Polygon interface that the design object primitive is associated with\. For example, a polygon may contain arcs and tracks, and when you only have the arc, you can retreive the polygon the arc is associated with\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PolygonOutline method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PolygonOutline : Boolean;  
__Description__  
This function determines whether the design object primitive is part of the polygon outline or not\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PowerPlaneClearance method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PowerPlaneClearance : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PowerPlaneConnectStyle method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PowerPlaneConnectStyle : TPlaneConnectStyle;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PowerPlaneReliefExpansion method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PowerPlaneReliefExpansion : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ObjectIDString method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ObjectIDString : TPCBString;  
__Description__  
This __ObjectIDString__ property returns the Object Id string\. For example eTrackObject type will yield a Track string\.  
The method returns a object id string for the associated object and is used in the ObjectIDString property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ReliefConductorWidth method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ReliefConductorWidth : TCoord;  
__Description__  
This method retrieves the relief conductor width of a pad or via object as a TCoord value\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ObjectId method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ObjectId : TObjectId;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Selected method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Selected : Boolean;  
__Description__  
This method determines whether this object is selected or not on the PCB document\. This method is used by the Selected property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_SolderMaskExpansion method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_SolderMaskExpansion : TCoord;  
__Description__  
The solder mask expansion property determines the shape that is created on the solder mask layer at each pad and via site\. This shape is expanded or contracted radially by the amount specified by this rule\. This property over\-rides the solder mask expansion design rule\.  
This method is used for the SolderMaskExpansion property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_TearDrop method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_TearDrop : Boolean;  
__Description__  
This method determines whether the PCB object \(an arc or track object\) is used for as a tear drop\.  
This TearDrop property is supported by the GetState\_TearDrop and SetState\_TearDrop methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Used method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Used : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ReliefAirGap method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ReliefAirGap : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PadCacheRobotFlag method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PadCacheRobotFlag : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_UserRouted method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_UserRouted : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ViewableObjectID method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ViewableObjectID : TViewableObjectID;  
__Description__  
The property determines the ViewableObjectID of the design object\. The TViewableObjectID type is a more descriptive ID of a design object  than the TObjectID type\.  
For example any type of dimension object is a eDimension type according to the TObjectID but could be one of the eViewableObject\_LinearDimension\.\.\.eViewableObject\_RadialDiameterDimension value\.  
This function returns the TViewableObjectID and is used in the ViewableObjectID property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InComponent method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InComponent \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_Direct method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_Direct \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_vComponent method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_vComponent \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_vCoordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_vCoordinate\(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_vDimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_vDimension \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_vNet method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_vNet \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_vPolygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_vPolygon \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_DRCError method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_DRCError \(Value : Boolean\);  
__Description__  
The DRCError property determines whether the object is affected by the Design Rule Checker and thus if the object breaks one of the design rules, the DRCError property is true\. This method is used in the DRCError property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InBoard method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InBoard \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Dimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Dimension \(Value : IPCB\_Dimension\);  
__Description__  
This property determines whether the object itself is associated with the dimension object or not\. This method sets the dimension object and is used in the Dimension property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_EnableDraw method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_EnableDraw \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_AllowGlobalEdit method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_AllowGlobalEdit \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Board method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Board \(ABoard : IPCB\_Board\);  
__Description__  
The Board property determines the PCB document that the object itself is associated with\. This method sets the PCB document that the object is associated with and is used in the Board property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Component method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Component \(Value : IPCB\_Component\);  
__Description__  
This property determines whether the object itself is associated with the component or not\. This method sets the Component and is used in the Component property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Coordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Coordinate \(Value : IPCB\_Coordinate\);  
__Description__  
This property determines whether the object itself is associated with the coordinate object or not\. This method retrieves the Coordinate object and is used in the Coordinate property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InDimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InDimension \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InCoordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InCoordinate \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InNet method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InNet \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Index method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Index \(AIndex : Word\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Layer method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Layer \(ALayer : TLayer\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InPolygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InPolygon \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InSelectionMemory method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InSelectionMemory \(Index : Integer;Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsKeepout method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsKeepout \(Value : Boolean\);  
__Description__  
The keepout layer generally defines areas on the PCB document that you don't want automatically or manually routed, and this can include clearance areas around mounting hole pads or high voltage components for example\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsPreRoute method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsPreRoute \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsTenting method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsTenting \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsTenting\_Bottom method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsTenting\_Bottom \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsTenting\_Top method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsTenting\_Top \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsTestPoint\_Top method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsTestPoint\_Top \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_MiscFlag1 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_MiscFlag1 \(Value : Boolean\);  
__Description__  
This method sets a boolean value to the MiscFlag1 field and can be used for custom purposes\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_MiscFlag2 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_MiscFlag2 \(Value : Boolean\);  
__Description__  
This method sets a boolean value to the MiscFlag2 field and can be used for custom purposes\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsTestPoint\_Bottom method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsTestPoint\_Bottom \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_UserRouted method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_UserRouted \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_MiscFlag3 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_MiscFlag3 \(Value : Boolean\);  
__Description__  
This method sets a boolean value to the MiscFlag3 field and can be used for custom purposes\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Moveable method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Moveable \(Value : Boolean\);  
__Description__  
This method sets whether this design object can be moved or not \(by the autorouter for example\)\.  
This method is used by the Moveable property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Net method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Net \(Value : IPCB\_Net\);  
__Description__  
The net property of an object denotes it has an electrical property, meaning it is connected from one node to another\. The method sets the valid net to an object\.  
This method is used for the Net property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_PadCacheRobotFlag method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_PadCacheRobotFlag \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Polygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Polygon \(Value : IPCB\_Polygon\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_PolygonOutline method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_PolygonOutline \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Selected method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Selected \(B : Boolean\);  
__Description__  
This method determines whether this object is selected or not on the PCB document by passing in a boolean parameter\.  
This method  is used by the Selected property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Used method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Used \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_TearDrop method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_TearDrop \(Value : Boolean\);  
__Description__  
This method determines whether the PCB object \(an arc or track object\) is used for as a tear drop\.  
This TearDrop property is supported by the GetState\_TearDrop and SetState\_TearDrop methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Properties__

__AllowGlobalEdit property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property AllowGlobalEdit : Boolean Read GetState\_AllowGlobalEdit Write SetState\_AllowGlobalEdit;  
__Description__  
This property is supported by the GetState\_AllowGlobalEdit and SetState\_AllowGlobalEdit methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Board property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Board : IPCB\_Board Read GetState\_Board Write SetState\_Board;  
__Description__  
The Board property determines the PCB document that the object itself is associated with\. This property is supported by the GetState\_Board and SetState\_Board methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Component property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Component : IPCB\_Component Read GetState\_Component Write SetState\_Component;  
__Description__  
This property determines whether the object itself is associated with the component or not\. This property is supported by the GetState\_Component and SetState\_Component methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Coordinate property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Coordinate : IPCB\_Coordinate Read GetState\_Coordinate Write SetState\_Coordinate;  
__Description__  
The Coordinate property returns the IPCB\_Coordinate only if this object itself is part of the IPCB\_Coordinate type\. A coordinate object is a group object and is composed of design object primitives such as tracks, arcs and text objects\.  
This property is supported by the GetState\_Coordinate and SetState\_Coordinate methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Detail property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Detail : TPCBString Read GetState\_DetailString;  
__Description__  
This property retrieves the Detail text string for this design object\. This property is supported by the GetState\_Detail method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Dimension property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Dimension : IPCB\_Dimension Read GetState\_Dimension Write SetState\_Dimension;  
__Description__  
The Coordinate property returns the IPCB\_Dimension only if this object itself is part of the IPCB\_Dimension type\. A dimension object is a group object and is composed of design object primitives such as tracks, arcs and text objects\.  
This property is supported by the GetState\_Dimension and SetState\_Dimension methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__DRCError property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property DRCError : Boolean Read GetState\_DRCError Write SetState\_DRCError;  
__Description__  
The DRCError property determines whether the object is affected by the Design Rule Checker and thus if the object breaks one of the design rules, the DRCError is true\.  
This property is supported by the GetState\_DRCError and SetState\_DRCError methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Descriptor property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Descriptor : TPCBString Read GetState\_DescriptorString;  
__Description__  
The Descriptor read only property fetches the Descriptor string\.  
This property is supported by the GetState\_Descriptor methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_Direct property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_Direct : Boolean Read GetState\_Enabled\_Direct Write SetState\_Enabled\_Direct;  
__Description__  
This property is supported by the GetState\_Direct and SetState\_Direct methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled : Boolean Read GetState\_Enabled Write SetState\_Enabled;  
__Description__  
This property is supported by the GetState\_Enabled and SetState\_Enabled methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_vComponent property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_vComponent : Boolean Read GetState\_Enabled\_vComponent Write SetState\_Enabled\_vComponent;  
__Description__  
This property is supported by the GetState\_vComponent and SetState\_vComponent methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_vCoordinate property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_vCoordinate : Boolean Read GetState\_Enabled\_vCoordinate Write SetState\_Enabled\_vCoordinate;  
__Description__  
This property is supported by the GetState\_vCoordinate and SetState\_vCoordinate methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_vDimension property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_vDimension : Boolean Read GetState\_Enabled\_vDimension Write SetState\_Enabled\_vDimension;  
__Description__  
This property is supported by the GetState\_vDimension and SetState\_vDimension methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_vNet property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_vNet : Boolean Read GetState\_Enabled\_vNet Write SetState\_Enabled\_vNet;  
__Description__  
This property is supported by the GetState\_vNet and SetState\_vNet methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_vPolygon property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_vPolygon : Boolean Read GetState\_Enabled\_vPolygon Write SetState\_Enabled\_vPolygon;  
__Description__  
This property is supported by the GetState\_vPolygon and SetState\_vPolygon methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__EnableDraw property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property EnableDraw : Boolean Read GetState\_EnableDraw Write SetState\_EnableDraw;  
__Description__  
This property is supported by the GetState\_EnableDraw and SetState\_EnableDraw methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InDimension property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InDimension : Boolean Read GetState\_InDimension Write SetState\_InDimension;  
__Description__  
This InDimension property determines whether the obejct itself is part of the dimension object or not\.  
This property is supported by the GetState\_InDimension and SetState\_InDimension methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Identifier property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Identifier : TPCBString Read GetState\_Identifier;  
__Description__  
This property is supported by the GetState\_Identifier  method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InBoard property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InBoard : Boolean Read GetState\_InBoard Write SetState\_InBoard;  
__Description__  
This InBoard property determines whether the object itself is part of the board object or not\.  
This property is supported by the GetState\_InBoard and SetState\_InBoard methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InComponent property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InComponent : Boolean Read GetState\_InComponent Write SetState\_InComponent;  
__Description__  
This InComponent property determines whether the object itself is part of the component object or not\.  
This property is supported by the GetState\_InComponent and SetState\_InComponent methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Index property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Index : Word Read GetState\_Index Write SetState\_Index;  
__Description__  
This property is supported by the GetState\_Index and SetState\_Index methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InNet property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InNet : Boolean Read GetState\_InNet Write SetState\_InNet;  
__Description__  
This property is supported by the GetState\_InNet and SetState\_InNet methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InPolygon property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InPolygon : Boolean Read GetState\_InPolygon Write SetState\_InPolygon;  
__Description__  
This InPolygon property determines whether the object itself is part of the polygon object or not\.  
This property is supported by the GetState\_InPolygon and SetState\_InPolygon methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InSelectionMemory property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InSelectionMemory \[I : Integer\] : Boolean Read GetState\_InSelectionMemory Write SetState\_InSelectionMemory;  
__Description__  
This property is supported by the GetState\_InSelectionMemory and SetState\_InSelectionMemory methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsElectricalPrim property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsElectricalPrim : Boolean Read GetState\_IsElectricalPrim;  
__Description__  
This property determines whether this PCB object possesses an electrical property\- tracks, fills, polygons, arcs, vias all have electrical properties \- basically those objects that have a Net property will possess an electrical property\.  
Embedded boards and Embedded objects etc don't have an electrical property for example\.  
This property is supported by the GetState\_IsElectricalPrim and SetState\_IsElectricalPrim methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InCoordinate property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InCoordinate : Boolean Read GetState\_InCoordinate Write SetState\_InCoordinate;  
__Description__  
This InCoordinate property determines whether the object itself is part of the coordinate object or not\.  
This property is supported by the GetState\_InCoordinate and SetState\_InCoordinate methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsKeepout property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsKeepout : Boolean Read GetState\_IsKeepout Write SetState\_IsKeepout;  
__Description__  
This property determines whether a PCB object is used as a keep\-out object\. Currently arc, track and fill objects are used as keep out objects\. The keepout layer generally defines areas on the PCB document that you don't want automatically or manually routed, and this can include clearance areas around mounting hole pads or high voltage components for example\.  
This property is supported by the GetState\_IsKeepOut and SetState\_IsKeepOut methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsPreRoute property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsPreRoute : Boolean Read GetState\_IsPreRoute Write SetState\_IsPreRoute;  
__Description__  
This property is supported by the GetState\_IsPreRoute and SetState\_IsPreRoute methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsTestpoint\_Bottom property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsTestpoint\_Bottom : Boolean Read GetState\_IsTestpoint\_Bottom Write SetState\_IsTestpoint\_Bottom;  
__Description__  
This property determines whether a pad or via is used as a test point on the bottom layer\.  
This property is supported by the GetState\_IsTestpoint\_Bottom and SetState\_IsTestPoint\_Bottom methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsTenting property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsTenting : Boolean Read GetState\_IsTenting Write SetState\_IsTenting;  
__Description__  
This property determines whether the solder mask of pad and via objects are tented on top and bottom layers\.  A tenting closes an opening in the mask of pad or via objects\.  
This property is supported by the GetState\_IsTenting and SetState\_IsTenting methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsTenting\_Top property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsTenting\_Top : Boolean Read GetState\_IsTenting\_Top Write SetState\_IsTenting\_Top;  
__Description__  
This property determines whether the solder mask of pad and via objects are tented or not on the top layer\.  A tenting closes an opening in the mask of pad or via objects\.  
This property is supported by the GetState\_IsTenting\_Top and SetState\_IsTenting\_Top methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsTestpoint\_Top property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsTestpoint\_Top : Boolean Read GetState\_IsTestpoint\_Top Write SetState\_IsTestpoint\_Top;  
__Description__  
This property determines whether a pad or via is used as a test point on the top layer\.  
This property is supported by the GetState\_IsTestpoint\_Top and SetState\_IsTestpoint\_Top methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Layer property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Layer : TLayer Read GetState\_Layer Write SetState\_Layer;  
__Description__  
This layer denotes which layer the object is on\.  
This property is supported by the GetState\_Layer and SetState\_layer methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TLayer type

__MiscFlag1 property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property MiscFlag1 : Boolean Read GetState\_MiscFlag1 Write SetState\_MiscFlag1;  
__Description__  
This property determines the boolean value from the MiscFlag1 property and can be used for custom purposes\.  
This property is supported by the GetState\_MiscFlag1 and SetState\_MiscFlag1 methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__MiscFlag2 property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property MiscFlag2 : Boolean Read GetState\_MiscFlag2 Write SetState\_MiscFlag2;  
__Description__  
This property determines the boolean value from the MiscFlag2 property and can be used for custom purposes\.  
This property is supported by the GetState\_MiscFlag2 and SetState\_MiscFlag2 methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__MiscFlag3 property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property MiscFlag3 : Boolean Read GetState\_MiscFlag3 Write SetState\_MiscFlag3;  
__Description__  
This property determines the boolean value from the MiscFlag3 property and can be used for custom purposes\.  
This property is supported by the GetState\_MiscFlag3 and SetState\_MiscFlag3 methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsTenting\_Bottom property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsTenting\_Bottom : Boolean Read GetState\_IsTenting\_Bottom Write SetState\_IsTenting\_Bottom;  
__Description__  
This property determines whether the solder mask of pad and via objects are tented or not on the bottom layer\.  A tenting closes an opening in the mask of pad or via objects\.  
This property is supported by the GetState\_IsTenting\_Bottom and SetState\_IsTenting\_Bottom methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Moveable property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Moveable : Boolean Read GetState\_Moveable Write SetState\_Moveable;  
__Description__  
This property determines whether this design object can be moved or not \(by the autorouter for example\)\.  
This property is supported by the GetState\_Moveable and SetState\_Moveable methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Net property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Net : IPCB\_Net Read GetState\_Net Write SetState\_Net;  
__Description__  
The Net property of an object denotes it has an electrical property, meaning it is connected from one node to another\.  
This property is supported by the GetState\_Net and SetState\_Net methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
NetObjectAssign script from the \\__Example__s\\Scripts\\Delphiscript Scripts\\Pcb\\

__ObjectId property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ObjectId : TObjectId Read GetState\_ObjectId;  
__Description__  
This ObjectId property determines what Object Id this object is\. Please note that this ObjectId type is a limited set and to have a wider range of Object IDs, check the TViewableObjectId type\.  
This read only property is supported by the GetState\_ObjectId method\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
ViewableObjectId property

__ObjectIDString property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ObjectIDString : TPCBString Read GetState\_ObjectIDString;  
__Description__  
This ObjectIDString property returns the Object Id string\. For example eTrackObject type will yield a Track string\.  
This read only property is supported by the GetState\_ObjectIDString method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PadCacheRobotFlag property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PadCacheRobotFlag : Boolean Read GetState\_PadCacheRobotFlag Write SetState\_PadCacheRobotFlag;  
__Description__  
This property is supported by the GetState\_PadCacheRobotFlag and SetState\_PadCacheRobotFlag methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PasteMaskExpansion property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PasteMaskExpansion : TCoord Read GetState\_PasteMaskExpansion;  
__Description__  
This property is supported by the GetState\_PasteMaskExpansion and SetState\_PasteMaskExpansion methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Polygon property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Polygon : IPCB\_Polygon Read GetState\_Polygon Write SetState\_Polygon;  
__Description__  
This property is supported by the GetState\_Polygon and SetState\_Polygon methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PolygonOutline property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PolygonOutline : Boolean Read GetState\_PolygonOutline Write SetState\_PolygonOutline;  
__Description__  
This property is supported by the GetState\_PolygonOutline and SetState\_PolygonOutline methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PowerPlaneReliefExpansion property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PowerPlaneReliefExpansion : TCoord Read GetState\_PowerPlaneReliefExpansion;  
__Description__  
This property is supported by the GetState\_PowerPlaneReliefExpansion method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PowerPlaneClearance property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PowerPlaneClearance : TCoord Read GetState\_PowerPlaneClearance;  
__Description__  
This property is supported by the GetState\_PowerPlaneClearance method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PowerPlaneConnectStyle property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PowerPlaneConnectStyle : TPlaneConnectStyle Read GetState\_PowerPlaneConnectStyle;  
__Description__  
This property is supported by the GetState\_PowerPlaneConnectStyle method\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TPlaneConnectStyle type

__ReliefAirGap property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ReliefAirGap : TCoord Read GetState\_ReliefAirGap;  
__Description__  
The ReliefAirGap property retrieves the relief air gap value for this pad/via object\.  
This read only property is supported by the GetState\_ReliefAirGap method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__ReliefConductorWidth property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ReliefConductorWidth : TCoord Read GetState\_ReliefConductorWidth;  
__Description__  
The ReliefConductorWidth property retrieves the relief conductor width value for a this pad/via object\.  
This read only property is supported by the GetState\_ReliefConductorWidth method  
__Example__  
__See also__  
IPCB\_Primitive interface

__ReliefEntries property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ReliefEntries : Integer Read GetState\_ReliefEntries;  
__Description__  
This property retrieves the number of relief entries for a pad/via object\.  
This read only property is supported by the GetState\_ReliefEntries method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Selected property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Selected : Boolean Read GetState\_Selected Write SetState\_Selected;  
__Description__  
This property determines whether this object is selected or not on the PCB document\.  
This property is supported by the GetState\_Selected and SetState\_Selected methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SolderMaskExpansion property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property SolderMaskExpansion : TCoord Read GetState\_SolderMaskExpansion;  
__Description__  
The solder mask expansion property determines the shape that is created on the solder mask layer at each pad and via site\. This shape is expanded or contracted radially by the amount specified by this rule\. This property over\-rides the solder mask expansion design rule\.  
This read\-only property is supported by the GetState\_SolderMaskExpansion method\.  
__Notes__  
A Solder Mask expansion property for a pad object is currently relevant just for pads on top and bottom copper layers\.   
Paste mask layers are used to design stencils which will selectively place solder paste on a blank PCB\.  Vias do not have a paste mask layer\.  
Solder paste is only placed on pads where component leads are to be soldered to them\. Vias normally don't have anything soldered onto them\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__TearDrop property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property TearDrop : Boolean Read GetState\_TearDrop Write SetState\_TearDrop;  
__Description__  
This property determines whether the PCB object \(an arc or track object\) is used for as a tear drop\.  
This property is supported by the GetState\_TearDrop and SetState\_TearDrop methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Used property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Used : Boolean Read GetState\_Used Write SetState\_Used;  
__Description__  
This property is supported by the GetState\_Used and SetState\_Used methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__UserRouted property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property UserRouted : Boolean Read GetState\_UserRouted Write SetState\_UserRouted;  
__Description__  
This property is supported by the GetState\_UserRouted and SetState\_UserRouted methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__ViewableObjectID property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ViewableObjectID : TViewableObjectID Read GetState\_ViewableObjectID;  
__Description__  
The read only property determines the ViewableObjectID of the design object\. The TViewableObjectID type is a more descriptive ID of a design object  than the TObjectID type\.  
For example any type of dimension object is a eDimension type according to the TObjectID but could be one of the eViewableObject\_LinearDimension\.\.\.eViewableObject\_RadialDiameterDimension value\.  
This property is supported by the GetState\_ViewableObjectID and SetState\_ViewableObjectId methods\.  
__Notes__  
This __TViewableObjectID__ type is mainly used by the Inspector and List views in Altium Designer and is an extension of __TObjectID__ type\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TViewableObjectID type  
TObjectID type

<a id="IPCB_Arc_Interface"></a>__IPCB\_Arc Interface__

__Overview__  
Arcs are circular track segments with a definable width and can be placed on any layer\.  Arcs can have resizeable angles\. You can set the angles to 0 and 360 respectively to obtain a circle object\. Arcs have a variety of uses in the PCB design layout\. 

For example, arcs can be used to outline component shapes\. Arcs can also be placed on a signal layer and be electrically connected to tracks\.

__Note__  
You can use __IPCB\_Primitive__ methods and properties that are relevant to the __IPCB\_Arc__ interface\.  
The __IPCB\_Arc__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Arc

__IPCB\_Arc methods__  
GetState\_CenterX  
GetState\_CenterY  
GetState\_Radius  
GetState\_LineWidth  
GetState\_StartAngle  
GetState\_EndAngle  
GetState\_StartX  
GetState\_StartY  
GetState\_EndX  
GetState\_EndY  
SetState\_CenterX  
SetState\_CenterY  
SetState\_Radius  
SetState\_LineWidth  
SetState\_StartAngle  
SetState\_EndAngle  
RotateAroundXY  
GetState\_StrictHitTest

__IPCB\_Arc properties__  
XCenter  
YCenter  
Radius  
LineWidth  
StartAngle  
EndAngle  
StartX  
StartY  
EndX  
EndY

__Example__

01

Var

02

    Board     : IPCB\_Board;

03

    WorkSpace : IWorkSpace;

04

    Arc       : IPCB\_Arc;

05

Begin

06

    // Create a new PCB documen

07

    WorkSpace := GetWorkSpace;

08

    If WorkSpace = Nil Then Exit;

09

    Workspace\.DM\_CreateNewDocument\('PCB'\);

10

  

11

    Board := PCBServer\.GetCurrentPCBBoard;

12

    If Board = Nil then exit;

13

  

14

    Arc := PCBServer\.PCBObjectFactory\(eArcObject, eNoDimension, eCreate\_Default\);

15

    // need the board origin marker to appear on the PCB document

16

    // in order to obtain the Board\.Xorigin and YOrigin values\.

17

    Arc\.XCenter    := MilsToCoord\(Board\.XOrigin \+ 1800\);

18

    Arc\.YCenter    := MilsToCoord\(Board\.YOrigin \+ 1800\);

19

    Arc\.Radius     := MilsToCoord\(200\);

20

    Arc\.LineWidth  := MilsToCoord\(50\);

21

    Arc\.StartAngle := 0;

22

    Arc\.EndAngle   := 270;

23

    Arc\.Layer      := eBottomLayer;

24

  

25

    // Add the new arc object to the PCB database\.

26

    Board\.AddPCBObject\(Arc\);

27

  

28

    // Repaint the PCB Worksheet

29

    ResetParameters;

30

    AddStringParameter\('Action', 'All'\);

31

    RunProcess\('PCB:Zoom'\);

32

End;

__See also__  
IPCB\_Primitive interface  
PCB Design Objects

__Methods__

__RotateAroundXY method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX,AY : TCoord; Angle : TAngle\);  
__Description__  
This method rotates an arc on the PCB document about the AX, AY coordinates with an angle in degrees\. To ensure the arc rotates without moving about, pass in its XCenter and YCenter attributes for the AX,AY parameters\.  
__Example__

1

//rotate the arc about its original center

2

Arc\.RotateAroundXY\(Arc\.XCenter,Arc\.YCenter,45\);

__See also__  
IPCB\_Arc interface

__GetState and SetState Methods__

__GetState\_CenterX method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_CenterX : TCoord;  
__Description__  
This method is used for the CenterX property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_CenterY method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_CenterY : TCoord;  
__Description__  
This method is used for the CenterY property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_EndAngle method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_EndAngle : TAngle;  
__Description__  
This method is used for the EndAngle property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_EndX method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_EndX : TCoord;  
__Description__  
This method is used for the EndX property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_EndY method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_EndY : TCoord;  
__Description__  
This method is used for the EndY property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_LineWidth method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_LineWidth : TCoord;  
__Description__  
This method is used for the LineWidth property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_Radius method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_Radius : TCoord;  
__Description__  
This method is used for the Radius property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_StartAngle method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_StartAngle : TAngle;  
__Description__  
This method is used for the StartAngle property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_StartX method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_StartX : TCoord;  
__Description__  
This method is used for the StartX property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_StartY method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_StartY : TCoord;  
__Description__  
This method is used for the StartY property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_StrictHitTest method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_StrictHitTest \(HitX,HitY : TCoord\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_CenterX method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_CenterX \(AX : TCoord\);  
__Description__  
This method is used for the CenterX property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_CenterY method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_CenterY \(AY : TCoord\);  
__Description__  
This method is used for the CenterY property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_EndAngle method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_EndAngle \(Angle : TAngle\);  
__Description__  
This method is used for the EndAngle property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_LineWidth method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_LineWidth \(Width : TCoord\);  
__Description__  
This method is used for the Linewidth property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_Radius method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_Radius \(Radius : TCoord\);  
__Description__  
This method is used for the Radius property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_StartAngle method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_StartAngle \(Angle : TAngle\);  
__Description__  
This method is used for the StartAngle property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__Properties__

__EndAngle property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property EndAngle : TAngle Read GetState\_EndAngle Write SetState\_EndAngle;  
__Description__  
The EndAngle property denotes the end angle of the arc\. It is supported by the GetState\_EndAngle / SetState\_EndAngle and complemented by the GetState\_StartAngle/SetState\_StartAngle methods\.  
__Example__  
__See also__  
IPCB\_Arc interface

__EndX property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property EndX : TCoord Read GetState\_EndX;  
__Description__  
The EndX property denotes the end X coordinate of the arc\. It is supported by the GetState\_EndX method\.  
__Example__  
__See also__  
IPCB\_Arc interface

__EndY property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property EndY : TCoord Read GetState\_EndY;  
__Description__  
The EndY property denotes the end Y coordinate of the arc\. It is supported by the GetState\_EndY method\.  
__Example__  
__See also__  
IPCB\_Arc interface

__LineWidth property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property LineWidth : TCoord Read GetState\_LineWidth Write SetState\_LineWidth;  
__Description__  
The LineWidth property denotes the line thickness or width of the arc\. It is supported by the GetState\_LineWidth and SetState\_LineWidth methods\.  
__Example__  
__See also__  
IPCB\_Arc interface

__Radius property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property Radius : TCoord Read GetState\_Radius Write SetState\_Radius;  
__Description__  
The Radius property denotes the radius of the arc\. It is supported by the GetState\_Radius and SetState\_Radius methods\.  
__Example__  
__See also__  
IPCB\_Arc interface

__StartY property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property StartY : TCoord Read GetState\_StartY;  
__Description__  
The StartY property denotes the end Y coordinate of the arc\. It is supported by the GetState\_StartY method\.  
__Example__  
__See also__  
IPCB\_Arc interface

__StartX property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property StartX : TCoord Read GetState\_StartX;  
__Description__  
The StartX property denotes the starting X coordinate of the arc\. It is supported by the GetState\_StartX method\.  
__Example__  
__See also__  
IPCB\_Arc interface

__StartAngle property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property StartAngle : TAngle Read GetState\_StartAngle Write SetState\_StartAngle;  
__Description__  
The StartAngle property denotes the initial angle of the arc\. It is supported by the GetState\_StartAngle / SetState\_StartAngle and complemented by the GetState\_EndAngle/SetState\_EndAngle methods\.  
__Example__

1

    Arc := PCBServer\.PCBObjectFactory\(eArcObject,eNoDimension,eCreate\_Default\);

2

    Arc\.XCenter    := MilsToCoord\(Board\.XOrigin \+ 1800\);

3

    Arc\.YCenter    := MilsToCoord\(Board\.YOrigin \+ 1800\);

4

    Arc\.Radius     := MilsToCoord\(200\);

5

    Arc\.LineWidth  := MilsToCoord\(50\);

6

    Arc\.StartAngle := 0;

7

    Arc\.EndAngle   := 270;

8

    Arc\.Layer      := eBottomLayer;

__See also__  
IPCB\_Arc interface

__XCenter property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property XCenter : TCoord Read GetState\_CenterX Write SetState\_CenterX;  
__Description__  
The XCenter property denotes the X coordinate of the center of the arc\. It is supported by the GetState\_CenterX and SetState\_CenterX methods\.  
__Example__  
__See also__  
IPCB\_Arc interface

__YCenter property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property YCenter : TCoord Read GetState\_CenterY Write SetState\_CenterY;  
__Description__  
The YCenter property denotes the X coordinate of the center of the arc\. It is supported by the GetState\_CenterY and SetState\_CenterY methods\.  
__Example__  
__See also__  
IPCB\_Arc interface

<a id="IPCB_BoardOutline"></a>__IPCB\_BoardOutline__

__Overview__  
The board outline object represents the board shape which defines the extents or boundary of the board in the PCB Editor\. A board outline object is essentially a closed polygon and is inherited from the __IPCB\_Polygon__ interface\.  
The PCB Editor uses the board outline shape to determine the extents of the power planes for plane edge pull back, used when splitting power planes and for calculating the board edge when design data is exported to other tools such as the 3D viewer tool\.

A board outline is a group object therefore it is composed of pull back primitives namely tracks and arcs as the vertices for the closed polygon of the board outline\. Although the board outline object interface is inherited from the __IPCB\_Polygon__ interface, you cannot use layer, net assignment and repour polygon behaviours for a board outline\.

The __IPCB\_BoardOutline__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_BoardOutline

__Notes__  
The __IPCB\_BoardOutline__ interface is inherited from __IPCB\_Polygon__ interface and in turn from __IPCB\_Group__ interface\.  
To iterate the board outline for the pullback primitives, you create and use a group iterator because the board outline is a group object which in turn is composed of child objects\.  
The __IPCB\_BoardOutline__ interface is used by the __BoardOutline__ property from the __IPCB\_Board__ interface\.  
Each new PCB document in Altium Designer is created with a board outline, so if you wish to update a board outline of a PCB document, you modify the existing board outline by massaging the board outline's vertices and then update the board outline\.

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__IPCB\_BoardOutline methods__  
GetState\_HitPrimitive  
Rebuild  
Validate  
Invalidate  
InvalidatePlane

__IPCB\_BoardOutline properties__

__Example__

01

Procedure Query\_Board\_Outline;

02

Var

03

    PCB\_Board : IPCB\_Board;

04

    BR        : TCoordRect;

05

    NewUnit   : TUnit;

06

Begin

07

  

08

    PCB\_Board := PCBServer\.GetCurrentPCBBoard;

09

    If PCB\_Board = Nil Then Exit;

10

    If PCB\_Board\.IsLibrary Then Exit;

11

  

12

    PCB\_Board\.BoardOutline\.Invalidate;

13

    PCB\_Board\.BoardOutline\.Rebuild;

14

    PCB\_Board\.BoardOutline\.Validate;

15

  

16

    // The BoundingRectangle method is defined in IPCB\_Primitive interface

17

    BR := PCB\_Board\.BoardOutline\.BoundingRectangle;

18

    If PCB\_Board\.DisplayUnit = eImperial Then NewUnit := eMetric

19

                                         Else NewUnit := eImperial;

20

    ShowMessage\(

21

        'Board Outline Width  : ' \+

22

        CoordUnitToString\(BR\.right \- BR\.left,

23

                          PCB\_Board\.DisplayUnit\) \+ \#13 \+

24

        'Board Outline Height : ' \+

25

        CoordUnitToString\(BR\.top \- BR\.bottom,

26

                          PCB\_Board\.DisplayUnit\)\);

27

End;

__See also__  
PCB Design Objects  
PCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_Polygon interface  
IPCB\_GroupIterator interface  
PCB\_Outline script in \\Examples\\Scripts\\Delphiscript\\PCB folder\.  
BoardOutlineDetails script in \\Examples\\Scripts\\Delphiscript\\PCB folder\.

__Methods__

__GetState\_HitPrimitive method__

\(IPCB\_BoardOutline interface\)  
__Syntax__  
Function  GetState\_HitPrimitive \(APrimitive : IPCB\_Primitive\)  : Boolean;  
__Description__  
This function checks if a primitive that is not part of the board outline is touching or overlapping on the edge of the outline \(whether being touched or enclosed by the outline\)\.  
This primitive could be placed by the user or created and placed programmatically\. If the result is false, it means the primitive is definitely outside the outline\.  
__Example__  
   
__See also__  
IPCB\_BoardOutline interface

__Invalidate method__

\(IPCB\_BoardOutline interface\)  
__Syntax__  
Procedure Invalidate;  
__Description__  
This procedure renders the board outline in an invalidated state\. This state needs to be rebuilt and validated by the system\.  
__Example__  
   
__See also__  
IPCB\_BoardOutline interface  
Validate method

__InvalidatePlane method__

\(IPCB\_BoardOutline interface\)  
__Syntax__  
Procedure InvalidatePlane\(Layer : TLayer\);  
__Description__  
This procedure invalidates the specified layer the board outline is connected to, because the outline has been modified and this particular layer needs to be rebuilt\.  
__Example__  
   
__See also__  
IPCB\_BoardOutline interface

__Rebuild method__

\(IPCB\_BoardOutline interface\)  
__Syntax__  
Procedure Rebuild;  
__Description__  
This Rebuild procedure is called by the Validate method\. This method rebuilds the board outline after it has been graphically altered which potentially could affect the internal/split planes that are connected to this outline\.  
__Example__  
__See also__  
IPCB\_BoardOutline interface

__Validate method__

\(IPCB\_BoardOutline interface\)  
__Syntax__  
Procedure Validate;  
__Description__  
The Validate method refreshes and updates  the board outline object and its connections to the internal/split planes after it has been altered programmatically \(layers or the coordinates of the outline\)\.  
The Rebuild method is called implicitly by the Validate method, so executing the Invalidate then the Valid methods are sufficient when the coordinates of a board outline has been modified programmatically\.  
__Example__  
   
__See also__  
IPCB\_BoardOutline interface

<a id="IPCB_Component_Interface"></a>__IPCB\_Component Interface__

__Overview__  
Components are defined by footprints, which are stored in a PCB library \(or part of an integrated library\)\. Note, a footprint can be linked to a schematic component\.

When a footprint is placed in the workspace, it is assigned a designator \(and optional comment\)\.  It is then referred to as a component\. A component is composed of primitives \(normally tracks, arcs, and pads\)\.

Components are defined by footprints, which are stored in a PCB library\. When a footprint is placed in the workspace, it is assigned a designator \(and optional comment\)\. It is then referred to as a component with the defined reference\. The origin in the library editor defines the reference point of a footprint\.

The __IPCB\_Component__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Component

__Notes__  
The reference point of a component is set by the X,Y fields inherited from __IPCB\_Group__ interface\. You can obtain the bounding rectangle of the component and calculate the mid point X and Y values to enable rotation about the center of the component if desired\.  
The rotation property of a component is set according to the reference point of a component, therefore the Rotation property and the RotateAroundXY method are equivalent only if you use the X,Y parameters for the RotateAroundXY method that are the same as the reference point of the component\.  
A component is a group object and therefore composes of child objects such as arcs and tracks\. You use a group iterator to fetch the child objects for that component\.  
The __IPCB\_Component__ interface hierarchy is as follows:

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__IPCB\_Component methods__  
GetState\_ChannelOffset  
GetState\_ComponentKind  
GetState\_Name  
GetState\_Comment  
GetState\_Pattern  
GetState\_NameOn  
GetState\_CommentOn  
GetState\_LockStrings  
GetState\_GroupNum  
GetState\_UnionIndex  
GetState\_Rotation  
GetState\_Height  
GetState\_NameAutoPos  
GetState\_CommentAutoPos  
GetState\_SourceDesignator  
GetState\_SourceUniqueId  
GetState\_SourceHierarchicalPath  
GetState\_SourceFootprintLibrary  
GetState\_SourceComponentLibrary  
GetState\_SourceLibReference  
GetState\_SourceDescription  
GetState\_FootprintDescription  
GetState\_DefaultPCB3DModel  
GetState\_IsBGA  
BoundingRectangleNoNameComment  
BoundingRectangleNoNameCommentForSignals  
SetState\_ChannelOffset  
SetState\_ComponentKind  
SetState\_Pattern  
SetState\_NameOn  
SetState\_CommentOn  
SetState\_LockStrings  
SetState\_GroupNum  
SetState\_UnionIndex  
SetState\_Rotation  
SetState\_Height  
SetState\_NameAutoPos  
SetState\_CommentAutoPos  
SetState\_SourceDesignator  
SetState\_SourceUniqueId  
SetState\_SourceHierarchicalPath  
SetState\_SourceFootprintLibrary  
SetState\_SourceComponentLibrary  
SetState\_SourceLibReference  
SetState\_SourceDescription  
SetState\_FootprintDescription  
SetState\_DefaultPCB3DModel  
ChangeNameAutoposition  
ChangeCommentAutoposition  
SetState\_xSizeySize  
RotateAroundXY  
FlipComponent  
Rebuild  
Getstate\_PadByName  
LoadCompFromLibrary  
LoadFromLibrary  
AutoPosition\_NameComment  
SetState\_EnablePinSwapping  
SetState\_EnablePartSwapping  
GetState\_EnablePinSwapping  
GetState\_EnablePartSwapping

__IPCB\_Component properties__  
ChannelOffset  
ComponentKind  
Name  
Comment  
Pattern  
NameOn  
CommentOn  
LockStrings  
GroupNum  
UnionIndex  
Rotation  
Height  
NameAutoPosition  
CommentAutoPosition  
SourceDesignator  
SourceUniqueId  
SourceHierarchicalPath  
SourceFootprintLibrary  
SourceComponentLibrary  
SourceLibReference  
SourceDescription  
FootprintDescription  
DefaultPCB3DModel  
IsBGA  
EnablePinSwapping  
EnablePartSwapping

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_GroupIterator interface  
IPCB\_Text interface  
TComponentKind enumerated values  
TTextAutoposition enumerated values

__Methods__

__AutoPosition\_NameComment method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure AutoPosition\_NameComment;  
__Description__  
This procedure invokes the auto positioning of the name and comment objects associated with the component after the Name and Comment objects' positions have been updated\.  
__Example__  
__See also__  
IPCB\_Component interface

__ChangeCommentAutoposition method__

\(IPCB\_Component interface\)  
__Syntax__  
Function ChangeCommentAutoposition \(Value : TTextAutoposition\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Component interface

__ChangeNameAutoposition method__

\(IPCB\_Component interface\)  
__Syntax__  
Function ChangeNameAutoposition \(Value : TTextAutoposition\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Component interface

__FlipComponent method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure FlipComponent;  
__Description__  
This method flips the component from one layer to the other, for example top layer to the bottom layer\.  
__Example__  
__See also__  
IPCB\_Component interface

__Getstate\_PadByName method__

\(IPCB\_Component interface\)  
__Syntax__  
Function Getstate\_PadByName \(S : TPCBString\) : IPCB\_Primitive;  
__Description__  
This method retrieves the pad object interface only if the pad's name is found which is associated with this component\.  
__Example__  
__See also__  
IPCB\_Component interface

__LoadFromLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Function LoadFromLibrary : Boolean;  
__Description__  
This function refreshes the specified component from the library\. If it is successful a true value is returned otherwise false\.  
__Example__  
__See also__  
IPCB\_Component interface

__LoadCompFromLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Function LoadCompFromLibrary : Boolean;  
__Description__  
This function refreshes the component from the library\. If it is successful a true value is returned otherwise false\.  
__Example__  
__See also__  
IPCB\_Component interface

__Rebuild method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure Rebuild;  
__Description__  
This procedure forces a rebuild of the whole component graphically\.  
__Example__  
__See also__  
IPCB\_Component interface

__RotateAroundXY method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX,AY : TCoord;Angle : TAngle\);  
__Description__  
This method rotates a component object on the PCB document about the AX, AY coordinates with an angle in degrees\. To ensure the component rotates without moving about, pass in its midpoint \(between X1,X2 and Y1, Y2\) attributes for the AX,AY parameters or use the __Rotation__ property\.  
__Example__  
__See also__  
IPCB\_Component interface  
Rotation property

__SetState\_xSizeySize method__

\(IPCB\_Component interface\)  
__Syntax__  
Function SetState\_xSizeySize : Boolean;  
__Description__  
After a component has been rebuilt programmatically for example the name and comment positions have changed, do a SetState\_xSizeySize method to update the bounding rectangle of the whole component\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState and SetState Methods__

__GetState\_ChannelOffset method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_ChannelOffset : TChannelOffset;  
__Description__  
The ChannelOffset represents the Channel Offset parameter for the component\. A channel offset denotes where the component is in a room especially when a room is being copied and a copy is created on the same document\. The copies of rooms containing components are created based on their offsets\.  
This method is used for the ChannelOffset property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_Comment method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_Comment : IPCB\_Text;  
__Description__  
This property denotes the comment object associated with the IPCB\_Component component object on the PCB document\.  
This method is used for the Comment property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_CommentAutoPos method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_CommentAutoPos : TTextAutoposition;  
__Description__  
This property denotes that the Comment text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This method is used by the __CommentAutoPos__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_CommentOn method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_CommentOn : Boolean;  
__Description__  
The CommentOn property denotes the visibility of the Name object associated with the component\.  
This method is used for the CommentOn property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_ComponentKind method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_ComponentKind : TComponentKind;  
__Description__  
A component kind can be one of the following:  
eComponentKind\_Standard: These components possess standard electrical properties, are always synchronized and are the type most commonly used on a board\.  
eComponentKind\_Mechanical: These components do not have electrical properties and will appear in the BOM\. They are synchronized if the same components exist on both the Schematic and PCB documents\. An example is a heatsink\.  
eComponentKind\_Graphical: These components are not used during synchronization or checked for electrical errors\. These components are used, for example, when adding company logos to documents\.  
eComponentKind\_NetTie\_BOM: These components short two or more different nets for routing and these components will appear in the BOM and are maintained during synchronization\.  
eComponentKind\_NetTie\_NoBOM: These components short two or more different nets for routing and these components will NOT appear in the BOM and are maintained during synchronization\. Note  
Note, the TComponentKind type is defined from RT\_Workspace unit\.  
This method is used by the ComponentKind property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_DefaultPCB3DModel method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_DefaultPCB3DModel : TPCBString;  
__Description__  
The DefaultPCB3DModel method denotes the default PCB 3D Model name as the default to be linked to this PCB component\.  
This method is used for the DeafultPCB3DModel property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_FootprintDescription method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_FootprintDescription : TPCBString;  
__Description__  
This property denotes the descriptive account of the footprint\. This method is used for the Footprint__Description__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_GroupNum method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_GroupNum : Integer;  
__Description__  
This GroupNum is not used internally\. Can use for specific purposes such as a tag or an index\.  
This GroupNum method is used for the GroupNum property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_Height method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_Height : TCoord;  
__Description__  
The height of the component denotes the height of the component\. It is used for the 3D viewer which works out the heights of components before displaying components in a 3D view\.  
This method is used for the Height property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_LockStrings method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_LockStrings : Boolean;  
__Description__  
The LockStrings property of the component denotes whether the strings of a component can be locked or not\. This method is used for the LockStrings property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_Name method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_Name : IPCB\_Text;  
__Description__  
This property denotes the name object associated with the IPCB\_Component component object on the PCB document\.  
This method is used for the Name property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_NameAutoPos method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_NameAutoPos : TTextAutoposition;  
__Description__  
The CommentAutoPos denotes that the Comment text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This method is used for the CommentAutoPos property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_NameOn method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_NameOn : Boolean;  
__Description__  
The NameOn property denotes the visibility of the Name object associated with the component\.  
This method is used for the NameOn property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_Pattern method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_Pattern : TPCBString;  
__Description__  
The Pattern denotes the footprint name of this component which is a widestring\. This method is used for the Pattern property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_Rotation method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_Rotation : TAngle;  
__Description__  
The Rotation of the component denotes the angle of the component with respect to the horizontal axis\. The rotation parameter of __TAngle__ type is between 0 and 360 degrees inclusive\.  
This method is used for the __Rotation__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceComponentLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceComponentLibrary : TPCBString;  
__Description__  
This source library field denotes the integrated library where the PCB component comes from\. Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This method is used for the SourceComponentLibrary property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceDescription method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceDescription : TPCBString;  
__Description__  
This method can include a descriptive account of the reference link to a source component or a device name\.  
This method is used for the SourceDescription property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceDesignator method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceDesignator : TPCBString;  
__Description__  
This method represents the current designator of the source component from the corresponding schematic\.  
This method is used for the SourceDesignator property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceFootprintLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceFootprintLibrary : TPCBString;  
__Description__  
This method denotes the descriptive account of the footprint\. This method is used for the SourceFootprintLibrary property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceHierarchicalPath method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceHierarchicalPath : TPCBString;  
__Description__  
This uniquely identifies the source reference path to the PCB component\. The path can be multi\-level depending on whether it is a multi channel \(sheet symbols\) or a normal design \(schematic sheets\)\.  
Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This method is used for the SourceHierarchicalPath property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceLibReference method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceLibReference : TPCBString;  
__Description__  
The source library reference property  is the name of the component from the library\. This method is used for the SourceLibReference property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceUniqueId method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceUniqueId : TPCBString;  
__Description__  
Unique IDs \(UIDs\) are used to match each schematic component to the corresponding PCB component\. When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library pathnames\.  
The Unique Identifier \(UID\) is a system generated value that uniquely identifies the source component\.  
This method is used for the SourceUniqueID property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_UnionIndex method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_UnionIndex : Integer;  
__Description__  
The UnionIndex property denotes the union index\. Unions are sets of components that will be manipulated as a block for the PCB placement\. Components in a union maintain their relative positions within the union as they are moved for example\.  
This method is used for the UnionIndex property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_ChannelOffset method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_ChannelOffset \(Value : TChannelOffset\);  
__Description__  
The ChannelOffset represents the Channel Offset parameter for the component\. A channel offset denotes where the component is in a room especially when a room is being copied and a copy is created on the same document\. The copies of rooms containing components are created based on their offsets\.  
This method is used for the ChannelOffset property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_CommentAutoPos method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_CommentAutoPos \(Value : TTextAutoposition\);  
__Description__  
This property denotes that the Comment text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This method is used by the __CommentAutoPos__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_CommentOn method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_CommentOn \(Value : Boolean\);  
__Description__  
The CommentOn property denotes the visibility of the Comment object associated with the component\. This method is used for the CommentOn property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_ComponentKind method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_ComponentKind \(Value : TComponentKind\);  
__Description__  
A component kind can be one of the following:

- eComponentKind\_Standard: These components possess standard electrical properties, are always synchronized and are the type most commonly used on a board\.
- eComponentKind\_Mechanical: These components do not have electrical properties and will appear in the BOM\. They are synchronized if the same components exist on both the Schematic and PCB documents\. An example is a heatsink\.
- eComponentKind\_Graphical: These components are not used during synchronization or checked for electrical errors\. These components are used, for example, when adding company logos to documents\.
- eComponentKind\_NetTie\_BOM: These components short two or more different nets for routing and these components will appear in the BOM and are maintained during synchronization\.
- eComponentKind\_NetTie\_NoBOM: These components short two or more different nets for routing and these components will NOT appear in the BOM and are maintained during synchronization\.

This method is used by the ComponentKind property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_DefaultPCB3DModel method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_DefaultPCB3DModel \(Value : TPCBString\);  
__Description__  
The DefaultPCB3DModel method denotes the default PCB 3D Model name as the default to be linked to this PCB component\.  
This method is used for the DeafultPCB3DModel property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_FootprintDescription method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_FootprintDescription \(Value : TPCBString\);  
__Description__  
This property denotes the descriptive account of the footprint\. This method is used for the Footprint__Description__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_GroupNum method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_GroupNum \(Value : Integer\);  
__Description__  
This GroupNum is not used internally\. Can use for specific purposes such as a tag or an index\.  
This GroupNum method is used for the GroupNum property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_Height method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_Height \(Value : TCoord\);  
__Description__  
The height of the component denotes the height of the component\. It is used for the 3D viewer which works out the heights of components before displaying components in a 3D view\.  
This method is used for the Height property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_LockStrings method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_LockStrings \(Value : Boolean\);  
__Description__  
The LockStrings property of the component denotes whether the strings of a component can be locked or not\. This method is used for the LockStrings property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_NameAutoPos method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_NameAutoPos \(Value : TTextAutoposition\);  
__Description__  
The NameAutoPos denotes that the Name text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This method is used for the NameAutoPos property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_NameOn method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_NameOn \(Value : Boolean\);  
__Description__  
The NameOn property denotes the visibility of the Name object associated with the component\.  
This method is used for the NameOn property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_Pattern method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_Pattern \(Value : TPCBString\);  
__Description__  
The Pattern denotes the footprint name of this component which is a widestring\. This method is used for the Pattern property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_Rotation method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_Rotation \(Value : TAngle\);  
__Description__  
The Rotation of the component denotes the angle of the component with respect to the horizontal axis\. The rotation parameter of __TAngle__ type is between 0 and 360 degrees inclusive\.  
This method is used for the Rotation property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceComponentLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceComponentLibrary\(Value : TPCBString\);  
__Description__  
This source library field denotes the integrated library where the PCB component comes from\. Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This method is used for the SourceComponentLibrary property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceDescription method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceDescription \(Value : TPCBString\);  
__Description__  
This method can include a descriptive account of the reference link to a source component or a device name\.  
This method is used for the Source__Description__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceDesignator method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceDesignator \(Value : TPCBString\);  
__Description__  
This method represents the current designator of the source component from the corresponding schematic\.  
This method is used for the SourceDesignator property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceFootprintLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceFootprintLibrary\(Value : TPCBString\);  
__Description__  
This method denotes the descriptive account of the footprint\. This method is used for the SourceFootprintLibrary property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceHierarchicalPath method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceHierarchicalPath\(Value : TPCBString\);  
__Description__  
This uniquely identifies the source reference path to the PCB component\. The path can be multi\-level depending on whether it is a multi channel \(sheet symbols\) or a normal design \(schematic sheets\)\.  
Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This method is used for the SourceHierarchicalPath property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceLibReference method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceLibReference \(Value : TPCBString\);  
__Description__  
The source library reference property is the name of the component from the library\. This method is used for the SourceLibReference property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceUniqueId method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceUniqueId \(Value : TPCBString\);  
__Description__  
Unique IDs \(UIDs\) are used to match each schematic component to the corresponding PCB component\. When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library pathnames\.  
The Unique Identifier \(UID\) is a system generated value that uniquely identifies the source component\.  
This method is used for the SourceUniqueId property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_UnionIndex method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_UnionIndex \(Value : Integer\);  
__Description__  
The UnionIndex property denotes the union index\. Unions are sets of components that will be manipulated as a block for the PCB placement\. Components in a union maintain their relative positions within the union as they are moved for example\.  
This method is used for the UnionIndex property\.  
__Example__  
__See also__  
IPCB\_Component interface

__Properties__

__ChannelOffset property__

\(IPCB\_Component interface\)  
__Syntax__  
Property ChannelOffset : TChannelOffset Read GetState\_ChannelOffset Write SetState\_ChannelOffset;  
__Description__  
The ChannelOffset represents the Channel Offset parameter for the component\. A channel offset denotes where the component is in a room especially when a room is being copied and a copy is created on the same document\. The copies of rooms containing components are created based on their offsets\.  
This property is supported by the GetState\_ChannelOffset and SetState\_ChannelOffset methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__Comment property__

\(IPCB\_Component interface\)  
__Syntax__  
Property Comment : IPCB\_Text Read GetState\_Comment;  
__Description__  
This property denotes the comment object associated with the IPCB\_Component component object on the PCB document\.  
This read only property is supported by the GetState\_Comment method\.  
__Example__  
__See also__  
IPCB\_Component interface  
IPCB\_Text interface

__CommentAutoPosition property__

\(IPCB\_Component interface\)  
__Syntax__  
Property CommentAutoPosition : TTextAutoposition Read GetState\_CommentAutoPos Write SetState\_CommentAutoPos;  
__Description__  
This property denotes that the Comment text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This property is supported by the GetState\_CommentAutoPosition and SetState\_CommentAutoPosition methods\.  
__Example__  
__See also__  
IPCB\_Component interface  
TTextAutoposition type

__CommentOn property__

\(IPCB\_Component interface\)  
__Syntax__  
Property CommentOn : Boolean Read GetState\_CommentOn Write SetState\_CommentOn;  
__Description__  
The CommentOn property denotes the visibility of the Comment object associated with the component\.  
This property is supported by the GetState\_CommentOn and SetState\_CommentOn methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__ComponentKind property__

\(IPCB\_Component interface\)  
__Syntax__  
Property ComponentKind : TComponentKind Read GetState\_ComponentKind Write SetState\_ComponentKind;  
__Description__  
A component kind can be one of the following:

- eComponentKind\_Standard: These components possess standard electrical properties, are always synchronized and are the type most commonly used on a board\.
- eComponentKind\_Mechanical: These components do not have electrical properties and will appear in the BOM\. They are synchronized if the same components exist on both the Schematic and PCB documents\. An example is a heatsink\.
- eComponentKind\_Graphical: These components are not used during synchronization or checked for electrical errors\. These components are used, for example, when adding company logos to documents\.
- eComponentKind\_NetTie\_BOM: These components short two or more different nets for routing and these components will appear in the BOM and are maintained during synchronization\.
- eComponentKind\_NetTie\_NoBOM: These components short two or more different nets for routing and these components will NOT appear in the BOM and are maintained during synchronization\.

This property is supported by the GetState\_ComponentKind and SetState\_ComponentKind methods\.  
__Example__  
__See also__  
IPCB\_Component interface  
TComponentKind type in the RT\_Workspace unit\.

__DefaultPCB3DModel property__

\(IPCB\_Component interface\)  
__Syntax__  
Property DefaultPCB3DModel : TPCBString Read GetState\_DefaultPCB3DModel Write SetState\_DefaultPCB3DModel;  
__Description__  
The property denotes the default PCB 3D Model name as the default to be linked to this PCB component\.  
This property is supported by the GetState\_DefaultPCB3DModel and SetState\_DefaultPCB3DModel methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__FootprintDescription property__

\(IPCB\_Component interface\)  
__Syntax__  
Property FootprintDescription : TPCBString Read GetState\_FootprintDescription Write SetState\_FootprintDescription;  
__Description__  
This property denotes the descriptive account of the footprint\.  
This property is supported by the GetState\_Footprint__Description__ and SetState\_Footprint__Description__ methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__GroupNum property__

\(IPCB\_Component interface\)  
__Syntax__  
Property GroupNum : Integer Read GetState\_GroupNum Write SetState\_GroupNum;  
__Description__  
This property is not used internally\. Can use for specific purposes such as a tag or an index\.  
This property is supported by the GetState\_GroupNum and SetState\_GroupNum methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__Height property__

\(IPCB\_Component interface\)  
__Syntax__  
Property Height : TCoord Read GetState\_Height Write SetState\_Height;  
__Description__  
The height property denotes the height of the component\. It is used for the 3D viewer which works out the heights of components before displaying components in a 3D view\.  
This property is supported by the GetState\_Height and SetState\_Height methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__LockStrings property__

\(IPCB\_Component interface\)  
__Syntax__  
Property LockStrings : Boolean Read GetState\_LockStrings Write SetState\_LockStrings;  
__Description__  
The LockStrings property denotes whether the strings of a component can be locked or not\.  
This property is supported by the GetState\_LockStrings and SetState\_LockStrings methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__Name property__

\(IPCB\_Component interface\)  
__Syntax__  
Property Name : IPCB\_Text Read GetState\_Name;  
__Description__  
This property denotes the name object associated with the IPCB\_Component object on the PCB document and represents the pattern string\.  
This read only property is supported by the GetState\_Name method\.  
__Example__  
__See also__  
IPCB\_Component interface  
IPCB\_Text interface

__NameAutoPosition property__

\(IPCB\_Component interface\)  
__Syntax__  
Property NameAutoPosition : TTextAutoposition Read GetState\_NameAutoPos Write SetState\_NameAutoPos;  
__Description__  
This property denotes that the Name text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This property is supported by the GetState\_NameAutoPos and SetState\_NameAutoPos methods\.  
__Example__  
__See also__  
IPCB\_Component interface  
TTextAutoposition type

__NameOn property__

\(IPCB\_Component interface\)  
__Syntax__  
Property NameOn : Boolean Read GetState\_NameOn Write SetState\_NameOn;  
__Description__  
The NameOn property denotes the visibility of the Name object associated with the component\.  
This property is supported by the GetState\_NameOn and SetState\_NameOn methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__Pattern property__

\(IPCB\_Component interface\)  
__Syntax__  
Property Pattern : TPCBString Read GetState\_Pattern Write SetState\_Pattern;  
__Description__  
The property denotes the footprint name of this component which is a widestring\.  
This property is supported by the GetState\_Pattern and SetState\_Pattern methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__Rotation property__

\(IPCB\_Component interface\)  
__Syntax__  
Property Rotation : TAngle Read GetState\_Rotation Write SetState\_Rotation;  
__Description__  
This property denotes the angle of the component with respect to the horizontal axis\. The rotation parameter of __TAngle__ type is between 0 and 360 degrees inclusive\.  
This property is supported by the GetState\_Rotation and SetState\_Rotation methods\.  
__Example__  
__See also__  
IPCB\_Component interface  
TAngle type

__SourceComponentLibrary property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceComponentLibrary : TPCBString Read GetState\_SourceComponentLibrary Write SetState\_SourceComponentLibrary;  
__Description__  
This source library field denotes the integrated library where the PCB component comes from\. Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This property is supported by the GetState\_SourceComponentLibrary and SetState\_SourceComponentLibrary methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceDescription property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceDescription : TPCBString Read GetState\_SourceDescription Write SetState\_SourceDescription;  
__Description__  
This property can include a descriptive account of the reference link to a source component or a device name\.  
This property is supported by the GetState\_Source__Description__ and SetState\_Source__Description__ methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceDesignator property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceDesignator : TPCBString Read GetState\_SourceDesignator Write SetState\_SourceDesignator;  
__Description__  
This property represents the current designator of the source component from the corresponding schematic\.  
This property is supported by the GetState\_SourceDesignator and SetState\_SourceDesignator methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceFootprintLibrary property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceFootprintLibrary : TPCBString Read GetState\_SourceFootprintLibrary Write SetState\_SourceFootprintLibrary;  
__Description__  
This field shows the name of the footprint\. The footprint is the graphical representation of a PCB component and is used to display it on the PCB, and usually contains component outline and connection pads along with an unique designator\.  
Footprints are stored in PCB library files or Integrated libraries, which can be edited using the PCB Library Editor to create new footprints or edit existing ones\.  
This property is supported by the GetState\_SourceFootprintLibrary and SetState\_SourceFootprintLibrary methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceHierarchicalPath property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceHierarchicalPath : TPCBString Read GetState\_SourceHierarchicalPath Write SetState\_SourceHierarchicalPath;  
__Description__  
This property uniquely identifies the source reference path to the PCB component\. The path can be multi\-level depending on whether it is a multi channel \(sheet symbols\) or a normal design \(schematic sheets\)\.  
Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This property is supported by the GetState\_SourceHierarchicalPath and SetState\_SourceHierarchicalPath methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceLibReference property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceLibReference : TPCBString Read GetState\_SourceLibReference Write SetState\_SourceLibReference;  
__Description__  
The source library reference property  is the name of the component from the library\.  
This property is supported by the GetState\_SourceLibReference and SetState\_SourceLibReference methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceUniqueId property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceUniqueId : TPCBString Read GetState\_SourceUniqueId Write SetState\_SourceUniqueId;  
__Description__  
Unique IDs \(UIDs\) are used to match each schematic component to the corresponding PCB component\. When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library pathnames\.  
The Unique Identifier \(UID\) is a system generated value that uniquely identifies the source component\.  
This property is supported by the GetState\_SourceUniqueId and SetState\_SourceUniqueId methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__UnionIndex property__

\(IPCB\_Component interface\)  
__Syntax__  
Property UnionIndex : Integer Read GetState\_UnionIndex Write SetState\_UnionIndex;  
__Description__  
The property denotes the union index\. Unions are sets of components that will be manipulated as a block for the PCB placement\. Components in a union maintain their relative positions within the union as they are moved for example\.  
The UnionIndex property is supported by the GetState\_UnionIndex and SetState\_UnionIndex methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__EnablePinSwapping property__

\(IPCB\_Component interface\)  
__Syntax__  
Property  EnablePinSwapping                 : Boolean             Read GetState\_EnablePinSwapping      Write SetState\_EnablePinSwapping ;  
__Description__  
The property denotes the pin swapping for the pins of this component\. In this case, these pins can be swapped if the EnablePinSwapping is set to true\.  
The EnablePinSwapping property is supported by the GetState\_EnablePinSwapping and SetState\_EnablePinSwapping methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__EnablePartSwapping property__

\(IPCB\_Component interface\)  
__Syntax__  
Property  EnablePartSwapping : Boolean Read GetState\_EnablePartSwapping Write SetState\_EnablePartSwapping;  
__Description__  
The property denotes the part swapping\. Components can have multi\-parts and in this case, these multi parts can be swapped if the EnablePartSwapping is set to True\.  
The UnionIndex property is supported by the GetState\_EnablePartSwapping and SetState\_EnablePartSwapping methods\.  
__Example__  
__See also__  
IPCB\_Component interface

<a id="IPCB_ComponentBody_Interface"></a>__IPCB\_ComponentBody Interface__

__Overview__  
A component body is a body that encapsulates a component in 3 dimensions on a PCB document\. Component bodies are handled in the same way as other primitives, and they are contained in the component itself, whether in a library or on a board\. 

A component body object is a group object that contain child objects, thus in order to retrieve component bodies from within a component, use an iterator on this component\.

The __IPCB\_ComponentBody__ interface hierarchy is as follows:

__IPCB\_ComponentBody methods__  
GetStandoffHeight  
GetOverallHeight  
GetBodyProjection  
SetStandoffHeight  
SetOverallHeight  
SetBodyProjection

__IPCB\_ComponentBody properties__  
StandoffHeight  
OverallHeight  
BodyProjection

__See also__  
IPCB\_Component interface

__Methods__

__SetStandoffHeight method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Procedure SetStandoffHeight\(Value : TCoord \);  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__SetOverallHeight method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Procedure SetOverallHeight \(Value : TCoord \);  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__SetBodyProjection method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Procedure SetBodyProjection \(Value : TBoardSide\);  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__GetStandoffHeight method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Function GetStandoffHeight : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__GetOverallHeight method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Function GetOverallHeight : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__GetBodyProjection method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Function GetBodyProjection : TBoardSide;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__Properties__

__OverallHeight property__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Property OverallHeight : TCoord Read GetOverallHeight Write SetOverallHeight;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__BodyProjection property__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Property BodyProjection : TBoardSide Read GetBodyProjection Write SetBodyProjection;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__StandoffHeight property__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Property StandoffHeight : TCoord Read GetStandoffHeight Write SetStandoffHeight;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

<a id="IPCB_Coordinate"></a>__IPCB\_Coordinate__

__Overview__  
Coordinate markers are used to indicate the coordinates of specific points in a PCB workspace\.  A coordinate marker consists of a point marker and the X and Y coordinates of the position\.

The __IPCB\_Coordinate__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Coordinate

I__PCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

 

__IPCB\_Coordinate methods__  
GetState\_Size          
GetState\_LineWidth     
GetState\_TextHeight    
GetState\_TextWidth     
GetState\_TextFont      
GetState\_Style         
GetState\_Rotation      
GetState\_UseTTFonts    
GetState\_Bold          
GetState\_Italic        
GetState\_FontName      
   
SetState\_Size          
SetState\_LineWidth     
SetState\_TextHeight    
SetState\_TextWidth     
SetState\_TextFont      
SetState\_Style         
SetState\_Rotation      
SetState\_UseTTFonts    
SetState\_Bold          
SetState\_Italic        
SetState\_FontName      
   
SetState\_xSizeySize  
RotateAroundXY  
Text  
Track1  
Track2  
   
GetState\_StrictHitTest  
 

__IPCB\_Coordinate properties__  
Size  
LineWidth  
TextHeight  
TextWidth  
TextFont  
Style  
Rotation  
   
UseTTFonts  
Bold  
Italic  
FontName

__   
Methods__

SetState\_xSizeySize  
RotateAroundXY  
Text  
Track1  
Track2  
GetState\_StrictHitTest

__Properties__

__Size property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  Size : TCoord Read GetState\_Size Write SetState\_Size;  
__Description__  
The Size property determines the size of the coordinate object\.  
__Example__  
__See also__  
IPCB\_Coordinate interface

__LineWidth property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  LineWidth                         : TCoord              Read GetState\_LineWidth            Write SetState\_LineWidth;  
__Description__  
The LineWidth property determines the line width or the outline of the coordinate object\.  
__Example__  
__See also__  
IPCB\_Coordinate interface

__TextHeight property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  TextHeight : TCoord Read GetState\_TextHeight Write SetState\_TextHeight;  
__Description__  
The TextHeight property determines the text height of the coordinate object\.  
__Example__  
__See also__  
IPCB\_Coordinate interface  
 

__TextWidth property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  TextWidth : TCoord Read GetState\_TextWidth Write SetState\_TextWidth;  
__Description__  
The TextHeight property determines the text width of the coordinate object\.  
__Example__  
__See also__  
IPCB\_Coordinate interface

__TextFont property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  TextFont : TFontID Read GetState\_TextFont Write SetState\_TextFont;  
__Description__  
The TextFont property determines the font id of TFontID type used for the coordinate object\.  
__Example__  
__See also__  
IPCB\_Coordinate interface  
TFontID

__Style property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  Style : TUnitStyle Read GetState\_Style Write SetState\_Style;  
__Description__  
The Style property determines the style used for the measurement units of the coordinate object\. Display no units, show units as Mils or MM or show Units with parenthesises\.  
__Example__  
__See also__  
IPCB\_Coordinate interface  
TUnitStyle type

__Rotation property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  Rotation : TAngle Read GetState\_Rotation Write SetState\_Rotation;  
__Description__  
The Rotation property determines the coordinate object’s orientation of TAngle type\.  
__Example__  
__See also__  
IPCB\_Coordinate interface  
TAngle type

__UseTTFonts property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  UseTTFonts : Boolean Read GetState\_UseTTFonts Write SetState\_UseTTFonts;  
__Description__  
The UseTTFonts property determines whether the text of the coordinate object is of True Type Font type\.  
__Example__  
__See also__  
IPCB\_Coordinate interface  
TAngle type

__Bold property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  Bold : Boolean Read GetState\_Bold Write SetState\_Bold;  
__Description__  
This property sets or gets the bold property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Coordinate interface

__Italic property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property Italic : Boolean Read GetState\_Italic Write SetState\_Italic;  
__Description__  
The Italic property sets or gets the italic property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Italic and SetState\_Italic methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Coordinate interface

__FontName property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property FontName : TPCBString Read GetState\_FontName Write SetState\_FontName;  
__Description__  
This property sets or gets the FontName property of the PCB string True Type text on a PCB document\. For example one of the True Type font strings could be 'Arial', 'Arial Narrow', 'Courier New' and 'Verdana'\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.

__Delphiscript Script Example__

01

TextObj := PCBServer\.PCBObjectFactory\(eTextObject, eNoDimension, eCreate\_Default\);

02

  

03

// notify that the pcb object is going to be modified

04

PCBServer\.SendMessageToRobots\(TextObj\.I\_ObjectAddress, c\_Broadcast, PCBM\_BeginModify, c\_NoEventData\);

05

TextObj\.XLocation := Sheet\.SheetX \+ MilsToCoord\(1000\);

06

TextObj\.YLocation := Sheet\.SheetY \+ MilsToCoord\(1000\);

07

TextObj\.Layer     := eBottomOverlay;

08

TextObj\.UseTTFonts := True;

09

TextObj\.Italic := True;

10

TextObj\.Bold := False;

11

TextObj\.FontName := 'ARIAL';

12

// inverts the text object and a text boundary is created around the text

13

// The Inverted and InvertedTTTextBorder properties are useful for situations

14

// if text is to be placed on a copper region and create a cutout in the region\.

15

// the color of the inverted border is the layer color and the text color itself

16

// is black\.

17

TextObj\.Inverted := True;

18

// The InvertedTTextBorder property determines the distance between the boundary of the

19

// the text object itself to the inverted text border boundary\.

20

TextObj\.InvertedTTTextBorder := MilsToCoord\(100\);

21

TextObj\.Text      := 'Text with True Type Property enabled\.';

22

TextObj\.Size       := MilsToCoord\(200\);    // sets the height of the text\.

__See also__  
IPCB\_Coordinate interface  
__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_GroupIterator interface

<a id="IPCB_Connection_Interface"></a>__IPCB\_Connection Interface__

__Overview__  
The __IPCB\_Connection__ interface represents a connection between two nodes on a PCB document\. The two nodes can be on two different layers and the connection style can be a connected line or a broken specially marked connection\.

__The IPCB\_Connection hierarchy;__  
IPCB\_Primitive  
IPCB\_Connection

__IPCB\_Connection methods__  
GetState\_X1  
GetState\_Y1  
GetState\_X2  
GetState\_Y2  
GetState\_Layer1  
GetState\_Layer2  
GetState\_Mode  
SetState\_X1  
SetState\_Y1  
SetState\_X2  
SetState\_Y2  
SetState\_Layer1  
SetState\_Layer2  
SetState\_Mode  
IsRedundant  
RotateAroundXY

__IPCB\_Connection properties__  
X1  
Y1  
X2  
Y2  
Layer1  
Layer2  
Mode

__See also__  
IPCB\_Primitive interface  
TLayer enumerated values  
TConnectionMode enumerated values  
PCB Design Objects

__GetState and SetState Methods__

__GetState\_Layer2 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_Layer2 : TLayer;  
__Description__  
This method retrieves the Layer 2 attribute which represents a connection from the first layer to the second layer on a PCB document\. This function is used for the Layer2 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__GetState\_Mode method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_Mode : TConnectionMode;  
__Description__  
This method retrieves the connection mode for the connection object\. This method is used for the Mode property\.  
__Example__  
__See also__  
IPCB\_Connection interface  
TConnectionMode type

__GetState\_X1 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_X1 : TCoord;  
__Description__  
This function represents the X1 \(initial X\) coordinate of the connection object\. This method is used by the X1 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__GetState\_X2 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_X2 : TCoord;  
__Description__  
This function represents the X2 \(final X\) coordinate of the connection object\. This method is used by the X2 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__GetState\_Y1 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_Y1 : TCoord;  
__Description__  
This function represents the Y1 \(initial Y\) coordinate of the connection object\. This method is used by the Y1 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__GetState\_Y2 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_Y2 : TCoord;  
__Description__  
This function represents the Y2 \(final Y\) coordinate of the connection object\. This method is used by the Y2 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__SetState\_Mode method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure SetState\_Mode \(Value : TConnectionMode\);  
__Description__  
This function represents the Connection Mode for the connection object\. This method is used by the Mode property\.  
__Example__  
__See also__  
IPCB\_Connection interface  
TConnectionMode type

__SetState\_X1 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure SetState\_X1 \(Value : TCoord\);  
__Description__  
This method represents the X1 \(initial X\) coordinate of the connection object\. This method is used by the X1 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__SetState\_X2 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure SetState\_X2 \(Value : TCoord\);  
__Description__  
This method represents the X2 \(finall X\) coordinate of the connection object\. This method is used by the X2 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__SetState\_Y1 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure SetState\_Y1 \(Value : TCoord\);  
__Description__  
This method represents the Y1 \(initial Y\) coordinate of the connection object\. This method is used by the Y1 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__SetState\_Y2 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure SetState\_Y2 \(Value : TCoord\);  
__Description__  
This method represents the Y2 \(final Y\) coordinate of the connection object\. This method is used by the Y2 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Methods__

__RotateAroundXY method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX, AY : TCoord;Angle : TAngle\);  
__Description__  
This method rotates a connection object on the PCB document about the AX, AY coordinates with an angle in degrees\. To ensure the connection rotates without moving about, pass in its midpoint \(between X1,X2 and Y1, Y2\) attributes for the AX,AY parameters\.  
__Example__  
__See also__  
IPCB\_Connection interface

__IsRedundant method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function IsRedundant : Boolean;  
__Description__  
This method determines whether the object is redundant \(unused object\) on the PCB document or not\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Properties__

__X1 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property X1 : TCoord Read GetState\_X1 Write SetState\_X1;  
__Description__  
This property represents the X1 \(initial X\) coordinate of the connection object\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Y1 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property Y1 : TCoord Read GetState\_Y1 Write SetState\_Y1;  
__Description__  
This property represents the Y1 \(initial Y\) coordinate of the connection object\.  
__Example__  
__See also__  
IPCB\_Connection interface

__X2 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property X2 : TCoord Read GetState\_X2 Write SetState\_X2;  
__Description__  
This property represents the X2 \(finall X\) coordinate of the connection object\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Y2 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property Y2 : TCoord Read GetState\_Y2 Write SetState\_Y2;  
__Description__  
This property represents the Y2 \(final Y\) coordinate of the connection object\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Mode property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property Mode : TConnectionMode Read GetState\_Mode Write SetState\_Mode;  
__Description__  
The Mode property represents the connection mode type of the connection; whether it is part of the rats nest, or as a broken net marker\.  
__Example__  
__See also__  
IPCB\_Connection interface  
TConnectionMode type

__Layer2 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property Layer2 : TLayer Read GetState\_Layer2;  
__Description__  
This property retrieves the Layer 2 attribute which represents a connection from the first layer to the second layer on a PCB document\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Layer1 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property Layer1 : TLayer Read GetState\_Layer1;  
__Description__  
This property retrieves the Layer 1 attribute which represents a connection from the first layer to the second layer on a PCB document\.  
__Example__  
__See also__  
IPCB\_Connection interface

<a id="IPCB__DifferentialPair_Interface"></a>__IPCB\_ DifferentialPair Interface__

__Overview__  
A differential signaling system is one where a signal is transmitted down a pair of tightly coupled carriers, one of these carrying the signal, the other carrying an equal but opposite image of the signal\. Differential signaling was developed to cater for situations where the logic reference ground of the signal source could not be well connected to the logic reference ground of the load\. Differential signaling is inherently immune to common mode electrical noise, the most common interference artifact present in an electronic product\. Another major advantage of differential signaling is that it minimizes electromagnetic interference \(EMI\) generated from the signal pair\.

Differential pair routing is a design technique employed to create a balanced transmission system able to carry differential \(equal and opposite\) signals across a printed circuit board\. Typically this differential routing will interface to an external differential transmission system, such as a connector and cable\.

It is important to note that while the coupling ratio achieved in a twisted pair differential cable may be better than 99%, the coupling achieved in differential pair routing will typically be less than 50%\. Current expert opinion is that the PCB routing task is not to try to ensure a specific differential impedance is achieved, rather the objective is to maintain the properties required to ensure the differential signal arrives in good condition at the target component as it travels from the external cabling\.

__Notes__  
The IPCB\_DifferentialPair Interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_DifferentialPair

__IPCB\_DifferentialPair methods__  
GetState\_Name           
GetState\_PositiveNet    
GetState\_NegativeNet    
GetState\_GatherControl  
   
SetState\_Name           
SetState\_PositiveNet    
SetState\_NegativeNet    
SetState\_GatherControl

__IPCB\_DifferentialPair properties__  
Name           
PositiveNet    
NegativeNet    
GatherControl

__ __  
__Example__  
   
__See also__  
PCB Design Objects

__Methods__

__Properties__

<a id="IPCB_Embedded_Interface"></a>__IPCB\_Embedded Interface__

__Overview__  
An IPCB\_Embedded interface represents an embedded object in a PCB document\. An embedded object is not a visible object and cannot be manipulated by normal means in Altium Designer\. An embedded object can be used to store information which gets saved in the PCB document file when this file is saved\. Each embedded object is identified by its Name property and the __Description__ property can be used to store information\.  
The IPCB\_Embedded hierarchy;  
IPCB\_Primitive  
IPCB\_Embedded

__IPCB\_Embedded methods__  
GetState\_Name  
GetState\_Description  
SetState\_Name  
SetState\_Description

__IPCB\_Embedded properties__  
Name  
Description

__Example__

01

Var

02

    Board      : IPCB\_Board;

03

    EmbdObject : IPCB\_Embedded;

04

Begin

05

    // Check if PCB board exists

06

    Board := PCBServer\.GetCurrentPCBBoard;

07

    If Board = Nil Then

08

    Begin

09

        ShowWarning\('This document is not a PCB document\!'\);

10

        Exit;

11

    End;

12

  

13

    // Embedded object created\.

14

    EmbdObject := PCBServer\.PCBObjectFactory\(eEmbeddedObject, eNoDimension, eCreate\_Default\);

15

    EmbdObject\.Name        := 'Embedded Object Name';

16

    EmbdObject\.Description := 'Embedded object  can store many chars\.';

17

    Board\.AddPCBObject\(EmbdObject\);

__See also__  
IPCB\_Primitive interface  
PCB Design Objects  
The EmbeddedObjects script in the Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder

__Methods__

__SetState\_Name method__

\(IPCB\_Embedded interface\)  
__Syntax__  
Procedure SetState\_Name \(Value : TPCBString\);  
__Description__  
This method sets the name for the embedded object\. This method represents the Name property\.  
__Example__  
__See also__  
IPCB\_Embedded interface

__SetState\_Description method__

\(IPCB\_Embedded interface\)  
__Syntax__  
Procedure SetState\_Description \(Value : TPCBString\);  
__Description__  
This method sets the description for the embedded object\. This method represents the __Description__ property\. The __Description__ field can be used to store data\.  
__Example__  
__See also__  
IPCB\_Embedded interface

__GetState\_Name method__

\(IPCB\_Embedded interface\)  
__Syntax__  
Function GetState\_Name : TPCBString;  
__Description__  
This method gets the name for the embedded object\. This method represents the Name property\.  
__Example__  
__See also__  
IPCB\_Embedded interface

__GetState\_Description method__

\(IPCB\_Embedded interface\)  
__Syntax__  
Function GetState\_Description : TPCBString;  
__Description__  
This method gets the description for the embedded object\. This method represents the __Description__ property\. The __Description__ field can be used to store data\.  
__Example__  
__See also__  
IPCB\_Embedded interface

__Properties__

__Name property__

\(IPCB\_Embedded interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Name Write SetState\_Name;  
__Description__  
The Name property represents the name identifier of the embedded object\. This property is supported by its GetState\_Name and SetState\_Name methods\.  
__Example__

01

Var

02

    Board    : IPCB\_Board;

03

    Iterator : IPCB\_BoardIterator;

04

    Embd     : IPCB\_Embedded;

05

Begin

06

    Iterator := PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Create;

07

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eEmbeddedObject\)\);

08

    Iterator\.AddFilter\_LayerSet \(AllLayers\);

09

    Iterator\.AddFilter\_Method   \(eProcessAll\);

10

  

11

    Embd   := Iterator\.FirstPCBObject;

12

    While Embd <> Nil Do

13

    Begin

14

        ShowInfo\('Name : '        \+ Embd\.Name \+ \#13\#10 \+

15

                 'Description : ' \+ Embd\.Description\);

16

        Embd := Iterator\.NextPCBObject;

17

    End;

18

    PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Destroy\(Iterator\);

19

End;

__See also__  
IPCB\_Embedded interface  
TPCBString type

__Description property__

\(IPCB\_Embedded interface\)  
__Syntax__  
Property Description : TPCBString Read GetState\_Description Write SetState\_Description;  
__Description__  
The __Description__ property represents the __Description__ field of the embedded object\. This property is supported by its GetState\___Description__ and SetState\___Description__ methods\.  
The __Description__ field can be used to store data that represents this embedded object\.  
__Example__

01

Var

02

    Board    : IPCB\_Board;

03

    Iterator : IPCB\_BoardIterator;

04

    Embd     : IPCB\_Embedded;

05

Begin

06

    Iterator := PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Create;

07

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eEmbeddedObject\)\);

08

    Iterator\.AddFilter\_LayerSet \(AllLayers\);

09

    Iterator\.AddFilter\_Method   \(eProcessAll\);

10

  

11

    Embd   := Iterator\.FirstPCBObject;

12

    While Embd <> Nil Do

13

    Begin

14

        ShowInfo\('Name : '        \+ Embd\.Name \+ \#13\#10 \+

15

                 'Description : ' \+ Embd\.Description\);

16

        Embd := Iterator\.NextPCBObject;

17

    End;

18

    PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Destroy\(Iterator\);

19

End;

__See also__  
IPCB\_Embedded interface  
TPCBString type

<a id="IPCB_EmbeddedBoard_Interface"></a>__IPCB\_EmbeddedBoard Interface__

__Overview__  
The IPCB\_EmbeddedBoard interface represents an embedded board object consisting of multiple child PCBs in a matrix of rows and columns which is an embedded board array feature\. Each board array can reference a different pcb file\.

__Notes__

- The IPCB\_EmbeddedBoard interface is inherited from the IPCB\_RectangularPrimitive interface\.
- The RowSpacing and ColSpacing values determine the gap between items in the matrix of rows and columns\.
- The DocumentPath string refers to the referenced PCB file\. The corresponding ChildBoard interface represents the child referenced PCB\.
- The OriginMode property denotes how the array is referenced from the origin of the embedded board or let the PCB editor build the array based on the bottom left of the objects in the referenced board’s workspace\.
- The MirrorFlag denotes whether the embedded board is to be flipped over or not\.

The __IPCB\_EmbeddedBoard__ hierarchy;  
IPCB\_RectangularPrimitive  
IPCB\_EmbeddedBoard

IPCB\_RectangularPrimitive methods  
RotateAroundXY  
IsRedundant  
SetState\_XSizeYSize

IPCB\_RectangularPrimitive properties  
XLocation  
YLocation  
X1Location  
Y1Location  
X2Location  
Y2Location  
Rotation

IPCB\_EmbeddedBoard methods  
GetState\_RowCount  
GetState\_ColCount  
GetState\_RowSpacing  
GetState\_ColSpacing  
GetState\_DocumentPath  
GetState\_ChildBoard  
GetState\_Mirror  
GetState\_OriginMode  
SetState\_RowCount  
SetState\_ColCount  
SetState\_RowSpacing  
SetState\_ColSpacing  
SetState\_DocumentPath  
SetState\_Mirror  
SetState\_OriginMode

IPCB\_EmbeddedBoard properties  
RowCount  
ColCount  
RowSpacing  
ColSpacing  
DocumentPath  
ChildBoard  
MirrorFlag  
OriginMode

__See also__  
IPCB\_RectangularPrimitive interface  
PCB Design Objects

__Methods__

__GetState\_ChildBoard method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_ChildBoard : IPCB\_Board;  
__Description__  
This method retrieves  the reference PCB document to be used for the embedded board panellization\. This method is used for the ChildBoard property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_ColCount method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_ColCount : Integer;  
__Description__  
This method retrieves the number of columns that the board array will have\. You can also obtain the RowCount  as well to determine the size of the matrix for the board array\.  
This method is used for the ColCount property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_ColSpacing method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_ColSpacing : TCoord;  
__Description__  
This method sets the height of the first board and the gap between two boards\. This row spacing and the column spacing values are used to generate an embedded board array\.  
This method is used by the ColSpacing property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_DocumentPath method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_DocumentPath : TPCBString;  
__Description__  
This method obtains the path to the referenced PCB for the board panellization\. This method is used by the __DocumentPath__ property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_Mirror method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_Mirror : Boolean;  
__Description__  
The MirrorFlag property obtains the mirrored state of the embedded board panel of PCBs\. Set true to mirror it, or False to leave the embedded board panel as is\.  
This method is used by the MirrorFlag property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_OriginMode method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_OriginMode : TEmbeddedBoardOriginMode;  
__Description__  
This method obtains the board array from the origin of the embedded board or from the bottom left of the referenced board's workspace\.  
From the bottom left is the default value which has the software build the array based on the bottom left of the objects in the referenced board's workspace \(which is the child PCB document\)\.  
This method is used by the __OriginMode__ property\.  
Note that the reference point \(as a red cross\) of the board array is defined by the child PCB document that is used as the base for the board array to place on a PCB document\. To change the reference point \(origin\) of the child board object, click Edit » Origin » Reset / Set menu items to set the origin marker from the PCB menu\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_RowCount method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_RowCount : Integer;  
__Description__  
This method retrieves the number of rows that the board array will have\. You can also obtain the RowCount  as well to determine the size of the matrix for the board array\.  
This method is used for the RowCount property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_RowSpacing method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_RowSpacing : TCoord;  
__Description__  
This method obtains the width of the first board and the gap between two boards\. This row spacing and the column spacing values are used to generate an embedded board array\.  
This method is used by the RowSpacing property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_ColCount method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_ColCount \(Value : Integer\);  
__Description__  
This method sets the number of columns that the board array will have\. You can also set the RowCount  as well to determine the size of the matrix for the board array\.  
This method is used for the ColCount property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_ColSpacing method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_ColSpacing \(Value : TCoord \);  
__Description__  
This method sets the width of the first board and the gap between two boards\. This row spacing and the column spacing values are used to generate an embedded board array\.  
This method is used by the ColSpacing property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_DocumentPath method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_DocumentPath \(Value : TPCBString\);  
__Description__  
This method sets the path to the referenced PCB for the board panellization\. This method is used by the DocumentPath property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_Mirror method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_Mirror \(Value : Boolean\);  
__Description__  
The MirrorFlag property sets the mirrored state of the embedded board panel of PCBs\. Set true to mirror it, or False to leave the embedded board panel as is\.  
This method is used by the MirrorFlag property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_OriginMode method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_OriginMode \(Value : TEmbeddedBoardOriginMode\);  
__Description__  
This method sets the board array from the origin of the embedded board or from the bottom left of the referenced board's workspace\.  
From the bottom left is the default value which has the software build the array based on the bottom left of the objects in the referenced board's workspace \(which is the child PCB document\)\.  
This method is used by the __OriginMode__ property\.\.  
Note that the reference point \(as a red cross\) of the board array is defined by the child PCB document that is used as the base for the board array to place on a PCB document\. To change the reference point \(origin\) of the child board object, click Edit » Origin » Reset / Set menu items to set the origin marker from the PCB menu\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_RowCount method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_RowCount \(Value : Integer\);  
__Description__  
This method sets the number of rows that the board array will have\. You can also set the ColCount  as well to determine the size of the matrix for the board array\.  
This method is used for the RowCount property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_RowSpacing method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_RowSpacing \(Value : TCoord \);  
__Description__  
This method sets the width of the first board and the gap between two boards\. This row spacing and the column spacing values are used to generate an embedded board array\.  
This method is used by the RowSpacing property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__Properties__

__ChildBoard property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property ChildBoard : IPCB\_Board Read GetState\_ChildBoard;  
__Description__  
This __ChildBoard__ property represents the reference PCB document to be used for the embedded board panellization\.  
This read only property is supported by the GetState\_ChildBoard method\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__ColCount property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property ColCount : Integer Read GetState\_ColCount Write SetState\_ColCount;  
__Description__  
This __ColCount__ property represents the number of columns that the board array will have\. You can also define the RowCount property as well to define the size of the matrix for the board array\.  
This property is represented by the GetState\_ColCount and SetState\_ColCount methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__ColSpacing property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property ColSpacing : TCoord Read GetState\_ColSpacing Write SetState\_ColSpacing;  
__Description__  
The __ColSpacing__ property determines the height of the first board and the gap between two boards\. This column spacing and the row spacing values are used to generate an embedded board array\.  
This property is supported by the GetState\_ColSpacing and SetState\_ColSpacing methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__DocumentPath property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property DocumentPath : TPCBString Read GetState\_DocumentPath Write SetState\_DocumentPath;  
__Description__  
This __DocumentPath__ property represents the path to the referenced PCB for the board panellization\. This property is supported by the __GetState\_DocumentPath__ and __SetState\_DocumentPath__ methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__MirrorFlag property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property MirrorFlag : Boolean Read GetState\_Mirror Write SetState\_Mirror;  
__Description__  
The __MirrorFlag__ property represents the mirrored state of the embedded board panel of PCBs\. Set true to mirror it, or False to leave the embedded board panel as is\.  
This property is supported by the GetState\_MirrorFlag and SetState\_MirrorFlag methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__OriginMode property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property OriginMode : TEmbeddedBoardOriginMode Read GetState\_OriginMode Write SetState\_OriginMode;  
__Description__  
This __OriginMode__ property references the board array from the origin of the embedded board or from the bottom left of the referenced board's workspace\.  
From the bottom left is the default value which has the software build the array based on the bottom left of the objects in the referenced board's workspace \(which is the child PCB document\)\.  
This __OriginMode__ property is supported by the __GetState\_OriginMode__ and __SetState\_OriginMode__ methods\.  
Note that the reference point \(as a red cross\) of the board array is defined by the child PCB document that is used as the base for the board array to place on a PCB document\. To change the reference point \(origin\) of the child board object, click Edit » Origin » Reset / Set menu items to set the origin marker from the PCB menu\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface  
TEmbeddedBoardOriginMode type

__RowCount property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property RowCount : Integer Read GetState\_RowCount Write SetState\_RowCount;  
__Description__  
This __RowCount__ property represents the number of rows that the board array will have\. You can also define the ColCount property as well to define the size of the matrix for the board array\.  
This property is represented by the GetState\_RowCount and SetState\_RowCount methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__RowSpacing property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property RowSpacing : TCoord Read GetState\_RowSpacing Write SetState\_RowSpacing;  
__Description__  
The __RowSpacing__ property determines the width of the first board and the gap between two boards\. This row spacing and the column spacing values are used to generate an embedded board array\.  
This property is supported by the GetState\_RowSpacing and SetState\_RowSpacing methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

<a id="IPCB_Fill"></a>__IPCB\_Fill__

__Overview__  
The __IPCB\_Fill__ interface represents a PCB fill object on a PCB document\. A fill object is a rectangular object and thus is inherited from the IPCB\_RectangularPrimitive interface\.

__Notes__  
The IPCB\_Fill interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_RectangularPrimitive  
IPCB\_Fill

__IPCB\_RectangularPrimitive methods__  
RotateAroundXY  
IsRedundant  
SetState\_XSizeYSize

__IPCB\_RectangularPrimitive properties__  
XLocation  
YLocation  
X1Location  
Y1Location  
X2Location  
Y2Location  
Rotation

IPCB\_Fill methods

IPCB\_Fill properties

__Example__

01

Var

02

    WorkSpace : IWorkSpace;

03

    Board     : IPCB\_Board;

04

    Fill      : IPCB\_Fill;

05

Begin

06

    //Create a new PCB document

07

    WorkSpace := GetWorkSpace;

08

    If WorkSpace = Nil Then Exit;

09

    Workspace\.DM\_CreateNewDocument\('PCB'\);

10

  

11

    Board := PCBServer\.GetCurrentPCBBoard;

12

    If Board = Nil then exit;

13

  

14

    // Create a Fill object

15

    Fill             := PCBServer\.PCBObjectFactory\(eFillObject, eNoDimension,eCreate\_Default\);

16

  

17

    Fill\.X1Location  := MilsToCoord\(2000\);

18

    Fill\.Y1Location  := MilsToCoord\(2000\);

19

    Fill\.X2Location  := MilsToCoord\(2500\);

20

    Fill\.Y2Location  := MilsToCoord\(2500\);

21

    Fill\.Layer       := eBottomLayer;

22

    Fill\.Rotation    := 45;

23

  

24

    // Add a new Fill into the PCB design database\.

25

    Board\.AddPCBObject\(Fill\);

26

  

27

    // Refresh the PCB document

28

    ResetParameters;

29

    AddStringParameter\('Action', 'All'\);

30

    RunProcess\('PCB:Zoom'\);

31

End;

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_RectangularPrimitive interface  
Undo script in \\Examples\\Scripts\\PCB folder\.

<a id="IPCB_FromTo_Interface"></a>__IPCB\_FromTo Interface__

__Overview__  
The __IPCB\_FromTo__ interface represents a FromTo object on a PCB document, as a node to a node \(a pad of a component to a pad of another component for example\) and has a NetName property\.

The IPCB\_FromTo hierarchy;  
IPCB\_Primitive  
IPCB\_FromTo

__IPCB\_FromTo methods__  
GetState\_FromPad  
GetState\_ToPad  
GetState\_NetName  
SetState\_FromPad  
SetState\_ToPad  
SetState\_NetName  
GetNet  
GetFromPad  
GetToPad  
GetState\_RoutedLength

__IPCB\_FromTo properties__  
FromPad  
ToPad  
NetName

__See also__  
IPCB\_Primitive interface  
IPCB\_Pad interface  
IPCB\_Net interface  
PCB Design Objects

__GetState and SetState Methods__

__GetState\_FromPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetState\_FromPad : TPCBString;  
__Description__  
A FromTo object has a node to a node \(a pin to a pin for example\) represented FromPad and ToPad properties\.  
This method is used for the FromPad property\.  
__Example__  
__See also__  
IPCB\_FromTo interface  
TPCBString

__GetState\_NetName method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetState\_NetName : TPCBString;  
__Description__  
The FromTo object has two nodes, FromPad and ToPad\. These __Notes__ have their Net Name properties\.  
This method gets the net name for the FromTo object and is for the NetName property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__GetState\_ToPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetState\_ToPad : TPCBString;  
__Description__  
A FromTo object has a node to a node \(a pin to a pin for example\) represented FromPad and ToPad properties\.  
This method is used for the ToPad property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__SetState\_FromPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Procedure SetState\_FromPad \(Value : TPCBString\);  
__Description__  
A FromTo object has a node to a node \(a pin to a pin for example\) represented FromPad and ToPad properties\.  
This method sets the FromPad and is for the FromPad property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__SetState\_NetName method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Procedure SetState\_NetName \(Value : TPCBString\);  
__Description__  
The FromTo object has two nodes, FromPad and ToPad\. These __Notes__ have their Net Name properties\.  
This method sets the net name for the FromTo object and is for the NetName property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__SetState\_ToPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Procedure SetState\_ToPad \(Value : TPCBString\);  
__Description__  
A FromTo object has a node to a node \(a pin to a pin for example\) represented FromPad and ToPad properties\.  
This method sets the ToPad and is for the ToPad property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__Methods__

__GetFromPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetFromPad : IPCB\_Pad;  
__Description__  
This function returns the pad  interface associated with the FromPad of the FromTo object\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__GetNet method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetNet : IPCB\_Net;  
__Description__  
This function returns the net interface associated with the net of the FromTo object\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__GetToPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetToPad : IPCB\_Pad;  
__Description__  
This function returns the pad  interface associated with the ToPad of the FromTo object\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__GetState\_RoutedLength method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetState\_RoutedLength : TCoord;  
__Description__  
This function returns the routed length of the FromTo object in TCoord units\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__Properties__

__FromPad property__

\(IPCB\_FromTo interface\)  
__Syntax__  
Property FromPad : TPCBString Read GetState\_FromPad Write SetState\_FromPad;  
__Description__  
The FromTo object has two nodes, FromPad and ToPad\. These Nodes have their Net Name properties\.  
This property represents the FromPad node and returns the name of the FromPad property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__NetName property__

\(IPCB\_FromTo interface\)  
__Syntax__  
Property NetName : TPCBString Read GetState\_NetName Write SetState\_NetName;  
__Description__  
The FromTo object has two nodes, FromPad and ToPad\. These Nodes have their Net Name properties\.  
This property represents the net name of the FromTo object\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__ToPad property__

\(IPCB\_FromTo interface\)  
__Syntax__  
Property ToPad : TPCBString Read GetState\_ToPad Write SetState\_ToPad;  
__Description__  
The FromTo object has two nodes, FromPad and ToPad\. These Nodes have their Net Name properties\.  
This property represents the ToPad node and returns the name of the ToPad property\.\.  
__Example__  
__See also__  
IPCB\_FromTo interface

<a id="IPCB_Group"></a>__IPCB\_Group__

__Overview__  
The__ IPCB\_Group__ interface is an immediate ancestor for __IPCB\_Net__, __IPCB\_LibComponent__, __IPCB\_Polygon__, __IPCB\_Coordinate__, __IPCB\_Dimension__ and its descendant interfaces\.

The __IPCB\_Group__ interface is a composite object interface which means it can store objects\. Thus a group object is an object composed of primitives such as arcs, tracks and fills\.  For example a polygon consists of child tracks and arcs\. A footprint in a PCB library consists of child objects such as arcs, pads and tracks\.

The __IPCB\_Group__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group

__Notes__  
To fetch objects of a group object, you employ the Group Iterator with the __GroupIterator\_Create__ and __GroupIterator\_Destroy__ methods\.  
To add or remove child objects from a group object, you employ the __AddPCBObject__ or the __RemovePCBObject__ methods\.  
To fetch the reference coordinates of a group object, the X,Y properties define the reference point\.

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__See also__  
IPCB\_Primitive interface  
IPCB\_Net interface  
IPCB\_LibComponent interface  
IPCB\_Polygon interface  
IPCB\_Coordinate interface  
IPCB\_Dimension interface  
IPCB\_GroupIterator interface  
PCB Design Objects

__Methods__

__AddPCBObject method__

\(IPCB\_Group interface\)  
__Syntax__  
Procedure AddPCBObject\(PCBObject : IPCB\_Primitive\);  
__Description__  
__Example__  
   
__See also__  
IPCB\_Group interface

__FastSetState\_XSizeYSize method__

\(IPCB\_Group interface\)  
__Syntax__  
Function FastSetState\_XSizeYSize : Boolean;   
__Description__  
__Example__  
   
__See also__  
IPCB\_Group interface

__FreePrimitives method__

\(IPCB\_Group interface\)  
__Syntax__  
Procedure FreePrimitives;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Group

__GetPrimitiveAt method__

\(IPCB\_Group interface\)  
__Syntax__  
Function  GetPrimitiveAt\(I        : Integer;  
                         ObjectId : TObjectId\) : IPCB\_Primitive;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Group interface

__GetPrimitiveCount method__

\(IPCB\_Group interface\)  
__Syntax__  
Function GetPrimitiveAt\(I        : Integer;  
                        ObjectId : TObjectId\): IPCB\_Primitive;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Group

__GroupIterator\_Create__

\(IPCB\_Group interface\)  
__Syntax__  
Function GroupIterator\_Create : IPCB\_GroupIterator;  
__Description__  
The GroupIterator\_Create method creates a group iterator for the group object, so that the child objects can be searched from within the group object\. This group iterator searches for child objects of a group object, such as a component, footprint, polygon, dimension, board layout and so on\.  
__Example__

01

Var

02

    Track                   : IPCB\_Primitive;

03

    TrackIteratorHandle     : IPCB\_GroupIterator;

04

    Component               : IPCB\_Component;

05

    ComponentIteratorHandle : IPCB\_BoardIterator;

06

    TrackCount              : Integer;

07

    ComponentCount          : Integer;

08

Begin

09

    TrackCount     := 0;

10

    ComponentCount := 0;

11

    If PCBServer\.GetCurrentPCBBoard = Nil Then Exit;

12

  

13

    ComponentIteratorHandle := PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Create;

14

    ComponentIteratorHandle\.AddFilter\_ObjectSet\(MkSet\(eComponentObject\)\);

15

    ComponentIteratorHandle\.AddFilter\_LayerSet\(AllLayers\);

16

    ComponentIteratorHandle\.AddFilter\_Method\(eProcessAll\);

17

    Component := ComponentIteratorHandle\.FirstPCBObject;

18

  

19

    While \(Component <> Nil\) Do

20

    Begin

21

        TrackIteratorHandle := Component\.GroupIterator\_Create;

22

        TrackIteratorHandle\.AddFilter\_ObjectSet\(MkSet\(eTrackObject\)\);

23

        TrackIteratorHandle\.AddFilter\_LayerSet\(MkSet\(eTopOverlay\)\);

24

        Track := TrackIteratorHandle\.FirstPCBObject;

25

        While \(Track <> Nil\) Do

26

        Begin

27

            Inc\(TrackCount\);

28

            Track := TrackIteratorHandle\.NextPCBObject;

29

        End;

30

        ShowInfo\('This component ' \+ Component\.SourceDesignator  \+ ' has ' \+  IntToStr\(TrackCount\)  \+ ' tracks\.'\);

31

        TrackCount := 0;

32

        Component\.GroupIterator\_Destroy\(TrackIteratorHandle\);

33

        Component := ComponentIteratorHandle\.NextPCBObject;

34

        Inc\(ComponentCount\);

35

        If \(ComponentCount > 5\) Then Break;

36

    End;

37

    PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Destroy\(ComponentIteratorHandle\);

38

End;

__See also__  
IPCB\_Group interface  
IPCB\_GroupIterator interface

__GroupIterator\_Destroy__

\(IPCB\_Group interface\)  
__Syntax__  
Procedure GroupIterator\_Destroy\(Var AIterator : IPCB\_GroupIterator\);  
__Description__  
__Example__  
   
__See also__  
IPCB\_Group interface  
IPCB\_GroupIterator interface

__RemovePCBObject method__

\(IPCB\_Group interface\)  
__Syntax__  
Procedure RemovePCBObject\(PCBObject : IPCB\_Primitive\);  
__Description__  
__Example__  
   
__See also__  
IPCB\_Group interface

__SetState\_LayersUsedArray method__

\(IPCB\_Group interface\)  
__Syntax__  
Procedure SetState\_LayersUsedArray;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Group interface

__SetState\_XSizeYSize method__

\(IPCB\_Group interface\)  
__Syntax__  
Function  SetState\_XSizeYSize : Boolean;   
__Description__  
__Example__  
   
__See also__  
IPCB\_Group interface

__Properties__

__LayerIsUsed property__

\(IPCB\_Group interface\)  
__Syntax__  
Property  LayerUsed \[L : TLayer\] : Boolean Read GetState\_LayerUsed Write SetState\_LayerUsed;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Group

__PrimitiveLock property__

\(IPCB\_Group interface\)  
__Syntax__  
Property PrimitiveLock : Boolean Read GetState\_PrimitiveLock Write SetState\_PrimitiveLock;  
__Description__  
The PrimitiveLock property denotes whether the primitives of the group object can be edited individually or not\. Normally all the child objects or primitives of a group can only be accessed as a group object\.  
__Example__  
   
__See also__  
IPCB\_Group

__X property__

\(IPCB\_Group interface\)  
__Syntax__  
Property X : TCoord Read GetState\_XLocation Write SetState\_XLocation;  
__Description__  
The X property defines the reference point of the group object\.  
__Example__  
   
__See also__  
IPCB\_Group interface

__Y property__

\(IPCB\_Group interface\)  
__Syntax__  
Property Y : TCoord Read GetState\_YLocation Write SetState\_YLocation;  
__Description__  
The Y property defines the reference point of the group object\.  
__Example__  
   
__See also__  
IPCB\_Group interface

<a id="IPCB_LettersCache_Interface"></a>__IPCB\_LettersCache Interface__

__Overview__

__IPCB\_LettersCache methods__  
I\_ObjectAddress  
PlotText

__IPCB\_LettersCache properties__

__ __  
__Example__  
Var  
__See also__  
PCB Design Objects

__Methods__

__I\_ObjectAddress method__

\(IPCB\_LettersCache interface\)  
__Syntax__  
Function  I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
__Example__  
__See also__  
IPCB\_LettersCache interface

__PlotText method__

\(IPCB\_LettersCache interface\)  
__Syntax__  
Procedure PlotText\(ATextHandle  : TPCBObjectHandle;  
                   PlotProc     : TPlotPolygonProc;  
             Const ADisplayText : TPCBString\);  
__Description__  
__Example__  
__See also__  
IPCB\_LettersCache interface

<a id="IPCB_LibComponent_Interface"></a>__IPCB\_LibComponent Interface__

__Overview__  
The __IPCB\_LibComponent__ object represents the current footprint in a PCB library document\. The footprints of a PCB library is equivalent to "pages" of a library\.

The library document is represented by two interfaces \- the current footprint and the IPCB\_Library document\.

The __IPCB\_LibraryIterator__ object interface iterates through a loaded PCB library in Altium Designer to fetch PCB footprints which are represented by the __IPCB\_LibComponent__ interfaces\. The IPCB\_LibraryIterator interface is used in the IPCB\_Library interface \- LibraryIterator\_Create and LibraryIterator\_Destory methods\.

__Notes__  
A library is represented by the IPCB\_Library interface\.  
A PCB footprint \(as a page of the library\) is represented by its IPCB\_LibComponent interface which is inherited from the IPCB\_Group object interface\.  
A PCB footprint is composed of child objects such as pads and tracks\. Therefore the footprint has its own IPCB\_GroupIterator to fetch its own child objects\.  
DelphiScript doesnt support sets, therefore to pass in a set of layers or a set of objects, you need to use the __MkSet__ function to create a pseudo set of objects or layers for the __AddFilter\_ObjectSet__ or __AddFilterLayerSet__ methods\. For example LibraryIterator\.AddFilter\_ObjectSet\(MkSet\(eTrackObject,eFillObject\)\);

The __IPCB\_LibComponent__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_LibComponent

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
   
GroupIterator\_Create  
GroupIterator\_Destroy  
   
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__IPCB\_LibComponent methods__  
GetState\_Pattern  
GetState\_Height  
GetState\_Description  
SetState\_Pattern  
SetState\_Height  
SetState\_Description

__IPCB\_LibComponent properties__  
Name  
Height  
Description

__DelphiScript Example__

01

Procedure ReportFootprintInfo;

02

Var

03

    CurrentLib        : IPCB\_Library;

04

    FootprintIterator : IPCB\_LibraryIterator;

05

    Footprint         : IPCB\_LibComponent;

06

    FootprintList     : TStringList;

07

    ReportDocument    : IServerDocument;

08

    Filename          : TString;

09

    S                 : TString;

10

    I                 : Integer;

11

Begin

12

    CurrentLib := PCBServer\.GetCurrentPCBLibrary;

13

    If CurrentLib = Nil Then Exit;

14

  

15

    Filename := ExtractFilePath\(CurrentLib\.Board\.FileName\) \+ 'PCBLib\_Report\.csv';

16

    S := '';

17

    FootprintList := TStringList\.Create;

18

  

19

    FootprintIterator := CurrentLib\.LibraryIterator\_Create;

20

    FootprintIterator\.SetState\_FilterAll;

21

    Try

22

        Footprint := FootprintIterator\.FirstPCBObject;

23

        While Footprint <> Nil Do

24

        Begin

25

            // Determine which units are in use\. at the mo it is the other way around\!\!\!

26

            If CurrentLib\.Board\.DisplayUnit = eMetric Then

27

                S := footprint\.name \+ ',' \+ FloatToStr\(CoordToMils\(Footprint\.Height\)\) \+ ',' \+ Footprint\.Description

28

            Else

29

                S := footprint\.name \+ ',' \+ FloatToStr\(CoordToMMs\(Footprint\.Height\)\) \+ ',' \+ Footprint\.Description;

30

  

31

            FootprintList\.Add\(S\);

32

            Footprint := FootprintIterator\.NextPCBObject;

33

        End;

34

     Finally

35

        CurrentLib\.LibraryIterator\_Destroy\(FootprintIterator\);

36

        FootprintList\.SaveToFile\(FileName\);

37

        FootprintList\.Free;

38

    End;

39

  

40

    //Display and save report\.

41

    ReportDocument := Client\.OpenDocument\('Text', FileName\);

42

    If ReportDocument <> Nil Then

43

        Client\.ShowDocument\(ReportDocument\);

44

End;

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_GroupIterator interface  
LibraryIterator example from \\Examples\\Scripts\\DelphiScript\\PCB\\ folder\.

__GetState and SetState Methods__

__GetState\_Description method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Function GetState\_Description : TPCBString;  
__Description__  
The __Description__ property denotes the footprint's description\. This method is used for the Description property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__GetState\_Height method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Function GetState\_Height : TCoord;  
__Description__  
The Height property denotes the footprint's height\. This method is used by the Height property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__GetState\_Pattern method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Function GetState\_Pattern : TPCBString;  
__Description__  
The Name property denotes the pattern name of the footprint\. This pattern method is used by the Name property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__SetState\_Description method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Procedure SetState\_Description \(Value : TPCBString\);  
__Description__  
The __Description__ property denotes the footprint's description\. This method is used for the Description property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__SetState\_Height method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Procedure SetState\_Height \(Value : TCoord\);  
__Description__  
The Height property denotes the footprint's height\. This method is used by the Height property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__SetState\_Pattern method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Procedure SetState\_Pattern \(Value : TPCBString\);  
__Description__  
The Name property denotes the pattern name of the footprint\. This pattern method is used by the Name property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__Properties__

__Description property__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Property Description : TPCBString Read getState\_Description Write SetState\_Description;  
__Description__  
The __Description__ property denotes the footprint's description\. This Description property is supported by the GetState\_Description and SetState\_Description methods\.  
Note, the IPCB\_LibComponent interface represents the current footprint in the PCB Library editor workspace\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__Height property__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Property Height : TCoord Read GetState\_Height Write SetState\_Height;  
__Description__  
The Height property denotes the footprint's height\. This Height property is supported by the GetState\_Height and SetState\_Height methods\.  
Note, the IPCB\_LibComponent interface represents the current footprint in the PCB Library editor workspace\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__Name property__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Pattern Write SetState\_Pattern;  
__Description__  
The Name property denotes the pattern name of the footprint\. This Name property is supported by the GetState\_Pattern and SetState\_Pattern methods\.  
Note, the __IPCB\_LibComponent__ interface represents the current footprint in the PCB Library editor workspace\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

<a id="IPCB_Net_Interface"></a>__IPCB\_Net Interface__

__Overview__  
A net object can store net information from a PCB document\.  The net object contains information about the components used in the design, and the connectivity created in the design, stored in the form of nets\.  A net object is a list of pin to pin connections that are electrically connected in the design\.  The arrangement of the pin to pin connections is called the net topology\.

The net objects are system generated objects, which means, you can retrieve the net names of PCB objects that have a net property on a PCB document\.

By default the PCB editor arranges the pin to pin connections of each net to give the shortest overall connection length\.  To have control of the arrangement of the pin to pin connections in a net, the PCB editor allows the user to define a set of From\-Tos\.

__The IPCB\_Net interface hierarchy is as follows:__  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Net

__Notes__  
The ConnectsVisible property denotes the visibility of a net\. If True, connections are visible\.  
IPCB\_Group table

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__IPCB\_Net table__

__IPCB\_Net methods__  
GetState\_Color  
GetState\_Name  
GetState\_ConnectsVisible  
GetState\_ConnectivelyInvalid  
GetState\_RoutedLength  
GetState\_ViaCount  
GetState\_PinCount  
Getstate\_PadByName  
Getstate\_PadByPinDescription  
GetState\_IsHighlighted  
GetState\_LoopRemoval  
GetState\_DifferentialPair  
GetState\_InDifferentialPair  
GetState\_LiveHighlightMode  
SetState\_Color  
SetState\_Name  
SetState\_ConnectsVisible  
SetState\_IsHighlighted  
SetState LoopRemoval  
SetState\_DifferentialPair  
SetState\_LiveHighlightMode  
Rebuild  
HideNetConnects  
ShowNetConnects  
ConnectivelyInValidate;Procedure CancelGroupWarehouseRegistration  
CancelGroupWarehouseRegistration  
RegisterWithGroupWarehouse  
GetLogicalNet  
SubnetIndices\_Set  
SubnetIndices\_Reset

__IPCB\_Net properties__  
Color  
Name  
ConnectsVisible  
ConnectivelyInvalid  
RoutedLength  
ViaCount  
PinCount  
PadByName  
PadByPinDescription  
IsHighlighted  
LoopRemoval  
DifferentialPair  
InDifferentialPair  
LiveHighlightMode

__Example__

01

Procedure IterateNetObjects;

02

Var

03

    Board       : IPCB\_Board;

04

    Net         : IPCB\_Net;

05

    Iterator    : IPCB\_BoardIterator;

06

    LS          : TPCBString;

07

Begin

08

    // Retrieve the current board

09

    Board := PCBServer\.GetCurrentPCBBoard;

10

    If Board = Nil Then Exit;

11

    // Create the iterator that will look for Net objects only

12

    Iterator        := Board\.BoardIterator\_Create;

13

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eNetObject\)\);

14

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

15

    Iterator\.AddFilter\_Method\(eProcessAll\);

16

    // Search for Net objects and get their Net Name values

17

    LS := '';

18

    Net := Iterator\.FirstPCBObject;

19

    While \(Net <> Nil\) Do

20

    Begin

21

        LS := LS \+ Net\.Name \+ ', ';

22

        Net := Iterator\.NextPCBObject;

23

    End;

24

    Board\.BoardIterator\_Destroy\(Iterator\);

25

    // Display the Net Names on a dialog\.

26

    ShowInfo\('Nets = ' \+ LS\);

27

 End;

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_GroupIterator interface  
IterateNets example from the \\Examples\\Scripts\\DelphiScript\\PCB\\ folder\.  
NetObjectAssign example from the \\Examples\\Scripts\\DelphiScript\\PCB\\ folder\.

__GetState and SetState methods__

__GetState\_Color method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_Color : TColor;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_ConnectivelyInvalid method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_ConnectivelyInvalid : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_ConnectsVisible method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_ConnectsVisible : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_IsHighlighted method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_IsHighlighted : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_Name method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_Name : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Getstate\_PadByName method__

\(IPCB\_Net interface\)  
__Syntax__  
Function Getstate\_PadByName \(PadName : TPCBString\) : IPCB\_Primitive;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Getstate\_PadByPinDescription method__

\(IPCB\_Net interface\)  
__Syntax__  
Function Getstate\_PadByPinDescription \(PinDes : TPCBString\) : IPCB\_Primitive;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_PinCount method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_PinCount : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_RoutedLength method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_RoutedLength : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_ViaCount method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_ViaCount : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__SetState\_Color method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure SetState\_Color \(Color : TColor\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__SetState\_ConnectsVisible method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure SetState\_ConnectsVisible \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__SetState\_IsHighlighted method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure SetState\_IsHighlighted \(Dummy : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__SetState\_Name method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure SetState\_Name \(Name : TPCBString\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Methods__

__CancelGroupWarehouseRegistration method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure CancelGroupWarehouseRegistration \(iPad : IPCB\_Pad\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__ConnectivelyInValidate method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure ConnectivelyInValidate;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetLogicalNet method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetLogicalNet : IPCB\_Group;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__HideNetConnects method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure HideNetConnects;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Rebuild method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure Rebuild;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__ShowNetConnects method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure ShowNetConnects;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__RegisterWithGroupWarehouse method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure RegisterWithGroupWarehouse \(iPad : IPCB\_Pad\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Properties__

__Color property__

\(IPCB\_Net interface\)  
__Syntax__  
Property Color : TColor Read GetState\_Color Write SetState\_Color;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__ConnectivelyInvalid property__

\(IPCB\_Net interface\)  
__Syntax__  
Property ConnectivelyInvalid : Boolean Read GetState\_ConnectivelyInvalid;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__ConnectsVisible property__

\(IPCB\_Net interface\)  
__Syntax__  
Property ConnectsVisible : Boolean Read GetState\_ConnectsVisible Write SetState\_ConnectsVisible;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__IsHighlighted property__

\(IPCB\_Net interface\)  
__Syntax__  
Property IsHighlighted : Boolean Read GetState\_IsHighlighted Write SetState\_IsHighlighted;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Name property__

\(IPCB\_Net interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Name Write SetState\_Name;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__PadByName \[N property__

\(IPCB\_Net interface\)  
__Syntax__  
Property PadByName \[N : TPCBString \] : IPCB\_Primitive Read Getstate\_PadByName;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__PadByPinDescription \[N property__

\(IPCB\_Net interface\)  
__Syntax__  
Property PadByPinDescription \[N : TPCBString \] : IPCB\_Primitive Read Getstate\_PadByPinDescription;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__PinCount property__

\(IPCB\_Net interface\)  
__Syntax__  
Property PinCount : Integer Read GetState\_PinCount;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__RoutedLength property__

\(IPCB\_Net interface\)  
__Syntax__  
Property RoutedLength : TCoord Read GetState\_RoutedLength;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__ViaCount property__

\(IPCB\_Net interface\)  
__Syntax__  
Property ViaCount : Integer Read GetState\_ViaCount;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

<a id="IPCB_ObjectClass_Interface"></a>__IPCB\_ObjectClass Interface__

__Overview__  
A class is defined as a group or set of objects, identified by its unique class name\. The PCB editor in the Altium Designer supports Net Classes, Component Classes and From\-To Classes\.

An object can belong to more than one class\. You can create classes \(or groups\) of objects\. Classes of Components, Nets and From\-Tos can be created, and multiple membership is permitted\.  Classes are used to quickly identify a group of objects\. For example, you could create a class of components called Surface Mount\.

When you set up a paste mask expansion rule for the surface mount components, you simply set the rule scope to Component Class and select the Surface Mount class\. Or you may have a set of nets, such as the power nets, which have different clearance requirements from the signal nets\. You can create a Net Class which includes all these nets, and then use the Net Class scope when you define the clearance design rule for these nets\.

__Notes__  
An ObjectClass object can be created from the PCBClassFactoryByClassMember or PCBObjectFactory methods from the __IPCB\_ServerInterface__ interface\.

The IPCB\_ObjectClass hierarchy;  
IPCB\_Primitive  
IPCB\_ObjectClass

__IPCB\_ObjectClass methods__  
GetState\_MemberKind  
GetState\_Name  
GetState\_SuperClass  
GetState\_MemberName  
SetState\_MemberKind  
SetState\_Name  
SetState\_SuperClass  
AddMemberByName  
AddMember  
RemoveMember  
RemoveAllMembers  
IsMember  
IsLayerMember  
AddLayerMember  
RemoveLayerMember  
IsValidObjectKind

__IPCB\_ObjectClass properties__  
MemberKind  
Name  
SuperClass  
MemberName \[I

__Example__

01

Var

02

    Board    : IPCB\_Board;

03

    NetClass : IPCB\_ObjectClass;

04

Begin

05

    Board := PCBServer\.GetCurrentPCBBoard;

06

    If Board = Nil Then Exit;

07

    PCBServer\.PreProcess;

08

    NetClass := PCBServer\.PCBClassFactoryByClassMember\(eClassMemberKind\_Net\);

09

    NetClass\.SuperClass := False;

10

    NetClass\.Name := 'NetGndClass';

11

    NetClass\.AddMemberByName\('GND'\);

12

    Board\.AddPCBObject\(NetClass\);

13

    PCBServer\.PostProcess;

14

End;

__See also__  
IPCB\_Primitive interface  
IPCB\_ServerInterface interface  
TClassMemberKind enumerated values  
PCB Design Objects  
Object Class Reporter script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\Object Class Report  
UnrouteNetClass script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\UnRoute Net Class\\ folder\.  
CreateNetClass script from  \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder\.  
ComponentClassInfo script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\

__GetState and SetState Methods__

__SetState\_SuperClass method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure SetState\_SuperClass \(Value : Boolean\);  
__Description__  
The SuperClass property denotes whether or not the interface contains all members of a particular kind\. If this field is set to true, the members of the IPCB\_ObjectClass object cannot be edited\.  
This Setter method is used by the SuperClass property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__SetState\_Name method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure SetState\_Name \(Value : TPCBString\);  
__Description__  
This property denotes the name of this Object Class object for the PCB document\. This setter method is used by the Name property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__SetState\_MemberKind method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure SetState\_MemberKind \(Value : TClassMemberKind\);  
__Description__  
This property denotes which particular objects can be stored in the list\. This setter method is used by the MemberKind property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__GetState\_SuperClass method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function GetState\_SuperClass : Boolean;  
__Description__  
The SuperClass property denotes whether or not the interface contains all members of a particular kind\. If this field is set to true, the members of the IPCB\_ObjectClass object cannot be edited and contains all the names of the objects of the particular kind\.  
This Getter method is used by the SuperClass property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind enumerated values

__GetState\_Name method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function GetState\_Name : TPCBString;  
__Description__  
This property denotes the name of this Object Class object for the PCB document\. This getter method is used by the Name property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__GetState\_MemberName method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function GetState\_MemberName \(I : Integer\) : TPCBString;  
__Description__  
This property denotes the member name from the list of members in the IPCB\_Object class interface\. This getter method is used by the MemberName property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__GetState\_MemberKind method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function GetState\_MemberKind : TClassMemberKind;  
__Description__  
This method denotes which particular objects can be stored in the list\. This getstate\_MemberKind method is used by the __MemberKind__ property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind type

__Methods__

__AddLayerMember method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure AddLayerMember \(L : TLayer\);  
__Description__  
This __AddLayerMember__ method adds a layer to the object class of eClassMemberKind\_Layer type\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__AddMember method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure AddMember \(P : IPCB\_Primitive\);  
__Description__  
The __AddMember__ method adds a primitive that belongs to the same member kind in the Object Class\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__AddMemberByName method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure AddMemberByName \(AName : TPCBString\);  
__Description__  
This AddMemberByName adds a member by its name of the member kind in the object class\.  
__Example__

01

Var

02

    Board    : IPCB\_Board;

03

    NetClass : IPCB\_ObjectClass;

04

Begin

05

    Board := PCBServer\.GetCurrentPCBBoard;

06

    If Board = Nil Then Exit;

07

    PCBServer\.PreProcess;

08

    NetClass := PCBServer\.PCBClassFactoryByClassMember\(eClassMemberKind\_Net\);

09

    NetClass\.SuperClass := False;

10

    NetClass\.Name := 'NetGndClass';

11

    NetClass\.AddMemberByName\('GND'\);

12

    Board\.AddPCBObject\(NetClass\);

13

    PCBServer\.PostProcess;

14

End;

__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind enumerated values

__IsLayerMember method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function IsLayerMember \(L : TLayer\) : Boolean;  
__Description__  
This function checks if this layer is part of the Object Class that is hosting layer classes only \(of eClassMemberKind\_Layer type\)\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind enumerated values

__IsMember method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function IsMember \(S : TPCBString\) : Boolean;  
__Description__  
This function checks if the member \(by name\) is part of the Object Class\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__IsValidObjectKind method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function IsValidObjectKind \(P : IPCB\_Primitive\) : Boolean;  
__Description__  
This function checks if the PCB design object is a valid object kind for this object class\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__RemoveAllMembers method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure RemoveAllMembers;  
__Description__  
This method removes all the members for this object class\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__RemoveLayerMember method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure RemoveLayerMember \(L : TLayer\);  
__Description__  
This method removes the specified layer from the Object Class that hosts the layer classes only\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__RemoveMember method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure RemoveMember \(P : IPCB\_Primitive\);  
__Description__  
This method removes the specified PCB design object from the list of members in this Object class\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__Properties__

__MemberKind property__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Property MemberKind : TClassMemberKind Read GetState\_MemberKind Write SetState\_MemberKind;  
__Description__  
This property denotes which particular objects can be stored in the list\.  
This property is supported by the GetState\_MemberKind and SetState\_MemberKind methods\.  
__Example__

01

Var

02

    Board    : IPCB\_Board;

03

    NetClass : IPCB\_ObjectClass;

04

Begin

05

    Board := PCBServer\.GetCurrentPCBBoard;

06

    If Board = Nil Then Exit;

07

    PCBServer\.PreProcess;

08

    NetClass := PCBServer\.PCBClassFactoryByClassMember\(eClassMemberKind\_Net\);

09

    NetClass\.SuperClass := False;

10

    NetClass\.Name := 'NetGndClass';

11

    NetClass\.AddMemberByName\('GND'\);

12

    Board\.AddPCBObject\(NetClass\);

13

    PCBServer\.PostProcess;

14

End;

__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind type

__MemberName property__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Property MemberName \[I : Integer\] : TPCBString Read GetState\_MemberName;  
__Description__  
This property denotes the member name from the list of members in the IPCB\_Object class interface\. This read only property is supported by the GetState\_MemberName method\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__Name property__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Name Write SetState\_Name;  
__Description__  
This property denotes the name of this Object Class object for the PCB document\. This property is supported by the GetState\_Name and SetState\_Name methods\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__SuperClass property__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Property SuperClass : Boolean Read GetState\_SuperClass Write SetState\_SuperClass;  
__Description__  
The __SuperClass__ property denotes whether or not the interface contains all members of a particular kind\. If this field is set to true, the members of the __IPCB\_ObjectClass__ object cannot be edited\.  
By default, a super class contains all members of the same member kind \- for example, if layer kind is selected, then all layers is included for this Object Class\.  
This property is supported by the GetState\_SuperClass and SetState\_SuperClass methods\.  
__Code Snippet Example__

01

// AObjectClass is a IPCB\_ObjectClass interface type

02

If AObjectClass\.SuperClass Then

03

Begin

04

    // is a super class\!

05

    Case AObjectClass\.MemberKind Of

06

            eClassMemberKind\_Net       : ARpt\.Add\('All Nets'\);

07

            eClassMemberKind\_Component : ARpt\.Add\('All Components'\);

08

            eClassMemberKind\_FromTo    : ARpt\.Add\('All FromTos'\);

09

            eClassMemberKind\_Pad       : ARpt\.Add\('All Pads'\);

10

            eClassMemberKind\_Layer     : ARpt\.Add\('All Layers'\);

11

    End;

12

End;

__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind type

<a id="IPCB_Pad_Interface"></a>__IPCB\_Pad Interface__

__Overview__  
Pad objects are hole connectors for components and for connection to signal tracks\.  Pads can be either multilayered or single layered\.  Pad shapes include circular, rectangular, rounded rectangular or octagonal with X, Y sizes definable from 1 to 10000mils\. 

Hole size can range from 0 \(SMD\) to 1000mils\. 

Pads can be identified with a designator up to four characters long\.  On a multilayer pad, the Top layer, Mid layer and Bottom layer pad shape and size can be independently assigned to define a pad stack\.  Note that the surface mount components and edge connectors have single layer pads on the Top and/or Bottom layers\.

Altium Designer supports a Full Stack Pad mode for ultimate control over the padstack\. This allows different sizes and shapes on all signal layers\. Also pads and vias can be selectively tented on the top or bottom side\. Altium Designer also supports three types of pad definitions: Simple, Top\-Mid\-Bottom and Full Stack\.

__Notes__  
The Corner radius attribute of rounded pads is represented by the IPCB\_Pad2 interface\.  
A Paste Mask expansion property for a pad object is currently relevant just for pads on top and bottom copper layers\.  
Vias do not have a paste mask layer\. Paste mask layers are used to design stencils which will selectively place solder paste on a blank PCB\. Solder paste is only placed on pads where component leads are to be soldered to them\. Vias normally don't have anything soldered onto them\.

__The IPCB\_Pad interface hierarchy;__  
IPCB\_Primitive  
IPCB\_Pad  
IPCB\_Pad2

__IPCB\_Pad methods__  
GetState\_XLocation  
GetState\_YLocation  
SetState\_XLocation  
SetState\_YLocation  
GetState\_PinDescriptorString  
GetState\_IsConnectedToPlane  
SetState\_IsConnectedToPlane  
GetState\_Mode  
SetState\_Mode  
GetState\_XSizeOnLayer  
GetState\_YSizeOnLayer  
GetState\_ShapeOnLayer  
GetState\_XStackSizeOnLayer  
GetState\_YStackSizeOnLayer  
GetState\_StackShapeOnLayer  
GetState\_TopXSize  
GetState\_TopYSize  
GetState\_TopShape  
GetState\_BotXSize  
GetState\_BotYSize  
GetState\_BotShape  
GetState\_MidXSize  
GetState\_MidYSize  
GetState\_MidShape  
GetState\_SwapID\_Pad  
GetState\_SwapID\_Gate  
GetState\_SwappedPadName  
GetState\_GateID  
GetState\_OwnerPart\_ID  
SetState\_BotShape  
SetState\_BotXSize  
SetState\_BotYSize  
SetState\_MidShape  
SetState\_MidXSize  
SetState\_MidYSize  
SetState\_TopShape  
SetState\_TopXSize  
SetState\_TopYSize  
SetState\_XStackSizeOnLayer  
SetState\_YStackSizeOnLayer  
SetState\_StackShapeOnLayer  
SetState\_SwapID\_Pad  
SetState\_SwapID\_Gate  
SetState\_SwappedPadName  
SetState\_OwnerPart\_ID  
GetState\_HoleSize  
SetState\_HoleSize  
GetState\_Rotation  
SetState\_Rotation  
GetState\_Name  
SetState\_Name  
GetState\_WidthOnLayer  
GetState\_Cache  
SetState\_Cache  
GetState\_Plated  
GetState\_DrillType  
GetState\_HoleType  
GetState\_HoleWidth  
GetState\_XPadOffsetOnLayer  
GetState\_YPadOffsetOnLayer  
GetState\_HoleRotation  
SetState\_DrillType  
SetState\_HoleType  
SetState\_HoleWidth  
SetState\_XPadOffsetOnLayer  
SetState\_YPadOffsetOnLayer  
SetState\_HoleRotation  
BoundingRectangleOnLayer  
RotateAroundXY  
IsPadStack  
IsSurfaceMount  
PlaneConnectionStyleForLayer  
InvalidateSizeShape  
ValidateSizeShape  
ReValidateSizeShape  
UpdateCache  
InvalidateCache

__IPCB\_Pad properties__  
X  
Y  
PinDescriptor  
IsConnectedToPlane  
Mode  
XSizeOnLayer  
YSizeOnLayer  
ShapeOnLayer  
XStackSizeOnLayer  
YStackSizeOnLayer  
StackShapeOnLayer  
TopXSize  
TopYSize  
MidXSize  
MidYSize  
BotXSize  
BotYSize  
TopShape  
MidShape  
BotShape  
HoleSize  
Rotation  
Name  
Width  
SwapID\_Pad  
SwapID\_Gate  
SwappedPadName  
Cache  
WidthOnLayer  
OwnerPart\_ID  
Plated  
DrillType  
HoleType  
HoleWidth  
XPadOffset  
YPadOffset  
HoleRotation

__Example__  
This example creates a new pad object and its associated new pad cache and places it on the current PCB document\.

01

Procedure PlaceAPCBPad;

02

Var

03

    Board         : IPCB\_Board;

04

    WorkSpace     : IWorkSpace;

05

  

06

    Pad           : IPCB\_Pad;

07

    Padcache      : TPadCache;

08

    TopLayerWidth : TCoord;

09

Begin

10

    //Create a new PCB document

11

    WorkSpace := GetWorkSpace;

12

    If WorkSpace = Nil Then Exit;

13

    Workspace\.DM\_CreateNewDocument\('PCB'\);

14

  

15

    If PCBServer = Nil Then Exit;

16

    Board := PCBServer\.GetCurrentPCBBoard;

17

    If Board = Nil then exit;

18

  

19

    // Create a Pad object

20

    Pad := PCBServer\.PCBObjectFactory\(ePadObject, eNoDimension, eCreate\_Default\);

21

    Pad\.SetState\_XLocation  := MilsToCoord\(3000\);

22

    Pad\.SetState\_YLocation  := MilsToCoord\(3000\);

23

  

24

    // Setup a pad cache which has common values

25

    Padcache := Pad\.GetState\_Cache;

26

    Padcache\.ReliefAirGap := MilsToCoord\(11\);

27

    Padcache\.PowerPlaneReliefExpansion := MilsToCoord\(11\);

28

    Padcache\.PowerPlaneClearance       := MilsToCoord\(11\);

29

    Padcache\.ReliefConductorWidth      := MilsToCoord\(11\);

30

    Padcache\.SolderMaskExpansion       := MilsToCoord\(11\);

31

    Padcache\.SolderMaskExpansionValid  := eCacheManual;

32

    Padcache\.PasteMaskExpansion        := MilsToCoord\(11\);

33

    Padcache\.PasteMaskExpansionValid   := eCacheManual;

34

  

35

    // Assign a new pad cache to the pad

36

    Pad\.SetState\_Cache := Padcache;

37

    TopLayerWidth      := Pad\.GetState\_WidthOnLayer\(eBottomLayer\);

38

    Board\.AddPCBObject\(Pad\);

39

  

40

    // Refresh PCB document

41

    ResetParameters;

42

    AddStringParameter\('Action', 'All'\);

43

    RunProcess\('PCB:Zoom'\);

44

End;

__See also__  
IPCB\_Primitive interface  
IPCB\_Via interface  
TPadName value  
TPadCache value  
TPadSwapName value  
TShape enumerated values  
TAngle value  
PCB Design Objects  
Script examples in \\Examples\\Scripts\\DelphiScript\\PCB\\ folder

__GetState and SetState Methods__

__ GetState\_DrillType method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function  GetState\_DrillType : TExtendedDrillType;  
__Description__  
This function obtains the drill type used for this pad’s hole on the PCB\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ GetState\_HoleType method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function  GetState\_HoleType : TExtendedHoleType;  
__Description__  
This function obtains the hole type of the pad’s hole\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ GetState\_HoleWidth method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function  GetState\_HoleWidth : TCoord;  
__Description__  
This function obtains the hole width in TCoord units\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ GetState\_XPadOffsetOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function  GetState\_XPadOffsetOnLayer  \(L : TLayer\) : TCoord;  
__Description__  
This function is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ GetState\_YPadOffsetOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_YPadOffsetOnLayer  \(L : TLayer\) : TCoord;  
__Description__  
This function is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_DrillType method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_DrillType \(DrillType : TExtendedDrillType\);  
__Description__  
This procedure sets the drill type used to drill a hole on the PCB\. This attribute is used by the manufacturing output file such as the CAM files\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TExtendedDrillType type\.

__SetState\_HoleType method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_HoleType \(HoleType  : TExtendedHoleType\);  
__Description__  
This procedure sets the hole type of the pad’s hole\. There are three hole types – Round Hole, Square Hole and Slotted Hole\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TExtendedHoleType type\.

__SetState\_HoleWidth method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_HoleWidth \(HoleWidth : TCoord\);  
__Description__  
This function sets the hole width of a pad’s hole on the PCB\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_XPadOffsetOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_XPadOffsetOnLayer\(L       : TLayer;  
                                     XOffset : TCoord\);  
__Description__  
This function is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_YPadOffsetOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_YPadOffsetOnLayer\(L       : TLayer;  
                                     YOffset : TCoord\);  
__Description__  
This function is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_HoleRotation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_HoleRotation \(HRotation : TAngle\);  
__Description__  
This function sets the rotation property of a pad’s hole\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TAngle type

__SetState\_YStackSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_YStackSizeOnLayer \(L : TLayer;Value : TCoord\);  
__Description__  
This YStackSizeOnLayer procedure determines the size of the pad in Y direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\.  
This method is used for the YStackSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_YLocation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_YLocation \(AY : TCoord\);  
__Description__  
The SetState\_XLocation and SetState\_YLocation methods set the location of the pad with respect to the PCB document it is on\.  
These methods are used for the X and Y properties\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_XStackSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_XStackSizeOnLayer \(L : TLayer;Value : TCoord\);  
__Description__  
This XStackSizeOnLayer procedure determines the size of the pad in X direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\.  
This method is used for the XStackSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_XLocation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_XLocation \(AX : TCoord\);  
__Description__  
The SetState\_XLocation and SetState\_YLocation methods set the location of the pad with respect to the PCB document it is on\.  
These methods are used for the X and Y properties\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_TopYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_TopYSize \(Value : TCoord\);  
__Description__  
This procedure determines the top size in U direction of the pad with a top\-middle\-bottom stack up\. This method is used for the TopYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_TopXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_TopXSize \(Value : TCoord\);  
__Description__  
This procedure determines the top size in X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the TopXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_TopShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_TopShape \(Value : TShape\);  
__Description__  
This procedure determines the top shape of the pad with a top\-middle\-bottom stack up\. This method is used for the TopShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__SetState\_SwappedPadName method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_SwappedPadName \(Value : TPCBString\);  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SetState\_SwapID\_Pad method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_SwapID\_Pad \(Value : TPCBString\);  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SetState\_SwapID\_Gate method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_SwapID\_Gate \(Value : TPCBString\);  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SetState\_StackShapeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_StackShapeOnLayer \(L : TLayer;Value : TShape\);  
__Description__  
This procedure determines what shape the pad stack is on that layer\. This method is used by the StackShapeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_Rotation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_Rotation \(Value : TAngle\);  
__Description__  
This method sets the rotation of the pad object in degrees \(of TAngle type 0 \-360 degrees\)\. This method is used for the Rotation property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_Name method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_Name \(Value : TPCBString\);  
__Description__  
This method sets the name which is the designator of this pad object\. This method is used for the Name property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SetState\_Mode method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_Mode \(Mode : TPadMode\);  
__Description__  
The __Mode__ property determines what type of pad it is \- a simple pad, a pad with three Top, Middle and Bottom layer stack up or a pad with a complex stack up\.  
If Mode is Simple \(ePadMode\_Simple\) then you only deal with X,Y locations and the TopXSize, TopYSize and TopShape properties\.  
If Mode is Top\-Mid\-Bottom stack \(ePadMode\_LocalStack\) then you deal with X,Y Locations, Top\.\., Mid\.\. and Bot\.\. properties\.  
If Mode is Full Stack \(ePadMode\_ExternalStack\) then you deal with XStackSizeOnLayer, YStackSizeOnLayer and StackShapeOnLayer properties\.  
The method is used by the Mode property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_MidYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_MidYSize \(Value : TCoord\);  
__Description__  
This procedure determines the middle size in Y direction of the pad with a top\-middle\-bottom stack up\. This method is used for the MidYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_MidXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_MidXSize \(Value : TCoord\);  
__Description__  
This procedure determines the middle size in X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the MidXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_MidShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_MidShape \(Value : TShape\);  
__Description__  
This procedure determines the middle shape of the pad with a top\-middle\-bottom stack up\. This method is used for the MidShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__SetState\_IsConnectedToPlane method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_IsConnectedToPlane \(Layer : TLayer;Value : Boolean\);  
__Description__  
This method sets a boolean value to connect the pad to the specified plane \(one of the power internal planes\) or not\.  
This method is used by the IsConnectedToPlane property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_HoleSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_HoleSize \(Value : TCoord\);  
__Description__  
This method sets  the hole size of a pad object where component pins or wires can be passed through and soldered in place\.  
This method is used by the HoleSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_GateID method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_GateID \(Value : Integer\);  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_Cache method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_Cache \(Value : TPadCache\);  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_BotYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_BotYSize \(Value : TCoord\);  
__Description__  
This procedure determines the bottom size in the Y direction of the pad with a top\-middle\-bottom stack up\. This method is used for the BotYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_BotXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_BotXSize \(Value : TCoord\);  
__Description__  
This procedure determines the bottom size in the X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the BotXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_BotShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_BotShape \(Value : TShape\);  
__Description__  
This procedure determines the bottom shape of the pad with a top\-middle\-bottom stack up\. This method is used for the BotShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_YStackSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_YStackSizeOnLayer \(L : TLayer\) : TCoord;  
__Description__  
This YStackSizeOnLayer function determines the size of the pad in Y direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\.  
This method is used for the YStackSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_YSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_YSizeOnLayer \(L : TLayer\) : TCoord;  
__Description__  
This function determines what size in Y direction the pad is on this specified layer\. This method is used for the YSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_YLocation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_YLocation : TCoord;  
__Description__  
The GetState\_XLocation and GetState\_YLocation methods retrieves  the location of the pad with respect to the PCB document it is on\.  
These methods are used for the X and Y properties\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_XStackSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_XStackSizeOnLayer \(L : TLayer\) : TCoord;  
__Description__  
This XStackSizeOnLayer function determines the size of the pad in X direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\.  
This method is used for the XStackSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_XSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_XSizeOnLayer \(L : TLayer\) : TCoord;  
__Description__  
This function determines what size in X direction the pad is on this specified layer\. This method is used for the XSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_XLocation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_XLocation : TCoord;  
__Description__  
The GetState\_XLocation and GetState\_YLocation methods retrieves  the location of the pad with respect to the PCB document it is on\.  
These methods are used for the X and Y properties\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_WidthOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_WidthOnLayer \(L : TLayer\) : TCoord;  
__Description__  
This WidthOnLayer function retrieves the width of the pad on the specified layer\. This property is used by the WidthOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_TopYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_TopYSize : TCoord;  
__Description__  
This function determines the top size in Y direction of the pad with a top\-middle\-bottom stack up\. This method is used for the TopYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_TopXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_TopXSize : TCoord;  
__Description__  
This function determines the top size in X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the TopXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_TopShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_TopShape : TShape;  
__Description__  
This function determines the top shape of the pad with a top\-middle\-bottom stack up\. This method is used for the TopShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_SwappedPadName method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_SwappedPadName : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__GetState\_SwapID\_Pad method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_SwapID\_Pad : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__GetState\_SwapID\_Gate method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_SwapID\_Gate : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__GetState\_StackShapeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_StackShapeOnLayer \(L : TLayer\) : TShape;  
__Description__  
This function determines what shape the pad stack is on that layer\. This method is used by the StackShapeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_ShapeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_ShapeOnLayer \(L : TLayer\) : TShape;  
__Description__  
This property determines what shape the pad stack is on that layer\. This method is used by the ShapeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_Rotation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_Rotation : TAngle;  
__Description__  
This method retrieves the rotation of the pad object in degrees \(of TAngle type 0 \-360 degrees\)\.  
This method is used for the Rotation property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_PinDescriptorString method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_PinDescriptorString : TPCBString;  
__Description__  
This function obtains the description of the pin which represents the pad of a component\. This method is used by the PinDescriptorString property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__GetState\_Name method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_Name : TPCBString;  
__Description__  
This method retrieves the name which is the designator of this pad object\.  
This method is used for the Name property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__GetState\_Mode method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_Mode : TPadMode;  
__Description__  
The __Mode__ function determines what type of pad it is \- a simple pad, a pad with three Top, Middle and Bottom layer stack up or a pad with a complex stack up\.  
If Mode is Simple \(ePadMode\_Simple\) then you only deal with X,Y locations and the TopXSize, TopYSize and TopShape properties\.  
If Mode is Top\-Mid\-Bottom stack \(ePadMode\_LocalStack\) then you deal with X,Y Locations, Top\.\., Mid\.\. and Bot\.\. properties\.  
If Mode is Full Stack \(ePadMode\_ExternalStack\) then you deal with XStackSizeOnLayer, YStackSizeOnLayer and StackShapeOnLayer properties\.  
The method is used by the Mode property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_MidYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_MidYSize : TCoord;  
__Description__  
This function determines the middle size in Y direction of the pad with a top\-middle\-bottom stack up\. This method is used by the MidYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_MidXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_MidXSize : TCoord;  
__Description__  
This function determines the middle size in X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the MidXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_MidShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_MidShape : TShape;  
__Description__  
This function determines the middle shape of the pad with a top\-middle\-bottom stack up\. This method is used for the MidShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_IsConnectedToPlane method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_IsConnectedToPlane \(Layer : TLayer\) : Boolean;  
__Description__  
This method retrieves a boolean value  whether the pad is connected to the specified plane \(one of the power internal planes\) or not\.  
This method is used by the IsConnectedToPlane property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_HoleSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_HoleSize : TCoord;  
__Description__  
This method retrieves  the hole size of a pad object where component pins or wires can be passed through and soldered in place\.  
This method is used by the HoleSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_GateID method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_GateID : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_Cache method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_Cache : TPadCache;  
__Description__  
This method retrieves the global cache that stores various design rule settings for pad and via objects\.  
This method is used for the Cache property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_BotYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_BotYSize : TCoord;  
__Description__  
This function determines the bottom size in Y direction of the pad with a top\-middle\-bottom stack up\. This method is used for the BotYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_BotXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_BotXSize : TCoord;  
__Description__  
This function determines the bottom size in X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the BotXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_BotShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_BotShape : TShape;  
__Description__  
This function determines the bottom shape of the pad with a top\-middle\-bottom stack up\. This method is used for the BotShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_Plated method__

\(IPCB\_PCB interface\)  
__Syntax__  
Function  GetState\_Plated : Boolean;  
__Description__  
This method determines whether the pad is plated or not\. This method is used for the Plated property\.  
__Example__  
   
__See also__  
IPCB\_Pad interface

__SetState\_Plated method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_Plated \(Value  : Boolean\);  
__Description__  
This method determines whether the pad is plated or not\. This method is used for the Plated property\.  
__Example__  
   
__See also__  
IPCB\_Pad interface

__Methods__

__BoundingRectangleOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function BoundingRectangleOnLayer \(ALayer : TLayer\) : TCoordRect;  
__Description__  
This function retrieves the bounding rectangle \(of TCoordRect type\) of the component on the specified layer of the PCB document\.  
__Example__  
__See also__  
IPCB\_Pad interface

__IsPadStack method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function IsPadStack : Boolean;  
__Description__  
This function determines whether the pad is a full stack up pad or not\. Use this function before you change the properties of a pad stack\. You can also use the Mode property to check what type of stack up the pad is\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPadMode property

__IsSurfaceMount method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function IsSurfaceMount : Boolean;  
__Description__  
The pad is a surface mount if the holesize is 0 in size and is on top and/or bottom layers only\.  
__Example__  
__See also__  
IPCB\_Pad interface

__PlaneConnectionStyleForLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function PlaneConnectionStyleForLayer\(ALayer : TLayer\) : TPlaneConnectionStyle;  
__Description__  
Pads automatically connect to an internal power plane layer that is assigned the same net name\. The pad will connect to the plane depending on the applicable Power Plane Connect Style design rule\. If you do not want pads to connect to power planes, add another Power Plane Connect Style design rule targeting the specific pads required and with a connection style of No Connect\.  
The Connect Style defines the style of the connection from a pin of a component, targeted by the scope \(Full Query\) of the rule, to a power plane\.

The following three styles as per the TPlaneConnectionStyle type are available:

- __ePlaneNoConnect__ \- do not connect a component pin to the power plane\.
- __ePlaneReliefConnect__ \- connect using solid copper to the pin\.
- __ePlaneDirectConnect__ \(default\) \- connect using a thermal relief connection\.

__Example__  
__See also__  
IPCB\_Pad interface  
TPlaneConnectionStyle type

__RotateAroundXY method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX, AY : TCoord;Angle : TAngle\);  
__Description__  
This method rotates a pad object on the PCB document about the AX, AY coordinates with an angle in degrees\.  
To ensure the pad rotates without moving about, pass in its midpoint \(between X1,X2 and Y1, Y2\) attributes for the AX,AY parameters or use the Rotation property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__Invalidate method__

\(IPCB\_PCB interface\)  
__Syntax__  
Procedure InvalidateSizeShape;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Pad interface

__ValidateSizeShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure ValidateSizeShape;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Pad interface

__RevalidateSizeShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure ReValidateSizeShape;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Pad interface

__Properties__

__BotShape property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property BotShape : TShape Read GetState\_BotShape Write SetState\_BotShape;  
__Description__  
This property determines the bottom shape of the pad with a top\-middle\-bottom stack up\. This property is supported by the GetState\_BotShape and SetState\_BotShape methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type  
TShape type

__BotXSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property BotXSize : TCoord Read GetState\_BotXSize Write SetState\_BotXSize;  
__Description__  
This property determines the bottom X Size of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_BotXSize and SetState\_BotXSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__BotYSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property BotYSize : TCoord Read GetState\_BotYSize Write SetState\_BotYSize;  
__Description__  
This property determines the bottom Y Size of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_BotYSize and SetState\_BotYSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__Cache property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Cache : TPadCache Read GetState\_Cache Write SetState\_Cache;  
__Description__  
This Cache property represents  the global cache that stores various design rule settings for pad and via objects\. This property is supported by the GetState\_Cache and SetState\_Cache methods\.  
__Example__

01

    \(\* Create a Pad object\*\)

02

    Pad := PCBServer\.PCBObjectFactory\(ePadObject, eNoDimension, eCreate\_Default\);

03

    Pad\.X  := MilsToCoord\(3000\);

04

    Pad\.Y  := MilsToCoord\(3000\);

05

  

06

    \(\* Setup a pad cache \*\)

07

    Padcache := Pad\.Cache;

08

    Padcache\.ReliefAirGap := MilsToCoord\(11\);

09

    Padcache\.PowerPlaneReliefExpansion := MilsToCoord\(11\);

10

    Padcache\.PowerPlaneClearance       := MilsToCoord\(11\);

11

    Padcache\.ReliefConductorWidth      := MilsToCoord\(11\);

12

    Padcache\.SolderMaskExpansion       := MilsToCoord\(11\);

13

    Padcache\.SolderMaskExpansionValid  := eCacheManual;

14

    Padcache\.PasteMaskExpansion        := MilsToCoord\(11\);

15

    Padcache\.PasteMaskExpansionValid   := eCacheManual;

16

  

17

    \(\* Assign the new pad cache to the pad\*\)

18

    Pad\.Cache := Padcache;

19

    Board\.AddPCBObject\(Pad\);

__See also__  
IPCB\_Pad interface  
TPadCache type  
PadViaCacheProperties script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder\.  
DrawObjects script from  \\Examples\\Scripts\\DelphiScript Scripts\\PCB\\ folder\.

__GateID property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property GateID : Integer Read GetState\_GateID Write SetState\_GateID;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__HoleSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property HoleSize : TCoord Read GetState\_HoleSize Write SetState\_HoleSize;  
__Description__  
This property represents the hole size of a pad object where component pins or wires can be passed through and soldered in place\.  
This property is supported by the GetState\_HoleSize and SetState\_HoleSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__Name property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Name Write SetState\_Name;  
__Description__  
This Name property represents the designator of a pad object\.  
This method is supported by the GetState\_Name and SetState\_Name methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__Rotation property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Rotation : TAngle Read GetState\_Rotation Write SetState\_Rotation;  
__Description__  
This Rotation property deals with the rotation of the pad object in degrees \(of TAngle type 0 \-360 degrees\)\.  
This property is supported by GetState\_Rotation and SetState\_Rotation methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TAngle type

__SwapID\_Gate property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property SwapID\_Gate : TPCBString Read GetState\_SwapID\_Gate Write SetState\_SwapID\_Gate;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SwapID\_Pad property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property SwapID\_Pad : TPCBString Read GetState\_SwapID\_Pad Write SetState\_SwapID\_Pad;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SwappedPadName property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property SwappedPadName : TPCBString Read GetState\_SwappedPadName Write SetState\_SwappedPadName;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__Width property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Width \[L : TLayer\] : TCoord Read GetState\_WidthOnLayer;  
__Description__  
This read only property is supported by the GetState\_WidthOnLayer method and is equivalent to the WidthOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__WidthOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property WidthOnLayer\[L : TLayer\] : TCoord Read GetState\_WidthOnLayer;  
__Description__  
This property retrieves the width of the pad on the specified layer\. This read only property is supported by the GetState\_WidthOnLayer method and is equivalent to the Width property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__IsConnectedToPlane property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property IsConnectedToPlane\[L : TLayer\] : Boolean Read GetState\_IsConnectedToPlane Write SetState\_IsConnectedToPlane;  
__Description__  
This property determines whether the pad is connected to the specified plane \(one of the power internal planes\)\.  
This property is supported by GetState\_IsConnectedToPlane and SetState\_IsConnectedToPlane methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__MidShape property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property MidShape : TShape Read GetState\_MidShape Write SetState\_MidShape;  
__Description__  
This property determines the middle shape of the pad with a top\-middle\-bottom stack up\. This property is supported by the GetState\_MidShape and SetState\_MidShape methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__MidXSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property MidXSize : TCoord Read GetState\_MidXSize Write SetState\_MidXSize;  
__Description__  
This property determines the middle shape of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_MidXSize and SetState\_MidXSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__MidYSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property MidYSize : TCoord Read GetState\_MidYSize Write SetState\_MidYSize;  
__Description__  
This property determines the middle Y Size of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_MidYSize and SetState\_MidYSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__Mode property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Mode : TPadMode Read GetState\_Mode Write SetState\_Mode;  
__Description__  
The __Mode__ property determines what type of pad it is \- a simple pad, a pad with three Top, Middle and Bottom layer stack up or a pad with a complex stack up\.

- If Mode is Simple \(ePadMode\_Simple\) then you only deal with X,Y locations and the TopXSize, TopYSize and TopShape properties\.
- If Mode is Top\-Mid\-Bottom stack \(ePadMode\_LocalStack\) then you deal with X,Y Locations, Top\.\., Mid\.\. and Bot\.\. properties\.
- If Mode is Full Stack \(ePadMode\_ExternalStack\) then you deal with XStackSizeOnLayer, YStackSizeOnLayer and StackShapeOnLayer properties\.

This property is supported by GetState\_mode and SetState\_mode methods\.  
__Example__

01

PadObject := Board\.GetObjectAtCursor\(MkSet\(ePadObject\), 

02

                                     AllLayers, 

03

                                    'Choose a pad'\);

04

While PadObject <> 0 Do

05

Begin

06

    Ls := 'Pad Designator/Name: ' \+ PadObject\.Name \+ \#13\#10;

07

  

08

    // work out the pad stack style

09

    If PadObject\.Mode = ePadMode\_Simple Then

10

        ProcessSimplePad   \(PadObject,LS\)

11

    Else If PadObject\.Mode = ePadMode\_LocalStack    Then

12

        ProcessTopMidBotPad\(PadObject,LS\)

13

    Else If PadObject\.Mode = ePadMode\_ExternalStack Then

14

        ProcessFullStackPad\(PadObject,LS\);

15

  

16

    // Display the results

17

    ShowInfo\(LS\);

18

  

19

    // Continue the loop ie user can click on another pad\.

20

    PadObject := Board\.GetObjectAtCursor\(MkSet\(ePadObject\), AllLayers, 'Choose a pad'\);

21

End;

__See also__  
IPCB\_Pad interface  
TPadMode type  
IsPadStack method  
PadStackInfo script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder

__Plated method__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Plated : Boolean Read GetState\_Plated Write SetState\_Plated;  
__Description__  
This property denotes whether the pad is plated or not\.  
__Example__  
   
__See also__  
IPCB\_Pad interface

__PinDescriptor property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property PinDescriptor : TPCBString Read GetState\_PinDescriptorString;  
__Description__  
This property obtains the description of the pin which represents the pad of a component\. This read only property is supported by the GetState\_PinDescriptorString method\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__ShapeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property ShapeOnLayer\[L : TLayer\] : TShape Read GetState\_ShapeOnLayer;  
__Description__  
This property determines what shape the pad is on this specified layer\. This read only property is supported by the GetState\_ShapeOnlayer method\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__StackShapeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property StackShapeOnLayer\[L : TLayer\] : TShape Read GetState\_StackShapeOnLayer Write SetState\_StackShapeOnLayer;  
__Description__  
This property determines what shape the pad stack is on that layer\. This property is supported by GetState\_StackShapeOnLayer and SetState\_StackShapeOnLayer methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__TopShape property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property TopShape : TShape Read GetState\_TopShape Write SetState\_TopShape;  
__Description__  
This property determines the top layer shape  of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_TopShape and SetState\_TopShape methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__TopXSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property TopXSize : TCoord Read GetState\_TopXSize Write SetState\_TopXSize;  
__Description__  
This property determines the Top layer X Size of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_TopXSize and SetState\_TopXSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__TopYSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property TopYSize : TCoord Read GetState\_TopYSize Write SetState\_TopYSize;  
__Description__  
This property determines the Top layer Y Size of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_TopYSize and SetState\_TopYSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__X property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property X : TCoord Read GetState\_XLocation Write SetState\_XLocation;  
__Description__  
The Properties X and Y set the location of the pad with respect to the PCB document it is on\.  
These properties are supported by GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetState\_YLocation methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__XSizeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property XSizeOnLayer\[L : TLayer\] : TCoord Read GetState\_XSizeOnLayer;  
__Description__  
This property determines what size in X direction the pad is on this specified layer\. This read only property is supported by the GetState\_XSizeOnlayer method\.  
__Example__  
__See also__  
IPCB\_Pad interface

__XStackSizeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property XStackSizeOnLayer\[L : TLayer\] : TCoord Read GetState\_XStackSizeOnLayer Write SetState\_XStackSizeOnLayer;  
__Description__  
This XStackSizeOnLayer property determines the size of the pad in X direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\. This property is supported by the GetState\_XStackSizeOnLayer and SetState\_XStackSizeOnLayer methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPadMode type

__Y property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Y : TCoord Read GetState\_YLocation Write SetState\_YLocation;  
__Description__  
The Properties X and Y set the location of the pad with respect to the PCB document it is on\.  
These properties are supported by GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetState\_YLocation methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__YSizeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property YSizeOnLayer\[L : TLayer\] : TCoord Read GetState\_YSizeOnLayer;  
__Description__  
This property determines what size in Y direction the pad is on this specified layer\. This read only property is supported by the GetState\_YSizeOnlayer method\.  
__Example__  
__See also__  
IPCB\_Pad interface

__YStackSizeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property YStackSizeOnLayer\[L : TLayer\] : TCoord Read GetState\_YStackSizeOnLayer Write SetState\_YStackSizeOnLayer;  
__Description__  
This YStackSizeOnLayer property determines the size of the pad in Y direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\. This property is supported by the GetState\_YStackSizeOnLayer and SetState\_YStackSizeOnLayer methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ DrillType property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property DrillType : TExtendedDrillType Read GetState\_DrillType Write SetState\_DrillType;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__ HoleType property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property  HoleType : TExtendedHoleType  Read GetState\_HoleType Write SetState\_HoleType;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__ HoleWidth property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property  HoleWidth : TCoord Read GetState\_HoleWidth Write SetState\_HoleWidth;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__ XPadOffset property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property  XPadOffset\[L : TLayer\]          : TCoord             Read GetState\_XPadOffsetOnLayer   Write SetState\_XPadOffsetOnLayer;  
__Description__  
This property is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ YPadOffset property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property YPadOffset\[L : TLayer\] : TCoord Read GetState\_YPadOffsetOnLayer Write SetState\_YPadOffsetOnLayer;  
__Description__  
This property is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ HoleRotation property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property  HoleRotation : TAngle Read GetState\_HoleRotation Write SetState\_HoleRotation;  
__Description__  
This property defines the rotation attribute of the hole within a pad object\. This applies to square and slotted holes\. This property is supported by the GetState\_HoleRotation and SetState\_HoleRotation methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TAngle type

<a id="IPCB_Pad2_Interface"></a>__IPCB\_Pad2 Interface__

__Overview__  
Pad objects are hole connectors for components and for connection to signal tracks\. The IPCB\_Pad2 interface represents the extra attributes such as the Corner radius attribute of rounded rectangular pads\.

__The IPCB\_Pad2 interface hierarchy;__  
IPCB\_Primitive  
IPCB\_Pad  
IPCB\_Pad2

__IPCB\_Pad2 methods__  
GetState\_CornerRadiusOnLayer  
GetState\_CRPercentageOnLayer  
GetState\_StackCRPctOnLayer  
SetState\_StackCRPctOnLayer

__IPCB\_Pad2 properties__  
CornerRadius  
CRPercentage  
StackCRPctOnLayer

__Methods__

__ GetState\_CornerRadiusOnLayer method__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Function  GetState\_CornerRadiusOnLayer\(L : TLayer\) : TCoord;  
__Description__  
This function returns the corner radius of a rectangular pad on the specified layer in TCoord units\. This function is used by the CornerRadiusOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__ GetState\_CRPercentageOnLayer method__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Function  GetState\_CRPercentageOnLayer\(L : TLayer\) : Byte;  
__Description__  
This function returns the percentage of the corner radius of a rectangular pad on the specified layer as a byte value \(0\-100\)\.  
The corner radius percentage of the rounded corners of a pad on the bottom layer and the radius percentage is per layer and is a percentage of half of the shortest side of a pad object\. The value of 0% corresponds to a rectangular pad and 100% to a normal rounded pad shape\. This value only applies when the Shape field is set to Rounded Rectangle\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__ GetState\_StackCRPctOnLayer method__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Function GetState\_StackCRPctOnLayer \(L : TLayer\) : Byte;  
__Description__  
This function returns the percentage of the corner radius of a stack up pad on the specified layer as a byte value \(0\-100\)\.  
The corner radius percentage of the rounded corners of a pad on the bottom layer and the radius percentage is per layer and is a percentage of half of the shortest side of a pad object\. The value of 0% corresponds to a rectangular pad and 100% to a normal rounded pad shape\. This value only applies when the Shape field is set to Rounded Rectangle\.  
This function is used by the StackCRPctOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__ SetState\_StackCRPctOnLayer method__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Procedure SetState\_StackCRPctOnLayer \(L : TLayer; Value  : Byte\);  
__Description__  
This function sets the percentage of the corner radius of a rectangular pad on the specified layer as a byte value \(0\-100\)\.  
The corner radius percentage of the rounded corners of a pad on the bottom layer and the radius percentage is per layer and is a percentage of half of the shortest side of a pad object\. The value of 0% corresponds to a rectangular pad and 100% to a normal rounded pad shape\. This value only applies when the Shape field is set to Rounded Rectangle\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__Properties__

__CornerRadius property__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Property  CornerRadius     \[L : TLayer\]   : TCoord       Read GetState\_CornerRadiusOnLayer;  
__Description__  
This property returns the corner radius of a rectangular pad on the specified layer in TCoord units\. This property is implemented by the GetState\_CornerRadiusOnLayer function\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__CRPercentage property__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Property  CRPercentage     \[L : TLayer\] : Byte Read GetState\_CRPercentageOnLayer;  
__Description__  
This function returns the percentage of the corner radius of a rectangular pad on the specified layer as a byte value \(0\-100\)\.  
The corner radius percentage of the rounded corners of a pad on the bottom layer and the radius percentage is per layer and is a percentage of half of the shortest side of a pad object\. The value of 0% corresponds to a rectangular pad and 100% to a normal rounded pad shape\. This value only applies when the Shape field is set to Rounded Rectangle\.  
The Property uses GetState\_CRPercentageOnLayer function\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__StackCRPctOnLayer property__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Property  StackCRPctOnLayer\[L : TLayer\]   : Byte         Read GetState\_StackCRPctOnLayer   Write SetState\_StackCRPctOnLayer;  
__Description__  
This property returns the percentage of the corner radius of a stack up pad on the specified layer as a byte value \(0\-100\)\.  
The corner radius percentage of the rounded corners of a pad on the bottom layer and the radius percentage is per layer and is a percentage of half of the shortest side of a pad object\. The value of 0% corresponds to a rectangular pad and 100% to a normal rounded pad shape\. This value only applies when the Shape field is set to Rounded Rectangle\.  
This property uses GetState\_StackCRPctOnLayer and SetState\_StackCRPctOnLayer methods\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

<a id="IPCB_Polygon_Interface"></a>__IPCB\_Polygon Interface__

__Overview__  
Polygons are similar to area fills, except that they can fill irregular shaped areas of a board and can connect to a specified net as they are poured\. By adjusting the grid and track size, a polygon plane can be either solid \(copper\) areas or a cross hatched lattice\. Polygons can be poured on any layer, however if a polygon is placed on a non signal layer, it will not be poured around existing objects\.

Polygons are group objects, therefore they have child objects such as tracks and arcs\. You can use the __IPCB\_GroupIterator__ interface with the __GroupIterator\_Create__ and __GroupIterator\_Destroy__ methods from the __IPCB\_Polygon__ to fetch child objects\.

__The IPCB\_Polygon interface hierarchy;__  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Polygon

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

The __IPCB\_Polygon__ interface hierarchy is as follows:

__IPCB\_Polygon methods__  
GetState\_AreaSize  
GetState\_PolygonType  
GetState\_RemoveDead  
GetState\_UseOctagons  
GetState\_AvoidObsticles  
GetState\_PourOver  
GetState\_Grid  
GetState\_TrackSize  
GetState\_MinTrack  
GetState\_PointCount  
GetState\_Segments  
GetState\_PolyHatchStyle  
GetState\_BorderWidth  
GetState\_ExpandOutline  
GetState\_RemoveIslandsByArea  
GetState\_IslandAreaThreshold  
GetState\_RemoveNarrowNecks  
GetState\_NeckWidthThreshold  
GetState\_ClipAcuteCorners  
GetState\_MitreCorners  
GetState\_DrawRemovedNecks  
GetState\_DrawRemovedIslands  
GetState\_DrawDeadCopper  
GetState\_ArcApproximation  
SetState\_AreaSize  
SetState\_PolygonType  
SetState\_RemoveDead  
SetState\_UseOctagons  
SetState\_AvoidObsticles  
SetState\_PourOver  
SetState\_Grid  
SetState\_TrackSize  
SetState\_MinTrack  
SetState\_PointCount  
SetState\_Segments  
SetState\_PolyHatchStyle  
SetState\_BorderWidth  
SetState\_ExpandOutline  
SetState\_RemoveIslandsByArea  
SetState\_IslandAreaThreshold  
SetState\_RemoveNarrowNecks  
SetState\_NeckWidthThreshold  
SetState\_ClipAcuteCorners  
SetState\_MitreCorners  
SetState\_DrawRemovedNecks  
SetState\_DrawRemovedIslands  
SetState\_DrawDeadCopper  
SetState\_ArcApproximation  
GetState\_HitPrimitive  
PrimitiveInsidePoly  
Rebuild  
SetState\_XSizeYSize  
SetState\_CopperPourInvalid  
SetState\_CopperPourValid  
GetState\_CopperPourInvalid  
GetState\_InRepour  
CopperPourValidate  
AcceptsLayer  
PointInPolygon  
xBoundingRectangle  
GetState\_StrictHitTest  
GrowPolyshape  
RotateAroundXY

__IPCB\_Polygon properties__  
AreaSize  
PolygonType  
RemoveDead  
UseOctagons  
AvoidObsticles  
PourOver  
Grid  
TrackSize  
MinTrack  
PointCount  
Segments \[I  
PolyHatchStyle  
BorderWidth  
ExpandOutline  
RemoveIslandsByArea  
IslandAreaThreshold  
RemoveNarrowNecks  
NeckWidthThreshold  
ClipAcuteCorners  
MitreCorners  
DrawRemovedNecks  
DrawRemovedIslands  
DrawDeadCopper  
ArcApproximation

__Notes__  
Polygons can be on internal planes\. For example if there are multi layer pads on a PCB document, then all the internal planes are connected to these multi\-layer pads as split planes and are called split plane polygons\. Check the __PolygonType__ property\.  
The grid property denotes the grid which the tracks within a polygon are placed\. Ideally this grid is a fraction of the component pin pitch, to allow the most effective placement of the polygon tracks\.

The segments property denotes the array of segments used to construct a polygon\. Each segment consists of a record consisting of one group of points in X, Y coordinates as a line \(__ePolySegmentline__ type\) or an arc, a radius and two angles \( __ePolySegmentArc__ type\)\. Each segment record has a __Kind__ field which denotes the type of segment it is\.

A segment of a polygon either as an arc or a track is encapsulated as a __TPolySegment__ record as shown below;  
  TPolySegment = Record  
      Kind      : TPolySegmentType;  
   
      \{Vertex\}  
      vx,vy      : TCoord;  
   
      \{Arc\}  
      cx,cy      : TCoord;  
      Radius     : TCoord;  
      Angle1     : TAngle;  
      Angle2     : TAngle;  
  End;

__Example__

01

Procedure IteratePolygons;

02

Var

03

    Board      : IPCB\_Board;

04

    Polygon    : IPCB\_Polygon;

05

    Iterator   : IPCB\_BoardIterator;

06

    PolygonRpt : TStringList;

07

    FileName   : TPCBString;

08

    Document   : IServerDocument;

09

    PolyNo     : Integer;

10

    I          : Integer;

11

Begin

12

    // Retrieve the current board

13

    Board := PCBServer\.GetCurrentPCBBoard;

14

    If Board = Nil Then Exit;

15

  

16

    // Search for Polygons and for each polygon found

17

    // get its attributes and put them in a TStringList object

18

    // to be saved as a text file\.

19

    Iterator        := Board\.BoardIterator\_Create;

20

    Iterator\.AddFilter\_ObjectSet\(MkSet\(ePolyObject\)\);

21

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

22

    Iterator\.AddFilter\_Method\(eProcessAll\);

23

  

24

    PolyNo     := 0;

25

    PolygonRpt := TStringList\.Create;

26

  

27

    Polygon := Iterator\.FirstPCBObject;

28

    While \(Polygon <> Nil\) Do

29

    Begin

30

        Inc\(PolyNo\);

31

        PolygonRpt\.Add\('Polygon No : '           \+ IntToStr\(PolyNo\)\);

32

        //Check if Net exists before getting the Name property\.

33

        If Polygon\.Net <> Nil Then

34

            PolygonRpt\.Add\(' Polygon Net : '     \+ Polygon\.Net\.Name\);

35

  

36

        If Polygon\.PolygonType = eSignalLayerPolygon Then

37

            PolygonRpt\.Add\(' Polygon type : '        \+ 'Polygon on Signal Layer'\)

38

        Else

39

            PolygonRpt\.Add\(' Polygon type : '        \+ 'Split plane polygon'\)

40

  

41

        PolygonRpt\.Add\(' Polygon BorderWidth : ' \+ FloatToStr\(Polygon\.BorderWidth\)\);

42

        PolygonRpt\.Add\('  Area size : '          \+ FloatToStr\(Polygon\.AreaSize\)\);

43

  

44

        // Segments of a polygon

45

        For I := 0 To Polygon\.PointCount \- 1 Do

46

        Begin

47

            If Polygon\.Segments\[I\]\.Kind = ePolySegmentLine Then

48

            Begin

49

                PolygonRpt\.Add\(' Polygon Segment Line at X: ' \+ IntToStr\(Polygon\.Segments\[I\]\.vx\)\);

50

                PolygonRpt\.Add\(' Polygon Segment Line at Y: ' \+ IntToStr\(Polygon\.Segments\[I\]\.vy\)\);

51

            End

52

            Else

53

            Begin

54

                PolygonRpt\.Add\(' Polygon Segment Arc 1  : ' \+ FloatToStr\(Polygon\.Segments\[I\]\.Angle1\)\);

55

                PolygonRpt\.Add\(' Polygon Segment Arc 2  : ' \+ FloatToStr\(Polygon\.Segments\[I\]\.Angle2\)\);

56

                PolygonRpt\.Add\(' Polygon Segment Radius : ' \+ FloatToStr\(Polygon\.Segments\[I\]\.Radius\)\);

57

            End;

58

        End;

59

        PolygonRpt\.Add\(''\);

60

        Polygon := Iterator\.NextPCBObject;

61

    End;

62

    Board\.BoardIterator\_Destroy\(Iterator\);

63

  

64

    // The TStringList contains Polygon data and is saved as

65

    // a text file\.

66

    FileName := ChangeFileExt\(Board\.FileName,'\.pol'\);

67

    PolygonRpt\.SaveToFile\(Filename\);

68

    PolygonRpt\.Free;

69

  

70

    // Display the Polygons report

71

    Document  := Client\.OpenDocument\('Text', FileName\);

72

    If Document <> Nil Then

73

        Client\.ShowDocument\(Document\);

74

End;

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_GroupIterator interface  
TPolygonType enumerated values  
TPolySegment enumerated values  
TPolyHatchStyle enumerated values  
IteratePolygons example from the \\Examples\\Scripts\\DelphiScript\\PCB\\ folder\.  
OutlinePerimeter example from the \\Examples\\Scripts\\DelphiScript\\PCB\\ folder\.

__Methods__

__AcceptsLayer method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function AcceptsLayer \(Layer : TLayer\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__CopperPourValidate method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure CopperPourValidate;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_CopperPourInvalid method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_CopperPourInvalid : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_StrictHitTest method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_StrictHitTest \(HitX,HitY : TCoord\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GrowPolyshape method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure GrowPolyshape \(ADist : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__PointInPolygon method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function PointInPolygon \(HitX,HitY : TCoord\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__PrimitiveInsidePoly method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function PrimitiveInsidePoly \(APrimitive : IPCB\_Primitive\) : Boolean;  
__Description__  
This function determines whether a primitive is indeed part of a polygon or not\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__Rebuild method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure Rebuild;  
__Description__  
This procedure forces a rebuild of the polygon especially after it has been poured\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_CopperPourInvalid method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_CopperPourInvalid;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_CopperPourValid method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_CopperPourValid;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_XSizeYSize method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function SetState\_XSizeYSize : Boolean;  
__Description__  
This method sets the X and Y size of the polygon\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__xBoundingRectangle method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function xBoundingRectangle : TCoordRect;  
__Description__  
This function obtains the bounding rectangle of the polygon in TCoordRect\.  
__Example__  
__See also__  
IPCB\_Polygon interface  
TCoordRect

__ RotateAroundXY method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure RotateAroundXY\(AX,  
                         AY         : TCoord;  
                         Angle      : TAngle\);     
__Description__  
This function rotates the polygon about its reference point by an angle\.  
__Example__  
__See also__  
IPCB\_Polygon interface  
TCoord type  
TAngle type

__GetState and SetState Methods__

__GetState\_ArcApproximation method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_ArcApproximation : TCoord ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_AreaSize method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_AreaSize : Extended;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_AvoidObsticles method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_AvoidObsticles : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_BorderWidth method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_BorderWidth : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_ClipAcuteCorners method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_ClipAcuteCorners : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_DrawDeadCopper method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_DrawDeadCopper : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_DrawRemovedIslands method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_DrawRemovedIslands : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_DrawRemovedNecks method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_DrawRemovedNecks : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_ExpandOutline method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_ExpandOutline : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_Grid method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_Grid : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_HitPrimitive method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_HitPrimitive \(APrimitive : IPCB\_Primitive\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_InRepour method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_InRepour : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_IslandAreaThreshold method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_IslandAreaThreshold : Extended ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_MinTrack method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_MinTrack : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_MitreCorners method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_MitreCorners : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_NeckWidthThreshold method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_NeckWidthThreshold : TCoord ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_PointCount method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_PointCount : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_PolygonType method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_PolygonType : TPolygonType;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_PolyHatchStyle method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_PolyHatchStyle : TPolyHatchStyle;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_PourOver method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_PourOver : TPolygonPourOver;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_RemoveDead method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_RemoveDead : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_RemoveIslandsByArea method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_RemoveIslandsByArea : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_RemoveNarrowNecks method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_RemoveNarrowNecks : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_Segments method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_Segments \(I : Integer\) : TPolySegment;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_TrackSize method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_TrackSize : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_UseOctagons method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_UseOctagons : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_ArcApproximation method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_ArcApproximation \(Value : TCoord \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_AreaSize method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_AreaSize \(Value : Extended\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_AvoidObsticles method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_AvoidObsticles \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_BorderWidth method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_BorderWidth \(Value : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_ClipAcuteCorners method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_ClipAcuteCorners \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_DrawDeadCopper method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_DrawDeadCopper \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_DrawRemovedIslands method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_DrawRemovedIslands \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_DrawRemovedNecks method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_DrawRemovedNecks \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_ExpandOutline method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_ExpandOutline \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_Grid method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_Grid \(Value : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_IslandAreaThreshold method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_IslandAreaThreshold \(Value : Extended \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_MinTrack method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_MinTrack \(Value : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_MitreCorners method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_MitreCorners \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_NeckWidthThreshold method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_NeckWidthThreshold \(Value : TCoord \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_PointCount method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_PointCount \(Value : Integer\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_PolygonType method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_PolygonType \(Value : TPolygonType\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_PolyHatchStyle method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_PolyHatchStyle \(Value : TPolyHatchStyle\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_PourOver method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_PourOver \(Value : TPolygonPourOver\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_RemoveDead method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_RemoveDead \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_RemoveIslandsByArea method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_RemoveIslandsByArea \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_RemoveNarrowNecks method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_RemoveNarrowNecks \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_Segments method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_Segments \(I : Integer;Value : TPolySegment\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_TrackSize method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_TrackSize \(Value : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_UseOctagons method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_UseOctagons \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__Properties__

__ArcApproximation property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property ArcApproximation : TCoord Read GetState\_ArcApproximation Write SetState\_ArcApproximation ;   
__Description__  
The polygon drawn around a pad or via is drawn by line segments\. The arc resolution value dictates how accurate the polygon is drawn around a pad for example\. The segments are drawn between a system defined outer circle and inner circle with a radial distance between these two circles being equal to the arc resolution\.  
The default value is 0\.5mil\. The lower the value the more smooth the arc is and the higher the value, the more coarse the arc is with longer line segments\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__AreaSize property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property AreaSize : Extended Read GetState\_AreaSize Write SetState\_AreaSize;  
__Description__  
The AreaSize property returns the size of the polygon in Extended type\. The GetState\_AreaSize and SetState\_AreaSize are methods for this property\.  
__Example__  
   
__See also__  
IPCB\_Polygon interface

__AvoidObsticles property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property  AvoidObsticles : Boolean  Read GetState\_AvoidObsticles Write SetState\_AvoidObsticles;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Polygon interface

__BorderWidth property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property BorderWidth : TCoord Read GetState\_BorderWidth Write SetState\_BorderWidth;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__ClipAcuteCorners property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property ClipAcuteCorners : Boolean Read GetState\_ClipAcuteCorners Write SetState\_ClipAcuteCorners ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__DrawDeadCopper property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property DrawDeadCopper : Boolean Read GetState\_DrawDeadCopper Write SetState\_DrawDeadCopper ;   
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__DrawRemovedIslands property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property DrawRemovedIslands : Boolean Read GetState\_DrawRemovedIslands Write SetState\_DrawRemovedIslands ;   
__Description__  
If this property is true, every time a polygon is created on a PCB document, islands are often created and those islands that are less than the quoted area threshold are not created, otherwise if false, islands are left drawn nonetheless\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__DrawRemovedNecks property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property DrawRemovedNecks : Boolean Read GetState\_DrawRemovedNecks Write SetState\_DrawRemovedNecks ;   
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__ExpandOutline property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property ExpandOutline : Boolean Read GetState\_ExpandOutline Write SetState\_ExpandOutline ;   
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__Grid property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property Grid : TCoord Read GetState\_Grid Write SetState\_Grid;  
__Description__  
The Grid property denotes the grid which the tracks within a polygon are placed\. Ideally this grid is a fraction of the component pin pitch, to allow the most effective placement of the polygon tracks\.  
This property is supported by GetState\_Grid and SetState\_Grid methods\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__IslandAreaThreshold property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property IslandAreaThreshold : Extended Read GetState\_IslandAreaThreshold Write SetState\_IslandAreaThreshold;   
__Description__  
Every time a polygon is created on a PCB document, islands are often created and those islands that are less than the quoted area threshold, these islands are not created\.  
This property represents a value in mils squared that defines the area of an island and the default value is 2500 mils sq\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__MinTrack property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property MinTrack : TCoord Read GetState\_MinTrack Write SetState\_MinTrack;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__MitreCorners property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property MitreCorners : Boolean Read GetState\_MitreCorners Write SetState\_MitreCorners ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__NeckWidthThreshold property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property NeckWidthThreshold : TCoord Read GetState\_NeckWidthThreshold Write SetState\_NeckWidthThreshold ;  
__Description__  
The minimum width threshold value for the regions of a polygon\. Narrow regions that violate this under width value will be removed by the system\. The default value is 5 mils\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__PointCount property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property PointCount : Integer Read GetState\_PointCount Write SetState\_PointCount;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__PolygonType property__

\(IPCB\_Board interface\)  
__Syntax__  
Property PolygonType : TPolygonType Read GetState\_PolygonType Write SetState\_PolygonType;  
__Description__  
The PolygonType property defines what type the polygon is, whether it is a polygon on a signal layer, or a split plane polygon\.  
__Example__  
   
__See also__  
IPCB\_Polygon interface  
TPolygonType type

__PolyHatchStyle property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property PolyHatchStyle : TPolyHatchStyle Read GetState\_PolyHatchStyle Write SetState\_PolyHatchStyle;  
__Description__  
The property denotes the style of polygon hatching\. If the hatching style \(__ePolySolid__\) is solid, then a region object is used instead\.  
ePolyHatch90, ePolyHatch45, ePolyVHatch, ePolyHHatch,  
__ePolyNoHatch__ type : the polygon is not filled at all\. Only the boundary tracks will be present\. You may wish to use this option if you want to place a polygon during the design phase, but do not want it to slow system performance\. The  polygon can be before re\-poured with the desired hatching before generating output\.  
__ePolySolid__ type:  the polygon is filled in solid\. You may wish to use this option if you want to place a solid polygon during the design phase\. There are further Solid Fill Options to define and control how a solid polygon is drawn on the PCB document\.  
__Example__  
__See also__  
IPCB\_Polygon interface  
TPolyHatchStyle type  
IPCB\_Region interface

__PourOver property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property PourOver : Boolean Read GetState\_PourOver Write SetState\_PourOver;  
__Description__  
The pourover property if true will indicate that any existing tracks and arcs within the polygon which are part of the net being connected to will be covered by the polygon\.  
If this property is false, the polygon will pour around existing tracks on the same net\.  
__Example__  
   
__See also__  
IPCB\_Polygon interface

__RemoveDead property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property RemoveDead : Boolean Read GetState\_RemoveDead Write SetState\_RemoveDead;  
__Description__  
If the RemoveDead property is enabled, any regions of "dead" copper within the polygon will be removed\. Dead copper is created when an area of the polygon can not be connected to the selected net\. You can view dead copper as unconnected "islands" of copper within the polygon created when existing tracks, pads and vias prevent the plane pouring as one continuous area\.  
If this property is disabled, any areas of dead copper will not be removed\.  
Note: The entire polygon is removed if it does not enclose any pads on the selected net, as it is all viewed as dead copper\.  
__Example__  
   
__See also__  
IPCB\_Polygon interface

__RemoveIslandsByArea property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property RemoveIslandsByArea : Boolean Read GetState\_RemoveIslandsByArea Write SetState\_RemoveIslandsByArea;   
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__RemoveNarrowNecks property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property RemoveNarrowNecks : Boolean Read GetState\_RemoveNarrowNecks Write SetState\_RemoveNarrowNecks ;   
__Description__  
If this property is true, thin sections \(composing of tracks and arcs for example\) are removed from this polygon on the PCB document that violate the minimum width threshold value\. If false, narrow necks are left alone\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__Segments \[I property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property Segments \[I : Integer\] : TPolySegment Read GetState\_Segments Write SetState\_Segments;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__TrackSize property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property TrackSize : TCoord Read GetState\_TrackSize Write SetState\_TrackSize;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__UseOctagons property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property UseOctagons : Boolean Read GetState\_UseOctagons Write SetState\_UseOctagons;  
__Description__  
The __UseOctagons__ property determines that octagons are to surround pads if true\. If false, pads are surrounded by arcs\. Octagons give smaller Gerber files and faster photoplotting\.  
This property is supported by GetState\_UseOctagons and SetState\_UseOctagons methods\.  
__Example__  
__See also__  
IPCB\_Polygon interface

<a id="IPCB_RectangularPrimitive_Interface"></a>__IPCB\_RectangularPrimitive Interface__

__Overview__  
The __IPCB\_RectangularPrimitive__ interface is the ancestor interface for __IPCB\_Fill__ and __IPCB\_Text__ interfaces and contains the rectangular coordinates as well as the rotation property\.

The __IPCB\_RectangularPrimitive__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_RectangularPrimitive

__IPCB\_RectangularPrimitive methods__  
GetState\_XLocation  
GetState\_YLocation  
GetState\_X1Location  
GetState\_Y1Location  
GetState\_X2Location  
GetState\_Y2Location  
GetState\_Rotation  
SetState\_XLocation  
SetState\_YLocation  
SetState\_X1Location  
SetState\_Y1Location  
SetState\_X2Location  
SetState\_Y2Location  
SetState\_Rotation  
RotateAroundXY  
IsRedundant  
SetState\_XSizeYSize

__IPCB\_RectangularPrimitive properties__  
XLocation  
YLocation  
X1Location  
Y1Location  
X2Location  
Y2Location  
Rotation

__See also__  
IPCB\_Primitive interface

__GetState and SetState Methods__

__SetState\_Rotation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_Rotation \(Rotation : TAngle\);  
__Description__  
This SetState\_Rotation method deals with the rotation of the rectangular primitive \(fill, text, embedded board for example\) object in degrees \(of TAngle type 0 \-360 degrees\)\.  
This method is used for the Rotation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_X1Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_X1Location \(AX1 : TCoord\);  
__Description__  
The SetState\_X1Location method sets the initial X1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the X1Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_X2Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_X2Location \(AX2 : TCoord\);  
__Description__  
The SetState\_X2Location method sets the final X2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the X2Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_XLocation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_XLocation \(AX : TCoord\);  
__Description__  
This method sets the reference X location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
This method is used for the XLocation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_XSizeYSize method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function SetState\_XSizeYSize : Boolean;  
__Description__  
This method sets the XSize and YSize of the rectangular primitive\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_Y1Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_Y1Location \(AY1 : TCoord\);  
__Description__  
The SetState\_Y1Location method sets the initial Y1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the Y1Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_Y2Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_Y2Location \(AY2 : TCoord\);  
__Description__  
The SetState\_Y2Location method sets the initial Y2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the Y2Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_YLocation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_YLocation \(AY : TCoord\);  
__Description__  
This method sets the reference Y location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
This method is used for the YLocation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_Rotation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_Rotation : TAngle;  
__Description__  
This GetState\_Rotation method deals with the rotation of the rectangular primitive \(fill, text, embedded board for example\) object in degrees \(of TAngle type 0 \-360 degrees\)\.  
This method is used for the Rotation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_X1Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_X1Location : TCoord;  
__Description__  
The GetState\_X1Location method retrieves the initial X1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the X1Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_X2Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_X2Location : TCoord;  
__Description__  
The GetState\_X1Location method retrieves the final X2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the X2Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_XLocation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_XLocation : TCoord;  
__Description__  
This method obtains the reference X location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
This method is used for the XLocation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_Y1Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_Y1Location : TCoord;  
__Description__  
The GetState\_Y1Location method retrieves the initial Y1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the Y1Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_Y2Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_Y2Location : TCoord;  
__Description__  
The GetState\_Y2Location method retrieves the final Y2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the Y2Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_YLocation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_YLocation : TCoord;  
__Description__  
This method obtains the reference Y location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
This method is used for the YLocation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__Methods__

__IsRedundant method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function IsRedundant : Boolean;  
__Description__  
This method determines whether the object is redundant \(unused object\) on the PCB document or not\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__RotateAroundXY method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX,AY : TCoord;Angle : TAngle\);  
__Description__  
This method rotates a rectangular primitive object such as a fill or a text object on the PCB document about the AX, AY coordinates with an angle in degrees\.  
To ensure the rectangular primitive rotates without moving about, pass in its midpoint \(between X1,X2 and Y1, Y2\) attributes for the AX,AY parameters or use the Rotation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__Rotation property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property Rotation : TAngle Read GetState\_Rotation Write SetState\_Rotation;  
__Description__  
This Rotation property deals with the rotation of the rectangular primitive \(fill, text, embedded board for example\) object in degrees \(of TAngle type 0 \-360 degrees\)\.  
This property is supported by GetState\_Rotation and SetState\_Rotation methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__Properties__

__X1Location property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property X1Location : TCoord Read GetState\_X1Location Write SetState\_X1Location;  
__Description__  
The X1Location property determines the initial X1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
The property is supported by the GetState\_X1Location and SetState\_X1Location methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__X2Location property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property X2Location : TCoord Read GetState\_X2Location Write SetState\_X2Location;  
__Description__  
The X2Location property determines the final X2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
The property is supported by the GetState\_X2Location and SetState\_X2Location methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__XLocation property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property XLocation : TCoord Read GetState\_XLocation Write SetState\_XLocation;  
__Description__  
The XLocation property determines the reference X location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
The property is supported by the GetState\_XLocation and SetState\_XLocation methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__Y1Location property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property Y1Location : TCoord Read GetState\_Y1Location Write SetState\_Y1Location;  
__Description__  
The Y1Location property determines the initial Y1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
The property is supported by the GetState\_Y1Location and SetState\_Y1Location methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__Y2Location property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property Y2Location : TCoord Read GetState\_Y2Location Write SetState\_Y2Location;  
__Description__  
The Y2Location property determines the final Y2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
The property is supported by the GetState\_Y2Location and SetState\_Y2Location methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__YLocation property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property YLocation : TCoord Read GetState\_YLocation Write SetState\_YLocation;  
__Description__  
The YLocation property determines the reference Y location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
The property is supported by the GetState\_YLocation and SetState\_YLocation methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

<a id="IPCB_Region_Interface"></a>__IPCB\_Region Interface__

__Overview__  
The IPCB\_Region interface represents a solid polygon pour as the region object\. This region object allows the creation of multi sided polygon regions on the PCB\. The region object can also be used to create polygonal shaped fills in PCB footprints\.  
__Notes__  
You can use __IPCB\_Primitive__ methods and properties that are relevant to the __IPCB\_Region__ interface\.

The __IPCB\_Region__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Region

__IPCB\_Region methods__  
GetState\_Kind  
SetState\_Kind  
GetState\_Name  
SetState\_Name  
GetState\_Area  
GetRegionData  
GetMainContour  
GetHoleCount  
GetHole  
SetOutlineContour  
SetRegionData

__IPCB\_Region properties__  
Kind  
Name  
RegionData  
MainContour  
HoleCount  
Holes  
Area

__See also__  
IPCB\_Fill Interface  
IPCB\_Polygon interface

__Methods__

__PCB method__

\(IPCB\_Region interface\)  
__Syntax__  
Procedure SetOutlineContour \(Contour : Pgpc\_vertex\_list\)  
__Description__  
__Example__  
   
__See also__  
IPCB\_Region interface

__GetState and SetState Methods__

__GetHole method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetHole \(I : Integer\) : Pgpc\_vertex\_list;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetHoleCount method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetHoleCount : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetMainContour method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetMainContour : Pgpc\_vertex\_list;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetRegionData method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetRegionData : Pgpc\_polygon;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetState\_Area method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetState\_Area : Int64;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetState\_Kind method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetState\_Kind : TRegionKind;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetState\_Name method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetState\_Name : TDynamicString;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__SetState\_Kind method__

\(IPCB\_Region interface\)  
__Syntax__  
Procedure SetState\_Kind \(Value : TRegionKind\);  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__SetState\_Name method__

\(IPCB\_Region interface\)  
__Syntax__  
Procedure SetState\_Name \(Value : TDynamicString\);  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__Properties__

__Area property__

\(IPCB\_Region interface\)  
__Syntax__  
Property Area : Int64 Read GetState\_Area;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__HoleCount property__

\(IPCB\_Region interface\)  
__Syntax__  
Property HoleCount : Integer Read GetHoleCount;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__Holes \[I property__

\(IPCB\_Region interface\)  
__Syntax__  
Property Holes \[I : Integer\] : Pgpc\_vertex\_list Read GetHole;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__Kind property__

\(IPCB\_Region interface\)  
__Syntax__  
Property Kind : TRegionKind Read GetState\_Kind Write SetState\_Kind;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface  
TRegionKind type

__MainContour property__

\(IPCB\_Region interface\)  
__Syntax__  
Property MainContour : Pgpc\_vertex\_list Read GetMainContour;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__Name property__

\(IPCB\_Region interface\)  
__Syntax__  
Property Name : TDynamicString Read GetState\_Name Write SetState\_Name;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__RegionData property__

\(IPCB\_Region interface\)  
__Syntax__  
Property RegionData : Pgpc\_polygon Read GetRegionData;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

<a id="IPCB_Text_Interface"></a>__IPCB\_Text Interface__

__Overview__  
Text strings can be placed on any layer with any height\. There are two classes of text strings: Free text strings and component text \(designators and comments\)\. Free text strings are standalone strings which could be used as descriptors or labels for any application on the workspace\. There are two component text objects\- designator attribute and comment attribute\. Each component must have a unique designator and thus designators are not globally editable\. The comment attribute is globally editable though\.

The PCB editor includes special strings which are interpreted when output \(printing, plotting or generating gerber files\) is generated\. For example, the string \.PRINT\_DATE will be replaced by the current date when output is generated\.

__Notes__  
The IPCB\_Text Interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_RectangularPrimitive  
IPCB\_Text

Text objects are not inherited from the IPCB\_group interface, therefore fetching child objects within a text object is not possible\.  
Text objects are rectangular primitives with rectangular coordinates properties and the rotation property\.  
Text objects can be converted into a series of strokes using the ConvertToStrokeArray method from the IPCB\_Text interface\.

__IPCB\_RectangularPrimitive methods__  
RotateAroundXY  
IsRedundant  
SetState\_XSizeYSize

__IPCB\_RectangularPrimitive properties__  
XLocation  
YLocation  
X1Location  
Y1Location  
X2Location  
Y2Location  
Rotation

__IPCB\_Text methods__  
GetState\_FontID  
GetState\_Text  
GetState\_Width  
GetState\_Mirror  
GetState\_UnderlyingString  
GetState\_ConvertedString      
GetState\_UseTTFonts  
GetState\_Bold  
GetState\_Italic  
GetState\_FontName  
GetState\_Inverted  
GetState\_InvertedTTTextBorder  
GetState\_CharSet  
SetState\_Size  
SetState\_FontID  
SetState\_Text  
SetState\_Width  
SetState\_Mirror  
SetState\_UnderlyingString  
SetState\_UseTTFonts           
SetState\_Bold                 
SetState\_Italic               
SetState\_FontName             
SetState\_Inverted             
SetState\_InvertedTTTextBorder  
SetState\_CharSet              
IsHidden  
IsDesignator  
IsComment  
InAutoDimension  
GetDesignatorDisplayString  
RotationHandle  
ConvertToStrokeArray  
GetTrueTypeTextOutline

__IPCB\_Text properties__  
Size  
FontID  
Text  
Width  
MirrorFlag  
UnderlyingString  
ConvertedString      
UseTTFonts  
Bold  
Italic  
FontName  
Inverted  
InvertedTTTextBorder  
TTTextOutline  
CharSet

__Example__

01

Var

02

    Board     : IPCB\_Board;

03

    WorkSpace : IWorkSpace;

04

    TextObj   : IPCB\_Text;

05

Begin

06

    //create a new pcb document

07

    WorkSpace := GetWorkSpace;

08

    If WorkSpace = Nil Then Exit;

09

    Workspace\.DM\_CreateNewDocument\('PCB'\);

10

  

11

    Board := PCBServer\.GetCurrentPCBBoard;

12

    If Board = Nil then exit;

13

  

14

    // Create a text object on a top overlay layer

15

    Board\.LayerIsDisplayed\[eTopOverLay\] := True;

16

    TextObj := PCBServer\.PCBObjectFactory\(eTextObject, eNoDimension, eCreate\_Default\);

17

    TextObj\.XLocation := MilsToCoord\(Board\.XOrigin \+ 4000\);

18

    TextObj\.YLocation := MilsToCoord\(Board\.YOrigin \+ 2000\);

19

    TextObj\.Layer     := eTopOverlay;

20

    TextObj\.Text      := 'Text Object';

21

    TextObj\.Size      := MilsToCoord\(90\);   // sets the height of the text\.

22

    Board\.AddPCBObject\(TextObj\);

23

End;

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_RectangularPrimitive interface

__GetState and SetState Methods__

__ConvertedString method__

\(IPCB\_ConvertedString interface\)  
__Syntax__  
Function  GetState\_ConvertedString : TPCBString;  
__Description__  
This method is used for the ConvertedString property\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__GetState\_FontID method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_FontID : TFontID;  
__Description__  
This method retrieves the FontID attribute which represents the font used for this Text Object on a PCB document\. This method is used for the FontID property\.  
__Example__  
__See also__  
IPCB\_Text interface  
TFontID type

__GetState\_Mirror method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_Mirror : Boolean;  
__Description__  
This method retrieves the Mirror attribute which represents the mirrored state of this Text Object on a PCB document\. This method is used for the Mirror property\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetState\_Size method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_Size : TCoord;  
__Description__  
This method retrieves the Size attribute which represents the height of the text used for this Text Object on a PCB document\. This method is used for the Size property\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetState\_Text method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_Text : TPCBString;  
__Description__  
This method retrieves the Text attribute which represents the text used for this Text Object on a PCB document\. This method is used for the Text property\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetState\_UnderlyingString method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_UnderlyingString : TPCBString;  
__Description__  
This method retrieves the Text attribute which represents the text used for this Text Object on a PCB document and is equivalent to the GetState\_Text method\. This method is used for the UnderlyingString property\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetState\_Width method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_Width : TCoord;  
__Description__  
This method retrieves the Width attribute which represents the width used for this Text Object on a PCB document\. This method is used for the Width property\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetState\_UseTTFonts method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_UseTTFonts : Boolean;  
__Description__  
This property toggles the True Type font for the PCB string text on a PCB document\. This property is supported by the GetState\_UseTTFonts and SetState\_UseTTFonts methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__GetState\_Bold method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_UseTTFonts : Boolean;  
__Description__  
The Bold property sets or gets the bold property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__GetState\_Italic method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_Italic : Boolean;  
__Description__  
The Italic property sets or gets the italic property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Italic and SetState\_Italic methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__GetState\_FontName method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_FontName : TPCBString;  
__Description__  
The FontName property sets or gets the FontName property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\. For example one of the True Type font strings could be 'Arial', 'Arial Narrow', 'Courier New' and 'Verdana'\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__GetState\_Inverted method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_Inverted : Boolean;  
__Description__  
This property sets or gets the Inverted property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Inverted and SetState\_Inverted methods\.  
The Inverted property inverts the text object and a text boundary is created around the text\. The Inverted and InvertedTTTextBorder properties are useful for situations if IPCB\_Text object is to be placed on a copper region and create a cutout in the region\. The color of the inverted border is the layer color and the text color itself is black\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__GetState\_InvertedTTTextBorder method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_InvertedTTTextBorder : TCoord;  
__Description__  
This property sets or gets the InvertedTTTextBorder property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_InvertedTTTextBorder and SetState\_InvertedTTTextBorder methods\.  
The Inverted property inverts the text object and a text boundary is created around the text\. The Inverted and InvertedTTTextBorder properties are useful for situations if IPCB\_Text object is to be placed on a copper region and create a cutout in the region\. The color of the inverted border is the layer color and the text color itself is black\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__GetTrueTypeTextOutline method__

\(IPCB\_Text interface\)  
__Syntax__  
Property  TTTextOutline : PGPC\_Polygon Read GetTrueTypeTextOutline;  
__Description__  
This property sets or gets the TTTextOutline property of the PCB string True Type text on a PCB document\. This property is supported by the GetTrueTypeTextOutline method\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__SetState\_FontID method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_FontID \(FontID : TFontID\);  
__Description__  
This method sets the FontID attribute which represents the font used for this Text Object on a PCB document\. This method is used for the FontID property\.  
__Example__  
__See also__  
IPCB\_Text interface  
TFontID type

__SetState\_Mirror method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Mirror \(Mirror : Boolean\);  
__Description__  
This method sets the Mirror attribute which represents the mirrored state of this Text Object on a PCB document\. This method is used for the Mirror property\.  
__Example__  
__See also__  
IPCB\_Text interface

__SetState\_Size method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Size \(Size : TCoord\);  
__Description__  
This method sets the Size attribute which represents the height of the text used for this Text Object on a PCB document\. This method is used for the Size property\.  
__Example__  
__See also__  
IPCB\_Text interface

__SetState\_Text method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Text \(Text : TPCBString\);  
__Description__  
This method sets the Text attribute which represents the text used for this Text Object on a PCB document\. This method is used for the Text property\.  
__Example__  
__See also__  
IPCB\_Text interface

__SetState\_UnderlyingString method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_UnderlyingString \(Value : TPCBString\);  
__Description__  
This method retrieves the Text attribute which represents the text used for this Text Object on a PCB document and is equivalent to the SetState\_Text method\. This method is used for the UnderlyingString property\.  
__Example__  
__See also__  
IPCB\_Text interface

__SetState\_Width method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Width \(Width : TCoord\);  
__Description__  
This method sets the Width attribute which represents the width used for this Text Object on a PCB document\. This method is used for the Width property\.  
__Example__  
__See also__  
IPCB\_Text interface

__SetState\_UseTTFonts method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_UseTTFonts\(UseTTFonts : Boolean\);  
__Description__  
This property toggles the True Type font for the PCB string text on a PCB document\. This property is supported by the GetState\_UseTTFonts and SetState\_UseTTFonts methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__

__SetState\_Bold method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Bold\(Bold : Boolean\);  
__Description__  
The Bold property sets or gets the bold property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__SetState\_Italic method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Italic\(Italic : Boolean\);  
__Description__  
The Italic property sets or gets the italic property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Italic and SetState\_Italic methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__SetState\_FontName method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_FontName\(FontName   : TPCBString\);  
__Description__  
The FontName property sets or gets the FontName property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\. For example one of the True Type font strings could be 'Arial', 'Arial Narrow', 'Courier New' and 'Verdana'\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__SetState\_Inverted method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Inverted\(Inverted : Boolean\);  
__Description__  
This property sets or gets the Inverted property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Inverted and SetState\_Inverted methods\.  
The Inverted property inverts the text object and a text boundary is created around the text\. The Inverted and InvertedTTTextBorder properties are useful for situations if IPCB\_Text object is to be placed on a copper region and create a cutout in the region\. The color of the inverted border is the layer color and the text color itself is black\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
   
__See also__  
IPCB\_Text interface

__Methods__

__ConvertToStrokeArray method__

\(IPCB\_Text interface\)  
__Syntax__  
Function ConvertToStrokeArray\(Var Count : Integer; Var Strokes : TStrokeArray\) : Boolean;  
__Description__  
Text objects can be converted into a series of strokes using the __ConvertToStrokeArray__ method\. This is useful for rending text objects as standalone line objects to be used in external programs such as 3D modelling applications\.  
__Example__  
__See also__  
IPCB\_Text interface  
TStrokeArray type

__GetDesignatorDisplayString method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetDesignatorDisplayString : TPCBString;  
__Description__  
This function retrieves the designator string directly from a text object\.  
__Example__  
__See also__  
IPCB\_Text interface  
TPCBString type

__InAutoDimension method__

\(IPCB\_Text interface\)  
__Syntax__  
Function InAutoDimension : Boolean;  
__Description__  
This function tests whether this text object is used for the auto dimension object or not\.  
__Example__  
__See also__  
IPCB\_Text interface

__IsComment method__

\(IPCB\_Text interface\)  
__Syntax__  
Function IsComment : Boolean;  
__Description__  
This function tests whether this text object is a comment object associated with a component object for example\.  
__Example__  
__See also__  
IPCB\_Text interface

__IsDesignator method__

\(IPCB\_Text interface\)  
__Syntax__  
Function IsDesignator : Boolean;  
__Description__  
This function tests whether this text object is a designator for a object, for example whether a pad object has a designator\.  
__Example__  
__See also__  
IPCB\_Text interface

__IsHidden method__

\(IPCB\_Text interface\)  
__Syntax__  
Function IsHidden : Boolean;  
__Description__  
This function tests whether the text object is hidden or not\.  
__Example__  
__See also__  
IPCB\_Text interface

__RotationHandle method__

\(IPCB\_Text interface\)  
__Syntax__  
Function RotationHandle : TPoint;  
__Description__  
This function returns the rotation handle of the text object as a record of X and Y coordinates \(TPoint\)\.  
Note, the TPoint type is a Borland Delphi record consisting of X and Y coordinates\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetTrueTypeTextOutline method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetTrueTypeTextOutline : Pgpc\_polygon;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Text interface

__Properties__

__FontID property__

\(IPCB\_Text interface\)  
__Syntax__  
Property FontID : TFontID Read GetState\_FontID Write SetState\_FontID;  
__Description__  
The __FontID__ property denotes which Font the text object is using\. The property is supported by __GetState\_FontID__ and __SetState\_FontID__ methods\.  
The __TFontID__ type defines the font ID for a text object\. It is the index to an entry in the font table in the PCB editor\. Each font used in the PCB editor has its own FontID\.  
Thus when a new font is used \(through a Change Font dialog of a Change object dialog\), a new FontID is added to the table in the PCB editor\. The FontID value can be extracted from PCB text objects\.  
__Example__  
__See also__  
IPCB\_Text interface  
TFontID type

__MirrorFlag property__

\(IPCB\_Text interface\)  
__Syntax__  
Property MirrorFlag : Boolean Read GetState\_Mirror Write SetState\_Mirror;  
__Description__  
This method sets the Mirror attribute which represents the mirrored state of this Text Object on a PCB document\. This property supports GetState\_Mirror and SetState\_Mirror methods\.  
__Example__  
__See also__  
IPCB\_Text interface

__Size property__

\(IPCB\_Text interface\)  
__Syntax__  
Property Size : TCoord Read GetState\_Size Write SetState\_Size;  
__Description__  
The Size property sets the height of the text\. This property is supported by GetState\_Size and SetState\_Size methods\.  
__Example__  
__See also__  
IPCB\_Text interface  
TCoord type

__Text property__

\(IPCB\_Text interface\)  
__Syntax__  
Property Text : TPCBString Read GetState\_Text Write SetState\_Text;  
__Description__  
The Text property contains the text for the Text object\. This property is supported by the GetState\_Text and SetState\_Text methods\.  
Note, the PCB editor includes special strings which are interpreted when output \(printing, plotting or generating gerber files\) is generated\. For example, the string \.PRINT\_DATE will be replaced by the current date when output is generated\.  
__Example__

01

Procedure FindSpecialStrings;

02

Var

03

    Board         : IPCB\_Board;

04

    SpecialString : IPCB\_Text;

05

    Iterator      : IPCB\_BoardIterator;

06

Begin

07

    // Retrieve the current board

08

    Board := PCBServer\.GetCurrentPCBBoard;

09

    If Board = Nil Then Exit;

10

  

11

    // retrieve the iterator

12

    Iterator        := Board\.BoardIterator\_Create;

13

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eTextObject\)\);

14

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

15

    Iterator\.AddFilter\_Method\(eProcessAll\);

16

  

17

    // Search special strings

18

    SpecialString := Iterator\.FirstPCBObject;

19

    While \(SpecialString <> Nil\) Do

20

    Begin

21

        If SpecialString\.Text = '\.Layer\_Name' Then

22

            ShowMessage\(SpecialString\.ConvertedString\);

23

        SpecialString := Iterator\.NextPCBObject;

24

    End;

25

    Board\.BoardIterator\_Destroy\(Iterator\);

26

End;

__See also__  
IPCB\_Text interface  
TPCBString type

__UnderlyingString property__

\(IPCB\_Text interface\)  
__Syntax__  
Property UnderlyingString : TPCBString Read GetState\_UnderlyingString Write SetState\_UnderlyingString;  
__Description__  
This UnderlyingString property is equivalent to the Text property\. This property is supported by the GetState\_UnderlyingString and SetState\_UnderlyingString methods\.  
Note, the PCB editor includes special strings which are interpreted when output \(printing, plotting or generating gerber files\) is generated\. For example, the string \.PRINT\_DATE will be replaced by the current date when output is generated\.  
__Example__  
__See also__  
IPCB\_Text interface  
TPCBString type

__Width property__

\(IPCB\_Text interface\)  
__Syntax__  
Property Width : TCoord Read GetState\_Width Write SetState\_Width;  
__Description__  
This method sets the Width attribute which represents the width used for this Text Object on a PCB document\. This property is supported by the GetState\_Width and SetState\_Width methods\.  
__Example__  
__See also__  
IPCB\_Text interface

__ConvertedString method__

\(IPCB\_Text interface\)  
__Syntax__  
Property  ConvertedString : TPCBString Read GetState\_ConvertedString;  
__Description__  
This property is supported by the GetState\_ConvertedString method\. This property converts a special string into a text based string\. The PCB editor includes special strings which are interpreted when output \(printing, plotting or generating gerber files\) is generated\. For example, the string \.PRINT\_DATE will be replaced by the current date when the ConvertedString method is invoked\.  
The available special strings are;  
\.PRINT\_DATE  
\.PRINT\_TIME  
\.PRINT\_SCALE  
\.LAYER\_NAME  
\.PCB\_FILE\_NAME  
\.PCB\_FILE\_NAME\_NO\_PATH  
\.PLOT\_FILE\_NAME  
\.ARC\_COUNT  
\.COMPONENT\_COUNT  
\.FILL\_COUNT  
\.HOLE\_COUNT  
\.NET\_COUNT  
\.PAD\_COUNT  
\.STRING\_COUNT  
\.TRACK\_COUNT  
\.VIA\_COUNT  
\.DESIGNATOR  
\.COMMENT  
\.LEGEND  
\.NET\_NAMES\_ON\_LAYER  
__Example__

01

Procedure FindSpecialStrings;

02

Var

03

    Board         : IPCB\_Board;

04

    SpecialString : IPCB\_Text;

05

    Iterator      : IPCB\_BoardIterator;

06

Begin

07

    // Retrieve the current board

08

    Board := PCBServer\.GetCurrentPCBBoard;

09

    If Board = Nil Then Exit;

10

    // retrieve the iterator

11

    Iterator        := Board\.BoardIterator\_Create;

12

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eTextObject\)\);

13

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

14

    Iterator\.AddFilter\_Method\(eProcessAll\);

15

    // Search special strings

16

    SpecialString := Iterator\.FirstPCBObject;

17

    While \(SpecialString <> Nil\) Do

18

    Begin

19

        If SpecialString\.Text = '\.Layer\_Name' Then

20

            ShowMessage\(SpecialString\.ConvertedString\);

21

        SpecialString := Iterator\.NextPCBObject;

22

    End;

23

    Board\.BoardIterator\_Destroy\(Iterator\);

24

End;

__See also__  
IPCB\_Text interface  
IPCB\_SpecialStringConverter  
IPCB\_ServerInterface and its SpecialStringConverter property\.  
TPCBString type

__UseTTFonts property__

\(IPCB\_Text interface\)  
__Syntax__  
Property  UseTTFonts : Boolean Read GetState\_UseTTFonts Write SetState\_UseTTFonts;  
__Description__  
This property toggles the True Type font property for the PCB string text on a PCB document\. This property is supported by the GetState\_UseTTFonts and SetState\_UseTTFonts methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Delphiscript Script Example__

01

TextObj := PCBServer\.PCBObjectFactory\(eTextObject, eNoDimension, eCreate\_Default\);

02

// notify that the pcb object is going to be modified

03

PCBServer\.SendMessageToRobots\(TextObj\.I\_ObjectAddress, c\_Broadcast, PCBM\_BeginModify, c\_NoEventData\);

04

  

05

TextObj\.XLocation := Sheet\.SheetX \+ MilsToCoord\(1000\);

06

TextObj\.YLocation := Sheet\.SheetY \+ MilsToCoord\(1000\);

07

TextObj\.Layer     := eBottomOverlay;

08

  

09

// Can use Open True Type Fonts\.\.\.

10

TextObj\.UseTTFonts := True;

11

TextObj\.Italic := True;

12

TextObj\.Bold := False;

13

TextObj\.FontName := 'ARIAL';

14

TextObj\.Inverted := True;

15

TextObj\.InvertedTTTextBorder := MilsToCoord\(100\);

16

  

17

TextObj\.Text      := 'Text with True Type Property enabled\.';

18

TextObj\.Size       := MilsToCoord\(200\);    // sets the height of the text\.

19

  

20

Board\.AddPCBObject\(TextObj\);

21

// notify that the pcb object has been modified

22

PCBServer\.SendMessageToRobots\(TextObj\.I\_ObjectAddress, c\_Broadcast, PCBM\_EndModify , c\_NoEventData\);

23

PCBServer\.SendMessageToRobots\(Board\.I\_ObjectAddress, c\_Broadcast, PCBM\_BoardRegisteration,TextObj\.I\_ObjectAddress\);

__See also__  
IPCB\_Text interface

__Bold property__

\(IPCB\_Text interface\)  
__Syntax__  
Property  Bold : Boolean Read GetState\_Bold Write SetState\_Bold;  
__Description__  
This property sets or gets the bold property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Text interface

__Italic property__

\(IPCB\_Text interface\)  
__Syntax__  
Property Italic : Boolean Read GetState\_Italic Write SetState\_Italic;  
__Description__  
The Italic property sets or gets the italic property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Italic and SetState\_Italic methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Text interface

__FontName property__

\(IPCB\_Text interface\)  
__Syntax__  
Property FontName : TPCBString Read GetState\_FontName Write SetState\_FontName;  
__Description__  
This property sets or gets the FontName property of the PCB string True Type text on a PCB document\. For example one of the True Type font strings could be 'Arial', 'Arial Narrow', 'Courier New' and 'Verdana'\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Delphiscript Script Example__

01

TextObj := PCBServer\.PCBObjectFactory\(eTextObject, eNoDimension, eCreate\_Default\);

02

  

03

// notify that the pcb object is going to be modified

04

PCBServer\.SendMessageToRobots\(TextObj\.I\_ObjectAddress, c\_Broadcast, PCBM\_BeginModify, c\_NoEventData\);

05

TextObj\.XLocation := Sheet\.SheetX \+ MilsToCoord\(1000\);

06

TextObj\.YLocation := Sheet\.SheetY \+ MilsToCoord\(1000\);

07

TextObj\.Layer     := eBottomOverlay;

08

TextObj\.UseTTFonts := True;

09

TextObj\.Italic := True;

10

TextObj\.Bold := False;

11

TextObj\.FontName := 'ARIAL';

12

// inverts the text object and a text boundary is created around the text

13

// The Inverted and InvertedTTTextBorder properties are useful for situations

14

// if text is to be placed on a copper region and create a cutout in the region\.

15

// the color of the inverted border is the layer color and the text color itself

16

// is black\.

17

TextObj\.Inverted := True;

18

// The InvertedTTextBorder property determines the distance between the boundary of the

19

// the text object itself to the inverted text border boundary\.

20

TextObj\.InvertedTTTextBorder := MilsToCoord\(100\);

21

TextObj\.Text      := 'Text with True Type Property enabled\.';

22

TextObj\.Size       := MilsToCoord\(200\);    // sets the height of the text\.

__See also__  
IPCB\_Text interface

__Inverted property__

\(IPCB\_Text interface\)  
__Syntax__  
Property  Inverted : Boolean Read GetState\_Inverted Write SetState\_Inverted;  
__Description__  
This property sets or gets the Inverted property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Inverted and SetState\_Inverted methods\.  
The Inverted property inverts the text object and a text boundary is created around the text\. The Inverted and InvertedTTTextBorder properties are useful for situations if IPCB\_Text object is to be placed on a copper region and create a cutout in the region\. The color of the inverted border is the layer color and the text color itself is black\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Text interface  
InvertedTTTextBorder property

__InvertedTTTextBorder property__

\(IPCB\_Text interface\)  
__Syntax__  
Property InvertedTTTextBorder : TCoord Read GetState\_InvertedTTTextBorder Write SetState\_InvertedTTTextBorder;  
__Description__  
This property sets or gets the __InvertedTTTextBorder__ property of the PCB string True Type text on a PCB document\. This property is supported by the __GetState\_InvertedTTTextBorder__ and __SetState\_InvertedTTTextBorder__ methods\.  
The Inverted property inverts the text object and a text boundary is created around the text\. The __Inverted__ and __InvertedTTTextBorder__ properties are useful for situations if __IPCB\_Text__ object is to be placed on a copper region and create a cutout in the region\. The color of the inverted border is the layer color and the text color itself is black\.  
Once the __UseTTFonts__ property is enabled, you can use the __Bold__, __Italic__, __FontName__, __Inverted__, __InvertedTTTextBorder__ and __TTTextOutline__ properties\.  
__Example__  
__See also__  
IPCB\_Text interface  
Inverted property

__TTTextOutline property__

\(IPCB\_Text interface\)  
__Syntax__  
Property TTTextOutline : PGPC\_Polygon Read GetTrueTypeTextOutline;  
__Description__  
This property sets or gets the TTTextOutline property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_TTTextOutline and SetState\_TTTextOutline methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Text interface

<a id="IPCB_Track_Interface"></a>__IPCB\_Track Interface__

__Overview__  
BoardIterator\_Create The IPCB\_Track hierarchy;  
IPCB\_Primitive  
IPCB\_Track

__IPCB\_Track methods__  
GetState\_X1  
GetState\_Y1  
GetState\_X2  
GetState\_Y2  
GetState\_Width  
SetState\_X1  
SetState\_Y1  
SetState\_X2  
SetState\_Y2  
SetState\_Width

__IPCB\_Track properties__  
X1  
Y1  
X2  
Y2  
Width

__Example__

01

Var

02

    Board     : IPCB\_Board;

03

    WorkSpace : IWorkSpace;

04

    Track     : IPCB\_Track;

05

Begin

06

    //Create a new PCB document

07

    WorkSpace := GetWorkSpace;

08

    If WorkSpace = Nil Then Exit;

09

    Workspace\.DM\_CreateNewDocument\('PCB'\);

10

  

11

    // Check if the new PCB document exists\.

12

    Board := PCBServer\.GetCurrentPCBBoard;

13

    If Board = Nil then exit;

14

  

15

    // Create a Track object with 'Mils' dimensions

16

    Track             := PCBServer\.PCBObjectFactory\(eTrackObject, eNoDimension, eCreate\_Default\);

17

    Track\.X1          := MilsToCoord\(X1\);

18

    Track\.Y1          := MilsToCoord\(Y1\);

19

    Track\.X2          := MilsToCoord\(X2\);

20

    Track\.Y2          := MilsToCoord\(Y2\);

21

    Track\.Layer       := Layer;

22

    Track\.Width       := MilsToCoord\(Width\);

23

    // Add the new track into the PCB document

24

    Board\.AddPCBObject\(Track\);

25

  

26

    // Refresh the PCB document\.

27

    ResetParameters;

28

    AddStringParameter\('Action', 'All'\);

29

    RunProcess\('PCB:Zoom'\);

30

End;

__See also__  
IPCB\_Primitive interface  
PCB Design Objects

__GetState and SetState Methods__

__GetState\_Width method__

\(IPCB\_Track interface\)  
__Syntax__  
Function GetState\_Width : TCoord;  
__Description__  
This method retrieves the width attribute of the track object on a PCB document\. This function is used for the Width property\.  
__Example__  
__See also__  
IPCB\_Track interface

__GetState\_X1 method__

\(IPCB\_Track interface\)  
__Syntax__  
Function GetState\_X1 : TCoord;  
__Description__  
This method retrieves the X1 attribute of the track object on a PCB document\. This function is used for the X1 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__GetState\_X2 method__

\(IPCB\_Track interface\)  
__Syntax__  
Function GetState\_X2 : TCoord;  
__Description__  
This method retrieves the X2 attribute of the track object on a PCB document\. This function is used for the X2 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__GetState\_Y1 method__

\(IPCB\_Track interface\)  
__Syntax__  
Function GetState\_Y1 : TCoord;  
__Description__  
This method retrieves the Y1 attribute of the track object on a PCB document\. This function is used for the Y1 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__GetState\_Y2 method__

\(IPCB\_Track interface\)  
__Syntax__  
Function GetState\_Y2 : TCoord;  
__Description__  
This method retrieves the Y2 attribute of the track object on a PCB document\. This function is used for the Y2 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__SetState\_Width method__

\(IPCB\_Track interface\)  
__Syntax__  
Procedure SetState\_Width \(Value : TCoord\);  
__Description__  
This method sets the width attribute of the track object on a PCB document\. This function is used for the Width property\.  
__Example__  
__See also__  
IPCB\_Track interface

__SetState\_X1 method__

\(IPCB\_Track interface\)  
__Syntax__  
Procedure SetState\_X1 \(Value : TCoord\);  
__Description__  
This method sets the X1 attribute of the track object on a PCB document\. This function is used for the X1 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__SetState\_X2 method__

\(IPCB\_Track interface\)  
__Syntax__  
Procedure SetState\_X2 \(Value : TCoord\);  
__Description__  
This method sets the X2 attribute of the track object on a PCB document\. This function is used for the X2 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__SetState\_Y1 method__

\(IPCB\_Track interface\)  
__Syntax__  
Procedure SetState\_Y1 \(Value : TCoord\);  
__Description__  
This method sets the Y1 attribute of the track object on a PCB document\. This function is used for the Y1 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__SetState\_Y2 method__

\(IPCB\_Track interface\)  
__Syntax__  
Procedure SetState\_Y2 \(Value : TCoord\);  
__Description__  
This method sets the Y2 attribute of the track object on a PCB document\. This function is used for the Y2 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__Properties__

__Width property__

\(IPCB\_Track interface\)  
__Syntax__  
Property Width : TCoord Read GetState\_Width Write SetState\_Width;  
__Description__  
The property represents the width attribute of a track object on the PCB document\. This property is supported by the GetState\_Width and SetState\_Width methods\.  
__Example__  
__See also__  
IPCB\_Track interface

__X1 property__

\(IPCB\_Track interface\)  
__Syntax__  
Property X1 : TCoord Read GetState\_X1 Write SetState\_X1;  
__Description__  
The property represents the X1 or the initial X coordinate of a track object on the PCB document\. This property is supported by the GetState\_X1 and SetState\_X1 methods\.  
__Example__  
__See also__  
IPCB\_Track interface

__X2 property__

\(IPCB\_Track interface\)  
__Syntax__  
Property X2 : TCoord Read GetState\_X2 Write SetState\_X2;  
__Description__  
The property represents the X2 or the final X coordinate of a track object on the PCB document\. This property is supported by the GetState\_X2 and SetState\_X2 methods\.  
__Example__  
__See also__  
IPCB\_Track interface

__Y1 property__

\(IPCB\_Track interface\)  
__Syntax__  
Property Y1 : TCoord Read GetState\_Y1 Write SetState\_Y1;  
__Description__  
The property represents the Y1 or the initial Y coordinate of a track object on the PCB document\. This property is supported by the GetState\_Y1 and SetState\_Y1 methods\.  
__Example__  
__See also__  
IPCB\_Track interface

__Y2 property__

\(IPCB\_Track interface\)  
__Syntax__  
Property Y2 : TCoord Read GetState\_Y2 Write SetState\_Y2;  
__Description__  
The property represents the Y2 or the final Y coordinate of a track object on the PCB document\. This property is supported by the GetState\_Y2 and SetState\_Y2 methods\.  
__Example__  
__See also__  
IPCB\_Track interface

<a id="IPCB_TTFontsCache_Interface"></a>__IPCB\_TTFontsCache Interface__

__Overview__

__IPCB\_TTFontsCache methods__  
I\_ObjectAddress  
GetState\_FontsCount  
GetState\_EmbeddedFont  
GetState\_Font  
AddFont  
AddEmbeddedFont  
GetFont  
GetNextEmbeddedFont  
ExportFontsToList  
GetLocalizedFontName

__IPCB\_TTFontCache properties__  
FontsCount  
EmbeddedFontsCount  
Font

__Methods__

__Properties__

__FontCount property__

\(IPCB\_TTFontsCache interface\)  
__Syntax__  
Property FontsCount : Integer Read GetState\_FontsCount;  
__Description__  
__Example__  
__See also__  
IPCB\_TTFontsCache interface

__EmbeddedFontCount property__

\(IPCB\_TTFontsCache interface\)  
__Syntax__  
Property  EmbeddedFontsCount \[ABoard : Pointer\]    : Integer         Read GetState\_EmbeddedFontsCount;  
__Description__  
__Example__  
__See also__  
IPCB\_TTFontsCache interface

__Font property__

\(IPCB\_TTFontsCache interface\)  
__Syntax__  
Property  Font \[I      : Integer\]    : IPCB\_TTFontData Read GetState\_Font;  
__Description__  
__Example__  
__See also__  
IPCB\_TTFontsCache interface

<a id="IPCB_TTFontData_Interface"></a>__IPCB\_TTFontData Interface__

__Overview__

__IPCB\_TTFontData methods__  
I\_ObjectAddress  
GetEmbeddedFontData  
IsEmbedded  
IsEmbeddedInDocument  
FontExists  
IsSame  
GetState\_FontFullName  
GetState\_FontFaceName  
GetState\_FontStyleName  
GetState\_Bold  
GetState\_Italic  
GetState\_CanEmbed  
GetState\_EmbeddedFontHandle  
GetState\_Charset  
GetState\_RefCount  
AddRef  
vRelease

__IPCB\_TTFontData properties__  
FontFullName  
FontFaceName  
FontStyleName  
Bold  
Italic  
CanEmbed  
EmbeddedFontHandle  
Charset  
RefCount

__Methods__

__I\_ObjectAddress method__

\(IPCB\_TTFontData interface\)  
__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__GetEmbeddedFontData method__

\(IPCB\_TTFontData interface\)  
__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__IsEmbedded method__

\(IPCB\_TTFontData interface\)  
__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__IsEmbeddedInDocument method__

\(IPCB\_TTFontData interface\)  
__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__IsEmbedded method__

\(IPCB\_TTFontData interface\)  
__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__FontExists method__

\(IPCB\_TTFontData interface\)  
__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__IsSame method__

\(IPCB\_TTFontData interface\)  
__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__GetState and SetState Methods__

__GetState\_Width method__

\(IPCB\_TTFontData interface\)  
__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__Properties__

__FontFullName Property__

__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__FontFaceName property__

__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__FontStyleName property__

__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__Bold property__

__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__Italic property__

__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__CanEmbed property__

__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__EmbeddedFontHandle property__

__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__Charset property__

__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__RefCount__

__Syntax__  
   
__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

<a id="IPCB_Via_Interface"></a>__IPCB\_Via Interface__

__Overview__  
When tracks from two layers need to be connected, vias are placed to carry a signal from one layer to the other\.  Vias are like round pads, which are drilled and usually through\-plated when the board is fabricated\.  Vias can be multi\-layered, blind or buried\. 

A multi\-layer via passes through the board from the Top layer to the Bottom layer and allows connections to all other signal layers\. 

A blind via connects from the surface of the board to an internal layer, a buried via connects from one internal layer to another internal layer\. In Altium Designer, Vias, including blind and buried, can connect to internal planes\.  
Vias do not have a paste mask layer\.

The IPCB\_Via hierarchy;  
IPCB\_Primitive  
IPCB\_Via

__IPCB\_Via methods__  
GetState\_XLocation  
GetState\_YLocation  
GetState\_IsConnectedToPlane  
GetState\_LowLayer  
GetState\_HighLayer  
GetState\_StartLayer  
GetState\_StopLayer  
GetState\_HoleSize  
GetState\_Size  
GetState\_SizeOnLayer  
GetState\_ShapeOnLayer  
GetState\_Cache  
SetState\_XLocation  
SetState\_YLocation  
SetState\_LowLayer  
SetState\_HighLayer  
SetState\_IsConnectedToPlane  
SetState\_HoleSize  
SetState\_Size  
SetState\_Cache  
PlaneConnectionStyleForLayer  
RotateAroundXY  
IntersectLayer

__IPCB\_Via properties__  
X  
Y  
IsConnectedToPlane  
LowLayer  
HighLayer  
StartLayer  
StopLayer  
HoleSize  
Size  
SizeOnLayer  
ShapeOnLayer  
Cache

__Example__

01

Var

02

    Board     : IPCB\_Board;

03

    WorkSpace : IWorkSpace;

04

    Via       : IPCB\_Via;

05

    ViaCache  : TPadCache;

06

Begin

07

    // Create a new PCB document

08

    WorkSpace := GetWorkSpace;

09

    If WorkSpace = Nil Then Exit;

10

    Workspace\.DM\_CreateNewDocument\('PCB'\);

11

  

12

    // Check if the new PCB document exists or not\.

13

    Board := PCBServer\.GetCurrentPCBBoard;

14

    If Board = Nil then exit;

15

  

16

    // Create a Via object

17

    Via           := PCBServer\.PCBObjectFactory\(eViaObject, eNoDimension, eCreate\_Default\);

18

    Via\.X         := MilsToCoord\(2000\);

19

    Via\.Y         := MilsToCoord\(2000\);

20

    Via\.Size      := MilsToCoord\(50\);

21

    Via\.HoleSize  := MilsToCoord\(20\);

22

    Via\.LowLayer  := eTopLayer;

23

    Via\.HighLayer := eBottomLayer;

24

  

25

    // Setup a pad cache

26

    Viacache := Via\.GetState\_Cache;

27

    Viacache\.ReliefAirGap := MilsToCoord\(11\);

28

    Viacache\.PowerPlaneReliefExpansion := MilsToCoord\(11\);

29

    Viacache\.PowerPlaneClearance       := MilsToCoord\(11\);

30

    Viacache\.ReliefConductorWidth      := MilsToCoord\(11\);

31

    Viacache\.SolderMaskExpansion       := MilsToCoord\(11\);

32

    Viacache\.SolderMaskExpansionValid  := eCacheManual;

33

    Viacache\.PasteMaskExpansion        := MilsToCoord\(11\);

34

    Viacache\.PasteMaskExpansionValid   := eCacheManual;

35

  

36

    // Assign the new Via cache to the via 

37

    Via\.SetState\_Cache := Viacache;

38

    Board\.AddPCBObject\(Via\);

39

  

40

    // Refresh PCB document\.

41

    ResetParameters;

42

    AddStringParameter\('Action', 'All'\);

43

    RunProcess\('PCB:Zoom'\);

44

End;

__See also__  
IPCB\_Primitive interface  
IPCB\_Pad interface  
TLayer enumerated values  
TPlaneConnectionStyle enumerated values  
TCoord value  
TAngle value  
TPadCache values

__GetState and SetState Methods__

__GetState\_Cache method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_Cache : TPadCache;  
__Description__  
This Cache property represents  the global cache that stores various design rule settings for pad and via objects\. The method is used by the Cache property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_HighLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_HighLayer : TLayer;  
__Description__  
The HighLayer property denotes the bottom layer\. The method is used for the HighLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_HoleSize method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_HoleSize : TCoord;  
__Description__  
This HoleSize property denotes the hole size of the via object\. This method is used by the HoleSize property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_IsConnectedToPlane method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_IsConnectedToPlane \(Layer : TLayer\) : Boolean;  
__Description__  
This property determines whether the via is connected to this specified plane or not by returning a boolean value\. This method is used by the IsConnectedToPlane property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_LowLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_LowLayer : TLayer;  
__Description__  
The LowLayer property denotes the bottom layer\. The method is used for the LowLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_ShapeOnLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_ShapeOnLayer \(Layer : TLayer\) : TShape;  
__Description__  
The ShapeOnLayer property determines the shape of the via on the specified layer\. This read only property is supported by the GetState\_ShapeOnLayer method\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_Size method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_Size : TCoord;  
__Description__  
The Size property denotes the size of the via object \(the full diameter\)\. The method is used for the Size property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_SizeOnLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_SizeOnLayer \(Layer : TLayer\) : TCoord;  
__Description__  
This SizeOnLayer property denotes the size of the via on a specified layer\. This method is used for the SizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_StartLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_StartLayer : IPCB\_LayerObject;  
__Description__  
This StartLayer property fetches the Start layer of IPCB\_LayerObject type that the via is connected to\. This method is used for the StartLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_StopLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_StopLayer : IPCB\_LayerObject;  
__Description__  
This StartLayer property fetches the Stop layer of IPCB\_LayerObject type that the via is connected to\. This method is used for the StopLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_XLocation method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_XLocation : TCoord;  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. The GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetStateYLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_YLocation method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_YLocation : TCoord;  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. The GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetStateYLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_Cache method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_Cache \(Value : TPadCache\);  
__Description__  
This Cache property represents  the global cache that stores various design rule settings for pad and via objects\. The method is used by the Cache property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_HighLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_HighLayer \(L : TLayer\);  
__Description__  
The HighLayer property denotes the bottom layer\. The method is used for the HighLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_HoleSize method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_HoleSize \(Value : TCoord\);  
__Description__  
This HoleSize property denotes the hole size of the via object\. This method is used by the HoleSize property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_IsConnectedToPlane method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_IsConnectedToPlane \(Layer : TLayer;Value : Boolean\);  
__Description__  
This property determines whether the via is connected to this specified plane or not by returning a boolean value\. This method is used by the IsConnectedToPlane property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_LowLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_LowLayer \(L : TLayer\);  
__Description__  
The LowLayer property denotes the bottom layer\. The method is used for the LowLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_Size method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_Size \(Size : TCoord\);  
__Description__  
The Size property denotes the size of the via object\. The method is used for the Size property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_XLocation method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_XLocation \(AX : TCoord\);  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. The GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetStateYLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_YLocation method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_YLocation \(AY : TCoord\);  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. The GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetStateYLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__Methods__

__RotateAroundXY method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX, AY : TCoord;Angle : TAngle\);  
__Description__  
This method rotates a via object on the PCB document about the AX, AY coordinates with an angle in degrees\. To ensure the via rotates without moving about, pass in its midpoint \(between X1,X2 and Y1, Y2\) attributes for the AX,AY parameters\.  
__Example__  
__See also__  
IPCB\_Via interface

__PlaneConnectionStyleForLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function PlaneConnectionStyleForLayer\(ALayer : TLayer\) : TPlaneConnectionStyle;  
__Description__  
Vias automatically connect to an internal power plane layer that is assigned the same net name\. The via will connect to the plane depending on the applicable Power Plane Connect Style design rule\. If you do not want vias to connect to power planes, add another Power Plane Connect Style design rule targeting the specific vias required and with a connection style of No Connect\.

The Connect Style defines the style of the connection from a pin of a component, targeted by the scope \(Full Query\) of the rule, to a power plane\. The following three styles as per the TPlaneConnectionStyle type are available:

- No Connect \- do not connect a component pin to the power plane\.
- Direct Connect \- connect using solid copper to the pin\.
- Relief Connect \(default\) \- connect using a thermal relief connection\.

__Example__  
__See also__  
IPCB\_Via interface  
TPlaneConnectionStyle type

__IntersectLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function IntersectLayer \(ALayer : TLayer\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Via interface

__Properties__

__Cache property__

\(IPCB\_Via interface\)  
__Syntax__  
Property Cache : TPadCache Read GetState\_Cache Write SetState\_Cache;  
__Description__  
This Cache property represents  the global cache that stores various design rule settings for pad and via objects\.  
This property is supported by the GetState\_Cache and SetState\_Cache methods\.  
__Example__

01

Var

02

    PadCache : TPadCache;

03

    Via      : IPCB\_Via;

04

    Board    : IPCB\_Board;

05

Begin

06

    \(\* Create a Via object\*\)

07

    Via := PCBServer\.PCBObjectFactory\(eViaObject, eNoDimension, eCreate\_Default\);

08

    Via\.X  := MilsToCoord\(3000\);

09

    Via\.Y  := MilsToCoord\(3000\);

10

  

11

    \(\* Setup a pad cache \*\)

12

    Padcache := Via\.Cache;

13

    Padcache\.ReliefAirGap := MilsToCoord\(11\);

14

    Padcache\.PowerPlaneReliefExpansion := MilsToCoord\(11\);

15

    Padcache\.PowerPlaneClearance       := MilsToCoord\(11\);

16

    Padcache\.ReliefConductorWidth      := MilsToCoord\(11\);

17

    Padcache\.SolderMaskExpansion       := MilsToCoord\(11\);

18

    Padcache\.SolderMaskExpansionValid  := eCacheManual;

19

    Padcache\.PasteMaskExpansion        := MilsToCoord\(11\);

20

    Padcache\.PasteMaskExpansionValid   := eCacheManual;

21

  

22

    \(\* Assign the new pad cache to the via\*\)

23

    Via\.Cache := Padcache;

24

    Board\.AddPCBObject\(Via\);

25

End;

__See also__  
IPCB\_Via interface  
PadViaCacheProperties script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder\.  
DrawObjects script from  \\Examples\\Scripts\\DelphiScript Scripts\\PCB\\ folder\.  
CreateAVia script from  \\Examples\\Scripts\\DelphiScript Scripts\\PCB\\ folder\.

__HighLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property HighLayer : TLayer Read GetState\_HighLayer Write SetState\_HighLayer;  
__Description__  
The HighLayer property denotes the top layer\. This property is supported by the GetState\_HighLayer and SetState\_HighLayer methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__HoleSize property__

\(IPCB\_Via interface\)  
__Syntax__  
Property HoleSize : TCoord Read GetState\_HoleSize Write SetState\_HoleSize;  
__Description__  
This HoleSize property denotes the hole size of the via object\. This property is supported by the GetState\_HighLayer and SetState\_HighLayer methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__IsConnectedToPlane property__

\(IPCB\_Via interface\)  
__Syntax__  
Property IsConnectedToPlane\[L : TLayer\] : Boolean Read GetState\_IsConnectedToPlane Write SetState\_IsConnectedToPlane;  
__Description__  
This property determines whether the via is connected to this specified plane or not by returning a boolean value\.  
This property is supported by the GetState\_IsConnectedToPlane and SetState\_IsConnectedToPlane methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__LowLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property LowLayer : TLayer Read GetState\_LowLayer Write SetState\_LowLayer;  
__Description__  
The LowLayer property denotes the bottom layer\. This property is supported by the GetState\_LowLayer and SetState\_LowLayer methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__ShapeOnLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property ShapeOnLayer\[L : TLayer\] : TShape Read GetState\_ShapeOnLayer;  
__Description__  
The via can have different shapes on layers that the via is connected to\. This read only property is supported by the GetState\_ShapeOnLayer method\.  
__Example__  
__See also__  
IPCB\_Via interface  
TShape type  
TLayer type

__Size property__

\(IPCB\_Via interface\)  
__Syntax__  
Property Size : TCoord Read GetState\_Size Write SetState\_Size;  
__Description__  
The Size property denotes the size of the via object \(the full diamater of the via\)\. This property is supported by the GetState\_Size and SetState\_Size methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__SizeOnLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property SizeOnLayer \[L : TLayer\] : TCoord Read GetState\_SizeOnLayer;  
__Description__  
This property denotes the size of the via on a specified layer\. This read only property is supported by the GetState\_SizeOnLayer method\.  
__Example__  
__See also__  
IPCB\_Via interface

__StartLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property StartLayer : IPCB\_LayerObject Read GetState\_StartLayer;  
__Description__  
This property fetches the start layer of IPCB\_LayerObject type that the via is connected to\.  
This read only property is supported by the GetState\_StartLayer method\.  
__Example__  
__See also__  
IPCB\_Via interface  
IPCB\_LayerObject interface

__StopLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property StopLayer : IPCB\_LayerObject Read GetState\_StopLayer;  
__Description__  
This property fetches the last layer of IPCB\_LayerObject type that the via is connected to\.  
This read only property is supported by the GetState\_StopLayer method\.  
__Example__  
__See also__  
IPCB\_Via interface  
IPCB\_LayerObject interface

__X property__

\(IPCB\_Via interface\)  
__Syntax__  
Property X : TCoord Read GetState\_XLocation Write SetState\_XLocation;  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. This property is supported by the GetState\_XLocation and SetState\_XLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__Y property__

\(IPCB\_Via interface\)  
__Syntax__  
Property Y : TCoord Read GetState\_YLocation Write SetState\_YLocation;  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. This property is supported by the GetState\_YLocation and SetState\_YLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

<a id="IPCB_Violation_Interface"></a>__IPCB\_Violation Interface__

__Overview__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.

A violation object has a name and its associated description properties, two primitive place holders for binary rules or the first primitive \(Primitive1\) for unary rules\. Check if the second Primitive2 is valid before invoking its methods or properties\.

The IPCB\_Violation hierarchy;  
IPCB\_Primitive  
IPCB\_Violation

__IPCB\_Violation methods__  
GetState\_Name  
GetState\_Rule  
GetState\_Primitive1  
GetState\_Primitive2  
GetState\_Description  
GetState\_ShortDescriptorString  
IsRedundant

__IPCB\_Violation properties__  
Name  
Rule  
Primitive1  
Primitive2  
Description

__See also__  
IPCB\_Primitive interface  
PCB Design Objects  
Violations script in \\__Example__s\\Scripts\\DelphiScript\\PCB folder\.

__GetState and SetState Methods__

__GetState\_Description method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_Description : TPCBString;  
__Description__  
This method returns the violation description that the violation object is associated with\. This method is used for the __Description__ property\.  
The corresponding __GetState\_Name__ method returns the name of this violation\.  
__Example__

1

If Violation <> Nil Then

2

    ShowMessage\('Violation Name : ' \+ Violation\.Name \+ \#13\#10 \+

3

                'Description    : ' \+ Violation\.Description\);

__See also__  
IPCB\_Violation interface

__GetState\_Name method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_Name : TPCBString;  
__Description__  
This method returns the violation name that the violation object is associated with\. The method is used for the __Name__ property\.  
The corresponding __GetState\_Description__ method returns the description of this violation\.  
__Example__

1

If Violation <> Nil Then

2

    ShowMessage\('Violation Name : ' \+ Violation\.Name \+ \#13\#10 \+

3

                'Description    : ' \+ Violation\.Description\);

__See also__  
IPCB\_Violation interface

__GetState\_Primitive1 method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_Primitive1 : IPCB\_Primitive;  
__Description__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.  
A violation object that deals with unary rules only has a valid Primitive1 property\.  
The Primitive2 property is always void for unary rules\.  
Always check if the second property, Primitive2 is valid before invoking its methods or properties\.  
__Example__  
__See also__  
IPCB\_Violation interface

__GetState\_Primitive2 method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_Primitive2 : IPCB\_Primitive;  
__Description__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.  
Note  
A violation object that deals with unary rules only has a valid Primitive1 property thus the Primitive2 property is always void for unary rules\.  
Therefore always check if the second Primitive2 is valid before invoking its methods or properties\.  
__Example__  
__See also__  
IPCB\_Violation interface

__GetState\_Rule method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_Rule : IPCB\_Primitive;  
__Description__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.  
However the __IPCB\_Primitive__ interface actually represents a __IPCB\_Rule__ ancestor object interface\.  
__Example__  
__See also__  
IPCB\_Violation interface

__GetState\_ShortDescriptorString method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_ShortDescriptorString : TPCBString;  
__Description__  
This method returns the shortened version of the description string\.  
__Example__  
__See also__  
IPCB\_Violation interface

__Methods__

__IsRedundant method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function IsRedundant : Boolean;  
__Description__  
This method determines whether the object is redundant \(unused object\) on the PCB document or not\.  
__Example__  
__See also__  
IPCB\_Violation interface

__Properties__

__Rule property__

\(IPCB\_Violation interface\)  
__Syntax__  
Property Rule : IPCB\_Primitive Read GetState\_Rule;  
__Description__  
This Rule property returns a rule object encapsulated by the __IPCB\_Primitive__ interface\. However the __IPCB\_Primitive__ interface actually represents a __IPCB\_Rule__ ancestor object interface\.  
__Example__

01

// Create an iterator to look for violation objects only\.

02

Iterator := Board\.BoardIterator\_Create;

03

Iterator\.AddFilter\_ObjectSet\(MkSet\(eViolationObject\)\);

04

Iterator\.AddFilter\_LayerSet\(AllLayers\);

05

Iterator\.AddFilter\_Method\(eProcessAll\);

06

  

07

// search for violations

08

Violation := Iterator\.FirstPCBObject;

09

While Violation <> Nil Do

10

Begin

11

    S := 'Violation Name: ' \+ Violation\.Name \+ '  \+\#13\#10 \+ 

12

         'Description: '    \+ Violation\.Description\);

13

  

14

    //Get design rule associated with the current violation object

15

    Rule := Violation\.Rule;

16

    If Rule <> Nil Then

17

        ShowMessage\(S \+ \#13\#10 \+ '  Rule Name: ' \+ Rule\.Name\);

18

  

19

    S := '';

20

    Violation := Iterator\.NextPCBObject;

21

End;

22

Board\.BoardIterator\_Destroy\(Iterator\);

__See also__  
IPCB\_Violation interface  
IPCB\_Rule interface

__Primitive1 property__

\(IPCB\_Violation interface\)  
__Syntax__  
Property Primitive1 : IPCB\_Primitive Read GetState\_Primitive1;  
__Description__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.  
A violation object that deals with unary rules only has a valid Primitive1 property\.  
__Notes__  
The Primitive2 property is always void for unary rules, therefore check if the second Primitive2 is valid before invoking its methods or properties\.  
A read only property  
__Example__

01

// First pcb object associated with a unary/binary design rule\.

02

PCB1Object := Violation\.Primitive1;

03

  

04

// Second pcb object associated with a binary design rule\.

05

// however there are unary and binary rules, thus, for unary rules,

06

// there will only be one rule object in violation associated with the violation

07

PCB2Object := Violation\.Primitive2;

08

If PCB2Object <> Nil Then

09

Begin

10

    // do what you want with the second object

11

End;

__See also__  
IPCB\_Violation interface

__Primitive2 property__

\(IPCB\_Violation interface\)  
__Syntax__  
Property Primitive2 : IPCB\_Primitive Read GetState\_Primitive2;  
__Description__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.  
A violation object that deals with unary rules only has a valid Primitive1 property\.  
The Primitive2 property is always void for unary rules\.  
Check if the second Primitive2 is valid before invoking its methods or properties\.  
A read only property\.  
__Example__

01

// First pcb object associated with a unary/binary design rule\.

02

PCB1Object := Violation\.Primitive1;

03

  

04

// Second pcb object associated with a binary design rule\.

05

// however there are unary and binary rules, thus, for unary rules,

06

// there will only be one rule object in violation associated with the violation

07

PCB2Object := Violation\.Primitive2;

08

If PCB2Object <> Nil Then

09

Begin

10

    // do what you want with the second object

11

End;

__See also__  
IPCB\_Violation interface

__Name property__

\(IPCB\_Violation interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Name;  
__Description__  
This property returns the violation name that the violation object is associated with\. The corresponding __Description__ property returns the description of this violation \(if any\)\.  
This is a read only property\.  
__Example__

1

If Violation <> Nil Then

2

    ShowMessage\('Violation Name : ' \+ Violation\.Name \+ \#13\#10 \+

3

                'Description    : ' \+ Violation\.Description\);

__See also__  
IPCB\_Violation interface  
__Description__ property

__Description property__

\(IPCB\_Violation interface\)  
__Syntax__  
Property Description : TPCBString Read GetState\_Description;  
__Description__  
This property returns the violation description that the violation object is associated with\. The corresponding __Name__ property returns the name of this violation\. This property is supported by the __GetState\_Description__ method\.  
This is a read only property\.  
__Example__

1

If Violation <> Nil Then

2

    ShowMessage\('Violation Name : ' \+ Violation\.Name \+ \#13\#10 \+

3

                'Description    : ' \+ Violation\.Description\);

__See also__  
IPCB\_Violation interface  
Name property

<a id="IPCB_ContourPoint_Interface"></a>__IPCB\_ContourPoint Interface__

__Overview__  
The __IPCB\_ContourPoint__ interface hierarchy is as follows:

__IPCB\_ContourPoint methods__  
GetState\_X  
SetState\_X  
GetState\_Y  
SetState\_Y

__IPCB\_ContourPoint properties__  
X  
Y

__See also__

__Methods__

__SetState\_Y method__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Procedure SetState\_Y \(AY : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

__SetState\_X method__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Procedure SetState\_X \(AX : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

__GetState\_Y method__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Function GetState\_Y : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

__GetState\_X method__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Function GetState\_X : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

__Properties__

__X property__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Property X : TCoord Read GetState\_X Write SetState\_X;  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

__Y property__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Property Y : TCoord Read GetState\_Y Write SetState\_Y;  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

<a id="IPCB_Contour_Interface"></a>__IPCB\_Contour Interface__

__Overview__  
The __IPCB\_Contour__ interface hierarchy is as follows:

__IPCB\_Contour methods__  
GetState\_Rotation  
SetState\_Rotation  
GetState\_CX  
SetState\_CX  
GetState\_CY  
SetState\_CY  
GetState\_Point  
GetState\_Count  
Clear  
AddPoint  
InsertPoint  
AddContour  
AddArc  
GetGPCVertexList  
FillGPCVertexList  
I\_ObjectAddress

__IPCB\_Contour properties__  
Rotation  
CX  
CY  
Points  
Count

__See also__

__Methods__

__Clear method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure Clear;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__AddPoint method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure AddPoint\(x, y : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__AddContour method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure AddContour\(Const C : IPCB\_Contour; Const i1, i2 : Integer\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__AddArc method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure AddArc\(StartAngle, EndAngle : Double; cx, cy : TCoord; Radius : TCoord;AClockwise : Boolean = False\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__InsertPoint method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure InsertPoint\(Index : Integer; x, y : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__I\_ObjectAddress method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
This function returns the true pointer value of the object interface of a design object\.  
__Notes__  
The IPCB\_ServerInterface\.SendMessageToRobots method needs the I\_ObjectAddress parameter of a design object\.  
__Example__

1

//Notify PCB that the fill object is going to be changed\.

2

PCBServer\.SendMessageToRobots\(

3

        Fill\.I\_ObjectAddress, 

4

        c\_Broadcast, 

5

        PCBM\_BeginModify , 

6

        c\_NoEventData\);

__See also__  
IPCB\_Contour interface

__GetState\_Point method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function GetState\_Point \(I : Integer\) : IPCB\_ContourPoint;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__GetState\_Count method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function GetState\_Count : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__GetGPCVertexList method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure GetGPCVertexList \(Const AContour : Pgpc\_vertex\_list\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__FillGPCVertexList method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure FillGPCVertexList\(Const AContour : Pgpc\_vertex\_list\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__SetState\_Rotation method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure SetState\_Rotation \(ARotation : TAngle\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__SetState\_CY method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure SetState\_CY \(ACY : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__SetState\_CX method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure SetState\_CX \(ACX : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__GetState\_Rotation method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function GetState\_Rotation : TAngle;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__GetState\_CY method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function GetState\_CY : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__GetState\_CX method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function GetState\_CX : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__Properties__

__Rotation property__

\(IPCB\_Contour interface\)  
__Syntax__  
Property Rotation : TAngle Read GetState\_Rotation Write SetState\_Rotation;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__Points property__

\(IPCB\_Contour interface\)  
__Syntax__  
Property Points\[I : Integer\] : IPCB\_ContourPoint Read GetState\_Point;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__CY property__

\(IPCB\_Contour interface\)  
__Syntax__  
Property CY : TCoord Read GetState\_CY Write SetState\_CY;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__CX property__

\(IPCB\_Contour interface\)  
__Syntax__  
Property CX : TCoord Read GetState\_CX Write SetState\_CX;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__Count property__

\(IPCB\_Contour interface\)  
__Syntax__  
Property Count : Integer Read GetState\_Count;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

<a id="IPCB_ContourMaker_Interface"></a>__IPCB\_ContourMaker Interface__

__Overview__

__IPCB\_ContourMaker methods__  
MakeContour  
DestroyPolygon

__IPCB\_ContourMaker properties__

__See also__  
IPCB\_Contour interface

__Methods__

__IPCB\_MakeContour method__

\(IPCB\_ContourMaker interface\)  
__Syntax__  
Function MakeContour\(APrim   : IPCB\_Primitive; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(ATrack  : IPCB\_Track    ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(APad    : IPCB\_Pad      ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(AFill   : IPCB\_Fill     ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(AVia    : IPCB\_Via      ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(AArc    : IPCB\_Arc      ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(ARegion : IPCB\_Region   ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(AText   : IPCB\_Text     ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(APoly   : IPCB\_Polygon  ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
__Description__  
__Example__  
__See also__  
IPCB\_ContourMaker interface

<a id="Dimension_Object_Interfaces"></a>__Dimension Object Interfaces__

__IPCB\_OriginalDimension__

__Overview__  
The IPCB\_OriginalDimension interface represents the dimensioning information on the current PCB layer\. The dimension value is the distance between the start and end markers, measured in the default units\. Note that the original dimension object has been superseded by a new set of dimension objects  
__Notes__  
The IPCB\_OriginalDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_OriginalDimension  
__IPCB\_OriginalDimension Methods__  
Function  Text    : IPCB\_Text;       
Function  Track1  : IPCB\_Primitive;  
Function  Track2  : IPCB\_Primitive;  
Function  Track3  : IPCB\_Primitive;  
Function  Track4  : IPCB\_Primitive;  
Function  Track5  : IPCB\_Primitive;  
Function  Track6  : IPCB\_Primitive;  
Function  Track7  : IPCB\_Primitive;  
Function  Track8  : IPCB\_Primitive;  
__See also__  
IPCB\_Dimension interface  
PCB Design Objects

__IPCB\_Dimension__

__Overview__  
Dimension objects are used for dimensional details of a PCB board in either imperial or metric units and can be placed on any layer\.  To create an original Dimension objects, use the IPCB\_OriginalDimension class which is used in P99SE and earlier versions\.  
Altium Designer introduced several new dimension styles \- Linear, Angular, Radial, Leader, Datum, Baseline, Center, Linear Diameter and Radial Diameter objects  
__Notes__  
The IPCB\_Dimension interface is the ancestor interface for IPCB\_OriginalDimension, IPCB\_LinearDImension, IPCB\_AngularDimension, IPCB\_RadialDimension, IPCB\_LeaderDimension, IPCB\_DatumDimension, IPCB\_BaselineDimension, IPCB\_CenterDimension, IPCB\_LinearDiameterDimension, IPCB\_RadialDiameterDimension interfaces\.  
The DimensionKind property determines the type a dimension object is\.  
A dimension object especially a baseline or a leader dimension has multiple reference points\. The references \(a reference consists of a record of an object along with its x and y coordinate point, an anchor and is a start or end marker\)\.  A reference point is either the start or end marker and the length of two reference points is the dimensional length\.

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__IPCB\_Dimension Methods__  
Procedure MoveTextByXY \(AX,  
                        AY    : TCoord\);  
Procedure MoveTextToXY \(AX,  
                        AY    : TCoord\);  
Procedure RotateAroundXY\(AX,  
                         AY    : TCoord;  
                         Angle : TAngle\);  
Procedure References\_Add\(R : TDimensionReference\);  
Procedure References\_Delete\(Index : Integer\);  
Procedure References\_DeleteLast;  
Function  References\_IndexOf\(P     : IPCB\_Primitive;  
                             Index : Integer\) : Integer;  
Function  References\_Validate : Boolean;  
Procedure ResetPrefixIfNeeded;  
__IPCB\_Dimension Properties__  
DimensionKind      : TDimensionKind            
TextX              : TCoord                    
TextY              : TCoord                    
X1Location         : TCoord                    
Y1Location         : TCoord                    
Size               : TCoord                    
LineWidth          : TCoord                    
TextHeight         : TCoord                    
TextWidth          : TCoord                    
TextFont           : TFontID                   
TextLineWidth      : TCoord                    
TextPosition       : TDimensionTextPosition    
TextGap            : TCoord                    
TextFormat         : TPCBString                   
TextDimensionUnit  : TDimensionUnit            
TextPrecision      : Integer                   
TextPrefix         : TPCBString                   
TextSuffix         : TPCBString                   
TextValue          : TReal                     
ArrowSize          : TCoord                    
ArrowLineWidth     : TCoord                    
ArrowLength        : TCoord                    
ArrowPosition      : TDimensionArrowPosition   
ExtensionOffset    : TCoord                    
ExtensionLineWidth : TCoord                    
ExtensionPickGap   : TCoord                    
Style              : TUnitStyle                
References \[I : Integer\] : TDimensionReference  
References\_Count         : Integer // Read only  
UseTTFonts                        : Boolean     
Bold                              : Boolean     
Italic                            : Boolean     
FontName                          : TPCBString  
__See also__  
IPCB\_Primitive interface  
TDimensionTextPosition enumerated values  
TDimensionUnit enumerated values  
TDimensionArrowPosition enumerated values  
TDimensionReference enumerated values  
TUnitStyle enumerated values  
PCB Design Objects

__IPCB\_AngularDimension__

__Overview__  
The IPCB\_AngularDimension object interface allows for the dimensioning of angular distances\. There are four references \(two reference points associated with two reference objects\) which need to be defined and the dimension text is then placed\. The references may be tracks, fills, or polygons\.  
__Notes__  
The IPCB\_AngularDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_AngularDimension  
The Radius property denotes the radius size of the IPCB\_AngularDimension object\.  
The Sector property denotes which sector the IPCB\_AngularDimension is using\. Sector 1 is the angle between 0 – 90 degrees\. 2 = 90 – 180 degrees\. 3 = 180 =270 degrees\. 4 = 270 = 360 or 0 degrees\.  
__IPCB\_AngularDimension Methods__  
Function  Text              : IPCB\_Text;   
Function  Arc1              : IPCB\_Arc;    
Function  Arc2              : IPCB\_Arc;    
Function  Arrow1\_Track1     : IPCB\_Track;  
Function  Arrow1\_Track2     : IPCB\_Track;  
Function  Arrow2\_Track1     : IPCB\_Track;  
Function  Arrow2\_Track2     : IPCB\_Track;  
Function  Extension1\_Track  : IPCB\_Track;  
Function  Extension2\_Track  : IPCB\_Track;  
__IPCB\_AngularDimension Properties__  
Property Radius  : TCoord   
Property Sector  : Integer  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
IPCB\_Text interface  
IPCB\_Arc interface  
PCB Design Objects

__IPCB\_BaselineDimension__

__Overview__  
The IPCB\_BaselineDimension interface allows for the dimensioning of a linear distance of a collection of references, relative to a single reference\. The first reference point is the base reference and all the subsequent points are relative to this base reference\. The dimension value in each case is the distance between each reference point and the base reference measured in default units\. The references may be objects \(tracks, arcs, pads, vias, text, fills, polygons or components\) or points in free space\.

__Notes__  
The IPCB\_BaselineDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_BaselineDimension

The angle property denotes the angle or rotation of the IPCB\_BaselineDimension object with respect to the horizontal plane\.  
Since a baseline dimension allows for the dimensioning of a linear distance over a collection of references, thus for each reference relative to the base reference, there is a text location\. Use the TextLocationsCount field to obtain the number of  dimension labels\.

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__IPCB\_BaselineDimension Methods__  
Function  Text       : IPCB\_Text;   
Function  Texts        \(I : Integer\) : IPCB\_Text;   
Function  Arrow1\_Track1\(I : Integer\) : IPCB\_Track;   
Function  Arrow1\_Track2\(I : Integer\) : IPCB\_Track;   
Function  Arrow2\_Track1\(I : Integer\) : IPCB\_Track;   
Function  Arrow2\_Track2\(I : Integer\) : IPCB\_Track;   
Function  Line\_Track1  \(I : Integer\) : IPCB\_Track;  
Function  Line\_Track2  \(I : Integer\) : IPCB\_Track;   
Function  Extension1\_Track \(I : Integer\) : IPCB\_Track;   
Function  Extension2\_Track \(I : Integer\) : IPCB\_Track;   
Procedure TextLocations\_Add   \(Point : TCoordPoint\);:  
Procedure TextLocations\_Delete\(Index : Integer\);      
Procedure TextLocations\_DeleteLast;  
Procedure TextLocations\_Clear;

__IPCB\_BaselineDimension Properties__  
Property Angle                       : TAngle  
Property TextLocations \[I : Integer\] : TCoordPoint  
Property TextLocationsCount          : Integer  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
IPCB\_Text interface  
PCB Design Objects

__IPCB\_CenterDimension__

__Overview__  
The IPCB\_CenterDimension object interface allows for the center of an arc or circle to be marked  
__Notes__  
The IPCB\_CenterDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_CenterDimension  
The angle property denotes the angle or rotation of the IPCB\_CenterDimension object with respect to the horizontal plane\.  
__IPCB\_CenterDimension Methods__  
Function  Cross\_Vertical\_Track   : IPCB\_Track;  
Function  Cross\_Horizontal\_Track : IPCB\_Track;  
__IPCB\_CenterDimension Properties__  
Property Angle : TAngle  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
PCB Design Objects

__IPCB\_DatumDimension__

__Overview__  
The IPCB\_DatumDimension interface references the dimensioning of a linear distance of a collection of objects, relative to a single object\. The dimension value is the distance between each reference object and the base object measured in the default units\. The references may be tracks, arcs, pads, vias, text, fills, polygons or components\.  
__Notes__  
The IPCB\_DatumDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_DatumDimension  
__IPCB\_DatumDimension Methods__  
Function  Text                              : IPCB\_Text;   
Function  Texts           \(I     : Integer\) : IPCB\_Text;   
Function  Extension\_Track \(I     : Integer\) : IPCB\_Track;  
__IPCB\_DatumDimension Properties__  
Property Angle : TAngle  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
IPCB\_Text interface  
PCB Design Objects

__IPCB\_LeaderDimension__

__Overview__  
The IPCB\_LeaderDimension object interface allows for the labeling of an object, point or area\. There are three types of leader dimensions available which reflect the label text either being encapsulated by a circle or square or not at all\. The pointer can also be an arrow or a dot which is size \-definable\.

__Notes__  
The IPCB\_LeaderDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_LeaderDimension

There are three types of leaders available: eNoShape = standard leader which means the dimension text is not enclosed at all\. eRectangular  the label text is encapsulated by a square, and eRounded – the dimension text is encapsulated by a circle\.  
The Dot property denotes the dot symbol attached to the pointer of the leader dimension object as a dot or as an arrow\.  
If the Dot field is enabled, then you can specify the size of the dot as a TCoord value\.  
__IPCB\_LeaderDimension Methods__  
Function  Text            : IPCB\_Text;            
Function  Dot\_Arc         : IPCB\_Arc;             
Function  Circle\_Arc      : IPCB\_Arc;             
Function  Arrow\_Track1    : IPCB\_Track;           
Function  Arrow\_Track2    : IPCB\_Track;           
Function  Square\_Track1   : IPCB\_Track;           
Function  Square\_Track2   : IPCB\_Track;           
Function  Square\_Track3   : IPCB\_Track;           
Function  Square\_Track4   : IPCB\_Track;           
Function  Line\_Track \(I : Integer\) : IPCB\_Track;  
__IPCB\_LeaderDimension Properties__  
Property Shape    : TShape  
Property Dot      : Boolean  
Property DotSize  : TCoord  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
IPCB\_Text interface  
IPCB\_Arc interface  
PCB Design Objects

__IPCB\_LinearDiameterDimension__

__Overview__  
The IPCB\_LinearDimension interface references the dimensioning information on the current layer with respect to a linear distance\. The dimension value is the distance between the start and end markers \(reference points\) measured in the default units\. The references may be objects \(tracks, arcs, pads, vias, text fills, polygons or components\) or points in free space\.  
__Notes__  
The IPCB\_LinearDiameterDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_LinearDiameterDimension  
__Immediate ancestor IPCB\_LinearDimension Methods__  
Function  Text               : IPCB\_Text;   
Function  Arrow1\_Track1      : IPCB\_Track;  
Function  Arrow1\_Track2      : IPCB\_Track;  
Function  Arrow2\_Track1      : IPCB\_Track;  
Function  Arrow2\_Track2      : IPCB\_Track;  
Function  Line\_Track1        : IPCB\_Track;  
Function  Line\_Track2        : IPCB\_Track;  
Function  Extension1\_Track   : IPCB\_Track;  
Function  Extension2\_Track   : IPCB\_Track;  
__Immediate ancestor IPCB\_LinearDimension Properties__  
Property Angle : TAngle  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
PCB Design Objects

__IPCB\_LinearDimension__

__Overview__  
The IPCB\_LinearDimension object interface places dimensioning information on the current layer with respect to a linear distance\. The dimension value is the distance between the start and end markers \(reference points\) measured in the default units\. The references may be objects \(tracks, arcs, pads, vias, text fills, polygons or components\) or points in free space\.  
IPCB\_LinearDimension object interface has no introduced methods and properties, therefore refer to the IPCB\_Dimension interface object entry for details\.  
__Notes__  
The IPCB\_LinearDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_LinearDimension  
The angle property denotes the angle or rotation of the TPCBLinearDimension object with respect to the horizontal plane\.  
__IPCB\_LinearDimension Methods__  
Function  Text             : IPCB\_Text;  
Function  Arrow1\_Track1    : IPCB\_Track;  
Function  Arrow1\_Track2    : IPCB\_Track;  
Function  Arrow2\_Track1    : IPCB\_Track;  
Function  Arrow2\_Track2    : IPCB\_Track;  
Function  Line\_Track1      : IPCB\_Track;  
Function  Line\_Track2      : IPCB\_Track;  
Function  Extension1\_Track : IPCB\_Track;  
Function  Extension2\_Track : IPCB\_Track;  
__IPCB\_LinearDimension Properties__  
Property Angle : TAngle  
__See also__  
IPCB\_Dimension interface  
PCB Design Objects

__IPCB\_RadialDimension__

__Overview__  
The IPCB\_RadialDimension object interface allows for the dimensioning of a radius with respect to an arc or a circle\. The dimension can be placed internally or externally on an arc or a circle\.  
__Notes__  
The IPCB\_RadialDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_RadialDimension  
This field shows the current angular step setting for the dimension\. This is the rotation step used when placing the arrow portion of the dimension\. Moving the arrow around the circle or arc during placement of the dimension, the number and position of possible places to anchor the dimension are determined by this angular step value\.  
__IPCB\_RadialDimension Methods__  
Function  Text         : IPCB\_Text;   
Function  Arrow\_Track1 : IPCB\_Track;  
Function  Arrow\_Track2 : IPCB\_Track;  
Function  Line1\_Track  : IPCB\_Track;  
Function  Line2\_Track  : IPCB\_Track;  
__IPCB\_RadialDimension Property__  
Property AngleStep : TAngle  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
IPCB\_Text interface  
PCB Design Objects

__IPCB\_RadialDiameterDimension__

__Overview__  
The IPCB\_RadialDiameterDimension interface references the dimensioning of an arc or circle with respect to the diameter, rather than the radius\. The dimension can be placed either internally or externally with respect to the arc or circle  
__Notes__  
The IPCB\_RadialDiameterDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_RadialDiameterDimension  
__IPCB\_RadialDiameterDimension Methods__  
Function  Arrow2\_Track1  : IPCB\_Track;  
Function  Arrow2\_Track2  : IPCB\_Track;  
Function  Line3\_Track    : IPCB\_Track;  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
PCB Design Objects

 

<a id="PCB_Rule_Objects_Interfaces"></a>__PCB Rule Objects Interfaces __

The PCB editor incorporates a large set of design rules to help define compliance/constraints regarding the placement of PCB objects, routing methods, and netlists\.

These rules include clearances, object geometry, impedance control, routing priority, routing topology and parallelism\. Rule scope is the extent of each rule determined\.  The scope allows you to define the set of target objects that a particular instance of a rule is to be applied to\.

__See also__  
Rule ancestor interface  
Acute Angle rule interface  
Broken Nets rule interface  
Clearance rule interface  
Confinement Constraint rule interface  
Component Clearance rule interface  
Component Rotations rule interface  
Daisy Chain Stub Length rule interface  
Differential Pairs Routing rule interface  
Fanout Control rule interface  
Layer Pair rule interface  
Layer Stack rule interface  
Matched Lengths rule interface  
Max Min Width rule interface  
Max Min Length rule interface  
Max Min Hole Size rule interface  
Maximum Via Count rule interface  
Minimum Annular Ring rule interface  
NetsToIgnore rule interface  
Parallel Segment rule interface  
Paste Mask Expansion rule interface  
Power Plane Connect Style rule interface  
Power Plane Clearance rule interface  
Polygon Connect Style rule interface  
Permitted Layers rule interface  
Routing Topology rule interface  
Routing Priority rule interface  
Routing Layers rule interface  
Routing Corner Style rule interface  
Routing Via Style rule interface  
SMD To Plane rule interface  
SMD Neck Down rule interface  
SMD To Corner rule interface  
Solder Mask Expansion rule interface  
Short Circuit rule interface  
Test Point Style rule interface  
Test Point Usage rule interface  
Vias Under SMD rule interface  
Unconnected Pin rule interface  
Signal Integrity Rules  
FlightTime\_RisingEdge rule interface  
FlightTime\_FallingEdge rule interface  
MaxMinImpedance rule interface  
MaxSlope\_RisingEdge rule interface  
MaxSlope\_FallingEdge rule interface  
Overshoot\_FallingEdge rule interface  
Overshoot\_RisingEdge rule interface  
SignalTopValue rule interface  
SignalBaseValue rule interface  
SignalStimulus rule interface  
SupplyNets rule interface  
Undershoot\_FallingEdge rule interface  
Undershoot\_RisingEdge rule interface

<a id="IPCB_Rule"></a>__IPCB\_Rule__

__Overview__  
The IPCB\_Rule interface object encapsulates an existing PCB design rule in an opened PCB document in Altium Designer\. Each design rule has its own Unique ID\. To set the scope of a rule, unary or binary scope expressions are defined\.

The PCB editor incorporates a large set of design rules to help define compliance/constraints regarding the placement of PCB objects, routing methods, and netlists\. These rules include clearances, object geometry, impedance control, routing priority, routing topology and parallelism\. Rule scope is the extent of each rule determined\.  The scope allows you to define the set of target objects that a particular instance of a rule is to be applied to\.

__IPCB\_Rule Methods__  
Function  Priority                  : TRulePrecedence;  
Function  ScopeKindIsValid  \(AScopeKind  : TScopeKind\)          : Boolean;  
Function  Scope1Includes    \(P           : IPCB\_Primitive\)      : Boolean;  
Function  Scope2Includes    \(P           : IPCB\_Primitive\)      : Boolean;  
Function  NetScopeMatches   \(P1,  
                             P2          : IPCB\_Primitive\)      : Boolean;  
Function  CheckBinaryScope  \(P1,  
                             P2          : IPCB\_Primitive\)      : Boolean;  
Function  CheckUnaryScope   \(P           : IPCB\_Primitive\)      : Boolean;  
Function  GetState\_DataSummaryString     : TPCBString;  
Function  GetState\_ShortDescriptorString : TPCBString;  
Function  GetState\_ScopeDescriptorString : TPCBString;  
Function  ActualCheck               \(P1,  
                                     P2  : IPCB\_Primitive\)      : IPCB\_Violation;  
__IPCB\_Rule Properties__  
Property Scope1Expression : TPCBString  
Property Scope2Expression : TPCBString  
Property RuleKind         : TRuleKind       
Property NetScope         : TNetScope       
Property LayerKind        : TRuleLayerKind  
Property Comment          : TPCBString         
Property Name             : TPCBString         
Property DRCEnabled       : Boolean         
Property UniqueId         : TPCBString       //Read only  
Enumerated Types  
PCB Design Rules  
IPCB\_Violation interface  
TScopeKind  
TNetScope  
TRuleKind  
TRuleLayerKind

<a id="IPCB_AcuteAngle_rule"></a>__IPCB\_AcuteAngle rule__

__Overview__  
The IPCB\_AcuteAngleRule interface specifies the minimum angle permitted at a track corner\.  
__IPCB\_AcuteAngle Properties__  
Minimum : TAngle

<a id="IPCB_BrokenNetRule_rule"></a>__IPCB\_BrokenNetRule rule__

__Overview__  
The IPCB\_BrokenNetRule rule deals with broken nets in relation to polygons\. Polygons that are affected by the broken net rules are highlighted or not\.  
__IPCB\_BrokenNetRule Properties__  
HighlightPolygons : Boolean

<a id="IPCB_ComponentClearanceConstraint_rule"></a>__IPCB\_ComponentClearanceConstraint rule__

__Overview__  
The Component Clearance Constraint PCB Design rule has available Check Mode setting:

- Quick Check – uses a components’ bounding rectangle to define its shape\. The bounding rectangle is the smallest rectangle that encloses all the primitives that make up a component\.
- Multi Layer Check – also uses a component bounding rectangle, but considers through\-hole component pads on a board with components on both sides, allowing surface mount components to be placed under a through\-hole component\.
- Full Check – uses the exact shape that encloses all the primitives that make up each component\. Use this option if the design includes a large number of circular or irregular shaped components\.

__IPCB\_ComponentClearanceConstraint Properties__  
Property Gap                : TCoord  
Property VerticalGap        : TCoord  
Property CollisionCheckMode : TComponentCollisionCheckMode  
__See also__  
TComponentCollisionCheckMode

<a id="IPCB_ComponentRotationsRule_rule"></a>__IPCB\_ComponentRotationsRule rule__

__Overview__  
The IPCB\_ComponentRotationsRule specifies allowable component orientations\. Multiple orientations are permitted, allowing the autoplacer to use any of the enabled orientations\. The allowed component orientations are: 0,90,180, 270, or AllRotations\. It is possible to have multiple settings, for example setting at 0 and 270 degrees rotations only\.  
__IPCB\_ComponentRotationsRule Properties__  
Property AllowedRotations : Integer

<a id="IPCB_ConfinementConstraint_rule"></a>__IPCB\_ConfinementConstraint rule__

__Overview__  
The IPCB\_ConfinementConstraint interface specifies a rectangular region in which a set of objects is either allowed, or not allowed\. Use this function to define a region that a class of components must be placed in\.  
__IPCB\_ConfinementConstraint Methods__  
Procedure RotateAroundXY \(AX,  
                          AY    : TCoord;  
                          Angle : TAngle\);  
__IPCB\_ConfinementConstraint Properties__  
Property X            : TCoord             
Property Y            : TCoord             
Property Kind         : TConfinementStyle  
Property Layer        : TLayer             
Property BoundingRect : TCoordRect       

<a id="IPCB_ClearanceConstraint_Rule"></a>__IPCB\_ClearanceConstraint Rule__

__Overview__  
This interface defines the minimum clearance between any two primitive objects on a copper layer\.  
__Notes__  
The PrimitivesViolate function checks if two primitives violate the minimum clearance or not\.  
The Gap property determines the gap size of the track segments\.  
__IPCB\_ClearanceConstraint Methods__  
Function  PrimitivesViolate\(P1, P2  : IPCB\_Primitive\) : Boolean;   
__IPCB\_ClearanceConstraint Properties__  
Property Gap  : TCoord

<a id="IPCB_DaisyChainStubLengthConstraint_rule"></a>__IPCB\_DaisyChainStubLengthConstraint rule__

__Overview__  
The daisy chain stub length rule specifies the maximum permissible stub length for a net with a daisy chain topology\.  
__Notes__  
Limit property for the stub length\.  
__IPCB\_DaisyChainStubLengthConstraint Properties__  
Property Limit : TCoord

<a id="IPCB__DifferentialPairsRoutingRule_Inter"></a>__IPCB\_ DifferentialPairsRoutingRule Interface__

__Overview__  
A differential signaling system is one where a signal is transmitted down a pair of tightly coupled carriers, one of these carrying the signal, the other carrying an equal but opposite image of the signal\. Differential signaling was developed to cater for situations where the logic reference ground of the signal source could not be well connected to the logic reference ground of the load\. Differential signaling is inherently immune to common mode electrical noise, the most common interference artifact present in an electronic product\. Another major advantage of differential signaling is that it minimizes electromagnetic interference \(EMI\) generated from the signal pair\.

Differential pair routing is a design technique employed to create a balanced transmission system able to carry differential \(equal and opposite\) signals across a printed circuit board\. Typically this differential routing will interface to an external differential transmission system, such as a connector and cable\.

It is important to note that while the coupling ratio achieved in a twisted pair differential cable may be better than 99%, the coupling achieved in differential pair routing will typically be less than 50%\. Current expert opinion is that the PCB routing task is not to try to ensure a specific *differential impedance *is achieved, rather the objective is to maintain the properties required to ensure the differential signal arrives in good condition at the target component as it travels from the external cabling\.

__Notes__  
The IPCB\_DifferentialPairsRoutingRule Interface hierarchy is as follows:  
IPCB\_Rule  
IPCB\_DifferentialPairsRoutingRule  
This interface defines the minimum clearance between any two primitive objects on a copper layer\.  
__Notes__  
The PrimitivesViolate function checks if two primitives violate the minimum clearance or not\.  
The Gap property determines the gap size of the track segments\.  
__IPCB\_DifferentialPairsRoutingRule Methods__  
Function  GetState\_MaxGap            \(Const L : TLayer\) : TCoord;  
Function  GetState\_MinGap            \(Const L : TLayer\) : TCoord;  
Function  GetState\_PreferedGap       \(Const L : TLayer\) : TCoord;  
Function  GetState\_MaxUncoupledLength : TCoord;   
   
Procedure SetState\_MaxGap            \(Const L : TLayer;  
                                      Value   : TCoord\);   
Procedure SetState\_MinGap            \(Const L : TLayer;  
                                      Value   : TCoord\);   
Procedure SetState\_PreferedGap       \(Const L : TLayer;  
                                      Value   : TCoord\);   
Procedure SetState\_MaxUncoupledLength\(Value   : TCoord\);  
__IPCB\_DifferentialPairsRoutingRule Properties__  
Property  MaxGap     \[Const L : TLayer\]  : TCoord  Read GetState\_MaxGap Write SetState\_MaxGap;  
Property  MinGap     \[Const L : TLayer\]  : TCoord  Read GetState\_MinGap Write SetState\_MinGap;  
Property  PreferedGap\[Const L : TLayer\]  : TCoord  Read GetState\_PreferedGap Write SetState\_PreferedGap;  
Property  MaxUncoupledLength             : TCoord  Read GetState\_MaxUncoupledLength Write SetState\_MaxUncoupledLength;  
__See also__  
PCB Design Objects

<a id="IPCB_FanoutControlRule_rule"></a>__IPCB\_FanoutControlRule rule__

__Overview__  
The IPCB\_FanoutControl rule determines how BGAs on a PCB document is going to be fanned in respect to vias placement for routing\.  
__IPCB\_FanoutControlRule Properties__  
Property FanoutStyle        : TFanoutStyle  
Property FanoutDirection    : TFanoutDirection  
Property BGAFanoutDirection : TBGAFanoutDirection  
Property BGAFanoutViaMode   : TBGAFanoutViaMode  
Property ViaGrid            : TCoord

<a id="IPCB_LayerPairsRule_rule"></a>__IPCB\_LayerPairsRule rule__

__Overview__  
The IPCB\_LayerPairsRule interface deals with whether the layer pairs are going to be enforced or not on the current PCB document\.  
__IPCB\_LayerPairsRule Properties__  
Property EnforceLayerPairs : Boolean

<a id="IPCB_MatchedNetLengthsConstraint_rule"></a>__IPCB\_MatchedNetLengthsConstraint rule__

__Overview__  
The matched net lengths rule specifies the degree to which nets can have different lengths\.  
__Notes__  
The 90 degree style is the most compact and the Rounded style is the least compact\.  
__IPCB\_MatchedNetLengthsConstraint Methods__  
Function  MatchLengthForFromTo\(P1,P2 : IPCB\_Primitive\) : IPCB\_Violation;  
Function  MatchLengthForNet   \(P1,P2 : IPCB\_Primitive\) : IPCB\_Violation;  
__IPCB\_MatchedNetLengthsConstraint Properties__  
Property Amplitude : TCoord  
Property Gap       : TCoord  
Property Style     : TLengthenerStyle  
Property Tolerance : TCoord

<a id="IPCB_MaxMinHeightConstraint_rule"></a>__IPCB\_MaxMinHeightConstraint rule__

__Overview__  
The IPCB\_MaxMinHeightConstraint rule deals with heights of components, and you can set the maximum, minimum and preferred height values for targeted components on a PCB document\.  
__Notes__  
MaxHeight, MinHeight and PreferedHeight properties\.  
__IPCB\_MaxMinHeightConstraint Properties__  
Property MaxHeight      : TCoord  
Property MinHeight      : TCoord  
Property PreferedHeight : TCoord

<a id="IPCB_MaxMinHoleSizeConstraint_rule"></a>__IPCB\_MaxMinHoleSizeConstraint rule__

__Overview__  
The IPCB\_MaxMinHoleSizeContraint rule deals with the constraints of hole sizes on a PCB document\.  
__IPCB\_MaxMinHoleSizeConstraint Properties__  
Property AbsoluteValues : Boolean  
Property MaxLimit       : TCoord   
Property MinLimit       : TCoord   
Property MaxPercent     : TReal    
Property MinPercent     : TReal  

<a id="IPCB_MaxMinWidthConstraint_rule"></a>__IPCB\_MaxMinWidthConstraint rule__

__Overview__  
This routing width constraint interface defines the minimum, favored and maximum width of tracks and arcs on copper layers\.  
__IPCB\_MaxMinWidth Properties__  
Property  MaxWidth    \[Const L : TLayer\]  : TCoord   
Property  MinWidth    \[Const L : TLayer\]  : TCoord   
Property  FavoredWidth\[Const L : TLayer\]  : TCoord   
Property  ImpedanceDriven                 : Boolean  
Property  MinImpedance                    : TDouble  
Property  FavoredImpedance                : TDouble  
Property  MaxImpedance                    : TDouble

<a id="IPCB_MaxMinLengthConstraint_rule"></a>__IPCB\_MaxMinLengthConstraint rule__

__Overview__  
This IPCB\_MaxMinLengthConstraint rule defines the minimum and maximum lengths of a net\.  
__IPCB\_MaxMinLengthConstraint Properties__  
Property MaxLimit : TCoord  
Property MinLimit : TCoord

<a id="IPCB_MinimumAnnularRing_rule"></a>__IPCB\_MinimumAnnularRing rule__

__Overview__  
The minimum annular ring rule determines the minimum size of an annular ring\.  
__IPCB\_MinimumAnnularRing Properties__  
Property Minimum : TCoord

<a id="IPCB_MaximumViaCountRule_rule"></a>__IPCB\_MaximumViaCountRule rule__

__Overview__  
The maximum via count rule specifies the maximum number of vias permitted on a PCB document\.  
__Notes__  
Set or return the maximum number of vias for the Limit property  
__IPCB\_MaximumViaCount Properties__  
Property Limit : Integer

<a id="IPCB_NetsToIgnoreRule_rule"></a>__IPCB\_NetsToIgnoreRule rule__

__Overview__  
The Nets To Ignore rule determines which nets to ignore during Design Rule Check\.  
__IPCB\_NetsToIgnoreRule Methods__  
No new interface methods  
__IPCB\_NetsToIgnoreRule Properties__  
No new interface properties  
__See also__  
IPCB\_Rule interface

<a id="IPCB_ParallelSegmentConstraint_rule"></a>__IPCB\_ParallelSegmentConstraint rule__

__Overview__  
This rule specifies the distance two track segments can run in parallel, for a given separation\. Note that this rule tests track segments, not collections of track segments\. Apply multiple parallel segment constraints to a net to approximate crosstalk characteristics that vary as a function of length and gap\.  
__Notes__  
The Gap and Limit properties concern the track segments\.  
__IPCB\_ParallelSegmentConstraint Properties__  
Property Gap   : TCoord  
Property Limit : TCoord

<a id="IPCB_PasteMaskExpansionRule_rule"></a>__IPCB\_PasteMaskExpansionRule rule__

__Overview__  
The IPCB\_PasteMaskExpansionRule function returns or sets values for a paste mask expansion rule object\. The Paste Mask Expansion Rule specifies the amount of radial expansion or radial contraction of each pad site\.  
__Notes__  
The Expansion property sets or returns the radial expansion or contraction value \(a negative value denotes contraction\)\.  
__IPCB\_PasteMaskExpansionRule Properties__  
Property Expansion : TCoord

<a id="IPCB_PermittedLayersRule_rule"></a>__IPCB\_PermittedLayersRule rule__

__Overview__  
The IPCB\_PermittedLayersRule function returns or sets the permitted layers rule which specifies the layers components can be placed on during placement with the Cluster Placer\. The Cluster Placer does not change the layer a component is on, you must set the component layer prior to running the placer\.  
__IPCB\_PermittedLayersRule Properties__  
Property PermittedLayers : TLayerSet

<a id="IPCB_PowerPlaneClearanceRule_rule"></a>__IPCB\_PowerPlaneClearanceRule rule__

__Overview__  
The power plane clearance rule determines the clearance of the power plane\.  
__IPCB\_PowerPlaneClearanceRule Properties__  
Property Clearance : TCoord

<a id="IPCB_PowerPlaneConnectStyleRule_rule"></a>__IPCB\_PowerPlaneConnectStyleRule rule__

__Overview__  
This power plane connect style rule specifies the style of the connection from a component pin to a power plane\. There are two connection types \- direct connections \(the pin to solid copper\) or thermal relief connection\.  
__Notes__  
The __TPlaneConnectStyle__ type determines the connection style for a plane\. If Thermal Relief connection is used, then the thermal relief conductor width, the relief expansion, the width of the air gap and the number of relief entries need to be determined\. If direct connection style is used, then the previous parameters are not needed\.  
__IPCB\_PowerPlaneConnectStyleRule Properties__  
Property PlaneConnectStyle    : TPlaneConnectStyle  
Property ReliefExpansion      : TCoord              
Property ReliefConductorWidth : TCoord              
Property ReliefEntries        : Integer             
Property ReliefAirGap         : TCoord            

<a id="IPCB_PolygonConnectStyleRule_rule"></a>__IPCB\_PolygonConnectStyleRule rule__

__Overview__  
The Polygon Connect Style Rule returns or sets the polygon connect style rule which specifies how the polygon is connected to the power plane\.

__Notes__

- The __TPlaneConnectStyle__ type specifies the polygon connect style rule which is relief connection to a polygon, or direct connection to a polygon from a component pin\. That is, the type of connection from a component pin to the polygon\.
- The relief conductor width property denotes the width of the conductor between two air gaps\.
- The relief entries property specifies the number of relief entries \(2 or 4\) for the relief connection of the polygon connection\. For other types of connection, this field is irrelevant\.
- The PolygonReliefAngle type specifies the angle of relief connections in 45 or 90 degrees\.

__IPCB\_PolygonConnectStyleRule Properties__  
Property ConnectStyle         : TPlaneConnectStyle   
Property ReliefConductorWidth : TCoord               
Property ReliefEntries        : Integer              
Property PolygonReliefAngle   : TPolygonReliefAngle

<a id="IPCB_RoutingCornerStyleRule"></a>__IPCB\_RoutingCornerStyleRule__

__Overview__  
This routing corners rule specifies the corner style to be used during autorouting a PCB document\.

__Notes__

- The TCornerStyle type sets or returns the corner style which can be a 45 degree camfer or rounded using an arc\.
- The minsetback and maxsetback properties specify the minimum and maximum distance from the corner location to the start of the corner chamfer or arc\.

__IPCB\_RoutingCornerStyleRule Properties__  
Property Style        TCornerStyle  
Property MinSetBack : TCoord  
Property MaxSetBack : TCoord

<a id="IPCB_RoutingLayersRule_rule"></a>__IPCB\_RoutingLayersRule rule__

__Overview__  
This routing layers rule specifies the preferred routing direction for layer to be used during autorouting\.  
__IPCB\_RoutingLayersRule Properties__  
Property RoutingLayers \[L : TLayer\] : Boolean

<a id="IPCB_RoutingPriorityRule_rule"></a>__IPCB\_RoutingPriorityRule rule__

__Overview__  
This routing priority rule function assigns a routing priority which is used to set the order of how the nets will be auto routed\.  
__IPCB\_RoutingPriorityRule Properties__  
Property RoutingPriority : Integer

<a id="IPCB_RoutingTopologyRule_rule"></a>__IPCB\_RoutingTopologyRule rule__

__Overview__  
This routing topology rule function specifies the topology of the net\. The net compromises a pattern of the pin\-to\-pin connections\. A topology is applied to a net for specific reasons, for example to minimise signal reflections, daisy chain topology is used\.  
__Notes__  
The Topology property sets or returns the topology of the net\. The following topologies can be applied: Shortest, Horizontal, Vertical, Daisy\-Simple, Daisy\-Mid Driven, Daisy\-Balanced, or Star\.  
__IPCB\_RoutingTopologyRule Properties__  
Property Topology: TNetTopology

<a id="IPCB_RoutingViaStyleRule_rule"></a>__IPCB\_RoutingViaStyleRule rule__

__Overview__  
This routing via style rule specifies the via object to be used during autorouting\. Vias can be through\-hole, Blind \(from a surface layer to an inner layer\) or Buried \(between two inner layers\)\.  
__Notes__  
The ViaStyle property sets or returns the via style\. Vias can be thru\-hole, blind \(from a surface layer to an inner layer\) or buried \(between two inner layers\)\.  
__IPCB\_RoutingViaStyleRule Properties__  
Property MinHoleWidth      : TCoord  
Property MaxHoleWidth      : TCoord  
Property PreferedHoleWidth : TCoord  
Property MinWidth          : TCoord  
Property MaxWidth          : TCoord  
Property PreferedWidth     : TCoord  
Property ViaStyle          : TRouteVia

<a id="IPCB_RuleSupplyNets_rule"></a>__IPCB\_RuleSupplyNets rule__

__Overview__  
This IPCB\_RuleSupplyNets interface specifies the supply nets on the board\. The signal integrity analyzer needs to know each supply net name and voltage\.  
__IPCB\_RuleSupplyNets Properties__  
Property Voltage : Double

<a id="IPCB_ShortCircuitConstraint_rule"></a>__IPCB\_ShortCircuitConstraint rule__

__Overview__  
The short circuit constraint rule includes a constraint to test for short circuits between primitive objects on the copper layers\. A short circuit exists when two objects that have different net names touch\.  
__Notes__  
The Allowed property sets or returns the boolean value whether or not the short circuit constraint rule is allowed\.  
__IPCB\_ShortCircuitConstraint Properties__  
Property Allowed : Boolean

<a id="IPCB_SMDNeckDownConstraint_rule"></a>__IPCB\_SMDNeckDownConstraint rule__

__Overview__  
__IPCB\_SMDToPlaneConstraint Properties__  
Property Percent : TReal

<a id="IPCB_SMDToCornerConstraint_rule"></a>__IPCB\_SMDToCornerConstraint rule__

__Overview__  
__Notes__  
The Distance property determines the distance between the SMD and a corner\.  
__IPCB\_SMDToCornerConstraint Properties__  
Property Distance : TCoord

<a id="IPCB_SMDToPlaneConstraint_rule"></a>__IPCB\_SMDToPlaneConstraint rule__

__Overview__  
__IPCB\_SMDToPlaneConstraint Methods__  
Function  IsInternalPlaneNet\(Net   : IPCB\_Net; Board : IPCb\_Board\): Boolean;  
__IPCB\_SMDToPlaneConstraint Properties__  
Property Distance : TCoord

<a id="IPCB_SolderMaskExpansionRule_rule"></a>__IPCB\_SolderMaskExpansionRule rule__

__Overview__  
The solder mask expansion rule defines the shape that is created on the solder mask layer at each pad and via site\. This shape is expanded or contracted radially by the amount specified by this rule\.  
Note, Tenting and solder mask are related\. A negative value allows the solder mask to be reduced\.  
__IPCB\_SolderMaskExpansion Properties__  
Property Expansion : TCoord

<a id="IPCB_TestPointStyleRule_rule"></a>__IPCB\_TestPointStyleRule rule__

__Overview__  
The auto\-router includes a testpoint generator, which can identify existing pads and vias as testpoints, as well as adding testpoint pads to nets which can not be accessed at existing pads and vias\. Generally the testpoint types are used in bare board testing or are used for in\-circuit testing\.  
__IPCB\_TestPointStyleRule Methods__  
Procedure DoDefaultStyleOrder;  
__IPCB\_TestPointStyleRule Properties__  
Property TestpointUnderComponent       : Boolean  
Property MinSize                       : TCoord  
Property MaxSize                       : TCoord  
Property PreferedSize                  : TCoord  
Property MinHoleSize                   : TCoord  
Property MaxHoleSize                   : TCoord  
Property PreferedHoleSize              : TCoord  
Property TestpointGrid                 : TCoord  
Property OrderArray \[I : Integer\]      : TTestPointStyle  
Property AllowedSide                   : TTestpointAllowedSideSet  
Property AllowedStyleSet               : TTestPointStyleSet  
Property Allowed \[I : TTestPointStyle\] : Boolean  
Property TestpointPriority\[I : TTestPointStyle\] : Integer

<a id="IPCB_TestPointUsage_rule"></a>__IPCB\_TestPointUsage rule__

__Overview__  
Altium Designer's autorouter includes a testpoint generator, which can identify existing pads and vias as testpoints, as well as adding testpoint pads to nets which can not be accessed at existing pads and vias\. Generally the testpoint types are used in bare board testing or are used for in\-circuit testing\.  
__IPCB\_TestPointUsage Properties__  
Property Valid              : TTestpointValid  
Property AllowMultipleOnNet : Boolean        

<a id="IPCB_UnConnectedPinRule_rule"></a>__IPCB\_UnConnectedPinRule rule__

__Overview__  
This interface deals with unconnected pins on a PCB document\.  
__IPCB\_UnConnectedPinRule Properties__  
No new properties\.  
__See also__  
IPCB\_Rule interface

<a id="IPCB_ViasUnderSMDConstraint_rule"></a>__IPCB\_ViasUnderSMDConstraint rule__

__Overview__  
The Vias Under SMD constraint rule specifies if vias can be placed under SMD pads during autorouting\.  
__IPCB\_ViasUnderSMDConstraint Properties__  
Property Allowed : Boolean

<a id="Signal_Integrity_Design_Rules"></a>__Signal Integrity Design Rules__

__IPCB\_SignalStimulus rule__

__Overview__  
The IPCB\_SignalStimulus rule concerns with the definition of a signal for stimulus, such as the stimulus type, signal level, start, stop times and the period of the signal\.  
__IPCB\_SignalStimulus Methods__  
Procedure Export\_ToStmFile            \(AFilename : TString\);  
__IPCB\_SignalStimulus Properties__  
Property Kind       : TStimulusType  
Property Level      : TSignalLevel  
Property StartTime  : TReal         
Property StopTime   : TReal         
Property PeriodTime : TReal       

__IPCB\_MaxOvershootFall rule__

__Overview__  
The IPCB\_MaxOvershootFall interface specifies the maximum allowable overshoot \(ringing below the base value\) on the falling edge of the signal\.  
__IPCB\_MaxOvershootFall Properties__  
Property Maximum : TReal

__IPCB\_MaxOvershootRise rule__

__Overview__  
The IPCB\_MaxOvershootRise interface specifies the maximum allowable overshoot \(ringing above the base value\) on the rising edge of the signal\.  
__IPCB\_MaxOvershootRise Properties__  
Property  Maximum : TReal

__IPCB\_MaxUndershootFall__

__Overview__  
The IPCB\_MaxUndershootFall interface specifies the maximum allowable undershoot \(ringing above the base value\) on the falling edge of the signal\.  
__IPCB\_MaxUndershootFall Properties__  
Property  Maximum : TReal

__IPCB\_MaxUndershootRise rule__

__Overview__  
The IPCB\_MaxUndershootRise function specifies the maximum allowable undershoot \(ringing below the top value\) on the rising edge of the signal\.  
__IPCB\_MaxUndershootRise Properties__  
Property Maximum : TReal

__IPCB\_RuleMaxMinImpedance rule__

__Overview__  
The IPCB\_RuleMaxMinImpedance interface returns or sets values for a MaxMin Impedance rule object depending on the query mode \(eGetState or eSetState\)\. This rule specifies the minimum and maximum net impedance allowed\. Net impedance is a function of the conductor geometry and conductivity, the surrounding dielectric material \(the board base material, multilayer insulation, solder mask, etc\) and the physical geometry of the board \(distance to other conductors in the z\-plane\)\. This function defines the minimum and maximum impedance values allowed for the signal integrity rule\.  
__IPCB\_RuleMaxMinImpedance Properties__  
Property Minimum : TReal  
Property Maximum : TReal

__IPCB\_RuleMinSignalTopValue rule__

__Overview__  
The IPCB\_RuleMinSignalTopValue function specifies the minimum allowable signal top value\. The top value is the voltage that a signal settles into the minimum top state\.  
__IPCB\_RuleMinSignalTopValue Properties__  
Property Minimum : TReal

__IPCB\_RuleMaxSignalBaseValue rule__

__Overview__  
The IPCB\_RuleMaxSignalBaseValue function specifies the maximum allowable base value\. The base value is the voltage that a signal settles to in the low state\.  
__IPCB\_ RuleMaxSignalBaseValue Properties__  
Property Maximum : TReal

__IPCB\_RuleFlightTime\_RisingEdge rule__

__Overview__  
The IPCB\_RuleFlightTime\_RisingEdge interface returns or sets values for the flight time of the rising edge of a signal\. The flight time is the signal delay introduced by the interconnect structure\. It is calculated as the time it takes to drive the actual input to the threshold voltage, less the time it would take to drive a reference load \(connected directly to the output\) to the threshold voltage\.  
__IPCB\_RuleFlightTime\_RisingEdge Properties__  
Property MaximumFlightTime : TReal

__IPCB\_RuleFlightTime\_FallingEdge rule__

__Overview__  
The IPCB\_RuleFlightTime\_FallingEdge interface returns or sets values for the flight time of the falling edge of a signal\. The flight time is the signal delay introduced by the interconnect structure\. It is calculated as the time it takes to drive the actual input to the threshold voltage, less the time it would take to drive a reference load \(connected directly to the output\) to the threshold voltage\.  
__IPCB\_RuleFlightTime\_FallingEdge Properties__  
Property MaximumFlightTime : TReal

__IPCB\_RuleMaxSlopeRisingEdge rule__

__Overview__  
The IPCB\_RuleMaxSlope\_RisingEdge interface specifies the maximum allowable slope on the rising edge of the signal\. The slope is the time it takes for a signal to rise from the threshold voltage to a valid high voltage\.  
__IPCB\_RuleMaxSlopeRisingEdge Properties__  
Property MaxSlope : TReal

__IPCB\_RuleMaxSlopeFallingEdge rule__

__Overview__  
The IPCB\_RuleMaxSlope\_FallingEdge interface specifies the maximum allowable slope on the falling edge of the signal\. The slope is the time it takes for a signal to fall from the threshold voltage to a valid low voltage\.  
__IPCB\_RuleMaxSlopeFallingEdge Properties__  
Property MaxSlope : TReal

 

<a id="PCB_Object_Iterators"></a>__PCB Object Iterators __

An iterator conducts a search through a PCB document's design database to fetch PCB design objects\. With an iterator, you can control which objects on which layers and within specified regions\.

There are four different types of iterators; Board Iterator, Library Iterator, Spatial Iterator and Group Iterator\. The board iterator is for conducting searches on a PCB document, the library iterator on library documents, spatial iterators conducting searches within a restricted boundary on a document and the group iterator conducting searches for primitives within a group object such as tracks and arcs within a component object\.

The scripting system's Delphi Script doesn't support sets, therefore to pass in a set of layers or a set of objects, you need to use the __MkSet__ function to create a pseudo set of objects or layers for the __AddFilter\_ObjectSet__ or __AddFilterLayerSet__ procedures\.

__For example__  
BoardIterator\.AddFilter\_ObjectSet\(MkSet\(eTrackObject,eFillObject\)\);  
__See also__  
IPCB\_AbstractIterator interface  
IPCB\_BoardIterator interface  
IPCB\_LibraryIterator interface  
IPCB\_SpatialIterator interface  
IPCB\_GroupIterator interface

<a id="IPCB_AbstractIterator"></a>__IPCB\_AbstractIterator__

__Overview__  
An abstract iterator object interface which is the ancestor interface for a board, spatial, group and library Iterators\.  
An iterator object iterates through a PCB database representing the PCB document to fetch specified objects within a specified region on a specified layer if necessary\.  
__Notes__  
When using the DelphiScript language set in Scripts, you need to use the MkSet function to specify the object set or the layer set\. The __MkSet__ function creates a set of objects because the Delphiscript language does not support Object Pascal's sets\.  
__Methods__  
Function  I\_ObjectAddress     : TPCBObjectHandle;  
Function  FirstPCBObject      : IPCB\_Primitive;  
Function  NextPCBObject       : IPCB\_Primitive  
Procedure SetState\_FilterAll;  
Procedure AddFilter\_ObjectSet \(AObjectSet  : TObjectSet\);  
Procedure AddFilter\_LayerSet  \(ALayerSet   : TLayerSet\);  
Procedure AddFilter\_Area      \(X1,  
                               Y1,  
                               X2,  
                               Y2 : TCoord\);  
Procedure AddFilter\_AllLayers;  
__See also__  
IPCB\_BoardIterator interface  
IPCB\_LibraryIterator interface  
IPCB\_SpatialIterator interface  
IPCB\_Primitive interface  
TObjectSet set  
TObjectId enumerated values  
TLayerSet set  
TLayer enumerated values  
MkSet function

<a id="IPCB_BoardIterator"></a>__IPCB\_BoardIterator__

__Overview__  
The __IPCB\_BoardIterator__ iterates through a PCB document to fetch PCB design objects on this PCB\.  
With the iterator, you can control which objects on which layers and within specified regions with the __AddFilter\_ObjectSet__, __AddFilter\_LayerSet__ and __AddFilter\_Area__ methods to be fetched\.

The __AddFilter\_method__ controls how design objects are fetched\. The __TIterationMethod__ type has three different values; eProcessAll, eProcessFree, eProcessComponents\.

__Notes__  
The Delphiscript language set doesn't support sets, therefore to pass in a set of layers or a set of objects in a function in a script, you need to use the __MkSet__ function to create a pseudo set of objects or layers for the __AddFilter\_ObjectSet__ or __AddFilterLayerSet__ procedures\. For example __BoardIterator\.AddFilter\_ObjectSet\(MkSet\(eTrackObject,eFillObject\)\);__

__Methods__  
Function  I\_ObjectAddress  : TPCBObjectHandle;  
   
Function  FirstPCBObject   : IPCB\_Primitive;  
Function  NextPCBObject    : IPCB\_Primitive  
   
Procedure SetState\_FilterAll;  
   
Procedure AddFilter\_ObjectSet \(AObjectSet  : TObjectSet\);  
Procedure AddFilter\_LayerSet  \(ALayerSet   : TLayerSet\);  
Procedure AddFilter\_Area      \(X1,  
                               Y1,  
                               X2,  
                               Y2          : TCoord\);  
   
Procedure AddFilter\_AllLayers;  
Procedure AddFilter\_Method \(AMethod : TIterationMethod\);  
__Example__

01

Var

02

    BoardHandle : IPCB\_Board;

03

    Pad         : IPCB\_Primitive;

04

    Iterator    : IPCB\_BoardIterator;

05

    PadNumber   : Integer;

06

Begin

07

    // Retrieve the current board

08

    Board := PCBServer\.GetCurrentPCBBoard;

09

    If Board = Nil Then Exit;

10

  

11

    // Setup Board iterator

12

    Iterator        := Board\.BoardIterator\_Create;

13

    Iterator\.AddFilter\_ObjectSet\(MkSet\(ePadObject\)\);

14

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

15

    Iterator\.AddFilter\_Method\(eProcessAll\);

16

  

17

    PadNumber       := 0;

18

    // Search and count pads

19

    Pad := Iterator\.FirstPCBObject;

20

    While \(Pad <> Nil\) Do

21

    Begin

22

        Inc\(PadNumber\);

23

        Pad := Iterator\.NextPCBObject;

24

    End;

25

    Board\.BoardIterator\_Destroy\(Iterator\);

26

  

27

    // Display the count result on a dialog\.

28

    ShowMessage\('Pad Count = ' \+ IntToStr\(PadNumber\)\);

__See also__  
IPCB\_BoardIterator interface  
IPCB\_LibraryIterator interface  
IPCB\_SpatialIterator interface  
IPCB\_Primitive interface  
TObjectSet set  
TObjectId enumerated values  
TLayerSet set  
TLayer enumerated values  
TIterationMethod enumerated values  
MkSet function

<a id="IPCB_LibraryIterator"></a>__IPCB\_LibraryIterator__

__Overview__  
The __IPCB\_LibraryIterator__ object interface Iterates through a loaded PCB library in Altium Designer to fetch PCB footprints and its primitives\. The library iterator basically retrieves the footprints and to retrieve the child objects of each footprint, you need to employ the group iterator\.

The __IPCB\_LibraryIterator__ object interface iterates through a loaded PCB library in Altium Designer to fetch PCB footprints which are represented by the __IPCB\_LibComponent__ interfaces\. The __IPCB\_LibraryIterato__r interface is used in the __IPCB\_Library__ interface \- __LibraryIterator\_Create__ and __LibraryIterator\_Destroy__ methods\.

The current footprint is a component with an unnamed designator is represented by the __IPCB\_LibComponent__ interface\.

__Notes__

- The __IPCB\_LibraryIterator__ interface has only methods inherited from the __IPCB\_AbstractIterator__ interface and is reproduced here for reference\.
- A library is represented by the__ IPCB\_Library__ and the current footprint on a library document is represented by the __IPCB\_Board__ interface\.
- A PCB footprint \(from the library\) is represented by its __IPCB\_LibComponent__ interface which is inherited from the __IPCB\_Group__ object interface\.
- A PCB footprint is composed of child objects such as pads and tracks\. Therefore the footprint has its own __IPCB\_GroupIterator__ to fetch its own child objects\.
- DelphiScript doesn't support sets, therefore to pass in a set of layers or a set of objects, you need to use the __MkSet__ function to create a pseudo set of objects or layers for the __AddFilter\_ObjectSet__ or __AddFilterLayerSet__ procedures\. For example LibraryIterator\.AddFilter\_ObjectSet\(__MkSet__\(eTrackObject,eFillObject\)\);

__Methods__  
Function  I\_ObjectAddress  : TPCBObjectHandle;  
   
Function  FirstPCBObject   : IPCB\_Primitive;  
Function  NextPCBObject    : IPCB\_Primitive  
   
Procedure AddFilter\_ObjectSet \(AObjectSet  : TObjectSet\);  
Procedure AddFilter\_LayerSet  \(ALayerSet   : TLayerSet\);  
Procedure AddFilter\_Area      \(X1,Y1,X2,Y2 : TCoord\);  
Procedure AddFilter\_AllLayers;  
   
Procedure SetState\_FilterAll;  
__Example__

01

Procedure LookInsideFootprints;

02

Var

03

    CurrentLib        : IPCB\_Library;

04

    AObject           : IPCB\_Primitive;

05

    FootprintIterator : IPCB\_LibraryIterator;

06

    Iterator          : IPCB\_GroupIterator;

07

    Footprint         : IPCB\_LibComponent;

08

    FirstTime         : Boolean;

09

    NoOfPrims         : Integer;

10

    S                 : TString;

11

Begin

12

    CurrentLib := PCBServer\.GetCurrentLibrary;

13

    If CurrentLib = Nil Then

14

    Begin

15

        ShowMessage\('This is not a PCB library document'\);

16

        Exit;

17

    End;

18

  

19

    // For each page of library is a footprint

20

    FootprintIterator := CurrentLib\.LibraryIterator\_Create;

21

    FootprintIterator\.SetState\_FilterAll;

22

    S         := '';

23

    FirstTime := True;

24

    Try

25

        // Within each page, fetch primitives of the footprint

26

        // A footprint is a IPCB\_LibComponent inherited from

27

        // IPCB\_Group which is a container object storing primitives\.

28

        Footprint := FootprintIterator\.FirstPCBObject; // IPCB\_LibComponent

29

        While Footprint <> Nil Do

30

        Begin

31

           If FirstTime Then

32

           Begin

33

              S := S \+ ExtractFileName\(Footprint\.Board\.FileName\) \+ \#13;

34

              S := S \+ ' Current Footprint : ' \+ 

35

                   PCBServer\.GetCurrentComponent\(CurrentLib\)\+ \#13 \+ \#13;

36

           End;

37

  

38

           S := S \+ Footprint\.Name;

39

  

40

           Iterator := Footprint\.GroupIterator\_Create;

41

           Iterator\.SetState\_FilterAll;

42

           // Counts number of prims for each Footprint as a IPCB\_LibComponent

43

           // Note that the IPCB\_LibComponent has a GetPrimitiveCount method

44

           NoOfPrims := 0;

45

           AObject := Iterator\.FirstPCBObject;

46

           While \(AObject <> Nil\) Do

47

           Begin

48

               // counts child objects or primitives

49

               // for each footprint\.

50

               Inc\(NoOfPrims\);

51

               // do what you want with the AObject\.

52

               AObject := Iterator\.NextPCBObject;

53

           End;

54

           S := S \+ ' has ' \+ IntToStr\(NoOfPrims\) \+ ' Primitives\.' \+ \#13;

55

           FirstTime := False;

56

           Footprint\.GroupIterator\_Destroy\(Iterator\);

57

           Footprint := FootprintIterator\.NextPCBObject;

58

        End;

59

    Finally

60

        CurrentLib\.LibraryIterator\_Destroy\(FootprintIterator\);

61

    End;

62

    ShowMessage\(S\);

63

End;

__See also__  
IPCB\_BoardIterator interface  
IPCB\_SpatialIterator interface  
IPCB\_GroupIterator interface  
IPCB\_Primitive interface  
TObjectSet set  
TObjectId enumerated values  
TLayerSet set  
TLayer enumerated values  
TIterationMethod enumerated values  
MkSet function  
LibraryIterator example from \\Examples\\Scripts\\DelphiScript\\PCB\\ folder\.

<a id="IPCB_SpatialIterator"></a>__IPCB\_SpatialIterator__

__Overview__  
The IPCB\_SpatialIterator interface iterates through a defined region on the loaded PCB document in Altium Designer to fetch PCB design objects\.

You will need to specify the object set, the layer set and the area for the spatial iterator to conduct its search within a defined boundary\. The following methods are AddFilter\_ObjectSet, AddFilter\_LayerSet and AddFilter\_Area\.

__Notes__

- __IPCB\_SpatialIterator__ has only methods inherited from the __IPCB\_AbstractIterator__ interface and is reproduced here for reference\.
- Delphiscript doesn't support sets, therefore to pass in a set of layers or a set of objects, you need to use the __MkSet__ function to create a pseudo set of objects or layers for the AddFilter\_ObjectSet or AddFilterLayerSet procedures\. For example SpatialIterator\.AddFilter\_ObjectSet\(__MkSet__\(eTrackObject,eFillObject\)\);

__Methods \(inherited from IPCB\_AbstractIterator\)__  
Function  I\_ObjectAddress  : TPCBObjectHandle;  
   
Function  FirstPCBObject  : IPCB\_Primitive;  
Function  NextPCBObject   : IPCB\_Primitive  
   
Procedure AddFilter\_ObjectSet  \(AObjectSet  : TObjectSet\);  
Procedure AddFilter\_LayerSet   \(ALayerSet   : TLayerSet\);  
Procedure AddFilter\_Area       \(X1,  
                                Y1,  
                                X2,  
                                Y2 : TCoord\);  
   
Procedure AddFilter\_AllLayers;  
   
Procedure SetState\_FilterAll;  
__Example__

01

    \(\* Top/Bottom Layers and Arc/Track objects defined \*\)

02

    \(\* for the Spatial iterator constraints \*\)

03

    ASetOfLayers  := MkSet\(eTopLayer,eBottomLayer\);

04

    ASetOfObjects := MkSet\(eArcObject,eTrackObject\);

05

  

06

    Iterator := Board\.SpatialIterator\_Create;

07

    Iterator\.AddFilter\_ObjectSet\(ASetOfObjects\);

08

    Iterator\.AddFilter\_LayerSet\(ASetOfLayers\);

09

    Iterator\.AddFilter\_Area\(X1,Y1,X2,Y2\);

10

  

11

    \(\* Iterate for tracks and arcs on bottom/top layers \*\)

12

    PCBObject := Iterator\.FirstPCBObject;

13

    While PCBObject <> 0 Do

14

    Begin

15

         PCBObject\.Selected := True;

16

         PCBObject := Iterator\.NextPCBObject;

17

    End;

18

    Board\.SpatialIterator\_Destroy\(Iterator\);

__See also__  
IPCB\_BoardIterator interface  
IPCB\_LibraryIterator interface  
IPCB\_GroupIterator interface\.  
IPCB\_Primitive interface  
TObjectSet set  
TObjectId enumerated values  
TLayerSet set  
TLayer enumerated values  
TIterationMethod enumerated values  
MkSet function  
Spatial iterator script in \\Examples\\Scripts\\PCB\\ folder\.

<a id="IPCB_GroupIterator"></a>__IPCB\_GroupIterator__

__Overview__  
The__ IPCB\_GroupIterator__ interface deals with group objects such as board layouts, polygons, components, footprints in a PCB library, coordinates and dimensions that have child objects within\.

When you need to fetch child objects of a group object such as tracks and arcs of a footprint in a PCB library, you need to create a Group Iterator for that group object\.

The sequence is basically as follows:

- Set up a board iterator to fetch design objects from the PCB/Library document
- For each design object that is a group object \(such as polygons and components\), setup a group iterator and fetch child objects for that group object\.
- Destroy the group iterator when finished iterating child objects for that group object
- Destroy the board/library iterator when finished iterating

__Notes__

- IPCB\_GroupIterator has methods inherited from the IPCB\_AbstractIterator interface and is reproduced here for reference\.
- Delphiscript does not support sets, therefore to pass in a set of layers or a set of objects, you need to use the MkSet function to create a pseudo set of objects or layers for the AddFilter\_ObjectSet or AddFilterLayerSet procedures\.
- For example LibraryIterator\.AddFilter\_ObjectSet\(__MkSet__\(eTrackObject,eFillObject\)\);

__Methods__  
Function  I\_ObjectAddress    : TPCBObjectHandle;  
Function  FirstPCBObject     : IPCB\_Primitive;  
Function  NextPCBObject      : IPCB\_Primitive  
Procedure AddFilter\_ObjectSet  \(AObjectSet  : TObjectSet\);  
Procedure AddFilter\_LayerSet   \(ALayerSet   : TLayerSet\);  
Procedure AddFilter\_Area       \(X1,  
                                Y1,  
                                X2,  
                                Y2 : TCoord\);  
Procedure AddFilter\_AllLayers;  
Procedure SetState\_FilterAll;  
__Example__

01

Procedure CountTracks;

02

Var

03

    Track             : IPCB\_Track;

04

    ChildIterator     : IPCB\_GroupIterator;

05

    Component         : IPCB\_Component;

06

    ComponentIterator : IPCB\_BoardIterator;

07

    TrackCount        : Integer;

08

Begin

09

    TrackCount     := 0;

10

    If PCBServer\.GetCurrentPCBBoard = Nil Then Exit;

11

  

12

    // Create a board iterator to fetch a component\.

13

    ComponentIteratorHandle := PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Create;

14

    ComponentIteratorHandle\.AddFilter\_ObjectSet\(MkSet\(eComponentObject\)\);

15

  

16

    If Component <> Nil Then

17

    Begin

18

        // Create an iterator from the component to fetch

19

        // its child objects\.

20

        ChildIterator := Component\.GroupIterator\_Create;

21

        ChildIterator\.AddFilter\_ObjectSet\(MkSet\(eTrackObject\)\);

22

        ChildIterator\.AddFilter\_LayerSet\(MkSet\(eTopOverlay\)\);

23

        Track := ChildIterator\.FirstPCBObject;

24

        While \(Track <> Nil\) Do

25

        Begin

26

            Inc\(TrackCount\);

27

            Track := ChildIterator\.NextPCBObject;

28

        End;

29

  

30

        ShowInfo\('This component ' \+ Component\.SourceDesignator  \+ 

31

                 ' has ' \+  IntToStr\(TrackCount\)  \+ ' tracks\.'\);

32

        // When finished iterating component's child objects, 

33

        // destroy the component's        group iterator\.

34

        Component\.GroupIterator\_Destroy\(TrackIterator\);

35

    End;

36

    // when finished iterating on PCB document, destroy the board iterator\.

37

    PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Destroy\(ComponentIterator\);

38

End;

__See also__  
IPCB\_BoardIterator interface  
IPCB\_LibraryIterator interface  
IPCB\_SpatialIterator interface  
IPCB\_Primitive interface  
TObjectSet set  
TObjectId enumerated values  
TLayerSet set  
TLayer enumerated values  
TIterationMethod enumerated values  
MkSet function  
LibraryIterator script example  
CountTracksInComponent script example

## 子章节

- [<a id="IPCB_LayerObject"></a>IPCB\_LayerObject](01-a_id_IPCB_LayerObject_a_IPCB_LayerObject.md.md)
- [<a id="IPCB_LayerObject_V7"></a>IPCB\_LayerObject\_V7](02-a_id_IPCB_LayerObject_V7_a_IPCB_LayerObject_V7.md.md)
- [<a id="IPCB_MechanicalLayer"></a>IPCB\_MechanicalLayer](03-a_id_IPCB_MechanicalLayer_a_IPCB_MechanicalLayer.md.md)
- [<a id="IPCB_DielectricLayer"></a>IPCB\_DielectricLayer](04-a_id_IPCB_DielectricLayer_a_IPCB_DielectricLayer.md.md)
- [<a id="IPCB_DielectricObject"></a>IPCB\_DielectricObject](05-a_id_IPCB_DielectricObject_a_IPCB_DielectricObject.md.md)
- [<a id="IPCB_SolderMaskLayer"></a>IPCB\_SolderMaskLayer](06-a_id_IPCB_SolderMaskLayer_a_IPCB_SolderMaskLayer.md.md)
- [<a id="IPCB_OverlayLayer"></a>IPCB\_OverlayLayer](07-a_id_IPCB_OverlayLayer_a_IPCB_OverlayLayer.md.md)
- [<a id="IPCB_PasteMaskLayer"></a>IPCB\_PasteMaskLayer](08-a_id_IPCB_PasteMaskLayer_a_IPCB_PasteMaskLayer.md.md)
- [<a id="IPCB_SignalLayer"></a>IPCB\_SignalLayer](09-a_id_IPCB_SignalLayer_a_IPCB_SignalLayer.md.md)
- [<a id="IPCB_InternalPlane"></a>IPCB\_InternalPlane](10-a_id_IPCB_InternalPlane_a_IPCB_InternalPlane.md.md)
- [<a id="IPCB_InternalPlane_V7"></a>IPCB\_InternalPlane\_V7](11-a_id_IPCB_InternalPlane_V7_a_IPCB_InternalPlane_V7.md.md)
- [<a id="IPCB_DrillLayerPair"></a>IPCB\_DrillLayerPair](12-a_id_IPCB_DrillLayerPair_a_IPCB_DrillLayerPair.md.md)
- [<a id="IPCB_MechanicalLayerPairs"></a>IPCB\_MechanicalLayerPairs](13-a_id_IPCB_MechanicalLayerPairs_a_IPCB_MechanicalLayerPairs.md.md)
