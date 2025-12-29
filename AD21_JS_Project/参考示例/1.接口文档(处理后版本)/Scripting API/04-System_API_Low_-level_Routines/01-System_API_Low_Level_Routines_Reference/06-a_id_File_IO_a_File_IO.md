### <a id="File_IO"></a>File IO

#### AddBackSlashToFrontAndBack

__Declaration__  
Function  AddBackSlashToFrontAndBack\(S: TDynamicString\) : TDynamicString;  
__Description __  
The AddBackSlashToFrontAndBack function adds a path separator character to the front and to the back of a string\. For example if the S string is empty, only one back slash is added to the string\. Otherwise the S string has a back slash added to the front and to the end of this string\.  
__See also__

#### CheckAgainstWildCard\_CaseSensitive

__Declaration__  
Function  CheckAgainstWildCard\_CaseSensitive\(WildCard,Name : TDynamicString\)  
__Description __  
The CheckAgainstWildCard\_CaseSensitive function allows the comparison of the Wildcard string containing wildcards to the Name string\. Use the Wildcard string which can consist of upper case and lower case characters to determine if the Name string matches the format described by the Wildcard string\. The wildcard string can contain wildcards that can match any character, and sets that match a single character that is included in the Name string\.  
__See also__

#### CheckAgainstWildCard

__Declaration__  
Function  CheckAgainstWildCard \(WildCard,Name : TDynamicString\)  
__Description __  
The CheckAgainstWildCard function allows the comparison of the Wildcard string containing wildcards to the Name string\. Use the Wildcard string to determine if the Name string matches the format described by the Wildcard string\. The wildcard string can contain wildcards that can match any character, and sets that match a single character that is included in the Name string\. This function is not case sensitive\.  
__See also__

#### ComputerName

__Declaration__  
Function ComputerName : ShortString  
__Description __  
The ComputerName function retrieves the computer name of the current system\. This name is established at system startup, when it is initialized from the registry\.  
__See also__

#### ConvertDiskSizeToString

__Declaration__  
Function  ConvertDiskSizeToString    \(Size : Integer\) : TDynamicString;  
__Description __  
The ConvertDiskSizeToString function converts a number into a string representing the size of a storage space\.  For example, when Size = 345, then the function returns a ‘345 Bytes’ string\.  
__See also__

#### ConvertFIleNameToExeSystemFileName

__Declaration__  
Function ConvertFileNameToExeSystemFileName\(S : TString\) : TString;  
__Description__  
The ConvertFileNameToExeSystemFileName routine updates the file name to include the full path to Altium\\System folder along with the filename parameter\. An example is ‘C:\\Program Files\\Altium\\System\\ServerA\.exe’  
__Example__  
   
__See also__

#### ConvertPartialPathToExeFileName

__Delaration__  
Function ConvertPartialPathToExeFileName\(S : TString\) : TString;  
__Description__  
The ConvertPartialPathToExeFileName routine updates the file name to include the full path to Altium\\System folder along with the filename parameter\. An example is ‘C:\\Program Files\\Altium\\System\\ServerA\.exe’  
__Example__  
   
__See also__

#### CurrentModuleName

__Syntax__  
Function CurrentModuleName : TString;  
__Description__  
The CurrentModuleName function retrieves the full path and filename for the executable/dynamic library linking file containing the specified module\.  
__Example__  
   
__See also__

#### DocumentIsReadOnly

__Declaration__  
Function DocumentIsReadOnly      \(FullPath : TDynamicString\) : Boolean;  
__Description __  
The DocumentIsReadOnly function returns True if a design document file has a read only property set true\.  
__Example__

1

If DocumentIsReadOnly\(Document\.FileName\) Then

2

Begin

3

    ShowError\(ExtractFileName\(Document\.FileName\) \+ ' is read\-only\.'\);

4

    Exit;

5

End;

__See also__  
ExtractFilename function

#### ExistAnyWhere

__Declaration__  
Function ExistAnyWhere\(Var S : TDynamicString\) : TBoolean; Overload;  
Function ExistAnyWhere\(Var S : TString       \) : TBoolean; Overload;  
__Description__  
The ExistAnyWhere function returns a TBoolean value denoting whether the file exists or not\. Note that the S parameter is of TDynamicString type\.  
__Example__

1

// Remove the \.SchLib file because it is no longer needed

2

SchLibFileName := GetProjectLibraryPath;

3

If ExistAnyWhere\(SchLibFileName\) Then

4

Begin

5

    Project\.DM\_RemoveSourceDocument\(SchLibFileName\);

6

    Document := Client\.GetDocumentByPath\(SchLibFileName\);

7

    If Document <> Nil Then Document\.ReleaseFileOwnership;

8

    DeleteFile\(SchLibFileName\);

9

End;

__See also__  
ExistAnyWhereAsTemplate function

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

#### FindFileAnyWhere

__Declaration__  
Function FindFileAnyWhere\(Var Path : TDynamicString\) : TBoolean; Overload;  
__Description__  
This FindFileAnywhere checks if the file exists in the path or anywhere else\. If a file is found, a ‘True’ value is returned, otherwise, ‘False’  
__Example__  
   
