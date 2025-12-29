# WSM API Design Objects

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [WSM API Design Objects for version 22](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Workspace Manager API](https://www.altium.com/documentation/altium-designer/technical-reference-workspace-manager-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


[IDMObject interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IDMObject interface)  
[IWorkspace interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IWorkspace interface)  
[IBus interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IBus interface)  
[IChannelClass interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IChannelClass interface)  
[IComponent Interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IComponent Interface)  
[IComponentClass interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IComponentClass interface)  
[IComponentImplementation interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IComponentImplementation interface)  
[ICrossSheet interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#ICrossSheet interface)  
[ILine Interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#ILine Interface)  
[INet interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#INet interface)

[INetClass interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#INetClass interface)  
[INetItem Interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#INetItem Interface)  
[INetLabel interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#INetLabel interface)  
[IObjectClass interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IObjectClass interface)  
[IParameter interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IParameter interface)  
[IParameter interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IParameter interface)  
[IPart interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IPart interface)  
[IPin interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IPin interface)  
[IPort interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IPort interface)  
[IPowerObject interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IPowerObject interface)

[IRoom interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IRoom interface)  
[IRoom Interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IRoom Interface)  
[IRule Interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IRule Interface)  
[ISheetSymbol Interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#ISheetSymbol Interface)  
[ISheetEntry interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#ISheetEntry interface)  
[ITextFrame Interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#ITextFrame Interface)  
[IViolation Interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IViolation Interface)  
[IWrapper Interface](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21#IWrapper Interface)

 


__Overview__  
The IDMObject interface is the base object interface for all object interfaces used in the Work Space Manager system extension server for Altium Designer\.

__IDMObject methods__  
DM\_CurrentSheetInstanceNumber  
DM\_FullCrossProbeString  
DM\_GeneralField  
DM\_ImageIndex  
DM\_IsInferredObject  
DM\_LocationString  
DM\_LocationX  
DM\_LocationY  
DM\_LongDescriptorString  
DM\_NetIndex\_Flat  
DM\_NetIndex\_Sheet  
DM\_NetIndex\_SubNet  
DM\_ObjectAdress  
DM\_ObjectKindString  
DM\_ObjectKindStringForCrossProbe  
DM\_OwnerDocument  
DM\_OwnerDocumentFullPath  
DM\_OwnerDocumentName  
DM\_ParameterCount  
DM\_Parameters  
DM\_PCBObjectHandle  
DM\_PrimaryCrossProbeString  
DM\_SCHObjectHandle  
DM\_SecondaryCrossProbeString  
DM\_SheetIndex\_Logical  
DM\_SheetIndex\_Physical  
DM\_ShortDescriptorString  
DM\_ValidForNavigation  
DM\_VHDLEntity

__IDMObject properties__



\(IDMObject interface\)  
__Syntax__  
Function DM\_CurrentSheetInstanceNumber : Integer;  
__Description__  
The function returns the current sheet instance number of the schematic document\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_FullCrossProbeString : WideString;  
__Description__  
The function returns the full cross probe string\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_GeneralField : Integer;  
__Description__  
The function can returns an integral value for this general field\. This General Field can be used for any purpose \- as a tag property, as an index property or as a flag to denote something\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_ImageIndex : Integer;  
__Description__  
The function returns the image index depending on what type of object the image represents\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_IsInferredObject : Boolean;  
__Description__  
The function denotes whether the object is an inferred object with respect to connective objects\. Bus and Sheet Symbols can be defined in ranges using the NetLabel \[\] and Repeat statements respectively and once the project has been compiled, inferred objects are created in memory for navigation/connective purposes\. For example, a Bus with a range of A\[0\.\.4\] ends up with five wires with A0\.\.\.A5 net labels \(only in memory\)\. This property is useful for multi\-channel projects and for sheets that have Bus objects\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_LocationString : WideString;  
__Description__  
The function returns the Location string formatted as a X,Y format or if the object kind is a Text Documnt set, then the string returned is a formatted Line: LocationY  Offset: XLocation string\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_LocationX : Integer;  
__Description__  
The function returns the location of this interface object on the X axis\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_LocationY : Integer;  
__Description__  
The function returns the location of this interface object on the Y axis\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_LongDescriptorString : WideString;  
__Description__  
The function returns the long description version string\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_NetIndex\_Flat : Integer;  
__Description__  
The function returns the net index for a flattened design\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_NetIndex\_Sheet : Integer;  
__Description__  
The function returns the netindex for a schematic sheet\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_NetIndex\_SubNet : Integer;  
__Description__  
The function returns the net index within a sub net\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_ObjectAdress : Pointer;  
__Description__  
The function returns the pointer of the interface object itself\. Also called a handle\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_ObjectKindString : WideString;  
__Description__  
The function returns the object kind string which denotes the design document type\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_ObjectKindStringForCrossProbe : WideString;  
__Description__  
The function returns the specially formatted object kind string for the cross probing mechanism\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_OwnerDocument : IDocument;  
__Description__  
The function returns the document interface object\. Refer to IDocument interface for details\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_OwnerDocumentFullPath : WideString;  
__Description__  
The function returns the full path of the document\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_OwnerDocumentName : WideString;  
__Description__  
The function returns the name of the document that this object interface is part of\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_ParameterCount : Integer;  
__Description__  
The function returns the number of parameters this object has\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_Parameters \(Index : Integer\) : IParameter;  
__Description__  
The function returns the indexed parameter object with the index parameter\. Use the IParameter interface to wrap the returned result\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_PCBObjectHandle : Integer;  
__Description__  
The function returns the object handle of a PCB object\. If void, a Nil value is returned\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_PrimaryCrossProbeString : WideString;  
__Description__  
The function returns the primary cross probe string\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_SCHObjectHandle : Pointer;  
__Description__  
The function returns the object handle of a Schematic object\. If void, a zero value is returned\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_SecondaryCrossProbeString : WideString;  
__Description__  
The function returns the secondary cross probe string\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_SheetIndex\_Logical : Integer;  
__Description__  
The function returns the sheet index for a logical design \(multi – channel designs for example\)\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_SheetIndex\_Physical : Integer;  
__Description__  
The function returns the sheet index for a physical design\. \(that have unique designators\)  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_ShortDescriptorString : WideString;  
__Description__  
The function returns the short description version string\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_ValidForNavigation : Boolean;  
__Description__  
The function toggles whether navigation is valid for this object\. Navigation is performed on net aware objects such as components, nets and busses\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
Function DM\_VHDLEntity : IVHDLEntity;  
__Description__  
The function returns the VHDL entity interface object if it exists on a VHDL document\. Basically every object interface has an access to this VHDL entity interface, so to check whether VHDL entity exists for this particular object, you can check out the Name field within the IVHDLEntity interface\.  
__See also__  
IDMObject interface


\(IDMObject interface\)  
__Syntax__  
   
__Description__  
__Example__  
   
__See also__  
IClient interface  
IDMObject interface



\(IDMObject interface\)  
__Syntax__  
   
__Description__  
__Example__  
   
__See also__  
IClient interface  
IVCSProjectAccessor interface


__Overview__  
The __IWorkspace__ interface represents the Work\-Space manager in the Altium Designer which deals with project and documents and their related attributes and options\. This interface object is the starting point and upon querying this object, it can return currently open projects, number of projects, installed libraries, and create a new document for example\.

Remember the projects need to be compiled first, before you can invoke the __GetWorkSpace__ function to obtain the __IWorkSpace__ interface and its descendant interfaces which represent actual objects in Altium Designer\.

It is highly recommended not to hold an interface of the Workspace manager, but re\-query the workspace manager everytime the access to the information within is required\.

__IWorkspace methods__  
DM\_AddDocumentToActiveProject  
DM\_AddOutputLine  
DM\_ChangeManager  
DM\_ClearOutputLines  
DM\_CreateNewDocument  
DM\_FileOwnership\_BulkWarnEnd  
DM\_FileOwnership\_BulkWarnRegister  
DM\_FileOwnership\_BulkWarnStart  
DM\_FocusedDocument  
DM\_FocusedProject  
DM\_FreeDocumentsProject  
DM\_GenerateUniqueID  
DM\_GetDefaultPcbType  
DM\_GetDocumentFromPath  
DM\_GetOutputLine  
DM\_GetOutputLineCount  
DM\_GetProjectFromPath  
DM\_GetRecoveryInterval  
DM\_GetRecoveryIsEnabled  
DM\_ImageIndexForDocumentKind  
DM\_InstalledLibraries  
DM\_InstalledLibraryCount  
DM\_LoadProjectHidden  
DM\_LocalHistoryManager  
DM\_MessagesManager  
DM\_NavigationZoomPrecision  
DM\_OpenProject  
DM\_OptionsStorage  
DM\_Preferences  
DM\_ProjectCount  
DM\_Projects  
DM\_PromptForDefaultPcbType  
DM\_RunOpenDocumentDialog  
DM\_SetRecoveryParameters  
DM\_SetRightClickCompStructure  
DM\_ShowMessageView  
DM\_ShowToDoList  
DM\_ViolationTypeDescription  
DM\_ViolationTypeGroup  
DM\_WorkspaceFileName  
DM\_WorkspaceFullPath

__IWorkspace properties__



\(IWorkspace interface\)  
__Syntax__  
Procedure DM\_AddDocumentToActiveProject\(DocumentPath : WideString\);  
__Description__  
This method adds an existing document with its valid full path into an active project within Altium Designer\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Procedure DM\_AddOutputLine\(MessageLine : PChar;ReplaceLastLine : Boolean = False\);  
__Description__  
Outputs the line to the output’s dialog\. An Internal operation\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_ChangeManager : IChangeManager;  
__Description__  
Returns the Engineering Change Order Manager interface object which compares with two projects and creates an ECO to perform a pin swapping process to synchronize the specified two projects\.  
__Example__  
__See also__  
IWorkspace


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


\(IWorkspace interface\)  
__Syntax__  
Procedure   DM\_FileOwnership\_BulkWarnStart;  
__Description__  
__Example__  
   
__See also__  
IWorkspace interface


\(IWorkspace interface\)  
__Syntax__  
Procedure   DM\_FileOwnership\_BulkWarnEnd\(AWarningLevel : TFileOwnershipWarningLevel\);  
__Description__  
__Example__  
   
__See also__  
IWorkspace interface


\(IWorkspace interface\)  
__Syntax__  
Function    DM\_FileOwnership\_BulkWarnRegister\(AFileName : TDynamicString\) : Boolean;  
__Description__  
__Example__  
   
__See also__  
IWorkspace interface


\(IWorkspace interface\)  
__Syntax__  
Function DM\_FocusedDocument : IDocument;  
__Description__  
Returns the focussed document interface object \(if any\) in Altium Designer\. A focussed document is a document that is currently open and in focus \(this document is active\)\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_FocusedProject : IProject;  
__Description__  
Returns the focussed project \(if any\) in Altium Designer\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_FreeDocumentsProject : IProject;  
__Description__  
Returns the __IProject__ interface that contains free documents\. A free document is a standalone document that lives in the Free Documents project\.  
__Example__  
__See also__  
IWorkspace


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


\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetDefaultPcbType : WideString;  
__Description__  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetDocumentFromPath\(DocumentPath : WideString\) : IDocument;  
__Description__  
Retrieves the IDocument interface object by passing the full document path to this document\. With this IDocument interface, you have access to its functionality, such as compiling the document itself\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetOutputLine\(Index : Integer\) : WideString;  
__Description__  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetOutputLineCount : Integer;  
__Description__  
Returns the number of output lines in the Output dialog\. An Internal operation\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetProjectFromPath \(ProjectPath : WideString\) : IProject;  
__Description__  
Retrieves the IProject interface object by passing the full project path to this project\. With this IProject interface, you have access to its interface methods\. A project is a container that has links to associated design documents in an organized manner\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetRecoveryInterval : Integer;  
__Description__  
Returns the number of minutes as the interval when the recovery mechanism kicks in\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_GetRecoveryIsEnabled : Boolean;  
__Description__  
Returns a Boolean value whether the recovery mechanism is active or not\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_ImageIndexForDocumentKind\(ADocumentKind : WideString\) : Integer;  
__Description__  
Returns the image index depending on the document kind for example PCB, CAM etc\.  
__Example__  
__See also__  
IWorkspace  
Image Index Table


\(IWorkspace interface\)  
__Syntax__  
Function DM\_InstalledLibraries \(Index : Integer\) : IDocument;  
__Description__  
Returns an indexed library \(currently installed in Altium Designer only\), to be used in conjunction with the DM\_InstalledLibraryCount\.  
__Example__  
__See also__  
IWorkspace interface  
DM\_InstalledLibraryCount method


\(IWorkspace interface\)  
__Syntax__  
Function DM\_InstalledLibraryCount : Integer;  
__Description__  
Returns the number of installed libraries in Altium Designer\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_MessagesManager : IMessagesManager;  
__Description__  
This function returns you the interface to the Messages panel in Altium Designer\.  
__Example__  
__See also__  
IWorkspace interface  
IMessagesManager interface


\(IWorkspace interface\)  
__Syntax__  
Function DM\_OpenProject \( ProjectPath : WideString;Const Show : Boolean\) : IProject;  
__Description__  
Opens a project with the full project path and set this project in focus depending on its Show parameter\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_OptionsStorage : IOptionsStorage;  
__Description__  
Represents a options storage container where Altium Designer can use to retrieve and store options for storing parameters of EDE options such as Toolchain name, folder and default options and project options\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_ProjectCount : Integer;  
__Description__  
Returns the number of projects open in Altium Designer\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_Preferences : IWorkspacePreferences;  
__Description__  
__Example__  
   
__See also__  
IWorkspace interface  
IWorkspacePreferences interface


\(IWorkspace interface\)  
__Syntax__  
Function DM\_Projects \(Index : Integer\) : IProject;  
__Description__  
Returns the indexed project \(currently loaded in Altium Designer only\), to be used in conjunction with the DM\_ProjectCount interface\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_PromptForDefaultPcbType\(Var PcbType : WideString\) : Boolean;  
__Description__  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Procedure DM\_SetRecoveryParameters\(IsEnabled : Boolean; Interval : Integer\);  
__Description__  
Set the interval when the autosave / recovery mechanism in Altium Designer kicks in\. The interval is in minutes, and whether to enable the recovery mechanism\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Procedure DM\_ShowMessageView;  
__Description__  
Invoke this method to refresh the Message panel\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Procedure DM\_ShowToDoList;  
__Description__  
This method displays the To Do List manager panel\. This To Do List panel can be used to define your To Dos\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_ViolationTypeDescription\(ErrorKind : TErrorKind\) : WideString;  
__Description__  
Returns the violation type description string with the error kind value passed in\. Check the TErrorKind for its range of values\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_ViolationTypeGroup \(ErrorKind : TErrorKind\) : TErrorGroup;  
__Description__  
Returns the error group for which this error kind parameter belongs to\. Check the TErrorGroup type for its range of values\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_WorkspaceFileName : WideString;  
__Description__  
Returns the filename only of the workspace\.  
__Example__  
__See also__  
IWorkspace


\(IWorkspace interface\)  
__Syntax__  
Function DM\_WorkspaceFullPath : WideString;  
__Description__  
Returns the full path of the workspace\.  
__Example__  
__See also__  
IWorkspace


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



\(IBus interface\)  
__Syntax__  
Function DM\_BusKind : TBusKind;  
__Description__  
The function returns the bus kind which is one of the following enumerated values; eBusKindUndefined, eBusKindLowValueFirst, eBusKindHighValueFirst, eBusKindGeneric\.  
__Example__  
__See also__  
IBus interface  
TBusKind type \(from RT\_Unit in Altium Designer RTL\)


\(IBus interface\)  
__Syntax__  
Function DM\_BusName : WideString;  
__Description__  
This function returns the full bus name of this bus interface\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_BusRange1 : WideString;  
__Description__  
This function returns the Bus range 1 value\. Eg\. A\[1\.\.6\], the bus range1 is 1\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_BusRange2 : WideString;  
__Description__  
The function returns the Bus range 2 value\. Eg\. A\[1\.\.6\], the bus range2 is 6\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_BusRangeValue1 : Integer;  
__Description__  
The function returns the Bus range 1 value\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_BusRangeValue2 : Integer;  
__Description__  
The function returns the Bus range 2 value\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_BusWidth : Integer;  
__Description__  
The function returns the bus width\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_Electric : TPinElectrical;  
__Description__  
The function returns the electrical property for this bus\. Various values include :eElectricInput, eElectricIO, eElectricOutput, eElectricOpenCollector, eElectricPassive, eElectricHiZ, eElectricOpenEmitter, eElectricPower  
__Example__  
__See also__  
IBus interface  
TPinElectrical type


\(IBus interface\)  
__Syntax__  
Function DM\_FullBusName : WideString;  
__Description__  
The function returns the full bus name of this bus interface\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_IsLocal : Boolean;  
__Description__  
The function returns a Boolean value whether this bus is a local object or not\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_RangeDefinedByValue : Boolean;  
__Description__  
The function returns a Boolean value whether this range is defined by a two specific range values or not\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_Scope : TNetScope;  
__Description__  
The function denotes the net scope of this IBus interface\.  
__Example__  
__See also__  
IBus interface  
TNetScope type


\(IBus interface\)  
__Syntax__  
Function DM\_SectionCount : Integer;  
__Description__  
The function returns the number of sections for this IBus interface\. This is used for the DM\_Sections function\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_Sections \(Index : Integer\) : INet;  
__Description__  
The function returns the indexed section of the bus\. Used in conjunction with the DM\_SectionCount function\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_SignalType : WideString;  
__Description__  
The function returns the signal type string for this bus\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_WireCount : Integer;  
__Description__  
The function returns the number of wires for this IBus interface\. This is used for the DM\_Wires function\.  
__Example__  
__See also__  
IBus interface


\(IBus interface\)  
__Syntax__  
Function DM\_Wires \(Index : Integer\) : INet;  
__Description__  
The function returns the indexed wire\. Used in conjunction with the DM\_WireCount function\.  
__Example__  
__See also__  
IBus interface


__Overview__  
The IChannelClass interface is a PCB Channel class object interface for an existing Channel Class on a PCB document\. An existing Channel \(room\) class contains members of specific components\. Each component within a Channel Class object can either be a member or not\.

The ‘All Components’ Channel Class exists in every PCB document by default, it includes all Components in the document\. It is not possible to change which components are members of that Channel class, but the user has full control over which components are members of any other Channel classes \(which are created and named by the User\)\.  
__Notes__  
Inherited from IObjectClass interface\.  
__See also__  
IObjectClass interface


__Overview__  
The IChannelClass interface is a PCB Channel class object interface for an existing Channel Class on a PCB document\. An existing Channel \(room\) class contains members of specific components\.

Each component within a Channel Class object can either be a member or not\. The ‘All Components’ Channel Class exists in every PCB document by default, it includes all Components in the document\.

It is not possible to change which components are members of that Channel class, but the user has full control over which components are members of any other Channel classes \(which are created and named by the User\)

__IComponent methods__  
DM\_SubParts  
DM\_PhysicalComponents  
DM\_SubPartCount  
DM\_PhysicalComponentCount  
DM\_PhysicalPath  
DM\_UniqueId  
DM\_UniqueIdName  
DM\_UniqueIdPath

__IComponent properties__



\(IComponent interface\)  
__Syntax__  
Function DM\_SubParts \(Index : Integer\) : IPart;  
__Description__  
The function returns the indexed sub\-part of a multi\-part component\. Use the DM\_SubPartCount function\.  
__Example__  
__See also__  
IComponent interface


\(IComponent interface\)  
__Syntax__  
Function DM\_SubPartCount : Integer;  
__Description__  
The function returns the number of parts for this multi\-part component\. A standalone component returns 1 \(only one part for a standalone component\)\.  
__Example__  
__See also__  
IComponent interface


\(IComponent interface\)  
__Syntax__  
Function DM\_PhysicalComponents \(Index : Integer\) : IComponent;  
__Description__  
The function returns the indexed physical component\. Use this in conjunction with the DM\_PhysicalComponentCount function\.  
__Example__  
__See also__  
IComponent interface


\(IComponent interface\)  
__Syntax__  
Function DM\_PhysicalComponentCount : Integer;  
__Description__  
The function returns the number of physical components\.  
__Example__  
__See also__  
IComponent interface


\(IComponent interface\)  
__Syntax__  
Function DM\_UniqueIdPath : WideString;  
__Description__  
The function returns the unique path portion of the Unique ID for this component\. Includes the back slash\.  
__Example__  
__See also__  
IComponent interface


\(IComponent interface\)  
__Syntax__  
Function DM\_UniqueIdName : WideString;  
__Description__  
The function returns the unique name portion of the Unique ID for this component\.  
__Example__  
__See also__  
IComponent interface


\(IComponent interface\)  
__Syntax__  
Function DM\_UniqueId : WideString;  
__Description__  
The function returns the Unique ID string for this component so this component can be synchronized on the source document and the primary implementation document \(PCB\)\.  
__Example__  
__See also__  
IComponent interface


\(IComponent interface\)  
__Syntax__  
Function DM\_PhysicalPath : WideString;  
__Description__  
The function returns the full physical path for this component\. For example the string can consist of the schematic filename \\ channel name and instance\.  
__Example__  
__See also__  
IComponent interface


__Overview__  
The IComponentClass interface is a PCB Component class object interface for an existing Component Class on a PCB document\. An existing Component class contains members of specific Components\. Each Component within a ComponentClass object can either be a member or not\. The ‘All Components’ Component Class exists in every PCB document by default, it includes all Components in the document\. It is not possible to change which components are members of that Component class, but the user has full control over which components are members of any other Component classes \(which are created and named by the User\)\.  
__Notes__  
Inherited from IObjectClass interface\.  
__See also__  
IObjectClass interface


__Overview__  
The IComponentImplementation interface is associated with an IPart/IComponent interface in terms of model linking\. Note that the IComponent interface is inherited from the IPart interface\.

A model represents all the information needed for a component in a given domain \(a model can be a PCB footprint, Simulation file or a Signal Integrity model\)\. A model is also called an implementation\.  
Each schematic component can contain links to different model implementations such as PCB, Signal Integrity and Simulation models\. Only one model of a particular model type \(PCB footprint, SIM, SI, EDIF Macro and VHDL\) can be enabled as the currently linked model, at any one time\.

A model can be represented by external data sources called data file links\. For example, pins of a component can have links to different data files, as for signal integrity models\. We will consider each model type in respect to the data file links\.

- For PCB footprints, the data file link and the model is the same since the external file is the PCB footprint library\.
- For simulation models, there can be no data file links because these models are defined using the Spice format\.
- However for signal integrity models, each pin can have different pieces of information represented by ibis data files\. These signal integrity models can have multiple data files, that is, each pin of a component can have a separate IBIS file\. A signal integrity model can however use the Altium Designer’s central Signal Integrity database\.

Thus depending on which model type, you can have a number of data file links\. Each data file link describes the model name, the path to where the library is stored in and what sort of model it is\.

__IComponentImplementation methods__  
DM\_Description  
DM\_ModelName  
DM\_ModelType  
DM\_DatafileCount  
DM\_DatafileLocation  
DM\_DatafileEntity  
DM\_DatafileKind  
DM\_SetDatafileLocation  
DM\_SetDatafileEntity  
DM\_SetDatafileKind  
DM\_SetDatafileCount  
DM\_DatafileFullPath  
DM\_IntegratedModel  
DM\_DatalinksLocked  
DM\_IsCurrent  
DM\_Part  
DM\_PortMap  
DM\_PortMapList

__IComponentImplementation properties__



\(IComponentImplementation interface\)  
__Syntax__  
Procedure DM\_SetDatafileKind \(Index : Integer; AKind : WideString\);  
__Description__  
The procedure sets the data file kind which denotes the type of implementation model\. Example, a PCB Footprint is a PCBLIB data file kind\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Procedure DM\_SetDatafileEntity \(Index : Integer; AEntity : WideString\);  
__Description__  
The procedure sets the data file entity which denotes the name of the implementation model linked to a schematic component/part\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Procedure DM\_SetDatafileCount \(ACount : Integer\);  
__Description__  
The procedure sets the number of data files associated with the IPart/IComponent interface\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_ModelType : WideString;  
__Description__  
The function returns the model type as a string;  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_ModelName : WideString;  
__Description__  
The function returns the model name of the implementation model\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_Description : WideString;  
__Description__  
The function returns the description string of the implementation model\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatafileLocation \(Index : Integer\) : WideString;  
__Description__  
The function returns the indexed data file location\. Used in conjunction with the DM\_DataFileCount function\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatafileKind \(Index : Integer\) : WideString;  
__Description__  
The function returns the indexed data file kind \(the model kind eg PCB etc\)Used in conjunction with the DM\_DataFileCount function\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatafileFullPath \(Index : Integer;EntityName, FileKind : WideString;Var FoundIn : WideString\) : WideString;  
__Description__  
The function returns you the full path to the data file via the FoundIn parameter, if the Entity name, the file Kind are valid and Found In strings Used in conjunction with the DM\_DataFileCount function\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatafileEntity \(Index : Integer\) : WideString;  
__Description__  
The function returns the indexed data file entity \(the name of the implementation model\)\. Used in conjunction with the DM\_DataFileCount function\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatafileCount : Integer;  
__Description__  
The function returns the number of data files for the model\. A data file is an internal aggregrate object and each data file describes the model name, the path to where the library is stored in and what implementation model type\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Procedure DM\_SetDatafileLocation \(Index : Integer; ALocation : WideString\);  
__Description__  
The procedure sets the data file location which denotes the full path of the implementation model associated with the IPart/IComponent interface\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_PortMapList : WideString;  
__Description__  
The function returns the mapping of pins of a component and its corresponding model\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_PortMap : WideString;  
__Description__  
The function denotes the mapping of pins of a component and its corresponding model\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_Part : IPart;  
__Description__  
The function denotes the mapping of pins of a component and its corresponding model\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_IsCurrent : Boolean;  
__Description__  
The function denotes a boolean value whether this model implementation is current or not\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_IntegratedModel : Boolean;  
__Description__  
This function denotes a boolean value whether this is a model from an integrated library or not\.  
__Example__  
__See also__  
IComponentImplementation interface


\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatalinksLocked : Boolean;  
__Description__  
The function denotes a boolean value whether datalinks are locked or not\. Note, a data file kind denotes the type of implementation model\. Example, a PCB Footprint is a PCBLIB data file kind\.  
__Example__  
__See also__  
IComponentImplementation interface


__Overview__  
The ICrossSheet interface is a cross sheet connector object interface\. Cross sheet connector objects can be used to link a net from a sheet to other sheets within a project\. This method defines global connections between sheets within a project\. An active cross sheet object is associated with a net\.

An equivalent Cross Sheet Connector object representation is the ISch\_CrossSheetConnector interface in Schematic API Reference\.  
__Important notes__  
ICrossSheet interface is inherited from INetItem interface\.  
__See also__  
INetItem interface\.


__Overview__  
The ILine interface is a line object interface for an existing line object on a Schematic document\. A line is a graphical drawing object with any number of joined segments\.

An equivalent Line object representation is the ISch\_Line interface in the Schematic API reference\.

The __ILine__ interface hierarchy is as follows;  
IDMObject  
    ILine

__ILine methods__  
DM\_LX  
DM\_LY  
DM\_HX  
DM\_HY

__ILine properties__

__See also__  
IDMObject interface



\(ILine interface\)  
__Syntax__  
Function DM\_LX : Integer;  
__Description__  
This function returns the lower left coordinate of the line\.  
__Example__  
__See also__  
ILine interface


\(ILine interface\)  
__Syntax__  
Function DM\_LY : Integer;  
__Description__  
This function returns the lower left coordinate of the line\.  
__Example__  
__See also__  
ILine interface


\(ILine interface\)  
__Syntax__  
Function DM\_HY : Integer;  
__Description__  
This function returns the upper right coordinate of the line\.  
__Example__  
__See also__  
ILine interface


\(ILine interface\)  
__Syntax__  
Function DM\_HX : Integer;  
__Description__  
This function returns the upper right coordinate of the line\.  
__Example__  
__See also__  
ILine interface


__Overview__  
The INet interface is associated with an existing net object of a design document\. A net is a series of connections of net identifiers \(electrically aware objects such as sheet entries, pins, wires and ports\) with the same net name\.  
That is, all connections sharing the same net name is a net and can be connected on a sheet or between sheets in a project\.

__INet methods__  
DM\_AllNetItems  
DM\_RemovedNetItems  
DM\_Directives  
DM\_Pins  
DM\_PowerObjects  
DM\_Ports  
DM\_CrossSheetConnectors  
DM\_NetLabels  
DM\_SheetEntrys  
DM\_Lines  
DM\_SubWires  
DM\_AllNetItemCount  
DM\_RemovedNetItemCount  
DM\_DirectiveCount  
DM\_PinCount  
DM\_PowerObjectCount  
DM\_PortCount  
DM\_CrossSheetConnectorCount  
DM\_NetLabelCount  
DM\_SheetEntryCount  
DM\_LineCount  
DM\_SubWireCount  
DM\_Electric  
DM\_ElectricalString  
DM\_SignalType  
DM\_AutoNumber  
DM\_Scope  
DM\_CalculatedNetName  
DM\_HiddenNetName  
DM\_IsAutoGenerated  
DM\_IsLocal  
DM\_NetNumber  
DM\_NetName  
DM\_FullNetName  
DM\_BusRange1  
DM\_BusRange2  
DM\_BusRangeValue1  
DM\_BusRangeValue2  
DM\_BusIndex  
DM\_BusWidth  
DM\_BusKind  
DM\_IsBusElement  
DM\_IsBusSection  
DM\_IsBusMember  
DM\_RangeDefinedByValue  
DM\_BusPrefix  
DM\_CountOfNonPinItems  
DM\_CountOfElectricalType  
DM\_SuppressERC  
DM\_BusSectionParent

__INet properties__



\(INet interface\)  
__Syntax__  
Function DM\_AllNetItemCount : Integer;  
__Description__  
The function returns the number of net aware objects \(that is inherited from the INetItem interface\)\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_AllNetItems \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed net aware object\. Use the DM\_AllNetItemCount function for this function\.  
__Example__  
__See also__  
INet interface  
DM\_AllNetItemCount function


\(INet interface\)  
__Syntax__  
Function DM\_AutoNumber : Integer;  
__Description__  
The function returns the auto number value used for auto\-numbering nets\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_BusIndex : Integer;  
__Description__  
The function returns the bus index\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_BusKind : TBusKind;  
__Description__  
The function returns the bus kind\. which is one of the following enumerated values; eBusKindUndefined, eBusKindLowValueFirst, eBusKindHighValueFirst, eBusKindGeneric\.  
__Example__  
__See also__  
INet interface  
TBusKind type \(from RT\_Unit in Altium Designer RTL\)


\(INet interface\)  
__Syntax__  
Function DM\_BusPrefix : WideString;  
__Description__  
The function returns the bus prefix as used in this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_BusRange1 : WideString;  
__Description__  
The function returns the first index of the Bus range\. Eg\. A\[1\.\.6\], the bus range1 is 1\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_BusRange2 : WideString;  
__Description__  
The function returns the last index of the Bus Range\. Eg A\[0\.\.4\], the bus range 2 is 4\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_BusRangeValue1 : Integer;  
__Description__  
The function returns the value of the first index of the Bus range  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_BusRangeValue2 : Integer;  
__Description__  
The function returns the value of the second index of the Bus range\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_BusSectionParent : INet;  
__Description__  
This function returns an INet interface for the parent bus section\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_BusWidth : Integer;  
__Description__  
The function returns the bus width\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_CalculatedNetName : WideString;  
__Description__  
The function returns the bus width\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_CountOfElectricalType \(AElectric : TPinElectrical\) : Integer;  
__Description__  
The function returns the number of electrical types used by the current sheet or the project\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_CountOfNonPinItems : Integer;  
__Description__  
The function returns the number of non\-pin objects used on the current sheet or the project\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_CrossSheetConnectorCount : Integer;  
__Description__  
The function returns the number of cross sheet connectors associated with this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_CrossSheetConnectors \(Index : Integer\) : ICrossSheet;  
__Description__  
The function returns an indexed cross sheet connector that is part of the current net\. Use the DM\_CrossSheetConnectorCount function\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_DirectiveCount : Integer;  
__Description__  
The function returns the number of directives associated with this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_Directives \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed directive \(which could be a PCB layout directive that contains PCB fules\)\. Use the DM\_DirectiveCount function\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_Electric : TPinElectrical;  
__Description__  
The function returns the type of electrical property the pin is associated with\. Various values include :eElectricInput, eElectricIO, eElectricOutput, eElectricOpenCollector, eElectricPassive, eElectricHiZ, eElectricOpenEmitter, eElectricPower  
__Example__  
__See also__  
INet interface  
TPinElectrical type


\(INet interface\)  
__Syntax__  
Function DM\_ElectricalString : WideString;  
__Description__  
The function returns the electrical property associated with this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_FullNetName : WideString; \{Including Bus Index etc\}  
__Description__  
The function denotes the full net name \(includes the bus index and so on\)\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_HiddenNetName : WideString;  
__Description__  
The function denotes the hidden net name \(like power nets\)\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_IsAutoGenerated : Boolean;  
__Description__  
The function denotes a boolean value whether this net has been system generated or not\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_IsBusElement : Boolean;  
__Description__  
The function returns a Boolean value whether this bus element exists or not for this INetItem interface\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_IsBusMember : Boolean;  
__Description__  
The function returns a Boolean value whether this bus member exists or not for this INetItem interface\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_IsBusSection : Boolean;  
__Description__  
The function returns a Boolean value whether the bus section exists or not for this INetItem interface\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_IsLocal : Boolean;  
__Description__  
The function denotes whether this net is a local net restricted to the document or not\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_LineCount : Integer;  
__Description__  
The function returns the number of lines associated with this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_Lines \(Index : Integer\) : ILine;  
__Description__  
The function returns an indexed line that is part of the current net\. use the DM\_LineCount function\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_NetLabelCount : Integer;  
__Description__  
The function returns the number of net labels associated with this net\.  
__Example__  
__See also__  
INet interface  
INetLabel interface


\(INet interface\)  
__Syntax__  
Function DM\_NetLabels \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed net label that is part of the current net\. Use DM\_NetLabelCount function\.  
__Example__  
__See also__  
INet interface  
INetItem interface  
INetLabel interface


\(INet interface\)  
__Syntax__  
Function DM\_NetName : WideString;  
__Description__  
The function denotes the net name of this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_NetNumber : WideString;  
__Description__  
The function denotes the net number of this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_PinCount : Integer;  
__Description__  
The function returns the number of pins associated with this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_Pins \(Index : Integer\) : INetItem;  
__Description__  
The function reurns an indexed pin that is part of the current net\. Use the DM\_PinCount function\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_PortCount : Integer;  
__Description__  
The function returns the number of ports associated with this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_Ports \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed port that is part of the current net\. Use the DM\_PortCount function\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_PowerObjectCount : Integer;  
__Description__  
The function returns the number of power objects associated with this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_PowerObjects \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed power object that is part of the current net\. Use the DM\_PowerObjectCount function\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_RangeDefinedByValue : Boolean;  
__Description__  
The function returns a boolean value whether the range has been defined by a two specific range values or not\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_RemovedNetItemCount : Integer;  
__Description__  
The function returns the number of net items that have been removed from the nets\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_RemovedNetItems \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed net item that has been removed from net of the schematic document\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_Scope : TNetScope;  
__Description__  
The funciton denotes the scope of this net as defined by the TNetScope type\.  
__Example__  
__See also__  
INet interface  
TNetScope type


\(INet interface\)  
__Syntax__  
Function DM\_SheetEntryCount : Integer;  
__Description__  
The function returns the number of sheet entries associated with this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_SheetEntrys \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed sheet entry that is part of the current net\. Use DM\_SheetEntryCount function\.  
__Example__  
__See also__  
INet interface  
INetItem interface  
DM\_SheetEntryCount function


\(INet interface\)  
__Syntax__  
Function DM\_SignalType : WideString;  
__Description__  
The function returns the signal type property associated with this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_SubWireCount : Integer;  
__Description__  
The function returns the number of sub wires associated with this net\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_SubWires \(Index : Integer\) : INet; \{For BusSections only\}  
__Description__  
The function Returns an indexed sub wire \(part of a bus object\)\. Use the DM\_SubWireCount\. A bus object conceptually carries multiple wires\.  
__Example__  
__See also__  
INet interface


\(INet interface\)  
__Syntax__  
Function DM\_SuppressERC : Boolean;  
__Description__  
The function returns a boolean value whether the ERC has been suppressed for this net or not\.  
__Example__  
__See also__  
INet interface


__Overview__  
The INetClass interface is a PCB Net Class object interface for an existing NetClass on a PCB document\. An existing Net class contains members of specific Net objects\. Each Net within a NetClass object can either be a member, or not\. The 'All Nets' Net Class exists in every PCB file by default; it includes all Nets in the document\. It is not possible to change which Nets are members of that Net Class, but the user has full control over which Nets are members of any other Net Classes \(which are created and named by the user\)\.  
__Notes__  
An INetClass interface is inherited from the IObjectClass interface\.  
__See also__  
IObjectClass


__Overview__  
The INetItem interface represents the ancestor or parent interface for the following interfaces – IBus, ICrossSheetConnector, IPin, IPort, INetlabel, ISheetEntry and IPowerObject interfaces that have a Net property\.  
These interface objects have a net property and thus these objects can be part of a net\.

__INetItem methods__  
DM\_OwnerNetLogical  
DM\_OwnerNetPhysical  
DM\_ParentID  
DM\_Electric  
DM\_Id  
DM\_NetName  
DM\_FlattenedNetName  
DM\_NetNumber  
DM\_Electrical  
DM\_ElectricalString  
DM\_SignalType  
DM\_BusRange1  
DM\_BusRange2  
DM\_BusRangeValue1  
DM\_BusRangeValue2  
DM\_BusKind  
DM\_BusIndex  
DM\_BusWidth  
DM\_BusPrefix  
DM\_IsAutoGenerated  
DM\_IsBusMember  
DM\_IsBusElement  
DM\_IsBusSection  
DM\_RangeDefinedByValue  
DM\_Part  
DM\_PartId  
DM\_DisplayMode  
DM\_PinName  
DM\_PinNumber  
DM\_FullPinName  
DM\_IsHidden  
DM\_LogicalPartDesignator  
DM\_FullLogicalPartDesignator  
DM\_PhysicalPartDesignator  
DM\_FullPhysicalPartDesignator  
DM\_PartUniqueId  
DM\_PartType  
DM\_FootPrint  
DM\_PinNameNoPartId  
DM\_FullUniqueId  
DM\_PartSwapId  
DM\_PinSwapId  
DM\_SheetSymbol  
DM\_ParentSheetSymbolSheetName  
DM\_ParentSheetSymbolName  
DM\_LinkObject

__INetItem properties__



\(INetItem interface\)  
__Syntax__  
Function DM\_BusIndex : Integer;  
__Description__  
The function returns the bus index\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_BusKind : TBusKind;  
__Description__  
The function returns the type of bus\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_BusPrefix : WideString;  
__Description__  
The function returns the bus prefix\. An example, a bus object could have this A\[0\.\.7\] net label, and the prefix is A\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_BusRange1 : WideString;  
__Description__  
This function returns the bus range 1 string\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_BusRange2 : WideString;  
__Description__  
This function returns the bus range 1 string\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_BusRangeValue1 : Integer;  
__Description__  
This function returns value of the bus range 1\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_BusRangeValue2 : Integer;  
__Description__  
This function returns value of the bus range 1\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_BusWidth : Integer;  
__Description__  
The function returns the bus width\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_DisplayMode : TDisplayMode;  
__Description__  
The function returns the display mode for this part object\. A part object can have up to 254 alternative graphical displays along with the normal graphical display\.  
__Example__  
__See also__  
INetItem interface  
TDisplayMode type


\(INetItem interface\)  
__Syntax__  
Function DM\_Electric : TPinElectrical;  
__Description__  
This function denotes the electrical pin property for a net aware object\.  
__Example__  
__See also__  
INetItem interface  
TPinElectrical type


\(INetItem interface\)  
__Syntax__  
Function DM\_Electrical : TPinElectrical;  
__Description__  
The function returns the electrical pin property\.  
__Example__  
__See also__  
INetItem interface  
TPinElectrical type


\(INetItem interface\)  
__Syntax__  
Function DM\_ElectricalString : WideString;  
__Description__  
The function returns the electrical property string\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_FlattenedNetName : WideString;  
__Description__  
The function returns the net name of the flattened net where the net aware object is associated with\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_FootPrint : WideString;  
__Description__  
The function returns the Footprint string for this INetItem associated with an IPart object\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_FullLogicalPartDesignator : WideString;  
__Description__  
The function returns the logical part designator and the channel instance for this INetItem Interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_FullPhysicalPartDesignator : WideString;  
__Description__  
The function returns the full logical part designator and the channel instance for this INetItem Interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_FullPinName : WideString;  
__Description__  
The function returns the full Pin name and number that this INetItem interface is associated with\. An IPin interface is inherited from an INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_FullUniqueId : WideString;  
__Description__  
The function returns the full Unique ID string for this INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_Id : WideString;  
__Description__  
The function returns the Id value for this net aware object\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_IsAutoGenerated : Boolean;  
__Description__  
The function returns a Boolean value whether this INetItem has been automatically generated by Atlium Designer or not\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_IsBusElement : Boolean;  
__Description__  
The function returns a Boolean value whether this bus element exists or not for this INetItem interface\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_IsBusMember : Boolean;  
__Description__  
The function returns a Boolean value whether this bus member exists or not for this INetItem interface\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_IsBusSection : Boolean;  
__Description__  
The function returns a Boolean value whether the bus section exists or not for this INetItem interface\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_IsHidden : Boolean;  
__Description__  
The function returns whether this pin object is hidden or not\. An IPin interface is inherited from an INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_LinkObject : INetItem;  
__Description__  
The function denotes the linked object to a sheet entry or port from a port or a sheet entry respectively\. This method is for port objects that are connected from child schematic sheets to sheet entries of sheet symbols on a parent sheet\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_LogicalPartDesignator : WideString;  
__Description__  
The function returns the logical part designator for this INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_NetName : WideString;  
__Description__  
The function returns the net name of the net where the net aware object is associated with\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_NetNumber : WideString;  
__Description__  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_OwnerNetLogical : INet;  
__Description__  
The function denotes whether this net aware object is associated with the net of a logical document\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_OwnerNetPhysical : INet;  
__Description__  
The function denotes whether this net aware object is associated with the net of a physical document\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_ParentID : WideString;  
__Description__  
The function denotes the parent ID or the Sheet document name / Net Name property where this interface is associated with\. For example a sheet entry on a sheet symbol object’s parent ID is the name of the schematic sheet where the port is\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_ParentSheetSymbolName : WideString;  
__Description__  
The function Returns the parent sheet symbol name associated with this INetItem interface \(which is a SheetEntry object\)\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_ParentSheetSymbolSheetName : WideString;  
__Description__  
The function returns the parent sheet symbol sheet name string associated with this INetItem interface \(which is a sheet entry object\)\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_Part : IPart;  
__Description__  
The function returns the IPart interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_PartId : Integer;  
__Description__  
The function returns the Part ID value\. A part object is a composite of a multi\-part component, and thus each part object is referenced by its Part Id\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_PartSwapId : WideString;  
__Description__  
The function returns the wide string for the part swap Id\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_PartType : WideString;  
__Description__  
The function returns the part type for this INetItem associated with an IPart object\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_PartUniqueId : WideString;  
__Description__  
The function returns the Unique ID for this part the NetItem is associated with\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_PhysicalPartDesignator : WideString;  
__Description__  
The function returns the logical part designator and the channel instance for this INetItem Interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_PinName : WideString;  
__Description__  
The function returns the Pin name that this INetItem interface is associated with\. Since an IPin interface is inherited from an INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_PinNameNoPartId : WideString;  
__Description__  
The function returns the Pin Name Number and Part ID string for this INetItem associated with an Part object\. A pin is part of a part / component\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_PinNumber : WideString;  
__Description__  
The function returns the Pin Number that this INetItem interface is associated with\. An IPin interface is inherited from an INetItem interface\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_PinSwapId : WideString;  
__Description__  
The function returns the wide string for the pin swap Id\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_RangeDefinedByValue : Boolean;  
__Description__  
The function returns a Boolean value whether the range is defined by a two specific range values or not\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_SheetSymbol : ISheetSymbol;  
__Description__  
The function returns the ISheetSymbol interface where this INetItem \(representing a ISheetEntry interface if it exists\) is associated with\. If not, a nil value is returned\.  
__Example__  
__See also__  
INetItem interface


\(INetItem interface\)  
__Syntax__  
Function DM\_SignalType : WideString;  
__Description__  
The function returns the signal type string\.  
__Example__  
__See also__  
INetItem interface


__Overview__  
The INetLabel interface is a net label interface to an existing net label object on the schematic sheet document\. A net describes a connection from one component pin, to a second pin, and then to a third pin and so on\.  
__Notes__  
The INetLabel interface is inherited from the INetItem interface\.  
An equivalent NetLabel object representation is the ISch\_NetLabel class in Schematic API Reference\.  
__See also__  
INetItem interface\.


__Overview__  
The IObjectClass interface is the ancestor object class interface for Channel Class, Component Class and Net Class interfaces\.

__IObjectClass methods__  
DM\_Name  
DM\_MemberCount  
DM\_Members

__IObjectClass properties__



\(IObjectClass interface\)  
__Syntax__  
Function DM\_MemberCount : Integer;  
__Description__  
The function returns the number of members associated with the object class \(one of its descendants ie Channel Class, Component class or Net class\)\.  
This method is to be used in conjunction with the DM\_Members\(index\) method\.  
__Example__  
__See also__  
IObjectClass interface


\(IObjectClass interface\)  
__Syntax__  
Function DM\_Members \(Index : Integer\) : WideString;  
__Description__  
The function returns the indexed member of the object class \(one of its descendants that is, a channel class, component class or a net class\)\.  
__Example__  
__See also__  
IObjectClass interface


\(IObjectClass interface\)  
__Syntax__  
Function DM\_Name : WideString;  
__Description__  
The function returns the name of the Object class \(one of its descendants ie Channel Class, Component class or Net class\)  
__Example__  
__See also__  
IObjectClass interface


__Overview__  
The IParameter interface is a parameter object interface to an existing parameter object on a schematic sheet\. There are two types of parameters – system parameters which are owned by a schematic document and parameters owned by certain schematic design objects\.

A parameter is a child object of a Parameter Set, Part, Pin, Port, or Sheet Symbol object\. A Parameter object has a Name property and Value property which can be used to store information, thus the parameters are a way of defining and associating information and could include strings that identify component manufacturer, date added to the document and also a string for the component's value \(e\.g\. 100K for a resistor or 10PF for a capacitor\)\.

Each parameter has a Unique Id assigned to it\. This is used for those parameters that have been added as design rule directives\. When transferring the design to the PCB document, any defined rule parameters will be used to generate the relevant design rules in the PCB\. These generated rules will be given the same Unique Ids, allowing you to change rule constraints in either schematic or PCB and push the change across when performing a synchronization\.

An equivalent object representation is the ISch\_Parameter class in the Sch API reference\.

__Interface Methods__

__Method__

__Description__

Function   DM\_Name          : WideString;

Denotes the name of the parameter object\.

Function   DM\_ConfigurationName : WideString;

Returns the configuration name, that the parameter object is associated with\.

Function   DM\_Kind          : TParameterKind;

Denotes the specific kind that can be assigned to this parameter object\. String, Boolean, Integer or float\.\.

Function   DM\_Value         : WideString;

Denotes the value placeholder for this parameter object\.

Function DM\_RawText : WideString

Returns the raw text for this parameter object\.

Function   DM\_UniqueId      : WideString;

Any parameter that is configured as a container for design rule directives need to have a unique ID that will be ported onto the corresponding PCB implementation document\.

Function   DM\_Description   : WideString;

Denotes the description of this parameter object\.

Function   DM\_NewName       : WideString;

Denotes the New Name for the parameter object, especially when there is an ECO change\. You can then compare the original and new names\.

Function   DM\_NewValue      : WideString;

Denoes the New Value for the parameter object, especially when there is an ECO change\. You can then compare the original and new values\.

Function   DM\_OriginalOwner : IDMObject;

This function returns the interface of the owner object this parameter object is associated with\.

Function   DM\_Visible       : Boolean;

Denotes whether this parameter object is visible or not\.


__Overview__  
The IParameter interface is a parameter object interface to an existing parameter object on a schematic sheet\. There are two types of parameters – system parameters which are owned by a schematic document and parameters owned by certain schematic design objects\.

A parameter is a child object of a Parameter Set, Part, Pin, Port, or Sheet Symbol object\. A Parameter object has a Name property and Value property which can be used to store information, thus the parameters are a way of defining and associating information and could include strings that identify component manufacturer, date added to the document and also a string for the component's value \(e\.g\. 100K for a resistor or 10PF for a capacitor\)\.

Each parameter has a Unique Id assigned to it\. This is used for those parameters that have been added as design rule directives\. When transferring the design to the PCB document, any defined rule parameters will be used to generate the relevant design rules in the PCB\. These generated rules will be given the same Unique Ids, allowing you to change rule constraints in either schematic or PCB and push the change across when performing a synchronization\.

An equivalent object representation is the ISch\_Parameter class in the Sch API reference\.

__IParameter methods__  
DM\_Name  
DM\_ConfigurationName  
DM\_Kind  
DM\_Value  
DM\_RawText  
DM\_UniqueId  
DM\_Description  
DM\_NewName  
DM\_NewValue  
DM\_OriginalOwner  
DM\_Visible

__IParameter properties__



\(IParameter interface\)  
__Syntax__  
Function DM\_ConfigurationName : WideString;  
__Description__  
The function returns the configuration name, that the parameter object is associated with\.  
__Example__  
__See also__  
IParameter interface


\(IParameter interface\)  
__Syntax__  
Function DM\_Description : WideString;  
__Description__  
The function denotes the description of this parameter object\.  
__Example__  
__See also__  
IParameter interface


\(IParameter interface\)  
__Syntax__  
Function DM\_Kind : TParameterKind;  
__Description__  
The function denotes the specific kind that can be assigned to this parameter object\. String, Boolean, Integer or float\.  
__Example__  
__See also__  
IParameter interface  
TParameterKind type


\(IParameter interface\)  
__Syntax__  
Function DM\_Name : WideString;  
__Description__  
The function denotes the name of the parameter object\.  
__Example__  
__See also__  
IParameter interface


\(IParameter interface\)  
__Syntax__  
Function DM\_NewName : WideString;  
__Description__  
The function denotes the New Name for the parameter object, especially when there is an ECO change\. You can then compare the original and new names\.  
__Example__  
__See also__  
IParameter interface


\(IParameter interface\)  
__Syntax__  
Function DM\_NewValue : WideString;  
__Description__  
The function denotes the New Value for the parameter object, especially when there is an ECO change\. You can then compare the original and new values\.  
__Example__  
__See also__  
IParameter interface


\(IParameter interface\)  
__Syntax__  
Function DM\_OriginalOwner : IDMObject;  
__Description__  
This function returns the interface of the owner object this parameter object is associated with\.  
__Example__  
__See also__  
IParameter interface


\(IParameter interface\)  
__Syntax__  
Function DM\_RawText : WideString;  
__Description__  
The function returns the raw text for this parameter object\.  
__Example__  
__See also__  
IParameter interface


\(IParameter interface\)  
__Syntax__  
Function DM\_UniqueId : WideString;  
__Description__  
Any parameter that is configured as a container for design rule directives need to have a unique ID that will be ported onto the corresponding PCB implementation document\.  
The function returns the Unique ID value for the parameter object\.  
__Example__  
__See also__  
IParameter interface


\(IParameter interface\)  
__Syntax__  
Function DM\_Value : WideString;  
__Description__  
The function denotes the value placeholder for this parameter object\.  
__Example__  
__See also__  
IParameter interface


\(IParameter interface\)  
__Syntax__  
Function DM\_Visible : Boolean;  
__Description__  
The function denotes whether this parameter object is visible or not\.  
__Example__  
__See also__  
IParameter interface


__Overview__  
The __IPart__ interface is the interface of an existing schematic part on a Schematic sheet\. A part object is “part” of a component, that is, a multi\-part component consists of part objects\. For example a multiple gate integrated circuit has duplicate gates, and that a component represents the multi\-part gate and a part represents the gate itself\.

An equivalent component object representation is the __ISch\_Component__ class in Schematic API\. The __ISch\_Component__ interface represents a component that can contain links to different model implementations such as PCB, Signal Integrity and Simulation models\. Only one model of a particular model type \(PCB footprint, SIM, SI, EDIF Macro and VHDL\) can be enabled as the currently linked model, at any one time\.

__IPart methods__  
DM\_AddConfigurationParameters  
DM\_AssignedDesignator  
DM\_CalculatedDesignator  
DM\_CenterLocationX  
DM\_CenterLocationY  
DM\_ChannelOffset  
DM\_ChildProjectSheet  
DM\_ChildVHDLEntity  
DM\_Comment  
DM\_ComponentKind  
DM\_ConfiguratorName  
DM\_CurrentImplementation  
DM\_Description  
DM\_DesignatorLocationX  
DM\_DesignatorLocationY  
DM\_DesignatorLocked  
DM\_DisplayMode  
DM\_FirstPinLocationX  
DM\_FirstPinLocationY  
DM\_Footprint  
DM\_FullLogicalDesignator  
DM\_FullPhysicalDesignator  
DM\_Height  
DM\_ImplementationCount  
DM\_Implementations  
DM\_InstanceCount  
DM\_Layer  
DM\_LibraryReference  
DM\_LogicalDesignator  
DM\_LogicalOwnerDocument  
DM\_MaxPartCount  
DM\_NewDesignator  
DM\_NewPartId  
DM\_PartID  
DM\_PartIdLocked  
DM\_PartType  
DM\_PhysicalDesignator  
DM\_PinCount  
DM\_Pins  
DM\_ReferenceLocationX  
DM\_ReferenceLocationY  
DM\_Rotation  
DM\_SourceDesignator  
DM\_SourceHierarchicalPath  
DM\_SourceLibraryName  
DM\_SourceUniqueId  
DM\_SubProject  
DM\_UniqueId  
DM\_UniqueIdName  
DM\_UniqueIdPath

__IPart properties__



\(IPart interface\)  
__Syntax__  
Procedure DM\_AddConfigurationParameters;  
__Description__  
The procedure adds configuration parameters to this part object\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_AssignedDesignator : WideString;  
__Description__  
The function denotes the assigned designator for this part which is equivalent to the DM\_CalculatedDesignator method\.  The DM\_AssignedDesignator method returns a string that contains the designator and multi channel information but does not include multi part id information\.

This function returns the calculated designator string which contains the hierarchical path and the logical designator strings\. Only when a project is compiled and up to date, designators of parts are calculated based on the compiled documents they are on\.  
__Example__  
__See also__  
IPart interface  
DM\_CalculatedDesignator method


\(IPart interface\)  
__Syntax__  
Function DM\_CalculatedDesignator : WideString;  
__Description__  
The function denotes the system compiled designator for this part\. The assigned designator for this part is equivalent to the DM\_CalculatedDesignator method\. A DM\_CalculatedDesignator method returns a string that contains the designator and multi channel information but does not include multi part information\.

This function returns the calculated designator string which contains the hierarchical path and the logical designator strings\. Only when a project is compiled and up to date, designators of parts are calculated based on the compiled documents they are on\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_CenterLocationX : Integer;  
__Description__  
The function returns the central location X of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_CenterLocationY : Integer;  
__Description__  
The function returns the central location Y of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_ChannelOffset : Integer;  
__Description__  
The offset represents which part is offset in relation to the reference channel and the associated channels are also affected\. The function returns the ChannelOffset value\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_ChildProjectSheet : IDocument;  
__Description__  
The function denotes the IDocument interface representing the child project sheet associated with this part\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_ChildVHDLEntity : WideString;  
__Description__  
The function returns the Child VHDL entity string representing the VHDL document that the part \(component\) is linked to\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_Comment : WideString;  
__Description__  
The function denotes the comment string for this part\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_ComponentKind : TComponentKind;  
__Description__  
This function denotes the component kind that this part is represented as in the BOM and maintained during synchronization\.  
A component kind can be one of the following:

- eComponentKind\_Standard : These components possess standard electrical properties, are always synchronized and are the type most commonly used on a board\.
- eComponentKind\_Mechanical: These components do not have electrical properties and will appear in the BOM\. They are synchronized if the same components exist on both the Schematic and PCB documents\. An example is a heatsink\.
- eComponentKind\_Graphical: These components are not used during synchronization or checked for electrical errors\. These components are used, for example, when adding company logos to documents\.
- eComponentKind\_NetTie\_BOM: These components short two or more different nets for routing and these components will appear\.
- eComponentKind\_NetTie\_NoBOM: These components short two or more different nets for routing and these components will NOT appear in the BOM and are maintained during synchronization\.

__Example__  
__See also__  
IPart interface  
TComponentKind type


\(IPart interface\)  
__Syntax__  
Function DM\_CurrentImplementation \(AType : WideSTring\) : IComponentImplementation;  
__Description__  
The function returns the current implementation which is usually a PCB footprint\.  
__Example__  
__See also__  
IPart interface  
IComponentImplementation interface


\(IPart interface\)  
__Syntax__  
Function DM\_Description : WideString;  
__Description__  
The function denotes the description of the reference link to a source component or as a device name\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_DesignatorLocationX : Integer;  
__Description__  
The function returns the location X of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_DesignatorLocationY : Integer;  
__Description__  
The function returns the location Y of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_DesignatorLocked : Boolean;  
__Description__  
The function denotes whether or not the designator string is locked \(unmoveable\)\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_DisplayMode : TDisplayMode;  
__Description__  
The function Denotes one of the 255 display modes\. The mode 0 is the normal graphical display for this part object\. The other 254 modes are alternative graphical displays of this same part object\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_FirstPinLocationX : Integer;  
__Description__  
The function denotes the reference X location of the first pin of a part object\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_FirstPinLocationY : Integer;  
__Description__  
The function denotes the reference Y location of the first pin of a part object\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_Footprint : WideString;  
__Description__  
The function denotes the footprint string that this part is associated with\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_FullLogicalDesignator : WideString;  
__Description__  
The function denotes the full logical designator which includes the part designator and part id information\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_FullPhysicalDesignator : WideString;  
__Description__  
The function denotes the full physical designator of a part which includes the calculated designator and the part id information on compiled schematic sheets\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_Height : Integer;  
__Description__  
The function denotes the height property of the part object\. A part object is “part” of a multi\-part component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_ImplementationCount : Integer;  
__Description__  
The function returns the number of implementations of this schematic component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_Implementations \(Index : Integer\) : IComponentImplementation;  
__Description__  
The function returns the particular IComponentImplementation for the specified indexed implementations of a Schematic component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_InstanceCount : Integer;  
__Description__  
The function returns the number of instances of this part\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_Layer : WideString;  
__Description__  
The function denotes which layer this part is on\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_LibraryReference : WideString;  
__Description__  
The function denotes the name of the component from the library  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_LogicalDesignator : WideString;  
__Description__  
The function denotes the logical designator of this part on a schematic sheet\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_LogicalOwnerDocument : IDocument;  
__Description__  
The function denotes the IDocument representing the logical owner document that this part is associated to a schematic component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_MaxPartCount : Integer;  
__Description__  
The function returns the maximum part count for this part object\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_NewDesignator : WideString;  
__Description__  
The function denotes the new designator for this part\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_NewPartId : Integer;  
__Description__  
The function denotes the new part id for this part\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_PartID : Integer;  
__Description__  
The function denotes the PartID for this part\. A multi\-part component references each part by its PartID, for example a four part component has four unique PartIDs\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_PartIdLocked : Boolean;  
__Description__  
The function denotes whether or not the part id string is locked \(unmoveable\)\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_PartType : WideString;  
__Description__  
The function denotes the part type for this part\. \(Footprint type\)\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_PhysicalDesignator : WideString;  
__Description__  
The function denotes the physical designator string of a part\. Note, a logical designator doesn't include the channel instance string\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_PinCount : Integer;  
__Description__  
The function returns the number of pins for this schematic component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_Pins \(Index : Integer\) : INetItem;  
__Description__  
The function returns the INetItem interface for the specified indexed Pin of a Schematic Component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_ReferenceLocationX : Integer;  
__Description__  
The function returns the reference location X of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_ReferenceLocationY : Integer;  
__Description__  
The function returns the reference location Y of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_Rotation : Double;  
__Description__  
The function denotes the rotation property of a part \(orientation\) in degrees\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_SourceDesignator : WideString;  
__Description__  
The function denotes the current designator of the source component from the corresponding schematic\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_SourceHierarchicalPath : WideString;  
__Description__  
The function denotes the source reference path to the PCB component\. The path can be multi level depending on whether it is a multi channel or a bormal design\. When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_SourceLibraryName : WideString;  
__Description__  
The function denotes the name of the source library where the schematic component and its associated part come from\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_SourceUniqueId : WideString;  
__Description__  
Unique IDs \(UIDs\) are used to match each schematic component to the corresponding PCB component\. When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library pathnames\. The UID is a system generated value that uniquely identifies the source component\.  
The function returns the UniqueID for this part\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_SubProject : WideString;  
__Description__  
The function returns the sub project string of this part\. A part can represent a schematic sheet, like a sheet symbol\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_UniqueId : WideString;  
__Description__  
The function denotes the Unique ID for this part\. Unique IDs are used in Schematic – PCB documents synchronization so that Sch components and its corresponding PCB components are in sync\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_UniqueIdName : WideString;  
__Description__  
The function denotes the Unique ID name of this part\.  
__Example__  
__See also__  
IPart interface


\(IPart interface\)  
__Syntax__  
Function DM\_UniqueIdPath : WideString;  
__Description__  
The function denotes the Unique ID path of this part \(includes the back slash\)\.  
__Example__  
__See also__  
IPart interface


__Overview__  
The IPin interface is a pin object interface to an existing pin object on the schematic\. Pins are special objects that have electrical characteristics and are used to direct signals in and out of components\. Pins connect directly to other pins, wires, net labels, sheet entries or ports\.  
__Notes__  
The IPin interface is inherited from the INetItem interface\.  
The pins are part of a schematic component, thus if you wish to have access to the pins, invoke the DM\_Pins and DM\_PinCount method call from the part object interface\.  
An equivalent Pin object representation is the ISch\_Pin interface in Schematic API Reference  
__Example__

01

For J := 0 to Doc\.DM\_ComponentCount \- 1 Do

02

Begin

03

    Comp := Doc\.DM\_Components\(J\);

04

    //Comp\.DM\_Footprint;

05

    //Comp\.DM\_Comment;

06

    For K := 0 to Comp\.DM\_PinCount \- 1 Do

07

    Begin

08

        Pin := Comp\.DM\_Pins\(K\);

09

        PinName := Pin\.DM\_PinNumber;

10

        // Check for parts of a multi\-part component that are not used in the project

11

        // then add 'No Net' for unused pins\.\.\.

12

        If Pin\.DM\_FlattenedNetName = '?' Then

13

           // these pins of the part is not used on the schematic\.

14

    End;

15

End;

__See also__  
INetItem interface


__Overview__  
The IPort interface is a port object interface to an existing port object on the schematic\. A port is used to connect a net on one sheet to Ports with the same name on other sheets\.  Ports can also connect from child sheets to Sheet entries, in the appropriate sheet symbol on the parent sheet\.  
__Notes__  
The IPort interface is inherited from the INetItem interface\.  
An equivalent Port object representation is the ISch\_Port class in Schematic API Reference\.  
__Example__

01

Var

02

    DM\_Port        : IPort;

03

    I              : Integer;

04

    S              : TDynamicString;

05

    ServerDocument : IServerDocument;

06

Begin

07

    If ADM\_Document = Nil Then Exit;

08

    If Not ADM\_Document\.DM\_ValidForNavigation Then Exit;

09

  

10

    S := ADM\_Document\.DM\_FullPath;

11

    ServerDocument := Client\.GetDocumentByPath\(PChar\(S\)\);

12

    If ServerDocument = Nil Then Exit;

13

  

14

    If Not StringsEqual\(TDynamicString\(ServerDocument\.Kind\), 'Sch'\) Then Exit;

15

  

16

    For i := 0 To ADM\_Document\.DM\_PortCount \- 1 Do

17

    Begin

18

        DM\_Port := ADM\_Document\.DM\_Ports\(i\);

19

        If DM\_Port <> Nil Then

20

          If DM\_Port\.DM\_ValidForNavigation Then

21

        Begin

22

           // port is available for manipulation here\. 

23

        End;

24

    End;

25

End;

__See also__  
INetItem interface


__Overview__  
The IPowerObject interface is a power object interface to an existing power object on the schematic\. Power ports are special symbols that represent a power supply and are always identified by their net names\.  
__Notes__  
The IPowerObject interface is inherited from the INetItem interface\.  
An equivalent PowerObject object representation is the ISch\_PowerObject class in Sch API Reference\.  
__See also__  
INetItem interface\.


__Overview__  
The IRoom interface is a PCB room object\. A room is controlled by the room design rule\. This room serves as a boundary constraint for a group of specified components as a component or channel class\.  
__Interface Methods__

__Method__

__Description__

Function    DM\_LX : Integer;

Returns the lower X coordinate of the room object\.

Function    DM\_LY : Integer;

Returns the lower Y coordinate of the room object\.

Function    DM\_HX : Integer;

Returns the higher X coordinate of the room object\.

Function    DM\_HY : Integer;

Returns the higher Y coordinate of the room object\.

Function    DM\_RoomName : WideString;

Returns the name of this room object\.

Function    DM\_Scope1Expression : WideString;

Returns the scope 1 expression which describes the scope of this room object\.

Function    DM\_Layer : Integer;  

Returns the PCB layer where the room resides on\.


__Overview__  
The IRoom interface is a PCB room object\. A room is controlled by the room design rule\. This room serves as a boundary constraint for a group of specified components as a component or channel class\.

__IRoom methods__  
DM\_LX  
DM\_LY  
DM\_HX  
DM\_HY  
DM\_RoomName  
DM\_Scope1Expression  
DM\_Layer

__IRoom properties__



\(IRoom interface\)  
__Syntax__  
Function DM\_HX : Integer;  
__Description__  
Returns the higher X coordinate of the room object\.  
__Example__  
__See also__  
IRoom interface


\(IRoom interface\)  
__Syntax__  
Function DM\_HY : Integer;  
__Description__  
Returns the higher Y coordinate of the room object\.  
__Example__  
__See also__  
IRoom interface


\(IRoom interface\)  
__Syntax__  
Function DM\_Layer : Integer;  
__Description__  
Returns the PCB Layer value of the room object that it is on\.  
__Example__  
__See also__  
IRoom interface


\(IRoom interface\)  
__Syntax__  
Function DM\_LX : Integer;  
__Description__  
Returns the lower X coordinate of the room object\.  
__Example__  
__See also__  
IRoom interface


\(IRoom interface\)  
__Syntax__  
Function DM\_LY : Integer;  
__Description__  
Returns the lower Y coordinate of the room object\.  
__Example__  
__See also__  
IRoom interface


\(IRoom interface\)  
__Syntax__  
Function DM\_RoomName : WideString;  
__Description__  
The function returns the room name\.  
__Example__  
__See also__  
IRoom interface


\(IRoom interface\)  
__Syntax__  
Function DM\_Scope1Expression : WideString;  
__Description__  
The function returns the scope 1 expression which describes the scope of this room object\.  
__Example__  
__See also__  
IRoom interface


__Overview__  
The IRule interface represents the one of the rules attached to a parameter within the PCB Layout directive \(as a Parameter Set object with a small flag symbol\) on a net aware object on a schematic object\. A parameter set object can be placed on the schematic sheet by the Place » Directives » PCB Layout menu item\.

This PCB Layout directive allows you to assign PCB layout information to a net in the schematic\. When a PCB is created from the schematic, the information in the PCB layout directive is used to create relevant PCB design rules\.

__IRule methods__  
DM\_RuleKind  
DM\_Scope1Expression  
DM\_Scope2Expression  
DM\_MaxWidth  
DM\_MinWidth  
DM\_PreferedWidth  
DM\_ViaHole  
DM\_ViaWidth  
DM\_MinViaHole  
DM\_MaxViaHole  
DM\_MinViaWidth  
DM\_MaxViaWidth  
DM\_ViaStyle  
DM\_Topology  
DM\_Priority  
DM\_RoutingLayers  
DM\_Attributes  
DM\_Description  
DM\_RuleName  
DM\_UniqueId

__IRule properties__



\(IRule interface\)  
__Syntax__  
Function DM\_Attributes : WideString;  
__Description__  
The function denotes the attributes of the IRule interface\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_Description : WideString;  
__Description__  
The function denotes the description of this IRule interface\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_MaxViaHole : Integer;  
__Description__  
The function denotes the max Via Hole rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_MaxViaWidth : Integer;  
__Description__  
The function denotes the max Via width rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_MaxWidth : Integer;  
__Description__  
The function denotes the Maximum Width rule property of a PCB rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_MinViaHole : Integer;  
__Description__  
The function denotes the min Via Hole rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_MinViaWidth : Integer;  
__Description__  
The function denotes the min Via width rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_MinWidth : Integer;  
__Description__  
The function denotes the Minimum Width rule property of a PCB Rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_PreferedWidth : Integer;  
__Description__  
The function denotes the preferred Width rule property of a PCB Rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_Priority : Integer;  
__Description__  
The function denotes the priority of the PCB Design Rule\. The priority value of 1 denotes the highest priority\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_RoutingLayers \(IndexLayer : Integer\) : Integer;  
__Description__  
The function denotes the indexed routing layer rule property \(Top layer, Mid1\-Mid30, Bottom Layer\) of a Routing Layers PCB rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_RuleKind : Integer;  
__Description__  
The function denotes the type of PCB Rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_RuleName : WideString;  
__Description__  
The function denotes the name of this IRule interface representing a PCB rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_Scope1Expression : WideString;  
__Description__  
The function denotes the first scope expression string\. The scope of Design rules are determined by the defined boundary or objects\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_Scope2Expression : WideString;  
__Description__  
The function denotes the second scope expression string\. The scope of Design rules are determined by the defined boundary or objects\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_Topology : Integer;  
__Description__  
The function Denotes the topology \(Shortest, Horizontal, Vertical, Daisy\-Simple, Daisy\-MidDriven, Daisy\-Balanced and Daisy\-StarBurst\) rule property of a Routing Topology PCB Rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_UniqueId : WideString;  
__Description__  
Each rule has a Unique ID assigned so that when Schematic and PCB documents are synchronized, the ECO knows which rules to update or apply to/from\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_ViaHole : Integer;  
__Description__  
Denotes the Via Hole rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_ViaStyle : Integer;  
__Description__  
This function denotes the via style rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface


\(IRule interface\)  
__Syntax__  
Function DM\_ViaWidth : Integer;  
__Description__  
The function denotes the Via width rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface


__Overview__  
The ISheetSymbol interface is a sheet symbol interface to an existing sheet symbol object on the schematic\. Sheet symbols represent other schematic sheets \(often referred to as a child sheet\)\. The link between a sheet symbol and other schematic sheets is the FileName attribute, which must be the same as the name of the child sheet\.

An equivalent Sheet Symbol object representation is the ISch\_SheetSymbol class in Sch API Reference\.

__ISheetSymbol methods__  
DM\_SheetEntries  
DM\_SheetEntryCount  
DM\_ChildSheet  
DM\_ChildSheetCount  
DM\_SheetSymbolFileName  
DM\_LogicalDesignator  
DM\_CalculatedDesignator  
DM\_PhysicalDesignator  
DM\_UniqueId

__ISheetSymbol properties__



\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_CalculatedDesignator : WideString;  
__Description__  
This function returns the calculated designator string which contains the hierarchical path and the logical designator strings\. Only when a project is compiled and up to date, designators of sheet symbols are calculated based on the physical documents they are on\.  
__Example__  
__See also__  
ISheetSymbol interface


\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_ChildSheet \(Index : Integer\) : IDocument;  
__Description__  
Returns the indexed child sheet associated with this sheet symbol object\. Use in conjunction with the DM\_ChildSheetCount method\.  
__Example__  
__See also__  
ISheetSymbol interface


\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_ChildSheetCount : Integer;  
__Description__  
Returns the number of child sheets associated with this sheet symbol object\.  
__Example__  
__See also__  
ISheetSymbol interface


\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_LogicalDesignator : WideString;  
__Description__  
Returns the logical designator of this sheet symbol\. A logical designator is not unique, since logical designators are used in multi channel designs\.  
__Example__  
__See also__  
ISheetSymbol interface


\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_PhysicalDesignator : WideString;  
__Description__  
Returns the designator of this sheet symbol\. Every physical designator is unique\.  
__Example__  
__See also__  
ISheetSymbol interface


\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_SheetEntries \(Index : Integer\) : INetItem;  
__Description__  
Returns the number of sheet entries that are associated with this sheet symbol\. Since a sheet entry is of a INetItem type, thus a INetItem interface is returned\.  
__Example__  
__See also__  
ISheetSymbol interface


\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_SheetEntryCount : Integer;  
__Description__  
Returns the number of sheet entries associated with this sheet symbol object\.  
__Example__  
__See also__  
ISheetSymbol interface


\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_SheetSymbolFileName : WideString;  
__Description__  
Returns the filename which is a link between this sheet symbol object and the other schematic sheet\.  
__Example__  
__See also__  
ISheetSymbol interface


\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_UniqueId : WideString;  
__Description__  
Returns the unique ID of this sheet symbol object\.  
__Example__  
__See also__  
ISheetSymbol interface


__Overview__  
The __ISheetEntry__ interface is a sheet entry object interface to an existing sheet entry object on the schematic\. A sheet entry creates a connection between the net touching on the parent sheet, to a Port with the same name on the child sheet\.  
__Notes__  
The __ISheetEntry__ interface is inherited from the __INetItem__ interface\.  
An equivalent SheetEntry object representation is the __ISch\_SheetEntry__ class in Sch API Reference\.  
__See also__  
INetItem interface\.


__Overview__  
The ITextFrame interface is a text frame object for an existing text frame on a schematic document\. It is a container holding lines of text like a memo\.

An equivalent TextFrame object representation is the ISch\_TextFrame interface in the Schematic API reference\.

__ITextFrame methods__  
DM\_Text

__ITextFrame properties__



\(ITextFrame interface\)  
__Syntax__  
Function DM\_Text : WideString;  
__Description__  
This function returns the text string from this current TextFrame object\.  
__Example__  
__See also__  
ITextFrame interface


__Overview__  
The IViolation interface represents a violation object on a design document in the Workspace Manager of Altium Designer\.

__IViolation methods__  
DM\_ErrorKind  
DM\_ErrorLevel  
DM\_CompilationStage  
DM\_AddRelatedObject  
DM\_RelatedObjectCount  
DM\_RelatedObjects  
DM\_DescriptorString  
DM\_DetailString

__IViolation properties__



\(IViolation interface\)  
__Syntax__  
Procedure DM\_AddRelatedObject \(AnObject : IDMObject\);  
__Description__  
This procedure adds the object that is part of the violation\.  
__Example__  
__See also__  
IViolation interface


\(IViolation interface\)  
__Syntax__  
Function DM\_CompilationStage : TCompilationStage;  
__Description__  
This function returns the status of the complation stage: during compilation or during flattening process\.  
__Example__  
__See also__  
IViolation interface


\(IViolation interface\)  
__Syntax__  
Function DM\_DescriptorString : WideString;  
__Description__  
This function returns the description string for this violation interface\.  
__Example__  
__See also__  
IViolation interface


\(IViolation interface\)  
__Syntax__  
Function DM\_DetailString : WideString;  
__Description__  
This function returns the detailed description stirng of this violation interface\.  
__Example__  
__See also__  
IViolation interface


\(IViolation interface\)  
__Syntax__  
Function DM\_ErrorKind : TErrorKind;  
__Description__  
Returns the kind of error this violation has been assigned to\.  
__Example__  
__See also__  
IViolation interface


\(IViolation interface\)  
__Syntax__  
Function DM\_ErrorLevel : TErrorLevel;  
__Description__  
Returns the level of error this violation has been assigned to\. Various error levels include : eErrorLevelNoReport,eErrorLevelWarning,eErrorLevelError,eErrorLevelFatal  
__Example__  
__See also__  
IViolation interface  
TErrorLevel type


\(IViolation interface\)  
__Syntax__  
Function DM\_RelatedObjectCount : Integer;  
__Description__  
This function returns the number of related objects of the violation\.  
__Example__  
__See also__  
IViolation interface


\(IViolation interface\)  
__Syntax__  
Function DM\_RelatedObjects \(Index : Integer\) : IDMObject;  
__Description__  
This function returns the indexed related object of the violation\.  
__Example__  
__See also__  
IViolation interface


__Overview__  
The __IWrapper__ interface hierarchy is as follows;

__IWrapper methods__  
DM\_GroupedSchObjects\_Count  
DM\_GroupedSchObject

__IWrapper properties__



\(IWrapper interface\)  
__Syntax__  
Function DM\_GroupedSchObject\(i : Integer\) : IWrapper;End;  
__Description__  
__Example__  
__See also__  
IWrapper interface


\(IWrapper interface\)  
__Syntax__  
Function DM\_GroupedSchObjects\_Count : Integer;  
__Description__  
__Example__  
__See also__  
IWrapper interface

## 子章节

- [Workspace Manager API: Design Objects Reference](01-Workspace_Manager_API_Design_Objects_Reference.md/README.md)
