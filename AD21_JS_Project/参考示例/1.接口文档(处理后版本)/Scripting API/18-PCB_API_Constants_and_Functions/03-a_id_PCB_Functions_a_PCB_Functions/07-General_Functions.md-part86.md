#### Methods

##### DM\_AddConfigurationParameters method

\(IPart interface\)  
__Syntax__  
Procedure DM\_AddConfigurationParameters;  
__Description__  
The procedure adds configuration parameters to this part object\.  
__Example__  
__See also__  
IPart interface

##### DM\_AssignedDesignator method

\(IPart interface\)  
__Syntax__  
Function DM\_AssignedDesignator : WideString;  
__Description__  
The function denotes the assigned designator for this part which is equivalent to the DM\_CalculatedDesignator method\.  The DM\_AssignedDesignator method returns a string that contains the designator and multi channel information but does not include multi part id information\.

This function returns the calculated designator string which contains the hierarchical path and the logical designator strings\. Only when a project is compiled and up to date, designators of parts are calculated based on the compiled documents they are on\.  
__Example__  
__See also__  
IPart interface  
DM\_CalculatedDesignator method

##### DM\_CalculatedDesignator method

\(IPart interface\)  
__Syntax__  
Function DM\_CalculatedDesignator : WideString;  
__Description__  
The function denotes the system compiled designator for this part\. The assigned designator for this part is equivalent to the DM\_CalculatedDesignator method\. A DM\_CalculatedDesignator method returns a string that contains the designator and multi channel information but does not include multi part information\.

This function returns the calculated designator string which contains the hierarchical path and the logical designator strings\. Only when a project is compiled and up to date, designators of parts are calculated based on the compiled documents they are on\.  
__Example__  
__See also__  
IPart interface

##### DM\_CenterLocationX method

\(IPart interface\)  
__Syntax__  
Function DM\_CenterLocationX : Integer;  
__Description__  
The function returns the central location X of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface

##### DM\_CenterLocationY method

\(IPart interface\)  
__Syntax__  
Function DM\_CenterLocationY : Integer;  
__Description__  
The function returns the central location Y of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface

##### DM\_ChannelOffset method

\(IPart interface\)  
__Syntax__  
Function DM\_ChannelOffset : Integer;  
__Description__  
The offset represents which part is offset in relation to the reference channel and the associated channels are also affected\. The function returns the ChannelOffset value\.  
__Example__  
__See also__  
IPart interface

##### DM\_ChildProjectSheet method

\(IPart interface\)  
__Syntax__  
Function DM\_ChildProjectSheet : IDocument;  
__Description__  
The function denotes the IDocument interface representing the child project sheet associated with this part\.  
__Example__  
__See also__  
IPart interface

##### DM\_ChildVHDLEntity method

\(IPart interface\)  
__Syntax__  
Function DM\_ChildVHDLEntity : WideString;  
__Description__  
The function returns the Child VHDL entity string representing the VHDL document that the part \(component\) is linked to\.  
__Example__  
__See also__  
IPart interface

##### DM\_Comment method

\(IPart interface\)  
__Syntax__  
Function DM\_Comment : WideString;  
__Description__  
The function denotes the comment string for this part\.  
__Example__  
__See also__  
IPart interface

##### DM\_ComponentKind method

\(IPart interface\)  
__Syntax__  
Function DM\_ComponentKind : TComponentKind;  
__Description__  
This function denotes the component kind that this part is represented as in the BOM and maintained during synchronization\.  
A component kind can be one of the following:

- eComponentKind\_Standard : These components possess standard electrical properties, are always synchronized and are the type most commonly used on a board\.
- eComponentKind\_Mechanical: These components do not have electrical properties and will appear in the BOM\. They are synchronized if the same components exist on both the Schematic and PCB documents\. An example is a heatsink\.
- eComponentKind\_Graphical: These components are not used during synchronization or checked for electrical errors\. These components are used, for example, when adding company logos to documents\.
- eComponentKind\_NetTie\_BOM: These components short two or more different nets for routing and these components will appear\.
- eComponentKind\_NetTie\_NoBOM: These components short two or more different nets for routing and these components will NOT appear in the BOM and are maintained during synchronization\.

