### <a id="ISch_FontManager2_Interface"></a>ISch\_FontManager2 Interface

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