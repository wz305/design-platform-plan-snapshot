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