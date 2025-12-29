#### TParameterList Methods

Constructor Create;  
Destructor  Destroy; Override;

##### SetState\_FromString and GetState\_ToString methods

Procedure   SetState\_FromString \(Const S : TDynamicString\);  
Function    GetState\_ToString            : TDynamicString;

##### SetState\_AddParameterX methods

Procedure   SetState\_AddParameter           \(Const AName, AValue : TDynamicString\);  
Procedure   SetState\_AddParameterAsString   \(Const AName : TDynamicString; Const Value : TDynamicString\);  
Procedure   SetState\_AddParameterAsBoolean  \(Const AName : TDynamicString; Value : Boolean\);  
Procedure   SetState\_AddParameterAsInteger  \(Const AName : TDynamicString; Value : Integer\);  
Procedure   SetState\_AddParameterAsInt64    \(Const AName : TDynamicString; Value : Int64\);  
Procedure   SetState\_AddParameterAsDouble   \(Const AName : TDynamicString; Const Value : Double\);

##### GetState\_AddParameterX methods

Function    GetState\_ParameterAsString      \(Const Name : TDynamicString; Var Value : TDynamicString \) : Boolean; Overload;  
Function    GetState\_ParameterAsString      \(Const Name : TDynamicString; Var Value : TString \) : Boolean;        Overload;  
Function    GetState\_ParameterAsPChar       \(Const Name : TDynamicString; Var Value : PChar  \) : Boolean;  
Function    GetState\_ParameterAsLongInt     \(Const Name : TDynamicString; Var Value : LongInt\) : Boolean;  
Function    GetState\_ParameterAsInteger     \(Const Name : TDynamicString; Var Value : Integer\) : Boolean;  
Function    GetState\_ParameterAsInt64       \(Const Name : TDynamicString; Var Value : Int64  \) : Boolean;  
Function    GetState\_ParameterAsSmallInt    \(Const Name : TDynamicString; Var Value : SmallInt\) : Boolean;  
Function    GetState\_ParameterAsWord        \(Const Name : TDynamicString; Var Value : Word   \) : Boolean;  
Function    GetState\_ParameterAsBoolean     \(Const Name : TDynamicString; Var Value : Boolean\) : Boolean;  
Function    GetState\_ParameterAsWordBool    \(Const Name : TDynamicString; Var Value : WordBool\) : Boolean;  
Function    GetState\_ParameterAsReal        \(Const Name : TDynamicString; Var Value : Single  \) : Boolean;  
Function    GetState\_ParameterAsDouble      \(Const Name : TDynamicString; Var Value : Double\) : Boolean;

##### Other methods

Function    GetState\_ParameterByName  \(Const AName : TDynamicString\) : TParameter;  
Function    SetState\_RemoveByName     \(Const AName : TDynamicString\) : Boolean;  
Procedure   ClearAllParameters;  
Procedure   SetState\(P : PChar\);  
Procedure   GetState\(P : PChar\);  
__Scripting Notes__  
In Scripting, we can only use the following methods SetState\_FromString \(Const S : TDynamicString\); and  GetState\_ToString to process strings\. The SetState and GetState methods cause problems in the scripting engine\.

__Example in DelphiScript__

01

//Parameters = Orientation=1|Location\.X=10000000|Location\.Y=20000000';

02

    P := TParameterList\.Create; // P is of TParameterList type\.

03

    P\.ClearAllParameters;

04

    P\.SetState\_FromString\(Parameters\);

05

    P\.SetState\_AddParameterAsString \('Orientation','1'\);

06

    P\.SetState\_AddParameterAsString \('Location\.X' ,'10000000'\);

07

    P\.SetState\_AddParameterAsString \('Location\.Y' ,'20000000'\);

08

    P\.SetState\_AddParameterAsString \('Designator' ,'dB1'\);

09

    P\.SetState\_AddParameterAsString \('Comment'    ,'50pF'\);

10

    Parameters := P\.GetState\_ToString;

11

  

12

    IntegratedLibraryManager\.PlaceLibraryComponent\(SchLibRef,SchLibpath,Parameters\);

13

    P\.Free;

