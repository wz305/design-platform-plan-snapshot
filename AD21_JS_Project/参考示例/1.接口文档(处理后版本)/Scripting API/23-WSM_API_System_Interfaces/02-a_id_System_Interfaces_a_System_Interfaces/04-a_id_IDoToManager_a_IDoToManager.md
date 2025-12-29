### <a id="IDoToManager"></a>IDoToManager

__Overview__  
The __IDoToManager__ interface represents the To Do panel in Altium Designer\. This To Do list manager allows you to manage a list of what to do and assign a priority to each what to do item\.

__Interface Methods__  
Function  AddItem    \(Const AnItem  : WideString\) : LongBool;     
Function  RemoveItem \(Const AnItem  : WideString\) : LongBool;     
Function  GetItem    \(      Index   : Integer   \) : WideString;   
   
Function  GetCount                 : Integer;  
Procedure Clear;  
__Interface Properties__  
Property  Item\[Index : Integer\] : WideString Read GetItem;  
Property  Count                 : Integer   Read GetCount;  
__See also__  
Workspace Manager Interfaces