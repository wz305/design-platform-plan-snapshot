#### Properties

##### AutomaticSplitPlanes property

\(IPCB\_Board interface\)  
__Syntax__  
Property  AutomaticSplitPlanes : Boolean Read GetState\_AutomaticSplitPlanes  Write SetState\_AutomaticSplitPlanes;  
__Description__  
The AutomaticSplitPlanes property returns you the boolean value whether the split planes are system generated automatically or not\. This property is implemented by its GetState\_AutomaticSplitPlanes and SetState\_AutomaticSplitPlanes methods\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### BigVisibleGridSize property

\(IPCB\_Board interface\)  
__Syntax__  
BigVisibleGridSize : TReal Read GetState\_BigVisibleGridSize    Write SetState\_BigVisibleGridSize;  
__Description__  
This property retrieves or sets the Big Visible Grid Size in __TReal__ type\. This Grid Size is used for reference purposes and there are two visible grids\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
VisibleGridSize property

##### BigVisibleGridUnit property

\(IPCB\_Board interface\)  
__Syntax__  
Property  BigVisibleGridUnit : TUnit Read GetState\_BigVisibleGridUnit    Write SetState\_BigVisibleGridUnit;  
__Description__  
This property retrieves or sets the big visible grid's measurement units in Imperial or Metric units\. There are two visible grids to use for reference purposes\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
VisibleGridUnit property  
TUnit type

##### BoardOutline property

\(IPCB\_Board interface\)  
__Syntax__  
Property  BoardOutline : IPCB\_BoardOutline Read GetState\_BoardOutline;  
__Description__  
The Board Outline represents the board outline which encompasses a board design on a PCB document\. The board outline is represented by the __IPCB\_BoardOutline__ interface and inherited from the__ IPCB\_Polygon__ interface because the Board Outline is composed of vertices \(tracks and arcs only\)\.  
__Example__

01

Var

02

    PCB\_Board : IPCB\_Board;

03

    BR        : TCoordRect;

04

Begin

05

    PCB\_Board := PCBServer\.GetCurrentPCBBoard;

06

    If PCB\_Board = Nil Then Exit;

07

    If PCB\_Board\.IsLibrary Then Exit;

08

  

09

    PCB\_Board\.BoardOutline\.Invalidate;

10

    PCB\_Board\.BoardOutline\.Rebuild;

11

    PCB\_Board\.BoardOutline\.Validate;

12

    BR := PCB\_Board\.BoardOutline\.BoundingRectangle;

13

  

14

    // refresh board outline

15

    PCB\_Board\.UdateBoardOutline;

16

End;

__See also__  
IPCB\_Board interface  
IPCB\_BoardOutline interface

##### ComponentGridSize property

\(IPCB\_Board interface\)  
__Syntax__  
Property  ComponentGridSize : TDouble Read GetState\_ComponentGridSize     Write SetState\_ComponentGridSize;  
__Description__  
This property represents the component grid size for components to be accurately placed on\. This component grid size sets the X and Y values simultaneously\. If you wish to define different X and Y grid sizes, then use the ComponentGridSizeX and ComponentGridSizeY properties\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
ComponentGridSizeX property  
ComponentGridSizeY property  
TDouble type

##### ComponentGridSizeX

\(IPCB\_Board interface\)  
__Syntax__  
Property  ComponentGridSizeX : TDouble Read GetState\_ComponentGridSizeX Write SetState\_ComponentGridSizeX;  
__Description__  
This property represents the component grid size for components to be accurately placed on\. To define different X and Y grid sizes, use the __ComponentGridSizeX__ and __ComponentGridSizeY__ properties, otherwise to set the same values for the component grid sizes X and Y simultaneously\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
ComponentGridSize  
ComponentGridSizeY

##### ComponentGridSizeY property

\(IPCB\_Board interface\)  
__Syntax__  
Property  ComponentGridSizeY : TDouble Read GetState\_ComponentGridSizeY Write SetState\_ComponentGridSizeY;  
__Description__  
This property represents the component grid size for components to be accurately placed on\. To define different X and Y grid sizes, use the __ComponentGridSizeX__ and __ComponentGridSizeY__ properties, otherwise to set the same values for the component grid sizes X and Y simultaneously\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### CurrentLayer property

