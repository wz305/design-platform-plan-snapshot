#### UninstallLibrary method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure UninstallLibrary \(ALibraryPath : WideString\);  
__Description__  
This procedure removes the specified library \(full path\) in the Available Libraries dialog \(in the __Installed__ page\) in Altium Designer  
__Example__  
IntegratedLibraryManager\.UnInstallLibrary\('C:\\Program Files\\Altium Designer\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib'\);  
__See also__  
IIntegratedLibraryManager interface  
InstallLibrary method 

  

## <a id="IModelTypeManager_Interface"></a>IModelTypeManager Interface 

__Overview__  
The IModelTypeManager interface represents a repository of available model types in Altium Designer\. The Implementation files \(\*\.IMP\) from the System folder of Altium Designer Installation are collected and processed by this manager\. 

Each model that can be linked to a schematic component has a model type and model data file\(s\)\. 

- PCB Model has one model data file – footprints \(\*\.PCBLIB\) 
- PCB 3D Model has one model data file –3D models \(\*\.PCB3DLib\) 
- Signal Integrity Model has one model data file – pin model library\. 
- Simulation has 3 model data files – Model File\(\*\.MDL\), Subcircuit file \(\*\.CKT\) and SIMetrix Model Library file \(\*\.LB\)\. 

This IModelTypeManager interface uses IModelType and IModelDataType interfaces to store different model types and their model data types\.  
Invoke the ModelTypeManager function to fetch the IModelTypeManager interface\.  
__IModelTypeManager Methods and Properties Table__ 

__IModelTypeManager methods__  
ModelTypeCount  
ModelTypeAt  
ModelTypeFromName  
ModelTypeFromServerName  
ModelDatafileTypeCount  
ModelDatafileTypeAt  
ModelDatafileTypeFromKind

__IModelTypeManager properties__  
ModelTypes  
ModelDatafileTypes

__See also__  
IModelType interface  
IModelDataType interface  
Examples\\Scripts\\DXP\_Scripts\\ folder of Altium Designer installation 

### <a id="IModelTypeManager_Methods"></a>IModelTypeManager Methods