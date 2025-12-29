### <a id="IPCB_SpecialStringConverter_Interface"></a>IPCB\_SpecialStringConverter Interface

__Overview__  
The __IPCB\_SpecialStringConverter__ interface provides a way to fetch special strings in a PCB Project\. You would need to pass the document as a parameter in the Convert function and obtain the special strings\.

__IPCB\_SpecialStringConverter methods__  
FirstSpecialStringName  
NextSpecialStringName  
Convert

__IPCB\_SpecialStringConverter properties__

__See also__  
IPCB\_ServerInterface interface  
IPCB\_Text interface

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