# <a id="Server_Process_Routines"></a>Server Process Routines

A server provides its services in the Altium Designer environment\. The Client module within the Altium Designer interprets the tasks in terms of server processes and then delegates these processes to the appropriate servers\.

For example when a user is clicking on the Schematic menu to place a wire, the Client module interprets this action as a 'PlaceWire' process and delegates the process to the Schematic Editor server\. The Schematic server responds by executing the process\. The functionality of a server that is installed in the Altium Designer  is exposed by that server's processes and its exposed functions\.

Generally a process is executed by selecting a command which is a packaged process launcher \(such as clicking on a toolbar button, or pressing a hot key or selecting a menu item\) in Altium Designer\. Up to three different types of process launchers can be used to launch the same process\.

You can manually run a process by going to the Run Process menu item in the System menu within


Each server process has a process identifier\. The process identifier is made up of two parts separated by a colon\.  The first part of the process identifier indicates the server that defines the process, and the second part is the process name\.

For example, the process __Sch:ZoomIn__ is provided by the Schematic Editor server\.  When this process is launched, either by selecting a menu item, pressing a hot key or activating a toolbar button \(which are all defined as process launchers in the Altium Designer\), it will perform the task of zooming in on the currently active schematic sheet\.

A process is implemented as a __server name:server process name__ string\. Processes are stored in a command launcher table maintained by the server\. Every time you execute a process via the user interface, it consults the appropriate server’s command table to fetch the process string and then sends this string over to the server for the server to determine which process to execute\. These processes are stored in corresponding server installation text files with an INS extension\.


A parametric server process allows the information, a process needs, to be passed when the process is called\. This ability to be able to pass process parameters allows direct control over the operation of a process\. For parametric processes, each parameter has a value assigned and this parameter / value block is represented as Parameter = Name\.  
For example FileName = C:\\Program Files\\TestFile\.Txt\.

To concatenate several parameters as a whole string, each parameter / value block is separated by the pipe | symbol\.  
For example Parameter1 = Name1 | Parameter2 = Name 2 etc\.

## 子章节

- [<a id="Servers"></a>Servers](01-a_id_Servers_a_Servers.md.md)
- [<a id="Server_Processes"></a>Server Processes](02-a_id_Server_Processes_a_Server_Processes.md.md)
- [<a id="Parametric_Processes"></a>Parametric Processes](03-a_id_Parametric_Processes_a_Parametric_Processes.md.md)
