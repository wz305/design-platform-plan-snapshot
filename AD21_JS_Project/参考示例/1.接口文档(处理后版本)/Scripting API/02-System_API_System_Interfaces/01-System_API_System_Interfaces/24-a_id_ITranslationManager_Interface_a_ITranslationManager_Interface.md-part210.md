#### WaitMilliSecondDelay

__Declaration__  
Procedure WaitMilliSecondDelay\(N : Integer\);  
__Description __  
The WaitMilliSecondDelay function provides a delay in the code in milli\-seconds as specified by the N integer value\. This is useful if a function in the software needs delaying for a while before doing something else giving the software a chance to catch up\. This function uses the GetMilliSecondTime function\.  
__Example__  
WaitMilliSecondDelay\(1000\); // waits for 1 second\. 1000 milliseconds = 1 second\.  
__See also__  
Time and Date Routines

### <a id="Functions_from_ClientProcs_unit"></a>Functions from ClientProcs unit

Function  ClientAPI\_GetPrefAnimatedPanels                                    : Boolean;  
Function  ClientAPI\_GetPrefSaveToolsLayout                                   : Boolean;  
Function  ClientAPI\_GetPrefAutoTransparency                                  : Boolean;  
Function  ClientAPI\_GetPrefDynamicAutoTransparency                           : Boolean;  
Function  ClientAPI\_GetPrefSuppressStartupScreen                             : Boolean;  
Function  ClientAPI\_GetPrefTransparencyHighest                               : Integer;  
Function  ClientAPI\_GetPrefTransparencyLowest                                : Integer;  
Function  ClientAPI\_GetPrefTransparencyForce                                 : Integer;  
Function  ClientAPI\_GetPrefPopupPanelDelay                                   : Integer;  
Function  ClientAPI\_GetPrefHidePanelDelay                                    : Integer;  
Function  ClientAPI\_GetPrefAnimatedPanelSpeed                                : Integer;  
Function  ClientAPI\_GetPrefPathInTitleBar                                    : Boolean;  
Function  ClientAPI\_GetPrefUseShadow                                         : Boolean;  
Function  ClientAPI\_GetPrefUseLuna                                           : Boolean;  
Function  ClientAPI\_GetPrefHideFloatingPanels                                : Boolean;  
Function  ClientAPI\_GetPrefRestoreOpenDocuments                              : Boolean;  
Function  ClientAPI\_GetPrefOpenTasksIfNothingOpen                            : Boolean;  
Function  ClientAPI\_GetPrefHideBinderViewTabs                                : Boolean;  
Function  ClientAPI\_GetPrefNoRestoreKindCount                                : Integer;  
Procedure ClientAPI\_GetPrefNoRestoreKind                       \(Index        : Integer; Buffer : PChar\);  
   
Procedure ClientAPI\_SetPrefAnimatedPanels                      \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefSaveToolsLayout                     \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefAutoTransparency                    \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefDynamicAutoTransparency             \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefSuppressStartupScreen               \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefTransparencyHighest                 \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefTransparencyLowest                  \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefTransparencyForce                   \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefPopupPanelDelay                     \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefHidePanelDelay                      \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefAnimatedPanelSpeed                  \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefPathInTitleBar                      \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefUseShadow                           \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefUseLuna                             \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefHideFloatingPanels                  \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefRestoreOpenDocuments                \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefOpenTasksIfNothingOpen              \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefHideBinderViewTabs                  \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefNoRestoreKindClear;  
Procedure ClientAPI\_SetPrefNoRestoreKindAdd                    \(Value        : PChar\);  
Function  ClientAPI\_GetPrefRememberFormForDocKind                            : Boolean;  
Procedure ClientAPI\_SetPrefRememberFormForDocKind              \(Value        : Boolean\);  
Procedure ClientAPI\_SetAutoShowComponentSymbols                \(Value        : Boolean\);  
Function  ClientAPI\_GetAutoShowComponentSymbols                              : Boolean;  
   
   
Procedure ClientAPI\_ShowProductStartup \(Bitmap       : TDynamicString\);  
Procedure ClientAPI\_HideProductStartup;  
Procedure ClientAPI\_AddStartupMessage  \(S            : TDynamicString\);  
Procedure ClientAPI\_AddShutdownMessage \(S            : TDynamicString\);  
   
Procedure ClientAPI\_Synchronize \(Const ASync : IThreadSynchronize\);  
Procedure ClientAPI\_CheckSynchronize;  
   
