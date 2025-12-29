#### ProcessAllFilesOnPath

__Declaration__  
Procedure ProcessAllFilesOnPath\(Filter            : TDynamicString;  
                                FileFunction      : TFileFunction;  
                                AbsolutePath      : TDynamicString;  
                                IncludeSubFolders : Boolean = True\);  
__Description__  
This function returns all files on the specified AbsolutePath and Filter parameters\. Normally to fetch all files on the Absolute path, use this ‘\*’ Filter String\. Note only one asterisk for the Filter parameter\. Otherwise you can use the following filters for example, ‘\*\.\*’ and ‘\*\.Schlib’\. The FileFunction parameter outputs strings in a TStringList object\.  
__Example__  
ProcessAllFilesOnPath\('\*',ArchiveItems\_CreateAnyDirectoryFile,AFullPath,True\);  
__See also__  
TFileFunction type