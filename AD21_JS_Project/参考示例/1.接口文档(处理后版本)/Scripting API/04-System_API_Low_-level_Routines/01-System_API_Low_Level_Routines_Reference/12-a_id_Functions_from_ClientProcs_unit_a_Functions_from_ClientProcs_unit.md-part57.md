#### Properties

##### Collapsed property

\(ISch\_CompileMask interface\)  
__Syntax__  
Property Collapsed : Boolean Read GetState\_Collapsed Write SetState\_Collapsed;  
__Description__  
When the property is false, the compile mask is collapsed and disabled\. When this property is true, the compile mask is fully expanded and enabled meaning the portion of the schematic covered by the Compile Mask object is not affected by the Compiler\.  
This property is supported by the GetState\_Collapsed and SetState\_Collapsed methods\.  
__Example__  
__See also__  
ISch\_CompileMask interface

### <a id="ISch_ComplexText_Interface"></a>ISch\_ComplexText Interface

__Overview__  
An immediate ancestor interface for ISch\_SheetFilename and ISch\_SheetName interfaces\.

The ISch\_ComplexText interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Label  
        ISch\_ComplexText

__ISch\_ComplexText methods__  
SetState\_Autoposition  
SetState\_IsHidden  
SetState\_TextHorzAnchor  
SetState\_TextVertAnchor  
GetState\_Autoposition  
GetState\_IsHidden  
GetState\_TextHorzAnchor  
GetState\_TextVertAnchor

__ISch\_ComplexText properties__  
Autoposition  
IsHidden  
TextHorzAnchor  
TextVertAnchor

__See also__