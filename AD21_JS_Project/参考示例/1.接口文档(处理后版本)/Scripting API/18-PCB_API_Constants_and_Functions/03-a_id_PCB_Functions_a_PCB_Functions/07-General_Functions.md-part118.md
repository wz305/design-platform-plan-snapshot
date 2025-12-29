#### GetModelType method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetModelType \(LibraryPath : WideString; ComponentIndex : Integer; ModelIndex : Integer\) : IModelType;  
__Description__  
This function retrieves the model type for the indexed component within the specified library\. The first indexed component is 0\.  
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

  

7

ModelType := IntMan\.GetModelType\(LibraryPath, 0, 2\); //0 = PCBLIB, 1 = PCB3DLIB 2 = SI

8

Showmessage\(ModelType\.Name\);

__See also__  
IIntegratedLibraryManager interface  
IModelType interface  
GetModelName method  
GetModelCount method