#### Properties

##### LineWidth property

\(ISch\_Rectangle interface\)  
__Syntax__  
Property LineWidth : TSize Read GetState\_LineWidth Write SetState\_LineWidth;  
__Description__  
The LineWidth property defines the border width of the rectangle with one of the following values from the TSize enumerated type\. This property is supported by the GetState\_LineWidth and SetState\_LineWidth methods\.  
__Example__  
Rect\.LineWidth := eSmall;  
__See also__  
TSize type\.  
ISch\_Rectangle interface

##### IsSolid property

\(ISch\_Rectangle interface\)  
__Syntax__  
Property IsSolid : Boolean Read GetState\_IsSolid Write SetState\_IsSolid;  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### Corner property

\(ISch\_Rectangle interface\)  
__Syntax__  
Property Corner : TLocation Read GetState\_Corner Write SetState\_Corner;  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### Transparent property

\(ISch\_Rectangle interface\)  
__Syntax__  
Property Transparent : Boolean Read GetState\_Transparent Write SetState\_Transparent;  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

### <a id="ISch_RectangularGroup_Interface"></a>ISch\_RectangularGroup Interface

__Overview__  
The ISch\_RectangularGroup interface represents a group rectangular object with the size of the object with XSize and YSize dimensions\. The Origin of the rectangular object is the Location property from the ISch\_GraphicalObject interface\. 

The ISch\_RectangularGroup interface is an ancestor interface for the ISch\_SheetSymbol, ISch\_HarnessConnector and IOpenBus\_Component interfaces\.  
__Notes__  
The interface hierarchy for the ISch\_RectangularGroup interface is as follows:  
ISch\_GraphicalObject  
    ISch\_ParametrizedGroup  
        ISch\_RectangularGroup

__ISch\_RectangularGroup methods__  
SetState\_XSize  
SetState\_YSize  
GetState\_XSize  
GetState\_YSize

__ISch\_RectangularGroup properties__  
XSize  
YSize

__See also__  
ISch\_GraphicalObject interface  
ISch\_ParametrizedGroup interface  
IOpenBus\_Component interface  
ISch\_HarnessConnector interface  
ISch\_SheetSymbol interface