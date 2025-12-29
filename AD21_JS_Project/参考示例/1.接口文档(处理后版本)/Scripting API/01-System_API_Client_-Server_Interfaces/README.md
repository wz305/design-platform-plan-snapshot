# System API Client\-Server Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [System API Client\-Server Interfaces for version 22](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- System API](https://www.altium.com/documentation/altium-designer/technical-reference-system-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


The System API Client\-Server Interfaces Reference includes the following sections and content:

[__IClient Interface__](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IClient Interface)

[__IServerModule Interface__](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IServerModule Interface)

[__Document and Panel View Interfaces__](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#Document and Panel View Interfaces)

[The IClient shell and its Interfaces](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#The IClient shell and its Interfaces)  
[IClient Methods](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IClient Methods)  
[IClient Properties](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IClient Properties)

[IServerModule GetState and SetState Methods](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IServerModule GetState and SetState Methods)  
[IServerModule Methods](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IServerModule Methods)  
[Properties](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#Properties)

[IExternalForm](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IExternalForm)  
[IExternalFormHolder interface](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IExternalFormHolder interface)  
[IHTMLViewExternalForm interface](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IHTMLViewExternalForm interface)  
[ISceneViewinterface](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#ISceneViewinterface)  
[INavigationDocument](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#INavigationDocument)  
[IServerView interface](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IServerView interface)  
[IServerDocumentView Interface](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IServerDocumentView Interface)  
[IServerDocument Interface](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IServerDocument Interface)  
[IHighlightedDocument Interface](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IHighlightedDocument Interface)  
[IServerPanelInfo Interface](https://www.altium.com/documentation/altium-designer/system-api-client-server-interfaces?version=21#IServerPanelInfo Interface)

 


__Overview__

The IClient interface \(from RT\_ClientServerInterface unit\) represents the Client subsystem of the Altium Designer application and the Client manages the commands \(pre packaged process launchers\), process depths and documents\. The every server module loaded in Altium Designer has hooks to the single client executable subsystem, so you have access to the specific documents of any loaded servers and launch server commands\.


- ICommandLauncher \(deals with process launchers\)
- IProcessLauncher \(deals with launching a server process\)
- IServerDocumentView \(deals with panels or server documents\)
- IProcessControl \(determines the level of stacked processes\)
- IGUIManager \(deals with the User interface of ALtium Designer, the locations and state of panels\)
- IServerModule \(deals with loaded servers in ALtium Deisgner\)
- INotification \(broadcast or dispatch notification messages to servers or to a specified server\)

You can obtain the IClient interface object by calling the Client function directly in your script\.

__IClient Methods and Properties Table__

__IClient methods__  
AddServerView  
AddViewToFavorites  
ApplicationIdle  
BeginDisableInterface  
BeginDocumentLoad  
BeginRecoverySave  
BroadcastNotification  
CanServerStarted  
CloseDocument  
DispatchNotification  
EndDisableInterface  
EndDocumentLoad  
EndRecoverySave  
GetApplicationHandle  
GetCommandLauncher  
GetCount  
GetCurrentView  
GetDefaultExtensionForDocumentKind  
GetDocumentByPath  
GetDocumentKindFromDocumentPath  
GetDynamicHelpManager  
GetEncryptedTechnologySets  
GetGUIManager  
GetMainWindowHandle  
GetNavigationSystem  
GetOptionsSet  
GetOptionsSetByName  
GetOptionsSetCount  
GetPanelInfoByName  
GetProcessControl  
GetRealMainWindowHandle  
GetServerModule  
GetServerModuleByName  
GetServerNameByPLID  
GetServerRecord  
GetServerRecordByName  
GetServerRecordCount  
GetServerViewFromName  
GetTimerManager  
GetWindowKindByName  
HideDocument  
InRecoverySave  
IsDocumentOpen  
IsQuitting  
LastActiveDocumentOfType  
LicenseInfoStillValid  
OpenDocument  
OpenDocumentShowOrHide  
QuerySystemFont  
RegisterNotificationHandler  
RemoveServerView  
SetCurrentView  
ShowDocument  
ShowDocumentDontFocus  
StartServer  
StopServer  
UnregisterNotificationHandler

__IClient Properties__  
ApplicationHandle  
CommandLauncher  
Count  
CurrentView  
GUIManager  
MainWindowHandle  
NavigationSystem  
ProcessControl  
ServerModule  
ServerModuleByName  
TimerManager



\(IClient interface\)  
__Syntax__  
Procedure AddServerView \(AView : IServerView\);  
__Description__  
This procedure adds a document view such as a custom panel in the Client object within Altium Designer\. In the TServerModule constructor, where the server commands are registered, this is the place to create global panel views\. The TServerModule\.CreateServerViews method will have the global panel form and the view created from this panel form\. Then the view is added to the server module \(TServerModule\.AddView\(\)\) as well as in the client object \(Client\.AddServerView\)\.  
__See also__  
IServerView interface  
IClient interface  
RT\_ServerImplementation for the TServerModule class\.


\(IClient interface\)  
__Syntax__  
Procedure ApplicationIdle;  
__Description__  
When the ApplicationIdle method is invoked, the procedure puts the Altium Designer in a mode where it has a chance to process Window and Altium Designer specific messages\.  
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure BeginDisableInterface;  
__Description__  
These BeginDisableInterface and EndDisableInterface methods are invoked when the User Interface of Client need to be disabled, for example there might be extensive processing going on, and you do not want the user’s intervention\.  
__See also__  
EndDisableInterface method  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure BeginDocumentLoad;  
__Description__  
The BeginDocumentLoad and EndDocumentLoad procedures are used to load a group of documents in Altium Designer\.  
__Example__

1

Client\.BeginDocumentLoad;

2

ServerDocument1 := Client\.OpenDocument\('Text',FileName1\);

3

ServerDocument2 := Client\.OpenDocument\('Text',FileName2\);

4

ServerDocument3 := Client\.OpenDocument\('Text',FileName3\);

5

Client\.EndDocumentLoad\(True\);

__See also__  
EndDocumentLoad method  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure BeginRecoverySave;  
__Description__  
The BeginRecoverySave and EndRecoverySave properties can be used to suppress the client notification of document name changes when doing a backup of a current design document in Altium Designer\. To check if the recovery save process is in progress, invoke the InRecoverySave method\.  
__See also__  
EndRecoverySave method  
InRecoverySave method  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure BroadcastNotification \(ANotification : INotification\);  
__Description__  
This procedure broadcasts a notification message in Altium Designer where all active design documents / servers have an opportunity to respond\. A BoardcastNotification is a DispatchNotification \(Nil, ANotification\); There are five types of Notification interfaces; ISystemNotification, IDocumentNotification, IDocumentFormNotification, IViewNotification and IModuleNotification\.  
__See also__  
DispatchNotifiaction method  
INotification interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function CanServerStarted \(AModuleName : PChar\) : LongBool;   
__Description__  
This function checks if a server module can be loaded in Altium Designer\. Use this before invoking the StartServer function\.  
__See also__  
IClient interface  
StartServer method


\(IClient interface\)  
__Syntax__  
Procedure CloseDocument\(ADocument : IServerDocument\);  
__Description__  
This procedure fetches the IServerDocument parameter to close the specified document \(if it is loaded and opened in Altium Designer already\)\. Note the document is not removed from Altium Designer, that is, the document still exists on the __Projects__ panel for example\.  
__See also__  
OpenDocument method  
IClient interface


\(IClient interface\)  
__Syntax__  
Property Count : Integer Read GetCount;  
__Description__  
This property returns the number of active servers in a current session of Altium Designer\. Use this property in conjunction with the ServerModule property to fetch Server Module interfaces\.  
__See also__  
GetCount method  
IServerModule interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure DispatchNotification      \(AServerModule : IServerModule; ANotification : INotification\);   
__Description__  
This procedure dispatches a notification message to the targeted server in Altium Designer\.  There are four types of Notification interfaces; IDocumentNotification, IDocumentFormNotification, IViewNotification and IModuleNotification\.  
__See also__  
INotification interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure EndDisableInterface;  
__Description__  
These BeginDisableInterface and EndDisableInterface methods are invoked when the User Interface of Client needs to be disabled, for example there might be extensive  
processing going on, and you do not want the user’s intervention\. This is a Altium Designer wide method\.  
__See also__  
BeginDisableInterface method  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure EndDocumentLoad\(AShow : LongBool\);  
__Description__  
The BeginDocumentLoad and EndDocumentLoad procedures are used to load a group of documents in Altium Designer\.  
__Example__

1

Client\.BeginDocumentLoad;

2

ServerDocument1 := Client\.OpenDocument\('Text',FileName1\);

3

ServerDocument2 := Client\.OpenDocument\('Text',FileName2\);

4

ServerDocument3 := Client\.OpenDocument\('Text',FileName3\);

5

Client\.EndDocumentLoad\(True\);

__See also__  
IClient interface  
BeginDocumentLoad method


\(IClient interface\)  
__Syntax__  
Procedure EndRecoverySave;  
__Description__  
The BeginRecoverySave and EndRecoverySave methods can be used to suppress the client notification of document name changes when doing a backup of a current design document in Altium Designer\.  
To check if the recovery save is in progress, invoke the InRecoverySave method\.  
__See also__  
BeginRecoverySave method  
InRecoverySave method  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetApplicationHandle : Integer;  
__Description__  
You can use the application handle into server code if dialogs need to be created dynamically from your server and so that when a dialog that appears on Altium Designer will inherit Altium Designer’s icon and appear as one whole application on the task bar\.  
This ApplicationHandle property can be passed as a parameter for the create constructor of the dialog\. The GetMainWindowHandle function is its equivalent\.  
__See also__  
GetMainWindowHandle method  
ApplicationHandle property  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetCommandLauncher   : ICommandLauncher;  
__Description__  
This function fetches the ICommandLauncher interface which represents Client’s process launcher which can be used to launch a server process and its parameters\. See the IProcessLauncher interface as well\.  
__See also__  
ICommandLauncher interface  
IProcessLauncher interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetCount : Integer;  
__Description__  
This method returns the number of active \(loaded\) servers in a current session of Altium Designer\. Use this method \(or the Count property\) in conjunction with the ServerModule property to fetch Server Module interfaces\.  
__See also__  
Count property  
IClient interface


\(IClient interface\)  
__Syntax__  
Function GetCurrentView : IServerDocumentView;  
__Description__  
This function fetches the current view \(ie the open document in focus in Altium Designer\)\. See the CurrentView property and the IServerDocumentView interface\.  
__Example__

1

Procedure GrabACurrentDocumentView;

2

Var

3

    ServerDocumentView : IServerDocumentView;

4

    CurrentDirectory   : AnsiString;

5

Begin

6

    ServerDocumentView := Client\.GetCurrentView;

7

    CurrentDirectory := ExtractFileDir\(ServerDocumentView\.GetOwnerDocument\.FileName\);

8

End;

__See also__  
CurrentView property  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetDefaultExtensionForDocumentKind\(DocumentKind : PChar\) : PChar;   
__Description__  
This function returns the default extension for the specific document kind based on the document kind parameter\.  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetDocumentByPath\(Const AFilePath : WideString\) : IServerDocument;  
__Description__  
This function fetches the full file path to a design document and if the path is valid, an IServerDocument object interface is returned representing the whole design document and its panels\.  
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Function GetDocumentKindFromDocumentPath   \(Path : PChar\) : PChar;   
__Description__  
This function returns the document kind based on the valid and full document path\.  
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Function GetEncryptedTechnologySets \(Var ValidAtTimestamp : Cardinal\) : WideString;  
__Description__  
__Example__  
   
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetGUIManager : IGUIManager;  
__Description__  
Returns the GUI Manager interface\. Use the GUIManager property instead\. This Interface object deals with the User Interface of Altium Designer such as controlling the status bars of Altium Designer, the locations and the state of panels in Altium Designer\.  
__See also__  
IGUIManager interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetLicenseManager : ILicenseManager;  
__Description__  
__Example__  
   
__See also__  
IClient interface  
ILicenseManager interface


\(IClient interface\)  
__Syntax__  
Function  GetMainWindowHandle : Integer;  
__Description__  
You can use the application handle into server code if dialogs need to be created dynamically from your server and so that when a dialog that appears on Altium Designer will inherit Altium Designer’s icon and appear as one whole application on the task bar\. This ApplicationHandle property is also its equivalent\.  
__See also__  
GetApplicationHandle method  
ApplicationHandle property  
IClient interface


\(IClient interface\)  
__Syntax__  
Function GetNavigationSystem : INavigationSystem;   
__Description__  
The function returns the Navigation system interface\.  
__See also__  
INavigationSystem interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetOptionsManager : IOptionsManager;  
__Description__  
This method retrieves the IOptionsManager interface\. With this interface, you can invoke the GetOptionsReader or GetOptionsWriter to retrieve or write options \(settings\) for the target server\. Each editor server has options that manage its server documents\.  
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
IOptionsManager


\(IClient interface\)  
__Syntax__  
Function GetOptionsSetByName \(Const AName : Widestring\) : IDocumentOptionsSet;  
__Description__  
This function retrieves the IDocumentOptionsSet interface based on the valid Name string\.  
__See also__  
GetOptionsSetCount method  
GetOptionsSet method  
IDocumentOptionsSet interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetOptionsSetCount : Integer;  
__Description__  
This function returns you the number of Options Set\.  
__See also__  
GetOptionsSet method  
GetOptionsSetByName method  
IClient interface


\(IClient interface\)  
__Syntax__  
Function GetOptionsSet \(Index : Integer\) : IDocumentOptionsSet;  
__Description__  
This function returns you the indexed Options set \(IDocumentOptionsSet type\)\.  
__See also__  
GetOptionsSetCount method  
GetOptionsSetByName method  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetPanelInfoByName \(Const APanelName  : Widestring\)  
: IServerPanelInfo;  
__Description__  
This function obtains the IServerPanelInfo interface for the specified panel\.  
__See also__  
IServerPanelInfo interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetProcessControl : IProcessControl;  
__Description__  
Returns the Process Control interface\. This Process Control determines the number of “re\-entrant” processes occurring, ie one client’s process occurring stacked on top of another active client’s process – this is the process depth\. If a process control’s process depth is zero, it indicates that nothing is taking place in Altium Designer\.  
__See also__  
IProcessControl interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetRealMainWindowHandle : THandle;  
__Description__  
The function returns the window handle of the main window in Altium Designer\.  
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetServerNameByPLID\(APLID : PChar\) : PChar;   
__Description__  
This function returns you the server name based on the PLID identifier string \(a string extracted from the server’s resources file\)\.  
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetServerModule\(Index : Integer\) : IServerModule;  
__Description__  
The ServerModule property is used in conjunction with the Count property to retrieve active \(loaded\) servers\. The ServerModule property returns the IServerModule interface for the loaded server module in Altium Designer\.  
Note, that PCB server and Schematic server have their own IPCB\_ServerInterface and ISch\_ServerInterface interfaces respectively\.  
__IServerModule example__  
This example gets the Schematic's IServerModule interface and returns the number of document views open in Altium Designer

1

Var

2

    ServerModule : IServerModule;

3

Begin

4

    If Client = Nil Then Exit;

5

  

6

    ServerModule := Client\.ServerModuleByName\('SCH'\);

7

    ShowMessage\('Doc Count = ' \+ IntToStr\(ServerModule\.DocumentCount\)\);

8

End;

__See also__  
Count property  
IServerModule property  
ServerModuleByName property  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetServerModuleByName \(Const AModuleName : Widestring\) : IServerModule;  
__Description__  
The function returns the server module interface depending on the validity of the AModuleName parameter\. Examples include ‘PCB’ or ‘SCH’\. Use the ServerModuleByName property instead to return the indexed server module\.  
__Example__

1

Var

2

    ServerModule : IServerModule;

3

Begin

4

    If Client = Nil Then Exit;

5

  

6

    ServerModule := Client\.ServerModuleByName\('SCH'\);

7

    ShowMessage\('Doc Count = ' \+ IntToStr\(ServerModule\.DocumentCount\)\);

8

End;

__See also__  
GetServerModule method  
ServerModule property  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetServerRecord \(Index : Integer\) : IServerRecord;  
__Description__  
The GetServerRecord function reports the number of installed servers based on the installation \*\.INS files in the System folder of Altium Designer installation\)\. Use this in conjunction with the GetServerRecordCount function\.  
The IClient interface has GetServerRecord and GetServerModule methods\. The difference between these two methods is that the GetServerRecord function reports the number of installed servers \(\*\.INS files in the \\System\\ folder of Altium Designer installation\)\.  
The GetServerModule merely returns the active \(loaded\) server in Altium Designer and to get each active server, you need to invoke the GetCount function and pass the count parameter into the GetServerModule function\.  
__See also__  
GetServerRecordCount method  
GetServerModule method  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetServerRecordCount : Integer;  
__Description__  
This function returns the number of server records that represent the server installation files found in the \\System\\ folder of the Altium Designer software installation\. This is to be used in conjunction with the GetServerRecord function\.  
__See also__  
IServerRecord interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetServerRecordByName\(AModuleName : WideString\) : IServerRecord;  
__Description__  
This function returns the IServerRecord interface based on the AModuleName parameter\. This IServerRecord interface represents the installation file for the server \(with an INS extension\)\.  
__Example__

01

Var

02

    ClientModule : IClient;

03

    ServerRecord : IServerRecord;

04

    Version      : WideString;

05

Begin

06

    ClientModule := Client;

07

    If ClientModule = Nil Then Exit;

08

  

09

    //The IServerRecord interface encapsulates the details

10

    // of a server's installation file

11

  

12

    //We are interested in the Altium Designer's Client Module

13

    // and fetch the product version\.

14

    ServerRecord := ClientModule\.GetServerRecordByName\('CLIENT'\);

15

    Version := ServerRecord\.GetVersion;

16

  

17

    ShowMessage\(Version\);

18

End;

__See also__  
IServerRecord interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetServerViewFromName \(Const ViewName : Widestring\) : IServerView;  
__Description__  
This function returns the server view object interface depending on the name of the server view\. A IServerView interface represents a panel view as well as an ancestor for a document view\.  
__See also__  
IExternalForm interface  
IServerView interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetTimerManager : ITimerManager;   
__Description__  
This function returns the timer manager interface associated with the client sub system\.  
__See also__  
ITimerManager interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  GetWindowKindByName  \(AWindowKindName : Widestring : IServerWindowKind  
__Description__  
This function returns the IServerWindowKind interface based on the AWindowKindName parameter which denotes the document kind\. For example, there are two document kinds in the PCB editor – PCB and PCBLIB documents\.  
__See also__  
IServerWindowKind interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure HideDocument \(Const ADocument        : IServerDocument\);   
__Description__  
This procedure hides the document, ie puts it out of focus but not closed or destroyed\.  
__See also__  
CloseDocument method  
OpenDocument method  
ShowDocument method  
IServerDocument interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  OpenDocumentShowOrHide              \(Const AKind, AFileName : WideString; AShowInTree : Boolean\) : IServerDocument;  
__Description__  
This function opens a specific document but you can control how it is displayed in the Altium Designer workspace\.  
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure HandleException \(Const AMessage   : WideString\);  
__Description__  
__Example__  
   
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  InRecoverySave : LongBool   
__Description__  
This function checks whether Altium Designer is in the process of Recovery Save mode, before you can invoke the BeginRecoverySave or EndRecoverySave methods\.  
__See also__  
BeginRecoverySave method  
EndRecoverySave method  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  IsDocumentOpen \(Const AFilePath : PChar\) : LongBool;   
__Description__  
Returns a boolean value whether the document is open in Altium Designer or not and is dependent on whether the AFilePath parameter is valid or not\.  
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  IsQuitting : Boolean;   
__Description__  
Returns a boolean value that represents the state Altium Designer is in: True if Altium Designer is about to quit or in the process of quitting, False if Altium Designer is still active\.  
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  LastActiveDocumentOfType \(Const AType : Widestring\) : IServerDocument;  
__Description__  
This function returns the last active loaded document in Altium Designer by the document type\. Types include PCB, SCH, TEXT, WAVE, PCBLIB, SCHLIB\.  
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  IsInitialized : LongBool;   
__Description__  
__Example__  
   
__See also__  
Client interface


\(IClient interface\)  
__Syntax__  
Function  LicenseInfoStillValid \(Const RetrievedAt : Cardinal\) : LongBool;  
__Description__  
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Property MainWindowHandle : Integer Read GetMainWindowHandle;  
__Description__  
The MainWindowHandle property returns the handle of the main window in Altium Designer which can be used for addon dialogs that will be attached to Altium Designer and have a single Altium Designer icon on the Taskbar for example\.  
__See also__  
GetMainWindowHandle method  
ApplicationHandle property  
IClient interface


\(IClient interface\)  
__Syntax__  
Function OpenDocument \(Const AKind, AFileName : PChar\) : IServerDocument;  
__Description__  
The OpenDocument method returns the IServerDocument interface depending on the DocumentKind and FileName values of this document are valid\.  
__Example__

1

Var

2

    ReportDocument : IServerDocument;

3

Begin

4

    ReportDocument  := Client\.OpenDocument\('Text',FileName\);

5

    If ReportDocument <> Nil Then

6

        Client\.ShowDocument\(ReportDocument\);

7

End

__See also__  
ShowDocument method  
IClient interface


\(IClient interface\)  
__Syntax__  
Function OpenNewDocument \(Const AKind, AFileName, ANewName : Widestring; ReuseExisting : Boolean\) : IServerDocument;  
__Description__  
__Example__  
   
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure QuerySystemFont \(    QueryMode    : TFontQueryMode;   
                           Var AUseSysFont  : Boolean;  
                           Var AFontName    : WideString;  
                           Var AFontSize    : Integer;  
                           Var AFontStyle   : TFontStyles;  
                           Var AFontColor   : TColor;  
                           Var AFontCharset : TFontCharset\);  
__Description__  
Query the system font used\.  
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure RegisterNotificationHandler\(Const Handler : INotificationHandler\);   
__Description__  
The RegisterNotificationHandler method registers the notification handler in the Client module part of Altium Designer once the server object is created and loaded in computer memory\. The Handler parameter contains the server module object\.  
__Notes__  
The INotificationHandler object interface is responsible for handling notifications raised in Altium Designer\.  
Each server object has a HandleNotification procedure to handle notifications when the options values have been adjusted from the system wide Preferences dialog\.  
The HandleNotification procedure would involve calls to update the server preferences values on the server panel for example every\-time a specific server notification code is intercepted\.  
This method is normally used for in developing servers and not for scripts\.  
__See also__  
BroadcastNotification method  
DispatchNotification method  
UnRegisterNotificationHandler method  
INotificationHandler interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure RemoveServerView \(Const AView : IServerView\);  
__Description__  
This procedure removes a server view \(representing a server document window\) from Altium Designer\.  
__See also__  
GetCurrentView method  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure ShowDocumentDontFocus\(ADocument : IServerDocument\);  
__Description__  
This procedure fetches the IServerDocument parameter and then displays this design document but leaves the previously focussed document in focus\. If there are not design documents open already, then this design document will still be displayed but not focussed\.  
__See also__  
OpenDocument method  
ShowDocument method  
IServerDocument interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure ShowDocument \(ADocument : IServerDocument\);  
__Description__  
This procedure fetches the IServerDocument parameter which represents the Server Document loaded in Altium Designer and then displays the design document in Altium Designer\.  
__IServerDocument example__  
This example gets the client interface and then opens and shows a document\.

1

Procedure OpenAndShowADocument\(Filename : TDynamicString\);

2

Var

3

    ReportDocument : IServerDocument;

4

Begin

5

    If Client = Nil Then Exit;

6

    ReportDocument  := Client\.OpenDocument\('Text',FileName\);

7

    If ReportDocument <> Nil Then

8

          Client\.ShowDocument\(ReportDocument\);

9

End;

__See also__  
OpenDocument method  
IServerDocument interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure SetCurrentView\(Value : IServerDocumentView\);   
__Description__  
This procedure fetches the IServerDocumentView parameter to set this document form as the current view in Altium Designer\.  
__See also__  
GetCurrentView method  
CurrentView property  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  StopServer \(AModuleName : WideString\) : Boolean;  
__Description__  
The StartServer and StopServer properties can be used to load a server in Altium Designer if it has not loaded already, before you can invoke this server’s processes and to stop this server once you have done with these server processes\. This can be used to conserve computer’s memory\.  
The StartServer function is usually used if you need to load a design document and execute the server’s processes or its API functions if the server has not been loaded yet\. Example, during a blank session of Altium Designer where there are no PCB documents open, and you need to use the PCB API to manipulate the contents on a PCB document, you would need to “start” the PCB server first so the PCB API is made active\.  
__Example of the StopServer method__  
Client\.StopServer\('PCB'\);  
__See also__  
StartServer method  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  StartServer \(AModuleName : WideString\) : Boolean;  
__Description__  
The StartServer and StopServer properties can be used to load a server in Altium Designer if it has not already, before you can invoke this server’s processes and to stop this server once you have done with these server processes\. This can be used to conserve computer’s memory\.  
The StartServer function is usually used if you need to load a design document and execute the server’s processes or its API functions if the server has not been loaded yet\. Example, during a blank session of Altium Designer where there are no PCB documents open, and you need to use the PCB API to manipulate the contents on a PCB document, you would need to “start” the PCB server first so the PCB API is made active\.  
__Example of the StartServer method__  
Client\.StartServer\('PCB'\);  
__See also__  
StopServer method  
IClient interface


\(IClient interface\)  
__Syntax__  
Procedure UnregisterNotificationHandler\(Const Handler : INotificationHandler\);  
__Description__  
The UnregisterNotificationHandler method un registers the notification handler from Client once the server object goes out of scope \(destroyed\)\. The Handler parameter contains the server module object\.  
__Notes__  
The INotificationHandler object interface is responsible for handling notifications raised in Altium Designer\.  
Each server object has a HandleNotification procedure to handle notifications when the options values have been adjusted from the system wide Preferences dialog\.  
The HandleNotification procedure would involve calls to update the server preferences values on the server panel for example every\-time a specific server notification code is intercepted\.  
This method is normally used for in developing servers and not for scripts\.  
__See also__  
BroadcastNotification  
DispatchNotification  
RegisterNotificationHandler method  
INotificationHandler interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Function  AddViewToFavorites\(Const AView : IServerDocumentView; AIsSnippet : Boolean\) : Boolean;  
__Description__  
__Example__  
   
__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Function GetDynamicHelpManager : IDynamicHelpManager;  
__Description__  
The method returns the Dynamic Help manager which represents the Knowledge Center panel in Altium Designer\.  
__See also__  
IClient interface  
IDynamicHelpManager interface\.



\(IClient interface\)  
__Syntax__  
Property ApplicationHandle : Integer  
__Description__  
The ApplicationHandle property sets the application handle in a server if dialogs need to be created dynamically from your server and every time a dialog that appears in front of Altium Designer will inherit Altium Designer’s icon and appear as one whole application on the task bar\.  
This ApplicationHandle property can be passed as a parameter for the create constructor of a dynamic dialog for example\.  
__Note__  
Normally script writers will not need to worry about this applicationhandle property\. This property is used by the server writers as part of the Altium Designer SDK\.  
__Server Example__

01

In the server project's main unit

02

Function ServerFactory \(AClient : IClient\) : IServerModule; Safecall;

03

Begin

04

    Result := TAddOn\.Create\(AClient, 'AddOn'\);

05

    Application\.Handle := Client\.ApplicationHandle;

06

End;

07

  

08

In the server project's commands unit

09

Procedure DisplayResultsOnDialog\(PadCount : TDynamicString\);

10

Var

11

    DisplayForm : TDialog;

12

Begin

13

    DisplayForm := TDialog\.Create\(Application\);

14

    DisplayForm\.Label1\.Caption := PadCount;

15

    DisplayForm\.ShowModal;

16

    DisplayForm\.Free;

17

End;

__See also__  
IClient interface


\(IClient interface\)  
__Syntax__  
Property CommandLauncher : ICommandLauncher Read GetCommandLauncher;  
__Description__  
The CommandLauncher property returns the Command Launcher interface\. This interface contains the table of client’s process launchers that can be used to launch a command\.  
__Example__

1

If StringsEqual\(ServerModule\.ModuleName,'TextEdit'\) Then

2

Begin

3

    Client\.CommandLauncher\.LaunchCommand\(

4

    'TextEdit:MoveCursorToTopOfDocument',

5

     Nil,0,ServerDocument\.View\[0\]\);

6

End;

__GetCommandLauncher example__

01

ACommandLauncher := Client\.GetCommandLauncher;

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

End;

__See also__  
GetCommandLauncher method  
IProcessLauncher interface  
ICommandLauncher interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Property  CurrentView : IServerDocumentView Read GetCurrentView Write SetCurrentView;  
__Description__  
This property returns the current document view interface which represents the current design document view in Altium Designer\.  
__SendMessage Example__  
    Client\.SendMessage\('PCB:Zoom', 'Action=Redraw' , 255, Client\.CurrentView\);  
__CurrentView example__

1

Procedure GrabACurrentDocumentView;

2

Var

3

    ServerDocumentView : IServerDocumentView;

4

    FileName   : WideString;

5

Begin

6

    ServerDocumentView := Client\.CurrentView;

7

    FileName := ServerDocumentView\.GetOwnerDocument\.FileName;

8

End;

__ViewName example__  
If StrPas\(Client\.CurrentView\.ViewName\) <> UpperCase\('PCBLib'\) Then Exit;  
This code snippet uses the __Client\.CurrentView\.ViewName__ method to find out the current document’s type\.   
__See also__  
GetCurrentView method  
SetCurrentView method  
IServerDocumentView interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Property GUIManager : IGUIManager Read GetGUIManager;  
__Description__  
The GUIManager property returns the GUIManager interface\. This Interface object deals with the Altium Designer's Graphical User Interface such as controlling the status bars, the locations and the state of panels\.  
__See also__  
IGUIManager interface  
IClient interface


\(IClient interface\)  
__Syntax__  
Property  NavigationSystem : INavigationSystem   Read GetNavigationSystem;  
__Description__  
The NavigationSystem property represents the Navigation system in Altium Designer\. The navigation system is the workhouse for the Navigation panel which is the center\-piece for net connectivity for the design project\. There are three ways a design can be arranged \- as a list of compiled sheets, flattened hierarchy and as a structural tree\.  
__Example__  
   
__See also__  
IClient interface  
INavigationSystem interface


\(IClient interface\)  
__Syntax__  
Property ProcessControl : IProcessControl Read GetProcessControl;  
__Description__  
This property returns the __IProcessControl__ interface\. This Process Control interface determines the number of “re\-entrant” processes occurring, ie one client’s process occurring stacked on top of another active client’s process – this is the process depth\. If a process control’s process depth is zero, it indicates that nothing is taking place in Altium Designer\. Refer to the __IProcessControl__ interface for details\.  
__ProcessDepth Example__  
ShowMessage\('Current process depth ',IntToStr\(Client\.ProcessControl\.ProcessDepth\)\);  
__See also__  
IClient interface  
IProcessControl interface


\(IClient interface\)  
__Syntax__  
Property ServerModule \[Index : Integer\] : IServerModule Read GetServerModule;  
__Description__  
The ServerModule property is used in conjunction with the Count property to retrieve active \(loaded\) servers\. The ServerModule property returns the IServerModule interface for the loaded server module in Altium Designer\.  
Note, that PCB server and Schematic server have their own IPCB\_ServerInterface and ISch\_ServerInterface interfaces respectively\.  
__IServerModule example__  
This example gets the Schematic's IServerModule interface and returns the number of document views open in Altium Designer

1

Var

2

    ServerModule : IServerModule;

3

Begin

4

    If Client = Nil Then Exit;

5

  

6

    ServerModule := Client\.ServerModuleByName\('SCH'\);

7

    ShowMessage\('Doc Count = ' \+ IntToStr\(ServerModule\.DocumentCount\)\);

8

End;

__See also__  
IClient interface  
Count property  
GetServerModule method  
IServerModule interface


\(IClient interface\)  
__Syntax__  
Property ServerModuleByName\[Const AModuleName : Widestring\] : IServerModule Read GetServerModuleByName;  
__Description__  
The ServerModuleByName property returns the IServerModule interface if the module name is found in the Client’s table of active servers\. For a PCB editor, module name is PCB, for a Schematic Editor, the module name is SCH etc\.  
__Server Names__  
__Example__

1

Var

2

    ServerModule : IServerModule;

3

Begin

4

    If Client = Nil Then Exit;

5

  

6

    ServerModule := Client\.ServerModuleByName\('SCH'\);

7

    ShowMessage\('Doc Count = ' \+ IntToStr\(ServerModule\.DocumentCount\)\);

8

End;

__See also__  
IClient interface  
IServerModule interface


\(IClient interface\)  
__Syntax__  
Property TimerManager : ITimerManager Read GetTimerManager;  
__Description__  
This property returns the timer manager object interface\.  
__See also__  
IClient interface  
ITimerManager interface


\(IClient interface\)  
__Syntax__  
Property OptionsManager : IOptionsManager Read GetOptionsManager;  
__Description__  
This is a read only property that returns the IOptionsManager interface\. This interface is responsible for managing \(reading and writing\) values to/from the system wide Preferences dialog in Altium Designer for the specified server\.  
This interface is useful for server writers who wish to add their options pages in the system wide preferences dialog and manage the controls on these options pages\.  
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

 



__Overview__  
The IExternalForm interface represents a Delphi form either as a document form or a panel form\.  This IExternalForm interface object has low level methods such as resizing and displaying the form\.

__Notes__  
The Altium Designer platform is based on the object interfaces technology by Borland\(TM\), thererfore TForm, TFrame, and other VCL controls to object interfaces are not passed into object interfaces that can be exposed to third party development in different programming systems\. For example VCL technology is not compatible with MS C\+\+ toolkit\.

Therefore to work with windows in the Altium Designer platform, you use the IExternalForm interface to have access to windows and manipulate them\. The IExternalFormHolder interface and the TExternalFormComponent class are used to work with Delphi windows in a server plugged into the Altium Designer platform and accessible to other servers plugged in\.

__IExternalForm Methods and Properties Table__

__IExternalForm methods__  
SetParentWindow  
ParentWindowCreated  
ParentWindowDestroyed  
GetBounds  
Hide  
SetBounds  
SetFocus  
Show  
FocusFirstTabStop

__IExternalForm properties__  
Caption  
Handle

__See also__  
IServerView interface  
IServerDocumentView interface  
IExternalFormHolder interface  
TExternalFormComponent class from ExternalForm unit  
TServerExternalFormComponent class from ExternalForm unit\.



\(IExternalForm interface\)  
__Syntax__  
Procedure FocusFirstTabStop;  
__Description__  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


\(IExternalForm interface\)  
__Syntax__  
Procedure GetBounds \(Var ALeft, ATop, AWidth, AHeight : Integer\);  
__Description__  
This procedure retrieves the four bounds \(left, top, width and height\) of the form\.  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


\(IExternalForm interface\)  
__Syntax__  
Procedure Hide;  
__Description__  
This Hide method hides the form from view in Altium Designer\.  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


\(IExternalForm interface\)  
__Syntax__  
Procedure ParentWindowCreated;  
__Description__  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


\(IExternalForm interface\)  
__Syntax__  
Procedure ParentWindowDestroyed;  
__Description__  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


\(IExternalForm interface\)  
__Syntax__  
Procedure SetBounds \(ALeft, ATop, AWidth, AHeight : Integer\);  
__Description__  
This procedure sets the bounds of the external form\.  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


\(IExternalForm interface\)  
__Syntax__  
Procedure SetFocus;   
__Description__  
This procedure sets the Delphi based form in focus in Altium Designer\.  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


\(IExternalForm interface\)  
__Syntax__  
Procedure SetParentWindow \(Const ParentWindow : IExternalFormHolder\);  
__Description__  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


\(IExternalForm interface\)  
__Syntax__  
Procedure Show;  
__Description__  
This procedure displays the hidden form\.  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface



\(IExternalForm interface\)  
__Syntax__  
Property  Caption : Widestring  
__Description__  
A read only property that returns you the caption of the external form that the dialog is associated with\.  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


\(IExternalForm interface\)  
__Syntax__  
Property Handle : HWND  
__Description__  
A read only property that returns the handle of the Delphi based form\.  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


__Overview__  
The IExternalFormHolder interface represents the TExternalFormComponent object and holds the IExternalForm interface\.

__Notes__  
The DXP platform is based on the object interfaces technology by Borland\(TM\), therefore TForm, TFrame, and other VCL controls to object interfaces are not passed into object interfaces that can be exposed to third party development in different programming systems\. For example VCL technology is not compatible with MS C\+\+ toolkit\.

Therefore to work with windows in the Altium Designer platform, you use the IExternalForm interface to have access to windows and manipulate them\. The IExternalFormHolder interface and the TExternalFormComponent class are used to work with Delphi windows in a server plugged into the Altium Designer platform\.

__IExternalFormHolder Methods and Properties Table__

__IExternalFormHolder methods__  
GetParentWindow  
SetDialogHandle

__IExternalFormHolder properties__

__See also__  
IExternalForm interface  
TExternalFormComponent class in ExternalForm unit\.



\(IExternalFormHolder interface\)  
__Syntax__  
Function GetParentWindow : THandle;  
__Description__  
This function retrieves the THandle of the parent window that can be used in the IExternalForm interface\.  
__Example__  
__See also__  
IExternalFormHolder interface


\(IExternalFormHolder interface\)  
__Syntax__  
Procedure SetDialogHandle \(AHandle : THandle\);  
__Description__  
This procedure sets the dialog handle for this external form\.  
__Example__  
__See also__  
IExternalFormHolder interface


__Overview__  
The __IHTMLViewExternalForm__ interface represents a HTML document\.

__IHTMLViewExternalForm methods__  
GetCtrlClickInNewWindow  
SetCtrlClickInNewWindow  
NavigateTo  
GetHTMLDocument

__IHTMLViewExternalForm properties__  
CtrlClickInNewWindow


__Overview__  
The ISceneView__ __interface represents a specific view\.

__ISceneView methods__  
CanClose

__ISceneView properties__


__Overview__  
The INavigationDocument__ __interface represents a specific navigation view\.

__INavigationDocument methods__  
GetDocumentScene

__INavigationDocument properties__

__See also__  
IExternalForm interface


__Overview__  
The IServerView interface is the ancestor interface for a document or panel view object interface\.  
This IServerView interface also represents a global panel in Altium Designer, for example the Messages or ToDo panels\.

The IServerView interface hierarchy is as follows;  
IExternalForm  
    IServerView interface

__IServerView Methods and Properties Table__

__IServerView Methods__  
GetViewState  
SetViewState  
ReceiveNotification

__IServerView Properties__  
IsPanel  
ViewName

__See also__  
IExternalForm interface  
IServerDocumentView interface  
IServerDocument interface



\(IServerView interface\)  
__Syntax__  
Function  GetIsPanel : LongBool;  
__Description__  
The IsPanel property determines whether the IServerDocumentView object is a panel or not\. A IServerDocument container stores IServerDocumentView objects and they are can be a panel view or a document view\.  
This property is supported by the GetIsPanel method\.  
__Example__

1

Var

2

ServerDocumentView : IServerDocumentView;

3

Begin

4

ServerDocumentView := ServerDocument\.View\[j\];

5

If Not\(ServerDocumentView\.IsPanel\) Then

6

      ShowMessage\('Document Name ' \+ ServerDocument\.FileName\);

7

End;

__See also__  
IClient interface  
IExternalForm interface


\(IServerView  interface\)  
__Syntax__  
Function GetViewName : Widestring;  
__Description__  
The ViewName property represents the view name and is not the same as the document filename\. A view can be a global panel that can be seen globally within Altium Designer, as a document view or as a panel view\.  
This read only property is supported by the GetViewName method\.  
For example a library document open in Altium Designer yields the following information:  
View Name: PCBEditor  
Document Name: C:\\Program Files\\Altium Designer\\Examples\\Reference Designs\\4 Port Serial Interface\\Libraries\\4 Port Serial Interface\.PcbLib  
Caption: PCBView\_GraphicalForm  
__ViewName example__  
If StrPas\(Client\.CurrentView\.GetViewName\) <> UpperCase\('PCBLib'\) Then Exit;  
This code snippet uses the Client\.CurrentView\.ViewName method to find out the current document’s type name\.  
__See also__  
IClient interface  
IServerView interface  
IExternalForm interface



\(IServerView interface\)  
__Syntax__  
Function  GetViewState : Widestring;  
__Description__  
__Example__  
   
__See also__  
IClient interface  
IServerView interface  
SetViewState method


\(IServerView interface\)  
__Syntax__  
Procedure ReceiveNotification \(Const ANotification : INotification\);  
__Description__  
The ReceiveNotification procedure captures the notification generated by Altium Designer\. A global panel, a document view or a panel view has the ability to intercept a notification and take action accordingly\.  
__Example__  
   
__See also__  
IClient interface  
IServerView interface  
INotification interface


\(IServerView interface\)  
__Syntax__  
Procedure SetViewState\(Const Astate : Widestring\);  
__Description__  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface  
GetViewState method



\(IServerView interface\)  
__Syntax__  
Property IsPanel : LongBool Read GetIsPanel;  
__Description__  
The IsPanel property returns a boolean value denoting whether the view is a panel or a document view\.  
A document consists of a document view and at least one panel view\. There also can be global or system views such as Message panel which is a global panel view\.  
This read only property is supported by the GetIsPanel method\.  
__Example__

1

Var

2

ServerDocumentView : IServerDocumentView;

3

Begin

4

ServerDocumentView := ServerDocument\.View\[j\];

5

If Not\(ServerDocumentView\.IsPanel\) Then

6

      ShowMessage\('Document Name ' \+ ServerDocument\.FileName\);

7

End;

__See also__  
IServerView interface


\(IServerView interface\)  
__Syntax__  
Property ViewName : Widestring    Read GetViewName;  
__Description__  
The ViewName property represents the view name and is not the same as the document filename\. A view can be a global panel that can be seen globally within Altium Designer, as a document view or as a panel view\.  
This read only property is supported by the GetViewName method\.  
For example a library document open in Altium Designer yields the following information:  
View Name: PCBEditor  
Document Name: C:\\Program Files\\Altium Designer\\Examples\\Reference Designs\\4 Port Serial Interface\\Libraries\\4 Port Serial Interface\.PcbLib  
Caption: PCBView\_GraphicalForm  
__ViewName example__  
If StrPas\(Client\.CurrentView\.ViewName\) <> UpperCase\('PCBLib'\) Then Exit;  
This code snippet uses the Client\.CurrentView\.ViewName method to find out the current document’s type\.  
__See also__  
IClient interface  
IServerView interface


__Overview__  
The IServerDocumentView represents either the document view or one of the associated panel views in Altium Designer\. This interface is inherited from the IServerView interface\.  
The IServerDocument interface contains IServerDocumentView interfaces, that is, a design document open in Altium Designer contains links to a document view and at least one panel view\.

The hierarchy is as follows;  
IExternalForm  
    IServerView interface  
        IServerDocumentView interface

__IExternalForm methods__  
SetParentWindow  
ParentWindowCreated  
ParentWindowDestroyed  
GetBounds  
Hide  
SetBounds  
SetFocus  
Show  
FocusFirstTabStop

__IExternalForm properties__  
Caption  
Handle

__IServerView Methods__  
GetViewState  
SetViewState  
ReceiveNotification

__IServerView Properties__  
IsPanel  
ViewName

__IServerDocumentView Methods and Properties Table__

__IServerDocumentView Methods__  
GetOwnerDocument  
PerformAutoZoom  
UpdateStatusBar

__IServerDocumentView Properties__  
OwnerDocument

__See also__  
IClient interface  
IServerModule interface  
IServerDocument interface  
IServerView interface  
IExternalForm interface



\(IServerDocumentView interface\)  
__Syntax__  
Function GetOwnerDocument : IServerDocument;  
__Description__  
The OwnerDocument property returns the IServerDocument interface that the IServerDocumentView itnerface is associated with\. An IServerDocument container stores IServerDocumentView interfaces which represent a document or panel view\.  
This read only property is supported by the GetOwnerDocument method\.  
__Example__  
   
__See also__  
IClient interface  
IServerDocumentView interface



\(IServerDocumentView interface\)  
__Syntax__  
Procedure PerformAutoZoom;  
__Description__  
This procedure forces a refresh or repaint of the document / panel view\.  
__Example__  
   
__See also__  
IClient interface  
IServerDocumentView interface


\(IServerDocumentView interface\)  
__Syntax__  
Procedure UpdateStatusBar;  
__Description__  
This procedure forces an update of the status bar when a string is submitted to the status bar\.  
__Example__  
   
__See also__  
IClient interface  
IServerDocumentView interface



\(IServerDocumentView interface\)  
__Syntax__  
Property OwnerDocument : IServerDocument Read GetOwnerDocument;  
__Description__  
This property returns the IServerDocument interface that the IServerDocumentView interface is associated with\. An IServerDocument container stores IServerDocumentView interfaces which represent a document or panel view\.  
This read only property is supported by the GetOwnerDocument method\.  
__Example__  
   
__See also__  
IClient interface  
IExternalForm interface


__Overview__  
The IServerDocument interface represents the document container\. Each IServerDocument interface is a document containter made up of views of the same kind\.  
A view can be a design document form or a panel form\.  
Every document editor server \(encapsulated by the IServerModule interface\) that supports creation of documents will have a IServerDocument interface\.

The __IServerDocument__ interface hierarchy is as follows;

__IServerDocument Methods and Properties Table__

__IServerDocument methods__  
AddView  
SetModified  
SetIsShown  
SetBeingClosed  
Focus  
DoFileLoad  
DoFileSave  
SupportsReload  
GetCanClose  
GetCount  
GetFileName  
SetFileName  
GetKind  
GetModified  
GetIsShown  
GetBeingClosed  
GetFileModifiedDate  
UpdateModifiedDate  
GetServerModule  
GetView  
GetViewByName  
NotifyViews  
GetSupportsOwnSave  
GetContextHelpTopicName  
SetFileModifiedDate  
WarnIfOwnedByOther  
AcquireFileOwnership  
ReleaseFileOwnership  
ReleaseDataFileHandle  
AcquireDataFileHandle  
OwnsFile  
DoSafeFileSave  
DoSafeChangeFileNameAndSave  
CreateSnippetFile  
ZoomSnippetContents  
GetSnippetView  
PlaceSnippet  
CanPlaceSnippet  
CanCreateSnippet

__IServerDocument properties__  
CanClose  
Count  
FileName  
Kind  
Modified  
IsShown  
BeingClosed  
ServerModule  
View  
SupportsOwnSave

__IServerDocument example__

1

Procedure OpenAndShowADocument\(Filename : TDynamicString\);

2

Var

3

    ReportDocument : IServerDocument;

4

Begin

5

    If Client = Nil Then Exit;

6

    ReportDocument  := Client\.OpenDocument\('Text',FileName\);

7

    If ReportDocument <> Nil Then

8

          Client\.ShowDocument\(ReportDocument\);

9

End;

__See also__  
IClient interface  
IServerDocumentView interface  
IServerView interface  
CS server example in the \\Developer Kit\\Examples\\DXP\\ClientServer Interfaces\\ folder\.



\(IServerDocument interface\)  
__Syntax__  
Procedure AddView \(Const AView : IServerDocumentView\);  
__Description__  
This procedure adds a IServerDocumentView object in the server document\. A IServerDocument object is a container containing views of document views and panel views\.  
__Example__  
__See also__  
IServerDocument interface  
IServerDocumentView interface


\(IServerDocument interface\)  
__Syntax__  
Function DoFileLoad : LongBool;  
__Description__  
This function allows the re\-loading of the document\. This is useful if the document has been modified and saved and it needs to be re\-loaded to ensure that the document is in the latest state\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function DoFileSave \(Const AKind : Widestring\) : LongBool;  
__Description__  
This function provides you an option to save the document in a different format if the document supported by the specific document editor provides the option of saving in a different format other than the default format\. Normally these file formats are stored in the SaveFilters block within the EditorWindowKind section within a server installation file \(with an INS extension\)\.  
__File Formats__  
For example with PCB documents in Altium Designer, you can save them as a PCB ASCII format, PCB Binary 3 format etc \- PCB Binary, PCB 3\.0 Binary, PCB 4\.0 Binary, PCB ASCII\. By default its PCB Binary 5\.0\.  
With Schematic documents, you can save them as a Advanced Schematic binary, Advanced Schematic ascii, Schematic binary 4\.0, Orcad SDT Schematic, Advanced Schematic template\.  
__Server Installation files__  
The file formats supported by editors can be found in the server installation files within the __SaveFilters__ \- __End__ blocks\.  
__DelphiScript Example__

01

Var

02

    Board           : IPCB\_Document;

03

    AView           : IServerDocumentView;

04

    AServerDocument : IServerDocument;

05

Begin

06

    // save the file in a different PCB format

07

    //check if current document is a PCB document otherwise exit\!

08

    Board := PCBServer\.GetCurrentPCBBoard;

09

    If Board = Nil Then Exit;

10

    If Client = Nil Then Exit;

11

  

12

    // Grab the current document view using the Client's Interface\.

13

    AView := Client\.GetCurrentView;

14

    AServerDocument := AView\.OwnerDocument;

15

    AServerDocument\.DoFileSave\('PCB ASCII'\);

16

    Close;

17

End;

__See also__  
IServerDocument interface  
IServerDocument interface  
GetCanClose method  
GetModified method  
GetFileName method


\(IServerDocument interface\)  
__Syntax__  
Procedure Focus;  
__Description__  
The procedure forces the document to be the focussed document in Altium Designer\. A focussed document is the top level document and in view in Altium Designer workspace that responds to commands etc\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function GetBeingClosed : LongBool;  
__Description__  
The function determines whether the server document is being closed or not\. Use the GetCanClose function to check if the document can be closed or not\.  
__Example__  
__See also__  
IServerDocument interface  
GetCanClose method  
GetModified method  
GetFileName method  
DoFileSave method


\(IServerDocument interface\)  
__Syntax__  
Function GetCanClose : LongBool;  
__Description__  
This function checks whether the document can be closed or not\. This method is used for the CanClose property\.  
__Example__  
__See also__  
IServerDocument interface  
GetModified method  
GetFileName method  
DoFileSave method


\(IServerDocument interface\)  
__Syntax__  
Function GetContextHelpTopicName : Widestring;  
__Description__  
The GetContextHelpTopicName function retrieves the help topic name for the document\. Normally the returned string would be the ServerModuleName\.DocumentKind format for example 'SCH\.SCH' Some servers provide more detailed information, for example Schematic Editor server returns Sch\.Sheet\.Port when the mouse is over the Port object on a schematic sheet\.  
__Notes__  
Third party developers can use this function to provide context sensitive help\.  
To implement the help for your server, you should have a \.HELPID file in the Help folder where the link between the string returned by the GetContextHelpTopicName and the actual help document is established\.  
For example the CXTSystemDesignCapture\.HelpID contains a Sch\.Sheet\.Port = CXTSystemDesignCapture\.chm,Document\_Objects\\Port\.htm\. This means when the F1 key is pressed and the Sch\.Sheet\.Port string is returned, it will use the CXTSystemDesignCapture\.chm filename and display the Document\_Objects\\Port\.htm topic\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function GetCount : Integer;  
__Description__  
The Count property returns the number of views \(of the same type\) in the IServerDocument container\. Use in conjunction with the View property\.  
This method is used for the Count property\.  
__Example__

01

Var

02

    ServerModule       : IServerModule;

03

    ServerDocument     : IServerDocument;

04

    ServerDocumentView : IServerDocumentView;

05

Begin

06

ServerModule := Client\.ServerModuleByName\['PCB'\];

07

If ServerModule = Nil Then Exit;

08

             

09

For I := 0 to ServerModule\.DocumentCount \- 1 Do

10

Begin

11

    ServerDocument := ServerModule\.Documents\[I\];

12

    ShowMessage\('Document View Count ' \+ 

13

    IntToStr\(ServerDocument\.Count\) \+ \#13 \+

14

                'Kind ' \+ ServerDocument\.Kind\)\);

15

End;

16

End;

__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function GetFileModifiedDate: TDateTime;  
__Description__  
This function returns the date and time of the modified file\.  
__Example__  
__See also__  
IServerDocument interface  
GetFileModifiedDate method  
SetFileModifiedDate method  
TDateTime type from Borland Delphi Run Time Library\.


\(IServerDocument interface\)  
__Syntax__  
Function GetFileName : Widestring;  
__Description__  
This function retrieves the file name as a string for the server document\. Note a server document can be a document view or a panel view, and thus if it is a panel view, the GetFileName method is invalid\.  
__Example__

1

ServerDocumentView := ServerDocument\.View\[j\];

2

If Not\(ServerDocumentView\.IsPanel\) Then

3

    ShowMessage\('  Document Name ' \+ 

4

                ServerDocument\.FileName\);

__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function GetIsShown : LongBool;  
__Description__  
The IsShown property denotes whether or not this document is displayed in Altium Designer\. This property is supported by the GetIsShown and SetIsShown methods\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function GetKind : Widestring;  
__Description__  
This function returns the Kind string for this document and this function is used for the Kind property\. Examples include ‘PCB’, ‘PCBLIB’,’SCH’,’SCHLIB’ etc\.  
__Example__

01

ServerModule := Client\.ServerModuleByName\['PCB'\];

02

If ServerModule = Nil Then Exit;

03

             

04

For I := 0 to ServerModule\.DocumentCount \- 1 Do

05

Begin

06

    ServerDocument := ServerModule\.Documents\[I\];

07

    ShowMessage\('Document View Count ' \+ 

08

         IntToStr\(ServerDocument\.Count\) \+ \#13 \+

09

                'Kind ' \+ ServerDocument\.GetKind\)\);

10

End;

__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function GetModified : LongBool;  
__Description__  
The Modified property denotes whether this document has been modified or not, and can be taken as a “dirty” flag, that is a document has been modified and it has been marked dirty\.  
This property is supported by the GetModified and SetModified methods\.  
__Example__

01

Var

02

    AView           : IServerDocumentView;

03

    AServerDocument : IServerDocument;

04

Begin

05

    If Client = Nil Then Exit;

06

    // Grab the current document view using the Client's Interface\.

07

    AView := Client\.GetCurrentView;

08

  

09

    // Grab the server document which stores views by extracting the ownerdocument field\.

10

    AServerDocument := AView\.OwnerDocument;

11

  

12

    // Set the document dirty\.

13

    AServerDocument\.Modified := True;

14

End;

__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function GetServerModule : IServerModule;  
__Description__  
The ServerModule is a read\-only property which returns the IServerModule interface that the document is associated with\. The server module represents the server object installed and running in Altium Designer\.  
A server module manages its own documents and panels\. This property is supported by the GetServerModule method\.  
__Example__

01

//IServerModule interface

02

ServerModule := Client\.ServerModuleByName\['PCB'\];

03

If ServerModule = Nil Then Exit;

04

  

05

ShowMessage\(IntToStr\(ServerModule\.DocumentCount\)\);

06

For I := 0 to ServerModule\.DocumentCount \- 1 Do

07

Begin

08

    //IServerDocument interface

09

    ServerDocument := ServerModule\.Documents\[I\];

10

    // do what you want with server documents

11

End;

__See also__  
IServerDocument interface  
IServerModule interface


\(IServerDocument interface\)  
__Syntax__  
Function GetSupportsOwnSave : LongBool;  
__Description__  
The SupportsOwnSave property returns a boolean value whether a save routine has been provided to save these documents associated with the server\. This is a read only property and is supported by the GetSupportsOwnSave method\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function GetView \(Index : Integer\) : IServerDocumentView;  
__Description__  
The View property is an indexed property and represents a document or panel view\. The IServerDocument\.Count method returns the list of views \(which could be document or panel windows\) as part of the IServerDocument container\.  
This property is supported by the GetView method\.  
__Example__

1

For J := 0 to ServerDocument\.Count \- 1 Do

2

Begin

3

    ServerDocumentView := ServerDocument\.View\[j\];

4

    ShowMessage\('View Name ' \+ ServerDocumentView\.ViewName\);

5

  

6

    If Not\(ServerDocumentView\.IsPanel\) Then

7

        ShowMessage\('  Document Name ' \+

8

                    ServerDocument\.FileName\);

9

End;

__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function GetViewByName \(Const ViewName : Widestring\) : IServerDocumentView;  
__Description__  
The GetViewByName function returns the View object which represents a document or panel view\.  
__Example__

1

ServerDocumentView := ServerDocument\.GetViewByName\(PCBExpressionFilter\);

2

If ServerDocumentView\.IsPanel Then

3

    ShowMessage\('This Server Document View is a Panel'\);

__See also__  
IServerDocument interface  
IServerDocumentView interface


\(IServerDocument interface\)  
__Syntax__  
Procedure SetBeingClosed \(Const Value : LongBool\);  
__Description__  
The BeingClosed property denotes that this design document is being closed before this design document can be successfully destroyed\. This property is a read only property\. You can check the status of the document before you attempt to modify or update the document before it is being closed\.  
This property is supported by the GetBeingClosed and SetBeingClosed methods\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Procedure SetFileModifiedDate\(Const AValue : TDateTime\);  
__Description__  
The procedure sets the modified date for the document if the document has been modified by an outside agent\.  
__Example__  
__See also__  
IServerDocument interface  
GetModified method  
SetModified method


\(IServerDocument interface\)  
__Syntax__  
Function SetFileName \(Const AFileName : Widestring\): Widestring;  
__Description__  
The SetFileName function sets the filename for the document\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Procedure SetIsShown \(Const Value : LongBool\);  
__Description__  
The IsShown property denotes whether or not this document is displayed in Altium Designer\. This property is supported by the GetIsShown and SetIsShown methods\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Procedure SetModified \(Const Value : LongBool\);  
__Description__  
The Modified property denotes whether this document has been modified or not, and can be taken as a “dirty” flag, that is a document has been modified and it has been marked dirty\.  
This property is supported by the GetModified and SetModified methods\.  
__Example__

01

Var

02

    AView           : IServerDocumentView;

03

    AServerDocument : IServerDocument;

04

Begin

05

    If Client = Nil Then Exit;

06

    // Grab the current document view using the Client's Interface\.

07

    AView := Client\.GetCurrentView;

08

  

09

    // Grab the server document which stores views by extracting the ownerdocument field\.

10

    AServerDocument := AView\.OwnerDocument;

11

  

12

    // Set the document dirty\.

13

    AServerDocument\.Modified := True;

14

End;

__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Procedure NotifyViews \(ANotification : INotification\);  
__Description__  
This procedure sends a notification to all the views associated with the __IServerDocument__ container\.  
__Example__  
__See also__  
IServerDocument interface  
INotification interface


\(IServerDocument interface\)  
__Syntax__  
Function SupportsReload : LongBool;  
__Description__  
This method determines whether the document in Altium Designer can be re loaded or not \(to refresh and to make sure that the document state is the latest\)\.  
__Example__  
__See also__  
IServerDocument interface  
DoFileLoad method


\(IServerDocument interface\)  
__Syntax__  
Procedure UpdateModifiedDate;  
__Description__  
The procedure updates the modified document's date after this document has been modified\.  
__Example__  
__See also__  
IServerDocument interface  
GetModified method  
SetModified method


\(IServerDocument interface\)  
__Syntax__  
Procedure ReleaseFileOwnership;  
__Description__  
For internal use only\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Procedure ReleaseDataFileHandle;  
__Description__  
For internal use only\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function OwnsFile : Boolean;  
__Description__  
The OwnsFile function determines whether the document is owned by the Altium Designer product and thus this document can be saved or not\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function DoSafeFileSave \(Const AKind : Widestring\) : LongBool;  
__Description__  
The function determines whether the document can be saved of specified document type safely\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function DoSafeChangeFileNameAndSave\(Const ANewFileName, AKind : Widestring\) : LongBool;  
__Description__  
The function determines whether the current document can be saved with the new file name and new document type or not\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Procedure AcquireFileOwnership;  
__Description__  
For internal use only\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Procedure AcquireDataFileHandle;  
__Description__  
For internal use only\.  
__Example__  
__See also__  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Function WarnIfOwnedByOther\(AWarningLevel : TFileOwnershipWarningLevel\) : LongBool;  
__Description__  
This function determines whether the document is owned by another user\. A document can be shared amongst other users but the other users cannot save this document when this document is owned solely by one user\.  
__Example__  
__See also__  
IServerDocument interface



\(IServerDocument interface\)  
__Syntax__  
Property  BeingClosed : LongBool Read GetBeingClosed Write SetBeingClosed;  
__Description__  
The BeingClosed property denotes that this design document is being closed before this design document can be successfully destroyed\. This property is a read only property\. You can check the status of the document before you attempt to modify or update the document before it is being closed\.  
This property is supported by the GetBeingClosed and SetBeingClosed methods\.  
__Example__  
   
__See also__  
IClient interface  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Property  CanClose : LongBool Read GetCanClose;  
__Description__  
This CanClose property determines whether the document can be closed or not\.  
__Example__  
   
__See also__  
IClient interface  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Property Count : Integer Read GetCount;  
__Description__  
The Count property returns the number of views \(of the same type\) in the IServerDocument container\. Use in conjunction with the View property\.  
This property is supported by the GetCount method\.  
__Example__

01

Var

02

    ServerModule       : IServerModule;

03

    ServerDocument     : IServerDocument;

04

    ServerDocumentView : IServerDocumentView;

05

Begin

06

ServerModule := Client\.ServerModuleByName\['PCB'\];

07

If ServerModule = Nil Then Exit;

08

             

09

For I := 0 to ServerModule\.DocumentCount \- 1 Do

10

Begin

11

    ServerDocument := ServerModule\.Documents\[I\];

12

    ShowMessage\('Document View Count ' \+ 

13

    IntToStr\(ServerDocument\.Count\) \+ \#13 \+

14

                'Kind ' \+ ServerDocument\.Kind\)\);

15

End;

16

End;

__See also__  
IClient interface  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Property  FileName : Widestring Read GetFileName;  
__Description__  
The FileName property returns the filename for the server document \(not the corresponding server panel\)\. This property is a read\-only property and is supported by the GetFileName method\.  
Note a server document can be a document view or a panel view, and thus if it is a panel view, the FileName property is invalid\.  
__Example__

1

ServerDocumentView := ServerDocument\.View\[j\];

2

If Not\(ServerDocumentView\.IsPanel\) Then

3

    ShowMessage\('  Document Name ' \+ 

4

                ServerDocument\.FileName\);

__See also__  
IClient interface  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Property  IsShown : LongBool Read GetIsShown     Write SetIsShown;  
__Description__  
This property denotes whether or not this document is displayed in Altium Designer\. This property is supported by the GetIsShown and SetIsShown methods\.  
__Example__  
   
__See also__  
IClient interface  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Property Kind : Widestring Read GetKind;  
__Description__  
The Kind reports the type of the document opened in Altium Designer\.  
Examples include ‘PCB’, ‘PCBLIB’,’SCH’,’SCHLIB’ etc\. This property is a read\-only property\. This property is supported by the GetKind method\.  
__Example__

01

ServerModule := Client\.ServerModuleByName\['PCB'\];

02

If ServerModule = Nil Then Exit;

03

             

04

For I := 0 to ServerModule\.DocumentCount \- 1 Do

05

Begin

06

    ServerDocument := ServerModule\.Documents\[I\];

07

    ShowMessage\('Document View Count ' \+ 

08

         IntToStr\(ServerDocument\.Count\) \+ \#13 \+

09

                'Kind ' \+ ServerDocument\.Kind\)\);

10

End;

__See also__  
IClient interface  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Property Modified : LongBool Read GetModified Write SetModified;  
__Description__  
The Modified property denotes whether this document has been modified or not, and can be taken as a “dirty” flag, that is a document has been modified and it has been marked dirty\.  
This property is supported by the GetModified and SetModified methods\.  
__Example__

01

Var

02

    AView           : IServerDocumentView;

03

    AServerDocument : IServerDocument;

04

Begin

05

    If Client = Nil Then Exit;

06

    // Grab the current document view using the Client's Interface\.

07

    AView := Client\.GetCurrentView;

08

  

09

    // Grab the server document which stores views by extracting the ownerdocument field\.

10

    AServerDocument := AView\.OwnerDocument;

11

  

12

    // Set the document dirty\.

13

    AServerDocument\.Modified := True;

14

End;

__See also__  
IClient interface  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Property  ServerModule : IServerModule Read GetServerModule;  
__Description__  
The ServerModule is a read\-only property which returns the IServerModule interface that the document is associated with\. The server module represents the server object installed and running in Altium Designer\.  
A server module manages its own documents and panels\. This property is supported by the GetServerModule method\.  
__Example__

01

//IServerModule interface

02

ServerModule := Client\.ServerModuleByName\['PCB'\];

03

If ServerModule = Nil Then Exit;

04

  

05

ShowMessage\(IntToStr\(ServerModule\.DocumentCount\)\);

06

For I := 0 to ServerModule\.DocumentCount \- 1 Do

07

Begin

08

    //IServerDocument interface

09

    ServerDocument := ServerModule\.Documents\[I\];

10

    // do what you want with server documents

11

End;

__See also__  
IClient interface  
IServerDocument interface  
IServerModule interface


\(IServerDocument interface\)  
__Syntax__  
Property  SupportsOwnSave : LongBool Read GetSupportsOwnSave;  
__Description__  
The SupportsOwnSave property returns a boolean value whether a save routine has been provided to save these documents associated with the server\. Read only property\.  
__Example__  
   
__See also__  
IClient interface  
IServerDocument interface


\(IServerDocument interface\)  
__Syntax__  
Property View\[Index : Integer\] : IServerDocumentView Read GetView;  
__Description__  
The View property is an indexed property and represents a document or panel view part of the IDocument container associated with a specific IServerModule interface\. The IServerDocument\.Count method returns the list of views \(which could be document or panel windows\) as part of the IServerDocument container\.  
This property is supported by the GetView method\.  
__Example__

1

For J := 0 to ServerDocument\.Count \- 1 Do

2

Begin

3

    ServerDocumentView := ServerDocument\.View\[j\];

4

    ShowMessage\('View Name ' \+ ServerDocumentView\.ViewName\);

5

  

6

    If Not\(ServerDocumentView\.IsPanel\) Then

7

        ShowMessage\('  Document Name ' \+

8

                    ServerDocument\.FileName\);

9

End;

__See also__  
IClient interface  
IServerDocument interface


__Overview__  
This IHighlightedDocument interface represents a mechanism that deals with highlighting of objects on a design document \(especially Schematic and PCB documents\) in Altium Designer when objects are being selected or deselected and when being masked or not\.

This interface and its methods are for internal use\.

__Notes__  
The __IHighlightedDocument__ interface is inherited from the __IServerDocument__ interface\.

__IHighlightedDocument Methods and Properties Table__

__IHighlightedDocument methods__  
HL\_Begin  
HL\_End  
HL\_Perform  
HL\_HighlightMethod\_Add  
HL\_HighlightMethod\_Remove  
HL\_HighlightMethod\_Clear  
HL\_HighlightMethod\_IsApplicable  
HL\_Register\_DMObject  
HL\_Register\_NetItem  
HL\_Register\_Net  
HL\_Register\_Bus  
HL\_Register\_Part  
HL\_Register\_Component  
HL\_Register\_VHDLEntity  
HL\_UnRegister\_Object  
HL\_UnRegister\_AllObjects  
HL\_ObjectCount  
HL\_Objects  
HL\_SetHighlightedNet  
HL\_GetHighlightedNet  
HL\_GetLinkedObject  
HL\_ChooseObjectGraphically  
HL\_XProbeChooseObject  
HL\_HighlightedNet

__IHighlightedDocument properties__  
Property  HL\_HighlightedNet : INet

__See also__  
IServerDocument interface


__Overview__  
The IServerPanelInfo interface encapsulates the details of a panel in Altium Designer and the details can be Name, Bitmap, whether the panel can be docked horizontally or vertically and so on\.  
This interface is used by the IServerRecord interface and the IClient interface\.

__IServerPanelInfo Methods and Properties Table__

__IServerPanelInfo methods__  
GetName  
GetCategory  
GetBitmap  
GetHotkey  
GetButtonVisible  
GetMultipleCreation  
GetCreationClassName  
GetCanDockVertical  
GetCanDockHorizontal  
SupportsDocumentKind  
SupportsProjectKind  
GetDocumentKindCount  
GetDocumentKinds  
GetProjectKindCount  
GetProjectKinds

__IServerPanelInfo properties__  
DocumentKindCount  
DocumentKinds\[Index  
ProjectKindCount  
ProjectKinds

__See also__  
IServerRecord interface  
IClient Interface



\(IServerPanelInfo interface\)  
__Syntax__  
Function GetBitmap : Widestring;  
__Description__  
The function returns the name of the bitmap\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetButtonVisible : Boolean;  
__Description__  
The function returns whether the button on the panel is visible or not\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetCanDockHorizontal: Boolean;  
__Description__  
This function determines whether the panel can be docked horizontally to the Altium Designer User Interface\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetCanDockVertical : Boolean;  
__Description__  
This function determines whether the panel can be docked vertically to the Altium Designer User Interface\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetCategory : Widestring;  
__Description__  
This function returns the Category string, ie which module it is part of within Altium Designer\. For example the Favorites panel is part of the System\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetCreationClassName: Widestring;  
__Description__  
Internal use\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetDocumentKindCount : Integer;  
__Description__  
This function reports how many document kinds this panel can be associated with\. For example with Simulation Breakpoints panel, it can be associated with VHDL and VHDTST documents\.  
Use this function with the GetDocumentKinds function\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetDocumentKinds\(Index : Integer\) : WideString;  
__Description__  
This function returns the indexed Document Kind string that this panel is associated with\. For example with Simulation Breakpoints panel, it can be associated with VHDL and VHDTST documents\. This function is to be used in conjunction with the GetDocumentKindCount function\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetHotkey : Widestring;  
__Description__  
The function returns the HotKey string that is used to render the panel visible or not\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetMultipleCreation : Boolean;  
__Description__  
Internal use\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetName : Widestring;  
__Description__  
This function returns the name of the panel\. For example the PCB Library panel has a PCBLibPanel name\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetProjectKindCount : Integer;  
__Description__  
Internal use\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function GetProjectKinds\(Index : Integer\) : WideString;  
__Description__  
Internal use\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function SupportsDocumentKind\(Const AKind : Widestring\) : Boolean;  
__Description__  
This function determines whether the document kind is supported by the panel\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Function SupportsProjectKind \(Const AKind : Widestring\) : Boolean;  
__Description__  
Internal use\.  
__Example__  
__See also__  
IServerPanelInfo interface



\(IServerPanelInfo interface\)  
__Syntax__  
Property DocumentKindCount : Integer read GetDocumentKindCount;  
__Description__  
This property reports how many document kinds this panel can be associated with\. For example with Simulation Breakpoints panel, it can be associated with VHDL and VHDTST documents\.  
Use this property with the DocumentKinds property\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Property DocumentKinds\[Index : Integer\] : WideString read GetDocumentKinds;  
__Description__  
This property returns the indexed Document Kind string that this panel is associated with\. For example with Simulation Breakpoints panel, it can be associated with VHDL and VHDTST documents\. This property is to be used in conjunction with the GetDocumentKindCount function\.  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Property ProjectKindCount : Integer read GetProjectKindCount;  
__Description__  
Internal use  
__Example__  
__See also__  
IServerPanelInfo interface


\(IServerPanelInfo interface\)  
__Syntax__  
Property ProjectKinds\[Index : Integer\] : WideString read GetProjectKinds;  
__Description__  
Internal use  
__Example__  
__See also__  
IServerPanelInfo interface

## 子章节

- [System API: Client\-Server Interfaces](01-System_API_Client_-Server_Interfaces.md/README.md)
- [<a id="IClient_Interface"></a>IClient Interface](02-a_id_IClient_Interface_a_IClient_Interface.md/README.md)
- [<a id="IServerModule_Interface"></a>IServerModule Interface](03-a_id_IServerModule_Interface_a_IServerModule_Interface.md/README.md)
- [<a id="Document_and_Panel_View_Interfaces"></a>Document and Panel View Interfaces](04-a_id_Document_and_Panel_View_Interfaces_a_Document_and_Panel_View_Interfaces.md/README.md)
