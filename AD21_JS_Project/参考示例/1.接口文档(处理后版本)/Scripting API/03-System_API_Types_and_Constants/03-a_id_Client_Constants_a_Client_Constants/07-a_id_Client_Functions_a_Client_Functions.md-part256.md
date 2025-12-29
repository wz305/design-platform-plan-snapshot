#### Properties

##### Designator\_Implementations\_AsString property

\(ISch\_MapDefiner interface\)  
__Syntax__  
Property Designator\_Implementations\_AsString : WideString Read GetState\_Designators\_Implementation\_AsString;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### IsTrivial property

\(ISch\_MapDefiner interface\)  
__Syntax__  
Property IsTrivial : Boolean Read GetState\_IsTrivial;  
__Description__  
This property determines whether the mapping is trivial or not\. Basically the mapping is trivial if there is no other possible mappings\. For example if there is only 1 schematic pin and one PCB pad then the map is trivial\.  
This property implements the GetState\_IsTrivial method\.  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### Designator\_Interface property

\(ISch\_MapDefiner interface\)  
__Syntax__  
Property Designator\_Interface : WideString Read GetState\_Designator\_Interface Write SetState\_Designator\_Interface;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### Designator\_ImplementationCount property

\(ISch\_MapDefiner interface\)  
__Syntax__  
Property Designator\_ImplementationCount : Integer Read GetState\_Designator\_ImplementationCount;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### Designator\_Implementation property

\(ISch\_MapDefiner interface\)  
__Syntax__  
Property Designator\_Implementation\[i : Integer\] : WideString Read GetState\_Designator\_Implementation;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

### <a id="ISch_ModelDatafileLink_Interface"></a>ISch\_ModelDatafileLink Interface

__Overview__  
A model represents all the information needed for a component in a given domain, while a datafile entity \(or link\) is the only information which is in an external file\. A model can be represented by external data sources called data file links\. For example, pins of a component can have links to different data files, as for signal integrity models\. We will consider each model type in respect to the data file links for the editor servers\.

For the PCB footprints, the model and the data file are both the same\.

With the simulation models, you can have a simulation model which is a 4ohm resistor for example, there is a simulation model here, but there is no information is coming from an external file, therefore, a no external file is needed for this as the resistor model is built from spice\. This is the case where you have a model with no data file entity\. Thus the parameters are used for these types of simulation models that don’t have data file links\.

With signal integrity models, it can have information required for each pin\. If we used IBIS datafiles, not the Altium Designer's central database, then each signal integrity model would then have multiple data files, each one for each type of pin\.

A diagram of the relationship between a component and its models:

__ISch\_ModelDatafileLink methods__  
GetState\_EntityName  
GetState\_FileKind  
GetState\_Location  
SetState\_EntityName  
SetState\_FileKind  
SetState\_Location

__ISch\_ModelDatafileLink properties__  
EntityName  
FileKind  
Location

__See also__  
ISch\_Component interface  
ISch\_Implementation interface