Function ClientAPI\_GetCurrentOutputGenerator : IUnknown;  
Procedure ClientAPI\_SetCurrentOutputGenerator\(Const Generator : IUnknown\);  
   
Function  ClientAPI\_GetBuiltInNavigationBar          : Boolean;  
Procedure ClientAPI\_SetBuiltInNavigationBar   \(Value : Boolean\);  
Function  ClientAPI\_GetAlwaysShowNavBarInTasks       : Boolean;  
Procedure ClientAPI\_SetAlwaysShowNavBarInTasks\(Value : Boolean\);  
\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}  
\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}  
Function  ClientAPI\_GetFavoritesThumbnailSize       : TSize;  
Procedure ClientAPI\_SetFavoritesThumbnailSize\(Value : TSize\);  
\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}  
\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}  
Function  ClientAPI\_GetGroupingInDocumentsBar           : TDocumentsBarGrouping;  
Procedure ClientAPI\_SetGroupingInDocumentsBar    \(Value : TDocumentsBarGrouping\);  
Function  ClientAPI\_GetEqualButtonsInDocumentsBar       : Boolean;  
Procedure ClientAPI\_SetEqualButtonsInDocumentsBar\(Value : Boolean\);  
Function  ClientAPI\_GetAutoHideDocumentsBar             : Boolean;  
Procedure ClientAPI\_SetAutoHideDocumentsBar      \(Value : Boolean\);  
Function  ClientAPI\_GetMultilineDocumentsBar            : Boolean;  
Procedure ClientAPI\_SetMultilineDocumentsBar     \(Value : Boolean\);  
Function  ClientAPI\_GetMiddleClickClosesDocumentTab       : Boolean;  
Procedure ClientAPI\_SetMiddleClickClosesDocumentTab\(Value : Boolean\);  
Function  ClientAPI\_GetIntegratedHelpSystem             : Boolean;  
Procedure ClientAPI\_SetIntegratedHelpSystem      \(Value : Boolean\);  
Function  ClientAPI\_GetUseSystemLocaleLanguage          : Boolean;  
Procedure ClientAPI\_SetUseSystemLocaleLanguage   \(Value : Boolean\);  
Function  ClientAPI\_GetUseLocalizedDialogs              : Boolean;  
Procedure ClientAPI\_SetUseLocalizedDialogs       \(Value : Boolean\);  
Function  ClientAPI\_GetUseLocalizedResources            : Boolean;  
Procedure ClientAPI\_SetUseLocalizedResources     \(Value : Boolean\);  
Function  ClientAPI\_GetVSStyleCtrlTab                   : Boolean;  
Procedure ClientAPI\_SetVSStyleCtrlTab            \(Value : Boolean\);  
Function  ClientAPI\_GetActivateLastActiveOnClose        : Boolean;  
Procedure ClientAPI\_SetActivateLastActiveOnClose \(Value : Boolean\);  
\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}  
   
Function ClientAPI\_GetHelpFileAndTopic\(Const AHelpTopicID : WideString; Out HelpFileName, HelpTopicName : WideString\) : Boolean;  
   
Function  ClientAPI\_UpdateFont\(Var Font : TLogFont\) : LongBool;  
Procedure ClientAPI\_SetErrorInfo\(Const ErrorMsg, ErrorReport : WideString; ErrorAddr : Pointer\);  
Procedure ClientAPI\_ClearErrorInfo;  
Procedure ClientAPI\_HandleException\(Const Message : WideString\);  
   
Procedure ClientAPI\_QueryUpdatesInfo        \(Var   UpdatesURL, UpdatesNetworkPath : WideString; Var UpdatesUseNetworkPath : LongBool; Var   UpdatesPathToDownloadUpdates : WideString;  
Var CheckFrequency : TWebUpdate\_CheckFrequency\); Stdcall;  
   
Procedure ClientAPI\_SetUpdatesInfo          \(Const UpdatesURL, UpdatesNetworkPath : WideString;     UpdatesUseNetworkPath : LongBool; Const UpdatesPathToDownloadUpdates : WideString;  
        CheckFrequency : TWebUpdate\_CheckFrequency\); Stdcall;

