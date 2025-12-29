### <a id="IInstalledConstraintFiles_interface"></a>IInstalledConstraintFiles interface

__Overview__  
The IInstalledConstraintFiles interface represents the constraint files that are installed in Altium Designer, ie available to a FPGA project\.  
__Interface Methods__  
Function  InstalledConstraintFileCount                      : Integer;     
Function  InstalledConstraintFile   \(aIndex   : Integer\)    : WideString;  
Function  ConstraintFileIsInstalled \(aPath    : WideString\) : LongBool;    
Function  DefaultConstraintFile                             : WideString;  
Function  EditInstalledConstraintFiles                      : LongBool;    
__See also__  
Workspace Manager Interfaces