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

#### ISch\_Junction Methods

##### SetState\_Size method

\(ISch\_Junction interface\)  
__Syntax__  
Procedure SetState\_Size \(ASize : TSize\);  
__Description__  
This procedure sets the size of the manual junction\. The size is one of four values; Smallest, Small, Medium and Large\. This method is also used by the Size property\.  
__Example__  
ManualJunction\.SetState\_Size\(eMedium\);  
__See also__  
ISch\_Junction interface  
TSize type

##### SetState\_Locked method

\(ISch\_Junction interface\)  
__Syntax__  
Procedure SetState\_Locked\(ALocked : Boolean\);  
__Description__  
This procedure sets the Locked state of the manual junction\. This method is also used by the Locked property\.  
__Example__  
ManualJunction\.SetState\_Locked\(True\);  
__See also__  
ISch\_Junction interface

##### GetState\_Size method

\(ISch\_Junction interface\)  
__Syntax__  
Function GetState\_Size : TSize;  
__Description__  
This function gets the size of the manual junction\. The size is one of four values; Smallest, Small, Medium and Large\. This method is also used by the Size property\.  
__Example__  
Size := ManualJunction\.GetState\_Size;  
__See also__  
ISch\_Junction interface  
TSize type

##### GetState\_Locked method

\(ISch\_Junction interface\)  
__Syntax__  
Function GetState\_Locked : Boolean;  
__Description__  
This function gets the Locked state of the manual junction\. This method is also used by the Locked property\.  
__Example__  
Locked := ManualJunction\.GetState\_Locked;  
__See also__  
ISch\_Junction interface

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