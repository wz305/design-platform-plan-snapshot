### <a id="IPCB_Board"></a>IPCB\_Board

__Overview__  
The __IPCB\_Board__ interface encapsulates an opened PCB document in Altium Designer and from this board interface object, you can add, delete PCB design objects, find out which layers are used and so on\.

The __IPCB\_Board__ interface has iterative methods and interactive feedback methods\. Basically you can retrieve an object interface for the PCB design object on the PCB that was clicked on\. You can also retrieve the coordinates based on the mouse click on the PCB and also you can conduct defined searches on a PCB document with the parameters you have set up for the iterator\. Refer to the Iterators section for more details\.

This__ IPCB\_Board__ is also used in the __IPCB\_Library__ interface\. A library document is a bit more complex because it has a list of footprints \(components with unnamed designators\) and each footprint is shown in a PCB Library document\.

There is a three way relationship: the __IPCB\_Board__, the __IPCB\_LibComponent__ and the __IPCB\_Library__ interfaces that all work together for the PCB library document\.

__Notes__  
Check if the PCB server exists and if there is a PCB document before you invoke any PCB interface methods\. For example

1

    PCBBoard := PCBServer\.GetCurrentPCBBoard;

2

    If PCBBoard = Nil Then Exit;

Some properties are only read only, meaning you can only retrieve data from property but not modify the data\.

To create a new object and add to the board object, firstly invoke the __PCBObjectFactory__ from the __IPCB\_ServerInterface__ interface and then invoke the __AddPCBObject__ method from a __IPCB\_Board__ interface\.

To look for objects on a PCB document, use one of the following iterators; Board Iterator, Group Iterator, Spatial iterator or a library iterator for PCB Library documents\.

Interactive feedback from the board can be done with the following methods: __GetObjectAtCursor__, __GetObjectAtXYAskUserIfAmbiguous__, __ChooseRectangleByCorners__ and __ChooseLocation__ functions\.

__IPCB\_Board methods__  
AddObjectToHighlightObjectList  
AddPCBObject  
AnalyzeNet  
BoardIterator\_Create  
BoardIterator\_Destroy  
ChooseLocation  
ChooseRectangleByCorners  
CleanNet  
ClearUndoRedo  
ConnectivelyValidateNets  
CreateBoardOutline  
DoRedo  
DoUndo  
EnableAllPrimitives  
EndUndo  
FindDominantRuleForObject  
FindDominantRuleForObjectPair  
GetObjectAtXYAskUserIfAmbiguous  
GetObjectAtCursor  
GetPcbComponentByRefDes  
GetPrimitiveCount  
GetPrimitiveCounter  
GetState\_SplitPlaneNets  
HidePCBObject  
InvertPCBObject  
LayerPositionInSet  
Navigate\_RedrawChangedObjectsInBoard  
NewUndo  
RemovePCBObject  
ShowPCBObject  
SetState\_DocumentHasChanged  
SetState\_Navigate\_HighlightObjectList  
SetState\_SaveCurrentStatusOfObjectsInBoard  
SetState\_ViewManager\_FilterChanging  
SpatialIterator\_Create  
SpatialIterator\_Destroy  
UpdateBoardOutline  
ViewManager\_GraphicallyInvalidatePrimitive  
ViewManager\_FullUpdate  
WindowBoundingRectangle

__IPCB\_Board properties__  
AutomaticSplitPlanes  
BigVisibleGridSize  
BigVisibleGridUnit  
BoardOutline  
ComponentGridSize  
ComponentGridSizeX  
ComponentGridSizeY  
CurrentLayer  
DisplayUnit  
DrawDotGrid  
DrillLayersPairsCount  
FileName  
InternalPlane1NetName  
InternalPlane2NetName  
InternalPlane3NetName  
InternalPlane4NetName  
InternalPlaneNetName  
LayerColor  
LayerIsDisplayed  
LayerIsUsed  
LayerPair  
LayerStack  
MechanicalPairs  
PCBSheet  
PCBWindow  
SelectecObjectCount  
SelectecObject  
PrimitiveCounter  
SnapGridSizeX  
SnapGridSizeY  
SnapGridSize  
SnapGridUnit  
TrackGridSize  
ViaGridSize  
VisibleGridSize  
VisibleGridUnit  
XOrigin  
XCursor  
YCursor  
YOrigin  
ECOOptions  
GerberOptions  
PlacerOptions  
PrinterOptions  
OutputOptions

   
__See also__  
TLayer enumerated values  
IPCB\_Library interface  
IPCB\_LayerStack interface  
IPCB\_OutputOptions interface  
IPCB\_ECOOptions interface  
IPCB\_GerberOptions interface  
IPCB\_PrinterOptions interface  
IPCB\_AdvancedPlacerOptions interface  
QueryUsedLayers script in \\Examples\\Scripts\\PCB folder  
SpatialIterator script in \\Examples\\Scripts\\PCB folder

