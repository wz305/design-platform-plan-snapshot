#### ModelTypeFromName method

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