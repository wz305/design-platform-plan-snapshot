# <a id="Configuration_Constraints_Interfaces"></a>Configuration Constraints Interfaces

__Overview__  
The IConfiguration interface represents the configuration container that contains a group of constraints which targets a specific FPGA device\.  
__Interface Methods__  
Function    DM\_Name                              : WideString;   
Function    DM\_ConstraintGroupCount              : Integer;   
Function    DM\_ConstraintGroups\(Index : Integer\) : IConstraintGroup;  
Function    DM\_ConstraintsFileCount                 : Integer;   
Function    DM\_ConstraintsFilePath\(Index : Integer\) : WideString;  
Procedure   DM\_AddConstraintFile\(AConstraintFilePath : WideString\);  
Function    DM\_GetTargetDeviceName                  : WideString;  
__See also__  
Workspace Manager Interfaces


__Overview__  
The IConstraintGroup interface represents a constraint file made up of constraints \(as IConstraint interface\)\.  
__Important notes__  
Inherited from IDMObject  interface  
__Interface Methods__  
Function   DM\_TargetKindString             : WideString;   
Function   DM\_TargetId                     : WideString;   
Function   DM\_ConstraintCount              : Integer;      
Function   DM\_Constraints\(Index : Integer\) : IConstraint;  
__See also__  
Workspace Manager Interfaces  
IConstraint interface


__Overview__  
The IConstraint interface represents the data entry in a constraint file represented by the IConstraintGroup interface\.  
__Important notes__  
Inherited from IDMObject  interface  
__Interface Methods__  
Function   DM\_Kind : WideString;  
Function   DM\_Data : WideString;  
__See also__  
Workspace Manager Interfaces  
IConstraintGroup interface


__Overview__  
The IInstalledConstraintFiles interface represents the constraint files that are installed in Altium Designer, ie available to a FPGA project\.  
__Interface Methods__  
Function  InstalledConstraintFileCount                      : Integer;     
Function  InstalledConstraintFile   \(aIndex   : Integer\)    : WideString;  
Function  ConstraintFileIsInstalled \(aPath    : WideString\) : LongBool;    
Function  DefaultConstraintFile                             : WideString;  
Function  EditInstalledConstraintFiles                      : LongBool;    
__See also__  
Workspace Manager Interfaces


__Overview__  
The IOutputer interface represents the one of the outputs of an output job within a design project\.  
__Interface Methods__  
Function    DM\_ViewName                   : WideString  
Function    DM\_EditProperties             : Boolean;  
Function    DM\_Generate\_OutputFilesTo \(OutputDirectory : WideString; ParameterOverrides : PChar\) : Boolean;  
Function    DM\_Generate\_OutputFiles   \(AGeneratedFilename : PChar\) : Boolean;  
Procedure   DM\_SetPrintScale          \(APrintScale        : Double\);  
Procedure   DM\_SetPrintMode           \(AFitPrintToPage    : Boolean\);  
Procedure   DM\_SetDocumentPath        \(ADocPath           : WideString\);   
__See also__  
Workspace Manager Interfaces  
IProject interface  
IOutputJob interface  
IWSM\_OutputJobDocument interface


__Overview__  
The IStrings interface represents the strings container – more like a list of strings\.  
__Interface Methods__  
Function GetCount : Integer;                           
Function GetItem\(Index : Integer\) : WideString;        
Function IndexOf\(Const Value : WideString\) : Integer;  
__Interface Properties__  
Property Count : Integer read GetCount;  
Property Items\[Index : Integer\] : WideString read GetItem; default;  
__See also__  
Workspace Manager Interfaces


__Overview__  
The IWSM\_OutputJobDocument interface represents the output jobs document in Altium Designer\.  
__Interface Methods__  
Function  GetState\_Outputer      \(AIndex : Integer\) : IOutputer;  
Function  GetState\_OutputerCount                    : Integer;  
   
Function  CreateOutputer      \(Const AOutputCategoryName   : WideString;  
                               Const APredefinedOutputName : WideString;  
                               Const AOutputerName         : WideString\) : IOutputer;  
Function  BeginModifyOutputer \(Const AOutputer : IOutputer \) : Boolean;    
Procedure EndModifyOutputer;  
__Interface Properties__  
Property  Outputer \[AIndex : Integer\] : IOutputer Read GetState\_Outputer;  
Property  OutputerCount               : Integer   Read GetState\_OutputerCount;  
__See also__  
Workspace Manager Interfaces  
IProject interface  
IOutputJob interface  
IWSM\_OutputJobDocument interface


__Overview__  
The IWSM\_ServerInterface interface represents the high level mechanism that manages different output job documents\.  
__Interface Methods__  
Function  GetOutputJobDocumentByPath \(APath : WideString\) : IWSM\_OutputJobDocument;  
__Interface Properties__  
  
__See also__  
Workspace Manager Interfaces  
IProject interface  
IOutputJob interface  
IWSM\_OutputJobDocument interface


__Overview__  
The IDifferentialPair interface represents a differential pair object\.  
__Interface Methods         __  
IObjectClass methods  
__Interface Properties__  
IObjectClass properties  
__See also__  
Workspace Manager Interfaces


__Overview__  
The IDatabaseLibDocument interface represents a database library document\.

__Interface Methods__  
Procedure GetModelFieldNamesAt\(AnIndex            : Integer;  
                               ATableIndex        : Integer;  
                               AModelType         : WideString;  
                           Var AModelPathName : WideString;  
                           Var AModelRefName  : WideString;  
                           Var AOrcadModel    : Boolean\);  
