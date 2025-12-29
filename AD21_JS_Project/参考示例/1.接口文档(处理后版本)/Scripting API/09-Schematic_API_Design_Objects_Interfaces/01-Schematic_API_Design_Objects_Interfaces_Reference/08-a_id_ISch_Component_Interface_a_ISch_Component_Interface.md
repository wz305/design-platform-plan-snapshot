### <a id="ISch_Component_Interface"></a>ISch\_Component Interface

__Overview__  
The ISch\_Component references the logical symbol as a component that can contain links to different model implementations such as PCB, Signal Integrity and Simulation models\. Only one model of a particular model type \(PCB footprint, SIM, SI, EDIF Macro and VHDL\) can be enabled as the currently linked model, at any one time\.

Each schematic component has two system parameters – the Designator parameter and the Comment parameter\. Custom parameters can be added anytime\. The Comment parameter can be assigned an indirect name parameter\. Once a name parameter \(with a equal sign character as a prefix to the name parameter\) is assigned to the Comment field of the Component properties dialog, the value for this parameter appears on the document, ensure that the Convert Special Strings option in the Schematic Preferences dialog is enabled\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current component\. It is used for linking to an associated PCB component on a PCB document\. Enter a new UID value or click the Reset button to generate a new UID if you wish to force the Schematic component to be linked to a different PCB component\. You will need to run the Component Links\.\.\. dialog to update the linkage on the corresponding PCB document\.  
This SourceLibraryName property denotes the source library where the symbol and its associated model links are from\. The \* character in this field denotes the current library of the current project\. Note a schematic component is a symbol with a defined designator placed on a schematic document\.

The LibraryRef property is the name of the symbol\. The symbol is from the library specified in the Library field below\.  
The SheetPartyFilename property, enter a sub design project file name to be linked to the current schematic component\. An example of a sub design project is a programmable logic device project or a schematic sub\-sheet\.

__Notes__  
The ISch\_Component interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_ParametrizedGroup  
        ISch\_Component

__ISch\_Component methods__  
GetState\_AliasAsText  
GetState\_AliasAt  
GetState\_AliasCount  
GetState\_ComponentDescription  
GetState\_ComponentKind  
GetState\_ConfiguratorName  
GetState\_CurrentPartID  
GetState\_DatabaseLibraryKeys  
GetState\_DatabaseLibraryName  
GetState\_DatabaseTableName  
GetState\_DesignatorLocked  
GetState\_DisplayFieldNames  
GetState\_DisplayMode  
GetState\_DisplayModeCount  
GetState\_IsMirrored  
GetState\_LibraryPath  
GetState\_LibReference  
GetState\_Orientation  
GetState\_OverideColors  
GetState\_PartCountNoPart0  
GetState\_PartIdLocked  
GetState\_PinColor  
GetState\_PinsMoveable  
GetState\_SchComment  
GetState\_SchDesignator  
GetState\_SheetPartFileName  
GetState\_ShowHiddenFields  
GetState\_ShowHiddenPins  
GetState\_SourceLibraryName  
GetState\_TargetFileName  
GetState\_UniqueId  
SetState\_AliasAsText  
SetState\_AliasAt  
SetState\_ComponentDescription  
SetState\_ComponentKind  
SetState\_CurrentPartID  
SetState\_DesignatorLocked  
SetState\_DisplayFieldNames  
SetState\_DisplayMode  
SetState\_DisplayModeCount\_Check  
SetState\_FilePosition  
SetState\_IsMirrored  
SetState\_LibraryPath  
SetState\_LibReference  
SetState\_Orientation  
SetState\_OverideColors  
SetState\_PartCountNoPart0  
SetState\_PartIdLocked  
SetState\_PinColor  
SetState\_PinsMoveable  
SetState\_SheetPartFileName  
SetState\_ShowHiddenFields  
SetState\_ShowHiddenPins  
SetState\_SourceLibraryName  
SetState\_TargetFileName  
SetState\_UniqueId  
AddDisplayMode  
AddPart  
AddSchImplementation  
Alias\_Add  
Alias\_Clear  
Alias\_Delete  
Alias\_Remove  
DeleteDisplayMode  
DeletePart  
FullPartDesignator  
InLibrary  
InSheet  
IsIntegratedComponent  
IsMultiPartComponent  
RemoveSchImplementation  
UpdatePrimitivesAccessibility

