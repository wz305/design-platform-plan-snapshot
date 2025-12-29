### <a id="ISch_ComplexText_Interface"></a>ISch\_ComplexText Interface

__Overview__  
An immediate ancestor interface for ISch\_SheetFilename and ISch\_SheetName interfaces\.

The ISch\_ComplexText interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Label  
        ISch\_ComplexText

__ISch\_ComplexText methods__  
SetState\_Autoposition  
SetState\_IsHidden  
SetState\_TextHorzAnchor  
SetState\_TextVertAnchor  
GetState\_Autoposition  
GetState\_IsHidden  
GetState\_TextHorzAnchor  
GetState\_TextVertAnchor

__ISch\_ComplexText properties__  
Autoposition  
IsHidden  
TextHorzAnchor  
TextVertAnchor

__See also__

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

#### Properties

##### Autoposition property

\(ISch\_ComplexText interface\)  
__Syntax__  
Property Autoposition : Boolean Read GetState\_Autoposition Write SetState\_Autoposition;  
__Description__  
The property defines whether the parameter can be positioned automatically every time the associated component is rotated or moved\. If this property is false, the parameter will have a dot appear below it on the schematic to denote that this parameter will not be auto positioned everytime the component is rotated/moved\.

To prevent dots form being displayed, disable the MarkManualParameters property from the ISch\_Preferences interface\.  
__Example__  
__See also__  
ISch\_ComplexText interface

##### IsHidden property

\(ISch\_ComplexText interface\)  
__Syntax__  
Property IsHidden : Boolean Read GetState\_IsHidden Write SetState\_IsHidden;  
__Description__  
The property determines whether the text object is hidden or not\. This property is supported by the GetState\_IsHidden and SetState\_IsHidden methods\.  
__Example__  
__See also__  
ISch\_ComplexText interface

##### TextVertAnchor property

\(ISch\_ComplexText interface\)  
__Syntax__  
Property TextVertAnchor : TTextVertAnchor Read GetState\_TextVertAnchor Write SetState\_TextVertAnchor;  
__Description__  
This property defines the vertical justification style of the parameter object\. This property is supported by the GetState\_TextVertAnchor and SetState\_TextVertAnchor methods\.  
__Example__  
__See also__  
ISch\_ComplexText interface  
TTextVertAnchor type

##### TextHorzAnchor property

\(ISch\_ComplexText interface\)  
__Syntax__  
Property TextHorzAnchor : TTextHorzAnchor Read GetState\_TextHorzAnchor Write SetState\_TextHorzAnchor;  
__Description__  
This property defines the horizontal justification style of the parameter object\. This property is supported by the GetState\_TextHorzAnchor and SetState\_TextHorzAnchor methods\.  
__Example__  
__See also__  
ISch\_ComplexText interface  
TTextHorzAnchor type