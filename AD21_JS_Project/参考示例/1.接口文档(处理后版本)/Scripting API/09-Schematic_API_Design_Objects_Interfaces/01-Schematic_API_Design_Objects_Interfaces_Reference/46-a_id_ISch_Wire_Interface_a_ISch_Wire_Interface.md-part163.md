#### AvailableLibraryPath method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function AvailableLibraryPath \(LibraryIndex : Integer\) : WideString;  
__Description__  
The AvailableLibraryPath function retrieves the file path of the indexed library in the Available Libraries dialog\. Note, the first installed library in the Available Libraries dialog is indexed zero \(0\)\.  
Notes  
An available library is one of the libraries on the Installed, Project and Search path tabs within the Available Libraries dialog\.  
An installed library appears in the __Installed__ tab of the Available Libraries dialog\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

ShowMessage\(IntMan\.AvailableLibraryPath\(0\)\);

__See also__  
IIntegratedLibraryManager interface