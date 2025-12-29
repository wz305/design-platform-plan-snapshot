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