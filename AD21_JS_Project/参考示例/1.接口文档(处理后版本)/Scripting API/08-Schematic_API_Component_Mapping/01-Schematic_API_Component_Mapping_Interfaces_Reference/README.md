# Schematic API: Component Mapping Interfaces Reference

The Schematic API Component Mapping Interfaces reference includes the following content:

[ISch\_MapDefiner](https://www.altium.com/documentation/altium-designer/schematic-api-component-mapping?version=21#ISch_MapDefiner)  
[ISch\_ModelDatafileLink Interface](https://www.altium.com/documentation/altium-designer/schematic-api-component-mapping?version=21#ISch_ModelDatafileLink Interface)  
[ISch\_Implementation Interface](https://www.altium.com/documentation/altium-designer/schematic-api-component-mapping?version=21#ISch_Implementation Interface)


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



\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designator\_Implementation\(Index : Integer\) : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designator\_ImplementationCount : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designator\_Interface : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_AllFromString \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_Designator\_ImplementationAdd\(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_Designator\_Interface\(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Procedure SetState\_Designator\_ImplementationClear;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_IsTrivial : Boolean;  
__Description__  
This function determines whether the mapping is trivial or not\. Basically the mapping is trivial if there is no other possible mappings\. For example if there is only 1 schematic pin and one PCB pad then the map is trivial\.  
This function is used by the IsTrivial property\.  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Function GetState\_Designators\_Implementation\_AsString : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface



\(ISch\_MapDefiner interface\)  
__Syntax__  
Property Designator\_Implementations\_AsString : WideString Read GetState\_Designators\_Implementation\_AsString;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Property IsTrivial : Boolean Read GetState\_IsTrivial;  
__Description__  
This property determines whether the mapping is trivial or not\. Basically the mapping is trivial if there is no other possible mappings\. For example if there is only 1 schematic pin and one PCB pad then the map is trivial\.  
This property implements the GetState\_IsTrivial method\.  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Property Designator\_Interface : WideString Read GetState\_Designator\_Interface Write SetState\_Designator\_Interface;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Property Designator\_ImplementationCount : Integer Read GetState\_Designator\_ImplementationCount;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface


\(ISch\_MapDefiner interface\)  
__Syntax__  
Property Designator\_Implementation\[i : Integer\] : WideString Read GetState\_Designator\_Implementation;  
__Description__  
__Example__  
__See also__  
ISch\_MapDefiner interface


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



\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Function GetState\_EntityName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface


\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Function GetState\_FileKind : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface


\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Function GetState\_Location : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface


\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Procedure SetState\_EntityName\(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface


\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Procedure SetState\_FileKind \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface


\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Procedure SetState\_Location \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface



\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Property EntityName : WideString Read GetState\_EntityName Write SetState\_EntityName;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface


\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Property FileKind : WideString Read GetState\_FileKind Write SetState\_FileKind ;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface


\(ISch\_ModelDatafileLink interface\)  
__Syntax__  
Property Location : WideString Read GetState\_Location Write SetState\_Location ;  
__Description__  
__Example__  
__See also__  
ISch\_ModelDatafileLink interface


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



\(ISch\_Implementation interface\)  
__Syntax__  
Procedure AddDataFileLink\(anEntityName, aLocation, aFileKind : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Implementation interface


\(ISch\_Implementation interface\)  
__Syntax__  
Procedure ClearAllDatafileLinks;  
__Description__  
This procedure removes all the data file links of the implementation \(model\) for the current component\.  
__Example__  
__See also__  
ISch\_Implementation interface


\(ISch\_Implementation interface\)  
__Syntax__  
Procedure LockImplementation;  
__Description__  
__Example__  
__See also__  
ISch\_Implementation interface


\(ISch\_Implementation interface\)  
__Syntax__  
Function Map\_Import\_FromUser \(AlowOneToMany : Boolean\): Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Implementation interface



\(ISch\_Implementation interface\)  
__Syntax__  
Property DatafileLinkCount : Integer Read GetState\_DatafileLinkCount;  
__Description__  
This property fetches the number of data file links for the current implementation of the schematic component\.  
This property is supported by the GetState\_DatafileLinkCount function\.  
__Example__

01

For j := 0 To SchImplementation\.DatafileLinkCount \- 1 Do

02

Begin

03

    ModelDataFile := SchImplementation\.DatafileLink\[j\];

04

    If ModelDataFile <> Nil Then

05

    Begin

06

        ModelsList\.Add\('   Implementation Data File Link Details:'\);

07

        ModelsList\.Add\('   Data File Location: ' \+ ModelDataFile\.Location \+

08

                       ', Entity Name: '         \+ ModelDataFile\.EntityName \+

09

                       ', FileKind: '            \+ ModelDataFile\.FileKind\);

10

        ModelsList\.Add\(''\);

11

    End;

12

End;

__See also__  
ISch\_Implementation interface  
DataFileLink property


\(ISch\_Implementation interface\)  
__Syntax__  
Property DatabaseModel : Boolean Read GetState\_DatabaseModel Write SetState\_DatabaseModel;  
__Description__  
 This property is implemented by the GetState\_DatabaseModel and SetState\_DatabaseModel methods\.  
__Example__  
__See also__  
ISch\_Implementation interface  
IntegratedModel property


\(ISch\_Implementation interface\)  
__Syntax__  
Property DatafileLink \[i : Integer\] : ISch\_ModelDatafileLink Read GetState\_SchDatafileLink;  
__Description__  
The DatafileLink property determines the indexed datafilelink of the model type linked to the component\. A component can have multiple linked models and each model can have multiple external data file links\.  
This property is implemented with the GetState\_SchDatafileLink\(i : Integer\) : ISch\_ModelDatafileLink method\.  
__Example__

01

For j := 0 To SchImplementation\.DatafileLinkCount \- 1 Do

02

Begin

03

    ModelDataFile := SchImplementation\.DatafileLink\[j\];

04

    If ModelDataFile <> Nil Then

05

    Begin

06

        ModelsList\.Add\('   Implementation Data File Link Details:'\);

07

        ModelsList\.Add\('   Data File Location: ' \+ ModelDataFile\.Location \+

08

                       ', Entity Name: '         \+ ModelDataFile\.EntityName \+

09

                       ', FileKind: '            \+ ModelDataFile\.FileKind\);

10

        ModelsList\.Add\(''\);

11

    End;

12

End;

__See also__  
ISch\_Implementation interface


\(ISch\_Implementation interface\)  
__Syntax__  
Property DatalinksLocked : Boolean Read GetState\_DatalinksLocked Write SetState\_DatalinksLocked;  
__Description__  
__Example__  
__See also__  
ISch\_Implementation interface


\(ISch\_Implementation interface\)  
__Syntax__  
Property DefinerByInterfaceDesignator\[S : WideString\] : ISch\_MapDefiner Read GetState\_SchDefinerByInterfaceDesignator;  
__Description__  
__Example__  
__See also__  
ISch\_Implementation interface


\(ISch\_Implementation interface\)  
__Syntax__  
Property Description : WideString Read GetState\_Description Write SetState\_Description ;  
__Description__  
The Description property fetches or sets the Description string for the model\. This is optional and is for reference purposes and do not have any impact on simulation processes\. This property is implemented by the GetState\_Description : WideString and SetState\_Description\(AValue : WideString\) methods\.  
__Example__

1

SchImplementation := ImplIterator\.FirstSchObject;

2

While SchImplementation <> Nil Do

3

Begin

4

    ShowMessage   \('   ModelName: ' \+ SchImplementation\.ModelName \+

5

                   ' ModelType: '   \+ SchImplementation\.ModelType \+

6

                   ' Description: ' \+ SchImplementation\.Description\);

7

End;

__See also__  
ISch\_Implementation interface


\(ISch\_Implementation interface\)  
__Syntax__  
Property IntegratedModel : Boolean Read GetState\_IntegratedModel Write SetState\_IntegratedModel;  
__Description__  
The property determines whether the implementation is an integrated model type or not\.  
__Example__  
__See also__  
ISch\_Implementation interface  
DatabaseModel property


\(ISch\_Implementation interface\)  
__Syntax__  
Property IsCurrent : Boolean Read GetState\_IsCurrent Write SetState\_IsCurrent ;  
__Description__  
__Example__  
__See also__  
ISch\_Implementation interface


\(ISch\_Implementation interface\)  
__Syntax__  
Property MapAsString : WideString Read GetState\_MapAsString Write SetState\_MapAsString ;  
__Description__  
This MapAsString property returns or sets the map of the component pins to a model pins \(simulation ports for example\) as a string of the following format: \(SchematicPinNumber:ModelPinNumber\) for example \(1:1\),\(2:2\), … ,\(X:X\)  
__Example__  
__See also__  
ISch\_Implementation interface


\(ISch\_Implementation interface\)  
__Syntax__  
Property ModelName : WideString Read GetState\_ModelName Write SetState\_ModelName ;  
__Description__  
The ModelName property fetches or sets the name of the indexed model name\.This property is implemented with GetState\_ModelName : WideString and SetState\_ModelName\(AValue : WideString\) methods\.  
__Example__  
Result := IntegratedLibraryManager\.ModelName\(Component\.LibReference,PathToLibrary,'SIM',0\);  
__See also__  
ISch\_Implementation interface


\(ISch\_Implementation interface\)  
__Syntax__  
Property ModelType : WideString Read GetState\_ModelType Write SetState\_ModelType ;  
__Description__  
__Example__  
__See also__  
ISch\_Implementation interface


\(ISch\_Implementation interface\)  
__Syntax__  
Property UseComponentLibrary     : Boolean    Read GetState\_UseComponentLibrary     Write SetState\_UseComponentLibrary;  
__Description__  
This UseComponentLibrary property determines whether the component is from an integrated library or not \(either as an installed library or part of the Project Libraries\. This is accessed from the Available Libraries dialog in Altium Designer\)\. A Boolean value is returned\. This property is implemented with GetState\_UseComponentLibrary : Boolean and SetState\_UseComponentLibrary\(AValue : Boolean\) methods\.  
__Example__  
__See also__  
ISch\_Implementation interface

## 子章节

- [<a id="ISch_MapDefiner"></a>ISch\_MapDefiner](01-a_id_ISch_MapDefiner_a_ISch_MapDefiner.md.md)
- [<a id="ISch_ModelDatafileLink_Interface"></a>ISch\_ModelDatafileLink Interface](02-a_id_ISch_ModelDatafileLink_Interface_a_ISch_ModelDatafileLink_Interface.md.md)
- [<a id="ISch_Implementation_Interface"></a>ISch\_Implementation Interface](03-a_id_ISch_Implementation_Interface_a_ISch_Implementation_Interface.md.md)
