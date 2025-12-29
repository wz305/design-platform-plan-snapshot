### <a id="ISch_SheetEntry_Interface"></a>ISch\_SheetEntry Interface

__Overview__  
A sheet entry within a Sheet Symbol object creates a connection between the net touching on the parent sheet, to a Port with the same name on the child sheet\.  
__Notes__  
The __ISch\_SheetEntry__ interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_SheetEntry

__ISch\_SheetEntry methods__  
GetState\_DistanceFromTop  
GetState\_IOType  
GetState\_Name  
GetState\_OverrideDisplayString  
GetState\_OwnerSchSheetSymbol  
GetState\_OwnerSchSheetSymbol  
GetState\_Side  
GetState\_Style  
GetState\_TextColor  
SetState\_DistanceFromTop  
SetState\_IOType  
SetState\_Name  
SetState\_OverrideDisplayString  
SetState\_Side  
SetState\_Style  
SetState\_TextColor  
IsVertical

__ISch\_SheetEntry properties__  
DistanceFromTop  
IOType  
Name  
OverrideDisplayString  
OwnerSheetSymbol  
Side  
Style  
TextColor

__See also__  
ISch\_SheetEntry interface

#### Methods

##### SetState\_Style method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Procedure SetState\_Style \(Value : TPortArrowStyle\);  
__Description__  
The SetState\_Style procedure sets the style of the sheet entry\. This style is determined by the TPortArrowStyle type\. This style defines the graphical style of the sheet entry only if the__ I/O Type__ property is set to Unspecified\. The __IO Type__ of the Sheet Entry overrides the __Style__ property if the I/O Type is set to one of the specified IO types then changing the Style will not update the graphical content of the sheet entry\.  
__Example__  
SEntry\.SetState\_Style\(ePortLeft\);  
__See also__  
TPortArrowStyle type  
ISch\_SheetEntry interface

##### SetState\_Side method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Procedure SetState\_Side\(Value : TLeftRightSide\);  
__Description__  
The SetState\_Side procedure sets the orientation of the sheet entry in respect to the associated Sheet symbol\.  
__Example__  
SheetEntry\.SetState\_Side\(eLeftSide\);  
__See also__  
TLeftRightSide type\.  
ISch\_SheetEntry interface\.

##### SetState\_Name method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Procedure SetState\_Name\(Value : WideString\);  
__Description__  
The SetState\_Name procedure sets the new name for the Sheet Entry\.  
__Example__  
SheetEntry\.SetState\_Name\(‘HarnessType2’\);  
__See also__  
ISch\_SheetEntry interface

##### SetState\_DistanceFromTop method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Procedure SetState\_DistanceFromTop\(Value : TCoord\);  
__Description__  
The SetState\_DistanceFromTop function sets the distance from this sheet entry to the top edge of the sheet symbol in a value that’s dependent on the grid units\. For example if the grid was in DXP Defaults \(10 DXP units = 100 mils for example\) and the Entry is 10 Units away from the Top part of the Sheet Symbol then you would use the DxpToCoords function to translate the 10 grid units into a coordinate value\.  
__Example__  
SheetEntry\.SetState\_DistanceFromTop\(DxpsToCoord\(10\)\);  
__See also__  
DXPsToCoord function  
Measurement Conversion functions  
ISch\_SheetEntry interface

##### SetState\_TextColor method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Procedure SetState\_TextColor\(Value : TColor\);  
__Description__  
The SetState\_TextColor procedure sets the color \(a value of TColor type\) for the Sheet Entry’s Name string\.  
__Notes__  
The TColor value specifies a 6 digit hexadecimal number of the $FFFFFF format\.  For example the color blue would be RGB:0,0,255 and Hex:FF0000 therefore the converted decimal value would be 16711680\.  The following formula may be used to calculate the required value, R\+256\*\(G\+\(256\*B\)\)\.  
__Example__  
SheetEntry\.SetState\_TextColor\(0\); // sets the text color to black\.  
__See also__  
TColor type  
ISch\_SheetEntry interface

##### SetState\_IOType method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Procedure SetState\_IOType \(Value : TPortIO\);  
__Description__  
The SetState\_IOType procedure sets the IO of the sheet entry\. This IO Type defines the electrical properties of the sheet entry\. Available IOs are: Input, Output, Bi\-directional and Unspecified\. The IO setting does not influence the connectivity of the circuit, but is considered during the running of an electrical rules check, which can be set to detect incompatible port directions\.

Note, the I/O Type of the Sheet Entry overrides the Style property\. If the I/O Type is set to Unspecified you can set the appropriate Style for this sheet entry\. However if the I/O Type is set to one of the specified I/O types then changing the Style will not update the graphical content of the sheet entry\.  
__Example__  
SheetEntry\.SetStateIOType\(ePortBidirectional\);  
__See also__  
IPortIO type  
ISch\_SheetEntry interface

