### <a id="AddColorParameter"></a>AddColorParameter

__Declaration__  
Procedure AddColorParameter\(Const Name: String; Red: Integer; Green: Integer; Blue: Integer\);  
__Description__  
This procedure adds a color value parameter to the parameter buffer in Altium Designer\. This procedure is used to define a color for use by a process that requires a color parameter\.  
The Color is a value where value = RedVal \+ 256\*\(GreenVal \+ 256\*BlueVal\) and Name is the name representing this color value\.  
__See also__  
Server Process routines