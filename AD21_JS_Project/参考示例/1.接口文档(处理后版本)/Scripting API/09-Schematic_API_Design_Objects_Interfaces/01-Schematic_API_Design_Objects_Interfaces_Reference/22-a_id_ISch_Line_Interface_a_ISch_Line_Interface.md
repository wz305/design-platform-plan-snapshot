### <a id="ISch_Line_Interface"></a>ISch\_Line Interface

__Overview__  
Lines are graphical drawing objects with any number of joined segments\. A line object is represented by the ISch\_Line interface\.  
__Notes__  
The ISch\_Line interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Line

__ISch\_Line methods__  
GetState\_Corner  
GetState\_LineWidth  
GetState\_LineStyle  
SetState\_Corner  
SetState\_LineWidth  
SetState\_LineStyle

__ISch\_Line properties__  
Corner  
LineWidth  
LineStyle

__Example__

01

Procedure PlaceASchLine;

02

Var

03

    SchDoc    : ISch\_Document;

04

    WorkSpace : IWorkSpace;

05

    SchLine   : ISch\_Line;

06

Begin

07

    // Generate a blank Schematic document

08

    WorkSpace := GetWorkSpace;

09

    If WorkSpace = Nil Then Exit;

10

    Workspace\.DM\_CreateNewDocument\('SCH'\);

11

  

12

    // Check if Schematic Editor is active

13

    If SchServer = Nil Then Exit;

14

    SchDoc := SchServer\.GetCurrentSchDocument;

15

    If SchDoc = Nil Then Exit;

16

  

17

     // Create a new line and place it on the document\.

18

     SchLine := SchServer\.SchObjectFactory\(eLine,eCreate\_GlobalCopy\);

19

     If SchLine = Nil Then Exit;

20

     SchLine\.Location  := Point\(180, 200\);

21

     SchLine\.Corner    := Point\(180, 400\);

22

     SchLine\.LineWidth := eMedium;

23

     SchLine\.LineStyle := eLineStyleSolid;

24

     SchLine\.Color := $FF00FF;

25

     SchDoc\.RegisterSchObjectInContainer\(SchLine\);

26

End;

__See also__  
ISch\_GraphicalObject interface

#### Methods

##### SetState\_LineStyle method

\(ISch\_Line interface\)  
__Syntax__  
Procedure SetState\_LineStyle \(AStyle : TLineStyle\);  
__Description__  
__Example__  
__See also__  
ISch\_Line interface

##### SetState\_Corner method

\(ISch\_Line interface\)  
__Syntax__  
Procedure SetState\_Corner \(ALocation : TLocation\);  
__Description__  
__Example__  
__See also__  
ISch\_Line interface

##### GetState\_LineWidth method

\(ISch\_Line interface\)  
__Syntax__  
Function GetState\_LineWidth : TSize;  
__Description__  
This GetState\_LineWidth function gets the width of the border around the line object\. The width is determined by the TSize type\.  
__Example__  
Width := Line\.GetState\_LineWidth; // Width is of TSize type\.  
__See also__  
TSize type\.  
ISch\_Line interface

##### GetState\_LineStyle method

\(ISch\_Line interface\)  
__Syntax__  
Function GetState\_LineStyle : TLIneStyle;  
__Description__  
__Example__  
__See also__  
ISch\_Line interface

##### GetState\_Corner method

\(ISch\_Line interface\)  
__Syntax__  
Function GetState\_Corner : TLocation;  
__Description__  
__Example__  
__See also__  
ISch\_Line interface

##### SetState\_LineWidth method

\(ISch\_Line interface\)  
__Syntax__  
Procedure SetState\_LineWidth \(ASize : TSize\);  
__Description__  
This SetState\_LineWidth procedure sets the width of the border line around the line\. The width is determined by the TSize type\.  
__Example__  
Line\.SetState\_LineWidth\(eSmall\);  
__See also__  
__TSize type\.__  
ISch\_Line interface

#### Properties

##### LineWidth property

\(ISch\_Line interface\)  
__Syntax__  
Property LineWidth : TSize Read GetState\_LineWidth Write SetState\_LineWidth;  
__Description__  
The LineWidth property defines the border width of the line with one of the following values from the TSize enumerated type\. This property is supported by the GetState\_LineWidth and SetState\_LineWidth methods\.  
__Example__  
Line\.LineWidth\(eSmall\);  
__See also__  
TSize type\.  
ISch\_Line interface

##### LineStyle property

\(ISch\_Line interface\)  
__Syntax__  
Property LineStyle : TLineStyle Read GetState\_LineStyle Write SetState\_LineStyle;  
__Description__  
__Example__  
__See also__  
ISch\_Line interface

##### Corner property

\(ISch\_Line interface\)  
__Syntax__  
Property Corner : TLocation Read GetState\_Corner Write SetState\_Corner;  
__Description__  
__Example__  
__See also__  
ISch\_Line interface