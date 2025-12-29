#### BrowseDeviceSheet Method

\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function BrowseDeviceSheet \(Var   AFileName : WideString; Out AFilePath : WideString\) : Boolean;  
__Description__  
The function BrowseDeviceSheet invokes the Select Device Sheet dialog and when you select a device sheet, the filename \(without the file extension\) is returned for the device sheet you chose from this dialog\. This filename is returned in the AFilename parameter\.  
__Example__ 

1

DeviceSheetMan := DeviceSheetManager;

2

If DeviceSheetMan = Nil Then Exit;

3

AFilepath := ''; Afilepath is returned blank\.

4

DeviceSheetMan\.BrowseDeviceSheet\(AFileName,AFilepath\);

5

ShowMessage\('Filename ' \+ AFileName\);

__See also__  
IDeviceSheetManagerManager interface