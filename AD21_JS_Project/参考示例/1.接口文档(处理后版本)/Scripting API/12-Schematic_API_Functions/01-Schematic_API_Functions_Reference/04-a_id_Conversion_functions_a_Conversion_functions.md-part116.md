#### Methods

##### DM\_AddConfigurationParameters method

\(IProject interface\)  
__Syntax__  
Procedure DM\_AddConfigurationParameters\(Configuration : WideString\);  
__Description__  
A configuration is a list of constraints file which manages the mapping of pins to ports of a FPGA project\. Invoke this method to add parameters of a specified configuration file for a FPGA project\.  
__See also__  
IProject interface

##### DM\_AddConfigurationParameters\_Physical method

\(IProject interface\)  
__Syntax__  
Procedure DM\_AddConfigurationParameters\_Physical\(Configuration : WideString\);  
__Description__  
A configuration is a list of constraints file which manages the mapping of pins to ports of a FPGA project\. Invoke this method to add parameters of a specified configuration file for a FPGA project\.  
__See also__  
IProject interface

##### DM\_AddControlPanel method

\(IProject interface\)  
__Syntax__  
Procedure DM\_AddControlPanel \(Filename : WideString\);  
__Description__  
The procedure adds a document to the main section of the the panel which could be part of a project or free documents\.  
__See also__  
IProject interface

##### DM\_AddGeneratedDocument method

\(IProject interface\)  
__Syntax__  
Procedure DM\_AddGeneratedDocument \(Filename : WideString\);  
__Description__  
This procedure adds a new generated document referenced by its filename parameter in this current project, and this document appears in the __Generated__ folder of this project on Altium Designer Projects panel\.  
__See also__  
IProject interface

##### DM\_AddSearchPath method

\(IProject interface\)  
__Syntax__  
Procedure DM\_AddSearchPath \(SearchPath : WideString; IncludeSubFolders : Boolean\);  
__Description__  
This procedure adds a new serach path for the current project\.  
__See also__  
IProject interface

##### DM\_AddSourceDocument method

\(IProject interface\)  
__Syntax__  
Procedure DM\_AddSourceDocument \(Filename : WideString\);  
__Description__  
The procedure adds a source document referenced by its filename parameter in the current project\.  
__See also__  
IProject interface

##### DM\_ChannelDesignatorFormat method

\(IProject interface\)  
__Syntax__  
Function DM\_ChannelDesignatorFormat : WideString;  
__Description__  
This function returns the formatted channel designator string\. This string is basedon the settings defined in the Multi\-Channel page of the Options for Project dialog from the Project » Project Options menu item\.  
__See also__  
IProject interface

##### DM\_ChannelRoomLevelSeperator method

\(IProject interface\)  
__Syntax__  
Function DM\_ChannelRoomLevelSeperator : WideString;  
__Description__  
The function returns the separator character for the Channel Room Level string\. The default is an underline character used for room naming styles when there are paths \(based on hierarchical designs\)\.  
__See also__  
IProject interface

##### DM\_ChannelRoomNamingStyle method

\(IProject interface\)  
__Syntax__  
Function DM\_ChannelRoomNamingStyle : TChannelRoomNamingStyle;  
__Description__  
The function returns the TChannelRoomNamingStyle type\. There are alternative styles for naming rooms on a PCB document\.  
__See also__  
IProject interface

##### DM\_ClearViolations method

\(IProject interface\)  
__Syntax__  
Procedure DM\_ClearViolations;  
__Description__  
The procedure clears all existing violations within the project\.  
__See also__  
IProject interface

##### DM\_Compile method

\(IProject interface\)  
__Syntax__  
Function DM\_Compile : LongBool;  
__Description__  
Invoke this function to compile the current project\. Once the project is compiled, navigation of nets and comparing the differences of documents and other tasks can be performed\.  
__See also__  
IProject interface

##### DM\_CompileEx method

\(IProject interface\)  
__Syntax__  
Function DM\_CompileEx\(All : LongBool; Var Cancelled : LongBool\) : LongBool;  
__Description__  
Invoke this function to compile all documents of all opened projects in Altium Designer\. Pass a Boolean parmeter in to cancel the compiling process\.  
__See also__  
IProject interface

##### DM\_ComponentMappings method

\(IProject interface\)  
__Syntax__  
Function DM\_ComponentMappings \(AnImplementationDocument : WideString\) : IComponentMappings;  
__Description__  
The function returns the IComponentMapping interface which details which PCB components are linked to Schematic components\. Check the IComponentMappings interface\.  
__See also__  
IProject interface

##### DM\_ConfigurationCount method

