### <a id="ISch_Ellipse"></a>ISch\_Ellipse

__Overview__  
An ellipse is a drawing object which is filled or unfilled graphic elements on a schematic sheet\. Refer to the ISch\_Circle interface for details\.  
__Notes__  
The ISch\_Ellipse interface hierarchy is as follows:  
ISch\_GraphicalObject  
                ISch\_Circle  
                                ISch\_Ellipse

__ISch\_Ellipse methods__  
GetState\_SecondaryRadius  
SetState\_SecondaryRadius

__ISch\_Ellipse properties__  
SecondaryRadius

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

#### Properties

##### SecondaryRadius property

\(ISch\_Ellipse interface\)  
__Syntax__  
Property SecondaryRadius : TDistance Read GetState\_SecondaryRadius Write SetState\_SecondaryRadius;  
__Description__  
The secondary radius property defines the second set of arcs the define the elliptical arc\. The elliptical arc has two sets of arcs \(four all together\)\. The Radius property defines the first set of arcs that define the elliptical arc \(inherited from the ISch\_Arc interface\)\. This property is supported by the GetState\_SecondaryRadius and SetState\_SecondaryRadius methods\.  
__Example__

1

XRadius := Ellipse\.Radius;

2

YRadius := Ellipse\.SecondaryRadius;

__See also__  
TDistance type  
ISch\_Circle interface