#### HasExtension

__Declaration__  
Function HasExtension\(Const Name : TDynamicString; Var DotPos : Integer\) : TBoolean;  
__Description __  
This function checks if the Name parameter has an extension by scanning for the dot character\. If the dot character is found, the index of the DotPos variable parameter is returned\. Note that the invalid characters are '\\' and ':' and if they exist in the Name parameter, then the function returns a false value\.  
__See also__