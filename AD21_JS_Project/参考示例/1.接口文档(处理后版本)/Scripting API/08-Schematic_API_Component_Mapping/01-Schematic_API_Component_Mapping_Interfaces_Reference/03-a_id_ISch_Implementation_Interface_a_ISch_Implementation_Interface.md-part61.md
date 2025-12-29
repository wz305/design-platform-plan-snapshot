#### Methods

##### SetState\_YSize method

\(ISch\_RectangularGroup interface\)  
__Syntax__  
Procedure SetState\_YSize\(Value : TCoord\);  
__Description__  
This function sets the YSize dimension of the rectangular group object such as the sheet symbol\.  
__Example__

1

SheetSymbol\.SetState\_XSize\(MilsToCoord\(150\)\);

2

SheetSymbol\.SetState\_YSize\(MilsToCoord\(50\)\);

__See also__  
SetState\_XSize method  
ISch\_RectangularGroup interface

##### SetState\_XSize method

\(ISch\_RectangularGroup interface\)  
__Syntax__  
Procedure SetState\_XSize\(Value : TCoord\);  
__Description__  
This function sets the XSize dimension of the rectangular group object such as the sheet symbol\.  
__Example__

1

SheetSymbol\.SetState\_XSize\(MilsToCoord\(150\)\);

2

SheetSymbol\.SetState\_YSize\(MilsToCoord\(50\)\);

__See also__  
GetState\_YSize method  
ISch\_RectangularGroup interface

##### GetState\_YSize method

\(ISch\_RectangularGroup interface\)  
__Syntax__  
Function GetState\_YSize : TCoord;  
__Description__  
This function retrieves the YSize dimension of the rectangular group object such as the sheet symbol\. THis function is used by the YSize property\.  
__Example__

1

AXSize := SheetSymbol\.SetState\_XSize;

2

AYSize := SheetSymbol\.SetState\_YSize;

__See also__  
GetState\_YSize method  
ISch\_RectangularGroup interface

##### GetState\_XSize method

\(ISch\_RectangularGroup interface\)  
__Syntax__  
Function GetState\_XSize : TCoord;  
__Description__  
This function retrieves the XSize dimension of the rectangular group object such as the sheet symbol\. THis function is used by the XSize property\.  
__Example__

1

AXSize := SheetSymbol\.SetState\_XSize;

2

AYSize := SheetSymbol\.SetState\_YSize;

__See also__  
ISch\_RectangularGroup interface