__Example__  
__See also__  
IPart interface  
TComponentKind type

##### DM\_CurrentImplementation method

\(IPart interface\)  
__Syntax__  
Function DM\_CurrentImplementation \(AType : WideSTring\) : IComponentImplementation;  
__Description__  
The function returns the current implementation which is usually a PCB footprint\.  
__Example__  
__See also__  
IPart interface  
IComponentImplementation interface

##### DM\_Description method

\(IPart interface\)  
__Syntax__  
Function DM\_Description : WideString;  
__Description__  
The function denotes the description of the reference link to a source component or as a device name\.  
__Example__  
__See also__  
IPart interface

##### DM\_DesignatorLocationX method

\(IPart interface\)  
__Syntax__  
Function DM\_DesignatorLocationX : Integer;  
__Description__  
The function returns the location X of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface

##### DM\_DesignatorLocationY method

\(IPart interface\)  
__Syntax__  
Function DM\_DesignatorLocationY : Integer;  
__Description__  
The function returns the location Y of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface

##### DM\_DesignatorLocked method

\(IPart interface\)  
__Syntax__  
Function DM\_DesignatorLocked : Boolean;  
__Description__  
The function denotes whether or not the designator string is locked \(unmoveable\)\.  
__Example__  
__See also__  
IPart interface

##### DM\_DisplayMode method

\(IPart interface\)  
__Syntax__  
Function DM\_DisplayMode : TDisplayMode;  
__Description__  
The function Denotes one of the 255 display modes\. The mode 0 is the normal graphical display for this part object\. The other 254 modes are alternative graphical displays of this same part object\.  
__Example__  
__See also__  
IPart interface

##### DM\_FirstPinLocationX method

\(IPart interface\)  
__Syntax__  
Function DM\_FirstPinLocationX : Integer;  
__Description__  
The function denotes the reference X location of the first pin of a part object\.  
__Example__  
__See also__  
IPart interface

##### DM\_FirstPinLocationY method

\(IPart interface\)  
__Syntax__  
Function DM\_FirstPinLocationY : Integer;  
__Description__  
The function denotes the reference Y location of the first pin of a part object\.  
__Example__  
__See also__  
IPart interface

##### DM\_Footprint method

\(IPart interface\)  
__Syntax__  
Function DM\_Footprint : WideString;  
__Description__  
The function denotes the footprint string that this part is associated with\.  
__Example__  
__See also__  
IPart interface

##### DM\_FullLogicalDesignator method

\(IPart interface\)  
__Syntax__  
Function DM\_FullLogicalDesignator : WideString;  
__Description__  
The function denotes the full logical designator which includes the part designator and part id information\.  
__Example__  
__See also__  
IPart interface

##### DM\_FullPhysicalDesignator method

\(IPart interface\)  
__Syntax__  
Function DM\_FullPhysicalDesignator : WideString;  
__Description__  
The function denotes the full physical designator of a part which includes the calculated designator and the part id information on compiled schematic sheets\.  
__Example__  
__See also__  
IPart interface

##### DM\_Height method

\(IPart interface\)  
__Syntax__  
Function DM\_Height : Integer;  
__Description__  
The function denotes the height property of the part object\. A part object is “part” of a multi\-part component\.  
__Example__  
__See also__  
IPart interface

##### DM\_ImplementationCount method

\(IPart interface\)  
__Syntax__  
Function DM\_ImplementationCount : Integer;  
__Description__  
The function returns the number of implementations of this schematic component\.  
__Example__  
__See also__  
IPart interface

##### DM\_Implementations method

