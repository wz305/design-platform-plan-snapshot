#### Methods

##### DM\_SubParts method

\(IComponent interface\)  
__Syntax__  
Function DM\_SubParts \(Index : Integer\) : IPart;  
__Description__  
The function returns the indexed sub\-part of a multi\-part component\. Use the DM\_SubPartCount function\.  
__Example__  
__See also__  
IComponent interface

##### DM\_SubPartCount method

\(IComponent interface\)  
__Syntax__  
Function DM\_SubPartCount : Integer;  
__Description__  
The function returns the number of parts for this multi\-part component\. A standalone component returns 1 \(only one part for a standalone component\)\.  
__Example__  
__See also__  
IComponent interface

##### DM\_PhysicalComponents method

\(IComponent interface\)  
__Syntax__  
Function DM\_PhysicalComponents \(Index : Integer\) : IComponent;  
__Description__  
The function returns the indexed physical component\. Use this in conjunction with the DM\_PhysicalComponentCount function\.  
__Example__  
__See also__  
IComponent interface

##### DM\_PhysicalComponentCount method

\(IComponent interface\)  
__Syntax__  
Function DM\_PhysicalComponentCount : Integer;  
__Description__  
The function returns the number of physical components\.  
__Example__  
__See also__  
IComponent interface

##### DM\_UniqueIdPath method

\(IComponent interface\)  
__Syntax__  
Function DM\_UniqueIdPath : WideString;  
__Description__  
The function returns the unique path portion of the Unique ID for this component\. Includes the back slash\.  
__Example__  
__See also__  
IComponent interface

##### DM\_UniqueIdName method

\(IComponent interface\)  
__Syntax__  
Function DM\_UniqueIdName : WideString;  
__Description__  
The function returns the unique name portion of the Unique ID for this component\.  
__Example__  
__See also__  
IComponent interface

##### DM\_UniqueId method

\(IComponent interface\)  
__Syntax__  
Function DM\_UniqueId : WideString;  
__Description__  
The function returns the Unique ID string for this component so this component can be synchronized on the source document and the primary implementation document \(PCB\)\.  
__Example__  
__See also__  
IComponent interface

##### DM\_PhysicalPath method

\(IComponent interface\)  
__Syntax__  
Function DM\_PhysicalPath : WideString;  
__Description__  
The function returns the full physical path for this component\. For example the string can consist of the schematic filename \\ channel name and instance\.  
__Example__  
__See also__  
IComponent interface

### <a id="IComponentClass_interface"></a>IComponentClass interface

__Overview__  
The IComponentClass interface is a PCB Component class object interface for an existing Component Class on a PCB document\. An existing Component class contains members of specific Components\. Each Component within a ComponentClass object can either be a member or not\. The ‘All Components’ Component Class exists in every PCB document by default, it includes all Components in the document\. It is not possible to change which components are members of that Component class, but the user has full control over which components are members of any other Component classes \(which are created and named by the User\)\.  
__Notes__  
Inherited from IObjectClass interface\.  
__See also__  
IObjectClass interface

### <a id="IComponentImplementation_interface"></a>IComponentImplementation interface

__Overview__  
The IComponentImplementation interface is associated with an IPart/IComponent interface in terms of model linking\. Note that the IComponent interface is inherited from the IPart interface\.

A model represents all the information needed for a component in a given domain \(a model can be a PCB footprint, Simulation file or a Signal Integrity model\)\. A model is also called an implementation\.  
Each schematic component can contain links to different model implementations such as PCB, Signal Integrity and Simulation models\. Only one model of a particular model type \(PCB footprint, SIM, SI, EDIF Macro and VHDL\) can be enabled as the currently linked model, at any one time\.

A model can be represented by external data sources called data file links\. For example, pins of a component can have links to different data files, as for signal integrity models\. We will consider each model type in respect to the data file links\.

- For PCB footprints, the data file link and the model is the same since the external file is the PCB footprint library\.
- For simulation models, there can be no data file links because these models are defined using the Spice format\.
- However for signal integrity models, each pin can have different pieces of information represented by ibis data files\. These signal integrity models can have multiple data files, that is, each pin of a component can have a separate IBIS file\. A signal integrity model can however use the Altium Designer’s central Signal Integrity database\.

Thus depending on which model type, you can have a number of data file links\. Each data file link describes the model name, the path to where the library is stored in and what sort of model it is\.

__IComponentImplementation methods__  
DM\_Description  
DM\_ModelName  
DM\_ModelType  
DM\_DatafileCount  
DM\_DatafileLocation  
DM\_DatafileEntity  
DM\_DatafileKind  
DM\_SetDatafileLocation  
DM\_SetDatafileEntity  
DM\_SetDatafileKind  
DM\_SetDatafileCount  
DM\_DatafileFullPath  
DM\_IntegratedModel  
DM\_DatalinksLocked  
DM\_IsCurrent  
DM\_Part  
DM\_PortMap  
DM\_PortMapList

__IComponentImplementation properties__