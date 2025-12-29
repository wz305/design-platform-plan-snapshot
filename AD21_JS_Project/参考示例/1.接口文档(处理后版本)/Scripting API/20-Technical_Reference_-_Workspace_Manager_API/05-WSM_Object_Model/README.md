# WSM Object Model

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

- [WSM Interfaces](01-WSM_Interfaces.md.md)
