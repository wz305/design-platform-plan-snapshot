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

#### Methods

##### GetState\_EntityName method

\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Function GetState\_EntityName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface

##### GetState\_FileKind method

\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Function GetState\_FileKind : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface

##### GetState\_Location method

\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Function GetState\_Location : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface

##### SetState\_EntityName method

\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Procedure SetState\_EntityName\(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface

##### SetState\_FileKind method

\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Procedure SetState\_FileKind \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface

##### SetState\_Location method

\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Procedure SetState\_Location \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface

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