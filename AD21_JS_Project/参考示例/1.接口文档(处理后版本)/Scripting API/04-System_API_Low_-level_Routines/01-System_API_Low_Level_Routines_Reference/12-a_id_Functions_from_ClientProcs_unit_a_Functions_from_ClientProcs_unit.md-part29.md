#### ISch\_FontManager2 Methods

##### GetFontHandle method

\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetFontHandle \(AnId: Integer; Const CurrentLogFont : TLogFont; ScreenSize : Integer\): THandle;  
__Description__  
This function retrieves the handle of the font\.  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### GetFontID method

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

##### GetFontSpec method

\(ISch\_FontManager2 interface\)  
__Syntax__  
Procedure GetFontSpec \(FontID : TFontID; Var Size,Rotation : Integer; Var Underline,Italic,Bold,StrikeOut : Boolean; Var FontName : WideString\);  
__Description__  
Every font used in the Schematic document has its own FontID\. You can invoke the GetFontSpec function to retrieve font specifications for the supplied Font ID\.  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### GetFontSize method

\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetFontSize \(FontID : TFontID\) : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### GetState\_Bold method

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

##### GetState\_DefaultHorizontalSysFontId method

\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_DefaultHorizontalSysFontId : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### GetState\_DefaultVerticalSysFontId method

\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_DefaultVerticalSysFontId : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### GetState\_FontCount method

\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_FontCount : Integer;  
__Description__  
The FontCount property returns the number of fonts used in the Altium Designer\. This property is supported by the GetState\_FontCount method\.  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### GetState\_FontName method

\(ISch\_FontManager interface\)  
__Syntax__  
Function GetState\_FontName \(AnId : Integer\) : TFontName;  
__Description__  
This indexed FontName property returns the name of an indexed font as a string\. Every computer could have a different table of fonts used\. The FontName property is supported by the GetState\_FontName method\.  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### GetState\_Italic method

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

##### GetState\_Rotation method

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

##### GetState\_SaveFlag method

\(ISch\_FontManager2 interface\)  
__Syntax__  
Function GetState\_SaveFlag \(AnId : Integer\) : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_FontManager2 interface

##### GetState\_Size method

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

##### GetState\_StrikeOut method

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

##### GetState\_UnderLine method

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

##### IsFontVertical method

\(ISch\_FontManager2 interface\)  
__Syntax__  
Function IsFontVertical\(FontID : TFontID\) : Boolean;  
__Description__  
This function determines whether the font is vertically orientated or not\.  
__Example__  
__See also__  
ISch\_FontManager2 interface