#### Methods

##### SetState\_OverrideDisplayString method

\(ISch\_Label interface\)  
__Syntax__  
Procedure SetState\_OverrideDisplayString\(S : WideString \);  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### SetState\_Orientation method

\(ISch\_Label interface\)  
__Syntax__  
Procedure SetState\_Orientation \(ARotation : TRotationBy90\);  
__Description__  
This Orientation property determines the angle the ISch\_Label is at on the Schematic document\. The angle is in 90 degree increments \- 0, 90, 180, 270\. This property is supported by the GetState\_Orientation and SetState\_Orientation methods\.  
__Example__  
SchLabel\.Orientation := eRotate90;  
__Example__  
__See also__  
ISch\_Label interface

##### SetState\_Justification method

\(ISch\_Label interface\)  
__Syntax__  
Procedure SetState\_Justification \(AValue : TTextJustification\);  
__Description__  
The Justification property determines the alignment of the text in respect to the Label object whether it is left justified, centered and so on\. This property is supported by the GetState\_Justification and SetState\_Justification methods\.  
__Example__  
__See also__  
ISch\_Label interface

##### SetState\_IsMirrored method

\(ISch\_Label interface\)  
__Syntax__  
Procedure SetState\_IsMirrored \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### SetState\_FontId method

\(ISch\_Label interface\)  
__Syntax__  
Procedure SetState\_FontId \(AFontId : TFontID\);  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### GetState\_OverrideDisplayString method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_OverrideDisplayString : WideString;  
__Description__  
The GetState\_OverrrideDisplayString function returns the override display string which overrides the Name string\.  
__Example__  
DisplayString := Label\.GetState\_OverrideDisplayString;  
__See also__  
ISch\_Label interface

##### GetState\_Orientation method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_Orientation : TRotationBy90;  
__Description__  
This Orientation property determines the angle the ISch\_Label is at on the Schematic document\. The angle is in 90 degree increments \- 0, 90, 180, 270\. This property is supported by the GetState\_Orientation and SetState\_Orientation methods\.  
__Example__  
SchLabel\.Orientation := eRotate90;  
__See also__  
ISch\_Label interface

##### GetState\_Justification method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_Justification : TTextJustification;  
__Description__  
The Justification property determines the alignment of the text in respect to the Label object whether it is left justified, centered and so on\. This property is supported by the GetState\_Justification and SetState\_Justification methods\.  
__Example__  
Justification := Label\.GetState\_Justification;  
__See also__  
ISch\_Label interface

##### GetState\_IsMirrored method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_IsMirrored : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### GetState\_Formula method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_Formula : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### GetState\_FontId method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_FontId : TFontID;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### GetState\_DisplayString method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_DisplayString : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface

##### GetState\_CalculatedValueString method

\(ISch\_Label interface\)  
__Syntax__  
Function GetState\_CalculatedValueString : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Label interface