__See also__

#### FileExists

__Declaration__  
Function FileExists\(const FileName: string\): Boolean;  
__Description __  
The FileExists function returns True if the file specified by FileName exists\. If the file does not exist, FileExists returns False\.  
__Example__

01

Function OpenProject\(ProjectName : String\) : Boolean;

02

Begin

03

    Result := True;

04

    If Not FileExists\(ProjectName\) Then Result := False;

05

  

06

    ResetParameters;

07

    AddStringParameter\('ObjectKind','Project'\);

08

    AddStringParameter\('FileName', ProjectName\);

09

    RunProcess\('WorkspaceManager:OpenObject'\);

10

End;

__See also__

#### GetFreeDiskSpaceString

__Declaration__  
Function  GetFreeDiskSpaceString\(DiskNumber : Integer\) : TDynamicString;  
__Description __  
The GetFreeDiskSpaceString function returns a TDynamicString value which represents the number of free bytes on the specified drive number\.  
__See also__

#### GetDiskSizeString

__Declaration__  
Function  GetDiskSizeString     \(DiskNumber : Integer\) : TDynamicString;  
__Description __  
The GetDiskSizeString function returns a TDynamicString value which represents the size, in bytes, of the specified drive\.  
__See also__

#### GetDiskFree

__Declaration__  
Function GetDiskFree\(Drive: Byte\): Double;  
__Description __  
The GetDiskFree function returns a double value which reports the amount of free space on the disk\. The Drive value \(Byte value\) represents the drive letter\. A drive = 0, B Drive = 1 etc\.  
__See also__

#### GetMacroDescription

__Declaration__  
Function GetMacroDescription\(MacroFileName : TString\) : TString;  
__Description__  
This GetMacroDescription returns a string if the function finds the '$SUMMARY' or '$Description' identifier in a macro script\.  
__Example__  
   
__See also__

#### HasExtension

__Declaration__  
Function HasExtension\(Const Name : TDynamicString; Var DotPos : Integer\) : TBoolean;  
__Description __  
This function checks if the Name parameter has an extension by scanning for the dot character\. If the dot character is found, the index of the DotPos variable parameter is returned\. Note that the invalid characters are '\\' and ':' and if they exist in the Name parameter, then the function returns a false value\.  
__See also__

#### IsFullPathToExistingFile

__Declaration__  
Function IsFullPathToExistingFile\(FullPath : TDynamicString\) : Boolean;  
__Description __  
This function returns True if the path including the filename to an existing file exists\. Use this function to distinguish a path that contains the filename only\.  
__See also__  
IsFullPathToExistingStructuredStorage function

#### IsFullPathToExistingStructuredStorage Function

__Declaration__  
Function IsFullPathToExistingStructuredStorage\(Const FullPath : TDynamicString\) : Boolean;  
__Description__  
This function indicates whether a particular disk file contains a storage object\. This function returns True if the path including the filename to an existing structured storage exists\.  
__Example__

1

If IsFullPathToExistingStructuredStorage\(GetFileName\) Then

2

    Result := fmShareDenyNone

3

Else

4

    Result := Inherited GetFileShareMode;

__See also__  
IsFullPathToExistingFile function

#### IsPathRelative

__Declaration__  
Function IsPathRelative\(Path : TString\) : Boolean;  
__Description__  
This IsPathRelative function checks if the string contains a relative path not a full absolute path\.  
__Example__

01

    If IsPathRelative\(FileName\) Then

02

    Begin

03

        If Not DirectoryExists\(FRootPath\) Then Exit;

04

  

05

        S := GetCurrentDir;

06

        If Not SetCurrentDir\(FRootPath\) Then Exit;

07

        Try

08

            AbsolutePath := ExpandFileName\(FileName\);

09

        Finally

10

            SetCurrentDir\(S\);

11

        End;

12

    End

13

    Else

14

        AbsolutePath := FileName;

__See also__  
ExpandFilename function

#### LowLevelRunTextEditorWithFile

__Declaration__  
Procedure LowLevelRunTextEditorWithFile   \(S : TDynamicString\);  
__Description __  
This function invokes the Microsott Windows NotePad application and attempts to open the file denoted by the S parameter\.  
__See also__  
RunCommand procedure\.

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

#### ValidDosFileName

__Declaration__  
Function ValidDosFileName\(FileName : TSTring\) : TBoolean;  
__Description__  
The ValidDosFileName returns a TBoolean value denoting whether the filename string is a valid DOS filename\. A valid dos filename must not have the following characters \(‘\*’,’?’,’ ‘,’”’,‘/‘,’;’ ,‘|’,‘,’, ‘=’\) and only have one ‘\.’ fullstop character in the entire filename string\.  
__Example__

1

Filename := ForceFileNameExtension\(Board\.FileName, ReportFileExtension\);

2

If GetState\_ParameterUpperCaseString\(Parameters, 'Filename', S\) Then

3

    If \(ValidDosFileName\(S\)\) then Filename := S;

__See also__  
ForceFileNameExtension function