### <a id="ICommandLauncher_Interface"></a>ICommandLauncher Interface

__Overview__  
The ICommandLauncher interface encapsulates the functionality of launching a command \(which is a pre packaged process\) in Altium Designer\. A command is associated with a user interface item in the server \(Text Editor, Schematic Editor etc\) such as a hot key button, menu item or a toolbar bitmap\. In essence, a server is supported by its set of processes and the processes act as a link between Altium Designer and this server\.

The LaunchCommand method launches a process from the server that this ICommandLauncher interface function is associated with\.

The GetCommandState method retrieves information for the specified command\.

Since a server has a set of processes and these process identifiers are stored in an installation file \(which ends with an INS extension\) and the process launchers that link to specific user interface elements \(also called resources\) and the layout of user interface elements are defined in the resources file \(which ends with a RCS extension\)\.

__ICommandLauncher Methods and Properties Table__

__ICommandLauncher Methods__  
LaunchCommand  
GetCommandState

__ICommandLauncher Properties__

__Notes__  
All the functions in a server available to the user, such as placing a primitive, changing the zoom level and so on are performed by commands which are pre\-packaged process launchers\. The pre\-packaged process launchers bundle together the process that runs when the command is selected, plus any parameters, bitmaps \(icons\), captions \(the name of an item that displays on a resource\), descriptions and associated shortcut keys\.

When you select a menu item or click on a toolbar button, you are launching a process\. Processes are launched by passing the process identifier to the appropriate server and the server then executes the process\. Processes are defined and implemented in the Commands unit of a server source code project\. The processes are declared in an Installation File \(with an INS extension\)\.

Each process has a process identifier\.  The process identifier is made up of two parts separated by a colon\.  The first part of the process identifier indicates the server that defines the process, and the second part is the process name\. 

For example, the process Sch:ZoomIn is provided by Schematic server\.  When this process is launched, either by selecting a menu item, pressing a hot key or activating a toolbar button \(which are all defined as process launchers in the Altium Designer\), it will perform the task of zooming in on the currently active schematic sheet\.

When a server is started up for the first time in Altium Designer, process procedures or commands registered in the CommandLauncher object within the server module are loaded in Altium Designer\.

__See also__  
IClient interface  
IServerModule interface

#### ICommandLauncher Methods

##### GetCommandState

\(ICommandLauncher interface\)  
__Syntax__  
Procedure GetCommandState\(      ACommandName,  
                                AParameters      : PChar;  
                          Const AContext         : IServerDocumentView;  
                          Var   Enabled,  
                                Checked,  
                                Visible          : LongBool;  
                                Caption,  
                                ImageFile        : PChar\);  
__Description__  
The GetCommandState procedure fetches the current snapshot of the server command \(internal server process\) and the parameters are returned for the specified server command name\.  
__Example__

01

ACommandLauncher := AServerModule\.GetCommandLauncher;

02

If ACommandLauncher <> Nil Then

03

Begin

04

    ACommandLauncher\.GetCommandState\(Command,

05

                                     Parameters,

06

                                     View,

07

                                     Enabled,

08

                                     Checked,

09

                                     Visible,

10

                                     Caption,

11

                                     Image\);

12

    // do what you want with the parameters 

13

    // after you have supplied the Command parameter\.

14

End;

__See also__  
IServerModule interface

##### LaunchCommand

\(ICommandLauncher interface\)  
__Syntax__  
Function  LaunchCommand  \(Const ACommandName     : PChar;   
                                AParameters      : PChar;   
                                MaxParameterSize : Integer;   
                                AContext         : IServerDocumentView\) : LongBool;  
__Description__  
This function launches a command from a server module or from Client\. \(Client also has its own command launcher table since Client has its own processes as well\)\.  
The AContext parameter denotes which IServerDocumentView interface to launch the process onto\. If the command can be launched, the function returns a true value\.  
__Example__

1

If StringsEqual\(ServerModule\.ModuleName,'TextEdit'\) Then

2

Begin

3

    ServerModule\.CommandLauncher\.LaunchCommand\('TextEdit:MoveCursorToTopOfDocument',

4

                                                Nil,0,ServerDocument\.View\[0\]\);

5

End;

__See also__  
IServerDocumentView interface