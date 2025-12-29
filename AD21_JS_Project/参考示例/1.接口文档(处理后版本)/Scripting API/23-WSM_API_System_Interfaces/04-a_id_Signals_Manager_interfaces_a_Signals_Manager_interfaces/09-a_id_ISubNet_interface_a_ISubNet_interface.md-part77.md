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