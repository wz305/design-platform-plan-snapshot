### <a id="IGUIManager_Interface"></a>IGUIManager Interface

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

#### IGUIManager Methods

##### AddKeyStrokeAndLaunch method

\(IGUIManager interface\)  
__Syntax__  
Function AddKeyStrokeAndLaunch \(AKey : Word\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### AddKeyToBuffer method

\(IGUIManager interface\)  
__Syntax__  
Function AddKeyToBuffer \(KeyId : Integer;Alt, Shift, Ctrl : LongBool\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### BeginDragDrop method

\(IGUIManager interface\)  
__Syntax__  
Procedure BeginDragDrop \(ADragDropInfo : IDragDropObject\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### CanResizePanel method

\(IGUIManager interface\)  
__Syntax__  
Function CanResizePanel \(Const AViewName : Widestring\) : LongBool;  
__Description__  
This function determines whether the panel can be resized or not\. The name of the panel need to be supplied\.  
__Example__  
__See also__  
IGUIManager interface

##### CurrentProcessLauncherAvailable method

\(IGUIManager interface\)  
__Syntax__  
Function CurrentProcessLauncherAvailable : LongBool;  
__Description__  
This function determines whether the current process launcher is available or not to use\.  
__Example__  
__See also__  
IGUIManager interface

##### DoneTransparentToolbars method

\(IGUIManager interface\)  
__Syntax__  
Procedure DoneTransparentToolbars;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### GetActivePLByCommand method

\(IGUIManager interface\)  
__Syntax__  
Function GetActivePLByCommand \(Const DocumentKind, ACommand, AParams : Widestring\) : IProcessLauncherInfo;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### GetFocusedPanelName method

\(IGUIManager interface\)  
__Syntax__  
Function GetFocusedPanelName : Widestring;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### GetPanelIsOpen method

\(IGUIManager interface\)  
__Syntax__  
Function GetPanelIsOpen \(Const AViewName : Widestring\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### GetProcessLauncherInfoByID method

\(IGUIManager interface\)  
__Syntax__  
Function GetProcessLauncherInfoByID \(Const PLID : Widestring\) : IProcessLauncherInfo;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### InitTransparentToolbars method

\(IGUIManager interface\)  
__Syntax__  
Procedure InitTransparentToolbars \(Const ViewRect : TRect\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### IsPanelValidInCurrentForm method

\(IGUIManager interface\)  
__Syntax__  
Function IsPanelValidInCurrentForm \(Const AViewName : Widestring\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### IsPanelVisibleInCurrentForm method

\(IGUIManager interface\)  
__Syntax__  
Function IsPanelVisibleInCurrentForm \(Const AViewName : Widestring\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### IsSysLevelHotKey method

\(IGUIManager interface\)  
__Syntax__  
Function IsSysLevelHotKey \(KeyId : Integer; Alt, Shift, Ctrl : LongBool\): LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### LaunchCurrentHotkey method

\(IGUIManager interface\)  
__Syntax__  
Procedure LaunchCurrentHotkey;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### ProcessMessage method

\(IGUIManager interface\)  
__Syntax__  
Function ProcessMessage \(Var Msg : TMessage\) : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### RegisterFloatingWindow method

\(IGUIManager interface\)  
__Syntax__  
Procedure RegisterFloatingWindow \(Const FloatingWindow : IFloatingWindow\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### ResizePanel method

\(IGUIManager interface\)  
__Syntax__  
Procedure ResizePanel \(Const AViewName : Widestring; AWidth, AHeight : Integer\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### SetFocusLock method

\(IGUIManager interface\)  
__Syntax__  
Procedure SetFocusLock \(Locked : LongBool\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### SetPanelActiveInCurrentForm method

\(IGUIManager interface\)  
__Syntax__  
Procedure SetPanelActiveInCurrentForm \(Const AViewName : Widestring\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### SetPanelVisibleInCurrentForm method

\(IGUIManager interface\)  
__Syntax__  
Procedure SetPanelVisibleInCurrentForm \(Const AViewName : Widestring; IsVisible : LongBool\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### ShowCurrentProcessLauncherHelp method

\(IGUIManager interface\)  
__Syntax__  
Function ShowCurrentProcessLauncherHelp : LongBool;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### ShowTreeAsPopup method

\(IGUIManager interface\)  
__Syntax__  
Procedure ShowTreeAsPopup \(Const TreeID : Widestring\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### StatusBar\_GetState method

\(IGUIManager interface\)  
__Syntax__  
Function StatusBar\_GetState \(Index : Integer\) : Widestring;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### StatusBar\_SetState method

\(IGUIManager interface\)  
__Syntax__  
Procedure StatusBar\_SetState \(Index : Integer; Const S : Widestring\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### UnregisterFloatingWindow method

\(IGUIManager interface\)  
__Syntax__  
Procedure UnregisterFloatingWindow \(Const FloatingWindow : IFloatingWindow\);  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### UpdateInterfaceState method

\(IGUIManager interface\)  
__Syntax__  
Procedure UpdateInterfaceState;  
__Description__  
__Example__  
__See also__  
IGUIManager interface

##### UpdateTransparentToolbars method

\(IGUIManager interface\)  
__Syntax__  
Procedure UpdateTransparentToolbars;  
__Description__  
__Example__  
__See also__  
IGUIManager interface