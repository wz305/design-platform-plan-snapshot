### <a id="ISch_Document_Interface"></a>ISch\_Document Interface

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

#### ISch\_Document Methods

##### BoundingRectangle\_Selected method

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

##### ChooseLocationInteractively method

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

##### ChooseRectangleInteractively method

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

##### CountContextMenuObjects method

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

##### CreateHitTest method

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

##### CreateLibraryFromProject method

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

##### Graphical\_VirtualRectangle method

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

##### LockViewUpdate method

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

##### ObjectReferenceZone method

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

##### PlaceSchComponent method

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

##### RedrawToDC method

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

##### RegisterSchObjectInContainer method

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

##### UnLockViewUpdate method

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

##### UnRegisterSchObjectFromContainer method

\(ISch\_Document interface\)  
__Syntax__  
Procedure UnRegisterSchObjectFromContainer \(AObject : ISch\_BasicContainer\);  
__Description__  
When a schematic object is unregistered from the container, it is explicitly freed and cannot be used again\.  
__Example__  
__See also__  
ISch\_Document interface

##### UnregisterAndFreeAllConnectionLines method

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

##### UpdateDocumentProperties method

\(ISch\_Document interface\)  
__Syntax__  
Procedure UpdateDocumentProperties;  
__Description__  
This method forces an update of the document properties after the properties have been modified programmatically\.  
__Example__  
Document\.UpdateDocumentProperties;  
__See also__  
ISch\_Document interface

#### ISch\_Document GetState and SetState Methods

##### GetState\_BorderOn method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_BorderOn : Boolean;  
__Description__  
This BorderOn property determines whether the border on around the outside of the current schematic document will be displayed or not\.  
The method returns a boolean value whether the Border is displayed or not and is used in the BorderOn property\.  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_CustomMarginWidth method

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

##### GetState\_CustomSheetStyle method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_CustomSheetStyle : WideString;  
__Description__  
This property represents custom sheet style property which values can be inherited from one of the standard sheet styles and customized further\. This function sets the custom sheet style\.  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_CustomX method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_CustomX : TCoord;  
__Description__  
The CustomX property determines the width of the custom sheet for the document\. This method gets the CustomX value and is used in the CustomX property\.  
__Example__  
__See also__  
ISch\_Document interface  
TCoord type

##### GetState\_CustomXZones method

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

##### GetState\_CustomY method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_CustomY : TCoord;  
__Description__  
The CustomY property determines the height of the custom sheet for the document\. This method gets the CustomY value and is used in the CustomY property\.  
__Example__  
__See also__  
ISch\_Document interface  
TCoord type

##### GetState\_CustomYZones method

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

##### GetState\_DocumentBorderStyle method

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

##### GetState\_DocumentName method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_DocumentName : WideString ;  
__Description__  
The read only DocumentName property determines the schematic document name\. This method is used in the DocumentName property\.  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_HotSpotGridOn method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_HotSpotGridOn : Boolean;  
__Description__  
The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
The procedure gets the boolean value whether the hot spot grid is on or not and is used in the HotSpotGridOn property\.  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_HotSpotGridSize method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_HotSpotGridSize : TCoord;  
__Description__  
The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
The procedure gets the hot spot grid size and is used in the HotSpotGridSize property\.  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_InternalTolerance method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_InternalTolerance : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_LoadFormat method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_LoadFormat : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_ReferenceZonesOn method

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

##### GetState\_SheetMarginWidth method

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

##### GetState\_SheetSizeX method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SheetSizeX : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_SheetSizeY method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SheetSizeY : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_SheetStyle method

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

##### GetState\_SheetZonesX method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SheetZonesX : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_SheetZonesY method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SheetZonesY : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_ShowTemplateGraphics method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_ShowTemplateGraphics : Boolean;  
__Description__  
The template is usually placed on the bottom right of the schematic sheet\. The template files have a DOT extension and are located in the \\Templates\\ folder of Altium Designer software installation\.  
The procedure determines whether the template graphics can be displayed or not and is used in the ShowTemplateGraphics property\.  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_SnapGridOn method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SnapGridOn : Boolean;  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
The procedure gets a boolean value whether the SnapGrid is active or not and is used in the SnapGridOn property\.  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_SnapGridSize method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SnapGridSize : TCoord;  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
The procedure gets the size value of the snap grid and is used in the SnapGridSize property\.  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_SystemFont method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_SystemFont : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_TemplateFileName method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_TemplateFileName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_TitleBlockOn method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_TitleBlockOn : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_Unit method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_Unit : TUnit;  
__Description__  
This property determines the system unit used for the schematic project\. The available imperial units are Mils, inches, DXP default and Auto imperial as well as available metric units which are mm,cm, metres and auto\-metric\.  
__Example__  
__See also__  
ISch\_Document interface  
TUnit type

