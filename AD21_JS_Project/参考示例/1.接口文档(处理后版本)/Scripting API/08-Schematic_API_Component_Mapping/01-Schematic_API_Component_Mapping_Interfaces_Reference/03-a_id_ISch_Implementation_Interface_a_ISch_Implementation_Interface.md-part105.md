#### Properties

##### InteractiveRoutingOptions property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  InteractiveRoutingOptions  : IPCB\_InteractiveRoutingOptions Read GetState\_InteractiveRoutingOptions;  
__Description__  
This property returns you the __IPCB\_InteractiveRoutingOptions__ interface which represents the interactive routing options in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface  
IPCB\_InteractiveRoutingOptions interface

##### SystemOptions property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  SystemOptions : IPCB\_SystemOptions Read GetState\_SystemOptions;  
__Description__  
The property returns you the __IPCB\_SystemOptions__ interface\. This interface is represented by the System Options in the PCB editor such as PCB document display options,  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface  
IPCB\_SystemOptions interface

##### CanFastCrossSelect\_Emit property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  CanFastCrossSelect\_Emit    : Boolean                        Read GetState\_CanFastCrossSelect\_Emit    Write SetState\_CanFastCrossSelect\_Emit;  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### CanFastCrossSelect\_Receive property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  CanFastCrossSelect\_Receive : Boolean                        Read GetState\_CanFastCrossSelect\_Receive Write SetState\_CanFastCrossSelect\_Receive;  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### SpecialStringConverter property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  SpecialStringConverter  : IPCB\_SpecialStringConverter    Read GetState\_SpecialStringConverter;  
__Description__  
This property is a read only property, however if you obtain the IPCB\_SpecialStringConverter interface, then you can invoke methods or properties to change the data within\.  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface  
IPCB\_SpecialStringConverter interface

##### TTFLettersCache property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  TTFLettersCache  : IPCB\_LettersCache              Read GetState\_TTFLettersCache;  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### TTFontsCache property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  TTFontsCache : IPCB\_TTFontsCache Read GetState\_TTFontsCache;  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

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