\(IPart interface\)  
__Syntax__  
Function DM\_Implementations \(Index : Integer\) : IComponentImplementation;  
__Description__  
The function returns the particular IComponentImplementation for the specified indexed implementations of a Schematic component\.  
__Example__  
__See also__  
IPart interface

##### DM\_InstanceCount method

\(IPart interface\)  
__Syntax__  
Function DM\_InstanceCount : Integer;  
__Description__  
The function returns the number of instances of this part\.  
__Example__  
__See also__  
IPart interface

##### DM\_Layer method

\(IPart interface\)  
__Syntax__  
Function DM\_Layer : WideString;  
__Description__  
The function denotes which layer this part is on\.  
__Example__  
__See also__  
IPart interface

##### DM\_LibraryReference method

\(IPart interface\)  
__Syntax__  
Function DM\_LibraryReference : WideString;  
__Description__  
The function denotes the name of the component from the library  
__Example__  
__See also__  
IPart interface

##### DM\_LogicalDesignator method

\(IPart interface\)  
__Syntax__  
Function DM\_LogicalDesignator : WideString;  
__Description__  
The function denotes the logical designator of this part on a schematic sheet\.  
__Example__  
__See also__  
IPart interface

##### DM\_LogicalOwnerDocument method

\(IPart interface\)  
__Syntax__  
Function DM\_LogicalOwnerDocument : IDocument;  
__Description__  
The function denotes the IDocument representing the logical owner document that this part is associated to a schematic component\.  
__Example__  
__See also__  
IPart interface

##### DM\_MaxPartCount method

\(IPart interface\)  
__Syntax__  
Function DM\_MaxPartCount : Integer;  
__Description__  
The function returns the maximum part count for this part object\.  
__Example__  
__See also__  
IPart interface

##### DM\_NewDesignator method

\(IPart interface\)  
__Syntax__  
Function DM\_NewDesignator : WideString;  
__Description__  
The function denotes the new designator for this part\.  
__Example__  
__See also__  
IPart interface

##### DM\_NewPartId method

\(IPart interface\)  
__Syntax__  
Function DM\_NewPartId : Integer;  
__Description__  
The function denotes the new part id for this part\.  
__Example__  
__See also__  
IPart interface

##### DM\_PartID method

\(IPart interface\)  
__Syntax__  
Function DM\_PartID : Integer;  
__Description__  
The function denotes the PartID for this part\. A multi\-part component references each part by its PartID, for example a four part component has four unique PartIDs\.  
__Example__  
__See also__  
IPart interface

##### DM\_PartIdLocked method

\(IPart interface\)  
__Syntax__  
Function DM\_PartIdLocked : Boolean;  
__Description__  
The function denotes whether or not the part id string is locked \(unmoveable\)\.  
__Example__  
__See also__  
IPart interface

##### DM\_PartType method

\(IPart interface\)  
__Syntax__  
Function DM\_PartType : WideString;  
__Description__  
The function denotes the part type for this part\. \(Footprint type\)\.  
__Example__  
__See also__  
IPart interface

##### DM\_PhysicalDesignator method

\(IPart interface\)  
__Syntax__  
Function DM\_PhysicalDesignator : WideString;  
__Description__  
The function denotes the physical designator string of a part\. Note, a logical designator doesn't include the channel instance string\.  
__Example__  
__See also__  
IPart interface

##### DM\_PinCount method

\(IPart interface\)  
__Syntax__  
Function DM\_PinCount : Integer;  
__Description__  
The function returns the number of pins for this schematic component\.  
__Example__  
__See also__  
IPart interface

##### DM\_Pins method

\(IPart interface\)  
__Syntax__  
Function DM\_Pins \(Index : Integer\) : INetItem;  
__Description__  
The function returns the INetItem interface for the specified indexed Pin of a Schematic Component\.  
__Example__  
__See also__  
IPart interface

##### DM\_ReferenceLocationX method

