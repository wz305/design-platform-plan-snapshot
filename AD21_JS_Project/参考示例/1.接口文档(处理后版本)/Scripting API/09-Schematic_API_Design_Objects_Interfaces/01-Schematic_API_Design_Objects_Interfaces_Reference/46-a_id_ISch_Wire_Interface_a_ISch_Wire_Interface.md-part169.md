#### ComponentHasModelOfType method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function ComponentHasModelOfType \(LibraryPath : WideString; ComponentIndex : Integer; AModelType : WideString\) : Boolean;  
__Description__  
This function checks if this indexed component from the specified library has this model type\. Model Types include: 

- PCBLIB 
- PCB3DLIB 
- SIM 
- SI 

__Example__ 

1

ComponentIndex := 0;

2

Status := IntMan\.ComponentHasModelOfType\(LibraryPath, ComponentIndex, 'PCBLIB'\);

3

If Status Then ShowMessage\('True'\) Else ShowMessage\('False'\);

__See also__  
IIntegratedLibraryManager interface