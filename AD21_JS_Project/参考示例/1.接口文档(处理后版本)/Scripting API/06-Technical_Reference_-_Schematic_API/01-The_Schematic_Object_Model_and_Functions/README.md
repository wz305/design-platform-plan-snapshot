# The Schematic Object Model and Functions

The Schematic API consists of the Schematic Object model and Schematic API functions\. The Schematic API is made accessible by the Schematic Editor in Altium Designer\. The Schematic design object interfaces and methods are available in all script languages supported by Altium Designer\.


An interface is basically a list of methods that a class declares it implements — that is, each method in the interface is implemented in the corresponding class\. While interfaces are declared like classes, they cannot be directly instantiated and do not have their own method definitions\. The Schematic design objects are wrapped by their corresponding Schematic interfaces, which makes it possible to manipulate those objects by scripts and server code\.


- The ISch\_ServerInterface interface is the main interface in the Schematic API and represents the main Schematic Editor object\. The ISch\_ServerInterface interface is the gateway to fetching other Schematic objects\.
- The ISch\_GraphicalObject interface is a generic interface used for all Schematic design object interfaces \(inherited from the ISch\_BasicContainer interface\)\.
- The ISch\_Document, ISch\_Sheet and ISch\_Lib interfaces represent an existing Schematic or library documents\.


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


Schematic script examples that demonstrate the use of Schematic interfaces can be found in the \\Examples\\Scripts\\DelphiScript\\SCH folder\.


- [Schematic API System Interfaces](https://www.altium.com/documentation/altium-designer/schematic-api-system-interfaces?version=21)
- [Schematic API Component Mapping](https://www.altium.com/documentation/altium-designer/schematic-api-component-mapping?version=21)
- [Schematic API Design Objects Interfaces](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21)
- [Schematic API Constants](https://www.altium.com/documentation/altium-designer/schematic-api-constants?version=21)
- [Schematic API Types](https://www.altium.com/documentation/altium-designer/schematic-api-types?version=21)
- [Schematic API Functions](https://www.altium.com/documentation/altium-designer/schematic-api-functions?version=21)


- System API Object Model \- refer to the [System API Reference](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21)
- PCB Object Model \- refer to the [PCB API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)
- Workspace Manager Object Model  \- refer to the [Workspace Manager API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-workspace-manager-api?version=21)
- Integrated Library Object Model \- refer to the [Integrated Library API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-integrated-library-api?version=21)

## 子章节

- [Object Interfaces](01-Object_Interfaces.md.md)
- [References for the Schematic API](02-References_for_the_Schematic_API.md.md)
- [Separate references for other Altium Designer APIs](03-Separate_references_for_other_Altium_Designer_APIs.md.md)
