### <a id="Servers"></a>Servers

A server provides its services in the Altium Designer environment\. The Client module within the Altium Designer interprets the tasks in terms of server processes and then delegates these processes to the appropriate servers\.

For example when a user is clicking on the Schematic menu to place a wire, the Client module interprets this action as a 'PlaceWire' process and delegates the process to the Schematic Editor server\. The Schematic server responds by executing the process\. The functionality of a server that is installed in the Altium Designer  is exposed by that server's processes and its exposed functions\.

Generally a process is executed by selecting a command which is a packaged process launcher \(such as clicking on a toolbar button, or pressing a hot key or selecting a menu item\) in Altium Designer\. Up to three different types of process launchers can be used to launch the same process\.

You can manually run a process by going to the Run Process menu item in the System menu within