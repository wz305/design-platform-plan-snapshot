#### Methods

##### SetState\_Transparent method

\(ISch\_Rectangle interface\)  
__Syntax__  
Procedure SetState\_Transparent\(B : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### SetState\_LineWidth method

\(ISch\_Rectangle interface\)  
__Syntax__  
Procedure SetState\_LineWidth \(ASize : TSize\);  
__Description__  
The SetState\_LineWidth procedure sets the line width for the border of the rectangle object\. The Line width is determined by the TSize type\.  
__Example__  
Rectangle\.SetState\_LineWidth\(eSmall\);  
__See also__  
TSize type\.  
ISch\_Rectangle interface

##### SetState\_IsSolid method

\(ISch\_Rectangle interface\)  
__Syntax__  
Procedure SetState\_IsSolid \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### SetState\_Corner method

\(ISch\_Rectangle interface\)  
__Syntax__  
Procedure SetState\_Corner \(ALocation : TLocation\);  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### GetState\_Transparent method

\(ISch\_Rectangle interface\)  
__Syntax__  
Function GetState\_Transparent : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### GetState\_LineWidth method

\(ISch\_Rectangle interface\)  
__Syntax__  
Function GetState\_LineWidth : TSize;  
__Description__  
The GetState\_LineWidth function returns the line width of the rectangle’s border\. The line width is determined by the TSize type\.  
__Example__  
Width := Rectangle\.GetState\_LineWidth;  
__See also__  
TSize type\.  
ISch\_Rectangle interface

##### GetState\_IsSolid method

\(ISch\_Rectangle interface\)  
__Syntax__  
Function GetState\_IsSolid : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### GetState\_Corner method

\(ISch\_Rectangle interface\)  
__Syntax__  
Function GetState\_Corner : TLocation;  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface