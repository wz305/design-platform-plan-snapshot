#### <a id="IPCB_MechanicalLayer_properties"></a>IPCB\_MechanicalLayer properties

##### Name property

\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.

##### UsedByPrims property

\- see [IPCB\_LayerObject properties](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_LayerObject properties)\.

##### MechanicalLayerEnabled property

__Syntax__  
Property  MechanicalLayerEnabled : Boolean;  
__Read/Write syntax__  
GetState\_MechLayerEnabled;  
SetState\_MechLayerEnabled;  
__Description__  
The MechanicalLayerEnabled property determines if this mechanical layer is enabled for the current PCB document\. Mechanical layers that already have design objects on them cannot be disabled\.

##### LinkToSheet property

__Syntax__  
Property  LinkToSheet : Boolean;  
__Read/Write syntax__  
GetState\_LinkToSheet;  
SetState\_LinkToSheet;  
__Description__  
This property determines if this mechanical layer is linked to the sheet on the PCB document\. Once a sheet is linked to the mechanical layer, the sheet is automatically resized to fit the objects on the linked layer when a zoom command is executed\.

##### DisplayInSingleLayerMode property

__Syntax__  
Property  DisplayInSingleLayerMode : Boolean;  
__Read/Write syntax__  
GetState\_DisplayInSingleLayerMode;  
SetState\_DisplayInSingleLayerMode;  
__Description__  
This property determines if the document is displayed in the single layer mode\. When set to True the system's single layer mode setting is overridden, so design objects on mechanical layers where the single layer mode is enabled will show up in the single layer mode\.

### <a id="IPCB_DielectricLayer"></a>IPCB\_DielectricLayer

All methods inherited from the [IPCB\_DielectricObject](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21#IPCB_DielectricObject) interface — see below\.

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