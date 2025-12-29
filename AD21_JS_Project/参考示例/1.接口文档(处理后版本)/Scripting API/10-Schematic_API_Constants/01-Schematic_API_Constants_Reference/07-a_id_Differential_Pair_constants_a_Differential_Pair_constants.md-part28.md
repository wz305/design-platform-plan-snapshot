#### Methods

##### Convert method

\(IPCB\_SpecialStringConverter interface\)  
__Syntax__  
Function Convert\(Const Primitive : IPCB\_Primitive;Const aString : TString;Out ConvertedString : TPCBString\) : Boolean;  
__Description__  
The convert function converts a special string as a formatted string and returns a boolean result whether the conversion is a success or not\.  
__Example__  
__See also__  
IPCB\_SpecialStringConverter interface

##### FirstSpecialStringName method

\(IPCB\_SpecialStringConverter interface\)  
__Syntax__  
Function FirstSpecialStringName : TPCBString;  
__Description__  
This function obtains the first special string name used in a design project \(for example a PCB Project\)\.  
__Example__  
__See also__  
IPCB\_SpecialStringConverter interface  
NextSpecialStringName method

##### NextSpecialStringName method

\(IPCB\_SpecialStringConverter interface\)  
__Syntax__  
Function NextSpecialStringName : TPCBString;  
__Description__  
This function obtains the next special string name used in a design project \(for example a PCB Project\)\.  
__Example__  
__See also__  
IPCB\_SpecialStringConverter interface

### <a id="IPCB_PrimitiveCounter_Interface"></a>IPCB\_PrimitiveCounter Interface

__Overview__  
The IPCB\_PrimitiveCounter interface gives you the means of obtaining the hole count and string count for the focussed PCB document via the IPCB\_Board's PrimitiveCounter property\.

__IPCB\_PrimitiveCounter methods__  
GetObjectCount  
GetCount  
GetHoleCount  
GetStringCount

__IPCB\_PrimitiveCounter properties__  
HoleCount  
StringCount

__See also__  
IPCB\_Board interface