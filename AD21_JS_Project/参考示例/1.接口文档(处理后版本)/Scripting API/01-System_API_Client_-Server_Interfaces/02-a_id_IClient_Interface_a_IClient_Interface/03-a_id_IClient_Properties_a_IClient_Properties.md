### <a id="IClient_Properties"></a>IClient Properties

#### ApplicationHandle property

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

#### CommandLauncher property

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

#### CurrentView property

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

#### GUIManager Property

\(IClient interface\)  
__Syntax__  
Property GUIManager : IGUIManager Read GetGUIManager;  
__Description__  
The GUIManager property returns the GUIManager interface\. This Interface object deals with the Altium Designer's Graphical User Interface such as controlling the status bars, the locations and the state of panels\.  
__See also__  
IGUIManager interface  
IClient interface

#### NavigationSystem property

\(IClient interface\)  
__Syntax__  
Property  NavigationSystem : INavigationSystem   Read GetNavigationSystem;  
__Description__  
The NavigationSystem property represents the Navigation system in Altium Designer\. The navigation system is the workhouse for the Navigation panel which is the center\-piece for net connectivity for the design project\. There are three ways a design can be arranged \- as a list of compiled sheets, flattened hierarchy and as a structural tree\.  
__Example__  
   
__See also__  
IClient interface  
INavigationSystem interface

#### ProcessControl property

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

#### ServerModule property

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

#### ServerModuleByName property

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

#### TimerManager property

\(IClient interface\)  
__Syntax__  
Property TimerManager : ITimerManager Read GetTimerManager;  
__Description__  
This property returns the timer manager object interface\.  
__See also__  
IClient interface  
ITimerManager interface

#### OptionsManager property

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