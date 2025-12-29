# <a id="Project_Variations"></a>Project Variations

__Overview__  
The IComponentVariation interface represents the component variant on a PCB document\. There is only one physical document, but each component on this document can be specified to be a variant and when the output is generated, a specific variant document is generated\. This variant output is controlled by the Output Job files\.

__Interface Methods__

__Method__

__Description__

Function    DM\_ProjectVariant : IDocumentVariant;

This function returns the IProjectVariant interface which represents a container that stores the component variants for the project\.

Function    DM\_VariationKind : TVariationKind;

This function returns the variation kind for this component\.

Function    DM\_PhysicalDesignator : WideString;

Returns the full physical designator string for this component variant\.

Function    DM\_UniqueId : WideString;

Returns the unique ID for this component variant\.

Function    DM\_AlternatePart : WideString;

Returns the alternate part string for this component variant\.

Function    DM\_VariationCount     : Integer;

Returns the number of variations\.

Function    DM\_Variations        \(Index : Integer\) : IParameterVariation;

Returns the indexed parameter variation for this component variation\.

__See also__  
IProjectVariant interface  
IParameterVariation interface


__Overview__  
The IProjectVariation interface represents the project that contains component variations\. Physically, there is only one PCB document with components that are specified\. So for each output requirement, each document variant is generated, although there is only one PCB design document\.

__Interface Methods__

__Method__

__Description__

Function    DM\_Project        : IProject;

Returns the IProject interface this  variant is associated with\.

Function    DM\_Name           : WideString;

Returns the name of this variant\.

Function    DM\_Description    : WideString;

Returns the description of this variant\.

Function    DM\_VariationCount : Integer;

Returns the count of variants\. To be used in conjunction with the DM\_Variations\(index\) method\.

Function    DM\_Variations     \(Index : Integer   \) : IComponentVariation;

Returns the indexed component variation for this project\. To be used in conjunction with the DM\_VariationCount method\.

__See also__  
Workspace Manager Interfaces  
IProject interface


__Overview__  
The IParameterVariation interface represents the component that contains parameter variations\. Physically, there is only one PCB document with components that are specified\. So for each output requirement, each document variant is generated, although there is only one PCB design document\.

__Interface Methods__

__Method__

__Description__

Function    DM\_ParameterName      : WideString;

Denotes the name of the parameter that the component is associated with\.

Function    DM\_VariedValue        : WideString;

Denotes the value of the parameter that the component is associated with\. A component variant can have parameter variants\.

__See also__  
Workspace Manager Interfaces  
IProject interface  
IProjectVariant interface  
IComponentVariation interface

## 子章节

- [<a id="IComponentVariation_interface"></a>IComponentVariation interface](01-a_id_IComponentVariation_interface_a_IComponentVariation_interface.md.md)
- [<a id="IProjectVariant_interface"></a>IProjectVariant interface](02-a_id_IProjectVariant_interface_a_IProjectVariant_interface.md.md)
- [<a id="IParameterVariation_interface"></a>IParameterVariation interface](03-a_id_IParameterVariation_interface_a_IParameterVariation_interface.md.md)
