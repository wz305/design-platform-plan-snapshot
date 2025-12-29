#### ServerName method

\(IModelType interface\)  
__Syntax__  
Function ServerName : PChar;  
__Description__  
This function returns the Server Name associated with the model type\.

__ServerName__

__Model Type Name__

__Model Type Description__

Sim

SIM

Simulation

SignalIntegrity

SI

Signal Integrity

PCB

PCBLIB

Footprint

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

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(AModelType\.ServerName\);

__See also__  
IModelType interface