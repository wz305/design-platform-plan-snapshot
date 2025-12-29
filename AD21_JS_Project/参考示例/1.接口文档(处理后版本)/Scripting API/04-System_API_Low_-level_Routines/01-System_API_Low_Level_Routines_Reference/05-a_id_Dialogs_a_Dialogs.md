### <a id="Dialogs"></a>Dialogs

#### ConfirmOkCancel

__Declaration__  
Function  ConfirmOKCancel \(S : TDynamicString\) : Boolean;  
__Description__  
The ConfirmOkCancel function displays a dialog with the S parameter for the message body of the dialog\. This function returns a Boolean value\. Since there are ‘OK’ and ‘Cancel’ buttons, if you pressed the OK button, the functions returns a true value, otherwise the function returns a false value  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.

#### ConfirmOkCancelWithCaption

__Declaration__  
Function  ConfirmOKCancelWithCaption   \(Caption, S : TDynamicString\) : Boolean;  
__Description__  
The ConfirmOkCancelWithCaption function displays a dialog with a Caption parameter for the title bar of the dialog, and the S parameter for the message body of the dialog\. This function returns a Boolean value\. Since there are ‘OK’ and ‘Cancel’ buttons, if you pressed the OK button, the functions returns a true value, otherwise the function returns a false value  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.

#### ConfirmNoYes

__Declaration__  
Function ConfirmNoYes\(Const S: String\) : Boolean  
__Description__  
The procedure displays a message dialog with a YES button and NO button buttons\. The title of the message box is "Confirm"\. The Value parameter returns True for the button Yes and False for no\.  
__See also__  
Dialogs

#### ConfirmNoYesCancel

__Declaration__  
Function ConfirmNoYesCancel\(Const S: String\) : Integer  
__Description__  
The procedure displays a message dialog with a YES button, NO button and Cancel buttons\. The title of the message box is "Confirm"\.  
The Value parameter returns one of the following values as a TModalResult type \(as defined in Borland Delphi\) representing which button has been pressed\.  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.

#### ConfirmNoYesCancelWithCaption

__Declaration__  
Function  ConfirmNoYesCancelWithCaption\(Const Caption, S : TDynamicString\) : Integer;  
__Description__  
The ConfirmNoYesCancelWithCaption function displays a dialog with a Caption parameter for the title bar of the dialog, and the S parameter for the message body of the dialog and has ‘Yes’, ‘No’ and ‘Cancel’ buttons\.  
This function returns a modal value, ie when the user chose the Cancel button, an IDCancel \(2\) is returned or when the user chose the No button an IDNo \(7\) is returned, or when the user chose the Yes button, an IDYES \(6\) value is returned\.  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.

#### ConfirmNoYesWithCaption

__Declaration__  
Function  ConfirmNoYesWithCaption      \(Caption   : TDynamicString; S : TDynamicString\) : TBoolean;  
__Description__  
The ConfirmNoYesWithCaption function displays a dialog with a Caption parameter for the title bar of the dialog, and the S parameter for the message body of the dialog and has ‘Yes’ and ‘No’ buttons\.  
This function returns a modal value, ie when the user user chose the No button a False value is returned, or when the user chose the Yes button, a True value is returned  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.

#### SortedListBoxCompare

__Declaration__  
Function SortedListBoxCompare\(Const S1, S2 : AnsiString\) : Integer;  
__Description__  
This function has its internal sorting routine that sorts lists alphanumerically\. Delphi’s sort can only provide digital or alphabet sorting only\. You will need to invoke the CustomSort routine for a TStringList or other Delphi equivalent string lists and pass this function into this CustomSort routine\.  
__Example__  
   
__See also__

#### DisplayNotImplementedMessage

__Declaration__  
Procedure DisplayNotImplementedMessage\(ProcessId,ProcessDescription : TDynamicString\);  
__Description__  
This procedure displays a dialog with the Server Process not Implemented Message for server projects\. This is used in the commands unit of a server project\.  
__See also__  
ShowInfo and ShowWarning procedures\.

#### RunNetworkConnectionDialog

__Syntax__  
Procedure RunNetWorkPrintersDialog\(HWindow : Hwnd\);  
__Description__  
This procedure invokes the Network Printers dialog with the handle of the current dialog or window in Altium Designer\.  
__Example__  
   
__See also__

#### RunNetworkPrintersDialog

__Syntax__  
Procedure RunNetWorkConnectionDialog\(HWindow : Hwnd\);  
__Description__  
This procedure invokes the Network Connection dialog with the handle of the current dialog or window in ALTIUM DESIGNER\.  
__Example__  
   
__See also__

#### RunOpenDocumentDialog

__Syntax__  
Function  RunOpenDocumentDialog \(Caption : TDynamicString; MultiSelect : Boolean; Var Path, SelectedType, Editor : TDynamicString;  Const FileTypes, Files : TStrings\) : Boolean;  
__Description__  
This function is based on the Client’s RunCommonDialog process\. The Caption parameter is used for the Title of the dialog\. The MultiSelect parameter allows you to select files from the dialog if True\. If you want to only select one file use the False value\. The Path, SelectedType and Editor parameters are returned after the dialog has closed\. FileTypes and Files parameters determine which file types and files can be opened by the Common Dialog\.  
__Example__  
   
__See also__

#### ShowError

__Declaration__  
Procedure ShowError\(Const S: String\);  
__Description__  
This procedure displays an Error dialog containing an OK button and the warning icon\.  
__See also__  
ShowInfo and ShowWarning procedures\.

#### ShowError\_SystemModal

__Syntax__  
Procedure ShowError\_SystemModal\(Const S : TDynamicString\);  
__Description__  
The ShowError\_SystemModal procedure displays an independent dialog with an error symbol and string, S, for the text\. This dialog does not have the Altium Designer’s window handle and thus appears on the taskbar of the Windows Desktop\.  
__Example__  
   
__See also__

#### ShowInfo

__Declaration__  
Procedure ShowInfo\(Const S: String\);  
__Description__  
The procedure displays an information dialog containing an OK button and the information icon\.  
__See also__  
ShowError and ShowWarning procedures\.

#### ShowInfoWithCaption

__Declaration__  
Procedure ShowInfoWithCaption          \(Caption,S : TDynamicString\);  
__Description__  
Displays a dialog with the Information icon and with a Caption parameter for the title bar of the dialog, and the S parameter for the message body of the dialog\.  
__See also__  
ShowError and ShowWarning procedures\.

#### ShowWarning

__Declaration__  
Procedure ShowWarning\(Const S: String\);  
__Description__  
This procedure displays a warning dialog containing an OK button and the warning icon\.  
__See also__  
ShowError and ShowInfo procedures\.