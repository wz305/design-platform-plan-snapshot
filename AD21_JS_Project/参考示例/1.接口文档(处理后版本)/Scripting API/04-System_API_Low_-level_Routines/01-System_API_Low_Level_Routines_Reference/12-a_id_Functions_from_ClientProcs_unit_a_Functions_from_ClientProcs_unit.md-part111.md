#### Properties

##### YSize property

\(ISch\_RectangularGroup interface\)  
__Syntax__  
Property YSize : TCoord Read GetState\_YSize Write SetState\_YSize;  
__Description__  
__Example__

1

SheetSymbol\.SetState\_XSize\(MilsToCoord\(150\)\);

2

SheetSymbol\.SetState\_YSize\(MilsToCoord\(50\)\);

__See also__  
ISch\_RectangularGroup interface

##### XSize property

\(ISch\_RectangularGroup interface\)  
__Syntax__  
Property XSize : TCoord Read GetState\_XSize Write SetState\_XSize;  
__Description__  
The XSize property sets or gets the XSize dimension of the rectangular group object such as a sheet symbol\. The XSize and YSize values determines the size of the rectangular group object in the X and Y directions\.  
The Location property from the ISch\_GraphicalObject interface determines the origin of the rectangular group object\.  
__Example__

1

SheetSymbol\.XSize := MilsToCoord\(150\);

2

SheetSymbol\.YSize := MilsToCoord\(50\);

__See also__  
SetState\_XSize method  
SetState\_YSize method  
ISch\_RectangularGroup interface

### <a id="ISch_RoundRectangle_Interface"></a>ISch\_RoundRectangle Interface

__Overview__  
Rounded rectangles are drawing objects which are unfilled or filled graphic elements\.  
__Notes__  
The ISch\_RoundRectangle interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Rectangle  
        ISch\_RoundRectangle

__ISch\_RoundRectangle methods__  
SetState\_CornerXRadius  
SetState\_CornerYRadius  
GetState\_CornerXRadius  
GetState\_CornerYRadius

__ISch\_RoundRectangle properties__  
CornerXRadius  
CornerYRadius