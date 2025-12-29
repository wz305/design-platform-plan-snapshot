### <a id="IServerProcess_Interface"></a>IServerProcess Interface

__Overview__  
The IServerProcess interface returns information for commands \(server processes\) in a server installation file;  
·       the command name \(GetOriginalID method\)  
·       the long summary  
·       the number of parameters if any  
·       parameter names if any  
The IServerProcess interface is an aggregate interface used within the IServerRecord interface\.  
__Notes__  
A typical  installation file structure is as follows  
ClientInsFile 1\.0  
Server  
    EditorName        = 'AddOn'  
    EditorExePath     = 'AddOn\.DLL'  
    EditorDescription = 'A demonstratory AddOn module'  
    Version           = 'Version 8\.1\.4\.2763'  
    Date              = '24\-Dec\-2004'  
    HelpAboutInfo     = 'This software is protected by copyright law and international treaties\.'   
    Copyright         = 'Copyright © Altium Limited 2004'   
    Updates           = 'ADVPCB'  
End  
Command Name = 'CountPads'      LongSummary = 'Find how many pads on a PCB document' End  
Command Name = 'RunAPCBProcess' LongSummary = 'Invoke a PCB process'                 End

__IServerProcess Methods__  
GetOriginalId  
GetLongSummary  
GetParameter  
GetParameterCount

__IServerProcess Properties__

__Example__

01

//ServerRecord is a IServerRecord interface

02

CommandCount := ServerRecord\.GetCommandCount;

03

For J := 0 To CommandCount \- 1 Do

04

Begin

05

     //ServerProcess is a IServerProcess interface

06

     ServerProcess := ServerRecord\.GetCommand\(J\);

07

     ReportFile\.Add\('        Process \#' \+ IntToStr\(J \+ 1\) \+ ' Name = '  \+

08

     ServerProcess\.GetOriginalId \+ ' LongSummary = ' \+ ServerProcess\.GetLongSummary\);

09

  

10

     ParameterCount := ServerProcess\.GetParameterCount;

11

     For K := 0 To ParameterCount \- 1 Do

12

         S := S \+ ServerProcess\.GetParameter\(K\) \+ ', ';

13

  

14

     ReportFile\.Add\('        Parameters = ' \+ S\);

15

End;

__Notes__  
All the functions in a server available to the user, such as placing a primitive, changing the zoom level and so on are performed by commands which are pre\-packaged process launchers\. The pre\-packaged process launchers bundle together the process that runs when the command is selected, plus any parameters, bitmaps \(icons\), captions \(the name of an item that displays on a resource\), descriptions and associated shortcut keys\.

When you select a menu item or click on a toolbar button, you are launching a process\. Processes are launched by passing the process identifier to the appropriate server and the server then executes the process\. Processes are defined and implemented in the Commands unit of a server source code project\. The processes are declared in an Installation File \(with an INS extension\)\.

Each process has a process identifier\.  The process identifier is made up of two parts separated by a colon\.  The first part of the process identifier indicates the server that defines the process, and the second part is the process name\.   
For example, the process __Sch:ZoomIn__ is provided by Schematic server\.  When this process is launched, either by selecting a menu item, pressing a hot key or activating a toolbar button \(which are all defined as process launchers\), it will perform the task of zooming in on the currently active schematic sheet\.

When a server is started up for the first time, process procedures or commands registered in the CommandLauncher object within the server modules\.

__See also__  
IServerRecord interface  
ServerProcessReport script in \\Examples\\Scripts\\DXP\\ folder

#### IServerProcess Methods

##### GetLongSummary method

\(IServerProcess interface\)  
__Syntax__  
Function GetLongSummary : WideString;  
__Description__  
The GetLongSummary function returns the Long Summary identifier string\.  
__Example__  
   
__See also__  
IServerProcess interface  
IServerRecord interface

##### GetOriginalId method

\(IServerProcess interface\)  
__Syntax__  
Function GetOriginalId : WideString;  
__Description__  
The GetOriginalID method returns the Process Identifier string for the specified server process\.  
__Example__  
   
__See also__  
IClient interface  
IServerProcess interface

##### GetParameter method

\(IServerProcess interface\)  
__Syntax__  
Function GetParameter\(Index : Integer\) : WideString;  
__Description__  
The GetParameter function returns the indexed parameter string depending on the index parameter\. This is to be used in conjunction with the GetParameterCount method\. A server process can be parametric, and thus can have a number of parameters\.  
__Example__  
__See also__  
IClient interface  
IServerProcess interface  
GetParameterCount method

##### GetParameterCount method

\(IServerProcess interface\)  
__Syntax__  
Function GetParameterCount : Integer;  
__Description__  
The GetParameterCount function returns the number of parameters for the current Process Identifier \(GetOriginalID\)\.  
This is to be used in conjunction with the GetParameter method\.  
__Example__  
   
__See also__  
IClient interface  
IServerProcess interface  
GetParameter method