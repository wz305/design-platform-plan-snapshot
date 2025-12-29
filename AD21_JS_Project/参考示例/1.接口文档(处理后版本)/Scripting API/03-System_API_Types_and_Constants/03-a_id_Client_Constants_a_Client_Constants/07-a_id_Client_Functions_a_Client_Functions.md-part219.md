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

### <a id="ISch_Sheet_Interface"></a>ISch\_Sheet Interface

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