#### ChooseDeviceFolder Method

\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function  ChooseDeviceFolder\(Var AFolderPath : WideString\) : Boolean;  
__Description__  
This function invokes the Choose Device Sheet Folder dialog and returns you the valid device folder via the AFolderPath parameter\. The function returns a false value if the dialog is cancelled\.  
__Example__ 

1

FolderPath := ExtractFilePath\(DeviceSheetPathText\);

2

If DeviceSheetManager\.ChooseDeviceFolder\(FolderPath\) Then

3

     DeviceSheetPathText := AddSlash\(FolderPath\) \+ ExtractFileName\(DeviceSheetPathText\);

__See also__  
IDeviceSheetManagerManager interface