#### Methods

##### AddObjectToHighlightObjectList method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure AddObjectToHighlightObjectList\(iPrimitive : IPCB\_Primitive\);  
__Description__  
__Example__  
   
__See also__  
IPCB\_Board interface

##### AddPCBObject method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure AddPCBObject\(PCBObject : IPCB\_Primitive\);  
__Description__  
The __AddPCBObject__ method adds a new Design Object into the PCB document after this object was created by the __PCBObjectFactory__ method from the __IPCB\_ServerInterface__ interface\.  
To successfully create and register a PCB design object onto a PCB document, you need to employ the IPCB\_PCBServer’s PreProcess, PostProcess and SendMessageToRobots messages\. A ViewManager\_FullUpdate  
__DelphiScript Example__

01

Var

02

    Board    : IPCB\_Board;

03

    BR       : TCoordRect;

04

    Sheet    : IPCB\_Sheet;

05

    Via      : IPCB\_Via;

06

    PadCache : TPadCache;

07

Begin

08

    // Grab the board interface representing the current PCB document in DXP\.

09

    Board := PCBServer\.GetCurrentPCBBoard;

10

  

11

    // If the board interface doesnt exist \(no PCB document\) then exit\.

12

    If Board = Nil Then Exit;

13

     

14

    // Initialize the systems in the PCB Editor\.

15

    PCBServer\.PreProcess;

16

  

17

    Sheet := Board\.PCBSheet;   

18

  

19

    // Create a Via object with the PCBObjectFactory method

20

    // and then with the new attributes\.

21

  

22

    // Note we convert values in Mils to internal coordinates

23

    // using the MilsToCoord function\. All PCB objects locations and sizes

24

    // have internal coordinate units where 1 mil = 10000 internal units

25

  

26

    Via           := PCBServer\.PCBObjectFactory\(eViaObject, eNoDimension, eCreate\_Default\);

27

  

28

    // obtain the bottom left coordinates of the board outline

29

    BR := Board\.BoardOutline\.BoundingRectangle;

30

    Via\.x := BR\.Left   \+ MilsToCoord\(500\);

31

    Via\.y := BR\.Bottom \+ MilsToCoord\(500\);

32

  

33

//    Via\.x         := Sheet\.SheetX \+ MilsToCoord\(500\);

34

//    Via\.y         := Sheet\.SheetY \+ MilsToCoord\(500\);

35

  

36

    Via\.Size      := MilsToCoord\(50\);

37

    Via\.HoleSize  := MilsToCoord\(20\);

38

  

39

  

40

    // Assign Via to the Top layer and bottom layer\.

41

    Via\.LowLayer  := eTopLayer;

42

    Via\.HighLayer := eBottomLayer;

43

     

44

    // Set up Cache info for Via

45

    // which consists mainly solder mask, paste mask and power plane values from design rules

46

    Padcache                           := Via\.GetState\_Cache;

47

    Padcache\.ReliefAirGap              := MilsToCoord\(11\);

48

    Padcache\.PowerPlaneReliefExpansion := MilsToCoord\(11\);

49

    Padcache\.PowerPlaneClearance       := MilsToCoord\(11\);

50

    Padcache\.ReliefConductorWidth      := MilsToCoord\(11\);

51

    Padcache\.SolderMaskExpansion       := MilsToCoord\(11\);

52

    Padcache\.SolderMaskExpansionValid  := eCacheManual;

53

    Padcache\.PasteMaskExpansion        := MilsToCoord\(11\);

54

    Padcache\.PasteMaskExpansionValid   := eCacheManual;

55

  

56

    // Assign the new pad cache to the via 

57

    Via\.SetState\_Cache                 := Padcache;

58

  

59

    // Put the new Via object on the board

60

    Board\.AddPCBObject\(Via\);

61

     

62

    // Update the Undo System in DXP that a new VIa object has been added to the board

63

    PCBServer\.SendMessageToRobots\(Board  \.I\_ObjectAddress, c\_Broadcast, PCBM\_BoardRegisteration, Via\.I\_ObjectAddress\);

64

     

