### <a id="IModelDataFile_Methods"></a>IModelDataFile Methods

#### EntityName method

\(IModelDatafile interface\)  
__Syntax__  
Function EntityName \(AnIndex : Integer\) : WideString;  
__Description__  
The function returns the indexed entityname for the datafile related to the model\.  
__See also__  
IModelDatafile interface  
EntityCount method

#### EntityCount method

\(IModelDatafile interface\)  
__Syntax__  
Function EntityCount : Integer;  
__Description__  
This function returns the number of entities for the data file related to the model\.  
__See also__  
IModelDatafile interface  
EntityName method

#### AddEntity method

\(IModelDatafile interface\)  
__Syntax__  
Procedure AddEntity \(AName : WideString\);  
__Description__  
This procedure adds a new entity for the datafile\.  
__See also__  
IModelDatafile interface

#### FullPath method

\(IModelDatafile interface\)  
__Syntax__  
Function FullPath : WideString;  
__Description__  
This procedure fetches the full path of the data file part of the model\.  
__See also__  
IModelDatafile interface