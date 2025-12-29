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