65

    // Finalize the systems in the PCB Editor\.

66

    PCBServer\.PostProcess;

67

     

68

    //Full PCB system update

69

    Board\.ViewManager\_FullUpdate;

70

    // Refresh PCB screen

71

    Client\.SendMessage\('PCB:Zoom', 'Action=Redraw' , 255, Client\.CurrentView\);

72

End;

__See also__  
IPCB\_Board interface

##### AnalyzeNet method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure AnalyzeNet\(Const ANet : IPCB\_Net\);  
__Description__  
This procedure analyzes a supplied net object in the form of __IPCB\_Net__ interface\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### BoardIterator\_Create method

\(IPCB\_Board interface\)  
__Syntax__  
Function  BoardIterator\_Create : IPCB\_BoardIterator;  
__描述  __

__BoardIterator\_Create方法用于创建一个板迭代器，该迭代器用于在PCB文档中搜索设计对象。搜索完成后，调用BoardIterator\_Destroy方法销毁板迭代器对象。__

__Example__

01

    // Retrieve the iterator

02

    Iterator        := Board\.BoardIterator\_Create;

03

    Iterator\.AddFilter\_ObjectSet\(MkSet\(ePadObject\)\);

04

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

05

    Iterator\.AddFilter\_Method\(eProcessAll\);

06

  

07

    // Search and count pads

08

    Pad := Iterator\.FirstPCBObject;

09

    While \(Pad <> Nil\) Do

10

    Begin

11

        Inc\(PadNumber\);

12

        Pad := Iterator\.NextPCBObject;

13

    End;

14

    Board\.BoardIterator\_Destroy\(Iterator\);

__See also__  
IPCB\_Board interface

##### BoardIterator\_Destroy method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure BoardIterator\_Destroy\(Var AIterator : IPCB\_BoardIterator\);  
__Description__  
The __BoardIterator\_Destroy__ method destroys the board iterator object after it has been used to conduct a search on the PCB document for specified board objects\.  
__Example__

01

    // retrieve the iterator

02

    Iterator        := Board\.BoardIterator\_Create;

03

    Iterator\.AddFilter\_ObjectSet\(MkSet\(ePadObject\)\);

04

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

05

    Iterator\.AddFilter\_Method\(eProcessAll\);

06

    // Search and count pads

07

    Pad := Iterator\.FirstPCBObject;

08

    While \(Pad <> Nil\) Do

09

    Begin

10

        Inc\(PadNumber\);

11

        Pad := Iterator\.NextPCBObject;

12

    End;

13

    Board\.BoardIterator\_Destroy\(Iterator\);

__See also__  
IPCB\_Board interface  
BoardIterator\_Create method\.

##### ChooseLocation method

\(IPCB\_Board interface\)  
__Syntax__  
Function  ChooseLocation\(Var X1, Y1 : TCoord;  
                             Prompt : TPCBString\): Boolean;  
__Description__  
The function returns you the X1 and Y1 coordinates of the PCB Document after you have clicked on a location on the PCB document\. When this function is excuted, you are prompted with a cross hair cursor \(being in the interactive mode\) and the status bar of the Altium Designer appears with the Prompt string\.  
This function returns a boolean value whether a location has been retrieved or not\. if you click Escape key for example, the function does not return the location values and returns a False value\.  
__DelphiScript Example__

01

    Try

02

        Board := PCBServer\.GetCurrentPCBBoard;

03

        If Not Assigned\(Board\) Then

04

        Begin

05

            ShowMessage\('The Current Document is not a Protel PCB Document\.'\);

06

            Exit;

07

        End;

08

     

09

        Repeat

10

            Board\.ChooseLocation\(x,y, 'Choose Component1'\);

11

            Comp1 := Board\.GetObjectAtXYAskUserIfAmbiguous\(x,y,MkSet\(eComponentObject\),AllLayers, eEditAction\_Select\);

12

            If Not Assigned\(Comp1\) Then Exit;

13

  

14

            Board\.ChooseLocation\(x,y, 'Choose Component2'\);

15

            Comp2 := Board\.GetObjectAtXYAskUserIfAmbiguous\(x,y,MkSet\(eComponentObject\),AllLayers, eEditAction\_Select\);

16

            If Not Assigned\(Comp2\) Then Exit;

17

  

18

            // do what yo want with Comp1 and Comp2

19

           // click on the board to exit or RMB

20

        Until \(Comp1 = Nil\) Or \(Comp2 = Nil\);

21

  

22

    Finally

23

        Pcbserver\.PostProcess;

