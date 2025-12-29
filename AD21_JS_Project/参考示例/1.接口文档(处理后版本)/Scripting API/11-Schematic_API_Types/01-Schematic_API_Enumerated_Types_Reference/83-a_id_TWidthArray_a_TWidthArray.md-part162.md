#### FindComponentDisplayPath method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function FindComponentDisplayPath\(ALibIdentifierKind  : TLibIdentifierKind;  
                            Const ALibraryIdentifier  : WideString;  
                            Const ADesignItemID       : WideString\) : WideString;  
__Description__  
The function returns the full path of the library that the supplied component is part of\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

// Component is a ISch\_Component interface from Schematic API

4

If Component\.LibraryIdentifier <> '' Then

5

    ShowMessage\(IntMan\. FindComponentDisplayPath\(Component\.LibIdentifierKind, Component\.LibraryIdentifier, Component\.DesignItemID\)\);

__See also__  
IIntegratedLibraryManager interface