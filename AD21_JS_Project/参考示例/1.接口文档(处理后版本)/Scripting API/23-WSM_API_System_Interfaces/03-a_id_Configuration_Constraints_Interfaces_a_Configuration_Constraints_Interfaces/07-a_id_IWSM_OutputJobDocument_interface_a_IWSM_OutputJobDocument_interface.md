### <a id="IWSM_OutputJobDocument_interface"></a>IWSM\_OutputJobDocument interface

__Overview__  
The IWSM\_OutputJobDocument interface represents the output jobs document in Altium Designer\.  
__Interface Methods__  
Function  GetState\_Outputer      \(AIndex : Integer\) : IOutputer;  
Function  GetState\_OutputerCount                    : Integer;  
   
Function  CreateOutputer      \(Const AOutputCategoryName   : WideString;  
                               Const APredefinedOutputName : WideString;  
                               Const AOutputerName         : WideString\) : IOutputer;  
Function  BeginModifyOutputer \(Const AOutputer : IOutputer \) : Boolean;    
Procedure EndModifyOutputer;  
__Interface Properties__  
Property  Outputer \[AIndex : Integer\] : IOutputer Read GetState\_Outputer;  
Property  OutputerCount               : Integer   Read GetState\_OutputerCount;  
__See also__  
Workspace Manager Interfaces  
IProject interface  
IOutputJob interface  
IWSM\_OutputJobDocument interface