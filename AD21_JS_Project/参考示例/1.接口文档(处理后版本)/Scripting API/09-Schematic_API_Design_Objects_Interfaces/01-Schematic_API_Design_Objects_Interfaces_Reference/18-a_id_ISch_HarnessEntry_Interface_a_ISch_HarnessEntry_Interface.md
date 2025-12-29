### <a id="ISch_HarnessEntry_Interface"></a>ISch\_HarnessEntry Interface

__Overview__  
The ISch\_HarnessEntry interface is used to represent a harness entry which is a member of the harness system\. Harness Entries are the graphical definition of a Signal Harness member\. They are placed within a Harness Connector and they are the connection point through which actual nets, buses and Signal Harnesses are combined to form a higher level Signal Harness\. Harness Entries along with Harness Connectors, Signal Harnesses and Harness Definition Files make up a complete Signal Harness\.  
__Notes__  
The ISch\_HarnessEntry interface hierarchy is as follows:  
ISch\_GraphicalObject  
                ISch\_HarnessEntry

__ISch\_HarnessEntry methods__  
SetState\_Name  
SetState\_Side  
SetState\_DistanceFromTop  
SetState\_TextColor  
SetState\_OverrideDisplayString  
GetState\_Name  
GetState\_Side  
GetState\_DistanceFromTop  
GetState\_TextColor  
GetState\_OverrideDisplayString  
GetState\_SchOwnerHarnessConnector

__ISch\_HarnessEntry properties__  
IsVertical  
Name  
Side  
DistanceFromTop  
TextColor  
OverrideDisplayString  
OwnerHarnessConnector

#### Methods

##### GetState\_Name method

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Function GetState\_Name : WideString;  
__Description__  
The GetState\_Name function returns the name of the harness entry\. Normally the name is a number but can be alphanumeric\.  
__Example__  
EntryName := HarnessEntry\.GetStateName  
__See also__  
Name property\.  
ISch\_HarnessEntry interface

##### GetState\_Side method

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Function GetState\_Side : TLeftRightSide;  
__Description__  
The GetState\_Side function returns the orientation of the harness entry in respect to the associated harness connector as a TLeftRightSide type\.  
__Example__  
Side := HarnessEntry\.GetState\_Side;  
__See also__  
TLeftRightSide type  
ISch\_HarnessEntry interface

##### GetState\_DistanceFromTop method

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Function  GetState\_DistanceFromTop : TCoord;  
__Description__  
The GetState\_DistanceFromTop function returns the distance from this harness entry to the top edge of the harness connector in a value that’s dependent on the grid units\. For example if the grid was in DXP Defaults \(10 DXP units = 100 mils for example\) and the Entry is 10 Units away from the Top part of the Harness Connector\.  
__Example__  
Distance := HarnessEntry\.GetState\_DistanceFromTop;  
__See also__  
ISch\_HarnessEntry interface

##### GetState\_TextColor method

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Function  GetState\_TextColor : TColor;  
__Description__  
The GetState\_TextColor function returns the color of the text used for the Name of the Harness Entry\.  
__Example__  
Color := HarnessEntry\.GetState\_TextColor;  
__See also__  
TColor type  
ISch\_HarnessEntry

##### GetState\_OverrideDisplayString method

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Function  GetState\_OverrideDisplayString : WideString;  
__Description__  
The GetState\_OverrrideDisplayString function returns the override display string which overrides the Name string\.  
__Example__  
DisplayString := HarnessEntry\.GetState\_OverrideDisplayString;  
__See also__  
ISch\_HarnessEntry interface

##### GetState\_SchOwnerHarnessConnector method

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Function  GetState\_SchOwnerHarnessConnector : ISch\_HarnessConnector;  
__Description__  
The GetState\_SchOwnerHarnessConnector function returns the harness connector \(ISch\_HarnessConnector\) that this harness entry is associated with\.  
__Example__  
OwnerHarnessConnector := HarnessEntry\.GetState\_SchOwnerHarnessConnector;  
__See also__  
ISch\_HarnessEntry interface

##### SetState\_Name method

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Procedure SetState\_Name\(Value : WideString\);  
__Description__  
The SetState\_Name procedure sets the new name for the Harness Entry\.  
__Example__  
HarnessEntry\.SetState\_Name\(‘HarnessType2’\);  
__See also__  
ISch\_HarnessEntry interface

##### SetState\_Side method

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Procedure SetState\_Side\(Value : TLeftRightSide\);  
__Description__  
The SetState\_Side procedure sets the orientation of the harness entry in respect to the associated harness connector\.  
__Example__  
HarnessEntry\.SetState\_Side\(eLeftSide\);  
__See also__  
TLeftRightSide type\.  
ISch\_HarnessEntry interface\.

##### SetState\_DistanceFromTop method

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Procedure SetState\_DistanceFromTop\(Value : TCoord\);  
__Description__  
The SetState\_DistanceFromTop function sets the distance from this harness entry to the top edge of the harness connector in a value that’s dependent on the grid units\. For example if the grid was in DXP Defaults \(10 DXP units = 100 mils for example\) and the Entry is 10 Units away from the Top part of the Harness Connector then you would use the DxpToCoords function to translate the 10 grid units into a coordinate value\.  
__Example__  
HarnessEntry\.SetState\_DistanceFromTop\(DxpsToCoord\(10\)\);  
__See also__  
DXPsToCoord function  
Measurement Conversion functions  
ISch\_HarnessEntry interface

