# <a id="IClient_Interface"></a>IClient Interface

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

## 子章节

- [<a id="The_IClient_shell_and_its_Interfaces;"></a>The IClient shell and its Interfaces;](01-a_id_The_IClient_shell_and_its_Interfaces_a_The_IClient_shell_and_its_Interfaces.md.md)
- [<a id="IClient_Methods"></a>IClient Methods](02-a_id_IClient_Methods_a_IClient_Methods.md.md)
- [<a id="IClient_Properties"></a>IClient Properties](03-a_id_IClient_Properties_a_IClient_Properties.md.md)