##### SetState\_OverrideDisplayString method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Procedure SetState\_OverrideDisplayString\(Value : WideString \);  
__Description__  
The SetState\_OverrideDisplayString procedure sets a new value consisting of alph\-numeric characters for the Override Display string\.  
__Example__  
SheetEntry\.SetState\_OverrideDisplayString\(‘New Override String’\);  
__See also__  
ISch\_HarnessEntry interface

##### GetState\_TextColor method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Function GetState\_TextColor : TColor;  
__Description__  
The GetState\_TextColor function returns the color of the text used for the Name of the Sheet Entry\.  
__Example__  
Color := SheetEntry\.GetState\_TextColor;  
__See also__  
TColor type  
ISch\_SheetEntry

##### GetState\_Style method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Function GetState\_Style : TPortArrowStyle;  
__Description__  
The GetState\_Style function gets the style of the sheet entry\. This style is determined by the TPortArrowStyle type\. This style defines the graphical style of the sheet entry only if the__ I/O Type__ property is set to Unspecified\. The __IO Type__ of the Sheet Entry overrides the __Style__ property if the I/O Type is set to one of the specified IO types then changing the Style will not update the graphical content of the sheet entry\.  
__Example__  
Style := SEntry\.GetState\_Style;  
__See also__  
TPortArrowStyle type\.  
ISch\_SheetEntry interface

##### GetState\_Side method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Function GetState\_Side : TLeftRightSide;  
__Description__  
The GetState\_Side function returns the orientation of the sheet entry in respect to the associated sheet symbol as a TLeftRightSide type\.  
__Example__  
Side := SheetEntry\.GetState\_Side;  
__See also__  
TLeftRightSide type  
ISch\_SheetEntry interface

##### GetState\_SchOwnerSheetSymbol method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Function GetState\_SchOwnerSheetSymbol : ISch\_SheetSymbol;  
__Description__  
The GetState\_SchOwnerSheetSymbol function returns the sheet symbol interface \(ISch\_Sheet Symbol\) that this sheet entry is associated with\.  
__Example__  
OwnerSheetSymbol := SheetEntry\.GetState\_SchOwnerSheetSymbol;  
__See also__  
ISch\_SheetEntry interface  
ISch\_SheetSymbol interface

##### GetState\_Name method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Function GetState\_Name : WideString;  
__Description__  
The GetState\_Name function returns the name of the sheet entry\. Normally the name is a number but can be alphanumeric\.  
__Example__  
EntryName := SheetEntry\.GetStateName  
__See also__  
Name property\.  
ISch\_SheetEntry interface

##### GetState\_IOType method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Function GetState\_IOType : TPortIO;  
__Description__  
The GetState\_IOType procedure gets the IO type of the sheet entry\. This IO Type defines the electrical properties of the sheet entry\. Available IOs are: Input, Output, Bi\-directional and Unspecified\. The IO setting does not influence the connectivity of the circuit, but is considered during the running of an electrical rules check, which can be set to detect incompatible port directions\.

Note, the I/O Type of the Sheet Entry overrides the Style property\. If the I/O Type is set to Unspecified you can set the appropriate Style for this sheet entry\. However if the I/O Type is set to one of the specified I/O types then changing the Style will not update the graphical content of the sheet entry\.  
__Example__  
IOType := SheetEntry\.GetState\_IOType;  
__See also__  
TPortIO type  
ISch\_SheetEntry interface

##### GetState\_DistanceFromTop method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Function  GetState\_DistanceFromTop : TCoord;  
__Description__  
The GetState\_DistanceFromTop function returns the distance from this sheet entry to the top edge of the sheet symbol in a value that’s dependent on the grid units\. For example if the grid was in DXP Defaults \(10 DXP units = 100 mils for example\) and the Entry is 10 Units away from the Top part of the Sheet Symbol\.  
__Example__  
Distance := SheetEntry\.GetState\_DistanceFromTop;  
__See also__  
ISch\_SheetEntry interface  
ISch\_SheetSymbol interface\.

##### GetState\_OverrideDisplayString method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Function  GetState\_OverrideDisplayString : WideString;  
__Description__  
The GetState\_OverrrideDisplayString function returns the override display string which overrides the Name string\.  
__Example__  
DisplayString := SheetEntry\.GetState\_OverrideDisplayString;  
__See also__  
ISch\_SheetEntry interface

##### IsVertical method

