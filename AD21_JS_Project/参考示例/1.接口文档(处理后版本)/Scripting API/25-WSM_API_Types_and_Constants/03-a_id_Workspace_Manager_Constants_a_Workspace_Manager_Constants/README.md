# <a id="Workspace_Manager_Constants"></a>Workspace Manager Constants

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

## 子章节

- [General Constants](01-General_Constants.md.md)
- [<a id="Parameter_Simulation_Names"></a>Parameter Simulation Names](02-a_id_Parameter_Simulation_Names_a_Parameter_Simulation_Names.md.md)
- [<a id="Document_Kind_Constants"></a>Document Kind Constants](03-a_id_Document_Kind_Constants_a_Document_Kind_Constants.md.md)
- [<a id="File_Ownership_Constants"></a>File Ownership Constants](04-a_id_File_Ownership_Constants_a_File_Ownership_Constants.md.md)
