### <a id="IComponentVariation_interface"></a>IComponentVariation interface

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