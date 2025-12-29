#### ModelTypeFromServerName method

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