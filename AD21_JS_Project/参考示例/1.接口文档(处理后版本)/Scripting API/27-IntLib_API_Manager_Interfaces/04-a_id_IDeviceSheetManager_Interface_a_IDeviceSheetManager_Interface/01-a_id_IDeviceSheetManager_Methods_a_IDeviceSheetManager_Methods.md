### <a id="IDeviceSheetManager_Methods"></a>IDeviceSheetManager Methods

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

#### WillSearchDeviceFolder Method

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

# IntLib API Datafile Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [IntLib API Datafile Interfaces for version 22](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Integrated Library API](https://www.altium.com/documentation/altium-designer/technical-reference-integrated-library-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## Integrated Library API: Datafile Interfaces 

The Integrated Library API Datafile Interfaces Reference includes the following sections and content:

[__IModelDataFile Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21#IModelDataFile Interface)

[__IModelDatafileType Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21#IModelDatafileType Interface)

[IModelDataFile Methods](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21#IModelDataFile Methods)  
[IModelDataFile Properties](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21#IModelDataFile Properties)

[IModelDatafileType Methods](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21#IModelDatafileType Methods)

 

## <a id="IModelDataFile_Interface"></a>IModelDataFile Interface 

__Overview__  
The IModelDatafile interface represents the data file \(external file\) that is associated with a model\. Each model can have multiple data files \(different representations of the same model type\)\.

This interface is used within the IServerModel interface\.

__IModelDataFile Methods and Properties Table__

__IModelDatafile methods__  
FullPath  
EntityCount  
EntityName  
AddEntity

__IModelDatafile properties__  
EntityNames

__See also__  
IModelDatafileType interface  
Examples\\Scripts\\DelphiScript Scripts\\DXP\_Scripts\\ folder of Altium Designer installation

### <a id="IModelDataFile_Methods"></a>IModelDataFile Methods

#### EntityName method

\(IModelDatafile interface\)  
__Syntax__  
Function EntityName \(AnIndex : Integer\) : WideString;  
__Description__  
The function returns the indexed entityname for the datafile related to the model\.  
__See also__  
IModelDatafile interface  
EntityCount method

#### EntityCount method

\(IModelDatafile interface\)  
__Syntax__  
Function EntityCount : Integer;  
__Description__  
This function returns the number of entities for the data file related to the model\.  
__See also__  
IModelDatafile interface  
EntityName method

#### AddEntity method

\(IModelDatafile interface\)  
__Syntax__  
Procedure AddEntity \(AName : WideString\);  
__Description__  
This procedure adds a new entity for the datafile\.  
__See also__  
IModelDatafile interface

#### FullPath method

\(IModelDatafile interface\)  
__Syntax__  
Function FullPath : WideString;  
__Description__  
This procedure fetches the full path of the data file part of the model\.  
__See also__  
IModelDatafile interface

### <a id="IModelDataFile_Properties"></a>IModelDataFile Properties

#### EntityNames Property

\(IModelDatafile interface\)  
__Syntax__  
Property EntityNames\[AnIndex : Integer\] : WideString Read EntityName;  
__Description__  
This Entitynames property returns the indexed entity name for the datafile related to the model\. This property is supported by the Entitynames method\.  
__See also__  
IModelDatafile interface  
EntityNames method\.

 

## <a id="IModelDatafileType_Interface"></a>IModelDatafileType Interface 

__Overview__  
The IModelDatafileType interface represents the data file type for the specified model\. Simulation Model has three model types and thus three data files, PCB LIB has one model type and one data file, PCB3DLib has one model type and one data file and SI has one model type and one data file\.

The IModelDatafileType interface is used by the IModelTypeManager

__IModelDatafileType Methods and Properties Table__

__IModelDatafileType methods__  
FileKind  
ExtensionFilter  
Description  
EntityType  
ModelType  
SupportsParameters

__IModelDatafileType properties__

__See also__  
ReportIntLibData script from the Examples\\Scripts\\Delphiscript Scripts\\DXP\_Scripts\\ folder of Altium Designer installation

### <a id="IModelDatafileType_Methods"></a>IModelDatafileType Methods

#### Description method

\(IModelDatafileType interface\)  
__Syntax__  
Function Description : PChar;  
__Description__  
This function returns the description string for this IModelDatafiletype interface depending on the model’s data file type\. Since Altium Designer supports four models and six model types:

__Model Type \(FileKind\)__

__ExtensionFilter__

__DatafileType Description__

__Entity Type__

__Supports Parameters__

MDL

\*\.MDL

Sim Model File

Sim Model

False

CKT

\*\.CKT

Sim Subcircuit File

Sim Subcircuit

False

LB

\*\.LB

SIMetrix Model Library File

SIMetrix Model

False

SIPinModelLibrary

 

SI Pin Model Library

SI Pin Model

False

PCBLIB

\*\.PCBLIB

Protel Footprint Library

Footprint

True

PCB3DLIB

\*\.PCB3DLib

PCB3D Model Library

PCB3D Model

False

__Example__

01

For I := 0 To ModelTypeMan\.ModelDatafileTypeCount \- 1 do

02

Begin

03

    ModelDatafileType := ModelTypeMan\.ModelDatafileTypeAt\(I\);

04

    ShowMessage\(

05

        ModelDatafileType\.FileKind \+ \#13 \+

06

        ModelDatafileType\.ExtensionFilter  \+ \#13 \+

07

        ModelDatafileType\.Description \+ \#13 \+

08

        ModelDatafileType\.EntityType  \+ \#13 \+

09

        ModelDatafileType\.ModelType\.Name  \+ \#13 \+

10

        BooleanToStr\(ModelDatafileType\.SupportsParameters\)\);

11

End;

__See also__  
IModelTypeManager interface  
IModelDatafileType interface

#### EntityType method

\(IModelDatafileType interface\)  
__Syntax__  
Function EntityType : PChar;  
__Description__  
This function returns the Entity type string for this IModelDatafiletype interface depending on the model’s data file type\. Since Altium Designer supports four models and six model types:

__Model Type \(FileKind\)__

__ExtensionFilter__

__DatafileType Description__

__Entity Type__

__Supports Parameters__

MDL

\*\.MDL

Sim Model File

Sim Model

False

CKT

\*\.CKT

Sim Subcircuit File

Sim Subcircuit

False

LB

\*\.LB

SIMetrix Model Library File

SIMetrix Model

False

SIPinModelLibrary

 

SI Pin Model Library

SI Pin Model

False

PCBLIB

\*\.PCBLIB

Protel Footprint Library

Footprint

True

PCB3DLIB

\*\.PCB3DLib

PCB3D Model Library

PCB3D Model

False

__Example__

01

For I := 0 To ModelTypeMan\.ModelDatafileTypeCount \- 1 do

02

Begin

03

    ModelDatafileType := ModelTypeMan\.ModelDatafileTypeAt\(I\);

04

    ShowMessage\(

05

        ModelDatafileType\.FileKind \+ \#13 \+

06

        ModelDatafileType\.ExtensionFilter  \+ \#13 \+

07

        ModelDatafileType\.Description \+ \#13 \+

08

        ModelDatafileType\.EntityType  \+ \#13 \+

09

        ModelDatafileType\.ModelType\.Name  \+ \#13 \+

10

        BooleanToStr\(ModelDatafileType\.SupportsParameters\)\);

11

End;

__See also__  
IModelTypeManager interface  
IModelDatafileType interface

#### ExtensionFilter method

\(IModelDatafileType interface\)  
__Syntax__  
Function ExtensionFilter : PChar;  
__Description__  
This function returns the extension filter string for this IModelDatafiletype interface depending on the model’s data file type\. Since Altium Designer supports four models and six model types:

__Model Type \(FileKind\)__

__ExtensionFilter__

__DatafileType Description__

__Entity Type__

__Supports Parameters__

MDL

\*\.MDL

Sim Model File

Sim Model

False

CKT

\*\.CKT

Sim Subcircuit File

Sim Subcircuit

False

LB

\*\.LB

SIMetrix Model Library File

SIMetrix Model

False

SIPinModelLibrary

 

SI Pin Model Library

SI Pin Model

False

PCBLIB

\*\.PCBLIB

Protel Footprint Library

Footprint

True

PCB3DLIB

\*\.PCB3DLib

PCB3D Model Library

PCB3D Model

False

__Example__

01

For I := 0 To ModelTypeMan\.ModelDatafileTypeCount \- 1 do

02

Begin

03

    ModelDatafileType := ModelTypeMan\.ModelDatafileTypeAt\(I\);

04

    ShowMessage\(

05

        ModelDatafileType\.FileKind \+ \#13 \+

06

        ModelDatafileType\.ExtensionFilter  \+ \#13 \+

07

        ModelDatafileType\.Description \+ \#13 \+

08

        ModelDatafileType\.EntityType  \+ \#13 \+

09

        ModelDatafileType\.ModelType\.Name  \+ \#13 \+

10

        BooleanToStr\(ModelDatafileType\.SupportsParameters\)\);

11

End;

__See also__  
IModelTypeManager interface  
IModelDatafileType interface

#### FileKind method

\(IModelDatafileType interface\)  
__Syntax__  
Function FileKind : PChar;  
__Description__  
This function returns the FileKind string for this IModelDatafiletype interface depending on the model’s data file type\. Since Altium Designer supports four models and six model types:

__Model Type \(FileKind\)__

__ExtensionFilter__

__DatafileType Description__

__Entity Type__

__Supports Parameters__

MDL

\*\.MDL

Sim Model File

Sim Model

False

CKT

\*\.CKT

Sim Subcircuit File

Sim Subcircuit

False

LB

\*\.LB

SIMetrix Model Library File

SIMetrix Model

False

SIPinModelLibrary

 

SI Pin Model Library

SI Pin Model

False

PCBLIB

\*\.PCBLIB

Protel Footprint Library

Footprint

True

PCB3DLIB

\*\.PCB3DLib

PCB3D Model Library

PCB3D Model

False

__Example__

01

For I := 0 To ModelTypeMan\.ModelDatafileTypeCount \- 1 do

02

Begin

03

    ModelDatafileType := ModelTypeMan\.ModelDatafileTypeAt\(I\);

04

    ShowMessage\(

05

        ModelDatafileType\.FileKind \+ \#13 \+

06

        ModelDatafileType\.ExtensionFilter  \+ \#13 \+

07

        ModelDatafileType\.Description \+ \#13 \+

08

        ModelDatafileType\.EntityType  \+ \#13 \+

09

        ModelDatafileType\.ModelType\.Name  \+ \#13 \+

10

        BooleanToStr\(ModelDatafileType\.SupportsParameters\)\);

11

End;

__See also__  
IModelTypeManager interface  
IModelDatafileType interface

#### ModelType method

\(IModelDatafileType interface\)  
__Syntax__  
Function ModelType : IModelType;  
__Description__  
This function returns the ModelType string for this IModelDatafiletype interface depending on the model’s data file type\. Since Altium Designer supports four models and six model types:

__Model Type \(FileKind\)__

__ExtensionFilter__

__DatafileType Description__

__Entity Type__

__Supports Parameters__

MDL

\*\.MDL

Sim Model File

Sim Model

False

CKT

\*\.CKT

Sim Subcircuit File

Sim Subcircuit

False

LB

\*\.LB

SIMetrix Model Library File

SIMetrix Model

False

SIPinModelLibrary

 

SI Pin Model Library

SI Pin Model

False

PCBLIB

\*\.PCBLIB

Protel Footprint Library

Footprint

True

PCB3DLIB

\*\.PCB3DLib

PCB3D Model Library

PCB3D Model

False

__Example__

01

For I := 0 To ModelTypeMan\.ModelDatafileTypeCount \- 1 do

02

Begin

03

    ModelDatafileType := ModelTypeMan\.ModelDatafileTypeAt\(I\);

04

    ShowMessage\(

05

        ModelDatafileType\.FileKind \+ \#13 \+

06

        ModelDatafileType\.ExtensionFilter  \+ \#13 \+

07

        ModelDatafileType\.Description \+ \#13 \+

08

        ModelDatafileType\.EntityType  \+ \#13 \+

09

        ModelDatafileType\.ModelType\.Name  \+ \#13 \+

10

        BooleanToStr\(ModelDatafileType\.SupportsParameters\)\);

11

End;

__See also__  
IModelTypeManager interface  
IModelDatafileType interface

#### SupportsParameters method

\(IModelDatafileType interface\)  
__Syntax__  
Function SupportsParameters : Boolean;  
__Description__  
This function returns the SupportsParameters Boolean value for this IModelDatafiletype interface depending on the model’s data file type\. Since Altium Designer supports four models and six model types:

__Model Type \(FileKind\)__

__ExtensionFilter__

__DatafileType Description__

__Entity Type__

__Supports Parameters__

MDL

\*\.MDL

Sim Model File

Sim Model

False

CKT

\*\.CKT

Sim Subcircuit File

Sim Subcircuit

False

LB

\*\.LB

SIMetrix Model Library File

SIMetrix Model

False

SIPinModelLibrary

 

SI Pin Model Library

SI Pin Model

False

PCBLIB

\*\.PCBLIB

Protel Footprint Library

Footprint

True

PCB3DLIB

\*\.PCB3DLib

PCB3D Model Library

PCB3D Model

False

__Example__

01

For I := 0 To ModelTypeMan\.ModelDatafileTypeCount \- 1 do

02

Begin

03

    ModelDatafileType := ModelTypeMan\.ModelDatafileTypeAt\(I\);

04

    ShowMessage\(

05

        ModelDatafileType\.FileKind \+ \#13 \+

06

        ModelDatafileType\.ExtensionFilter  \+ \#13 \+

07

        ModelDatafileType\.Description \+ \#13 \+

08

        ModelDatafileType\.EntityType  \+ \#13 \+

09

        ModelDatafileType\.ModelType\.Name  \+ \#13 \+

10

        BooleanToStr\(ModelDatafileType\.SupportsParameters\)\);

11

End;

__See also__  
IModelTypeManager interface  
IModelDatafileType interface

# IntLib API IModel Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [IntLib API IModel Interfaces for version 22](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Integrated Library API](https://www.altium.com/documentation/altium-designer/technical-reference-integrated-library-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## Integrated Library API: IModel Interfaces 

The Integrated Library API IModel Interfaces Reference includes the following sections and content:

[__IModelEditor Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#IModelEditor Interface)

[__IModelType Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#IModelType Interface)

[__IServerModel Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#IServerModel Interface)

[__IModelEditorSelectionListener Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#IModelEditorSelectionListener Interface)

[IModelEditor Methods](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#IModelEditor Methods)

[IModelType Methods](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#IModelType Methods)

[IServerModel Methods](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#IServerModel Methods)  
[IServerModel Properties](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#IServerModel Properties)

 

 

 

 

 

[__IHighlightedModelEditor Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#IHighlightedModelEditor Interface)

[__Integrated Library Enumerated Types__](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#Integrated Library Enumerated Types)

[__Integrated Library Constants__](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#Integrated Library Constants)

[__Integrated Library Functions__](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#Integrated Library Functions)

[IHighlightedModelEditor Methods](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21#IHighlightedModelEditor Methods)

 

 

 

 

## <a id="IModelEditor_Interface"></a>IModelEditor Interface 

__Overview__  
The IModelEditor interface represents the Model Editor hosted by a server which normally has a dialog that displays data about the model properties in Altium Designer\. This IModelEditor interface is the front end for the actual implementation of a Model Editor for a specific model domain \(PCB, Signal Integrity and other model types\)\.

__IModelEditor Methods and Properties Table__

__IModelEditor methods__  
EditModel  
CreateDatafile  
StartingLibraryCompile  
FinishedLibraryCompile  
PrepareModel  
CreateServerModel  
GetExternalForm  
DrawModel  
GetEntityParameters  
SetDefaultModelState  
CrossProbeEntity  
DrawModelToMetaFile

__IModelEditor properties__

### <a id="IModelEditor_Methods"></a>IModelEditor Methods

#### CreateDatafile method

\(IModelEditor interface\)  
__Syntax__  
Function CreateDatafile \(ADatafilePath : PChar\) : IModelDatafile;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### CreateServerModel method

\(IModelEditor interface\)  
__Syntax__  
Function CreateServerModel \(AModel : IComponentImplementation\) : IServerModel;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### CrossProbeEntity method

\(IModelEditor interface\)  
__Syntax__  
Procedure CrossProbeEntity \(AEntityName : WideString;ADataFilePath : WideString\);  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### DrawModel method

\(IModelEditor interface\)  
__Syntax__  
Procedure DrawModel \(AExternalForm : IExternalForm;AModelName : PChar;ADataFilePath : PChar\);  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### DrawModelToMetaFile method

\(IModelEditor interface\)  
__Syntax__  
Procedure DrawModelToMetaFile \(Const AFileName : WideString;Const AModelName : WideString;Const ADataFilePath : WideString;APaintColorMode : TPaintColorMode;APaintScaleMode : TPaintScaleMode\);  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### EditModel method

\(IModelEditor interface\)  
__Syntax__  
Function EditModel \(SchModel : ISch\_Implementation; SchComp : ISch\_Component;IsLibrary : Boolean\) : Boolean;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### FinishedLibraryCompile method

\(IModelEditor interface\)  
__Syntax__  
Procedure FinishedLibraryCompile;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### GetEntityParameters method

\(IModelEditor interface\)  
__Syntax__  
Function GetEntityParameters \(AEntityName : WideString; ADataFilePath : WideString\) : WideString;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### GetExternalForm method

\(IModelEditor interface\)  
__Syntax__  
Function GetExternalForm : IExternalForm;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### PrepareModel method

\(IModelEditor interface\)  
__Syntax__  
Function PrepareModel \(AModel : IComponentImplementation\) : Boolean;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### StartingLibraryCompile method

\(IModelEditor interface\)  
__Syntax__  
Procedure StartingLibraryCompile;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### SetDefaultModelState method

\(IModelEditor interface\)  
__Syntax__  
Function SetDefaultModelState \(SchModel : ISch\_Implementation;SchComp : ISch\_Component;IsLibrary : Boolean\) : Boolean;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

 

## <a id="IModelType_Interface"></a>IModelType Interface 

__Overview__  
The IModelType interface represents the type used by a model linked in the Component\. Each model has at least one data file type or entity type\.

The IModelDataFiletype interface uses the IModelType interface  
The IModelTypeManager interface uses the IModelType interface

__IModelType Methods and Properties Table__

__IModelType methods__  
Name  
Description  
ServerName  
PortDescriptor  
Editor  
Previewable  
Highlightable

__IModelType properties__

__See Also__  
IModelDataFileType interface  
IModelTypeManager interface  
Examples\\Scripts\\DXP\_Scripts\\ folder of Altium Designer installation\.

### <a id="IModelType_Methods"></a>IModelType Methods

#### Description method

\(IModelType interface\)  
__Syntax__  
Function Description : PChar;  
__Description__  
The function returns the description of the model type\.

__Model Type Description__

__Model Type Name__

__ServerName__

Simulation

SIM

Sim

Signal Integrity

SI

SignalIntegrity

Footprint

PCBLIB

PCB

PCB3D

PCB3DLIB

PCB3D

__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\)

5

ShowMessage\(AModelType\.Description\);

__See also__  
IModelType interface

#### Editor method

\(IModelType interface\)  
__Syntax__  
Function Editor : IModelEditor;  
__Description__  
This method returns the IModelEditor for this model type\.  
__See also__  
IModelType interface  
IModelEditor interface  
IModelType\.Description method

#### Name method

\(IModelType interface\)  
__Syntax__  
Function Name : PChar;  
__Description__  
The function returns the name of the model type supported by Altium Designer\. The following model names supported by Altium Designer are:

__Model Type Name__

__Model Type Description__

__ServerName__

SIM

Simulation

Sim

SI

Signal Integrity

SignalIntegrity

PCBLIB

Footprint

PCB

PCB3DLIB

PCB3D

PCB3D

__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(AModelType\.Name\);

__See also__  
IModelType interface

#### PortDescriptor method

\(IModelType interface\)  
__Syntax__  
Function PortDescriptor : PChar;  
__Description__  
The PortDescriptor  
__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(AModelType\.Descriptor\);

__See also__  
IModelType interface

#### Previewable method

\(IModelType interface\)  
__Syntax__  
Function Previewable : Boolean;  
__Description__  
This function returns a boolean value for the model that can be previewable\. Simulation and Signal Integrity models are not highlightable or previewable and thus they don’t have viewable document kinds\.  
__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(BooleanToStr\(AModelType\.Previewable\)\);

__See also__  
IModelType interface  
Highlightable method  
ViewableDocKind method

#### ServerName method

\(IModelType interface\)  
__Syntax__  
Function ServerName : PChar;  
__Description__  
This function returns the Server Name associated with the model type\.

__ServerName__

__Model Type Name__

__Model Type Description__

Sim

SIM

Simulation

SignalIntegrity

SI

Signal Integrity

PCB

PCBLIB

Footprint

PCB3D

PCB3DLIB

PCB3D

__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(AModelType\.ServerName\);

__See also__  
IModelType interface

#### Highlightable method

\(IModelType interface\)  
__Syntax__  
Function Highlightable : Boolean;  
__Description__  
This function returns a boolean value for the model that can be highlightable \(viewable on a document kind\)\. Simulation and Signal Integrity models are not highlightable or previewable and thus they don’t have viewable document kinds\.  
__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(BooleanToStr\(AModelType\.Highlightable\)\);

__See also__  
IModelType interface  
ViewableDocKind method  
Previewable method

#### ViewableDocKind method

\(IModelType interface\)  
__Syntax__  
Function ViewableDocKind : PChar  
__Description__  
This function returns the name of the Document Kind that’s viewable \(related to the Highlightable method\)\. Simulation and Signal Integrity models are not highlightable and thus they don’t have document kinds\.  
__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(AModelType\.ViewableDocKind\);

__See also__  
IModelType interface  
Highlightable method  
Previewable method

 

## <a id="IServerModel_Interface"></a>IServerModel Interface 

__Overview__  
The IServerModel interface represents the model set up by the server to be used by the integrated library server\.

__IServerModel Methods and Properties Table__

__IServerModel methods__  
Name  
PortCount  
PortName  
AddPort  
CheckSchPins  
CheckModelPins

__IServerModel properties__  
PortNames

__See also__  
IModelEditor interface

### <a id="IServerModel_Methods"></a>IServerModel Methods

#### AddPort method

\(IServerModel interface\)  
__Syntax__  
Procedure AddPort \(AName : PChar\);  
__Description__  
__See also__  
IServerModel interface

#### Name method

\(IServerModel interface\)  
__Syntax__  
Function Name : PChar;  
__Description__  
The function gives the name for the Server Model\.  
__See also__  
IServerModel interface

#### PortName method

\(IServerModel interface\)  
__Syntax__  
Function PortName \(AnIndex : Integer\) : PChar;  
__Description__  
__Example__  
__See also__  
IServerModel interface

#### PortCount method

\(IServerModel interface\)  
__Syntax__  
Function PortCount : Integer;  
__Description__  
This function returns the number of ports for this Server Model\.  
__See also__  
IServerModel interface

#### CheckSchPins method

\(IServerModel interface\)  
__Syntax__  
Function CheckSchPins : Boolean  
__Description__  
__Example__  
__See also__  
IServerModel interface

#### CheckModelPins method

\(IServerModel interface\)  
__Syntax__  
Function CheckModelPins : Boolean;  
__Description__  
__Example__  
__See also__  
IServerModel interface

### <a id="IServerModel_Properties"></a>IServerModel Properties

#### PortNames property

\(IServerModel interface\)  
__Syntax__  
Property PortNames\[AnIndex : Integer\] : PChar Read PortName;  
__Description__  
__Example__  
__See also__  
IServerModel interface  
 

## <a id="IModelEditorSelectionListener_Interface"></a>IModelEditorSelectionListener Interface 

__Overview__

__IModelEditorSelectionListener__ __methods__  
PinSelectionChanged

__IModelEditorSelectionListener properties__

__See also__  
 

## <a id="IHighlightedModelEditor_Interface"></a>IHighlightedModelEditor Interface 

__Overview__  
__IHighlightedModelEditor Methods and Properties Table__

__IHighlightedModelEditor methods__  
HighlightComponentPins  
ShowSpecifiedPinsOnly  
ShowPinsAsSelected  
DrawModel\_PinsSelected  
RegisterListener

__IHighlightedModelEditor properties__

__See also__  
IModelType interface

### <a id="IHighlightedModelEditor_Methods"></a>IHighlightedModelEditor Methods

#### HighlightComponentPins Method

\(IHighlightedModelEditor interface\)  
__Syntax__  
Procedure HighlightComponentPins\(AExternalForm      : IExternalForm;  
                                 APinNameList       : WideString;  
                                 AHighlightColor    : TColor;  
                                 ANonHighlightColor : TColor\);  
__Description__  
__Example__  
__See also__  
IHighlightedModelEditor interface

#### ShowSpecifiedPinsOnly Method

\(IHighlightedModelEditor interface\)  
__Syntax__  
Procedure ShowSpecifiedPinsOnly \(AExternalForm      : IExternalForm;  
                                 APinNameList       : WideString\);  
__Description__  
__Example__  
__See also__  
IHighlightedModelEditor interface

#### ShowPinsAsSelected Method

\(IHighlightedModelEditor interface\)  
__Syntax__  
Procedure ShowPinsAsSelected\(AExternalForm      : IExternalForm;  
                             APinNameList       : WideString\);  
__Description__  
__Example__  
__See also__  
IHighlightedModelEditor interface

#### DrawModel\_PinsSelected Method

\(IHighlightedModelEditor interface\)  
__Syntax__  
Procedure DrawModel\_PinsSelected\(AExternalForm      : IExternalForm;  
                                 AModelName         : WideString;  
                                 ADataFilePath      : WideString;  
                                 APinNameList       : WideString\);  
__Description__  
__Example__  
__See also__  
IHighlightedModelEditor interface

#### RegisterListener Method

\(IHighlightedModelEditor interface\)  
__Syntax__  
Procedure RegisterListener\(AExternalForm : IExternalForm;  
                           AListener     : IModelEditorSelectionListener\);  
__Description__  
__Example__  
__See also__  
IHighlightedModelEditor interface  
 

## <a id="Integrated_Library_Enumerated_Types"></a>Integrated Library Enumerated Types 

TLibraryType = \(eLibIntegrated, eLibSource, eLibDatafile, eLibDatabase, eLibNone, eLibQuery\);  
 

## <a id="Integrated_Library_Constants"></a>Integrated Library Constants 

cModelType\_PCB   = 'PCBLIB';  
cModelType\_Sim   = 'SIM';  
cModelType\_PCB3D = 'PCB3DLib';  
cModelType\_PCAD  = 'PCADLib';  
cModelType\_SI    = 'SI';  
 

## <a id="Integrated_Library_Functions"></a>Integrated Library Functions 

Function ModelTypeManager         : IModelTypeManager;  
Function IntegratedLibraryManager : IIntegratedLibraryManager;  
Function DeviceSheetManager       : IDeviceSheetManager;

 

# [Home](https://www.altium.com/)Documentation