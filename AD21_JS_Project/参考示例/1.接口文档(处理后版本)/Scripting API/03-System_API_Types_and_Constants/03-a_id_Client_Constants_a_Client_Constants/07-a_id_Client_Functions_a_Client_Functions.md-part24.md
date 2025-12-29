#### ConfirmNoYesCancelWithCaption

__Declaration__  
Function  ConfirmNoYesCancelWithCaption\(Const Caption, S : TDynamicString\) : Integer;  
__Description__  
The ConfirmNoYesCancelWithCaption function displays a dialog with a Caption parameter for the title bar of the dialog, and the S parameter for the message body of the dialog and has ‘Yes’, ‘No’ and ‘Cancel’ buttons\.  
This function returns a modal value, ie when the user chose the Cancel button, an IDCancel \(2\) is returned or when the user chose the No button an IDNo \(7\) is returned, or when the user chose the Yes button, an IDYES \(6\) value is returned\.  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.