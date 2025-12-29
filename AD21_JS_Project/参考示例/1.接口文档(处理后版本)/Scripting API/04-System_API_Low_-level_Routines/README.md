# System API Low\-level Routines

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [System API Low\-level Routines for version 22](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- System API](https://www.altium.com/documentation/altium-designer/technical-reference-system-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


Contents of this reference:

[Scale Factor Table](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Scale Factor Table)  
[Constants](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Constants)  
[Conversion Routines](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Conversion Routines)  
[Enumerated Types](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Enumerated Types)  
[Dialogs](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Dialogs)  
[File IO](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#File IO)

[Number Manipulation Routines](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Number Manipulation Routines)  
[Other Routines](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Other Routines)  
[Special Folder Path Strings](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Special Folder Path Strings)  
[String Routines](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#String Routines)  
[Time and Date Routines](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Time and Date Routines)  
[Functions from ClientProcs unit](https://www.altium.com/documentation/altium-designer/system-api-low-level-routines?version=21#Functions from ClientProcs unit)


T 1012  
G 109  
M, Meg = 106  
K 103  
U 10\-6  
N 10\-9  
P 10\-12  
F 10\-15


cMeasureUnitSuffixes : Array\[TMeasureUnit\] Of TDynamicString = \('mil', 'mm', 'in', 'cm', 'dxp', 'm'\);  
cMeasureUnitConvert  : Array\[TMeasureUnit, TMeasureUnit\] Of Double =  
\(// to  mil           mm         in        cm          dxp         m  
        \(1          , 2\.54/100 , 1/1000  , 2\.54/1000 , 1/10      , 2\.54/100000\), // from mils  
        \(100/2\.54   , 1        , 1/25\.4  , 1/10      , 10/2\.54   , 1/1000     \), // from mm  
        \(1000       , 25\.4     , 1       , 2\.54      , 100       , 0\.0254     \), // from in  
        \(1000/2\.54  , 10       , 1/2\.54  , 1         , 100/2\.54  , 1/100      \), // from cm  
        \(10         , 2\.54/10  , 1/100   , 2\.54/100  , 1         , 2\.54/10000 \), // from dxp  
        \(100000/2\.54, 1000     , 100/2\.54, 100       , 10000/2\.54, 1          \)  // from m  
\);

cPaintColorModes : Array\[TPaintColorMode\] Of TDynamicString = \('FullColor', 'GrayScale', 'Monochrome'\);  
   
  CaseSensitive   = True;  
  CaseInSensitive = False;  
  OrdNumOfZero    = 48;  
  cDefThumbnailSizeX = 96;  
  cDefThumbnailSizeY = 72;  
   
   Delimiter       : Set of char = \[\#0,\#39,',',' ',\#10,\#13,\#9,'\(','\)'\];  
   StringDelimiter = \#39;  
   
  cm\_Share\_Compat     = $0;  
  cm\_Share\_DenyRW     = $10;  
  cm\_Share\_DenyW      = $20;  
  cm\_Share\_DenyR      = $30;  
  cm\_Share\_DenyN      = $40;  
  cm\_Access\_ReadOnly  = $0;  
  cm\_Access\_WriteOnly = $1;  
  cm\_Access\_ReadWrite = $2;  
  cm\_NoInheritance    = $80; \{A child process would not inherit file handle and mode\}  
   
  fe\_NoAccessError                 = $0;  
  fe\_FunctionInvalid               = $1;  
  fe\_FileNotFound                  = $2;  
  fe\_PathNotFoundOrFileDoesntExist = $3;  
  fe\_NoHandleIsAvalible            = $4;  
  fe\_AccessIsDenied                = $5;  
  fe\_FileAccessCodeInvalid         = $C;  
   
   FileExtension\_Temp         = '$$$';  
   
   cPathSeparator         = '\\';  
   
    cBooleanStrings : Array\[False\.\.True\] Of TString = \('False','True'\);


Function GetPrevSettings\_Count : Integer;  
Function GetPrevSettings\_Name                                \(AIndex : Integer\) : TDynamicString;  
Function GetPrevSettings\_SpecialKey\_SoftwareAltiumApp        \(AIndex : Integer\) : TDynamicString;  
Function GetPrevSettings\_SpecialKey\_SoftwareAltiumAppDXP     \(AIndex : Integer\) : TDynamicString;  
Function GetPrevSettings\_SpecialFolder\_AltiumApplicationData \(AIndex : Integer\) : TDynamicString;  
   
Function ConvertMeasureUnits\(Const AValue : Double; FromUnit, ToUnit : TMeasureUnit\) : Double;  
   
Function StripMeasureUnits\(Var S : TDynamicString; Var Value : Double; Var UsedUnits : TMeasureUnit\) : Boolean;



TAltShiftCtrlCombination = TShiftState;


TBoolean       = Boolean;


TBusKind           = \(eBusKindUndefined,eBusKindLowValueFirst,eBusKindHighValueFirst,eBusKindGeneric\);


TByte          = Byte;


TChar  = Array\[0\.\.256\] of Char;  
   
The Char type is equivalent to AnsiChar\. Because the implementation of Char is subject to change, it’s a good idea to use the standard function SizeOf rather than a hard\-coded constant when writing programs that may need to handle characters of different sizes\. The TChar type can be used instead of a PChar\.

__Example__

1

Var

2

  P : TChar;

3

Begin

4

    lResult := GetModuleFileName\(HInstance,P,255\)

5

\.\.\.\.

6

End;


TDate = Record  
    Year   : Word;  
    Month  : Word;  
    Day    : Word;  
End;


TDouble = Double;


TDynamicString = AnsiString;


TExtended      = Extended;


TFileFunction = Function\(Path : TDynamicString\) : Boolean Of Object;


THugeInt       = Comp;


TMatchFileNameKind = \(eMatchByPath,eMatchByFileName\);


TPaintColorMode    = \(ePaintColorMode\_FullColor, ePaintColorMode\_GrayScale, ePaintColorMode\_Monochrome\);


TMeasureUnit = \(cUnitMil, cUnitMM, cUnitIN, cUnitCM, cUnitAltium Designer, cUnitM\);


TPaintScaleMode = \(psmScreen, psmDefault, psmPrint\);


TReal          = Single;


TString = ShortString;


TTime = Record  
    Hours        : Word;  
    Minutes      : Word;  
    Seconds      : Word;  
    MilliSeconds : Word;  
End;


TNonRefCountedInterfacedObject = Class\(TObject, IInterface\)  
  Protected  
    FRefCount : Integer;  
    Function    QueryInterface\(Const IID: TGUID; Out Obj\): HResult; StdCall;  
    Function    \_AddRef: Integer;                                   StdCall;  
    Function    \_Release: Integer;                                  StdCall;  
End;



__Declaration__  
Function  ConfirmOKCancel \(S : TDynamicString\) : Boolean;  
__Description__  
The ConfirmOkCancel function displays a dialog with the S parameter for the message body of the dialog\. This function returns a Boolean value\. Since there are ‘OK’ and ‘Cancel’ buttons, if you pressed the OK button, the functions returns a true value, otherwise the function returns a false value  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.


__Declaration__  
Function  ConfirmOKCancelWithCaption   \(Caption, S : TDynamicString\) : Boolean;  
__Description__  
The ConfirmOkCancelWithCaption function displays a dialog with a Caption parameter for the title bar of the dialog, and the S parameter for the message body of the dialog\. This function returns a Boolean value\. Since there are ‘OK’ and ‘Cancel’ buttons, if you pressed the OK button, the functions returns a true value, otherwise the function returns a false value  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.


__Declaration__  
Function ConfirmNoYes\(Const S: String\) : Boolean  
__Description__  
The procedure displays a message dialog with a YES button and NO button buttons\. The title of the message box is "Confirm"\. The Value parameter returns True for the button Yes and False for no\.  
__See also__  
Dialogs


__Declaration__  
Function ConfirmNoYesCancel\(Const S: String\) : Integer  
__Description__  
The procedure displays a message dialog with a YES button, NO button and Cancel buttons\. The title of the message box is "Confirm"\.  
The Value parameter returns one of the following values as a TModalResult type \(as defined in Borland Delphi\) representing which button has been pressed\.  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.


__Declaration__  
Function  ConfirmNoYesCancelWithCaption\(Const Caption, S : TDynamicString\) : Integer;  
__Description__  
The ConfirmNoYesCancelWithCaption function displays a dialog with a Caption parameter for the title bar of the dialog, and the S parameter for the message body of the dialog and has ‘Yes’, ‘No’ and ‘Cancel’ buttons\.  
This function returns a modal value, ie when the user chose the Cancel button, an IDCancel \(2\) is returned or when the user chose the No button an IDNo \(7\) is returned, or when the user chose the Yes button, an IDYES \(6\) value is returned\.  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.


__Declaration__  
Function  ConfirmNoYesWithCaption      \(Caption   : TDynamicString; S : TDynamicString\) : TBoolean;  
__Description__  
The ConfirmNoYesWithCaption function displays a dialog with a Caption parameter for the title bar of the dialog, and the S parameter for the message body of the dialog and has ‘Yes’ and ‘No’ buttons\.  
This function returns a modal value, ie when the user user chose the No button a False value is returned, or when the user chose the Yes button, a True value is returned  
__See also__  
ConfirmNoYes, ShowError, ShowInfo, ShowWarning procedures\.


__Declaration__  
Function SortedListBoxCompare\(Const S1, S2 : AnsiString\) : Integer;  
__Description__  
This function has its internal sorting routine that sorts lists alphanumerically\. Delphi’s sort can only provide digital or alphabet sorting only\. You will need to invoke the CustomSort routine for a TStringList or other Delphi equivalent string lists and pass this function into this CustomSort routine\.  
__Example__  
   
__See also__


__Declaration__  
Procedure DisplayNotImplementedMessage\(ProcessId,ProcessDescription : TDynamicString\);  
__Description__  
This procedure displays a dialog with the Server Process not Implemented Message for server projects\. This is used in the commands unit of a server project\.  
__See also__  
ShowInfo and ShowWarning procedures\.


__Syntax__  
Procedure RunNetWorkPrintersDialog\(HWindow : Hwnd\);  
__Description__  
This procedure invokes the Network Printers dialog with the handle of the current dialog or window in Altium Designer\.  
__Example__  
   
__See also__


__Syntax__  
Procedure RunNetWorkConnectionDialog\(HWindow : Hwnd\);  
__Description__  
This procedure invokes the Network Connection dialog with the handle of the current dialog or window in ALTIUM DESIGNER\.  
__Example__  
   
__See also__


__Syntax__  
Function  RunOpenDocumentDialog \(Caption : TDynamicString; MultiSelect : Boolean; Var Path, SelectedType, Editor : TDynamicString;  Const FileTypes, Files : TStrings\) : Boolean;  
__Description__  
This function is based on the Client’s RunCommonDialog process\. The Caption parameter is used for the Title of the dialog\. The MultiSelect parameter allows you to select files from the dialog if True\. If you want to only select one file use the False value\. The Path, SelectedType and Editor parameters are returned after the dialog has closed\. FileTypes and Files parameters determine which file types and files can be opened by the Common Dialog\.  
__Example__  
   
__See also__


__Declaration__  
Procedure ShowError\(Const S: String\);  
__Description__  
This procedure displays an Error dialog containing an OK button and the warning icon\.  
__See also__  
ShowInfo and ShowWarning procedures\.


__Syntax__  
Procedure ShowError\_SystemModal\(Const S : TDynamicString\);  
__Description__  
The ShowError\_SystemModal procedure displays an independent dialog with an error symbol and string, S, for the text\. This dialog does not have the Altium Designer’s window handle and thus appears on the taskbar of the Windows Desktop\.  
__Example__  
   
__See also__


__Declaration__  
Procedure ShowInfo\(Const S: String\);  
__Description__  
The procedure displays an information dialog containing an OK button and the information icon\.  
__See also__  
ShowError and ShowWarning procedures\.


__Declaration__  
Procedure ShowInfoWithCaption          \(Caption,S : TDynamicString\);  
__Description__  
Displays a dialog with the Information icon and with a Caption parameter for the title bar of the dialog, and the S parameter for the message body of the dialog\.  
__See also__  
ShowError and ShowWarning procedures\.


__Declaration__  
Procedure ShowWarning\(Const S: String\);  
__Description__  
This procedure displays a warning dialog containing an OK button and the warning icon\.  
__See also__  
ShowError and ShowInfo procedures\.



__Declaration__  
Function  AddBackSlashToFrontAndBack\(S: TDynamicString\) : TDynamicString;  
__Description __  
The AddBackSlashToFrontAndBack function adds a path separator character to the front and to the back of a string\. For example if the S string is empty, only one back slash is added to the string\. Otherwise the S string has a back slash added to the front and to the end of this string\.  
__See also__


__Declaration__  
Function  CheckAgainstWildCard\_CaseSensitive\(WildCard,Name : TDynamicString\)  
__Description __  
The CheckAgainstWildCard\_CaseSensitive function allows the comparison of the Wildcard string containing wildcards to the Name string\. Use the Wildcard string which can consist of upper case and lower case characters to determine if the Name string matches the format described by the Wildcard string\. The wildcard string can contain wildcards that can match any character, and sets that match a single character that is included in the Name string\.  
__See also__


__Declaration__  
Function  CheckAgainstWildCard \(WildCard,Name : TDynamicString\)  
__Description __  
The CheckAgainstWildCard function allows the comparison of the Wildcard string containing wildcards to the Name string\. Use the Wildcard string to determine if the Name string matches the format described by the Wildcard string\. The wildcard string can contain wildcards that can match any character, and sets that match a single character that is included in the Name string\. This function is not case sensitive\.  
__See also__


__Declaration__  
Function ComputerName : ShortString  
__Description __  
The ComputerName function retrieves the computer name of the current system\. This name is established at system startup, when it is initialized from the registry\.  
__See also__


__Declaration__  
Function  ConvertDiskSizeToString    \(Size : Integer\) : TDynamicString;  
__Description __  
The ConvertDiskSizeToString function converts a number into a string representing the size of a storage space\.  For example, when Size = 345, then the function returns a ‘345 Bytes’ string\.  
__See also__


__Declaration__  
Function ConvertFileNameToExeSystemFileName\(S : TString\) : TString;  
__Description__  
The ConvertFileNameToExeSystemFileName routine updates the file name to include the full path to Altium\\System folder along with the filename parameter\. An example is ‘C:\\Program Files\\Altium\\System\\ServerA\.exe’  
__Example__  
   
__See also__


__Delaration__  
Function ConvertPartialPathToExeFileName\(S : TString\) : TString;  
__Description__  
The ConvertPartialPathToExeFileName routine updates the file name to include the full path to Altium\\System folder along with the filename parameter\. An example is ‘C:\\Program Files\\Altium\\System\\ServerA\.exe’  
__Example__  
   
__See also__


__Syntax__  
Function CurrentModuleName : TString;  
__Description__  
The CurrentModuleName function retrieves the full path and filename for the executable/dynamic library linking file containing the specified module\.  
__Example__  
   
__See also__


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


__Declaration__  
Function FindFileAnyWhere\(Var Path : TDynamicString\) : TBoolean; Overload;  
__Description__  
This FindFileAnywhere checks if the file exists in the path or anywhere else\. If a file is found, a ‘True’ value is returned, otherwise, ‘False’  
__Example__  
   
__See also__


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


__Declaration__  
Function  GetFreeDiskSpaceString\(DiskNumber : Integer\) : TDynamicString;  
__Description __  
The GetFreeDiskSpaceString function returns a TDynamicString value which represents the number of free bytes on the specified drive number\.  
__See also__


__Declaration__  
Function  GetDiskSizeString     \(DiskNumber : Integer\) : TDynamicString;  
__Description __  
The GetDiskSizeString function returns a TDynamicString value which represents the size, in bytes, of the specified drive\.  
__See also__


__Declaration__  
Function GetDiskFree\(Drive: Byte\): Double;  
__Description __  
The GetDiskFree function returns a double value which reports the amount of free space on the disk\. The Drive value \(Byte value\) represents the drive letter\. A drive = 0, B Drive = 1 etc\.  
__See also__


__Declaration__  
Function GetMacroDescription\(MacroFileName : TString\) : TString;  
__Description__  
This GetMacroDescription returns a string if the function finds the '$SUMMARY' or '$Description' identifier in a macro script\.  
__Example__  
   
__See also__


__Declaration__  
Function HasExtension\(Const Name : TDynamicString; Var DotPos : Integer\) : TBoolean;  
__Description __  
This function checks if the Name parameter has an extension by scanning for the dot character\. If the dot character is found, the index of the DotPos variable parameter is returned\. Note that the invalid characters are '\\' and ':' and if they exist in the Name parameter, then the function returns a false value\.  
__See also__


__Declaration__  
Function IsFullPathToExistingFile\(FullPath : TDynamicString\) : Boolean;  
__Description __  
This function returns True if the path including the filename to an existing file exists\. Use this function to distinguish a path that contains the filename only\.  
__See also__  
IsFullPathToExistingStructuredStorage function


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


__Declaration__  
Procedure LowLevelRunTextEditorWithFile   \(S : TDynamicString\);  
__Description __  
This function invokes the Microsott Windows NotePad application and attempts to open the file denoted by the S parameter\.  
__See also__  
RunCommand procedure\.


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



__Declaration__  
Function  GetBinaryStringFromInteger\(L : Integer   \) : TDynamicString;  
__Description __  
The GetBinaryStringFromInteger function converts an integer to a binary string \(up to thirty two characters long\)\. An integer contains 4 bytes = 32 bits\.  
__See also__


__Declaration__  
Function  ExtendedToEng \(Const ExtVal    : Extended\) : String;  
__Description __  
The ExtendedToEng function converts the floating\-point value given by Value to its string representation\.   
__Example__  
ShowInfo\(ExtendedToEng\(4\.32e18\)\); //4\.320e18  
__See also__  
Number Manipulation routines


__Declaration__  
Function  EngToExtended \(Const EngString : String\)   : Extended;  
__Description __  
The EngToExtended function converts the string value given by EngString to its extended representation\. This function looks at the last character of the string and converts it accordingly \- see scale factor table below\. For example ‘3Meg’ will come out as 3M\.  
__See also__  
Number Manipulation routines


__Declaration__  
Function  GetHexStringFromInteger   \(L : Integer\) : TDynamicString;  
__Description __  
The GetHexStringFromInteger converts a word to a hexadecimal string \(up to eight characters long\)\. The hexadecimal number system is a base 16 system with 16 digits\. A byte equals 2 hexademical digits because each hexadecimal digit corresponds to four binary digits thus 4 bytes equals 8 hexadecimal digits\.  
__See also__  
Number Manipulation routines


__Declaration__  
Function HexToInteger\(Const S : TDynamicString\) : Integer;  
__Description __  
Convert a hexadecimal value \(as a string value\) to an Integer value\.  
__See also__  
Number Manipulation routines


__Declaration__  
Function IntegerToHex\(L : Integer\) : TDynamicString;  
__Description __  
Convert an integer value to an hexadecimal value\.  
__See also__  
Number Manipulation routines


__Declaration__  
Function  IntMax\(x,y : Integer\) : Integer;  
__Description __  
The IntMax function returns the maximum value of X and Y integer types\.  
__See also__  
Number Manipulation routines


__Declaration__  
Function  IntMin\(x,y : Integer\) : Integer;  
__Description __  
The IntMin function returns the minimum value of X and Y integer types\.  
__See also__  
Number Manipulation routines


__Declaration__  
Procedure IntSwap\(Var a,b : Integer\);  
__Description __  
The IntSwap procedure swaps the values for A and B\. For example A = 2 and B = 5\. After passing these values into IntSwap procedure, the new values are a = 5 and b = 2\.  
__See also__  
Number Manipulation routines



__Declaration__  
Function AltKeyDown: Integer;  
__Description__  
This function returns a value that indicates the state of the ALT key, that is, the function returns 1 if the ALT key is pressed down, otherwise it returns 0\.  
__See also__  
Other Routines


__Declaration__  
Procedure BeginHourGlass\(ACursor : TCursor = crHourGlass\);  
__Description__  
The BeginHourGlass procedure changes the cursor to a Hour Glass that denotes that the system is busy\.  
__See also__  
EndHourGlass procedure  
SetCursorBusy procedure  
Other Routines


__Declaration__  
Function CheckActiveServer\(Const AServerName, AServerCaption: String; AWithDialog: Boolean\): Boolean;  
__Description__  
The function checks whether the server for the nominated document is active or not\.  
__See also__  
Other Routines


__Syntax__  
Function ControlKeyDown: Integer;  
__Description__  
The ControlKeyDown function returns a value that indicates the state of the CONTROL key, that is, the function returns 1 if the CONTROL key is down, otherwise it returns 0\.  
__See also__  
AltKeyDown and ShiftKeyDown functions\.  
Other Routines


\(ClientAPIReg unit\)  
__Declaration__  
Procedure BeginHourGlass\(ACursor : TCursor = crHourGlass\);  
__Description__  
The EndHourGlass procedure changes the cursor from a Hour Glass cursor back to the default pointing cursor\.  
__See also__  
BeginHourGlass procedure  
SetCursorBusy procedure  
Other Routines


__Syntax__  
Function EscKeyDown: Integer;  
__Description__  
The EscKeyDown function returns a value that indicates the state of the ESCAPE key, that is, the function returns 1 if the ESCAPE key is down, otherwise it returns 0\.  
__See also__  
AltKeyDown and ShiftKeyDown functions\.  
Other Routines


__Syntax__  
Function GetActiveServerName:String;  
__Description__  
The GetActiveServerName function returns the name of the server module that is currently active in Altium Designer\.  
__Example__  
   
__See also__  
Other Routines


__Declaration__  
Procedure GetCurrentWindowHandle\(Var Value: HWND\);  
__Description__  
The procedure returns an HWND value which represent the window handle of the currently active window in Altium Designer\.  
__See also__  
Other Routines


__Declaration__  
Function GetCurrentDocumentFileName : String;  
__Description__  
The GetCurrentDocumentFileName obtains the filename of the currently focussed document in DXP\.  
__See also__  
SaveCurrentDocument function\.  
Other Routines


__Declaration__  
Function GetErrorMessage\(Const ErrorNumber : Integer\) : String;  
__Description__  
The GetErrorMessage function returns an error message string that corresponds to the specified Operating System error code\.  
__See also__  
Other Routines


__Declaration__  
Function RunApplication\(Const CommandLine : String\) : Integer;  
__Description__  
The RunApplication function executes an application program outside the Altium Designer environment\. You need to supply the full path including the filename to the application you wish to execute\.  
__Example__

1

CommandLine := 'notepad\.exe' \+ NameOfTextFile;

2

ErrorCode   := RunApplication\(CommandLine\);

3

If ErrorCode <> 0 Then

4

    ShowError\('System cannot start : ' \+ CommandLine \+ \#13\#10 \+ GetErrorMessage\(ErrorCode\)\);

__See also__  
Other Routines


__Declaration__  
Procedure ResetCursor;  
__Description__  
The ResetCursor resets the cursor to the default arrow cursor\.  
__See also__  
SetCursorBusy  
Other Routines


__Syntax__  
Procedure RunCommand \(Const IdString : TDynamicString; Const SpecialParameter : TDynamicString\);  
__Description__  
This procedure executes a server process with parameters\. The IdString parameter denotes the servername:serverprocessname\. The SpecialParameter parameter denotes the parametername=parametervalue blocks separated by the | pipe symbol\.  
This RunCommand function is not properly supported by the scripting system in Altium Designer\.  
__Examples__

1

RunCommand\('Client:SetupPreferences', 'Server=PCB|PageName=Models'\);

2

RunCommand\('WorkspaceManager:Configure','ObjectKind=MessageView|Action=ClearAll'\);

3

RunCommand\('PCB:BoardInformation',''\);

4

RunCommand\('PCB:Zoom','Action=Redraw'\);

__See also__  
RunSystemCommand


__Syntax__  
Function RunSystemCommand\(Const S : TDynamicString\) : TBoolean;  
__Description__  
The RunSystemCommand function runs the specified application denoted by the parameter string, S\.  
__Example__  
RunSystemCommand\('NotePad\.Exe ' \+ S\);  
__See also__  
RunCommand procedure\.


__Syntax__  
Function  RunSystemCommandInSystemDirectory\(Const S : TDynamicString\) : TBoolean;  
__Description__  
The RunSystemCommandInSystemDirectory function runs the specified application in the Windows directory and the application’s filename is denoted by the string, S\.  
__Example__  
RunSystemCommandInSystemDirectory\(‘Notepad\.Exe’\);  
__See also__  
RunCommand procedure  
RunSystemCommand procedure


__Syntax__  
Function SaveCurrentDocument : Boolean;  
__Description__  
The SaveCurrentDocument function determines whether the current document can be saved or not\.  
__See also__  
Other Routines


__Declaration__  
Procedure SetCursorBusy;  
__Description__  
The SetCursorBusy updates the cursor to the default busy cursor, to indicate that the system is busy\. This procedure could be set before a time consuming loop within a script\.  
__See also__  
ResetCursor  
Other Routines


__Declaration__  
Function ShiftKeyDown: Integer;  
__Description__  
The ShiftKeyDown function returns a value that indicates the state of the SHIFT key, that is, the function returns 1 if the SHIFT key is down, otherwise it returns 0\.  
__See also__  
AltKeyDown and ControlKeyDown functions\.  
Other Routines


panic\.


__Syntax__  
Function ClientAPI\_SpecialFolder\_AltiumAllUserApplicationData : WideString;  
__Description__  
This function returns the full path to the special folder\.  
__Example__  
ShowMessage\(ClientAPI\_SpecialFolder\_AltiumAllUserApplicationData\);  
//C:\\Documents and Settings\\All Users\\Application Data\\AltiumDesigner  
__See also__  
Special Folder Paths


__Syntax__  
Function ClientAPI\_SpecialFolder\_AltiumApplicationData : WideString;  
__Description__  
This function returns the full path to the special folder\.  
__Example__  
ShowMessage\(ClientAPI\_SpecialFolder\_AltiumApplicationData\);  
//C:\\Documents and Settings\\\*UserName\*\\Application Data\\AltiumDesigner  
__See also__  
Special Folder Paths


__Syntax__  
Function ClientAPI\_SpecialFolder\_AltiumLocalApplicationData : WideString;  
__Description__  
This function returns the full path to the special folder\.  
__Example__  
ShowMessage\(ClientAPI\_SpecialFolder\_AltiumLocalApplicationData\);  
//C:\\Documents and Settings\\\*UserName\*\\Local settings\\Application Data\\AltiumDesigner  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AdminTools : TDynamicString;  
__Description __  
This function returns the path to the All User Application Data folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AllUserAdminTools : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\All Users\\Start Menu\\Programs\\Administrative Tools folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AllUserDesktop : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\All Users\\Desktop folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AllUserDocuments : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\All Users\\Desktop folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLibraryIntegrated : TDynamicString;  
__Description __  
This function returns the path to the Altium Integrated Library folder\. Example C:\\Program Files\\Altium\\Library\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLibraryPld : TDynamicString;  
__Description __  
This function returns the path to the Altium PLD Library folder\. Example C:\\Program Files\\Altium\\Library\\Pld\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLibrary : TDynamicString;  
__Description __  
This function returns the path to the Altium Library folder\. Example C:\\Program Files\\Altium Designer\\Library\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumApplicationData : TDynamicString;  
__Description __  
This function returns the path to the Altium User Application Data folder\. Example C:\\Documents and Settings\\UserName\\Application Data\\Altium  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumAllUserApplicationData  : TDynamicString;  
__Description __  
This function returns the path to the Altium All User Application Data folder\. Example C:\\Documents and Settings\\All Users\\Application Data\\Altium  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumDesignExplorer : TDynamicString;  
__Description __  
This function returns the path to the Altium folder\. Example C:\\Program Files\\Altium\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLocalApplicationData : TDynamicString;  
__Description __  
This function returns the path to the Altium Local Application Data folder\. Example C:\\Documents and Settings\\UserName\\My Documents\\My Designs  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumSystem : TDynamicString;  
__Description __  
This function returns the path to the Altium’s system folder\. Example C:\\Program Files\\Altium\\System\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumSystemTasksPages : TDynamicString;  
__Description __  
This function returns the path to the Altium’s system tasks pages folder\. Example C:\\Program Files\\Altium\\System\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumSystemTemplates : TDynamicString;  
__Description __  
This function returns the path to the Altium’s System Templates folder\. Example C:\\Program Files\\Altium\\System\\Templates\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AllUserApplicationData : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and settings\\All Users\\Application Data folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumTaskingApplicationData : TDynamicString;  
__Description __  
This function returns the path to the Altium Tasking application data folder for example C:\\Documents and Settings\\UserName\\Application Data\\Altium Designer\\Tasking\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumSecurityAllUserApplicationData : TDynamicString;  
__Description __  
This function returns the path to the Altium Security All User Application Data folder for example C:\\Documents and Settings\\UserName\\Application Data\\AltiumDesignerSecurity\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumSystemResources : TDynamicString;  
__Description __  
This function returns the path to the Altium System Resources folder for example C:\\Program Files\\Altium Designer\\System\\Resources\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumSystemDesktopsLayouts : TDynamicString;  
__Description __  
This function returns the path to the Altium Device Images folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumHelp : TDynamicString;  
__Description __  
This function returns the path to the Altium Help folder for example C:\\Program Files\\Altium Designer\\System\\Help\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLocalResources : TDynamicString;  
__Description __  
This function returns the path to the Altium Local resources folder for example C:\\Program Files\\Altium Designer \\System\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLocalHelp : TDynamicString;  
__Description __  
This function returns the path to the Altium Local help folder for example C:\\Program Files\\Altium Designer\\System\\Help\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumScripts : TDynamicString;  
__Description __  
This function returns the path to the Altium Scripts folder for example C:\\Program Files\\Altium Designer\\Scripts\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumSystemButtons : TDynamicString;  
__Description __  
This function returns the path to the Altium System Buttons folder for example C:\\Program Files\\Altium Designer\\System\\Buttons\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumSystemDocumentImages : TDynamicString;  
__Description __  
This function returns the path to the Altium System Document Images folder for example C:\\Program Files\\Altium Designer\\System\\DocumentImages\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumSystemNavImages : TDynamicString;  
__Description __  
This function returns the path to the Altium System Nav Images folder for example C:\\Program Files\\Altium Designer\\System\\NavImages\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumSystemNavPages : TDynamicString;  
__Description __  
This function returns the path to the Altium System Nav Pages folder for example C:\\Program Files\\Altium Designer\\System\\NavPages\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLibraryVHDL87 : TDynamicString;  
__Description __  
This function returns the path to the Altium Library VHDL 87 folder for example C:\\Program Files\\Altium Designer\\Library\\VHDL\\IEEE87\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLibraryVHDL93 : TDynamicString;  
__Description __  
This function returns the path to the Altium Library VHDL93 folder for example C:\\program files\\Altium Designer\\library\\VHDL\\IEEE93\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLibraryVerificVHDL87 : TDynamicString;  
__Description __  
This function returns the path to the Altium Library Verific VHDL87 folder for example c:\\program files\\Altium Designer\\library\\VHDL\\VHDL87\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLibraryVerificVHDL93 : TDynamicString;  
__Description __  
This function returns the path to the Altium Library Verific VHDL93 folder for example c:\\program files\\Altium Designer\\library\\VHDL\\VHDL93\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumSynthesis : TDynamicString;  
__Description __  
This function returns the path to the Altium Synthesis folder, for example c:\\program files\\Altium Designer\\library\\VHDL\_LIB\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLibraryEDIF : TDynamicString;  
__Description __  
This function returns the path to the Altium Library EDIF folder for example c:\\program files\\Altium Designer\\library\\EDIF\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLibraryVHDL : TDynamicString;  
__Description __  
This function returns the path to the Altium Library VHDL folder for example c:\\program files\\Altium Designer\\library\\VHDL\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLibraryVHDLModels : TDynamicString;  
__Description __  
This function returns the path to the Altium Library VHDL Models folder for example c:\\program files\\Altium Designer\\library\\VHDL\\Models\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumLibraryLMF : TDynamicString;  
__Description __  
This function returns the path to the Altium Library LMF folder for example c:\\program files\\Altium Designer\\library\\EDIF\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumConstraintFiles : TDynamicString;  
__Description __  
This function returns the path to the Altium Constraint Files folder for example c:\\program files\\Altium Designer\\library\\FPGA\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumDeviceConstraintFiles : TDynamicString;  
__Description __  
This function returns the path to the FPGA Device Constraint Files folder for example c:\\program files\\Altium Designer\\library\\FPGA\\DeviceConstraintFiles\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_AltiumDeviceImages : TDynamicString;  
__Description __  
This function returns the path to the Altium Device Images folder for example c:\\program files\\Altium Designer\\library\\deviceimages\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_ApplicationData : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and settings\\UserName\\Application Data folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_CommonAllUserApplicationData : TDynamicString;  
__Description __  
This function returns the path to the Common All User Application Data folder for example C:\\Documents and Settings\\All Users\\Application Data\\Altium Designer\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_CommonApplicationData : TDynamicString;  
__Description __  
This function returns the path to the Common Application data folder for example C:\\Documents and Settings\\User Name\\Application Data\\Altium Designer\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_CommonDocumnetTemplates : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Templates folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_CommonLocalApplicationData : TDynamicString;  
__Description __  
This function returns the path to the Common Local Application data folder for example C:\\Documents and Settings\\User Name\\Application Data\\Altium Designer\\\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_CommonProgramFiles : TDynamicString;  
__Description __  
This function returns the path to the C:\\Program Files\\Common Files folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_CommonStartup : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\All Users\\Start Menu folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_CommonStartupPrograms : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\All Users\\Start Menu\\Programs folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_CommonFavorites : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\All Users\\Favorites folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_ControlPanel : TDynamicString;  
__Description __  
This function returns the path to the Control Panel folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_DesignExamples : TDynamicString;  
__Description __  
This function returns the path to the Design Examples folder\. Example C:\\Program Files\\Altium\\Examples\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_DesignTemplates : TDynamicString;  
__Description __  
This function returns the path to the DesignTemplates folder\. Example C:\\Program Files\\Altium\\Templates\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_Desktop : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Desktop folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_DesktopLocation : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Desktop folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_Favorites : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Cookies folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_Fonts : TDynamicString;  
__Description __  
This function returns the path to the folder where fonts are stored\. For example, C:\\WinNT\\Fonts  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_InstalledPrinters : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\PrintHood folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_Internet : TDynamicString;  
__Description __  
This function returns the path to the folder where the internet browser software is located in\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_InternetCookies : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Cookies folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_InternetHistory : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Local Settings\\History folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_InternetTemporaryFiles : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Local Settings\\Temporary Internet Files folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_LocalApplicationData : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and settings\\UserName\\Local Settings\\Application Data folder  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_MyComputer : TDynamicString;  
__Description __  
This function returns the path to the MyComputer folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_MyDesigns : TDynamicString;  
__Description __  
This function returns the path to the MyDesigns folder\. Example C:\\Documents and Settings\\UserName\\My Documents\\My Designs  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_MyDocuments : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Local Settings\\My Documents folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_MyMusic : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Local Settings\\My Music folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_MyNetworkPlaces : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\NetHood folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_MyPictures : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Local Settings\\My Pictures folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_NetworkRoot : TDynamicString;  
__Description __  
This function returns the path to the Network Root directory\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_NonLocalizedStartupPrograms : TDynamicString;  
__Description __  
This function returns the path to the Non Localized Startup Programs folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_Printers : TDynamicString;  
__Description __  
This function returns the path to the Printers folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_Profile : TDynamicString;  
__Description __  
This function returns the path to the C:\\Program Files\\UserName\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_Programs : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Start Menu\\Programs folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_ProgramFiles : TDynamicString;  
__Description __  
This function returns the path to the C:\\Program Files folder  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_Recent : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Recent folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_Recovery : TDynamicString;  
__Description __  
This function returns the path to the Altium Recover folder\. Example C:\\Documents and Settings\\UserName\\Application Data\\Recovery\\  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_RecycleBin : TDynamicString;  
__Description __  
This function returns the path to the Recycle Bin\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_SendTo : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\SendTo folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_StartMenuItems : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\UserName\\Recent folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_SystemFolder : TDynamicString;  
__Description __  
This function returns the path to the C:\\WINNT\\System32 folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_TemplatesForAllUsers : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and Settings\\All Users\\Templates folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_Temporary : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and settings\\UserName\\Local Settings\\Temp\\ folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_TemporarySlash : TDynamicString;  
__Description __  
This function returns the path to the C:\\Documents and settings\\UserName\\Local Settings\\Temp\\ folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_UserStartMenuItems : TDynamicString;  
__Description__  
This function returns the path to the C:\\Documents and Settings\\UserName\\Recent folder\.  
__See also__  
Special Folder Paths


__Declaration__  
Function SpecialFolder\_WindowsFolder : TDynamicString;  
__Description __  
This function returns the path to the C:\\WINNT folder\.  
__See also__  
Special Folder Paths



__Declaration__  
Function Center\(Const S : TDynamicString; Width : Integer\) : TDynamicString;  
__Description __  
Return a string centered in a blank string of specified width\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function CenterCh  \(Const S : TDynamicString; Ch : Char; Width : Integer\) : TDynamicString;  
__Description __  
Returns a string centered in a string of character Ch, with specified width\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function CharStr   \(Ch : Char; Len : Integer\) : TDynamicString;  
__Description __  
Returns a string of length len filled with Ch  
__See also__  
String Manipulation Routines


__Declaration__  
Function  CropStringToLength        \(Const StringToCrop : TDynamicString; Const MaximumLength : Integer\) : TDynamicString;  
__Description __  
The CropStringToLength function removes leading and trailing spaces and control characters from the given string StringToCrop\. The MaximumLength parameter specifies the string from index 0 to MaximumLength that will be returned by the function\. The remaining portion of the string is chopped\.  
__See also__  
String Manipulation Routines


__Declaration__  
Procedure GeneralStringInc \(Var S : TString; Const IncValue : TDynamicString\);  
__Description __  
The GeneralStringInc procedure analyses the S parameter to determine if it has a number value embedded\. If there is a number in the string then it increments the existing number value by one\.\.  
__Example__

1

S := 'Part1';

2

GeneralStringInc\(S,'4'\);

3

//Part5

__See also__  
String Manipulation Routines


__Declaration__  
Function  GetStringFromBoolean      \(B : Boolean \) : TDynamicString;  
__Description __  
The GetStringFromBoolean function returns a ‘True’ if the B parameter is true otherwise a ‘False’ is returned\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function  GetStringFromInteger \(N : Integer\) : TDynamicString;  
__Description __  
The GetStringFromInteger function converts any integer type to a string\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function  IndentString\(Indent : Integer\) : TDynamicString;  
__Description __  
The function returns you a string which specifies the amount of indentation as white spaces \(\#32\) in this string\. So an indent of 4 produces a string of four white spaces for example\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function  LeftJust\(Const S : TDynamicString; Width : Integer\) : TDynamicString;  
__Description __  
The LeftJust function left justifies a string by padding the string with \(Width \- Length of String\) white spaces to the right of this string\.  
__Example__

1

S := LeftJust\('smith',9\) \+ '\.';

2

//s := ‘smith    \.’ \(four empty spaces between the word ‘smith’ and the fullstop ’\.’\)

__See also__  
String Routines


__Declaration__  
Function PadLeft\(S : TDynamicString; Len : Integer\) : TDynamicString;  
__Description __  
Returns a string left\-padded to length len with blanks\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function PadLeftCh \(S : TDynamicString; Ch : Char; Len : Integer\) : TDynamicString;  
__Description __  
Returns a string left\-padded to length len with the specified character, Ch\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function PadRight\(S : TDynamicString; Len : Integer\) : TDynamicString;  
__Description __  
Returns a string right\-padded to length len with blanks\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function PadRightCh\(S : TDynamicString; Ch : Char; Len : Integer\) : TDynamicString;          
__Description __  
Returns a string right\-padded to length specified by the len parameter and with Ch characters\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function SameString \(Const S1,S2 : TDynamicString; CaseSensitive : Boolean\) : Boolean;  
__Description __  
This SameString function compares two strings and depending on the CaseSensitive parameter returns a boolean result\. If CaseSensitive is set to false, then the two strings, ‘aaa’ and ‘AaA’ are considered the same\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function StringsEqual\(S1,S2 : TDynamicString\) :Boolean;  
__Description __  
This SameString function compares two strings and checks whether Strings S1 and S2 have equal lengths and have the same contents\.  
__See also__  
String Manipulation Routines


__Syntax__  
Function StringReplace\(const S, OldPattern, NewPattern: string; Flags: TReplaceFlags\): string;  
__Description__  
Basically this function returns a string with occurrences of one substring replaced by another substring\. The StringReplace replaces occurrences of the substring specified by OldPattern with the substring specified by NewPattern\.  
__Parameters__  
S is the source string, whose substrings are changed\.  
OldPattern is the substring to locate and replace with NewPattern\.  
NewPattern is the substring to substitute for occurrences of OldPattern\.  
Flags is a set of flags that govern how StringReplace locates and replaces occurrences of OldPattern\. If Flags does not include rfReplaceAll, StringReplace only replaces the first occurrence of OldPattern in S\. Otherwise, StringReplace replaces all instances of OldPattern with NewPattern\. If the Flags parameter includes rfIgnoreCase, the comparison operation is case insensitive\.  
__Notes__  
Type  
  TReplaceFlags = set of \(rfReplaceAll, rfIgnoreCase\);  
__Example__  
Result := StringReplace\(AKeys, ADelimiter, cDatabase\_KeyFieldDelimiter, \[rfReplaceAll\]\);  
__See also__  
String Manipulation routines


__Declaration__  
Function StrToInt\(const S: string\): Integer;  
__Description __  
The StrToInt function converts the string S, which represents an integer\-type number in either decimal or hexadecimal notation, into a number\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function TrimLead  \(Const S : TDynamicString\) : TDynamicString;  
__Description __  
Returns a string with leading white space removed\.  
__See also__  
String Manipulation Routines


__Declaration__  
Function TrimTrail \(Const S : TDynamicString\) : TDynamicString;  
__Description __  
Returns a string with trailing white space removed\.  
__See also__  
String Manipulation Routines



__Declaration__  
Function DateString \(Const DateRecord   : TDate\) : TDynamicString;  
__Description __  
The DateString function returns a TString representing a date in ‘12\-Jan\-1985’ format\.  
__See also__  
Time and Date Routines


__Declaration__  
Procedure GetCurrentDate     \(Var   DateRecord   : TDate\);  
__Description __  
The GetCurrentDate procedure is based on the Window API’s DecodeDate procedure which breaks the value specified as the Date parameter into Year, Month, and Day values\. If the given TDateTime value is less than or equal to zero, the year, month, and day return parameters are all set to zero\.  
__See also__  
Time and Date Routines


__Declaration__  
Function  GetCurrentDateString : TDynamicString;  
__Description __  
The GetCurrentDateString function returns a TString representing date in ‘12\-Jan\-1985’ format  
__See also__  
Time and Date Routines


__Declaration__  
Function GetCurrentTimeString : TDynamicString;  
__Description __  
The GetCurrentTimeString function returns a TString representing a time of day in HH:MM:SS format\.  
__See also__  
Time and Date Routines


__Declaration__  
Procedure GetCurrentTimeRec \(Var TimeRecord : TTime\);  
__Description __  
The GetCurrentTimeRec procedure is based on WinAPI’s DecodeTime function which breaks the TDateTime record into hours, minutes, seconds, and milliseconds\.  
__See also__  
Time and Date Routines


__Declaration__  
Function  GetDateAndTimeStamp : TDynamicString;  
__Description __  
This function returns the string containing the current date and the time\.  
__See also__  
Time and Date Routines


__Declaration__  
Procedure GetElapsedTime \(Const Start : TTime; Const Stop : TTime;Var Elapsed : TTime\);  
__Description __  
The GetElapsedTime procedure returns the Elapsed value in seconds between the Start and Stop timing intervals\.  
__See also__  
Time and Date Routines


__Declaration__  
Procedure GetElapsedTimeDate \(Const Start     : TTime;  
                              Const Stop      : TTime;  
                              Var   Elapsed   : TTime;  
                              Const StartDate : TDate;  
                              Const StopDate  : TDate\);  
__Description __  
The GetElapsedTimeDate procedure returns the Elapsed value derived from the StartDate, StopDate dates and Start, Stop times\. The results can be retrieved as a string by the TimeString\_Elapsed function\.  
__See also__  
Time and Date Routines


__Declaration__  
Function  GetFileDateString\(Const AFileName : TDynamicString\) : TDynamicString;  
__Description __  
The GetCurrentDateString function returns a String representing date in ‘12\-Jan\-1985’ format for example\.  
__See also__  
Time and Date Routines


__Declaration__  
Function GetMilliSecondTime : Integer;  
__Description __  
The GetMilliSecondTime function retrieves the number of milliseconds that have elapsed since Windows was started\.  
__See also__  
Time and Date Routines


__Declaration__  
Function  MakeDateAndTimeStampedFileName\(BaseName : TDynamicString\) : TDynamicString;  
__Description __  
This function returns the date and time inserted in the base file name string\.  
__See also__  
Time and Date Routines


__Declaration__  
Procedure SecondsToTimeRecord\(Var TimeRecord : TTime; Const Seconds : Integer\);  
__Description __  
This procedure does the reverse of the TimeRecordToSeconds procedure\. It converts the seconds information into the TTime structure type\.  
__See also__  
Time and Date Routines


__Declaration__  
Function  TimeString\_Elapsed \(Const TimeRecord   : TTime\) : TDynamicString;  
__Description __  
This function returns the string containing the Time information that has elapsed\. To find the timing information, invoke the GetElapsedTimeDate or GetElapsedTime function\.  
__Example__

1

Var

2

   ElapsedTime : TTime;

3

Begin

4

   GetCurrentTimeRec \(EndTime\);

5

   GetCurrentDate \(EndDate\);

6

   GetElapsedTimeDate \(StartTime, EndTime, ElapsedTime, StartDate, EndDate\);

7

   ShowInfo\('Time Elapsed : ' \+ TimeString\_Elapsed\(ElapsedTime\)\);

8

End;

__See also__  
Time and Date Routines


__Declaration__  
Function  TimeString         \(Const TimeRecord   : TTime\) : TDynamicString;  
__Description __  
The TimeString function returns a TString representing a time of day in HH:MM:SS format\.  
__See also__  
Time and Date Routines


__Declaration__  
Procedure TimeRecordToSeconds\(Const TimeRecord   : TTime;  Var   Seconds      : Integer\);  
__Description __  
This procedure converts a TTime type structure into number of seconds\. This procedure is used for GetElapsedTime and GetElapsedTimeDate procedures\.  
__See also__  
Time and Date Routines


__Declaration__  
Procedure WaitMilliSecondDelay\(N : Integer\);  
__Description __  
The WaitMilliSecondDelay function provides a delay in the code in milli\-seconds as specified by the N integer value\. This is useful if a function in the software needs delaying for a while before doing something else giving the software a chance to catch up\. This function uses the GetMilliSecondTime function\.  
__Example__  
WaitMilliSecondDelay\(1000\); // waits for 1 second\. 1000 milliseconds = 1 second\.  
__See also__  
Time and Date Routines


Function  ClientAPI\_GetPrefAnimatedPanels                                    : Boolean;  
Function  ClientAPI\_GetPrefSaveToolsLayout                                   : Boolean;  
Function  ClientAPI\_GetPrefAutoTransparency                                  : Boolean;  
Function  ClientAPI\_GetPrefDynamicAutoTransparency                           : Boolean;  
Function  ClientAPI\_GetPrefSuppressStartupScreen                             : Boolean;  
Function  ClientAPI\_GetPrefTransparencyHighest                               : Integer;  
Function  ClientAPI\_GetPrefTransparencyLowest                                : Integer;  
Function  ClientAPI\_GetPrefTransparencyForce                                 : Integer;  
Function  ClientAPI\_GetPrefPopupPanelDelay                                   : Integer;  
Function  ClientAPI\_GetPrefHidePanelDelay                                    : Integer;  
Function  ClientAPI\_GetPrefAnimatedPanelSpeed                                : Integer;  
Function  ClientAPI\_GetPrefPathInTitleBar                                    : Boolean;  
Function  ClientAPI\_GetPrefUseShadow                                         : Boolean;  
Function  ClientAPI\_GetPrefUseLuna                                           : Boolean;  
Function  ClientAPI\_GetPrefHideFloatingPanels                                : Boolean;  
Function  ClientAPI\_GetPrefRestoreOpenDocuments                              : Boolean;  
Function  ClientAPI\_GetPrefOpenTasksIfNothingOpen                            : Boolean;  
Function  ClientAPI\_GetPrefHideBinderViewTabs                                : Boolean;  
Function  ClientAPI\_GetPrefNoRestoreKindCount                                : Integer;  
Procedure ClientAPI\_GetPrefNoRestoreKind                       \(Index        : Integer; Buffer : PChar\);  
   
Procedure ClientAPI\_SetPrefAnimatedPanels                      \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefSaveToolsLayout                     \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefAutoTransparency                    \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefDynamicAutoTransparency             \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefSuppressStartupScreen               \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefTransparencyHighest                 \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefTransparencyLowest                  \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefTransparencyForce                   \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefPopupPanelDelay                     \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefHidePanelDelay                      \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefAnimatedPanelSpeed                  \(Value        : Integer\);  
Procedure ClientAPI\_SetPrefPathInTitleBar                      \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefUseShadow                           \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefUseLuna                             \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefHideFloatingPanels                  \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefRestoreOpenDocuments                \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefOpenTasksIfNothingOpen              \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefHideBinderViewTabs                  \(Value        : Boolean\);  
Procedure ClientAPI\_SetPrefNoRestoreKindClear;  
Procedure ClientAPI\_SetPrefNoRestoreKindAdd                    \(Value        : PChar\);  
Function  ClientAPI\_GetPrefRememberFormForDocKind                            : Boolean;  
Procedure ClientAPI\_SetPrefRememberFormForDocKind              \(Value        : Boolean\);  
Procedure ClientAPI\_SetAutoShowComponentSymbols                \(Value        : Boolean\);  
Function  ClientAPI\_GetAutoShowComponentSymbols                              : Boolean;  
   
   
Procedure ClientAPI\_ShowProductStartup \(Bitmap       : TDynamicString\);  
Procedure ClientAPI\_HideProductStartup;  
Procedure ClientAPI\_AddStartupMessage  \(S            : TDynamicString\);  
Procedure ClientAPI\_AddShutdownMessage \(S            : TDynamicString\);  
   
Procedure ClientAPI\_Synchronize \(Const ASync : IThreadSynchronize\);  
Procedure ClientAPI\_CheckSynchronize;  
   
Function ClientAPI\_GetCurrentOutputGenerator : IUnknown;  
Procedure ClientAPI\_SetCurrentOutputGenerator\(Const Generator : IUnknown\);  
   
Function  ClientAPI\_GetBuiltInNavigationBar          : Boolean;  
Procedure ClientAPI\_SetBuiltInNavigationBar   \(Value : Boolean\);  
Function  ClientAPI\_GetAlwaysShowNavBarInTasks       : Boolean;  
Procedure ClientAPI\_SetAlwaysShowNavBarInTasks\(Value : Boolean\);  
\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}  
\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}  
Function  ClientAPI\_GetFavoritesThumbnailSize       : TSize;  
Procedure ClientAPI\_SetFavoritesThumbnailSize\(Value : TSize\);  
\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}  
\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}  
Function  ClientAPI\_GetGroupingInDocumentsBar           : TDocumentsBarGrouping;  
Procedure ClientAPI\_SetGroupingInDocumentsBar    \(Value : TDocumentsBarGrouping\);  
Function  ClientAPI\_GetEqualButtonsInDocumentsBar       : Boolean;  
Procedure ClientAPI\_SetEqualButtonsInDocumentsBar\(Value : Boolean\);  
Function  ClientAPI\_GetAutoHideDocumentsBar             : Boolean;  
Procedure ClientAPI\_SetAutoHideDocumentsBar      \(Value : Boolean\);  
Function  ClientAPI\_GetMultilineDocumentsBar            : Boolean;  
Procedure ClientAPI\_SetMultilineDocumentsBar     \(Value : Boolean\);  
Function  ClientAPI\_GetMiddleClickClosesDocumentTab       : Boolean;  
Procedure ClientAPI\_SetMiddleClickClosesDocumentTab\(Value : Boolean\);  
Function  ClientAPI\_GetIntegratedHelpSystem             : Boolean;  
Procedure ClientAPI\_SetIntegratedHelpSystem      \(Value : Boolean\);  
Function  ClientAPI\_GetUseSystemLocaleLanguage          : Boolean;  
Procedure ClientAPI\_SetUseSystemLocaleLanguage   \(Value : Boolean\);  
Function  ClientAPI\_GetUseLocalizedDialogs              : Boolean;  
Procedure ClientAPI\_SetUseLocalizedDialogs       \(Value : Boolean\);  
Function  ClientAPI\_GetUseLocalizedResources            : Boolean;  
Procedure ClientAPI\_SetUseLocalizedResources     \(Value : Boolean\);  
Function  ClientAPI\_GetVSStyleCtrlTab                   : Boolean;  
Procedure ClientAPI\_SetVSStyleCtrlTab            \(Value : Boolean\);  
Function  ClientAPI\_GetActivateLastActiveOnClose        : Boolean;  
Procedure ClientAPI\_SetActivateLastActiveOnClose \(Value : Boolean\);  
\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}  
   
Function ClientAPI\_GetHelpFileAndTopic\(Const AHelpTopicID : WideString; Out HelpFileName, HelpTopicName : WideString\) : Boolean;  
   
Function  ClientAPI\_UpdateFont\(Var Font : TLogFont\) : LongBool;  
Procedure ClientAPI\_SetErrorInfo\(Const ErrorMsg, ErrorReport : WideString; ErrorAddr : Pointer\);  
Procedure ClientAPI\_ClearErrorInfo;  
Procedure ClientAPI\_HandleException\(Const Message : WideString\);  
   
Procedure ClientAPI\_QueryUpdatesInfo        \(Var   UpdatesURL, UpdatesNetworkPath : WideString; Var UpdatesUseNetworkPath : LongBool; Var   UpdatesPathToDownloadUpdates : WideString;  
Var CheckFrequency : TWebUpdate\_CheckFrequency\); Stdcall;  
   
Procedure ClientAPI\_SetUpdatesInfo          \(Const UpdatesURL, UpdatesNetworkPath : WideString;     UpdatesUseNetworkPath : LongBool; Const UpdatesPathToDownloadUpdates : WideString;  
        CheckFrequency : TWebUpdate\_CheckFrequency\); Stdcall;

## 子章节

- [System API: Low Level Routines Reference](01-System_API_Low_Level_Routines_Reference.md/README.md)
