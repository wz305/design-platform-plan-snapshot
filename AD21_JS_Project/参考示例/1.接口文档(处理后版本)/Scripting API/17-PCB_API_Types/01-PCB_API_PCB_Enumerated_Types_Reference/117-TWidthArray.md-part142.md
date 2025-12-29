#### AddDeviceFolder Method

\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function  AddDeviceFolder\(Const AFolderPath : WideString; ASearchSubfolder : Boolean\) : Boolean;  
__Description__  
This function adds a new device folder into the existing top level Device Folder and whether sub folders can be searched from that folder\.  
__Example__ 

1

If Not DeviceSheetManager\.WillSearchDeviceFolder\(ExtractFilePath\(ASheetPath\)\) Then

2

    DeviceSheetManager\.AddDeviceFolder\(ExtractFilePath\(ASheetPath\), False\);

__See also__  
IDeviceSheetManagerManager interface