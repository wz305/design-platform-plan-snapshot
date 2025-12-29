#### ModelName method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function ModelName \(AComponentName : WideString; AComponentLibraryName : WideString; AModelType : WideString; AnIndex : Integer\) : WideString;  
__Description__  
This ModelName function returns the name of the model type associated with the component within a specified library\.  
__Example__ 

01

LibraryPath := 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

02

ModelCount := IntMan\.ModelCount\(ComponentName,LibraryPath, 'PCBLIB'\);

03

ShowMessage\(ComponentName \+ '''s ModelCount : ' \+ IntToStr\(ModelCount\)\);

04

  

05

S := '';

06

For I := 0 to ModelCount \- 1 Do

07

S := S \+ \#13 \+ IntMan\.ModelName \(ComponentName, LibraryPath, 'PCBLIB', I\);

08

  

09

ShowMessage\(S\);

10

// TQ144\_L, TQ144\_M, TQ144\_N

__See also__  
IIntegratedLibraryManager interface