#### GetFolders\_FolderPath Method

\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function  GetFolders\_FolderPath\(AIndex : Integer\) : WideString;  
__Description__  
This function returns the indexed path of device sheets \(as in the Device Sheet Folders dialog\)\. The first entry starts at zero \(0\)\.  
__Example__ 

1

DeviceSheetMan := DeviceSheetManager;

2

If DeviceSheetMan = Nil Then Exit;

3

Count := DeviceSheetMan\.GetFoldersCount;

4

ShowMessage\(DeviceSheetMan\.GetFolders\_FolderPath\(Count\-1\)\);

__See also__  
IDeviceSheetManagerManager interface  
GetFoldersCount method