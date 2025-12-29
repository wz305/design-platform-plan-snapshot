#### DM\_LogicalDocument method

\(IDocument interface\)  
__Syntax__  
Function DM\_LogicalDocument : IDocument;  
__Description__  
This function returns the logical document if valid\. Otherwise a nil value is returned\. There are logical and physical documents; these terms are used to differentiate the documents in multi\-channel projects\. A multi channel design means that a single sheet is referenced repeatedly for a channel design\. This sheet is called a logical document\. A physical document \(usually a PCB document\) has components with unique names within a room which is mapped to a channel on a Schematic sheet\. So a multi channel design translates to multiple rooms with components with unique physical designators on a PCB\.

A physical designator of a PCB component is calculated to have the hierarchy path of a schematic project as well as the logical designator of the associated Schematic component to ensure that this designator for the PCB component is unique\.  
__See also__  
IDocument