24

        Client\.SendMessage\('PCB:Zoom', 'Action=Redraw', 255, Client\.CurrentView\);

25

    End;

26

End

__See also__  
IPCB\_Board interface

##### ChooseRectangleByCorners method

\(IPCB\_Board interface\)  
__Syntax__  
Function  ChooseRectangleByCorners\(Prompt1    : TPCBString;   
                                   Prompt2    : TPCBString;   
                                   Var X1, Y1,  
                                       X2, Y2 : TCoord\) : Boolean;  
__Description__  
The __ChooseRectangleByCorners__ method prompts you twice to choose the two sets of coordinates that define a boundary rectangle on the PCB document\. When this method is executed, the PCB is in interactive mode with a cross hair cursor, waiting for the user to click on the PCB document\.  
The method returns you the X1,Y1, X2, Y2 values that can be used for calculations or for the spatial iterator for example and a True value\.  
However if the method  was exit prematurely for example the user clicks Escape key or the right mouse button, the method returns a false value\.  
__DelphiScript Example__

1

Board := PCBServer\.GetCurrentPCBBoard;

2

If Board = Nil Then Exit;

3

  

4

If Not \(Board\.ChooseRectangleByCorners\( 'Choose first corner',

5

                                        'Choose final corner',

6

                                         x1,y1,x2,y2\)\) Then Exit;

7

  

8

// The coordinates from the ChooseRectangleByCorners method 

9

// can be used for a spatial iterator for example

__See also__  
IPCB\_Board interface  
IPCB\_SpatialIterator  
ChooseLocation method

##### CleanNet method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure CleanNet\(Const ANet : IPCB\_Net\);  
__Description__  
The __CleanNet__ procedure cleans up the net represented by the __IPCB\_Net__ parameter\. It cleans up by re\-organizing and re\-arranging the net topology of this net\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### ClearUndoRedo method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure ClearUndoRedo;  
__Description__  
This clears out the UndoRedo facility in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### ConnectivelyValidateNets method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure ConnectivelyValidateNets;  
__Description__  
This procedure validates the connectivity of nets on the PCB document\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### CreateBoardOutline method

\(IPCB\_Board interface\)  
__Syntax__  
Function  CreateBoardOutline : IPCB\_BoardOutline;  
__Description__  
The function creates a board outline represented by the __IPCB\_BoardOutline__ interface\. To adjust the parameters of the Board outline, please consult the __IPCB\_BoardOutline__ interface entry\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
IPCB\_BoardOutline interface

##### DoRedo method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure DoRedo;  
__Description__  
This procedure invokes the Redo facility in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### DoUndo method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure DoUndo;  
__Description__  
This procedure invokes the Undo facility in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### EnableAllPrimitives method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure EnableAllPrimitives\(enable : Boolean\);  
__Description__  
This procedure enables all primitives on the PCB document\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### EndUndo method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure EndUndo;  
__Description__  
This procedure ends the Undo process in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### FindDominantRuleForObject method

\(IPCB\_Board interface\)  
__Syntax__  
Function  FindDominantRuleForObject\(APrimitive : IPCB\_Primitive;  
                                    ARuleKind  : TRuleKInd\) : IPCB\_Rule;  
__Description__  
This function returns the dominant specified rule for the primitive which is  targetted by this rule\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### FindDominantRuleForObjectPair method

\(IPCB\_Board interface\)  
__Syntax__  
Function  FindDominantRuleForObjectPair\(APrimitive1,  
                                        APrimitive2 : IPCB\_Primitive;  
                                        ARuleKind   : TRuleKInd\) : IPCB\_Rule;  
__Description__  
This function returns the dominant specified binary rule for the two primitives which are  targetted by this rule\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### GetObjectAtXYAskUserIfAmbiguous method

\(IPCB\_Board interface\)  
__Syntax__  
Function GetObjectAtXYAskUserIfAmbiguous\(HitX,  
                                         HitY      : TCoord;  
                                         ObjectSet : TObjectSet;  
                                         LayerSet  : TLayerSet;  
                                         Action    : TEditingAction\) : IPCB\_Primitive;  
__Description__  
This function returns you the specified object with the specified X and Y coordinates which could be retrieved by the __ChooseLocation__ method for example\.  
This function is useful when there are overlapping objects on the PCB document and you need to retrieve the specific object type\.  
The function returns the design object with the following parameters\.  
__Parameters__

