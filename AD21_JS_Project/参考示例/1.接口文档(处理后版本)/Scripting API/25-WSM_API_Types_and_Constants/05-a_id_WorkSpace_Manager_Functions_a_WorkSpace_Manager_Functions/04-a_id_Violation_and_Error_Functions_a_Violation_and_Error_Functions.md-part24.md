#### GetComponentLocation method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetComponentLocation \(ALibraryName : WideString;  
AComponentName : WideString;  
Var FoundInLibraryPath : WideString\) : WideString;  
__Description__  
This GetComponentLocation returns the path of the specified component name within the specified library\.  
__Example__ 

1

IntMan\.GetComponentLocation\('Xilinx Spartan\-3E\.IntLib',ComponentName, FoundLocation\);

2

ShowMessage\(FoundLocation \+ \#13 \+ 'for ' \+ ComponentName\);

3

//C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib

__See also__  
IIntegratedLibraryManager interface