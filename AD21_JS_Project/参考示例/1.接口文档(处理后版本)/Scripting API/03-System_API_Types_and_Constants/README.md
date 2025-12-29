# System API Types and Constants

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [System API Types and Constants for version 22](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- System API](https://www.altium.com/documentation/altium-designer/technical-reference-system-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


Contents of this reference:

[__Client Enumerated Types__](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#Client Enumerated Types)

[__Client Constants__](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#Client Constants)

[TCommandProc procedure type](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#TCommandProc procedure type)  
[TDocumentsBarGrouping type](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#TDocumentsBarGrouping type)  
[TGetStateProc procedure type](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#TGetStateProc procedure type)  
[THighlightMethod type](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#THighlightMethod type)  
[THighlightMethodSet type](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#THighlightMethodSet type)  
[TSnippetCreationMode type](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#TSnippetCreationMode type)  
[TServerModuleFactory function type](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#TServerModuleFactory function type)

[General constants](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#General constants)  
[DocumentNotification codes](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#DocumentNotification codes)  
[View Notification codes](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#View Notification codes)  
[Module Notification codes](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#Module Notification codes)  
[System Notification codes](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#System Notification codes)  
[Message notification codes](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#Message notification codes)  
[Client Functions](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants?version=21#Client Functions)

 


The enumerated types are used for many of the client/server interfaces and methods which are covered in this section\.


__Syntax__  
TCommandProc  = Procedure\(Const AContext : IServerDocumentView; AParameters : PChar\);


TDocumentsBarGrouping = \(dbgNone, dbgByDocKind, dbgByProject\);


__Syntax__  
TGetStateProc = Procedure\(Const AContext : IServerDocumentView; AParameters : PChar; Var Enabled, Checked, Visible : LongBool; Caption, ImageFile : PChar\); 


__Syntax__  
THighlightMethod = \(eHighlight\_Filter,eHighlight\_Zoom,eHighlight\_Select,eHighlight\_Graph,eHighlight\_Dim,eHighlight\_Thicken, eHighlight\_ZoomCursor\);


__Syntax__  
THighlightMethodSet = Set Of THighlightMethod;


TSnippetCreationMode = \(eSnippetCreationBySelection, eSnippetCreationByUnionIndex\);


__Syntax__  
TServerModuleFactory = Function \(Const AClient : IClient\) : IServerModule;

 



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

- [System API: Types and Constants](01-System_API_Types_and_Constants.md/README.md)
- [<a id="Client_Enumerated_Types"></a>Client Enumerated Types](02-a_id_Client_Enumerated_Types_a_Client_Enumerated_Types.md/README.md)
- [<a id="Client_Constants"></a>Client Constants](03-a_id_Client_Constants_a_Client_Constants.md/README.md)