\(IPart interface\)  
__Syntax__  
Function DM\_ReferenceLocationX : Integer;  
__Description__  
The function returns the reference location X of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface

##### DM\_ReferenceLocationY method

\(IPart interface\)  
__Syntax__  
Function DM\_ReferenceLocationY : Integer;  
__Description__  
The function returns the reference location Y of the designator associated with this component\.  
__Example__  
__See also__  
IPart interface

##### DM\_Rotation method

\(IPart interface\)  
__Syntax__  
Function DM\_Rotation : Double;  
__Description__  
The function denotes the rotation property of a part \(orientation\) in degrees\.  
__Example__  
__See also__  
IPart interface

##### DM\_SourceDesignator method

\(IPart interface\)  
__Syntax__  
Function DM\_SourceDesignator : WideString;  
__Description__  
The function denotes the current designator of the source component from the corresponding schematic\.  
__Example__  
__See also__  
IPart interface

##### DM\_SourceHierarchicalPath method

\(IPart interface\)  
__Syntax__  
Function DM\_SourceHierarchicalPath : WideString;  
__Description__  
The function denotes the source reference path to the PCB component\. The path can be multi level depending on whether it is a multi channel or a bormal design\. When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
__Example__  
__See also__  
IPart interface

##### DM\_SourceLibraryName method

\(IPart interface\)  
__Syntax__  
Function DM\_SourceLibraryName : WideString;  
__Description__  
The function denotes the name of the source library where the schematic component and its associated part come from\.  
__Example__  
__See also__  
IPart interface

##### DM\_SourceUniqueId method

\(IPart interface\)  
__Syntax__  
Function DM\_SourceUniqueId : WideString;  
__Description__  
Unique IDs \(UIDs\) are used to match each schematic component to the corresponding PCB component\. When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library pathnames\. The UID is a system generated value that uniquely identifies the source component\.  
The function returns the UniqueID for this part\.  
__Example__  
__See also__  
IPart interface

##### DM\_SubProject method

\(IPart interface\)  
__Syntax__  
Function DM\_SubProject : WideString;  
__Description__  
The function returns the sub project string of this part\. A part can represent a schematic sheet, like a sheet symbol\.  
__Example__  
__See also__  
IPart interface

##### DM\_UniqueId method

\(IPart interface\)  
__Syntax__  
Function DM\_UniqueId : WideString;  
__Description__  
The function denotes the Unique ID for this part\. Unique IDs are used in Schematic – PCB documents synchronization so that Sch components and its corresponding PCB components are in sync\.  
__Example__  
__See also__  
IPart interface

##### DM\_UniqueIdName method

\(IPart interface\)  
__Syntax__  
Function DM\_UniqueIdName : WideString;  
__Description__  
The function denotes the Unique ID name of this part\.  
__Example__  
__See also__  
IPart interface

##### DM\_UniqueIdPath method

\(IPart interface\)  
__Syntax__  
Function DM\_UniqueIdPath : WideString;  
__Description__  
The function denotes the Unique ID path of this part \(includes the back slash\)\.  
__Example__  
__See also__  
IPart interface

### <a id="IPin_interface"></a>IPin interface

__Overview__  
The IPin interface is a pin object interface to an existing pin object on the schematic\. Pins are special objects that have electrical characteristics and are used to direct signals in and out of components\. Pins connect directly to other pins, wires, net labels, sheet entries or ports\.  
__Notes__  
The IPin interface is inherited from the INetItem interface\.  
The pins are part of a schematic component, thus if you wish to have access to the pins, invoke the DM\_Pins and DM\_PinCount method call from the part object interface\.  
An equivalent Pin object representation is the ISch\_Pin interface in Schematic API Reference  
__Example__

01

For J := 0 to Doc\.DM\_ComponentCount \- 1 Do

02

Begin

03

    Comp := Doc\.DM\_Components\(J\);

04

    //Comp\.DM\_Footprint;

