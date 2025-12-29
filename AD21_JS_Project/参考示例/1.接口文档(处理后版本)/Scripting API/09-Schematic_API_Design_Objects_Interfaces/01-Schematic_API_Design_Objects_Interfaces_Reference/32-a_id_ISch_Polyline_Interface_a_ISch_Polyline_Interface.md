### <a id="ISch_Polyline_Interface"></a>ISch\_Polyline Interface

__Overview__  
Lines are graphical drawing objects with any number of joined segments\.  
__Notes__  
The ISch\_Polyline interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Polygon  
        ISch\_BasicPolyline  
            ISch\_Polyline

__ISch\_Polyline methods__  
GetState\_StartLineShape  
SetState\_StartLineShape  
GetState\_EndLineShape   
SetState\_EndLineShape   
GetState\_LineShapeSize  
SetState\_LineShapeSize

__ISch\_Polyline properties__  
StartLineShape  
EndLineShape   
LineShapeSize

__See also__  
ISch\_GraphicalObject interface  
ISch\_Polygon interface  
ISch\_BasicPolyline interface

#### Methods

##### GetState\_StartLineShape method

\(ISch\_Polyline interface\)  
__Syntax__  
Function  GetState\_StartLineShape        : TLineShape;  
__Description__  
__Example__  
__See also__  
ISch\_Polyline interface

##### GetState\_EndLineShape method

\(ISch\_Polyline interface\)  
__Syntax__  
Function  GetState\_EndLineShape          : TLineShape;  
__Description__  
__Example__  
__See also__  
ISch\_Polyline interface

##### GetState\_LineShapeSize method

\(ISch\_Polyline interface\)  
__Syntax__  
Function  GetState\_LineShapeSize         : TSize;  
__Description__  
__Example__  
__See also__  
ISch\_Polyline interface

##### SetState\_StartLineShape method

\(ISch\_Polyline interface\)  
__Syntax__  
Procedure SetState\_StartLineShape\(AValue : TLineShape\);  
__Description__  
__Example__  
__See also__  
ISch\_Polyline interface

##### SetState\_EndLineShape method

\(ISch\_Polyline interface\)  
__Syntax__  
Procedure SetState\_EndLineShape  \(AValue : TLineShape\);  
__Description__  
__Example__  
__See also__  
ISch\_Polyline interface

##### SetState\_LineShapeSize method

\(ISch\_Polyline interface\)  
__Syntax__  
Procedure SetState\_LineShapeSize \(AValue : TSize\);  
__Description__  
__Example__  
__See also__  
ISch\_Polyline interface

#### Properties

##### LineStyle property

\(ISch\_Polyline interface\)  
__Syntax__  
Property LineStyle : TLineStyle Read GetState\_LineStyle Write SetState\_LineStyle;  
__Description__  
__Example__  
__See also__  
ISch\_Polyline interface