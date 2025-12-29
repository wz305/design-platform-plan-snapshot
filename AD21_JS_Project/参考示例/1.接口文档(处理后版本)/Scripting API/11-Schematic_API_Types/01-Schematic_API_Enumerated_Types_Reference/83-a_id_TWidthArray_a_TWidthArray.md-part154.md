#### BrowseForDatafile method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure BrowseForDatafile \(AModelName : PChar;AModelPath : PChar; LibPath : PChar; ModelType : PChar; ForComponentInstance : LongBool\);  
__Description__  
This BrowseForDataFile procedure invokes the Browse Libraries dialog\.  
__Example__ 

1

LibraryPath := 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

2

ComponentName  := 'XC3S100E\-4TQ144I';

3

ModelType      := 'PCBLIB';

4

AFootprintName := 'TQ144\_N';

5

IntMan\.BrowseForDatafile\(AFootprintName, LibraryPath, Librarypath,ModelType, True\);

__See also__  
IIntegratedLibraryManager interface