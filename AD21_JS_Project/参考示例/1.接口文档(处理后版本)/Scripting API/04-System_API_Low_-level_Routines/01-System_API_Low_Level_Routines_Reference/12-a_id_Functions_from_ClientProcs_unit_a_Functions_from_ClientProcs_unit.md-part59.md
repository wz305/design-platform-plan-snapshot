#### Properties

##### Autoposition property

\(ISch\_ComplexText interface\)  
__Syntax__  
Property Autoposition : Boolean Read GetState\_Autoposition Write SetState\_Autoposition;  
__Description__  
The property defines whether the parameter can be positioned automatically every time the associated component is rotated or moved\. If this property is false, the parameter will have a dot appear below it on the schematic to denote that this parameter will not be auto positioned everytime the component is rotated/moved\.

To prevent dots form being displayed, disable the MarkManualParameters property from the ISch\_Preferences interface\.  
__Example__  
__See also__  
ISch\_ComplexText interface

##### IsHidden property

\(ISch\_ComplexText interface\)  
__Syntax__  
Property IsHidden : Boolean Read GetState\_IsHidden Write SetState\_IsHidden;  
__Description__  
The property determines whether the text object is hidden or not\. This property is supported by the GetState\_IsHidden and SetState\_IsHidden methods\.  
__Example__  
__See also__  
ISch\_ComplexText interface

##### TextVertAnchor property

\(ISch\_ComplexText interface\)  
__Syntax__  
Property TextVertAnchor : TTextVertAnchor Read GetState\_TextVertAnchor Write SetState\_TextVertAnchor;  
__Description__  
This property defines the vertical justification style of the parameter object\. This property is supported by the GetState\_TextVertAnchor and SetState\_TextVertAnchor methods\.  
__Example__  
__See also__  
ISch\_ComplexText interface  
TTextVertAnchor type

##### TextHorzAnchor property

\(ISch\_ComplexText interface\)  
__Syntax__  
Property TextHorzAnchor : TTextHorzAnchor Read GetState\_TextHorzAnchor Write SetState\_TextHorzAnchor;  
__Description__  
This property defines the horizontal justification style of the parameter object\. This property is supported by the GetState\_TextHorzAnchor and SetState\_TextHorzAnchor methods\.  
__Example__  
__See also__  
ISch\_ComplexText interface  
TTextHorzAnchor type

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