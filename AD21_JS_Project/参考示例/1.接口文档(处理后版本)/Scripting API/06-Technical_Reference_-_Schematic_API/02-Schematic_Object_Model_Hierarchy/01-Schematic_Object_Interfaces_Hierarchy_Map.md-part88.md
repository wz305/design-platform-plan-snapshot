#### Properties

##### Orientation property

\(ISch\_ParameterSet interface\)  
__Syntax__  
Property Orientation : TRotationBy90 Read GetState\_Orientation Write SetState\_Orientation;  
__Description__  
__Example__  
__See also__  
ISch\_ParameterSet interface

##### Name property

\(ISch\_ParameterSet interface\)  
__Syntax__  
Property Name : WideString Read GetState\_Name Write SetState\_Name;  
__Description__  
The Name property determines the Parameter Set obejct’s name\. This property is supported by the GetState\_Name and SetState\_Name methods\.  
__Example__  
ParamSetName := ParameterSet\.Name;  
__See also__  
ISch\_ParameterSet interface

### <a id="ISch_ParametrizedGroup_Interface"></a>ISch\_ParametrizedGroup Interface

__Overview__  
The ISch\_ParametrizedGroup is an immediate ancestor interface for ParameterSet, Port, Pin, Component and SheetSymbol interfaces\. This interface deals with positions of parameters of such objects\.\.  
__Notes__  
The ISch\_ParametrizedGroup interface hierarchy is as follows  
ISch\_GraphicalObject  
    ISch\_ParameterizedGroup

__ISch\_ParametrizedGroup methods__  
Import\_FromUser\_Parameters  
ResetAllSchParametersPosition

__ISch\_ParametrizedGroup properties__

__See also__  
ISch\_GraphicalObject ancestor interface  
ISch\_ParameterSet descendent interface  
ISch\_Port descendent interface  
ISch\_Pin descendent interface  
ISch\_Component descendent interface  
ISch\_RectangularGroup descendent interface  
ISch\_SheetSymbol descendent interface