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

### <a id="ISch_ErrorMarker_Interface"></a>ISch\_ErrorMarker Interface

__Overview__  
Error Markers are placed on a schematic sheet at the site of each ERC violation by the Schematic Editor\. Refer to the ISch\_Directive and ISch\_GraphicalObject interfaces for details\.  
__Notes__  
The ISch\_ErrorMarker interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Directive  
        ISch\_ErrorMarker  
__See also__  
ISch\_GraphicalObject interface  
ISch\_Directive interface

### <a id="ISch_HarnessConnector_Interface"></a>ISch\_HarnessConnector Interface

__Overview__  
The ISch\_HarnessConnector interface is used to represent a harness connector design obejct which is a member of the harness system\.  
__Notes__  
The ISch\_HarnessEntry interface hierarchy is as follows:  
ISch\_GraphicalObject  
                ISch\_RectangularGroup  
                    ISch\_HarnessConnector

__ISch\_HarnessConnector Methods__  
SetState\_LineWidth  
GetState\_LineWidth  
GetState\_SchHarnessConnectorType  
GetState\_MasterEntryLocation

__ISch\_HarnessConnector Properties__  
LineWidth  
HarnessConnectorType  
MasterEntryLocation