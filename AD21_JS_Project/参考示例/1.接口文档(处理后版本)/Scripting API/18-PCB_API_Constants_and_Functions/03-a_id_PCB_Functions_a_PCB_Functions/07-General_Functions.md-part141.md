#### ModelTypes property

\(IModelTypeManager interface\)  
__Syntax__  
Property ModelTypes \[AnIndex : Integer\] : IModelType Read ModelTypeAt;  
__Description__  
This function returns the indexed model type\. First model type starts at 0\. This property is supported by the ModelTypeAt method\.  
__Example__ 

01

Procedure ShowModelsFromModelTypeManager;

02

Var

03

    ModelTypeMan : IModelTypeManager;

04

    I            : Integer;

05

Begin

06

    ModelTypeMan := ModelTypeManager;

07

    If ModelTypeMan = Nil Then Exit;

08

  

09

    For i := 0 To ModelTypeMan\.ModelTypeCount \-1 do

10

       ShowMessage\(ModelTypeMan\.ModelTypes\[i\]\.Name\);

11

End;

__See also__  
IModelTypeManager interface  
IModelType interface  
ModelTypeAt method 

  

## <a id="IDeviceSheetManager_Interface"></a>IDeviceSheetManager Interface 

__Overview__  
The IDeviceSheetManager interface represents the Device Sheets Folder dialog in Altium Designer\. Invoke the DeviceSheetManager function to fetch the IDeviceSheetManager object interface\. 

__IDeviceSheetManager Methods and Properties Table__ 

__IDeviceSheetManager methods__  
EditDeviceFolderList  
FindDeviceSheetPath  
BrowseDeviceSheet  
GetFoldersCount  
GetFolders\_FolderPath  
GetFolders\_SearchSubFolders  
WillSearchDeviceFolder  
AddDeviceFolder  
ChooseDeviceFolder  
ConvertDeviceSheetPathToName

__IDeviceSheetManager properties__

__See also__  
DeviceSheetManager function\. 

### <a id="IDeviceSheetManager_Methods"></a>IDeviceSheetManager Methods