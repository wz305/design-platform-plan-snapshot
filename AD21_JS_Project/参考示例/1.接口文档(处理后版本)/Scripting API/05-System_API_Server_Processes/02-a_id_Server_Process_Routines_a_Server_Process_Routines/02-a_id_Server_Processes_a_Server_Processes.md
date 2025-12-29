### <a id="Server_Processes"></a>Server Processes

Each server process has a process identifier\. The process identifier is made up of two parts separated by a colon\.  The first part of the process identifier indicates the server that defines the process, and the second part is the process name\.

For example, the process __Sch:ZoomIn__ is provided by the Schematic Editor server\.  When this process is launched, either by selecting a menu item, pressing a hot key or activating a toolbar button \(which are all defined as process launchers in the Altium Designer\), it will perform the task of zooming in on the currently active schematic sheet\.

A process is implemented as a __server name:server process name__ string\. Processes are stored in a command launcher table maintained by the server\. Every time you execute a process via the user interface, it consults the appropriate server’s command table to fetch the process string and then sends this string over to the server for the server to determine which process to execute\. These processes are stored in corresponding server installation text files with an INS extension\.