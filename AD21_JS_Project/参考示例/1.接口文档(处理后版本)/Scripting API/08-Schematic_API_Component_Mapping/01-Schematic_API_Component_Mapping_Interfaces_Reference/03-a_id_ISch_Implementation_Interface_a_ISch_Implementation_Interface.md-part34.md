#### Properties

##### Text property

\(ISch\_Label interface\)  
__Syntax__  
Property Text : WideString Read GetState\_Text Write SetState\_Text;  
__Description__  
The Text property of the ISch\_Label represents the actual text string\. This property is supported by the GetState\_Text and SetState\_Text methods\.  
__Example__

1

Location\.X := MilsToCoord\(1000\);

2

Location\.Y := MilsToCoord\(1000\);

3

SchLabel\.SetState\_Location\(Location\);

4

SchLabel\.Color       := 12345;

5

Schlabel\.Text        := 'A new name';

6

SchLabel\.FontID      := SchServer\.FontManager\.GetFontID\(14,90,False,False,False,False,'Times New Roman'\);

__See also__  
ISch\_Label interface

##### OverrideDisplayString property

\(ISch\_Label interface\)  
__Syntax__  
Property OverrideDisplayString : WideString Read GetState\_OverrideDisplayString Write SetState\_OverrideDisplayString;  
__Description__  
The OverrrideDisplayString property determines the override display string which overrides the Name string\. This property is supported by the GetState\_OverrideDisplayString and SetState\_OverrideDisplayString methods\.  
__Example__  
DisplayString := SheetEntry\.GetState\_OverrideDisplayString;  
__See also__  
ISch\_Label interface

##### Orientation property

\(ISch\_Label interface\)  
__Syntax__  
Property Orientation : TRotationBy90 Read GetState\_Orientation Write SetState\_Orientation;  
__Description__  
This Orientation property determines the angle the ISch\_Label is at on the Schematic document\. The angle is in 90 degree increments \- 0, 90, 180, 270\. This property is supported by the GetState\_Orientation and SetState\_Orientation methods\.  
However if you are using the FontID property to be assigned by the FontManager \(ISch\_FontManger interface\) then you will need to set the Orientation property as well as passing in the same rotation parameter for the GetFontID method of the ISch\_FontManager interface\.  
__Example__

1

ALabel\.Orientation := eRotate90;

2

ALabel\.FontId      := SchServer\.FontManager\.GetFontID\(14,90,False,False,False,False,'Times New Roman'\);

__See also__  
ISch\_Label interface

##### Justification property

\(ISch\_Label interface\)  
__Syntax__  
Property Justification : TTextJustification Read GetState\_Justification Write SetState\_Justification;  
__Description__  
The Justification property determines the alignment of the text in respect to the Label object whether it is left justified, centered and so on\. This property is supported by the GetState\_Justification and SetState\_Justification methods\.  
__Example__  
__See also__  
ISch\_Label interface  
TTextJustification type

##### IsMirrored property

\(ISch\_Label interface\)  
__Syntax__  
Property IsMirrored : Boolean Read GetState\_IsMirrored Write SetState\_IsMirrored;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### Formula property

\(ISch\_Label interface\)  
__Syntax__  
Property Formula : WideString Read GetState\_Formula;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### FontId property

\(ISch\_Label interface\)  
__Syntax__  
Property FontId : TFontID Read GetState\_FontId Write SetState\_FontId;  
__Description__  
The FontID property determines the style and type of font for the ISch\_Label object on a Schematic document\. This property is supported by the GetState\_FontID and SetState\_FontID methods\.  
__Example__

1

Location\.X := MilsToCoord\(1000\);

2

Location\.Y := MilsToCoord\(1000\);

3

SchLabel\.SetState\_Location\(Location\);

4

SchLabel\.Color       := 12345;

5

Schlabel\.Text        := 'A new name';

6

SchLabel\.FontID      := SchServer\.FontManager\.GetFontID\(14,90,False,False,False,False,'Times New Roman'\);

__See also__  
ISch\_Label interface  
ISch\_FontManager interface

##### DisplayString property

\(ISch\_Label interface\)  
__Syntax__  
Property DisplayString : WideString Read GetState\_DisplayString;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### CalculatedValueString property

\(ISch\_Label interface\)  
__Syntax__  
Property CalculatedValueString : WideString Read GetState\_CalculatedValueString;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

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