#### Methods

##### SetState\_LineWidth method

\(ISch\_Polygon interface\)  
__Syntax__  
Procedure SetState\_LineWidth \(AValue : TSize\);  
__Description__  
This SetState\_LineWidth procedure sets the width of the border line around the polygon\. The width is determined by the TSize type\.  
__Example__  
Polygon\.SetState\_LineWidth\(eSmall\);  
__See also__  
__TSize type\.__  
ISch\_Polygon interface

##### SetState\_VerticesCount method

\(ISch\_Polygon interface\)  
__Syntax__  
Procedure SetState\_VerticesCount\(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### SetState\_Vertex method

\(ISch\_Polygon interface\)  
__Syntax__  
Procedure SetState\_Vertex \(i : Integer; ALocation : TLocation\);  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### SetState\_Transparent method

\(ISch\_Polygon interface\)  
__Syntax__  
Procedure SetState\_Transparent \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### SetState\_IsSolid method

\(ISch\_Polygon interface\)  
__Syntax__  
Procedure SetState\_IsSolid \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### GetState\_VerticesCount method

\(ISch\_Polygon interface\)  
__Syntax__  
Function GetState\_VerticesCount : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### GetState\_Vertex method

\(ISch\_Polygon interface\)  
__Syntax__  
Function GetState\_Vertex\(i : Integer\) : TLocation;  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### GetState\_Transparent method

\(ISch\_Polygon interface\)  
__Syntax__  
Function GetState\_Transparent : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### GetState\_LineWidth method

\(ISch\_Polygon interface\)  
__Syntax__  
Function GetState\_LineWidth : TSize;  
__Description__  
This GetState\_LineWidth procedure gets the width of the border line around the line\. The width is determined by the TSize type\.  
__Example__  
LineWidth := Polygon\.GetState\_LineWidth;  
__See also__  
ISch\_Polygon interface

##### GetState\_IsSolid method

\(ISch\_Polygon interface\)  
__Syntax__  
Function GetState\_IsSolid : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### RemoveVertex method

\(ISch\_Polygon interface\)  
__Syntax__  
Function RemoveVertex \(Var Index : Integer\) : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### InsertVertex method

\(ISch\_Polygon interface\)  
__Syntax__  
Function InsertVertex \( Index : Integer\) : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### ClearAllVertices method

\(ISch\_Polygon interface\)  
__Syntax__  
Procedure ClearAllVertices;  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface