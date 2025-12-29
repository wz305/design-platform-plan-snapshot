#### ModelTypeAt method

\(IModelTypeManager interface\)  
__Syntax__  
Function ModelTypeAt \(AnIndex : Integer\) : IModelType;  
__Description__  
This function returns the indexed model type\. First model type starts at 0\. This method is used by the ModelTypes property\.  
__Example__ 

1

Procedure ShowFirstModelTypeFromModelTypeManager;

2

Var

3

    ModelTypeMan : IModelTypeManager;

4

    I            : Integer;

5

Begin

6

    ModelTypeMan := ModelTypeManager;

7

    If ModelTypeMan = Nil Then Exit;

8

    ShowMessage\(ModelTypeMan\.ModelTypeAt\(0\)\.Name\);

9

End;

__See also__  
IModelTypeManager interface  
ModelTypeCount method