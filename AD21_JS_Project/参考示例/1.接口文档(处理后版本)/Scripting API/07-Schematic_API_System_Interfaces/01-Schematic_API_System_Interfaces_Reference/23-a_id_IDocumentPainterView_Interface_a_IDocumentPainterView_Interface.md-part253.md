#### FindComponentLibraryPath method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function  FindComponentLibraryPath\(ALibIdentifierKind  : TLibIdentifierKind;  
                             Const ALibraryIdentifier  : WideString;  
                             Const ADesignItemID       : WideString\)  : WideString;  
__Description__  
The function returns the path of the library the component is part of\.  
The ALibIdentifierKind parameter denotes which type of library the component is from\.  
TLibIdentifierKind = \(eLibIdentifierKind\_Any,  
                      eLibIdentifierKind\_NameNoType,  
                      eLibIdentifierKind\_NameWithType,  
                      eLibIdentifierKind\_FullPath\);  
The ALIbraryIdentifier parameter is the library identifier string that the component is associated with\.  
The ADesignItemID parameter is the symbol reference \(library reference\) of the component from a Schematic or Integrated Library or an unique part number from a record within a table of a Database\.  
__Example__ 

01

// For each component found on the schematic, you can iterate for its implementations\.

02

//SchImplementation  : ISch\_Implementation;

03

If SchImplementation\.UseComponentLibrary Then

04

Begin

05

    ComponentPath  := IntegratedLibraryManager\.FindComponentLibraryPath\(Component\.LibIdentifierKind, Component\.LibraryIdentifier, Component\.DesignItemID\); 

06

    ModelPath      := IntegratedLibraryManager\.FindModelLibraryPath    \(Component\.LibIdentifierKind, Component\.LibraryIdentifier, Component\.DesignItemID, SchImplementation\.ModelName, SchImplementation\.ModelType\);

07

  

08

    ModelsList\.Add\(' The Component is in Integrated Library'\); 

09

    ModelsList\.Add\('  Component path: ' \+ ComponentPath\); 

10

    ModelsList\.Add\('  Model path: '     \+ ModelPath\); 

11

End

__See also__  
IIntegratedLibraryManager interface  
TLibIdentifierKind type  
SimModelsOfComponents script from \\Examples\\Scripts\\DelphiScript Scripts\\Sch folder of the Altium Designer installation