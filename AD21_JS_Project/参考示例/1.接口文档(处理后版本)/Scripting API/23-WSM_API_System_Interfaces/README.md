# WSM API System Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [WSM API System Interfaces for version 22](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Workspace Manager API](https://www.altium.com/documentation/altium-designer/technical-reference-workspace-manager-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


The Workspace Manager API System Interfaces reference includes the following sections and content:

[__System Interfaces__](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#System Interfaces)

[__Configuration Constraints Interfaces__](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#Configuration Constraints Interfaces)

[__Signals Manager interfaces__](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#Signals Manager interfaces)

[IChangeManager interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IChangeManager interface)  
[IComponentMappings interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IComponentMappings interface)  
[ICustomClipboardFormat interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ICustomClipboardFormat interface)  
[IDoToManager](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IDoToManager)  
[IDocumentBackups interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IDocumentBackups interface)  
[IECO interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IECO interface)  
[IMessagesManager](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IMessagesManager)  
[IMessageItem interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IMessageItem interface)  
[ISearchPath interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISearchPath interface)  
[ISymbolGenerator](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISymbolGenerator)  
[IVCSProjectAccessor interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IVCSProjectAccessor interface)  
[IVersionControlServer interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IVersionControlServer interface)  
[IVhdlEntity interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IVhdlEntity interface)  
[IWorkspacePreferences](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IWorkspacePreferences)

[IConfiguration interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IConfiguration interface)  
[IConstraintGroup interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IConstraintGroup interface)  
[IConstraint interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IConstraint interface)  
[IInstalledConstraintFiles interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IInstalledConstraintFiles interface)  
[IOutputer interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IOutputer interface)  
[IStrings interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IStrings interface)  
[IWSM\_OutputJobDocument interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IWSM_OutputJobDocument interface)  
[IWSM\_ServerInterface interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IWSM_ServerInterface interface)  
[IDifferentialPair interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IDifferentialPair interface)  
[IDatabaseLibDocument interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IDatabaseLibDocument interface)

[IEntityPort interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IEntityPort interface)  
[IExternalParameter interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IExternalParameter interface)  
[IInstance interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IInstance interface)  
[IInstancePort interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IInstancePort interface)  
[ISignal interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISignal interface)  
[ISignalLink](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISignalLink)  
[ISignalManager interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISignalManager interface)  
[ISignalNode](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISignalNode)  
[ISubNet interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISubNet interface)

 



__Overview__  
The IChangeManager interface represents the change manager where you can execute an ECO of pins to be swapped for the target component of the target document\.

__Interface Methods__  
Procedure DM\_SetProject1\(AProject : IProject\);                        
Procedure DM\_SetProject2\(AProject : IProject\);                        
Function  DM\_ExecuteChanges\(IsSilent : LongBool\) : LongBool;          
Procedure DM\_CreateECO\_SwapPin        \(TargetDocument : IDocument;  
                                       TargetComponent: IComponent;  
                                       TargetPin      : IPin;  
                                       NewPinNumber   : WideString;  
                                       OldPinNet      : WideString;  
                                       NewPinNet      : WideString\);  
__See also__  
Workspace Manager Interfaces  
IDocument interface  
IComponent interface  
IPin interface


__Overview__  
The IComponentMappings interface represents the mapping of source components and target components in schematic and PCB documents\.

__Interface Methods__

__Method__

__Description__

Function DM\_UnmatchedSourceComponent\(Index : Integer\) : IComponent;

Returns the indexed unmatched source component, that is, a target component could not be found to map to this source component\.  
Use the DM\_UnmatchedSourceComponentCount function\.

Function DM\_UnmatchedTargetComponent\(Index : Integer\) : IComponent;

Returns the indexed unmatched target component, that is, a source component could not be found to map to the target component\. Use the DM\_UnmatchedTargetComponentCount function\.

Function DM\_MatchedSourceComponent  \(Index : Integer\) : IComponent;

Returns the indexed matched source component \(that has been matched with a target component\)\. Use the DM\_MatchedSourceComponentCount function\.

Function DM\_MatchedTargetComponent  \(Index : Integer\) : IComponent;

Returns the indexed matched source component \(that has been matched with a target component\)\. Use the DM\_MatchedTargetComponentCount function\.

Function DM\_UnmatchedSourceComponentCount : Integer;

Returns the number of unmatched source components\.

Function DM\_UnmatchedTargetComponentCount : Integer;

Returns the number of unmatched target components\.

Function DM\_MatchedComponentCount: Integer;

Returns the number of matched components\.


__Overview__  
__Interface Methods__  
Function RegisterCustomClipboardFormat\(Const AFormatName : WideString\) : Longword;  
__See also__  
Workspace Manager Interfaces


__Overview__  
The __IDoToManager__ interface represents the To Do panel in Altium Designer\. This To Do list manager allows you to manage a list of what to do and assign a priority to each what to do item\.

__Interface Methods__  
Function  AddItem    \(Const AnItem  : WideString\) : LongBool;     
Function  RemoveItem \(Const AnItem  : WideString\) : LongBool;     
Function  GetItem    \(      Index   : Integer   \) : WideString;   
   
Function  GetCount                 : Integer;  
Procedure Clear;  
__Interface Properties__  
Property  Item\[Index : Integer\] : WideString Read GetItem;  
Property  Count                 : Integer   Read GetCount;  
__See also__  
Workspace Manager Interfaces


__Overview__  
   
__Interface Properties__  
Property Count : Integer  
Property Backups\[AIndex : Integer\] : WideString  
__See also__  
IClient interface


__Overview__  
The __IECO__ interface represents an Engineering Change Order interface in the Work Space Manager\.  Basically an Engineering Change Order attempts to keep a project containing source documents and its corresponding primary implementation documents synchronized\. For example a schematic project and its PCB document, every time something changes in a schematic project, it is necessary to bring the changes forward to the PCB document via the Engineering Change Order feature\.

__Interface Methods__

__Method__

__Description__

Procedure DM\_Begin;

Denotes that the ECO manager has started\.

Procedure DM\_End; 

Denotes that the ECO manager has ended\.

Function  DM\_AddObject              \(Mode : TECO\_Mode; ReferenceObject : IDMObject\)

Adds a reference object for the ECO to compare the target document against this reference document\.

Function  DM\_RemoveObject           \(Mode : TECO\_Mode; ObjectToRemove  : IDMObject\)

Removes a reference object depending on what ECO mode is\.

Function  DM\_AddMemberToObject      \(Mode : TECO\_Mode;  
ReferenceMember : IDMObject;  
ReferenceParent : IDMObject;  
TargetParent    : IDMObject\)

Adds a specific action in the ECO manager\.

Function  DM\_RemoveMemberFromObject \(Mode : TECO\_Mode;  
MemberObject    : IDMObject;  
ParentObject    : IDMObject\)

Removes a specific action in the ECO manager\.

Function  DM\_ChangeObject           \(Mode : TECO\_Mode; Kind            : TModificationKind;  
ObjectToChange  : IDMObject;  
ReferenceObject : IDMObject\)

Changes a specific action in the ECO manager\.


__Overview__  
The IMessagesManager interface represents the Messages panel in Altium Designer\.

__IMessagesManager interface table__

__IMessagesManager methods__  
AddMessage  
AddMessageParametric  
ClearMessages  
ClearMessagesOfClass  
ClearMessagesForDocument  
ClearMessageByIndex  
BeginUpdate  
EndUpdate  
MessagesCount  
Messages

__IMessagesManager properties__

__Example__

01

//Populating the Message Panel using the Workspace manager’s functionality

02

Procedure InsertMessagesIntoMessagePanel;

03

Var

04

    WSM         : IWorkSpace;

05

    MM          : IMessagesManager;

06

    ImageIndex  : Integer;

07

    F           : Boolean;

08

Begin

09

    WSM := GetWorkSpace;

10

    If WSM = Nil Then Exit;

11

     

12

    // Tick icon for the lines in the Message panel

13

    // Refer to the Image Index table in the

14

    // Workspace Manager API reference online help\.

15

    ImageIndex := 3;

16

     

17

    MM := WSM\.DM\_MessagesManager;

18

    If MM = Nil Then Exit;

19

  

20

    // Clear out messages from the Message panel\.\.\.

21

    MM\.ClearMessages;

22

    WSM\.DM\_ShowMessageView;

23

    MM\.BeginUpdate;

24

     

25

    F := False;

26

    MM\.AddMessage\(\{MessageClass             \} 'MessageClass 1',

27

                      \{MessageText              \} 'MessageText 1',

28

                      \{MessageSource            \} 'Altium Designer Message',

29

                      \{MessageDocument          \} 'Pseudo Doc 1',

30

                      \{MessageCallBackProcess   \} '',

31

                      \{MessageCallBackParameters\} '',

32

                      ImageIndex,

33

                      F\);

34

  

35

    MM\.AddMessage\(\{MessageClass             \} 'MessageClass 2',

36

                      \{MessageText              \} 'MessageText 2',

37

                      \{MessageSource            \} 'Altium Designer Message 2',

38

                      \{MessageDocument          \} 'Pseudo Doc 2',

39

                      \{MessageCallBackProcess   \} '',

40

                      \{MessageCallBackParameters\} '',

41

                      ImageIndex,

42

                      F\);

43

  

44

    MM\.EndUpdate;

45

End;

__See also__  
Image Index Table



\(IMessagesManager interface\)  
__Syntax__  
Procedure AddMessage  
\(Const MessageClass,  
       MessageText,  
       MessageSource,  
       MessageDocument,  
       MessageCallBackProcess,  
       MessageCallBackParameters     : WideString;  
       ImageIndex                    : Integer;  
       ReplaceLastMessageIfSameClass : Boolean = False;  
       MessageCallBackProcess2       : WideString = '';  
       MessageCallBackParameters2    : WideString = ''\);  
__Description__  
This method gives you the ability to access an Altium Designer Message on the Message panel:

- __MessageClass__ \- which sort of message it belongs to\. \(User defined\)
- __MessageText__ \- the message text to appears in the Message panel\.
- __MessageSource__ \- could be one of the following pre\-defined strings such as : Comparator, Back\-Annotate, Output Generator, Compiler or you can define your own MessageSource string\.
- __MessageDocument__ \- Owner Document name – normally a full path name of the document that the Message is associated with\.
- __MessageCallBackProcess__ \- process name to call back\.
- __MessageCallbackParameters__ \- parameters for the CallBackProcess\.
- __ImageIndex__ \- the index to the image depending on which Message Class\. Refer to the Image Index Table topic to check out the appropriate image for each message\.
- __ReplaceLastMessageIfSameClass__ \- \(defaults to false\)\.
- __MessageCallBackProcess2 __
- __MessageCallBackParameters2 __

__Example__  
__See also__  
IMessagesManager Interfaces


\(IMessagesManager interface\)  
__Syntax__  
Procedure AddMessageParametric\(MessageParams : PChar;MessageCallBackParameters : PChar\);  
__Description__  
Inserts a Altium Designer message in the Message panel\. Similar to the DM\_AddMessage only that you define the Name / Value blocks in the MessageParams nullterminated string:

- __Class__ – Back\-Annotate class, Error level, Differences\.
- __Text__ \- text displayed in the Message panel\.
- __Source__ \- could be one of the following: Comparator, Back\-Annotate, Output Generator, Compiler,\.
- __Document__ \- Owner Document name
- __CallBackProcess__ \- process name to call back\.
- __UserId __\- Unique ID
- __HelpFileName__ \- Name of the Help file
- __HelpTopic__ \- specific help topic string
- __ImageIndex__ \- the index to the image depending on which Message Class\.
- __'ReplaceLastMessageIfSameClass __\- Boolean\. If Same MessageClass, specify whether this class is to be overridden or not by the current message class information\.
- __MessageCallBackParameters__ – parameters for the CallBackProcess\.

__Example__  
__See also__  
IMessagesManager


\(IMessagesManager interface\)  
__Syntax__  
Procedure BeginUpdate;  
__Description__  
 Invoke this method before you wish to add Messages \(DM\_AddMessage or DM\_AddMessageParameteric methods\) to the Message panel\.  
__Example__  
__See also__  
IMessagesManager


\(IMessagesManager interface\)  
__Syntax__  
Procedure ClearMessageByIndex \( AIndex : Integer \);  
__Description__  
__Example__  
__See also__  
IMessagesManager


\(IMessagesManager interface\)  
__Syntax__  
Procedure ClearMessages;  
__Description__  
Clears out the Messages panel\.  
__Example__  
__See also__  
IMessagesManager


\(IMessagesManager interface\)  
__Syntax__  
Procedure ClearMessagesForDocument\(Const DocumentPath : WideString\);  
__Description__  
__Example__  
__See also__  
IMessagesManager


\(IMessagesManager interface\)  
__Syntax__  
Procedure ClearMessagesOfClass \(Const AMsgClass : WideString\);  
__Description__  
This method gives you the ability to clear messages of the same class type\. Various class types include Back\-Annotate class, Error level, Differences  
__Example__  
__See also__  
IMessagesManager


\(IMessagesManager interface\)  
__Syntax__  
Procedure EndUpdate;  
__Description__  
Invoke this method after you have added Messages to the Message panel\.  
__Example__  
__See also__  
IMessagesManager


\(IMessagesManager interface\)  
__Syntax__  
Function Messages\(Index : Integer\) : IMessageItem;  
__Description__  
__Example__  
__See also__  
IMessagesManager


\(IMessagesManager interface\)  
__Syntax__  
Function MessagesCount : Integer;  
__Description__  
__Example__  
__See also__  
IMessagesManager


__Overview__  
The Message Manager interface has messages if any on the messages panel\. Each message item is represented by the IMessageItem interface\.

__IMessageItem Properties__  
Property MsgClass            : WideString  
Property Text                : WideString  
Property Source              : WideString  
Property Document            : WideString  
Property MsgDateTime         : TDateTime   
Property ImageIndex          : Integer     
Property UserId              : WideString  
Property CallBackProcess     : WideString  
Property CallBackParameters  : WideString  
Property CallBackProcess2    : WideString  
Property CallBackParameters2 : WideString  
Property HelpFileName        : WideString  
Property HelpFileID          : WideString  
Property MsgIndex            : Integer     
__See also__  
IMessagesManager Interfaces


__Overview__  
The ISearchPath interface represents the paths of a project\. This ISearchPath interface has a link to the associated open project in Altium Designer\.

__Interface Methods__

__Method__

__Description__

Function    DM\_Path : WideString;

Returns the path of the focussed project in Altium Designer\.

Function    DM\_AbsolutePath      : WideString;

Returns the absolute path of the focussed project in Altium Designer\.

Function    DM\_IncludeSubFolders : Boolean;

Returns whether sub folders are included in the focussed project in Altium Designer\.

Function    DM\_Project : IProject; 

Returns the project in which this ISearchPath interface is associated with\.


__Overview__  
The ISymbolGenerator interface represents the symbol with parameters added if necessary generated by the ICoreProject interface\.  
__Important Notes__  
ICoreProject interface's DM\_CreateSymbolGenerator method returns a ISymbolGenerator interface\.  
__Interface Methods__  
Procedure DM\_ClearParameters;                         
Procedure DM\_AddParameter\(Name, Value : WideString\);  
Procedure DM\_GenerateComponent;                       
__See also__  
Workspace Manager Interfaces  
ICoreProject interface


__Overview__  
   
__Interface methods__  
Function ObjectAddress : IInterface;  
__See also__  
IClient interface  
IExternalForm interface


__Overview__  
__Interface methods__  
Function GetStatusString \(Const AObject : IDMObject\) : WideString;  
__See also__  
Workspace Manager Interfaces


__Overview__  
The IVhdlEntity interface represents the existing VHDL entity object on a VHDL document\. Basically a VHDL document can contain many VHDL entities and each entity corresponds to a schematic document\.

Since every object interface \(inherited from the IDMObject interface\) has a DM\_VHDLEntity method\. This method can be useful in cases such as determining which ports correspond to VHDL entities\.

__Interface Methods__

__Method__

__Description__

Function DM\_Name : WideString;

Returns the name of the VHDL entity\.


__Overview__  
The __IWorkspacePreferences__ interface represents the Preferences object in Altium Designer This interface details with file ownership \- that is the rights of access to a design document\.

__Interface Methods__  
Function  GetDefaultTemplateFile\(Const ADocKind : Widestring\) : Widestring;  
Function  GetFileOwnership\_Enabled : Boolean;  
Function  GetFileOwnership\_EnabledOutputDirectory : Boolean;  
Function  GetFileOwnership\_WarningLevelOpen : TFileOwnershipWarningLevel;  
Function  GetFileOwnership\_WarningLevelSave : TFileOwnershipWarningLevel;  
Function  GetDefaultLibraryPath : WideString;  
Function  GetHighlightMethodSet : THighlightMethodSet;  
Function  GetObjectsToDisplay   : TWorkspaceObjectIdSet;  
Function  GetHighlightConnectedPowerParts : Boolean;  
   
Procedure SetDefaultTemplateFile\(Const ADocKind, AFileName : Widestring\);  
Procedure SetFileOwnership\_Enabled\(AValue : Boolean\);  
Procedure SetFileOwnership\_EnabledOutputDirectory\(AValue : Boolean\);  
Procedure SetFileOwnership\_WarningLevelOpen\(AValue : TFileOwnershipWarningLevel\);  
Procedure SetFileOwnership\_WarningLevelSave\(AValue : TFileOwnershipWarningLevel\);  
__Interface Properties__  
Property  DefaultTemplateFile\[Const ADocKind   : Widestring\] : Widestring   
Property  FileOwnership\_Enabled                : Boolean   
Property  FileOwnership\_EnabledOutputDirectory : Boolean   
Property  FileOwnership\_WarningLevelOpen       : TFileOwnershipWarningLevel  
Property  FileOwnership\_WarningLevelSave       : TFileOwnershipWarningLevel  
Property  DefaultLibraryPath                   : WideString   
__See also__  
Workspace Manager Interfaces

 



__Overview__  
The IConfiguration interface represents the configuration container that contains a group of constraints which targets a specific FPGA device\.  
__Interface Methods__  
Function    DM\_Name                              : WideString;   
Function    DM\_ConstraintGroupCount              : Integer;   
Function    DM\_ConstraintGroups\(Index : Integer\) : IConstraintGroup;  
Function    DM\_ConstraintsFileCount                 : Integer;   
Function    DM\_ConstraintsFilePath\(Index : Integer\) : WideString;  
Procedure   DM\_AddConstraintFile\(AConstraintFilePath : WideString\);  
Function    DM\_GetTargetDeviceName                  : WideString;  
__See also__  
Workspace Manager Interfaces


__Overview__  
The IConstraintGroup interface represents a constraint file made up of constraints \(as IConstraint interface\)\.  
__Important notes__  
Inherited from IDMObject  interface  
__Interface Methods__  
Function   DM\_TargetKindString             : WideString;   
Function   DM\_TargetId                     : WideString;   
Function   DM\_ConstraintCount              : Integer;      
Function   DM\_Constraints\(Index : Integer\) : IConstraint;  
__See also__  
Workspace Manager Interfaces  
IConstraint interface


__Overview__  
The IConstraint interface represents the data entry in a constraint file represented by the IConstraintGroup interface\.  
__Important notes__  
Inherited from IDMObject  interface  
__Interface Methods__  
Function   DM\_Kind : WideString;  
Function   DM\_Data : WideString;  
__See also__  
Workspace Manager Interfaces  
IConstraintGroup interface


__Overview__  
The IInstalledConstraintFiles interface represents the constraint files that are installed in Altium Designer, ie available to a FPGA project\.  
__Interface Methods__  
Function  InstalledConstraintFileCount                      : Integer;     
Function  InstalledConstraintFile   \(aIndex   : Integer\)    : WideString;  
Function  ConstraintFileIsInstalled \(aPath    : WideString\) : LongBool;    
Function  DefaultConstraintFile                             : WideString;  
Function  EditInstalledConstraintFiles                      : LongBool;    
__See also__  
Workspace Manager Interfaces


__Overview__  
The IOutputer interface represents the one of the outputs of an output job within a design project\.  
__Interface Methods__  
Function    DM\_ViewName                   : WideString  
Function    DM\_EditProperties             : Boolean;  
Function    DM\_Generate\_OutputFilesTo \(OutputDirectory : WideString; ParameterOverrides : PChar\) : Boolean;  
Function    DM\_Generate\_OutputFiles   \(AGeneratedFilename : PChar\) : Boolean;  
Procedure   DM\_SetPrintScale          \(APrintScale        : Double\);  
Procedure   DM\_SetPrintMode           \(AFitPrintToPage    : Boolean\);  
Procedure   DM\_SetDocumentPath        \(ADocPath           : WideString\);   
__See also__  
Workspace Manager Interfaces  
IProject interface  
IOutputJob interface  
IWSM\_OutputJobDocument interface


__Overview__  
The IStrings interface represents the strings container – more like a list of strings\.  
__Interface Methods__  
Function GetCount : Integer;                           
Function GetItem\(Index : Integer\) : WideString;        
Function IndexOf\(Const Value : WideString\) : Integer;  
__Interface Properties__  
Property Count : Integer read GetCount;  
Property Items\[Index : Integer\] : WideString read GetItem; default;  
__See also__  
Workspace Manager Interfaces


__Overview__  
The IWSM\_OutputJobDocument interface represents the output jobs document in Altium Designer\.  
__Interface Methods__  
Function  GetState\_Outputer      \(AIndex : Integer\) : IOutputer;  
Function  GetState\_OutputerCount                    : Integer;  
   
Function  CreateOutputer      \(Const AOutputCategoryName   : WideString;  
                               Const APredefinedOutputName : WideString;  
                               Const AOutputerName         : WideString\) : IOutputer;  
Function  BeginModifyOutputer \(Const AOutputer : IOutputer \) : Boolean;    
Procedure EndModifyOutputer;  
__Interface Properties__  
Property  Outputer \[AIndex : Integer\] : IOutputer Read GetState\_Outputer;  
Property  OutputerCount               : Integer   Read GetState\_OutputerCount;  
__See also__  
Workspace Manager Interfaces  
IProject interface  
IOutputJob interface  
IWSM\_OutputJobDocument interface


__Overview__  
The IWSM\_ServerInterface interface represents the high level mechanism that manages different output job documents\.  
__Interface Methods__  
Function  GetOutputJobDocumentByPath \(APath : WideString\) : IWSM\_OutputJobDocument;  
__Interface Properties__  
  
__See also__  
Workspace Manager Interfaces  
IProject interface  
IOutputJob interface  
IWSM\_OutputJobDocument interface


__Overview__  
The IDifferentialPair interface represents a differential pair object\.  
__Interface Methods         __  
IObjectClass methods  
__Interface Properties__  
IObjectClass properties  
__See also__  
Workspace Manager Interfaces


__Overview__  
The IDatabaseLibDocument interface represents a database library document\.

__Interface Methods__  
Procedure GetModelFieldNamesAt\(AnIndex            : Integer;  
                               ATableIndex        : Integer;  
                               AModelType         : WideString;  
                           Var AModelPathName : WideString;  
                           Var AModelRefName  : WideString;  
                           Var AOrcadModel    : Boolean\);  
Procedure InitialiseExportToDatabase \(ADatabaseFileName  : WideString\);  
Procedure FinaliseExportFromDatabase;  
Procedure DisposeIfNotShowing;  
Procedure GetOrcadLibraryDetails     \(AParseString       : WideString;  
                                      Var LibRef         : WideString;  
                                      Var LibPath        : WideString\);  
   
Function  ExportNewRecordFromIntLib  \(ATableName       : WideString;  
                                      AFieldParameters : WideString\) : WideString;  
   
Function InitialiseExportFromIntLib  \(ATableName         : WideString\) : WideString;  
Function GetConnectionString                 : WideString;  
Function GetCommandString\(ATableIndex        : Integer;  
                          AFilterText        : WideString;  
                          ASQLWhereClause    : WideString\) : WideString;  
Function GetFilterText   \(ATableIndex        : Integer;  
                          AFilterColumnNames : WideString;  
                          AFilterValue       : WideString\) : WideString;  
Function GetParametersForComponent   \(ATableIndex        : Integer;  
                                      AComponentKeys     : WideString\) : WideString;  
   
Function GetTableCount : Integer;  
Function GetFileName   : Widestring;  
   
Function GetKeyFieldCount\(ATableIndex       : Integer\)     : Integer;  
Function GetKeyField     \(AParameterName    : Boolean;  
                          ATableIndex       : Integer;  
                          AKeyIndex         : Integer\)     : WideString;  
Function GetLibraryRefFieldName\(ATableIndex       : Integer;  
                            Var AOrcadLibrary : Boolean\)     : WideString;  
Function GetLibraryPathFieldName\(ATableIndex   : Integer\)         : WideString;  
Function GetFieldCount   \(ATableIndex   : Integer\)         : Integer;  
Function GetTableNameAt  \(AnIndex       : Integer\)         : WideString;  
Function GetFieldNameAt  \(ATableIndex   : Integer;  
                          AFieldIndex   : Integer\)         : WideString;  
Function GetTableIndex   \(ATableName    : WideString\)      : Integer;  
Function TableEnabled    \(AnIndex       : Integer\)         : Boolean;  
Function DocumentObject                            : Pointer;  
Function GetItemCount\(    ACommand  : WideString;  
                      Var AnError   : WideString\)      : Integer;  
Function TableContainsColumn\(ATableIndex   : Integer;  
                             AColumnName   : WideString\)      : Boolean;  
Function IsValidSQLStatementForTable \(ATableName    : WideString;  
                                          AQuery        : WideString\)      : Boolean;  
Function LoadAllRecordsLimit                                           : Integer;  
   
Function ValidateSQLQuery            \(ASqlQuery         : WideString\)  : WideString;  
Function GetDatafilePath             \(AName             : WideString;  
                                          AType             : WideString;  
                                          ATableName        : WideString;  
                                          AComponentKeys    : WideString\)  : WideString;  
    Function GetSchLibPathForComponent   \(ATableIndex       : Integer;  
                                          AComponentKeys    : WideString\)  : WideString;  
Function GetSchLibRefForComponent\(ATableIndex       : Integer;  
                                 AComponentKeys    : WideString\)  : WideString;  
Function IsParameterDatabaseKey\(ATableIndex       : Integer;  
                                AParameterName    : WideString\)  : Boolean;  
   
Function ObjectAddress           : Pointer;  
Function GetLibrarySearchPath    : WideString;  
Function GetSearchSubDirectories : Boolean;  
Function OrcadDelimiter           : Char;  
__Interface Properties__  
IObjectClass properties  
__See also__  
Workspace Manager Interfaces

 



__Overview__  
__Important notes__  
·          Inherited from ISignalNode interface  
__Interface Methods__  
·          All methods from ISignalNode interface\.  
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignalNode interface


__Overview__  
The IExternalParameter interface defines the external parameter object\.

__Interface Methods__

__Method__

__Description__

Function  DM\_GetSection : WideString;

Returns the Section string of the external parameter interface\.

Function  DM\_GetName : WideString;

Returns the Name string of the external parameter interface\.

Function  DM\_GetValue : WideString;

Returns the Value string of the external parameter interface\.

Procedure DM\_SetValue\(AValue : WideString\);

Sets the new value string for this external parameter\.


__Overview__  
__Interface Methods__  
Function    DM\_Part         : IPart;                       
Function    DM\_SheetSymbol  : ISheetSymbol;                
Function    DM\_Ports \(Index : Integer\) :  IInstancePort;   
Function    DM\_PortCount    : Integer;                     
Function    DM\_Designator   : WideString;                  
Function    DM\_InstanceType : WideString;                  
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
IPart interface  
ISheetSymbol interface  
IInstancePort interface


__Overview__  
__Important notes__  
·          Inherited from ISignalNode interface  
__Interface Methods__  
·          All methods from ISignalNode interface\.  
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignalNode interface


__Overview__  
__Interface Methods__  
Function    DM\_Namers     \(Index : Integer\) : ISignalNode;         
Function    DM\_SubNets    \(Index : Integer\) : ISubNet;             
Function    DM\_DriverLinks\(Index : Integer\) : ISignalLink;         
Function    DM\_TargetLinks\(Index : Integer\) : ISignalLink;         
Function    DM\_NamerCount      : Integer;                          
Function    DM\_SubNetCount     : Integer;                          
Function    DM\_DriverLinkCount : Integer;                          
Function    DM\_TargetLinkCount : Integer;                          
Function    DM\_DriverBits \(BitNo,Index : Integer\) : ISignalNode;   
Function    DM\_TargetBits \(BitNo,Index : Integer\) : ISignalNode;   
Function    DM\_DriverBitCount\(BitNo : Integer\) : Integer;          
Function    DM\_TargetBitCount\(BitNo : Integer\) : Integer;          
Function    DM\_Prefix          : WideString;                       
Function    DM\_Range1          : WideString;                       
Function    DM\_Range2          : WideString;                       
Function    DM\_RangeValue1     : Integer;                          
Function    DM\_RangeValue2     : Integer;                          
Function    DM\_BusKind         : TBusKind;                         
Function    DM\_Width           : Integer;                          
Function    DM\_RangeMax        : Integer;                          
Function    DM\_RangeMin        : Integer;                          
Function    DM\_PrimaryNode     : ISignalNode;                      
Function    DM\_PowerNode       : ISignalNode;                      
Function    DM\_PowerName       : WideString;                       
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignalNode interface  
ISubNet interface  
ISignalLink interface  
TBusKind interface


__Overview__  
__Interface Methods__  
Function    DM\_DriverNode              : ISignalNode;  
Function    DM\_TargetNode              : ISignalNode;  
Function    DM\_DriverSignal            : ISignal;      
Function    DM\_DriverNodeRange1        : WideString;   
Function    DM\_DriverNodeRange2        : WideString;   
Function    DM\_DriverNodeRangeValue1   : Integer;      
Function    DM\_DriverNodeRangeValue2   : Integer;      
Function    DM\_TargetSignal            : ISignal;      
Function    DM\_TargetNodeRange1        : WideString;   
Function    DM\_TargetNodeRange2        : WideString;   
Function    DM\_TargetNodeRangeValue1   : Integer;      
Function    DM\_TargetNodeRangeValue2   : Integer;      
Function    DM\_DriverRangeMax          : Integer;      
Function    DM\_DriverRangeMin          : Integer;      
Function    DM\_TargetRangeMax          : Integer;      
Function    DM\_TargetRangeMin          : Integer;      
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignal interface  
ISignalNode interface


__Overview__  
__Interface Methods__  
Function    DM\_SubNets       \(Index : Integer\) : ISubNet;      
Function    DM\_Instances     \(Index : Integer\) : IInstance;    
Function    DM\_InstanceKinds \(Index : Integer\) : IInstance;    
Function    DM\_Signals       \(Index : Integer\) : ISignal;      
Function    DM\_EntityPorts   \(Index : Integer\) : IEntityPort;  
   
Function    DM\_SubNetCount       : Integer;                    
Function    DM\_InstanceCount     : Integer;                    
Function    DM\_InstanceKindCount : Integer;                    
Function    DM\_SignalCount       : Integer;                    
Function    DM\_EntityPortCount   : Integer;                    
__See also__  
Workspace Manager Interfaces  
ISubNet interface  
IInstance interface  
ISignal interface  
IEntityPort interface


__Overview__  
__Interface Methods__  
Function    DM\_NetItem              : INetItem;                
Function    DM\_SubNet               : ISubNet;                 
Function    DM\_GetDescription       : WideString;              
Function    DM\_GetName              : WideString;              
Function    DM\_Direction            : TSignalDirection;        
Function    DM\_IsDriver             : LongBool;                
Function    DM\_Range1               : WideString;              
Function    DM\_Range2               : WideString;              
Function    DM\_RangeValue1          : Integer;                 
Function    DM\_RangeValue2          : Integer;                 
Function    DM\_RangeMax             : Integer;                 
Function    DM\_RangeMin             : Integer;                 
Function    DM\_BusIndex             : Integer;                 
Function    DM\_Width                : Integer;                 
   
Function    DM\_TargetLinks   \(Index : Integer\) : ISignalLink;  
Function    DM\_DriverLinks   \(Index : Integer\) : ISignalLink;  
Function    DM\_TargetLinkCount      : Integer;                 
Function    DM\_DriverLinkCount      : Integer;                 
Function    DM\_Signal               : ISignal;                 
Function    DM\_EntityPort           : IEntityPort;             
Function    DM\_ConstantExpression   : WideString;              
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignal interface  
ISignalLink interface  
IEntityPort interface  
TSignalDirection interface


__Overview__  
__Interface Methods__  
Function    DM\_Lines            \(Index : Integer\) : ILine;        
Function    DM\_SignalLinks      \(Index : Integer\) : ISignalLink;  
Function    DM\_Signals          \(Index : Integer\) : ISignal;      
Function    DM\_Nodes            \(Index : Integer\) : ISignalNode;  
Function    DM\_PinNodes         \(Index : Integer\) : ISignalNode;  
Function    DM\_PowerObjectNodes \(Index : Integer\) : ISignalNode;  
Function    DM\_PortNodes        \(Index : Integer\) : ISignalNode;  
Function    DM\_NetLabelNodes    \(Index : Integer\) : ISignalNode;  
Function    DM\_SheetEntryNodes  \(Index : Integer\) : ISignalNode;  
Function    DM\_CrossSheetNodes  \(Index : Integer\) : ISignalNode;  
Function    DM\_LineCount            : Integer;                    
Function    DM\_SignalLinkCount      : Integer;                    
Function    DM\_SignalCount          : Integer;                    
Function    DM\_NodeCount            : Integer;                    
Function    DM\_PinNodeCount         : Integer;                    
Function    DM\_PowerObjectNodeCount : Integer;                    
Function    DM\_PortNodeCount        : Integer;                    
Function    DM\_NetLabelNodeCount    : Integer;                    
Function    DM\_SheetEntryNodeCount  : Integer;                    
Function    DM\_CrossSheetNodeCount  : Integer;                    
Function    DM\_Net                  : INet;                       
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignal interface  
ISignalNode interface  
ISignalLink interface  
ILine interface  
INet interface

## 子章节

- [Workspace Manager API: System Interfaces](01-Workspace_Manager_API_System_Interfaces.md/README.md)
- [<a id="System_Interfaces"></a>System Interfaces](02-a_id_System_Interfaces_a_System_Interfaces.md/README.md)
- [<a id="Configuration_Constraints_Interfaces"></a>Configuration Constraints Interfaces](03-a_id_Configuration_Constraints_Interfaces_a_Configuration_Constraints_Interfaces.md/README.md)
- [<a id="Signals_Manager_interfaces"></a>Signals Manager interfaces](04-a_id_Signals_Manager_interfaces_a_Signals_Manager_interfaces.md/README.md)
