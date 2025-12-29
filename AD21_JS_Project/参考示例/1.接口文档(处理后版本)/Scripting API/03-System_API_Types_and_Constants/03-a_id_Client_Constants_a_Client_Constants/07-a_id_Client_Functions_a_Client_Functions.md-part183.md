#### LeftJust

__Declaration__  
Function  LeftJust\(Const S : TDynamicString; Width : Integer\) : TDynamicString;  
__Description __  
The LeftJust function left justifies a string by padding the string with \(Width \- Length of String\) white spaces to the right of this string\.  
__Example__

1

S := LeftJust\('smith',9\) \+ '\.';

2

//s := ‘smith    \.’ \(four empty spaces between the word ‘smith’ and the fullstop ’\.’\)

__See also__  
String Routines