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

### <a id="ISch_Junction_Interface"></a>ISch\_Junction Interface

__Overview__  
Junctions are small circular objects used to logically join intersecting wires on the schematic sheet\. The ISch\_Junction interfaces represent manually placed junctions NOT system generated junctions\. You will use the IConnection interfaces to work with system generated junctions\.  
__Notes__  
The ISch\_Junction interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Junction  
__ISch\_Junction Methods and Properties Table__

__ISch\_Junction methods__  
SetState\_Size  
SetState\_Locked  
GetState\_Size  
GetState\_Locked

__ISch\_Junction properties__  
Size  
Locked

__See also__  
ISch\_GraphicalObject interface