#### Methods

##### DM\_MemberCount method

\(IObjectClass interface\)  
__Syntax__  
Function DM\_MemberCount : Integer;  
__Description__  
The function returns the number of members associated with the object class \(one of its descendants ie Channel Class, Component class or Net class\)\.  
This method is to be used in conjunction with the DM\_Members\(index\) method\.  
__Example__  
__See also__  
IObjectClass interface

##### DM\_Members method

\(IObjectClass interface\)  
__Syntax__  
Function DM\_Members \(Index : Integer\) : WideString;  
__Description__  
The function returns the indexed member of the object class \(one of its descendants that is, a channel class, component class or a net class\)\.  
__Example__  
__See also__  
IObjectClass interface

##### DM\_Name method

\(IObjectClass interface\)  
__Syntax__  
Function DM\_Name : WideString;  
__Description__  
The function returns the name of the Object class \(one of its descendants ie Channel Class, Component class or Net class\)  
__Example__  
__See also__  
IObjectClass interface

### <a id="IParameter_interface"></a>IParameter interface

__Overview__  
The IParameter interface is a parameter object interface to an existing parameter object on a schematic sheet\. There are two types of parameters – system parameters which are owned by a schematic document and parameters owned by certain schematic design objects\.

A parameter is a child object of a Parameter Set, Part, Pin, Port, or Sheet Symbol object\. A Parameter object has a Name property and Value property which can be used to store information, thus the parameters are a way of defining and associating information and could include strings that identify component manufacturer, date added to the document and also a string for the component's value \(e\.g\. 100K for a resistor or 10PF for a capacitor\)\.

Each parameter has a Unique Id assigned to it\. This is used for those parameters that have been added as design rule directives\. When transferring the design to the PCB document, any defined rule parameters will be used to generate the relevant design rules in the PCB\. These generated rules will be given the same Unique Ids, allowing you to change rule constraints in either schematic or PCB and push the change across when performing a synchronization\.

An equivalent object representation is the ISch\_Parameter class in the Sch API reference\.

__Interface Methods__

__Method__

__Description__

Function   DM\_Name          : WideString;

Denotes the name of the parameter object\.

Function   DM\_ConfigurationName : WideString;

Returns the configuration name, that the parameter object is associated with\.

Function   DM\_Kind          : TParameterKind;

Denotes the specific kind that can be assigned to this parameter object\. String, Boolean, Integer or float\.\.

Function   DM\_Value         : WideString;

Denotes the value placeholder for this parameter object\.

Function DM\_RawText : WideString

Returns the raw text for this parameter object\.

Function   DM\_UniqueId      : WideString;

Any parameter that is configured as a container for design rule directives need to have a unique ID that will be ported onto the corresponding PCB implementation document\.

Function   DM\_Description   : WideString;

Denotes the description of this parameter object\.

Function   DM\_NewName       : WideString;

Denotes the New Name for the parameter object, especially when there is an ECO change\. You can then compare the original and new names\.

Function   DM\_NewValue      : WideString;

Denoes the New Value for the parameter object, especially when there is an ECO change\. You can then compare the original and new values\.

Function   DM\_OriginalOwner : IDMObject;

This function returns the interface of the owner object this parameter object is associated with\.

Function   DM\_Visible       : Boolean;

Denotes whether this parameter object is visible or not\.

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