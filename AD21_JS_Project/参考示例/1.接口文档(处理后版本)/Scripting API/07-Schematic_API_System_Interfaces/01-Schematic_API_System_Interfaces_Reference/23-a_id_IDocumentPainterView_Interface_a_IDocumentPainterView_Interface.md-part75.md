#### Properties

##### Symbol property

\(ISch\_Symbol interface\)  
__Syntax__  
Property Symbol : TIeeeSymbol Read GetState\_Symbol Write SetState\_Symbol ;  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### ScaleFactor property

\(ISch\_Symbol interface\)  
__Syntax__  
Property ScaleFactor : TCoord Read GetState\_ScaleFactor Write SetState\_ScaleFactor;  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### Orientation property

\(ISch\_Symbol interface\)  
__Syntax__  
Property Orientation : TRotationBy90 Read GetState\_Orientation Write SetState\_Orientation;  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### LineWidth property

\(ISch\_Symbol interface\)  
__Syntax__  
Property LineWidth : TSize Read GetState\_LineWidth Write SetState\_LineWidth ;  
__Description__  
The __LineWidth__ property defines the border width of the circle with one of the following values from the __TSize__ enumerated type\. This property is supported by the __GetState\_LineWidth__ and __SetState\_LineWidth__ methods\.  
__Example__  
__See also__  
ISch\_Symbol interface  
TSize type

##### IsMirrored property

\(ISch\_Symbol interface\)  
__Syntax__  
Property IsMirrored : Boolean Read GetState\_IsMirrored Write SetState\_IsMirrored ;  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

### <a id="ISch_Template_Interface"></a>ISch\_Template Interface

__Overview__  
The schematic templates represent the sheet border, title block and graphics for a schematic document\.  
__Notes__  
The __ISch\_Template__ interface hierarchy is as follows:  
ISch\_GraphicalObject  
ISch\_Template

__ISch\_Template methods__  
SetState\_FileName  
GetState\_FileName

__ISch\_Template properties__  
FileName

__See also__  
ISch\_GraphicalObject interface