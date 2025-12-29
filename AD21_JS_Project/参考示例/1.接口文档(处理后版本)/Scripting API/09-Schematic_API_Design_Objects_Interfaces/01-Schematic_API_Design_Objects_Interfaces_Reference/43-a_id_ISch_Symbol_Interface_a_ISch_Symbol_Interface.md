### <a id="ISch_Symbol_Interface"></a>ISch\_Symbol Interface

__Overview__  
The symbol objects are special markers used for components in the Schematic Library\.  
__Notes__  
Descended from ISch\_GraphicalObject

__ISch\_Symbol methods__  
SetState\_Orientation  
SetState\_Symbol  
SetState\_IsMirrored  
SetState\_LineWidth  
SetState\_ScaleFactor  
GetState\_Orientation  
GetState\_Symbol  
GetState\_IsMirrored  
GetState\_LineWidth  
GetState\_ScaleFactor

__ISch\_Symbol properties__  
Orientation  
Symbol  
IsMirrored  
LineWidth  
ScaleFactor

__See also__  
ISch\_GraphicalObject interface

#### Methods

##### SetState\_Symbol method

\(ISch\_Symbol interface\)  
__Syntax__  
Procedure SetState\_Symbol \(AValue : TIeeeSymbol\);  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### SetState\_ScaleFactor method

\(ISch\_Symbol interface\)  
__Syntax__  
Procedure SetState\_ScaleFactor\(AValue : TCoord\);  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### SetState\_Orientation method

\(ISch\_Symbol interface\)  
__Syntax__  
Procedure SetState\_Orientation\(AValue : TRotationBy90\);  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### SetState\_LineWidth method

\(ISch\_Symbol interface\)  
__Syntax__  
Procedure SetState\_LineWidth \(AValue : TSize\);  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### SetState\_IsMirrored method

\(ISch\_Symbol interface\)  
__Syntax__  
Procedure SetState\_IsMirrored \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### GetState\_Symbol method

\(ISch\_Symbol interface\)  
__Syntax__  
Function GetState\_Symbol : TIeeeSymbol;  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### GetState\_ScaleFactor method

\(ISch\_Symbol interface\)  
__Syntax__  
Function GetState\_ScaleFactor : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### GetState\_Orientation method

\(ISch\_Symbol interface\)  
__Syntax__  
Function GetState\_Orientation : TRotationBy90;  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### GetState\_LineWidth method

\(ISch\_Symbol interface\)  
__Syntax__  
Function GetState\_LineWidth : TSize;  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

##### GetState\_IsMirrored method

\(ISch\_Symbol interface\)  
__Syntax__  
Function GetState\_IsMirrored : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Symbol interface

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