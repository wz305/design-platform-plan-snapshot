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