- The HitX parameter specifies the X coordinate value\.
- The HitY parameter specifies the Y coordinate value\.
- The ObjectSet parameter specifies which object types can be returned\.
- The LayerSet parameter specifies the objects on which layers that can be returned\.
- The Action parameter specifies what is happening when this method is invoked\.

__DelphiScript Example__

01

Var

02

    Board     : IPCB\_Board;

03

    Comp1     : IPCB\_Component;

04

    Comp2     : IPCB\_Component;

05

  

06

    x,y,      : TCoord;

07

    x1, y1    : TCoord;

08

    Rotation  : TAngle;

09

Begin

10

    Pcbserver\.PreProcess;

11

  

12

    Try

13

        Board := PCBServer\.GetCurrentPCBBoard;

14

        If Not Assigned\(Board\) Then

15

        Begin

16

            ShowMessage\('The Current Document is not a Protel PCB Document\.'\);

17

            Exit;

18

        End;

19

     

20

        Repeat

21

            Board\.ChooseLocation\(x,y, 'Choose Component1'\);

22

            Comp1 := Board\.GetObjectAtXYAskUserIfAmbiguous\(x,y,MkSet\(eComponentObject\),AllLayers, eEditAction\_Select\);

23

            If Not Assigned\(Comp1\) Then Exit;

24

  

25

  

26

        // click on the board to exit or RMB

27

        Until \(Comp1 = Nil\);

28

  

29

    Finally

30

        Pcbserver\.PostProcess;

31

        Client\.SendMessage\('PCB:Zoom', 'Action=Redraw', 255, Client\.CurrentView\);

32

    End;

33

End;

__See also__  
IPCB\_Board interface  
ChooseLocation method  
TObjectSet type  
TLayerSet type  
TEditingAction type

##### GetObjectAtCursor method

\(IPCB\_Board interface\)  
__Syntax__  
Function  GetObjectAtCursor\(ObjectSet     : TObjectSet;  
                            LayerSet      : TLayerSet;  
                            StatusBarText : TPCBString\) : IPCB\_Primitive;  
__Description__  
This function returns the design object that is within the mouse's clicked coordinates on the PCB document\.  
__Parameters__

- The ObjectSet parameter specifies which object types can be returned\.
- The LayerSet parameter specifies the objects on which layers that can be returned\.
- The StatusbarText parameter specifies the text on the status bar of the Altium Designer application when the function is invoked\.

__Example__  
   
__See also__  
IPCB\_Board interface

##### GetPcbComponentByRefDes method

\(IPCB\_Board interface\)  
__Syntax__  
Function  GetPcbComponentByRefDes\(Value : TString\) : IPCB\_Component;  
__Description__  
This function returns the component by its valid reference designator\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### GetPrimitiveCount method

\(IPCB\_Board interface\)  
__Syntax__  
Function  GetPrimitiveCount\(AObjSet  : TObjectSet;  
                            LayerSet : TLayerSet;  
                            AMethod  : TIterationMethod\)  :Integer;  
__Description__  
The function returns the number of primitives which is dependent on the parameters supplied \- the object kinds to look for, which layers to look for and how the search is conducted\.  
__Parameters__

- The ObjectSet parameter specifies which object types can be returned\.
- The LayerSet parameter specifies the objects on which layers that can be returned\.
- The AMethod parameter specifies how the search is conducted\.

__Example__  
   
__See also__  
IPCB\_Board interface  
TObjectSet type  
TLayerSet type  
TIterationMethod type

##### GetPrimitiveCounter method

\(IPCB\_Board interface\)  
__Syntax__  
Function GetPrimitiveCounter : IPCB\_PrimitiveCounter;  
__Description__  
The __IPCB\_PrimitiveCounter__ interface gives you the means of obtaining the hole count and string count for the focussed PCB document\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
PrimitiveCounter property  
IPCB\_PrimitiveCounter interface

##### GetState\_SplitPlaneNets method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure GetState\_SplitPlaneNets\(NetsList  : TStringList\);  
__Description__  
This procedure retrieves the list of nets for split planes on the PCB document in a TStringList container\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### HidePCBObject method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure HidePCBObject\(Const PCBObject : IPCB\_Primitive\);  
__Description__  
This method hides the specified object on the PCB document from view\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
InvertPCBObject method  
ShowPCBObject method

##### InvertPCBObject method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure InvertPCBObject\(Const PCBObject : IPCB\_Primitive\);   
__Description__  
This method inverts the colors of the specified object on the PCB document\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
ShowPCBObject method  
HidePCBObject method

##### LayerPositionInSet method

