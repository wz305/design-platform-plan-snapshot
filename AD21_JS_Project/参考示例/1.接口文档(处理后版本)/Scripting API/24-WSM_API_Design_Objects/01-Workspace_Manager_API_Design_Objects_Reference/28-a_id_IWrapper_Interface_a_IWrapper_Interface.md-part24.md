#### FindLibraryInformation method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function  FindLibraryInformation\(ALibIdentifierKind  : TLibIdentifierKind;  
                           Const ALibraryIdentifier  : WideString;  
                           Const ADesignItemID       : WideString;  
                           Out   ALibraryPath        : WideString;  
                           Out   ADBTableName        : WideString\) : Boolean;  
__Description__  
The function validates the existence of the library\.  
The ALibIdentifierKind parameter denotes which type of library the component is from\.  
TLibIdentifierKind = \(eLibIdentifierKind\_Any,  
                      eLibIdentifierKind\_NameNoType,  
                      eLibIdentifierKind\_NameWithType,  
                      eLibIdentifierKind\_FullPath\);  
The ALIbraryIdentifier parameter is the library identifier string that the component is associated with\. Normally a path to a library\.  
The ADesignItemID parameter is the symbol reference \(library reference\) of the component from a Schematic or Integrated Library or an unique part number from a record within a table of a Database\.  
The ALibraryPath parameter is returned for the valid design item of a component\.  
The ADBTableName is returned if a component is from a database\.  
__Example__  
If Not IntegratedLibraryManager\.FindLibraryInformation\(eLibIdentifierKind\_NameWithType, ALibraryIdentifier, ADesignItemID, ALibraryPath, Path, DBTableName\) Then Path := '';  
__See also__  
IIntegratedLibraryManager interface