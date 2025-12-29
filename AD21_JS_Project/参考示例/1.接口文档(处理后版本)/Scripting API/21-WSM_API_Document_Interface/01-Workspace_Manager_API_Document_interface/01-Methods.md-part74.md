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

### <a id="ICrossSheet_interface"></a>ICrossSheet interface

__Overview__  
The ICrossSheet interface is a cross sheet connector object interface\. Cross sheet connector objects can be used to link a net from a sheet to other sheets within a project\. This method defines global connections between sheets within a project\. An active cross sheet object is associated with a net\.

An equivalent Cross Sheet Connector object representation is the ISch\_CrossSheetConnector interface in Schematic API Reference\.  
__Important notes__  
ICrossSheet interface is inherited from INetItem interface\.  
__See also__  
INetItem interface\.

### <a id="ILine_Interface"></a>ILine Interface

__Overview__  
The ILine interface is a line object interface for an existing line object on a Schematic document\. A line is a graphical drawing object with any number of joined segments\.

An equivalent Line object representation is the ISch\_Line interface in the Schematic API reference\.

The __ILine__ interface hierarchy is as follows;  
IDMObject  
    ILine

__ILine methods__  
DM\_LX  
DM\_LY  
DM\_HX  
DM\_HY

__ILine properties__

__See also__  
IDMObject interface