#### GetFolders\_SearchSubFolders Method

\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function GetFolders\_SearchSubFolders\(AIndex : Integer\): Boolean;  
__Description__  
This function returns a boolean result for sub folders of the indexed path of device sheets \(as in the Device Sheet Folders dialog\)\. The first entry starts at zero \(0\)\.  
__Example__ 

1

DeviceSheetMan := DeviceSheetManager;

2

If DeviceSheetMan = Nil Then Exit;

3

Result := DeviceSheetMan\.GetFolders\_SearchSubFolders\(0\);

4

If Result Then

5

    ShowMessage\(DeviceSheetMan\.GetFolders\_FolderPath\(0\) \+ ‘has its sub folders’\);

__See also__  
IDeviceSheetManagerManager interface  
GetFoldersCount method