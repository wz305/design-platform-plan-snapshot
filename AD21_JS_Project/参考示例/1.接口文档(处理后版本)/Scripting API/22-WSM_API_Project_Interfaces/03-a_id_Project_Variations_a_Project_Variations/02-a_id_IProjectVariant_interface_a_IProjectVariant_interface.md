### <a id="IProjectVariant_interface"></a>IProjectVariant interface

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