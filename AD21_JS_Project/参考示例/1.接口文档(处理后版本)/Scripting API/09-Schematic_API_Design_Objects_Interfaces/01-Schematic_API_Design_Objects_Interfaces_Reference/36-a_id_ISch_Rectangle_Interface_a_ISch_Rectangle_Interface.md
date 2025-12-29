### <a id="ISch_Rectangle_Interface"></a>ISch\_Rectangle Interface

__Overview__  
Rectangles are drawing objects which are unfilled or filled graphic elements\.  
__Notes__  
The ISch\_Rectangle interface hierarchy is as follows:  
ISch\_GraphicalObject interface  
    ISch\_Rectangle interface

__ISch\_Rectangle methods__  
SetState\_Corner  
SetState\_LineWidth  
SetState\_IsSolid  
SetState\_Transparent  
GetState\_Corner  
GetState\_LineWidth  
GetState\_IsSolid  
GetState\_Transparent

__ISch\_Rectangle properties__  
Corner  
LineWidth  
IsSolid  
Transparent

__See also__  
ISch\_GraphicalObject interface

#### Methods

##### SetState\_Transparent method

\(ISch\_Rectangle interface\)  
__Syntax__  
Procedure SetState\_Transparent\(B : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### SetState\_LineWidth method

\(ISch\_Rectangle interface\)  
__Syntax__  
Procedure SetState\_LineWidth \(ASize : TSize\);  
__Description__  
The SetState\_LineWidth procedure sets the line width for the border of the rectangle object\. The Line width is determined by the TSize type\.  
__Example__  
Rectangle\.SetState\_LineWidth\(eSmall\);  
__See also__  
TSize type\.  
ISch\_Rectangle interface

##### SetState\_IsSolid method

\(ISch\_Rectangle interface\)  
__Syntax__  
Procedure SetState\_IsSolid \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### SetState\_Corner method

\(ISch\_Rectangle interface\)  
__Syntax__  
Procedure SetState\_Corner \(ALocation : TLocation\);  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### GetState\_Transparent method

\(ISch\_Rectangle interface\)  
__Syntax__  
Function GetState\_Transparent : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### GetState\_LineWidth method

\(ISch\_Rectangle interface\)  
__Syntax__  
Function GetState\_LineWidth : TSize;  
__Description__  
The GetState\_LineWidth function returns the line width of the rectangle’s border\. The line width is determined by the TSize type\.  
__Example__  
Width := Rectangle\.GetState\_LineWidth;  
__See also__  
TSize type\.  
ISch\_Rectangle interface

##### GetState\_IsSolid method

\(ISch\_Rectangle interface\)  
__Syntax__  
Function GetState\_IsSolid : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

##### GetState\_Corner method

\(ISch\_Rectangle interface\)  
__Syntax__  
Function GetState\_Corner : TLocation;  
__Description__  
__Example__  
__See also__  
ISch\_Rectangle interface

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