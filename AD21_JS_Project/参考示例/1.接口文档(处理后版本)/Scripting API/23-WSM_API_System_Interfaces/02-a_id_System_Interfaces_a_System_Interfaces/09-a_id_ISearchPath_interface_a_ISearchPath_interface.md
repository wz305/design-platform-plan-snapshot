### <a id="ISearchPath_interface"></a>ISearchPath interface

__Overview__  
The ISearchPath interface represents the paths of a project\. This ISearchPath interface has a link to the associated open project in Altium Designer\.

__Interface Methods__

__Method__

__Description__

Function    DM\_Path : WideString;

Returns the path of the focussed project in Altium Designer\.

Function    DM\_AbsolutePath      : WideString;

Returns the absolute path of the focussed project in Altium Designer\.

Function    DM\_IncludeSubFolders : Boolean;

Returns whether sub folders are included in the focussed project in Altium Designer\.

Function    DM\_Project : IProject; 

Returns the project in which this ISearchPath interface is associated with\.