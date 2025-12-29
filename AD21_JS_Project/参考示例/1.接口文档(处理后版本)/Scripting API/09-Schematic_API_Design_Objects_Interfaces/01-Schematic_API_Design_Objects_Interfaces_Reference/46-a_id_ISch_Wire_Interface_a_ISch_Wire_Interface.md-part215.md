#### FindDeviceSheetPath Method

\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function FindDeviceSheetPath \(Const AFileName : WideString\) : WideString;  
__Description__  
This function finds the Device Sheet path for the valid device sheet \(without the file extension\)\. The valid device sheet is defined by the AFilename parameter\. If the AFileName is invalid, a blank string is returned\.  
__Example__  
ShowMessage\(DeviceSheetMan\.FindDeviceSheetPath\('AUDIO\_AMP\_LM4849'\)\);  
__See also__  
IDeviceSheetManagerManager interface