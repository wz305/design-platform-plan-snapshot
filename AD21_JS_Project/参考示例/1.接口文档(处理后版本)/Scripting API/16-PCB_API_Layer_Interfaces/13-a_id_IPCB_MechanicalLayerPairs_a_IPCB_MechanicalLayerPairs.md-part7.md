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