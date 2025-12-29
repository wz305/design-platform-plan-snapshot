#### FindComponentSymbol method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function FindComponentSymbol\(ALibIdentifierKind  : TLibIdentifierKind;  
                       Const ALibraryIdentifier  : WideString;  
                       Const ADesignItemID       : WideString;  
                       Out   ASymbolLibraryPath  : WideString;  
                       Out   ASymbolReference    : WideString\)  : Boolean;  
__Description__  
The function validates whether if the component symbol is available or not dependent on the supplied parameters\.  
The ALibIdentifierKind parameter denotes which type of library the component is from\.  
TLibIdentifierKind = \(eLibIdentifierKind\_Any,  
                      eLibIdentifierKind\_NameNoType,  
                      eLibIdentifierKind\_NameWithType,  
                      eLibIdentifierKind\_FullPath\);  
The ALibraryIdentifier parameter is the library identifier string that the component is associated with\.  
The ADesignItemID parameter is the symbol reference \(library reference\) of the component from a Schematic or Integrated Library or an unique part number from a record within a table of a Database\.  
The ASymbolLibraryPath is the library\.  
The ASymbolReference is the name of the component symbol\.  
__Example__ 

01

If IntegratedLibraryManager\.FindComponentSymbol\(APart\.LibIdentifierKind, APart\.LibraryIdentifier, APart\.DesignItemID, SymbolLibraryPath, SymbolReference\) Then

02

Begin

03

    NewSymbolLibrarypath := SymbolLibrarypath;

04

    NewSymbolReference   := SymbolReference;

05

End

06

Else

07

Begin

08

    NewSymbolLibrarypath := '';

09

    NewSymbolReference   := '';

10

End;

__See also__  
IIntegratedLibraryManager interface