### <a id="Number_Manipulation_Routines"></a>Number Manipulation Routines

#### GetBinaryStringFromInteger

__Declaration__  
Function  GetBinaryStringFromInteger\(L : Integer   \) : TDynamicString;  
__Description __  
The GetBinaryStringFromInteger function converts an integer to a binary string \(up to thirty two characters long\)\. An integer contains 4 bytes = 32 bits\.  
__See also__

#### ExtendedToEng

__Declaration__  
Function  ExtendedToEng \(Const ExtVal    : Extended\) : String;  
__Description __  
The ExtendedToEng function converts the floating\-point value given by Value to its string representation\.   
__Example__  
ShowInfo\(ExtendedToEng\(4\.32e18\)\); //4\.320e18  
__See also__  
Number Manipulation routines

#### EngToExtended

__Declaration__  
Function  EngToExtended \(Const EngString : String\)   : Extended;  
__Description __  
The EngToExtended function converts the string value given by EngString to its extended representation\. This function looks at the last character of the string and converts it accordingly \- see scale factor table below\. For example ‘3Meg’ will come out as 3M\.  
__See also__  
Number Manipulation routines

#### GetHexStringFromInteger

__Declaration__  
Function  GetHexStringFromInteger   \(L : Integer\) : TDynamicString;  
__Description __  
The GetHexStringFromInteger converts a word to a hexadecimal string \(up to eight characters long\)\. The hexadecimal number system is a base 16 system with 16 digits\. A byte equals 2 hexademical digits because each hexadecimal digit corresponds to four binary digits thus 4 bytes equals 8 hexadecimal digits\.  
__See also__  
Number Manipulation routines

#### HexToInteger

__Declaration__  
Function HexToInteger\(Const S : TDynamicString\) : Integer;  
__Description __  
Convert a hexadecimal value \(as a string value\) to an Integer value\.  
__See also__  
Number Manipulation routines

#### IntegerToHex

__Declaration__  
Function IntegerToHex\(L : Integer\) : TDynamicString;  
__Description __  
Convert an integer value to an hexadecimal value\.  
__See also__  
Number Manipulation routines

#### IntMax

__Declaration__  
Function  IntMax\(x,y : Integer\) : Integer;  
__Description __  
The IntMax function returns the maximum value of X and Y integer types\.  
__See also__  
Number Manipulation routines

#### IntMin

__Declaration__  
Function  IntMin\(x,y : Integer\) : Integer;  
__Description __  
The IntMin function returns the minimum value of X and Y integer types\.  
__See also__  
Number Manipulation routines

#### IntSwap

__Declaration__  
Procedure IntSwap\(Var a,b : Integer\);  
__Description __  
The IntSwap procedure swaps the values for A and B\. For example A = 2 and B = 5\. After passing these values into IntSwap procedure, the new values are a = 5 and b = 2\.  
__See also__  
Number Manipulation routines