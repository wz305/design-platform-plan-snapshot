#### DM\_VHDLEntityCount method

\(IDocument interface\)  
__Syntax__  
Function DM\_VHDLEntityCount : Integer;  
__Description__  
The function denotes the number of VHDL entities from this document\. Use this VHDL Entity count in conjunction with the DM\_VHDLEntities\(Index\) to go through each VHDL entity\.  
__See also__  
IDocument interface  
DM\_VHDLEntities method

# WSM API Project Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [WSM API Project Interfaces for version 22](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Workspace Manager API](https://www.altium.com/documentation/altium-designer/technical-reference-workspace-manager-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## Workspace Manager API: Project Interfaces Reference 

The Workspace Manager API Project Interfaces reference includes the following sections and content:

[__Project Interfaces__](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#Project Interfaces)

[__Project Variations__](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#Project Variations)

[IProject Interface](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#IProject Interface)  
[IAbstractVHDLProject](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#IAbstractVHDLProject)  
[IBoardProject](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#IBoardProject)  
[ICoreProject](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#ICoreProject)  
[IEmbeddedProject](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#IEmbeddedProject)  
[IFPGAProject](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#IFPGAProject)  
[IIntegratedLibraryProject interface](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#IIntegratedLibraryProject interface)

[IComponentVariation interface](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#IComponentVariation interface)  
[IProjectVariant interface](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#IProjectVariant interface)  
[IParameterVariation interface](https://www.altium.com/documentation/altium-designer/wsm-api-project-interfaces?version=21#IParameterVariation interface)

 

## <a id="Project_Interfaces"></a>Project Interfaces 

### <a id="IProject_Interface"></a>IProject Interface

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