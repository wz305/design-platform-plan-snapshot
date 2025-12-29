# 

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

## 子章节

- [Models](01-Models.md.md)
- [PCB Footprints](02-PCB_Footprints.md.md)
- [PCB 3D Models](03-PCB_3D_Models.md.md)
- [Simulation Models](04-Simulation_Models.md.md)
- [Signal Integrity Models](05-Signal_Integrity_Models.md.md)
- [References for the Integrated Library API](06-References_for_the_Integrated_Library_API.md.md)
- [Separate references for other Altium Designer APIs](07-Separate_references_for_other_Altium_Designer_APIs.md.md)
