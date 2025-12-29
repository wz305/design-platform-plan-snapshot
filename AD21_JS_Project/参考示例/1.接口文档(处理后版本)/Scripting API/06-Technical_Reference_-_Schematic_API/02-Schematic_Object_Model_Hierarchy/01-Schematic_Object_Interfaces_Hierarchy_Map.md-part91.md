#### Properties

##### IsSolid property

\(ISch\_Pie interface\)  
__Syntax__  
Property IsSolid : Boolean Read GetState\_IsSolid Write SetState\_IsSolid;  
__Description__  
The IsSolid property denotes whether the pie object has a solid fill or not\. This property is supported by the GetState\_IsSolid and SetState\_IsSolid methods\.  
__Example__  
Pie\.IsSolid := True;  
__See also__  
ISch\_Pie interface

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