### <a id="Process_Parameter_Functions"></a>Process Parameter Functions

Function  GetState\_Parameter      \(P : PChar; Const Name : TString; Var Value : TString\) : Boolean; Overload;  
Function  GetState\_Parameter      \(P : PChar; Const Name : TDynamicString; Var Value : TDynamicString\) : Boolean; Overload;  
   
Procedure SetState\_RemoveParameter\(P : PChar; Const Name : TDynamicString\); Overload;  
Function  GetState\_ParameterPChar \(P : PChar; Const Name : TDynamicString;     Value : PChar\)  : Boolean;  
Procedure SetState\_ParameterPChar \(P : PChar; Const Name : TDynamicString;     Value : PChar\);  
Procedure SetState\_Parameter      \(P : PChar; Const Name : TDynamicString; Const Value : TDynamicString\); Overload;  
   
Function  GetState\_Parameter      \(Const S : TDynamicString; Const Name : TDynamicString; Var   Value : TDynamicString\) : Boolean; Overload;  
Procedure SetState\_Parameter      \(Var   S : TDynamicString; Const Name : TDynamicString; Const Value : TDynamicString\); Overload;  
Procedure SetState\_RemoveParameter\(Var   S : TDynamicString; Const Name : TDynamicString\); Overload;

 

## <a id="Server_Routines_from_ClientApiReg_Unit"></a>Server Routines from ClientApiReg 

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

### <a id="AddWordParameter"></a>AddWordParameter

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

### <a id="AddColorParameter"></a>AddColorParameter

__Declaration__  
Procedure AddColorParameter\(Const Name: String; Red: Integer; Green: Integer; Blue: Integer\);  
__Description__  
This procedure adds a color value parameter to the parameter buffer in Altium Designer\. This procedure is used to define a color for use by a process that requires a color parameter\.  
The Color is a value where value = RedVal \+ 256\*\(GreenVal \+ 256\*BlueVal\) and Name is the name representing this color value\.  
__See also__  
Server Process routines

### <a id="AddIntegerParameter"></a>AddIntegerParameter

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

### <a id="AddLongIntParameter"></a>AddLongIntParameter

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

### <a id="AddSingleParameter"></a>AddSingleParameter

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

### <a id="AddStringParameter"></a>AddStringParameter

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

### <a id="GetColorParameter"></a>GetColorParameter

__Declaration__  
Procedure GetColorParameter\(Const Name: String; Var Red: Integer; Var Green: Integer; Var Blue: Integer\);  
__Description__  
The GetColorParameter procedure retrieves the values of a color parameter as RGB values from the parameter buffer after running a process that returns a color value\.  
__See also__  
Server Process routines

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

### <a id="GetLongIntParameter"></a>GetLongIntParameter

__Declaration__  
Procedure GetLongIntParameter\(Const Name: String; Var Value: LongInt\);  
__Description__  
The GetLongIntParameter procedure retrieves the value of a long int type parameter from the parameter buffer\. This procedure after a process has been executed can return a resultant long int type value\.  
__See also__  
Server Process routines

### <a id="GetSingleParameter"></a>GetSingleParameter

__Declaration__  
Procedure GetSingleParameter\(Const Name: String; Var Value: Single\);  
__Description__  
The GetSingleParameter procedure retrieves the value of a single type parameter from the parameter buffer\. This procedure after a process has been executed can return a resultant single type value\.  
__See also__  
Server Process routines

### <a id="GetStringParameter"></a>GetStringParameter

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

### <a id="GetWordParameter"></a>GetWordParameter

__Declaration__  
Procedure GetWordParameter\(Const Name: String; Var Value: Word\);  
__Description__  
The GetWordParameter procedure retrieves the value of a word type parameter from the parameter buffer\. This procedure after a process has been executed can return a resultant integer value\.  
__See also__  
Server Process routines

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

 

## <a id="Helper_Functions_and_Objects_for_the_Scr"></a>Helper Functions and Objects for the Scripting System 

The Scripting System has provided a few Helper objects which are to help simplify your scripting tasks especially with creating and managing lists of strings or objects\.

__Useful functions:__

- CopyFile

__Useful classes:__

