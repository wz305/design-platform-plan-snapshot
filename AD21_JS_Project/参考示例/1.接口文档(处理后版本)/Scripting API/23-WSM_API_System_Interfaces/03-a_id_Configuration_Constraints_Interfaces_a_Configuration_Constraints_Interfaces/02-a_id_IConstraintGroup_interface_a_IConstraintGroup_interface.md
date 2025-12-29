### <a id="IConstraintGroup_interface"></a>IConstraintGroup interface

__Overview__  
The IConstraintGroup interface represents a constraint file made up of constraints \(as IConstraint interface\)\.  
__Important notes__  
Inherited from IDMObject  interface  
__Interface Methods__  
Function   DM\_TargetKindString             : WideString;   
Function   DM\_TargetId                     : WideString;   
Function   DM\_ConstraintCount              : Integer;      
Function   DM\_Constraints\(Index : Integer\) : IConstraint;  
__See also__  
Workspace Manager Interfaces  
IConstraint interface