### <a id="INotification_Interface"></a>INotification Interface

__Overview__  
The INotification__ __interface is used by the IClient, IServerView, IServerDocument, IServerModule, INotificationHandler interfaces\.  
The notifications could be a document loading notification, workspace being loaded, an object being navigated, and a server module being loaded\.  
Notifications as event messages can be broadcasted by the Client system, and any open server documents can receive them and act on them accordingly\.  
The Broadcast Notification is a system wide notification, and the Dispatch Notification is a server specific notification\.

#### Different types of notifications

1\. DocumentNotification  
2\. ViewNotification  
3\. DocumentFormNotification  
4\. ModuleNotification  
5\. SystemNotification  
6\. MessagesNotification  
7\. DragDropNotification  
8\. FastCrossSelectNotification

#### Setting up notifications in a server project,

1\. Override the ReceiveNotifications method in the TServerModule class to handle and process different notifications\.  
2\. Define different notification handlers\.  
3\. Process each handler based on the Code property of each notification\.  
__Example__

01

Procedure TNotificationModule\.ReceiveNotification\(Const ANotification: INotification\);

02

Var

03

    DocumentNotification : IDocumentNotification;

04

    ViewNotification     : IViewNotification;

05

    FormNotification     : IDocumentFormNotification;

06

    ModuleNotification   : IModuleNotification;

07

    SystemNotification   : ISystemNotification; 

08

Begin

09

    If Supports\(ANotification, IDocumentNotification, DocumentNotification\) Then

10

           HandleDocumentNotification\(DocumentNotification\);

11

  

12

    If Supports\(ANotification, IViewNotification, ViewNotification\) Then

13

           HandleViewNotification\(ViewNotification\);

14

  

15

    If Supports\(ANotification, IDocumentFormNotification, FormNotification\) Then

16

           HandleFormNotification\(FormNotification\);

17

  

18

    If Supports\(ANotification, IModuleNotification, ModuleNotification\) Then

19

           HandleModuleNotification\(ModuleNotification\);

20

  

21

    If Supports\(ANotification, ISystemNotification, SystemNotification\) Then

22

           HandleSystemNotification\(SystemNotification\);

23

End;

  
The INotification interface hierarchy is as follows;  
INotification  
IDocumentNotification  
IViewNotification  
IDocumentFormNotification  
IModuleNotification  
ISystemNotification  
IMessageNotification  
IDragDropNotification  
IDocumentRequest  
IFastCrossNotification

__INotification methods__

__INotification properties__

__See also__  
IClient Interface  
IServerView interface  
IServerDocument interface  
IServerModule interface  
INotificationHandler interface  
IDocumentNotification interface  
IViewNotification interface  
IDocumentFormNotification interface  
IModuleNotification interface  
ISystemNotification interface  
IMessageNotification interface  
IDragDropNotification interface  
IDocumentRequest interface  
IFastCrossNotification interface

#### IDocumentFormNotification Interface

\(IDocumentFormNotification interface\)  
__Overview__  
   
__Description__  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface

#### ISystemNotification Interface

\(ISystemNotification interface\)  
__Syntax__  
   
__Description__  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface

#### IMessagesNotification Interface

__Overview__  
The IMessagesNotification interface

__IMessagesNotification methods__

__IMessagesNotification properties__  
Code

__See also__  
IClient interface  
IExternalForm interface

#### IModuleNotification Interface

__Overview__  
   
__See also__  
IClient interface  
IExternalForm interface

#### IViewNotification Interface

__Overview__  
   
__Description__  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface

#### IDragDropNotification Interface

__Overview__  
__Notes__  
Inherited from INotification interface\.

__IDragDropNotification Methods__  
GetCode  
GetDragDropObject

__IDragDropNotification Properties__

__See also__  
IDragDropObject interface

#### IEventNavigated Interface

__Overview__

__IEventNavigated Methods__  
GetCode  
GetWnd

__IEventNavigated Properties__  
Code  
Wnd

__See also__  
IDragDropObject interface

#### INavigationProvider Interface

__Overview__

__INavigationProvider Methods__  
NavigateTo

__INavigationProvider Properties__

__See also__  
IDragDropObject interface

#### INavigator Interface

__Overview__

__INavigator Methods__  
NavigateTo

__INavigator Properties__

__See also__

#### IBackForwardNavigator Interface

__Overview__

__IBackForwardNavigator Methods__  
GetAddress : WideString;   
GetCaption : WideString;   
   
GetBackwardHistoryCount    
GetBackwardHistoryAddress  
GetBackwardHistoryCaption  
MoveBackward               
   
GetForwardHistoryCount     
GetForwardHistoryAddress   
GetForwardHistoryCaption   
MoveForward              

__IBackForwardNavigator Properties__  
Address  
Caption

__ __  
__See also__

#### INavigationSystem Interface

__Overview__

__INavigationSystem Methods__  
RegisterNavigationProvider  
UnregisterNavigationProtocol  
   
RegisterSpecialURLString  
UnregisterSpecialURLString  
   
ParseDestinationString  
NavigateTo  
ExpandTargets  
ValidatedTarget

__INavigationSystem Properties__

__See also__  
IDragDropObject interface

#### INavigateAttributes Interface

__Overview__

__INavigateAttributes Methods__  
GetAddress :   
GetCaption :   
   
IsSameAddress

__INavigateAttributes Properties__  
Address  
Caption

__See also__