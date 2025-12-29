# <a id="Project_Interfaces"></a>Project Interfaces

__Overview__  
The IProject interface deals with an open project in Altium Designer\. There are project and document variants, that is actually a project or document can be specified to have project or document variants \(actual project / document variants do not exist\) and on these document variants have component variants\.

To have access to the data of a project, you need to do a compile first\. Projects deal with logical and physical documents\. Logical documents are the connected documents which are part of a design which include a PCB document associated with this design\. Physical documents are source documents expanded by the Altium Designer compiler as in a flattened design project\.

Thus, a project contains source documents and implementation documents\. To have access to the most current data of a project, you need to compile the project first\. The compiler maps \(or expands\) all the logical source documents into physical documents\.

Normally there is a one logical document to a one physical document for a simple flat design project, but for hierarchical design projects \(for example multi channel projects\), the documents that have sheet symbols with a Repeat statement, then logical documents are expanded into multiple physical documents\.

There are Output jobs consisting of available output generators installed in Altium Designer\.

The __IProject__ interface hierarchy is as follows;

__IProject methods__  
DM\_AddConfiguration  
DM\_AddConfigurationParameters  
DM\_AddConfigurationParameters\_Physical  
DM\_AddControlPanel  
DM\_AddGeneratedDocument  
DM\_AddSearchPath  
DM\_AddSourceDocument  
DM\_ChannelDesignatorFormat  
DM\_ChannelRoomLevelSeperator  
DM\_ChannelRoomNamingStyle  
DM\_ClearViolations  
DM\_Compile  
DM\_CompileEx  
DM\_ComponentMappings  
DM\_ConfigurationCount  
DM\_Configurations  
DM\_CurrentProjectVariant  
DM\_DoCrossSelection SafeCall  
DM\_DocumentFlattened  
DM\_EditOptions  
DM\_ErrorLevels  
DM\_GeneratedDocumentCount  
DM\_GeneratedDocuments  
DM\_GetAllowPortNetNames  
DM\_GetAllowSheetEntryNetNames  
DM\_GetAppendSheetNumberToLocalNets  
DM\_GetConfigurationByName  
DM\_GetDefaultConfiguration  
DM\_GetDefaultConfigurationName  
DM\_GetDefaultPcbType  
DM\_GetDocumentFromPath  
DM\_GetOutputPath  
DM\_GetPinSwapBy\_Pin  
DM\_GetPinSwapByNetlabel  
DM\_GetScrapDocument  
DM\_HierarchyMode  
DM\_HierarchyModeForCompile  
DM\_IndexOfSourceDocument  
DM\_InitializeOutputPath  
DM\_LogicalDocumentCount  
DM\_LogicalDocuments  
DM\_MoveSourceDocument  
DM\_NavigationZoomPrecision  
DM\_OptionsStorage  
DM\_Outputers  
DM\_OwnedProjectCount  
DM\_OwnedProjects  
DM\_PhysicalDocumentCount  
DM\_PhysicalDocuments  
DM\_PrimaryImplementationDocument  
DM\_ProjectFileName  
DM\_ProjectFullPath  
DM\_ProjectVariantCount  
DM\_ProjectVariants  
DM\_RemoveAllConfigurations  
DM\_RemoveConfigurationByName  
DM\_RemoveSourceDocument  
DM\_SearchPathCount  
DM\_SearchPaths  
DM\_SetAllowPortNetNames  
DM\_SetAllowSheetEntryNetNames  
DM\_SetAppendSheetNumberToLocalNets  
DM\_SetAsCurrentProject  
DM\_SetDefaultConfigurationName  
DM\_SetDefaultPcbType  
DM\_SetErrorLevels  
DM\_SetHierarchyMode  
DM\_SetOutputPath  
DM\_SetPinSwapBy\_Netlabel  
DM\_SetPinSwapBy\_Pin  
DM\_StartCrossProbing  
DM\_StartNavigation  
DM\_ToDoManager  
DM\_TopLevelLogicalDocument  
DM\_TopLevelPhysicalDocument  
DM\_UpdateConstraints  
DM\_UserID  
DM\_ViolationCount  
DM\_Violations  
GetNavigationHistory

__IProject properties__



