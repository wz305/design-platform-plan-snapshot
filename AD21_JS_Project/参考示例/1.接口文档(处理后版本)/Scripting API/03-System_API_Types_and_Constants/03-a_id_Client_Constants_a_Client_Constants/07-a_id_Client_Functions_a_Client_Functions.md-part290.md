#### Properties

##### Size property

\(ISch\_Junction interface\)  
__Syntax__  
Property Size : TSize Read GetState\_Size Write SetState\_Size;  
__Description__  
This property represents the size of the manual junction\. The GetState\_Size and SetState\_Size methods are used by this property\.  
__Example__  
Junction\.Size := eSmallest;  
__See also__  
ISch\_Junction interface  
TSize type\.

##### Locked property

\(ISch\_Junction interface\)  
__Syntax__  
Property Locked : Boolean Read GetState\_Locked Write SetState\_Locked;  
__Description__  
This property represents the Locked property of the manual junction\. The GetState\_Locked and SetState\_Locked methods are used by this property\.  
__Example__  
Junction\.Locked := True;  
__See also__  
ISch\_Junction interface

### <a id="ISch_Label_Interface"></a>ISch\_Label Interface

__Overview__  
The ISch\_Label interface represents an existing label object on a schematic document\. This interface is the ancestor interface for the ISch\_NetLabel interfaces\.  
__Notes__  
The interface hierarchy for the ISch\_Label interface is as follows:  
ISch\_GraphicalObject  
    ISch\_Label

__ISch\_Label methods__  
SetState\_FontId  
SetState\_Orientation  
SetState\_Justification  
SetState\_OverrideDisplayString  
SetState\_IsMirrored  
GetState\_FontId  
GetState\_Orientation  
GetState\_Justification  
GetState\_DisplayString  
GetState\_Formula  
GetState\_CalculatedValueString  
GetState\_OverrideDisplayString  
GetState\_IsMirrored

__ISch\_Label properties__  
FontId  
Orientation  
Justification  
Text  
OverrideDisplayString  
DisplayString  
Formula  
CalculatedValueString  
IsMirrored

__See also__  
ISch\_GraphicalObject interface