##### GetState\_UnitSystem method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_UnitSystem : TUnitSystem;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_UseCustomSheet method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_UseCustomSheet : Boolean;  
__Description__  
The property determines whether a custom sheet is used instead of a standard sheet\. If the UseCustomSheet is true, then the CustomMarginWidth, CustomSheetStyle, CustomX and CustomY properties can be set for this custom sheet property\.  
This procedure gets the value whether the custom sheet is used instead of a standard sheet and is used in the UseCustomSheet property\.  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_VisibleGridOn method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_VisibleGridOn : Boolean;  
__Description__  
The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_VisibleGridSize method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_VisibleGridSize : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### GetState\_WorkspaceOrientation method

\(ISch\_Document interface\)  
__Syntax__  
Function GetState\_WorkspaceOrientation : TSheetOrientation;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_BorderOn method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_BorderOn \(AValue : Boolean\);  
__Description__  
This BorderOn property determines whether the border on around the outside of the current schematic document will be displayed or not\.  
The method sets a boolean value whether the Border is displayed or not and is used in the BorderOn property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_CustomMarginWidth method

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

##### SetState\_CustomSheetStyle method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_CustomSheetStyle \(AValue : WideString\);  
__Description__  
This property represents custom sheet style property which values can be inherited from one of the standard sheet styles and customized further\. This method defines the custom sheet style and then can be customized further\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_CustomX method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_CustomX \(AValue : TCoord\);  
__Description__  
The CustomX property sets the width of the custom sheet for the document\. This method sets the CustomX value and is used in the CustomX property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_CustomXZones method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_CustomXZones \(AValue : TCoord\);  
__Description__  
This property determines the number of regions or reference zones that are displayed along the horizontal and vertical borders\. The reference zones form a reference grid along the border of your schematic\. This reference grid is only for display purposes and does not affect the Snap, Visible or Electrical Grids that are used when placing schematic objects\.  
This method sets the CustomXZones property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_CustomY method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_CustomY \(AValue : TCoord\);  
__Description__  
The CustomY property sets the width of the custom sheet for the document\. This method sets the CustomY value and is used in the CustomY property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_CustomYZones method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_CustomYZones \(AValue : TCoord\);  
__Description__  
This property determines the number of regions or reference zones that are displayed along the horizontal and vertical borders\. The reference zones form a reference grid along the border of your schematic\. This reference grid is only for display purposes and does not affect the Snap, Visible or Electrical Grids that are used when placing schematic objects\.  
This method sets the CustomYZones property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_DocumentBorderStyle method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_DocumentBorderStyle \(AValue : TSheetDocumentBorderStyle\);  
__Description__  
The DocumentBorderStyle property determines the current document/border style for the schematic sheet \- ANSI or standard blocks\.  
The function sets the current document border style and is used in the DocumentBorderStyle property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_HotSpotGridOn method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_HotSpotGridOn \(AValue : Boolean\);  
__Description__  
The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_HotSpotGridSize method

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

##### SetState\_LoadFormat method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_LoadFormat \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_ReferenceZonesOn method

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

##### SetState\_SheetMarginWidth method

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

