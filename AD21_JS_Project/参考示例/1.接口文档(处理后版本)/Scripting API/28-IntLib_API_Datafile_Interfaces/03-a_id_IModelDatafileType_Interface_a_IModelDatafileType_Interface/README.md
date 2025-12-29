# <a id="IModelDatafileType_Interface"></a>IModelDatafileType Interface

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

- [<a id="IModelDatafileType_Methods"></a>IModelDatafileType Methods](01-a_id_IModelDatafileType_Methods_a_IModelDatafileType_Methods.md.md)