\(IProject interface\)  
__Syntax__  
Procedure DM\_AddConfigurationParameters\(Configuration : WideString\);  
__Description__  
A configuration is a list of constraints file which manages the mapping of pins to ports of a FPGA project\. Invoke this method to add parameters of a specified configuration file for a FPGA project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_AddConfigurationParameters\_Physical\(Configuration : WideString\);  
__Description__  
A configuration is a list of constraints file which manages the mapping of pins to ports of a FPGA project\. Invoke this method to add parameters of a specified configuration file for a FPGA project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_AddControlPanel \(Filename : WideString\);  
__Description__  
The procedure adds a document to the main section of the the panel which could be part of a project or free documents\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_AddGeneratedDocument \(Filename : WideString\);  
__Description__  
This procedure adds a new generated document referenced by its filename parameter in this current project, and this document appears in the __Generated__ folder of this project on Altium Designer Projects panel\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_AddSearchPath \(SearchPath : WideString; IncludeSubFolders : Boolean\);  
__Description__  
This procedure adds a new serach path for the current project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_AddSourceDocument \(Filename : WideString\);  
__Description__  
The procedure adds a source document referenced by its filename parameter in the current project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ChannelDesignatorFormat : WideString;  
__Description__  
This function returns the formatted channel designator string\. This string is basedon the settings defined in the Multi\-Channel page of the Options for Project dialog from the Project » Project Options menu item\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ChannelRoomLevelSeperator : WideString;  
__Description__  
The function returns the separator character for the Channel Room Level string\. The default is an underline character used for room naming styles when there are paths \(based on hierarchical designs\)\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ChannelRoomNamingStyle : TChannelRoomNamingStyle;  
__Description__  
The function returns the TChannelRoomNamingStyle type\. There are alternative styles for naming rooms on a PCB document\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_ClearViolations;  
__Description__  
The procedure clears all existing violations within the project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_Compile : LongBool;  
__Description__  
Invoke this function to compile the current project\. Once the project is compiled, navigation of nets and comparing the differences of documents and other tasks can be performed\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_CompileEx\(All : LongBool; Var Cancelled : LongBool\) : LongBool;  
__Description__  
Invoke this function to compile all documents of all opened projects in Altium Designer\. Pass a Boolean parmeter in to cancel the compiling process\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ComponentMappings \(AnImplementationDocument : WideString\) : IComponentMappings;  
__Description__  
The function returns the IComponentMapping interface which details which PCB components are linked to Schematic components\. Check the IComponentMappings interface\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ConfigurationCount : Integer;  
__Description__  
The function returns the number of configurations for the current project\. To be used in conjunction with DM\_Configurations function\.  
__Example__  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_Configurations \(Index : Integer \) : IConfiguration;  
__Description__  
The function returns the indexed configuration of a FPGA project\. A configuration can have a list of different constraint files\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_CurrentProjectVariant : IProjectVariant;  
__Description__  
The function returns the current project variant from this current project\. Check out the IProjectVariant interface\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_DoCrossSelection  
__Description__  
Activates the cross probing function where you can jump from a Schematic object to its corresponding PCB object \(both source and primary implementation documents need to be open in Altium Designer\)\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_DocumentFlattened : IDocument;  
__Description__  
The function returns the flattened document\. A flattened document is part of a flattened hierarchy of a project and all objects of this project appear in the Instance list of the Navigator panel\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_EditOptions\(DefaultPage : WideString\) : LongBool;  
__Description__  
__Example__  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ErrorLevels \(AErrorKind : TErrorKind\) : TErrorLevel;  
__Description__  
The function returns the error level for the specified error type\. For each violation type, you can have up to four different error levels, No Report, Warning, Error and Fatal Error with four different colored folders\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GeneratedDocumentCount : Integer;  
__Description__  
The function returns the number of generated documents such as those documents generated by the OutPut generator \(from a OutJob document\)\. Use this function in conjunction with the DM\_GeneratedDocuments function\.  
__Example__  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GeneratedDocuments \(Index : Integer \) : IDocument;  
__Description__  
The function returns the indexed generated document which is generated by the Output Generator\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GetAllowPortNetNames : Boolean;  
__Description__  
Invoke this function to check whether port net names are used for navigation in Altium Designer or not\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GetAllowSheetEntryNetNames : Boolean;  
__Description__  
Invoke this function to check whether sheet entry net anmes are used for navigation in Altium Designer or not\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GetAppendSheetNumberToLocalNets : Boolean;  
__Description__  
Invoke this function to check whether sheet numbers are appended to local nets or not\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GetConfigurationByName\(Configuration : WideString\) : IConfiguration;  
__Description__  
The function returns you the configuration object for the project \(normally for FPGA projects\) if configuration parameter is valid\. A configuration file contains mapping information to link from a FPGA project to a linked PCB project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GetDefaultConfiguration : IConfiguration;  
__Description__  
The function returns the default configuration for a FPGA project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GetDefaultConfigurationName : WideString;  
__Description__  
Returns the name of the default configuration for a FPGA project  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GetDefaultPcbType : WideString;  
__Description__  
__Example__  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GetDocumentFromPath\(DocumentPath : WideString\) : IDocument;  
__Description__  
This function returns the IDocument interface associated with the document path parameter\. Otherwise a Nil value is returned\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GetOutputPath : WideString;  
__Description__  
The function returns the output path for generated documents for the current project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_GetScrapDocument\(DocumentPath : WideString\) : IDocument;  
__Description__  
Returns the scrap document for the project\. A scrap document is a temporary document used when creating a new document and once a document is saved, the contents of the scrap document is copied and freed\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_HierarchyMode : TFlattenMode;  
__Description__  
This function returns the hierarchy mode as a TFlattenMode parameter\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_HierarchyModeForCompile : TFlattenMode;  
__Description__  
__Example__  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_IndexOfSourceDocument\(Filename : WideString\) : Integer;  
__Description__  
The function returns the index of the source document based on the filename of this document\. This is for hierarchical or connected schematic documents\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_InitializeOutputPath\(AnOutputType : WideString\) : WideString;  
__Description__  
The function returns the output path for the Output Generator based on the AnOutputType parameter\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_LogicalDocumentCount : Integer;  
__Description__  
The function returns the number of logical documents which represent the actual documents of a design project \(documents that exist in the design project but are not part of the design are not logical documents\)\. Use this function in conjunction with the DM\_LogicalDocuments function\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_LogicalDocuments \(Index : Integer \) : IDocument;  
__Description__  
The function returns the indexed logical document of a project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_MoveSourceDocument \(Filename : WideString; NewIndex : Integer\);  
__Description__  
The procedure re\-assigns the source document referenced by the filename a new index number\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_NavigationZoomPrecision : Integer;  
__Description__  
Sets how precise the document zoom is when the interactive navigator is being used to trace the connection in a project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_OptionsStorage : IOptionsStorage;  
__Description__  
__Example__  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_Outputers \(Name : WideString\) : IOutputer;  
__Description__  
The function returns the indexed Output Generator\. An output generator could be a Simple BOM\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_PhysicalDocumentCount : Integer;  
__Description__  
The function returns the number of physical source documents \(which are expanded logical documents of the design project\)\. Source documents are usually schematic documents\. Use this function in conjunction with the DM\_PhysicalDocuments function\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_PhysicalDocuments \(Index : Integer \) : IDocument;  
__Description__  
The function returns the indexed physical document of a project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_PrimaryImplementationDocument : IDocument;  
__Description__  
The function returns the primary implementation document for example PCB documents\. Source documents are Schematic documents for example\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ProjectFileName : WideString;  
__Description__  
This function returns the file name of this current project in Altium Designer\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ProjectFullPath : WideString;  
__Description__  
This function returns the full path of this current project in Altium Designer\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ProjectVariantCount : Integer;  
__Description__  
The function returns the number of project variants for this current project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ProjectVariants \(Index : Integer \) : IProjectVariant;  
__Description__  
The function returns the indexed IProjectVariant interface\. A project variant interface is only a conceptual representation of a project that can have project variants\. That is there is only one physical board but this same board can have certain components disabled or enabled leading to document variants\. The variations of a PCB board are referred to as the IDocumentVariant and to check which components are enabled or not for this particular document variant, check out the IComponentVariant interface\.

