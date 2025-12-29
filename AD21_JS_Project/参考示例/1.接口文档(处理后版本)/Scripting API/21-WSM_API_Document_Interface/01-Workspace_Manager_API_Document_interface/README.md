# Workspace Manager API: Document interface

__Overview__  
The __IDocument __interface represents an existing document in Altium Designer — this can be a Schematic, PCB, VHDL, PCB Library, etc document\.

When the DM\_DocumentKind method of the IDocument interface is invoked it returns the document type\. A document can be part of a project or free documents project\. An existing document can be queried to return its accociated project interface\.

__Notes__  
The __IDocument__ interface is a standalone interface\.

Methods and properties for the WSM API Document Interface reference:

__IDocument methods__  
DM\_BusCount  
DM\_Buses  
DM\_ChannelClassCount  
DM\_ChannelClasses  
DM\_ChannelIndex  
DM\_ChannelPrefix  
DM\_ChannelRoomNamingStyle  
DM\_ChildDocumentCount  
DM\_ChildDocuments  
DM\_Compile  
DM\_ComponentClassCount  
DM\_ComponentClasses  
DM\_ComponentCount  
DM\_Components  
DM\_ConstraintGroupCount  
DM\_ConstraintGroups  
DM\_CreateViolation  
DM\_CrossSheetConnectorCount  
DM\_CrossSheetConnectors  
DM\_CurrentInstanceNumber  
DM\_DifferentialPairs  
DM\_DifferentialPairCount  
DM\_DocumentIsLoaded  
DM\_DocumentIsTextual  
DM\_DocumentKind  
DM\_FileName  
DM\_FullPath  
DM\_IndentLevel  
DM\_IsPhysicalDocument  
DM\_IsPrimaryImplementationDocument  
DM\_LoadDocument  
DM\_LogicalDocument  
DM\_ModelKind  
DM\_NetClassCount  
DM\_NetClasses  
DM\_NetCount  
DM\_Nets  
DM\_ParentDocumentCount  
DM\_ParentDocuments  
DM\_PartCount  
DM\_Parts  
DM\_PhysicalDocumentCount  
DM\_PhysicalDocumentParent  
DM\_PhysicalInstanceName  
DM\_PhysicalInstancePath  
DM\_PhysicalRoomName  
DM\_PortCount  
DM\_Ports  
DM\_Project  
DM\_RoomCount  
DM\_Rooms  
DM\_RuleCount  
DM\_Rules  
DM\_ScrapCompile  
DM\_SheetSymbolCount  
DM\_SheetSymbols  
DM\_SignalManager  
DM\_TextFrameCount  
DM\_TextFrames  
DM\_UniqueComponentCount  
DM\_UniqueComponents  
DM\_UniquePartCount  
DM\_UniqueParts  
DM\_UpdateDateModified  
DM\_VHDLEntities  
DM\_VHDLEntityCount

__IDocument properties__



