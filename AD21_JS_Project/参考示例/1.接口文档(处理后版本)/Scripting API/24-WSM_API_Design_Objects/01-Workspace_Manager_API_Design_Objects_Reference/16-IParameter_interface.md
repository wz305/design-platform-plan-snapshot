### IParameter interface

__Overview__  
The IParameter interface is a parameter object interface to an existing parameter object on a schematic sheet\. There are two types of parameters – system parameters which are owned by a schematic document and parameters owned by certain schematic design objects\.

A parameter is a child object of a Parameter Set, Part, Pin, Port, or Sheet Symbol object\. A Parameter object has a Name property and Value property which can be used to store information, thus the parameters are a way of defining and associating information and could include strings that identify component manufacturer, date added to the document and also a string for the component's value \(e\.g\. 100K for a resistor or 10PF for a capacitor\)\.

Each parameter has a Unique Id assigned to it\. This is used for those parameters that have been added as design rule directives\. When transferring the design to the PCB document, any defined rule parameters will be used to generate the relevant design rules in the PCB\. These generated rules will be given the same Unique Ids, allowing you to change rule constraints in either schematic or PCB and push the change across when performing a synchronization\.

An equivalent object representation is the ISch\_Parameter class in the Sch API reference\.

__IParameter methods__  
DM\_Name  
DM\_ConfigurationName  
DM\_Kind  
DM\_Value  
DM\_RawText  
DM\_UniqueId  
DM\_Description  
DM\_NewName  
DM\_NewValue  
DM\_OriginalOwner  
DM\_Visible

__IParameter properties__

#### Methods

##### DM\_ConfigurationName method

\(IParameter interface\)  
__Syntax__  
Function DM\_ConfigurationName : WideString;  
__Description__  
The function returns the configuration name, that the parameter object is associated with\.  
__Example__  
__See also__  
IParameter interface

##### DM\_Description method

\(IParameter interface\)  
__Syntax__  
Function DM\_Description : WideString;  
__Description__  
The function denotes the description of this parameter object\.  
__Example__  
__See also__  
IParameter interface

##### DM\_Kind method

\(IParameter interface\)  
__Syntax__  
Function DM\_Kind : TParameterKind;  
__Description__  
The function denotes the specific kind that can be assigned to this parameter object\. String, Boolean, Integer or float\.  
__Example__  
__See also__  
IParameter interface  
TParameterKind type

##### DM\_Name method

\(IParameter interface\)  
__Syntax__  
Function DM\_Name : WideString;  
__Description__  
The function denotes the name of the parameter object\.  
__Example__  
__See also__  
IParameter interface

##### DM\_NewName method

\(IParameter interface\)  
__Syntax__  
Function DM\_NewName : WideString;  
__Description__  
The function denotes the New Name for the parameter object, especially when there is an ECO change\. You can then compare the original and new names\.  
__Example__  
__See also__  
IParameter interface

##### DM\_NewValue method

\(IParameter interface\)  
__Syntax__  
Function DM\_NewValue : WideString;  
__Description__  
The function denotes the New Value for the parameter object, especially when there is an ECO change\. You can then compare the original and new values\.  
__Example__  
__See also__  
IParameter interface

##### DM\_OriginalOwner method

\(IParameter interface\)  
__Syntax__  
Function DM\_OriginalOwner : IDMObject;  
__Description__  
This function returns the interface of the owner object this parameter object is associated with\.  
__Example__  
__See also__  
IParameter interface

##### DM\_RawText method

\(IParameter interface\)  
__Syntax__  
Function DM\_RawText : WideString;  
__Description__  
The function returns the raw text for this parameter object\.  
__Example__  
__See also__  
IParameter interface

##### DM\_UniqueId method

\(IParameter interface\)  
__Syntax__  
Function DM\_UniqueId : WideString;  
__Description__  
Any parameter that is configured as a container for design rule directives need to have a unique ID that will be ported onto the corresponding PCB implementation document\.  
The function returns the Unique ID value for the parameter object\.  
__Example__  
__See also__  
IParameter interface

##### DM\_Value method

\(IParameter interface\)  
__Syntax__  
Function DM\_Value : WideString;  
__Description__  
The function denotes the value placeholder for this parameter object\.  
__Example__  
__See also__  
IParameter interface

##### DM\_Visible method

\(IParameter interface\)  
__Syntax__  
Function DM\_Visible : Boolean;  
__Description__  
The function denotes whether this parameter object is visible or not\.  
__Example__  
__See also__  
IParameter interface