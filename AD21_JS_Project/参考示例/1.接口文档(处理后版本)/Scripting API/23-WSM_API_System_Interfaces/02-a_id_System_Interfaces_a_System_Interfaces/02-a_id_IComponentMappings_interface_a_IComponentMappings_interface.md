### <a id="IComponentMappings_interface"></a>IComponentMappings interface

__Overview__  
The IComponentMappings interface represents the mapping of source components and target components in schematic and PCB documents\.

__Interface Methods__

__Method__

__Description__

Function DM\_UnmatchedSourceComponent\(Index : Integer\) : IComponent;

Returns the indexed unmatched source component, that is, a target component could not be found to map to this source component\.  
Use the DM\_UnmatchedSourceComponentCount function\.

Function DM\_UnmatchedTargetComponent\(Index : Integer\) : IComponent;

Returns the indexed unmatched target component, that is, a source component could not be found to map to the target component\. Use the DM\_UnmatchedTargetComponentCount function\.

Function DM\_MatchedSourceComponent  \(Index : Integer\) : IComponent;

Returns the indexed matched source component \(that has been matched with a target component\)\. Use the DM\_MatchedSourceComponentCount function\.

Function DM\_MatchedTargetComponent  \(Index : Integer\) : IComponent;

Returns the indexed matched source component \(that has been matched with a target component\)\. Use the DM\_MatchedTargetComponentCount function\.

Function DM\_UnmatchedSourceComponentCount : Integer;

Returns the number of unmatched source components\.

Function DM\_UnmatchedTargetComponentCount : Integer;

Returns the number of unmatched target components\.

Function DM\_MatchedComponentCount: Integer;

Returns the number of matched components\.