### <a id="IECO_interface"></a>IECO interface

__Overview__  
The __IECO__ interface represents an Engineering Change Order interface in the Work Space Manager\.  Basically an Engineering Change Order attempts to keep a project containing source documents and its corresponding primary implementation documents synchronized\. For example a schematic project and its PCB document, every time something changes in a schematic project, it is necessary to bring the changes forward to the PCB document via the Engineering Change Order feature\.

__Interface Methods__

__Method__

__Description__

Procedure DM\_Begin;

Denotes that the ECO manager has started\.

Procedure DM\_End; 

Denotes that the ECO manager has ended\.

Function  DM\_AddObject              \(Mode : TECO\_Mode; ReferenceObject : IDMObject\)

Adds a reference object for the ECO to compare the target document against this reference document\.

Function  DM\_RemoveObject           \(Mode : TECO\_Mode; ObjectToRemove  : IDMObject\)

Removes a reference object depending on what ECO mode is\.

Function  DM\_AddMemberToObject      \(Mode : TECO\_Mode;  
ReferenceMember : IDMObject;  
ReferenceParent : IDMObject;  
TargetParent    : IDMObject\)

Adds a specific action in the ECO manager\.

Function  DM\_RemoveMemberFromObject \(Mode : TECO\_Mode;  
MemberObject    : IDMObject;  
ParentObject    : IDMObject\)

Removes a specific action in the ECO manager\.

Function  DM\_ChangeObject           \(Mode : TECO\_Mode; Kind            : TModificationKind;  
ObjectToChange  : IDMObject;  
ReferenceObject : IDMObject\)

Changes a specific action in the ECO manager\.