Procedure InitialiseExportToDatabase \(ADatabaseFileName  : WideString\);  
Procedure FinaliseExportFromDatabase;  
Procedure DisposeIfNotShowing;  
Procedure GetOrcadLibraryDetails     \(AParseString       : WideString;  
                                      Var LibRef         : WideString;  
                                      Var LibPath        : WideString\);  
   
Function  ExportNewRecordFromIntLib  \(ATableName       : WideString;  
                                      AFieldParameters : WideString\) : WideString;  
   
Function InitialiseExportFromIntLib  \(ATableName         : WideString\) : WideString;  
Function GetConnectionString                 : WideString;  
Function GetCommandString\(ATableIndex        : Integer;  
                          AFilterText        : WideString;  
                          ASQLWhereClause    : WideString\) : WideString;  
Function GetFilterText   \(ATableIndex        : Integer;  
                          AFilterColumnNames : WideString;  
                          AFilterValue       : WideString\) : WideString;  
Function GetParametersForComponent   \(ATableIndex        : Integer;  
                                      AComponentKeys     : WideString\) : WideString;  
   
Function GetTableCount : Integer;  
Function GetFileName   : Widestring;  
   
Function GetKeyFieldCount\(ATableIndex       : Integer\)     : Integer;  
Function GetKeyField     \(AParameterName    : Boolean;  
                          ATableIndex       : Integer;  
                          AKeyIndex         : Integer\)     : WideString;  
Function GetLibraryRefFieldName\(ATableIndex       : Integer;  
                            Var AOrcadLibrary : Boolean\)     : WideString;  
Function GetLibraryPathFieldName\(ATableIndex   : Integer\)         : WideString;  
Function GetFieldCount   \(ATableIndex   : Integer\)         : Integer;  
Function GetTableNameAt  \(AnIndex       : Integer\)         : WideString;  
Function GetFieldNameAt  \(ATableIndex   : Integer;  
                          AFieldIndex   : Integer\)         : WideString;  
Function GetTableIndex   \(ATableName    : WideString\)      : Integer;  
Function TableEnabled    \(AnIndex       : Integer\)         : Boolean;  
Function DocumentObject                            : Pointer;  
Function GetItemCount\(    ACommand  : WideString;  
                      Var AnError   : WideString\)      : Integer;  
Function TableContainsColumn\(ATableIndex   : Integer;  
                             AColumnName   : WideString\)      : Boolean;  
Function IsValidSQLStatementForTable \(ATableName    : WideString;  
                                          AQuery        : WideString\)      : Boolean;  
Function LoadAllRecordsLimit                                           : Integer;  
   
Function ValidateSQLQuery            \(ASqlQuery         : WideString\)  : WideString;  
Function GetDatafilePath             \(AName             : WideString;  
                                          AType             : WideString;  
                                          ATableName        : WideString;  
                                          AComponentKeys    : WideString\)  : WideString;  
    Function GetSchLibPathForComponent   \(ATableIndex       : Integer;  
                                          AComponentKeys    : WideString\)  : WideString;  
Function GetSchLibRefForComponent\(ATableIndex       : Integer;  
                                 AComponentKeys    : WideString\)  : WideString;  
Function IsParameterDatabaseKey\(ATableIndex       : Integer;  
                                AParameterName    : WideString\)  : Boolean;  
   
Function ObjectAddress           : Pointer;  
Function GetLibrarySearchPath    : WideString;  
Function GetSearchSubDirectories : Boolean;  
Function OrcadDelimiter           : Char;  
__Interface Properties__  
IObjectClass properties  
__See also__  
Workspace Manager Interfaces

## 子章节

- [<a id="IConfiguration_interface"></a>IConfiguration interface](01-a_id_IConfiguration_interface_a_IConfiguration_interface.md.md)
- [<a id="IConstraintGroup_interface"></a>IConstraintGroup interface](02-a_id_IConstraintGroup_interface_a_IConstraintGroup_interface.md.md)
- [<a id="IConstraint_interface"></a>IConstraint interface](03-a_id_IConstraint_interface_a_IConstraint_interface.md.md)
- [<a id="IInstalledConstraintFiles_interface"></a>IInstalledConstraintFiles interface](04-a_id_IInstalledConstraintFiles_interface_a_IInstalledConstraintFiles_interface.md.md)
- [<a id="IOutputer_interface"></a>IOutputer interface](05-a_id_IOutputer_interface_a_IOutputer_interface.md.md)
- [<a id="IStrings_interface"></a>IStrings interface](06-a_id_IStrings_interface_a_IStrings_interface.md.md)
- [<a id="IWSM_OutputJobDocument_interface"></a>IWSM\_OutputJobDocument interface](07-a_id_IWSM_OutputJobDocument_interface_a_IWSM_OutputJobDocument_interface.md.md)
- [<a id="IWSM_ServerInterface_interface"></a>IWSM\_ServerInterface interface](08-a_id_IWSM_ServerInterface_interface_a_IWSM_ServerInterface_interface.md.md)
- [<a id="IDifferentialPair_interface"></a>IDifferentialPair interface](09-a_id_IDifferentialPair_interface_a_IDifferentialPair_interface.md.md)
- [<a id="IDatabaseLibDocument_interface"></a>IDatabaseLibDocument interface](10-a_id_IDatabaseLibDocument_interface_a_IDatabaseLibDocument_interface.md.md)
