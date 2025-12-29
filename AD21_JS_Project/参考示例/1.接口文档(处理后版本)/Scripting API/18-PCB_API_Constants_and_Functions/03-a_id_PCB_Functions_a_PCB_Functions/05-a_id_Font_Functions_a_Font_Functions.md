### <a id="Font_Functions"></a>Font Functions

Procedure EnumFontsW                   \(DC                : HDC;  
                                        Const AFontName   : TPCBString;  
                                        Items             : TWideStrings\);  
Procedure EnumFontsA                   \(DC                : HDC;  
                                        Const AFontName   : TPCBString;  
                                        Items             : TStrings\);  
Function  LoadFontNamesW               \(Items             : TWideStrings\)   : Integer;  
Function  LoadFontNamesA               \(Items             : TStrings\)       : Integer;  
Function  GetLocalizedFontName         \(Const FontName    : TPCBString\)     : TPCBString;