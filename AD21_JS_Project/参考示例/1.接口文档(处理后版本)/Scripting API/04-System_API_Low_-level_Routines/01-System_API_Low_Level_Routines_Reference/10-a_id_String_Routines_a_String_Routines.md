### <a id="String_Routines"></a>String Routines

#### Center

__Declaration__  
Function Center\(Const S : TDynamicString; Width : Integer\) : TDynamicString;  
__Description __  
Return a string centered in a blank string of specified width\.  
__See also__  
String Manipulation Routines

#### CenterCH

__Declaration__  
Function CenterCh  \(Const S : TDynamicString; Ch : Char; Width : Integer\) : TDynamicString;  
__Description __  
Returns a string centered in a string of character Ch, with specified width\.  
__See also__  
String Manipulation Routines

#### CharStr

__Declaration__  
Function CharStr   \(Ch : Char; Len : Integer\) : TDynamicString;  
__Description __  
Returns a string of length len filled with Ch  
__See also__  
String Manipulation Routines

#### CropStringToLength

__Declaration__  
Function  CropStringToLength        \(Const StringToCrop : TDynamicString; Const MaximumLength : Integer\) : TDynamicString;  
__Description __  
The CropStringToLength function removes leading and trailing spaces and control characters from the given string StringToCrop\. The MaximumLength parameter specifies the string from index 0 to MaximumLength that will be returned by the function\. The remaining portion of the string is chopped\.  
__See also__  
String Manipulation Routines

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

#### GetStringFromBoolean

__Declaration__  
Function  GetStringFromBoolean      \(B : Boolean \) : TDynamicString;  
__Description __  
The GetStringFromBoolean function returns a ‘True’ if the B parameter is true otherwise a ‘False’ is returned\.  
__See also__  
String Manipulation Routines

#### GetStringFromInteger

__Declaration__  
Function  GetStringFromInteger \(N : Integer\) : TDynamicString;  
__Description __  
The GetStringFromInteger function converts any integer type to a string\.  
__See also__  
String Manipulation Routines

#### IndentString

__Declaration__  
Function  IndentString\(Indent : Integer\) : TDynamicString;  
__Description __  
The function returns you a string which specifies the amount of indentation as white spaces \(\#32\) in this string\. So an indent of 4 produces a string of four white spaces for example\.  
__See also__  
String Manipulation Routines

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

#### PadLeft

__Declaration__  
Function PadLeft\(S : TDynamicString; Len : Integer\) : TDynamicString;  
__Description __  
Returns a string left\-padded to length len with blanks\.  
__See also__  
String Manipulation Routines

#### PadLeftCh

__Declaration__  
Function PadLeftCh \(S : TDynamicString; Ch : Char; Len : Integer\) : TDynamicString;  
__Description __  
Returns a string left\-padded to length len with the specified character, Ch\.  
__See also__  
String Manipulation Routines

#### PadRight

__Declaration__  
Function PadRight\(S : TDynamicString; Len : Integer\) : TDynamicString;  
__Description __  
Returns a string right\-padded to length len with blanks\.  
__See also__  
String Manipulation Routines

#### PadRightCh

__Declaration__  
Function PadRightCh\(S : TDynamicString; Ch : Char; Len : Integer\) : TDynamicString;          
__Description __  
Returns a string right\-padded to length specified by the len parameter and with Ch characters\.  
__See also__  
String Manipulation Routines

#### SameString

__Declaration__  
Function SameString \(Const S1,S2 : TDynamicString; CaseSensitive : Boolean\) : Boolean;  
__Description __  
This SameString function compares two strings and depending on the CaseSensitive parameter returns a boolean result\. If CaseSensitive is set to false, then the two strings, ‘aaa’ and ‘AaA’ are considered the same\.  
__See also__  
String Manipulation Routines

#### StringsEqual

__Declaration__  
Function StringsEqual\(S1,S2 : TDynamicString\) :Boolean;  
__Description __  
This SameString function compares two strings and checks whether Strings S1 and S2 have equal lengths and have the same contents\.  
__See also__  
String Manipulation Routines

#### StringReplace

__Syntax__  
Function StringReplace\(const S, OldPattern, NewPattern: string; Flags: TReplaceFlags\): string;  
__Description__  
Basically this function returns a string with occurrences of one substring replaced by another substring\. The StringReplace replaces occurrences of the substring specified by OldPattern with the substring specified by NewPattern\.  
__Parameters__  
S is the source string, whose substrings are changed\.  
OldPattern is the substring to locate and replace with NewPattern\.  
NewPattern is the substring to substitute for occurrences of OldPattern\.  
Flags is a set of flags that govern how StringReplace locates and replaces occurrences of OldPattern\. If Flags does not include rfReplaceAll, StringReplace only replaces the first occurrence of OldPattern in S\. Otherwise, StringReplace replaces all instances of OldPattern with NewPattern\. If the Flags parameter includes rfIgnoreCase, the comparison operation is case insensitive\.  
__Notes__  
Type  
  TReplaceFlags = set of \(rfReplaceAll, rfIgnoreCase\);  
__Example__  
Result := StringReplace\(AKeys, ADelimiter, cDatabase\_KeyFieldDelimiter, \[rfReplaceAll\]\);  
__See also__  
String Manipulation routines

#### StrToInt

__Declaration__  
Function StrToInt\(const S: string\): Integer;  
__Description __  
The StrToInt function converts the string S, which represents an integer\-type number in either decimal or hexadecimal notation, into a number\.  
__See also__  
String Manipulation Routines

#### TrimLead

__Declaration__  
Function TrimLead  \(Const S : TDynamicString\) : TDynamicString;  
__Description __  
Returns a string with leading white space removed\.  
__See also__  
String Manipulation Routines

#### TrimTrail

__Declaration__  
Function TrimTrail \(Const S : TDynamicString\) : TDynamicString;  
__Description __  
Returns a string with trailing white space removed\.  
__See also__  
String Manipulation Routines