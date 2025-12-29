#### Methods

##### DM\_AddDocumentToActiveProject method

\(IWorkspace interface\)  
__Syntax__  
Procedure DM\_AddDocumentToActiveProject\(DocumentPath : WideString\);  
__Description__  
This method adds an existing document with its valid full path into an active project within Altium Designer\.  
__Example__  
__See also__  
IWorkspace

##### DM\_AddOutputLine method

\(IWorkspace interface\)  
__Syntax__  
Procedure DM\_AddOutputLine\(MessageLine : PChar;ReplaceLastLine : Boolean = False\);  
__Description__  
Outputs the line to the output’s dialog\. An Internal operation\.  
__Example__  
__See also__  
IWorkspace

##### DM\_ChangeManager method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_ChangeManager : IChangeManager;  
__Description__  
Returns the Engineering Change Order Manager interface object which compares with two projects and creates an ECO to perform a pin swapping process to synchronize the specified two projects\.  
__Example__  
__See also__  
IWorkspace

##### DM\_ClearOutputLines method

\(IWorkspace interface\)  
__Syntax__  
Procedure DM\_ClearOutputLines;  
__Description__  
Clears out the Output Memo\. An Internal operation\.  
__Example__  
__See also__  
IWorkspace  
__Description__  
__See also__  
IClient interface  
IWorkSpace interface

##### DM\_CreateNewDocument method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_CreateNewDocument \(ADocKind : WideString\) : WideString;  
__Description__  
This method creates a new document based on the Document Kind\. The Kinds include – ‘PCBLIB’,’PCB’,’SCH’,’SCHLIB’ and so on depending on which document servers are installed in Altium Designer\.  
__DelphiScript Example__

1

//Creating a new PCB document in Altium Designer

2

Var

3

    WSM         : IWorkSpace;

4

Begin

5

    WSM := GetWorkSpace;

6

    If WSM = Nil Then Exit;

7

    WSM\.DM\_CreateNewDocument\('PCB'\);

8

End;

__See also__  
IWorkspace

##### DM\_FileOwnerShip\_BulkWarnStart method

\(IWorkspace interface\)  
__Syntax__  
Procedure   DM\_FileOwnership\_BulkWarnStart;  
__Description__  
__Example__  
   
__See also__  
IWorkspace interface

##### DM\_FileOwnerShip\_BulkWarnEnd method

\(IWorkspace interface\)  
__Syntax__  
Procedure   DM\_FileOwnership\_BulkWarnEnd\(AWarningLevel : TFileOwnershipWarningLevel\);  
__Description__  
__Example__  
   
__See also__  
IWorkspace interface

##### DM\_FileOwnerShip\_BulkWarnRegister method

\(IWorkspace interface\)  
__Syntax__  
Function    DM\_FileOwnership\_BulkWarnRegister\(AFileName : TDynamicString\) : Boolean;  
__Description__  
__Example__  
   
__See also__  
IWorkspace interface

##### DM\_FocusedDocument method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_FocusedDocument : IDocument;  
__Description__  
Returns the focussed document interface object \(if any\) in Altium Designer\. A focussed document is a document that is currently open and in focus \(this document is active\)\.  
__Example__  
__See also__  
IWorkspace

##### DM\_FocusedProject method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_FocusedProject : IProject;  
__Description__  
Returns the focussed project \(if any\) in Altium Designer\.  
__Example__  
__See also__  
IWorkspace

##### DM\_FreeDocumentsProject method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_FreeDocumentsProject : IProject;  
__Description__  
Returns the __IProject__ interface that contains free documents\. A free document is a standalone document that lives in the Free Documents project\.  
__Example__  
__See also__  
IWorkspace

##### DM\_GenerateUniqueID method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_GenerateUniqueID : WideString;  
__Description__  
Invoke this method, and a generated Unique ID will be returned which can be used for any newly created or existing object in Altium Designer\. Objects in Schematic have their own Unique IDs which are tracked by the synchronizator so that the objects on the PCB document are sychronized to their equivalents in a corresponding schematic project\.

__Example \- an incomplete example that assigns new UIDs to Schematic components__