This is to be used in conjunction with the DM\_ProjectVariantCount method\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_RemoveSourceDocument \(Filename : WideString\);  
__Description__  
This procedure removes a source document referenced by its filename from this current project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_SearchPathCount : Integer;  
__Description__  
The function returns the number of search paths for this current project\. Use this function in conjunction with the DM\_SearchPaths function\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_SearchPaths \(Index : Integer \) : ISearchPath;  
__Description__  
The function returns the indexed search path object defined for this project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_SetAllowPortNetNames \(AAllow : Boolean\);  
__Description__  
Invoke this procedure to allow port net names be used for navigation\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_SetAllowSheetEntryNetNames \(AAllow : Boolean\);  
__Description__  
Invoke this procedure to allow sheet entry net names be used for navigation in Altium Designer\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_SetAppendSheetNumberToLocalNets \(AAppend : Boolean\);  
__Description__  
Invoke this procedure to have the ability to append sheet numbers to local nets on a document / project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_SetAsCurrentProject;  
__Description__  
Invoke this function to set the project as the current project in Altium Designer\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_SetDefaultConfigurationName\(Configuration : WideString\);  
__Description__  
The procedure sets the name for the default configuration of a FPGA project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_SetDefaultPcbType\(PcbType : WideString\);  
__Description__  
__Example__  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_SetErrorLevels\(AErrorKind : TErrorKind;AErrorLevel : TErrorLevel\);  
__Description__  
__Example__  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_SetHierarchyMode \(AFlatten : TFlattenMode\);  
__Description__  
Invoke this function to set which hierarchy mode for this project\. It can be one of the following modes: eFlatten\_Smart,eFlatten\_Flat,eFlatten\_Hierarchical,eFlatten\_Global  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_SetOutputPath \(AnOutputPath : WideString\);  
__Description__  
Sets the output path for generated documents to go in by the Altium Designer output generator\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_StartCrossProbing\(CtrlDoesSwitch : Boolean\);  
__Description__  
This procedure invokes the cross probing function\. Both source and primary implementation documents need to be open in Altium Designer in order for the cross probing to work\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Procedure DM\_StartNavigation;  
__Description__  
This procedure invokes the navigation panel for the current project\. The project needs to be compiled first\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ToDoManager : IToDoManager;  
__Description__  
Invoke this function to have access to the IToDoManager object\. This ToDo manager allows you to define to dos for your current project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_TopLevelLogicalDocument : IDocument;  
__Description__  
This function returns the top level logical document of this current project\. A logical document is usually a Schematic document and can represent a document of a multi channel project for example\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_TopLevelPhysicalDocument : IDocument;  
__Description__  
This function returns the top level physical document of this current project\. A physical document usually is a PCB document\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_UpdateConstraints : LongBool;  
__Description__  
Invoke this function to update the constraint files used for a FPGA project and for corresponding PCB projects with FPGA components\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_UserID : WideString;  
__Description__  
The function returns a value that represents the UserID of the project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_ViolationCount : Integer;  
__Description__  
This function returns the number of violations reported by Altium Designer for this current project\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function DM\_Violations\(Index : Integer\) : IViolation;  
__Description__  
Returns the indexed violation for a current project\. This is to be used in conjunction with the DM\_ViolationCount method\.  
__See also__  
IProject interface


