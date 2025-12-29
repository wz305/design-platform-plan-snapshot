#### Properties

##### EntityName property

\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Property EntityName : WideString Read GetState\_EntityName Write SetState\_EntityName;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface

##### FileKind property

\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Property FileKind : WideString Read GetState\_FileKind Write SetState\_FileKind ;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface

##### Location property

\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Property Location : WideString Read GetState\_Location Write SetState\_Location ;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface

### <a id="ISch_Implementation_Interface"></a>ISch\_Implementation Interface

__Overview__  
Each schematic component can have models from one or more domains\. A schematic component can also have multiple models per domain, one of which will be the current model for that domain\.

A model represents all the information needed for a component in a given domain, while a datafile entity \(or link\) is the only information which is in an external file\.

The models of a component are represented by the __ISch\_Implementation__ interface\.

The mapping of pins of a component and the nodes/pads of a model are represented by the __ISch\_MapDefiner__ interfaces\.

The link between a model and its external data file links are represented by the __ISch\_DataFileLink__ interfaces\.

A diagram of the relationship between a component and its models:

__Notes__  
A model can be represented by external data sources called data file links\. For example, pins of a component can have links to different data files, as for signal integrity models\. We will consider each model type in respect to the data file links for the main editor servers supported in Altium Designer\.

For the PCB footprints, the model and the data file are both the same\.

With the simulation models, you can have a simulation model which is a 4ohm resistor for example, there is a simulation model here, but there is no information is coming from an external file, therefore, a no external file is needed for this as the resistor model is built from spice\. This is the case where you have a model with no data file entity\. Thus the parameters are used for these types of simulation models that don’t have data file links\.

With signal integrity models, it can have information required for each pin\. If we used IBIS datafiles, not the Altium Designer’s central database, then each signal integrity model would then have multiple data files, each one for each type of pin\.

A model can also be called an implementation\. Each implementation linked to a component can have parameters and data file links\.

__ISch\_Implementation methods__  
AddDataFileLink  
ClearAllDatafileLinks  
LockImplementation  
Map\_Import\_FromUser  
GetState\_DatabaseDatalinksLocked  
GetState\_DatabaseModel  
GetState\_DatafileLinkCount  
GetState\_DatalinksLocked  
GetState\_Description  
GetState\_IntegratedModel  
GetState\_IsCurrent  
GetState\_MapAsString  
GetState\_ModelName  
GetState\_ModelType  
GetState\_SchDatafileLink  
GetState\_SchDefinerByInterfaceDesignator  
SetState\_DatabaseDatalinksLocked  
SetState\_DatalinksLocked  
SetState\_DatabaseModel  
SetState\_Description  
SetState\_IntegratedModel  
SetState\_IsCurrent  
SetState\_MapAsString  
SetState\_ModelName  
SetState\_ModelType

__ISch\_Implementation properties__  
DatabaseDatalinksLocked  
DatabaseModel  
DatafileLink  
DatafileLinkCount  
DatalinksLocked  
DefinerByInterfaceDesignator  
Description  
IntegratedModel  
IsCurrent  
MapAsString  
ModelName  
ModelType

__See also__  
ISch\_MapDefiner interface  
ISch\_ModelDatafileLink interface