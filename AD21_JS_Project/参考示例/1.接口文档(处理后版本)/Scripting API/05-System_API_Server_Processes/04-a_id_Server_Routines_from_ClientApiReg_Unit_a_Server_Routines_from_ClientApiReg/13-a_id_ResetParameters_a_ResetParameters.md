### <a id="ResetParameters"></a>ResetParameters

__Declaration__  
Procedure ResetParameters;  
__Description__  
The __ResetParameters__ procedure clears the parameter buffer\. Execute the procedure to reset the parameter buffer before setting parameters used by a process in your script or server project\.  
When you use any of the Add\.\.\.Parameter procedures, the parameter declared is appended to the parameter buffer\. When you run a process, any parameters that need to be passed to the process are read from the parameter buffer\.  
Running a process, however, DOES NOT clear the parameter buffer\. Therefore, it is important to use the __ResetParameters__ procedure to clear the buffer of old values before placing a new series of parameters into the buffer\.  
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

    If Result = 0 Then

14

        Exit;

15

    NetListName := GetStringParameter\('File1', Result\);

16

End;

__See also__  
Server Process routines