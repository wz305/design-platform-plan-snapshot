### <a id="IWorkspacePreferences"></a>IWorkspacePreferences

__Overview__  
The __IWorkspacePreferences__ interface represents the Preferences object in Altium Designer This interface details with file ownership \- that is the rights of access to a design document\.

__Interface Methods__  
Function  GetDefaultTemplateFile\(Const ADocKind : Widestring\) : Widestring;  
Function  GetFileOwnership\_Enabled : Boolean;  
Function  GetFileOwnership\_EnabledOutputDirectory : Boolean;  
Function  GetFileOwnership\_WarningLevelOpen : TFileOwnershipWarningLevel;  
Function  GetFileOwnership\_WarningLevelSave : TFileOwnershipWarningLevel;  
Function  GetDefaultLibraryPath : WideString;  
Function  GetHighlightMethodSet : THighlightMethodSet;  
Function  GetObjectsToDisplay   : TWorkspaceObjectIdSet;  
Function  GetHighlightConnectedPowerParts : Boolean;  
   
Procedure SetDefaultTemplateFile\(Const ADocKind, AFileName : Widestring\);  
Procedure SetFileOwnership\_Enabled\(AValue : Boolean\);  
Procedure SetFileOwnership\_EnabledOutputDirectory\(AValue : Boolean\);  
Procedure SetFileOwnership\_WarningLevelOpen\(AValue : TFileOwnershipWarningLevel\);  
Procedure SetFileOwnership\_WarningLevelSave\(AValue : TFileOwnershipWarningLevel\);  
__Interface Properties__  
Property  DefaultTemplateFile\[Const ADocKind   : Widestring\] : Widestring   
Property  FileOwnership\_Enabled                : Boolean   
Property  FileOwnership\_EnabledOutputDirectory : Boolean   
Property  FileOwnership\_WarningLevelOpen       : TFileOwnershipWarningLevel  
Property  FileOwnership\_WarningLevelSave       : TFileOwnershipWarningLevel  
Property  DefaultLibraryPath                   : WideString   
__See also__  
Workspace Manager Interfaces