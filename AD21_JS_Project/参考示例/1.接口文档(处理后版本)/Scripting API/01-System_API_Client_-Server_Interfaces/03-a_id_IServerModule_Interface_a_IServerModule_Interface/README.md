# <a id="IServerModule_Interface"></a>IServerModule Interface

__Overview__  
A server deals with its own server documents\. There can be different design document types, for example the Schematic Editor has two Schematic and Schematic Library document types\.

Each design document, in turn stores views which can be a document window or a panel window\. A server has the ability to host multiple panel views for a single document view, see the diagram below\.

A server also has the ability to host multiple global panel views that represent some system state and are not necessarily tied to a particular design document \(for example the Work\-Space Manager server has Message, Differences and Errors panels\)\. This document view / multiple panel views structure is the foundation of Altium Designer client / server architecture\.

These IServerModule interfaces \(from the RT\_ClientServerInterface unit\) represent loaded servers in Altium Designer\. This application manages single instances of different server modules\. Each server can have multiple server document kinds, for example the PCB server supports two server document kinds – PCB and PCBLIB design documents\. A loaded server in Altium Designer typically hosts documents and each document in turn hosts a document view and panel views\.

The diagram below represents a server module with server documents\. Each document has views \- the document view and the associated panel view\.

__Notes__  
An IServerModule interface has the following interfaces:

