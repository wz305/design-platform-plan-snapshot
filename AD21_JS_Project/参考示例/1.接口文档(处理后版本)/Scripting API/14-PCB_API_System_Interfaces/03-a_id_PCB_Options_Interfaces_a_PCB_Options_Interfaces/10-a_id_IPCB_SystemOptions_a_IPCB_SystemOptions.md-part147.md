#### GetModelCount method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetModelCount \(LibraryPath : WideString; ComponentIndex : Integer\) : Integer;  
__Description__  
This function retrieves the model count for the indexed component within the specified library\. The first indexed component is 0\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

LibraryPath := 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

4

// when ComponentIndex = 0, Component = 'XC3S100E\-4TQ144I';

5

Showmessage\(IntMan\.GetModelName\(LibraryPath, 0\)\); //3 models for this component

__See also__  
IIntegratedLibraryManager interface  
GetModelName method  
GetModelType method