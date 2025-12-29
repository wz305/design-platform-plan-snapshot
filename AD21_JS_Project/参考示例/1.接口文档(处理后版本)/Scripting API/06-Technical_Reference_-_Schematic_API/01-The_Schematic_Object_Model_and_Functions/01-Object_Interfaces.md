### Object Interfaces

An interface is basically a list of methods that a class declares it implements — that is, each method in the interface is implemented in the corresponding class\. While interfaces are declared like classes, they cannot be directly instantiated and do not have their own method definitions\. The Schematic design objects are wrapped by their corresponding Schematic interfaces, which makes it possible to manipulate those objects by scripts and server code\.

#### Main Schematic Object Interfaces

- The ISch\_ServerInterface interface is the main interface in the Schematic API and represents the main Schematic Editor object\. The ISch\_ServerInterface interface is the gateway to fetching other Schematic objects\.
- The ISch\_GraphicalObject interface is a generic interface used for all Schematic design object interfaces \(inherited from the ISch\_BasicContainer interface\)\.
- The ISch\_Document, ISch\_Sheet and ISch\_Lib interfaces represent an existing Schematic or library documents\.

#### SchServer function

To obtain the Schematic interface that represents the Schematic editor object, invoke the SchServer function in a script to return the ISch\_ServerInterface interface\. This object interface obtains the Schematic editor server object so you can then extract data from existing Schematic objects and invoke the Schematic object's methods\.

For example, the SchServer function is highlighted in the code snippet below:

1

Var

2

    Sheet : ISch\_Sheet;

3

Begin

4

    Sheet := <span style="background\-color:\#00FFFF;">SchServer</span>\.GetCurrentSchDocument

5

    If Sheet = Nil then Exit;

6

    // do something here

7

End;

##### Script Examples

Schematic script examples that demonstrate the use of Schematic interfaces can be found in the \\Examples\\Scripts\\DelphiScript\\SCH folder\.