\(IDocument interface\)  
__Syntax__  
Function DM\_BusCount : Integer;  
__Description__  
The function returns the number of bus objects from this document\. Use this in conjunction with the DM\_Buses\(Index\) to go through each bus object\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_Buses \(Index : Integer\) : IBus;  
__Description__  
The function returns the indexed Bus instance from this document\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ChannelClassCount : Integer;  
__Description__  
The function denotes the number of Channel Classes from this document\. Use this Channel Class count in conjunction with the DM\_ChannelClasses\(index\) to go through each channel class\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ChannelClasses \(Index : Integer\) : IChannelClass;  
__Description__  
The function returns the indexed ChannelClass instance from this document\. Use this in conjunction with the DM\_ChannelClassCount function  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ChannelIndex : Integer;  
__Description__  
The function returns the channel index of this document\. This is especially for multi\-channel designs where a single source document can be referenced multiple times\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ChannelPrefix : WideString;  
__Description__  
The function returns the channel prefix of this document\. This is especially for multi\-channel designs where a single source document can be referenced multiple times\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ChannelRoomNamingStyle : TChannelRoomNamingStyle;  
__Description__  
The function returns the channel room naming style value\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ChildDocumentCount : Integer;  
__Description__  
The function returns the number of child documents relative to this document\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ChildDocuments \(Index : Integer\) : IDocument;  
__Description__  
The function returns the indexed child document\. A hierarchical design consists of multi layered parent\-child documents\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_Compile : LongBool;  
__Description__  
The function invokes the compiler to compile this document\. If the compile was successful, a true value is returned\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ComponentClassCount : Integer;  
__Description__  
The function denotes the number of component classes from this document\. Use this Component class count in conjunction with the DM\_ComponentClasses\(index\) to go through each component class\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ComponentClasses \(Index : Integer\) : IComponentClass;  
__Description__  
The function returns the indexed ComponentClass instance from this document\. Use this in conjuniton with the DM\_ComponentClassCount function\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ComponentCount : Integer;  
__Description__  
The function returns the number of component instances on this document\.  Use this in conjunction with the DM\_Components\(Index\) method to go through each component object\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_Components \(Index : Integer\) : IComponent;  
__Description__  
The function returns the indexed component instance from this document\. This is to be used in conjunction with the DM\_ComponentCount method\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ConstraintGroupCount : Integer;  
__Description__  
The function denotes the number of constraint groups\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ConstraintGroups \(Index : Integer\) : IConstraintGroup;  
__Description__  
The function returns the indexed constraint group\. Use the  DM\_ConstraintGroupCount function to get the number of constraint groups\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_CreateViolation \(AErrorKind : TErrorKind;AErrorString : WideString\) : IViolation;  
__Description__  
The function creates a violation based on the error kind and error string upon an incorrect design\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_CrossSheetConnectorCount : Integer;  
__Description__  
The function returns the number of cross sheet connectors on this document\. Use this in conjunction with the DM\_CrossConnectors\(index\) to go through each cross connector object\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_CrossSheetConnectors \(Index : Integer\) : ICrossSheet;  
__Description__  
The function returns the indexed cross sheet connector instance from this document\. This is to be used in conjunction with the DM\_CrossSheetConnectorCount method\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_CurrentInstanceNumber : Integer;  
__Description__  
The function returns the current instance number for this document \(especially for multi–channel designs where a design document can be referenced multiple times\)\.  
__Example__  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_DifferentialPairs\(Index : Integer\) : IDifferentialPair;  
__Description__  
This function returns an indexed differential pair from a document in the project\.  
__See also__  
IDocument interface  
IDifferentialPair interface


\(IDocument interface\)  
__Syntax__  
Function    DM\_DifferentialPairCount           : Integer;  
__Description__  
This function returns the number of differential pairs used in a document in the project\.  
__See also__  
IDocument interface  
IDifferentialPair interface


\(IDocument interface\)  
__Syntax__  
Function DM\_DocumentIsLoaded : Boolean;  
__Description__  
This function returns a boolean value whether this document has been loaded in Altium Designer or not\.  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_DocumentIsTextual : Boolean;  
__Description__  
The function denotes whether the document is a text document\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_DocumentKind : WideString;  
__Description__  
This function returns the document kind for the current document\. A document could be a Schematic document and thus the string returned is ‘SCH’\. Check the installation file of each server for the Server Name\.  
__Example__  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_FileName : WideString;  
__Description__  
This function returns the file name string of this document\.  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_FullPath : WideString;  
__Description__  
This function returns the full path of where this document lives\.  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_IndentLevel : Integer;  
__Description__  
The function returns the indent level for this current document with respect to the current project\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_IsPhysicalDocument : Boolean;  
__Description__  
This function returns a Boolean value whether this document is a physical document or not\. There are logical and physical documents; these terms are used to differentiate the documents in multi\-channel projects\. A multi channel design means that a single sheet is referenced repeatedly for a channel design\. This sheet is called a logical document\. A physical document \(usually a PCB document\) has components with unique names within a room which is mapped to a channel on a Schematic sheet\. So a multi channel design translates to multiple rooms with components with unique physical designators on a PCB\.

