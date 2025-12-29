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