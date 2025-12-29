#### PCBServer function

To work with PCB design objects, the starting point is to invoke the __PCBServer__ function which returns the __IPCB\_ServerInterface__ interface, which represents the PCB Editor\. With this interface, all other PCB interfaces can be extracted\.

For example to get access to the current PCB document open in Altium Designer, you would invoke the __GetCurrentPCBBoard__ method from the __IPCB\_ServerInterface__ interface object\.

Example: Obtaining the currently open PCB document\.

1

Board := PCBServer\.GetCurrentPCBBoard;

2

  If Board = Nil then Exit;

3

TheFilename := Board\.FileName;

##### Main PCB Interfaces

- The __IPCB\_Primitive__ interface is a generic ancestor interface for all PCB design object interfaces\.
- The __IPCB\_Board__ interface represents an existing PCB document\.
- The __IPCB\_ServerInterface__ interface represents the PCB server object\.

__Script Examples__  
There are PCB script examples in the \\Examples\\Scripts\\DelphiScripts\\PCB folder which demonstrate the use of PCB interfaces\.