A physical designator of a PCB component is calculated to have the hierarchy path of a schematic project as well as the logical designator of the associated Schematic component to ensure that this designator for the PCB component is unique\.  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_IsPrimaryImplementationDocument : Boolean;  
__Description__  
This function returns a Boolean value whether this document is a primary implementation document \(namely a PCB document for instance\)\. A schematic document is a source document and is centric to a design project\.  
__Example__  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_LoadDocument : Boolean;  
__Description__  
This function returns a Boolean value whether this document has been loaded or not\.  
__Example__  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_LogicalDocument : IDocument;  
__Description__  
This function returns the logical document if valid\. Otherwise a nil value is returned\. There are logical and physical documents; these terms are used to differentiate the documents in multi\-channel projects\. A multi channel design means that a single sheet is referenced repeatedly for a channel design\. This sheet is called a logical document\. A physical document \(usually a PCB document\) has components with unique names within a room which is mapped to a channel on a Schematic sheet\. So a multi channel design translates to multiple rooms with components with unique physical designators on a PCB\.

A physical designator of a PCB component is calculated to have the hierarchy path of a schematic project as well as the logical designator of the associated Schematic component to ensure that this designator for the PCB component is unique\.  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_ModelKind : WideString;  
__Description__  
The function returns the model kind string related to this document\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_NetClassCount : Integer;  
__Description__  
The function denotes the number of net classes on this document\. Use this NetClass count in conjunction with the DM\_NetClasses\(Index\) method to go through each net class\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_NetClasses \(Index : Integer\) : INetClass;  
__Description__  
The function returns the indexed NetClass instance from this document\. Use this in conjunction with the DM\_NetClassCount function\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_NetCount : Integer;  
__Description__  
The function returns the number of nets from this document\. Use this Net count in conjunction with the DM\_Nets\(Index\) to go through each sheet symbol object  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_Nets \(Index : Integer\) : INet;  
__Description__  
The function returns an indexed net associated with this document\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ParentDocumentCount : Integer;  
__Description__  
The function returns the number of parent documents relative to this document\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ParentDocuments \(Index : Integer\) : IDocument;  
__Description__  
The function returns the indexed parent document\. A hierarchical design consists of multi layered parent\-child documents\.  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_PartCount : Integer;  
__Description__  
The function returns the number of part objects from this document\. Use this PartCount in conjunction with the DM\_Parts\(Index\) to go through each part object\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_Parts \(Index : Integer\) : IPart;  
__Description__  
The function returns an indexed part associated with this document\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_PhysicalDocumentCount : Integer;  
__Description__  
The function returns the number of physical documents associated with this document\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_PhysicalDocumentParent : IDocument;  
__Description__  
The function returns the IDocument interface for a parent physical document\. Could be a VHDL or a PCB document for example\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_PhysicalInstanceName : WideString;  
__Description__  
The function returns the name of this physical document if valid\. Otherwise an empty string is returned\.  
__Example__  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_PhysicalInstancePath : WideString;  
__Description__  
The function returns the path to the physical document instance if valid\. Otherwise an empty string is returned\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_PhysicalRoomName : WideString;  
__Description__  
The function returns the name of the room on this physical document if valid\. Otherwise a nil value is returned\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_PortCount : Integer;  
__Description__  
The function returns the number of port objects on this document\. Use this in conjunction with the DM\_Ports\(index\) to go through each port object\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_Ports \(Index : Integer\) : INetItem;  
__Description__  
The function returns the indexed port instance from this document\. This is to be used in conjunction with the DM\_PortCount method  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_Project : IProject;  
__Description__  
This function returns the IProject object interface that this document is associated with\.  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_RoomCount : Integer;  
__Description__  
The function denotes the number of rooms on this document\. Use this RoomCount in conjunction with the DM\_Rooms\(Index\) to go through each room object\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_Rooms \(Index : Integer\) : IRoom;  
__Description__  
The function returns the indexed room instance from this document\. Use this in conjunction with the DM\_RoomCount function\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_RuleCount : Integer;  
__Description__  
The function returns the number of rules from this document\. Use this Rule count in conjunction with the DM\_Rules\(Index\) to go through each sheet symbol object  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_Rules \(Index : Integer\) : IRule;  
__Description__  
The function denotes the indexed rule from this document\. Use this DM\_RuleCount in conjunction with the DM\_Rules to go through each rule found from this document\.\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_ScrapCompile\(ForceCompile : Boolean\) : LongBool;  
__Description__  
The function invokes a scrap compile \(by force or not\)\. A scrap compile is the background compile in Altium Designer on a design document and does all the auto \- junctions for bus and wire objects\. Also the scrap compile does the online rule checks in schematics\. It is totally separate from the main compile which compile projects\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_SheetSymbolCount : Integer;  
__Description__  
The function returns the number of sheet symbols from this document\. Use this SheetSymbol count in conjunction with the DM\_SheetSymbols\(Index\) to go through each sheet symbol object\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_SheetSymbols \(Index : Integer\) : ISheetSymbol;  
__Description__  
The function returns an indexed sheet symbol associated with this document\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_SignalManager : ISignalManager;  
__Description__  
The function returns the signal manager interface\.  
__See also__  
IDocument interface  
ISignalManager interface


