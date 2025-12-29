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

### <a id="ISch_ConnectionLine_Interface"></a>ISch\_ConnectionLine Interface

__Overview__  
A connection line represents a line that has corner properties as well as width and style properties between two nodes on a schematic document\.  
__Notes__  
The ISch\_ConnectionLine interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Line  
        ISch\_BusEntry  
            ISch\_ConnectionLine

__ISch\_ConnectionLine methods__  
GetState\_IsInferred  
SetState\_IsInferred

__ISch\_ConnectionLine properties__  
IsInferred

__See also__