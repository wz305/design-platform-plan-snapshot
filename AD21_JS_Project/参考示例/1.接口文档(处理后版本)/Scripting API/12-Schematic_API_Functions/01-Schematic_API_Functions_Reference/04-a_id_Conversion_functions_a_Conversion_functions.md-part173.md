#### ModelCount method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function ModelCount \(AComponentName : WideString; AComponentLibraryName : WideString; AModelType : WideString\) : Integer;  
__Description__  
This ModelCount function returns the number of models of the same type associated with the component within the specified library\. The AComponentName parameter is the name of the component\. The AComponentLibraryName parameter is the full path of the library the component is from, and the AModelType parameter is the model type you wish to find how many\.  
__Example__ 

1

ModelCount := IntMan\.ModelCount\(ComponentName,'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib', 'PCBLIB'\);

2

ShowMessage\(ComponentName \+ '''s ModelCount : ' \+ IntToStr\(ModelCount\)\);

3

// XC3S100E\-4TQ144I’s Model count: 3

__See also__  
IIntegratedLibraryManager interface