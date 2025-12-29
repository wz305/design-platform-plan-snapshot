#### EditDeviceFolderList Method

\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Procedure EditDeviceFolderList;  
__Description__  
This procedure invokes the Device Sheet Folders dialog with all Device Sheet Folders if any\.  
__Example__ 

1

DeviceSheetMan := DeviceSheetManager;

2

If DeviceSheetMan = Nil Then Exit;

3

DeviceSheetMan\.EditDeviceFolderList;

__See also__  
IDeviceSheetManagerManager interface