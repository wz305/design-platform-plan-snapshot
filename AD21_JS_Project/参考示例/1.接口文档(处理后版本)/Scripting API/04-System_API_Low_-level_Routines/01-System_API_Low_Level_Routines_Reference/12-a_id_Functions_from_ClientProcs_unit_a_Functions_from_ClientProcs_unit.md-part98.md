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