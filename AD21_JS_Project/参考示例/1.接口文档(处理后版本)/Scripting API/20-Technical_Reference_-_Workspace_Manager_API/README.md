# Technical Reference \- Workspace Manager API

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Technical Reference \- Workspace Manager API for version 22](https://www.altium.com/documentation/altium-designer/technical-reference-workspace-manager-api)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Altium Designer API Reference](https://www.altium.com/documentation/altium-designer/altium-design-software-api-reference?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

This section of the Altium Designer API documentation provides a detailed reference of the __Workspace Manager API__ interfaces\.

The Altium Designer scripting system implements a subset of the complete Altium Designer API and its Object Interfaces\. The [Altium DXP Developer](https://www.altium.com/en/developer), used for developing Altium Designer server Extensions, has access to the full Altium Designer API via a set of API SDK source units\.

The WorkSpace Manager \(WSM\) Application Programming Interface reference covers the Workspace manager object interfaces from the Workspace Manager Object Model\.

The workspace manager interfaces exist as long there are associated existing objects in memory, thus when writing a script or server code, you have the responsibility of checking whether the interface you wish to query exists or not before you proceed to invoke the interface's methods\.

You will have to ensure that the design project is compiled first otherwise the workspace manager interfaces are in an invalid state and will be returning nil values\.

The workspace manager provides a bridge between source documents \(such as Schematic documents\) and its corresponding primary implementation documents \(such as PCB documents\)\. This workspace manager provides you information on how a project is structured, and information on nets and its associated net aware objects of source and implementation documents\.

The __IWorkSpace__ interface deals with projects, documents and objects on the open documents\. To use workspace interfaces, the project needs to be compiled first refreshing all the linkages and nets up to date\.


- The __IDMObject__ interface is a generic interface used for all other WorkSpace interfaces\.
- The __IWorkSpace__ interface is the top level interface and contains many interfaces within\. For example the __IWorkSpace__ interface has a __DM\_OpenProject__ function which returns a currently open or currently focused __IProject__ interface\.
- The __IProject__ interface represents the current project in Altium Designer\.
- The __IDocument__ interface represents a document in Altium Designer\.


An important note, there are logical and physical documents; these terms are used to differentiate the documents in multi\-channel projects\. A multi channel design means that a single sheet is referenced repeatedly for a channel design\. This sheet is called a logical document\. A physical document \(usually a PCB document\) has components with unique names within a room which is mapped to a channel on a Schematic sheet\. So a multi channel design translates to multiple rooms with components with unique physical designators on a PCB\.

A physical designator of a PCB component is calculated to have the hierarchy path of a schematic project as well as the logical designator of the associated Schematic component to ensure that this designator for the PCB component is unique\.

__Example__  
Obtaining the project path from the current __IProject__ interface\.

1

// Get WSM interface \(the shell of the WorkSpace Manager interface\)\.

2

WSM := GetWorkSpace;

3

If WSM = Nil Then Exit;

4

Document := WSM\.DM\_Document;

5

If Document = Nil The Exit;

6

Project := Document\.DM\_Project;

__Script Examples__  
There are script examples in the \\Examples\\Scripts\\WSM folder


- [WSM API Document Interface](https://www.altium.com/documentation/altium-designer/wsm-api-document-interface?version=21)
- [WSM API Project Interfaces](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21)
- [WSM API System Interfaces](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21)
- [WSM API Design Objects](https://www.altium.com/documentation/altium-designer/wsm-api-design-objects?version=21)
- [WSM API Types and Constants](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21)


- System API Object Model \- refer to the [System API Reference](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21)
- Schematic Object Model \- refer to the [Schematic API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)
- PCB Object Model  \- refer to the [PCB API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)
- Integrated Library Object Model \- refer to the [Integrated Library API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-integrated-library-api?version=21)


To have access to the workspace interface object which represents the workspace manager in Altium Designer, you need to invoke the __GetWorkspace__ function first\. This function returns you the __IWorkspace__ interface object\. An object interface is just a means of access to an object in memory\.

The workspace manager provides a bridge between source documents \(such as Schematic documents\) and its corresponding primary implementation documents \(such as PCB documents\)\. This workspace manager provides you the ability to manipulate the contents of a design project in Altium Designer\.


A sample of the workspace manager interfaces:

- The __IDMObject__ interface is a generic interface used for all other WorkSpace interfaces\.
- The __IWorkSpace__ interface is the top level interface and contains many interfaces within\. For example the IWorkSpace interface has a __DM\_OpenProject__ function which returns a currently open or currently focused IProject interface\.
- The __IProject__ interface represents a design project in Altium Designer\.
- The __IPart__ interface represents a part of a multi\-part component\. This component is represented by the IComponent interface\.
- The __IDocument__ interface represents a document in Altium Designer\.
- The __IECO__ interface is used for the Engineering Change Order system in PCB and Schematic servers\.
- The __INet__ interface is a container storing Net aware objects \(which are INetItem interfaces\) that have the same net property\. So there are INet interfaces representing nets on a document\.
- The __INetItem__ interface is the ancestor interface for the Cross, Pin, Port, Netlabel, Sheet entry and Power Object interfaces\. These interface objects have a net property and thus these objects can be part of a net\.

## 子章节

- [Main WSM interfaces](01-Main_WSM_interfaces.md.md)
- [Logical and Physical Documents](02-Logical_and_Physical_Documents.md.md)
- [References for the WSM API](03-References_for_the_WSM_API.md.md)
- [Separate references for other Altium Designer APIs](04-Separate_references_for_other_Altium_Designer_APIs.md.md)
- [WSM Object Model](05-WSM_Object_Model.md/README.md)
