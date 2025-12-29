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

### References for the PCB API

- [PCB API System Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21)
- [PCB API Layer Stack Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21) \- new updated content
- [PCB API Layer Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21) \- new updated content
- [PCB API Design Objects Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-design-objects-interfaces?version=21)
- [PCB API Types](https://www.altium.com/documentation/altium-designer/pcb-api-types?version=21)
- [PCB API Constants and Functions](https://www.altium.com/documentation/altium-designer/pcb-api-constants-and-functions?version=21)

### Separate references for other Altium Designer APIs

- System API Object Model \- refer to the [System API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-system-api?version=21)
- Schematic Object Model \- refer to the [Schematic API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)
- Workspace Manager Object Model  \- refer to the [Workspace Manager API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-workspace-manager-api?version=21)
- Integrated Library Object Model \- refer to the [Integrated Library API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-integrated-library-api?version=21)

## PCB Object Model 

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
 

# PCB API System Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [PCB API System Interfaces for version 22](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- PCB API](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## PCB API: System Interfaces Reference 

The PCB API System Interfaces reference includes the following sections and content:

[__PCB System Interfaces__](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#PCB System Interfaces)

[__PCB Options Interfaces__](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#PCB Options Interfaces)

[IPCB\_ServerInterface](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_ServerInterface)  
[IPCB\_Board](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_Board)  
[IPCB\_Library Interface](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_Library Interface)  
[IPCB\_Sheet](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_Sheet)  
[IPCB\_LayerStack](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_LayerStack)  
[IPCB\_SpecialStringConverter Interface](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_SpecialStringConverter Interface)  
[IPCB\_PrimitiveCounter Interface](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_PrimitiveCounter Interface)

[IPCB\_AbstractOptions](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_AbstractOptions)  
[IPCB\_AdvancedPlacerOptions](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_AdvancedPlacerOptions)  
[IPCB\_DesignRuleCheckerOptions](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_DesignRuleCheckerOptions)  
[IPCB\_ECOOptions](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_ECOOptions)  
[IPCB\_GerberOptions](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_GerberOptions)  
[IPCB\_InteractiveRoutingOptions](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_InteractiveRoutingOptions)  
[IPCB\_OutputOptions](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_OutputOptions)  
[IPCB\_PrinterOptions](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_PrinterOptions)  
[IPCB\_SpecctraRouterOptions](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_SpecctraRouterOptions)  
[IPCB\_SystemOptions](https://www.altium.com/documentation/altium-designer/pcb-api-system-interfaces?version=21#IPCB_SystemOptions)

See also:

[PCB API Layer Stack Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-layer-stack-interfaces?version=21)

[PCB API Layer Interfaces](https://www.altium.com/documentation/altium-designer/pcb-api-layer-interfaces?version=21)

## <a id="PCB_System_Interfaces"></a>PCB System Interfaces 

### <a id="IPCB_ServerInterface"></a>IPCB\_ServerInterface

__Overview__  
When you need to work with PCB design objects in Altium Designer, the starting point is to invoke the __PCBServer__ function which returns the __IPCB\_ServerInterface__ interface\. You can extract the all other derived PCB interfaces that are exposed in the __IPCB\_ServerInterface__ interface\.

Note that these __IServerModule__ interfaces represent loaded servers in Altium Designer\. The Altium Designer application manages single instances of different server modules\. Each server can have multiple server document kinds, for example the PCB server supports two server document kinds – PCB and PCBLIB design documents\. A loaded server in Altium Designer  typically hosts documents and each document in turn hosts a document view and panel views\. Thus a PCB server also has the __IServerModule__ interface along with the__ IPCB\_ServerInterface__ interface\.

__Notes__  
To get an access to the current PCB document open in Altium Designer, you would invoke the __GetCurrentPCBBoard__ method from the __IPCB\_ServerInterface__ interface object to obtain the __IPCB\_Board__ interface\.

The factory methods produce specialized objects\. For example the __PCBObjectFactory__ method is invoked to produce a new PCB object\. You will need to add this object in a PCB board\. The__ TObjectCreationKind__ type denotes how the attributes of a new PCB object is set \(either from software default settings or from global settings as defined in the Preferences dialog within PCB\)\.

The __SendMessageToRobots__, __PreProcess and__ __PostProcess__ methods are used when you need to keep the Undo system and other sub systems of the PCB editor in synchronization, when you are adding, deleting or modifying objects to/from  the PCB document\.

__IPCB\_ServerInterface methods__  
GetState\_SystemOptions  
GetState\_InteractiveRoutingOptions  
GetState\_CanFastCrossSelect\_Emit  
GetState\_CanFastCrossSelect\_Receive  
SetState\_CanFastCrossSelect\_Emit  
SetState\_CanFastCrossSelect\_Receive  
GetState\_SpecialStringConverter  
  
CreatePCBLibComp  
DestroyPCBLibObject  
PCBDestroyObject  
GetCurrentPCBBoard  
GetCurrentPCBLibrary property  
GetPCBBoardByPath  
GetPCBLibraryByPath  
ObjectSupports  
PCBClassObjectFactory  
PCBClassObjectFactoryByClassMember  
LoadCompFromLibrary  
PCBObjectFactory  
PCBRuleFactory  
PostProcess  
Preprocess  
SendMessageToRobots  
PCBContourFactory  
DestroyPCBContour      

__IPCB\_ServerInterface properties__  
InteractiveRoutingOptions  
SystemOptions  
InteractiveRoutingOptions   
CanFastCrossSelect\_Emit     
CanFastCrossSelect\_Receive  
SpecialStringConverter      
TTFLettersCache             
TTFontsCache                
 

__See also__  
Creating/Deleting PCB objects and updating the Undo system  
Modifying PCB objects and updating the Undo system  
TObjectId enumerated values  
TDimensionKind enumerated values  
TObjectCreationMode enumerated values  
IPCB\_ObjectClass interface  
IPCB\_Rule interface  
IPCB\_LibComponent interface  
IPCB\_Primitive interface  
IPCB\_Board interface  
IPCB\_SystemOptions interface  
IPCB\_InteractiveRoutingOptions interface  
PCB Scripts from \\Examples\\Scripts\\Delphiscript\\PCB folder\.