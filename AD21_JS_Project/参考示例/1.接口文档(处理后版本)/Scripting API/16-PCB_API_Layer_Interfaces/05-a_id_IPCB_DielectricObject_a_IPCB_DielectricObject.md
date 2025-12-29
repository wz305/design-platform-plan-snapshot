### <a id="IPCB_DielectricObject"></a>IPCB\_DielectricObject

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

#### <a id="IPCB_DielectricObject_methods"></a>IPCB\_DielectricObject methods

All methods inherited from the IPCB\_LayerObject interface\. See [IPCB\_LayerObject methods](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject methods)\.

#### <a id="IPCB_DielectricObject_properties"></a>IPCB\_DielectricObject properties

##### Name property

\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.

##### UsedByPrims property

\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.

##### DielectricMaterial property

__Syntax__  
Property  DielectricMaterial : TPCBString;  
__Read/Write syntax__  
GetState\_DielectricMaterial;  
SetState\_DielectricMaterial;  
__Description__  
The DielectricMaterial property determines the dielectric material type for the current dielectric layer, such as FR\-4, Solder Resist, Polyamide etc\.

##### DielectricType property

__Syntax__  
Property  DielectricType : TDielectricType;  
__Read/Write syntax__  
GetState\_DielectricType;  
SetState\_DielectricType;  
__Description__  
The DielectricType property determines the dielectric type for the current dielectric layer\. It returns a TDielectricType type string such as eCore or ePrePreg \(or a type number equivalent\)\.

##### DielectricConstant property

__Syntax__  
Property  DielectricConstant : TReal;  
__Read/Write syntax__  
GetState\_DielectricConstant;  
SetState\_DielectricConstant;  
__Description__  
The DielectricConstant property defines the dielectric constant rating for the current dielectric layer\.

##### DielectricHeight property

__Syntax__  
Property  DielectricHeight : TCoord  
__Read/Write syntax__  
GetState\_DielectricHeight;  
SetState\_DielectricHeight;  
__Description__  
The DielectricHeight property determines the dielectric material height \(thickness\) of the current dielectric layer in Tcood units\.