\(IPCB\_Board interface\)  
__Syntax__  
Property  CurrentLayer : TLayer Read GetState\_CurrentLayer;  
__Description__  
This property denotes the current PCB layer being displayed in the PCB workspace in Altium Designer\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### DisplayUnit property

\(IPCB\_Board interface\)  
__Syntax__  
Property DisplayUnit : TUnit Read GetState\_DisplayUnit Write SetState\_DisplayUnit;  
__Description__  
This property retrieves or sets the measurement units for the PCB document display purposes in Imperial or Metric units\.  
__Example__

1

Var

2

    Board : IPCB\_Board;

3

Begin

4

    Board := PCBServer\.GetCurrentPCBBoard;

5

    If Board = Nil Then Exit;

6

    ShowMessage\('Board Filename =' \+ Board\.FileName \+ \#13 \+

7

                'Board Units = '   \+ UnitToString\(Board\.DisplayUnit\)\);

8

End;

__See also__  
IPCB\_Board interface  
UnitToString function

##### DrawDotGrid property

\(IPCB\_Board interface\)  
__Syntax__  
Property  DrawDotGrid : Boolean Read GetState\_DrawDotGrid Write SetState\_DrawDotGrid;  
__Description__  
This property denotes whether the grid has dotted or continuous lines\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### DrillLayersPairsCount property

\(IPCB\_Board interface\)  
__Syntax__  
Property  DrillLayerPairsCount : Integer Read GetState\_DrillLayerPairsCount;  
__Description__  
This property returns the number of drill layer pairs for the board\. A drill layer pair is represented by the __IPCB\_DrillLayerPair__ interface\.  
__Example__

01

Var

02

    PCBBoard     : IPCB\_Board;

03

    i            : Integer;

04

    LayerPairs   : TStringList;

05

    PCBLayerPair : IPCB\_DrillLayerPair;

06

    LowLayerObj  : IPCB\_LayerObject;

07

    HighLayerObj : IPCB\_LayerObject;

08

  

09

    LowPos       : Integer;

10

    HighPos      : Integer;

11

    LS           : String;

12

Begin

13

    PCBBoard := PCBServer\.GetCurrentPCBBoard;

14

    If PCBBoard = Nil Then Exit;

15

  

16

    For i := 0 To PCBBoard\.DrillLayerPairsCount \- 1 Do

17

    Begin

18

        PCBLayerPair := PCBBoard\.LayerPair\[i\];

19

        LowLayerObj  := PCBBoard\.LayerStack\.LayerObject\[PCBLayerPair\.LowLayer\];

20

        HighLayerObj := PCBBoard\.LayerStack\.LayerObject\[PCBLayerPair\.HighLayer\];

21

  

22

        // do what you want with the LowLayerObj and HighLayerObj objects

23

    End;

24

End;

__See also__  
IPCB\_Board interface  
LayerPair property  
IPCB\_DrillLayerPair interface

##### FileName property

\(IPCB\_Board interface\)  
__Syntax__  
Property  FileName : TPCBString Read GetState\_FileName;  
__Description__  
The FileName property denotes the filename of the PCB document that the __IPCB\_Board__ interface is associated with\. The Filename property is read only, which means you can retrieve the filename string only\.  
__Example__

1

Var

2

    Board : IPCB\_Board;

3

Begin

4

    Board := PCBServer\.GetCurrentPCBBoard;

5

    If Board = Nil Then Exit;

6

    ShowMessage\('Board Filename =' \+ Board\.FileName \+ \#13 \+

7

                'Board Units = '   \+ UnitToString\(Board\.DisplayUnit\)\);

8

End;

__See also__  
IPCB\_Board interface

##### InternalPlane1NetName property

\(IPCB\_Board interface\)  
__Syntax__  
Property  InternalPlane1NetName : TPCBString Read GetState\_InternalPlane1NetName Write SetState\_InternalPlane1NetName;  
__Description__  
This property represents the Internal Plane 1 Netname \(for P99SE and earlier products\)\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_LayerStack interface\.

##### InternalPlane2NetName property

\(IPCB\_Board interface\)  
__Syntax__  
Property  InternalPlane2NetName             : TPCBString                 Read GetState\_InternalPlane2NetName Write SetState\_InternalPlane2NetName;  
__Description__  
This property represents the Internal Plane 2 Netname \(for P99SE and earlier products\)\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_LayerStack interface\.

##### InternalPlane3NetName property