\(IPCB\_Board interface\)  
__Syntax__  
Function  LayerPositionInSet\(ALayerSet : TLayerSet;  
                             ALayerObj : IPCB\_LayerObject\)  : Integer;  
__Description__  
This function returns a positive value with 1 being the first layer and a higher number being the lower layer in the list\. This function is useful for checking low and high layers of a layer pair\.  
__Example__

01

Begin

02

    PCBBoard := PCBServer\.GetCurrentPCBBoard;

03

    If PCBBoard = Nil Then Exit;

04

  

05

    LayerPairs := TStringList\.Create;

06

    For i := 0 To PCBBoard\.DrillLayerPairsCount \- 1 Do

07

    Begin

08

        PCBLayerPair := PCBBoard\.LayerPair\[i\];

09

        LowLayerObj  := PCBBoard\.LayerStack\.LayerObject\[PCBLayerPair\.LowLayer\];

10

        HighLayerObj := PCBBoard\.LayerStack\.LayerObject\[PCBLayerPair\.HighLayer\];

11

        LowPos       := PCBBoard\.LayerPositionInSet\(SignalLayers \+ InternalPlanes,

12

                                                    LowLayerObj\);

13

        HighPos      := PCBBoard\.LayerPositionInSet\(SignalLayers \+ InternalPlanes,

14

                                                    HighLayerObj\);

15

        If LowPos <= HighPos Then

16

            LayerPairs\.Add\(LowLayerObj \.Name \+ ' \- ' \+ HighLayerObj\.Name\)

17

        Else

18

            LayerPairs\.Add\(HighLayerObj\.Name \+ ' \- ' \+ LowLayerObj \.Name\);

19

    End;

20

  

21

    // Format the layer pairs data string and display it\.

22

    LS := '';

23

    For i := 0 to LayerPairs\.Count \- 1 Do

24

        LS := LS \+ LayerPairs\[i\] \+ \#13\#10;

25

    ShowInfo\('Layer Pairs:'\#13\#10 \+ LS\);

26

    LayerPairs\.Free;

27

End;

__See also__  
IPCB\_Board interface  
IPCB\_LayerObject interface  
IPCB\_DrillLayerPair interface

##### Navigate\_RedrawChangedObjectsInBoard  method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure Navigate\_RedrawChangedObjectsInBoard;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Board interface

##### NewUndo method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure NewUndo;  
__Description__  
This procedure creates a new undo process in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### RemovePCBObject method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure RemovePCBObject\(PCBObject : IPCB\_Primitive\);   
__Description__  
This method removes the PCB object from the PCB board but it is not completely destroyed, which means it can be undone\. When deleting PCB objects, basically you just collect the track object interfaces and put them in a __TInterfaceList__ or __TList__ Borland Delphi Container objects \(which is exposed in the scripting system, but with the Server Development Kit, you need to add the Classes unit in your server project\)\. Then with this __TInterfaceList__ or __TList__ object, you go thru the items one at a time, and for each item fetched, call the __RemovePCBObject__ method from the __IPCB\_Board__ interface and call the __SendMessageToRobots__ to remember this deleted track in the Undo system\.

It is generally not a good idea to delete objects while iterating for objects within a While or Repeat loop body because it messes up the data structure that the iterator is traversing\.

__Bad DelphiScript Example__

01

While Track <> Nil Do

02

Begin

03

    OldTrack := Track;

04

    Track := Iterator\.NextPCBObject;

05

    CurrentPCBBoard\.RemovePCBObject\(OldTrack\);

06

    PCBServer\.SendMessageToRobots\(CurrentPCBBoard\.I\_ObjectAddress,

07

                                  c\_BroadCast,

08

                                  PCBM\_BoardRegisteration,

09

                                  OldTrack\.I\_ObjectAddress\);

10

End;

11

  

__Correct DelphiScript Example__

01

Procedure RemoveTracksOnTopLayer;

02

var

03

    CurrentPCBBoard : IPCB\_Board;

04

    Iterator        : IPCB\_BoardIterator;

05

    Track           : IPCB\_Track;

06

    TrackList       : TInterfaceList;

07

    I               : Integer;

08

Begin

09

    CurrentPCBBoard := PCBServer\.GetCurrentPCBBoard;

10

    If CurrentPCBBoard = Nil Then Exit;

11

  

12

    Iterator := CurrentPCBBoard\.BoardIterator\_Create;

13

    If Iterator = Nil Then Exit;

14

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eTrackObject\)\);

