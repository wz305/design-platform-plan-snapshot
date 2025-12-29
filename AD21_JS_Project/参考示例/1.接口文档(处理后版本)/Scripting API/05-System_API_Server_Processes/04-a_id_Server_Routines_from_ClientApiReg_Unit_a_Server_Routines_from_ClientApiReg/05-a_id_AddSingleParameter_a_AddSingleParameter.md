### <a id="AddSingleParameter"></a>AddSingleParameter

__Declaration__  
Procedure AddSingleParameter\(Const Name: String; Value: Single\);  
__Description__  
The AddLongIntParameter procedure defines a parameter with a single data type to the parameter buffer for use by a server process\.  
__Example__

1

Begin

2

    ResetParameters;

3

    AddSingleParameter\('SingleValue',5\);

4

    // code here

5

End;

__See also__  
Server Process routines