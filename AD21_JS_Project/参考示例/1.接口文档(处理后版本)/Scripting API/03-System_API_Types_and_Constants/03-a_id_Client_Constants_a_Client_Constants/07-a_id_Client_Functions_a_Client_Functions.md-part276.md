#### Methods

##### GetState\_SecondaryRadius method

\(ISch\_Ellipse interface\)  
__Syntax__  
Function GetState\_SecondaryRadius : TDistance;  
__Description__  
This function retrieves the secondary radius or the Y coordinate of the elliptical arc with a TDistance value\.  
__Example__

1

XRadius := Ellipse\.Radius;

2

YRadius := Ellipse\.SecondaryRadius;

__See also__  
TDistance type  
ISch\_Circle interface

##### SetState\_SecondaryRadius method

\(ISch\_Ellipse interface\)  
__Syntax__  
Procedure SetState\_SecondaryRadius\(ARadius : TDistance\);  
__Description__  
This function sets the secondary radius or the Y coordinate of the ellipse with a TDistance value\.  
__Example__

1

Ellipse\.Radius          := 4000000

2

Ellipse\.SecondaryRadius := 7000000;

__See also__  
ISch\_EllipticalArc interface