- TStringList
- TList
- TIniFile

Many routines and objects from the Borland Delphi's Run Time Library cannot be used in the scripting system because the scripting system cannot support Int64 type parameters\.

For example the TStream and its descendant classes cannot be used in the scripting system because many of the methods use the Int64 parameter type\. The other limitations are that you cannot define classes or records because the scripting system is typeless\.

### <a id="CopyFile_function"></a>CopyFile function

__Declaration__  
The CopyFile function copies a file specified by the original filename to a new file with the new filename\. The function returns a true value if the CopyFile fuhnction is successful otherwise a false value is returned\.

The FailIfExists parameter controls how an existing target file can be overrwritten or not with the new source file by the CopyFile function\.

- If this parameter is TRUE and the new file already exists, the function fails\.
- If this parameter is FALSE and the new file already exists, the function overwrites the existing file and succeeds\.

__Syntax__  
Function CopyFile\(SourceFileName, TargetFilename : PChar; FailIfExists : Boolean\) : Boolean;  
__DelphiScript Example__

01

Procedure CopyFromTo;

02

Var

03

    Project    : String;

04

    PathSource : String;

05

    PathTarget : String;

06

Begin

07

    PathSource := 'C:\\3M Footprints\.PcbLib';

08

    PathTarget := 'C:\\Temp\\3M Footprints\.PcbLib';

09

    CopyFile\(PathSource, PathTarget, False\);

10

End;

__See also__  
Helper Classes and Functions

### <a id="TIniFile_object"></a>TIniFile object

