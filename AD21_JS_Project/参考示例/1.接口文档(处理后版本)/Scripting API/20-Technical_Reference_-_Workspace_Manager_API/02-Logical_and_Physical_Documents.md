### Logical and Physical Documents

An important note, there are logical and physical documents; these terms are used to differentiate the documents in multi\-channel projects\. A multi channel design means that a single sheet is referenced repeatedly for a channel design\. This sheet is called a logical document\. A physical document \(usually a PCB document\) has components with unique names within a room which is mapped to a channel on a Schematic sheet\. So a multi channel design translates to multiple rooms with components with unique physical designators on a PCB\.

A physical designator of a PCB component is calculated to have the hierarchy path of a schematic project as well as the logical designator of the associated Schematic component to ensure that this designator for the PCB component is unique\.

__Example__  
Obtaining the project path from the current __IProject__ interface\.

1

// Get WSM interface \(the shell of the WorkSpace Manager interface\)\.

2

WSM := GetWorkSpace;

3

If WSM = Nil Then Exit;

4

Document := WSM\.DM\_Document;

5

If Document = Nil The Exit;

6

Project := Document\.DM\_Project;

__Script Examples__  
There are script examples in the \\Examples\\Scripts\\WSM folder