##### SetState\_TextColor method

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Procedure SetState\_TextColor\(Value : TColor\);  
__Description__  
The SetState\_TextColor procedure sets the color \(a value of TColor type\) for the Harness Entry’s Name string\.  
__Notes__  
The TColor value specifies a 6 digit hexadecimal number of the $FFFFFF format\.  For example the color blue would be RGB:0,0,255 and Hex:FF0000 therefore the converted decimal value would be 16711680\.  The following formula may be used to calculate the required value, R\+256\*\(G\+\(256\*B\)\)\.  
__Example__  
HarnessEntry\.SetState\_TextColor\(0\); // sets the text color to black\.  
__See also__  
TColor type  
ISch\_HarnessEntry interface

##### SetState\_OverrideDisplayString method

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Procedure SetState\_OverrideDisplayString\(Value : WideString \);  
__Description__  
The SetState\_OverrideDisplayString procedure sets a new value consisting of alph\-numeric characters for the Override Display string\.  
__Example__  
HarnessEntry\.SetState\_OverrideDisplayString\(‘New Override String’\);  
__See also__  
ISch\_HarnessEntry interface

#### Properties

##### IsVertical

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Function  IsVertical : Boolean;  
__Description__  
The IsVertical property defines the orientation of the harness entry in respect to the harness connector\.  
__Example__  
If HarnessEntry\.IsVertical Then ShowMessage\(‘The hentry is vertical\.’\);  
__See also__  
ISch\_HarnessEntry interface

##### Name

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Property Name : WideString Read GetState\_Name Write SetState\_Name;  
__Description__  
The Name property defines the name of the harness entry\. Normally the name property is a number but can be alphanumeric\.\.\. This property is supported by the GetState\_Name and SetState\_Name methods\.  
__Example__  
HarnessEntry\.Name := ‘HarnessType\_2’;  
__See also__  
ISch\_HarnessEntry interface

##### Side

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Property Side : TLeftRightSide Read GetState\_Side Write SetState\_Side;  
__Description__  
The Side property defines the orientation of the harness entry in respect to the associated harness connector\. This property is supported by the GetState\_Side and SetState\_Side methods\.  
__Example__  
HarnessEntry\.Side := eLeftSide;  
__See also__  
ISch\_HarnessEntry interface

##### DistanceFromTop

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Property DistanceFromTop : TCoord Read GetState\_DistanceFromTop Write SetState\_DistanceFromTop;  
__Description__  
The DistanceFromTop property defines the location of the harness entry in respect to the associated harness connector\. This property is supported by the GetState\_DistanceFromTop and SetState\_DistanceFromTop methods\.  
__Example__  
HarnessEntry\.DistanceFromTop := DxpsToCoord\(10\);  
__See also__  
ISch\_HarnessEntry interface

##### TextColor

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Property TextColor : TColor Read GetState\_TextColor Write SetState\_TextColor;  
__Description__  
The TextColor property defines the color \(a value of TColor type\) for the Harness Entry’s Name string\. This property is supported by the GetState\_TextColor and SetState\_TextColor methods\.  
__Notes__  
The TColor value specifies a 6 digit hexadecimal number of the $FFFFFF format\.  For example the color blue would be RGB:0,0,255 and Hex:FF0000 therefore the converted decimal value would be 16711680\.  The following formula may be used to calculate the required value, R\+256\*\(G\+\(256\*B\)\)\.  
__Example__  
HarnessEntry\.TextColor := 0; // sets the name color to black\.  
__See also__  
TColor type  
ISch\_HarnessEntry interface

##### OverrideDisplayString

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Property OverrideDisplayString : WideString Read GetState\_OverrideDisplayString Write SetState\_OverrideDisplayString;  
__Description__  
The OverrideDisplayString property defines the OverRideDisplayString property\. This property is supported by the GetState\_OverrirdeDisplayString and SetState\_OverrirdeDisplayString methods\.  
__Example__  
HarnessEntry\.OverrideDisplayString\(‘Display String overridden\.’\);  
__See also__  
ISch\_HarnessEntry interface

##### OwnerHarnessConnector

\(ISch\_HarnessEntry interface\)  
__Syntax__  
Property OwnerHarnessConnector : ISch\_HarnessConnector Read GetState\_SchOwnerHarnessConnector;  
__Description__  
The OwnerHarnessConnector property retrieves the HarnessConnector interface this harness entry is associated with\. This property is supported by the GetState\_OwnerHarnessConnector method\.  
__Example__  
HarnessConnector := HarnessEntry\.GetState\_OwnerHarnessConnector;  
__See also__  
ISch\_HarnessEntry interface

#### IHarnessTypeHolder Interface

__Overview__  
The IHarnessTypeHolder

__IHarnessTypeHolder methods__  
SetState\_HarnessType  
SetState\_HarnessTypeInferred  
SetState\_IsHarnessObject  
GetState\_HarnessType  
GetState\_HarnessTypeInferred  
GetState\_IsHarnessObject

__IHarnessTypeHolder properties__  
HarnessType  
HarnessTypeInferred  
IsHarnessObject

#### Methods

SetState\_HarnessType  
SetState\_HarnessTypeInferred  
SetState\_IsHarnessObject  
GetState\_HarnessType  
GetState\_HarnessTypeInferred  
GetState\_IsHarnessObject

#### Properties

HarnessType  
HarnessTypeInferred  
IsHarnessObject