# System API Server Processes

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [System API Server Processes for version 22](https://www.altium.com/documentation/altium-designer/system-api-server-processes)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- System API](https://www.altium.com/documentation/altium-designer/technical-reference-system-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## System API: Server Processes and Routines 

The System API Server Processes Reference includes the following sections and content:

[__Server Process Routines__](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#Server Process Routines)

[__Manipulating Server Processes__](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#Manipulating Server Processes)

[__Server Routines from ClientApiReg Unit__](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#Server Routines from ClientApiReg Unit)

[__Helper Functions and Objects for the Scripting System__](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#Helper Functions and Objects for the Scripting System)

[Servers  
Server Processes](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#Server Processes)  
[Parametric Processes](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#Parametric Processes)

[TParameterList Class  
Process Parameter Functions](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#Process Parameter Functions)

[AddWordParameter  
AddColorParameter](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#AddColorParameter)  
[AddIntegerParameter](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#AddIntegerParameter)  
[AddLongIntParameter](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#AddLongIntParameter)  
[AddSingleParameter](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#AddSingleParameter)  
[AddStringParameter](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#AddStringParameter)  
[GetColorParameter](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#GetColorParameter)  
[GetIntegerParameter](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#GetIntegerParameter)  
[GetLongIntParameter](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#GetLongIntParameter)  
[GetSingleParameter](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#GetSingleParameter)  
[GetStringParameter](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#GetStringParameter)  
[GetWordParameter](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#GetWordParameter)  
[ResetParameters](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#ResetParameters)  
[RunProcess](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#RunProcess)

[CopyFile function  
TIniFile object](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#TIniFile object)  
[TList Object](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#TList Object)  
[TStringList object](https://www.altium.com/documentation/altium-designer/system-api-server-processes?version=21#TStringList object)

 

## <a id="Server_Process_Routines"></a>Server Process Routines 

### <a id="Servers"></a>Servers

A server provides its services in the Altium Designer environment\. The Client module within the Altium Designer interprets the tasks in terms of server processes and then delegates these processes to the appropriate servers\.

For example when a user is clicking on the Schematic menu to place a wire, the Client module interprets this action as a 'PlaceWire' process and delegates the process to the Schematic Editor server\. The Schematic server responds by executing the process\. The functionality of a server that is installed in the Altium Designer  is exposed by that server's processes and its exposed functions\.

Generally a process is executed by selecting a command which is a packaged process launcher \(such as clicking on a toolbar button, or pressing a hot key or selecting a menu item\) in Altium Designer\. Up to three different types of process launchers can be used to launch the same process\.

You can manually run a process by going to the Run Process menu item in the System menu within

### <a id="Server_Processes"></a>Server Processes

Each server process has a process identifier\. The process identifier is made up of two parts separated by a colon\.  The first part of the process identifier indicates the server that defines the process, and the second part is the process name\.

For example, the process __Sch:ZoomIn__ is provided by the Schematic Editor server\.  When this process is launched, either by selecting a menu item, pressing a hot key or activating a toolbar button \(which are all defined as process launchers in the Altium Designer\), it will perform the task of zooming in on the currently active schematic sheet\.

A process is implemented as a __server name:server process name__ string\. Processes are stored in a command launcher table maintained by the server\. Every time you execute a process via the user interface, it consults the appropriate server’s command table to fetch the process string and then sends this string over to the server for the server to determine which process to execute\. These processes are stored in corresponding server installation text files with an INS extension\.

### <a id="Parametric_Processes"></a>Parametric Processes

A parametric server process allows the information, a process needs, to be passed when the process is called\. This ability to be able to pass process parameters allows direct control over the operation of a process\. For parametric processes, each parameter has a value assigned and this parameter / value block is represented as Parameter = Name\.  
For example FileName = C:\\Program Files\\TestFile\.Txt\.

To concatenate several parameters as a whole string, each parameter / value block is separated by the pipe | symbol\.  
For example Parameter1 = Name1 | Parameter2 = Name 2 etc\.

 

## <a id="Manipulating_Server_Processes"></a>Manipulating Server Processes 

There are server process functions and a TParameterList class in the parameters part of the Altium Designer API that do the manipulation of process strings much more easily\.

### <a id="TParameterList_Class"></a>TParameterList Class

__Overview__  
The TParameterList class stores parameter name = value blocks separated by the Pipe symbols in a single null terminated string easily\. For example, Orientation=1|Location\.X=10000000|Location\.Y=20000000 is a typical parameter string\.  
To add parameters in the TParameterlist object, you use one of the following SetState\_AddParameterX methods\. Normally the SetState\_AddParameterAsString method is used in this case\.  
To retrieve a specially formatted null terminated string from the TParameterList object, you can invoke one of the GetState\_ParameterX methods\. The GetState\_ToString or GetState\_ParameterAsPChar methods are used in this case\.  
You create an instance of the TParameterList class and invoke the ClearAllParameters method to reset it\.