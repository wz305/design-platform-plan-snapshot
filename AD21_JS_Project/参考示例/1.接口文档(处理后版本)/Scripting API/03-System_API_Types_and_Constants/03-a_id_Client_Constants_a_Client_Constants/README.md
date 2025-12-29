# <a id="Client_Constants"></a>Client Constants

cDXPHomePage = 'DXP://Home';  
    cDXPProcess  = 'DXPProcess';  
    cDXPDocument = 'DXPDoc';  
    cViewNameParam = 'ViewName';  
    cContextHelpDelimiter = '\.';  
   
\{$IFDEF ALTIUMINTERNAL\}  
   cWebUpdate\_DefaultURL            = 'http://intranet\.altium\.com\.au/rd/AltiumDesigner6/Updates/';  
\{$ELSE\}  
   cWebUpdate\_DefaultURL            = 'https://www\.altium\.com/webupdate/';  
\{$ENDIF\}  
   cWebUpdate\_DefaultNetworkPath    = '';  
   cWebUpdate\_DefaultUseNetworkPath = False;  
   cWebUpdate\_DefaultCheckFrequency = wucfEveryDay;  
   
    cWebUpdate\_CheckFrequencyNames : Array\[TWebUpdate\_CheckFrequency\] Of AnsiString =  
    \(  
        'Never',  
        'On Altium Designer startup',  
        'Every day',  
        'Every 3 days',  
        'Every week',  
        'Every 2 weeks',  
        'Every month'\);


cDocumentLoading            = 0;  
cDocumentOpening            = 1;  
cDocumentClosing            = 2;  
cDocumentActivating         = 3;  
cDocumentNameChanging       = 4;  
cDocumentCompiled           = 6;  
cDocumentCompiling          = 7;  
cDocumentBeforeClose        = 8;  
cDocumentProjectChanged     = 9;  
cDocumentSaved              = 10;  
cDocumentModifiedChanged    = 11;  
cDocumentHidden             = 12;  
cDocumentProjectActivating  = 15;  
cDocumentScrapCompiling     = 16;  
cDocumentScrapCompiled      = 17;  
cProjectClosing             = 18;  
   
cDocumentWorkspaceLoad\_Begin = 101;  
cDocumentWorkspaceLoad\_End   = 102;  
cDocumentWorkspaceSave\_Begin = 103;  
cDocumentWorkspaceSave\_End   = 104;  
   
cDocumentRouterStarted       = 200;  
cDocumentRouterStopped       = 201;  
   
cDocumentOwnershipChanged    = 300;


cDocumentDataInserted            = 0;  
cDocumentDataDeleted             = 1;  
cDocumentDataModified            = 2;  
cDocumentDataRefresh             = 3;  
cApplicationStartupComplete      = 6;  
cApplicationShutdownStarted      = 7;  
cLicenseDetailsChanged           = 8;  
cObjectNavigated                 = 150;  
cGroupNavigated                  = 155;  
cNavigationHistory               = 160;  
cRefreshNavigationPanels         = 170;  
cObjectCrossprobed               = 180;  
cGroupCrossprobed                = 185;  
cBeginRefreshNavigationPanels    = 190;


cModuleLoaded    = 0;


cLibrariesUpdated                = 0;  
cSystemPreferencesChanged        = 1;  
cTextEditPreferencesChanged      = 2;  
cPCBPreferencesChanged           = 3;  
cSchPreferencesChanged           = 4;  
cSchPreferencesChangedWithUpdate = 5;  
cCamtasticPreferencesChanged     = 6;  
cPCB3DPreferencesChanged         = 7;  
cVersionControlPreferencesChanged= 8;  
cSchPreferencesChanged\_UpdateStringsFont = 10;  
cCustomDynamicHelpUpdated                = 11;


cMessagesAdd              = 0;  
cMessagesReplaceLast      = 1;  
cMessagesFullUpdate       = 2;  
cMessagesClearAll         = 3;


Function Client : IClient;  
Function Server : IServerModule;  
   
Procedure SetClient \(Const AClient : IClient\);  
Procedure SetServer \(Const AServer : IServerModule\);  
   
Function CreateNewDocumentFromDocumentKind    \(Const DocumentKind : AnsiString\) : IServerDocument;  
   
Function CreateNewFreeDocumentFromDocumentKind\(Const DocumentKind : AnsiString\) : IServerDocument;  
   
Function GetSceneManager : ISceneManager;

## 子章节

- [<a id="General_constants"></a>General constants](01-a_id_General_constants_a_General_constants.md.md)
- [<a id="DocumentNotification_codes"></a>DocumentNotification codes](02-a_id_DocumentNotification_codes_a_DocumentNotification_codes.md.md)
- [<a id="View_Notification_codes"></a>View Notification codes](03-a_id_View_Notification_codes_a_View_Notification_codes.md.md)
- [<a id="Module_Notification_codes"></a>Module Notification codes](04-a_id_Module_Notification_codes_a_Module_Notification_codes.md.md)
- [<a id="System_Notification_codes"></a>System Notification codes](05-a_id_System_Notification_codes_a_System_Notification_codes.md.md)
- [<a id="Message_notification_codes"></a>Message notification codes](06-a_id_Message_notification_codes_a_Message_notification_codes.md.md)
- [<a id="Client_Functions"></a>Client Functions](07-a_id_Client_Functions_a_Client_Functions.md.md)
