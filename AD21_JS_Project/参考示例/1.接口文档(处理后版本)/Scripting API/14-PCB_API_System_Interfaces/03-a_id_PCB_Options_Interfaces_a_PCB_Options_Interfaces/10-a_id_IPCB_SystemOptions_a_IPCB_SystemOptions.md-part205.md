#### PortDescriptor method

\(IModelType interface\)  
__Syntax__  
Function PortDescriptor : PChar;  
__Description__  
The PortDescriptor  
__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(AModelType\.Descriptor\);

__See also__  
IModelType interface