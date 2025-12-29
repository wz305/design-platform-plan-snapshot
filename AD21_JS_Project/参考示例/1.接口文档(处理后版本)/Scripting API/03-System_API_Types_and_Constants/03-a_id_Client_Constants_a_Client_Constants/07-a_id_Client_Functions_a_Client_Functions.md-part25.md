#### ConfirmNoYesWithCaption

__Declaration__  
Function  ConfirmNoYesWithCaption      \(Caption   : TDynamicString; S : TDynamicString\) : TBoolean;  
__Description__  
The ConfirmNoYesWithCaption function displays a dialog with a Caption parameter for the title bar of the dialog, and the S parameter for the message body of the dialog and has ‘Yes’ and ‘No’ buttons\.  
This function returns a modal value, ie when the user user chose the No button a False value is returned, or when the user chose the Yes button, a True value is returned  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.