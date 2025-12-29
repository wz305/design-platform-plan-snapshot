### <a id="ISch_Image_Interface"></a>ISch\_Image Interface

__Overview__  
The ISch\_Image interfaces are used to represent graphical images on a schematic document\.  
__Notes__  
The ISch\_Image interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Rectangle  
        ISch\_Image

__ISch\_Image methods__  
SetState\_FileName  
SetState\_EmbedImage  
SetState\_KeepAspect  
GetState\_FileName  
GetState\_EmbedImage  
GetState\_KeepAspect

__ISch\_Image properties__  
EmbedImage  
FileName  
KeepAspect

__See also__  
ISch\_GraphicalObject interface  
ISch\_Rectangle interface

#### Methods

##### SetState\_FileName method

\(ISch\_Image interface\)  
__Syntax__  
Procedure SetState\_FileName \(Const Value : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Image interface

##### SetState\_EmbedImage method

\(ISch\_Image interface\)  
__Syntax__  
Procedure SetState\_EmbedImage \(Const Value : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Image interface

##### GetState\_KeepAspect method

\(ISch\_Image interface\)  
__Syntax__  
Function GetState\_KeepAspect : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Image interface

##### GetState\_FileName method

\(ISch\_Image interface\)  
__Syntax__  
Function GetState\_FileName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Image interface

##### GetState\_EmbedImage method

\(ISch\_Image interface\)  
__Syntax__  
Function GetState\_EmbedImage : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Image interface

##### SetState\_KeepAspect method

\(ISch\_Image interface\)  
__Syntax__  
Procedure SetState\_KeepAspect \(Const Value : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Image interface

#### Properties

##### KeepAspect property

\(ISch\_Image interface\)  
__Syntax__  
Property KeepAspect : Boolean Read GetState\_KeepAspect Write SetState\_KeepAspect;  
__Description__  
__Example__  
__See also__  
ISch\_Image interface

##### FileName property

\(ISch\_Image interface\)  
__Syntax__  
Property FileName : WideString Read GetState\_FileName Write SetState\_FileName;  
__Description__  
__Example__  
__See also__  
ISch\_Image interface

##### EmbedImage property

\(ISch\_Image interface\)  
__Syntax__  
Property EmbedImage : Boolean Read GetState\_EmbedImage Write SetState\_EmbedImage;  
__Description__  
__Example__  
__See also__  
ISch\_Image interface