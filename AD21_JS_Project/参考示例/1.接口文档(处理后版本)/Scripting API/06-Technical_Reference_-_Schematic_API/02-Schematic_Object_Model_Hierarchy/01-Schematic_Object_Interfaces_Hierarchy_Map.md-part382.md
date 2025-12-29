#### RegisterListener Method

\(IHighlightedModelEditor interface\)  
__Syntax__  
Procedure RegisterListener\(AExternalForm : IExternalForm;  
                           AListener     : IModelEditorSelectionListener\);  
__Description__  
__Example__  
__See also__  
IHighlightedModelEditor interface  
 

## <a id="Integrated_Library_Enumerated_Types"></a>Integrated Library Enumerated Types 

TLibraryType = \(eLibIntegrated, eLibSource, eLibDatafile, eLibDatabase, eLibNone, eLibQuery\);  
 

## <a id="Integrated_Library_Constants"></a>Integrated Library Constants 

cModelType\_PCB   = 'PCBLIB';  
cModelType\_Sim   = 'SIM';  
cModelType\_PCB3D = 'PCB3DLib';  
cModelType\_PCAD  = 'PCADLib';  
cModelType\_SI    = 'SI';  
 

## <a id="Integrated_Library_Functions"></a>Integrated Library Functions 

Function ModelTypeManager         : IModelTypeManager;  
Function IntegratedLibraryManager : IIntegratedLibraryManager;  
Function DeviceSheetManager       : IDeviceSheetManager;

 

# [Home](https://www.altium.com/)Documentation