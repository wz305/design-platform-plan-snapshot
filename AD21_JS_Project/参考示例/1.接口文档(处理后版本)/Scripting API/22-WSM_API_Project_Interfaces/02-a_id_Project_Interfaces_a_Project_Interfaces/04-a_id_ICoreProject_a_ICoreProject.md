### <a id="ICoreProject"></a>ICoreProject

__Overview__  
The ICoreProject interface represents the project that hosts core designs\. A core project is typically created to develop pre\-synthesized user models whose EDIF output becomes the model for these user defined components\.  
__Important notes__  
Inherited from IAbstractVHDLProject  interface  
__Interface Methods__  
Function DM\_CreateSymbolGenerator     : ISymbolGenerator;  
Function DM\_GetIncludeModelsInArchive : LongBool;          
__See also__  
Workspace Manager Interfaces  
IProject interface  
IAbstractVHDLProject interface  
ISymbolGenerator interface