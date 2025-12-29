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