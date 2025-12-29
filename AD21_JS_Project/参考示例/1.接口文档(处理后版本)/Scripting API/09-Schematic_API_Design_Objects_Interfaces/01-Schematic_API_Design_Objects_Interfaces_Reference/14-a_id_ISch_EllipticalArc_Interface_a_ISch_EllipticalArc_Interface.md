### <a id="ISch_EllipticalArc_Interface"></a>ISch\_EllipticalArc Interface

__Overview__  
Elliptical arc objects are drawing objects which represent open circular or elliptical curves on a schematic sheet\. Refer to the ISch\_Arc interface for extra details\.  
__Notes__  
The ISch\_EllipticalArc interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Arc  
        ISch\_EllipticalArc

__ISch\_EllipticalArc methods__  
GetState\_SecondaryRadius  
SetState\_SecondaryRadius

__ISch\_EllipticalArc properties__  
SecondaryRadius

__See also__  
ISch\_GraphicalObject interface  
ISch\_Arc interface

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

#### Properties

##### SecondaryRadius property

\(ISch\_EllipticalArc interface\)  
__Syntax__  
Property SecondaryRadius : TDistance Read GetState\_SecondaryRadius Write SetState\_SecondaryRadius;  
__Description__  
The secondary radius property defines the second set of arcs the define the elliptical arc\. The elliptical arc has two sets of arcs \(four all together\)\. The Radius property defines the first set of arcs that define the elliptical arc \(inherited from the ISch\_Arc interface\)\. This property is supported by the GetState\_SecondaryRadius and SetState\_SecondaryRadius methods\.  
__Example__

1

XRadius := EllipticalArc\.Radius;

2

YRadius := EllipticalArc\.SecondaryRadius;

__See also__  
TDistance type  
ISch\_Arc interface  
ISch\_EllipticalArc interface