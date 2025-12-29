### <a id="TColor"></a>TColor

__Syntax__  
TColor  = Graphics\.TColor;  
__Notes__  
The __TColor__ value specifies a 6 digit hexadecimal number of the $FFFFFF format\.  For example the color blue would be RGB:0,0,255 and Hex:FF0000 therefore the converted decimal value would be 16711680\.  The following formula may be used to calculate the required value, R\+256\*\(G\+\(256\*B\)\)\. 

This TColor value is defined from the Graphics Unit of the Borland Delphi's VCL library\.

__Example__s  
Color=0 is black, Color=255 is red, Color=65280 is green   Color=16711680 is blue   Color=16777215 is white\. Decimal or hexadecimal values can be assigned\.  
__See also__  
ISch\_Preferences  
IComponentPainterView  
ISch\_GraphicalObject  
ISch\_TextFrame  
ISch\_SheetEntry  
ISch\_HarnessEntry  
ISch\_Component