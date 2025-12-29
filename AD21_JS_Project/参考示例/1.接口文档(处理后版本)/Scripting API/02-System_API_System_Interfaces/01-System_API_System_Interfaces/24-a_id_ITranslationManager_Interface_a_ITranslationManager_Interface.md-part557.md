#### EntityNames Property

\(IModelDatafile interface\)  
__Syntax__  
Property EntityNames\[AnIndex : Integer\] : WideString Read EntityName;  
__Description__  
This Entitynames property returns the indexed entity name for the datafile related to the model\. This property is supported by the Entitynames method\.  
__See also__  
IModelDatafile interface  
EntityNames method\.

 

## <a id="IModelDatafileType_Interface"></a>IModelDatafileType Interface 

__Overview__  
The IModelDatafileType interface represents the data file type for the specified model\. Simulation Model has three model types and thus three data files, PCB LIB has one model type and one data file, PCB3DLib has one model type and one data file and SI has one model type and one data file\.

The IModelDatafileType interface is used by the IModelTypeManager

__IModelDatafileType Methods and Properties Table__

__IModelDatafileType methods__  
FileKind  
ExtensionFilter  
Description  
EntityType  
ModelType  
SupportsParameters

__IModelDatafileType properties__

__See also__  
ReportIntLibData script from the Examples\\Scripts\\Delphiscript Scripts\\DXP\_Scripts\\ folder of Altium Designer installation

### <a id="IModelDatafileType_Methods"></a>IModelDatafileType Methods