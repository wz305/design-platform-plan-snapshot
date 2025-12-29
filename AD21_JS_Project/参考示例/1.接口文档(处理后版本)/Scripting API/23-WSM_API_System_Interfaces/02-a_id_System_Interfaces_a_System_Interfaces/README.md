# <a id="System_Interfaces"></a>System Interfaces

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

## 子章节

- [<a id="IChangeManager_interface"></a>IChangeManager interface](01-a_id_IChangeManager_interface_a_IChangeManager_interface.md.md)
- [<a id="IComponentMappings_interface"></a>IComponentMappings interface](02-a_id_IComponentMappings_interface_a_IComponentMappings_interface.md.md)
- [<a id="ICustomClipboardFormat_interface"></a>ICustomClipboardFormat interface](03-a_id_ICustomClipboardFormat_interface_a_ICustomClipboardFormat_interface.md.md)
- [<a id="IDoToManager"></a>IDoToManager](04-a_id_IDoToManager_a_IDoToManager.md.md)
- [<a id="IDocumentBackups_interface"></a>IDocumentBackups interface](05-a_id_IDocumentBackups_interface_a_IDocumentBackups_interface.md.md)
- [<a id="IECO_interface"></a>IECO interface](06-a_id_IECO_interface_a_IECO_interface.md.md)
- [<a id="IMessagesManager"></a>IMessagesManager](07-a_id_IMessagesManager_a_IMessagesManager.md.md)
- [<a id="IMessageItem_interface"></a>IMessageItem interface](08-a_id_IMessageItem_interface_a_IMessageItem_interface.md.md)
- [<a id="ISearchPath_interface"></a>ISearchPath interface](09-a_id_ISearchPath_interface_a_ISearchPath_interface.md.md)
- [<a id="ISymbolGenerator"></a>ISymbolGenerator](10-a_id_ISymbolGenerator_a_ISymbolGenerator.md.md)
- [<a id="IVCSProjectAccessor_interface"></a>IVCSProjectAccessor interface](11-a_id_IVCSProjectAccessor_interface_a_IVCSProjectAccessor_interface.md.md)
- [<a id="IVersionControlServer_interface"></a>IVersionControlServer interface](12-a_id_IVersionControlServer_interface_a_IVersionControlServer_interface.md.md)
- [<a id="IVhdlEntity_interface"></a>IVhdlEntity interface](13-a_id_IVhdlEntity_interface_a_IVhdlEntity_interface.md.md)
- [<a id="IWorkspacePreferences"></a>IWorkspacePreferences](14-a_id_IWorkspacePreferences_a_IWorkspacePreferences.md.md)
