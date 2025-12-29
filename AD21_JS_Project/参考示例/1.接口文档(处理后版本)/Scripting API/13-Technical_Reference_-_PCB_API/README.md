# Technical Reference \- PCB API

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Technical Reference \- PCB API for version 22](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Altium Designer API Reference](https://www.altium.com/documentation/altium-designer/altium-design-software-api-reference?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

The PCB Application Programming Interface \(API\) reference details the object interfaces for PCB objects such as PCB documents and PCB design objects\.

The Altium Designer scripting system implements a subset of the complete Altium Designer API and its Object Interfaces\. The [Altium DXP Developer](https://www.altium.com/en/developer), used for developing Altium Designer server Extensions, has access to the full Altium Designer API via a set of API SDK source units\.

The PCB API consists of the PCB Object model and the API functions\. The PCB Object Model part of the PCB API is made accessible by the PCB Editor\.

The PCB design objects and methods are available in all script languages supported by Altium Designer\. The PCB design objects are wrapped by their corresponding PCB interfaces which makes it possible to manipulate those objects by scripts and server code\.


An interface is basically a list of methods that a class declares it implements — that is, each method in the interface is implemented in the corresponding class\. Interfaces are declared like classes, but cannot be directly instantiated and do not have their own method definitions\.


To work with PCB design objects, the starting point is to invoke the __PCBServer__ function which returns the __IPCB\_ServerInterface__ interface, which represents the PCB Editor\. With this interface, all other PCB interfaces can be extracted\.

For example to get access to the current PCB document open in Altium Designer, you would invoke the __GetCurrentPCBBoard__ method from the __IPCB\_ServerInterface__ interface object\.

Example: Obtaining the currently open PCB document\.

1

Board := PCBServer\.GetCurrentPCBBoard;

2

  If Board = Nil then Exit;

3

TheFilename := Board\.FileName;


- The __IPCB\_Primitive__ interface is a generic ancestor interface for all PCB design object interfaces\.
- The __IPCB\_Board__ interface represents an existing PCB document\.
- The __IPCB\_ServerInterface__ interface represents the PCB server object\.

__Script Examples__  
There are PCB script examples in the \\Examples\\Scripts\\DelphiScripts\\PCB folder which demonstrate the use of PCB interfaces\.


- [PCB API System Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21)
- [PCB API Layer Stack Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21) \- new updated content
- [PCB API Layer Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21) \- new updated content
- [PCB API Design Objects Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-design-objects-interfaces?version=21)
- [PCB API Types](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21)
- [PCB API Constants and Functions](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21)


- System API Object Model \- refer to the [System API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-system-api?version=21)
- Schematic Object Model \- refer to the [Schematic API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)
- Workspace Manager Object Model  \- refer to the [Workspace Manager API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-workspace-manager-api?version=21)
- Integrated Library Object Model \- refer to the [Integrated Library API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-integrated-library-api?version=21)


The PCB Object Model compromises of PCB Object Interfaces and standalone utility functions that allow you to deal with PCB objects from a PCB document in Altium Designer via object interfaces\.

An interface is just a means of access to an object in memory\. To have access to the PCB server and massage certain PCB design objects, you need to invoke the __PCBServer__ function, which extracts the __IPCB\_ServerInterface__ interface\.

The __IPCB\_ServerInterface__ interface is the main interface and contains many interfaces within\. With this interface for example, you can proceed further by iterating for PCB objects on a PCB document\.

A simplified PCB Interfaces hierarchy example:  
IPCB\_Primitive  
    IPCB\_Group  
        IPCB\_Net

The __IPCB\_ServerInterface__ and __IPCB\_Board__ interfaces are two of the main interfaces to deal with when accessing and manipulating a PCB document\.

__See also__  
IPCB\_ServerInterface  
IPCB\_BoardOutline  
IPCB\_Board  
IPCB\_LayerStack  
IPCB\_LayerObject  
IPCB\_InternalPlane  
IPCB\_DrillLayerPair  
IPCB\_MechanicalLayerPairs  
IPCB\_SystemOptions  
IPCB\_InteractiveRoutingOptions  
IPCB\_Arc  
IPCB\_Pad  
IPCB\_Via  
IPCB\_Track  
IPCB\_Connection  
IPCB\_Embedded  
IPCB\_Violation  
IPCB\_Text  
IPCB\_Fill  
IPCB\_Coordinate  
IPCB\_Dimension  
IPCB\_Component  
IPCB\_Polygon  
IPCB\_Net  
IPCB\_LibComponent

## 子章节

- [Object Interfaces](01-Object_Interfaces.md.md)
- [PCBServer function](02-PCBServer_function.md.md)
- [References for the PCB API](03-References_for_the_PCB_API.md.md)
- [Separate references for other Altium Designer APIs](04-Separate_references_for_other_Altium_Designer_APIs.md.md)
- [PCB Object Model](05-PCB_Object_Model.md/README.md)
