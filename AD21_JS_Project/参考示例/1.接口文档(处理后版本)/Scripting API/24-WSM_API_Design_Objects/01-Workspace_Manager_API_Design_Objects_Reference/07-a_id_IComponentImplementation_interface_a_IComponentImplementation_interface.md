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

#### Methods

##### DM\_SetDatafileKind method

\(IComponentImplementation interface\)  
__Syntax__  
Procedure DM\_SetDatafileKind \(Index : Integer; AKind : WideString\);  
__Description__  
The procedure sets the data file kind which denotes the type of implementation model\. Example, a PCB Footprint is a PCBLIB data file kind\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_SetDatafileEntity method

\(IComponentImplementation interface\)  
__Syntax__  
Procedure DM\_SetDatafileEntity \(Index : Integer; AEntity : WideString\);  
__Description__  
The procedure sets the data file entity which denotes the name of the implementation model linked to a schematic component/part\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_SetDatafileCount method

\(IComponentImplementation interface\)  
__Syntax__  
Procedure DM\_SetDatafileCount \(ACount : Integer\);  
__Description__  
The procedure sets the number of data files associated with the IPart/IComponent interface\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_ModelType method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_ModelType : WideString;  
__Description__  
The function returns the model type as a string;  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_ModelName method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_ModelName : WideString;  
__Description__  
The function returns the model name of the implementation model\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_Description method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_Description : WideString;  
__Description__  
The function returns the description string of the implementation model\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_DatafileLocation method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatafileLocation \(Index : Integer\) : WideString;  
__Description__  
The function returns the indexed data file location\. Used in conjunction with the DM\_DataFileCount function\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_DatafileKind method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatafileKind \(Index : Integer\) : WideString;  
__Description__  
The function returns the indexed data file kind \(the model kind eg PCB etc\)Used in conjunction with the DM\_DataFileCount function\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_DatafileFullPath method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatafileFullPath \(Index : Integer;EntityName, FileKind : WideString;Var FoundIn : WideString\) : WideString;  
__Description__  
The function returns you the full path to the data file via the FoundIn parameter, if the Entity name, the file Kind are valid and Found In strings Used in conjunction with the DM\_DataFileCount function\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_DatafileEntity method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatafileEntity \(Index : Integer\) : WideString;  
__Description__  
The function returns the indexed data file entity \(the name of the implementation model\)\. Used in conjunction with the DM\_DataFileCount function\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_DatafileCount method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatafileCount : Integer;  
__Description__  
The function returns the number of data files for the model\. A data file is an internal aggregrate object and each data file describes the model name, the path to where the library is stored in and what implementation model type\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_SetDatafileLocation method

\(IComponentImplementation interface\)  
__Syntax__  
Procedure DM\_SetDatafileLocation \(Index : Integer; ALocation : WideString\);  
__Description__  
The procedure sets the data file location which denotes the full path of the implementation model associated with the IPart/IComponent interface\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_PortMapList method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_PortMapList : WideString;  
__Description__  
The function returns the mapping of pins of a component and its corresponding model\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_PortMap method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_PortMap : WideString;  
__Description__  
The function denotes the mapping of pins of a component and its corresponding model\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_Part method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_Part : IPart;  
__Description__  
The function denotes the mapping of pins of a component and its corresponding model\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_IsCurrent method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_IsCurrent : Boolean;  
__Description__  
The function denotes a boolean value whether this model implementation is current or not\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_IntegratedModel method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_IntegratedModel : Boolean;  
__Description__  
This function denotes a boolean value whether this is a model from an integrated library or not\.  
__Example__  
__See also__  
IComponentImplementation interface

##### DM\_DatalinksLocked method

\(IComponentImplementation interface\)  
__Syntax__  
Function DM\_DatalinksLocked : Boolean;  
__Description__  
The function denotes a boolean value whether datalinks are locked or not\. Note, a data file kind denotes the type of implementation model\. Example, a PCB Footprint is a PCBLIB data file kind\.  
__Example__  
__See also__  
IComponentImplementation interface