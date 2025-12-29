### <a id="IServerModule_GetState_and_SetState_Meth"></a>IServerModule GetState and SetState Methods

#### GetClient method

\(IServerModule interface\)  
__Syntax__  
Function GetClient : IClient;  
__Description__  
The GetClient method returns the IClient interface of the client subsystem of Altium Designer\. This IClient interface can be used to invoke its methods\.  
The GetClient method is used for the Client property\.  
__Example__  
__See also__  
IServerModule interface

#### GetCommandLauncher method

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

#### GetDocumentCount method

\(IServerModule interface\)  
__Syntax__  
Function GetDocumentCount : Integer;  
__Description__  
The DocumentCount method returns you the number of Document Kinds\. An important note is that a View is the actual design document\. A Document type is a container that stores specific Views\.  
This method is used for the DocumentCount property\.  
__Example__  
__See also__  
IServerModule interface

#### GetDocuments method

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

#### GetHandle method

\(IServerModule interface\)  
__Syntax__  
Function GetHandle : THandle;  
__Description__  
The method returns the handle of the server\.  
This method is used for the Handle property\.  
__Example__  
__See also__  
IServerModule interface

#### GetModuleName method

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

#### GetProcessControl method

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

#### GetViewCount method

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

#### GetViews method

\(IServerModule interface\)  
__Syntax__  
Function GetViews \(Index : Integer\) : IServerView;  
__Description__  
The GetViews method in conjunction with the GetViewCount method returns you the indexed View object\. A view is a form supported by its associated server\.  
This method is used for the Views property\.  
__Example__  
__See also__  
IServerModule interface