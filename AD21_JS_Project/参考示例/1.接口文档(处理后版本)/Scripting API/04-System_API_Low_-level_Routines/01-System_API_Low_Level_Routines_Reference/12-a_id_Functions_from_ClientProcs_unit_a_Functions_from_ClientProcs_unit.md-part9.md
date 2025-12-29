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