\(IProject interface\)  
__Syntax__  
Function DM\_ConfigurationCount : Integer;  
__Description__  
The function returns the number of configurations for the current project\. To be used in conjunction with DM\_Configurations function\.  
__Example__  
__See also__  
IProject interface

##### DM\_Configurations method

\(IProject interface\)  
__Syntax__  
Function DM\_Configurations \(Index : Integer \) : IConfiguration;  
__Description__  
The function returns the indexed configuration of a FPGA project\. A configuration can have a list of different constraint files\.  
__See also__  
IProject interface

##### DM\_CurrentProjectVariant method

\(IProject interface\)  
__Syntax__  
Function DM\_CurrentProjectVariant : IProjectVariant;  
__Description__  
The function returns the current project variant from this current project\. Check out the IProjectVariant interface\.  
__See also__  
IProject interface

##### DM\_DoCrossSelection method

\(IProject interface\)  
__Syntax__  
Procedure DM\_DoCrossSelection  
__Description__  
Activates the cross probing function where you can jump from a Schematic object to its corresponding PCB object \(both source and primary implementation documents need to be open in Altium Designer\)\.  
__See also__  
IProject interface

##### DM\_DocumentFlattened method

\(IProject interface\)  
__Syntax__  
Function DM\_DocumentFlattened : IDocument;  
__Description__  
The function returns the flattened document\. A flattened document is part of a flattened hierarchy of a project and all objects of this project appear in the Instance list of the Navigator panel\.  
__See also__  
IProject interface

##### DM\_EditOptions method

\(IProject interface\)  
__Syntax__  
Function DM\_EditOptions\(DefaultPage : WideString\) : LongBool;  
__Description__  
__Example__  
__See also__  
IProject interface

##### DM\_ErrorLevels method

\(IProject interface\)  
__Syntax__  
Function DM\_ErrorLevels \(AErrorKind : TErrorKind\) : TErrorLevel;  
__Description__  
The function returns the error level for the specified error type\. For each violation type, you can have up to four different error levels, No Report, Warning, Error and Fatal Error with four different colored folders\.  
__See also__  
IProject interface

##### DM\_GeneratedDocumentCount method

\(IProject interface\)  
__Syntax__  
Function DM\_GeneratedDocumentCount : Integer;  
__Description__  
The function returns the number of generated documents such as those documents generated by the OutPut generator \(from a OutJob document\)\. Use this function in conjunction with the DM\_GeneratedDocuments function\.  
__Example__  
__See also__  
IProject interface

##### DM\_GeneratedDocuments method

\(IProject interface\)  
__Syntax__  
Function DM\_GeneratedDocuments \(Index : Integer \) : IDocument;  
__Description__  
The function returns the indexed generated document which is generated by the Output Generator\.  
__See also__  
IProject interface

##### DM\_GetAllowPortNetNames method

\(IProject interface\)  
__Syntax__  
Function DM\_GetAllowPortNetNames : Boolean;  
__Description__  
Invoke this function to check whether port net names are used for navigation in Altium Designer or not\.  
__See also__  
IProject interface

##### DM\_GetAllowSheetEntryNetNames method

\(IProject interface\)  
__Syntax__  
Function DM\_GetAllowSheetEntryNetNames : Boolean;  
__Description__  
Invoke this function to check whether sheet entry net anmes are used for navigation in Altium Designer or not\.  
__See also__  
IProject interface

##### DM\_GetAppendSheetNumberToLocalNets method

\(IProject interface\)  
__Syntax__  
Function DM\_GetAppendSheetNumberToLocalNets : Boolean;  
__Description__  
Invoke this function to check whether sheet numbers are appended to local nets or not\.  
__See also__  
IProject interface

##### DM\_GetConfigurationByName method

\(IProject interface\)  
__Syntax__  
Function DM\_GetConfigurationByName\(Configuration : WideString\) : IConfiguration;  
__Description__  
The function returns you the configuration object for the project \(normally for FPGA projects\) if configuration parameter is valid\. A configuration file contains mapping information to link from a FPGA project to a linked PCB project\.  
__See also__  
IProject interface

##### DM\_GetDefaultConfiguration method

\(IProject interface\)  
__Syntax__  
Function DM\_GetDefaultConfiguration : IConfiguration;  
__Description__  
The function returns the default configuration for a FPGA project\.  
__See also__  
IProject interface

##### DM\_GetDefaultConfigurationName method

\(IProject interface\)  
__Syntax__  
Function DM\_GetDefaultConfigurationName : WideString;  
__Description__  
Returns the name of the default configuration for a FPGA project  
__See also__  
IProject interface

##### DM\_GetDefaultPcbType method

\(IProject interface\)  
__Syntax__  
Function DM\_GetDefaultPcbType : WideString;  
__Description__  
__Example__  
__See also__  
IProject interface

