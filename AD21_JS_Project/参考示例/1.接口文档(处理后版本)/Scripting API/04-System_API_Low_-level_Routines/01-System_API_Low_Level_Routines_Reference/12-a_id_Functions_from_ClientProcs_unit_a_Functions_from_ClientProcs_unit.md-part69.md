#### Methods

##### GetState\_SecondaryRadius method

\(ISch\_EllipticalArc interface\)  
__Syntax__  
Function GetState\_SecondaryRadius : TDistance;  
__Description__  
This function retrieves the secondary radius or the Y coordinate of the elliptical arc with a TDistance value\.  
__Example__

1

XRadius := EllipticalArc\.Radius;

2

YRadius := EllipticalArc\.SecondaryRadius;

__See also__  
TDistance type  
ISch\_EllipticalArc interface

##### SetState\_SecondaryRadius method

\(ISch\_EllipticalArc interface\)  
__Syntax__  
Procedure SetState\_SecondaryRadius\(ARadius : TDistance\);  
__Description__  
This function sets the secondary radius or the Y coordinate of the elliptical arc with a TDistance value\.  
__Example__

1

EllipticalArc\.Radius          := 4000000

2

EllipticalArc\.SecondaryRadius := 7000000;

__See also__  
TDistance type  
ISch\_EllipticalArc interface