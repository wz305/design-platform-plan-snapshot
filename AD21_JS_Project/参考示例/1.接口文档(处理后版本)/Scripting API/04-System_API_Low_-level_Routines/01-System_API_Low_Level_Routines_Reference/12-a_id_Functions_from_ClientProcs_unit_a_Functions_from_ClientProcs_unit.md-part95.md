#### Methods

##### GetState\_UniqueId method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_UniqueId : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_Symbol\_OuterEdge method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_Symbol\_OuterEdge : TIeeeSymbol;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_Symbol\_Outer method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_Symbol\_Outer : TIeeeSymbol;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_Symbol\_InnerEdge method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_Symbol\_InnerEdge : TIeeeSymbol;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_Symbol\_Inner method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_Symbol\_Inner : TIeeeSymbol;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_SwapIdPin method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_SwapIdPin : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_SwapIdPartPin method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_SwapIdPartPin : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_SwapIdPart method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_SwapIdPart : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_Name method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_Name \(AValue : WideString\);  
__Description__  
The SetState\_Name procedure sets the new name for the Pin object\.  
__Example__  
Pin\.SetState\_Name\(‘40’\);  
__See also__  
ISch\_Pin interface

##### SetState\_Designator method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_Designator \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_Width method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_Width \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_Symbol\_OuterEdge method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_Symbol\_OuterEdge\(AValue : TIeeeSymbol\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_Symbol\_Outer method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_Symbol\_Outer \(AValue : TIeeeSymbol\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_Symbol\_InnerEdge method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_Symbol\_InnerEdge\(AValue : TIeeeSymbol\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_Symbol\_Inner method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_Symbol\_Inner \(AValue : TIeeeSymbol\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_SwapIdPart method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_SwapIdPart \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_ShowName method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_ShowName \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_ShowDesignator method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_ShowDesignator \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_PinLength method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_PinLength \(AValue : TCoord\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_Orientation method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_Orientation \(AValue : TRotationBy90\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_IsHidden method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_IsHidden \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_HiddenNetName method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_HiddenNetName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_FormalType method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_FormalType \(AValue : TStdLogicState\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_Electrical method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_Electrical \(AValue : TPinElectrical\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_____Description____ method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\___Description__ \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_DefaultValue method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_DefaultValue \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_UniqueId method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_UniqueId \(AValue : WideString\);  
__Description__  
The SetState\_UniqueID procedure sets the new ID for the pin\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current pin\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__  
UID := WSM\.DM\_GenerateUniqueID; // interface and method from Workspace Manager API\.  
Pin\.SetState\_UniqueID\(UID\);  
__See also__  
ISch\_Pin interface

##### SetState\_SwapIdPin method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_SwapIdPin \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SetState\_SwapIdPartPin method

\(ISch\_Pin interface\)  
__Syntax__  
Procedure SetState\_SwapIdPartPin \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_Width method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_Width : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_ShowName method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_ShowName : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_ShowDesignator method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_ShowDesignator : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_PinLength method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_PinLength : TCoord;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_Orientation method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_Orientation : TRotationBy90;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_Name method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_Name : WideString;  
__Description__  
The GetState\_Name function gets the name for the Pin object\.  
__Example__  
PinName := Pin\.GetState\_Name;  
__See also__  
ISch\_Pin interface

##### GetState\_IsHidden method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_IsHidden : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_HiddenNetName method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_HiddenNetName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_FormalType method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_FormalType : TStdLogicState;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_Electrical method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_Electrical : TPinElectrical;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_Designator method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_Designator : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_____Description____ method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\___Description__ : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### GetState\_DefaultValue method

\(ISch\_Pin interface\)  
__Syntax__  
Function GetState\_DefaultValue : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface