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