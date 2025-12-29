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

# PCB API Types

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [PCB API Types for version 22](https://www.altium.com/documentation/altium-designer/pcb-api-types)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- PCB API](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## PCB API: PCB Enumerated Types Reference 

The PCB API Enumerated Types reference includes the following content:

[TAdvPCBFileFormatVersion](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TAdvPCBFileFormatVersion)  
[TAngle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TAngle)  
[TApertureUse](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TApertureUse)  
[TAutoPanMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TAutoPanMode)  
[TAutoPanUnit](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TAutoPanUnit)  
[TBaud](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TBaud)  
[TBGAFanoutDirection](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TBGAFanoutDirection)  
[TBGAFanoutViaMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TBGAFanoutViaMode)  
[TBoardSide type](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TBoardSide type)  
[TCacheState](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCacheState)  
[TChangeScope](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TChangeScope)  
[TClassMemberKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TClassMemberKind)  
[TComponentCollisionCheckMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TComponentCollisionCheckMode)  
[TComponentMoveKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TComponentMoveKind)  
[TComponentStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TComponentStyle)  
[TComponentType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TComponentType)  
[TConfinementStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TConfinementStyle)  
[TConnectionMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TConnectionMode)  
[TCoord](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCoord)  
[TCoordPoint](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCoordPoint)  
[TCoordRect](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCoordRect)  
[TCopyMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCopyMode)  
[TCornerStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TCornerStyle)  
[TDaisyChainStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDaisyChainStyle)  
[TDataBits](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDataBits)  
[TDielectricType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDielectricType)  
[TDimensionArrowPosition](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDimensionArrowPosition)  
[TDimensionReference](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDimensionReference)  
[TDimensionTextPosition](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDimensionTextPosition)  
[TDimensionKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDimensionKind)  
[TDimensionUnit](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDimensionUnit)  
[TDirection](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDirection)  
[TDirectionSet](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDirectionSet)  
[TDisplay](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDisplay)  
[TDrawingOrderArray](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDrawingOrderArray)  
[TDrawMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDrawMode)  
[TDrillSymbol](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDrillSymbol)  
[TDXColorMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDXColorMode)  
[TDynamicString](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TDynamicString)

[TEditingAction](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TEditingAction)  
[TEmbeddedBoardOriginMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TEmbeddedBoardOriginMode)  
[TEnabledRoutingLayers](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TEnabledRoutingLayers)  
[TExtendedDrillType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TExtendedDrillType)  
[TExtendedHoleType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TExtendedHoleType)  
[TTestpointAllowedSide](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TTestpointAllowedSide)  
[TFanoutDirection](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFanoutDirection)  
[TFanoutStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFanoutStyle)  
[TFontName](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFontName)  
[TFontID](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFontID)  
[TFullFontName](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFullFontName)  
[TFromToDisplayMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TFromToDisplayMode)  
[TGraphicsCursor](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TGraphicsCursor)  
[THandshaking](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#THandshaking)  
[TInteractiveRouteMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TInteractiveRouteMode)  
[TIterationMethod](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TIterationMethod)  
[TLayer](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLayer)  
[TLayerSet](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLayerSet)  
[TLayerStackStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLayerStackStyle)  
[TLengthenerStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLengthenerStyle)  
[TLogicalDrawingMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TLogicalDrawingMode)  
[TMechanicalLayerPair](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TMechanicalLayerPair)  
[TMirrorOperation](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TMirrorOperation)  
[TNetScope](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TNetScope)  
[TNetTopology](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TNetTopology)  
[TObjectCreationMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TObjectCreationMode)  
[TObjectId](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TObjectId)  
[TObjectSet](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TObjectSet)  
[TOptionsObjectId](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TOptionsObjectId)  
[TOutputDriverType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TOutputDriverType)  
[TOutputPort](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TOutputPort)  
[TPadCache](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPadCache)  
[TPadMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPadMode)  
[TParity](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TParity)  
[TPCBDragMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPCBDragMode)  
[TPCBObjectHandle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPCBObjectHandle)  
[TPCBString](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPCBString)  
[TPlaceTrackMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlaceTrackMode)  
[TPlaneConnectionStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlaneConnectionStyle)

[TPlaneConnectStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlaneConnectStyle)  
[TPlaneDrawMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlaneDrawMode)  
[TPlotLayer](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlotLayer)  
[TPlotPolygonProc](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlotPolygonProc)  
[TPlotterLanguage](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPlotterLanguage)  
[TPolygonReliefAngle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolygonReliefAngle)  
[TPolygonRepourMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolygonRepourMode)  
[TPolygonType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolygonType)  
[TPolyHatchStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolyHatchStyle)  
[TPolyRegionKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolyRegionKind)  
[TPolySegmentType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPolySegmentType)  
[TPrinterBatch](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPrinterBatch)  
[TPrinterComposite](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TPrinterComposite)  
[TRouteLayer](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TRouteLayer)  
[TRouteVia](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TRouteVia)  
[TRoutingWidthMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TRoutingWidthMode)  
[TRuleKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TRuleKind)  
[TRuleLayerKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TRuleLayerKind)  
[TSameNamePadstackReplacementMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TSameNamePadstackReplacementMode)  
[TScopeId](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TScopeId)  
[TScopeKind](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TScopeKind)  
[TScopeObjectId](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TScopeObjectId)  
[TShape](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TShape)  
[TSignalLevel](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TSignalLevel)  
[TSortBy](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TSortBy)  
[TSmartRouteMode](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TSmartRouteMode)  
[TStimulusType](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TStimulusType)  
[TStopBits](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TStopBits)  
[TString \(PCB\)](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TString (PCB))  
[TStrokeArray](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TStrokeArray)  
[TStrokeRecord](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TStrokeRecord)  
[TTestPointStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TTestPointStyle)  
[TTestpointValid](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TTestpointValid)  
[TTextAlignment](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TTextAlignment)  
[TTextAutoposition](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TTextAutoposition)  
[TUnit](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TUnit)  
[TUnitStyle](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TUnitStyle)  
[TViewableObjectID](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TViewableObjectID)  
[TWidthArray](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21#TWidthArray)

The enumerated types are used for many of the PCB object interfaces methods covered in this section\.

For example the IPCB\_Board interface has a LayerIsUsed \[L : TLayer\] : Boolean property — you can use this Enumerated Types section to check the range for the TLayer type\.

__See also__  
PCB API Reference

### <a id="TAdvPCBFileFormatVersion"></a>TAdvPCBFileFormatVersion

TAdvPCBFileFormatVersion  =   
\(ePCBFileFormatNone,  
 eAdvPCBFormat\_Binary\_V3,  
 eAdvPCBFormat\_Library\_V3,  
 eAdvPCBFormat\_ASCII\_V3,  
 eAdvPCBFormat\_Binary\_V4,  
 eAdvPCBFormat\_Library\_V4,  
 eAdvPCBFormat\_ASCII\_V4,  
 eAdvPCBFormat\_Binary\_V5,  
 eAdvPCBFormat\_Library\_V5,  
 eAdvPCBFormat\_ASCII\_V5\);

### <a id="TAngle"></a>TAngle

Double type\.

### <a id="TApertureUse"></a>TApertureUse

TApertureUse = \( eNoApertureUse,  
                 eMultiUse,  
                 eDrawUse,  
                 eFlashUse\);

### <a id="TAutoPanMode"></a>TAutoPanMode

TAutoPanMode = \( eNoAutoPan           
                 eReCentre            
                 eFixedJump           
                 eShiftAccellerator   
                 eShiftDeccellerator  
                 eBallistic           
                 eAdaptive\);

### <a id="TAutoPanUnit"></a>TAutoPanUnit

TAutoPanUnit  = \( eAutoPanByMils     
                  eAutoPanByPixels\);

### <a id="TBaud"></a>TBaud

TBaud                = \( eBaud110                                   ,  
                         eBaud150                                   ,  
                         eBaud300                                   ,  
                         eBaud600                                   ,  
                         eBaud1200                                  ,  
                         eBaud2400                                  ,  
                         eBaud4800                                  ,  
                         eBaud9600                                  ,  
                         eBaud19200  
                       \);

### <a id="TBGAFanoutDirection"></a>TBGAFanoutDirection

TBGAFanoutDirection  = \( eBGAFanoutDirection\_Out                    ,  
                         eBGAFanoutDirection\_NE                     ,  
                         eBGAFanoutDirection\_SE                     ,  
                         eBGAFanoutDirection\_SW                     ,  
                         eBGAFanoutDirection\_NW                     ,  
                         eBGAFanoutDirection\_In  
                        \);

### <a id="TBGAFanoutViaMode"></a>TBGAFanoutViaMode

TBGAFanoutViaMode    = \( eBGAFanoutVia\_Closest                      ,  
                         eBGAFanoutVia\_Centered  
                       \);

### <a id="TBoardSide_type"></a>TBoardSide type

TBoardSide = \( eBoardSide\_Top, eBoardSide\_Bottom\);

### <a id="TCacheState"></a>TCacheState

TCacheState = \( eCacheInvalid,  
                eCacheValid,  
                eCacheManual\);

### <a id="TChangeScope"></a>TChangeScope

TChangeScope         = \( eChangeNone                                ,  
                         eChangeThisItem                            ,  
                         eChangeAllPrimitives                       ,  
                         eChangeAllFreePrimitives                   ,  
                         eChangeComponentDesignators                ,  
                         eChangeComponentComments                   ,  
                         eChangeLibraryAllComponents                ,  
                         eChangeCancelled  
                       \);

### <a id="TClassMemberKind"></a>TClassMemberKind

TClassMemberKind = \(eClassMemberKind\_Net,  
                    eClassMemberKind\_Component,  
                    eClassMemberKind\_FromTo,  
                    eClassMemberKind\_Pad,  
                    eClassMemberKind\_Layer,  
                    eClassMemberKind\_DesignChannel,  
                    eClassMemberKind\_DifferentialPair  
\);

### <a id="TComponentCollisionCheckMode"></a>TComponentCollisionCheckMode

TComponentCollisionCheckMode  
                     = \(eQuickCheck,       
                        eMultiLayerCheck,  
                        eFullCheck,  
                        eComponentBodyCheck,  
                       \);

### <a id="TComponentMoveKind"></a>TComponentMoveKind

TComponentMoveKind   = \( eNoComponentMoveNoAction  
                         eJumpToComponent          
                         eMoveComponentToCursor  
                       \);

### <a id="TComponentStyle"></a>TComponentStyle

TComponentStyle      = \( eComponentStyle\_Unknown                    ,  
                         eComponentStyle\_Small                      ,  
                         eComponentStyle\_SmallSMT                   ,  
                         eComponentStyle\_Edge                       ,  
                         eComponentStyle\_DIP                        ,  
                         eComponentStyle\_SIP                        ,  
                         eComponentStyle\_SMSIP                      ,  
                         eComponentStyle\_SMDIP                      ,  
                         eComponentStyle\_LCC                        ,  
                         eComponentStyle\_BGA                        ,  
                         eComponentStyle\_PGA  
                       \);

### <a id="TComponentType"></a>TComponentType

TComponentType       = \( eBJT                                       ,  
                         eCapactitor                                ,  
                         eConnector                                 ,  
                         eDiode                                     ,  
                         eIC                                        ,  
                         eInductor                                  ,  
                         eResistor  
                       \);

### <a id="TConfinementStyle"></a>TConfinementStyle

TConfinementStyle    = \( eConfineIn,  
                         eConfineOut\);

### <a id="TConnectionMode"></a>TConnectionMode

TConnectionMode      = \( eRatsNestConnection  
                         eBrokenNetMarker  
                       \);

### TCoord

TCoord = Integer;

### <a id="TCoordPoint"></a>TCoordPoint

TCoordPoint = Record  
        x,  
        y : TCoord;  
End;

### TCoordRect

TCoordRect   = Record  
    Case Integer of  
       0 :\(left,bottom,right,top : TCoord\);  
       1 :\(x1,y1,x2,y2           : TCoord\);  
       2 :\(Location1,Location2   : TCoordPoint\);  
End; Note TPoint is a Borland Delphi defined type in the Types\.pas unit\.

### <a id="TCopyMode"></a>TCopyMode

TCopyMode = \( eFullCopy,  
              eFieldCopy\);

### <a id="TCornerStyle"></a>TCornerStyle

TCornerStyle         = \( eCornerStyle\_90,  
                         eCornerStyle\_45,  
                         eCornerStyle\_Round\);

### <a id="TDaisyChainStyle"></a>TDaisyChainStyle

TDaisyChainStyle     = \( eDaisyChainLoad                            ,  
                         eDaisyChainTerminator                      ,  
                         eDaisyChainSource  
                       \);

### <a id="TDataBits"></a>TDataBits

TDataBits            = \( eDataBits5                                 ,  
                         eDataBits6                                 ,  
                         eDataBits7                                 ,  
                         eDataBits8  
                       \);

### <a id="TDielectricType"></a>TDielectricType

TDielectricType = \(eNoDielectric,  
                   eCore,  
                   ePrePreg,  
                   eSurfaceMaterial\);

### <a id="TDimensionArrowPosition"></a>TDimensionArrowPosition

TDimensionArrowPosition = \( eInside,eOutside\);

### <a id="TDimensionReference"></a>TDimensionReference

 TDimensionReference            = Record  
     Primitive                  : IPCB\_Primitive;  
     Point                      : TCoordPoint;  
     Anchor                     : Integer;  
 End;

### <a id="TDimensionTextPosition"></a>TDimensionTextPosition

TDimensionTextPosition  
                     = \( eTextAuto                                  ,  
                         eTextCenter                                ,  
                         eTextTop                                   ,  
                         eTextBottom                                ,  
                         eTextRight                                 ,  
                         eTextLeft                                  ,  
                         eTextInsideRight                           ,  
                         eTextInsideLeft                            ,  
                         eTextUniDirectional                        ,  
                         eTextManual  
                       \);

### <a id="TDimensionKind"></a>TDimensionKind

    TDimensionKind       = \( eNoDimension                               ,  
                             eLinearDimension                           ,  
                             eAngularDimension                          ,  
                             eRadialDimension                           ,  
                             eLeaderDimension                           ,  
                             eDatumDimension                            ,  
                             eBaselineDimension                         ,  
                             eCenterDimension                           ,  
                             eOriginalDimension                         ,  
                             eLinearDiameterDimension                   ,  
                             eRadialDiameterDimension  
                           \);

### <a id="TDimensionUnit"></a>TDimensionUnit

TDimensionUnit = \( eMils,  
                   eInches,  
                   eMillimeters,  
                   eCentimeters,  
                   eDegrees,  
                   eRadians,  
                   eAutomaticUnit\);

### <a id="TDirection"></a>TDirection

TDirection =  \(eDir\_N ,  
               eDir\_NE,  
               eDir\_E ,  
               eDir\_SE,  
               eDir\_S ,  
               eDir\_SW,  
               eDir\_W ,  
               eDir\_NW\);

### <a id="TDirectionSet"></a>TDirectionSet

TDirectionSet = Set Of TDirection;

### <a id="TDisplay"></a>TDisplay

TDisplay             = \( eOverWrite  
                         eHide       
                         eShow       
                         eInvert     
                         eHighLight  
                       \);

### <a id="TDrawingOrderArray"></a>TDrawingOrderArray

Type TDrawingOrderArray = Array \[0\.\.Ord\(MaxLayer\)\] Of TLayer;

### TDrawMode

TDrawMode = \( eDrawFull,  
              eDrawDraft,  
              eDrawHidden\);

### <a id="TDrillSymbol"></a>TDrillSymbol

TDrillSymbol         = \( eSymbols                                   ,  
                         eNumbers                                   ,  
                         eLetters  
                       \); \{Used by gerber and Print/ Plot\}

### <a id="TDXColorMode"></a>TDXColorMode

TDXColorMode = \( eDXPrimitive\_DisplayNormal      ,           
                eDXPrimitive\_DisplayDimm        ,           
                eDXPrimitive\_DisplayHighlight   ,           
                eDXPrimitive\_DisplayTransparent ,           
                eDXPrimitive\_DisplayGrayScale   ,           
                eDXPrimitive\_DisplayMonochrome  ,           
                eDXPrimitive\_DisplayDRCError             ,  
                eDXPrimitive\_DisplayGrayScaleTransparent ,  
                eDXPrimitive\_DisplayMonochromeTRansparent,  
                eDXPrimitive\_DisplayDimmTransparent      ,  
                eDXPrimitive\_DisplayHighlightTransparent    
                \);

### <a id="TDynamicString"></a>TDynamicString

TDynamicString = AnsiString;

### TEditingAction

TEditingAction=\(eEditAction\_Focus,  
                eEditAction\_Move,  
                eEditAction\_Change,  
                eEditAction\_Delete,  
                eEditAction\_Select,  
                eEditAction\_NonGraphicalSelect,  
                eEditAction\_Measure,  
                eEditAction\_Dimension\);

### <a id="TEmbeddedBoardOriginMode"></a>TEmbeddedBoardOriginMode

TEmbeddedBoardOriginMode = \(eOriginMode\_BoardOrigin,  
                            eOriginMode\_BottomLeft\);

### <a id="TEnabledRoutingLayers"></a>TEnabledRoutingLayers

TEnabledRoutingLayers = Array \[eTopLayer\.\.eBottomLayer\] Of Boolean;

### <a id="TExtendedDrillType"></a>TExtendedDrillType

TExtendedDrillType             = \( eDrilledHole,        
                                   ePunchedHole,        
                                   eLaserDrilledHole,   
                                   ePlasmaDrilledHole   
                                 \);                   

### <a id="TExtendedHoleType"></a>TExtendedHoleType

TExtendedHoleType              = \( eRoundHole,   
                                   eSquareHole,  
                                   eSlotHole     
                                 \);            

### <a id="TTestpointAllowedSide"></a>TTestpointAllowedSide

TTestpointAllowedSide  
                     = \( eAllowTopSide                              ,  
                         eAllowBottomSide                           ,  
                         eAllowThruHoleTop                          ,  
                         eAllowThruHoleBottom  
                       \);

### <a id="TFanoutDirection"></a>TFanoutDirection

TFanoutDirection = \(eFanoutDirection\_None,  
                    eFanoutDirection\_InOnly,  
                    eFanoutDirection\_OutOnly,  
                    eFanoutDirection\_InThenOut,  
                    eFanoutDirection\_OutThenIn,  
                    eFanoutDirection\_Alternating\);

### <a id="TFanoutStyle"></a>TFanoutStyle

TFanoutStyle = \(eFanoutStyle\_Auto,  
                eFanoutStyle\_Rows,  
                eFanoutStyle\_Staggered,  
                eFanoutStyle\_BGA,  
                eFanoutStyle\_UnderPads\);

### TFontName

TFontName            = Array \[0\.\.LF\_FACESIZE \- 1\] Of WideChar;

### TFontID

TFontID = SmallInt;

### <a id="TFullFontName"></a>TFullFontName

TFullFontName        = Array \[0\.\.LF\_FULLFACESIZE \- 1\] Of WideChar;

### <a id="TFromToDisplayMode"></a>TFromToDisplayMode

TFromToDisplayMode   = \( eFromToDisplayMode\_Automatic,  
                         eFromToDisplayMode\_Hide,  
                         eFromToDisplayMode\_Show\);

### <a id="TGraphicsCursor"></a>TGraphicsCursor

TGraphicsCursor = \( eCurShapeCross90,  
                    eCurShapeBigCross,  
                    eCurShapeCross45\);

### <a id="THandshaking"></a>THandshaking

THandshaking         = \( eHandshakingNone                           ,  
                         eHandshakingXonXOff                        ,  
                         eHandshakingHardwire  
                       \);

### <a id="TInteractiveRouteMode"></a>TInteractiveRouteMode

 TInteractiveRouteMode  
                      = \( eIgnoreObstacle  
                          eAvoidObstacle   
                          ePushObstacle  
                        \);

### <a id="TIterationMethod"></a>TIterationMethod

TIterationMethod = \( eProcessAll, eProcessFree, eProcessComponent\);

### <a id="TLayer"></a>TLayer

TLayer = \(eNoLayer          ,  
          eTopLayer         ,  
          eMidLayer1        ,  
          eMidLayer2        ,  
          eMidLayer3        ,  
          eMidLayer4        ,  
          eMidLayer5        ,  
          eMidLayer6        ,  
          eMidLayer7        ,  
          eMidLayer8        ,  
          eMidLayer9        ,  
          eMidLayer10       ,  
          eMidLayer11       ,  
          eMidLayer12       ,  
          eMidLayer13       ,  
          eMidLayer14       ,  
          eMidLayer15       ,  
          eMidLayer16       ,  
          eMidLayer17       ,  
          eMidLayer18       ,  
          eMidLayer19       ,  
          eMidLayer20       ,  
          eMidLayer21       ,  
          eMidLayer22       ,  
          eMidLayer23       ,  
          eMidLayer24       ,  
          eMidLayer25       ,  
          eMidLayer26       ,  
          eMidLayer27       ,  
          eMidLayer28       ,  
          eMidLayer29       ,  
          eMidLayer30       ,  
          eBottomLayer      ,  
          eTopOverlay       ,  
          eBottomOverlay    ,  
          eTopPaste         ,  
          eBottomPaste      ,  
          eTopSolder        ,  
          eBottomSolder     ,  
          eInternalPlane1   ,  
          eInternalPlane2   ,  
          eInternalPlane3   ,  
          eInternalPlane4   ,  
          eInternalPlane5   ,  
          eInternalPlane6   ,  
          eInternalPlane7   ,  
          eInternalPlane8   ,  
          eInternalPlane9   ,  
          eInternalPlane10  ,  
          eInternalPlane11  ,  
          eInternalPlane12  ,  
          eInternalPlane13  ,  
          eInternalPlane14  ,  
          eInternalPlane15  ,  
          eInternalPlane16  ,  
          eDrillGuide       ,  
          eKeepOutLayer     ,  
          eMechanical1      ,  
          eMechanical2      ,  
          eMechanical3      ,  
          eMechanical4      ,  
          eMechanical5      ,  
          eMechanical6      ,  
          eMechanical7      ,  
          eMechanical8      ,  
          eMechanical9      ,  
          eMechanical10     ,  
          eMechanical11     ,  
          eMechanical12     ,  
          eMechanical13     ,  
          eMechanical14     ,  
          eMechanical15     ,  
          eMechanical16     ,  
          eDrillDrawing     ,  
          eMultiLayer       ,  
          eConnectLayer     ,  
          eBackGroundLayer  ,  
          eDRCErrorLayer    ,  
          eHighlightLayer   ,  
          eGridColor1       ,  
          eGridColor10      ,  
          ePadHoleLayer     ,  
          eViaHoleLayer  
        \);

### <a id="TLayerSet"></a>TLayerSet

TLayerSet = Set of TLayer;  
__See also__  
TLayer

### <a id="TLayerStackStyle"></a>TLayerStackStyle

TLayerStackStyle     = \( eLayerStack\_Pairs       ,  
                         eLayerStacks\_InsidePairs,  
                         eLayerStackBuildup\);

### <a id="TLengthenerStyle"></a>TLengthenerStyle

TLengthenerStyle = \(eLengthenerStyle\_90,  
                    eLengthenerStyle\_45,  
                    eLengthenerStyle\_Round\);

### <a id="TLogicalDrawingMode"></a>TLogicalDrawingMode

TLogicalDrawingMode  = \( eDisplaySolid                              ,  
                         eDisplayHollow                             ,  
                         eDisplaySelected                           ,  
                         eDisplayDRC                                ,  
                         eDisplayFocused                            ,  
                         eDisplayMultiFocused                       ,  
                         eDisplayHollowDashed  
                       \);

### <a id="TMechanicalLayerPair"></a>TMechanicalLayerPair

TMechanicalLayerPair = Record  
    Layer1 : TLayer;  
    Layer2 : TLayer;  
End;

### <a id="TMirrorOperation"></a>TMirrorOperation

TMirrorOperation = \(eHMirror,eVMirror\);

### <a id="TNetScope"></a>TNetScope

TNetScope = \(eNetScope\_DifferentNetsOnly,  
             eNetScope\_SameNetOnly,  
             eNetScope\_AnyNet\);

### <a id="TNetTopology"></a>TNetTopology

TNetTopology         = \( eNetTopology\_Shortest                      ,  
                         eNetTopology\_Horizontal                    ,  
                         eNetTopology\_Vertical                      ,  
                         eNetTopology\_DaisyChain\_Simple             ,  
                         eNetTopology\_DaisyChain\_MidDriven          ,  
                         eNetTopology\_DaisyChain\_Balanced           ,  
                         eNetTopology\_Starburst  
                       \);

### TObjectCreationMode

TObjectCreationMode  = \( eCreate\_Default,  
                         eCreate\_GlobalCopy\);

### TObjectId

TObjectId = \( eNoObject           ,  
             eArcObject          ,  
             ePadObject          ,  
             eViaObject          ,  
             eTrackObject        ,  
             eTextObject         ,  
             eFillObject         ,  
             eConnectionObject   ,  
             eNetObject          ,  
             eComponentObject    ,  
             ePolyObject         ,  
             eRegionObject       ,  
             eComponentBodyObject,  
             eDimensionObject    ,  
             eCoordinateObject   ,  
             eClassObject        ,  
             eRuleObject         ,  
             eFromToObject       ,  
             eDifferentialPairObject,  
             eViolationObject    ,  
             eEmbeddedObject     ,  
             eEmbeddedBoardObject,  
             eTraceObject        ,  
             eSpareViaObject     ,  
             eBoardObject        ,  
             eBoardOutlineObject,  
           \); Note, the eTraceObject and eSpareViaObject values are for internal use only and are not used directly with PCB documents \(these values are used for Signal Integrity and Situs auto routing modules\)\.

### TObjectSet

TObjectSet = Set of TObjectId;  
__See also__  
TObjectId

### <a id="TOptionsObjectId"></a>TOptionsObjectId

TOptionsObjectId = \(eAbstractOptions,  
                    eOutputOptions,  
                    ePrinterOptions,  
                    eGerberOptions,  
                    eAdvancedPlacerOptions,  
                    eDesignRuleCheckerOptions,  
                    eSpecctraRouterOptions,  
                    eAdvancedRouterOptions,  
                    eEngineeringChangeOrderOptions,  
                    eInteractiveRoutingOptions,  
                    eSystemOptions,  
                    ePinSwapOptions\);

### <a id="TOutputDriverType"></a>TOutputDriverType

TOutputDriverType    = \( eUnknownDriver                             ,  
                         eProtelGerber                              ,  
                         eProtelPlot\_Composite                      ,  
                         eProtelPlot\_Final                          ,  
                         eStandardDriver\_Composite                  ,  
                         eStandardDriver\_Final  
                       \);

### <a id="TOutputPort"></a>TOutputPort

TOutputPort = \(eOutputPortCom1,  
               eOutputPortCom2,  
               eOutputPortCom3,  
               eOutputPortCom4,  
               eOutputPortFile\);

### <a id="TPadCache"></a>TPadCache

TPadCache                          = Record  
    PlaneConnectionStyle           : TPlaneConnectionStyle;  
    ReliefConductorWidth           : TCoord;  
    ReliefEntries                  : SmallInt;  
    ReliefAirGap                   : TCoord;  
    PowerPlaneReliefExpansion      : TCoord;  
    PowerPlaneClearance            : TCoord;  
    PasteMaskExpansion             : TCoord;  
    SolderMaskExpansion            : TCoord;  
    Planes                         : Word;  
    PlaneConnectionStyleValid      : TCacheState;  
    ReliefConductorWidthValid      : TCacheState;  
    ReliefEntriesValid             : TCacheState;  
    ReliefAirGapValid              : TCacheState;  
    PowerPlaneReliefExpansionValid : TCacheState;  
    PasteMaskExpansionValid        : TCacheState;  
    SolderMaskExpansionValid       : TCacheState;  
    PowerPlaneClearanceValid       : TCacheState;  
    PlanesValid                    : TCacheState;  
End;

### <a id="TPadMode"></a>TPadMode

TPadMode = \( ePadMode\_Simple,  
             ePadMode\_LocalStack,  
             ePadMode\_ExternalStack\);

### <a id="TParity"></a>TParity

TParity = \(eParityNone,  
           eParityEven,  
           eParityOdd,  
           eParityMark,  
           eParitySpace\);

### <a id="TPCBDragMode"></a>TPCBDragMode

TPcbDragMode = \( eDragNone              
                 eDragAllTracks         
                 eDragConnectedTracks\);

### <a id="TPCBObjectHandle"></a>TPCBObjectHandle

TPCBObjectHandle = Pointer;

### <a id="TPCBString"></a>TPCBString

TPCBString  = WideString;

### <a id="TPlaceTrackMode"></a>TPlaceTrackMode

TPlaceTrackMode = \( ePlaceTrackNone,  
                   ePlaceTrackAny,  
                   ePlaceTrack9090,  
                   ePlaceTrack4590,  
                   ePlaceTrack90Arc\);

### <a id="TPlaneConnectionStyle"></a>TPlaneConnectionStyle

TPlaneConnectionStyle = \( ePlaneNoConnect,  
                          ePlaneReliefConnect,  
                          ePlaneDirectConnect\);

### <a id="TPlaneConnectStyle"></a>TPlaneConnectStyle

TPlaneConnectStyle = \(eReliefConnectToPlane,  
                      eDirectConnectToPlane,  
                      eNoConnect\);

### <a id="TPlaneDrawMode"></a>TPlaneDrawMode

TPlaneDrawMode       = \( ePlaneDrawoOutlineLayerColoured // <\- Protel 99 SE style\.  
                         ePlaneDrawOutlineNetColoured,  
                         ePlaneDrawInvertedNetColoured\);

### <a id="TPlotLayer"></a>TPlotLayer

TPlotLayer = \(eNullPlot,  
              eTopLayerPlot,  
              eMidLayer1Plot,  
              eMidLayer2Plot,  
              eMidLayer3Plot,  
              eMidLayer4Plot,  
              eMidLayer5Plot,  
              eMidLayer6Plot,  
              eMidLayer7Plot,  
              eMidLayer8Plot,  
              eMidLayer9Plot,  
              eMidLayer10Plot,  
              eMidLayer11Plot,  
              eMidLayer12Plot,  
              eMidLayer13Plot,  
              eMidLayer14Plot,  
              eMidLayer15Plot,  
              eMidLayer16Plot,  
              eMidLayer17Plot,  
              eMidLayer18Plot,  
              eMidLayer19Plot,  
              eMidLayer20Plot,  
              eMidLayer21Plot,  
              eMidLayer22Plot,  
              eMidLayer23Plot,  
              eMidLayer24Plot,  
              eMidLayer25Plot,  
              eMidLayer26Plot,  
              eMidLayer27Plot,  
              eMidLayer28Plot,  
              eMidLayer29Plot,  
              eMidLayer30Plot,  
              eBottomLayerPlot,  
              eTopOverlayPlot,  
              eBottomOverlayPlot,  
              eTopPastePlot,  
              eBottomPastePlot,  
              eTopSolderPlot,  
              eBottomSolderPlot,  
              eInternalPlane1Plot,  
              eInternalPlane2Plot,  
              eInternalPlane3Plot,  
              eInternalPlane4Plot,  
              eInternalPlane5Plot,  
              eInternalPlane6Plot,  
              eInternalPlane7Plot,  
              eInternalPlane8Plot,  
              eInternalPlane9Plot,  
              eInternalPlane10Plot,  
              eInternalPlane11Plot,  
              eInternalPlane12Plot,  
              eInternalPlane13Plot,  
              eInternalPlane14Plot,  
              eInternalPlane15Plot,  
              eInternalPlane16Plot,  
              eDrillGuide\_Top\_BottomPlot,  
              eDrillGuide\_Top\_Mid1Plot,  
              eDrillGuide\_Mid2\_Mid3Plot,  
              eDrillGuide\_Mid4\_Mid5Plot,  
              eDrillGuide\_Mid6\_Mid7Plot,  
              eDrillGuide\_Mid8\_Mid9Plot,  
              eDrillGuide\_Mid10\_Mid11Plot,  
              eDrillGuide\_Mid12\_Mid13Plot,  
              eDrillGuide\_Mid14\_Mid15Plot,  
              eDrillGuide\_Mid16\_Mid17Plot,  
              eDrillGuide\_Mid18\_Mid19Plot,  
              eDrillGuide\_Mid20\_Mid21Plot,  
              eDrillGuide\_Mid22\_Mid23Plot,  
              eDrillGuide\_Mid24\_Mid25Plot,  
              eDrillGuide\_Mid26\_Mid27Plot,  
              eDrillGuide\_Mid28\_Mid29Plot,  
              eDrillGuide\_Mid30\_BottomPlot,  
              eDrillGuide\_SpecialPlot,  
              eKeepOutLayerPlot,  
              eMechanical1Plot,  
              eMechanical2Plot,  
              eMechanical3Plot,  
              eMechanical4Plot,  
              eMechanical5Plot,  
              eMechanical6Plot,  
              eMechanical7Plot,  
              eMechanical8Plot,  
              eMechanical9Plot,  
              eMechanical10Plot,  
              eMechanical11Plot,  
              eMechanical12Plot,  
              eMechanical13Plot,  
              eMechanical14Plot,  
              eMechanical15Plot,  
              eMechanical16Plot,  
              eDrillDrawing\_Top\_BottomPlot,  
              eDrillDrawing\_Top\_Mid1Plot,  
              eDrillDrawing\_Mid2\_Mid3Plot,  
              eDrillDrawing\_Mid4\_Mid5Plot,  
              eDrillDrawing\_Mid6\_Mid7Plot,  
              eDrillDrawing\_Mid8\_Mid9Plot,  
              eDrillDrawing\_Mid10\_Mid11Plot,  
              eDrillDrawing\_Mid12\_Mid13Plot,  
              eDrillDrawing\_Mid14\_Mid15Plot,  
              eDrillDrawing\_Mid16\_Mid17Plot,  
              eDrillDrawing\_Mid18\_Mid19Plot,  
              eDrillDrawing\_Mid20\_Mid21Plot,  
              eDrillDrawing\_Mid22\_Mid23Plot,  
              eDrillDrawing\_Mid24\_Mid25Plot,  
              eDrillDrawing\_Mid26\_Mid27Plot,  
              eDrillDrawing\_Mid28\_Mid29Plot,  
              eDrillDrawing\_Mid30\_BottomPlot,  
              eDrillDrawing\_SpecialPlot,  
              eTopPadMasterPlot,  
              eBottomPadMasterPlot\);

### <a id="TPlotPolygonProc"></a>TPlotPolygonProc

TPlotPolygonProc  = Procedure\(APoly : PGPC\_Polygon\) Of Object;

### <a id="TPlotterLanguage"></a>TPlotterLanguage

TPlotterLanguage = \( ePlotterLanguageHPGL,  
                     ePlotterLanguageDMPL\);

### <a id="TPolygonReliefAngle"></a>TPolygonReliefAngle

TPolygonReliefAngle  = \( ePolygonReliefAngle\_45,  
                         ePolygonReliefAngle\_90\);

### <a id="TPolygonRepourMode"></a>TPolygonRepourMode

TPolygonRepourMode = \( eNeverRepour      
                       eThresholdRepour  
                       eAlwaysRepour\);

### <a id="TPolygonType"></a>TPolygonType

TPolygonType = \( eSignalLayerPolygon,  
                 eSplitPlanePolygon\);

### <a id="TPolyHatchStyle"></a>TPolyHatchStyle

TPolyHatchStyle = \( ePolyHatch90,  
                    ePolyHatch45,  
                    ePolyVHatch,  
                    ePolyHHatch,  
                    ePolyNoHatch,  
                    ePolySolid\);

### <a id="TPolyRegionKind"></a>TPolyRegionKind

TPolyRegionKind = \( ePolyRegionKind\_Copper,   
                    ePolyRegionKind\_Cutout,   
                    ePolyRegionKind\_NamedRegion\);

### <a id="TPolySegmentType"></a>TPolySegmentType

TPolySegmentType = \( ePolySegmentLine,  
                     ePolySegmentArc\);

### <a id="TPrinterBatch"></a>TPrinterBatch

TPrinterBatch = \( ePlotPerSheet,  
                  ePanelize\);

### <a id="TPrinterComposite"></a>TPrinterComposite

TPrinterComposite    = \( eColorComposite,  
                         eMonoComposite\);

### <a id="TRouteLayer"></a>TRouteLayer

TRouteLayer = \(eRLLayerNotUsed,  
               eRLRouteHorizontal,  
               eRLRouteVertical,  
               eRLRouteSingleLayer,  
               eRLRoute\_1\_OClock,  
               eRLRoute\_2\_OClock,  
               eRLRoute\_4\_OClock,  
               eRLRoute\_5\_OClock,  
               eRLRoute\_45\_Up,  
               eRLRoute\_45\_Down,  
               eRLRouteFanout,  
               eRLRouteAuto\);

### <a id="TRouteVia"></a>TRouteVia

TRouteVia = \(eViaThruHole,  
             eViaBlindBuriedPair,  
             eViaBlindBuriedAny,  
             eViaNone\);

### <a id="TRoutingWidthMode"></a>TRoutingWidthMode

TRoutingWidthMode =    \(eRoutingWidth\_Default,  
                        eRoutingWidth\_Min,  
                        eRoutingWidth\_Preferred,  
                        eRoutingWidth\_Max\);

### <a id="TRuleKind"></a>TRuleKind

TRuleKind = \( eRule\_Clearance,  
              eRule\_ParallelSegment,  
              eRule\_MaxMinWidth,  
              eRule\_MaxMinLength,  
              eRule\_MatchedLengths,  
              eRule\_DaisyChainStubLength,  
              eRule\_PowerPlaneConnectStyle,  
              eRule\_RoutingTopology,  
              eRule\_RoutingPriority,  
              eRule\_RoutingLayers,  
              eRule\_RoutingCornerStyle,  
              eRule\_RoutingViaStyle,  
              eRule\_PowerPlaneClearance,  
              eRule\_SolderMaskExpansion,  
              eRule\_PasteMaskExpansion,  
              eRule\_ShortCircuit,  
              eRule\_BrokenNets,  
              eRule\_ViasUnderSMD,  
              eRule\_MaximumViaCount,  
              eRule\_MinimumAnnularRing,  
              eRule\_PolygonConnectStyle,  
              eRule\_AcuteAngle,  
              eRule\_ConfinementConstraint,  
              eRule\_SMDToCorner,  
              eRule\_ComponentClearance,  
              eRule\_ComponentRotations,  
              eRule\_PermittedLayers,  
              eRule\_NetsToIgnore,  
              eRule\_SignalStimulus,  
              eRule\_Overshoot\_FallingEdge,  
              eRule\_Overshoot\_RisingEdge,  
              eRule\_Undershoot\_FallingEdge,  
              eRule\_Undershoot\_RisingEdge,  
              eRule\_MaxMinImpedance,  
              eRule\_SignalTopValue,  
              eRule\_SignalBaseValue,  
              eRule\_FlightTime\_RisingEdge,  
              eRule\_FlightTime\_FallingEdge,  
              eRule\_LayerStack,  
              eRule\_MaxSlope\_RisingEdge,  
              eRule\_MaxSlope\_FallingEdge,  
              eRule\_SupplyNets,  
              eRule\_MaxMinHoleSize,  
              eRule\_TestPointStyle,  
              eRule\_TestPointUsage,  
              eRule\_UnconnectedPin,  
              eRule\_SMDToPlane,  
              eRule\_SMDNeckDown,  
              eRule\_LayerPair,  
              eRule\_FanoutControl,  
              eRule\_MaxMinHeight,  
              eRule\_DifferentialPairsRouting\);

### <a id="TRuleLayerKind"></a>TRuleLayerKind

TRuleLayerKind = \(eRuleLayerKind\_SameLayer,  
                  eRuleLayerKind\_AdjacentLayer\);

### <a id="TSameNamePadstackReplacementMode"></a>TSameNamePadstackReplacementMode

TSameNamePadstackReplacementMode  
                     = \( eAskUser          
                         eReplaceOne       
                         eReplaceAll       
                         eRenameOne        
                         eRenameAll        
                         eKeepOneExisting  
                         eKeepAllExisting  
                       \);

### <a id="TScopeId"></a>TScopeId

ScopeId = \(eScope1, eScope2\);

### <a id="TScopeKind"></a>TScopeKind

TScopeKind = \( eScopeKindBoard,  
               \{Lowest Precedence\}  
               eScopeKindLayerClass,  
               eScopeKindLayer,  
               eScopeKindObjectKind,  
               eScopeKindFootprint,  
               eScopeKindComponentClass,  
               eScopeKindComponent,  
               eScopeKindNetClass,  
               eScopeKindNet,  
               eScopeKindFromToClass,  
               eScopeKindFromTo,  
               eScopeKindPadClass,  
               eScopeKindPadSpec,  
               eScopeKindViaSpec,  
               eScopeKindFootprintPad,  
               eScopeKindPad,  
               eScopeKindRegion  
               \{Highest Precedence\}\);

### <a id="TScopeObjectId"></a>TScopeObjectId

TScopeObjectId = \( eRuleObject\_None,  
                   eRuleObject\_Wire,  
                   eRuleObject\_Pin,  
                   eRuleObject\_Smd,  
                   eRuleObject\_Via,  
                   eRuleObject\_Fill,  
                   eRuleObject\_Polygon,  
                   eRuleObject\_KeepOut\);

### <a id="TShape"></a>TShape

TShape = \(eNoShape,  
          eRounded,  
          eRectangular,  
          eOctagonal,  
          eCircleShape,  
          eArcShape,  
          eTerminator,  
          eRoundRectShape,  
          eRotatedRectShape  
          eRoundedRectangular  
\);

### <a id="TSignalLevel"></a>TSignalLevel

TSignalLevel = \( eLowLevel,  
                eHighLevel\);

### <a id="TSortBy"></a>TSortBy

TSortBy = \(eSortByAXThenAY,  
           eSortByAXThenDY,  
           eSortByAYThenAX,  
           eSortByDYThenAX,  
           eSortByName\);

### <a id="TSmartRouteMode"></a>TSmartRouteMode

TSmartRouteMode = \(eSRIgnoreObstacle,  
                   eSRAvoidObstacle,  
                   eSRWalkAroundObstacle,  
                   eSRPushObstacle\);

### <a id="TStimulusType"></a>TStimulusType

TStimulusType = \(eConstantLevel,  
                 eSinglePulse,  
                 ePeriodicPulse\);

### <a id="TStopBits"></a>TStopBits

TStopBits            = \( eStopBits1                                 ,  
                         eStopBits1\_5                               ,  
                         eDataBits2  
                       \);

### <a id="TString_(PCB)"></a>TString \(PCB\)

TString = ShortString;

### <a id="TStrokeArray"></a>TStrokeArray

TStrokeArray = Array\[1\.\.kMaxStrokes\] Of TStrokeRecord;

### <a id="TStrokeRecord"></a>TStrokeRecord

TStrokeRecord = Record  
   X1, Y1, X2, Y2 : TCoord;  
End;

### <a id="TTestPointStyle"></a>TTestPointStyle

TTestPointStyle = \(eExistingSMDBottom,  
                   eExistingTHPadBottom,  
                   eExistingTHViaBottom,  
                   eNewSMDBottom,  
                   eNewTHBottom,  
                   eExistingSMDTop,  
                   eExistingTHPadTop,  
                   eExistingTHViaTop,  
                   eNewSMDTop,  
                   eNewTHTop\);

### <a id="TTestpointValid"></a>TTestpointValid

TTestpointValid      = \( eRequire,  
                         eInvalid,  
                         eIgnore\);

### <a id="TTextAlignment"></a>TTextAlignment

TTextAlignment       = \( eNoneAlign                                 ,  
                         eCentreAlign                               ,  
                         eLeftAlign                                 ,  
                         eRightAlign                                ,  
                         eTopAlign                                  ,  
                         eBottomAlign  
                       \);

### <a id="TTextAutoposition"></a>TTextAutoposition

TTextAutoposition    = \( eAutoPos\_Manual,  
                         eAutoPos\_TopLeft,  
                         eAutoPos\_CenterLeft,  
                         eAutoPos\_BottomLeft,  
                         eAutoPos\_TopCenter,  
                         eAutoPos\_CenterCenter,  
                         eAutoPos\_BottomCenter,  
                         eAutoPos\_TopRight,  
                         eAutoPos\_CenterRight,  
                         eAutoPos\_BottomRight\);

### TUnit

TUnit = \(eMetric, eImperial\);

### <a id="TUnitStyle"></a>TUnitStyle

TUnitStyle = \( eNoUnits,  
               eYesUnits,  
               eParenthUnits\);

### <a id="TViewableObjectID"></a>TViewableObjectID