# PCB Object Model

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