##### DM\_GetDocumentFromPath method

\(IProject interface\)  
__Syntax__  
Function DM\_GetDocumentFromPath\(DocumentPath : WideString\) : IDocument;  
__Description__  
This function returns the IDocument interface associated with the document path parameter\. Otherwise a Nil value is returned\.  
__See also__  
IProject interface

##### DM\_GetOutputPath method

\(IProject interface\)  
__Syntax__  
Function DM\_GetOutputPath : WideString;  
__Description__  
The function returns the output path for generated documents for the current project\.  
__See also__  
IProject interface

##### DM\_GetScrapDocument method

\(IProject interface\)  
__Syntax__  
Function DM\_GetScrapDocument\(DocumentPath : WideString\) : IDocument;  
__Description__  
Returns the scrap document for the project\. A scrap document is a temporary document used when creating a new document and once a document is saved, the contents of the scrap document is copied and freed\.  
__See also__  
IProject interface

##### DM\_HierarchyMode method

\(IProject interface\)  
__Syntax__  
Function DM\_HierarchyMode : TFlattenMode;  
__Description__  
This function returns the hierarchy mode as a TFlattenMode parameter\.  
__See also__  
IProject interface

##### DM\_HierarchyModeForCompile method

\(IProject interface\)  
__Syntax__  
Function DM\_HierarchyModeForCompile : TFlattenMode;  
__Description__  
__Example__  
__See also__  
IProject interface

##### DM\_IndexOfSourceDocument method

\(IProject interface\)  
__Syntax__  
Function DM\_IndexOfSourceDocument\(Filename : WideString\) : Integer;  
__Description__  
The function returns the index of the source document based on the filename of this document\. This is for hierarchical or connected schematic documents\.  
__See also__  
IProject interface

##### DM\_InitializeOutputPath method

\(IProject interface\)  
__Syntax__  
Function DM\_InitializeOutputPath\(AnOutputType : WideString\) : WideString;  
__Description__  
The function returns the output path for the Output Generator based on the AnOutputType parameter\.  
__See also__  
IProject interface

##### DM\_LogicalDocumentCount method

\(IProject interface\)  
__Syntax__  
Function DM\_LogicalDocumentCount : Integer;  
__Description__  
The function returns the number of logical documents which represent the actual documents of a design project \(documents that exist in the design project but are not part of the design are not logical documents\)\. Use this function in conjunction with the DM\_LogicalDocuments function\.  
__See also__  
IProject interface

##### DM\_LogicalDocuments method

\(IProject interface\)  
__Syntax__  
Function DM\_LogicalDocuments \(Index : Integer \) : IDocument;  
__Description__  
The function returns the indexed logical document of a project\.  
__See also__  
IProject interface

##### DM\_MoveSourceDocument method

\(IProject interface\)  
__Syntax__  
Procedure DM\_MoveSourceDocument \(Filename : WideString; NewIndex : Integer\);  
__Description__  
The procedure re\-assigns the source document referenced by the filename a new index number\.  
__See also__  
IProject interface

##### DM\_NavigationZoomPrecision method

\(IProject interface\)  
__Syntax__  
Function DM\_NavigationZoomPrecision : Integer;  
__Description__  
Sets how precise the document zoom is when the interactive navigator is being used to trace the connection in a project\.  
__See also__  
IProject interface

##### DM\_OptionsStorage method

\(IProject interface\)  
__Syntax__  
Function DM\_OptionsStorage : IOptionsStorage;  
__Description__  
__Example__  
__See also__  
IProject interface

##### DM\_Outputers method

\(IProject interface\)  
__Syntax__  
Function DM\_Outputers \(Name : WideString\) : IOutputer;  
__Description__  
The function returns the indexed Output Generator\. An output generator could be a Simple BOM\.  
__See also__  
IProject interface

##### DM\_PhysicalDocumentCount method

\(IProject interface\)  
__Syntax__  
Function DM\_PhysicalDocumentCount : Integer;  
__Description__  
The function returns the number of physical source documents \(which are expanded logical documents of the design project\)\. Source documents are usually schematic documents\. Use this function in conjunction with the DM\_PhysicalDocuments function\.  
__See also__  
IProject interface

##### DM\_PhysicalDocuments method

\(IProject interface\)  
__Syntax__  
Function DM\_PhysicalDocuments \(Index : Integer \) : IDocument;  
__Description__  
The function returns the indexed physical document of a project\.  
__See also__  
IProject interface

##### DM\_PrimaryImplementationDocument method

\(IProject interface\)  
__Syntax__  
Function DM\_PrimaryImplementationDocument : IDocument;  
__Description__  
The function returns the primary implementation document for example PCB documents\. Source documents are Schematic documents for example\.  
__See also__  
IProject interface

##### DM\_ProjectFileName method

\(IProject interface\)  
__Syntax__  
Function DM\_ProjectFileName : WideString;  
__Description__  
This function returns the file name of this current project in Altium Designer\.  
__See also__  
IProject interface

##### DM\_ProjectFullPath method

\(IProject interface\)  
__Syntax__  
Function DM\_ProjectFullPath : WideString;  
__Description__  
This function returns the full path of this current project in Altium Designer\.  
__See also__  
IProject interface

##### DM\_ProjectVariantCount method

\(IProject interface\)  
__Syntax__  
Function DM\_ProjectVariantCount : Integer;  
__Description__  
The function returns the number of project variants for this current project\.  
__See also__  
IProject interface

##### DM\_ProjectVariants method

\(IProject interface\)  
__Syntax__  
Function DM\_ProjectVariants \(Index : Integer \) : IProjectVariant;  
__Description__  
The function returns the indexed IProjectVariant interface\. A project variant interface is only a conceptual representation of a project that can have project variants\. That is there is only one physical board but this same board can have certain components disabled or enabled leading to document variants\. The variations of a PCB board are referred to as the IDocumentVariant and to check which components are enabled or not for this particular document variant, check out the IComponentVariant interface\.

This is to be used in conjunction with the DM\_ProjectVariantCount method\.  
__See also__  
IProject interface

##### DM\_RemoveSourceDocument method

\(IProject interface\)  
__Syntax__  
Procedure DM\_RemoveSourceDocument \(Filename : WideString\);  
__Description__  
This procedure removes a source document referenced by its filename from this current project\.  
__See also__  
IProject interface

##### DM\_SearchPathCount method

\(IProject interface\)  
__Syntax__  
Function DM\_SearchPathCount : Integer;  
__Description__  
The function returns the number of search paths for this current project\. Use this function in conjunction with the DM\_SearchPaths function\.  
__See also__  
IProject interface

##### DM\_SearchPaths method

\(IProject interface\)  
__Syntax__  
Function DM\_SearchPaths \(Index : Integer \) : ISearchPath;  
__Description__  
The function returns the indexed search path object defined for this project\.  
__See also__  
IProject interface

##### DM\_SetAllowPortNetNames method

\(IProject interface\)  
__Syntax__  
Procedure DM\_SetAllowPortNetNames \(AAllow : Boolean\);  
__Description__  
Invoke this procedure to allow port net names be used for navigation\.  
__See also__  
IProject interface

##### DM\_SetAllowSheetEntryNetNames method

\(IProject interface\)  
__Syntax__  
Procedure DM\_SetAllowSheetEntryNetNames \(AAllow : Boolean\);  
__Description__  
Invoke this procedure to allow sheet entry net names be used for navigation in Altium Designer\.  
__See also__  
IProject interface

##### DM\_SetAppendSheetNumberToLocalNets method

\(IProject interface\)  
__Syntax__  
Procedure DM\_SetAppendSheetNumberToLocalNets \(AAppend : Boolean\);  
__Description__  
Invoke this procedure to have the ability to append sheet numbers to local nets on a document / project\.  
__See also__  
IProject interface

##### DM\_SetAsCurrentProject method

\(IProject interface\)  
__Syntax__  
Procedure DM\_SetAsCurrentProject;  
__Description__  
Invoke this function to set the project as the current project in Altium Designer\.  
__See also__  
IProject interface

##### DM\_SetDefaultConfigurationName method

\(IProject interface\)  
__Syntax__  
Procedure DM\_SetDefaultConfigurationName\(Configuration : WideString\);  
__Description__  
The procedure sets the name for the default configuration of a FPGA project\.  
__See also__  
IProject interface

##### DM\_SetDefaultPcbType method

\(IProject interface\)  
__Syntax__  
Procedure DM\_SetDefaultPcbType\(PcbType : WideString\);  
__Description__  
__Example__  
__See also__  
IProject interface

##### DM\_SetErrorLevels method

\(IProject interface\)  
__Syntax__  
Procedure DM\_SetErrorLevels\(AErrorKind : TErrorKind;AErrorLevel : TErrorLevel\);  
__Description__  
__Example__  
__See also__  
IProject interface

##### DM\_SetHierarchyMode method

\(IProject interface\)  
__Syntax__  
Procedure DM\_SetHierarchyMode \(AFlatten : TFlattenMode\);  
__Description__  
Invoke this function to set which hierarchy mode for this project\. It can be one of the following modes: eFlatten\_Smart,eFlatten\_Flat,eFlatten\_Hierarchical,eFlatten\_Global  
__See also__  
IProject interface

