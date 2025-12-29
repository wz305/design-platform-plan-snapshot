### <a id="AddIntegerParameter"></a>AddIntegerParameter

__Declaration__  
Procedure AddIntegerParameter\(Const Name: String; Value: Integer\);  
__Description__  
The AddIntegerParameter procedure defines a parameter with an Integer data type to the parameter buffer for use by a server process\.  
__Example__

1

Begin

2

    ResetParameters;

3

    AddStringParameter\('ObjectKind','Netlist'\);

4

    AddIntegerParameter\('Index',5\);

5

    AddStringParameter\('ReturnGeneratedDocuments', 'True'\);

6

    RunProcess\('WorkspaceManager:GenerateReport'\);

7

End;

__See also__  
Server Process routines