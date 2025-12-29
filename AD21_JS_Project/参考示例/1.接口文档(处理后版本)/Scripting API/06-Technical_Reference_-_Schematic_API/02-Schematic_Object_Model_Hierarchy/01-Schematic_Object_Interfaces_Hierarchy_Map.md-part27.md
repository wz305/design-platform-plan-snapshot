#### ISch\_FontManager2 Properties

##### Bold property

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

##### DefaultHorizontalSysFontId property

\(ISch\_FontManager2 interface\)  
__Syntax__  
Property DefaultHorizontalSysFontId : Integer Read GetState\_DefaultHorizontalSysFontId;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### DefaultVerticalSysFontId property

\(ISch\_FontManager2 interface\)  
__Syntax__  
Property DefaultVerticalSysFontId : Integer Read GetState\_DefaultVerticalSysFontId;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### FontCount property

\(ISch\_FontManager2 interface\)  
__Syntax__  
Property FontCount : Integer Read GetState\_FontCount;  
__Description__  
The FontCount property returns the number of fonts used in the computer system that the Altium Designer is currently residing on\. This property is supported by the GetState\_FontCount method\.  
__Example__  
__See also__  
ISch\_FontManager interface

##### FontName property

\(ISch\_FontManager2 interface\)  
__Syntax__  
Property FontName \[Id : Integer\] : TFontName Read GetState\_FontName ;  
__Description__  
This indexed FontName property returns the name of an indexed font as a string\. Every computer could have a different table of fonts used\. The FontName property is supported by the GetState\_FontName method\.  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### Italic property

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

##### Rotation property

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

##### SaveFlag property

\(ISch\_FontManager2 interface\)  
__Syntax__  
Property SaveFlag \[Id : Integer\] : Boolean Read GetState\_SaveFlag ;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### Size property

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

##### StrikeOut property

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

##### UnderLine property

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

### <a id="ISch_JunctionConvertSettings_Interface"></a>ISch\_JunctionConvertSettings Interface

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