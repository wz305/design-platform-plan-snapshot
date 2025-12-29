# Technical Reference \- Integrated Library API

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Technical Reference \- Integrated Library API for version 22](https://www.altium.com/documentation/altium-designer/technical-reference-integrated-library-api)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Altium Designer API Reference](https://www.altium.com/documentation/altium-designer/altium-design-software-api-reference?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

The Integrated Library Application Programming Interface reference covers the __Integrated Library API__ interface objects\.

The Altium Designer scripting system implements a subset of the complete Altium Designer API and its Object Interfaces\. The [Altium DXP Developer](https://www.altium.com/en/developer), used for developing Altium Designer server Extensions, has access to the full Altium Designer API via a set of API SDK source units\.

Integrated Library API Overview 

A schematic design is a collection of components which have been connected logically\. To test or implement the design it needs to be transferred to another modelling domain, such as simulation, PCB layout, Signal Integrity analysis and so on\.

Each domain needs some information about each component, and also some way to map that information to the pins of the schematic component\. Some of the domain information resides in model files, the format of which is typically pre\-defined, examples of these includes IBIS, MDL and CKT files\. Some of the information does not reside in the model files, for example the spice pin mapping and net list data\.

There are different types of libraries in Altium Designer– normal standalone libraries like PCB Libraries and Schematic Libraries and another type called an integrated library which contains different source libraries such as PCB libraries bundled together\.


Each schematic component can have models from one or more domains\. A schematic component can also have multiple models per domain, one of which will be the current model for that domain\.

A model represents all the information needed for a component in a given domain, while a datafile entity \(or link\) is the only information which is in an external file\.  See the diagram below for a relationship between a Schematic component and its models\. A model can be represented by external data sources called data file links\. For example, pins of a component can have links to different data files, as for signal integrity models\. We will consider each model type in respect to the data file links for the main editor servers supported in Altium Designer\.

A Model has Ports that are mapped to the pins of a schematic component\. Note that a model can also be called an implementation\. A model/implementation can have its own parameters and data file links\.


For the PCB footprints, the model and the data file are both the same \(no external file needed\)\.


For the PCB 3D models, the model and the data file are both the same \(no external file needed\)\.


With the simulation models, you can have a simulation model which is a 4ohm resistor for example\. But there is no information coming from an external file and thus no external file is needed for this resistor as the resistor model is built from Spice modeling language in Altium Designer\. This is the case where you have a model with no data file entity\.

Thus the parameters are used for these types of simulation models that don’t have data file links \(external files\)\. Simulation Models can have up to 3 different model data files – Model File\(\*\.MDL\), Subcircuit file \(\*\.CKT\) and SIMetrix Model Library file \(\*\.LB\)\.


With signal integrity models, it can have information required for each pin\. If we used IBIS datafiles, not the Altium Designer's central database, then each signal integrity model would then have multiple data files, each one for each type of pin\.


- [IntLib API Manager Interfaces](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21)
- [IntLib API Datafile Interfaces](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21)
- [IntLib API IModel Interfaces](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21)


- System API Object Model \- refer to the [System API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-system-api?version=21)
- Schematic Object Model \- refer to the [Schematic API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)
- PCB Object Model  \- refer to the [PCB API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)
- Workspace Manager Object Model \- refer to the [Workspace Manager API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-workspace-manager-api?version=21)



Each method in the object interface is implemented in the corresponding class\. Object Interfaces \(interfaces for short\) are declared like classes but cannot be directly instantiated and do not have their own method definitions\.

Each interface, a class supports is actually a list of pointers to methods\. Therefore, each time a method call is made to an interface, the interface actually diverts that call to one of it's pointers to a method, thus giving the object that really implements it, the chance to act\.

The Integrated Library interfaces exist as long there are associated existing objects in memory, thus when writing a script or server code, you have the responsibility of checking whether the interface you wish to query exists or not before you proceed to invoke the interface's methods\.

To obtain the Integrated Library Manager object interface which represents to the Integrated Library manager object, invoke the IntegratedLibraryManager function in your script or code which returns you the IIntegratedLibraryManager object interface\.

To obtain the model type manager, invoke the ModelTypeManager function in your script which returns you the IModelTypeManger interface\.


There are three main interfaces from the Integrated Library Object Model\.

- IIntegratedLibraryManager Interface
- IModelTypeManager Interface
- IDeviceSheetManager Interface

See the [IntLib API Manager Interfaces](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21) document for information on the above interfaces\.


01

Procedure CheckDataFilesInIntLibrary;

02

Var

03

    IntMan         : IIntegratedLibraryManager;

04

    FoundLocation  : String;

05

    AFootprintName : String;

06

    InIntLib       : Boolean;

07

    AModelType      : String;

08

Begin

09

    IntMan := IntegratedLibraryManager;

10

    If IntMan = Nil Then Exit;

11

    IntMan\.InstallLibrary\('C:\\Program Files\\Altium Designer\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib'\);

12

    //Look for a footprint in a Xilinx Spartan\-3E\.IntLib

13

    AModelType     := 'PCBLIB';

14

    AFootprintName := 'TQ144';

15

    InIntLib       := True;

16

    IntMan\.FindDatafileInStandardLibs \(AFootprintName, AModelType, '', InIntLib, FoundLocation\);

17

    ShowMessage\(FoundLocation\);

18

    IntMan\.UnInstallLibrary\('C:\\Program Files\\Altium Designer 6\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib'\);

19

End;


There are script examples in the \\Examples\\Scripts\\ folder of the Altium Designer installation\.

## 子章节

- [](01-.md/README.md)
- [Integrated Library Interfaces](02-Integrated_Library_Interfaces.md/README.md)
