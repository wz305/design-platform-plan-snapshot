#### CropStringToLength

__Declaration__  
Function  CropStringToLength        \(Const StringToCrop : TDynamicString; Const MaximumLength : Integer\) : TDynamicString;  
__Description __  
The CropStringToLength function removes leading and trailing spaces and control characters from the given string StringToCrop\. The MaximumLength parameter specifies the string from index 0 to MaximumLength that will be returned by the function\. The remaining portion of the string is chopped\.  
__See also__  
String Manipulation Routines