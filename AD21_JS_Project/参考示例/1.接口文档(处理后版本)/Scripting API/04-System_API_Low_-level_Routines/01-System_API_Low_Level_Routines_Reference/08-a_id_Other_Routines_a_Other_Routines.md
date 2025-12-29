### <a id="Other_Routines"></a>Other Routines

#### AltKeyDown

__Declaration__  
Function AltKeyDown: Integer;  
__Description__  
This function returns a value that indicates the state of the ALT key, that is, the function returns 1 if the ALT key is pressed down, otherwise it returns 0\.  
__See also__  
Other Routines

#### BeginHourGlass

__Declaration__  
Procedure BeginHourGlass\(ACursor : TCursor = crHourGlass\);  
__Description__  
The BeginHourGlass procedure changes the cursor to a Hour Glass that denotes that the system is busy\.  
__See also__  
EndHourGlass procedure  
SetCursorBusy procedure  
Other Routines

#### CheckActiveServer

__Declaration__  
Function CheckActiveServer\(Const AServerName, AServerCaption: String; AWithDialog: Boolean\): Boolean;  
__Description__  
The function checks whether the server for the nominated document is active or not\.  
__See also__  
Other Routines

#### ControlKeyDown

__Syntax__  
Function ControlKeyDown: Integer;  
__Description__  
The ControlKeyDown function returns a value that indicates the state of the CONTROL key, that is, the function returns 1 if the CONTROL key is down, otherwise it returns 0\.  
__See also__  
AltKeyDown and ShiftKeyDown functions\.  
Other Routines

#### BeginHourGlass

\(ClientAPIReg unit\)  
__Declaration__  
Procedure BeginHourGlass\(ACursor : TCursor = crHourGlass\);  
__Description__  
The EndHourGlass procedure changes the cursor from a Hour Glass cursor back to the default pointing cursor\.  
__See also__  
BeginHourGlass procedure  
SetCursorBusy procedure  
Other Routines

#### EscKeyDown

__Syntax__  
Function EscKeyDown: Integer;  
__Description__  
The EscKeyDown function returns a value that indicates the state of the ESCAPE key, that is, the function returns 1 if the ESCAPE key is down, otherwise it returns 0\.  
__See also__  
AltKeyDown and ShiftKeyDown functions\.  
Other Routines

#### GetActiveServerName function

__Syntax__  
Function GetActiveServerName:String;  
__Description__  
The GetActiveServerName function returns the name of the server module that is currently active in Altium Designer\.  
__Example__  
   
__See also__  
Other Routines

#### GetCurrentWindowHandle

__Declaration__  
Procedure GetCurrentWindowHandle\(Var Value: HWND\);  
__Description__  
The procedure returns an HWND value which represent the window handle of the currently active window in Altium Designer\.  
__See also__  
Other Routines

#### GetCurrentDocumentFileName

__Declaration__  
Function GetCurrentDocumentFileName : String;  
__Description__  
The GetCurrentDocumentFileName obtains the filename of the currently focussed document in DXP\.  
__See also__  
SaveCurrentDocument function\.  
Other Routines

#### GetErrorMessage

__Declaration__  
Function GetErrorMessage\(Const ErrorNumber : Integer\) : String;  
__Description__  
The GetErrorMessage function returns an error message string that corresponds to the specified Operating System error code\.  
__See also__  
Other Routines

#### RunApplication

__Declaration__  
Function RunApplication\(Const CommandLine : String\) : Integer;  
__Description__  
The RunApplication function executes an application program outside the Altium Designer environment\. You need to supply the full path including the filename to the application you wish to execute\.  
__Example__

1

CommandLine := 'notepad\.exe' \+ NameOfTextFile;

2

ErrorCode   := RunApplication\(CommandLine\);

3

If ErrorCode <> 0 Then

4

    ShowError\('System cannot start : ' \+ CommandLine \+ \#13\#10 \+ GetErrorMessage\(ErrorCode\)\);

__See also__  
Other Routines

#### ResetCursor

__Declaration__  
Procedure ResetCursor;  
__Description__  
The ResetCursor resets the cursor to the default arrow cursor\.  
__See also__  
SetCursorBusy  
Other Routines

#### RunCommand

__Syntax__  
Procedure RunCommand \(Const IdString : TDynamicString; Const SpecialParameter : TDynamicString\);  
__Description__  
This procedure executes a server process with parameters\. The IdString parameter denotes the servername:serverprocessname\. The SpecialParameter parameter denotes the parametername=parametervalue blocks separated by the | pipe symbol\.  
This RunCommand function is not properly supported by the scripting system in Altium Designer\.  
__Examples__

1

RunCommand\('Client:SetupPreferences', 'Server=PCB|PageName=Models'\);

2

RunCommand\('WorkspaceManager:Configure','ObjectKind=MessageView|Action=ClearAll'\);

3

RunCommand\('PCB:BoardInformation',''\);

4

RunCommand\('PCB:Zoom','Action=Redraw'\);

__See also__  
RunSystemCommand

#### RunSystemCommand

__Syntax__  
Function RunSystemCommand\(Const S : TDynamicString\) : TBoolean;  
__Description__  
The RunSystemCommand function runs the specified application denoted by the parameter string, S\.  
__Example__  
RunSystemCommand\('NotePad\.Exe ' \+ S\);  
__See also__  
RunCommand procedure\.

#### RunSystemCommandInSystemDirectory

__Syntax__  
Function  RunSystemCommandInSystemDirectory\(Const S : TDynamicString\) : TBoolean;  
__Description__  
The RunSystemCommandInSystemDirectory function runs the specified application in the Windows directory and the application’s filename is denoted by the string, S\.  
__Example__  
RunSystemCommandInSystemDirectory\(‘Notepad\.Exe’\);  
__See also__  
RunCommand procedure  
RunSystemCommand procedure

#### SaveCurrentDocument

__Syntax__  
Function SaveCurrentDocument : Boolean;  
__Description__  
The SaveCurrentDocument function determines whether the current document can be saved or not\.  
__See also__  
Other Routines

#### SetCursorBusy

__Declaration__  
Procedure SetCursorBusy;  
__Description__  
The SetCursorBusy updates the cursor to the default busy cursor, to indicate that the system is busy\. This procedure could be set before a time consuming loop within a script\.  
__See also__  
ResetCursor  
Other Routines

#### ShiftKeyDown

__Declaration__  
Function ShiftKeyDown: Integer;  
__Description__  
The ShiftKeyDown function returns a value that indicates the state of the SHIFT key, that is, the function returns 1 if the SHIFT key is down, otherwise it returns 0\.  
__See also__  
AltKeyDown and ControlKeyDown functions\.  
Other Routines