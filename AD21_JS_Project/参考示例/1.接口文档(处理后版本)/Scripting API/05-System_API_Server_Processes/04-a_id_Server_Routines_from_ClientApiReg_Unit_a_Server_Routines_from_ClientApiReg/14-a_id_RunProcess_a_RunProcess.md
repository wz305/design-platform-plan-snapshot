### <a id="RunProcess"></a>RunProcess

__Declaration__  
Procedure RunProcess\(Const Command: String\);  
__Description__  
The __RunProcess__ procedure allows you to execute a server process\. If the process invoked by this extension requires parameters to be passed to it, you must add the parameters to the parameter buffer using the AddXXXParameter functions before running the process\.  
If the process returns values, these will be placed in the return buffer and can be read using the GetXXXParameter functions\.  
__Server: Process format__  
The Command string takes on the following form: Server:Process  
where Server is the name of the server the process is supplied by, and Process is the command name of the process\. An example is PCB:Zoom\.  
__Client Process example__

01

// available parameters for Dialog: Color or FileOpenSave Names

02

ResetParameters;

03

AddStringParameter\('Dialog','Color'\); // color dialog

04

AddStringParameter\('Color', '0'\);     // black color

05

RunProcess\('Client:RunCommonDialog'\);

06

  

07

//Result value obtained from the RunCommonDialog's Ok or Cancel buttons\.

08

GetStringParameter\('Result',S\);

09

If \(S = 'True'\) Then

10

Begin

11

    GetStringParameter\('Color',S\);

12

    ShowInfo\('New color is ' \+ S\);

13

End;

__PCB Process example__

1

// Refresh PCB workspace\.

2

ResetParameters;

3

AddStringParameter\('Action', 'Redraw'\);

4

RunProcess\('PCB:Zoom'\);

__Schematic Process example__

1

// Refresh Schematic workspace

2

ResetParameters;

3

AddStringParameter\('Action', 'All'\);

4

RunProcess\('Sch:Zoom'\);

__Workspace Manager Process example__

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

End;

__See also__  
Server Process routines