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