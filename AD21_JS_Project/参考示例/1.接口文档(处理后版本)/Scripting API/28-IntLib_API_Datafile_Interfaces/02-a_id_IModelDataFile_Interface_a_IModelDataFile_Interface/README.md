# <a id="IModelDataFile_Interface"></a>IModelDataFile Interface

__Overview__  
The IModelDatafile interface represents the data file \(external file\) that is associated with a model\. Each model can have multiple data files \(different representations of the same model type\)\.

This interface is used within the IServerModel interface\.

__IModelDataFile Methods and Properties Table__

__IModelDatafile methods__  
FullPath  
EntityCount  
EntityName  
AddEntity

__IModelDatafile properties__  
EntityNames

__See also__  
IModelDatafileType interface  
Examples\\Scripts\\DelphiScript Scripts\\DXP\_Scripts\\ folder of Altium Designer installation



\(IModelDatafile interface\)  
__Syntax__  
Function EntityName \(AnIndex : Integer\) : WideString;  
__Description__  
The function returns the indexed entityname for the datafile related to the model\.  
__See also__  
IModelDatafile interface  
EntityCount method


\(IModelDatafile interface\)  
__Syntax__  
Function EntityCount : Integer;  
__Description__  
This function returns the number of entities for the data file related to the model\.  
__See also__  
IModelDatafile interface  
EntityName method


\(IModelDatafile interface\)  
__Syntax__  
Procedure AddEntity \(AName : WideString\);  
__Description__  
This procedure adds a new entity for the datafile\.  
__See also__  
IModelDatafile interface


\(IModelDatafile interface\)  
__Syntax__  
Function FullPath : WideString;  
__Description__  
This procedure fetches the full path of the data file part of the model\.  
__See also__  
IModelDatafile interface



\(IModelDatafile interface\)  
__Syntax__  
Property EntityNames\[AnIndex : Integer\] : WideString Read EntityName;  
__Description__  
This Entitynames property returns the indexed entity name for the datafile related to the model\. This property is supported by the Entitynames method\.  
__See also__  
IModelDatafile interface  
EntityNames method\.

## 子章节

- [<a id="IModelDataFile_Methods"></a>IModelDataFile Methods](01-a_id_IModelDataFile_Methods_a_IModelDataFile_Methods.md.md)
- [<a id="IModelDataFile_Properties"></a>IModelDataFile Properties](02-a_id_IModelDataFile_Properties_a_IModelDataFile_Properties.md.md)
