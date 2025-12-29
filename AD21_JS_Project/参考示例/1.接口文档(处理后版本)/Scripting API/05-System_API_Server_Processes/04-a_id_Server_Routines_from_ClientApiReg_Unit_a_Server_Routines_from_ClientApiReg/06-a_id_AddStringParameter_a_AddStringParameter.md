### <a id="AddStringParameter"></a>AddStringParameter

__Declaration__  
Procedure AddStringParameter\(Const Name, Value: String\);  
__Description__  
This procedure adds a parameter with a string value to the parameter buffer\. The Name parameter represents the name of the process parameter and the Value parameter represents the value of the process parameter\.  
__Example__

1

    ResetParameters

2

    Call AddStringParameter\("Object","JumpToLocation10"\)

3

    Call RunProcess\("PCB:Jump"\)  

4

    ResetParameters

5

    Call AddStringParameter\("ZoomLevel","2\.0"\)

6

    Call RunProcess\("PCB:Zoom"\)

__See also__  
Server Process routines