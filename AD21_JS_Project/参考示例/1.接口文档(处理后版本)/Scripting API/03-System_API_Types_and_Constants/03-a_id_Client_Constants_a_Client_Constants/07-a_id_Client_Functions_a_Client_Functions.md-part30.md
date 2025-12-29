#### RunOpenDocumentDialog

__Syntax__  
Function  RunOpenDocumentDialog \(Caption : TDynamicString; MultiSelect : Boolean; Var Path, SelectedType, Editor : TDynamicString;  Const FileTypes, Files : TStrings\) : Boolean;  
__Description__  
This function is based on the Client’s RunCommonDialog process\. The Caption parameter is used for the Title of the dialog\. The MultiSelect parameter allows you to select files from the dialog if True\. If you want to only select one file use the False value\. The Path, SelectedType and Editor parameters are returned after the dialog has closed\. FileTypes and Files parameters determine which file types and files can be opened by the Common Dialog\.  
__Example__  
   
__See also__