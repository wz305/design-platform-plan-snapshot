### <a id="The_IClient_shell_and_its_Interfaces;"></a>The IClient shell and its Interfaces;

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