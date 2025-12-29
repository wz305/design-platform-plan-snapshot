### <a id="Properties"></a>Properties

#### Client property

\(IServerModule interface\)  
__Syntax__  
Property Client : IClient Read GetClient;  
__Description__  
The Client property returns the IClient interface of the client subsystem of Altium Designer\. This IClient interface can be used to invoke its methods\.  
This readonly property is supported by the GetClient method\.  
__Example__  
__See also__  
IServerModule interface

#### CommandLauncher property

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

#### DocumentCount property

\(IServerModule interface\)  
__Syntax__  
Property DocumentCount : Integer Read GetDocumentCount;  
__Description__  
The DocumentCount property returns you the number of Document Kinds\. An important note is that a View is the actual design document\. A Document type is a container that stores specific Views\.  
This property is supported by the GetDocumentCount method\.  
__Example__  
__See also__  
IServerModule interface

#### Documents property

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

#### Handle property

\(IServerModule interface\)  
__Syntax__  
Property Handle : THandle Read GetHandle;  
__Description__  
The Handle property returns the handle of the server\. This read only property is supported by the GetHandle method\.  
__Example__  
__See also__  
IServerModule interface

#### ModuleName property

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

#### ProcessControl property

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

#### ViewCount property

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

#### Views property

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