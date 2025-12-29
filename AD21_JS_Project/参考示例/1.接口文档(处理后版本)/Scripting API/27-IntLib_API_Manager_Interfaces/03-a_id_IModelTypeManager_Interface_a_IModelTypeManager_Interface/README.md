# <a id="IModelTypeManager_Interface"></a>IModelTypeManager Interface

__Overview__  
The IModelTypeManager interface represents a repository of available model types in Altium Designer\. The Implementation files \(\*\.IMP\) from the System folder of Altium Designer Installation are collected and processed by this manager\. 

Each model that can be linked to a schematic component has a model type and model data file\(s\)\. 

- PCB Model has one model data file – footprints \(\*\.PCBLIB\) 
- PCB 3D Model has one model data file –3D models \(\*\.PCB3DLib\) 
- Signal Integrity Model has one model data file – pin model library\. 
- Simulation has 3 model data files – Model File\(\*\.MDL\), Subcircuit file \(\*\.CKT\) and SIMetrix Model Library file \(\*\.LB\)\. 

This IModelTypeManager interface uses IModelType and IModelDataType interfaces to store different model types and their model data types\.  
Invoke the ModelTypeManager function to fetch the IModelTypeManager interface\.  
__IModelTypeManager Methods and Properties Table__ 

__IModelTypeManager methods__  
ModelTypeCount  
ModelTypeAt  
ModelTypeFromName  
ModelTypeFromServerName  
ModelDatafileTypeCount  
ModelDatafileTypeAt  
ModelDatafileTypeFromKind

__IModelTypeManager properties__  
ModelTypes  
ModelDatafileTypes

__See also__  
IModelType interface  
IModelDataType interface  
Examples\\Scripts\\DXP\_Scripts\\ folder of Altium Designer installation 



\(IModelTypeManager interface\)  
__Syntax__  
Function ModelTypeFromServerName \(AName : PChar\) : IModelType;  
__Description__  
This function returns the model type interface based on the server name\. The Server names can be: 

- PCB3D 
- PCB 
- Sim 
- SignalIntegrity 

__Example__ 

01

Procedure ShowAModelFromModelTypeManager;

02

Var

03

    ModelTypeMan : IModelTypeManager;

04

    I            : Integer;

05

    ModelType    : IModelType;

06

Begin

07

    ModelTypeMan := ModelTypeManager;

08

    If ModelTypeMan = Nil Then Exit;

09

    ModelType := ModelTypeMan\.ModelTypeFromServerName\('SIM'\); 

10

    ShowMessage\(ModelType\.Description\); //Simulation

11

End;

__See also__  
IModelTypeManager interface 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelTypeFromName \(AName : PChar\) : IModelType;  
__Description__  
This function returns the model type interface based on the model type name\. The names can be: 

- PCB3DLIB 
- PCBLIB 
- SI 
- SIM 

__Example__ 

01

Procedure DisplayModelTypeFromName;

02

Var

03

    AModelTypeManager : IModelTypeManager;

04

    AModelType        : IModelType;

05

Begin

06

    AModelTypeManager := ModelTypeManager;

07

    If AModelTypeManager = Nil Then Exit;

08

  

09

    //AModelType := AModelTypeManager\.ModelTypeFromName\('PCBLIB'\);

10

    //AModelType := AModelTypeManager\.ModelTypeFromName\('PCB3DLib'\);

11

    //AModelType := AModelTypeManager\.ModelTypeFromName\('SI'\);

12

    AModelType := AModelTypeManager\.ModelTypeFromName\('SIM'\);

13

    If AModelType <> Nil Then

14

        ShowMessage\(AModelType\.Description\);

15

End;

__See also__  
IModelTypeManager interface 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelTypeCount : Integer;  
__Description__  
This function returns the number of models supported by Altium Designer\. The available models are PCBLIB, SI, SIM and PCB3DLIB types\.  
__Example__ 

01

Procedure ShowModelTypesFromModelTypeManager;

02

Var

03

    ModelTypeMan : IModelTypeManager;

04

    I            : Integer;

05

Begin

06

    ModelTypeMan := ModelTypeManager;

07

    If ModelTypeMan = Nil Then Exit;

08

  

09

    For I := 0 To ModelTypeMan\.ModelTypeCount \-1 do

10

       ShowMessage\(ModelTypeMan\.ModelTypes\[i\]\.Name\); // 4 model types supported

11

End;

__See also__  
IModelTypeManager interface 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelTypeAt \(AnIndex : Integer\) : IModelType;  
__Description__  
This function returns the indexed model type\. First model type starts at 0\. This method is used by the ModelTypes property\.  
__Example__ 

1

Procedure ShowFirstModelTypeFromModelTypeManager;

2

Var

3

    ModelTypeMan : IModelTypeManager;

4

    I            : Integer;

5

Begin

6

    ModelTypeMan := ModelTypeManager;

7

    If ModelTypeMan = Nil Then Exit;

8

    ShowMessage\(ModelTypeMan\.ModelTypeAt\(0\)\.Name\);

9

End;

__See also__  
IModelTypeManager interface  
ModelTypeCount method 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelDatafileTypeFromKind \(AKind : PChar\) : IModelDatafileType;  
__Description__  
This function returns the IModelDatafileType based on the datafile kind\. The datafile kinds for: 

