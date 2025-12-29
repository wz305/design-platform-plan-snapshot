#### AddRemoveLibraries method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure AddRemoveLibraries;  
__Description__  
This method invokes the Available Libraries dialog with a list of installed libraries if any and their activated, path and type values\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

IntMan\.AddRemoveLibraries;

__See also__  
IIntegratedLibraryManager interface