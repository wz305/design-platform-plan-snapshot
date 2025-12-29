# <a id="WorkSpace_Manager_Functions"></a>WorkSpace Manager Functions

Function WSMServer    : IWSM\_ServerInterface;  
Function GetWorkspace : IWorkspace;


Function GetProjectOfDocument\(Const ADocPath : WideString\) : IProject;  
Function IsFreeDocument\(Const FileName : WideString\) : LongBool;


Function IsBusConnector\(ALibReference : TDynamicString\) : Boolean;


Function GetViolationTypeInformation\(ErrorKind : TErrorKind\) : TViolationTypeDescription;  
Function GetViolationTypeDescription\(ErrorKind : TErrorKind\) : TDynamicString;  
Function GetViolationTypeDefaultLevel\(ErrorKind : TErrorKind\) : TErrorLevel;  
Function GetViolationTypeGroup\(ErrorKind : TErrorKind\) : TErrorGroup;  
Function GetErrorLevelColor\(ErrorLevel : TErrorLevel\) : TColor;  
__See also__  
Work Space Manager API Reference  
IProject interface  
TColor type  
TDynamicString type  
TErrorLevel type  
TErrorGroup type  
TViolationTypeDescription type

## 子章节

- [<a id="Main_Interfaces"></a>Main Interfaces](01-a_id_Main_Interfaces_a_Main_Interfaces.md.md)
- [<a id="Project_and_Document_Interfaces"></a>Project and Document Interfaces](02-a_id_Project_and_Document_Interfaces_a_Project_and_Document_Interfaces.md.md)
- [<a id="Object_functions"></a>Object functions](03-a_id_Object_functions_a_Object_functions.md.md)
- [<a id="Violation_and_Error_Functions"></a>Violation and Error Functions](04-a_id_Violation_and_Error_Functions_a_Violation_and_Error_Functions.md.md)