\(IPCB\_Board interface\)  
__Syntax__  
Property  InternalPlane3NetName             : TPCBString                 Read GetState\_InternalPlane3NetName Write SetState\_InternalPlane3NetName;  
__Description__  
This property represents the Internal Plane 3 Netname \(for P99SE and earlier products\)\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_LayerStack interface\.

##### InternalPlane4NetName

\(IPCB\_Board interface\)  
__Syntax__  
Property  InternalPlane4NetName : TPCBString Read GetState\_InternalPlane4NetName Write SetState\_InternalPlane4NetName;  
__Description__  
This property represents the Internal Plane 1 Netname \(for P99SE and earlier products\)\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_LayerStack interface\.

##### InternalPlaneNetName property

\(IPCB\_Board interface\)  
__Syntax__  
Property  InternalPlaneNetName \[L : TLayer\] : TPCBString Read GetState\_InternalPlaneNetName  Write SetState\_InternalPlaneNetName;  
__Description__  
This property returns or sets the net name for the targetted internal plane\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
TLayer type

##### LayerColor property

\(IPCB\_Board interface\)  
__Syntax__  
Property  LayerColor \[L : TLayer\] : TColorRef Read GetState\_LayerColor;  
__Description__  
This property returns the layer color of TColorRef type\. This type is defined in the Windows\.pas which is part of the Borland Delphi Run\-Time Library\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
TColorRef type

##### LayerIsDisplayed property

\(IPCB\_Board interface\)  
__Syntax__  
Property  LayerIsDisplayed     \[L : TLayer\] : Boolean Read GetState\_LayerIsDisplayed      Write SetState\_LayerIsDisplayed;  
__Description__  
The __LayerIsDisplayed__ property controls the display of layers for the PCB document\. You can fetch or set the  
__Example__

1

PCBBoard := PCBServer\.GetCurrentPCBBoard;

2

If PCBBoard = Nil Then Exit;

3

  

4

// Check for each signal layer for used/display setting

5

For Layer := eTopLayer to eMultiLayer Do

6

    If PCBBoard\.LayerIsUsed\[Layer\] Then

7

        If PCBBoard\.LayerIsDisplayed\[Layer\] Then

8

            \\\\ do something

__See also__  
IPCB\_Board interface

##### LayerIsUsed property

\(IPCB\_Board interface\)  
__Syntax__  
Property  LayerIsUsed \[L : TLayer\] : Boolean Read GetState\_LayerIsUsed Write SetState\_LayerIsUsed;  
__Description__  
This property retrieves or sets the boolean value for whether the layer is used by primitives or not\. Normally when a layer has primitives \(design objects\) on it, the layer is used\.  
__Example__

1

PCBBoard := PCBServer\.GetCurrentPCBBoard;

2

If PCBBoard = Nil Then Exit;

3

  

4

// Check for each signal layer for used/display setting

5

For Layer := eTopLayer to eMultiLayer Do

6

    If PCBBoard\.LayerIsUsed\[Layer\] Then

7

        If PCBBoard\.LayerIsDisplayed\[Layer\] Then

8

            \\\\ do something

9

  

__See also__  
IPCB\_Board interface

##### LayerPair property

\(IPCB\_Board interface\)  
__Syntax__  
Property  LayerPair \[I : Integer\] : IPCB\_DrillLayerPair        Read GetState\_LayerPair;  
__Description__  
This property returns you the layer pair associated with the IPCB\_DrillLayerPair interface\. A drill layer pair has two drill layers\.  
__Example__

01

Var

02

    PCBBoard     : IPCB\_Board;

03

    i            : Integer;

04

    LayerPairs   : TStringList;

05

    PCBLayerPair : IPCB\_DrillLayerPair;

06

    LowLayerObj  : IPCB\_LayerObject;

07

    HighLayerObj : IPCB\_LayerObject;

08

    LowPos       : Integer;

09

    HighPos      : Integer;

10

    LS           : String;

11

Begin

12

    PCBBoard := PCBServer\.GetCurrentPCBBoard;

13

    If PCBBoard = Nil Then Exit;

14

  

15

    // Show the Current Layer for the PCB document\.

16

    ShowInfo\('Current Layer: ' \+ Layer2String\(PCBBoard\.CurrentLayer\)\);

17

  

18

    LayerPairs := TStringList\.Create;

