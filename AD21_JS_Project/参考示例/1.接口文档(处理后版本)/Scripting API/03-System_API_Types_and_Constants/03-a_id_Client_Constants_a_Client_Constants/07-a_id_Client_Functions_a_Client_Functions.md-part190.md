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