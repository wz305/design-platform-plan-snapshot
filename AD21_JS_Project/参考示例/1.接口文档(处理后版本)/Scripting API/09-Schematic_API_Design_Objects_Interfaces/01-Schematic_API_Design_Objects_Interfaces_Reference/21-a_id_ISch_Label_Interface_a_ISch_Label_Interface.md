### <a id="ISch_Label_Interface"></a>ISch\_Label Interface

__Overview__  
The ISch\_Label interface represents an existing label object on a schematic document\. This interface is the ancestor interface for the ISch\_NetLabel interfaces\.  
__Notes__  
The interface hierarchy for the ISch\_Label interface is as follows:  
ISch\_GraphicalObject  
    ISch\_Label

__ISch\_Label methods__  
SetState\_FontId  
SetState\_Orientation  
SetState\_Justification  
SetState\_OverrideDisplayString  
SetState\_IsMirrored  
GetState\_FontId  
GetState\_Orientation  
GetState\_Justification  
GetState\_DisplayString  
GetState\_Formula  
GetState\_CalculatedValueString  
GetState\_OverrideDisplayString  
GetState\_IsMirrored

__ISch\_Label properties__  
FontId  
Orientation  
Justification  
Text  
OverrideDisplayString  
DisplayString  
Formula  
CalculatedValueString  
IsMirrored

__See also__  
ISch\_GraphicalObject interface

#### Methods

##### SetState\_OverrideDisplayString method

\(ISch\_Label interface\)  
__Syntax__  
Procedure SetState\_OverrideDisplayString\(S : WideString \);  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### SetState\_Orientation method

\(ISch\_Label interface\)  
__Syntax__  
Procedure SetState\_Orientation \(ARotation : TRotationBy90\);  
__Description__  
This Orientation property determines the angle the ISch\_Label is at on the Schematic document\. The angle is in 90 degree increments \- 0, 90, 180, 270\. This property is supported by the GetState\_Orientation and SetState\_Orientation methods\.  
__Example__  
SchLabel\.Orientation := eRotate90;  
__Example__  
__See also__  
ISch\_Label interface

##### SetState\_Justification method

\(ISch\_Label interface\)  
__Syntax__  
Procedure SetState\_Justification \(AValue : TTextJustification\);  
__Description__  
The Justification property determines the alignment of the text in respect to the Label object whether it is left justified, centered and so on\. This property is supported by the GetState\_Justification and SetState\_Justification methods\.  
__Example__  
__See also__  
ISch\_Label interface

##### SetState\_IsMirrored method

\(ISch\_Label interface\)  
__Syntax__  
Procedure SetState\_IsMirrored \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### SetState\_FontId method

\(ISch\_Label interface\)  
__Syntax__  
Procedure SetState\_FontId \(AFontId : TFontID\);  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### GetState\_OverrideDisplayString method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_OverrideDisplayString : WideString;  
__Description__  
The GetState\_OverrrideDisplayString function returns the override display string which overrides the Name string\.  
__Example__  
DisplayString := Label\.GetState\_OverrideDisplayString;  
__See also__  
ISch\_Label interface

##### GetState\_Orientation method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_Orientation : TRotationBy90;  
__Description__  
This Orientation property determines the angle the ISch\_Label is at on the Schematic document\. The angle is in 90 degree increments \- 0, 90, 180, 270\. This property is supported by the GetState\_Orientation and SetState\_Orientation methods\.  
__Example__  
SchLabel\.Orientation := eRotate90;  
__See also__  
ISch\_Label interface

##### GetState\_Justification method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_Justification : TTextJustification;  
__Description__  
The Justification property determines the alignment of the text in respect to the Label object whether it is left justified, centered and so on\. This property is supported by the GetState\_Justification and SetState\_Justification methods\.  
__Example__  
Justification := Label\.GetState\_Justification;  
__See also__  
ISch\_Label interface

##### GetState\_IsMirrored method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_IsMirrored : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### GetState\_Formula method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_Formula : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### GetState\_FontId method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_FontId : TFontID;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### GetState\_DisplayString method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_DisplayString : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### GetState\_CalculatedValueString method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_CalculatedValueString : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

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