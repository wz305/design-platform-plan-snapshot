#### GeneralStringInc

__Declaration__  
Procedure GeneralStringInc \(Var S : TString; Const IncValue : TDynamicString\);  
__Description __  
The GeneralStringInc procedure analyses the S parameter to determine if it has a number value embedded\. If there is a number in the string then it increments the existing number value by one\.\.  
__Example__

1

S := 'Part1';

2

GeneralStringInc\(S,'4'\);

3

//Part5

__See also__  
String Manipulation Routines