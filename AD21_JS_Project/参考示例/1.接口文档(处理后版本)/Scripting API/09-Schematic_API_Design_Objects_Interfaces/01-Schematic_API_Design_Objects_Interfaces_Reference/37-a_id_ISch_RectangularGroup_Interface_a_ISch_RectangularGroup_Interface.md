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