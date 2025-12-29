#### Properties

##### VCSProject property

\(IDMObject interface\)  
__Syntax__  
   
__Description__  
__Example__  
   
__See also__  
IClient interface  
IVCSProjectAccessor interface

### <a id="IWorkspace_interface"></a>IWorkspace interface

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