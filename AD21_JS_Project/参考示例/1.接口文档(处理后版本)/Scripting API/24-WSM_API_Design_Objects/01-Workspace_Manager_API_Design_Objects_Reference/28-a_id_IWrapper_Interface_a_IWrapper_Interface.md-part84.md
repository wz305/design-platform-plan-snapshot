#### Description method

\(IModelType interface\)  
__Syntax__  
Function Description : PChar;  
__Description__  
The function returns the description of the model type\.

__Model Type Description__

__Model Type Name__

__ServerName__

Simulation

SIM

Sim

Signal Integrity

SI

SignalIntegrity

Footprint

PCBLIB

PCB

PCB3D

PCB3DLIB

PCB3D

__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\)

5

ShowMessage\(AModelType\.Description\);

__See also__  
IModelType interface