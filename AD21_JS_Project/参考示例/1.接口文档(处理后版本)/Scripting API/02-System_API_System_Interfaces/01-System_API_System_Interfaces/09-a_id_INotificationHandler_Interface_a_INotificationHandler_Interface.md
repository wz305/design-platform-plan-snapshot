### <a id="INotificationHandler_Interface"></a>INotificationHandler Interface

__Overview__  
The INotificationHandler interface handles notifications broadcasted in the Altium Designer system\. The notifications could be a document loading notification, workspace being loaded, an object being navigated, and a server module being loaded\.

Notifications as event messages can be broadcasted by the Client system, and any open server documents can receive them and act on them accordingly\. The Broadcast Notification is a system wide notification, and the Dispatch Notification is a server specific notification\.

To register a Notification handler in the server project \(either in a server module object, panel view object or document view object\)  
1\. When a object is created, the Client\.RegisterNotificationHandler is invoked\.  
2\. When a object is destroyed, the Client\.UnregisterNotificationHandler is invoked\.  
3\. To handle custom notifications, a object has a HandlerNotification method which checks if the custom notification code is intercepted then a call can be made to update for example the Panel's preferences controls\.

The INotificationHandler is inherited in the TServerModule, TServerDocumentForm and TServerPanelForm classes and thus custom notifications can be registered and handled\.

__INotificationHandler methods__  
HandleNotification

 

__See also__  
IClient interface

#### INotificationHandler Methods

##### HandleNotification

\(INotificationHandler interface\)  
__Syntax__  
Procedure HandleNotification\(Const ANotification : INotification\);  
__Description__  
__Example__  
   
__See also__  
IClient interface