\(IProject interface\)  
__Syntax__  
Function GetNavigationHistory : INavigationHistory;  
__Description__  
This function returns the status of the navigation buttons on the Navigator panel for the current project in Altium Designer\. Check out INavigationHistory interface for details\.  
__See also__  
IProject interface


__Overview__  
The IAbstractVHDLProject interface represents a project that hosts VHDL documents\.  
__Important notes__  
Inherited from IProject interface  
__Interface Methods__  
Function  DM\_GetTargetDeviceName\(ConfigurationName : WideString\) : WideString;  
__See also__  
Workspace Manager Interfaces  
IProject interface


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


__Overview__  
The IEmbeddedProject interface represents the project that hosts embedded designs that can be targetted to the hard device on the Nanoboard\.  
__Important notes__  
The IEmbeddedProject interface is inherited from IProject interface\.  
__Interface Methods__  
DM\_SetToolchain method\.  
__See also__  
Workspace Manager Interfaces  
IProject interface


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

## 子章节

- [<a id="IProject_Interface"></a>IProject Interface](01-a_id_IProject_Interface_a_IProject_Interface.md.md)
- [<a id="IAbstractVHDLProject"></a>IAbstractVHDLProject](02-a_id_IAbstractVHDLProject_a_IAbstractVHDLProject.md.md)
- [<a id="IBoardProject"></a>IBoardProject](03-a_id_IBoardProject_a_IBoardProject.md.md)
- [<a id="ICoreProject"></a>ICoreProject](04-a_id_ICoreProject_a_ICoreProject.md.md)
- [<a id="IEmbeddedProject"></a>IEmbeddedProject](05-a_id_IEmbeddedProject_a_IEmbeddedProject.md.md)
- [<a id="IFPGAProject"></a>IFPGAProject](06-a_id_IFPGAProject_a_IFPGAProject.md.md)
- [<a id="IIntegratedLibraryProject_interface"></a>IIntegratedLibraryProject interface](07-a_id_IIntegratedLibraryProject_interface_a_IIntegratedLibraryProject_interface.md.md)
