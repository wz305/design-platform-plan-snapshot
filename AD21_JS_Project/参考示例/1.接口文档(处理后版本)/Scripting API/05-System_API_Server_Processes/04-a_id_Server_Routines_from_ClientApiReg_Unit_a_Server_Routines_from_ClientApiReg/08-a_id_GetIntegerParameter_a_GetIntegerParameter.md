### <a id="GetIntegerParameter"></a>GetIntegerParameter

__Declaration__  
Procedure GetIntegerParameter\(Const Name: String; Var Value: Integer\);  
__Description__  
The GetIntegerParameter procedure retrieves the value of an integer type parameter from the parameter buffer\. This procedure after a process has been executed can return a resultant word value\.  
__Example__

01

Var

02

    ErrorCode : Integer;

03

    CommandLine : String;

04

    Result : Integer;

05

    NetlistName : String

06

Begin

07

    ResetParameters;

08

    AddStringParameter\('ObjectKind','Netlist'\);

09

    AddIntegerParameter\('Index',5\);

10

    AddStringParameter\('ReturnGeneratedDocuments', 'True'\);

11

    RunProcess\('WorkspaceManager:GenerateReport'\);

12

    GetIntegerParameter\('Result', Result\);

13

    If Result = 0 Then Exit;

14

    NetListName := GetStringParameter\('File1', Result\);

15

End;

__See also__  
Server Process routines