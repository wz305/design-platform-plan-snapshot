#### Methods

##### DM\_GroupedSchObject method

\(IWrapper interface\)  
__Syntax__  
Function DM\_GroupedSchObject\(i : Integer\) : IWrapper;End;  
__Description__  
__Example__  
__See also__  
IWrapper interface

##### DM\_GroupedSchObjects\_Count method

\(IWrapper interface\)  
__Syntax__  
Function DM\_GroupedSchObjects\_Count : Integer;  
__Description__  
__Example__  
__See also__  
IWrapper interface

# WSM API Types and Constants

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [WSM API Types and Constants for version 22](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Workspace Manager API](https://www.altium.com/documentation/altium-designer/technical-reference-workspace-manager-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## Workspace Manager API: Types and Constants Reference 

The Workspace Manager API Types and Constants reference includes the following sections and content:

[__WorkSpace Enumerated Types__](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#WorkSpace Enumerated Types)

[TChannelRoomNamingStyle](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TChannelRoomNamingStyle)  
[TCompilationStage](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TCompilationStage)  
[TCompilationStageSet](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TCompilationStageSet)  
[TCompileMode](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TCompileMode)  
[TComponentKind](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TComponentKind)  
[TDisplayMode](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TDisplayMode)  
[TECO\_Mode](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TECO_Mode)  
[TErrorGroup](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TErrorGroup)  
[TErrorKind](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TErrorKind)  
[TErrorKindSet](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TErrorKindSet)  
[TErrorLevel](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TErrorLevel)

[TErrorLevelSet](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TErrorLevelSet)  
[TFlattenMode](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TFlattenMode)  
[TFileOwnerShipWarningLevel](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TFileOwnerShipWarningLevel)  
[TFilterKind](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TFilterKind)  
[TFlowState](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TFlowState)  
[THighlightMethod](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#THighlightMethod)  
[THighlightMethod](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#THighlightMethod)  
[TModificationKind](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TModificationKind)  
[TNetScope \(WSM\)](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TNetScope (WSM))  
[TParameterKind](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TParameterKind)  
[TPathMode](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TPathMode)

[TPinElectrical \(WSM\)](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TPinElectrical (WSM))  
[TSearchMode](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TSearchMode)  
[TSignalDirection](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TSignalDirection)  
[TSystemParameterKind](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TSystemParameterKind)  
[TSystemParameterKindSet](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TSystemParameterKindSet)  
[TVariationKind](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TVariationKind)  
[TViolationTypeDescription](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TViolationTypeDescription)  
[TWorkspaceObjectId](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TWorkspaceObjectId)  
[TWorkspaceObjectIdSet](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#TWorkspaceObjectIdSet)

[__Workspace Manager Constants__](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#Workspace Manager Constants)

[__Image Index Table__](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#Image Index Table)

[__WorkSpace Manager Functions__](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#WorkSpace Manager Functions)

[General Constants](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#General Constants)  
[Parameter Simulation Names](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#Parameter Simulation Names)  
[Document Kind Constants](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#Document Kind Constants)  
[File Ownership Constants](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#File Ownership Constants)

 

[Main Interfaces](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#Main Interfaces)  
[Project and Document Interfaces](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#Project and Document Interfaces)  
[Object functions](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#Object functions)  
[Violation and Error Functions](https://www.altium.com/documentation/altium-designer/wsm-api-types-and-constants?version=21#Violation and Error Functions)

 

## <a id="WorkSpace_Enumerated_Types"></a>WorkSpace Enumerated Types 

The enumerated types are used for many of the WorkSpace Manager interfaces methods which are covered in this section\. For example the IPart interface has a Function DM\_ComponentKind : TComponentKind; method\. You can use this Enumerated Types section to check what the range is for the TComponentKind type\.

__See also__  
Work Space Manager API Reference  
TCompilationStage type  
TCompileMode type  
TECO\_Mode type  
TErrorGroup type  
TErrorKind type  
TErrorLevel type  
TFlattenMode type  
TFlowState type  
TModificationKind type  
TChannelRoomNamingStyle type  
TNetScope type  
TParameterKind type  
TPinElectrical type  
TSystemParmeterKind type  
TVariationKind type  
TSignalDirection type

### <a id="TChannelRoomNamingStyle"></a>TChannelRoomNamingStyle

TChannelRoomNamingStyle = \(eChannelRoomNamingStyle\_FlatNumericWithNames,  
                           eChannelRoomNamingStyle\_FlatAlphaWithNames,  
                           eChannelRoomNamingStyle\_NumericNamePath,  
                           eChannelRoomNamingStyle\_AlphaNamePath,  
                           eChannelRoomNamingStyle\_MixedNamePath\);

### <a id="TCompilationStage"></a>TCompilationStage

TCompilationStage = \(eCompilationStage\_Compiling,eCompilationStage\_Flattening\);

### <a id="TCompilationStageSet"></a>TCompilationStageSet

TCompilationStageSet = Set of TCompilationStage;

### <a id="TCompileMode"></a>TCompileMode

TCompileMode = \(eCompile\_None,eCompile\_Document,eCompile\_All,eCompile\_Smart\);

### <a id="TComponentKind"></a>TComponentKind

TComponentKind = \(eComponentKind\_Standard,  
                  eComponentKind\_Mechanical,  
                  eComponentKind\_Graphical,  
                  eComponentKind\_NetTie\_BOM,  
                  eComponentKind\_NetTie\_NoBOM,  
                  eComponentKind\_Standard\_NoBOM\);

### <a id="TDisplayMode"></a>TDisplayMode

TDisplayMode = Byte; // one of 255 display modes

### <a id="TECO_Mode"></a>TECO\_Mode

TECO\_Mode = \(eECO\_PerformAction,  
             eECO\_ValidateAction,  
             eECO\_CheckSupportForAction\);

### <a id="TErrorGroup"></a>TErrorGroup

TErrorGroup = \(eErrorGroupDocument,  
               eErrorGroupComponent,  
               eErrorGroupParameters,  
               eErrorGroupBus,  
               eErrorGroupNet,  
               eErrorGroupMisc\);

### <a id="TErrorKind"></a>TErrorKind

TErrorKind = \(eError\_OffGridObject,  
              eError\_OffDocumentObject,  
              eError\_MissingChildDocument,  
              eError\_MissingChildProject,  
              eError\_PortNotLinkedToSheetSymbol,  
              eError\_SheetEntryNotLinkedToPort,  
              eError\_DuplicateDocumentNumbers,  
              eError\_UnconnectedWire,  
              eError\_UnconnectedNetItem,  
              eError\_NetWithNoDrivingSource,  
              eError\_FloatingInputPinsOnNet,  
              eError\_DifferentConnectionCodesOnNet,  
              eError\_MultipleSameConnectionCodeOnNet,  
              eError\_MultipleNamesForNet,  
              eError\_AddingItemsFromHiddenNetToNet,  
              eError\_AddingHiddenNet,  
              eError\_PowerObjectScopeChange,  
              eError\_NetParameterInvalidName,  
              eError\_NetParameterInvalidValue,  
              eError\_MismatchedBusSectionOrdering,  
              eError\_MismatchedFirstGenericIndex,  
              eError\_MismatchedSecondGenericIndex,  
              eError\_MismatchedIOTypeOnBus,  
              eError\_BusIndexOutOfRange,  
              eError\_RangeSyntaxError,  
              eError\_IllegalBusDefinition,  
              eError\_IllegalBusRangeValue,  
              eError\_MismatchedBusWidths,  
              eError\_MismatchedBusLabelOrdering,  
              eError\_MixedGenericAndNumericBusLabels,  
              eError\_UnDesignatedPart,  
              eError\_DuplicateComponentDesignator,  
              eError\_DuplicateSheetSymbolDesignator,  
              eError\_DuplicateNets,  
              eError\_DuplicatePinsInComponent,  
              eError\_DuplicateSheetEntrysInSheetSymbol,  
              eError\_DuplicatePortsInDocument,  
              eError\_DuplicateSubParts,  
              eError\_MismatchedHiddenPinConnections,  
              eError\_MismatchedPinVisibility,  
              eError\_SameParameterWithDifferentValues,  
              eError\_SameParameterWithDifferentTypes,  
              eError\_MissingModel,  
              eError\_ModelInDifferentLocation,  
              eError\_MissingModelInFile,  
              eError\_DuplicateModelsFound,  
              eError\_MissingModelParameter,  
              eError\_ErrorInModelParameter,  
              eError\_DuplicatePinsInPortMap,  
              eError\_MissingPinInPortMap,  
              eError\_MissingPinsPortMapSequence,  
              eError\_DuplicateImplementation,  
              eError\_UnusedPartInComponent,  
              eError\_ExtraPinInComponentDisplayMode,  
              eError\_MissingPinInComponentDisplayMode,  
              eError\_MismatchedBusAndWire,  
              eError\_FloatingNetLabel,  
              eError\_FloatingPowerObject,  
              eError\_SinglePinNet,  
              eError\_SignalWithNoLoad,  
              eError\_SignalWithNoDriver,  
              eError\_SignalWithMultipleDrivers,  
              eError\_AutoAssignedPin,  
              eError\_NoError,  
              eError\_MultipleTopLevelDocuments,  
              eError\_MultipleConfigurationTargets,  
              eError\_ConflictingConstraints,  
              eError\_MissingConfigurationTarget,  
              eError\_DuplicateUniqueIDs,  
              eError\_DifferentialPairMissingPositiveNet,  
              eError\_DifferentialPairMissingNegativeNet,  
              eError\_DifferentialPairSameNetInMultiplePairs,  
              eError\_DifferentialPairMisConnected,  
              eError\_DifferentialPairInversedPolarity,  
              eError\_DifferentialPairUnconnectedNet\);

### <a id="TErrorKindSet"></a>TErrorKindSet

TErrorKindSet = Set of TErrorKind;

### <a id="TErrorLevel"></a>TErrorLevel

TErrorLevel = \(eErrorLevelNoReport,eErrorLevelWarning,eErrorLevelError,eErrorLevelFatal\);

### <a id="TErrorLevelSet"></a>TErrorLevelSet

TErrorLevelSet = set of TErrorLevel;

### <a id="TFlattenMode"></a>TFlattenMode

TFlattenMode = \(eFlatten\_Smart,eFlatten\_Flat,eFlatten\_Hierarchical,eFlatten\_Global\);

### <a id="TFileOwnerShipWarningLevel"></a>TFileOwnerShipWarningLevel

TFileOwnershipWarningLevel = \(eFileOwnershipWarningLevel\_None, eFileOwnershipWarningLevel\_Message, eFileOwnershipWarningLevel\_Dialog\);

### <a id="TFilterKind"></a>TFilterKind

TFilterKind = \(eFilter\_All,  
               eFilter\_Documents,  
               eFilter\_Projects,  
               eFilter\_Workspaces,  
               eFilter\_ProjectSource\_PCB,  
               eFilter\_ProjectSource\_FPGA,  
               eFilter\_ProjectSource\_Core,  
               eFilter\_ProjectSource\_EMB,  
               eFilter\_ProjectSource\_ILB,  
               eFilter\_ECOFiles,  
               eFilter\_ProjectSource\_SCR\);

### <a id="TFlowState"></a>TFlowState

TFlowState = \(eState\_UpToDate,eState\_OutOfDate,eState\_Failed,eState\_Missing,eState\_Running,eState\_None\);

### <a id="THighlightMethod"></a>THighlightMethod

THighlightMethod = \(eHighlight\_Filter,eHighlight\_Zoom,eHighlight\_Select,eHighlight\_Graph,eHighlight\_Dim,eHighlight\_Thicken, eHighlight\_ZoomCursor\);

### THighlightMethod

THighlightMethodSet = Set Of THighlightMethodSet;

### <a id="TModificationKind"></a>TModificationKind

TModificationKind =  
   \( eModification\_Unknown,  
     eModification\_RemoveNode,  
     eModification\_RemoveComponentClassMember,  
     eModification\_RemoveNetClassMember,  
     eModification\_RemoveChannelClassMember,  
     eModification\_RemoveRule,  
     eModification\_RemoveNet,  
     eModification\_RemoveComponent,  
     eModification\_ChangeComponentFootPrint,  
     eModification\_ChangeComponentComment,  
     eModification\_ChangeComponentDesignator,  
     eModification\_ChangeComponentKind,  
     eModification\_AnnotateComponent,  
     eModification\_AddComponent,  
     eModification\_ChangeNetName,  
     eModification\_AddNet,  
     eModification\_AddNode,  
     eModification\_RemoveComponentClass,  
     eModification\_RemoveNetClass,  
     eModification\_RemoveDifferentialPair,  
     eModification\_RemoveChannelClass,  
     eModification\_ChangeComponentClassName,  
     eModification\_ChangeNetClassName,  
     eModification\_ChangeDifferentialPairPositiveNetName,  
     eModification\_ChangeDifferentialPairNegativeNetName,  
     eModification\_ChangeChannelClassName,  
     eModification\_AddComponentClass,  
     eModification\_AddNetClass,  
     eModification\_AddDifferentialPair,  
     eModification\_AddChannelClass,  
     eModification\_AddComponentClassMember,  
     eModification\_AddNetClassMember,  
     eModification\_AddChannelClassMember,  
     eModification\_RemoveRoom,  
     eModification\_ChangeRoom,  
     eModification\_AddRoom,  
     eModification\_AddParameter,  
     eModification\_RemoveParameter,  
     eModification\_ChangeParameterName,  
     eModification\_ChangeParameterValue,  
     eModification\_ChangeParameterType,  
     eModification\_AddRule,  
     eModification\_ChangeRule,  
     eModification\_FullPartUpdate,  
     eModification\_UpdatePartSymbol,  
     eModification\_UpdateImplementationValues,  
     eModification\_AddImplementation,  
     eModification\_RemoveImplementation,  
     eModification\_UpdateCurrentImplementation,  
     eModification\_ChangePinName,  
     eModification\_ChangePinElectrical,  
     eModification\_ChangePortElectrical,  
     eModification\_SwapPin,  
     eModification\_ChangePinSwapId\_Pin,  
     eModification\_AddConstraintGroup,  
     eModification\_RemoveConstraintGroup,  
     eModification\_AddPort,  
     eModification\_RemovePort,  
     eModification\_ChangePortName,  
     eModification\_ChangeComponentLibRef,  
     eModification\_ChangePin,  
     eModification\_ChangePhysicalFootPrint,  
     eModification\_ChangeSubPartID,  
     eModification\_ChangeLibraryReference\);

### <a id="TNetScope_(WSM)"></a>TNetScope \(WSM\)

TNetScope = \(eScopeLocal,eScopeInterface,eScopeGlobal\);

### <a id="TParameterKind"></a>TParameterKind

TParameterKind = \(eParameterKind\_String,  
                  eParameterKind\_Boolean,  
                  eParameterKind\_Integer,  
                  eParameterKind\_Float\);

### <a id="TPathMode"></a>TPathMode

TPathMode = \(ePathAbsolute,ePathRelative\);

### <a id="TPinElectrical_(WSM)"></a>TPinElectrical \(WSM\)

TPinElectrical    = \(eElectricInput,  
                     eElectricIO,  
                     eElectricOutput,  
                     eElectricOpenCollector,  
                     eElectricPassive,  
                     eElectricHiZ,  
                     eElectricOpenEmitter,  
                     eElectricPower\);

### <a id="TSearchMode"></a>TSearchMode

TSearchMode = \(eSearchModeCurrentDatabase,  
               eSearchModeSpecifiedDatabase,  
               eSearchModeMultipleDatabases,  
               eSearchmodeWitnodwsFileSystem\);

### <a id="TSignalDirection"></a>TSignalDirection

TSignalDirection = \(eSignalUndefined,eSignalInput,eSignalOutput,eSignalInOut\);

### <a id="TSystemParameterKind"></a>TSystemParameterKind

TSystemParameterKind = \(eSystemParameter\_UserDefined,  
                        eSystemParameter\_CurrentTime,  
                        eSystemParameter\_CurrentDate,  
                        eSystemParameter\_Time       ,  
                        eSystemParameter\_Date       ,  
                        eSystemParameter\_DocFullPath,  
                        eSystemParameter\_DocName    ,  
                        eSystemParameter\_ModifiedDate,  
                        eSystemParameter\_ApprovedBy  ,  
                        eSystemParameter\_CheckedBy   ,  
                        eSystemParameter\_Author      ,  
                        eSystemParameter\_CompanyName ,  
                        eSystemParameter\_DrawnBy     ,  
                        eSystemParameter\_Engineer    ,  
                        eSystemParameter\_Organization,  
                        eSystemParameter\_Address1    ,  
                        eSystemParameter\_Address2    ,  
                        eSystemParameter\_Address3    ,  
                        eSystemParameter\_Address4    ,  
                        eSystemParameter\_Title       ,  
                        eSystemParameter\_DocNum      ,  
                        eSystemParameter\_Revision    ,  
                        eSystemParameter\_SheetNum    ,  
                        eSystemParameter\_SheetCount  ,  
                        eSystemParameter\_Rule        ,  
                        eSystemParameter\_ImagePath   ,  
                        eSystemParameter\_ConfigurableComponent,  
                        eSystemParameter\_Configuratorname\);

### <a id="TSystemParameterKindSet"></a>TSystemParameterKindSet

TSystemParameterKindSet = Set of TSystemParameterKind;

### <a id="TVariationKind"></a>TVariationKind

TVariationKind = \(eVariation\_None,eVariation\_NotFitted,eVariation\_Alternate\);

### <a id="TViolationTypeDescription"></a>TViolationTypeDescription

TViolationTypeDescription = Record  
    DefaultLevel : TErrorevel;  
    Group        : TErrorGroup;  
    Description  : TDynamicString;  
End;

### <a id="TWorkspaceObjectId"></a>TWorkspaceObjectId

TWorkspaceObjectId =  
  \(  
\{Abstract Objects\}  
    eIdAbstractObject,  
    eIdConnective,  
    eIdConnectiveList,  
   
\{Workspaces\}  
    eIdWorkspace,  
   
\{Projects\}  
    eIdProjectBoardLevel,  
    eIdProjectFPGA,  
    eIdProjectCore,  
    eIdProjectEmbedded,  
    eIdProjectLibrary,  
    eIdProjectScript,  
    eIdProjectFreeDocuments,  
   
\{Documents\}  
    eIdSourceDocument,  
    eIdDocumentGeneric,  
    eIdDocumentSCH,  
    eIdDocumentSCHLIB,  
    eIdDocumentPCBLIB,  
    eIdDocumentFlattened,  
    eIdDocumentEDIF,  
    eIdDocumentVHDL,  
    eIdDocumentVERILOG,  
    eIdDocumentProtelNetlist,  
    eIdDocumentPCADNetlist,  
    eIdDocumentPCB,  
    eIdDocumentCUPL,  
    eIdDocumentAdvSimModel,  
    eIdDocumentAdvSimSubCircuit,  
    eIdDocumentIntegratedLib,  
    eIdDocumentConstraints,  
    eIdDocumentPCadPcb,  
    eIdDocumentPCadLib,  
    eIdDocumentWave,  
    eIdDocumentLogicAnalyser,  
   
\{Electrical Objects\}  
    eIdNet,  
    eIdBus,  
    eIdConstraint,  
    eIdConstraintGroup,  
    eIdPart,  
    eIdFullComponent,  
    eIdFullComponentInstance,  
    eIdImplementation,  
    eIdParameter,  
    eIdSheetSymbol,  
    eIdTextFrame,  
    eIdComponentClass,  
    eIdNetClass,  
    eIdDifferentialPair,  
    eIdChannelClass,  
    eIdRule,  
    eIdRoom,  
    eIdPin,  
    eIdSheetEntry,  
    eIdNetLabel,  
    eIdPowerObject,  
    eIdCrossSheet,  
    eIdPort,  
   
\{InternalObjects\}  
    eIdDifference,  
    eIdDifferenceManager,  
    eIdModification,  
    eIdChangeManager,  
    eIdViolation,  
    eIdViolationManager,  
    eIdComponentMapManager,  
    eIdVariantManager,  
    eIdVHDLEntity,  
    eIdConfiguration,  
   
\{Spatial Analysis Objects\}  
    eIdDirective,  
    eIdSpatialLine,  
    eIdSpatialAnalyser,  
    eIdSpatialCompileMask,  
   
\{Document Readers\}  
    eIdReaderSCH,  
    eIdReaderSCHLIB,  
    eIdReaderPCBLIB,  
    eIdReaderEDIF,  
    eIdReaderCUPL,  
    eIdReaderScript,  
    eIdReaderVHDL,  
    eIdReaderVerific,  
    eIdReaderProtelNetlist,  
    eIdReaderPCADNetlist,  
    eIdReaderPCB,  
    eIdReaderAdvSimLib,  
   
\{Cam Objects\}  
    eIdCamOutputDoc,  
    eIdCamView,  
    eIdCamJob,  
\{Printer Objects\}  
    eIdGeneratedPage,  
    eIdPrintView,  
    eIdPrinterJob,  
    eIdPrinter,  
   
    eIdSignalManager,  
    eIdSignal,  
    eIdSignalNode,  
    eIdSignalLink,  
    eIdSubNet,  
    eIdEntityPort,  
    eIdInstancePort,  
    eIdInstance,  
    eIdExternalObject\);

### <a id="TWorkspaceObjectIdSet"></a>TWorkspaceObjectIdSet

TWorkspaceObjectIdSet = Set Of TWorkspaceObjectId;

 

## <a id="Workspace_Manager_Constants"></a>Workspace Manager Constants 

### General Constants

cStimulusParameterName = 'Stimulus';  
cProbeParameterName    = 'Probe';  
cAnyCompilationStage : TCompilationStageSet = \[Low\(TCompilationStage\)\.\. High\(TCompilationStage\)\];  
cAnyErrorLevel       : TErrorLevelSet       = \[Low\(TErrorLevel\)      \.\. High\(TErrorLevel\)\];  
cAnyErrorKind        : TErrorKindSet        = \[Low\(TErrorKind\)       \.\. High\(TErrorKind\)\];  
   
cCompilationStageStrings : Array\[TCompilationStage\] Of TString = \('Compilation','Flattening'\);  
cErrorLevelStrings       : Array\[TErrorLevel\]       Of TString = \('No Report','Warning','Error','Fatal Error'\);  
   
cImageIndex\_ErrorLevels  : Array\[TErrorLevel\]       Of Integer = \(cImageIndexMarker\_NoError, cImageIndexMarker\_Warning,  
 cImageIndexMarker\_Error,   cImageIndexMarker\_Fatal\);  
   
cNetScopeString          : Array\[TNetScope\] Of TString = \('Local To Document','Sheet Interface','Global'\);  
cVendorACTEL  : TDynamicString              = 'Actel';  
   
cMiscellaneous           = 'Miscellaneous';  
cCanFastCrossSelect\_Emit = 'CanFastCrossSelect\_Emit';  
   
cDatabase\_KeyFieldDelimiter  = '\[\[/\\\]\]';  
   
cSystemParameterNames : Array\[TSystemParameterKind\] Of TString  = \(  
    'User defined',  
    'CurrentTime',  
    'CurrentDate',  
    'Time',  
    'Date',  
    'DocumentFullPathAndName',  
    'DocumentName',  
    'ModifiedDate',  
    'ApprovedBy',  
    'CheckedBy',  
    'Author',  
    'CompanyName',  
    'DrawnBy',  
    'Engineer',  
    'Organization',  
    'Address1',  
    'Address2',  
    'Address3',  
    'Address4',  
    'Title',  
    'DocumentNumber',  
    'Revision',  
    'SheetNumber',  
    'SheetTotal',  
    'Rule',  
    'ImagePath',  
    'ConfigurationParameters',  
    'ConfiguratorName'\);  
   
cDocumentSystemParameters : Set Of TSystemParameterKind = \[  
    eSystemParameter\_UserDefined ,  
    eSystemParameter\_CurrentTime ,  
    eSystemParameter\_CurrentDate ,  
    eSystemParameter\_Time        ,  
    eSystemParameter\_Date        ,  
    eSystemParameter\_DocFullPath ,  
    eSystemParameter\_DocName     ,  
    eSystemParameter\_ModifiedDate,  
    eSystemParameter\_ApprovedBy  ,  
    eSystemParameter\_CheckedBy   ,  
    eSystemParameter\_Author      ,  
    eSystemParameter\_CompanyName ,  
    eSystemParameter\_DrawnBy     ,  
    eSystemParameter\_Engineer    ,  
    eSystemParameter\_Organization,  
    eSystemParameter\_Address1    ,  
    eSystemParameter\_Address2    ,  
    eSystemParameter\_Address3    ,  
    eSystemParameter\_Address4    ,  
    eSystemParameter\_Title       ,  
    eSystemParameter\_DocNum      ,  
    eSystemParameter\_Revision    ,  
    eSystemParameter\_SheetNum    ,  
    eSystemParameter\_SheetCount  ,  
    eSystemParameter\_Rule        ,  
    eSystemParameter\_ImagePath  
\];  
    cMiscellaneous           = 'Miscellaneous';  
    cCanFastCrossSelect\_Emit = 'CanFastCrossSelect\_Emit';

### <a id="Parameter_Simulation_Names"></a>Parameter Simulation Names

cParameterName\_SimulationFile           = 'Simulation File';  
cParameterName\_SimulationKind           = 'Simulation Kind';  
cParameterName\_SimulationSubKind        = 'Simulation SubKind';  
cParameterName\_SimulationSpicePrefix    = 'Simulation SpicePrefix';  
cParameterName\_SimulationExcludedParts  = 'Simulation ExcludedParts';  
cParameterName\_SimulationNetList        = 'Simulation Netlist';  
cParameterName\_SimulationDescription    = 'Simulation Description';  
cParameterName\_SimulationModelName      = 'Simulation ModelName';  
cParameterName\_SimulationPortMap        = 'Simulation PortMap';  
cParameterName\_SimulationParameters     = 'Simulation Parameters';

### <a id="Document_Kind_Constants"></a>Document Kind Constants

cDocKind\_Asm                     =  'ASM';  
cDocKind\_C                       =  'C';  
cDocKind\_Camtastic               =  'CAMTASTIC';  
cDocKind\_Ckt                     =  'CKT';  
cDocKind\_Constraint              =  'CONSTRAINT';  
cDocKind\_CoreProject             =  'COREPROJECT';  
cDocKind\_Cupl                    =  'CUPL';  
cDocKind\_DatabaseLink            =  'DATABASELINK';  
cDocKind\_DatabaseLib             =  'DATABASELIB';  
cDocKind\_Disassembly             =  'DISASSEMBLY';  
cDocKind\_Edif                    =  'EDIF';  
cDocKind\_EditScript              =  'EDITSCRIPT';  
cDocKind\_EditScriptDSUnit        =  'EDITSCRIPTDSUNIT';  
cDocKind\_EditScriptDSForm        =  'EDITSCRIPTDSFORM';  
cDocKind\_EditScriptBasUnit       =  'EDITSCRIPTBAS';  
cDocKind\_EditScriptTclUnit       =  'EDITSCRIPTTCL';  
cDocKind\_EditScriptVBSUnit       =  'EDITSCRIPTVBSUnit';  
cDocKind\_EditScriptVBSForm       =  'EDITSCRIPTVBSForm';  
cDocKind\_EditScriptJSUnit        =  'EDITSCRIPTJSUNIT';  
cDocKind\_EditScriptJSForm        =  'EDITSCRIPTJSForm';  
cDocKind\_EmbeddedProject         =  'EMBEDDEDPROJECT';  
cDocKind\_FavLink                 =  'FAVLINK';  
cDocKind\_Fpgaflow                =  'FPGAFLOW';  
cDocKind\_FpgaProject             =  'FPGAPROJECT';  
cDocKind\_FpgaWorkspace           =  'FPGAWORKSPACE';  
cDocKind\_FreeDocsProject         =  'FREEDOCSPROJECT';  
cDocKind\_Html                    =  'HTML';  
cDocKind\_Xml                     =  'XML';  
cDocKind\_HtmlHelp                =  'HTMLHELP';  
cDocKind\_IntegratedLibrary       =  'INTEGRATEDLIBRARY';  
cDocKind\_IntLibrary              =  'INTLIBRARY';  
cDocKind\_LogicAnalyser           =  'LogicAnalyser';  
cDocKind\_LogicAnalyserAnalog     =  'LogicAnalyserAnalog';  
cDocKind\_Mdl                     =  'MDL';  
cDocKind\_Nsx                     =  'NSX';  
cDocKind\_OutputJob               =  'OUTPUTJOB';  
cDocKind\_PCADPCB                 =  'PCADPCB';  
cDocKind\_Pcb                     =  'PCB';  
cDocKind\_Situs                   =  'SITUS';  
cDocKind\_Pcb3DLib                =  'PCB3DLIB';  
cDocKind\_PcbLib                  =  'PCBLIB';  
cDocKind\_PCADLIB                 =  'PCADLIB';  
cDocKind\_PcbProject              =  'PCBPROJECT';  
cDocKind\_PDF                     =  'PDF';  
cDocKind\_PickATask               =  'PICKATASK';      
cDocKind\_Profiler                =  'PROFILER';  
cDocKind\_ProjectGroup            =  'PROJECTGROUP';  
cDocKind\_ProtelNetlist           =  'PROTELNETLIST';  
cDocKind\_Sch                     =  'SCH';  
cDocKind\_Schlib                  =  'SCHLIB';  
cDocKind\_ScriptProject           =  'SCRIPTPROJECT';  
cDocKind\_Simdata                 =  'SIMDATA';  
cDocKind\_SIPinModelLibrary       =  'SIPINMODELLIBRARY';  
cDocKind\_Targets                 =  'TARGETS';  
cDocKind\_Text                    =  'TEXT';  
cDocKind\_Vhdl                    =  'VHDL';  
cDocKind\_Verilog                 =  'VERILOG';  
cDocKind\_VhdLib                  =  'VHDLIB';  
cDocKind\_VhdlSim                 =  'VHDLSIM';  
cDocKind\_VhdTst                  =  'VHDTST';  
cDocKind\_VerTst                  =  'VERTST';  
cDocKind\_VQM                     =  'VQM';  
cDocKind\_Wave                    =  'WAVE';  
cDocKind\_WaveSim                 =  'WAVESIM';  
cDocKind\_DefaultPcb              =  'DefaultPcb';  
cDocKind\_DefaultPcbLib           =  'DefaultPcbLib';  
cDocKind\_SchTemplate             =  'SCHDOT';  
cDocKind\_DDB                     = 'DDB';  
   
cDocKind\_ORCAD7\_DSN              = 'ORCAD7\_DSN';  
cDocKind\_ORCAD7\_OLB              = 'ORCAD7\_OLB';  
cDocKind\_ORCAD7\_MAX              = 'ORCAD7\_MAX';  
cDocKind\_ORCAD7\_OLB              = 'ORCAD7\_OLB';  
cDocKind\_ORCAD7\_LLB              = 'ORCAD7\_LLB';  
cDocKind\_ORCAD7\_CIS              = 'ORCAD7\_CIS';  
   
cDocKind\_PCAD16\_PCB              = 'PCAD16\_PCB';  
cDocKind\_PCAD16\_BIN\_PCB          = 'PCAD16\_BIN\_PCB';  
cDocKind\_PCAD16\_NETLIST          = 'PCAD16\_NETLIST';  
cDocKind\_PCAD16\_SCH              = 'PCAD16\_SCH';  
cDocKind\_PCAD16\_BIN\_SCH          = 'PCAD16\_BIN\_SCH';  
cDocKind\_PCAD16\_LIA              = 'PCAD16\_LIA';  
cDocKind\_OLD\_PCAD\_LIB            = 'OLD\_PCAD\_LIB';  
cDocKind\_CIRCUITMAKER2000\_CKT    = 'CM2000\_CKT';  
cDocKind\_CIRCUITMAKER2000\_LIB    = 'CM2000\_LIB';  
cDocKind\_CIRCUITMAKER2000\_DEVLIB = 'CM2000\_DEVLIB';  
cDocKind\_PADS\_PCB                = 'PADS\_PCB';  
cDocKind\_NGC                     = 'NGC';

### <a id="File_Ownership_Constants"></a>File Ownership Constants

cDefaultFileOwnership\_Enabled                = False;  
cDefaultFileOwnership\_WarningLevelSave       = eFileOwnershipWarningLevel\_Dialog;  
cDefaultFileOwnership\_WarningLevelOpen       = eFileOwnershipWarningLevel\_Dialog;  
cDefaultFileOwnership\_EnabledOutputDirectory = False;  
   
cFileOwnershipWarningLevelStrings : Array\[TFileOwnershipWarningLevel\] of TDynamicString =  
\(  
   'No warning',  
   'Warning in Message Panel',  
   'Warning in Dialog box'  
\);

 

## <a id="Image_Index_Table"></a>Image Index Table 

The Message panel has icons which specify messages\. The DM\_AddMessage and DM\_AddMessageParametric methods of the IWorkSpace interface require an icon\.

__Image Index Table__

Index                          = \-1;

IndexTick =  3;

IndexNoERC = 3;

IndexCross                     =  4;

IndexConnective =  4;

IndexConnectiveList =  6

Folder                         =  6;

IndexFreeDocumentsProject = 6

IndexSheetFileName             = 15;

OpenDocument                   = 68;

CloseDocument                  = 69;

NewFromExistingDocument   = 70;

IndexProjectGroup              = 54;

IndexProjectGroup2             = 55;

IndexPcbLayer                  = 51;

IndexEmptySection              =  9;

IndexCamJob                    = 67;

IndexBoardProject              = 56;

IndexFpgaProject               = 57;

IndexEmbeddedProject           = 58;

IndexIntegratedLibrary = 59;

Search                         = 38;

SearchSelected                 = 39;

IndexPCB  = 52;

IndexPCBVariant                = 53;

IndexParameter                 = 24;

IndexDocumentList  = 26;

IndexEdifDocument  = 43;

IndexEdifDocumentSelected      = 43;

 IndexGenericDocument           = 62;

IndexTextFile                  = 62;

IndexCUPLFile                  = 63;

IndexAdvSimModel               = 64;

IndexAdvSimNSX                 = 48;

 IndexAdvSimSubCircuit          = 47;

IndexBasicScript               = 65;

IndexDelphiScript              = 66;

IndexCFile                     = 45;

IndexVHDLDocument              = 44;

IndexVHDLDocumentSelected = 44;

IndexVHDLLibrary               = 44;

IndexSheetSymbolList           = 30;

HierarchyNets                  = 30;

IndexPartList                  = 32;

IndexPinList                   =  5;

IndexTextFrameList             = 28;

IndexProtelNetlistFile         = 46;

IndexSchematicSheetSelected = 10

IndexSchematicSheet            = 15;

IndexSchematicLibrary          = 32;

IndexFlattenedHierarchy        = 15;

IndexPCBLibrary                = 40;

IndexNet                       =  1;

 IndexBus                       = 21;

IndexBusEntry                  = 74;

IndexPart                      =  2;

IndexComponent                 = 20;

IndexFootprint                 = 36;

IndexSubPart                   =  2;

IndexImplementation            =  8;

IndexSheetSymbol               = 13;

IndexTextFrame                 = 18;

IndexPin                       = 19;

IndexPad                       = 41;

IndexHiddenName                = 19;

IndexNetLabel                  = 22;

IndexPowerObject               = 16;

 IndexPort                      = 17;

IndexSheetEntry                = 14;

IndexViolation                 =  4;

IndexDesignatorMapping         =  2

IndexDesignatorManager         =  8;

IndexModification              =  4;

IndexModificationList          =  9;

IndexDifference                =  4;

IndexDifferenceList            =  8;

IndexNetParameter              = 24;

IndexSchematicSheetProcessor = 15

IndexSchematicLibraryProcessor = 15;

IndexEdifDocumentProcessor     = 15;

IndexVHDLDocumentProcessor = 15;

IndexVHDLLibraryProcessor      = 15;

IndexNetlistFileProcessor      = 15;

IndexBoardProcessor            = 15;

IndexSpatialAnalyser           = 15;

IndexBusSection                = 21;

IndexBusElement                = 34;

IndexErrorList                 = 6;

IndexSpatialLine               = 1;

IndexComponentClass            = 7;

IndexNetClass                  = 7;

IndexRule                      = 2;

IndexRoom                      = 3;

IndexGraphic                   = 75;

IndexJunction                  = 76;

IndexAnnotation                = 77;

IndexBrowserNetIdentifiers     = 78;

IndexLibRef                    = 79;

IndexComponentParameters  = 80;

IndexSheetSymbolParameters     = 81;

IndexPortParameters            = 82;

IndexPinParameters             = 83;

IndexErrorMarker               = 84;

IndexParameterSet              = 85;

IndexPinsAndParts              = 86;

IndexRectangle                 = 87;

IndexArc                       = 88;

IndexEllipticalArc             = 89;

IndexRoundRectangle            = 90;

IndexDesignator                = 91;

Indexellipse                   = 92;

IndexPie                       = 93;

IndexPolygon                   = 94;

IndexPolyline                  = 95;

IndexBezier                    = 96;

IndexSheetName                 = 97;

IndexSymbol                    = 98;

IndexTaskHolder                = 99

IndexFolder\_NoError            = 6;

IndexFolder\_Warning            = 7;

 IndexFolder\_Error              = 8;

IndexFolder\_Fatal              = 9;

IndexGeneratedPage             = 33;

IndexPrintView                 = 61;

IndexPrinterJob                = 67;

IndexPrinter                   = 49;

IndexOutput                    = 61;

IndexAlias                     = 71;

IndexAliases                   = 72;

IndexOffsheetPin               = 73;

IndexOffSheetPart              = 100;

IndexOffSheetNet               = 101;

IndexOffSheetBus               = 102;

IndexOffSheetPort              = 103;

IndexOffSheetSheetEntry        = 104;

IndexOffSheetNetLabel          = 105;

IndexOffSheetPowerObject       = 106;

IndexMarker\_NoError            = 107;

IndexMarker\_Warning            = 108;

IndexMarker\_Error              = 109;

IndexMarker\_Fatal              = 110;

Index\_MainHotSpot1             = 0;

Index\_MainHotSpot2             = 1;

Index\_MainHotSpot3             = 2;

Index\_MainHotSpot4             = 3;

Index\_MainHotSpot5             = 4;

Index\_MainHotSpot6             = 5;

Index\_MainHotSpot7             = 6;

 Index\_MainHotSpot8             = 7;

Index\_MainHotSpot9             = 8;

Index\_MainHotSpot10            = 9;

 

 

__See also__  
Work Space Manager API Reference

 

## <a id="WorkSpace_Manager_Functions"></a>WorkSpace Manager Functions 

### <a id="Main_Interfaces"></a>Main Interfaces

Function WSMServer    : IWSM\_ServerInterface;  
Function GetWorkspace : IWorkspace;

### <a id="Project_and_Document_Interfaces"></a>Project and Document Interfaces

Function GetProjectOfDocument\(Const ADocPath : WideString\) : IProject;  
Function IsFreeDocument\(Const FileName : WideString\) : LongBool;

### <a id="Object_functions"></a>Object functions

Function IsBusConnector\(ALibReference : TDynamicString\) : Boolean;

### <a id="Violation_and_Error_Functions"></a>Violation and Error Functions

Function GetViolationTypeInformation\(ErrorKind : TErrorKind\) : TViolationTypeDescription;  
Function GetViolationTypeDescription\(ErrorKind : TErrorKind\) : TDynamicString;  
Function GetViolationTypeDefaultLevel\(ErrorKind : TErrorKind\) : TErrorLevel;  
Function GetViolationTypeGroup\(ErrorKind : TErrorKind\) : TErrorGroup;  
Function GetErrorLevelColor\(ErrorLevel : TErrorLevel\) : TColor;  
__See also__  
Work Space Manager API Reference  
IProject interface  
TColor type  
TDynamicString type  
TErrorLevel type  
TErrorGroup type  
TViolationTypeDescription type

# Technical Reference \- Integrated Library API

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Technical Reference \- Integrated Library API for version 22](https://www.altium.com/documentation/altium-designer/technical-reference-integrated-library-api)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Altium Designer API Reference](https://www.altium.com/documentation/altium-designer/altium-design-software-api-reference?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

The Integrated Library Application Programming Interface reference covers the __Integrated Library API__ interface objects\.

The Altium Designer scripting system implements a subset of the complete Altium Designer API and its Object Interfaces\. The [Altium DXP Developer](https://www.altium.com/en/developer), used for developing Altium Designer server Extensions, has access to the full Altium Designer API via a set of API SDK source units\.

##   
Integrated Library API Overview 

A schematic design is a collection of components which have been connected logically\. To test or implement the design it needs to be transferred to another modelling domain, such as simulation, PCB layout, Signal Integrity analysis and so on\.

Each domain needs some information about each component, and also some way to map that information to the pins of the schematic component\. Some of the domain information resides in model files, the format of which is typically pre\-defined, examples of these includes IBIS, MDL and CKT files\. Some of the information does not reside in the model files, for example the spice pin mapping and net list data\.

There are different types of libraries in Altium Designer– normal standalone libraries like PCB Libraries and Schematic Libraries and another type called an integrated library which contains different source libraries such as PCB libraries bundled together\.

### Models

Each schematic component can have models from one or more domains\. A schematic component can also have multiple models per domain, one of which will be the current model for that domain\.

A model represents all the information needed for a component in a given domain, while a datafile entity \(or link\) is the only information which is in an external file\.  See the diagram below for a relationship between a Schematic component and its models\. A model can be represented by external data sources called data file links\. For example, pins of a component can have links to different data files, as for signal integrity models\. We will consider each model type in respect to the data file links for the main editor servers supported in Altium Designer\.

A Model has Ports that are mapped to the pins of a schematic component\. Note that a model can also be called an implementation\. A model/implementation can have its own parameters and data file links\.

### PCB Footprints

For the PCB footprints, the model and the data file are both the same \(no external file needed\)\.

### PCB 3D Models

For the PCB 3D models, the model and the data file are both the same \(no external file needed\)\.

### Simulation Models

With the simulation models, you can have a simulation model which is a 4ohm resistor for example\. But there is no information coming from an external file and thus no external file is needed for this resistor as the resistor model is built from Spice modeling language in Altium Designer\. This is the case where you have a model with no data file entity\.

Thus the parameters are used for these types of simulation models that don’t have data file links \(external files\)\. Simulation Models can have up to 3 different model data files – Model File\(\*\.MDL\), Subcircuit file \(\*\.CKT\) and SIMetrix Model Library file \(\*\.LB\)\.

### Signal Integrity Models

With signal integrity models, it can have information required for each pin\. If we used IBIS datafiles, not the Altium Designer's central database, then each signal integrity model would then have multiple data files, each one for each type of pin\.

### References for the Integrated Library API

- [IntLib API Manager Interfaces](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21)
- [IntLib API Datafile Interfaces](https://www.altium.com/documentation/altium-designer/intlib-api-datafile-interfaces?version=21)
- [IntLib API IModel Interfaces](https://www.altium.com/documentation/altium-designer/intlib-api-imodel-interfaces?version=21)

### Separate references for other Altium Designer APIs

- System API Object Model \- refer to the [System API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-system-api?version=21)
- Schematic Object Model \- refer to the [Schematic API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)
- PCB Object Model  \- refer to the [PCB API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)
- Workspace Manager Object Model \- refer to the [Workspace Manager API Reference](https://www.altium.com/documentation/altium-designer/technical-reference-workspace-manager-api?version=21)

## Integrated Library Interfaces 

### What are Object Interfaces?

Each method in the object interface is implemented in the corresponding class\. Object Interfaces \(interfaces for short\) are declared like classes but cannot be directly instantiated and do not have their own method definitions\.

Each interface, a class supports is actually a list of pointers to methods\. Therefore, each time a method call is made to an interface, the interface actually diverts that call to one of it's pointers to a method, thus giving the object that really implements it, the chance to act\.

The Integrated Library interfaces exist as long there are associated existing objects in memory, thus when writing a script or server code, you have the responsibility of checking whether the interface you wish to query exists or not before you proceed to invoke the interface's methods\.

To obtain the Integrated Library Manager object interface which represents to the Integrated Library manager object, invoke the IntegratedLibraryManager function in your script or code which returns you the IIntegratedLibraryManager object interface\.

To obtain the model type manager, invoke the ModelTypeManager function in your script which returns you the IModelTypeManger interface\.

### Main Integrated Library Interfaces

There are three main interfaces from the Integrated Library Object Model\.

- IIntegratedLibraryManager Interface
- IModelTypeManager Interface
- IDeviceSheetManager Interface

See the [IntLib API Manager Interfaces](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21) document for information on the above interfaces\.

### IntegratedLibraryManager Interface Example

01

Procedure CheckDataFilesInIntLibrary;

02

Var

03

    IntMan         : IIntegratedLibraryManager;

04

    FoundLocation  : String;

05

    AFootprintName : String;

06

    InIntLib       : Boolean;

07

    AModelType      : String;

08

Begin

09

    IntMan := IntegratedLibraryManager;

10

    If IntMan = Nil Then Exit;

11

    IntMan\.InstallLibrary\('C:\\Program Files\\Altium Designer\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib'\);

12

    //Look for a footprint in a Xilinx Spartan\-3E\.IntLib

13

    AModelType     := 'PCBLIB';

14

    AFootprintName := 'TQ144';

15

    InIntLib       := True;

16

    IntMan\.FindDatafileInStandardLibs \(AFootprintName, AModelType, '', InIntLib, FoundLocation\);

17

    ShowMessage\(FoundLocation\);

18

    IntMan\.UnInstallLibrary\('C:\\Program Files\\Altium Designer 6\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib'\);

19

End;

### Script Examples

There are script examples in the \\Examples\\Scripts\\ folder of the Altium Designer installation\.

# IntLib API Manager Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [IntLib API Manager Interfaces for version 22](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Integrated Library API](https://www.altium.com/documentation/altium-designer/technical-reference-integrated-library-api?version=21) 

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\. 

## Integrated Library API: Manager Interfaces 

The Integrated Library API Manager Interfaces Reference includes the following sections and content: 

[__IIntegratedLibraryManager Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IIntegratedLibraryManager Interface)

[__IModelTypeManager Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IModelTypeManager Interface)

[__IDeviceSheetManager Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IDeviceSheetManager Interface)

[Integrated Library Manager Methods](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#Integrated Library Manager Methods)

[IModelTypeManager Methods](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IModelTypeManager Methods)  
[IModelTypeManager Properties](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IModelTypeManager Properties)

[IDeviceSheetManager Methods](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IDeviceSheetManager Methods)

  

## <a id="IIntegratedLibraryManager_Interface"></a>IIntegratedLibraryManager Interface 

__Overview__  
The IIntegratedLibraryManager interface represents the integrated library manager that manages schematic components and its models from installed libraries in Altium Designer\. 

Invoke the IntegratedLibraryManager function to fetch the IIntegratedLibraryManager interface\. 

__Integrated Library Manager Methods and Properties Table__ 

__IIntegratedLibraryManager methods__  
AddRemoveLibraries  
AvailableLibraryCount  
AvailableLibraryPath  
AvailableLibraryType  
BrowseComponent  
BrowseDatafileEntity  
BrowseDatafileEntityInDatafile  
BrowseForComponent  
BrowseForComponentAndPart  
BrowseForComponentAndPartCheckDBLibs  
BrowseForComponentCheckDBLibs  
BrowseForDatafile  
BrowseModel  
BrowseSymbol  
ComponentHasModelOfType  
CreateIntegratedLibrary  
ExtractSources  
ExtractSourcesToDatabaseLib  
ExtractSourcesToPath  
FindDatafileInStandardLibs  
FindComponentLibraryPath  
FindComponentDisplayPath  
FindComponentSymbol  
FindDatafileEntityDatafilePath  
FindDatafileEntitySourceDatafilePath  
FindDatafileEntitySourceLibraryPath  
FindDatafileEntityLibraryPath  
FindLibraryInformation  
FindModelLibraryPath  
GetAllParametersFromSourceLib  
GetAvailableDBLibDocAtPath  
GetComponentCount  
GetComponentDatafileLocation  
GetComponentLocation  
GetComponentLocationFromDatabase  
GetComponentName  
GetDatabaseDatafileLocation  
GetDatafileEntityCount  
GetDatafilePath  
GetModelCount  
GetModelName  
GetModelType  
GetParametersForDBComponent  
GetSchLibPathForDBComponent  
GetSchLibRefForDBComponent  
GetParameterCount  
GetParameterName  
GetParameterValue  
GetComponentPlacementParameters  
InstalledLibraryCount  
InstalledLibraryPath  
InstallLibrary  
IsParameterDatabaseKey  
MakeCurrentProject  
ModelCount  
ModelName  
ParseDatabaseKeys  
PlaceLibraryComponent  
UninstallLibrary

__IIntegratedLibraryManager properties__

__See also__  
Examples\\Scripts\\DXP\_Scripts\\ folder of Altium Designer installation 

### <a id="Integrated_Library_Manager_Methods"></a>Integrated Library Manager Methods