#### Methods

##### SetState\_Width method

\(ISch\_Port interface\)  
__Syntax__  
Procedure SetState\_Width \(AValue : TCoord\);  
__Description__  
This SetState\_Width procedure sets the width of the port object in a TCoord value\. Use one of the following conversion functions to convert from a unit value to a TCoord value\. For example MilsToCoord or DXPsToCoord functions\.  
__Example__  
Port\.SetState\_Width\(MilsToCoord\(50\)\);  
__See also__  
TCoord type\.  
Conversion functions  
ISch\_Port interface

##### SetState\_UniqueId method

\(ISch\_Port interface\)  
__Syntax__  
Procedure SetState\_UniqueId \(AValue : WideString\);  
__Description__  
The SetState\_UniqueID procedure sets the new ID for the port\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.  
The Unique ID \(UID\) is an system generated value that uniquely identifies this current port\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__

1

UID := WSM\.DM\_GenerateUniqueID; // interface and method from Workspace Manager API\.

2

Port\.SetState\_UniqueID\(UID\);

__See also__  
ISch\_Port interface

##### SetState\_TextColor method

\(ISch\_Port interface\)  
__Syntax__  
Procedure SetState\_TextColor \(AValue : TColor\);  
__Description__  
The SetState\_TextColor procedure sets the color \(a value of TColor type\) for the Port’s Name string\.  
__Notes__  
The TColor value specifies a 6 digit hexadecimal number of the $FFFFFF format\.  For example the color blue would be RGB:0,0,255 and Hex:FF0000 therefore the converted decimal value would be 16711680\.  The following formula may be used to calculate the required value, R\+256\*\(G\+\(256\*B\)\)\.  
__Example__  
Port\.SetState\_TextColor\(0\); // sets the text color to black\.  
__See also__  
TColor type  
ISch\_Port interface

##### SetState\_Style method

\(ISch\_Port interface\)  
__Syntax__  
Procedure SetState\_Style \(AValue : TPortArrowStyle\);  
__Description__  
The SetState\_Style procedure sets the style of the port\. This style is determined by the TPortArrowStyle type\. This style defines the graphical style of the port\.  
__Example__  
Port\.SetState\_Style\(ePortLeft\);  
__See also__  
TPortArrowStyle type  
ISch\_Port interface

##### SetState\_Name method

\(ISch\_Port interface\)  
__Syntax__  
Procedure SetState\_Name \(AValue : WideString\);  
__Description__  
The SetState\_Name procedure sets the new name for the Port object\.  
__Example__  
Port\.SetState\_Name\(‘Port Name’\);  
__See also__  
ISch\_Port interface

##### SetState\_IOType method

\(ISch\_Port interface\)  
__Syntax__  
Procedure SetState\_IOType \(AValue : TPortIO\);  
__Description__  
The SetState\_IOType procedure defines the electrical properties of the port with the TPortIO type\. Available Port IO types are: Input, Output, Bi\-directional and Unspecified\.  
The setting of this IO Type does not influence the connectivity of the circuit, but is considered during the running of an electrical rules check, which can be set to detect incompatible port directions\.  
__Example__  
Port\.SetState\_IOType\(ePortBidirectional\);  
__See also__  
ISch\_Port interface

##### SetState\_CrossRef method

\(ISch\_Port interface\)  
__Syntax__  
Procedure SetState\_CrossRef \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Port interface

##### SetState\_ConnectedEnd method

\(ISch\_Port interface\)  
__Syntax__  
Procedure SetState\_ConnectedEnd\(AValue : TPortConnectedEnd\);  
__Description__  
The SetState\_ConnectedEnd procedure sets the ConnectedEnd type of the port object which determines how the port is graphically connected\.  
__Example__  
Port\.SetState\_ConenctedEnd\(ePortConnectedEnd\_Origin\);  
__See also__  
TPortConnectedEnd;  
ISch\_Port interface

##### SetState\_Alignment method

\(ISch\_Port interface\)  
__Syntax__  
Procedure SetState\_Alignment \(AValue : THorizontalAlign\);  
__Description__  
The SetState\_Alignment function determines how the port’s Name is aligned with respect to the ends of the port itself\. The Name string can be left justified, centered or right justified with respect to the port object\.  
__Example__  
Port\.SetState\_Alignment\(eHorizontalCentreAlign\);  
__See also__  
THorizontalAlign type  
ISch\_Port interface

##### SetState\_OverrideDisplayString method

\(ISch\_Port interface\)  
__Syntax__  
Procedure SetState\_OverrideDisplayString\(AValue  : WideString\);  
__Description__  
The SetState\_OverrrideDisplayString function sets the override display string which overrides the Name string\.  
__Example__  
Port\.SetState\_OverrideDisplayString\(‘Override Name’\);  
__See also__  
ISch\_Port interface

