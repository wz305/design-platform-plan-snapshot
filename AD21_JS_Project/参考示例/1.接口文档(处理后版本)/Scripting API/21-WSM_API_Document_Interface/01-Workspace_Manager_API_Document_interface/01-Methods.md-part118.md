#### GetComponentCount method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetComponentCount \(LibraryPath : WideString\) : Integer;  
__Description__  
This function retrieves the count of components within the integrated library specified by the LibraryPath parameter\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

ShowMessage\(IntMan\.GetComponentCount\(IntMan\.AvailableLibraryPath\(1\)\)\);

__See also__  
IIntegratedLibraryManager interface