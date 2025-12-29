### <a id="IServerModule_Methods"></a>IServerModule Methods

#### AddServerView method

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

#### ApplicationIdle method

\(IServerModule interface\)  
__Syntax__  
Procedure ApplicationIdle;  
__Description__  
The ApplicationIdle procedure is an internal procedure that gets invoked when Altium Designer is idling\. The ApplicationIdle procedure in all active running servers gets invoked\. The messages sent by Altium Designer get the chance to be followed up\.  
__Example__  
__See also__  
IServerModule interface

#### CreateDocument method

\(IServerModule interface\)  
__Syntax__  
Function CreateDocument \(Const AKind, AFileName : Widestring\) : IServerDocument;  
__Description__  
The CreateDocument function creates a document supported by the server based on the AKind and AFilename parameters\.  
The AKind parameter represents the document kind that the server supports and the AFileName parameter is assigned to the new document\.  
__Example__  
__See also__  
IServerModule interface

#### CreateServerDocView method

\(IServerModule interface\)  
__Syntax__  
Function CreateServerDocView \(Const AName : Widestring; Const ADocument : IServerDocument\): IServerDocumentView;  
__Description__  
The CreateServerDocView function creates an IServerDocumentView \(which could be the document or its associated panel view\) object based on the Name of the document view and the IServerDocument container\.  
__Example__  
__See also__  
IServerModule interface

#### CreateServerView method

\(IServerModule interface\)  
__Syntax__  
Function CreateServerView \(Const AName : Widestring\) : IServerView;  
__Description__  
The CreateServerView function creates a IServerView object representing a system panel\. You need to invoke the AddServerView procedure to add the object within Altium Designer\.  
__Example__  
__See also__  
IServerModule interface

#### CreateOptionsView method

\(IServerModule interface\)  
__Syntax__  
Function CreateOptionsView \(Const AName : Widestring\) : IDocumentOptionsView;  
__Description__  
The CreateOptionsView creates a IDocumentOptions view to be used in the system wide Preferences dialog in Altium Designer\.  
__Example__  
__See also__  
IServerModule interface

#### DestroyDocument method

\(IServerModule interface\)  
__Syntax__  
Procedure DestroyDocument \(Const ADocument : IServerDocument\);  
__Description__  
The DestroyDocument procedure closes and removes the design document as specified by the ADocument parameter\.  
__Example__  
__See also__  
IServerModule interface

#### ReceiveNotification method

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

#### RemoveServerView method

\(IServerModule interface\)  
__Syntax__  
Procedure RemoveServerView \(Const AView : IServerView\);  
__Description__  
The RemoveServerView procedure removes a IServerView object in Altium Designer which represents a system panel\.  
__Example__  
__See also__  
IServerModule interface

#### CreateDocumentShowOrHide method

\(IServerModule interface\)  
__Syntax__  
Function  CreateDocumentShowOrHide\(Const AKind, AFileName : Widestring;  
            AShowInTree : Boolean\) : IServerDocument;  
__Description__  
The CreateDocumentShowOrHide function controls how a document when created is displayed in Altium Designer\.  
__Example__  
__See also__  
IServerModule interface