The TIniFile object \(derived from Borland Delphi's TIniFile class\) stores and retrieves application\-specific information and settings from a text file with an INI extension\. When you instantiate the TIniFile object, you pass as a parameter to the TIniFile's constructor, the filename of the INI file\. If the file does not exist, the ini file is created automatically\.

You then can read values using ReadString, ReadInteger, or ReadBool methods\. Alternatively, if you want to read an entire section of the INI file, you can use the ReadSection method\. As well, you can write values using WriteBool, WriteInteger, or WriteString methods\.

Each of the Read routines takes three parameters\. The first parameter identifies the section of the INI file\. The second parameter identifies the value you want to read, and the third is a default value in case the section or value doesn't exist in the INI file\. Similarly, the Write routines will create the section and/or value if they do not exist\.

__Script example__  
See at the end of this page the example code which creates an INI file\.  
__TIniFile Methods__  
DeleteKey\(const Section, Ident: String\);  
EraseSection\(const Section: String\);  
   
ReadSection \(const Section: String; Strings: TStrings\);  
ReadSections\(Strings: TStrings\);  
ReadSectionValues\(const Section: String; Strings: TStrings\);  
   
ReadString\(const Section, Ident, Default: String\): String;  
WriteString\(const Section, Ident, Value: String\);   
   
UpdateFile;

__Derived from TCustomIniFile__  
Create\(const FileName: String\);  
ReadBinaryStream\(const Section, Name: string; Value: TStream\): Integer;  
ReadBool \(const Section, Ident: String; Default: Boolean\): Boolean ;  
ReadDate \(const Section, Ident: String; Default: TDateTime\): TDateTime;  
ReadDateTime \(const Section, Ident: String; Default: TDateTime\): TDateTime;  
ReadFloat \(const Section, Ident: String; Default: Double\): Double;  
ReadInteger\(const Section, Ident: String; Default: Longint\): Longint;  
ReadTime \(const Section, Ident: String; Default: TDateTime\): TDateTime;  
SectionExists \(const Section: String\): Boolean;  
   
WriteBinaryStream\(const Section, Name: string; Value: TStream\);  
WriteBool\(const Section, Ident: String; Value: Boolean\);   
WriteDate\(const Section, Ident: String; Value: TDateTime\);  
WriteDateTime\(const Section, Ident: String; Value: TDateTime\);  
procedure WriteFloat\(const Section, Ident: String; Value: Double\);  
WriteInteger\(const Section, Ident: String; Value: Longint\);  
WriteTime\(const Section, Ident: String; Value: TDateTime\);  
ValueExists \(const Section, Ident: String\): Boolean;

__Derived from TObject__  
AfterConstruction  
BeforeDestruction  
ClassInfo  
ClassName  
ClassNameIs  
ClassParent  
ClassType  
CleanupInstance  
DefaultHandler  
Destroy  
Dispatch  
FieldAddress  
Free  
FreeInstance  
GetInterface  
GetInterfaceEntry  
GetInterfaceTable  
InheritsFrom  
InitInstance  
InstanceSize  
MethodAddress  
MethodName  
NewInstance  
SafeCallException

__Example of an Ini file creation__

01

Procedure WriteToIniFile\(AFileName : String\);

02

Var

03

    IniFile : TIniFile;

04

    I,J     : Integer;

05

Begin

06

    IniFile := TIniFile\.Create\(AFileName\);

07

    For I := 1 to 2 Do

08

       For J := 1 to 2 Do

09

          IniFile\.WriteString\('Section'\+IntToStr\(I\),

10

          'Key' \+ IntToStr\(I\) \+ '\_' \+ IntToStr\(J\),

11

          'Value' \+ IntToStr\(I\)\);

12

    IniFile\.Free;

13

  

14

    \(\* The INIFILE object generates a text file of the

15

       following format;

16

    \[Section1\]

17

    Key1\_1=Value1

18

    Key1\_2=Value1

19

    \[Section2\]

20

    Key2\_1=Value2

21

    Key2\_2=Value2

22

    \*\)

23

End;

__See also__  
Helper Classes and Functions  
Refer to the IniFileEg script example in the \\Examples\\Scripts\\General\\ folder\.

### <a id="TList_Object"></a>TList Object

The TList class stores an array of pointers to objects\. You can create an instance of a TList object and you can add, sort or delete individual objects from this TList object in your script in Altium Designer for example\.  
__TList Properties__  
Capacity  
Count  
Items  
List  
__TList methods__  
Add\(Item: Pointer\): Integer;  
Assign\(ListA: TList; AOperator: TListAssignOp = laCopy; ListB: TList = nil\);  
Clear  
Delete\(Index: Integer\);  
Destroy  
Exchange\(Index1, Index2: Integer\);  
Expand: TList;  
Extract\(Item: Pointer\): Pointer;  
First: Pointer;  
IndexOf  
IndexOf\(Item: Pointer\): Integer;  
function Last: Pointer;  
Move\(CurIndex, NewIndex: Integer\);  
Pack  
Remove\(Item: Pointer\): Integer;  
Sort  
__Methods derived from TObject__  
AfterConstruction  
BeforeDestruction  
ClassInfo  
ClassName  
ClassNameIs  
ClassParent  
ClassType  
CleanupInstance  
Create  
DefaultHandler  
Dispatch  
FieldAddress  
Free  
FreeInstance  
GetInterface  
GetInterfaceEntry  
GetInterfaceTable  
InheritsFrom  
InitInstance  
InstanceSize  
MethodAddress  
MethodName  
NewInstance  
SafeCallException

__Example__

1

//The following code adds an object to TheList container if the object is not in the list\.

2

Begin

3

    If TheList\.IndexOf\(AnObject\)=\-1 Then

4

        TheList\.Add\(AnObject\);

5

    // do something

6

    TheList\.Remove\(AnObject\);

7

End;

__See also__  
Helper Classes and Functions

### <a id="TStringList_object"></a>TStringList object

The TStringList object maintains a list of strings\. You can create an instance of a TStringList object and you can add, sort or delete individual strings from this object in your script\.  
If you need to do a customized sorting of the TStringList container, you need to write your own sorting routine\. See examples below\.

__TStringList Properties__  
Capacity: Integer;  
CaseSensitive: Boolean;  
Count: Integer;  
Duplicates: TDuplicates;  
Objects\[Index: Integer\]: TObject;  
Sorted: Boolean;  
Strings\[Index: Integer\]: string;

__Derived from TStrings__  
CommaText: string;  
DelimitedText: string;  
Delimiter: Char;  
Names\[Index: Integer\]: string;  
QuoteChar: Char;  
StringsAdapter: IStringsAdapter;  
Text: string;  
Values\[const Name: string\]: string;

__TStringList Methods__  
Add\(const S: string\): Integer;  
AddObject\(const S: string; AObject: TObject: Integer\);  
Clear  
Delete\(Index: Integer\);   
Destroy  
Exchange\(Index1, Index2: Integer\);  
Find\(const S: string; var Index: Integer\): Boolean;   
IndexOf\(const S: string\): Integer;  
Insert\(Index: Integer; const S: string\);  
InsertObject\(Index: Integer; const S: string; AObject: TObject\);  
Sort

__Methods derived from TStrings__  
AddStrings\(Strings: TStrings\);  
Append\(const S: string\);  
Assign\(Source: TPersistent\);  
BeginUpdate  
EndUpdate  
Equals\(Strings: TStrings\): Boolean;  
GetText: PChar;  
IndexOfName\(const Name: string\): Integer;  
IndexOfObject\(AObject: TObject\): Integer;  
LoadFromFile\(const FileName: string\);  
LoadFromStream\(Stream: TStream\);  
Move\(CurIndex, NewIndex: Integer\);  
SaveToFile\(const FileName: string\);   
SaveToStream\(Stream: TStream\);   
SetText\(Text: PChar\);

__Methods derived from TPersistent__  
GetNamePath

__Methods derived from TObject__  
AfterConstruction  
BeforeDestruction  
ClassInfo  
ClassName  
ClassNameIs  
ClassParent  
ClassType  
CleanupInstance  
Create  
DefaultHandler  
Dispatch  
FieldAddress  
Free  
FreeInstance  
GetInterface  
GetInterfaceEntry  
GetInterfaceTable  
InheritsFrom  
InitInstance  
InstanceSize  
MethodAddress  
MethodName  
NewInstance  
SafeCallException

__Example__

[view source](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#viewSource)[print](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#printSource)[?](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#about)

01

Procedure TDialogForm\.FormCreate\(Sender: TObject\);

02

Var

03

    StringsList : TStringList;

04

    Index       : Integer;

05

Begin

06

    StringsList := TStringList\.Create;

07

    Try

08

        StringsList\.Add\('Capacitors'\);

09

        StringsList\.Add\('Resistors'\);

10

        StringsList\.Add\('Antennas'\);

11

        StringsList\.Sort;

12

  

13

        // The Find method will only work on sorted lists\.

14

        If StringsList\.Find\('Resistor', Index\) then

15

        Begin

16

            ListBox\.Items\.AddStrings\(StringsList\);

17

            Label\.Caption := 'Antennas has an index value of ' \+ IntToStr\(Index\);

18

        End;

19

        Finally

20

            StringsList\.Free;

21

        End;

22

    End;

23

End;

__Example of a customized sorting routine__  
Refer to the Netlister script example in the \\Examples\\Scripts\\WSM\\ folder of the Altium Designer installation\.  
__See also__  
Helper Classes and Functions  
 

# Technical Reference \- Schematic API

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Technical Reference \- Schematic API for version 22](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Altium Designer API Reference](https://www.altium.com/documentation/altium-designer/altium-design-software-api-reference?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

The Schematic Application Programming Interface \(API\) reference details the object interfaces for Schematic objects such as schematic documents and schematic design objects\.

The Altium Designer scripting system implements a subset of the complete Altium Designer API and its Object Interfaces\. The [Altium DXP Developer](https://www.altium.com/en/developer), used for developing Altium Designer server Extensions, has access to the full Altium Designer API via a set of API SDK source units\.

## The Schematic Object Model and Functions 

The Schematic API consists of the Schematic Object model and Schematic API functions\. The Schematic API is made accessible by the Schematic Editor in Altium Designer\. The Schematic design object interfaces and methods are available in all script languages supported by Altium Designer\.

### Object Interfaces

An interface is basically a list of methods that a class declares it implements — that is, each method in the interface is implemented in the corresponding class\. While interfaces are declared like classes, they cannot be directly instantiated and do not have their own method definitions\. The Schematic design objects are wrapped by their corresponding Schematic interfaces, which makes it possible to manipulate those objects by scripts and server code\.