\(IDocument interface\)  
__Syntax__  
Function DM\_TextFrameCount : Integer;  
__Description__  
The function returns the number of text frame objects from this document\. Use this TextFrame  count in conjunction with the DM\_TextFrames\(Index\) to go through each sheet symbol object  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_TextFrames \(Index : Integer\) : ITextFrame;  
__Description__  
The function returns an indexed textframe object associated with this document\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_UniqueComponentCount : Integer;  
__Description__  
The function returns the number of unique components according to the library \(ies\) they are placed from\. A duplicate of components of the same component kind is counted as one \(1\)\. Use this in conjunction with the DM\_UniqueComponents\(Index\) method to go through each unique component object\.  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Function DM\_UniqueComponents \(Index : Integer\) : IComponent;  
__Description__  
The function returns the indexed unique component instance from this document\. This function is to be used in conjunction with the DM\_UniqueComponentCount method\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_UniquePartCount : Integer;  
__Description__  
The function denotes the number of unique parts from this document\. Duplicates of the same part kind are only returned as a count of one \(1\)\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_UniqueParts \(Index : Integer\) : IPart;  
__Description__  
The function returns an indexed unique part associated with this document\. Note, if multiple instances of the same part exist, then only one of these parts will be recognized\.  
__See also__  
IDocument


\(IDocument interface\)  
__Syntax__  
Procedure DM\_UpdateDateModified;  
__Description__  
The procedure sets the modified date for this document\.  
__See also__  
IDocument interface


\(IDocument interface\)  
__Syntax__  
Function DM\_VHDLEntities \(Index : Integer\) : IVHDLEntity;  
__Description__  
The function returns the indexed VHDL entity instance from this document\. Use this in conjunction with the DM\_VHDLEntityCount function\.  
__See also__  
IDocument interface  
DM\_VHDLEntityCount function


\(IDocument interface\)  
__Syntax__  
Function DM\_VHDLEntityCount : Integer;  
__Description__  
The function denotes the number of VHDL entities from this document\. Use this VHDL Entity count in conjunction with the DM\_VHDLEntities\(Index\) to go through each VHDL entity\.  
__See also__  
IDocument interface  
DM\_VHDLEntities method

## 子章节

- [Methods](01-Methods.md.md)