15

    Iterator\.AddFilter\_LayerSet\(MkSet\(eTopLayer\)\);

16

  

17

    // store tracks in a TInterfacelist that are to be deleted later\.\.\.

18

    TrackList := TInterfaceList\.Create;

19

  

20

    Try

21

        Track := Iterator\.FirstPCBObject;

22

        While Track <> Nil Do

23

        Begin

24

            TrackList\.Add\(Track\);

25

            Track := Iterator\.NextPCBObject;

26

        End;

27

    Finally

28

        CurrentPCBBoard\.BoardIterator\_Destroy\(Iterator\);

29

    End;

30

  

31

    Try

32

        PCBServer\.PreProcess;

33

        For I := 0 to TrackList\.Count \- 1 Do

34

        Begin

35

            Track := TrackList\.items\[i\];

36

            CurrentPCBBoard\.RemovePCBObject\(Track\);

37

  

38

            PCBServer\.SendMessageToRobots\(CurrentPCBBoard\.I\_ObjectAddress,

39

                                      c\_BroadCast,

40

                                      PCBM\_BoardRegisteration,

41

                                      Track\.I\_ObjectAddress\);

42

        End;

43

    Finally

44

        PCBServer\.PostProcess;

45

        TrackList\.Free;

46

    End;

47

  

48

  

49

    // Refresh the PCB document\.

50

    CurrentPCBBoard\.ViewManager\_FullUpdate;

51

    Client\.SendMessage\('PCB:Zoom', 'Action=Redraw' , 255, Client\.CurrentView\);

52

End;

53

  

__See also__  
IPCB\_Board interface

##### ShowPCBObject method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure ShowPCBObject\(Const PCBObject : IPCB\_Primitive\);   
__Description__  
This procedure makes this hidden PCB object visible on the PCB document\.  
__Example__  
   
__See also__  
IPCB\_Board interface  
InvertPCBObject method  
HidePCBObject method

##### SetState\_DocumentHasChanged method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure SetState\_DocumentHasChanged;  
__Description__  
This procedure forces the document has changed flag to true denoting that the document has been marked dirty so that when you close this document, you are prompted to save this document\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### SetState\_Navigate\_HighlightObjectList method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure SetState\_Navigate\_HighlightObjectList\(  
              HighlightMethods : THighlightMethodSet;  
              ClearExisting    : Boolean\);  
__Description__  
__Example__  
   
__See also__  
IPCB\_Board interface

##### SetState\_SaveCurrentStatusOfObjectsInBoard method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure SetState\_SaveCurrentStatusOfObjectsInBoard;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Board interface

##### SetState\_ViewManager\_FilterChanging method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure SetState\_ViewManager\_FilterChanging;  
__Description__  
__Example__  
   
__See also__  
IPCB\_Board interface

##### SpatialIterator\_Create method

\(IPCB\_Board interface\)  
__Syntax__  
Function  SpatialIterator\_Create : IPCB\_SpatialIterator;  
__Description__  
This method creates a spatial iterator which conducts a search within defined boundary on a PCB document\. A spatial iterator only looks for primitive objects on a PCB document such as tracks and arcs not group objects such as dimensions and components\.  
__Example__

01

    Iterator := Board\.SpatialIterator\_Create;

02

  

03

    \(\* Top/Bottom Layers and Arc/Track objects defined

04

       for the Spatial iterator constraints \*\)

05

    ASetOfLayers  := MkSet\(eTopLayer,eBottomLayer\);

06

    ASetOfObjects := MkSet\(eArcObject,eTrackObject\);

07

  

08

    Iterator\.AddFilter\_ObjectSet\(ASetOfObjects\);

09

    Iterator\.AddFilter\_LayerSet\(ASetOfLayers\);

10

    Iterator\.AddFilter\_Area\(X1,Y1,X2,Y2\);

11

  

12

    \(\* Iterate for tracks and arcs on bottom/top layers \*\)

13

    PCBObject := Iterator\.FirstPCBObject;

14

    While PCBObject <> 0 Do

15

    Begin

16

         PCBObject\.Selected := True;

17

         PCBObject := Iterator\.NextPCBObject;

18

    End;

19

    Board\.SpatialIterator\_Destroy\(Iterator\);

__See also__  
IPCB\_Board interface  
SpatialIterator\_Destroy method

##### SpatialIterator\_Destroy method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure SpatialIterator\_Destroy\(Var AIterator : IPCB\_SpatialIterator\);  
__Description__  
This method destroys the spatial iterator object after it has finished conducting a search within a defined boundary on the PCB document\. A spatial iterator only looks for primitive objects on a PCB document such as tracks and arcs not group objects such as dimensions and components\.  
__Example__

