# Schematic API System Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Schematic API System Interfaces for version 22](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Schematic API](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


The Schematic API System Interface reference includes the following content:

[IConnection Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#IConnection Interface)  
[IConnectionsArray Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#IConnectionsArray Interface)  
[ISch\_Document Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_Document Interface)  
[ISch\_Sheet Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_Sheet Interface)  
[ISch\_Lib Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_Lib Interface)  
[ISch\_BasicContainer Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_BasicContainer Interface)  
[ISch\_GraphicalObject Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_GraphicalObject Interface)  
[ISch\_RobotManager Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_RobotManager Interface)  
[ISch\_ServerInterface Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_ServerInterface Interface)  
[ISch\_Preferences Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_Preferences Interface)  
[IGridSetting interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#IGridSetting interface)  
[ISch\_FontManager](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_FontManager)

[ISch\_FontManager2 Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_FontManager2 Interface)  
[ISch\_JunctionConvertSettings Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_JunctionConvertSettings Interface)  
[ISch\_LibraryRuleChecker Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_LibraryRuleChecker Interface)  
[ISch\_HitTest Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_HitTest Interface)  
[ISch\_Iterator Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ISch_Iterator Interface)  
[ILibCompInfoReader Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#ILibCompInfoReader Interface)  
[IComponentInfo Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#IComponentInfo Interface)  
[IComponentPainterView Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#IComponentPainterView Interface)  
[IComponentPinSelectionListener Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#IComponentPinSelectionListener Interface)  
[IComponentMetafilePainter](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#IComponentMetafilePainter)  
[IDocumentPainterView Interface](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21#IDocumentPainterView Interface)

 <a id="IConnection_Interface"></a>


__Overview__  
The IConnection interface represents whether the wire or bus connection has a manual junction on it or not, with location, wire or bus objects count and the thickness of wire or bus objects\.

The object count denotes the number of connections from this connection location for example one end of a capacitor can have two or more wire connections because it is tied to the Ground as well as to other points on the schematic\.

A connection that has 3 or more wire / bus objects denotes that a junction \(system generated or manually placed\) is required to tied the connections together\. Thus you can use the IConnection interface to determine the number of wire or bus connections at the specified location\.

The project that has schematics need to be compiled first before IConnection interfaces can be extracted with valid data\.

__Notes__  
The ISch\_Sheet interface has the IConnectionsArray interface which in turn has the IConnection interface\.  
The ISch\_Document can be either ISch\_Sheet or ISch\_Lib interfaces depending on which document \(Schematic Sheet or Schematic Library\) you are working with\.  
A manual junction \(placed by an user\) may signify a forced connection of at least 3 or more connections on a schematic document\.

__IConnection Methods and Properties Table__

__IConnection methods__  
GetState\_Location  
GetState\_ObjectsCount  
GetState\_IsManualJunction  
SetState\_Location  
SetState\_ObjectsCount  
SetState\_IsManualJunction

__IConnection properties__  
Location  
ObjectsCount  
IsManualJunction

__See also__  
IConnectionsArray interface  
ISch\_Junction interface  
ISch\_Sheet interface



\(ISch\_Connection interface\)  
__Syntax__  
Function GetState\_Location : TLocation;  
__Description__  
The GetState\_Location method retrieves the X,Y location of the wire or bus connection on the schematic document\. This method is used by the Location property\.  
__See also__  
ISch\_Connection interface  
Location Property and Example  
TLocation type


\(ISch\_Connection interface\)  
__Syntax__  
Function GetState\_ObjectsCount  
__Description__  
The GetState\_ObjectsCount method reports the number of wire or bus connections at a location on the schematic sheet\.  
__See also__  
ISch\_Connection interface  
ObjectsCount Property and Example


\(ISch\_Connection interface\)  
__Syntax__  
Function  GetState\_IsManualJunction  : Boolean;  
__Description__  
The GetState\_IsManualJunction function determines whether the connection has a manual junction or not\.  
__See also__  
ISch\_Connection interface  
Location property and example


\(ISch\_Connection interface\)  
__Syntax__  
Procedure SetState\_Location \(AValue : TLocation\);  
__Description__  
The procedure adds a location to the IConnection object\.  
__See also__  
ISch\_Connection interface


\(ISch\_Connection interface\)  
__Syntax__  
Procedure SetState\_ObjectsCount \(AValue : Integer\);  
__Description__  
This procedure sets the objects count for the IConnection object\.  
__See also__  
ISch\_Connection interface


\(ISch\_Connection interface\)  
__Syntax__  
Procedure SetState\_IsManualJunction\(AValue : Boolean\);  
__Description__  
This procedure sets the IsManualJunction Boolean setting for the IConnection object\.  
__See also__  
ISch\_Connection interface



\(IConnection interface\)  
__Syntax__  
Property ObjectsCount : Integer Read GetState\_ObjectsCount Write SetState\_ObjectsCount;  
__Description__  
This property retrieves or sets the Objects Count for Bus or Wire connection represented by  the IConnection object\.  
__Example__

01

Var

02

    I,J         : Integer;

03

    WS          : IWorkspace;

04

    Prj         : IProject;

05

    Doc         : IDocument;

06

    CurrentSch  : ISch\_Sheet;

07

    TheWireConnections : IConnectionsArray;

08

    WireConnection     : IConnection;

09

    Connectionslist    : TStringList;

10

    FileName           : String;

11

    FilePath           : String;

12

    ReportDocument     : IServerDocument;

13

Begin

14

    WS  := GetWorkspace;

15

    If WS = Nil Then Exit;

16

    Prj := WS\.DM\_FocusedProject;

17

    If Prj = Nil Then Exit;

18

    Prj\.DM\_Compile;

19

    Doc := WS\.DM\_FocusedDocument;

20

    ConnectionsList := TStringList\.Create;

21

    If Doc\.DM\_DocumentKind = 'SCH' Then

22

    Begin

23

         CurrentSch := SchServer\.GetSchDocumentByPath\(Doc\.DM\_FullPath\);

24

         If CurrentSch <> Nil Then

25

         Begin

26

              TheWireConnections := CurrentSch\.WireConnections;

27

              // Collect data for wire connections \(IConnectionArray\)

28

              ConnectionsList\.Add\('Wire Connections'\);

29

              For J := 0 To TheWireConnections\.ConnectionsCount \- 1 Do

30

              Begin

31

                 WireConnection := TheWireConnections\.Connection\(J\);

32

                 If WireConnection <> Nil Then

33

                 Begin

34

                     ConnectionsList\.Add\('Wire Connection Count: '                 \+ IntToStr     \(WireConnection\.ObjectsCount\)\);

35

                     ConnectionsList\.Add\('Wire Connection Location: '              \+ LocationtoStr\(WireConnection\.Location\)\); // currently 0,0

36

                     ConnectionsList\.Add\('Wire Connection has a manual junction: ' \+ BooleantoStr \(WireConnection\.IsManualJunction\)\);

37

                     ConnectionsList\.Add\('Wire Connection size: '                  \+ SizeToStr    \(WireConnection\.Size\)\);

38

                     ConnectionsList\.Add\(''\);

39

                 End;

40

              End;

41

         End;

42

    End;

43

  

44

    FilePath := ExtractFilePath\(Doc\.DM\_FullPath\);

45

    FileName := FilePath \+ '\\ConnectionsReport\.Txt';;

46

    ConnectionsList\.SaveToFile\(FileName\);

47

    ConnectionsList\.Free;

48

  

49

    ReportDocument := Client\.OpenDocument\('Text', FileName\);

50

    If ReportDocument <> Nil Then

51

        Client\.ShowDocument\(ReportDocument\);

52

End;

__See also__  
IConnection interface


\(IConnection interface\)  
__Syntax__  
Property Location : TLocation Read GetState\_Location Write SetState\_Location;  
__Description__  
This property retrieves or sets the Location of Bus or Wire connection represented by the IConnection object\.  
__Example__

01

    WS  := GetWorkspace;

02

    If WS = Nil Then Exit;

03

    Prj := WS\.DM\_FocusedProject;

04

    If Prj = Nil Then Exit;

05

    Prj\.DM\_Compile;

06

    Doc := WS\.DM\_FocusedDocument;

07

    If Doc\.DM\_DocumentKind = 'SCH' Then

08

    Begin

09

         CurrentSch := SchServer\.GetSchDocumentByPath\(Doc\.DM\_FullPath\);

10

         If CurrentSch <> Nil Then

11

         Begin

12

              TheWireConnections := CurrentSch\.WireConnections;

13

              For J := 0 To TheWireConnections\.ConnectionsCount \- 1 Do

14

              Begin

15

                 WireConnection := TheWireConnections\.Connection\(J\);

16

                 If WireConnection <> Nil Then

17

                 Begin

18

                     X := WireConnection\.Location\.X;

19

                     Y := WireConnection\.Location\.Y;

20

              End;

21

         End;

22

    End;

__See also__  
IConnection interface


\(IConnection interface\)  
__Syntax__  
Property IsManualJunction : Boolean Read GetState\_IsManualJunction Write SetState\_IsManualJunction;  
__Description__  
This property retrieves or sets the IsManualJunction setting of Bus or Wire connection represented by the IConnection object\.  
__Example__

01

    WS  := GetWorkspace;

02

    If WS = Nil Then Exit;

03

    Prj := WS\.DM\_FocusedProject;

04

    If Prj = Nil Then Exit;

05

    Prj\.DM\_Compile;

06

    Doc := WS\.DM\_FocusedDocument;

07

    If Doc\.DM\_DocumentKind = 'SCH' Then

08

    Begin

09

         CurrentSch := SchServer\.GetSchDocumentByPath\(Doc\.DM\_FullPath\);

10

         If CurrentSch <> Nil Then

11

         Begin

12

              TheWireConnections := CurrentSch\.WireConnections;

13

              For J := 0 To TheWireConnections\.ConnectionsCount \- 1 Do

14

              Begin

15

                 WireConnection := TheWireConnections\.Connection\(J\);

16

                 If WireConnection <> Nil Then

17

                 Begin

18

                     ManualJunctionAtConnection := WireConnection\.Location\.IsManualJunction;

19

                     //rest of code

20

              End;

21

         End;

22

    End;

__See also__  
IConnection interface


__Overview__  
The IConnectionsArray represents the bus and wire connections in a schematic document\. Bus and wire connections that have more than 3 connections could be connected by an automatic junction or a manual junction \(placed by an user\)\.

A schematic with valid buses and wires will have connections\. An IConnectionsArray interface has all the connections for this schematic sheet and each element in the IConnectionsArray interface is a IConnection interface type\.

__IConnectionsArray Methods and Properties Table__

__IConnectionsArray methods__  
AddConnection  
AddConnectionXY  
GetConnectionAt  
GetState\_Connection  
GetState\_ConnectionsCount  
GraphicallyInvalidate  
RemoveAllConnectionsAt  
RemoveAllConnectionsForLine  
ResetAllConnections

__IConnectionsArray properties__  
ConnectionsCount  
Connection

__See also__  
IConnection interface  
ISch\_Sheet interface



\(IConnectionsArray interface\)  
__Syntax__  
Procedure AddConnectionXY\(X, Y : TCoord\);  
__Description__  
This procedure adds a connection with X,Y parameters into the IConnectionsArray object\.  
__See also__  
IConnectionsArray interface  
AddConnection method


\(IConnectionsArray interface\)  
__Syntax__  
Procedure AddConnection \(ALocation : TLocation\);  
__Description__  
This procedure adds a connection with a location parameter into the IConnectionsArray object\.  
__See also__  
IConnectionsArray interface  
AddConnectionXY method


\(IConnectionsArray interface\)  
__Syntax__  
Function GetConnectionAt\(ALocation : TLocation\) : IConnection;  
__Description__  
This function retrieves the connection of IConnection type based on the Location parameter\.  
__Example__

1

Connection :=  Connections\.GetConnectionAt\(ALocation\);

2

If Connection <> Nil Then ShowMessage\(IntToStr\(Connection\.ObjectsCount\)\);

__See also__  
IConnectionsArray interface


\(IConnectionsArray interface\)  
__Syntax__  
Function GetState\_Connection\(Index : Integer\) : IConnection;  
__Description__  
This function retrieves the indexed connection of IConnection type from the IConnectionsArray interface\.  
__Example__

1

For J := 0 To TheBusConnections\.GetState\_ConnectionsCount \- 1 Do

2

Begin

3

    BusConnection := TheBusConnections\.GetState\_Connection\(J\); //IConnection

4

    If BusConnection <> Nil Then

5

    Begin

6

        // statements here

7

    End; 

8

End;

__See also__  
IConnectionsArray interface  
Connection property


\(IConnectionsArray interface\)  
__Syntax__  
Function GetState\_ConnectionsCount : Integer;  
__Description__  
This function returns the number of connections for wires or buses on the schematic sheet\. For each  
__Example__

1

For J := 0 To TheBusConnections\.GetState\_ConnectionsCount \- 1 Do

2

Begin

3

    BusConnection := TheBusConnections\.GetState\_Connection\(J\); //IConnection

4

    If BusConnection <> Nil Then

5

    Begin

6

        // statements here

7

    End; 

8

End;

__See also__  
IConnectionsArray interface  
ConnectionsCount property


\(IConnectionsArray interface\)  
__Syntax__  
Procedure GraphicallyInvalidate;  
__Description__  
This procedure puts the group of design objects \(bus or wire objects in an connection array\) in an invalid state\. A redraw is required to update the schematic sheet\.  
__Example__

1

TheWireConnections\.GraphicallyInvalidate; 

2

// puts the wires part of the connection group in an invalid state that requires a graphical redraw

__See also__  
IConnectionsArray interface


\(IConnectionsArray interface\)  
__Syntax__  
Function RemoveAllConnectionsAt\(ALocation : TLocation\) : Boolean;  
__Description__  
This function removes all connections at this specified location on the schematic document\.  
__Example__

1

If BusConnection\.ObjectsCount > 1 Then

2

    TheBusConnections\.RemoveAllConnectionsAt\(BusConnection\.Location\); 

3

// BusConnection = IConnection type, TheBusConnections = IConnectionsArray type

__See also__  
IConnectionsArray interface


\(IConnectionsArray interface\)  
__Syntax__  
Function RemoveAllConnectionsForLine\(L1, L2 : TLocation\) : Boolean;  
__Description__  
This function removes all connections for the specified line with L1 and L2 parameters\. If the call was successful, a true value is returned\. The Connections can either represent bus or wire connections\.  
__See also__  
IConnectionsArray interface


\(IConnectionsArray interface\)  
__Syntax__  
Procedure ResetAllConnections;  
__Description__  
This procedure resets all connections \(frees all items\) in the IConnectionsArray interface for either wire or bus connections\.  
__Example__

1

TheBusConnections\.ResetAllConnections;

2

//TheBusConnections = IConnectionsArray type

__See also__  
IConnectionsArray interface



\(IConnectionsArray interface\)  
__Syntax__  
Property Connection\[i : Integer\] : IConnection Read GetState\_Connection;  
__Description__  
__Example__

1

For J := 0 To TheBusConnections\.GetState\_ConnectionsCount \- 1 Do

2

Begin

3

    BusConnection := TheBusConnections\.GetState\_Connection\(J\); //IConnection

4

    If BusConnection <> Nil Then

5

    Begin

6

        // statements here

7

    End; 

8

End;

__See also__  
IConnectionsArray interface


\(IConnectionsArray interface\)  
__Syntax__  
Property ConnectionsCount : Integer Read GetState\_ConnectionsCount;  
__Description__  
__Example__

1

For J := 0 To TheBusConnections\.GetState\_ConnectionsCount \- 1 Do

2

Begin

3

    BusConnection := TheBusConnections\.GetState\_Connection\(J\); //IConnection

4

    If BusConnection <> Nil Then

5

    Begin

6

        // statements here

7

    End; 

8

End;

__See also__  
IConnectionsArray interface


__Overview__  
This interface is the immediate ancestor interface for ISch\_Sheet and ISch\_Lib interfaces\.

__Notes__

- You can modify or set the document's preference settings\.
- You can iterate design objects in a Schematic or library document, see ISch\_Iterator interface for details\.
- You can invoke the ChooseLocationInteractively or ChooseRectangleInteractively methods to obtain coordinates from the Schematic sheet or library sheet\.
- You can create a library from a project that has components
- You can check whether objects exist on a particular point on a schematic or library document\.

The ISch\_Document interface hierarchy is as follows;  
ISch\_BasicContainer  
    ISch\_GraphicalObject  
        ISch\_ParameterizedGroup  
            ISch\_Document

__ISch\_Document Methods and Properties Table__

__ISch\_Document methods__  
BoundingRectangle\_Selected  
ChooseLocationInteractively  
ChooseRectangleInteractively  
CountContextMenuObjects  
CreateHitTest  
CreateLibraryFromProject  
Graphical\_VirtualRectangle  
LockViewUpdate  
ObjectReferenceZone  
PlaceSchComponent  
PopupMenuHitTest  
RedrawToDC  
RegisterSchObjectInContainer  
UnLockViewUpdate  
UnregisterAndFreeAllConnectionLines  
UnRegisterSchObjectFromContainer  
UpdateDocumentProperties  
GetState\_BorderOn  
GetState\_CustomMarginWidth  
GetState\_CustomSheetStyle  
GetState\_CustomX  
GetState\_CustomXZones  
GetState\_CustomY  
GetState\_CustomYZones  
GetState\_DocumentBorderStyle  
GetState\_DocumentName  
GetState\_HotSpotGridOn  
GetState\_HotSpotGridSize  
GetState\_InternalTolerance  
GetState\_LoadFormat  
GetState\_ReferenceZonesOn  
GetState\_SheetMarginWidth  
GetState\_SheetSizeX  
GetState\_SheetSizeY  
GetState\_SheetStyle  
GetState\_SheetZonesX  
GetState\_SheetZonesY  
GetState\_ShowTemplateGraphics  
GetState\_SnapGridOn  
GetState\_SnapGridSize  
GetState\_SystemFont  
GetState\_TemplateFileName  
GetState\_TitleBlockOn  
GetState\_Unit  
GetState\_UnitSystem  
GetState\_UseCustomSheet  
GetState\_VisibleGridOn  
GetState\_VisibleGridSize  
GetState\_WorkspaceOrientation  
SetState\_BorderOn  
SetState\_CustomMarginWidth  
SetState\_CustomSheetStyle  
SetState\_CustomX  
SetState\_CustomXZones  
SetState\_CustomY  
SetState\_CustomYZones  
SetState\_DocumentBorderStyle  
SetState\_HotSpotGridOn  
SetState\_HotSpotGridSize  
SetState\_LoadFormat  
SetState\_ReferenceZonesOn  
SetState\_SheetMarginWidth  
SetState\_SheetSizeX  
SetState\_SheetSizeY  
SetState\_SheetStyle  
SetState\_SheetZonesX  
SetState\_SheetZonesY  
SetState\_ShowTemplateGraphics  
SetState\_SnapGridOn  
SetState\_SnapGridSize  
SetState\_SystemFont  
SetState\_TemplateFileName  
SetState\_TitleBlockOn  
SetState\_Unit  
SetState\_UseCustomSheet  
SetState\_VisibleGridOn  
SetState\_VisibleGridSize  
SetState\_WorkspaceOrientation

__ISch\_Document properties__  
BorderOn  
CustomMarginWidth  
CustomSheetStyle  
CustomX  
CustomXZones  
CustomY  
CustomYZones  
DisplayUnit  
DocumentBorderStyle  
DocumentName  
HotSpotGridOn  
HotSpotGridSize  
InternalTolerance  
LoadFormat  
ReferenceZonesOn  
SheetMarginWidth  
SheetSizeX  
SheetSizeY  
SheetStyle  
SheetZonesX  
SheetZonesY  
ShowTemplateGraphics  
SnapGridOn  
SnapGridSize  
SystemFont  
TemplateFileName  
TitleBlockOn  
UnitSystem  
UseCustomSheet  
VisibleGridOn  
VisibleGridSize  
WorkspaceOrientation

__See also__  
ISch\_Sheet interface  
ISch\_Lib interface



\(ISch\_Document interface\)  
__Syntax__  
Function BoundingRectangle\_Selected : TCoordRect;  
__Description__  
The function returns the coordinates of the selected bounding rectangle on the current schematic document\.  
__Example__

1

Rect := Sheet\.BoundingRectangle\_Selected;

2

MinX := Floor\(CoordToMils\(Rect\.x1\)\);

3

MinY := Floor\(CoordToMils\(Rect\.y1\)\);

4

MaxX := Ceil \(CoordToMils\(Rect\.x2\)\);

5

MaxY := Ceil \(CoordToMils\(Rect\.y2\)\);

__See also__  
ISch\_Document interface  
TCoordRect type


\(ISch\_Document interface\)  
__Syntax__  
Function ChooseLocationInteractively\(Var ALocation : TLocation; Prompt : TDynamicString\) : Boolean;  
__Description__  
To monitor the mouse movement and clicks from your script, the ISch\_Document document interface and its descendant interfaces, ISch\_Lib and ISch\_Sheet interfaces has several interactive feedback methods\. The ChooseLocationInteractively when invoked prompts the user to set the location \(point\) on the schematic sheet\.  
The ChooseLocationinteractively method can be used to fetch the coordinates of the clicked point on the schematic sheet and can be used for the ISch\_HitTest interface\.  
__Example__

1

    If SchServer = Nil Then Exit;

2

    CurrentSheet := SchServer\.GetCurrentSchDocument;

3

    If CurrentSheet = Nil Then Exit;

4

  

5

    ALocation := TLocation; //

6

    //Using the ChooseLocationInteractively method to capture the

7

    // location’s coordinates clicked on the sheet by the user\.

8

    If Not CurrentSheet\.ChooseLocationInteractively\(ALocation,

9

                                                   'Please select the location'\) Then Exit;

__See also__  
ISch\_Document interface  
ISch\_HitTest interface


\(ISch\_Document interface\)  
__Syntax__  
Function ChooseRectangleInteractively\(Var ARect : TCoordRect;Prompt1 : TDynamicString;Prompt2 : TDynamicString\) : Boolean;  
__Description__  
To monitor the mouse movement and clicks from your script, the ISch\_Document document interface and its descendant interfaces, ISch\_Lib and ISch\_Sheet interfaces has several interactive feedback methods\. The ChooseRectangleinteractively when invoked prompts the user to set the two corners of the bounding rectangle on the schematic sheet\.  
The ChooseRectangleinteractively method can be used to fetch the coordinates of the bounding rectangle \(of TCoordRect type\) for the Spatial iterator where it needs the bounds of a rectangle on the schematic document to search within\.  
__DelphiScript Example__

01

Var

02

    CurrentSheet    : ISch\_Document;

03

    SpatialIterator : ISch\_Iterator;

04

    GraphicalObj    : ISch\_GraphicalObject;

05

    Rect            : TCoordRect;

06

Begin

07

    If SchServer = Nil Then Exit;

08

    CurrentSheet := SchServer\.GetCurrentSchDocument;

09

    If CurrentSheet = Nil Then Exit;

10

    Rect := TCoordRect;

11

  

12

    If Not CurrentSheet\.ChooseRectangleInteractively\(Rect,

13

           'Please select the first corner',

14

           'Please select the final corner'\) Then Exit;

15

  

16

    SpatialIterator := CurrentSheet\.SchIterator\_Create;

17

    If SpatialIterator = Nil Then Exit;

18

    Try

19

        SpatialIterator\.AddFilter\_ObjectSet\(MkSet\(eJunction,eSchComponent\)\);

20

        SpatialIterator\.AddFilter\_Area\(Rect\.left, Rect\.bottom, Rect\.right, Rect\.top\);

21

        GraphicalObj := SpatialIterator\.FirstSchObject;

22

        While GraphicalObj <> Nil Do

23

        Begin

24

           // do what you want with the design object

25

           GraphicalObj := SpatialIterator\.NextSchObject;

26

        End;

27

  

28

    Finally

29

        CurrentSheet\.SchIterator\_Destroy\(SpatialIterator\);

30

    End;

31

End;

__See also__  
ISch\_Document interface  
TCoordRect type


\(ISch\_Document interface\)  
__Syntax__  
Function CountContextMenuObjects \(AObjectSet : TObjectSet\) : Integer;  
__Description__  
The function counts the contextual objects based on the AObjectSet parameter of TObjectSet type\.  
__Example__

1

SchDoc  := SchServer\.GetCurrentSchDocument;

2

Visible := \(SchDoc <> Nil\) And \(SchDoc\.CountContextMenuObjects\(\[eSchComponent\]\) > 0\);

__DelphiScript Example__

1

SchDoc  := SchServer\.GetCurrentSchDocument;

2

ShowMessage\(IntToStr\(SchDoc\.CountContextMenuObjects\(MkSet\(eSchComponent\)\) > 0\);

3

// DelphiScript cannot handle sets like Borland Delphi does so we need to use MkSet function\.

__See also__  
ISch\_Document interface  
TObjectSet


\(ISch\_Document interface\)  
__Syntax__  
Function CreateHitTest \(ATestMode : THitTestMode;ALocation : TLocation\) : ISch\_HitTest;  
__Description__  
The CreateHitTest function creates an hit test object which is represented by the ISch\_HitTest interface with the ATestMode and ALocation parameters\.  
With this ISch\_HitTest interface, the number of objects and the object type at a particular point on the schematic document can be returned\.  
__Example__

01

Doc := SchServer\.GetCurrentSchDocument;

02

If Doc = Nil Then Exit;

03

  

04

Doc\.ChooseLocationInteractively\(ALocation,'Choose a location to click'\);

05

AHitTestMode := eHitTest\_AllObjects;

06

AHitTest := Doc\.CreateHitTest\(AHitTestMode,ALocation\);

07

For I := 0 to AHitTest\.HitTestCount \- 1 Do

08

Begin

09

    APrim := AHitTest\.HitObject\[I\];

10

    ShowMessage\(ObjectIdToString\(APrim\.ObjectId\) \+ \#13 \+

11

               'Location coordinates \- '         \+ \#13 \+

12

               ' X= ' \+ IntToStr\(ALocation\.X\)    \+ \#13 \+

13

               ' Y= ' \+ IntToSTr\(ALocation\.Y\)\);

14

End;

__See also__  
ISch\_Document interface  
ISch\_HitTest interface  
THitTestMode type  
ChooseLocationInteractively method


\(ISch\_Document interface\)  
__Syntax__  
Procedure CreateLibraryFromProject \(AddLibToProject : Boolean;FileName : WideString; RunQuiet : Boolean\);  
__Description__  
This procedure creates a schematic library based on the components on a schematic project\. If AddLibToProject parameter is set to true, then the created library is put in the same project where the components are in\. The RunQuiet parameter set to true avoids the Information dialog from coming up\.  
__Example__

1

CurrentSheet := SchServer\.GetCurrentSchDocument;

2

If \(CurrentSheet = Nil\) or \(CurrentSheet\.ObjectID = eSchLib\) Then

3

Begin

4

    ShowError\('Please run the script on a schematic document\.'\);

5

    Exit;

6

End;

7

CurrentSheet\.CreateLibraryFromProject\(True,'NewLibrary\.SchLib',False\);

__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function Graphical\_VirtualRectangle : TCoordRect;  
__Description__  
The function returns the coordinates of TCoordRect type of the virtual rectangle of the graphical window in Altium Designer\.  
__Example__

1

Rect := Sheet\.Graphical\_VirtualRectangle;

2

MinX := Floor\(CoordToMils\(PrintRect\.x1\)\);

3

MinY := Floor\(CoordToMils\(PrintRect\.y1\)\);

4

MaxX := Ceil \(CoordToMils\(PrintRect\.x2\)\);

5

MaxY := Ceil \(CoordToMils\(PrintRect\.y2\)\);

__See also__  
ISch\_Document interface  
TCoordRect type


\(ISch\_Document interface\)  
__Syntax__  
Procedure LockViewUpdate;  
__Description__  
This procedure prevents the views of Schematic documents and panels from being refreshed or updated\. This is especially used in the situations when a component is being created in the Schematic Library Editor\. See the UnLockViewUpdate procedure\.  
__Example in Delphi Code__

1

If SchServer = Nil Then Exit;

2

If Not Supports \(SchServer\.GetCurrentSchDocument, ISch\_Lib, CurrentLib\) Then Exit;

3

  

4

CurrentLib\.LockViewUpdate;

5

CurrentComponent := CurrentLib\.CurrentSchComponent;

6

SimPortMap := '';

7

SimModel   := CreateSimObject\(SimPortMap, ModelName, ModelDescription, FileLocation, CurrentLib\);

8

CurrentLib\.CurrentSchComponent\.AddSchObject\(SimModel\);

9

CurrentLib\.UnLockViewUpdate;

__See also__  
ISch\_Document interface  
UnLockViewUpdate method


\(ISch\_Document interface\)  
__Syntax__  
Function ObjectReferenceZone\(AObject : ISch\_BasicContainer\): WideString;  
__Description__  
The function returns the reference zone string for the design object on the schematic sheet\. For example, if a sheet entry object is in the vicinity of Reference Zone C \(vertically\) and 2 \(horizontally\) for a Standard Style A document then the function will return a 2C for this sheet entry\.  
__Example__

1

SchPort\.CrossReference := ChangeFileExt\(ExtractFileName\(ServerDocument\.FileName\),''\) \+

2

                          '\[' \+ SchDocument\.ObjectReferenceZone\(SchSheetEntry\) \+ '\]' ;

__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure PlaceSchComponent \(ALibraryPath : WideString;ALibRef : WideString;Var SchObject : TSchObjectHandle\);  
__Description__  
This procedure places a component on a schematic sheet from the schematic library with ALibraryPath and ALibRef parameters\. The object handle of this component is returned\.  
__Example__

01

Var

02

   CurrentSheet : ISch\_Document;

03

   SchObject    : TSchObjectHandle;

04

   ALibraryPath : WideString;

05

   ALibRef      : WideString;

06

Begin

07

    CurrentSheet := SchServer\.GetCurrentSchDocument;

08

    If \(CurrentSheet = Nil\) or \(CurrentSheet\.ObjectID = eSchLib\) Then

09

    Begin

10

        ShowError\('Please run the script on a schematic document\.'\);

11

        Exit;

12

    End;

13

  

14

    SchObject    := 0;

15

    ALibraryPath := 'C:\\Program Files\\Altium Designer\\Examples\\Reference Designs\\4 Port Serial Interface\\Libraries\\4 Port Serial Interface\.SchLib';

16

 

17

    ALibRef      := 'Crystal';

18

  

19

    CurrentSheet\.PlaceSchComponent \(ALibraryPath, ALibRef, SchObject\);

20

    ShowMessage\(IntToStr\(SchObject\)\);

21

End;

__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure RedrawToDC\(DC : HDC; PrintKind : Integer; PrintWhat : Integer\);  
__Description__  
The DC parameter is a Handle of the canvas \(a encapsulation of a device context\)\.  
PrintKind is an ordinal value of the TPrintKind type, TPrintKind      = \(ePrintKind\_FullColor,ePrintKind\_GrayScale,ePrintKind\_Monochrome\);  
PrintWhat is an ordinal value of the TPrintWhat type, TPrintWhat      = \(ePrintAllDocuments,ePrintActiveDocument,ePrintSelection,ePrintScreenRegion\);  
__Example__  
SchLibrary\.RedrawToDC\(DC, Ord\(KindToPrint\), Ord\(PrinterOptions\.PrintWhat\)\);  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure RegisterSchObjectInContainer \(AObject : ISch\_BasicContainer\);  
__Description__  
The RegisterSchObjectInContainer procedure registers the object of ISch\_BasicContainer type \(including its descendants\) in the parent object itself\. In this case, the document registers a new design object\. For example when you create a new port object, you are required to register the port object in the schematic document\.  
__DelphiScript Example__

01

SchPort := SchServer\.SchObjectFactory\(ePort,eCreate\_GlobalCopy\);

02

If SchPort = Nil Then Exit;

03

SchPort\.Location  := Point\(MilsToCoord\(1000\),MilsToCoord\(1000\)\);

04

SchPort\.Style     := ePortRight;

05

SchPort\.IOType    := ePortBidirectional;

06

SchPort\.Alignment := eHorizontalCentreAlign;

07

SchPort\.Width     := MilsToCoord\(1000\);

08

SchPort\.AreaColor := 0;

09

SchPort\.TextColor := $FFFFFF;

10

SchPort\.Name      := 'Test Port';

11

SchDoc\.RegisterSchObjectInContainer\(SchPort\);

__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure UnLockViewUpdate;  
__Description__  
This procedure allows the views of Schematic documents and panels from being refreshed or updated after being locked by the LockViewUpdate method\. This is especially used in the situations when a component is being created in the Schematic Library Editor\. See the LockViewUpdate procedure\.  
__Example__

1

If SchServer = Nil Then Exit;

2

If Not Supports \(SchServer\.GetCurrentSchDocument, ISch\_Lib, CurrentLib\) Then Exit;

3

  

4

CurrentLib\.LockViewUpdate;

5

CurrentComponent := CurrentLib\.CurrentSchComponent;

6

SimPortMap := '';

7

SimModel   := CreateSimObject\(SimPortMap, ModelName, ModelDescription, FileLocation, CurrentLib\);

8

CurrentLib\.CurrentSchComponent\.AddSchObject\(SimModel\);

9

CurrentLib\.UnLockViewUpdate;

__See also__  
ISch\_Document interface  
LockViewUpdate method


\(ISch\_Document interface\)  
__Syntax__  
Procedure UnRegisterSchObjectFromContainer \(AObject : ISch\_BasicContainer\);  
__Description__  
When a schematic object is unregistered from the container, it is explicitly freed and cannot be used again\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure UnregisterAndFreeAllConnectionLines;  
__Description__  
When this procedure is invoked, the connection lines are unregistered and freed from the database associated with the schematic document\.  
__Example__  
SchDoc\.UnregisterAndFreeAllConnectionLines;  
__See also__  
ISch\_Document interface  
ISch\_ConnectionLine interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure UpdateDocumentProperties;  
__Description__  
This method forces an update of the document properties after the properties have been modified programmatically\.  
__Example__  
Document\.UpdateDocumentProperties;  
__See also__  
ISch\_Document interface



\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_BorderOn : Boolean;  
__Description__  
This BorderOn property determines whether the border on around the outside of the current schematic document will be displayed or not\.  
The method returns a boolean value whether the Border is displayed or not and is used in the BorderOn property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_CustomMarginWidth : TCoord;  
__Description__  
The CustomMarginWidth property sets the margin from the bounds of the schematic sheet inwards\. This method sets the CustomMarginWidth property\.  
Notes  
The UseCustomSheet property must be set to true before you can massage the attributes for the custom style of the schematic sheet\.  
__Example__  
__See also__  
ISch\_Document interface  
TCoord type


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_CustomSheetStyle : WideString;  
__Description__  
This property represents custom sheet style property which values can be inherited from one of the standard sheet styles and customized further\. This function sets the custom sheet style\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_CustomX : TCoord;  
__Description__  
The CustomX property determines the width of the custom sheet for the document\. This method gets the CustomX value and is used in the CustomX property\.  
__Example__  
__See also__  
ISch\_Document interface  
TCoord type


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_CustomXZones : TCoord;  
__Description__  
This property determines the number of regions or reference zones that are displayed along the horizontal and vertical borders\. The reference zones form a reference grid along the border of your schematic\. This reference grid is only for display purposes and does not affect the Snap, Visible or Electrical Grids that are used when placing schematic objects\.  
This method gets the CustomXZones property\.  
__Example__  
__See also__  
ISch\_Document interface  
TCoord type


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_CustomY : TCoord;  
__Description__  
The CustomY property determines the height of the custom sheet for the document\. This method gets the CustomY value and is used in the CustomY property\.  
__Example__  
__See also__  
ISch\_Document interface  
TCoord type


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_CustomYZones : TCoord;  
__Description__  
This property determines the number of regions or reference zones that are displayed along the horizontal and vertical borders\. The reference zones form a reference grid along the border of your schematic\. This reference grid is only for display purposes and does not affect the Snap, Visible or Electrical Grids that are used when placing schematic objects\.  
This method sets the CustomYZones property\.  
__Example__  
__See also__  
ISch\_Document interface  
TCoord type


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_DocumentBorderStyle : TSheetDocumentBorderStyle;  
__Description__  
The DocumentBorderStyle property determines the current document/border style for the schematic sheet \- ANSI or Standard block\.  
The function gets the current document border style and is used in the DocumentBorderStyle property\.  
__Example__  
__See also__  
ISch\_Document interface  
TSheetDocumentBorder style


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_DocumentName : WideString ;  
__Description__  
The read only DocumentName property determines the schematic document name\. This method is used in the DocumentName property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_HotSpotGridOn : Boolean;  
__Description__  
The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
The procedure gets the boolean value whether the hot spot grid is on or not and is used in the HotSpotGridOn property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_HotSpotGridSize : TCoord;  
__Description__  
The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
The procedure gets the hot spot grid size and is used in the HotSpotGridSize property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_InternalTolerance : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_LoadFormat : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_ReferenceZonesOn : Boolean;  
__Description__  
This property determines the number of regions or reference zones that are displayed along the horizontal and vertical borders\. The reference zones form a reference grid along the border of your schematic\. This reference grid is only for display purposes and does not affect the Snap, Visible or Electrical Grids that are used when placing schematic objects\.  
The procedure gets the value whether the reference zones can be displayed or not and is used in the ReferenceZonesOn property\.  
__Example__

01

Procedure TurnOffReferenceZones;

02

Var

03

    I          : Integer;

04

    Project    : IProject;

05

    Doc        : IDocument;

06

    CurrentSch : ISch\_Document;

07

Begin

08

    Project := GetWorkspace\.DM\_FocusedProject;

09

    If Project = Nil Then Exit;

10

  

11

    For I := 0 to Project\.DM\_LogicalDocumentCount \- 1 Do

12

    Begin

13

        Doc := Project\.DM\_LogicalDocuments\(I\);

14

        If Doc\.DM\_DocumentKind = 'SCH' Then

15

        Begin

16

            CurrentSch := SchServer\.GetSchDocumentByPath\(Doc\.DM\_FullPath\);

17

            If \(CurrentSch <> Nil\) And CurrentSch\.GetState\_ReferenceZonesOn Then

18

            Begin

19

              SchServer\.RobotManager\.SendMessage\(CurrentSch\.I\_ObjectAddress, c\_BroadCast, SCHM\_BeginModify, c\_NoEventData\);

20

              CurrentSch\.SetState\_ReferenceZonesOn\(False\);

21

              SchServer\.RobotManager\.SendMessage\(CurrentSch\.I\_ObjectAddress, c\_BroadCast, SCHM\_EndModify , c\_NoEventData\);

22

             End;

23

        End;

24

    End;

25

End;

__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SheetMarginWidth : TCoord;  
__Description__  
The SheetMarginWidth property determines the margin from the bounds of the schematic sheet inwards\.  
The SheetMarginWidth function gets the width of the sheet margin and is used in the SheetMarginWidth property\.  
Notes  
The UseCustomSheet property must be set to False before you can massage the attributes for the schematic sheet\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SheetSizeX : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SheetSizeY : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SheetStyle : TSheetStyle;  
__Description__  
The SheetStyle property determines the document standard style\. One of the document sheet styles are A4, Letter and imperial/metric sized sheets\.  
The procedure obtains the sheet style and is used in the SheetStyle property\.  
__Example__  
__See also__  
ISch\_Document interface  
TSheetStyle type


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SheetZonesX : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SheetZonesY : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_ShowTemplateGraphics : Boolean;  
__Description__  
The template is usually placed on the bottom right of the schematic sheet\. The template files have a DOT extension and are located in the \\Templates\\ folder of Altium Designer software installation\.  
The procedure determines whether the template graphics can be displayed or not and is used in the ShowTemplateGraphics property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SnapGridOn : Boolean;  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
The procedure gets a boolean value whether the SnapGrid is active or not and is used in the SnapGridOn property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SnapGridSize : TCoord;  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
The procedure gets the size value of the snap grid and is used in the SnapGridSize property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SystemFont : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_TemplateFileName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_TitleBlockOn : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_Unit : TUnit;  
__Description__  
This property determines the system unit used for the schematic project\. The available imperial units are Mils, inches, DXP default and Auto imperial as well as available metric units which are mm,cm, metres and auto\-metric\.  
__Example__  
__See also__  
ISch\_Document interface  
TUnit type


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_UnitSystem : TUnitSystem;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_UseCustomSheet : Boolean;  
__Description__  
The property determines whether a custom sheet is used instead of a standard sheet\. If the UseCustomSheet is true, then the CustomMarginWidth, CustomSheetStyle, CustomX and CustomY properties can be set for this custom sheet property\.  
This procedure gets the value whether the custom sheet is used instead of a standard sheet and is used in the UseCustomSheet property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_VisibleGridOn : Boolean;  
__Description__  
The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_VisibleGridSize : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_WorkspaceOrientation : TSheetOrientation;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_BorderOn \(AValue : Boolean\);  
__Description__  
This BorderOn property determines whether the border on around the outside of the current schematic document will be displayed or not\.  
The method sets a boolean value whether the Border is displayed or not and is used in the BorderOn property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_CustomMarginWidth \(AValue : TCoord\);  
__Description__  
The CustomMarginWidth property sets the margin from the bounds of the schematic sheet inwards\. This method sets the CustomMarginWidth property\.  
Notes  
The UseCustomSheet property must be set to true before you can massage the attributes for the custom style of the schematic sheet\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_CustomSheetStyle \(AValue : WideString\);  
__Description__  
This property represents custom sheet style property which values can be inherited from one of the standard sheet styles and customized further\. This method defines the custom sheet style and then can be customized further\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_CustomX \(AValue : TCoord\);  
__Description__  
The CustomX property sets the width of the custom sheet for the document\. This method sets the CustomX value and is used in the CustomX property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_CustomXZones \(AValue : TCoord\);  
__Description__  
This property determines the number of regions or reference zones that are displayed along the horizontal and vertical borders\. The reference zones form a reference grid along the border of your schematic\. This reference grid is only for display purposes and does not affect the Snap, Visible or Electrical Grids that are used when placing schematic objects\.  
This method sets the CustomXZones property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_CustomY \(AValue : TCoord\);  
__Description__  
The CustomY property sets the width of the custom sheet for the document\. This method sets the CustomY value and is used in the CustomY property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_CustomYZones \(AValue : TCoord\);  
__Description__  
This property determines the number of regions or reference zones that are displayed along the horizontal and vertical borders\. The reference zones form a reference grid along the border of your schematic\. This reference grid is only for display purposes and does not affect the Snap, Visible or Electrical Grids that are used when placing schematic objects\.  
This method sets the CustomYZones property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_DocumentBorderStyle \(AValue : TSheetDocumentBorderStyle\);  
__Description__  
The DocumentBorderStyle property determines the current document/border style for the schematic sheet \- ANSI or standard blocks\.  
The function sets the current document border style and is used in the DocumentBorderStyle property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_HotSpotGridOn \(AValue : Boolean\);  
__Description__  
The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_HotSpotGridSize \(AValue : TCoord\);  
__Description__  
The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
The procedure sets the hot spot grid size and is used in the HotSpotGridSize property\.  
__Example__  
__See also__  
ISch\_Document interface  
HotSpotGridOn method  
TCoord type


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_LoadFormat \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_ReferenceZonesOn \(AValue : Boolean\);  
__Description__  
This property determines the number of regions or reference zones that are displayed along the horizontal and vertical borders\. The reference zones form a reference grid along the border of your schematic\. This reference grid is only for display purposes and does not affect the Snap, Visible or Electrical Grids that are used when placing schematic objects\.  
The procedure sets whether the reference zones can be displayed or not and is used in the ReferenceZonesOn property\.  
__Example__

01

Procedure TurnOffReferenceZones;

02

Var

03

    I          : Integer;

04

    Project    : IProject;

05

    Doc        : IDocument;

06

    CurrentSch : ISch\_Document;

07

Begin

08

    Project := GetWorkspace\.DM\_FocusedProject;

09

    If Project = Nil Then Exit;

10

  

11

    For I := 0 to Project\.DM\_LogicalDocumentCount \- 1 Do

12

    Begin

13

        Doc := Project\.DM\_LogicalDocuments\(I\);

14

        If Doc\.DM\_DocumentKind = 'SCH' Then

15

        Begin

16

            CurrentSch := SchServer\.GetSchDocumentByPath\(Doc\.DM\_FullPath\);

17

            If \(CurrentSch <> Nil\) And CurrentSch\.GetState\_ReferenceZonesOn Then

18

            Begin

19

              SchServer\.RobotManager\.SendMessage\(CurrentSch\.I\_ObjectAddress, c\_BroadCast, SCHM\_BeginModify, c\_NoEventData\);

20

              CurrentSch\.SetState\_ReferenceZonesOn\(False\);

21

              SchServer\.RobotManager\.SendMessage\(CurrentSch\.I\_ObjectAddress, c\_BroadCast, SCHM\_EndModify , c\_NoEventData\);

22

             End;

23

        End;

24

    End;

25

End;

__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SheetMarginWidth \(AValue : TCoord\);  
__Description__  
The SheetMarginWidth property determines the margin from the bounds of the schematic sheet inwards\.  
The SheetMarginWidth procedure sets the width of the sheet margin and is used in the SheetMarginWidth property\.  
__Notes__  
The UseCustomSheet property must be set to False before you can massage the attributes for the schematic sheet\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SheetSizeX \(AValue : TCoord\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SheetSizeY \(AValue : TCoord\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SheetStyle \(AValue : TSheetStyle\);  
__Description__  
The SheetStyle property determines the document standard style\. One of the document sheet styles are A4, Letter and imperial/metric sized sheets\.  
The procedure defines the sheet style and is used in the SheetStyle property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SheetZonesX \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SheetZonesY \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_ShowTemplateGraphics\(AValue : Boolean\);  
__Description__  
The template is usually placed on the bottom right of the schematic sheet\. The template files have a DOT extension and are located in the in the \\Templates\\ folder of the Altium Designer software installation\.  
The procedure sets whether the template graphics can be displayed or not and is used in the ShowTemplateGraphics property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SnapGridOn \(AValue : Boolean\);  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
The procedure sets a boolean value whether the SnapGrid is active or not and is used in the SnapGridOn property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SnapGridSize \(AValue : TCoord\);  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
The procedure sets the size value of the snap grid and is used in the SnapGridSize property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SystemFont \(AValue : TFontId\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_TemplateFileName \(AValue : WideString\);  
__Description__  
The template filename is the filename of the template that is placed usually on the bottom right of the schematic sheet\. The template files have a DOT extension and are located in the \\Templates\\ folder of the Altium Designer installation\.  
The procedure sets the template filename and is used in the TemplateFilename property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_TitleBlockOn \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_Unit \(AValue : TUnit\);  
__Description__  
This property determines the system unit used for the schematic project\. The available imperial units are Mils, inches, DXP default and Auto imperial as well as available metric units which are mm,cm, metres and auto\-metric\.  
This method sets the Unit system and is used in the DisplayUnit property\.  
__Example__  
__See also__  
ISch\_Document interface  
TUnit type


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_UseCustomSheet \(AValue : Boolean\);  
__Description__  
The property determines whether a custom sheet is used instead of a standard sheet\. If the UseCustomSheet is true, then the CustomMarginWidth, CustomSheetStyle, CustomX and CustomY properties can be set for this custom sheet property\.  
This procedure sets whether the custom sheet is used instead of a standard sheet and is used in the UseCustomSheet property\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_VisibleGridOn \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_VisibleGridSize \(AValue : TCoord\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_WorkspaceOrientation\(AValue : TSheetOrientation\);  
__Description__  
This procedure sets the orientation of the workspace \- either as a portrait or as a landscape format\.  
__Example__  
__See also__  
ISch\_Document interface  
TSheetOrientation type



\(ISch\_Document interface\)  
__Syntax__  
Property BorderOn : Boolean Read GetState\_BorderOn Write SetState\_BorderOn;  
__Description__  
This BorderOn property determines whether the border on around the outside of the current schematic document will be displayed or not\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property CustomMarginWidth : TCoord Read GetState\_CustomMarginWidth Write SetState\_CustomMarginWidth;  
__Description__  
The CustomMarginWidth property sets the margin from the bounds of the schematic sheet inwards\. This property is supported by the GetState\_CustomMarginWidth and SetState\_CustomMarginWidth methods\.  
Notes  
The UseCustomSheet property must be set to true before you can massage the attributes for the custom style of the schematic sheet\.  
__Example__  
__See also__  
ISch\_Document interface  
UseCustomSheet property


\(ISch\_Document interface\)  
__Syntax__  
Property CustomSheetStyle : WideString Read GetState\_CustomSheetStyle Write SetState\_CustomSheetStyle;  
__Description__  
This property represents custom sheet style property which values can be inherited from one of the standard sheet styles and customized further\.  
This property is supported by the GetState\_CustomSheetStyle and SetState\_CustomSheetStyle methods\.  
Notes  
The UseCustomSheet property must be set to true before you can massage the attributes for the custom style of the schematic sheet\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property CustomX : TCoord Read GetState\_CustomX Write SetState\_CustomX;  
__Description__  
This property sets the width of the custom sheet for the document\. This property is supported by the GetState\_CustomX and SetState\_CustomX methods\.  
Notes  
The UseCustomSheet property must be set to true before you can massage the attributes for the custom style of the schematic sheet\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property CustomXZones : TCoord Read GetState\_CustomXZones Write SetState\_CustomXZones;  
__Description__  
This property determines the number of regions or reference zones that are displayed along the horizontal and vertical borders\. The reference zones form a reference grid along the border of your schematic\. This reference grid is only for display purposes and does not affect the Snap, Visible or Electrical Grids that are used when placing schematic objects\.  
This property is supported by the GetState\_CustomXZones and SetState\_CustomXZones methods\.  
Notes  
The UseCustomSheet property must be set to true before you can massage the attributes for the custom style of the schematic sheet\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property CustomY : TCoord Read GetState\_CustomY Write SetState\_CustomY;  
__Description__  
This property sets the height of the custom sheet for the document\. This property is supported by the GetState\_CustomY and SetState\_CustomY methods\.  
Notes  
The UseCustomSheet property must be set to true before you can massage the attributes for the custom style of the schematic sheet\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property CustomYZones : TCoord Read GetState\_CustomYZones Write SetState\_CustomYZones;  
__Description__  
This property determines the number of regions or reference zones that are displayed along the horizontal and vertical borders\. The reference zones form a reference grid along the border of your schematic\. This reference grid is only for display purposes and does not affect the Snap, Visible or Electrical Grids that are used when placing schematic objects\.  
This property is supported by the GetState\_CustomYZones and SetState\_CustomYZones methods\.  
Notes  
The UseCustomSheet property must be set to true before you can massage the attributes for the custom style of the schematic sheet\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property DocumentBorderStyle : TSheetDocumentBorderStyle Read GetState\_DocumentBorderStyle Write SetState\_DocumentBorderStyle;  
__Description__  
The DocumentBorderStyle property determines the current document/border style for the schematic sheet \- whether it is a standard or an ANSI title block\.  
This property is supported by the GetState\_DocumentBorderStyle and SetState\_DocumentBorderStyle methods\.  
__Example__  
__See also__  
ISch\_Document interface  
TSheetDocumentBorderStyle type


\(ISch\_Document interface\)  
__Syntax__  
Property DisplayUnit : TUnit Read GetState\_Unit Write SetState\_Unit;  
__Description__  
This property determines the system unit used for the schematic project\. The available imperial units are Mils, inches, DXP default and Auto imperial as well as available metric units which are mm,cm,metres and autometric\.  
This DisplayUnit property is supported by the GetState\_Unit and SetState\_Unit methods\.  
__Example__  
__See also__  
ISch\_Document interface  
TUnit type


\(ISch\_Document interface\)  
__Syntax__  
Property DocumentName : WideString Read GetState\_DocumentName;  
__Description__  
This read only property determines the schematic document name\. This property is supported by the GetState\_DocumentName;  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property HotSpotGridOn : Boolean Read GetState\_HotSpotGridOn Write SetState\_HotSpotGridOn;  
__Description__  
The property determines whether the hot spot grid is displayed or not\. The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
This property is supported by the GetState\_HotSpotGridOn and SetState\_HotSpotGridOn methods\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property HotSpotGridSize : TCoord Read GetState\_HotSpotGridSize Write SetState\_HotSpotGridSize;  
__Description__  
The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
The HotSpotGridSize property determines the size of the hot spot \(electrical grid\) in TCoord units\.  
__Example__  
__See also__  
ISch\_Document interface  
HotSpotGridOn  
SnapGridOn  
SnapGridSize  
TCoord type


\(ISch\_Document interface\)  
__Syntax__  
Property InternalTolerance : TCoord Read GetState\_InternalTolerance;   
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property LoadFormat : WideString Read GetState\_LoadFormat Write SetState\_LoadFormat;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Function PopupMenuHitTest : ISch\_HitTest;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface  
ISch\_HitTest interface


\(ISch\_Document interface\)  
__Syntax__  
Property ReferenceZonesOn : Boolean Read GetState\_ReferenceZonesOn Write SetState\_ReferenceZonesOn;  
__Description__  
This property determines the number of regions or reference zones that are displayed along the horizontal and vertical borders\. The reference zones form a reference grid along the border of your schematic\. This reference grid is only for display purposes and does not affect the Snap, Visible or Electrical Grids that are used when placing schematic objects\.  
This property determines whether the reference zones can be displayed or not and is supported by the GetState\_ReferenceZonesOn and SetState\_ReferenceZonesOn methods\.  
__Example__

01

Procedure TurnOffReferenceZones;

02

Var

03

    I          : Integer;

04

    Project    : IProject;

05

    Doc        : IDocument;

06

    CurrentSch : ISch\_Document;

07

Begin

08

    Project := GetWorkspace\.DM\_FocusedProject;

09

    If Project = Nil Then Exit;

10

  

11

    For I := 0 to Project\.DM\_LogicalDocumentCount \- 1 Do

12

    Begin

13

        Doc := Project\.DM\_LogicalDocuments\(I\);

14

        If Doc\.DM\_DocumentKind = 'SCH' Then

15

        Begin

16

            CurrentSch := SchServer\.GetSchDocumentByPath\(Doc\.DM\_FullPath\);

17

            If \(CurrentSch <> Nil\) And CurrentSch\.ReferenceZonesOn Then

18

            Begin

19

              SchServer\.RobotManager\.SendMessage\(CurrentSch\.I\_ObjectAddress, c\_BroadCast, SCHM\_BeginModify, c\_NoEventData\);

20

              CurrentSch\.ReferenceZonesOn :=  False;

21

              SchServer\.RobotManager\.SendMessage\(CurrentSch\.I\_ObjectAddress, c\_BroadCast, SCHM\_EndModify , c\_NoEventData\);

22

             End;

23

        End;

24

    End;

25

End;

__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property SheetMarginWidth : TCoord Read GetState\_SheetMarginWidth Write SetState\_SheetMarginWidth;  
__Description__  
The SheetMarginWidth property sets the margin from the bounds of the schematic sheet inwards\. This property is supported by the GetState\_MarginWidth and SetState\_MarginWidth methods\.  
Notes  
The UseCustomSheet property must be set to False before you can massage the attributes for the schematic sheet\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property SheetStyle : TSheetStyle Read GetState\_SheetStyle Write SetState\_SheetStyle;  
__Description__  
The SheetStyle property determines the document standard style\. One of the document sheet styles are A4, Letter and imperial/metric sized sheets\.  
This property is supported by the GetState\_SheetStyle and SetState\_SheetStyle methods\.  
__Example__  
__See also__  
ISch\_Document interface  
TSheetStyle type


\(ISch\_Document interface\)  
__Syntax__  
Property SheetSizeX : TCoord Read GetState\_SheetSizeX Write SetState\_SheetSizeX;  
__Description__  
The SheetSizeX property defines the width of the sheet\. This property is supported by the GetState\_SheetSizeX and GetState\_SheetSizeX methods\.  
__Example__  
__See also__  
ISch\_Document interface  
SheetSizeY method


\(ISch\_Document interface\)  
__Syntax__  
Property SheetSizeY : TCoord Read GetState\_SheetSizeY Write SetState\_SheetSizeY;  
__Description__  
The SheetSizeY property defines the height of the sheet\. This property is supported by the GetState\_SheetSizeY and GetState\_SheetSizeY methods\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property SheetZonesX : Integer Read GetState\_SheetZonesX Write SetState\_SheetZonesX;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property SheetZonesY : Integer Read GetState\_SheetZonesY Write SetState\_SheetZonesY;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property ShowTemplateGraphics : Boolean Read GetState\_ShowTemplateGraphics Write SetState\_ShowTemplateGraphics;  
__Description__  
The template is usually placed on the bottom right of the schematic sheet\. The template files have a DOT extension and are located in the \\Templates\\ folder of the Altium Designer software installation\.  
The property determines whether the template graphics are displayed or not\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property SnapGridOn : Boolean Read GetState\_SnapGridOn Write SetState\_SnapGridOn;  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
This property is supported by the GetState\_SnapGridOn and SetState\_SnapGridOn methods\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property SnapGridSize : TCoord Read GetState\_SnapGridSize Write SetState\_SnapGridSize;  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
The property defines the snap grid size and is supported by the GetState\_SnapGridSize and SetState\_SnapGridSize methods\.  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property SystemFont : TFontId Read GetState\_SystemFont Write SetState\_SystemFont;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface  
TFontID type


\(ISch\_Document interface\)  
__Syntax__  
Property TemplateFileName : WideString Read GetState\_TemplateFileName Write SetState\_TemplateFileName;  
__Description__  
The template filename is the filename of the template that is placed usually on the bottom right of the schematic sheet\. The template files have a DOT extension and are located in the \\Templates\\ folder of Altium Designer software installation\.  
This TemplateFileName property is supported by the GetState\_TemplateFileName and SetState\_TemplateFileName methods\.  
__Example__  
__See also__  
ISch\_Document interface  
ShowTemplateGraphics method


\(ISch\_Document interface\)  
__Syntax__  
Property TitleBlockOn : Boolean Read GetState\_TitleBlockOn Write SetState\_TitleBlockOn;  
__Description__  
The property determines whether the title block is displayed or not and is supported by the GetState\_TitleBlockOn and SetState\_TitleBlockOn methods\.  
__Example__  
__See also__  
ISch\_Document interface  
DocumentBorderStyle method


\(ISch\_Document interface\)  
__Syntax__  
Property VisibleGridOn : Boolean Read GetState\_VisibleGridOn Write SetState\_VisibleGridOn;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property UnitSystem : TUnitSystem Read GetState\_UnitSystem;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property UseCustomSheet : Boolean Read GetState\_UseCustomSheet Write SetState\_UseCustomSheet;  
__Description__  
The property determines whether a custom sheet is used instead of a standard sheet\. If the UseCustomSheet is true, then the CustomMarginWidth, CustomSheetStyle, CustomX and CustomY properties can be set for this custom sheet property\.  
The UseCustomSheet property is supported by the GetState\_UseCustomSheet and SetState\_UseCustomSheet methods\.  
__Example__  
__See also__  
ISch\_Document interface  
CustomX property  
CustomY property  
CustomSheetStyle property  
CustomMarginWidth property


\(ISch\_Document interface\)  
__Syntax__  
Property VisibleGridSize : TCoord Read GetState\_VisibleGridSize Write SetState\_VisibleGridSize;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


\(ISch\_Document interface\)  
__Syntax__  
Property WorkspaceOrientation : TSheetOrientation Read GetState\_WorkspaceOrientation Write SetState\_WorkspaceOrientation;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface


__Overview__  
The ISch\_Sheet interface represents an existing schematic document open in Altium Designer\. A schematic document can have bus and wiring connections which are represented by the IConnectionsArray interface\.

- You can modify or set the document's preference settings\.
- You can iterate design objects in a Schematic or library document, see ISch\_Iterator interface for details\.
- You can invoke the ChooseLocationInteractively or ChooseRectangleInteractively methods to obtain coordinates from the Schematic sheet or library sheet\.
- You can create a library from a project that has components
- You can check whether objects exist on a particular point on a schematic or library document\.

__Notes__  
The ISch\_Sheet interface hierarchy is as follows;  
ISch\_BasicContainer  
    ISch\_GraphicalObject  
        ISch\_ParameterizedGroup  
        ISch\_Document  
            ISch\_Sheet

__ISch\_Sheet methods__  
GetState\_WireConnections  
GetState\_BusConnections  
OptimizeUseOfPolylines  
GetState\_HarnessDefinitionsChanged  
Reset\_HarnessDefinitionsChanged  
Raise\_HarnessDefinitionsChanged

__ISch\_Sheet properties__  
WireConnections  
BusConnections  
HarnessDefinitionsChanged

__See also__  
ISch\_Document interface  
ISch\_Lib interface



\(ISch\_Sheet interface\)  
__Syntax__  
Function GetState\_BusConnections : IConnectionsArray;  
__Description__  
This function fetches the connections of the busses on a schematic document\. This method is used in the BusConnections property\.  
__Example__  
__See also__  
ISch\_Sheet interface


\(ISch\_Sheet interface\)  
__Syntax__  
Function GetState\_WireConnections : IConnectionsArray;  
__Description__  
This function fetches the connections of the wires on a schematic document\. This method is used in the WireConnections property\.  
__Example__  
__See also__  
ISch\_Sheet interface


\(ISch\_Sheet interface\)  
__Syntax__  
Procedure OptimizeUseOfPolylines;  
__Description__  
This procedure forces the optimal connection of polylines graphically and in the datastructure\.  
__Example__  
__See also__  
ISch\_Sheet interface


\(ISch\_Sheet interface\)  
__Syntax__  
Function  GetState\_HarnessDefinitionsChanged : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Sheet interface


\(ISch\_Sheet interface\)  
__Syntax__  
Procedure Reset\_HarnessDefinitionsChanged;    
__Description__  
__Example__  
__See also__  
ISch\_Sheet interface


\(ISch\_Sheet interface\)  
__Syntax__  
Procedure Raise\_HarnessDefinitionsChanged;  
__Description__  
__Example__  
__See also__  
ISch\_Sheet interface



\(ISch\_Sheet interface\)  
__Syntax__  
Property BusConnections : IConnectionsArray Read GetState\_BusConnections;  
__Description__  
This property fetches the connections of busses on the schematic document\. This property is supported by the GetState\_BusConnections method\.  
__Example__  
__See also__  
ISch\_Sheet interface


\(ISch\_Sheet interface\)  
__Syntax__  
Property WireConnections : IConnectionsArray Read GetState\_WireConnections;  
__Description__  
This property fetches the connections of wires on the schematic document\. This property is supported by the GetState\_WireConnections method\.  
__Example__  
__See also__  
ISch\_Sheet interface


\(ISch\_Sheet interface\)  
__Syntax__  
Property HarnessDefinitionsChanged : Boolean Read GetState\_HarnessDefinitionsChanged;  
__Description__  
This property is supported by the GetState\_HarnessDefinitionsChanged method\.  
__Example__  
__See also__  
ISch\_Sheet interface


__Overview__  
This interface represents an existing library document open in Altium Designer\. A library is composed of library pages and each page represents the symbol \(schematic library component\)\.

- You can modify or set the document's preference settings\.
- You can invoke the ChooseLocationInteractively or ChooseRectangleInteractively methods to obtain coordinates from the Schematic sheet or library sheet\.
- You can check whether objects exist on a particular point on a schematic or library document\.
- You can iterate design objects in a library document, with the library iterator\. This iterator is created by the SchLibIterator\_Create function\.
- You can invoke the LibIsEmpty method to check if the library is empty \(ie no symbols in the library\) or not\.

__Notes__  
Due to the nature of a library document, all symbols \(library components\) are displayed on their library pages, so you iterate through the library to fetch symbols\.

The ISch\_Lib interface hierarchy is as follows;  
ISch\_BasicContainer  
    ISch\_GraphicalObject  
        ISch\_ParameterizedGroup  
            ISch\_Document  
                ISch\_Lib

__ISch\_Lib methods__  
AddSchComponent  
LibIsEmpty  
RemoveSchComponent  
Sch\_LibraryRuleChecker\_Create  
Sch\_LibraryRuleChecker\_Destroy  
SchLibIterator\_Create  
TransferComponentsPrimitivesBackFromEditor  
TransferComponentsPrimitivesToEditor  
GetState\_Current\_SchComponent  
GetState\_CurrentSchComponentDisplayMode  
GetState\_CurrentSchComponentPartId  
GetState\_Description  
GetState\_ShowHiddenPins  
SetState\_Current\_SchComponent  
SetState\_CurrentSchComponentAddDisplayMode  
SetState\_CurrentSchComponentAddPart  
SetState\_CurrentSchComponentDisplayMode  
SetState\_CurrentSchComponentPartId  
SetState\_CurrentSchComponentRemoveDisplayMode  
SetState\_CurrentSchComponentRemovePart  
SetState\_Description  
SetState\_ShowHiddenPins

__ISch\_Lib properties__  
CurrentSchComponent  
Description  
ShowHiddenPins

__See also__  
ISch\_Iterator interface  
ILibCompInfoReader interface  
IComponentINfo interface



\(ISch\_Lib interface\)  
__Syntax__  
Procedure AddSchComponent \(Const AComponent : ISch\_Component\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Function LibIsEmpty : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Function SchLibIterator\_Create : ISch\_Iterator;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure RemoveSchComponent\(Const AComponent : ISch\_Component\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Function Sch\_LibraryRuleChecker\_Create : ISch\_LibraryRuleChecker;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure Sch\_LibraryRuleChecker\_Destroy \(Var ARuleChecker : ISch\_LibraryRuleChecker\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure TransferComponentsPrimitivesToEditor;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure TransferComponentsPrimitivesBackFromEditor;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Function GetState\_Current\_SchComponent: ISch\_Component;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Function GetState\_CurrentSchComponentDisplayMode : TDisplayMode;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Function GetState\_CurrentSchComponentPartId : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Function GetState\___Description__ : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Function GetState\_ShowHiddenPins : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_Current\_SchComponent\(AValue : ISch\_Component\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentAddDisplayMode;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentAddPart;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentDisplayMode\(ADisplayMode : TDisplayMode\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentPartId\(APartId : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentRemoveDisplayMode;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentRemovePart;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_Description \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_ShowHiddenPins \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface



\(ISch\_Lib interface\)  
__Syntax__  
Property Description : WideString Read GetState\_Description Write SetState\_Description;  
__Description__  
This property gets or sets the description of the library document\. This property is supported by its GetState\_Description and SetState\_Description methods\.  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Property ShowHiddenPins : Boolean Read GetState\_ShowHiddenPins Write SetState\_ShowHiddenPins;  
__Description__  
This property gets or sets the visible property of hidden pins of the component in the library document\. This property is supported by its GetState\_ShowHiddenPins and SetState\_ShowHiddenPins methods\.  
__Example__  
__See also__  
ISch\_Lib interface


\(ISch\_Lib interface\)  
__Syntax__  
Property CurrentSchComponent : ISch\_Component Read GetState\_Current\_SchComponent Write SetState\_Current\_SchComponent;  
__Description__  
This property gets or sets the component as the current component in the library document\. This property is supported by its GetState\_CurrentSchComponent and SetState\_CurrentSchComponent methods\.  
__Example__  
__See also__  
ISch\_Lib interface


__Overview__  
The ISch\_BasicContainer interface represents as a parent object or a child object for a schematic object in Altium Designer\.

- A sheet symbol object for example is a parent object, and its child objects are sheet entries, thus to fetch the sheet entries, you would create an iterator for the sheet symbol and iterate for sheet entry objects\.
- A schematic document is a parent object as well thus you also create an iterator for this document and iterate for objects on this document\.

__Notes__  
ISch\_BasicContainer is the ancestor interface object for schematic object interfaces\.  
ISch\_BasicContainer is the ancestor interface object for ISch\_MapDefiner and ISch\_Implementation interfaces\.  
ISch\_Document is inherited from ISch\_BasicContainer and is a container for storing design objects and in turn each design object is inherited from the ISch\_BasicContainer interface\.  
ISch\_Iterator fetches design objects which are inherited from the ISch\_BasicContainer interface\.

__ISch\_BasicContainer methods__  
GetState\_ObjectId  
GetState\_SchBasicContainer  
GetState\_OwnerSchDocument  
GetState\_Text  
GetState\_IdentifierString  
GetState\_DescriptionString  
Setstate\_Default  
SetState\_Text  
I\_ObjectAddress  
AddSchObject  
AddAndPositionSchObject  
RemoveSchObject  
SchIterator\_Create  
SchIterator\_Destroy  
DeleteAll  
FreeAllContainedObjects  
Import\_FromUser  
Replicate

__ISch\_BasicContainer properties__  
Container  
ObjectId  
OwnerDocument

__See also__  
ISch\_GraphicalObject interface  
ISch\_Document interface  
ISch\_Implementation interface  
ISch\_MapDefiner interface



\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure AddAndPositionSchObject\(AObject : ISch\_BasicContainer\);  
__Description__  
The AddSchObject procedure adds and positions a child object into the parent object that the AddSchObject is associated with\. For example adding sheet entries in a sheet symbol, you would use this method\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
AddSchObject method


\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure AddSchObject \(AObject : ISch\_BasicContainer\);  
__Description__  
The AddSchObject procedure adds a child object into the parent object that the AddSchObject is associated with\.  
DelphiScript __Example__

01

// Create a parameter object and add it to the new pin object\.

02

Try

03

    SchServer\.ProcessControl\.PreProcess\(SchDoc, ''\);

04

    // Add the parameter to the pin with undo stack also enabled

05

    Param\.Name := 'Added Parameter';

06

    Param\.Text := 'Param added to the pin\. Press Undo and this will disappear\.  Press undo twice to remove the component';

07

    Param\.Location := Point\(InchesToCoord\(3\), InchesToCoord\(2\.4\)\);

08

    Pin\.AddSchObject\(Param\);

09

    SchServer\.RobotManager\.SendMessage\(Component\.I\_ObjectAddress, c\_BroadCast, SCHM\_PrimitiveRegistration, Param\.I\_ObjectAddress\);

10

Finally

11

    SchServer\.ProcessControl\.PostProcess\(SchDoc, ''\);

12

End;

__See also__  
ISch\_BasicContainer interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure DeleteAll;  
__Description__  
The DeleteAll procedure removes the contained objects from the container of ISch\_BasicContainer type\. For example, if you just want to get a list of contained objects, and make small changes to them and then move them to a new container\. In this case, you do not want to free and recreate all the contained objects, so you use the DeleteAll method\. To have a clean container, you need to call the FreeAllContainedObjects method instead\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
FreeAllContainedObjects method


\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure FreeAllContainedObjects;  
__Description__  
The FreeAllContainedObjects procedure removes the contained objects from the container of ISch\_BasicContainer type and the container ends up clean\. To have container that can be reused with the same elements in another container, you need to call the DeleteAll method instead\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
DeleteAll method


\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_DescriptionString : WideString;  
__Description__  
This function returns you the description string for this object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_IdentifierString : WideString;  
__Description__  
This function returns you the identifier string\.  
__Example__  
__See also__  
ISch\_BasicContainer interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_ObjectId : TObjectId;  
__Description__  
The ObjectID property determines what object type the object in question is\. For example when iterating for objects on a schematic document, you would want to modify all objects but update the port objects' locations only, thus you check for the object's ObjectId and if it is a ePort type, then take action\.  
The function retrieves the ObjectId type and this function is used as a getter in the ObjectID property\.  
__DelphiScript Example__

01

AnObject := Iterator\.FirstSchObject;

02

While AnObject <> Nil Do

03

Begin

04

    SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_BeginModify, c\_NoEventData\);

05

  

06

    Case AnObject\.ObjectId Of

07

       eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

08

       ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

09

    End;

10

  

11

    SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_EndModify  , c\_NoEventData\);

12

    AnObject := Iterator\.NextSchObject;

13

End;

__See also__  
ISch\_BasicContainer interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_OwnerSchDocument : ISch\_Document;  
__Description__  
This property returns the ISch\_Document interface that the object is associated with\. It is also said that the document owns the object when the Object has a valid OwnerDocument property\.  
The function returns the ISch\_Document interface that the object is associated with\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
ISch\_Document interface  
ISch\_GraphicalObject interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_SchBasicContainer : ISch\_BasicContainer;  
__Description__  
This function obtains the container of child objects from the parent object itself\. This function is used in the Container property\.  
__Example__  
__See also__  
ISch\_BasicContainer interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_Text : WideString;  
__Description__  
This function retrieves the text string for this object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Function I\_ObjectAddress : TSCHObjectHandle;  
__Description__  
This function retrieves the object address \(a pointer type\) of the object in question which is of TSchObjectHandle type\. This function is mainly used for the SendMessge method from the ISch\_RobotManager interface\.  
__DelphiScript Example__

1

SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_BeginModify, c\_NoEventData\);

2

AnObject\.Color     := $0000FF; //red color in bgr format

3

SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_EndModify  , c\_NoEventData\);

4

  

__See also__  
ISch\_BasicContainer interface  
ISch\_RobotManager interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Function Import\_FromUser : Boolean;  
__Description__  
The Import\_FromUser function invokes the Properties dialog for the object\. This is equivalent to when you double click on an object on the schematic document and the Object Properties dialog appears\. This function returns a True value when the User clicks okay otherwise a False value is returned\.  
An example of using this method is to pop up the Properties dialog programmatically so that the user can modify the object and then the script or the server code can do more processing\.  
__Example__  
__See also__  
ISch\_BasicContainer interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure RemoveSchObject \(AObject : ISch\_BasicContainer\);  
__Description__  
The RemoveSchObject method removes the Schematic object from the database associated with the document or the parent object but it is not removed from memory\. Therefore an Undo action will be able to restore this object only if the RobotManager's SendMessage methods are invoked\.  
__DelphiScript Example__

01

// Initialize the robots in Schematic editor\.

02

SchServer\.ProcessControl\.PreProcess\(CurrentSheet, ''\);

03

  

04

// Set up iterator to look for Port objects only

05

Iterator := CurrentSheet\.SchIterator\_Create;

06

If Iterator = Nil Then Exit;

07

Iterator\.AddFilter\_ObjectSet\(MkSet\(ePort\)\);

08

Try

09

    Port := Iterator\.FirstSchObject;

10

    While Port <> Nil Do

11

    Begin

12

        OldPort := Port;

13

        Port    := Iterator\.NextSchObject;

14

        CurrentSheet\.RemoveSchObject\(OldPort\);

15

             

16

        SchServer\.RobotManager\.SendMessage\(CurrentSheet\.I\_ObjectAddress,c\_BroadCast,

17

                               SCHM\_PrimitiveRegistration,OldPort\.I\_ObjectAddress\);

18

    End;

19

Finally

20

    CurrentSheet\.SchIterator\_Destroy\(Iterator\);

21

End;

22

// Clean up robots in Schematic editor\.

23

SchServer\.ProcessControl\.PostProcess\(CurrentSheet, ''\);

__See also__  
ISch\_BasicContainer interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Function Replicate : ISch\_BasicContainer;  
__Description__  
This functions makes another copy of this object but with an unique object address \(a new memory location\) but with same attributes as this object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Function SchIterator\_Create : ISch\_Iterator;  
__Description__  
The SchIterator\_Create function creates an iterator for the parent object \(such as the document, component or the sheet symbol\) and with this iterator, you have the ability to iterate the child objects within, such as pins of a component\. Once you have finished using the iterator, invoke the SchIterator\_Destroy method to free the iterator from memory\.  
__Example__

01

Try

02

    SheetSymbol := ParentIterator\.FirstSchObject;

03

    While SheetSymbol <> Nil Do

04

    Begin

05

        // Look for sheet entries \(child objects\) within a sheet symbol object\.

06

        ChildIterator := SheetSymbol\.SchIterator\_Create;

07

        If ChildIterator <> Nil Then

08

        Begin

09

            ChildIterator\.AddFilter\_ObjectSet\(MkSet\(eSheetEntry\)\);

10

            Try

11

                SheetEntry := ChildIterator\.FirstSchObject;

12

                While SheetEntry <> Nil Do

13

                Begin

14

                    EntriesNames := SheetEntry\.Name \+ \#13 \+ EntriesNames;

15

                    SheetEntry := ChildIterator\.NextSchObject;

16

                End;

17

            Finally

18

                SheetSymbol\.SchIterator\_Destroy\(ChildIterator\);

19

            End;

20

        End;

21

        SheetSymbol := ParentIterator\.NextSchObject;

22

    End;

23

Finally

24

    CurrentSheet\.SchIterator\_Destroy\(ParentIterator\);

25

End;

__See also__  
ISch\_BasicContainer interface  
ISch\_Iterator interface  
SchIterator\_Destroy


\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure SchIterator\_Destroy\(Var AIterator : ISch\_Iterator\);  
__Description__  
The SchIterator\_Destroy function destroys the iterator from the parent object \(such as the document, component or the sheet symbol\)\. This iterator once created with the SchIterator\_Create method, has the ability to iterate the child objects within, such as pins of a component\.  
__DelphiScript Example__

01

Try

02

    SheetSymbol := ParentIterator\.FirstSchObject;

03

    While SheetSymbol <> Nil Do

04

    Begin

05

        // Look for sheet entries \(child objects\) within a sheet symbol object\.

06

        ChildIterator := SheetSymbol\.SchIterator\_Create;

07

        If ChildIterator <> Nil Then

08

        Begin

09

            ChildIterator\.AddFilter\_ObjectSet\(MkSet\(eSheetEntry\)\);

10

            Try

11

                SheetEntry := ChildIterator\.FirstSchObject;

12

                While SheetEntry <> Nil Do

13

                Begin

14

                    EntriesNames := SheetEntry\.Name \+ \#13 \+ EntriesNames;

15

                    SheetEntry := ChildIterator\.NextSchObject;

16

                End;

17

            Finally

18

                SheetSymbol\.SchIterator\_Destroy\(ChildIterator\);

19

            End;

20

        End;

21

        SheetSymbol := ParentIterator\.NextSchObject;

22

    End;

23

Finally

24

    CurrentSheet\.SchIterator\_Destroy\(ParentIterator\);

25

End;

__See also__  
ISch\_BasicContainer interface  
SchIterator\_Create;


\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure Setstate\_Default\(AUnit : TUnitSystem\);  
__Description__  
This procedure sets the default unit system for this object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
TUnitSystem type


\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure SetState\_Text \(AValue : WideString\);  
__Description__  
This procedure sets the text string for this object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface



\(ISch\_BasicContainer interface\)  
__Syntax__  
Property Container : ISch\_BasicContainer Read GetState\_SchBasicContainer;  
__Description__  
This property represents the container within the parent object \(such as a document, component or sheet symbol\)\. This property is supported by the GetState\_SchBasicContainer method\. If the container is empty it implies that this object itself is a standalone or child object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface


\(ISch\_BasicContainer interface\)  
__Syntax__  
Property ObjectId : TObjectId Read GetState\_ObjectId;  
__Description__  
The ObjectID property determines what object type the object in question is\. For example when iterating for objects on a schematic document, you would want to modify all objects but update the port objects' locations only, thus you check for the object's ObjectId and if it is a ePort type, then take action\.  
__DelphiScript Example__

01

AnObject := Iterator\.FirstSchObject;

02

While AnObject <> Nil Do

03

Begin

04

    SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_BeginModify, c\_NoEventData\);

05

  

06

    Case AnObject\.ObjectId Of

07

       eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

08

       ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

09

    End;

10

  

11

    SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_EndModify  , c\_NoEventData\);

12

    AnObject := Iterator\.NextSchObject;

13

End;

__See also__  
ISch\_BasicContainer interface  
TObjectID type


\(ISch\_BasicContainer interface\)  
__Syntax__  
Property OwnerDocument : ISch\_Document Read GetState\_OwnerSchDocument;  
__Description__  
This property returns the ISch\_Document interface that the object is associated with\. It is also said that the document owns the object when the Object has a valid OwnerDocument property\.  
This property is supported by the GetState\_OwnerSchDocument method\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
ISch\_Document interface


__Overview__  
The ISch\_GraphicalObject interface represents the ancestor interface for an object that has graphical properties on a schematic document\.

All graphic objects such as arcs, ports, rectangles etc have bounding rectangles of TCoordRect type\.

__Notes__  
ISch\_BasicContainer interface  
                ISch\_GraphicalObject interface

The ISch\_GraphicalObject interface hierarchy is as follows;

__ISch\_GraphicalObject methods__  
GetState\_AreaColor  
GetState\_Color  
GetState\_CompilationMasked  
GetState\_Dimmed  
GetState\_Disabled  
GetState\_DisplayError  
GetState\_EnableDraw  
GetState\_ErrorColor  
GetState\_ErrorKind  
GetState\_ErrorString  
GetState\_LiveHighlightValue  
GetState\_Location  
GetState\_OwnerPartDisplayMode  
GetState\_OwnerPartId  
GetState\_Selection  
SetState\_AreaColor  
SetState\_Color  
SetState\_CompilationMasked  
SetState\_Dimmed  
SetState\_Disabled  
SetState\_DisplayError  
SetState\_EnableDraw  
SetState\_ErrorColor  
SetState\_ErrorKind  
SetState\_ErrorString  
SetState\_LiveHighlightValue  
SetState\_Location  
SetState\_OwnerPartDisplayMode  
SetState\_OwnerPartId  
SetState\_Selection  
AddErrorString  
BoundingRectangle  
BoundingRectangle\_Full  
GraphicallyInvalidate  
Mirror  
MoveByXY  
MoveToXY  
ResetErrorFields  
RotateBy90  
SetState\_xSizeySize

__ISch\_GraphicalObject properties__  
AreaColor  
Color  
CompilationMasked  
Dimmed  
Disabled  
DisplayError  
EnableDraw  
ErrorColor  
ErrorKind  
ErrorString  
LiveHighlightValue  
Location  
OwnerPartDisplayMode  
OwnerPartId  
Selection



\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure AddErrorString\(Const AErrorString : WideString; AtEnd : LongBool\);  
__Description__  
This procedure adds an error string to the string whether it is at end or not\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_AreaColor : TColor;  
__Description__  
The AreaColor property denotes the filled color region of a closed object\. The AreaColor value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This method obtains the color for the area color of an object and is used in the AreaColor property\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
TColor type


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_Color : TColor;  
__Description__  
The Color property denotes the color region of a closed object which is usually the border\. The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This method obtains the color for the color of the boundary of an object and is used in the Color property\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
TColor type


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_CompilationMasked : Boolean;  
__Description__  
The CompilationMasked property determines whether the object is masked by the Compiler\. The CompileMask object can be placed on a group of objects on the schematic sheet, and these objects have their CompilationMasked property set to true\.  
This method obtains the boolean value whether the CompilationMasked is true or not and is used in the CompilationMasked property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_Dimmed : Boolean;  
__Description__  
This Dimmed property is true when this object is not part of the filter mechanism \(by the Filter panel for example\)\. When objects are found by the Filter mechanism, they stay as is \(Dimmed is false\), and the objects that are not found are dimmed \(Dimmed is true\)\.  
This procedure gets the boolean value of the Dimmed property and is this method used in the Dimmed property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_Disabled : Boolean;  
__Description__  
This Disabled property is true when this object is not part of the filter mechanism \(by the Filter panel for example\)\. When objects are found by the Filter mechanism, they stay as is \(Disabled is false\), and the objects that are not found are disabled \(Disabled is true\)\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_DisplayError : Boolean;  
__Description__  
This property determines whether the DisplayError is displayed or not\. When true, the red squiggly line underneath the graphical object appears when it is subject to a compilation error in Altium Designer\.  
This procedure gets the boolean value for the DisplayError property and is used in the DisplayError property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_EnableDraw : Boolean;  
__Description__  
This property merely determines whether the object can be drawn on the screen or not\. This procedure gets the value for the EnableDraw property and is used as a getter for the EnableDraw property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_ErrorColor : TColor;  
__Description__  
The ErrorColor property determines the error color value that the object is associated with\. The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
The function sets the color for the ErrorColor property and is also used as a setter function in the ErrorColor property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_ErrorKind : TErrorKind;  
__Description__  
This property determines the error kind that the object is associated with, when it is subject to the Compiler in Altium Designer\. This procedure is used for the ErrorKind property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_ErrorString : WideString;  
__Description__  
This property returns the Error string that the object is associated with when it is subject to the Compiler in Altium Designer\.  
This procedure is used for the ErrorString property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_LiveHighlightValue : WideString;  
__Description__  
This property toggles the highlight value \(text string\) of the object when it is subject to the probe process in Altium Designer during the Live Design mode\. This method is used for the LiveHighlightValue property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_Location : TLocation;  
__Description__  
The Location property defines the reference point of the object \(not necessarily the center of the object\)\. Use the BoundingRectangle and BoundingRectangle\_Full methods to determine the bounding regions of the object\.  
This procedure retrieves the location or the reference point of the object\. This method is used for the Location property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
TLocation type


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_OwnerPartDisplayMode : TDisplayMode;  
__Description__  
This property represents schematic components in various graphical representations only\. A schematic component can have up to 255 different graphical representations and a component can be composed of different parts that make up the whole\. A child object is part of the parent object and thus the child object's owner part display mode fetches the parent's \(in this case the component\) part display mode\.  
This procedure gets the owner display mode \(one of the existing modes only\) for the component\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_OwnerPartId : Integer;  
__Description__  
The OwnerPartId property determines the child object's parent object's part id\. A component can be composed of multiple parts\. Each part is composed of schematic primitives and thus each primitive associated with the part can be queried for its OwnerPartId property\. The owner of the child object is the parent object\.  
This procedure gets the OwnerPartId from the object as part of the component object\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_Selection : Boolean;  
__Description__  
This property determines whether the object is selected or not\. When an object is selected, a crossed line boundary appears around the object\. This object can then be moved or edited graphically\.  
This method can define the selection state of the object and is used for the Selection property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_AreaColor \(AColor : TColor\);  
__Description__  
The AreaColor property denotes the filled color region of a closed object\. The AreaColor value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This method defines the color for the area color of an object and is used in the AreaColor property\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
TColor type


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_Color \(AColor : TColor\);  
__Description__  
The Color property denotes the color region of a closed object which is usually the border\. The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This method defines the color for the color of the boundary of an object and is used in the Color property\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
TColor type


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_CompilationMasked \(AValue : Boolean\);  
__Description__  
The CompilationMasked property determines whether the object is masked by the Compiler\. The CompileMask object can be placed on a group of objects on the schematic sheet, and these objects have their CompilationMasked property set to true\.  
This method sets the CompilationMasked to true or not and is used in the CompilationMasked property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_Dimmed \(B : Boolean\);  
__Description__  
This Dimmed property is true when a parent object is not part of the navigation mechanism \(Navigator panel\)\. When objects are found by the Navigation mechanism, they stay as is \(Dimmed is false\), and the objects that are not part of the Navigation are dimmed \(Dimmed is true\)\.  
This procedure sets the boolean value of the Dimmed property and is this method used in the Dimmed property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_Disabled \(B : Boolean\);  
__Description__  
This Disabled property is true when this object is not part of the filter mechanism \(by the Filter panel for example\)\. When objects are found by the Filter mechanism, they stay as is \(Disabled is false\), and the objects that are not found are disabled \(Disabled is true\)\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_DisplayError \(AValue : Boolean\);  
__Description__  
This property determines whether the DisplayError is displayed or not\. When true, the red squiggly line underneath the graphical object appears when it is subject to a compilation error in Altium Designer\.  
This procedure sets the boolean value for the DisplayError property and is used in the DisplayError property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_EnableDraw \(B : Boolean\);  
__Description__  
This property merely determines whether the object can be drawn on the screen or not\. This procedure sets the value for the EnableDraw property and is used as a setter for the EnableDraw property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_ErrorColor \(AValue : TColor\);  
__Description__  
The ErrorColor property determines the error color value that the object is associated with\.  
The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This procedure obtains the color of the error and this procedure is used as a getter method for the ErrorColor property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_ErrorKind \(AValue : TErrorKind\);  
__Description__  
This property determines the error kind that the object is associated with, when it is subject to the Compiler in Altium Designer\. This procedure is used for the ErrorKind property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_ErrorString \(Const AValue : WideString\);  
__Description__  
This property returns the Error string that the object is associated with when it is subject to the Compiler in Altium Designer\.  
This procedure is used for the ErrorString property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_LiveHighlightValue \(AValue : WideString\);  
__Description__  
This property toggles the highlight value \(text string\) of the object when it is subject to the probe process in Altium Designer during the Live Design mode\. This method is used for the LiveHighlightValue property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_Location \(ALocation : TLocation\);  
__Description__  
The Location property defines the reference point of the object \(not necessarily the center of the object\)\. Use the BoundingRectangle and BoundingRectangle\_Full methods to determine the bounding regions of the object\.  
This procedure sets the location or the reference point of the object\. This method is used for the Location property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_OwnerPartDisplayMode \(AValue : TDisplayMode\);  
__Description__  
This property represents schematic components in various graphical representations only\. A schematic component can have up to 255 different graphical representations and a component can be composed of different parts that make up the whole\. A child object is part of the parent object and thus the child object's owner part display mode fetches the parent's \(in this case the component\) part display mode\.  
This procedure sets the display mode \(one of the existing modes only\) for the component\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
ISch\_Component interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_OwnerPartId \(AValue : Integer\);  
__Description__  
The OwnerPartId property determines the child object's parent object's part id\. A component can be composed of multiple parts\. Each part is composed of schematic primitives and thus each primitive associated with the part can be queried for its OwnerPartId property\. The owner of the child object is the parent object\.  
This procedure sets the OwnerPartId for the object as part of the component object\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_Selection \(B : Boolean\);  
__Description__  
This property determines whether the object is selected or not\. When an object is selected, a crossed line boundary appears around the object\. This object can then be moved or edited graphically\.  
This method can define the selection state of the object and is used for the Selection property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_xSizeySize;  
__Description__  
This method sets the X size and the ySize of the graphical bounds of the object\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function BoundingRectangle : TCoordRect;  
__Description__  
This function returns the coordinates of the bounds of the parent object itself \(not including the children objects if any\)\. To determine the full bounding rectangle of the object \(including the children object\), invoke the BoundingRectangle\_Full method instead\.  
For example a Schematic component would typically have a rectangle as the outline, the pins and parameters as the children objects\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
BoundingRectangle\_Full method  
TCoordRect type


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function BoundingRectangle\_Full : TCoordRect;  
__Description__  
This function returns the coordinates of the bounds of the parent object itself and including the children objects if any\.\. To determine the bounding rectangle of the parent object \(excluding the children object\), invoke the BoundingRectangle  method instead\.  
For example a Schematic component would typically have a rectangle as the outline, the pins and parameters as the children objects\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
BoundingRectangle method  
TCoordRect type


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure GraphicallyInvalidate;  
__Description__  
This procedure when invoked invalidates the object graphically prompting the system to do a system re\-draw to refresh the screen\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure Mirror \(Axis : TLocation\);  
__Description__  
The Mirror method flips the object across the axis \(TLocaiton Type\)  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
ISch\_Label interface  
ISch\_Component interface  
TLocation Type


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure MoveByXY \(x,y : TCoord\);  
__Description__  
This MoveByXY procedure moves the object in a linear distance specified by the X,Y coordinates relative to the reference point of the object\.  
__Example__

01

// Add rectangle and pin objects to the component object\.

02

Component\.AddSchObject\(Rect\);

03

Component\.AddSchObject\(Pin\);

04

  

05

// Add the new component to the schematic document\.

06

SchDoc\.AddSchObject\(Component\);

07

Component\.Comment\.IsHidden := True;

08

Component\.Designator\.IsHidden := True;

09

  

10

// Move component by 1,1 inch in respect to document's origin\.

11

Component\.MoveByXY\(InchesToCoord\(1\), InchesToCoord\(1\)\);

__See also__  
ISch\_GraphicalObject interface  
TCoord type  
UndoRedo script example in \\__Example__s\\Scripts\\DelphiScript Scripts\\Sch folder\.


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure MoveToXY \(x,y : TCoord\);  
__Description__  
This MoveToXY procedure moves the object to a new location specified by the X,Y coordinates\.  
__Example__

01

// Add rectangle and pin objects to the component object\.

02

Component\.AddSchObject\(Rect\);

03

Component\.AddSchObject\(Pin\);

04

  

05

// Add the new component to the schematic document\.

06

SchDoc\.AddSchObject\(Component\);

07

Component\.Comment\.IsHidden := True;

08

Component\.Designator\.IsHidden := True;

09

  

10

// Move component to 1,1 inch in respect to document's origin\.

11

Component\.MoveToXY\(InchesToCoord\(1\), InchesToCoord\(1\)\);

__See also__  
ISch\_GraphicalObject interface  
TCoord type  
UndoRedo script example in \\__Example__s\\Scripts\\DelphiScript Scripts\\Sch folder\.


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure ResetErrorFields;  
__Description__  
This procedure resets the error fields of the object\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure RotateBy90\(Center : TLocation; A : TRotationBy90\);  
__Description__  
The RotateBy90 procedure forces the rotation of the object by its center or a defined location on the schematic sheet and the rotation is done in 90 degree increments \(0, 90, 180, 270\)\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
TLocation type  
TRotationBy90 type



\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property AreaColor : TColor Read GetState\_AreaColor Write SetState\_AreaColor;  
__Description__  
The AreaColor property denotes the filled color region of a closed object\. The AreaColor value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This property is supported by the GetState\_AreaColor and SetState\_AreaColor methods\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
ISch\_Port interface  
ISch\_Pie interface  
ISch\_Rectangle interface  
ISch\_RoundRectangle interface  
ISch\_TextFrame interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property Color : TColor Read GetState\_Color Write SetState\_Color;  
__Description__  
The Color property denotes the color region of a closed object which is usually the border outline\. The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
The Color property is supported by the GetState\_Color and SetState\_Color methods\.  
Notes  
The color format is in blue,green,red \(b,g,r\) primary color format and each primary color has a value of 0 to 255\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
TColor type


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property CompilationMasked : Boolean Read GetState\_CompilationMasked Write SetState\_CompilationMasked;  
__Description__  
The CompilationMasked property determines whether the object is masked by the Compiler\. The CompileMask object can be placed on a group of objects on the schematic sheet, and these objects have their CompilationMasked property set to true\.  
This property is supported by the GetState\_CompilationMasked and SetState\_CompilationMasked methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property Dimmed : Boolean Read GetState\_Dimmed Write SetState\_Dimmed;  
__Description__  
This Dimmed property is true when a parent object is not part of the navigation mechanism \(Navigator panel\)\. When objects are found by the Navigation mechanism, they stay as is \(Dimmed is false\), and the objects that are not part of the Navigation are dimmed \(Dimmed is true\)\.  
This property is supported by the GetState\_Dimmed and SetState\_Dimmed methods\.  
Notes  
The Disabled / Dimmed states of a parent object \(say a component\), all its children \(pins, lines, etc\.\.\.\) will be also set to this state\. Thus when the Disabled/Dimmed property of a child object is being queried, the Disabled/Dimmed state of the parent object will be returned\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property Disabled : Boolean Read GetState\_Disabled Write SetState\_Disabled;  
__Description__  
The Disabled property determines whether the object is disabled \(due to not being part of the collected objects by the filter mechanism ie the Filter panel\)  
Notes  
The Disabled / Dimmed states of a parent object \(say a component\), all its children \(pins, lines, etc\.\.\.\) will be also set to this state\. Thus when the Disabled/Dimmed property of a child object is being queried, the Disabled/Dimmed state of the parent object will be returned\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property DisplayError : Boolean Read GetState\_DisplayError Write SetState\_DisplayError;  
__Description__  
This property determines whether the DisplayError is displayed or not\. When true, the red squiggly line underneath the graphical object appears when it is subject to a compilation error in Altium Designer\.  
This property is supported by the GetState\_DisplayError and SetState\_DisplayError methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property EnableDraw : Boolean Read GetState\_EnableDraw Write SetState\_EnableDraw;  
__Description__  
This property merely determines whether the object can be drawn on the screen or not\. This property is supported by the GetState\_EnableDraw and SetState\_EnableDraw methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property ErrorColor : TColor Read GetState\_ErrorColor Write SetState\_ErrorColor;  
__Description__  
The ErrorColor property determines the error color value that the object is associated with\.  
The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
The Color property is supported by the GetState\_ErrorColor and SetState\_ErrorColor methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property ErrorKind : TErrorKind Read GetState\_ErrorKind Write SetState\_ErrorKind;  
__Description__  
This property determines the error kind that the object is associated with, when it is subject to the Compiler in Altium Designer\. This property is supported by the GetState\_ErrorKind and the SetState\_ErrorKind methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
TErrorKind type from Workspace Manager API


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property ErrorString : WideString Read GetState\_ErrorString Write SetState\_ErrorString;  
__Description__  
This property returns the Error string that the object is associated with when it is subject to the Compiler in Altium Designer\. This property is supported by the GetState\_ErrorString and SetState\_ErrorString methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property LiveHighlightValue : WideString Read GetState\_LiveHighlightValue Write SetState\_LiveHighlightValue;  
__Description__  
This property toggles the highlight value \(text string\) of the object when it is subject to the probe process in Altium Designer during the Live Design mode\. This property is supported by the GetState\_LiveHighlightValue and SetState\_LIveHighlightValue methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property Location : TLocation Read GetState\_Location Write SetState\_Location;  
__Description__  
The Location property defines the reference point of the object \(not necessarily the center of the object\)\. Use the BoundingRectangle and BoundingRectangle\_Full methods to determine the bounding regions of the object\.  
This property is supported by the GetState\_Location and SetState\_Location methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
BoundingRectangle method  
BoundingRectangle\_Full method  
TLocation type


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property OwnerPartDisplayMode : TDisplayMode Read GetState\_OwnerPartDisplayMode Write SetState\_OwnerPartDisplayMode;  
__Description__  
This property represents schematic components in various graphical representations only\. A schematic component can have up to 255 different graphical representations and a component can be composed of different parts that make up the whole\. A child object is part of the parent object and thus the child object's owner part display mode fetches the parent's \(in this case the component\) part display mode\.  
This property is supported by the GetState\_OwnerPartDisplayMode and SetState\_OwnerPartDisplayMode methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
ISch\_Component interface  
TDisplayMode type \(byte type\) from Workspace Manager API


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property OwnerPartId : Integer Read GetState\_OwnerPartId Write SetState\_OwnerPartId;  
__Description__  
The OwnerPartId property determines the child object's parent object's part id\. A component can be composed of multiple parts\. Each part is composed of schematic primitives and thus each primitive associated with the part can be queried for its OwnerPartId property\. The owner of the child object is the parent object\. This property is supported by the GetState\_OwnerPartId and SetState\_OwnerPartId methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property Selection : Boolean Read GetState\_Selection Write SetState\_Selection;  
__Description__  
This property determines whether the object is selected or not\. When an object is selected, a crossed line boundary appears around the object\. This object can then be moved or edited graphically\.  
This property is supported by the GetState\_Selection and SetState\_Selection methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface


__Overview__  
The ISch\_RobotManager interface represents an object that can send Schematic messages into the Schematic Editor server from a script to update the sub\-systems such as the Undo system\.  
__Notes__  
Part of ISch\_ServerInterface object interface  
__MessageID table__  
SCHM\_NullMessage             = 0;  
SCHM\_PrimitiveRegistration   = 1;  
SCHM\_BeginModify             = 2;  
SCHM\_EndModify               = 3;  
SCHM\_YieldToRobots           = 4;  
SCHM\_CancelModify            = 5;  
SCHM\_Create                  = 6;  
SCHM\_Destroy                 = 7;  
SCHM\_ProcessStart            = 8;  
SCHM\_ProcessEnd              = 9;  
SCHM\_ProcessCancel           = 10;  
SCHM\_CycleEnd                = 11;  
SCHM\_CycleStart              = 12;  
SCHM\_SystemInvalid           = 13;  
SCHM\_SystemValid             = 14;  
__Message types table__  
c\_BroadCast     = Nil;  
c\_NoEventData   = Nil;  
c\_FromSystem    = Nil;  
   
The ISch\_RobotManager interface hierarchy is as follows;

__ISch\_RobotManager methods__  
SendMessage

__ISch\_RobotManager properties__

__See also__  
ISch\_ServerInterface interface


\(ISch\_RobotManager interface\)  
__Syntax__  
Procedure SendMessage\(Source,Destination : Pointer; MessageID : Word; MessageData : Pointer\);  
__Description__  
The SendMessage method sends a message into Schematic Editor notifying that the data structures need to be updated and synchronized\. It could be an object being modified, added or deleted from the schematic document\.

Normally when an object is being modified:

- The Source parameter, the current sheet's I\_ObjectAddress value\.
- The Destination parameter has the c\_Broadcast value
- The MessageID parameter has the SchM\_PrimitiveRegistration value
- The MessageData parameter has the new object's I\_ObjectAddress value\.

Normally when a new object is being added:

- The Source parameter, the I\_ObjectAddress of an object needs to be invoked\.
- The Destination parameter has the c\_Broadcast value
- The MessageID parameter has the SchM\_BeginModify and SchM\_EndModify values\.
- The MessageData parameter has the c\_noEventData value

Normally when an object is being removed:

- The Source parameter, the current sheet's I\_ObjectAddress value\.
- The Destination parameter normally has the c\_Broadcast value
- The MessageID parameter has the SchM\_PrimitiveRegistration value\.
- The MessageData parameter has the deleted object's I\_ObjectAddress value\.

DelphiScript example of an object being modified

01

// Initialize the robots in Schematic editor\.

02

SchServer\.ProcessControl\.PreProcess\(Doc, ''\);

03

Iterator        := Doc\.SchIterator\_Create;

04

Iterator\.AddFilter\_ObjectSet\(MkSet\(ePort, eWire\)\);

05

If Iterator = Nil Then Exit;

06

Try

07

    AnObject := Iterator\.FirstSchObject;

08

    While AnObject <> Nil Do

09

    Begin

10

        Case AnObject\.ObjectId Of

11

        SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_BeginModify, c\_NoEventData\);

12

           eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

13

        SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_EndModify  , c\_NoEventData\);

14

        End;

15

        AnObject := Iterator\.NextSchObject;

16

    End;

17

Finally

18

    Doc\.SchIterator\_Destroy\(Iterator\);

19

End;

20

// Clean up the robots in Schematic editor

21

SchServer\.ProcessControl\.PostProcess\(Doc, ''\);

DelphiScript example of an object being removed

01

Try

02

    Port := Iterator\.FirstSchObject;

03

    While Port <> Nil Do

04

    Begin

05

        OldPort := Port;

06

        Port    := Iterator\.NextSchObject;

07

        CurrentSheet\.RemoveSchObject\(OldPort\);

08

         

09

        SchServer\.RobotManager\.SendMessage

10

                               \(CurrentSheet\.I\_ObjectAddress,

11

                                c\_BroadCast,

12

                                SCHM\_PrimitiveRegistration,

13

                                OldPort\.I\_ObjectAddress\);

14

     End;

15

Finally

16

     CurrentSheet\.SchIterator\_Destroy\(Iterator\);

17

End;

__See also__  
ISch\_RobotManager interface


__Overview__  
This interface is an entry interface to the schematic server loaded in Altium Designer\. You can fetch the Preferences, Robot Manager \(for sending messages into the schematic system\), the font manager for managing fonts on a schematic document\. You can also create or delete schematic design objects from this interface\.

The Sch\_Server function in the Rt\_Schematic unit \(which is embedded in the scripting engine\) returns the ISch\_ServerInterface interface\.

The ISch\_ServerInterface as the composite interface has the following aggregate object interfaces:

![](data:image/gif;base64,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yKr11kvDLbGJT1xcLFkRClDQRKba58vBqhB4WXiVNp42CR1i7aJDoeEb4hCF4ykxC4i7yiqwtsCgHFFjdWjA85whUVJGKw5Q2KIzqIyJZ5jtjkde4OFUB7gtg04brMCaKrSxMYtKC3TZmEQDahwUaRV5KM/AceugEAdn9EKiW9vY8kDcgOPt2atTbvGrzEa43LUQCtz7/1s23tAAiwLFFw7gKkZHTKcTa3rTdE0xTT8N6lBfB66cLrWp0+lpUat61aymDqYPdepYy1qAqW41Wy+Fa0zZetdvYmkmfg3sYAt72MQutrGPjexkK3vZzG62s58N7WhL+9mW4DVVKpVrS1na2txe26u7De5wi3vc5C73W79t7nSre93sbregWOrueMt73vSuN2+tZu9863vf/CY3vPsN8IALfOBZ+jfBD47whCtcKgZfuMMfDvGBNzziFK+4xdk98YtrfOMcb3XGOw7ykIu81zDDRTJOjvKUq3zlLG+5y18O85jLfOY0r7nNb47znOt85zzvuc9/DvSgC33oRC+6yjJxATMAKH3pTG+6058O9ahLfepUr7rVr471rGt961zvute/Dvawi33sZC+72c+OdqgHBAA7)

__Example__

1

    // Grab current schematic document\.

2

    SchDoc := SchServer\.GetCurrentSchDocument;

3

    If SchDoc = Nil Then Exit;

4

  

5

    // Component is a container that has child objects

6

    // Create component, and its rectangle, pin and parameter objects\.

7

    Component := SchServer\.SchObjectFactory \(eSchComponent, eCreate\_Default\);

__Example 2__

01

   Try

02

       SchServer\.ProcessControl\.PreProcess\(SchDoc, ''\);

03

  

04

       // Add the parameter to the pin with undo stack also enabled

05

       Param\.Name := 'Added Parameter';

06

       Param\.Text := 'Param added to the pin\. Press Undo and this will disappear\.  Press undo twice to remove the component';

07

       Param\.Location := Point\(InchesToCoord\(3\), InchesToCoord\(2\.4\)\);

08

  

09

       Pin\.AddSchObject\(Param\);

10

       SchServer\.RobotManager\.SendMessage\(Component\.I\_ObjectAddress, c\_BroadCast, SCHM\_PrimitiveRegistration, Param\.I\_ObjectAddress\);

11

   Finally

12

       SchServer\.ProcessControl\.PostProcess\(SchDoc, ''\);

13

   End;

__Notes__  
Note that these IServerModule interfaces represent loaded servers in Altium Designer\. This application manages single instances of different server modules\. Each server can have multiple server document kinds, for example the Schematic server supports two server document kinds – SCH and SCHLIB design documents\. A loaded server typically hosts documents and each document in turn hosts a document view and panel views\. Thus a Schematic Editor server also has the IServerModule interface along with the ISch\_ServerInterface interface\.

Invoke the SchServer function to obtain the ISch\_ServerInterface object interface which represents the Schematic Editor server\.

__ISch\_ServerInterface methods__  
GetState\_SchPreferences  
GetState\_RobotManager  
GetState\_FontManager  
GetState\_ProbesTimerEnabled  
SetState\_ProbesTimerEnabled  
GetState\_JunctionConvertSettings  
GetSchDocumentByPath  
GetCurrentSchDocument  
SchObjectFactory  
LoadComponentFromLibrary  
LoadComponentFromDatabaseLibrary  
DestroySchObject  
ReportSchObjectsDifferences  
CreateLibCompInfoReader  
DestroyCompInfoReader  
CreateComponentPainter  
CreateComponentMetafilePainter  
CreateDocumentPainter  
UpdateSignalValueDisplay

__ISch\_ServerInterface properties__  
Preferences  
RobotManager  
FontManager  
JunctionConvertSettings  
ProbesTimerEnabled

__Example__  
__See also__  
Sch\_Server function  
ISch\_Preferences interface  
ISch\_RobotManager interface  
ISch\_FontManager interface  
ILibCompInfoReader interface  
IServerModule interface



\(ISch\_ServerInterface interface\)  
__Syntax__  
Function CreateComponentMetafilePainter : IComponentMetafilePainter;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface  
IComponentMetafilePainter interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function CreateComponentPainter : IComponentPainterView;  
__Description__  
A IComponentPainterView interface represents the surface that a component can be painted on\.  
This interface is a IExternalForm type which represents the TExternalFormComponent object\. The TExternalForm class is defined in the ExternalForm unit from the DXP Run Time Library\.  
Notes  
This IComponentPainterView interface is not supported in the scripting system\.  
This IComponentPainterView interface is for server development purposes and you need to have RT\_IntegratedLIbrary, RT\_Schematic, ExternalForms and the RT\_ClientServerINterfaces units in a server project\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
IComponentPainterView interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function CreateDocumentPainter : IDocumentPainterView;  
__Description__  
This function retrieves the IDocumentPainterView interface that represents the Mini Viewer object in the Schematic Editor\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
IDocumentPainterView interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function CreateLibCompInfoReader \(ALibFileName : WideString\) : ILibCompInfoReader;  
__Description__  
The function returns a ILibCompInfoReader interface that represents a library component information reader object\.  
Invoke the CreateLibCompInfoReader function with the path to a schematic library and to obtain the number of components in this library, invoke the ILibCompInfoReader\.NumComponentsInfos method and then to obtain the information for each component in this library invoke the ComponentInfos\[\] method\. When you are done, invoke the DestroyCompInfoReader method\.  
__DelphiScript Example__

01

Procedure LibraryCompInfoReader;

02

Var

03

    CurrentLib     : ISch\_Lib;

04

    ALibCompReader : ILibCompInfoReader;

05

    CompInfo       : IComponentInfo;

06

    FileName       : String;

07

    CompNum, J     : Integer;

08

    ReportInfo     : TStringList;

09

    Document       : IServerDocument;

10

Begin

11

    If SchServer = Nil Then Exit;

12

    CurrentLib := SchServer\.GetCurrentSchDocument;

13

    If CurrentLib = Nil Then Exit;

14

    // CHeck if CurrentLib is a Library document or not

15

    If CurrentLib\.ObjectID <> eSchLib Then

16

    Begin

17

         ShowError\('Please open schematic library\.'\);

18

         Exit;

19

    End;

20

    FileName := CurrentLib\.DocumentName;

21

    // Set up Library Component Reader object\.

22

    ALibCompReader := SchServer\.CreateLibCompInfoReader\(FileName\);

23

    If ALibCompReader = Nil Then Exit;

24

    ALibCompReader\.ReadAllComponentInfo;

25

    ReportInfo := TStringList\.Create;

26

    // Obtain the number of components in the specified sch library\.

27

    CompNum := ALibCompReader\.NumComponentInfos;

28

    // Go thru each component obtained by the LibCompReader interface\.

29

    For J := 0 To CompNum \- 1 Do

30

    Begin

31

        ReportInfo\.Add\(FileName\);

32

        CompInfo := ALibCompReader\.ComponentInfos\[J\];

33

        ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

34

        ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

35

        ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

36

        ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

37

        ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

38

        ReportInfo\.Add\(''\);

39

    End;

40

    SchServer\.DestroyCompInfoReader\(ALibCompReader\);

41

  

42

    ReportInfo\.Add\(''\);

43

    ReportInfo\.Insert\(0,'Schematic Libraries and Their Components Report'\);

44

    ReportInfo\.Insert\(1,'\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-'\);

45

    ReportInfo\.Insert\(2,''\);

46

    ReportInfo\.SaveToFile\('C:\\SchLibCompReport\.txt'\);

47

    // Open and display the Component data in DXP\.

48

    If Client = Nil Then Exit;

49

    Document := Client\.OpenDocument\('Text','c:\\SchLibCompReport\.txt'\);

50

    If Document <> Nil Then

51

        Client\.ShowDocument\(Document\);

52

    ReportInfo\.Free;

53

End;

__See also__  
ISch\_ServerInterface interface  
ILibCompInfoReader interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Procedure DestroyCompInfoReader \(Var ALibCompReader : ILibCompInfoReader\);  
__Description__  
The function destroys an library component information reader object that is represented by the ILibCompInfoReader interface\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
CreateLibCompInfoReader method  
ILibCompInfoReader interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetCurrentSchDocument : ISch\_Document;  
__Description__  
This function returns the ISch\_Document interface that represents the current schematic document open in Altium Designer\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
ISch\_Document interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetSchDocumentByPath\(APath : WideString\) : ISch\_Document;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetState\_FontManager : ISch\_FontManager;  
__Description__  
This function retrieves the ISch\_Font interface which represents the Font Manager object in the Schematic Editor\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
ISch\_Font interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetState\_JunctionConvertSettings : ISch\_JunctionConvertSettings;  
__Description__  
The JunctionConvertSettings property represents a crossing of wiring on a schematic sheet\. When an addition of a wire would create a four\-way junction, this is converted to into two adjacent three way junctions\. If it is disabled and when a four way junction is created, the two wires crossing at the intersection are not joined electrically and if the Display Cross Overs option is enabled, a cross over is shown on this intersection\.  
This property is supported by the GetState\_JunctionConvertSettings method\.  
__Example__  
__See also__  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetState\_ProbesTimerEnabled : Boolean;  
__Description__  
The ProbesTimerEnabled property determines whether the Probes are active or not\. This feature is used in the LiveDesign process in Altium Designer\.  
This property is supported by the GetState\_ProbesTimerEnabled and SetState\_ProbesTimerEnabled methods\.  
__Example__  
__See also__  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetState\_RobotManager : ISch\_RobotManager;  
__Description__  
The RobotManager property returns the ISch\_RobotManager interface\. This interface deals with sending Schematic notification messages in the system\. To have the ability to send a specific message when a specific event in the Schematic Editor occurs can be achieved with the ISch\_RobotManager interface\.  
This property is supported by the GetState\_RobotManager method\.  
__Example__  
__See also__  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetState\_SchPreferences : ISch\_Preferences;  
__Description__  
The Preferences property retrieves the ISch\_Preferences interface which represents the Preferences object for the Schematic Editor\.  
This read only property is supported by the GetState\_SchPreference method\.  
__Example__  
__See also__  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function LoadComponentFromLibrary\(ALibReference : WideString;ALibraryName : WideString\) : ISch\_Component;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function  LoadComponentFromDatabaseLibrary\(ALibraryName       : WideString;  
                                           ADatabaseTableName : WideString;  
                                           ADatabaseKeys      : WideString\) : ISch\_Component;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function ReportSchObjectsDifferences\(Const AObject1, AObject2 : ISch\_BasicContainer;AIgnoreSpatialAttributes : Boolean;ADiffDescription : PChar\) : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function SchObjectFactory\(AObjectId : TObjectId;ACreationMode : TObjectCreationMode\) : ISch\_BasicContainer;  
__Description__  
The SchObjectFactory function creates a new object based on TObjectID and TObjectCreationMode values\.  
When you wish to create a new design object with the ISch\_ServerInterface’s SchObjectFactory method, you will need to have a specific design object type, assign this object with new attribute values and register this object with in the schematic document with the ISch\_Document’s RegisterSchObjectInContainer method\.  
__Example__

01

Var

02

    SchPort     : ISch\_Port;

03

    FSchDoc     : ISch\_Document;

04

    CurView     : IServerDocumentView;

05

Begin

06

    // Check if Schematic server exists or not\.

07

    If SchServer = Nil Then Exit;

08

  

09

    // Obtain the Schematid sheet interfac\.e

10

    FSchDoc := SchServer\.GetCurrentSchDocument;

11

    If FSchDoc = Nil Then Exit;

12

  

13

    // Create a new port object

14

    SchPort := SchServer\.SchObjectFactory\(ePort,eCreate\_GlobalCopy\);

15

    If SchPort = Nil Then Exit;

16

  

17

    // Set up parameters for the port object\.

18

    // the port is placed at 500,500 mils respectively\.

19

    SchPort\.Location  := Point\(MilsToCoord\(500\),MilsToCoord\(500\)\);

20

    SchPort\.Style     := ePortRight;

21

    SchPort\.IOType    := ePortBidirectional;

22

    SchPort\.Alignment := eHorizontalCentreAlign;

23

  

24

    SchPort\.Width     := MilsToCoord\(1000\);

25

  

26

    SchPort\.AreaColor := 0;

27

    SchPort\.TextColor := $FFFFFF;

28

    SchPort\.Name      := 'A new port with no net\.';

29

  

30

    // Add a port object onto the existing schematic document

31

    FSchDoc\.RegisterSchObjectInContainer\(SchPort\);

32

  

33

    // Refresh the schematic sheet\.

34

    FSchDoc\.GraphicallyInvalidate;

35

End;

__See also__  
ISch\_ServerInterface interface  
TObjectCreationMode type


\(ISch\_ServerInterface interface\)  
__Syntax__  
Procedure DestroySchObject\(Var ASchObject : ISch\_BasicContainer\);  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Procedure SetState\_ProbesTimerEnabled\(AValue : Boolean\);  
__Description__  
The ProbesTimerEnabled property determines whether the Probes are active or not\. This feature is used in the LiveDesign process in Altium Designer\.  
This property is supported by the GetState\_ProbesTimerEnabled and SetState\_ProbesTimerEnabled methods\.  
__Example__  
__See also__  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Function UpdateSignalValueDisplay\(DMObject : IDMObject; Value : Integer; BitIndex : Integer\) : LongBool;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface



\(ISch\_ServerInterface interface\)  
__Syntax__  
Property FontManager : ISch\_FontManager Read GetState\_FontManager;  
__Description__  
This property retrieves the Font manager object which is represented by the ISch\_FontManager interface\. The property is supported by the GetState\_FontManager method\.  
__Example__  
__See also__  
ISch\_Font interface  
ISch\_FontManager2 interface  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Property JunctionConvertSettings : ISch\_JunctionConvertSettings Read GetState\_JunctionConvertSettings;  
__Description__  
The JunctionConvertSettings property represents a crossing of wiring on a schematic sheet\. When an addition of a wire would create a four\-way junction, this is converted to into two adjacent three way junctions\. If it is disabled and when a four way junction is created, the two wires crossing at the intersection are not joined electrically and if the Display Cross Overs option is enabled, a cross over is shown on this intersection\.  
This property is supported by the GetState\_JunctionConvertSettings method\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
ISch\_JunctionConvertSettings interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Property Preferences : ISch\_Preferences Read GetState\_SchPreferences;  
__Description__  
This Preferences property retrieves the ISch\_Preferences interface which represents the Preferences object for the Schematic Editor\. This read only property is supported by the GetState\_SchPreference method\.  
__Example__

1

Preferences := SchServer\.Preferences;

2

Preferences\.WatermarkDeviceSheet\.True;

3

Preferences\.WatermarkReadOnlySheet := True;

__See also__  
ISch\_Preferences interface  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Property ProbesTimerEnabled : Boolean Read GetState\_ProbesTimerEnabled Write SetState\_ProbesTimerEnabled;  
__Description__  
The ProbesTimerEnabled property determines whether the Probes are active or not\. This feature is used in the LiveDesign process in Altium Designer\.  
This property is supported by the GetState\_ProbesTimerEnabled and SetState\_ProbesTimerEnabled methods\.  
__Example__  
__See also__  
ISch\_ServerInterface interface


\(ISch\_ServerInterface interface\)  
__Syntax__  
Property RobotManager : ISch\_RobotManager Read GetState\_RobotManager;  
__Description__  
This property returns the ISch\_RobotManager interface\. This interface deals with sending Schematic notification messages in the system\. To have the ability to send a specific message when a specific event in the Schematic Editor occurs can be achieved with the ISch\_RobotManager interface\.  
This property is supported by the GetState\_RobotManager method\.  
DelphiScript __Example__

01

SchPort := SchServer\.SchObjectFactory\(ePort,eCreate\_GlobalCopy\);

02

If SchPort = Nil Then Exit;

03

SchPort\.Location  := Point\(MilsToCoord\(2500\),MilsToCoord\(2500\)\);

04

SchPort\.Style     := ePortRight;

05

SchPort\.IOType    := ePortBidirectional;

06

SchPort\.Alignment := eHorizontalCentreAlign;

07

SchPort\.Width     := MilsToCoord\(500\);

08

SchPort\.AreaColor := 0;

09

SchPort\.TextColor := $FF00FF;

10

SchPort\.Name      := 'New Port 4';

11

  

12

// Add a new port object in the existing Schematic document\.

13

Doc\.RegisterSchObjectInContainer\(SchPort\);

14

SchServer\.RobotManager\.SendMessage\(Doc\.I\_ObjectAddress,c\_BroadCast,

15

                                   SCHM\_PrimitiveRegistration,SchPort\.I\_ObjectAddress\);

__See also__  
ISch\_ServerInterface interface  
ISch\_RobotManager interface


__Overview__  
The ISch\_Preferences interface represents the global preferences for the Schematic Editor and the settings are the same for any PCB project that has schematics in Altium Designer\.

The ISch\_ServerInterface interface represents the Schematic Editor and this interface has an ISch\_Preferences aggregate object interface\.

__ISch\_Preferences Methods and Properties Table__

__ISch\_Preferences methods__  
Import\_FromUser  
Get\_SelectionColor  
Get\_MultiSelectionColor  
Get\_ResizeColor  
Get\_TranslateRotateColor  
Get\_VisibleGridColor  
Get\_VisibleGridStyle  
Get\_GraphicsCursorStyle  
Get\_OrcadFootPrint  
Get\_SnapToCenter  
Get\_UseOrcadPortWidth  
Get\_AutoBackupTime  
Get\_AutoBackupFileCount  
Get\_SelectionReference  
Get\_UndoRedoStackSize  
Get\_ConvertSpecialStrings  
Get\_MaintainOrthogonal  
Get\_DisplayPrinterFonts  
Get\_AutoZoom  
Get\_HotSpotGridDistance  
Get\_SnapToHotSpot  
Get\_OptimizePolylines  
Get\_ComponentsCutWires  
Get\_AddTemplateToClipBoard  
Get\_AutoPanStyle  
Get\_AutoPanJumpDistance  
Get\_AutoPanShiftJumpDistance  
Get\_PinNameMargin  
Get\_PinNumberMargin  
Get\_DefaultPrimsPermanent  
Get\_IgnoreSelection  
Get\_ClickClearsSelection  
Get\_DoubleClickRunsInspector  
Get\_MultiPartNamingMethod  
Get\_Sensitivity  
Get\_SingleSlashNegation  
Get\_RunInPlaceEditing  
Get\_DefaultPowerGndName  
Get\_DefaultSignalGndName  
Get\_DefaultEarthName  
Get\_DefaultTemplateFileName  
Get\_BufferedPainting  
Get\_Metafile\_NoERCMarkers  
Get\_Metafile\_ParameterSets  
Get\_Metafile\_Probes  
Get\_DocumentScope  
Get\_LibraryScope  
Get\_ConfirmSelectionMemoryClear  
Get\_LastModelType  
Get\_StringIncA  
Get\_StringIncB  
Get\_MarkManualParameters  
Get\_CtrlDbleClickGoesDown  
Get\_SheetStyle\_XSize  
Get\_SheetStyle\_YSize  
Get\_SheetStyle\_XZones  
Get\_SheetStyle\_YZones  
Get\_SheetStyle\_MarginWidth  
Get\_PolylineCutterMode  
Get\_CutterGridSizeMultiple  
Get\_CutterFixedLength  
Get\_ShowCutterBoxMode  
Get\_ShowCutterMarkersMode  
Get\_ViolationDisplayByLevel  
Get\_ViolationColorByLevel  
Get\_AlwaysDrag  
Get\_DocMenuID  
Get\_LibMenuID  
Get\_DefaultSheetStyle  
Get\_WireAutoJunctionsColor  
Get\_ManualJunctionsColor  
Get\_BusAutoJunctionsColor  
Get\_DefaultUnit  
Get\_DefaultUnitSystem  
Set\_SelectionColor  
Set\_MultiSelectionColor  
Set\_ResizeColor  
Set\_TranslateRotateColor  
Set\_VisibleGridColor  
Set\_VisibleGridStyle  
Set\_GraphicsCursorStyle  
Set\_OrcadFootPrint  
Set\_SnapToCenter  
Set\_UseOrcadPortWidth  
Set\_AutoBackupTime  
Set\_AutoBackupFileCount  
Set\_SelectionReference  
Set\_UndoRedoStackSize  
Set\_ConvertSpecialStrings  
Set\_MaintainOrthogonal  
Set\_DisplayPrinterFonts  
Set\_AutoZoom  
Set\_HotSpotGridDistance  
Set\_SnapToHotSpot  
Set\_OptimizePolylines  
Set\_ComponentsCutWires  
Set\_AddTemplateToClipBoard  
Set\_AutoPanStyle  
Set\_AutoPanJumpDistance  
Set\_AutoPanShiftJumpDistance  
Set\_PinNameMargin  
Set\_PinNumberMargin  
Set\_DefaultPrimsPermanent  
Set\_IgnoreSelection  
Set\_ClickClearsSelection  
Set\_DoubleClickRunsInspector  
Set\_MultiPartNamingMethod  
Set\_Sensitivity  
Set\_SingleSlashNegation  
Set\_RunInPlaceEditing  
Set\_DefaultPowerGndName  
Set\_DefaultSignalGndName  
Set\_DefaultEarthName  
Set\_DefaultTemplateFileName  
Set\_BufferedPainting  
Set\_Metafile\_NoERCMarkers  
Set\_Metafile\_ParameterSets  
Set\_Metafile\_Probes  
Set\_DocumentScope  
Set\_LibraryScope  
Set\_ConfirmSelectionMemoryClear  
Set\_LastModelType  
Set\_StringIncA  
Set\_StringIncB  
Set\_MarkManualParameters  
Set\_CtrlDbleClickGoesDown  
Set\_PolylineCutterMode  
Set\_CutterGridSizeMultiple  
Set\_CutterFixedLength  
Set\_ShowCutterBoxMode  
Set\_ShowCutterMarkersMode  
Set\_ViolationDisplayByLevel  
Set\_ViolationColorByLevel  
Set\_AlwaysDrag  
Set\_DocMenuID  
Set\_LibMenuID  
Set\_DefaultSheetStyle  
Set\_WireAutoJunctionsColor  
Set\_ManualJunctionsColor  
Set\_BusAutoJunctionsColor  
Set\_DefaultUnit  
GridPresetsCount  
GridPresetAt

__ISch\_Preferences properties__  
SelectionColor  
MultiSelectionColor  
ResizeColor  
TranslateRotateColor  
VisibleGridColor  
VisibleGridStyle  
GraphicsCursorStyle  
OrcadFootPrint  
SnapToCenter  
UseOrcadPortWidth  
AutoBackupTime  
AutoBackupFileCount  
SelectionReference  
UndoRedoStackSize  
ConvertSpecialStrings  
MaintainOrthogonal  
DisplayPrinterFonts  
AutoZoom  
HotSpotGridDistance  
SnapToHotSpot  
OptimizePolylines  
ComponentsCutWires  
AddTemplateToClipBoard  
AutoPanStyle  
AutoPanJumpDistance  
AutoPanShiftJumpDistance  
PinNameMargin  
PinNumberMargin  
DefaultPrimsPermanent  
IgnoreSelection  
ClickClearsSelection  
DoubleClickRunsInspector  
MultiPartNamingMethod  
Sensitivity  
SingleSlashNegation  
RunInPlaceEditing  
DefaultPowerGndName  
DefaultSignalGndName  
DefaultEarthName  
DefaultTemplateFileName  
BufferedPainting  
Metafile\_NoERCMarkers  
Metafile\_ParameterSets  
Metafile\_Probes  
DocumentScope  
LibraryScope  
ConfirmSelectionMemoryClear  
LastModelType  
StringIncA  
StringIncB  
MarkManualParameters  
CtrlDbleClickGoesDown  
SheetStyle\_XSize  
SheetStyle\_YSize  
SheetStyle\_XZones  
SheetStyle\_YZones  
SheetStyle\_MarginWidth  
PolylineCutterMode  
CutterGridSizeMultiple  
CutterFixedLength  
ShowCutterBoxMode  
ShowCutterMarkersMode  
ViolationDisplay  
ViolationColor  
AlwaysDrag  
DocMenuID  
LibMenuID  
DefaultSheetStyle  
WireAutoJunctionsColor  
ManualJunctionsColor  
BusAutoJunctionsColor  
DefaultDisplayUnit  
DefaultUnitSystem

__See also__  
ISch\_ServerInterface interface  
ISch\_Document interface



\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AddTemplateToClipBoard : Boolean;  
__Description__  
The Get\_AddTemplateToClipBoard function when true, adds the current sheet template to the clipboard when you copy or cut from the current schematic sheet\.  
__Example__  
AddTemp := Prefs\.Get\_AddTemplateToClipBoard;  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AlwaysDrag : Boolean;  
__Description__  
The Get\_AlwaysDrag function returns true if you can drag a group of objects on a schematic document and the electrical wiring stay connected\. Note, to keep the connections clean while dragging, press the spacebar to cycle through the different corner modes in Altium Designer\.  
The function returns false if if wiring are left alone and become disconnected when previously connected objects are being dragged\.  
__Example__  
AlwaysDrag := Prefs\.Get\_AlwaysDrag;  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AutoPanJumpDistance : TCoord;  
__Description__  
The Get\_AutoPanJumpDistance function gets the size of each auto\-panning step\. The step size determines how fast the document pans when auto\-panning is enabled\. The smaller the value, the slower or finer the auto\-panning movement\.  
__Example__  
PanJumpDist := CoordToDxps\(Prefs\.Get\_AutoPanJumpDistance\);  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AutoPanShiftJumpDistance : TCoord;  
__Description__  
The Get\_AutoPanShiftJumpDistance function returns a value of TCoord type which determines the size of each step when the SHIFT key is held during auto\-panning in Altium Designer\. The shift step size determines how fast the document pans when auto\-panning is enabled and the SHIFT key is pressed\. The smaller the value, the slower or finer the auto\-panning movement\.  
__Example__  
JumpDist := Prefs\.GetAutoPanShiftJumpDistance;  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AutoPanStyle : TAutoPanStyle;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_AutoZoom : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_BufferedPainting : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_BusAutoJunctionsColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ClickClearsSelection : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ComponentsCutWires : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ConfirmSelectionMemoryClear : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ConvertSpecialStrings : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_CtrlDbleClickGoesDown : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_CutterFixedLength : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_CutterGridSizeMultiple : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultEarthName : WideString;  
__Description__  
The DefaultEarthName property denotes the default signal ground name to be used for objects on the schematic document\. The default name is EARTH\.  
The Get\_DefaultEarthName function retrieves the earth name string\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultPowerGndName : WideString;  
__Description__  
The DefaultPowerGndName property denotes the default power ground name to be used for objects on the schematic document\. The default name is GND\.  
The Get\_DefaultPowerGndName function retrieves the power ground name string\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultPrimsPermanent : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultSheetStyle : TSheetStyle;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultSignalGndName : WideString;  
__Description__  
The DefaultSignalGndName property denotes the default signal ground name to be used for objects on the schematic document\. The default name is SGND\.  
The Get\_DefaultSignalGndName function retrieves the signal ground name string\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultTemplateFileName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultUnit : TUnit;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DefaultUnitSystem : TUnitSystem;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DisplayPrinterFonts : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DocMenuID : Widestring;  
__Description__  
The DocMenuID property determines which pop up menu to pop up depending on whether it is a schematic or a library document\. The property returns a widestring format which can be either PUSCHMENU or PUSCHLIBMENU strings and they correspond to the entries in the Schematic Editor's resources file \(ADVSCH\.RCS file\)\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DocumentScope : TChosenDocumentScope;  
__Description__  
The DocumentScope property determines the scope for filtering and selection to be applied to the current document or to any open document in Altium Designer\. The Get\_DocumentScope method sets the Chosen Document scope\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_DoubleClickRunsInspector : Boolean;  
__Description__  
This method represents the option to bring up the Inspector dialog instead of the design object's properties dialog when you double click on a design object\.  
Invoke this function to check if design object's properties dialog is invoked \(False\) or the Inspector dialog \(True\) when you double click on a design object\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_GraphicsCursorStyle : TCursorShape;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_HotSpotGridDistance : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_IgnoreSelection : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_LastModelType : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_LibMenuID : Widestring;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_LibraryScope : TLibraryScope;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_MaintainOrthogonal : Boolean;  
__Description__  
The MaintainOrthogonal property if set to true then when you drag components, any wiring that is dragged with the component is kept orthogonal \(i\.e\. corners at 90 degrees\)\. If this option is disabled, wiring dragged with a component will be repositioned obliquely\.  
This method gets the property true or false and is used in the MaintainOrthogonal property\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ManualJunctionsColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_MarkManualParameters : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_Metafile\_NoERCMarkers : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_Metafile\_ParameterSets : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_Metafile\_Probes : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_MultiPartNamingMethod : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_MultiSelectionColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_OptimizePolylines : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_OrcadFootPrint : TOrcadFootPrint;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_PinNameMargin : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_PinNumberMargin : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_PolylineCutterMode : TPolylineCutterMode;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ResizeColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_RunInPlaceEditing : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SelectionColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SelectionReference : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_Sensitivity : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SheetStyle\_MarginWidth \(S : TSheetStyle\) : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SheetStyle\_XSize \(S : TSheetStyle\) : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SheetStyle\_XZones \(S : TSheetStyle\) : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SheetStyle\_YSize \(S : TSheetStyle\) : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SheetStyle\_YZones \(S : TSheetStyle\) : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ShowCutterBoxMode : TShowCutterBoxMode;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ShowCutterMarkersMode : TShowCutterMarkersMode;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SingleSlashNegation : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SnapToCenter : Boolean;  
__Description__  
This property represents the action where you hold the object being moved or dragged by its reference point \(for objects that have one, such as library components or ports\), or its center \(for objects which do not have a reference point such as a rectangle\)\.  
This function returns a boolean value whether the you can snap to the center of a object or not before being moved or dragged by its reference point\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_SnapToHotSpot : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_StringIncA : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_StringIncB : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_TranslateRotateColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_UndoRedoStackSize : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_UseOrcadPortWidth : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ViolationColorByLevel \(ALevel : TErrorLevel\) : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_ViolationDisplayByLevel \(ALevel : TErrorLevel\) : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_VisibleGridColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_VisibleGridStyle : TVisibleGrid;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Get\_WireAutoJunctionsColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function GridPresetsCount\(AUnit : TUnitSystem\) : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function GridPresetAt \(AUnit : TUnitSystem; AnIndex : Integer\) : IGridSetting;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AddTemplateToClipBoard \(AValue : Boolean\);  
__Description__  
The Set\_AddTemplateToClipBoard procedure adds the current sheet template to the clipboard when you copy or cut from the current schematic sheet if the True value is passed in as a parameter\. Otherwise the template is not copied ot the clipboard when the value is False\.  
__Example__  
Prefs\.Set\_AddTemplateToClipBoard\(True\);  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AlwaysDrag \(AValue : Boolean\);  
__Description__  
The Set\_AlwaysDrag procedure if set true you can drag a group of objects on a schematic document and the electrical wiring stay connected\. Note, to keep the connections clean while dragging, press the spacebar to cycle through the different corner modes in Altium Designer\. Set a false value to leave wiring alone and become disconnected when previously connected objects are being dragged\.  
__Example__  
Prefs\.Set\_AlwaysDrag\(True\);  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoBackupFileCount \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoBackupTime \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoPanJumpDistance \(AValue : TCoord\);  
__Description__  
The Set\_AutoPanJumpDistance function sets the size of each auto\-panning step with a TCoord value\. The step size determines how fast the document pans when auto\-panning is enabled\. The smaller the value, the slower or finer the auto\-panning movement\.  
__Example__  
Prefs\.Set\_AutoPanJumpDistance\(CoordToDxps\(Value\)\);  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoPanShiftJumpDistance \(AValue : TCoord\);  
__Description__  
The Set\_AutoPanShiftJumpDistance sets a value of TCoord type which determines the size of each step when the SHIFT key is held during auto\-panning in Altium Designer\. The shift step size determines how fast the document pans when auto\-panning is enabled and the SHIFT key is pressed\. The smaller the value, the slower or finer the auto\-panning movement\.  
__Example__  
Prefs\.Set\_AutoPanShiftJumpDistance\(DxpsToCoord\(100\)\);  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoPanStyle \(AValue : TAutoPanStyle\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_AutoZoom \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_BufferedPainting \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_BusAutoJunctionsColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ClickClearsSelection \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ComponentsCutWires \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ConfirmSelectionMemoryClear \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ConvertSpecialStrings \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_CtrlDbleClickGoesDown \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_CutterFixedLength \(AValue : TCoord\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_CutterGridSizeMultiple \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultEarthName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultPowerGndName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultPrimsPermanent \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultSheetStyle \(AValue : TSheetStyle\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultSignalGndName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultTemplateFileName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DefaultUnit \(AValue : TUnit\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DisplayPrinterFonts \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DocMenuID \(Const AValue : Widestring\);  
__Description__  
The DocMenuID property determines which pop up menu to pop up depending on whether it is a schematic or a library document\. The property returns a widestring format which can be either PUSCHMENU or PUSCHLIBMENU strings and they correspond to the entries in the Schematic Editor's resources file \(ADVSCH\.RCS file\)\.  
The procedure sets the new Document Menu ID value\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DocumentScope \(AValue : TChosenDocumentScope\);  
__Description__  
The DocumentScope property determines the scope for filtering and selection to be applied to the current document or to any open document in Altium Designer\. The Set\_DocumentScope method sets the Chosen Document scope\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_DoubleClickRunsInspector \(AValue : Boolean\);  
__Description__  
This method represents the option to bring up the Inspector dialog instead of the design object's properties dialog when you double click on a design object\.  
Assign false to this AValue parameter to disable this option if you want to see the design object's properties dialog when you double click on a design object\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_GraphicsCursorStyle \(AValue : TCursorShape\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_HotSpotGridDistance \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_IgnoreSelection \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_LastModelType \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_LibMenuID \(Const AValue : Widestring\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_LibraryScope \(AValue : TLibraryScope\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_MaintainOrthogonal \(AValue : Boolean\);  
__Description__  
The MaintainOrthogonal property if set to true then when you drag components, any wiring that is dragged with the component is kept orthogonal \(i\.e\. corners at 90 degrees\)\. If this option is disabled, wiring dragged with a component will be repositioned obliquely\.  
This method sets the property true or false and is used in the MaintainOrthogonal property\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ManualJunctionsColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_MarkManualParameters \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_Metafile\_NoERCMarkers \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_Metafile\_ParameterSets \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_Metafile\_Probes\(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_MultiPartNamingMethod \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_MultiSelectionColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_OptimizePolylines \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_OrcadFootPrint \(AValue : TOrcadFootPrint\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_PinNameMargin \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_PinNumberMargin \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_PolylineCutterMode \(AValue : TPolylineCutterMode\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ResizeColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_RunInPlaceEditing \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_SelectionColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_SelectionReference \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_Sensitivity \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ShowCutterBoxMode \(AValue : TShowCutterBoxMode\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ShowCutterMarkersMode \(AValue : TShowCutterMarkersMode\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_SingleSlashNegation \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_SnapToCenter \(AValue : Boolean\);  
__Description__  
This SnapToCenter property represents the action where you hold the object being moved or dragged by its reference point \(for objects that have one, such as library components or ports\), or its center \(for objects which do not have a reference point such as a rectangle\)\.  
The procedure sets whether you can snap to center of the objects or not\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_SnapToHotSpot \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_StringIncA \(AValue : WideString\);  
__Description__  
The Set\_StringIncA method represents a value to auto\-increment on pin designators of a component when you are placing pins for a component\. This is used for building components in the Library editor\.  Normally you would use a positive increment value for pin designators and negative increment value for pin names\. Eg  1, 2,3  for pin designators and D8, D7, D6 for pin names\. Thus Primary = 1 and Secondary = \-1 and set Display Name to D8 and Designator to 1 in the Pin Properties dialog before you place the first pin\.  
This method sets the increment value for the pin designators and the StringIncB method sets the increment value for the pin names\.  
This method is used by the StringIncA property\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_StringIncB \(AValue : WideString\);  
__Description__  
The Set\_StringIncB method represents a value to auto\-increment on pin designators of a component when you are placing pins for a component\. This is used for building components in the Library editor\.  Normally you would use a positive increment value for pin designators and negative increment value for pin names\. Eg  1, 2,3  for pin designators and D8, D7, D6 for pin names\. Thus Primary = 1 and Secondary = \-1 and set Display Name to D8 and Designator to 1 in the Pin Properties dialog before you place the first pin\.  
This method sets the increment value for the pin names and the StringIncA method sets the increment value for the pin designators\.  
This method is used by the StringIncB property\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_TranslateRotateColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_UndoRedoStackSize \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_UseOrcadPortWidth \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ViolationColorByLevel \(ALevel : TErrorLevel;AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_ViolationDisplayByLevel \(ALevel : TErrorLevel;AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_VisibleGridColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_VisibleGridStyle \(AValue : TVisibleGrid\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Procedure Set\_WireAutoJunctionsColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface



\(ISch\_Preferences interface\)  
__Syntax__  
Property WireAutoJunctionsColor : TColor Read Get\_WireAutoJunctionsColor Write Set\_WireAutoJunctionsColor;  
__Description__  
This property determines the color of the auto generated junctions on the schematic document\. This property is supported by the GetState\_WireAutoJunctionsColor and SetState\_WireAutoJunctionsColor methods\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type


\(ISch\_Preferences interface\)  
__Syntax__  
Property VisibleGridStyle : TVisibleGrid Read Get\_VisibleGridStyle Write Set\_VisibleGridStyle ;  
__Description__  
This property determines the lined or dotted style of the visible grid on the schematic document\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TVisibleGrid type


\(ISch\_Preferences interface\)  
__Syntax__  
Property VisibleGridColor : TColor Read Get\_VisibleGridColor Write Set\_VisibleGridColor ;  
__Description__  
This property determines the color of the visible grid on schematic sheets\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type


\(ISch\_Preferences interface\)  
__Syntax__  
Property ViolationDisplay \[L : TErrorLevel\] : Boolean Read Get\_ViolationDisplayByLevel Write Set\_ViolationDisplayByLevel;  
__Description__  
This ViolationDisplay property determines the error level for the violation display\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TErrorLevel type from Workspace Manager API


\(ISch\_Preferences interface\)  
__Syntax__  
Property ViolationColor \[L : TErrorLevel\] : TColor Read Get\_ViolationColorByLevel Write Set\_ViolationColorByLevel ;  
__Description__  
This ViolationColor property determines the color of the violation depending on the error level\. This property is supported by the Get\_ViolationColorByLevel and Set\_ViolationColorByLevel methods\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type  
TErrorLevel type in Workspace Manager API


\(ISch\_Preferences interface\)  
__Syntax__  
Property UseOrcadPortWidth : Boolean Read Get\_UseOrcadPortWidth Write Set\_UseOrcadPortWidth;  
__Description__  
The UseOrcadPortWidth property determines whether the ports can be re\-sized in the Schematic Editor\. This is important if the design has to go back to Orcad\(TM\) \(which does not support re\-sizing ports\)\.  
This property is supported by the Get\_UseOrcadPortWidth and Set\_UseOrcadPortWidth methods\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property UndoRedoStackSize : Integer Read Get\_UndoRedoStackSize Write Set\_UndoRedoStackSize ;  
__Description__  
This property shows the number of actions held in the Undo Buffer\. The default value is 50\. Define a value to set the Undo Buffer size\. There is no limit to the size of the Undo Buffer, however, the larger the size, the more main memory is used to store undo information\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property TranslateRotateColor : TColor Read Get\_TranslateRotateColor Write Set\_TranslateRotateColor ;  
__Description__  
This property sets or gets the color associated with translation or rotation\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type


\(ISch\_Preferences interface\)  
__Syntax__  
Property StringIncB : WideString Read Get\_StringIncB Write Set\_StringIncB ;  
__Description__  
This property represents a value to auto\-increment on pin names of a component when you are placing pins for a component\. This can be used for building components in the Library editor\.  
Normally you would use a positive increment value for pin designators and negative increment value for pin names\. Eg  1, 2,3  for pin designators and D8, D7, D6 for pin names\. Thus Primary = 1 and Secondary = \-1 and set Display Name to D8 and Designator to 1 in the Pin Properties dialog before you place the first pin\.  
This property is supported by the Get\_StringIncB and Set\_StringIncB methods\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property StringIncA : WideString Read Get\_StringIncA Write Set\_StringIncA ;  
__Description__  
This property represents a value to auto\-increment on pin designators of a component when you are placing pins for a component\. This is used for building components in the Library editor\.  Normally you would use a positive increment value for pin designators and negative increment value for pin names\. Eg  1, 2,3  for pin designators and D8, D7, D6 for pin names\. Thus Primary = 1 and Secondary = \-1 and set Display Name to D8 and Designator to 1 in the Pin Properties dialog before you place the first pin\.  
This property is supported by the Get\_StringIncA and Set\_StringIncA methods\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property SnapToHotSpot : Boolean Read Get\_SnapToHotSpot Write Set\_SnapToHotSpot ;  
__Description__  
This property represents the action where you hold the object being moved or dragged by the nearest electrical hot spot \(eg, the end of a pin\) when moving or dragging\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property SnapToCenter : Boolean Read Get\_SnapToCenter Write Set\_SnapToCenter ;  
__Description__  
This property represents the action where you hold the object being moved or dragged by its reference point \(for objects that have one, such as library components or ports\), or its center \(for objects which do not have a reference point such as a rectangle\)\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property SingleSlashNegation : Boolean Read Get\_SingleSlashNegation Write Set\_SingleSlashNegation ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property ShowCutterMarkersMode : TShowCutterMarkersMode Read Get\_ShowCutterMarkersMode Write Set\_ShowCutterMarkersMode ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property ShowCutterBoxMode : TShowCutterBoxMode Read Get\_ShowCutterBoxMode Write Set\_ShowCutterBoxMode ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property SheetStyle\_YZones \[S : TSheetStyle\]: TCoord Read Get\_SheetStyle\_YZones;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property SheetStyle\_YSize \[S : TSheetStyle\]: TCoord Read Get\_SheetStyle\_YSize;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property SheetStyle\_XZones \[S : TSheetStyle\]: TCoord Read Get\_SheetStyle\_XZones;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property SheetStyle\_XSize \[S : TSheetStyle\]: TCoord Read Get\_SheetStyle\_XSize;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property SheetStyle\_MarginWidth\[S : TSheetStyle\]: TCoord Read Get\_SheetStyle\_MarginWidth;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property Sensitivity : Integer Read Get\_Sensitivity Write Set\_Sensitivity ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property SelectionReference : Boolean Read Get\_SelectionReference Write Set\_SelectionReference ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property SelectionColor : TColor Read Get\_SelectionColor Write Set\_SelectionColor ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property RunInPlaceEditing : Boolean Read Get\_RunInPlaceEditing Write Set\_RunInPlaceEditing ;  
__Description__  
This property if set to true, then the focused text field may be directly edited within the Schematic Editor, rather than in a dialog box\.  After focusing the field you wish to modify, clicking upon it again or pressing the F2 shortcut key will open the field for editing\.  
If this property is set to false, you cannot edit the text directly and you have to edit it from the Parameter Properties dialog\. You can just graphically move this text field\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property ResizeColor : TColor Read Get\_ResizeColor Write Set\_ResizeColor ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type


\(ISch\_Preferences interface\)  
__Syntax__  
Property PolylineCutterMode : TPolylineCutterMode Read Get\_PolylineCutterMode Write Set\_PolylineCutterMode ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property PinNumberMargin : Integer Read Get\_PinNumberMargin Write Set\_PinNumberMargin ;  
__Description__  
Normally, component pin numbers are displayed outside the body of the component, directly above the corresponding pin line\. This property controls the placement of the pin numbers\. It specifies the distance \(in hundredths of an inch\) from the component outline to the start of the pin number text\. The default is 8\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property PinNameMargin : Integer Read Get\_PinNameMargin Write Set\_PinNameMargin ;  
__Description__  
Normally, component pin names are displayed inside the body of the component, adjacent to the corresponding pin\. This property controls the placement of component pin names\. It specifies the distance \(in hundredths of an inch\) from the component outline to the start of the pin name text\. The default is 5\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property OrcadFootPrint : TOrcadFootPrint Read Get\_OrcadFootPrint Write Set\_OrcadFootPrint ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property OptimizePolylines : Boolean Read Get\_OptimizePolylines Write Set\_OptimizePolylines ;  
__Description__  
If this property is set to true, then extra wires, poly\-lines or buses are prevented from overlapping on top of each other and the overlapping wires, poly\-lines or busses are removed automatically\.  
Note: You need to enable this option to have the ability to automatically cut a wire and terminate onto any two pins of this component when this component is dropped onto this wire\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property MultiSelectionColor : TColor Read Get\_MultiSelectionColor Write Set\_MultiSelectionColor ;  
__Description__  
This property determines the color of the multi\_selection, that is multiple objects on the schematic object is being selected\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type


\(ISch\_Preferences interface\)  
__Syntax__  
Property MultiPartNamingMethod : Integer Read Get\_MultiPartNamingMethod Write Set\_MultiPartNamingMethod ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property Metafile\_ParameterSets : Boolean Read Get\_Metafile\_ParameterSets Write Set\_Metafile\_ParameterSets ;  
__Description__  
This property if set to true includes Parameter Sets design objects when copying to the clipboard or when printing a schematic document\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property Metafile\_NoERCMarkers : Boolean Read Get\_Metafile\_NoERCMarkers Write Set\_Metafile\_NoERCMarkers ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property MarkManualParameters : Boolean Read Get\_MarkManualParameters Write Set\_MarkManualParameters;  
__Description__  
The MarkManualParameters property denotes whether the dots will be displayed or not when parameters of components for example are auto positioned\. If true, the dot for the parameter will appear when its associated component has been rotated/moved on the schematic document\.  
This property is supported by the Get\_MarkManualParameters and Set\_MarkManualParameters methods\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property ManualJunctionsColor : TColor Read Get\_ManualJunctionsColor Write Set\_ManualJunctionsColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type


\(ISch\_Preferences interface\)  
__Syntax__  
Property MaintainOrthogonal : Boolean Read Get\_MaintainOrthogonal Write Set\_MaintainOrthogonal ;  
__Description__  
This property if set to true then when you drag components, any wiring that is dragged with the component is kept orthogonal \(i\.e\. corners at 90 degrees\)\. If this option is disabled, wiring dragged with a component will be repositioned obliquely\.  
This property is supported by the Get\_MaintainOrthogonal and Set\_MaintainOrthogonal methods\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property LibraryScope : TLibraryScope Read Get\_LibraryScope Write Set\_LibraryScope ;  
__Description__  
This property represents scope for filtering and selection to be applied to the current component on a library sheet or to all components of an open library in Altium Designer\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TLibraryScope type


\(ISch\_Preferences interface\)  
__Syntax__  
Property LibMenuID : Widestring Read Get\_LibMenuID Write Set\_LibMenuID;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property LastModelType : WideString Read Get\_LastModelType Write Set\_LastModelType ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Function Import\_FromUser : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property IgnoreSelection : Boolean Read Get\_IgnoreSelection Write Set\_IgnoreSelection ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property HotSpotGridDistance : Integer Read Get\_HotSpotGridDistance Write Set\_HotSpotGridDistance ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property GraphicsCursorStyle : TCursorShape Read Get\_GraphicsCursorStyle Write Set\_GraphicsCursorStyle ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property AddTemplateToClipBoard : Boolean Read Get\_AddTemplateToClipBoard Write Set\_AddTemplateToClipBoard ;  
__Description__  
The AddTemplateToClipBoard property determines whether  the current sheet template can be added to to the clipboard when you copy or cut from the current schematic sheet\.  
__Example__  
Prefs\.AddTemplateToClipBoard := True;  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property AlwaysDrag : Boolean Read Get\_AlwaysDrag Write Set\_AlwaysDrag;  
__Description__  
This property represents the AlwaysDrag option and every time you are dragging a group of objects on a schematic document, the electrical wiring stay connected if it is true\. Note, to keep the connections clean while dragging, press the spacebar to cycle through the different corner modes\.  
Set it to false and the wiring are left alone and become disconnected when previously connected objects are being dragged\.  
__Example__  
Prefs\.AlwaysDrag := True;  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property AutoPanJumpDistance : TCoord Read Get\_AutoPanJumpDistance Write Set\_AutoPanJumpDistance ;  
__Description__  
This property represents the value to set/get the size of each auto\-panning step\. The step size determines how fast the document pans when auto\-panning is enabled\. The smaller the value, the slower or finer the auto\-panning movement\.  
This property is supported by the GetState\_AutoPanJumpDistance and SetState\_AutoPanJumpDistance methods\.  
__Example__  
Prefs\.AutoPanJumpDistance := CoordToDxps\(10\);  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property AutoPanShiftJumpDistance : TCoord Read Get\_AutoPanShiftJumpDistance Write Set\_AutoPanShiftJumpDistance ;  
__Description__  
This property represents a value to get/set the size of each step when the SHIFT key is held during auto\-panning\. The shift step size determines how fast the document pans when auto\-panning is enabled and the SHIFT key is pressed\. The smaller the value, the slower or finer the auto\-panning movement\. This property is supported by the Get\_AutoPanShiftJumpDistance and Set\_AutoPanShiftJumpDistance methods\.  
__Example__  
Prefs\.AutoPanShiftJumpDistance := DxpsToCoord\(100\);  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property AutoPanStyle : TAutoPanStyle Read Get\_AutoPanStyle Write Set\_AutoPanStyle ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property AutoZoom : Boolean Read Get\_AutoZoom Write Set\_AutoZoom ;  
__Description__  
This property if set to true the schematic sheet is automatically zoomed when jumping to a component\. Zoom level remains as it was if this option is not enabled\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property BufferedPainting : Boolean Read Get\_BufferedPainting Write Set\_BufferedPainting ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property BusAutoJunctionsColor : TColor Read Get\_BusAutoJunctionsColor Write Set\_BusAutoJunctionsColor;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface  
TColor type


\(ISch\_Preferences interface\)  
__Syntax__  
Property ClickClearsSelection : Boolean Read Get\_ClickClearsSelection Write Set\_ClickClearsSelection ;  
__Description__  
If this property is set to true, then all design objects are de\-selected by clicking any where on the schematic workspace\. Set this property to false if you do not want to have this click anywhere to deselect all ability and the selection is cumulative\.  
Note: regardless of the setting, you can de\-select a selected design object by clicking on it\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property ComponentsCutWires : Boolean Read Get\_ComponentsCutWires Write Set\_ComponentsCutWires ;  
__Description__  
Set the property to true so you can drop a component onto a schematic wire and then the wire is cut into two segments and the segments are terminated onto any two hot pins of this component automatically\. You will need to set the Optimize Wires & Buses option to true first\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property ConfirmSelectionMemoryClear : Boolean Read Get\_ConfirmSelectionMemoryClear Write Set\_ConfirmSelectionMemoryClear;  
__Description__  
The selection memories can be used to store the selection state of a set of objects\. To prevent inadvertent overwriting of a selection memory, set the property to true\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property ConvertSpecialStrings : Boolean Read Get\_ConvertSpecialStrings Write Set\_ConvertSpecialStrings ;  
__Description__  
This property when set to true, the contents of the special strings on screen are displayed, as they appear on a printout\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property CtrlDbleClickGoesDown : Boolean Read Get\_CtrlDbleClickGoesDown Write Set\_CtrlDbleClickGoesDown ;  
__Description__  
This property when set to true, the sub\-sheet of its associated sheet symbol by double clicking on this sheet symbol opens in Altium Designer\.  
Set it to false and when you double\-click on a sheet symbol, the change properties dialog is displayed instead\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property CutterFixedLength : TCoord Read Get\_CutterFixedLength Write Set\_CutterFixedLength ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property CutterGridSizeMultiple : Integer Read Get\_CutterGridSizeMultiple Write Set\_CutterGridSizeMultiple ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultDisplayUnit : TUnit Read Get\_DefaultUnit Write Set\_DefaultUnit;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultEarthName : WideString Read Get\_DefaultEarthName Write Set\_DefaultEarthName ;  
__Description__  
The DefaultEarthName denotes the default signal ground name to be used for objects on the schematic document\. The default name is EARTH\.  
This property is supported by the Get\_DefaultEarthName and Set\_DefaultEarthName methods\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultPowerGndName : WideString Read Get\_DefaultPowerGndName Write Set\_DefaultPowerGndName ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultPrimsPermanent : Boolean Read Get\_DefaultPrimsPermanent Write Set\_DefaultPrimsPermanent ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultSheetStyle : TSheetStyle Read Get\_DefaultSheetStyle Write Set\_DefaultSheetStyle;  
__Description__  
The DefaultSheetStyle property denotes the sheet style used for the workspace\.  
There are various sheet styles; A4,A3,A2,A1,A0, A,C,D,E,Letter, Legal, Tabloid, Orcad A, Orcad B, Orcad C, Orcad D, Orcad E\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TSheetStyle type


\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultSignalGndName : WideString Read Get\_DefaultSignalGndName Write Set\_DefaultSignalGndName ;  
__Description__  
The DefaultSignalGndName denotes the default signal ground name to be used for objects on the schematic document\. The default name is SGND\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultTemplateFileName : WideString Read Get\_DefaultTemplateFileName Write Set\_DefaultTemplateFileName ;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property DefaultUnitSystem : TUnitSystem Read Get\_DefaultUnitSystem;  
__Description__  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property DisplayPrinterFonts : Boolean Read Get\_DisplayPrinterFonts Write Set\_DisplayPrinterFonts ;  
__Description__  
The DisplayPrinterFonts property denotes whether the printer fonts can be displayed or not\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property DocMenuID : Widestring Read Get\_DocMenuID Write Set\_DocMenuID;  
__Description__  
The DocMenuID property determines which pop up menu to pop up depending on whether it is a schematic or a library document\. The property returns a widestring format which can be either PUSCHMENU or PUSCHLIBMENU strings and they correspond to the entries in the Schematic Editor's resources file \(ADVSCH\.RCS file\)\.  
__Example__  
__See also__  
ISch\_Preferences interface


\(ISch\_Preferences interface\)  
__Syntax__  
Property DocumentScope : TChosenDocumentScope Read Get\_DocumentScope Write Set\_DocumentScope ;  
__Description__  
The DocumentScope property determines the scope for filtering and selection to be applied to the current document or to any open document in Altium Designer\.  
__Example__  
__See also__  
ISch\_Preferences interface  
TChosenDocumentScope type


\(ISch\_Preferences interface\)  
__Syntax__  
Property DoubleClickRunsInspector : Boolean Read Get\_DoubleClickRunsInspector Write Set\_DoubleClickRunsInspector ;  
__Description__  
This property represents the option to bring up the Inspector dialog instead of the design object's properties dialog when you double click on a design object\.  
Assign false to this property to disable this option if you want to see the design object's properties dialog when you double click on a design object\. Invoke this property to check if design object's properties dialog is invoked \(False\) or the Inspector dialog \(True\) when you double click on a design object\.  
__Example__  
__See also__  
ISch\_Preferences interface


__Overview__  
The IGridSetting interface represents the grid settings for the Schematic documents part of a project\.

The IGridSetting interface hierarchy is a standalone\.

__IGridSetting methods__  
GetState\_SnapGridOn  
GetState\_HotspotGridOn  
GetState\_VisibleGridOn  
GetState\_SnapGridSize  
GetState\_HotspotGridSize  
GetState\_VisibleGridSize  
SetState\_SnapGridOn  
SetState\_HotspotGridOn  
SetState\_VisibleGridOn  
SetState\_SnapGridSize  
SetState\_HotspotGridSize  
SetState\_VisibleGridSize  
I\_ObjectAddress  
CopyTo  
SameAs

__IGridSetting properties__  
SnapGridOn  
HotspotGridOn  
VisibleGridOn  
SnapGridSize  
HotspotGridSize  
VisibleGridSize

__See also__  
ISch\_Preferences interface



\(IGridSetting interface\)  
__Syntax__  
Procedure CopyTo\(AGridSetting : IGridSetting\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Function GetState\_HotspotGridOn : Boolean;  
__Description__  
This function determines whether the hot spot grid is enabled or not and returns a True or False value\.  
__Example__

1

If GridSetting\.GetState\_HotspotGridOn = True Then

2

    HotspotGridSize := MilsToCoord\(4\);

__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Function GetState\_HotspotGridSize : TCoord;  
__Description__  
This function determines the size of the hot spot grid size\.  
__Example__

1

If GridSetting\.GetState\_HotspotGridOn = True Then

2

    HotspotGridSize := MilsToCoord\(4\);

__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Function GetState\_SnapGridOn : Boolean;  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Function GetState\_SnapGridSize : TCoord;  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Function GetState\_VisibleGridOn : Boolean;  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Function GetState\_VisibleGridSize : TCoord;  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Function I\_ObjectAddress : Pointer;  
__Description__  
This function returns the object address of the IGridSetting interface as a pointer type\.  
__Example__  
If GridSetting\.I\_ObjectAddress <> Nil Then ShowMessage\(IntToStr\(GridSetting\.I\_ObjectAddress\)\);  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Function SameAs\(AGridSetting : IGridSetting\) : Boolean;  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_HotspotGridOn \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_HotspotGridSize \(C : TCoord\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_SnapGridOn \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_SnapGridSize \(C : TCoord\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_VisibleGridOn \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_VisibleGridSize \(C : TCoord\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface



\(IGridSetting interface\)  
__Syntax__  
Property HotspotGridOn : Boolean Read GetState\_HotspotGridOn Write SetState\_HotspotGridOn ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Property HotspotGridSize : TCoord Read GetState\_HotspotGridSize Write SetState\_HotspotGridSize ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Property SnapGridOn : Boolean Read GetState\_SnapGridOn Write SetState\_SnapGridOn ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Property SnapGridSize : TCoord Read GetState\_SnapGridSize Write SetState\_SnapGridSize ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Property VisibleGridOn : Boolean Read GetState\_VisibleGridOn Write SetState\_VisibleGridOn ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface


\(IGridSetting interface\)  
__Syntax__  
Property VisibleGridSize : TCoord Read GetState\_VisibleGridSize Write SetState\_VisibleGridSize ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface



__Overview__  
The ISch\_FontManager interface represents the internal font manager in Schematic Editor that manages fonts for text based objects on schematic documents\.

To have access to the ISch\_FontManager interface, you need to invoke the SchServer function;  
FontManager := SchServer\.FontManager;

__ISch\_FontManager methods__  
GetState\_DefaultHorizontalSysFontId  
GetState\_DefaultVerticalSysFontId  
GetState\_FontCount  
GetState\_Rotation  
GetState\_Size  
GetState\_Italic  
GetState\_Bold  
GetState\_UnderLine  
GetState\_StrikeOut  
GetState\_SaveFlag  
GetState\_FontName  
GetFontHandle  
GetFontID  
GetFontSpec  
GetFontSize  
IsFontVertical  
Import\_FromUser

__ISch\_FontManager properties__  
DefaultHorizontalSysFontId  
DefaultVerticalSysFontId  
FontCount  
Rotation  
Size  
Italic  
Bold  
UnderLine  
StrikeOut  
SaveFlag  
FontName

__Example__

1

SchLabel\.Orientation := eRotate90;

2

SchLabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,False,False,False,'Times New Roman'\);

__See also__  
ISch\_Label interface



\(ISch\_FontManager interface\)  
__Syntax__  
Function GetFontHandle \(AnId: Integer; Const CurrentLogFont : TLogFont; ScreenSize : Integer\): THandle;  
__Description__  
This function retrieves the handle of the font\.  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetFontID \(Size,Rotation : Integer; Underline,Italic,Bold,StrikeOut : Boolean; Const FontName : WideString\) : TFontID;  
__Description__  
This function retrieves the font ID of TFontID type that can be used to set the font style of a text based object such as a ISch\_Label object\.  
__Example__  
ALabel\.FontId := SchServer\.FontManager\.GetFontID\(14,90,False,False,False,False,'Arial'\);  
__See also__  
ISch\_FontManager interface  
TFontID type


\(ISch\_FontManager interface\)  
__Syntax__  
Procedure GetFontSpec \(FontID : TFontID; Var Size,Rotation : Integer; Var Underline,Italic,Bold,StrikeOut : Boolean; Var FontName : WideString\);  
__Description__  
Every font used in the Schematic document has its own FontID\. You can invoke the GetFontSpec function to retrieve font specifications for the supplied Font ID\.  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetFontSize \(FontID : TFontID\) : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_Bold \(AnId : Integer\) : Boolean;  
__Description__  
This Bold property determines the Bold style for the font\. This property is supported by the GetState\_Bold method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,False,True,False,'Times New Roman'\);

__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_DefaultHorizontalSysFontId : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_DefaultVerticalSysFontId : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_FontCount : Integer;  
__Description__  
The FontCount property returns the number of fonts used in the Altium Designer\. This property is supported by the GetState\_FontCount method\.  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_FontName \(AnId : Integer\) : TFontName;  
__Description__  
This indexed FontName property returns the name of an indexed font as a string\. Every computer could have a different table of fonts used\. The FontName property is supported by the GetState\_FontName method\.  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_Italic \(AnId : Integer\) : Boolean;  
__Description__  
This Italic property determines the Italic style for the font\. This property is supported by the GetState\_Italic method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'

__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_Rotation \(AnId : Integer\) : Integer;  
__Description__  
The Rotation property determines the orientation of the text object\. For ISch\_Labels, it is necessary to set the Orientation property of these ISch\_Labels as well as the Rotation property for the FontID variables\. This property is supported by the GetState\_Rotation method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,False,False,False,'Times New Roman'\);

3

// Note eRotate90 for the Orientation property, and a 90 value as a parameter for the GetFontID method\.

__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_SaveFlag \(AnId : Integer\) : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_Size \(AnId : Integer\) : Integer;  
__Description__  
The Size property determines the font size\. This property is supported by the GetState\_Size method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Times New Roman Font size to 14 points \- 1st parameter

__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_StrikeOut \(AnId : Integer\) : Boolean;  
__Description__  
The StrikeOut property determines whether the font is striked out or not\. This property is supported by the GetState\_StrikeOut method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Strikeout set to false \(sixth parameter\)

__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_UnderLine \(AnId : Integer\) : Boolean;  
__Description__  
This UnderLine property determines whether the font is underlined or not\. This property is supported by the GetState\_UnderLine method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Strikeout set to false \(third parameter\)

__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function IsFontVertical\(FontID : TFontID\) : Boolean;  
__Description__  
This function determines whether the font is vertically orientated or not\.  
__Example__  
__See also__  
ISch\_FontManager interface



\(ISch\_FontManager interface\)  
__Syntax__  
Property Bold \[Id : Integer\] : Boolean Read GetState\_Bold ;  
__Description__  
This Bold property determines the Bold style for the font\. This property is supported by the GetState\_Bold method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,False,True,False,'Times New Roman'\);

__See also__  
ISch\_FontManager interface  
GetFontID method


\(ISch\_FontManager interface\)  
__Syntax__  
Property DefaultHorizontalSysFontId : Integer Read GetState\_DefaultHorizontalSysFontId;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Property DefaultVerticalSysFontId : Integer Read GetState\_DefaultVerticalSysFontId;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Property FontCount : Integer Read GetState\_FontCount;  
__Description__  
The FontCount property returns the number of fonts used in the computer system that the Altium Designer is currently residing on\. This property is supported by the GetState\_FontCount method\.  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Property FontName \[Id : Integer\] : TFontName Read GetState\_FontName ;  
__Description__  
This indexed FontName property returns the name of an indexed font as a string\. Every computer could have a different table of fonts used\. The FontName property is supported by the GetState\_FontName method\.  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Property Italic \[Id : Integer\] : Boolean Read GetState\_Italic ;  
__Description__  
This Italic property determines the Italic style for the font\. This property is supported by the GetState\_Italic method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

__See also__  
ISch\_FontManager interface  
GetFontID method


\(ISch\_FontManager interface\)  
__Syntax__  
Property Rotation \[Id : Integer\] : Integer Read GetState\_Rotation ;  
__Description__  
The Rotation property determines the orientation of the text object\. For ISch\_Labels, it is necessary to set the Orientation property of these ISch\_Labels as well as the Rotation property for the FontID variables\. This property is supported by the GetState\_Rotation method\.  
__Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,False,False,False,'Times New Roman'\);

3

// Note eRotate90 for the Orientation property, and a 90 value as a parameter for the GetFontID method\.

__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Property SaveFlag \[Id : Integer\] : Boolean Read GetState\_SaveFlag ;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager interface\)  
__Syntax__  
Property Size \[Id : Integer\] : Integer Read GetState\_Size ;  
__Description__  
The Size property determines the font size\. This property is supported by the GetState\_Size method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Times New Roman Font size to 14 points \- 1st parameter

__See also__  
ISch\_FontManager interface  
GetFontID method


\(ISch\_FontManager interface\)  
__Syntax__  
Property StrikeOut \[Id : Integer\] : Boolean Read GetState\_StrikeOut;  
__Description__  
The StrikeOut property determines whether the font is striked out or not\. This property is supported by the GetState\_StrikeOut method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Strikeout set to false \(sixth parameter\)

__See also__  
ISch\_FontManager interface  
GetFontID method


\(ISch\_FontManager interface\)  
__Syntax__  
Property UnderLine \[Id : Integer\] : Boolean Read GetState\_UnderLine;  
__Description__  
This UnderLine property determines whether the font is underlined or not\. This property is supported by the GetState\_UnderLine method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Strikeout set to false \(third parameter\)

__See also__  
ISch\_FontManager interface  
GetFontID method


__Overview__  
The ISch\_FontManager2 interface represents the internal font manager in Schematic Editor that manages fonts for text based objects on schematic documents\. The ISch\_FontManager2 is the same as ISch\_FontManager, but all the methods have the Safecall calling convention which is important for SDK purposes\.

To have access to the ISch\_FontManager interface, you need to invoke the SchServer function;  
FontManager := SchServer\.FontManager;

__ISch\_FontManager2 methods__  
GetState\_DefaultHorizontalSysFontId  
GetState\_DefaultVerticalSysFontId  
GetState\_FontCount  
GetState\_Rotation  
GetState\_Size  
GetState\_Italic  
GetState\_Bold  
GetState\_UnderLine  
GetState\_StrikeOut  
GetState\_SaveFlag  
GetState\_FontName  
GetFontHandle  
GetFontID  
GetFontSpec  
GetFontSize  
IsFontVertical  
Import\_FromUser

__ISch\_FontManage2r properties__  
DefaultHorizontalSysFontId  
DefaultVerticalSysFontId  
FontCount  
Rotation  
Size  
Italic  
Bold  
UnderLine  
StrikeOut  
SaveFlag  
FontName

__Example__

1

SchLabel\.Orientation := eRotate90;

2

SchLabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,False,False,False,'Times New Roman'\);

__See also__  
ISch\_Label interface



\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetFontHandle \(AnId: Integer; Const CurrentLogFont : TLogFont; ScreenSize : Integer\): THandle;  
__Description__  
This function retrieves the handle of the font\.  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetFontID \(Size,Rotation : Integer; Underline,Italic,Bold,StrikeOut : Boolean; Const FontName : WideString\) : TFontID;  
__Description__  
This function retrieves the font ID of TFontID type that can be used to set the font style of a text based object such as a ISch\_Label object\.  
__Example__  
ALabel\.FontId := SchServer\.FontManager\.GetFontID\(14,90,False,False,False,False,'Arial'\);  
__See also__  
ISch\_FontManager2 interface  
TFontID type


\(ISch\_FontManager2 interface\)  
__Syntax__  
Procedure GetFontSpec \(FontID : TFontID; Var Size,Rotation : Integer; Var Underline,Italic,Bold,StrikeOut : Boolean; Var FontName : WideString\);  
__Description__  
Every font used in the Schematic document has its own FontID\. You can invoke the GetFontSpec function to retrieve font specifications for the supplied Font ID\.  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetFontSize \(FontID : TFontID\) : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_Bold \(AnId : Integer\) : Boolean;  
__Description__  
This Bold property determines the Bold style for the font\. This property is supported by the GetState\_Bold method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,False,True,False,'Times New Roman'\);

__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_DefaultHorizontalSysFontId : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_DefaultVerticalSysFontId : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_FontCount : Integer;  
__Description__  
The FontCount property returns the number of fonts used in the Altium Designer\. This property is supported by the GetState\_FontCount method\.  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_FontName \(AnId : Integer\) : TFontName;  
__Description__  
This indexed FontName property returns the name of an indexed font as a string\. Every computer could have a different table of fonts used\. The FontName property is supported by the GetState\_FontName method\.  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_Italic \(AnId : Integer\) : Boolean;  
__Description__  
This Italic property determines the Italic style for the font\. This property is supported by the GetState\_Italic method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'

__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_Rotation \(AnId : Integer\) : Integer;  
__Description__  
The Rotation property determines the orientation of the text object\. For ISch\_Labels, it is necessary to set the Orientation property of these ISch\_Labels as well as the Rotation property for the FontID variables\. This property is supported by the GetState\_Rotation method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,False,False,False,'Times New Roman'\);

3

// Note eRotate90 for the Orientation property, and a 90 value as a parameter for the GetFontID method\.

__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_SaveFlag \(AnId : Integer\) : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_Size \(AnId : Integer\) : Integer;  
__Description__  
The Size property determines the font size\. This property is supported by the GetState\_Size method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Times New Roman Font size to 14 points \- 1st parameter

__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_StrikeOut \(AnId : Integer\) : Boolean;  
__Description__  
The StrikeOut property determines whether the font is striked out or not\. This property is supported by the GetState\_StrikeOut method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Strikeout set to false \(sixth parameter\)

__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_UnderLine \(AnId : Integer\) : Boolean;  
__Description__  
This UnderLine property determines whether the font is underlined or not\. This property is supported by the GetState\_UnderLine method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Strikeout set to false \(third parameter\)

__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Function IsFontVertical\(FontID : TFontID\) : Boolean;  
__Description__  
This function determines whether the font is vertically orientated or not\.  
__Example__  
__See also__  
ISch\_FontManager2 interface



\(ISch\_FontManager2 interface\)  
__Syntax__  
Property Bold \[Id : Integer\] : Boolean Read GetState\_Bold ;  
__Description__  
This Bold property determines the Bold style for the font\. This property is supported by the GetState\_Bold method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,False,True,False,'Times New Roman'\);

__See also__  
ISch\_FontManager interface  
GetFontID method


\(ISch\_FontManager2 interface\)  
__Syntax__  
Property DefaultHorizontalSysFontId : Integer Read GetState\_DefaultHorizontalSysFontId;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Property DefaultVerticalSysFontId : Integer Read GetState\_DefaultVerticalSysFontId;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Property FontCount : Integer Read GetState\_FontCount;  
__Description__  
The FontCount property returns the number of fonts used in the computer system that the Altium Designer is currently residing on\. This property is supported by the GetState\_FontCount method\.  
__Example__  
__See also__  
ISch\_FontManager interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Property FontName \[Id : Integer\] : TFontName Read GetState\_FontName ;  
__Description__  
This indexed FontName property returns the name of an indexed font as a string\. Every computer could have a different table of fonts used\. The FontName property is supported by the GetState\_FontName method\.  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Property Italic \[Id : Integer\] : Boolean Read GetState\_Italic ;  
__Description__  
This Italic property determines the Italic style for the font\. This property is supported by the GetState\_Italic method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

__See also__  
ISch\_FontManager2 interface  
GetFontID method


\(ISch\_FontManager2 interface\)  
__Syntax__  
Property Rotation \[Id : Integer\] : Integer Read GetState\_Rotation ;  
__Description__  
The Rotation property determines the orientation of the text object\. For ISch\_Labels, it is necessary to set the Orientation property of these ISch\_Labels as well as the Rotation property for the FontID variables\. This property is supported by the GetState\_Rotation method\.  
__Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,False,False,False,'Times New Roman'\);

3

// Note eRotate90 for the Orientation property, and a 90 value as a parameter for the GetFontID method\.

__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Property SaveFlag \[Id : Integer\] : Boolean Read GetState\_SaveFlag ;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface


\(ISch\_FontManager2 interface\)  
__Syntax__  
Property Size \[Id : Integer\] : Integer Read GetState\_Size ;  
__Description__  
The Size property determines the font size\. This property is supported by the GetState\_Size method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Times New Roman Font size to 14 points \- 1st parameter

__See also__  
ISch\_FontManager interface  
GetFontID method


\(ISch\_FontManager2 interface\)  
__Syntax__  
Property StrikeOut \[Id : Integer\] : Boolean Read GetState\_StrikeOut;  
__Description__  
The StrikeOut property determines whether the font is striked out or not\. This property is supported by the GetState\_StrikeOut method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Strikeout set to false \(sixth parameter\)

__See also__  
ISch\_FontManager interface  
GetFontID method


\(ISch\_FontManager2 interface\)  
__Syntax__  
Property UnderLine \[Id : Integer\] : Boolean Read GetState\_UnderLine;  
__Description__  
This UnderLine property determines whether the font is underlined or not\. This property is supported by the GetState\_UnderLine method\.  
DelphiScript __Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,True,False,False,'Times New Roman'\);

3

// Strikeout set to false \(third parameter\)

__See also__  
ISch\_FontManager interface  
GetFontID method


__Overview__  
The ISch\_JunctionConvertSettings interface hierarchy is as follows;

__ISch\_JunctionConvertSettings Methods and Properties Table__

__ISch\_JunctionConvertSettings methods__  
GetJunctionConversion  
SetJunctionConversion  
GetMiterSize  
SetMiterSize  
GetBatchMode  
SetBatchMode  
GetShowDialog  
SetShowDialog  
Export\_ToIniFile  
Import\_FromIniFile

__ISch\_JunctionConvertSettings properties__  
JunctionConversion  
MiterSize  
BatchMode  
ShowDialog



\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure SetShowDialog \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure SetMiterSize \(Value : TDistance\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure SetJunctionConversion\(Value : TJunctionConversionKind\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure SetBatchMode \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure Import\_FromIniFile\(Const OptionsReader : IOptionsReader\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Function GetShowDialog : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Function GetMiterSize : TDistance;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Function GetJunctionConversion : TJunctionConversionKind;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Function GetBatchMode : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Procedure Export\_ToIniFile \(Const OptionsWriter : IOptionsWriter\);  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface



\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Property MiterSize : TDistance Read GetMiterSize Write SetMiterSize;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Property JunctionConversion : TJunctionConversionKind Read GetJunctionConversion Write SetJunctionConversion;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Property BatchMode : Boolean Read GetBatchMode Write SetBatchMode;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


\(ISch\_JunctionConvertSettings interface\)  
__Syntax__  
Property ShowDialog : Boolean Read GetShowDialog Write SetShowDialog;  
__Description__  
__Example__  
__See also__  
ISch\_JunctionConvertSettings interface


__Overview__  
The ISch\_LibraryRuleChecker interface represents the internal library rule checker facility that checks the validity of symbols in schematic libraries\.

__ISch\_LIbraryRuleChecker Methods and Properties Table__

__ISch\_LibraryRuleChecker methods__  
GetState\_Duplicate\_Pins  
GetState\_Duplicate\_Component  
GetState\_Missing\_Pin\_Number  
GetState\_Missing\_Default\_Designator  
GetState\_Missing\_Footprint  
GetState\_Missing\_Description  
GetState\_Missing\_Pin\_Name  
GetState\_Missing\_Pins\_In\_Sequence  
GetState\_ShowReport  
SetState\_Duplicate\_Pins  
SetState\_Duplicate\_Component  
SetState\_Missing\_Pin\_Number  
SetState\_Missing\_Default\_Designator  
SetState\_Missing\_Footprint  
SetState\_Missing\_Description  
SetState\_Missing\_Pin\_Name  
SetState\_Missing\_Pins\_In\_Sequence  
SetState\_ShowReport  
SetState\_FromParameters  
Import\_FromUser  
Run  
I\_ObjectAddress

__ISch\_LibraryRuleChecker properties__  
Duplicate\_Pins  
Duplicate\_Component  
Missing\_Pin\_Number  
Missing\_Default\_Designator  
Missing\_Footprint  
Missing\_Description  
Missing\_Pin\_Name  
Missing\_Pins\_In\_Sequence  
ShowReport



\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Duplicate\_Component : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Duplicate\_Pins : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Default\_Designator : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Description : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Footprint : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Pin\_Name : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Pin\_Number : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_Missing\_Pins\_In\_Sequence : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function GetState\_ShowReport : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Duplicate\_Component \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Duplicate\_Pins \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function SetState\_FromParameters\(Parameters : PChar\) : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\_Default\_Designator\(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\___Description__ \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\_Footprint \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\_Pin\_Name \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\_Pin\_Number \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_Missing\_Pins\_In\_Sequence \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Procedure SetState\_ShowReport \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function Import\_FromUser : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function I\_ObjectAddress : TSCHObjectHandle;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Function Run : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface



\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Duplicate\_Component : Boolean Read GetState\_Duplicate\_Component Write SetState\_Duplicate\_Component ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Duplicate\_Pins : Boolean Read GetState\_Duplicate\_Pins Write SetState\_Duplicate\_Pins ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Default\_Designator : Boolean Read GetState\_Missing\_Default\_Designator Write SetState\_Missing\_Default\_Designator;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Description : Boolean Read GetState\_Missing\_Description Write SetState\_Missing\_Description ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Footprint : Boolean Read GetState\_Missing\_Footprint Write SetState\_Missing\_Footprint ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Pins\_In\_Sequence : Boolean Read GetState\_Missing\_Pins\_In\_Sequence Write SetState\_Missing\_Pins\_In\_Sequence ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Pin\_Name : Boolean Read GetState\_Missing\_Pin\_Name Write SetState\_Missing\_Pin\_Name ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property Missing\_Pin\_Number : Boolean Read GetState\_Missing\_Pin\_Number Write SetState\_Missing\_Pin\_Number ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


\(ISch\_LibraryRuleChecker interface\)  
__Syntax__  
Property ShowReport : Boolean Read GetState\_ShowReport Write SetState\_ShowReport ;  
__Description__  
__Example__  
__See also__  
ISch\_LibraryRuleChecker interface


__Overview__  
This ISch\_HitTest interface returns you the number of objects and object type at a particular point on the schematic document\.

__Notes__  
To specify the location where the objects can be checked on the schematic document, pass in the location \(of TLocation type\) and invoke the CreateHitTest method from the ISchDocument interface\. This location parameter can be set either programmatically or by the ChooseLocationInteractively method form the ISch\_Document interface\.

__ISch\_HitTest methods__  
GetState\_HitTestCount  
GetState\_HitObject

__ISch\_HitTest properties__  
HitTestCount  
HitObject

__See also__  
ISch\_Document interface  
CreateHitTest method  
ChooseLocationInteractively method  
ChooseRectangleInteractively method  
TLocation type



\(ISch\_HitTest interface\)  
__Syntax__  
Function GetState\_HitObject \(i : Integer\) : ISch\_GraphicalObject;  
__Description__  
This function returns you the indexed object at the particular point on the schematic document\. This method is used in the HitObject property\.  
__Example__  
__See also__  
ISch\_HitTest interface


\(ISch\_HitTest interface\)  
__Syntax__  
Function GetState\_HitTestCount : Integer;  
__Description__  
This function returns you the number of objects at the particular point on the schematic document\. This method is used in the HitTestCount property\.  
__Example__  
__See also__  
ISch\_HitTest interface



\(ISch\_HitTest interface\)  
__Syntax__  
Property HitObject\[i : Integer\] : ISch\_GraphicalObject Read GetState\_HitObject;  
__Description__  
This property returns you the indexed object at the particular point on the schematic document\. This property is supported by the GetState\_HitObject method\.  
__Example__  
__See also__  
ISch\_HitTest interface  
HitTestCount property


\(ISch\_HitTest interface\)  
__Syntax__  
Property HitTestCount : Integer Read GetState\_HitTestCount;  
__Description__  
This property returns you the number of objects at the particular point on the schematic document\. This property is supported by the GetState\_HitTestCount method\.  
__Example__  
__See also__  
ISch\_HitTest interface


__Overview__  
An iterator object interface represents an existing iterator object which iterates through a design database to fetch specified objects within a specified region if necessary\.

__Important Notes__  
Delphi Script does not support sets\. Therefore, to specify the object set or the layer set, you need to use the MkSet function to create a set of objects, for example Iterator\.AddFilter\_ObjectSet\(MkSet\(ePort\)\);

The TIterationDepth type denotes how deep the iterator can look \- look for first level objects \(for example standalone system parameters of the document only, or all levels for example all parameters on the document including system parameters, objects' parameters such as component's parameters\. By default, eIterateAllLevels value is used\.

SetState\_FilterAll denotes that all objects and the whole schematic document is to be searched within\. Otherwise, use the following AddFilter\_ObjectSet, AddFilter\_Area etc methods to set up a restricted search\.

The ISch\_Iterator interface hierarchy is as follows;

__ISch\_Iterator Methods and Properties Table__

__ISch\_Iterator methods__  
I\_ObjectAddress  
SetState\_FilterAll  
AddFilter\_ObjectSet  
AddFilter\_CurrentPartPrimitives  
AddFilter\_CurrentDisplayModePrimitives  
AddFilter\_PartPrimitives  
AddFilter\_Area  
SetState\_IterationDepth  
FirstSchObject  
NextSchObject

__ISch\_Iterator properties__

__See also__  
ISch\_BasicContainer interface  
ISch\_Lib interface



\(ISch\_Iterator interface\)  
__Syntax__  
Procedure AddFilter\_Area\(X1, Y1, X2, Y2 : TCoord\);  
__Description__  
The AddFilter\_Area procedure defines the rectangular bounds \(X1,Y1 and X2,Y2\) of the schematic/library document that the iterator will search within\.  
__Example__  
__See also__  
ISch\_Iterator interface  
TCoord type


\(ISch\_Iterator interface\)  
__Syntax__  
Procedure AddFilter\_CurrentDisplayModePrimitives;  
__Description__  
This procedure sets the iterator to look for current display mode primitives only\. A component can be represented by different modes \- ie there can be different graphical representations of the same component type\.  
__Example__  
__See also__  
ISch\_Iterator interface


\(ISch\_Iterator interface\)  
__Syntax__  
Procedure AddFilter\_CurrentPartPrimitives;  
__Description__  
This procedure sets up the filter of the iterator to look for the current primitives of a part only\. A component can be composed of multiple parts and each part is identified by its PartID value\.  
__Example__  
__See also__  
ISch\_Iterator interface


\(ISch\_Iterator interface\)  
__Syntax__  
Procedure AddFilter\_ObjectSet\(Const AObjectSet : TObjectSet\);  
__Description__  
This procedure defines which objects the iterator will look for on a schematid document or a library document\.  
__Example__  
__See also__  
ISch\_Iterator interface  
TObjectSet type


\(ISch\_Iterator interface\)  
__Syntax__  
Procedure AddFilter\_PartPrimitives\(APartId : Integer; ADisplayMode : TDisplayMode\);  
__Description__  
This procedure sets up the filter of the iterator to look for primitives of a part \(of a component\)\. A component can be a multi\-part component, for example a 74LS04 can have four parts and they are identified by the PartID value\.  
__Example__  
__See also__  
ISch\_Iterator interface  
TDisplayMode type in Workspace Manager API


\(ISch\_Iterator interface\)  
__Syntax__  
Function FirstSchObject : ISch\_BasicContainer;  
__Description__  
The FirstSchObject function fetches the first object found by the iterator\. The FirstSchObject method is to be invoked first and then in a While Nil loop, the NextSchObject is called repeatedly until it returns a nil value where the loop is terminated\.  
DelphiScript __Example__

01

Iterator   := CurrentSheet\.SchIterator\_Create;

02

Iterator\.AddFilter\_ObjectSet\(MkSet\(ePort\)\);

03

If Iterator = Nil Then Exit;

04

Try

05

    Port := Iterator\.FirstSchObject;

06

    While Port <> Nil Do

07

    Begin

08

        PortNumber := PortNumber \+ 1;

09

        Port := Iterator\.NextSchObject;

10

    End;

11

Finally

12

    CurrentSheet\.SchIterator\_Detroy\(Iterator\);

13

End;

__See also__  
ISch\_Iterator interface  
NextSchObject interface


\(ISch\_Iterator interface\)  
__Syntax__  
Function I\_ObjectAddress : TSCHObjectHandle;  
__Description__  
This function obtains the pointer to the iterator object\.  
__Example__  
__See also__  
ISch\_Iterator interface  
TSchObjectHandle type


\(ISch\_Iterator interface\)  
__Syntax__  
Function NextSchObject : ISch\_BasicContainer;  
__Description__  
The NextSchObject function fetches the next object found by the iterator\. The FirstSchObject method is to be invoked first and then in a While Nil loop, the NextSchObject is called repeatedly until it returns a nil value where the loop is terminated\.  
DelphiScript __Example__

01

Iterator   := CurrentSheet\.SchIterator\_Create;

02

Iterator\.AddFilter\_ObjectSet\(MkSet\(ePort\)\);

03

If Iterator = Nil Then Exit;

04

Try

05

    Port := Iterator\.FirstSchObject;

06

    While Port <> Nil Do

07

    Begin

08

        PortNumber := PortNumber \+ 1;

09

        Port := Iterator\.NextSchObject;

10

    End;

11

Finally

12

    CurrentSheet\.SchIterator\_Detroy\(Iterator\);

13

End;

__See also__  
ISch\_Iterator interface  
FirstSchObject method


\(ISch\_Iterator interface\)  
__Syntax__  
Procedure SetState\_FilterAll;  
__Description__  
This procedure sets the iterator to look for everything on a document\.  
__Example__  
__See also__  
ISch\_Iterator interface


\(ISch\_Iterator interface\)  
__Syntax__  
Procedure SetState\_IterationDepth\(AIterationDepth : TIterationDepth\);  
__Description__  
The TIterationDepth type denotes how deep the iterator can look on a document\.  
Look for first level objects, for example standalone system parameters of the document only, or all levels for example all parameters on the document including system parameters, objects' parameters such as component's parameters\.  
By default, eIterateAllLevels value is used\.  
__Example__  
__See also__  
ISch\_Iterator interface  
TIterationDepth type


__Overview__  
The ILibCompInfoReader interface represents the object which has the list of library components \(symbols\) of a loaded schematic library\.

A Schematic library file with a SchLib extension can be loaded in the object represented by the  ILibCompInfoReader interface and to obtain each component \(Symbol\), invoke the indexed ComponentInfos method\. This method fetches the object which is represented by the IComponentInfo interface\.

The steps required to load a schematic library and its components\.  
1\. Create an object and pass in the filename of a schematic library file\. This object is represented by the ILibCompInfoReader interface\. This object is created by the SchServer\.CreateLibCompInfoReader\(LibraryFileName\);  
2\. Invoke the ReadAllComponentInfo method to load the components specified by the library name\.  
3\. Invoke the NumComponentInfos method to obtain the number of components for this library  
4\. Obtain the indexed ComponentInfos method\. This ComponentInfos method returns the indexed IComponentInfo interface\.

__ILibCompInfoReader methods__  
GetState\_ComponentInfo  
GetState\_FileName  
ReadAllComponentInfo  
NumComponentInfos  
I\_ObjectAddress

__ILibCompInfoReader properties__  
ComponentInfos  
FileName



\(ILibCompInfoReader interface\)  
__Syntax__  
Function GetState\_ComponentInfo \(i : Integer\) : IComponentInfo;  
__Description__  
This GetState\_ComponentInfo function retrieves the indexed IComponentInfo interface representing the component information datastructure\. The ComponentInfo interface contains information such as component name, alias name, part count and offset for the indexed schematic symbol \(component\) in the library\.  
__Example__

01

Var

02

    ALibCompReader : ICompInfoReader;

03

    CompInfo       : IComponentInfo;

04

    CompNum, J     : Integer;

05

Begin

06

    ALibCompReader := SchServer\.CreateLibCompInfoReader\(FileName\);

07

    ALibCompReader\.ReadAllComponentInfo;

08

    CompNum := ALIbCompReader\.NumComponentInfos;

09

    For J := 0 To CompNum \-1 Do

10

    Begin

11

        ReportInfo\.Add\(FileName\);

12

        CompInfo := ALibCompReader\.ComponentInfos\[J\];

13

        ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

14

        ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

15

        ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

16

        ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

17

        ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

18

        ReportInfo\.Add\('  FileName : '    \+ CompInfo\.FileName\);

19

        ReportInfo\.Add\(''\);

20

    End;

__See also__  
ILibCompInfoReader interface  
IComponentInfo interface


\(ILibCompInfoReader interface\)  
__Syntax__  
Function GetState\_FileName : WideString;  
__Description__  
This GetState\_FileName function gets the temporary filename of the datastructure\.  
__Example__

01

Var

02

    ALibCompReader : ICompInfoReader;

03

    CompInfo       : IComponentInfo;

04

    CompNum, J     : Integer;

05

Begin

06

    ALibCompReader := SchServer\.CreateLibCompInfoReader\(FileName\);

07

    ALibCompReader\.ReadAllComponentInfo;

08

    ShowMessage\(ALibCompReader\.GetState\_FileName\);

09

    CompNum := ALIbCompReader\.NumComponentInfos;

10

    For J := 0 To CompNum \-1 Do

11

    Begin

12

        ReportInfo\.Add\(FileName\);

13

        CompInfo := ALibCompReader\.ComponentInfos\[J\];

14

        ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

15

        ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

16

        ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

17

        ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

18

        ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

19

        ReportInfo\.Add\('  FileName : '    \+ CompInfo\.FileName\);

20

        ReportInfo\.Add\(''\);

21

    End;

22

  

__See also__  
ILibCompInfoReader interface  
IComponentInfo interface


\(ILibCompInfoReader interface\)  
__Syntax__  
Function I\_ObjectAddress : TSCHObjectHandle;  
__Description__  
This function obtains the pointer to the ILibCompInfoReader object\.  
__Example__  
__See also__  
ILibCompInfoReader interface


\(ILibCompInfoReader interface\)  
__Syntax__  
Function NumComponentInfos : Integer;  
__Description__  
This NumComponentInfos function retrieves the number of component information data structures\. This method is also used by the ComponentInfos property\. The ComponentInfo interface contains information such as component name, alias name, part count and offset for the indexed schematic symbol \(component\) in the library\.  
__Example__

01

Var

02

    ALibCompReader : ICompInfoReader;

03

    CompInfo       : IComponentInfo;

04

    CompNum, J     : Integer;

05

Begin

06

    ALibCompReader := SchServer\.CreateLibCompInfoReader\(FileName\);

07

    ALibCompReader\.ReadAllComponentInfo;

08

    ShowMessage\(ALibCompReader\.GetState\_FileName\);

09

    CompNum := ALIbCompReader\.NumComponentInfos;

10

    For J := 0 To CompNum \-1 Do

11

    Begin

12

        ReportInfo\.Add\(FileName\);

13

        CompInfo := ALibCompReader\.ComponentInfos\[J\];

14

        ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

15

        ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

16

        ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

17

        ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

18

        ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

19

        ReportInfo\.Add\('  FileName : '    \+ CompInfo\.FileName\);

20

        ReportInfo\.Add\(''\);

21

    End;

__See also__  
ILibCompInfoReader interface


\(ILibCompInfoReader interface\)  
__Syntax__  
Procedure ReadAllComponentInfo;  
__Description__  
The ReadAllComponentInfo retrieves all the IComponentInfo data structures for the ILibCompInfoReader interface\. The ComponentInfo interface contains information such as component name, alias name, part count and offset for the indexed schematic symbol \(component\) in the library\.  
__Example__

01

Var

02

    ALibCompReader : ICompInfoReader;

03

    CompInfo       : IComponentInfo;

04

    CompNum, J     : Integer;

05

Begin

06

    ALibCompReader := SchServer\.CreateLibCompInfoReader\(FileName\);

07

    ALibCompReader\.ReadAllComponentInfo;

08

    ShowMessage\(ALibCompReader\.GetState\_FileName\);

09

    CompNum := ALIbCompReader\.NumComponentInfos;

10

    For J := 0 To CompNum \-1 Do

11

    Begin

12

        ReportInfo\.Add\(FileName\);

13

        CompInfo := ALibCompReader\.ComponentInfos\[J\];

14

        ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

15

        ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

16

        ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

17

        ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

18

        ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

19

        ReportInfo\.Add\('  FileName : '    \+ CompInfo\.FileName\);

20

        ReportInfo\.Add\(''\);

21

    End;

__See also__  
ILibCompInfoReader interface



\(ILibCompInfoReader interface\)  
__Syntax__  
Property ComponentInfos\[i : Integer\] : IComponentInfo Read GetState\_ComponentInfo;  
__Description__  
This ComponentInfos property retrieves the indexed IComponentInfo data structure\. This property is supported by the GetState\_ComponentInfo method\. The ComponentInfo interface contains information such as component name, alias name, part count and offset for the indexed schematic symbol \(component\) in the library\.  
__Example__

01

Var

02

    ALibCompReader : ICompInfoReader;

03

    CompInfo       : IComponentInfo;

04

    CompNum, J     : Integer;

05

Begin

06

    ALibCompReader := SchServer\.CreateLibCompInfoReader\(FileName\);

07

    ALibCompReader\.ReadAllComponentInfo;

08

    ShowMessage\(ALibCompReader\.GetState\_FileName\);

09

    CompNum := ALIbCompReader\.NumComponentInfos;

10

    For J := 0 To CompNum \-1 Do

11

    Begin

12

        ReportInfo\.Add\(FileName\);

13

        CompInfo := ALibCompReader\.ComponentInfos\[J\];

14

        ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

15

        ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

16

        ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

17

        ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

18

        ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

19

        ReportInfo\.Add\('  FileName : '    \+ CompInfo\.FileName\);

20

        ReportInfo\.Add\(''\);

21

    End;

__See also__  
ILibCompInfoReader interface


\(ILibCompInfoReader interface\)  
__Syntax__  
Property FileName : WideString Read GetState\_FileName;  
__Description__  
This FileName property gets the temporary filename of the datastructure\. The FileName property is supported by the GetState\_FileName function\.  
__Example__  
ShowMessage\(ALibCompReader\.Filename\)  
__See also__  
ILibCompInfoReader interface


__Overview__  
The IComponentInfo interface is an item within the ILibCompInfoReader interface\. This IComponentInfo interface represents a schematic symbol in a specified schematic library file with a SchLib extension\.

The steps required to load a schematic library and its components\.  
1\. Create an object and pass in the filename of a schematic library file\. This object is represented by the ILibCompInfoReader interface by the SchServer\.CreateLibCompInfoReader\(FileName\);  
2\. Invoke the ReadAllComponentInfo method to load the library and its components\.  
3\. Invoke the NumComponentInfos method to obtain the number of components for this library  
4\. Obtain the indexed ComponentInfos method\. This ComponentInfos method returns the indexed IComponentInfo interface\.

__Notes__  
The IComponentInfo interface is extracted from the ILibCompInfoReader\.ComponentInfos\[Index\] method\.

__IComponentInfo methods__  
GetState\_Offset  
GetState\_AliasName  
GetState\_CompName  
GetState\_PartCount  
GetState\_Description

__IComponentInfo properties__  
Offset  
AliasName  
CompName  
PartCount  
Description

__See also__  
ILibCompInfoReader interface



\(IComponentInfo interface\)  
__Syntax__  
Function GetState\_AliasName : WideString;  
__Description__  
This function returns the alias name for this component\. Ie a component can be referred to by one of its multiple names\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.GetState\_AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface


\(IComponentInfo interface\)  
__Syntax__  
Function GetState\_CompName : WideString;  
__Description__  
This function returns the name string for this component from the IComponentInfo object interface\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.GetState\_CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.GetState\_AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.GetState\_PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Getstate\_Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.GetState\_Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface


\(IComponentInfo interface\)  
__Syntax__  
Function GetState\_Description : WideString;  
__Description__  
This function returns the description string for this component from the IComponentInfo object interface\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.GetState\_CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.GetState\_AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.GetStatePartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.GetState\_Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.GetState\_Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface


\(IComponentInfo interface\)  
__Syntax__  
Function GetState\_Offset : Integer;  
__Description__  
This function returns the offset as a number \- each part of a component whole has an offset to denote its place within the component\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.GetState\_CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.GetState\_AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.GetState\_PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.GetState\_Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.GetState\_Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface


\(IComponentInfo interface\)  
__Syntax__  
Function GetState\_PartCount : Integer;  
__Description__  
This function obtains the number of parts \(multiple types of the same component type as an example\)\. For example an Integrated circuit may have multiple smaller modules, such as a 74LS00 has multiple OR gates\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.GetState\_CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.GetState\_AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.GetState\_PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.GetState\_Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.GetState\_Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface



\(IComponentInfo interface\)  
__Syntax__  
Property AliasName : WideString Read GetState\_AliasName;  
__Description__  
This property returns the alias name for this component\. Ie a component can be referred to by one of its multiple names\. This property is supported by the GetState\_AliasName method\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.GetState\_ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface


\(IComponentInfo interface\)  
__Syntax__  
Property CompName : WideString Read GetState\_CompName;  
__Description__  
This property returns the name string for this component from the IComponentInfo object interface\. This property is supported by the GetState\_CompName function\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.GetState\_ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface


\(IComponentInfo interface\)  
__Syntax__  
Property Description : WideString Read GetState\_Description;  
__Description__  
This property returns the description string for this component from the IComponentInfo object interface\. This property is supported by the GetState\_Description method\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.GetState\_ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface


\(IComponentInfo interface\)  
__Syntax__  
Property Offset : Integer Read GetState\_Offset;  
__Description__  
This property returns the offset as a number \- each part of a component whole has an offset to denote its place within the component\. This property is supported by the GetState\_Offset function\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.GetState\_ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface


\(IComponentInfo interface\)  
__Syntax__  
Property PartCount : Integer Read GetState\_PartCount;  
__Description__  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\('  Filename : '      \+ CompInfo\.Filename\);

15

    ReportInfo\.Add\(''\);

16

End;

__See also__  
IComponentInfo interface


__Overview__

__IComponentPainterView Methods and Properties Table__

__IComponentPainterView methods__  
HideComponentTextualDescriptions;  
HighLightComponentPins  
RegisterListener  
RenameSpecifiedPins  
SetComponent  
SetComponentByHandle  
ShowAllPins  
ShowPinsAsSelected  
ShowSpecifiedPinsOnly

__IComponentPainterView properties__

__See also__  
ISch\_ServerInterface interface  
IComponentMetafilePainter interface  
IDocumentPainterView interface



\(IComponentPainterView interface\)  
__Syntax__  
Procedure SetComponent\(LibReference, LibraryPath : WideString; APartIndex: Integer\);  
__Description__  
The SetComponent procedure sets the ComponentPainter object to display the specific part of a component from the library with the specified library path\. Note a component can be a multi\-part component and the first part is numbered 1 and so on\.  
A component painter object can also be set with the component's handle of ISch\_Component type\.  
__Example__

1

// display Schematic model on the 3d panel

2

// cLibraryPath\_Sch = 'C:\\Program Files\\Altium Designer\\Developer Kit\\Examples\\Sch\\View Models\\Xilinx CoolRunner II\.SchLib';

3

 

4

// cLibraryReference\_Sch = 'XC2C32\-3CP56C';

5

  

6

FExternalFormComponent\_Sch\.Visible := True;

7

ComponentPainter := FExternalForm\_Sch As IComponentPainterView;

8

ComponentPainter\.SetComponent\(cLibraryReference\_Sch, cLibraryPath\_Sch, 1\);

__See also__  
IComponentPainterView interface  
ViewModel server example in \\Developer Kit\\Examples\\Sch\\ViewModel folder of SDK installation\.


\(IComponentPainterView interface\)  
__Syntax__  
Procedure SetComponentByHandle\(AHandle : ISch\_Component; APartIndex : Integer\);  
__Description__  
The SetComponentByHandle procedure sets the ComponentPainter object to display the specific part of a component\. Note a component can be a multi\-part component and the first part is numbered 1 and so on\.  
A component painter object can also be set with the full path to a library and its component\.  
__Example__

1

FExternalFormComponent\_Sch\.Visible := True;

2

ComponentPainter := FExternalForm\_Sch As IComponentPainterView;

3

ComponentPainter\.SetComponent\(ACompHandle, 1\);

__See also__  
IComponentPainterView interface  
CreateComponentPainter method  
SetComponent method  
IExternalForm interface in RT\_ClientServerInterface unit\.  
TExternalFormComponent in ExternalForms unit\.


\(IComponentPainterView interface\)  
__Syntax__  
Procedure HighLightComponentPins\(APinNameList : WideString; AHighlightColor : TColor; ANonHighlightColor : TColor\);  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface


\(IComponentPainterView interface\)  
__Syntax__  
Procedure ShowSpecifiedPinsOnly\(APinNameList : WideString\);  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface


\(IComponentPainterView interface\)  
__Syntax__  
Procedure ShowAllPins;  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface


\(IComponentPainterView interface\)  
__Syntax__  
Procedure RenameSpecifiedPins\(APinNamesParam : WideString\);  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface


\(IComponentPainterView interface\)  
__Syntax__  
Procedure HideComponentTextualDescriptions;  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface


\(IComponentPainterView interface\)  
__Syntax__  
Procedure ShowPinsAsSelected\(APinNameList : WideString\);  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface


\(IComponentPainterView interface\)  
__Syntax__  
Procedure RegisterListener  \(APinSelectionListener : IComponentPinSelectionListener\);  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface


__Overview__  
This is for internal use\.

__IComponentPinSelectionListener__ methods  
ComponentPinSelectionChanged

__IComponentPinSelectionListener__ properties

__See also__  
ISch\_ServerInterface interface  
IComopnentPainterView interface



\(IComponentPinSelectionListener interface\)  
__Syntax__  
Procedure \(NewPinSelectionList : WideString\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IComponentPinSelectionListener interface


__Overview__  
The IComponentMetaFilePainter interface is an internal interface that provides a mechanism to generate images into library reports within the Schematic Library Editor\.

The IComponentMetafilePainter interface hierarchy is as follows;

__IComponentMetafilePainter methods__  
SetComponent  
DrawToMetafile

__IComponentMetafilePainter properties__

__See also__  
ISch\_ServerInterface interface  
IComponentPainterView interface  
IComponentMetafilePainter interface



\(IComponentMetafilePainter interface\)  
__Syntax__  
Procedure DrawToMetafile\(APartIndex : Integer; APaintColorMode : TPaintColorMode;AScaleMode : TPaintScaleMode; Const AFileName : WideString\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IComponentMetafilePainter interface  
TPaintColorMode type  
TPaintScaleMode type


\(IComponentMetafilePainter interface\)  
__Syntax__  
Procedure SetComponent \(Const ALibReference, ALibraryPath : WideString\);  
__Description__  
This is for internal use\.  
__Example__  
   
__See also__  
IComponentMetafilePainter interface


__Overview__  
The IDocumentPainterView interface is an internal interface for the Schematic Editor and it represents the Mini Viewer facility\. This is for internal use\.

__IDocumentPainterView methods__  
DrawCurrentZoomRectangle\_Invert  
PaintSingleObject  
Redraw  
Refresh  
RefreshCurrentZoomWindow  
SetState\_ClickHandler  
SetState\_DbleClickHandler  
SetState\_DocumentToPaint  
SetState\_MouseMoveOverLocationHandler

__IDocumentPainterView properties__

__See also__  
ISch\_ServerInterface interface  
IComponentPainterView interface  
IComponentMetafilePainter interface



\(IDocumentPainterView interface\)  
__Syntax__  
Procedure SetState\_MouseMoveOverLocationHandler\(ALocationProcedure : TLocationProcedure\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface


\(IDocumentPainterView interface\)  
__Syntax__  
Procedure SetState\_DocumentToPaint\(Const ADocument : ISch\_Document\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface


\(IDocumentPainterView interface\)  
__Syntax__  
Procedure SetState\_DbleClickHandler \(ALocationProcedure : TLocationProcedure\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface


\(IDocumentPainterView interface\)  
__Syntax__  
Procedure SetState\_ClickHandler \(ALocationProcedure : TLocationProcedure\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface


\(IDocumentPainterView interface\)  
__Syntax__  
Procedure RefreshCurrentZoomWindow;  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface


\(IDocumentPainterView interface\)  
__Syntax__  
Procedure Refresh;  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface


\(IDocumentPainterView interface\)  
__Syntax__  
Procedure Redraw \(Const AGraphicalObject : ISch\_GraphicalObject\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface


\(IDocumentPainterView interface\)  
__Syntax__  
Procedure PaintSingleObject \(Const AGraphicalObject : ISch\_GraphicalObject\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface


\(IDocumentPainterView interface\)  
__Syntax__  
Procedure DrawCurrentZoomRectangle\_Invert;  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface

## 子章节

- [Schematic API: System Interfaces Reference](01-Schematic_API_System_Interfaces_Reference.md/README.md)