##### GetState\_Style method

\(ISch\_Port interface\)  
__Syntax__  
Function GetState\_Style : TPortArrowStyle;  
__Description__  
The GetState\_Style procedure gets the style of the port\. This style is determined by the TPortArrowStyle type\. This style defines the graphical style of the port object\.  
__Example__  
Port\.GetState\_Style\(ePortLeft\);  
__See also__  
TPortArrowStyle type  
ISch\_Port interface

##### GetState\_Name method

\(ISch\_Port interface\)  
__Syntax__  
Function GetState\_Name : WideString;  
__Description__  
The GetState\_Name procedure gets the name for the port object\.  
__Example__  
PortName := Port\.GetState\_Name;  
__See also__  
ISch\_Port interface

##### GetState\_Width method

\(ISch\_Port interface\)  
__Syntax__  
Function GetState\_Width : TCoord;  
__Description__  
The GetState\_Width function gets the width of the port in TCoord type\. Use one of the following conversion functions to convert from a TCoord value to one of these Unit values\. For example CoordToMils or CoordToDxps functions\.  
__Example__  
Port\.Width\(DXPsToCoord\(50\)\);  
__See also__  
Conversion functions  
ISch\_Port interface

##### GetState\_UniqueId method

\(ISch\_Port interface\)  
__Syntax__  
Function GetState\_UniqueId : WideString;  
__Description__  
The GetState\_UniqueID procedure gets the ID for the port\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current port\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__  
UID := Port\.GetState\_UniqueID;  
__See also__  
ISch\_Port interface

##### GetState\_TextColor method

\(ISch\_Port interface\)  
__Syntax__  
Function GetState\_TextColor : TColor;  
__Description__  
The GetState\_TextColor procedure gets the color \(a value of TColor type\) from the Port’s Name string\.  
__Notes__  
The TColor value specifies a 6 digit hexadecimal number of the $FFFFFF format\.  For example the color blue would be RGB:0,0,255 and Hex:FF0000 therefore the converted decimal value would be 16711680\.  The following formula may be used to calculate the required value, R\+256\*\(G\+\(256\*B\)\)\.  
__Example__  
Color := Port\.GetState\_TextColor;  
__See also__  
TColor type  
ISch\_Port interface

##### GetState\_IOType method

\(ISch\_Port interface\)  
__Syntax__  
Function GetState\_IOType : TPortIO;  
__Description__  
The GetState\_IOType function retrieves the electrical properties of the port of the TPortIO type\. Available Port IO types are: Input, Output, Bi\-directional and Unspecified\.  
The setting of this IO Type does not influence the connectivity of the circuit, but is considered during the running of an electrical rules check, which can be set to detect incompatible port directions\.  
__Example__  
IOType := Port\.GetState\_IOType;  
__See also__  
ISch\_Port interface

##### GetState\_CrossRef method

\(ISch\_Port interface\)  
__Syntax__  
Function GetState\_CrossRef : WideString;  
__Description__  
The GetState\_CrossRef function returns the text of the parameter associated with the port\. The Parameter has a Name of ‘CrossRef’\.  
__Example__  
__See also__  
ISch\_Port interface

##### GetState\_ConnectedEnd method

\(ISch\_Port interface\)  
__Syntax__  
Function GetState\_ConnectedEnd : TPortConnectedEnd;  
__Description__  
The GetState\_ConnectedEnd procedure gets the ConnectedEnd type of the port object which determines how the port is graphically connected\.  
__Example__  
ConnectedEnd := Port\.GetState\_ConnectedEnd;  
__See also__  
ISch\_Port interface

##### GetState\_Alignment method

\(ISch\_Port interface\)  
__Syntax__  
Function GetState\_Alignment : THorizontalAlign;  
__Description__  
The GetState\_Alignment function determines how the port’s Name is aligned with respect to the ends of the port itself\. The Name string can be left justified, centered or right justified in respect to the port object\.  
__Example__  
Align := Port\.GetState\_Alignment;  
__See also__  
ISch\_Port interface

##### GetState\_OverrideDisplayString method

\(ISch\_Port interface\)  
__Syntax__  
Function  GetState\_OverrideDisplayString : WideString;  
__Description__  
The GetState\_OverrrideDisplayString function returns the override display string which overrides the Name string\.  
__Example__  
DisplayString := Port\.GetState\_OverrideDisplayString;  
__See also__  
ISch\_Port interface

##### IsVertical method

\(ISch\_Port interface\)  
__Syntax__  
Function IsVertical : Boolean;  
__Description__  
This function returns a Boolean value that determines whether the port object is aligned vertically or not\.  
__Example__  
Vertical := Port\.IsVertical;  
__See also__  
ISch\_Port interface