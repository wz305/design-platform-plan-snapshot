### <a id="IOutputer_interface"></a>IOutputer interface

__Overview__  
The IOutputer interface represents the one of the outputs of an output job within a design project\.  
__Interface Methods__  
Function    DM\_ViewName                   : WideString  
Function    DM\_EditProperties             : Boolean;  
Function    DM\_Generate\_OutputFilesTo \(OutputDirectory : WideString; ParameterOverrides : PChar\) : Boolean;  
Function    DM\_Generate\_OutputFiles   \(AGeneratedFilename : PChar\) : Boolean;  
Procedure   DM\_SetPrintScale          \(APrintScale        : Double\);  
Procedure   DM\_SetPrintMode           \(AFitPrintToPage    : Boolean\);  
Procedure   DM\_SetDocumentPath        \(ADocPath           : WideString\);   
__See also__  
Workspace Manager Interfaces  
IProject interface  
IOutputJob interface  
IWSM\_OutputJobDocument interface