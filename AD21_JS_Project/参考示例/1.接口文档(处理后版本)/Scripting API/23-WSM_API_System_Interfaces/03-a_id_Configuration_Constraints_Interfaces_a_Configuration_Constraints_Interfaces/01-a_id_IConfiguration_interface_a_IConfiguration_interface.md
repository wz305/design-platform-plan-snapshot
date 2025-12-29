### <a id="IConfiguration_interface"></a>IConfiguration interface

__Overview__  
The IConfiguration interface represents the configuration container that contains a group of constraints which targets a specific FPGA device\.  
__Interface Methods__  
Function    DM\_Name                              : WideString;   
Function    DM\_ConstraintGroupCount              : Integer;   
Function    DM\_ConstraintGroups\(Index : Integer\) : IConstraintGroup;  
Function    DM\_ConstraintsFileCount                 : Integer;   
Function    DM\_ConstraintsFilePath\(Index : Integer\) : WideString;  
Procedure   DM\_AddConstraintFile\(AConstraintFilePath : WideString\);  
Function    DM\_GetTargetDeviceName                  : WideString;  
__See also__  
Workspace Manager Interfaces