##### DM\_SetOutputPath method

\(IProject interface\)  
__Syntax__  
Procedure DM\_SetOutputPath \(AnOutputPath : WideString\);  
__Description__  
Sets the output path for generated documents to go in by the Altium Designer output generator\.  
__See also__  
IProject interface

##### DM\_StartCrossProbing method

\(IProject interface\)  
__Syntax__  
Procedure DM\_StartCrossProbing\(CtrlDoesSwitch : Boolean\);  
__Description__  
This procedure invokes the cross probing function\. Both source and primary implementation documents need to be open in Altium Designer in order for the cross probing to work\.  
__See also__  
IProject interface

##### DM\_StartNavigation method

\(IProject interface\)  
__Syntax__  
Procedure DM\_StartNavigation;  
__Description__  
This procedure invokes the navigation panel for the current project\. The project needs to be compiled first\.  
__See also__  
IProject interface

##### DM\_ToDoManager method

\(IProject interface\)  
__Syntax__  
Function DM\_ToDoManager : IToDoManager;  
__Description__  
Invoke this function to have access to the IToDoManager object\. This ToDo manager allows you to define to dos for your current project\.  
__See also__  
IProject interface

##### DM\_TopLevelLogicalDocument method

\(IProject interface\)  
__Syntax__  
Function DM\_TopLevelLogicalDocument : IDocument;  
__Description__  
This function returns the top level logical document of this current project\. A logical document is usually a Schematic document and can represent a document of a multi channel project for example\.  
__See also__  
IProject interface

##### DM\_TopLevelPhysicalDocument method

\(IProject interface\)  
__Syntax__  
Function DM\_TopLevelPhysicalDocument : IDocument;  
__Description__  
This function returns the top level physical document of this current project\. A physical document usually is a PCB document\.  
__See also__  
IProject interface

##### DM\_UpdateConstraints method

\(IProject interface\)  
__Syntax__  
Function DM\_UpdateConstraints : LongBool;  
__Description__  
Invoke this function to update the constraint files used for a FPGA project and for corresponding PCB projects with FPGA components\.  
__See also__  
IProject interface

##### DM\_UserID method

\(IProject interface\)  
__Syntax__  
Function DM\_UserID : WideString;  
__Description__  
The function returns a value that represents the UserID of the project\.  
__See also__  
IProject interface

##### DM\_ViolationCount method

\(IProject interface\)  
__Syntax__  
Function DM\_ViolationCount : Integer;  
__Description__  
This function returns the number of violations reported by Altium Designer for this current project\.  
__See also__  
IProject interface

##### DM\_Violations method

\(IProject interface\)  
__Syntax__  
Function DM\_Violations\(Index : Integer\) : IViolation;  
__Description__  
Returns the indexed violation for a current project\. This is to be used in conjunction with the DM\_ViolationCount method\.  
__See also__  
IProject interface

##### GetNavigationHistory method

\(IProject interface\)  
__Syntax__  
Function GetNavigationHistory : INavigationHistory;  
__Description__  
This function returns the status of the navigation buttons on the Navigator panel for the current project in Altium Designer\. Check out INavigationHistory interface for details\.  
__See also__  
IProject interface

### <a id="IAbstractVHDLProject"></a>IAbstractVHDLProject

__Overview__  
The IAbstractVHDLProject interface represents a project that hosts VHDL documents\.  
__Important notes__  
Inherited from IProject interface  
__Interface Methods__  
Function  DM\_GetTargetDeviceName\(ConfigurationName : WideString\) : WideString;  
__See also__  
Workspace Manager Interfaces  
IProject interface

### <a id="IBoardProject"></a>IBoardProject

__Overview__  
The IBoardProject interface represents a project compromising of Schematic and corresponding PCB documents along with other document kinds\.  
__Important notes__  
Inherited from IProject  interface  
__Interface Methods__  
IProject methods  
__Interface Properties__  
IProject Properties  
__See also__  
Workspace Manager Interfaces  
IProject interface

### <a id="ICoreProject"></a>ICoreProject

__Overview__  
The ICoreProject interface represents the project that hosts core designs\. A core project is typically created to develop pre\-synthesized user models whose EDIF output becomes the model for these user defined components\.  
__Important notes__  
Inherited from IAbstractVHDLProject  interface  
__Interface Methods__  
Function DM\_CreateSymbolGenerator     : ISymbolGenerator;  
Function DM\_GetIncludeModelsInArchive : LongBool;          
__See also__  
Workspace Manager Interfaces  
IProject interface  
IAbstractVHDLProject interface  
ISymbolGenerator interface

### <a id="IEmbeddedProject"></a>IEmbeddedProject

