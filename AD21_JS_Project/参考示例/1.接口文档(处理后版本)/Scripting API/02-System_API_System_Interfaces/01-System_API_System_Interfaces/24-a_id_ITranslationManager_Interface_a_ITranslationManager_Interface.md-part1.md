#### ITranslationManager Methods

##### GetTranslatedProperty method

\(ITranslationManager interface\)  
__Syntax__  
Function  GetTranslatedProperty\(Const ComponentName, PropName : WideString; Out OutValue : WideString\) : LongBool;  
__Description__  
__Example__  
   
__See also__

##### SetComponentToTranslate method

\(ITranslationManager interface\)  
__Syntax__  
Procedure SetComponentToTranslate\(Const ComponentName : WideString\);  
__Description__  
__Example__  
   
__See also__

##### HasTranslationData method

\(ITranslationManager interface\)  
__Syntax__  
Function  HasTranslationData : LongBool;  
__Description__  
__Example__  
   
__See also__

# System API Types and Constants

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [System API Types and Constants for version 22](https://www.altium.com/documentation/altium-designer/system-api-types-and-constants)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- System API](https://www.altium.com/documentation/altium-designer/technical-reference-system-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## System API: Types and Constants 

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

 

## <a id="Client_Enumerated_Types"></a>Client Enumerated Types 

The enumerated types are used for many of the client/server interfaces and methods which are covered in this section\.

### <a id="TCommandProc_procedure_type"></a>TCommandProc procedure type

__Syntax__  
TCommandProc  = Procedure\(Const AContext : IServerDocumentView; AParameters : PChar\);

### <a id="TDocumentsBarGrouping_type"></a>TDocumentsBarGrouping type

TDocumentsBarGrouping = \(dbgNone, dbgByDocKind, dbgByProject\);

### <a id="TGetStateProc_procedure_type"></a>TGetStateProc procedure type

__Syntax__  
TGetStateProc = Procedure\(Const AContext : IServerDocumentView; AParameters : PChar; Var Enabled, Checked, Visible : LongBool; Caption, ImageFile : PChar\); 

### <a id="THighlightMethod_type"></a>THighlightMethod type

__Syntax__  
THighlightMethod = \(eHighlight\_Filter,eHighlight\_Zoom,eHighlight\_Select,eHighlight\_Graph,eHighlight\_Dim,eHighlight\_Thicken, eHighlight\_ZoomCursor\);

### <a id="THighlightMethodSet_type"></a>THighlightMethodSet type

__Syntax__  
THighlightMethodSet = Set Of THighlightMethod;

### <a id="TSnippetCreationMode_type"></a>TSnippetCreationMode type

TSnippetCreationMode = \(eSnippetCreationBySelection, eSnippetCreationByUnionIndex\);

### <a id="TServerModuleFactory_function_type"></a>TServerModuleFactory function type

__Syntax__  
TServerModuleFactory = Function \(Const AClient : IClient\) : IServerModule;

 

## <a id="Client_Constants"></a>Client Constants 

### <a id="General_constants"></a>General constants

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

### <a id="DocumentNotification_codes"></a>DocumentNotification codes

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

### <a id="View_Notification_codes"></a>View Notification codes

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

### <a id="Module_Notification_codes"></a>Module Notification codes

cModuleLoaded    = 0;

### <a id="System_Notification_codes"></a>System Notification codes

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

### <a id="Message_notification_codes"></a>Message notification codes

cMessagesAdd              = 0;  
cMessagesReplaceLast      = 1;  
cMessagesFullUpdate       = 2;  
cMessagesClearAll         = 3;

### <a id="Client_Functions"></a>Client Functions

Function Client : IClient;  
Function Server : IServerModule;  
   
Procedure SetClient \(Const AClient : IClient\);  
Procedure SetServer \(Const AServer : IServerModule\);  
   
Function CreateNewDocumentFromDocumentKind    \(Const DocumentKind : AnsiString\) : IServerDocument;  
   
Function CreateNewFreeDocumentFromDocumentKind\(Const DocumentKind : AnsiString\) : IServerDocument;  
   
Function GetSceneManager : ISceneManager;

# System API Low\-level Routines

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [System API Low\-level Routines for version 22](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- System API](https://www.altium.com/documentation/altium-designer/technical-reference-system-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## System API: Low Level Routines Reference 

Contents of this reference:

[Scale Factor Table](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Scale Factor Table)  
[Constants](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Constants)  
[Conversion Routines](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Conversion Routines)  
[Enumerated Types](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Enumerated Types)  
[Dialogs](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Dialogs)  
[File IO](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#File IO)

[Number Manipulation Routines](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Number Manipulation Routines)  
[Other Routines](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Other Routines)  
[Special Folder Path Strings](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Special Folder Path Strings)  
[String Routines](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#String Routines)  
[Time and Date Routines](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Time and Date Routines)  
[Functions from ClientProcs unit](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Functions from ClientProcs unit)

### <a id="Scale_Factor_Table"></a>Scale Factor Table

T 1012  
G 109  
M, Meg = 106  
K 103  
U 10\-6  
N 10\-9  
P 10\-12  
F 10\-15

### <a id="Constants"></a>Constants

cMeasureUnitSuffixes : Array\[TMeasureUnit\] Of TDynamicString = \('mil', 'mm', 'in', 'cm', 'dxp', 'm'\);  
cMeasureUnitConvert  : Array\[TMeasureUnit, TMeasureUnit\] Of Double =  
\(// to  mil           mm         in        cm          dxp         m  
        \(1          , 2\.54/100 , 1/1000  , 2\.54/1000 , 1/10      , 2\.54/100000\), // from mils  
        \(100/2\.54   , 1        , 1/25\.4  , 1/10      , 10/2\.54   , 1/1000     \), // from mm  
        \(1000       , 25\.4     , 1       , 2\.54      , 100       , 0\.0254     \), // from in  
        \(1000/2\.54  , 10       , 1/2\.54  , 1         , 100/2\.54  , 1/100      \), // from cm  
        \(10         , 2\.54/10  , 1/100   , 2\.54/100  , 1         , 2\.54/10000 \), // from dxp  
        \(100000/2\.54, 1000     , 100/2\.54, 100       , 10000/2\.54, 1          \)  // from m  
\);

cPaintColorModes : Array\[TPaintColorMode\] Of TDynamicString = \('FullColor', 'GrayScale', 'Monochrome'\);  
   
  CaseSensitive   = True;  
  CaseInSensitive = False;  
  OrdNumOfZero    = 48;  
  cDefThumbnailSizeX = 96;  
  cDefThumbnailSizeY = 72;  
   
   Delimiter       : Set of char = \[\#0,\#39,',',' ',\#10,\#13,\#9,'\(','\)'\];  
   StringDelimiter = \#39;  
   
  cm\_Share\_Compat     = $0;  
  cm\_Share\_DenyRW     = $10;  
  cm\_Share\_DenyW      = $20;  
  cm\_Share\_DenyR      = $30;  
  cm\_Share\_DenyN      = $40;  
  cm\_Access\_ReadOnly  = $0;  
  cm\_Access\_WriteOnly = $1;  
  cm\_Access\_ReadWrite = $2;  
  cm\_NoInheritance    = $80; \{A child process would not inherit file handle and mode\}  
   
  fe\_NoAccessError                 = $0;  
  fe\_FunctionInvalid               = $1;  
  fe\_FileNotFound                  = $2;  
  fe\_PathNotFoundOrFileDoesntExist = $3;  
  fe\_NoHandleIsAvalible            = $4;  
  fe\_AccessIsDenied                = $5;  
  fe\_FileAccessCodeInvalid         = $C;  
   
   FileExtension\_Temp         = '$$$';  
   
   cPathSeparator         = '\\';  
   
    cBooleanStrings : Array\[False\.\.True\] Of TString = \('False','True'\);

### <a id="Conversion_Routines"></a>Conversion Routines

Function GetPrevSettings\_Count : Integer;  
Function GetPrevSettings\_Name                                \(AIndex : Integer\) : TDynamicString;  
Function GetPrevSettings\_SpecialKey\_SoftwareAltiumApp        \(AIndex : Integer\) : TDynamicString;  
Function GetPrevSettings\_SpecialKey\_SoftwareAltiumAppDXP     \(AIndex : Integer\) : TDynamicString;  
Function GetPrevSettings\_SpecialFolder\_AltiumApplicationData \(AIndex : Integer\) : TDynamicString;  
   
Function ConvertMeasureUnits\(Const AValue : Double; FromUnit, ToUnit : TMeasureUnit\) : Double;  
   
Function StripMeasureUnits\(Var S : TDynamicString; Var Value : Double; Var UsedUnits : TMeasureUnit\) : Boolean;

### <a id="Enumerated_Types"></a>Enumerated Types