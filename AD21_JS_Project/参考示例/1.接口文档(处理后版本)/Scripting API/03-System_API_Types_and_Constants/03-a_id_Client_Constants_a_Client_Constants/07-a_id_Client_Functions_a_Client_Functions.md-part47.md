#### ExpandFile

__Declaration__  
Function ExpandFile \(S : TDynamicString\) : TDynamicString;  
__Description __  
The ExpandFile function converts the relative file name into a fully qualified path name by merging in the current drive and directory\. A fully qualified path name includes the drive letter and any directory and sub\-directories in addition to the file name and extension\.  
The ExpandFileName function does not verify that the resulting fully qualified path name refers to an existing file, or even that the resulting path exists\.  
__Example__  
ShowMessage\(ExpandFileName\(‘autoexec\.bat’\)\);  
__See also__  
ExtractFilename function  
FileExists function