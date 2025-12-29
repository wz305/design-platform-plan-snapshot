#### ConvertDeviceSheetPathToName Method

\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function ConvertDeviceSheetPathToName \(Const AFilePath : WideString\) : WideString;  
__Description__  
The function converts the full file path \(the AFilePath parameter\) of the device sheet to the valid device sheet filename \(without the file extension\)\. If the AFilePath parameter is invalid, an empty string is returned\.  
__Example__ 

1

ShowMessage\(DeviceSheetMan\.ConvertDeviceSheetPathToName\('C:\\Program Files\\Altium Designer Summer 08\\Library\\Device Sheets\\Audio\\AUDIO\_AMP\_LM4849\.Harness'\)\); 

2

//Returns the filename of the valid device sheet \(without the file extension\)\.

__See also__  
IDeviceSheetManagerManager interface