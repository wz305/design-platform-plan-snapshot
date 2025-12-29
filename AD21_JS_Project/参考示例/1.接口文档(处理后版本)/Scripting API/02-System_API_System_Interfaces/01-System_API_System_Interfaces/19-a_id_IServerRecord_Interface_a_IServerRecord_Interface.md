### <a id="IServerRecord_Interface"></a>IServerRecord Interface

__Overview__  
This interface extracts the servers installation files information from the \\System folder which has a list of server installation files\. That is each server installation file \(with an INS extension\) correspond to a IServerRecord itnerface\.

Since this IServerRecord interface is inside the Client object, invoke the Client\.GetServerRecordCount to get the number of server installation files, and then assign the Client\.GetServerRecord\(RecordCount\) to a IServerRecord variable where you can retrieve data associated with an installation file\.

To find more information about each server module installed in Altium Designer, invoke the IClient\.GetServerModule interface\.

__IServerRecord Methods__  
GetVersion  
GetCopyRight  
GetDate  
GetSystemExtension  
GetGeneralInfo  
GetName  
GetInsPath  
GetExePath  
GetDescription  
GetServerFileExist  
GetRCSFilePath  
GetWindowKindCount  
GetCommandCount  
GetCommand  
GetWindowKind  
GetWindowKindByName  
GetPanelInfo  
GetPanelInfoByName  
GetPanelInfoCount

__IServerRecord Properties__

__Example__  
PCB\_SR := Client\.GetServerRecordByName\('PCB'\);  
__See also__  
IClient interface  
IServerModule interface  
CS server example in the \\Developer Kit\\Examples\\DXP\\ClientServer Interfaces\\ folder\.

#### IServerRecord Methods

##### GetCommand method

\(IServerRecord interface\)  
__Syntax__  
Function GetCommand\(Index : Integer\) : IServerProcess;  
__Description__  
The method returns the IServerProcess interface\. Used in conjunction with the GetCommandCount function\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetCommandCount method

\(IServerRecord interface\)  
__Syntax__  
Function GetCommandCount : Integer;  
__Description__  
The method returns the number of commands \(Process launchers\) this server supports\. Used in  
conjunction with the GetCommand function  
__Example__  
   
__See also__  
IServerRecord interface

##### GetCopyRight method

\(IServerRecord interface\)  
__Syntax__  
Function GetCopyRight : PChar;  
__Description__  
The method returns the copyright string\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetDescription method

\(IServerRecord interface\)  
__Syntax__  
Function GetDescription : PChar;  
__Description__  
The method returns the description string\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetExePath method

\(IServerRecord interface\)  
__Syntax__  
Function GetExePath : PChar;  
__Description__  
The method returns the path to the server file\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetDate method

\(IServerRecord interface\)  
__Syntax__  
Function GetDate : PChar;  
__Description__  
The method returns the date string associated with the server installation file\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetGeneralInfo method

\(IServerRecord interface\)  
__Syntax__  
Function GetGeneralInfo : PChar;  
__Description__  
The method returns the general info string for the server record associated with a server\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetInsPath method

\(IServerRecord interface\)  
__Syntax__  
Function GetInsPath : PChar;  
__Description__  
The method returns the path to the installation file\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetName method

\(IServerRecord interface\)  
__Syntax__  
Function GetName : PChar;  
__Description__  
The method returns the name of the server\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetPanelInfo method

\(IServerRecord interface\)  
__Syntax__  
Function GetPanelInfo \(Index : Integer\) : IServerPanelInfo;  
__Description__  
The method returns the indexed panel information\. This is to be used in conjunction with the GetPanelInfoCount method\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetPanelInfoByName method

\(IServerRecord interface\)  
__Syntax__  
Function GetPanelInfoByName \(Const Name  : Widestring\) : IServerPanelInfo;  
__Description__  
The method returns the panel information interface by the panel name\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetPanelInfoCount method

\(IServerRecord interface\)  
__Syntax__  
Function GetPanelInfoCount : Integer;  
__Description__  
The method returns the number of panels used for the server module\. This is to be used in conjunction with the GetPanelInfo method\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetRCSFilePath method

\(IServerRecord interface\)  
__Syntax__  
Function GetRCSFilePath : PChar;  
__Description__  
The method returns the path to the resources file\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetSystemExtension method

\(IServerRecord interface\)  
__Syntax__  
Function GetSystemExtension : LongBool;  
__Description__  
The method returns the file system extension string\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetVersion method

\(IServerRecord interface\)  
__Syntax__  
Function GetVersion : PChar;  
__Description__  
The method returns the version string associated with the server installation file\.  
__Example__

01

RecordCount := Client\.GetServerRecordCount;

02

For I := 0 to RecordCount \- 1 Do

03

Begin

04

    // obtain details of the DXP\.INS file

05

    ServerRecord := Client\.GetServerRecord\(I\);

06

    If ServerRecord\.GetName = 'Client' Then

07

    Begin

08

        Version := ServerRecord\.GetVersion;

09

        Break;

10

    End;

11

End;

__See also__  
IServerRecord interface

##### GetServerFileExist method

\(IServerRecord interface\)  
__Syntax__  
Function GetServerFileExist : LongBool;  
__Description__  
The method returns the Boolean value whether the server file \(with a DLL\) exists or not\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetWindowKind method

\(IServerRecord interface\)  
__Syntax__  
Function GetWindowKind      \(Index : Integer\) : IServerWindowKind;  
__Description__  
The method returns the IServerWindowKind interface\. Used in conjunction with the GetWindowKindCount function\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetWindowKindCount method

\(IServerRecord interface\)  
__Syntax__  
Function GetWindowKindCount : Integer;  
__Description__  
The method returns the number of document kinds the server supports\.  
__Example__  
   
__See also__  
IServerRecord interface

##### GetWindowKindByName method

\(IServerRecord interface\)  
__Syntax__  
Function GetWindowKindByName\(Name  : PChar  \) : IServerWindowKind  
__Description__  
The method returns the IServerWindowKind interface depending on the DocumentKind Name parameter\.  
__Example__  
   
__See also__  
IServerRecord interface  
IServerWindowKind interface