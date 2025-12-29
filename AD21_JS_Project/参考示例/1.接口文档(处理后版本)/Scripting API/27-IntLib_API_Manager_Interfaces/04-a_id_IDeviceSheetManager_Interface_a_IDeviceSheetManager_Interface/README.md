# <a id="IDeviceSheetManager_Interface"></a>IDeviceSheetManager Interface

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


\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function FindDeviceSheetPath \(Const AFileName : WideString\) : WideString;  
__Description__  
This function finds the Device Sheet path for the valid device sheet \(without the file extension\)\. The valid device sheet is defined by the AFilename parameter\. If the AFileName is invalid, a blank string is returned\.  
__Example__  
ShowMessage\(DeviceSheetMan\.FindDeviceSheetPath\('AUDIO\_AMP\_LM4849'\)\);  
__See also__  
IDeviceSheetManagerManager interface 


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


\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function WillSearchDeviceFolder\(Const AFolderPath : WideString\) : Boolean;  
__Description__  
This function determines whether the Device Sheet Folder represented by the AFolderPath parameter exists or not\.  
__Example__ 

1

If Not DeviceSheetManager\.WillSearchDeviceFolder\(ExtractFilePath\(ASheetPath\)\) Then

2

    DeviceSheetManager\.AddDeviceFolder\(ExtractFilePath\(ASheetPath\), False\);

__See also__  
IDeviceSheetManagerManager interface

## 子章节

- [<a id="IDeviceSheetManager_Methods"></a>IDeviceSheetManager Methods](01-a_id_IDeviceSheetManager_Methods_a_IDeviceSheetManager_Methods.md.md)
