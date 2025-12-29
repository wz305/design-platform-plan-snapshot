### <a id="ISch_ParameterSet_Interface"></a>ISch\_ParameterSet Interface

__Overview__  
The ISch\_ParameterSet interface is a group of parameters as a design parameter set directive for a wire or a net on the schematic document that can be transferred to its corresponding PCB document\.  
__Notes__  
The ISch\_ParameterSet interface hierarchy is as follows  
ISch\_GraphicalObject  
    ISch\_ParametrizedGroup  
        ISch\_ParameterSet

__ISch\_ParameterSet methods__  
SetState\_Orientation  
SetState\_Name  
GetState\_Orientation  
GetState\_Name

__ISch\_ParameterSet properties__  
Orientation  
Name

__See also__  
ISch\_GraphicalObject interface  
ISch\_ParametrizedGroup interface

#### Methods

##### SetState\_Name method

\(ISch\_ParameterSet interface\)  
__Syntax__  
Procedure SetState\_Name \(AValue : WideString\);  
__Description__  
The SetState\_Name procedure sets the new name for the parameterset object\.  
__Example__  
ParameterSet\.SetState\_Name\(‘Specific Name’\);  
__See also__  
ISch\_ParameterSet interface

##### GetState\_Orientation method

\(ISch\_ParameterSet interface\)  
__Syntax__  
Function GetState\_Orientation : TRotationBy90;  
__Description__  
__Example__  
__See also__  
ISch\_ParameterSet interface

##### GetState\_Name method

\(ISch\_ParameterSet interface\)  
__Syntax__  
Function GetState\_Name : WideString;  
__Description__  
The GetState\_Name function gets the new name for the parameter set object\.  
__Example__  
Name := ParameterSet\.GetState\_Name;  
__See also__  
ISch\_ParameterSet interface

##### SetState\_Orientation method

\(ISch\_ParameterSet interface\)  
__Syntax__  
Procedure SetState\_Orientation\(AValue : TRotationBy90\);  
__Description__  
__Example__  
__See also__  
ISch\_ParameterSet interface

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