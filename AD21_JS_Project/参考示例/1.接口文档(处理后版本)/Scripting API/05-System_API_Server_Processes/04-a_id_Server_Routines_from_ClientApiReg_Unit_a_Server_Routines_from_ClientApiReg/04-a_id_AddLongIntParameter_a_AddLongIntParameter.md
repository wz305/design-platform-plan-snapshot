### <a id="AddLongIntParameter"></a>AddLongIntParameter

__Declaration__  
Procedure AddLongIntParameter\(Const Name: String; Value: LongInt\);  
__Description__  
The AddLongIntParameter procedure defines a parameter with a longint data type to the parameter buffer for use by a server process\.  
__Example__

1

Begin

2

    ResetParameters;

3

    AddLongIntParameter\('LongIntValue',5\);

4

    // code here

5

End;

__See also__  
Server Process routines