__ISch\_Component properties__  
Alias  
AliasAsText  
AliasCount  
Comment  
ComponentDescription  
ComponentKind  
ConfiguratorName  
CurrentPartID  
DatabaseLibraryName  
DatabaseTableName  
Designator  
DesignatorLocked  
DisplayFieldNames  
DisplayMode  
DisplayModeCount  
IsMirrored  
LibraryPath  
LibReference  
Orientation  
OverideColors  
PartCount  
PartIdLocked  
PinColor  
PinsMoveable  
SheetPartFileName  
ShowHiddenFields  
ShowHiddenPins  
SourceLibraryName  
TargetFileName  
UniqueId

__See also__

#### Methods

##### AddSchImplementation method

\(ISch\_Component interface\)  
__Syntax__  
Function AddSchImplementation : ISch\_Implementation;  
__Description__  
Each schematic component can have models from one or more domains\. A schematic component can also have multiple models per domain, one of which will be the current model for that domain\.  
A model represents all the information needed for a component in a given domain, while a datafile entity \(or link\) is the only information which is in an external file\.

The models of a component are represented by the ISch\_Implementation interface\.  
The mapping of pins of a component and the nodes/ports/pads of a model are represented by the ISch\_MapDefiner interfaces\.  
The link between a model and its external data file links are represented by the ISch\_DataFileLink interfaces\.  
__Example__  
Implementation := Comp\.AddSchImplementation;  
__See also__  
ISch\_Component interface  
ISch\_Implementation interface  
ISch\_DataFileLink interface  
ISch\_MapDefiner interface

##### AddDisplayMode method

\(ISch\_Component interface\)  
__Syntax__  
Procedure AddDisplayMode;  
__Description__  
The AddDisplayMode procedure adds a graphical representation \(mode\) for the current component\. Up to 255 alternative modes can be created\.  
__Example__  
Comp\.AddDisplayMode;  
__See also__  
ISch\_Component interface

##### AddPart method

\(ISch\_Component interface\)  
__Syntax__  
Procedure AddPart;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### Alias\_Add method

