### <a id="IDatabaseLibDocument_interface"></a>IDatabaseLibDocument interface

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