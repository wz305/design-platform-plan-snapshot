### <a id="ISch_Pin_Interface"></a>ISch\_Pin Interface

__Overview__  
Pins are special objects that have electrical characteristics and are used to direct signals in and out of components\. Pins connect directly to other pins, wires, net labels, sheet entries or ports\.  
__Notes__  
The ISch\_Pin interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_ParameterizedGroup  
        ISch\_Pin

__ISch\_Pin methods__  
SetState\_Name  
SetState\_Designator  
SetState\_Orientation  
SetState\_Width  
SetState\_FormalType  
SetState\_DefaultValue  
SetState\_Description  
SetState\_ShowName  
SetState\_ShowDesignator  
SetState\_Electrical  
SetState\_PinLength  
SetState\_IsHidden  
SetState\_HiddenNetName  
SetState\_Symbol\_Inner  
SetState\_Symbol\_Outer  
SetState\_Symbol\_InnerEdge  
SetState\_Symbol\_OuterEdge  
SetState\_SwapIdPart  
SetState\_SwapIdPin  
SetState\_SwapIdPartPin  
SetState\_UniqueId  
GetState\_Name  
GetState\_Designator  
GetState\_Orientation  
GetState\_Width  
GetState\_FormalType  
GetState\_DefaultValue  
GetState\_Description  
GetState\_ShowName  
GetState\_ShowDesignator  
GetState\_Electrical  
GetState\_PinLength  
GetState\_IsHidden  
GetState\_HiddenNetName  
GetState\_Symbol\_Inner  
GetState\_Symbol\_Outer  
GetState\_Symbol\_InnerEdge  
GetState\_Symbol\_OuterEdge  
GetState\_SwapIdPart  
GetState\_SwapIdPin  
GetState\_SwapIdPartPin  
GetState\_UniqueId  
OwnerSchComponent  
FullDesignator

__ISch\_Pin properties__  
Name  
Designator  
Orientation  
Width  
FormalType  
DefaultValue  
Description  
ShowName  
ShowDesignator  
Electrical  
PinLength  
IsHidden  
HiddenNetName  
Symbol\_Inner  
Symbol\_Outer  
Symbol\_InnerEdge  
Symbol\_OuterEdge  
SwapId\_Part  
SwapId\_Pin  
SwapId\_PartPin  
UniqueId

__See also__  
ISch\_GraphicalObject interface  
ISch\_ParametrizedGroup interface

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

#### Properties

##### Width property

\(ISch\_Pin interface\)  
__Syntax__  
Property Width : Integer Read GetState\_Width Write SetState\_Width ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### OwnerSchComponent method

\(ISch\_Pin interface\)  
__Syntax__  
Function OwnerSchComponent : ISch\_Component;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Orientation property

\(ISch\_Pin interface\)  
__Syntax__  
Property Orientation : TRotationBy90 Read GetState\_Orientation Write SetState\_Orientation ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Name property

\(ISch\_Pin interface\)  
__Syntax__  
Property Name : WideString Read GetState\_Name Write SetState\_Name ;  
__Description__  
The Name property determines the name for the Pin object\. This property is supported by the GetState\_Name and SetState\_Name methods\.  
__Example__  
PinName := Pin\.Name;  
__See also__  
ISch\_Pin interface

##### FullDesignator method

\(ISch\_Pin interface\)  
__Syntax__  
Function FullDesignator : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### FormalType property

\(ISch\_Pin interface\)  
__Syntax__  
Property FormalType : TStdLogicState Read GetState\_FormalType Write SetState\_FormalType ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Designator property

\(ISch\_Pin interface\)  
__Syntax__  
Property Designator : WideString Read GetState\_Designator Write SetState\_Designator ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Description property

\(ISch\_Pin interface\)  
__Syntax__  
Property Description : WideString Read GetState\_Description Write SetState\_Description ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### DefaultValue property

\(ISch\_Pin interface\)  
__Syntax__  
Property DefaultValue : WideString Read GetState\_DefaultValue Write SetState\_DefaultValue ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### UniqueId property

\(ISch\_Pin interface\)  
__Syntax__  
Property UniqueId : WideString Read GetState\_UniqueId Write SetState\_UniqueId ;  
__Description__  
The UniqueID property sets the new ID for the pin\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current sheet symbol\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__

1

UID := WSM\.DM\_GenerateUniqueID; // interface and method from Workspace Manager API\.

2

Pin\.UniqueID\(UID\);

__See also__  
ISch\_Pin interface

##### Symbol\_OuterEdge property

\(ISch\_Pin interface\)  
__Syntax__  
Property Symbol\_OuterEdge : TIeeeSymbol Read GetState\_Symbol\_OuterEdge Write SetState\_Symbol\_OuterEdge;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Symbol\_Outer property

\(ISch\_Pin interface\)  
__Syntax__  
Property Symbol\_Outer : TIeeeSymbol Read GetState\_Symbol\_Outer Write SetState\_Symbol\_Outer ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Symbol\_InnerEdge property

\(ISch\_Pin interface\)  
__Syntax__  
Property Symbol\_InnerEdge : TIeeeSymbol Read GetState\_Symbol\_InnerEdge Write SetState\_Symbol\_InnerEdge;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Symbol\_Inner property

\(ISch\_Pin interface\)  
__Syntax__  
Property Symbol\_Inner : TIeeeSymbol Read GetState\_Symbol\_Inner Write SetState\_Symbol\_Inner ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SwapId\_Pin property

\(ISch\_Pin interface\)  
__Syntax__  
Property SwapId\_Pin : WideString Read GetState\_SwapIdPin Write SetState\_SwapIdPin ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SwapId\_PartPin property

\(ISch\_Pin interface\)  
__Syntax__  
Property SwapId\_PartPin : WideString Read GetState\_SwapIdPartPin Write SetState\_SwapIdPartPin ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### SwapId\_Part property

\(ISch\_Pin interface\)  
__Syntax__  
Property SwapId\_Part : WideString Read GetState\_SwapIdPart Write SetState\_SwapIdPart ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### ShowName property

\(ISch\_Pin interface\)  
__Syntax__  
Property ShowName : Boolean Read GetState\_ShowName Write SetState\_ShowName ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### ShowDesignator property

\(ISch\_Pin interface\)  
__Syntax__  
Property ShowDesignator : Boolean Read GetState\_ShowDesignator Write SetState\_ShowDesignator ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### PinLength property

\(ISch\_Pin interface\)  
__Syntax__  
Property PinLength : TCoord Read GetState\_PinLength Write SetState\_PinLength ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### IsHidden property

\(ISch\_Pin interface\)  
__Syntax__  
Property IsHidden : Boolean Read GetState\_IsHidden Write SetState\_IsHidden ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### HiddenNetName property

\(ISch\_Pin interface\)  
__Syntax__  
Property HiddenNetName : WideString Read GetState\_HiddenNetName Write SetState\_HiddenNetName ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface

##### Electrical property

\(ISch\_Pin interface\)  
__Syntax__  
Property Electrical : TPinElectrical Read GetState\_Electrical Write SetState\_Electrical ;  
__Description__  
__Example__  
__See also__  
ISch\_Pin interface