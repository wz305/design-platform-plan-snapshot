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