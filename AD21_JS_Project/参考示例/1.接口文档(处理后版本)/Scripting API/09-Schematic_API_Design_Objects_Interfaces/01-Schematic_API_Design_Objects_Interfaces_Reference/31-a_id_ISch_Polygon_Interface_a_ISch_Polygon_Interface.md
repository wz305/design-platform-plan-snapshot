### <a id="ISch_Polygon_Interface"></a>ISch\_Polygon Interface

__Overview__  
Polygons are multi\-sided graphical elements\.  The vertices of a polygon object denote the link of lines to describe its outline\.

The ISch\_Polygon interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Polygon interface

__ISch\_Polygon methods__  
SetState\_LineWidth  
SetState\_IsSolid  
SetState\_Vertex  
SetState\_VerticesCount  
SetState\_Transparent  
GetState\_LineWidth  
GetState\_IsSolid  
GetState\_Vertex  
GetState\_VerticesCount  
GetState\_Transparent  
InsertVertex  
RemoveVertex  
ClearAllVertices

__ISch\_Polygon properties__  
IsSolid  
LineWidth  
Vertex  
VerticesCount  
Transparent

__See also__  
ISch\_GraphicalObject interface  
ISch\_Polyline interface  
ISch\_Wire interface  
ISch\_Bus interface  
TLocation values  
TSize enumerated values

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

#### Properties

##### VerticesCount property

\(ISch\_Polygon interface\)  
__Syntax__  
Property VerticesCount : Integer Read GetState\_VerticesCount Write Setstate\_VerticesCount;  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### Transparent property

\(ISch\_Polygon interface\)  
__Syntax__  
Property Transparent : Boolean Read GetState\_Transparent Write SetState\_Transparent;  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### LineWidth property

\(ISch\_Polygon interface\)  
__Syntax__  
Property LineWidth : TSize Read GetState\_LineWidth Write SetState\_LineWidth;  
__Description__  
The LineWidth property defines the border width of the polygon with one of the following values from the TSize enumerated type\. This property is supported by the GetState\_LineWidth and SetState\_LineWidth methods\.  
__Example__  
Polygon\.LineWIdth := eSmall;  
__See also__  
TSize type  
ISch\_Polygon interface

##### IsSolid property

\(ISch\_Polygon interface\)  
__Syntax__  
Property IsSolid : Boolean Read GetState\_IsSolid Write SetState\_IsSolid;  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface

##### Vertex property

\(ISch\_Polygon interface\)  
__Syntax__  
Property Vertex\[i : Integer\] : TLocation Read GetState\_Vertex Write SetState\_Vertex;  
__Description__  
__Example__  
__See also__  
ISch\_Polygon interface  
TLocation type

#### ISch\_BasicPolyline Interface

__Overview__  
Lines are graphical drawing objects with any number of joined segments\.  
__Notes__  
The ISch\_BasicPolyline interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Polygon  
        ISch\_BasicPolyline  
            ISch\_Polyline

__ISch\_BasicPolyline methods__  
SetState\_LineStyle  
GetState\_LineStyle

__ISch\_BasicPolyline properties__  
LineStyle

__See also__  
ISch\_GraphicalObject interface  
ISch\_Polygon interface  
ISch\_Polyline interface

#### Methods

##### GetState\_LineStyle method

\(ISch\_BasicPolyline interface\)  
__Syntax__  
Function GetState\_LineStyle : TLineStyle;  
__Description__  
__Example__  
__See also__  
ISch\_BasicPolyline interface

##### SetState\_LineStyle method

\(ISch\_BasicPolyline interface\)  
__Syntax__  
Procedure SetState\_LineStyle\(AValue : TLineStyle\);  
__Description__  
__Example__  
__See also__  
ISch\_BasicPolyline interface

#### Properties

##### LineStyle property

\(ISch\_BasicPolyline interface\)  
__Syntax__  
Property LineStyle : TLineStyle Read GetState\_LineStyle Write SetState\_LineStyle;  
__Description__  
__Example__  
__See also__  
ISch\_BasicPolyline interface