19

    For i := 0 To PCBBoard\.DrillLayerPairsCount \- 1 Do

20

    Begin

21

        PCBLayerPair := PCBBoard\.LayerPair\[i\];

22

        LowLayerObj  := PCBBoard\.LayerStack\.LayerObject\[PCBLayerPair\.LowLayer\];

23

        HighLayerObj := PCBBoard\.LayerStack\.LayerObject\[PCBLayerPair\.HighLayer\];

24

  

25

        LowPos       := PCBBoard\.LayerPositionInSet\(SignalLayers \+ InternalPlanes, LowLayerObj\);

26

        HighPos      := PCBBoard\.LayerPositionInSet\(SignalLayers \+ InternalPlanes, HighLayerObj\);

27

        If LowPos <= HighPos Then

28

            LayerPairs\.Add\(LowLayerObj \.Name \+ ' \- ' \+ HighLayerObj\.Name\)

29

        Else

30

            LayerPairs\.Add\(HighLayerObj\.Name \+ ' \- ' \+ LowLayerObj \.Name\);

31

    End;

32

  

33

   // Display layer pairs\.

34

    LS := '';

35

    For i := 0 to LayerPairs\.Count \- 1 Do

36

        LS := LS \+ LayerPairs\[i\] \+ \#13\#10;

37

  

38

    ShowInfo\('Layer Pairs:'\#13\#10 \+ LS\);

39

    LayerPairs\.Free;

40

End;

__See also__  
IPCB\_Board interface

##### LayerStack property

\(IPCB\_Board interface\)  
__Syntax__  
Property  LayerStack : IPCB\_LayerStack Read GetState\_LayerStack;  
__Description__  
The layer stack property fetches the __IPCB\_LayerStack__ interface for the current PCB document\. The Layer stack only stores copper layers \(signal and internal planes\)\.  
__Example__

01

Var

02

    PCBBoard      : IPCB\_Board;

03

    TheLayerStack : IPCB\_LayerStack;

04

    i             : Integer;

05

    LayerObj      : IPCB\_LayerObject;

06

    LS            : String;

07

Begin

08

    PCBBoard := PCBServer\.GetCurrentPCBBoard;

09

    If PCBBoard = Nil Then Exit;

10

  

11

    // Note that the Layer stack only stores existing copper based layers\.

12

    // But you can use the LayerObject property to fetch all layers\.

13

    TheLayerStack := PCBBoard\.LayerStack;

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

__See also__  
IPCB\_LayerStack interface  
IPCB\_LayerObject interface  
IPCB\_Board interface

##### MechanicalPairs property

\(IPCB\_Board interface\)  
__Syntax__  
Property  MechanicalPairs : IPCB\_MechanicalLayerPairs  Read GetState\_MechanicalPairs;  
__Description__  
There are 16 general purpose mechanical layers for defining the board layout, placing dimensions on, including fabrication details on, or any other mechanical details the design requires\.

The purpose of the __IPCB\_MechanicalLayerPairs__ Interface is to provide which Mechanical layers are paired to one another\.

When a component incorporates objects on one or more Mechanical layers which have been paired, the Layer property of those objects changes when the Layer property of the component is toggled \(between the Top and Bottom layers\), just like objects on the non\-Mechanical layers which have always been paired to one another, along with the Top and Bottom \(copper\) layers, the Top and Bottom Overlay layers, the Top and Bottom Paste Mask layers, and the Top and Bottom Solder Mask layers\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_MechanicalPairs interface

##### PCBSheet property

\(IPCB\_Board interface\)  
__Syntax__  
Property PCBSheet : IPCB\_Sheet Read GetState\_PCBSheet;  
__Description__  
This property returns the IPCB\_Sheet interface which is represented by the sheet workspace\. A sheet encapsulates the sheet borders, the fabrication and assembly information, and the board outline\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_Sheet interface

##### PCBWindow property

\(IPCB\_Board interface\)  
__Syntax__  
Property  PCBWindow : HWND Read GetState\_Window;  
__Description__  
This property returns the raw Windows handle for a window handle of a PCB document in Altium Designer\.  
__Example__  
   
__See also__  
IPCB\_Board interface

#####  SelectecObjectCount property

\(IPCB\_Board interface\)  
__Syntax__  
Property  SelectecObjectCount : Integer Read GetState\_SelectecObjectCount;  
__Description__  
This property represents the number of selected objects found on the PCB document\. This is to be used in conjunction with the SelectecObject property\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
SelectecObject property

#####  SelectecObject property

\(IPCB\_Board interface\)  
__Syntax__  
Property  SelectecObject \[I : Integer\] : IPCB\_Primitive Read GetState\_SelectecObject;  
__Description__  
This property represents the indexed selected object found on the PCB document\. This is to be used in conjunction with the SelectecObjectCount property\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
SelectecObjectCount property

##### PrimitiveCounter method

\(IPCB\_Board interface\)  
__Syntax__  
Property  PrimitiveCounter : IPCB\_PrimitiveCounter Read GetPrimitiveCounter;  
__Description__  
The IPCB\_PrimitiveCounter interface gives you the means of obtaining the object count, hole count and string count for the focussed PCB document via the IPCB\_Board's PrimitiveCounter property\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
GetPrimitiveCounter method  
IPCB\_PrimitiveCounter interface

##### SnapGridSizeX

\(IPCB\_Board interface\)  
__Syntax__  
Property  SnapGridSizeX : TDouble Read GetState\_SnapGridSizeX Write SetState\_SnapGridSizeX;  
__Description__  
This property retrieves or sets the Snap Grid size X value\. To set both X and Y values simultaneously for the Snap Grid, use the __SnapGridSize__ property\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
SnapGridSizeY property  
SnapGridSize property

##### SnapGridSizeY property

\(IPCB\_Board interface\)  
__Syntax__  
Property  SnapGridSizeY : TDouble Read GetState\_SnapGridSizeY Write SetState\_SnapGridSizeY;  
__Description__  
This property retrieves or sets the Snap Grid size Y value\. To set both X and Y values simultaneously for the Snap Grid, use the __SnapGridSize__ property\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
SnapGridSizeX property  
SnapGridSize property

##### SnapGridSize property

\(IPCB\_Board interface\)  
__Syntax__  
Property  SnapGridSize : TDouble Read GetState\_SnapGridSize Write SetState\_SnapGridSize;  
__Description__  
The SnapGridSize property sets the X and Y values for the Snap Grid simultaneously\. If you want to have different X and Y values for this snap grid, use the SnapGridSizeX and SnapGridSizeY properties\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
SnapGridSizeX property  
SnapGridSizeY property

##### SnapGridUnit property

\(IPCB\_Board interface\)  
__Syntax__  
Property  SnapGridUnit : TUnit Read GetState\_SnapGridUnit Write SetState\_SnapGridUnit;  
__Description__  
The SnapGridUnit property retrieves or sets the measurement unit for the Snap Grid Unit\. It can be in Imperial or Metric units\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
TUnit type

##### TrackGridSize property

\(IPCB\_Board interface\)  
__Syntax__  
Property  TrackGridSize : TDouble  Read GetState\_TrackGridSize Write SetState\_TrackGridSize;  
__Description__  
This property retrieves or sets the track grid size in both X and Y directions simultaneously\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
ViaGridSize property

##### ViaGridSize property

\(IPCB\_Board interface\)  
__Syntax__  
Property ViaGridSize : TDouble Read GetState\_ViaGridSize  Write SetState\_ViaGridSize;  
__Description__  
This property retrieves or sets the via grid size in both X and Y directions simultaneously\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
TrackGridSize property

##### VisibleGridSize property

\(IPCB\_Board interface\)  
__Syntax__  
Property  VisibleGridSize : TReal Read GetState\_VisibleGridSize Write SetState\_VisibleGridSize;  
__Description__  
This property retrieves or sets the Visible Grid Size in TReal type\. This Grid Size is used for reference purposes and there are two visible grids\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
BigVisibleGridSize property

##### VisibleGridUnit property

\(IPCB\_Board interface\)  
__Syntax__  
Property  VisibleGridUnit : TUnit Read GetState\_VisibleGridUnit Write SetState\_VisibleGridUnit;  
__Description__  
This property retrieves or sets the big visible grid's measurement units in Imperial or Metric units\. There are two visible grids to use for reference purposes\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
BigVisibleGridUnit interface  
TUnit type

##### XOrigin property

\(IPCB\_Board interface\)  
__Syntax__  
Property  XOrigin : TCoord  Read GetState\_XOrigin Write SetState\_XOrigin;  
__Description__  
This property sets or retrieves the X coordinate of the absolute origin of the board\.  
__Example__  
__See also__  
IPCB\_Board interface

##### XCursor property

\(IPCB\_Board interface\)  
__Syntax__  
Property  XCursor : TCoord Read GetState\_XCursor  Write SetState\_XCursor;  
__Description__  
This property retrieves or sets the x coordinate of the cursor of the latest mouse click on the PCB document\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### YCursor property

\(IPCB\_Board interface\)  
__Syntax__  
Property  YCursor : TCoord Read GetState\_YCursor Write SetState\_YCursor;  
__Description__  
This property retrieves or sets the Y coordinate of the cursor of the latest mouse click on the PCB document\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### YOrigin property

\(IPCB\_Board interface\)  
__Syntax__  
Property  YOrigin : TCoord Read GetState\_YOrigin Write SetState\_YOrigin;  
__Description__  
This property sets or retrieves the Y coordinate of the absolute origin of the board\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### ECOOptions property

\(IPCB\_Board interface\)  
__Syntax__  
Property  ECOOptions : IPCB\_ECOOptions Read GetState\_ECOOptions;  
__Description__  
This property returns you the IPCB\_ECOOptions interface which represents the Options for the Engineering Order Change facility in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_ECOOptions interface

##### GerberOptions property

\(IPCB\_Board interface\)  
__Syntax__  
Property  GerberOptions : IPCB\_GerberOptions Read GetState\_GerberOptions;  
__Description__  
This property returns you the IPCB\_GerberOptions interface which represents the Options for the Gerbers facility in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_GerberOptions interface

##### PlacerOptions property

\(IPCB\_Board interface\)  
__Syntax__  
Property  PlacerOptions : IPCB\_AdvancedPlacerOptions Read GetState\_PlacerOptions;  
__Description__  
This property returns you the IPCB\_PlacerOptions interface which represents the Options for the Placement facility in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_PlacerOptions interface

##### PrinterOptions property

\(IPCB\_Board interface\)  
__Syntax__  
Property  PrinterOptions : IPCB\_PrinterOptions Read GetState\_PrinterOptions;  
__Description__  
This property returns you the IPCB\_PrinterOptions interface which represents the Options for the Printer setup facility in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_PrinterOptions interface

##### OutputOptions property

\(IPCB\_Board interface\)  
__Syntax__  
Property  OutputOptions : IPCB\_OutputOptions Read GetState\_OutputOptions;  
__Description__  
This property returns you the IPCB\_OutputOptions interface which represents the Options for the Output facility in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_OutputOptions interface

### <a id="IPCB_Library_Interface"></a>IPCB\_Library Interface

__Overview__  
The __IPCB\_Library__ interface represents the library document\. A library document has a list of components \(footprints\)\. The component in focus in the PCB library is always the current component\. This current component is represented by the __IPCB\_LibComponent__ interface\.

To obtain the settings of the library document, you obtain the __IPCB\_Board__ interface, to obtain the primitives of a component \(footprint\), you obtain the __IPCB\_LibComponent__ interface via the Library Iterator interface\.

There is a three way relationship: the __IPCB\_Board__, the __IPCB\_LibComponent__ and the __IPCB\_Library__ interfaces that all work together for a PCB library document\.  
The __IPCB\_Library__ interface is a standalone interface\.

__IPCB\_Library methods__  
GetState\_CurrentComponent  
SetState\_CurrentComponent  
GetState\_Board  
RegisterComponent  
DeRegisterComponent  
GetUniqueCompName  
CreateNewComponent  
RemoveComponent  
GetComponentByName  
SetBoardToComponentByName  
Navigate\_FirstComponent  
SetCurrentComponentReference  
LibraryIterator\_Create  
LibraryIterator\_Destroy

__IPCB\_Library properties__  
CurrentComponent  
Board

__Example__

01

Var

02

    CurrentLib    : IPCB\_Library;

03

    NewPCBLibComp : IPCB\_LibComponent;

04

Begin

05

    If PCBServer = Nil Then Exit;

06

    CurrentLib := PcbServer\.GetCurrentPCBLibrary;

07

    If CurrentLib = Nil Then Exit;

08

     

09

    // ditto

10

End;

__See also__  
IPCB\_ServerInterface interface  
IPCB\_LibComponent interface  
IPCB\_LibraryIterator interface