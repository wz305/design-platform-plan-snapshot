#### ISch\_FontManager Interface

__Overview__  
The ISch\_FontManager interface represents the internal font manager in Schematic Editor that manages fonts for text based objects on schematic documents\.

To have access to the ISch\_FontManager interface, you need to invoke the SchServer function;  
FontManager := SchServer\.FontManager;

__ISch\_FontManager methods__  
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

__ISch\_FontManager properties__  
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