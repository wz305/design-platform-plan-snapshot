#### GetComponentDatafileLocation method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetComponentDatafileLocation\(DatafileIndex : Integer; AModelName : WideString; AModelType : WideString; AComponentName : WideString; AComponentLibraryName : WideString; Var FoundInLibraryPath : WideString\) : WideString;  
__Description__  
This GetComponentDatafileLocation function obtains the location of the datafile for the component with the specified data file index, model name and its model type, component name and the full library\. The result is returned in the FoundInLibraryPath parameter or by the function itself\.  
__Example__ 

1

LibraryPath := 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

2

ComponentName  := 'XC3S100E\-4TQ144I';

3

IntMan\.GetComponentDatafileLocation\(0, 'TQ144\_L', 'PCBLIB', ComponentName, LibraryPath, FoundLocation\);

4

ShowMessage\(FoundLocation \+ ' for Component Datafile location'\);

5

// 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

__See also__  
IIntegratedLibraryManager interface