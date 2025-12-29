#### Properties

##### LineStyle property

\(ISch\_BasicPolyline interface\)  
__Syntax__  
Property LineStyle : TLineStyle Read GetState\_LineStyle Write SetState\_LineStyle;  
__Description__  
__Example__  
__See also__  
ISch\_BasicPolyline interface

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