- ICommandLauncher deals with a server’s processes table
- IServerDocument represents a loaded design document in Altium Designer
- IServerView represents a panel that can have a view of the Altium Designer system
- IServerDocumentView \(deals with a document view \(either the document window or panel window\)
- IExternalForm represents a Altium Designer aware Delphi form either as a document form or a panel form\. These forms are wrapped by the IServerDocumentView or IServerView interface object\. This IExternalForm interface object has low level methods such as resizing and displaying the form and is the ancestor interface for IServerDocumentView and IServerView interfaces\.
- IProcessControl represents the level of stacked processes for this focussed server document
- INotification receives system notifications from the Client system and all server modules receive these notifications\. There is an ability to handle a notification and take it from there\. Documents and associated panels can be synchronized through the use of notifications as well\.

__Notes__  
The PCB server module also has its IPCB\_ServerInterface interface\.  
The Schematic Server module also has its ISCH\_ServerInterface interface\.  
However both servers also have this IServerModule interface\.

__IServerModule Methods and Properties Table__

__IServerModule methods__  
ApplicationIdle  
ReceiveNotification  
CreateDocument  
DestroyDocument  
CreateOptionsView  
CreateServerView  
CreateServerDocView  
RemoveServerView  
AddServerView  
CreateDocumentShowOrHide

__IServerModule Properties__  
Client  
CommandLauncher  
Handle  
ModuleName  
ProcessControl  
DocumentCount  
Documents  
ViewCount  
Views

__See also__  
IPCB\_ServerInterface interface  
ISCH\_ServerInterface interface



\(IServerModule interface\)  
__Syntax__  
Function GetClient : IClient;  
__Description__  
The GetClient method returns the IClient interface of the client subsystem of Altium Designer\. This IClient interface can be used to invoke its methods\.  
The GetClient method is used for the Client property\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function GetCommandLauncher : ICommandLauncher;  
__Description__  
The CommandLauncher function returns the ICommandLauncher interface\. It is used to launch a process from its server module\. The CommandLauncher object contains a command table which binds a process name to the actual function that implements the process at run\-time\.  
Whenever a process is called within the server this table is looked up in order to find the actual function pointer\. If a process name is not found within this table then nothing will happen\.  
This CommandLauncher object is initialized in the main\.pas unit of a server project\. See the ICommandLauncher interface for more details\.  
This method is used for the CommandLauncher property\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function GetDocumentCount : Integer;  
__Description__  
The DocumentCount method returns you the number of Document Kinds\. An important note is that a View is the actual design document\. A Document type is a container that stores specific Views\.  
This method is used for the DocumentCount property\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function GetDocuments \(Index : Integer\) : IServerDocument;  
__Description__  
An editor type of server can have different document types, such as Schematic Editor and PCB Editor \- these editor servers have two document types \- SCH/SCHLIB and PCB/PCBLIB respectively\.  
An add\-on type of server will normally have no document containers, because they work with an editor server acting like a piggy back and utilising the editor server's API services\.  
This method returns you the indexed document container which is represented by the IServerDocument interface\.  
This method is used for the Documents property\.  
__Example__  
__See also__  
IServerModule interface  
IServerDocument interface


\(IServerModule interface\)  
__Syntax__  
Function GetHandle : THandle;  
__Description__  
The method returns the handle of the server\.  
This method is used for the Handle property\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function GetModuleName : Widestring;  
__Description__  
The method returns the module name of this server\.  
For example the texteditor server’s module name is TextEdit\. This server name property is defined in the associated server installation file \(with an INS file extension\)\.  
This method is used for the ModuleName property\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function GetProcessControl : IProcessControl;  
__Description__  
The method returns the IProcessControl interface\. This interface controls the process depth for each design document in Altium Designer\.  
Every time a process is launched on a document, the process depth is increased by one and once this same process has finished executing, the process depth is decreased by one\. When the process depth is zero, it denotes that nothing is taking place on the current design document\.  
This read only property is supported by the GetProcessControl method\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function GetViewCount : Integer;  
__Description__  
The ViewCount method returns you the number of views for the specified server\.  
A View object encapsulates a form/window object in Altium Designer normally as a global panel supported by its associated server\.  
This method is used for the ViewCount property\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function GetViews \(Index : Integer\) : IServerView;  
__Description__  
The GetViews method in conjunction with the GetViewCount method returns you the indexed View object\. A view is a form supported by its associated server\.  
This method is used for the Views property\.  
__Example__  
__See also__  
IServerModule interface



\(IServerModule interface\)  
__Syntax__  
Procedure AddServerView \(Const AView : IServerView\);  
__Description__  
This procedure adds a panel in the Server Module where this new panel can be used by the module\.  
Invoke this function after you have created a IServerView object with the CreateServerView function or pass in the IServerView interface parameter\.  
__Example__  
__See also__  
IServerModule interface  
IServerView interface


\(IServerModule interface\)  
__Syntax__  
Procedure ApplicationIdle;  
__Description__  
The ApplicationIdle procedure is an internal procedure that gets invoked when Altium Designer is idling\. The ApplicationIdle procedure in all active running servers gets invoked\. The messages sent by Altium Designer get the chance to be followed up\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function CreateDocument \(Const AKind, AFileName : Widestring\) : IServerDocument;  
__Description__  
The CreateDocument function creates a document supported by the server based on the AKind and AFilename parameters\.  
The AKind parameter represents the document kind that the server supports and the AFileName parameter is assigned to the new document\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function CreateServerDocView \(Const AName : Widestring; Const ADocument : IServerDocument\): IServerDocumentView;  
__Description__  
The CreateServerDocView function creates an IServerDocumentView \(which could be the document or its associated panel view\) object based on the Name of the document view and the IServerDocument container\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function CreateServerView \(Const AName : Widestring\) : IServerView;  
__Description__  
The CreateServerView function creates a IServerView object representing a system panel\. You need to invoke the AddServerView procedure to add the object within Altium Designer\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function CreateOptionsView \(Const AName : Widestring\) : IDocumentOptionsView;  
__Description__  
The CreateOptionsView creates a IDocumentOptions view to be used in the system wide Preferences dialog in Altium Designer\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Procedure DestroyDocument \(Const ADocument : IServerDocument\);  
__Description__  
The DestroyDocument procedure closes and removes the design document as specified by the ADocument parameter\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Procedure ReceiveNotification \(Const ANotification : INotification\);  
__Description__  
The ReceiveNotification procedure of the server module intercepts notifications broadcasted by Altium Designer\.  
The system has a BroadCastNotification or a DispatchNotification function which all running servers in Altium Designer can receive and process accordingly\.  
This procedure needs to be overridden and implemented\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Procedure RemoveServerView \(Const AView : IServerView\);  
__Description__  
The RemoveServerView procedure removes a IServerView object in Altium Designer which represents a system panel\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Function  CreateDocumentShowOrHide\(Const AKind, AFileName : Widestring;  
            AShowInTree : Boolean\) : IServerDocument;  
__Description__  
The CreateDocumentShowOrHide function controls how a document when created is displayed in Altium Designer\.  
__Example__  
__See also__  
IServerModule interface



\(IServerModule interface\)  
__Syntax__  
Property Client : IClient Read GetClient;  
__Description__  
The Client property returns the IClient interface of the client subsystem of Altium Designer\. This IClient interface can be used to invoke its methods\.  
This readonly property is supported by the GetClient method\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Property CommandLauncher : ICommandLauncher Read GetCommandLauncher;  
__Description__  
The CommandLauncher property returns the pointer to the ICommandLauncher interface\. It is used to launch a process from its server module\. The CommandLauncher object contains a command table which binds a process name to the actual function that implements the process at run\-time\.  
Whenever a process is called within the server this table is looked up in order to find the actual function pointer\. If a process name is not found within this table nothing will happen\.  
This CommandLauncher object is initialized in the main\.pas unit of a server project\. See the ICommandLauncher interface for more details\.  
This read\-only property is supported by the GetCommandLauncher method\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Property DocumentCount : Integer Read GetDocumentCount;  
__Description__  
The DocumentCount property returns you the number of Document Kinds\. An important note is that a View is the actual design document\. A Document type is a container that stores specific Views\.  
This property is supported by the GetDocumentCount method\.  
__Example__  
__See also__  
IServerModule interface


\(IDocuments interface\)  
__Syntax__  
Property  Documents\[Index : Integer\] : IServerDocument  Read GetDocuments;  
__Description__  
An editor type of server can have different document types, such as Schematic Editor and PCB Editor \- these editor servers have two document types \- SCH/SCHLIB and PCB/PCBLIB respectively\.  
An add\-on type of server will normally have no document containers, because they work with an editor server acting like a piggy back and utilising the editor server's API services\.  
This property returns you the indexed document container which is represented by the IServerDocument interface\.  
This read only property is supported by the GetDocuments method\.  
__Example__  
   
__See also__  
IClient interface  
IServerModule interface  
DocumentCount property


\(IServerModule interface\)  
__Syntax__  
Property Handle : THandle Read GetHandle;  
__Description__  
The Handle property returns the handle of the server\. This read only property is supported by the GetHandle method\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Property ModuleName : Widestring Read GetModuleName;  
__Description__  
The ModuleName property returns the module name of this server\.  
For example the Texteditor server’s module name is TextEdit\. This server name property is defined in the associated server installation file \(with an INS file extension\)\.  
This read only property is supported by the GetModuleName method\.  
__Example__

1

If StringsEqual\(ServerModule\.ModuleName,'TextEdit'\) Then

2

Begin

3

\.\.\.

4

End;

__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Property ProcessControl : IProcessControl Read GetProcessControl;  
__Description__  
The ProcessControl property returns the pointer to the IProcessControl interface\. This interface controls the process depth for each design document in Altium Designer\.  
Every time a process is launched on a document, the process depth is increased by one and once this same process has finished executing, the process depth is decreased by one\. When the process depth is zero, it denotes that nothing is taking place on the current design document\.  
This read only property is supported by the GetProcessControl method\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Property ViewCount : Integer Read GetViewCount;  
__Description__  
The ViewCount property returns you the number of views for the specified server\.  
A View object encapsulates a form/window object in Altium Designer normally as a global panel supported by its associated server\.  
This read only property is supported by the GetViewCount method\.  
__Example__  
__See also__  
IServerModule interface


\(IServerModule interface\)  
__Syntax__  
Property  Views\[Index : Integer\] : IServerView Read GetViews;  
__Description__  
The Views property in conjunction with the ViewCount property returns you the indexed View object\. A view is a form supported by its associated server\.  
This read only property is supported by the GetViews method\.  
__Example__  
   
__See also__  
IClient interface  
IServerModule interface

## 子章节

- [<a id="IServerModule_GetState_and_SetState_Meth"></a>IServerModule GetState and SetState Methods](01-a_id_IServerModule_GetState_and_SetState_Meth_a_IServerModule_GetState_and_SetState_Methods.md.md)
- [<a id="IServerModule_Methods"></a>IServerModule Methods](02-a_id_IServerModule_Methods_a_IServerModule_Methods.md.md)
- [<a id="Properties"></a>Properties](03-a_id_Properties_a_Properties.md.md)
