# <a id="Server_Routines_from_ClientApiReg_Unit"></a>Server Routines from ClientApiReg

The server process routines are defined in the ClientApiReg part of the Altium Designer API\.

__There are two ways you can execute a process in a script__  
To execute a server process in a script, you need to use commands such as __ResetParameters__ and __RunProcess__ procedures or invoke the __Client\.SendMessage__ function\.

__RunProcess Example__

1

ResetParameters;

2

AddStringParameter\('OpenMode','NewFromTemplate'\);

3

AddStringParameter\('ObjectKind,'Project'\);

4

RunProcess\('WorkSpaceManager:OpenObject\);

__Client\.SendMessage Example__  
Client\.SendMessage\('WorkspaceManager:OpenObject','OpenMode=NewFromTemplate | ObjectKind=Project',1024,Nil\);  
__See also__  
Process Parameters Reference online help  
Process Examples in \\Examples\\Scripts\\Delphiscript Scripts\\Processes\\ folder\.


__Declaration__  
Procedure AddWordParameter\(Const Name: String; Value: Word\);  
__Description__  
The __AddWordParameter__ procedure defines a parameter with a Word data type to the parameter buffer for use by a server process\.  
__Example__

1

Begin

2

    ResetParameters;

3

    AddWordParameter\('WordValue',5\);

4

    // code here

5

End;

__See also__  
Server Process routines


__Declaration__  
Procedure AddColorParameter\(Const Name: String; Red: Integer; Green: Integer; Blue: Integer\);  
__Description__  
This procedure adds a color value parameter to the parameter buffer in Altium Designer\. This procedure is used to define a color for use by a process that requires a color parameter\.  
The Color is a value where value = RedVal \+ 256\*\(GreenVal \+ 256\*BlueVal\) and Name is the name representing this color value\.  
__See also__  
Server Process routines


__Declaration__  
Procedure AddIntegerParameter\(Const Name: String; Value: Integer\);  
__Description__  
The AddIntegerParameter procedure defines a parameter with an Integer data type to the parameter buffer for use by a server process\.  
__Example__

1

Begin

2

    ResetParameters;

3

    AddStringParameter\('ObjectKind','Netlist'\);

4

    AddIntegerParameter\('Index',5\);

5

    AddStringParameter\('ReturnGeneratedDocuments', 'True'\);

6

    RunProcess\('WorkspaceManager:GenerateReport'\);

7

End;

__See also__  
Server Process routines


__Declaration__  
Procedure AddLongIntParameter\(Const Name: String; Value: LongInt\);  
__Description__  
The AddLongIntParameter procedure defines a parameter with a longint data type to the parameter buffer for use by a server process\.  
__Example__

1

Begin

2

    ResetParameters;

3

    AddLongIntParameter\('LongIntValue',5\);

4

    // code here

5

End;

__See also__  
Server Process routines


__Declaration__  
Procedure AddSingleParameter\(Const Name: String; Value: Single\);  
__Description__  
The AddLongIntParameter procedure defines a parameter with a single data type to the parameter buffer for use by a server process\.  
__Example__

1

Begin

2

    ResetParameters;

3

    AddSingleParameter\('SingleValue',5\);

4

    // code here

5

End;

__See also__  
Server Process routines


__Declaration__  
Procedure AddStringParameter\(Const Name, Value: String\);  
__Description__  
This procedure adds a parameter with a string value to the parameter buffer\. The Name parameter represents the name of the process parameter and the Value parameter represents the value of the process parameter\.  
__Example__

1

    ResetParameters

2

    Call AddStringParameter\("Object","JumpToLocation10"\)

3

    Call RunProcess\("PCB:Jump"\)  

4

    ResetParameters

5

    Call AddStringParameter\("ZoomLevel","2\.0"\)

6

    Call RunProcess\("PCB:Zoom"\)

__See also__  
Server Process routines


__Declaration__  
Procedure GetColorParameter\(Const Name: String; Var Red: Integer; Var Green: Integer; Var Blue: Integer\);  
__Description__  
The GetColorParameter procedure retrieves the values of a color parameter as RGB values from the parameter buffer after running a process that returns a color value\.  
__See also__  
Server Process routines


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


__Declaration__  
Procedure GetLongIntParameter\(Const Name: String; Var Value: LongInt\);  
__Description__  
The GetLongIntParameter procedure retrieves the value of a long int type parameter from the parameter buffer\. This procedure after a process has been executed can return a resultant long int type value\.  
__See also__  
Server Process routines


__Declaration__  
Procedure GetSingleParameter\(Const Name: String; Var Value: Single\);  
__Description__  
The GetSingleParameter procedure retrieves the value of a single type parameter from the parameter buffer\. This procedure after a process has been executed can return a resultant single type value\.  
__See also__  
Server Process routines


__Declaration__  
Procedure GetStringParameter\(Const Name: String; Var Value: String\);  
__Description__  
The GetSingleParameter procedure retrieves the value of a string type parameter from the parameter buffer\. This procedure after a process has been executed can return a resultant string type value\.  
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


__Declaration__  
Procedure GetWordParameter\(Const Name: String; Var Value: Word\);  
__Description__  
The GetWordParameter procedure retrieves the value of a word type parameter from the parameter buffer\. This procedure after a process has been executed can return a resultant integer value\.  
__See also__  
Server Process routines


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

## 子章节

- [<a id="AddWordParameter"></a>AddWordParameter](01-a_id_AddWordParameter_a_AddWordParameter.md.md)
- [<a id="AddColorParameter"></a>AddColorParameter](02-a_id_AddColorParameter_a_AddColorParameter.md.md)
- [<a id="AddIntegerParameter"></a>AddIntegerParameter](03-a_id_AddIntegerParameter_a_AddIntegerParameter.md.md)
- [<a id="AddLongIntParameter"></a>AddLongIntParameter](04-a_id_AddLongIntParameter_a_AddLongIntParameter.md.md)
- [<a id="AddSingleParameter"></a>AddSingleParameter](05-a_id_AddSingleParameter_a_AddSingleParameter.md.md)
- [<a id="AddStringParameter"></a>AddStringParameter](06-a_id_AddStringParameter_a_AddStringParameter.md.md)
- [<a id="GetColorParameter"></a>GetColorParameter](07-a_id_GetColorParameter_a_GetColorParameter.md.md)
- [<a id="GetIntegerParameter"></a>GetIntegerParameter](08-a_id_GetIntegerParameter_a_GetIntegerParameter.md.md)
- [<a id="GetLongIntParameter"></a>GetLongIntParameter](09-a_id_GetLongIntParameter_a_GetLongIntParameter.md.md)
- [<a id="GetSingleParameter"></a>GetSingleParameter](10-a_id_GetSingleParameter_a_GetSingleParameter.md.md)
- [<a id="GetStringParameter"></a>GetStringParameter](11-a_id_GetStringParameter_a_GetStringParameter.md.md)
- [<a id="GetWordParameter"></a>GetWordParameter](12-a_id_GetWordParameter_a_GetWordParameter.md.md)
- [<a id="ResetParameters"></a>ResetParameters](13-a_id_ResetParameters_a_ResetParameters.md.md)
- [<a id="RunProcess"></a>RunProcess](14-a_id_RunProcess_a_RunProcess.md.md)
