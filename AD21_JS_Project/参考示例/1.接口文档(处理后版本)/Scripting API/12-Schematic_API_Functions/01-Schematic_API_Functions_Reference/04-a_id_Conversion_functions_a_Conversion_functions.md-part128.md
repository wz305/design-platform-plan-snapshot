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

### <a id="IPart_interface"></a>IPart interface

__Overview__  
The __IPart__ interface is the interface of an existing schematic part on a Schematic sheet\. A part object is “part” of a component, that is, a multi\-part component consists of part objects\. For example a multiple gate integrated circuit has duplicate gates, and that a component represents the multi\-part gate and a part represents the gate itself\.

An equivalent component object representation is the __ISch\_Component__ class in Schematic API\. The __ISch\_Component__ interface represents a component that can contain links to different model implementations such as PCB, Signal Integrity and Simulation models\. Only one model of a particular model type \(PCB footprint, SIM, SI, EDIF Macro and VHDL\) can be enabled as the currently linked model, at any one time\.

__IPart methods__  
DM\_AddConfigurationParameters  
DM\_AssignedDesignator  
DM\_CalculatedDesignator  
DM\_CenterLocationX  
DM\_CenterLocationY  
DM\_ChannelOffset  
DM\_ChildProjectSheet  
DM\_ChildVHDLEntity  
DM\_Comment  
DM\_ComponentKind  
DM\_ConfiguratorName  
DM\_CurrentImplementation  
DM\_Description  
DM\_DesignatorLocationX  
DM\_DesignatorLocationY  
DM\_DesignatorLocked  
DM\_DisplayMode  
DM\_FirstPinLocationX  
DM\_FirstPinLocationY  
DM\_Footprint  
DM\_FullLogicalDesignator  
DM\_FullPhysicalDesignator  
DM\_Height  
DM\_ImplementationCount  
DM\_Implementations  
DM\_InstanceCount  
DM\_Layer  
DM\_LibraryReference  
DM\_LogicalDesignator  
DM\_LogicalOwnerDocument  
DM\_MaxPartCount  
DM\_NewDesignator  
DM\_NewPartId  
DM\_PartID  
DM\_PartIdLocked  
DM\_PartType  
DM\_PhysicalDesignator  
DM\_PinCount  
DM\_Pins  
DM\_ReferenceLocationX  
DM\_ReferenceLocationY  
DM\_Rotation  
DM\_SourceDesignator  
DM\_SourceHierarchicalPath  
DM\_SourceLibraryName  
DM\_SourceUniqueId  
DM\_SubProject  
DM\_UniqueId  
DM\_UniqueIdName  
DM\_UniqueIdPath

__IPart properties__