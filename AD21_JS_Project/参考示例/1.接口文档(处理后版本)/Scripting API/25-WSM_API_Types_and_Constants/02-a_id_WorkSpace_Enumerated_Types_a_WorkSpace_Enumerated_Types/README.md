# <a id="WorkSpace_Enumerated_Types"></a>WorkSpace Enumerated Types

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


TChannelRoomNamingStyle = \(eChannelRoomNamingStyle\_FlatNumericWithNames,  
                           eChannelRoomNamingStyle\_FlatAlphaWithNames,  
                           eChannelRoomNamingStyle\_NumericNamePath,  
                           eChannelRoomNamingStyle\_AlphaNamePath,  
                           eChannelRoomNamingStyle\_MixedNamePath\);


TCompilationStage = \(eCompilationStage\_Compiling,eCompilationStage\_Flattening\);


TCompilationStageSet = Set of TCompilationStage;


TCompileMode = \(eCompile\_None,eCompile\_Document,eCompile\_All,eCompile\_Smart\);


TComponentKind = \(eComponentKind\_Standard,  
                  eComponentKind\_Mechanical,  
                  eComponentKind\_Graphical,  
                  eComponentKind\_NetTie\_BOM,  
                  eComponentKind\_NetTie\_NoBOM,  
                  eComponentKind\_Standard\_NoBOM\);


TDisplayMode = Byte; // one of 255 display modes


TECO\_Mode = \(eECO\_PerformAction,  
             eECO\_ValidateAction,  
             eECO\_CheckSupportForAction\);


TErrorGroup = \(eErrorGroupDocument,  
               eErrorGroupComponent,  
               eErrorGroupParameters,  
               eErrorGroupBus,  
               eErrorGroupNet,  
               eErrorGroupMisc\);


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


TErrorKindSet = Set of TErrorKind;


TErrorLevel = \(eErrorLevelNoReport,eErrorLevelWarning,eErrorLevelError,eErrorLevelFatal\);


TErrorLevelSet = set of TErrorLevel;


TFlattenMode = \(eFlatten\_Smart,eFlatten\_Flat,eFlatten\_Hierarchical,eFlatten\_Global\);


TFileOwnershipWarningLevel = \(eFileOwnershipWarningLevel\_None, eFileOwnershipWarningLevel\_Message, eFileOwnershipWarningLevel\_Dialog\);


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


TFlowState = \(eState\_UpToDate,eState\_OutOfDate,eState\_Failed,eState\_Missing,eState\_Running,eState\_None\);


THighlightMethod = \(eHighlight\_Filter,eHighlight\_Zoom,eHighlight\_Select,eHighlight\_Graph,eHighlight\_Dim,eHighlight\_Thicken, eHighlight\_ZoomCursor\);


THighlightMethodSet = Set Of THighlightMethodSet;


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


TNetScope = \(eScopeLocal,eScopeInterface,eScopeGlobal\);


TParameterKind = \(eParameterKind\_String,  
                  eParameterKind\_Boolean,  
                  eParameterKind\_Integer,  
                  eParameterKind\_Float\);


TPathMode = \(ePathAbsolute,ePathRelative\);


TPinElectrical    = \(eElectricInput,  
                     eElectricIO,  
                     eElectricOutput,  
                     eElectricOpenCollector,  
                     eElectricPassive,  
                     eElectricHiZ,  
                     eElectricOpenEmitter,  
                     eElectricPower\);


TSearchMode = \(eSearchModeCurrentDatabase,  
               eSearchModeSpecifiedDatabase,  
               eSearchModeMultipleDatabases,  
               eSearchmodeWitnodwsFileSystem\);


TSignalDirection = \(eSignalUndefined,eSignalInput,eSignalOutput,eSignalInOut\);


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


TSystemParameterKindSet = Set of TSystemParameterKind;


TVariationKind = \(eVariation\_None,eVariation\_NotFitted,eVariation\_Alternate\);


TViolationTypeDescription = Record  
    DefaultLevel : TErrorevel;  
    Group        : TErrorGroup;  
    Description  : TDynamicString;  
End;


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


TWorkspaceObjectIdSet = Set Of TWorkspaceObjectId;

## 子章节

- [<a id="TChannelRoomNamingStyle"></a>TChannelRoomNamingStyle](01-a_id_TChannelRoomNamingStyle_a_TChannelRoomNamingStyle.md.md)
- [<a id="TCompilationStage"></a>TCompilationStage](02-a_id_TCompilationStage_a_TCompilationStage.md.md)
- [<a id="TCompilationStageSet"></a>TCompilationStageSet](03-a_id_TCompilationStageSet_a_TCompilationStageSet.md.md)
- [<a id="TCompileMode"></a>TCompileMode](04-a_id_TCompileMode_a_TCompileMode.md.md)
- [<a id="TComponentKind"></a>TComponentKind](05-a_id_TComponentKind_a_TComponentKind.md.md)
- [<a id="TDisplayMode"></a>TDisplayMode](06-a_id_TDisplayMode_a_TDisplayMode.md.md)
- [<a id="TECO_Mode"></a>TECO\_Mode](07-a_id_TECO_Mode_a_TECO_Mode.md.md)
- [<a id="TErrorGroup"></a>TErrorGroup](08-a_id_TErrorGroup_a_TErrorGroup.md.md)
- [<a id="TErrorKind"></a>TErrorKind](09-a_id_TErrorKind_a_TErrorKind.md.md)
- [<a id="TErrorKindSet"></a>TErrorKindSet](10-a_id_TErrorKindSet_a_TErrorKindSet.md.md)
- [<a id="TErrorLevel"></a>TErrorLevel](11-a_id_TErrorLevel_a_TErrorLevel.md.md)
- [<a id="TErrorLevelSet"></a>TErrorLevelSet](12-a_id_TErrorLevelSet_a_TErrorLevelSet.md.md)
- [<a id="TFlattenMode"></a>TFlattenMode](13-a_id_TFlattenMode_a_TFlattenMode.md.md)
- [<a id="TFileOwnerShipWarningLevel"></a>TFileOwnerShipWarningLevel](14-a_id_TFileOwnerShipWarningLevel_a_TFileOwnerShipWarningLevel.md.md)
- [<a id="TFilterKind"></a>TFilterKind](15-a_id_TFilterKind_a_TFilterKind.md.md)
- [<a id="TFlowState"></a>TFlowState](16-a_id_TFlowState_a_TFlowState.md.md)
- [<a id="THighlightMethod"></a>THighlightMethod](17-a_id_THighlightMethod_a_THighlightMethod.md.md)
- [THighlightMethod](18-THighlightMethod.md.md)
- [<a id="TModificationKind"></a>TModificationKind](19-a_id_TModificationKind_a_TModificationKind.md.md)
- [<a id="TNetScope_(WSM)"></a>TNetScope \(WSM\)](20-a_id_TNetScope_WSM_a_TNetScope_WSM.md.md)
- [<a id="TParameterKind"></a>TParameterKind](21-a_id_TParameterKind_a_TParameterKind.md.md)
- [<a id="TPathMode"></a>TPathMode](22-a_id_TPathMode_a_TPathMode.md.md)
- [<a id="TPinElectrical_(WSM)"></a>TPinElectrical \(WSM\)](23-a_id_TPinElectrical_WSM_a_TPinElectrical_WSM.md.md)
- [<a id="TSearchMode"></a>TSearchMode](24-a_id_TSearchMode_a_TSearchMode.md.md)
- [<a id="TSignalDirection"></a>TSignalDirection](25-a_id_TSignalDirection_a_TSignalDirection.md.md)
- [<a id="TSystemParameterKind"></a>TSystemParameterKind](26-a_id_TSystemParameterKind_a_TSystemParameterKind.md.md)
- [<a id="TSystemParameterKindSet"></a>TSystemParameterKindSet](27-a_id_TSystemParameterKindSet_a_TSystemParameterKindSet.md.md)
- [<a id="TVariationKind"></a>TVariationKind](28-a_id_TVariationKind_a_TVariationKind.md.md)
- [<a id="TViolationTypeDescription"></a>TViolationTypeDescription](29-a_id_TViolationTypeDescription_a_TViolationTypeDescription.md.md)
- [<a id="TWorkspaceObjectId"></a>TWorkspaceObjectId](30-a_id_TWorkspaceObjectId_a_TWorkspaceObjectId.md.md)
- [<a id="TWorkspaceObjectIdSet"></a>TWorkspaceObjectIdSet](31-a_id_TWorkspaceObjectIdSet_a_TWorkspaceObjectIdSet.md.md)