\(ISch\_SheetEntry interface\)  
__Syntax__  
Function IsVertical : Boolean;  
__Description__  
This function returns a Boolean value that determines whether the sheet entry is aligned vertically or not\.  
__Example__  
Vertical := SheetEntry\.IsVertical;  
__See also__  
ISch\_SheetEntry interface

#### Properties

##### TextColor

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property TextColor : TColor Read GetState\_TextColor Write SetState\_TextColor;  
__Description__  
The TextColor property defines the color \(a value of TColor type\) for the Harness Entry’s Name string\. This property is supported by the GetState\_TextColor and SetState\_TextColor methods\.  
__Notes__  
The TColor value specifies a 6 digit hexadecimal number of the $FFFFFF format\.  For example the color blue would be RGB:0,0,255 and Hex:FF0000 therefore the converted decimal value would be 16711680\.  The following formula may be used to calculate the required value, R\+256\*\(G\+\(256\*B\)\)\.  
__Example__  
SheetEntry\.TextColor := 0; // sets the name color to black\.  
__See also__  
TColor type  
ISch\_SheetEntry interface

##### Style property

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property Style : TPortArrowStyle Read GetState\_Style Write SetState\_Style;  
__Description__  
The Style property determines the style of the sheet entry and is determined by the TPortArrowStyle type\. This style defines the graphical style of the sheet entry only if the__ I/O Type__ property is set to Unspecified\. The __IO Type__ of the Sheet Entry overrides the __Style__ property if the I/O Type is set to one of the specified IO types then changing the Style will not update the graphical content of the sheet entry\.  
__Example__  
SEntry\.Style := ePortLeft;  
__See also__  
TPortArrowStyle type  
ISch\_SheetEntry interface

##### Side

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property Side : TLeftRightSide Read GetState\_Side Write SetState\_Side;  
__Description__  
The Side property defines the orientation of the sheet entry in respect to the associated sheet symbol\. This property is supported by the GetState\_Side and SetState\_Side methods\.  
__Example__  
SheetEntry\.Side := eLeftSide;  
__See also__  
ISch\_SheetEntry interface

##### OwnerSheetSymbol property

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property OwnerSheetSymbol : ISch\_SheetSymbol Read GetState\_SchOwnerSheetSymbol;  
__Description__  
The OwnerSheetSymbol property retrieves the Sheet Symbol interface this Sheet entry is associated with\. This property is supported by the GetState\_OwnerSheetSymbol method\.  
__Example__  
SheetSymbol := SheetEntry\.GetState\_OwnerSheetSymbol;  
__See also__  
ISch\_SheetEntry interface

##### Name

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property Name : WideString Read GetState\_Name Write SetState\_Name;  
__Description__  
The Name property defines the name of the sheet entry\. Normally the name property is a number but can be alphanumeric\. This property is supported by the GetState\_Name and SetState\_Name methods\.  
__Example__  
SheetEntry\.Name := ‘EntryType\_2’;  
__See also__  
ISch\_SheetEntry interface

##### IOType property

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property IOType : TPortIO Read GetState\_IOType Write SetState\_IOType;  
__Description__  
The IOType property determines the IO of the sheet entry\. This IO Type defines the electrical properties of the sheet entry\. Available IOs are: Input, Output, Bi\-directional and Unspecified\. The IO setting does not influence the connectivity of the circuit, but is considered during the running of an electrical rules check, which can be set to detect incompatible port directions\.

Note, the I/O Type of the Sheet Entry overrides the Style property\. If the I/O Type is set to Unspecified you can set the appropriate Style for this sheet entry\. However if the I/O Type is set to one of the specified I/O types then changing the Style will not update the graphical content of the sheet entry\.  
__Example__  
SheetEntry\.IOType := ePortOutput;  
__See also__  
ISch\_SheetEntry interface

##### DistanceFromTop

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property DistanceFromTop : TCoord Read GetState\_DistanceFromTop Write SetState\_DistanceFromTop;  
__Description__  
The DistanceFromTop property defines the location of the sheet entry in respect to the associated sheet symbol\. This property is supported by the GetState\_DistanceFromTop and SetState\_DistanceFromTop methods\.  
__Example__  
SheetEntry\.DistanceFromTop := DxpsToCoord\(10\);  
__See also__  
ISch\_SheetEntry interface

##### OverrideDisplayString property

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property OverrideDisplayString : WideString Read GetState\_OverrideDisplayString Write SetState\_OverrideDisplayString;  
__Description__  
The OverrideDisplayString property defines the OverRideDisplayString property\. This property is supported by the GetState\_OverrirdeDisplayString and SetState\_OverrirdeDisplayString methods\.  
__Example__  
SheetEntry\.OverrideDisplayString\(‘Display String overridden\.’\);  
__See also__  
ISch\_SheetEntry interface