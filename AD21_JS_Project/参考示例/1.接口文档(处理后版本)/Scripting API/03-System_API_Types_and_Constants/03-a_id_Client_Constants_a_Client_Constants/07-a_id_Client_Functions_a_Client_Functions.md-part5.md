#### TChar

TChar  = Array\[0\.\.256\] of Char;  
   
The Char type is equivalent to AnsiChar\. Because the implementation of Char is subject to change, it’s a good idea to use the standard function SizeOf rather than a hard\-coded constant when writing programs that may need to handle characters of different sizes\. The TChar type can be used instead of a PChar\.

__Example__

1

Var

2

  P : TChar;

3

Begin

4

    lResult := GetModuleFileName\(HInstance,P,255\)

5

\.\.\.\.

6

End;