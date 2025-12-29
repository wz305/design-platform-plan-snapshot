### <a id="ISch_MapDefiner"></a>ISch\_MapDefiner

__Overview__  
The ISch\_MapDefiner interface represents the object that is used to define a mapping between schematic pins of a schematic component and its model for example the associated PCB pad objects of the PCB component in the same PCB project\.

This interface is part of the ISch\_Implementation interface\. Each component can have a number of implementations \(models of the same type and/or different types as well\)\.

The ISch\_Implementation\.DefinerByInterfaceDesignator returns you theISch\_MapDefiner interface with the Designator string representing the component’s designator text string\.

__Notes__  
A model represents all the information needed for a component in a given domain, while a datafile entity \(or link\) is the only information which is in an external file\.

A model can be represented by external data sources called data file links\. For example, pins of a component can have links to different data files, as for signal integrity models\. We will consider each model type in respect to the data file links for the main editor servers supported in Altium Designer\.

For the PCB footprints, the model and the data file are both the same\.

With the simulation models, you can have a simulation model which is a 4ohm resistor for example, there is a simulation model but there is no information is coming from an external file, therefore, a no external file is needed for this as the resistor model is built from spice\. This is the case where you have a model with no data file entity\. Thus the parameters are used for these types of simulation models that don’t have data file links\.

With signal integrity models, it can have information required for each pin\. If we used IBIS datafiles, not the Altium Designer’s central database, then each signal integrity model would then have multiple data files, each one for each type of pin\.

The __ISch\_MapDefiner__ interface hierarchy is as follows;

__ISch\_MapDefiner methods__  
GetState\_Designator\_Implementation  
GetState\_Designator\_ImplementationCount  
GetState\_Designator\_Interface  
GetState\_Designators\_Implementation\_AsString  
GetState\_IsTrivial  
SetState\_AllFromString  
SetState\_Designator\_ImplementationAdd  
SetState\_Designator\_ImplementationClear  
SetState\_Designator\_Interface

__ISch\_MapDefiner properties__  
Designator\_Interface  
Designator\_ImplementationCount  
Designator\_Implementation  
Designator\_Implementations\_AsString  
IsTrivial

__See also__  
ISch\_BasicContainer interface  
ISch\_Component interface  
ISch\_Implementation interface

#### Methods

##### GetState\_Designator\_Implementation method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designator\_Implementation\(Index : Integer\) : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### GetState\_Designator\_ImplementationCount method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designator\_ImplementationCount : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### GetState\_Designator\_Interface method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designator\_Interface : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### SetState\_AllFromString method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_AllFromString \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### SetState\_Designator\_ImplementationAdd method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_Designator\_ImplementationAdd\(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### SetState\_Designator\_Interface method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_Designator\_Interface\(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### SetState\_Designator\_ImplementationClear method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_Designator\_ImplementationClear;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### GetState\_IsTrivial method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_IsTrivial : Boolean;  
__Description__  
This function determines whether the mapping is trivial or not\. Basically the mapping is trivial if there is no other possible mappings\. For example if there is only 1 schematic pin and one PCB pad then the map is trivial\.  
This function is used by the IsTrivial property\.  
__Example__  
__See also__  
ISch\_MapDefiner interface

##### GetState\_Designators\_Implementation\_AsString method

\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designators\_Implementation\_AsString : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface

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