\(ISch\_Component interface\)  
__Syntax__  
Procedure Alias\_Add \(S : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### Alias\_Clear method

\(ISch\_Component interface\)  
__Syntax__  
Procedure Alias\_Clear;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### Alias\_Delete method

\(ISch\_Component interface\)  
__Syntax__  
Procedure Alias\_Delete\(i : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### Alias\_Remove method

\(ISch\_Component interface\)  
__Syntax__  
Procedure Alias\_Remove\(S : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### DeleteDisplayMode method

\(ISch\_Component interface\)  
__Syntax__  
Procedure DeleteDisplayMode\(AMode : TDisplayMode\);  
__Description__  
This DeleteDisplayMode removes a display mode \(graphical representation\) from the component\.  
__Example__  
Component\.DeleteDisplayMode\(3\);  
__See also__  
TDisplayMode type from RT\_Workspace unit\. Byte type\.  
ISch\_Component interface

##### DeletePart method

\(ISch\_Component interface\)  
__Syntax__  
Procedure DeletePart \(APartId : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### FullPartDesignator method

\(ISch\_Component interface\)  
__Syntax__  
Function FullPartDesignator\(APartId : Integer\) : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_AliasAsText method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_AliasAsText : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_AliasAt method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_AliasAt\(i : Integer\) : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_AliasCount method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_AliasCount : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_ComponentDescription method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_ComponentDescription : WideString;  
__Description__  
The GetState\_ComponentDescription function returns the description string for this component\. This string is normally used to describe what this component is for\.  
__Example__  
Desc := Component\.GetState\_ComponentDescription;  
__See also__  
ISch\_Component interface

##### GetState\_ComponentKind method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_ComponentKind : TComponentKind;  
__Description__  
The GetState\_ComponentKind function returns a value of TComponentKind for the component\.

- eComponentKind\_Standard: These components possess standard electrical properties, are always synchronized and are the type most commonly used on a schematic sheet\.
- eComponentKind\_Mechanical: These components do not have electrical properties and will appear in the BOM\. They are synchronized if the same components exist on both the Schematic and PCB documents\. An example is a heatsink\.
- eComponentKind\_Graphical: These components are not used during synchronization or checked for electrical errors\. These components are used, for example, when adding company logos to documents\.
- eComponentKind\_NetTie\_BOM: These components short two or more different nets and these components will appear in the BOM and are maintained during synchronization\.
- eComponentKind\_NetTie\_NoBOM: These components short two or more different nets and these components will NOT appear in the BOM and are maintained during synchronization\.
- eComponentKind\_Standard\_NoBOM: These components possess standard electrical properties, and are synchronized BUT are not included in any BOM file produced from the file\.

__Example__  
Component\.GetState\_ComponentKind;  
__See also__  
TComponentKind from RT\_Workspace unit\.  
ISch\_Component interface

##### GetState\_CurrentPartID method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_CurrentPartID : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_DesignatorLocked method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_DesignatorLocked : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_DisplayFieldNames method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_DisplayFieldNames : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_DisplayMode method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_DisplayMode : TDisplayMode;  
__Description__  
The GetState\_DisplayMode function returns the TDisplayMode value for this component\. This TDisplayMode is a byte type from RT\_Workspace unit\.  
__Example__  
Mode := Comp\.GetState\_DisplayMode;  
__See also__  
ISch\_Component interface

##### GetState\_DisplayModeCount method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_DisplayModeCount : Integer;  
__Description__  
This GetState\_DisplayModeCount procedure returns the number of display modes or graphical representations for this component\. There can be up to 255 modes\.  
__Example__  
Count := Comp\.GetState\_DisplayModeCount;  
__See also__  
ISch\_Component interface

##### GetState\_IsMirrored method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_IsMirrored : Boolean;  
__Description__  
The GetState\_IsMirrored function determines whether the component is mirrored along the x\-axis or not\.  
__Example__  
Mirrored := Comp\.GetState\_IsMirrored;  
__See also__  
ISch\_Component interface

##### GetState\_LibraryPath method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_LibraryPath : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_LibReference method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_LibReference : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_Orientation method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_Orientation : TRotationBy90;  
__Description__  
The Orientation property determines the orientation of the component on the schematic sheet in increments of 0,90,180 and 270 degrees only\.  
This method obtains the orientation value of the component and is used in the Orientation property\.  
__Example__  
__See also__  
ISch\_Component interface  
TRotationBy90 type

##### GetState\_OverideColors method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_OverideColors : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_PartCountNoPart0 method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_PartCountNoPart0 : Integer;  
__Description__  
A component can consist of more than one part, for example a 74LS00 contains four parts\. This property returns the number of parts for the component\.  
The function returns you the number of parts for a component and is used in the PartCountNoPart0 property\.  
__Note__  
Each component also includes a non\-graphical part, Part Zero\. Part Zero is used for pins that are to be included in all parts of a multi\-part component, for example power pins\.  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_PartIdLocked method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_PartIdLocked : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_PinColor method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_PinColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_PinsMoveable method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_PinsMoveable : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_SchComment method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_SchComment : ISch\_Parameter;  
__Description__  
The Comment property determines the comment object associated with the component object\. The Component Properties dialog for this component has a Comment field\. The Parameter object has a Name and Value fields and this Name field will normally have ‘Comment’ string and a Value string\.  
__Example__  
Comp\.GetState\_SchComment := ‘LM833M’;  
__See also__  
ISch\_Parameter interface  
ISch\_Component interface

##### GetState\_SchDesignator method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_SchDesignator : ISch\_Designator;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_SheetPartFileName method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_SheetPartFileName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_ShowHiddenFields method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_ShowHiddenFields : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_ShowHiddenPins method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_ShowHiddenPins : Boolean;  
__Description__  
This property determines whether the hidden pins of a component can be hidden or not\. Power pins are often defined as hidden\. This method gets the boolean value whether the hidden pins are displayed or not and is used in the ShowHiddenPins property\.  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_SourceLibraryName method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_SourceLibraryName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_TargetFileName method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_TargetFileName : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_UniqueId method

\(ISch\_Component interface\)  
__Syntax__  
Function GetState\_UniqueId : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### InLibrary method

\(ISch\_Component interface\)  
__Syntax__  
Function InLibrary : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### InSheet method

\(ISch\_Component interface\)  
__Syntax__  
Function InSheet : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### IsIntegratedComponent method

\(ISch\_Component interface\)  
__Syntax__  
Function IsIntegratedComponent : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### IsMultiPartComponent method

\(ISch\_Component interface\)  
__Syntax__  
Function IsMultiPartComponent : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### RemoveSchImplementation method

\(ISch\_Component interface\)  
__Syntax__  
Procedure RemoveSchImplementation\(AnImplementation : ISch\_Implementation\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_AliasAsText method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_AliasAsText \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_AliasAt method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_AliasAt \(i : Integer; AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_Component____Description____ method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_Component__Description__ \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_ComponentKind method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_ComponentKind \(AValue : TComponentKind\);  
__Description__  
The SetState\_ComponentKind function sets the component of a TComponentKind value\.

- eComponentKind\_Standard: These components possess standard electrical properties, are always synchronized and are the type most commonly used on a schematic sheet\.
- eComponentKind\_Mechanical: These components do not have electrical properties and will appear in the BOM\. They are synchronized if the same components exist on both the Schematic and PCB documents\. An example is a heatsink\.
- eComponentKind\_Graphical: These components are not used during synchronization or checked for electrical errors\. These components are used, for example, when adding company logos to documents\.
- eComponentKind\_NetTie\_BOM: These components short two or more different nets and these components will appear in the BOM and are maintained during synchronization\.
- eComponentKind\_NetTie\_NoBOM: These components short two or more different nets and these components will NOT appear in the BOM and are maintained during synchronization\.
- eComponentKind\_Standard\_NoBOM: These components possess standard electrical properties, and are synchronized BUT are not included in any BOM file produced from the file\.

__Example__  
Component\.SetState\_ComponentKind\(eComponentKind\_Standard\);  
__See also__  
ISch\_Component interface

##### SetState\_CurrentPartID method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_CurrentPartID \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_DesignatorLocked method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_DesignatorLocked \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_DisplayFieldNames method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_DisplayFieldNames \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_DisplayMode method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_DisplayMode \(AValue : TDisplayMode\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_DisplayModeCount\_Check method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_DisplayModeCount\_Check \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_FilePosition method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_FilePosition \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_IsMirrored method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_IsMirrored \(AValue : Boolean\);  
__Description__  
The SetState\_IsMirrored function sets the component’s mirror property along the x\-axis\.  
__Example__  
Comp\.SetState\_IsMirrored\(True\);  
__See also__  
ISch\_Component interface

##### SetState\_LibraryPath method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_LibraryPath \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_LibReference method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_LibReference \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_Orientation method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_Orientation \(AValue : TRotationBy90\);  
__Description__  
The Orientation property determines the orientation of the component on the schematic sheet in increments of 0,90,180 and 270 degrees only\. This method sets the orientation value of the component and is used in the Orientation property\.  
__Example__  
Component\.SetState\_Orientation\(eRotate180\);  
__See also__  
TRotationBy90 type  
ISch\_Component interface

##### SetState\_OverideColors method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_OverideColors \(AValue : Boolean\);  
__Description__  
The SetState\_OverrideColors procedure sets the local colors for the component\. This component's fill, line and pin colors are overridden with the colors from the Fill, Lines and Pins color boxes respectively\.  
__Example__  
Comp\.SetState\_OverrideColors\(True\);  
__See also__  
ISch\_Component interface

##### SetState\_PartCountNoPart0 method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_PartCountNoPart0 \(AValue : Integer\);  
__Description__  
A component can consist of more than one part, for example a 74LS00 contains four parts\. This property returns the number of parts for the component\.  
The function sets the number of parts for a component and is used in the PartCountNoPart0 property\.  
__Note__  
Each component also includes a non\-graphical part, Part Zero\. Part Zero is used for pins that are to be included in all parts of a multi\-part component, for example power pins\.  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_PartIdLocked method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_PartIdLocked \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_PinColor method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_PinColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_PinsMoveable method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_PinsMoveable \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_SheetPartFileName method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_SheetPartFileName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_ShowHiddenFields method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_ShowHiddenFields \(AValue : Boolean\);  
__Description__  
The SetState\_ShowHiddenFields procedure determines the visibility of the text fields associated with the component, such as its name and filename\. If the Value is true, the hidden fields of the comonent will be displayed on the schematic sheet\. If the value is False, the hidden text fields are not shown on the schematic\.  
__Example__  
Comp\.SetState\_ShowHiddenFields\(True\); // display the hidden text fields\.  
__See also__  
ISch\_Component interface

##### SetState\_ShowHiddenPins method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_ShowHiddenPins \(AValue : Boolean\);  
__Description__  
This property determines whether the hidden pins of a component can be hidden or not\. Power pins are often defined as hidden\. This method sets the boolean value whether the hidden pins are displayed or not and is used in the ShowHiddenPins property\.  
__Example__  
Comp\.SetState\_ShowHiddenPins\(True\); // show hidden pins of this component\.  
__See also__  
ISch\_Component interface

##### SetState\_SourceLibraryName method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceLibraryName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_TargetFileName method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_TargetFileName \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SetState\_UniqueId method

\(ISch\_Component interface\)  
__Syntax__  
Procedure SetState\_UniqueId \(AValue : WideString\);  
__Description__  
The SetState\_UniqueID procedure sets the new ID for the component\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current component\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__

1

UID := WSM\.DM\_GenerateUniqueID; // interface and method from Workspace Manager API\.

2

Component\.SetState\_UniqueID\(UID\);

__See also__  
ISch\_Component interface

#### Properties

##### Alias property

\(ISch\_Component interface\)  
__Syntax__  
Property Alias\[i : Integer\] : WideString Read GetState\_AliasAt Write SetState\_AliasAt;  
__Description__  
The indexed property returns an alias string\. A component can have multiple aliases because a component name can be referred to by multiple names\. For example a SN7432 is also SN74LS32 or SN74S32\.  
__Notes__  
Use the AliasCount property to obtain the number of aliases before going through one by one\.  
__Example__  
__See also__  
ISch\_Component interface

##### AliasAsText property

\(ISch\_Component interface\)  
__Syntax__  
Property AliasAsText : WideString Read GetState\_AliasAsText Write SetState\_AliasAsText;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### AliasCount property

\(ISch\_Component interface\)  
__Syntax__  
Property AliasCount : Integer Read GetState\_AliasCount;  
__Description__  
Notes  
Use the AliasCount to obtain the count before going through each indexed Alias property one by one\.  
__Example__  
__See also__  
ISch\_Component interface

##### Comment property

\(ISch\_Component interface\)  
__Syntax__  
Property Comment : ISch\_Parameter Read GetState\_SchComment;  
__Description__  
The Comment property determines the comment object associated with the component object\. The Component Properties dialog for this component has a Comment field\. The Parameter object has a Name and Value fields and this Name field will normally have ‘Comment’ string and a Value string\.  
__Example__  
Comp\.Comment\.Name := ‘LM833M’;  
__See also__  
ISch\_Parameter interface;  
ISch\_Component interface

##### ComponentDescription property

\(ISch\_Component interface\)  
__Syntax__  
Property ComponentDescription : WideString Read GetState\_ComponentDescription Write SetState\_ComponentDescription;  
__Description__  
The ComponentDescription property determines the description string for this component\. Normally this string contains text on what this component is\. This property is supported by the GetState\_ComponentDescription and SetState\_ComponentDescription methods\.  
__Example__  
Comp\.ComponentDescription := ‘Fast Settling Dual Operational Amplifier’;  
__See also__  
ISch\_Component interface

##### ComponentKind property

\(ISch\_Component interface\)  
__Syntax__  
Property ComponentKind : TComponentKind Read GetState\_ComponentKind Write SetState\_ComponentKind;  
__Description__  
The ComponentKind property deteremines the component’s type of TComponentKind type\. This property is supported by the GetState\_ComponentKind and Setstate\_Component kind methods\.

- eComponentKind\_Standard: These components possess standard electrical properties, are always synchronized and are the type most commonly used on a schematic sheet\.
- eComponentKind\_Mechanical: These components do not have electrical properties and will appear in the BOM\. They are synchronized if the same components exist on both the Schematic and PCB documents\. An example is a heatsink\.
- eComponentKind\_Graphical: These components are not used during synchronization or checked for electrical errors\. These components are used, for example, when adding company logos to documents\.
- eComponentKind\_NetTie\_BOM: These components short two or more different nets and these components will appear in the BOM and are maintained during synchronization\.
- eComponentKind\_NetTie\_NoBOM: These components short two or more different nets and these components will NOT appear in the BOM and are maintained during synchronization\.
- eComponentKind\_Standard\_NoBOM: These components possess standard electrical properties, and are synchronized BUT are not included in any BOM file produced from the file\.

__Example__  
Component\.ComponentKind := eComponentKind\_NetTie\_BOM;  
__See also__  
TComponentKind from RT\_Workspace unit\.  
ISch\_Component interface

##### CurrentPartID property

\(ISch\_Component interface\)  
__Syntax__  
Property CurrentPartID : Integer Read GetState\_CurrentPartID Write SetState\_CurrentPartID;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### Designator property

\(ISch\_Component interface\)  
__Syntax__  
Property Designator : ISch\_Designator Read GetState\_SchDesignator;  
__Description__  
__Example__  
__See also__  
ISch\_Designator interface\.  
ISch\_Component interface

##### DisplayFieldNames property

\(ISch\_Component interface\)  
__Syntax__  
Property DisplayFieldNames : Boolean Read GetState\_DisplayFieldNames Write SetState\_DisplayFieldNames;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### DesignatorLocked property

\(ISch\_Component interface\)  
__Syntax__  
Property DesignatorLocked : Boolean Read GetState\_DesignatorLocked Write SetState\_DesignatorLocked;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### DisplayMode property

\(ISch\_Component interface\)  
__Syntax__  
Property DisplayMode : TDisplayMode Read GetState\_DisplayMode Write SetState\_DisplayMode;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### DisplayModeCount property

\(ISch\_Component interface\)  
__Syntax__  
Property DisplayModeCount : Integer Read GetState\_DisplayModeCount Write SetState\_DisplayModeCount\_Check;  
__Description__  
The property can return up to 255 display modes for the same component\. Modes are added or edited in the Schematic Library Editor\.  
This property is supported by the GetState\_DisplayModeCount and SetState\_DisplayModeCount\_Check methods\.  
__Example__  
__See also__  
ISch\_Component interface

##### IsMirrored property

\(ISch\_Component interface\)  
__Syntax__  
Property IsMirrored : Boolean Read GetState\_IsMirrored Write SetState\_IsMirrored;  
__Description__  
The IsMirrored property determines whether the component is mirrored along the x\-axis\. This property is supported by the GetState\_IsMirrored and SetState\_IsMirrored methods\.  
__Example__  
Component\.IsMirrored := False;  
__See also__  
ISch\_Component interface

##### LibraryPath property

\(ISch\_Component interface\)  
__Syntax__  
Property LibraryPath : WideString Read GetState\_LibraryPath Write SetState\_LibraryPath;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### LibReference property

\(ISch\_Component interface\)  
__Syntax__  
Property LibReference : WideString Read GetState\_LibReference Write SetState\_LibReference;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### Orientation property

\(ISch\_Component interface\)  
__Syntax__  
Property Orientation : TRotationBy90 Read GetState\_Orientation Write SetState\_Orientation;  
__Description__  
This property determines the orientation of the component on the schematic sheet in increments of 0,90,180 and 270 degrees only\. This property is supported by the GetState\_Orientation and SetState\_Orientation methods\.  
__Example__  
Component\.Orientation := eRotate180;  
__See also__  
ISch\_Component interface  
TRotationBy90 type

##### OverideColors property

\(ISch\_Component interface\)  
__Syntax__  
Property OverideColors : Boolean Read GetState\_OverideColors Write SetState\_OverideColors;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### PartCount property

\(ISch\_Component interface\)  
__Syntax__  
Property PartCount : Integer Read GetState\_PartCountNoPart0 Write SetState\_PartCountNoPart0;  
__Description__  
A component can consist of more than one part, for example a 74LS00 contains four parts\. This property returns the number of parts for the component and is supported by the GetState\_PartCountNoPart0 and SetState\_PartCountNoPart0 methods\.  
Note  
Each component also includes a non\-graphical part, Part Zero\. Part Zero is used for pins that are to be included in all parts of a multi\-part component, for example power pins\.  
__Example__  
__See also__  
ISch\_Component interface

##### PinsMoveable property

\(ISch\_Component interface\)  
__Syntax__  
Property PinsMoveable : Boolean Read GetState\_PinsMoveable Write SetState\_PinsMoveable;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### PinColor property

\(ISch\_Component interface\)  
__Syntax__  
Property PinColor : TColor Read GetState\_PinColor Write SetState\_PinColor;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### PartIdLocked property

\(ISch\_Component interface\)  
__Syntax__  
Property PartIdLocked : Boolean Read GetState\_PartIdLocked Write SetState\_PartIdLocked;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### SheetPartFileName property

\(ISch\_Component interface\)  
__Syntax__  
Property SheetPartFileName : WideString Read GetState\_SheetPartFileName Write SetState\_SheetPartFileName;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### ShowHiddenFields property

\(ISch\_Component interface\)  
__Syntax__  
Property ShowHiddenFields : Boolean Read GetState\_ShowHiddenFields Write SetState\_ShowHiddenFields;  
__Description__  
The ShowHiddenFields property determines the visibility of the text fields associated with the component, such as its name\. If the Value is true, the hidden fields of the component will be displayed on the schematic sheet\. If the value is False, the hidden text fields are not shown on the schematic\.  
__Example__  
Comp\.ShowHiddenFields := True;  
__See also__  
ISch\_Component interface

##### ShowHiddenPins property

\(ISch\_Component interface\)  
__Syntax__  
Property ShowHiddenPins : Boolean Read GetState\_ShowHiddenPins Write SetState\_ShowHiddenPins;  
__Description__  
This property determines whether the hidden pins of a component can be hidden or not\. Power pins are often defined as hidden\. This property is supported by the GetState\_ShowHiddenPins and SetState\_ShowHiddenPins methods\.  
__Example__  
Comp\.ShowHiddenPins := True;  
__See also__  
ISch\_Component interface

##### SourceLibraryName property

\(ISch\_Component interface\)  
__Syntax__  
Property SourceLibraryName : WideString Read GetState\_SourceLibraryName Write SetState\_SourceLibraryName;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### TargetFileName property

\(ISch\_Component interface\)  
__Syntax__  
Property TargetFileName : WideString Read GetState\_TargetFileName Write SetState\_TargetFileName;  
__Description__  
__Example__  
__See also__  
ISch\_Component interface

##### UniqueId property

\(ISch\_Component interface\)  
__Syntax__  
Property UniqueId : WideString Read GetState\_UniqueId Write SetState\_UniqueId;  
__Description__  
The UniqueID property sets the new ID for the component\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current component\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__

1

UID := WSM\.DM\_GenerateUniqueID; // interface and method from Workspace Manager API\.

2

Component\.UniqueID\(UID\);

__See also__  
ISch\_Component interface