__Overview__  
The IEmbeddedProject interface represents the project that hosts embedded designs that can be targetted to the hard device on the Nanoboard\.  
__Important notes__  
The IEmbeddedProject interface is inherited from IProject interface\.  
__Interface Methods__  
DM\_SetToolchain method\.  
__See also__  
Workspace Manager Interfaces  
IProject interface

### <a id="IFPGAProject"></a>IFPGAProject

__Overview__  
The IFPGAProject interface represents the project that hosts FPGA designs\.  
__Important notes__  
Inherited from IAbstractVHDLProject  interface  
__Interface Methods__  
Function  DM\_GetTargetBoardName \(ConfigurationName : WideString\) : WideString;  
__See also__  
Workspace Manager Interfaces  
IProject interface  
IAbstractVHDLProject Interface

### <a id="IIntegratedLibraryProject_interface"></a>IIntegratedLibraryProject interface

__Overview__  
The IIntegratedLibraryProject interface represents the project that deals with integrated libraries\.  
__Important notes__  
Inherited from IProject  interface  
__Interface Methods__  
IProject methods  
__Interface Properties__  
IProject Properties  
__See also__  
Workspace Manager Interfaces  
IProject interface  
 

## <a id="Project_Variations"></a>Project Variations 

### <a id="IComponentVariation_interface"></a>IComponentVariation interface

__Overview__  
The IComponentVariation interface represents the component variant on a PCB document\. There is only one physical document, but each component on this document can be specified to be a variant and when the output is generated, a specific variant document is generated\. This variant output is controlled by the Output Job files\.

__Interface Methods__

__Method__

__Description__

Function    DM\_ProjectVariant : IDocumentVariant;

This function returns the IProjectVariant interface which represents a container that stores the component variants for the project\.

Function    DM\_VariationKind : TVariationKind;

This function returns the variation kind for this component\.

Function    DM\_PhysicalDesignator : WideString;

Returns the full physical designator string for this component variant\.

Function    DM\_UniqueId : WideString;

Returns the unique ID for this component variant\.

Function    DM\_AlternatePart : WideString;

Returns the alternate part string for this component variant\.

Function    DM\_VariationCount     : Integer;

Returns the number of variations\.

Function    DM\_Variations        \(Index : Integer\) : IParameterVariation;

Returns the indexed parameter variation for this component variation\.

__See also__  
IProjectVariant interface  
IParameterVariation interface

### <a id="IProjectVariant_interface"></a>IProjectVariant interface

__Overview__  
The IProjectVariation interface represents the project that contains component variations\. Physically, there is only one PCB document with components that are specified\. So for each output requirement, each document variant is generated, although there is only one PCB design document\.

__Interface Methods__

__Method__

__Description__

Function    DM\_Project        : IProject;

Returns the IProject interface this  variant is associated with\.

Function    DM\_Name           : WideString;

Returns the name of this variant\.

Function    DM\_Description    : WideString;

Returns the description of this variant\.

Function    DM\_VariationCount : Integer;

Returns the count of variants\. To be used in conjunction with the DM\_Variations\(index\) method\.

Function    DM\_Variations     \(Index : Integer   \) : IComponentVariation;

Returns the indexed component variation for this project\. To be used in conjunction with the DM\_VariationCount method\.

__See also__  
Workspace Manager Interfaces  
IProject interface

### <a id="IParameterVariation_interface"></a>IParameterVariation interface

__Overview__  
The IParameterVariation interface represents the component that contains parameter variations\. Physically, there is only one PCB document with components that are specified\. So for each output requirement, each document variant is generated, although there is only one PCB design document\.

__Interface Methods__

__Method__

__Description__

Function    DM\_ParameterName      : WideString;

Denotes the name of the parameter that the component is associated with\.

Function    DM\_VariedValue        : WideString;

Denotes the value of the parameter that the component is associated with\. A component variant can have parameter variants\.

__See also__  
Workspace Manager Interfaces  
IProject interface  
IProjectVariant interface  
IComponentVariation interface

# WSM API System Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [WSM API System Interfaces for version 22](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Workspace Manager API](https://www.altium.com/documentation/altium-designer/technical-reference-workspace-manager-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## Workspace Manager API: System Interfaces 

The Workspace Manager API System Interfaces reference includes the following sections and content:

