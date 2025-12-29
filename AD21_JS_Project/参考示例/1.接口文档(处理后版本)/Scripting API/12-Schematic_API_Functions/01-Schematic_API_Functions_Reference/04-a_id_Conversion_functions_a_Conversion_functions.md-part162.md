#### GetModelName method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetModelName \(LibraryPath : WideString; ComponentIndex : Integer; ModelIndex : Integer\) : WideString;  
__Description__  
This function retrieves the model name for the indexed component within the specified library\. The first indexed component is 0\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

LibraryPath := 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

5

// when ComponentIndex = 0, Component = 'XC3S100E\-4TQ144I';

6

Showmessage\(IntMan\.GetModelName\(LibraryPath, 0, 0\)\); //0 = CP132, 1 = XC3S100E\-CP132 2 = XC3S100E\_CP132

__See also__  
IIntegratedLibraryManager interface  
GetModelCount method  
GetModelType method