##### SetState\_SheetSizeX method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SheetSizeX \(AValue : TCoord\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_SheetSizeY method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SheetSizeY \(AValue : TCoord\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_SheetStyle method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SheetStyle \(AValue : TSheetStyle\);  
__Description__  
The SheetStyle property determines the document standard style\. One of the document sheet styles are A4, Letter and imperial/metric sized sheets\.  
The procedure defines the sheet style and is used in the SheetStyle property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_SheetZonesX method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SheetZonesX \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_SheetZonesY method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SheetZonesY \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_ShowTemplateGraphics method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_ShowTemplateGraphics\(AValue : Boolean\);  
__Description__  
The template is usually placed on the bottom right of the schematic sheet\. The template files have a DOT extension and are located in the in the \\Templates\\ folder of the Altium Designer software installation\.  
The procedure sets whether the template graphics can be displayed or not and is used in the ShowTemplateGraphics property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_SnapGridOn method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SnapGridOn \(AValue : Boolean\);  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
The procedure sets a boolean value whether the SnapGrid is active or not and is used in the SnapGridOn property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_SnapGridSize method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SnapGridSize \(AValue : TCoord\);  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
The procedure sets the size value of the snap grid and is used in the SnapGridSize property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_SystemFont method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_SystemFont \(AValue : TFontId\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_TemplateFileName method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_TemplateFileName \(AValue : WideString\);  
__Description__  
The template filename is the filename of the template that is placed usually on the bottom right of the schematic sheet\. The template files have a DOT extension and are located in the \\Templates\\ folder of the Altium Designer installation\.  
The procedure sets the template filename and is used in the TemplateFilename property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_TitleBlockOn method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_TitleBlockOn \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_Unit method

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

##### SetState\_UseCustomSheet method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_UseCustomSheet \(AValue : Boolean\);  
__Description__  
The property determines whether a custom sheet is used instead of a standard sheet\. If the UseCustomSheet is true, then the CustomMarginWidth, CustomSheetStyle, CustomX and CustomY properties can be set for this custom sheet property\.  
This procedure sets whether the custom sheet is used instead of a standard sheet and is used in the UseCustomSheet property\.  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_VisibleGridOn method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_VisibleGridOn \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_VisibleGridSize method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_VisibleGridSize \(AValue : TCoord\);  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### SetState\_WorkspaceOrientation method

\(ISch\_Document interface\)  
__Syntax__  
Procedure SetState\_WorkspaceOrientation\(AValue : TSheetOrientation\);  
__Description__  
This procedure sets the orientation of the workspace \- either as a portrait or as a landscape format\.  
__Example__  
__See also__  
ISch\_Document interface  
TSheetOrientation type

#### ISch\_Document Properties

##### BorderOn property

\(ISch\_Document interface\)  
__Syntax__  
Property BorderOn : Boolean Read GetState\_BorderOn Write SetState\_BorderOn;  
__Description__  
This BorderOn property determines whether the border on around the outside of the current schematic document will be displayed or not\.  
__Example__  
__See also__  
ISch\_Document interface

##### CustomMarginWidth property

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

##### CustomSheetStyle property

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

##### CustomX property

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

##### CustomXZones property

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

##### CustomY property

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

##### CustomYZones property

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

##### DocumentBorderStyle property

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

##### DisplayUnit property

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

##### DocumentName property

\(ISch\_Document interface\)  
__Syntax__  
Property DocumentName : WideString Read GetState\_DocumentName;  
__Description__  
This read only property determines the schematic document name\. This property is supported by the GetState\_DocumentName;  
__Example__  
__See also__  
ISch\_Document interface

##### HotSpotGridOn property

\(ISch\_Document interface\)  
__Syntax__  
Property HotSpotGridOn : Boolean Read GetState\_HotSpotGridOn Write SetState\_HotSpotGridOn;  
__Description__  
The property determines whether the hot spot grid is displayed or not\. The electrical grid supports the Schematic Editor's guided wiring feature\. When you are moving an electrical object in the workspace, and when it falls within the electrical grid range of another electrical object that you could connect to, the object you are moving will snap to the fixed object and a hot spot or highlight dot will appear\. This dot guides you as to where a valid connection can be made\. The electrical grid \(hot spot\) should be set slightly lower than the current snap grid or else it becomes difficult to position electrical objects one snap grid apart\.  
This property is supported by the GetState\_HotSpotGridOn and SetState\_HotSpotGridOn methods\.  
__Example__  
__See also__  
ISch\_Document interface

##### HotSpotGridSize property

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

##### InternalTolerance property

\(ISch\_Document interface\)  
__Syntax__  
Property InternalTolerance : TCoord Read GetState\_InternalTolerance;   
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### LoadFormat property

\(ISch\_Document interface\)  
__Syntax__  
Property LoadFormat : WideString Read GetState\_LoadFormat Write SetState\_LoadFormat;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### PopupMenuHitTest method

\(ISch\_Document interface\)  
__Syntax__  
Function PopupMenuHitTest : ISch\_HitTest;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface  
ISch\_HitTest interface

##### ReferenceZonesOn property

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

##### SheetMarginWidth property

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

##### SheetStyle property

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

##### SheetSizeX property

\(ISch\_Document interface\)  
__Syntax__  
Property SheetSizeX : TCoord Read GetState\_SheetSizeX Write SetState\_SheetSizeX;  
__Description__  
The SheetSizeX property defines the width of the sheet\. This property is supported by the GetState\_SheetSizeX and GetState\_SheetSizeX methods\.  
__Example__  
__See also__  
ISch\_Document interface  
SheetSizeY method

##### SheetSizeY property

\(ISch\_Document interface\)  
__Syntax__  
Property SheetSizeY : TCoord Read GetState\_SheetSizeY Write SetState\_SheetSizeY;  
__Description__  
The SheetSizeY property defines the height of the sheet\. This property is supported by the GetState\_SheetSizeY and GetState\_SheetSizeY methods\.  
__Example__  
__See also__  
ISch\_Document interface

##### SheetZonesX property

\(ISch\_Document interface\)  
__Syntax__  
Property SheetZonesX : Integer Read GetState\_SheetZonesX Write SetState\_SheetZonesX;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### SheetZonesY property

\(ISch\_Document interface\)  
__Syntax__  
Property SheetZonesY : Integer Read GetState\_SheetZonesY Write SetState\_SheetZonesY;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### ShowTemplateGraphics property

\(ISch\_Document interface\)  
__Syntax__  
Property ShowTemplateGraphics : Boolean Read GetState\_ShowTemplateGraphics Write SetState\_ShowTemplateGraphics;  
__Description__  
The template is usually placed on the bottom right of the schematic sheet\. The template files have a DOT extension and are located in the \\Templates\\ folder of the Altium Designer software installation\.  
The property determines whether the template graphics are displayed or not\.  
__Example__  
__See also__  
ISch\_Document interface

##### SnapGridOn property

\(ISch\_Document interface\)  
__Syntax__  
Property SnapGridOn : Boolean Read GetState\_SnapGridOn Write SetState\_SnapGridOn;  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
This property is supported by the GetState\_SnapGridOn and SetState\_SnapGridOn methods\.  
__Example__  
__See also__  
ISch\_Document interface

##### SnapGridSize property

\(ISch\_Document interface\)  
__Syntax__  
Property SnapGridSize : TCoord Read GetState\_SnapGridSize Write SetState\_SnapGridSize;  
__Description__  
The snap grid is the grid that the cursor is locked to when placing or manipulating objects on the sheet\. This grid should be left on at all times except when specifically placing or moving objects that need to be off grid such as text objects\. The visible grid is the grid you see on the grid which acts as a visual grid and typically it is set to be the same as or a multiple of the snap grid\.  
The property defines the snap grid size and is supported by the GetState\_SnapGridSize and SetState\_SnapGridSize methods\.  
__Example__  
__See also__  
ISch\_Document interface

##### SystemFont property

\(ISch\_Document interface\)  
__Syntax__  
Property SystemFont : TFontId Read GetState\_SystemFont Write SetState\_SystemFont;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface  
TFontID type

##### TemplateFileName property

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

##### TitleBlockOn property

\(ISch\_Document interface\)  
__Syntax__  
Property TitleBlockOn : Boolean Read GetState\_TitleBlockOn Write SetState\_TitleBlockOn;  
__Description__  
The property determines whether the title block is displayed or not and is supported by the GetState\_TitleBlockOn and SetState\_TitleBlockOn methods\.  
__Example__  
__See also__  
ISch\_Document interface  
DocumentBorderStyle method

##### VisibleGridOn property

\(ISch\_Document interface\)  
__Syntax__  
Property VisibleGridOn : Boolean Read GetState\_VisibleGridOn Write SetState\_VisibleGridOn;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### UnitSystem property

\(ISch\_Document interface\)  
__Syntax__  
Property UnitSystem : TUnitSystem Read GetState\_UnitSystem;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### UseCustomSheet property

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

##### VisibleGridSize property

\(ISch\_Document interface\)  
__Syntax__  
Property VisibleGridSize : TCoord Read GetState\_VisibleGridSize Write SetState\_VisibleGridSize;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface

##### WorkspaceOrientation property

\(ISch\_Document interface\)  
__Syntax__  
Property WorkspaceOrientation : TSheetOrientation Read GetState\_WorkspaceOrientation Write SetState\_WorkspaceOrientation;  
__Description__  
__Example__  
__See also__  
ISch\_Document interface