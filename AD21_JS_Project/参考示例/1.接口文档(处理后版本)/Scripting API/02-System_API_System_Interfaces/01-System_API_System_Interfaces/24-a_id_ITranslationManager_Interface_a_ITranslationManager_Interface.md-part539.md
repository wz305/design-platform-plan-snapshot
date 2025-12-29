#### ModelDatafileTypeCount method

\(IModelTypeManager interface\)  
__Syntax__  
Function ModelDatafileTypeCount : Integer;  
__Description__  
This function reports the number of model data file types used by Altium Designer\. Since there are four models supported and Simulation model has 3 types while the other 3 models has one type each making 6 in total\.  
__Example__ 

1

Procedure ShowModelDatafileTypeCount;

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

    Showmessage\(IntToStr\(ModelTypeMan\.ModelDatafileTypeCount\)\); //6 data file types

9

End;

__See also__  
IModelTypeManager interface