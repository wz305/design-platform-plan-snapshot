#### GetFoldersCount Method

\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function  GetFoldersCount : Integer;  
__Description__  
The GetFoldersCount function returns the number of Device Sheet Folders in Altium Designer\.  
__Example__ 

1

DeviceSheetMan := DeviceSheetManager;

2

If DeviceSheetMan = Nil Then Exit;

3

Count := DeviceSheetMan\.GetFoldersCount;

4

ShowMessage\(IntToStr\(Count\)\);

__See also__  
IDeviceSheetManagerManager interface