01

// get the workspace manager interface so you can 

02

// generate unique ids\.\.\.

03

WSM := GetWorkspace;

04

If WSM = Nil Then Exit;

05

// get the schematic server interface

06

If SchServer = Nil Then Exit;

07

// get the current sch sheet

08

CurrentSheet := SchServer\.GetCurrentSchDocument;

09

If CurrentSheet = Nil Then Exit;

10

  

11

// Set up an iterator to look for components

12

// on a schematic document\.

13

Iterator := CurrentSheet\.SchIterator\_Create;

14

Iterator\.AddFilter\_ObjectSet\(MkSet\(eSchComponent\)\);

15

  

16

Try

17

    Comp := Iterator\.FirstSchObject;

18

    While Compt <> Nil Do

19

    Begin

20

        Comp\.UniqueID := WSM\. DM\_GenerateUniqueID;

21

        Comp := Iterator\.NextSchObject;

22

    End;

23

Finally

24

    CurrentSheet\.SchIterator\_Destroy\(Iterator\);

25

End;

__See also__  
IWorkspace

##### DM\_GetDefaultPcbType method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetDefaultPcbType : WideString;  
__Description__  
__Example__  
__See also__  
IWorkspace

##### DM\_GetDocumentFromPath method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetDocumentFromPath\(DocumentPath : WideString\) : IDocument;  
__Description__  
Retrieves the IDocument interface object by passing the full document path to this document\. With this IDocument interface, you have access to its functionality, such as compiling the document itself\.  
__Example__  
__See also__  
IWorkspace

##### DM\_GetOutputLine method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetOutputLine\(Index : Integer\) : WideString;  
__Description__  
__Example__  
__See also__  
IWorkspace

##### DM\_GetOutputLineCount method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetOutputLineCount : Integer;  
__Description__  
Returns the number of output lines in the Output dialog\. An Internal operation\.  
__Example__  
__See also__  
IWorkspace

##### DM\_GetProjectFromPath method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetProjectFromPath \(ProjectPath : WideString\) : IProject;  
__Description__  
Retrieves the IProject interface object by passing the full project path to this project\. With this IProject interface, you have access to its interface methods\. A project is a container that has links to associated design documents in an organized manner\.  
__Example__  
__See also__  
IWorkspace

##### DM\_GetRecoveryInterval method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetRecoveryInterval : Integer;  
__Description__  
Returns the number of minutes as the interval when the recovery mechanism kicks in\.  
__Example__  
__See also__  
IWorkspace

##### DM\_GetRecoveryIsEnabled method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetRecoveryIsEnabled : Boolean;  
__Description__  
Returns a Boolean value whether the recovery mechanism is active or not\.  
__Example__  
__See also__  
IWorkspace

##### DM\_ImageIndexForDocumentKind method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_ImageIndexForDocumentKind\(ADocumentKind : WideString\) : Integer;  
__Description__  
Returns the image index depending on the document kind for example PCB, CAM etc\.  
__Example__  
__See also__  
IWorkspace  
Image Index Table

##### DM\_InstalledLibraries method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_InstalledLibraries \(Index : Integer\) : IDocument;  
__Description__  
Returns an indexed library \(currently installed in Altium Designer only\), to be used in conjunction with the DM\_InstalledLibraryCount\.  
__Example__  
__See also__  
IWorkspace interface  
DM\_InstalledLibraryCount method

##### DM\_InstalledLibraryCount method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_InstalledLibraryCount : Integer;  
__Description__  
Returns the number of installed libraries in Altium Designer\.  
__Example__  
__See also__  
IWorkspace

##### DM\_MessagesManager method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_MessagesManager : IMessagesManager;  
__Description__  
This function returns you the interface to the Messages panel in Altium Designer\.  
__Example__  
__See also__  
IWorkspace interface  
IMessagesManager interface

##### DM\_OpenProject method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_OpenProject \( ProjectPath : WideString;Const Show : Boolean\) : IProject;  
__Description__  
Opens a project with the full project path and set this project in focus depending on its Show parameter\.  
__Example__  
__See also__  
IWorkspace

