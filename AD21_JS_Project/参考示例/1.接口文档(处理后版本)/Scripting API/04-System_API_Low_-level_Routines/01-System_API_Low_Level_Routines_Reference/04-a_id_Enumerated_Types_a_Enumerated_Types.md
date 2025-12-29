### <a id="Enumerated_Types"></a>Enumerated Types

#### TAltShiftCtrlCombination

TAltShiftCtrlCombination = TShiftState;

#### TBoolean

TBoolean       = Boolean;

#### TBusKind

TBusKind           = \(eBusKindUndefined,eBusKindLowValueFirst,eBusKindHighValueFirst,eBusKindGeneric\);

#### TByte

TByte          = Byte;

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

#### TDate

TDate = Record  
    Year   : Word;  
    Month  : Word;  
    Day    : Word;  
End;

#### TDouble

TDouble = Double;

#### TDynamicString

TDynamicString = AnsiString;

#### TExtended

TExtended      = Extended;

#### TFileFunction

TFileFunction = Function\(Path : TDynamicString\) : Boolean Of Object;

#### THugeInt

THugeInt       = Comp;

#### TMatchFileNameKind

TMatchFileNameKind = \(eMatchByPath,eMatchByFileName\);

#### TPaintColorMode

TPaintColorMode    = \(ePaintColorMode\_FullColor, ePaintColorMode\_GrayScale, ePaintColorMode\_Monochrome\);

#### TMeasureUnit

TMeasureUnit = \(cUnitMil, cUnitMM, cUnitIN, cUnitCM, cUnitAltium Designer, cUnitM\);

#### TPaintScaleMode

TPaintScaleMode = \(psmScreen, psmDefault, psmPrint\);

#### TReal

TReal          = Single;

#### TString

TString = ShortString;

#### TTime

TTime = Record  
    Hours        : Word;  
    Minutes      : Word;  
    Seconds      : Word;  
    MilliSeconds : Word;  
End;

#### TNonRefCountedInterfaceObject

TNonRefCountedInterfacedObject = Class\(TObject, IInterface\)  
  Protected  
    FRefCount : Integer;  
    Function    QueryInterface\(Const IID: TGUID; Out Obj\): HResult; StdCall;  
    Function    \_AddRef: Integer;                                   StdCall;  
    Function    \_Release: Integer;                                  StdCall;  
End;