# IntLib API Datafile Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [IntLib API Datafile Interfaces for version 22](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Integrated Library API](https://www.altium.com/documentation/altium-designer/technical-reference-integrated-library-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


The Integrated Library API Datafile Interfaces Reference includes the following sections and content:

[__IModelDataFile Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21#IModelDataFile Interface)

[__IModelDatafileType Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21#IModelDatafileType Interface)

[IModelDataFile Methods](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21#IModelDataFile Methods)  
[IModelDataFile Properties](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21#IModelDataFile Properties)

[IModelDatafileType Methods](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21#IModelDatafileType Methods)

 


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



\(IModelDatafile interface\)  
__Syntax__  
Function EntityName \(AnIndex : Integer\) : WideString;  
__Description__  
The function returns the indexed entityname for the datafile related to the model\.  
__See also__  
IModelDatafile interface  
EntityCount method


\(IModelDatafile interface\)  
__Syntax__  
Function EntityCount : Integer;  
__Description__  
This function returns the number of entities for the data file related to the model\.  
__See also__  
IModelDatafile interface  
EntityName method


\(IModelDatafile interface\)  
__Syntax__  
Procedure AddEntity \(AName : WideString\);  
__Description__  
This procedure adds a new entity for the datafile\.  
__See also__  
IModelDatafile interface


\(IModelDatafile interface\)  
__Syntax__  
Function FullPath : WideString;  
__Description__  
This procedure fetches the full path of the data file part of the model\.  
__See also__  
IModelDatafile interface



\(IModelDatafile interface\)  
__Syntax__  
Property EntityNames\[AnIndex : Integer\] : WideString Read EntityName;  
__Description__  
This Entitynames property returns the indexed entity name for the datafile related to the model\. This property is supported by the Entitynames method\.  
__See also__  
IModelDatafile interface  
EntityNames method\.

 


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

## 子章节

- [Integrated Library API: Datafile Interfaces](01-Integrated_Library_API_Datafile_Interfaces.md/README.md)
- [<a id="IModelDataFile_Interface"></a>IModelDataFile Interface](02-a_id_IModelDataFile_Interface_a_IModelDataFile_Interface.md/README.md)
- [<a id="IModelDatafileType_Interface"></a>IModelDatafileType Interface](03-a_id_IModelDatafileType_Interface_a_IModelDatafileType_Interface.md/README.md)