05

    //Comp\.DM\_Comment;

06

    For K := 0 to Comp\.DM\_PinCount \- 1 Do

07

    Begin

08

        Pin := Comp\.DM\_Pins\(K\);

09

        PinName := Pin\.DM\_PinNumber;

10

        // Check for parts of a multi\-part component that are not used in the project

11

        // then add 'No Net' for unused pins\.\.\.

12

        If Pin\.DM\_FlattenedNetName = '?' Then

13

           // these pins of the part is not used on the schematic\.

14

    End;

15

End;

__See also__  
INetItem interface

### <a id="IPort_interface"></a>IPort interface

__Overview__  
The IPort interface is a port object interface to an existing port object on the schematic\. A port is used to connect a net on one sheet to Ports with the same name on other sheets\.  Ports can also connect from child sheets to Sheet entries, in the appropriate sheet symbol on the parent sheet\.  
__Notes__  
The IPort interface is inherited from the INetItem interface\.  
An equivalent Port object representation is the ISch\_Port class in Schematic API Reference\.  
__Example__

01

Var

02

    DM\_Port        : IPort;

03

    I              : Integer;

04

    S              : TDynamicString;

05

    ServerDocument : IServerDocument;

06

Begin

07

    If ADM\_Document = Nil Then Exit;

08

    If Not ADM\_Document\.DM\_ValidForNavigation Then Exit;

09

  

10

    S := ADM\_Document\.DM\_FullPath;

11

    ServerDocument := Client\.GetDocumentByPath\(PChar\(S\)\);

12

    If ServerDocument = Nil Then Exit;

13

  

14

    If Not StringsEqual\(TDynamicString\(ServerDocument\.Kind\), 'Sch'\) Then Exit;

15

  

16

    For i := 0 To ADM\_Document\.DM\_PortCount \- 1 Do

17

    Begin

18

        DM\_Port := ADM\_Document\.DM\_Ports\(i\);

19

        If DM\_Port <> Nil Then

20

          If DM\_Port\.DM\_ValidForNavigation Then

21

        Begin

22

           // port is available for manipulation here\. 

23

        End;

24

    End;

25

End;

__See also__  
INetItem interface

### <a id="IPowerObject_interface"></a>IPowerObject interface

__Overview__  
The IPowerObject interface is a power object interface to an existing power object on the schematic\. Power ports are special symbols that represent a power supply and are always identified by their net names\.  
__Notes__  
The IPowerObject interface is inherited from the INetItem interface\.  
An equivalent PowerObject object representation is the ISch\_PowerObject class in Sch API Reference\.  
__See also__  
INetItem interface\.

### <a id="IRoom_Interface"></a>IRoom interface

__Overview__  
The IRoom interface is a PCB room object\. A room is controlled by the room design rule\. This room serves as a boundary constraint for a group of specified components as a component or channel class\.  
__Interface Methods__

__Method__

__Description__

Function    DM\_LX : Integer;

Returns the lower X coordinate of the room object\.

Function    DM\_LY : Integer;

Returns the lower Y coordinate of the room object\.

Function    DM\_HX : Integer;

Returns the higher X coordinate of the room object\.

Function    DM\_HY : Integer;

Returns the higher Y coordinate of the room object\.

Function    DM\_RoomName : WideString;

Returns the name of this room object\.

Function    DM\_Scope1Expression : WideString;

Returns the scope 1 expression which describes the scope of this room object\.

Function    DM\_Layer : Integer;  

Returns the PCB layer where the room resides on\.

### IRoom Interface

__Overview__  
The IRoom interface is a PCB room object\. A room is controlled by the room design rule\. This room serves as a boundary constraint for a group of specified components as a component or channel class\.

__IRoom methods__  
DM\_LX  
DM\_LY  
DM\_HX  
DM\_HY  
DM\_RoomName  
DM\_Scope1Expression  
DM\_Layer

__IRoom properties__