01

    Iterator := Board\.SpatialIterator\_Create;

02

  

03

    \(\* Top/Bottom Layers and Arc/Track objects defined

04

       for the Spatial iterator constraints \*\)

05

    ASetOfLayers  := MkSet\(eTopLayer,eBottomLayer\);

06

    ASetOfObjects := MkSet\(eArcObject,eTrackObject\);

07

  

08

    Iterator\.AddFilter\_ObjectSet\(ASetOfObjects\);

09

    Iterator\.AddFilter\_LayerSet\(ASetOfLayers\);

10

    Iterator\.AddFilter\_Area\(X1,Y1,X2,Y2\);

11

  

12

    \(\* Iterate for tracks and arcs on bottom/top layers \*\)

13

    PCBObject := Iterator\.FirstPCBObject;

14

    While PCBObject <> 0 Do

15

    Begin

16

         PCBObject\.Selected := True;

17

         PCBObject := Iterator\.NextPCBObject;

18

    End;

19

    Board\.SpatialIterator\_Destroy\(Iterator\);

__See also__  
IPCB\_Board interface  
SpatialIterator\_Create method

##### UpdateBoardOutline method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure UpdateBoardOutline;  
__Description__  
This method refreshes the Board outline on the PCB document for example if you have programmatically altered the outline, it is a good time to invoke the UpdateBoardOutline method to refresh the PCB document\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### ViewManager\_GraphicallyInvalidatePrimitive method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure ViewManager\_GraphicallyInvalidatePrimitive\(PCBObject : IPCB\_Primitive\);  
__Description__  
This procedure forces a repaint of the targeted design object \(PCBObject parameter\) on the PCB document\.  
__Example__  
   
__See also__  
IPCB\_Board interface

##### ViewManager\_FullUpdate method

\(IPCB\_Board interface\)  
__Syntax__  
Procedure ViewManager\_FullUpdate;  
__Description__  
This method invokes a full update of all panels that are associated with the current PCB document\. This method is useful if a document has been modified programmatically especially with library documents\.  
__Example__

01

Var

02

    CurrentLib    : IPCB\_Library;

03

    NewPCBLibComp : IPCB\_LibComponent;

04

    NewPad        : IPCB\_Pad;

05

Begin

06

    If PCBServer = Nil Then Exit;

07

    CurrentLib := PcbServer\.GetCurrentPCBLibrary;

08

    If CurrentLib = Nil Then Exit;

09

    NewPCBLibComp := PCBServer\.CreatePCBLibComp;

10

    NewPcbLibComp\.Name := 'ANewComponent';

11

    CurrentLib\.RegisterComponent\(NewPCBLibComp\);

12

    CurrentLib\.CurrentComponent := NewPcbLibComp;

13

    PCBServer\.PreProcess;

14

    NewPad := PcbServer\.PCBObjectFactory\(ePadObject,eNoDimension,eCreate\_Default\);

15

    NewPad\.X        := MilsToCoord\(0\);

16

    NewPad\.Y        := MilsToCoord\(0\);

17

    NewPad\.TopXSize := MilsToCoord\(62\);

18

    NewPad\.TopYSize := MilsToCoord\(62\);

19

    NewPad\.HoleSize := MilsToCoord\(28\);

20

    NewPad\.Layer    := eMultiLayer;

21

    NewPad\.Name     := '1';

22

    NewPCBLibComp\.AddPCBObject\(NewPad\);

23

    PCBServer\.SendMessageToRobots\(NewPCBLibComp\.I\_ObjectAddress,c\_Broadcast,PCBM\_BoardRegisteration,NewPad\.I\_ObjectAddress\);

24

    PCBServer\.SendMessageToRobots\(Nil,c\_Broadcast,PCBM\_BoardRegisteration,NewPCBLibComp\.I\_ObjectAddress\);

25

    PCBServer\.PostProcess;

26

    CurrentLib\.Board\.ViewManager\_FullUpdate;

27

    RefreshPCB;

28

End;

__See also__  
IPCB\_Board interface

##### WindowBoundingRectangle method

\(IPCB\_Board interface\)  
__Syntax__  
Function  WindowBoundingRectangle : TCoordRect;  
__Description__  
This function returns the coordinates of the bounds of a PCB window\.  
__Example__  
   
__See also__  
IPCB\_Board interface

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