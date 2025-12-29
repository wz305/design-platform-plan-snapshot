#### Methods

##### GetState\_Autoposition method

\(ISch\_ComplexText interface\)  
__Syntax__  
Function GetState\_Autoposition : Boolean;  
__Description__  
The property defines whether the parameter can be positioned automatically every time the associated component is rotated or moved\. If this property is false, the parameter will have a dot appear below it on the schematic to denote that this parameter will not be auto positioned everytime the component is rotated/moved\.

The function reads the autoposition value and is used for the Autoposition property\.

To prevent dots form being displayed, disable the MarkManualParameters property from the ISch\_Preferences interface\.  
__Example__  
__See also__  
ISch\_ComplexText interface

##### GetState\_IsHidden method

\(ISch\_ComplexText interface\)  
__Syntax__  
Function GetState\_IsHidden : Boolean;  
__Description__  
The property determines whether the text object is hidden or not\. This method obtains the boolean value whether the complex text \(a parameter object\) is hidden or not and is used in the IsHidden property\.  
__Example__  
__See also__  
ISch\_ComplexText interface

##### GetState\_TextVertAnchor method

\(ISch\_ComplexText interface\)  
__Syntax__  
Function GetState\_TextVertAnchor : TTextVertAnchor;  
__Description__  
The TextVertAnchor property defines the vertical justification style of the parameter object\.  
The method obtains the vertical justification style of the object represented by the ISch\_ComplexText interface and is used for the TextVertAnchor property\.  
__Example__  
__See also__  
ISch\_ComplexText interface  
TTextVertAnchor type

##### GetState\_TextHorzAnchor method

\(ISch\_ComplexText interface\)  
__Syntax__  
Function GetState\_TextHorzAnchor : TTextHorzAnchor;  
__Description__  
The TextHorzAnchor property defines the horizontal justification style of the parameter object\.  
The method obtains the horizontal justification style of the object represented by the ISch\_ComplexText interface and is used for the TextHorzAnchor property\.  
__Example__  
__See also__  
ISch\_ComplexText interface

##### SetState\_TextVertAnchor method

\(ISch\_ComplexText interface\)  
__Syntax__  
Procedure SetState\_TextVertAnchor \(A : TTextVertAnchor\);  
__Description__  
The TextVertAnchor property defines the vertical justification style of the parameter object\. The function sets the vertical justification of the parameter object and is used for the TextVertAnchor property\.  
__Example__  
__See also__  
ISch\_ComplexText interface

##### SetState\_TextHorzAnchor method

\(ISch\_ComplexText interface\)  
__Syntax__  
Procedure SetState\_TextHorzAnchor \(A : TTextHorzAnchor\);  
__Description__  
The TextHorzAnchor property defines the horizontal justification style of the parameter object\.  
The method obtains the horizontal justification style of the object represented by the ISch\_ComplexText interface and is used for the TextHorzAnchor property\.  
__Example__  
__See also__  
ISch\_ComplexText interface

##### SetState\_IsHidden method

\(ISch\_ComplexText interface\)  
__Syntax__  
Procedure SetState\_IsHidden \(B : Boolean\);  
__Description__  
The property determines whether the text object is hidden or not\. This method sets the boolean value whether the complex text \(a parameter object\) is hidden or not and is used in the IsHidden property\.  
__Example__  
__See also__  
ISch\_ComplexText interface

##### SetState\_Autoposition method

\(ISch\_ComplexText interface\)  
__Syntax__  
Procedure SetState\_Autoposition \(B : Boolean\);  
__Description__  
The property defines whether the parameter can be positioned automatically every time the associated component is rotated or moved\. If this property is false, the parameter will have a dot appear below it on the schematic to denote that this parameter will not be auto positioned everytime the component is rotated/moved\.

The procedure sets the value for autoposition of parameters and is used for the Autoposition property\.

To prevent dots form being displayed, disable the MarkManualParameters property from the ISch\_Preferences interface\.  
__Example__  
__See also__  
ISch\_ComplexText interface