__Model Type \(Kind\)__

__DatafileType Description__

MDL

Sim Model File

CKT

Sim Subcircuit File

LB

SIMetrix Model Library File

SIPinModelLibrary

SI Pin Model Library

PCBLIB

Protel Footprint Library

PCB3DLIB

PCB3D Model Library

__Example__ 

1

Procedure ShowDataFileTypeFromModelTypeManager;

2

Var

3

    ModelTypeMan : IModelTypeManager;

4

Begin

5

    ModelTypeMan := ModelTypeManager;

6

    If ModelTypeMan = Nil Then Exit;

7

Showmessage\(ModelTypeMan\.ModelDatafileTypeFromKind\('SIPinModelLibrary'\)\.Description\); 

8

//SI Pin Model Library

9

End;

__See also__  
IModelTypeManager interface 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelDatafileTypeCount : Integer;  
__Description__  
This function reports the number of model data file types used by Altium Designer\. Since there are four models supported and Simulation model has 3 types while the other 3 models has one type each making 6 in total\.  
__Example__ 

1

Procedure ShowModelDatafileTypeCount;

2

Var

3

    ModelTypeMan : IModelTypeManager;

4

    I            : Integer;

5

Begin

6

    ModelTypeMan := ModelTypeManager;

7

    If ModelTypeMan = Nil Then Exit;

8

    Showmessage\(IntToStr\(ModelTypeMan\.ModelDatafileTypeCount\)\); //6 data file types

9

End;

__See also__  
IModelTypeManager interface 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelDatafileTypeAt \(AnIndex : Integer\) : IModelDatafileType;  
__Description__  
This method returns the data file types supported by Altium Designer\. First data file type starts at 0\. This method is used by the ModelDataFileTypes property\.  
__Example__ 

01

Procedure ShowModelDatafileTypes;

02

Var

03

    ModelTypeMan      : IModelTypeManager;

04

    ModelDatafileType : ModelDatafileType;

05

    I                 : Integer;

06

Begin

07

    ModelTypeMan := ModelTypeManager;

08

    If ModelTypeMan = Nil Then Exit;

09

    //6 data file types

10

    For I := 0 To ModelTypeMan\.ModelDatafileTypeCount \- 1 do

11

    Begin

12

        ModelDatafileType := ModelTypeMan\.ModelDatafileTypeAt\(I\);

13

        ShowMessage\(ModelDatafileType\.FileKind \+ \#13 \+ ModelDatafileType\.Description\);

14

    End;

15

End;

__See also__  
IModelTypeManager interface  
ModelDatafileTypes property  
ModelDatafileTypeCount method 



\(IModelTypeManager interface\)  
__Syntax__  
Property ModelDatafileTypes\[AnIndex : Integer\] : IModelDatafileType Read ModelDatafileTypeAt;  
__Description__  
This property returns the data file types supported by Altium Designer\. First data file type starts at 0\. This property is supported by the ModelDataFileTypeAt method\.  
__Example__ 

01

Procedure ShowModelDatafileTypes;

02

Var

03

    ModelTypeMan      : IModelTypeManager;

04

    ModelDatafileType : ModelDatafileType;

05

    I                 : Integer;

06

Begin

07

    ModelTypeMan := ModelTypeManager;

08

    If ModelTypeMan = Nil Then Exit;

09

    //6 data file types

10

    For I := 0 To ModelTypeMan\.ModelDatafileTypeCount \- 1 do

11

    Begin

12

        ModelDatafileType := ModelTypeMan\.ModelDatafileTypes\[I\];

13

        ShowMessage\(ModelDatafileType\.FileKind \+ \#13 \+ ModelDatafileType\.Description\);

14

    End;

15

End;

__See also__  
IModelTypeManager interface  
IModelDatafileType interface  
ModelDatafileTypeCount method 


\(IModelTypeManager interface\)  
__Syntax__  
Property ModelTypes \[AnIndex : Integer\] : IModelType Read ModelTypeAt;  
__Description__  
This function returns the indexed model type\. First model type starts at 0\. This property is supported by the ModelTypeAt method\.  
__Example__ 

01

Procedure ShowModelsFromModelTypeManager;

02

Var

03

    ModelTypeMan : IModelTypeManager;

04

    I            : Integer;

05

Begin

06

    ModelTypeMan := ModelTypeManager;

07

    If ModelTypeMan = Nil Then Exit;

08

  

09

    For i := 0 To ModelTypeMan\.ModelTypeCount \-1 do

10

       ShowMessage\(ModelTypeMan\.ModelTypes\[i\]\.Name\);

11

End;

__See also__  
IModelTypeManager interface  
IModelType interface  
ModelTypeAt method

## 子章节

- [<a id="IModelTypeManager_Methods"></a>IModelTypeManager Methods](01-a_id_IModelTypeManager_Methods_a_IModelTypeManager_Methods.md.md)
- [<a id="IModelTypeManager_Properties"></a>IModelTypeManager Properties](02-a_id_IModelTypeManager_Properties_a_IModelTypeManager_Properties.md.md)
