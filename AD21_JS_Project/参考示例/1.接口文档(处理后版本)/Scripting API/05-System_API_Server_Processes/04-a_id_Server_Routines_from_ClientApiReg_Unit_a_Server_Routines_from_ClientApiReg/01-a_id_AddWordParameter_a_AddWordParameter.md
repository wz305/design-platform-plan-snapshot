### <a id="AddWordParameter"></a>AddWordParameter

__Declaration__  
Procedure AddWordParameter\(Const Name: String; Value: Word\);  
__Description__  
The __AddWordParameter__ procedure defines a parameter with a Word data type to the parameter buffer for use by a server process\.  
__Example__

1

Begin

2

    ResetParameters;

3

    AddWordParameter\('WordValue',5\);

4

    // code here

5

End;

__See also__  
Server Process routines