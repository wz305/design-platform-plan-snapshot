#### ExistAnyWhereAsTemplate

__Declaration__  
Function ExistAnyWhereAsTemplate\(Var S : TDynamicString\) : TBoolean;  
__Description__  
Checks if the S parameter containing the filename exists in the following folders:  
SpecialFolder\_DesignTemplates,  
SpecialFolder\_AltiumSystemTemplates,  
SpecialFolder\_TemplatesForAllUsers, or  
SpecialFolder\_CommonDocumentTemplates\.  
__Example__  
If Not ExistAnywhere\(MacroFileName\) then Exit;  
__See also__  
ExistAnyWhere function\.