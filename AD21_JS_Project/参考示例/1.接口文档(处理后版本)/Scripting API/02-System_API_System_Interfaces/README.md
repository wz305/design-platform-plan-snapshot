# System API System Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [System API System Interfaces for version 22](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- System API](https://www.altium.com/documentation/altium-designer/technical-reference-system-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


Contents of this reference:

[ICommandLauncher Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#ICommandLauncher Interface)  
[IGUIManager Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IGUIManager Interface)  
[INavigationSystem Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#INavigationSystem Interface)  
[INotification Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#INotification Interface)  
[IDynamicHelpManager Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IDynamicHelpManager Interface)  
[IFastCrossSelectNotification Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IFastCrossSelectNotification Interface)  
[IDocumentNotification Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IDocumentNotification Interface)  
[IDocumentRequest Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IDocumentRequest Interface)

[INotificationHandler Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#INotificationHandler Interface)  
[IProcessLauncher Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IProcessLauncher Interface)  
[IProcessLauncherInfo Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IProcessLauncherInfo Interface)  
[IProcessControl Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IProcessControl Interface)  
[ILicenseManager Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#ILicenseManager Interface)  
[IOptionsManager Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IOptionsManager Interface)  
[IOptionsReader Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IOptionsReader Interface)  
[IOptionsWriter Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IOptionsWriter Interface)

[IOptionsPage Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IOptionsPage Interface)  
[IServerProcess Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IServerProcess Interface)  
[IServerRecord Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IServerRecord Interface)  
[IServerWindowKind Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IServerWindowKind Interface)  
[IServerSecurity Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#IServerSecurity Interface)  
[ITimerManager Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#ITimerManager Interface)  
[ITimerHandler Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#ITimerHandler Interface)  
[ITranslationManager Interface](https://www.altium.com/documentation/altium-designer/system-api-system-interfaces?version=21#ITranslationManager Interface)


__Overview__  
The ICommandLauncher interface encapsulates the functionality of launching a command \(which is a pre packaged process\) in Altium Designer\. A command is associated with a user interface item in the server \(Text Editor, Schematic Editor etc\) such as a hot key button, menu item or a toolbar bitmap\. In essence, a server is supported by its set of processes and the processes act as a link between Altium Designer and this server\.

The LaunchCommand method launches a process from the server that this ICommandLauncher interface function is associated with\.

The GetCommandState method retrieves information for the specified command\.

Since a server has a set of processes and these process identifiers are stored in an installation file \(which ends with an INS extension\) and the process launchers that link to specific user interface elements \(also called resources\) and the layout of user interface elements are defined in the resources file \(which ends with a RCS extension\)\.

__ICommandLauncher Methods and Properties Table__

__ICommandLauncher Methods__  
LaunchCommand  
GetCommandState

__ICommandLauncher Properties__

__Notes__  
All the functions in a server available to the user, such as placing a primitive, changing the zoom level and so on are performed by commands which are pre\-packaged process launchers\. The pre\-packaged process launchers bundle together the process that runs when the command is selected, plus any parameters, bitmaps \(icons\), captions \(the name of an item that displays on a resource\), descriptions and associated shortcut keys\.

When you select a menu item or click on a toolbar button, you are launching a process\. Processes are launched by passing the process identifier to the appropriate server and the server then executes the process\. Processes are defined and implemented in the Commands unit of a server source code project\. The processes are declared in an Installation File \(with an INS extension\)\.

Each process has a process identifier\.  The process identifier is made up of two parts separated by a colon\.  The first part of the process identifier indicates the server that defines the process, and the second part is the process name\. 

For example, the process Sch:ZoomIn is provided by Schematic server\.  When this process is launched, either by selecting a menu item, pressing a hot key or activating a toolbar button \(which are all defined as process launchers in the Altium Designer\), it will perform the task of zooming in on the currently active schematic sheet\.

When a server is started up for the first time in Altium Designer, process procedures or commands registered in the CommandLauncher object within the server module are loaded in Altium Designer\.

__See also__  
IClient interface  
IServerModule interface



\(ICommandLauncher interface\)  
__Syntax__  
Procedure GetCommandState\(      ACommandName,  
                                AParameters      : PChar;  
                          Const AContext         : IServerDocumentView;  
                          Var   Enabled,  
                                Checked,  
                                Visible          : LongBool;  
                                Caption,  
                                ImageFile        : PChar\);  
__Description__  
The GetCommandState procedure fetches the current snapshot of the server command \(internal server process\) and the parameters are returned for the specified server command name\.  
__Example__

01

ACommandLauncher := AServerModule\.GetCommandLauncher;

02

If ACommandLauncher <> Nil Then

03

Begin

04

    ACommandLauncher\.GetCommandState\(Command,

05

                                     Parameters,

06

                                     View,

07

                                     Enabled,

08

                                     Checked,

09

                                     Visible,

10

                                     Caption,

11

                                     Image\);

12

    // do what you want with the parameters 

13

    // after you have supplied the Command parameter\.

14

End;

__See also__  
IServerModule interface


\(ICommandLauncher interface\)  
__Syntax__  
Function  LaunchCommand  \(Const ACommandName     : PChar;   
                                AParameters      : PChar;   
                                MaxParameterSize : Integer;   
                                AContext         : IServerDocumentView\) : LongBool;  
__Description__  
This function launches a command from a server module or from Client\. \(Client also has its own command launcher table since Client has its own processes as well\)\.  
The AContext parameter denotes which IServerDocumentView interface to launch the process onto\. If the command can be launched, the function returns a true value\.  
__Example__

1

If StringsEqual\(ServerModule\.ModuleName,'TextEdit'\) Then

2

Begin

3

    ServerModule\.CommandLauncher\.LaunchCommand\('TextEdit:MoveCursorToTopOfDocument',

4

                                                Nil,0,ServerDocument\.View\[0\]\);

5

End;

__See also__  
IServerDocumentView interface


__Overview__  
The IGUIManager interface represents the Graphical User interface portions of the Altium Designer application such as resizing panels, checking for certain hot key maps and status bars\.

__IGUIManager methods__  
AddKeyStrokeAndLaunch  
AddKeyToBuffer  
BeginDragDrop  
CanResizePanel  
CurrentProcessLauncherAvailable  
DoneTransparentToolbars  
DXPShortcutToDelphiShortcut  
GetActivePLByCommand  
GetAllAvailableHotkeys  
GetFocusedPanelName  
GetPanelIsOpen  
GetPanelIsOpenInAnyForm  
GetPanelIsVisibleInAnyForm  
GetProcessLauncherInfoByID  
GetShortcutTextForPLID  
InitTransparentToolbars  
IsPanelValidInCurrentForm  
IsPanelVisibleInCurrentForm  
IsSysLevelHotKey  
LaunchCurrentHotkey  
ProcessMessage  
RegisterFloatingWindow  
ResizePanel  
SetFocusLock  
SetPanelActiveInCurrentForm  
SetPanelVisibleInCurrentForm  
ShowCurrentProcessLauncherHelp  
ShowTreeAsPopup  
StatusBar\_GetState  
StatusBar\_SetState  
UnregisterFloatingWindow  
UpdateInterfaceState  
UpdateTransparentToolbars

__IGUIManager properties__

__See also__



\(IGUIManager interface\)  
__Syntax__  
Function AddKeyStrokeAndLaunch \(AKey : Word\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function AddKeyToBuffer \(KeyId : Integer;Alt, Shift, Ctrl : LongBool\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure BeginDragDrop \(ADragDropInfo : IDragDropObject\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function CanResizePanel \(Const AViewName : Widestring\) : LongBool;  
__Description__  
This function determines whether the panel can be resized or not\. The name of the panel need to be supplied\.  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function CurrentProcessLauncherAvailable : LongBool;  
__Description__  
This function determines whether the current process launcher is available or not to use\.  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure DoneTransparentToolbars;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function GetActivePLByCommand \(Const DocumentKind, ACommand, AParams : Widestring\) : IProcessLauncherInfo;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function GetFocusedPanelName : Widestring;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function GetPanelIsOpen \(Const AViewName : Widestring\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function GetProcessLauncherInfoByID \(Const PLID : Widestring\) : IProcessLauncherInfo;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure InitTransparentToolbars \(Const ViewRect : TRect\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function IsPanelValidInCurrentForm \(Const AViewName : Widestring\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function IsPanelVisibleInCurrentForm \(Const AViewName : Widestring\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function IsSysLevelHotKey \(KeyId : Integer; Alt, Shift, Ctrl : LongBool\): LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure LaunchCurrentHotkey;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function ProcessMessage \(Var Msg : TMessage\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure RegisterFloatingWindow \(Const FloatingWindow : IFloatingWindow\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure ResizePanel \(Const AViewName : Widestring; AWidth, AHeight : Integer\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure SetFocusLock \(Locked : LongBool\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure SetPanelActiveInCurrentForm \(Const AViewName : Widestring\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure SetPanelVisibleInCurrentForm \(Const AViewName : Widestring; IsVisible : LongBool\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function ShowCurrentProcessLauncherHelp : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure ShowTreeAsPopup \(Const TreeID : Widestring\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Function StatusBar\_GetState \(Index : Integer\) : Widestring;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure StatusBar\_SetState \(Index : Integer; Const S : Widestring\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure UnregisterFloatingWindow \(Const FloatingWindow : IFloatingWindow\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure UpdateInterfaceState;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


\(IGUIManager interface\)  
__Syntax__  
Procedure UpdateTransparentToolbars;  
__Description__  
__Example__  
__See also__  
IGUIManager interface


__Overview__  
The navigation system is the workhouse for the Navigation panel which is the center\-piece for net connectivity for the design project\. There are three ways a design can be arranged \- as a list of compiled sheets, flattened hierarchy and as a structural tree\.

__INavigationSystem Methods and Properties Table__

__INavigationSystem methods__  
RegisterNavigationProvider  
UnregisterNavigationProtocol  
RegisterSpecialURLString  
UnregisterSpecialURLString  
ParseDestinationString  
NavigateTo  
ExpandTargets  
ValidatedTarget

__INavigationSystem properties__

__See also__  
IClient interface



\(INavigationSystem interface\)  
__Syntax__  
Procedure UnregisterNavigationProtocol\(Const Protocol : WideString; Handle : THandle\);  
__Description__  
__Example__  
__See also__  
INavigationSystem interface


\(INavigationSystem interface\)  
__Syntax__  
Procedure RegisterSpecialURLString \(Const SpecialString : WideString; SpecialStringFunc : TSpecialStringFunc\);  
__Description__  
__Example__  
__See also__  
INavigationSystem interface


\(INavigationSystem interface\)  
__Syntax__  
Function RegisterNavigationProvider \(Const ProtocolName : WideString; Const NavigationProvider : INavigationProvider\) : THandle;  
__Description__  
__Example__  
__See also__  
INavigationSystem interface


\(INavigationSystem interface\)  
__Syntax__  
Procedure ParseDestinationString\(Const Destination : WideString; Var Protocol, Target, Parameters : WideString\);  
__Description__  
__Example__  
__See also__  
INavigationSystem interface


\(INavigationSystem interface\)  
__Syntax__  
Function NavigateTo \(Const CurrentView : IExternalForm; Var Destination : WideString; Out TargetView : IExternalForm\) : LongBool;  
__Description__  
__Example__  
__See also__  
INavigationSystem interface


\(INavigationSystem interface\)  
__Syntax__  
Procedure ExpandTargets \(Var Target : WideString\);  
__Description__  
__Example__  
__See also__  
INavigationSystem interface


\(INavigationSystem interface\)  
__Syntax__  
Function ValidatedTarget \( Target : WideString\) : WideString;  
__Description__  
__Example__  
__See also__  
INavigationSystem interface


\(INavigationSystem interface\)  
__Syntax__  
Procedure UnregisterSpecialURLString \(Const SpecialString : WideString; SpecialStringFunc : TSpecialStringFunc\);  
__Description__  
__Example__  
__See also__  
INavigationSystem interface


__Overview__  
The INotification__ __interface is used by the IClient, IServerView, IServerDocument, IServerModule, INotificationHandler interfaces\.  
The notifications could be a document loading notification, workspace being loaded, an object being navigated, and a server module being loaded\.  
Notifications as event messages can be broadcasted by the Client system, and any open server documents can receive them and act on them accordingly\.  
The Broadcast Notification is a system wide notification, and the Dispatch Notification is a server specific notification\.


1\. DocumentNotification  
2\. ViewNotification  
3\. DocumentFormNotification  
4\. ModuleNotification  
5\. SystemNotification  
6\. MessagesNotification  
7\. DragDropNotification  
8\. FastCrossSelectNotification


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


\(IDocumentFormNotification interface\)  
__Overview__  
   
__Description__  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


\(ISystemNotification interface\)  
__Syntax__  
   
__Description__  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


__Overview__  
The IMessagesNotification interface

__IMessagesNotification methods__

__IMessagesNotification properties__  
Code

__See also__  
IClient interface  
IExternalForm interface


__Overview__  
   
__See also__  
IClient interface  
IExternalForm interface


__Overview__  
   
__Description__  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


__Overview__  
__Notes__  
Inherited from INotification interface\.

__IDragDropNotification Methods__  
GetCode  
GetDragDropObject

__IDragDropNotification Properties__

__See also__  
IDragDropObject interface


__Overview__

__IEventNavigated Methods__  
GetCode  
GetWnd

__IEventNavigated Properties__  
Code  
Wnd

__See also__  
IDragDropObject interface


__Overview__

__INavigationProvider Methods__  
NavigateTo

__INavigationProvider Properties__

__See also__  
IDragDropObject interface


__Overview__

__INavigator Methods__  
NavigateTo

__INavigator Properties__

__See also__


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


__Overview__

__INavigateAttributes Methods__  
GetAddress :   
GetCaption :   
   
IsSameAddress

__INavigateAttributes Properties__  
Address  
Caption

__See also__


__Overview__  
This interface represents the Knowledge Center panel in Altium Designer\. This interface is part of the IClient interface\.

__IDynamicHelpManager Methods__  
AddCustomContent  
RemoveCustomContent  
   
GetCustomSectionName  
GetCustomSectionBody  
GetCustomSectionsCount

__IDynamicHelpManager Properties__

__See also__  
IClient interface


__Overview__

__IFastCrossSelectionNotification Methods__

__IFastCrossSelectNotification Properties__  
ObjectType        
ObjectDesignator  
SourceKind        
SelectionState  

__See also__  
IClient interface  
IExternalForm interface


__Overview__  
The IDocumentNotification interface represents

__IDocumentNotification Methods__

__IDocumentNotification Properties__  
Code            
ServerDocument  
OldFileName   

__See also__  
IClient interface  
IExternalForm interface


__Overview__  
   
__Description__  
__Example__  
   
__See also__  
IClient interface  
INotification interface


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



\(INotificationHandler interface\)  
__Syntax__  
Procedure HandleNotification\(Const ANotification : INotification\);  
__Description__  
__Example__  
   
__See also__  
IClient interface


__Overview__  
This IProcessLauncher interface is a mechanism that launches a server process in Altium Designer\. See ICommandLauncher and IServerProcess interfaces as well\.

Since a server has a set of processes and these process identifiers are stored in an installation file \(which ends with an INS extension\) and the process launchers that link to specific user interface elements \(also called resources\) and the layout of user interface elements are defined in the resources file \(which ends with a RCS extension\)\.

__IProcessLauncher Methods and Properties Table__

__IProcessLauncher methods__  
PostMessage  
SendMessage  
GetCommandState

 

__See also__  
ICommandLauncher interface  
IClient interface  
IServerProcess interface  
ICommandLauncher interface


__Overview__  
The IProcessLauncherInfo interface hierarchy is as follows;

__IProcessLauncherInfo Methods and Properties Table__

__IProcessLauncherInfo methods__  
GetCaption  
GetParameters  
GetDescription  
GetImageFile  
GetKey  
GetShift  
GetKey2  
GetShift2  
GetServerCommand  
GetShortcutText

__IProcessLauncherInfo properties__  
Caption  
Parameters  
Description  
ImageFile  
Key  
Shift  
Key2  
Shift2  
ShortcutText  
ServerCommand

__See also__



\(IProcessLauncherInfo interface\)  
__Syntax__  
Function GetCaption : Widestring;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Function GetDescription : Widestring;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Function GetImageFile : Widestring;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Function GetKey : Integer;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Function GetKey2 : Integer;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Function GetParameters : Widestring;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Function GetServerCommand : Widestring;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Function GetShift : TShiftState;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Function GetShift2 : TShiftState;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Function GetShortcutText : Widestring;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface



\(IProcessLauncherInfo interface\)  
__Syntax__  
Property Caption : Widestring Read GetCaption ;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Property Description : Widestring Read GetDescription ;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Property ImageFile : Widestring Read GetImageFile ;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Property Key : Integer Read GetKey ;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Property Key2 : Integer Read GetKey2 ;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Property Parameters : Widestring Read GetParameters ;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Property ServerCommand : Widestring Read GetServerCommand;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Property Shift : TShiftState Read GetShift ;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Property Shift2 : TShiftState Read GetShift2 ;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


\(IProcessLauncherInfo interface\)  
__Syntax__  
Property ShortcutText : Widestring Read GetShortcutText ;  
__Description__  
__Example__  
__See also__  
IProcessLauncherInfo interface


__Overview__  
The IProcessControl interface controls the process depth for each design document in Altium Designer\. Every time a process is launched on a document, the process depth is increased by one and once this same process has finished executing, the process depth is decreased by one\. When the process depth is zero, it denotes that nothing is taking place on the current design document\. This is necessary if you wish to keep the environment synchronized, especially the Undo system\.

__Process Depths for Schematic and PCB documents__  
When you are using Schematic API or PCB API to modify/manipulate objects on a Schematic or PCB document respectively, you will need to set the PreProcess and PostProcess methods so that the environment is updated correctly when you are adding, deleting or modifying objects on a Schematic or PCB document\.

__IProcessControl Methods__  
PostProcess  
PreProcess

__IProcessControl Properties__  
ProcessDepth

__See also__  
IPCB\_ServerInterface for PostProcess and PreProcess methods  
ISch\_ServerInterface for PostProcess and PreProcess methods



\(IProcessControl interface\)  
__Syntax__  
Procedure PostProcess \(Const AContext : IInterface; AParameters : PChar\);  
__Description__  
This procedure performs a post processing within in a main server which could involve finalizing the states of  the environment of the server such as the Undo system\. The AContext parameter is usually the focussed document in Altium Designer such as the ISch\_Document and IPCB\_Board interfaces\.  
__Example__

01

    // Initialize the robots in Schematic editor\.

02

    SchServer\.ProcessControl\.PreProcess\(Doc, ''\);

03

  

04

    // Create a new port and place on current Schematic document\.

05

    SchPort := SchServer\.SchObjectFactory\(ePort,eCreate\_GlobalCopy\);

06

    If SchPort = Nil Then Exit;

07

    SchPort\.Location  := Point\(100,100\);

08

    SchPort\.Style     := ePortRight;

09

    SchPort\.IOType    := ePortBidirectional;

10

    SchPort\.Alignment := eHorizontalCentreAlign;

11

    SchPort\.Width     := 100;

12

    SchPort\.AreaColor := 0;

13

    SchPort\.TextColor := $FFFF00;

14

    SchPort\.Name      := 'New Port 1';

15

  

16

    // Add a new port object in the existing Schematic document\.

17

    Doc\.RegisterSchObjectInContainer\(SchPort\);

18

    SchServer\.RobotManager\.SendMessage\(Doc\.I\_ObjectAddress,c\_BroadCast,

19

                                       SCHM\_PrimitiveRegistration,SchPort\.I\_ObjectAddress\);

20

  

21

    // Clean up the robots in Schematic editor

22

    SchServer\.ProcessControl\.PostProcess\(Doc, ''\);

__See also__  
PreProcess method


\(IProcessControl interface\)  
__Syntax__  
Procedure PreProcess      \(Const AContext : IInterface; AParameters : PChar\);  
__Description__  
Performs pre processing within in a main server which could involve resetting the environment of the server\. The AContext parameter is usually the focussed document in Altium Designer such as the ISch\_Document and IPCB\_Board interfaces  
__Example__

01

    // Initialize the robots in Schematic editor\.

02

    SchServer\.ProcessControl\.PreProcess\(Doc, ''\);

03

  

04

    // Create a new port and place on current Schematic document\.

05

    SchPort := SchServer\.SchObjectFactory\(ePort,eCreate\_GlobalCopy\);

06

    If SchPort = Nil Then Exit;

07

    SchPort\.Location  := Point\(100,100\);

08

    SchPort\.Style     := ePortRight;

09

    SchPort\.IOType    := ePortBidirectional;

10

    SchPort\.Alignment := eHorizontalCentreAlign;

11

    SchPort\.Width     := 100;

12

    SchPort\.AreaColor := 0;

13

    SchPort\.TextColor := $FFFF00;

14

    SchPort\.Name      := 'New Port 1';

15

  

16

    // Add a new port object in the existing Schematic document\.

17

    Doc\.RegisterSchObjectInContainer\(SchPort\);

18

    SchServer\.RobotManager\.SendMessage\(Doc\.I\_ObjectAddress,c\_BroadCast,

19

                                       SCHM\_PrimitiveRegistration,SchPort\.I\_ObjectAddress\);

20

  

21

    // Clean up the robots in Schematic editor

22

    SchServer\.ProcessControl\.PostProcess\(Doc, ''\);

__See also__  
PostProcess method



\(IProcessControl interface\)  
__Syntax__  
Property  ProcessDepth : Integer;  
__Description__  
Sets or gets the process depth\. The depth value is an integer value\.0 = inactive, and 1 onwards denotes the number of stacked processes\.  
__ProcessDepth Example__  
ShowMessage\('Current process depth ',IntToStr\(Client\.ProcessControl\.ProcessDepth\)\);


__Overview__  
The __ILicenseManager__ interface hierarchy is as follows;

__ILicenseManager methods__  
UseLicense  
ReleaseLicense  
ChangeToNetwork  
ChangeToStandalone  
UseLicenseByName  
GetLicenses

__ILicenseManager properties__

__See also__



\(ILicenseManager interface\)  
__Syntax__  
Procedure UseLicense \(Const LicenseFileName : Widestring\);  
__Description__  
__Example__  
__See also__  
ILicenseManager interface


\(ILicenseManager interface\)  
__Syntax__  
Procedure ReleaseLicense \(Const LicenseFileName : Widestring\);  
__Description__  
__Example__  
__See also__  
ILicenseManager interface


\(ILicenseManager interface\)  
__Syntax__  
Procedure GetLicenses \(Licenses : TList\);  
__Description__  
__Example__  
__See also__  
ILicenseManager interface


\(ILicenseManager interface\)  
__Syntax__  
Procedure ChangeToStandalone;  
__Description__  
This procedure changes from a networked license to a standalone license for a copy of Altium Designer that's running on a computer\. A standalone computer is a computer that is not connected to the internet\.  
__Example__  
__See also__  
ILicenseManager interface


\(ILicenseManager interface\)  
__Syntax__  
Procedure ChangeToNetwork \(Const ServerName : Widestring\);  
__Description__  
This procedure changes from a standalone license to a networked license for a copy of Altium Designer that's running on a computer\. You will need to supply the server name as a string\.  
A standalone computer is a computer that is not connected to the internet\.  
__Example__  
__See also__  
ILicenseManager interface


\(ILicenseManager interface\)  
__Syntax__  
Procedure UseLicenseByName \(Const LicenseName : Widestring\);  
__Description__  
__Example__  
__See also__  
ILicenseManager interface


__Overview__  
The IOptionsManager interface deals with the options of a system wide Preferences dialog or project centric Project Options dialog\.

__Notes__  
A server needs to register its own options pages within the Client module of Altium Designer\. The TServerModule class from the RT\_ServerImplementation unit within the Altium Designer RTL has a RegisterOptionsPageClass procedure for you to override\. You need to pass in the name of the options page and the Options Form of TOptionsForm type\. Normally this form is the same as the server panel form with the controls on it\.

__IOptionsManager methods__  
GetOptionsReader  
GetOptionsWriter  
OptionsExist

__IOptionsManager properties__

__Example__

1

Procedure TGraphicPreferences\.Save;

2

Var

3

    Writer : IOptionsWriter;

4

Begin

5

    Writer := Client\.OptionsManager\.GetOptionsWriter\(CGraphicViewer\);

6

    If Writer = Nil Then Exit;

7

    Writer\.WriteBoolean\(cGraphicPreferences, 'ScaleImage'     , FScaleImage     \);

8

    Writer\.WriteBoolean\(cGraphicPreferences, 'KeepAspectRatio', FKeepAspectRatio\);

9

End;

__See also__  
IOptionsReader interface  
IOptionsWriter interface  
IOptionsPage interface  
GraphicViewer server project from \\Developer Kit\\Examples\\Dxp\\GraphicViewer folder



\(IOptionsManager interface\)  
__Syntax__  
Function OptionsExist \(Const ServerName, OldSettingsPath : WideString\) : LongBool;  
__Description__  
This function checks if the options for the specified server exist on the system wide Preference dialog\.  
__Example__  
__See also__  
IOptionsManager interface


\(IOptionsManager interface\)  
__Syntax__  
Function GetOptionsWriter \(Const ServerName : WideString\) : IOptionsWriter;  
__Description__  
This function retrieves the IOptionsWriter method which enables you to write setting values for the Options of the specified server\.  
__Example__

1

Var

2

    Writer : IOptionsWriter;

3

Begin

4

    Writer := Client\.OptionsManager\.GetOptionsWriter\(CGraphicViewer\);

5

    If Writer = Nil Then Exit;

6

  

7

    Writer\.WriteBoolean\(PreferencesName, OptionName , OptionValue\);

8

End;

__See also__  
IOptionsManager interface  
IOptionsWriter interface  
IOptionsReader interface


\(IOptionsManager interface\)  
__Syntax__  
Function GetOptionsReader \(Const ServerName, OldSettingsPath : WideString\) : IOptionsReader;  
__Description__  
This function retrieves the IOptionsReader method which enables you to read setting values for the Options of the specified server\.  
__Example__

1

Var

2

    Reader : IOptionsReader;

3

Begin

4

    Reader := Client\.OptionsManager\.GetOptionsReader\(NameOfServer,''\);

5

    If Reader = Nil Then Exit;

6

  

7

    OptionValue := Reader\.ReadBoolean\(ServerPreferencesName,OptionName,DefaultValue\);

8

End;

__See also__  
IOptionsManager interface  
IOptionsWriter interface  
IOptionsReader interface


__Overview__  
The IOptionsReader interface reads values for options on a page in the system wide Preferences dialog or Project options dialog from the registry storage\.

__IOptionsReader methods__  
ReadBoolean  
ReadDouble  
ReadInteger  
ReadString  
ReadSection  
SectionExists  
ValueExists

__IOptionsReader properties__

__Example__

1

Var

2

    Reader : IOptionsReader;

3

Begin

4

    Reader := Client\.OptionsManager\.GetOptionsReader\(NameOfServer,''\);

5

    If Reader = Nil Then Exit;

6

  

7

    AValue := Reader\.ReadBoolean\(NameOfServerPreferences,SettingName,DefaultValue\);

8

End;

__See also__  
IClient interface  
IOptionsManager interface



\(IOptionsReader interface\)  
__Syntax__  
Function ValueExists \(Const SectionName, ValueName : WideString\) : LongBool;  
__Description__  
This function determines whether the value name exists for this section name\. This is useful if you need to check if a value name exists in the registry storage before you commit a value to this location\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsReader interface


\(IOptionsReader interface\)  
__Syntax__  
Function SectionExists\(Const SectionName : WideString\) : LongBool;  
__Description__  
This function checks whether the section \(or the targetted page\) exists or not\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
See also  
IOptionsReader interface


\(IOptionsReader interface\)  
__Syntax__  
Function ReadString \(Const SectionName, ValueName, DefaultValue : WideString\) : WideString;  
__Description__  
This ReadString function retrieves a string value for the specified server and the setting name that are represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsReader interface


\(IOptionsReader interface\)  
__Syntax__  
Function ReadSection \(Const SectionName : WideString\) : WideString;  
__Description__  
This function retrieves the data for the section which is the targetted page in the system wide Preferences dialog\.  
Note the section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsReader interface


\(IOptionsReader interface\)  
__Syntax__  
Function ReadInteger \(Const SectionName, ValueName : WideString; DefaultValue : Integer\) : Integer;  
__Description__  
This ReadInteger function retrieves an integral value for the specified server and the setting name that are represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsReader interface


\(IOptionsReader interface\)  
__Syntax__  
Function ReadDouble \(Const SectionName, ValueName : WideString; DefaultValue : Double\) : Double;  
__Description__  
This ReadDouble function retrieves a double value for the specified server and the setting name that are represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsReader interface


\(IOptionsReader interface\)  
__Syntax__  
Function ReadBoolean \(Const SectionName, ValueName : WideString; DefaultValue : LongBool\) : LongBool;  
__Description__  
This ReadBoolean function retrieves a boolean value for the specified server and the setting name that are represented by the system wide Preferences dialog\.  
The DefaultValue parameter for the ReadBoolean method returns a default Boolean value if the specific control on the Preferences dialog is not returning a valid Boolean value\.  
The section name represents the target server’s page in the system wide preferences dialog\.  
__Example__

1

Var

2

    Reader : IOptionsReader;

3

Begin

4

    Reader := Client\.OptionsManager\.GetOptionsReader\(NameOfServer,''\);

5

    If Reader = Nil Then Exit;

6

  

7

    AValue := Reader\.ReadBoolean\(NameOfServerPreferences,SettingName,DefaultValue\);

8

End;

__See also__  
IOptionsReader interface


__Overview__  
The IOptionsWriter interface writes values for options on a page in the system wide Preferences or Project options dialog to a registry storage\.

__IOptionsWriter methods__  
EraseSection  
WriteBoolean  
WriteDouble  
WriteInteger  
WriteString

__IOptionsWriter properties__

__Example__

1

Var

2

    Writer : IOptionsWriter;

3

Begin

4

    Writer := Client\.OptionsManager\.GetOptionsWriter\(CGraphicViewer\);

5

    If Writer = Nil Then Exit;

6

    Writer\.WriteBoolean\(cGraphicPreferences, 'ScaleImage'     , FScaleImage     \);

7

    Writer\.WriteBoolean\(cGraphicPreferences, 'KeepAspectRatio', FKeepAspectRatio\);

8

End;

__See also__  
IClient interface  
IOptionsManager interface



\(IOptionsWriter interface\)  
__Syntax__  
Procedure EraseSection\(Const SectionName : WideString\);  
__Description__  
This procedure removes all the option values for the section \(targetted page in the system wide preferences dialog\)\.  
__Example__  
__See also__  
IOptionsWriter interface


\(IOptionsWriter interface\)  
__Syntax__  
Procedure WriteInteger\(Const SectionName, ValueName : WideString; Value : Integer\);  
__Description__  
This WriteInteger procedure writes an integral value for the option name used by the specified server \(SectionName\) which is represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsWriter interface


\(IOptionsWriter interface\)  
__Syntax__  
Procedure WriteDouble \(Const SectionName, ValueName : WideString; Value : Double\);  
__Description__  
This WriteDouble procedure writes a double value for the option name used by the specified server \(SectionName\) which is represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsWriter interface


\(IOptionsWriter interface\)  
__Syntax__  
Procedure WriteBoolean\(Const SectionName, ValueName : WideString; Value : LongBool\);  
__Description__  
This WriteBoolean procedure writes a boolean option value for the option name used by the specified server \(SectionName\) which is represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__

1

Var

2

    Writer : IOptionsWriter;

3

Begin

4

    Writer := Client\.OptionsManager\.GetOptionsWriter\(CGraphicViewer\);

5

    If Writer = Nil Then Exit;

6

  

7

    Writer\.WriteBoolean\(cGraphicPreferences, 'ScaleImage'     , FScaleImage     \);

8

    Writer\.WriteBoolean\(cGraphicPreferences, 'KeepAspectRatio', FKeepAspectRatio\);

9

End;

__See also__  
IOptionsWriter interface


\(IOptionsWriter interface\)  
__Syntax__  
Procedure WriteString \(Const SectionName, ValueName, Value : WideString\);  
__Description__  
This WriteString procedure writes a string option value for the option name used by the specified server \(SectionName\) which is represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsWriter interface


__Overview__  
The IOptionsPage interface represents the page of controls in the system wide Preferences dialog\. For example, in Altium Designer, the controls on this page in the Preferences dialog are mapped from the controls on a server panel of this server\. The controls on a page is represented by the TOptionsForm object and its IOptionsPage interface\.

__Note__  
The server module \(TServerModule class\) has the RegisterOptionsPageClass method which takes in the TOptionsForm object\. The IOptionsPage interface represents this TOptionsForm object\.  
The TOptionsForm class has methods that you need to override to implement the OptionsPage, OptionsManager, OptionsReader and OptionsWriter interfaces\.  
ClearModified  
GetModified  
GetStateControls  
GetNotificationCode  
DoSetStateControls  
SetDefaultState

__IOptionsPage Methods and Properties table__

__IOptionsPage methods__  
GetModified  
SetModified  
GetStateControls  
SetStateControls  
GetNotificationCode  
SetDefaultState  
PostEditControls

__IOptionsPage properties__  
Modified

__Example__

01

    TGraphicPrefsForm\_General = Class\(TOptionsForm\)

02

        chxScale        : TCheckBox;

03

        chxProportional : TCheckBox;

04

    Private

05

        FScaleStored        : Boolean;

06

        FProportionalStored : Boolean;

07

    Protected

08

        Procedure ClearModified;                        Override;

09

        Function  GetModified : Boolean;                Override;

10

        Procedure GetStateControls;                     Override;

11

        Function  GetNotificationCode : Integer;        Override;

12

        Procedure DoSetStateControls;                   Override;

13

        Procedure SetDefaultState;                      Override;

14

    End;

15

\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}

16

Function TGraphicPrefsForm\_General\.GetNotificationCode: Integer;

17

Begin

18

    Result := cGraphicPreferencesChanged;

19

End;

20

Procedure TGraphicPrefsForm\_General\.GetStateControls;

21

Begin

22

    gv\_GraphicPreferences\.ScaleImage      := chxScale       \.Checked;

23

    gv\_GraphicPreferences\.KeepAspectRatio := chxProportional\.Checked;

24

End;

25

Procedure TGraphicPrefsForm\_General\.DoSetStateControls;

26

Begin

27

    chxScale       \.Checked := gv\_GraphicPreferences\.ScaleImage;

28

    chxProportional\.Checked := gv\_GraphicPreferences\.KeepAspectRatio;

29

End;

30

Procedure TGraphicPrefsForm\_General\.SetDefaultState;

31

Begin

32

    chxScale       \.Checked := False;

33

    chxProportional\.Checked := False;

34

    Inherited;

35

End;

36

Procedure TGraphicPrefsForm\_General\.ClearModified;

37

Begin

38

    FScaleStored        := chxScale\.Checked;

39

    FProportionalStored := chxProportional\.Checked;

40

End;

41

Function TGraphicPrefsForm\_General\.GetModified : Boolean;

42

Begin

43

    Result := \(FScaleStored <> chxScale\.Checked\) Or

44

              \(FProportionalStored <> chxProportional\.Checked\);

45

End;

__See also__  
IOptionsManager interface  
IOptionsReader interface  
IOptionsWriter interface



\(IOptionsPage interface\)  
__Syntax__  
Function GetModified : Boolean;  
__Description__  
__Example__  
__See also__  
IOptionsPage interface


\(IOptionsPage interface\)  
__Syntax__  
Procedure SetModified\(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IOptionsPage interface



\(IOptionsPage interface\)  
__Syntax__  
Procedure SetStateControls;  
__Description__  
This procedure updates the controls on the form from a data structure in a server module\.  
__Example__  
__See also__  
IOptionsPage interface


\(IOptionsPage interface\)  
__Syntax__  
Procedure SetDefaultState;  
__Description__  
This procedure sets the controls on a page within the system wide Preferences dialog to their default values\.  
__Note__  
The SetDefaultState procedure is overridden in a server's TOptionsForm object\.  
__Example__  
__See also__  
IOptionsPage interface


\(IOptionsPage interface\)  
__Syntax__  
Procedure PostEditControls;  
__Description__  
__Example__  
__See also__  
IOptionsPage interface


\(IOptionsPage interface\)  
__Syntax__  
Procedure GetStateControls;  
__Description__  
This procedure  
__Note__  
__Example__  
__See also__  
IOptionsPage interface


\(IOptionsPage interface\)  
__Syntax__  
Function GetNotificationCode : Integer;  
__Description__  
Each server that handles Option notifications to its server panel and the system wide Preferences dialog in Altium Designer will have its own Notification code which could be a value of 100 upwards\.  
__Note__  
A server module will have a TOptionsForm object registered and this object will have a GetNotificationCode function overridden\. This server module will have its own notification code value\. Ensure these notification codes are unique\.  
__Example__  
__See also__  
IOptionsPage interface



\(IOptionsPage interface\)  
__Syntax__  
Property Modified : Boolean Read GetModified Write SetModified;  
__Description__  
__Example__  
__See also__  
IOptionsPage interface


__Overview__  
The IServerProcess interface returns information for commands \(server processes\) in a server installation file;  
·       the command name \(GetOriginalID method\)  
·       the long summary  
·       the number of parameters if any  
·       parameter names if any  
The IServerProcess interface is an aggregate interface used within the IServerRecord interface\.  
__Notes__  
A typical  installation file structure is as follows  
ClientInsFile 1\.0  
Server  
    EditorName        = 'AddOn'  
    EditorExePath     = 'AddOn\.DLL'  
    EditorDescription = 'A demonstratory AddOn module'  
    Version           = 'Version 8\.1\.4\.2763'  
    Date              = '24\-Dec\-2004'  
    HelpAboutInfo     = 'This software is protected by copyright law and international treaties\.'   
    Copyright         = 'Copyright © Altium Limited 2004'   
    Updates           = 'ADVPCB'  
End  
Command Name = 'CountPads'      LongSummary = 'Find how many pads on a PCB document' End  
Command Name = 'RunAPCBProcess' LongSummary = 'Invoke a PCB process'                 End

__IServerProcess Methods__  
GetOriginalId  
GetLongSummary  
GetParameter  
GetParameterCount

__IServerProcess Properties__

__Example__

01

//ServerRecord is a IServerRecord interface

02

CommandCount := ServerRecord\.GetCommandCount;

03

For J := 0 To CommandCount \- 1 Do

04

Begin

05

     //ServerProcess is a IServerProcess interface

06

     ServerProcess := ServerRecord\.GetCommand\(J\);

07

     ReportFile\.Add\('        Process \#' \+ IntToStr\(J \+ 1\) \+ ' Name = '  \+

08

     ServerProcess\.GetOriginalId \+ ' LongSummary = ' \+ ServerProcess\.GetLongSummary\);

09

  

10

     ParameterCount := ServerProcess\.GetParameterCount;

11

     For K := 0 To ParameterCount \- 1 Do

12

         S := S \+ ServerProcess\.GetParameter\(K\) \+ ', ';

13

  

14

     ReportFile\.Add\('        Parameters = ' \+ S\);

15

End;

__Notes__  
All the functions in a server available to the user, such as placing a primitive, changing the zoom level and so on are performed by commands which are pre\-packaged process launchers\. The pre\-packaged process launchers bundle together the process that runs when the command is selected, plus any parameters, bitmaps \(icons\), captions \(the name of an item that displays on a resource\), descriptions and associated shortcut keys\.

When you select a menu item or click on a toolbar button, you are launching a process\. Processes are launched by passing the process identifier to the appropriate server and the server then executes the process\. Processes are defined and implemented in the Commands unit of a server source code project\. The processes are declared in an Installation File \(with an INS extension\)\.

Each process has a process identifier\.  The process identifier is made up of two parts separated by a colon\.  The first part of the process identifier indicates the server that defines the process, and the second part is the process name\.   
For example, the process __Sch:ZoomIn__ is provided by Schematic server\.  When this process is launched, either by selecting a menu item, pressing a hot key or activating a toolbar button \(which are all defined as process launchers\), it will perform the task of zooming in on the currently active schematic sheet\.

When a server is started up for the first time, process procedures or commands registered in the CommandLauncher object within the server modules\.

__See also__  
IServerRecord interface  
ServerProcessReport script in \\Examples\\Scripts\\DXP\\ folder



\(IServerProcess interface\)  
__Syntax__  
Function GetLongSummary : WideString;  
__Description__  
The GetLongSummary function returns the Long Summary identifier string\.  
__Example__  
   
__See also__  
IServerProcess interface  
IServerRecord interface


\(IServerProcess interface\)  
__Syntax__  
Function GetOriginalId : WideString;  
__Description__  
The GetOriginalID method returns the Process Identifier string for the specified server process\.  
__Example__  
   
__See also__  
IClient interface  
IServerProcess interface


\(IServerProcess interface\)  
__Syntax__  
Function GetParameter\(Index : Integer\) : WideString;  
__Description__  
The GetParameter function returns the indexed parameter string depending on the index parameter\. This is to be used in conjunction with the GetParameterCount method\. A server process can be parametric, and thus can have a number of parameters\.  
__Example__  
__See also__  
IClient interface  
IServerProcess interface  
GetParameterCount method


\(IServerProcess interface\)  
__Syntax__  
Function GetParameterCount : Integer;  
__Description__  
The GetParameterCount function returns the number of parameters for the current Process Identifier \(GetOriginalID\)\.  
This is to be used in conjunction with the GetParameter method\.  
__Example__  
   
__See also__  
IClient interface  
IServerProcess interface  
GetParameter method


__Overview__  
This interface extracts the servers installation files information from the \\System folder which has a list of server installation files\. That is each server installation file \(with an INS extension\) correspond to a IServerRecord itnerface\.

Since this IServerRecord interface is inside the Client object, invoke the Client\.GetServerRecordCount to get the number of server installation files, and then assign the Client\.GetServerRecord\(RecordCount\) to a IServerRecord variable where you can retrieve data associated with an installation file\.

To find more information about each server module installed in Altium Designer, invoke the IClient\.GetServerModule interface\.

__IServerRecord Methods__  
GetVersion  
GetCopyRight  
GetDate  
GetSystemExtension  
GetGeneralInfo  
GetName  
GetInsPath  
GetExePath  
GetDescription  
GetServerFileExist  
GetRCSFilePath  
GetWindowKindCount  
GetCommandCount  
GetCommand  
GetWindowKind  
GetWindowKindByName  
GetPanelInfo  
GetPanelInfoByName  
GetPanelInfoCount

__IServerRecord Properties__

__Example__  
PCB\_SR := Client\.GetServerRecordByName\('PCB'\);  
__See also__  
IClient interface  
IServerModule interface  
CS server example in the \\Developer Kit\\Examples\\DXP\\ClientServer Interfaces\\ folder\.



\(IServerRecord interface\)  
__Syntax__  
Function GetCommand\(Index : Integer\) : IServerProcess;  
__Description__  
The method returns the IServerProcess interface\. Used in conjunction with the GetCommandCount function\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetCommandCount : Integer;  
__Description__  
The method returns the number of commands \(Process launchers\) this server supports\. Used in  
conjunction with the GetCommand function  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetCopyRight : PChar;  
__Description__  
The method returns the copyright string\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetDescription : PChar;  
__Description__  
The method returns the description string\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetExePath : PChar;  
__Description__  
The method returns the path to the server file\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetDate : PChar;  
__Description__  
The method returns the date string associated with the server installation file\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetGeneralInfo : PChar;  
__Description__  
The method returns the general info string for the server record associated with a server\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetInsPath : PChar;  
__Description__  
The method returns the path to the installation file\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetName : PChar;  
__Description__  
The method returns the name of the server\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetPanelInfo \(Index : Integer\) : IServerPanelInfo;  
__Description__  
The method returns the indexed panel information\. This is to be used in conjunction with the GetPanelInfoCount method\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetPanelInfoByName \(Const Name  : Widestring\) : IServerPanelInfo;  
__Description__  
The method returns the panel information interface by the panel name\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetPanelInfoCount : Integer;  
__Description__  
The method returns the number of panels used for the server module\. This is to be used in conjunction with the GetPanelInfo method\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetRCSFilePath : PChar;  
__Description__  
The method returns the path to the resources file\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetSystemExtension : LongBool;  
__Description__  
The method returns the file system extension string\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetVersion : PChar;  
__Description__  
The method returns the version string associated with the server installation file\.  
__Example__

01

RecordCount := Client\.GetServerRecordCount;

02

For I := 0 to RecordCount \- 1 Do

03

Begin

04

    // obtain details of the DXP\.INS file

05

    ServerRecord := Client\.GetServerRecord\(I\);

06

    If ServerRecord\.GetName = 'Client' Then

07

    Begin

08

        Version := ServerRecord\.GetVersion;

09

        Break;

10

    End;

11

End;

__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetServerFileExist : LongBool;  
__Description__  
The method returns the Boolean value whether the server file \(with a DLL\) exists or not\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetWindowKind      \(Index : Integer\) : IServerWindowKind;  
__Description__  
The method returns the IServerWindowKind interface\. Used in conjunction with the GetWindowKindCount function\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetWindowKindCount : Integer;  
__Description__  
The method returns the number of document kinds the server supports\.  
__Example__  
   
__See also__  
IServerRecord interface


\(IServerRecord interface\)  
__Syntax__  
Function GetWindowKindByName\(Name  : PChar  \) : IServerWindowKind  
__Description__  
The method returns the IServerWindowKind interface depending on the DocumentKind Name parameter\.  
__Example__  
   
__See also__  
IServerRecord interface  
IServerWindowKind interface


__Overview__  
This IServerWindowKind interface reports the type of a design document in Altium Designer and it is a composite object used in IServerRecord and IClient interface objects

__IServerWindowKind Methods__  
GetServerRecord  
GetName  
GetNewWindowCaption  
GetNewWindowExtension  
GetWindowKindDescription  
GetIconName  
GetIsDomain  
GetIsDocumentEditor  
FileLoadDescriptionCount  
FileSaveDescriptionCount  
GetFileLoadDescription  
GetFileSaveDescription  
GetWindowKindClassCount  
GetWindowKindClass  
IsOfWindowKindClass

__IServerWindowKind Properties__

__See also__  
IClient interface  
IServerRecord interface



\(IServerWindowKind interface\)  
__Syntax__  
Function FileLoadDescriptionCount : Integer;  
__Description__  
The method returns the number of File Load Descriptions for the document editor type of server\. A document editor can support multiple document types and thus facilitate multiple load functions\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function FileSaveDescriptionCount : Integer;  
__Description__  
The method returns the number of File Save Descriptions for the document editor server\. A document editor can have multiple document types and thus have multiple corresponding file save functions\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function GetFileLoadDescription\(Index  : Integer\) : Widestring;  
__Description__  
The method returns the indexed file load description\. To be used in conjunction with the FileLoadDescriptionCount function\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function GetFileSaveDescription\(Index  : Integer\) : Widestring;  
__Description__  
The method returns the indexed file save description\. To be used in conjunction with the FileSaveDescriptionCount function\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function GetIconName : Widestring;  
__Description__  
The method returns the name of the icon associated with the server window of a document in DXP\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function GetIsDocumentEditor : Boolean;  
__Description__  
The method returns a Boolean value whether this server is a document editor or not\. Addons are not document editors\. A document editor is a server that hosts its own documents and provide editing facilities\. For example the PCB Editor is a Document Editor\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function GetIsDomain : LongBool;  
__Description__  
The method returns the Boolean value for this Domain\. Normally false\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function GetName : Widestring;  
__Description__  
Returns the name of the window kind\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function GetNewWindowCaption : Widestring;  
__Description__  
The GetNewWindowCaption method returns the new document caption string for the new document in Altium Designer\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function GetNewWindowExtension : Widestring;  
__Description__  
The method returns the new document’s extension string in DXP\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function GetServerRecord : IServerRecord;  
__Description__  
Returns the IServerRecord interface that the IServerWindowKind interface is associated with\. Since the server installation file defines document kinds \(window kinds\) and the IServerRecord interface represents this installation file\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IExternalForm interface\)  
__Syntax__  
Function GetWindowKindClass \(Index  : Integer\) : Widestring;  
__Description__  
The method returns the indexed window kind class\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function GetWindowKindClassCount : Integer;  
__Description__  
The method returns the number of window kind classes\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWIndowKind interface\)  
__Syntax__  
Function GetWindowKindDescription : Widestring;  
__Description__  
The method returns the window kind description string for a window in Altium Designer\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


\(IServerWindowKind interface\)  
__Syntax__  
Function IsOfWindowKindClass\(Const AClass : Widestring\) : Boolean;  
__Description__  
The method returns a boolean value whether the class string is part of a window kind class or not\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface


__Overview__  
The IServerSecurity interface hierarchy is as follows;

__IServerSecurity methods__  
IsTechnologySetSupported

__IServerSecurity properties__

__See also__



\(IServerSecurity interface\)  
__Syntax__  
Function IsTechnologySetSupported \(Const ATechnologySet : Widestring\) : Boolean;  
__Description__  
__Example__  
__See also__  
IServerSecurity interface


__Overview__  
The ITimerManager interface manages the timing mechanisms efficiently in Altium Designer which registers timer objects and calls them when used\. Normally a Timer object needs a window to run and responds to WM\_Timer messages\. This is for internal use\.

__ITimerManager methods__  
AddHandler  
RemoveHandler  
GetHandlerEnabled  
SetHandlerEnabled  
SetGlobalEnabled

__ITimerManager Properties__

__See also__  
ITimerHandler interface



\(ITimerManager interface\)  
__Syntax__  
Function  AddHandler\(Const AHandler : ITimerHandler; AInterval : Cardinal; AEnabled : Boolean = True\) : DWord;  
__Description__  
Internal Use only  
__Example__  
   
__See also__  
ITimerIManager interface


\(ITimerManager interface\)  
__Syntax__  
Function GetHandlerEnabled\(ID : DWord\) : Boolean;  
__Description__  
Internal Use only  
__Example__  
   
__See also__  
ITimerManager interface


\(ITimerManager interface\)  
__Syntax__  
Procedure RemoveHandler    \(ID : DWord\);  
__Description__  
Internal Use only  
__Example__  
   
__See also__  
ITimerManager interface


\(ITimerManager interface\)  
__Syntax__  
Procedure SetGlobalEnabled \(AEnabled : Boolean\);  
__Description__  
Internal Use only  
__Example__  
   
__See also__  
ITimerManager interface


\(ITimerManager interface\)  
__Syntax__  
Procedure SetHandlerEnabled\(ID : DWord; AEnabled : Boolean\);  
__Description__  
Internal Use only  
__Example__  
   
__See also__  
ITimerManager interface


__Overview__  
Each timer object is represented by the ITimerHandler interface and all timer objects are managed by the ITimerManager interface\.  
This is for internal use\.

__ITimerHandler methods__  
HandleTimerEvent

__ITimerHandler properties__

__See also__  
ITimerManger interface



\(ITimerHandler interface\)  
__Syntax__  
Procedure HandleTimerEvent\(ID : DWord\);  
__Description__  
__Example__  
__See also__  
ITimerHandler interface


__Overview__  
The ITranslationManager interface deals with the installed locale languages for Altium Designer\. The installed locale languages are Simplified Chinese, Japanese, German and French\. The default locale is Standard English\.

__ITranslationManager methods__  
GetTranslated  
SetComponentToTranslate  
HasTranslationData

__ITranslationManager properties__

__See also__



\(ITranslationManager interface\)  
__Syntax__  
Function  GetTranslatedProperty\(Const ComponentName, PropName : WideString; Out OutValue : WideString\) : LongBool;  
__Description__  
__Example__  
   
__See also__


\(ITranslationManager interface\)  
__Syntax__  
Procedure SetComponentToTranslate\(Const ComponentName : WideString\);  
__Description__  
__Example__  
   
__See also__


\(ITranslationManager interface\)  
__Syntax__  
Function  HasTranslationData : LongBool;  
__Description__  
__Example__  
   
__See also__

## 子章节

- [System API: System Interfaces](01-System_API_System_Interfaces.md/README.md)
