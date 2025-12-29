#### GetComponentName method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetComponentName \(LibraryPath : WideString; ComponentIndex : Integer\) : WideString;  
__Description__  
This function retrieves the name for the indexed component within the specified integrated library\. Remember first index is 0\.  
__Example__ 

01

IntMan := IntegratedLibraryManager;

02

If IntMan = Nil Then Exit;

03

  

04

S :=  '';

05

AvailLibPath := IntMan\.AvailableLibraryPath\(1\);

06

AComponentIndex := IntMan\.GetComponentCount\(IntMan\.AvailableLibraryPath\(1\)\);

07

  

08

For I := 0 To AComponentIndex Do

09

    S := S \+ ' ' \+ Intman\.GetComponentName \(AvailLibpath,I\);

10

  

11

ShowMessage\(s\);

__See also__  
IIntegratedLibraryManager interface