##### DM\_OptionsStorage method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_OptionsStorage : IOptionsStorage;  
__Description__  
Represents a options storage container where Altium Designer can use to retrieve and store options for storing parameters of EDE options such as Toolchain name, folder and default options and project options\.  
__Example__  
__See also__  
IWorkspace

##### DM\_ProjectCount method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_ProjectCount : Integer;  
__Description__  
Returns the number of projects open in Altium Designer\.  
__Example__  
__See also__  
IWorkspace

##### DM\_Preferences method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_Preferences : IWorkspacePreferences;  
__Description__  
__Example__  
   
__See also__  
IWorkspace interface  
IWorkspacePreferences interface

##### DM\_Projects method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_Projects \(Index : Integer\) : IProject;  
__Description__  
Returns the indexed project \(currently loaded in Altium Designer only\), to be used in conjunction with the DM\_ProjectCount interface\.  
__Example__  
__See also__  
IWorkspace

##### DM\_PromptForDefaultPcbType method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_PromptForDefaultPcbType\(Var PcbType : WideString\) : Boolean;  
__Description__  
__Example__  
__See also__  
IWorkspace

##### DM\_SetRecoveryParameters method

\(IWorkspace interface\)  
__Syntax__  
Procedure DM\_SetRecoveryParameters\(IsEnabled : Boolean; Interval : Integer\);  
__Description__  
Set the interval when the autosave / recovery mechanism in Altium Designer kicks in\. The interval is in minutes, and whether to enable the recovery mechanism\.  
__Example__  
__See also__  
IWorkspace

##### DM\_ShowMessageView method

\(IWorkspace interface\)  
__Syntax__  
Procedure DM\_ShowMessageView;  
__Description__  
Invoke this method to refresh the Message panel\.  
__Example__  
__See also__  
IWorkspace

##### DM\_ShowToDoList method

\(IWorkspace interface\)  
__Syntax__  
Procedure DM\_ShowToDoList;  
__Description__  
This method displays the To Do List manager panel\. This To Do List panel can be used to define your To Dos\.  
__Example__  
__See also__  
IWorkspace

##### DM\_ViolationTypeDescription method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_ViolationTypeDescription\(ErrorKind : TErrorKind\) : WideString;  
__Description__  
Returns the violation type description string with the error kind value passed in\. Check the TErrorKind for its range of values\.  
__Example__  
__See also__  
IWorkspace

##### DM\_ViolationTypeGroup method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_ViolationTypeGroup \(ErrorKind : TErrorKind\) : TErrorGroup;  
__Description__  
Returns the error group for which this error kind parameter belongs to\. Check the TErrorGroup type for its range of values\.  
__Example__  
__See also__  
IWorkspace

##### DM\_WorkspaceFileName method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_WorkspaceFileName : WideString;  
__Description__  
Returns the filename only of the workspace\.  
__Example__  
__See also__  
IWorkspace

##### DM\_WorkspaceFullPath method

\(IWorkspace interface\)  
__Syntax__  
Function DM\_WorkspaceFullPath : WideString;  
__Description__  
Returns the full path of the workspace\.  
__Example__  
__See also__  
IWorkspace

### <a id="IBus_interface"></a>IBus interface

__Overview__  
The IBus interface represents a bus object on the schematic sheet\. Buses are special graphical elements that represent a common pathway for multiple signals on a schematic document\. Buses have no electrical properties, and they must be correctly identified by net labels and ports\.

When a schematic document is compiled, bus objects have inferred objects \(wires with netlabels on them\) in memory that aids the connectivity and navigation features within Altium Designer\.

__IBus methods__  
DM\_Wires  
DM\_Sections  
DM\_WireCount  
DM\_SectionCount  
DM\_Scope  
DM\_Electric  
DM\_SignalType  
DM\_FullBusName  
DM\_BusName  
DM\_BusRange1  
DM\_BusRange2  
DM\_BusRangeValue1  
DM\_BusRangeValue2  
DM\_BusKind  
DM\_BusWidth  
DM\_RangeDefinedByValue  
DM\_IsLocal

__IBus properties__