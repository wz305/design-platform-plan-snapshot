#### ModelTypeCount method

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