[__System Interfaces__](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#System Interfaces)

[__Configuration Constraints Interfaces__](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#Configuration Constraints Interfaces)

[__Signals Manager interfaces__](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#Signals Manager interfaces)

[IChangeManager interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IChangeManager interface)  
[IComponentMappings interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IComponentMappings interface)  
[ICustomClipboardFormat interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ICustomClipboardFormat interface)  
[IDoToManager](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IDoToManager)  
[IDocumentBackups interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IDocumentBackups interface)  
[IECO interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IECO interface)  
[IMessagesManager](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IMessagesManager)  
[IMessageItem interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IMessageItem interface)  
[ISearchPath interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISearchPath interface)  
[ISymbolGenerator](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISymbolGenerator)  
[IVCSProjectAccessor interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IVCSProjectAccessor interface)  
[IVersionControlServer interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IVersionControlServer interface)  
[IVhdlEntity interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IVhdlEntity interface)  
[IWorkspacePreferences](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IWorkspacePreferences)

[IConfiguration interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IConfiguration interface)  
[IConstraintGroup interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IConstraintGroup interface)  
[IConstraint interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IConstraint interface)  
[IInstalledConstraintFiles interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IInstalledConstraintFiles interface)  
[IOutputer interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IOutputer interface)  
[IStrings interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IStrings interface)  
[IWSM\_OutputJobDocument interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IWSM_OutputJobDocument interface)  
[IWSM\_ServerInterface interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IWSM_ServerInterface interface)  
[IDifferentialPair interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IDifferentialPair interface)  
[IDatabaseLibDocument interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IDatabaseLibDocument interface)

[IEntityPort interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IEntityPort interface)  
[IExternalParameter interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IExternalParameter interface)  
[IInstance interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IInstance interface)  
[IInstancePort interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#IInstancePort interface)  
[ISignal interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISignal interface)  
[ISignalLink](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISignalLink)  
[ISignalManager interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISignalManager interface)  
[ISignalNode](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISignalNode)  
[ISubNet interface](https://www.altium.com/documentation/altium-designer/wsm-api-system-interfaces?version=21#ISubNet interface)

 

## <a id="System_Interfaces"></a>System Interfaces 

### <a id="IChangeManager_interface"></a>IChangeManager interface

__Overview__  
The IChangeManager interface represents the change manager where you can execute an ECO of pins to be swapped for the target component of the target document\.

__Interface Methods__  
Procedure DM\_SetProject1\(AProject : IProject\);                        
Procedure DM\_SetProject2\(AProject : IProject\);                        
Function  DM\_ExecuteChanges\(IsSilent : LongBool\) : LongBool;          
Procedure DM\_CreateECO\_SwapPin        \(TargetDocument : IDocument;  
                                       TargetComponent: IComponent;  
                                       TargetPin      : IPin;  
                                       NewPinNumber   : WideString;  
                                       OldPinNet      : WideString;  
                                       NewPinNet      : WideString\);  
__See also__  
Workspace Manager Interfaces  
IDocument interface  
IComponent interface  
IPin interface

### <a id="IComponentMappings_interface"></a>IComponentMappings interface

__Overview__  
The IComponentMappings interface represents the mapping of source components and target components in schematic and PCB documents\.

__Interface Methods__

__Method__

__Description__

Function DM\_UnmatchedSourceComponent\(Index : Integer\) : IComponent;

Returns the indexed unmatched source component, that is, a target component could not be found to map to this source component\.  
Use the DM\_UnmatchedSourceComponentCount function\.

Function DM\_UnmatchedTargetComponent\(Index : Integer\) : IComponent;

Returns the indexed unmatched target component, that is, a source component could not be found to map to the target component\. Use the DM\_UnmatchedTargetComponentCount function\.

Function DM\_MatchedSourceComponent  \(Index : Integer\) : IComponent;

Returns the indexed matched source component \(that has been matched with a target component\)\. Use the DM\_MatchedSourceComponentCount function\.

Function DM\_MatchedTargetComponent  \(Index : Integer\) : IComponent;

Returns the indexed matched source component \(that has been matched with a target component\)\. Use the DM\_MatchedTargetComponentCount function\.

Function DM\_UnmatchedSourceComponentCount : Integer;

Returns the number of unmatched source components\.

Function DM\_UnmatchedTargetComponentCount : Integer;

Returns the number of unmatched target components\.

Function DM\_MatchedComponentCount: Integer;

Returns the number of matched components\.

### <a id="ICustomClipboardFormat_interface"></a>ICustomClipboardFormat interface

__Overview__  
__Interface Methods__  
Function RegisterCustomClipboardFormat\(Const AFormatName : WideString\) : Longword;  
__See also__  
Workspace Manager Interfaces

### <a id="IDoToManager"></a>IDoToManager

__Overview__  
The __IDoToManager__ interface represents the To Do panel in Altium Designer\. This To Do list manager allows you to manage a list of what to do and assign a priority to each what to do item\.

__Interface Methods__  
Function  AddItem    \(Const AnItem  : WideString\) : LongBool;     
Function  RemoveItem \(Const AnItem  : WideString\) : LongBool;     
Function  GetItem    \(      Index   : Integer   \) : WideString;   
   
Function  GetCount                 : Integer;  
Procedure Clear;  
__Interface Properties__  
Property  Item\[Index : Integer\] : WideString Read GetItem;  
Property  Count                 : Integer   Read GetCount;  
__See also__  
Workspace Manager Interfaces

### <a id="IDocumentBackups_interface"></a>IDocumentBackups interface

__Overview__  
   
__Interface Properties__  
Property Count : Integer  
Property Backups\[AIndex : Integer\] : WideString  
__See also__  
IClient interface

### <a id="IECO_interface"></a>IECO interface

__Overview__  
The __IECO__ interface represents an Engineering Change Order interface in the Work Space Manager\.  Basically an Engineering Change Order attempts to keep a project containing source documents and its corresponding primary implementation documents synchronized\. For example a schematic project and its PCB document, every time something changes in a schematic project, it is necessary to bring the changes forward to the PCB document via the Engineering Change Order feature\.

__Interface Methods__

__Method__

__Description__

Procedure DM\_Begin;

Denotes that the ECO manager has started\.

Procedure DM\_End; 

Denotes that the ECO manager has ended\.

Function  DM\_AddObject              \(Mode : TECO\_Mode; ReferenceObject : IDMObject\)

Adds a reference object for the ECO to compare the target document against this reference document\.

Function  DM\_RemoveObject           \(Mode : TECO\_Mode; ObjectToRemove  : IDMObject\)

Removes a reference object depending on what ECO mode is\.

Function  DM\_AddMemberToObject      \(Mode : TECO\_Mode;  
ReferenceMember : IDMObject;  
ReferenceParent : IDMObject;  
TargetParent    : IDMObject\)

Adds a specific action in the ECO manager\.

Function  DM\_RemoveMemberFromObject \(Mode : TECO\_Mode;  
MemberObject    : IDMObject;  
ParentObject    : IDMObject\)

Removes a specific action in the ECO manager\.

Function  DM\_ChangeObject           \(Mode : TECO\_Mode; Kind            : TModificationKind;  
ObjectToChange  : IDMObject;  
ReferenceObject : IDMObject\)

Changes a specific action in the ECO manager\.

### <a id="IMessagesManager"></a>IMessagesManager

__Overview__  
The IMessagesManager interface represents the Messages panel in Altium Designer\.

__IMessagesManager interface table__

__IMessagesManager methods__  
AddMessage  
AddMessageParametric  
ClearMessages  
ClearMessagesOfClass  
ClearMessagesForDocument  
ClearMessageByIndex  
BeginUpdate  
EndUpdate  
MessagesCount  
Messages

__IMessagesManager properties__

__Example__

01

//Populating the Message Panel using the Workspace manager’s functionality

02

Procedure InsertMessagesIntoMessagePanel;

03

Var

04

    WSM         : IWorkSpace;

05

    MM          : IMessagesManager;

06

    ImageIndex  : Integer;

07

    F           : Boolean;

08

Begin

09

    WSM := GetWorkSpace;

10

    If WSM = Nil Then Exit;

11

     

12

    // Tick icon for the lines in the Message panel

13

    // Refer to the Image Index table in the

14

    // Workspace Manager API reference online help\.

15

    ImageIndex := 3;

16

     

17

    MM := WSM\.DM\_MessagesManager;

18

    If MM = Nil Then Exit;

19

  

20

    // Clear out messages from the Message panel\.\.\.

21

    MM\.ClearMessages;

22

    WSM\.DM\_ShowMessageView;

23

    MM\.BeginUpdate;

24

     

25

    F := False;

26

    MM\.AddMessage\(\{MessageClass             \} 'MessageClass 1',

27

                      \{MessageText              \} 'MessageText 1',

28

                      \{MessageSource            \} 'Altium Designer Message',

29

                      \{MessageDocument          \} 'Pseudo Doc 1',

30

                      \{MessageCallBackProcess   \} '',

31

                      \{MessageCallBackParameters\} '',

32

                      ImageIndex,

33

                      F\);

34

  

35

    MM\.AddMessage\(\{MessageClass             \} 'MessageClass 2',

36

                      \{MessageText              \} 'MessageText 2',

37

                      \{MessageSource            \} 'Altium Designer Message 2',

38

                      \{MessageDocument          \} 'Pseudo Doc 2',

39

                      \{MessageCallBackProcess   \} '',

40

                      \{MessageCallBackParameters\} '',

41

                      ImageIndex,

42

                      F\);

43

  

44

    MM\.EndUpdate;

45

End;

__See also__  
Image Index Table