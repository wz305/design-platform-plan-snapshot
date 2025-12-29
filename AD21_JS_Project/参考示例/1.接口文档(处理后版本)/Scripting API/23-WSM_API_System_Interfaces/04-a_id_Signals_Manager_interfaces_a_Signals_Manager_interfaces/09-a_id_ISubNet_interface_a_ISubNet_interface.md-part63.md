#### ModelDatafileTypeFromKind method

\(IModelTypeManager interface\)  
__Syntax__  
Function ModelDatafileTypeFromKind \(AKind : PChar\) : IModelDatafileType;  
__Description__  
This function returns the IModelDatafileType based on the datafile kind\. The datafile kinds for: 

__Model Type \(Kind\)__

__DatafileType Description__

MDL

Sim Model File

CKT

Sim Subcircuit File

LB

SIMetrix Model Library File

SIPinModelLibrary

SI Pin Model Library

PCBLIB

Protel Footprint Library

PCB3DLIB

PCB3D Model Library

__Example__ 

1

Procedure ShowDataFileTypeFromModelTypeManager;

2

Var

3

    ModelTypeMan : IModelTypeManager;

4

Begin

5

    ModelTypeMan := ModelTypeManager;

6

    If ModelTypeMan = Nil Then Exit;

7

Showmessage\(ModelTypeMan\.ModelDatafileTypeFromKind\('SIPinModelLibrary'\)\.Description\); 

8

//SI Pin Model Library

9

End;

__See also__  
IModelTypeManager interface