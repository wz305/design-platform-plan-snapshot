### <a id="ISch_GraphicalObject_Interface"></a>ISch\_GraphicalObject Interface

__Overview__  
The ISch\_GraphicalObject interface represents the ancestor interface for an object that has graphical properties on a schematic document\.

All graphic objects such as arcs, ports, rectangles etc have bounding rectangles of TCoordRect type\.

__Notes__  
ISch\_BasicContainer interface  
                ISch\_GraphicalObject interface

The ISch\_GraphicalObject interface hierarchy is as follows;

__ISch\_GraphicalObject methods__  
GetState\_AreaColor  
GetState\_Color  
GetState\_CompilationMasked  
GetState\_Dimmed  
GetState\_Disabled  
GetState\_DisplayError  
GetState\_EnableDraw  
GetState\_ErrorColor  
GetState\_ErrorKind  
GetState\_ErrorString  
GetState\_LiveHighlightValue  
GetState\_Location  
GetState\_OwnerPartDisplayMode  
GetState\_OwnerPartId  
GetState\_Selection  
SetState\_AreaColor  
SetState\_Color  
SetState\_CompilationMasked  
SetState\_Dimmed  
SetState\_Disabled  
SetState\_DisplayError  
SetState\_EnableDraw  
SetState\_ErrorColor  
SetState\_ErrorKind  
SetState\_ErrorString  
SetState\_LiveHighlightValue  
SetState\_Location  
SetState\_OwnerPartDisplayMode  
SetState\_OwnerPartId  
SetState\_Selection  
AddErrorString  
BoundingRectangle  
BoundingRectangle\_Full  
GraphicallyInvalidate  
Mirror  
MoveByXY  
MoveToXY  
ResetErrorFields  
RotateBy90  
SetState\_xSizeySize

__ISch\_GraphicalObject properties__  
AreaColor  
Color  
CompilationMasked  
Dimmed  
Disabled  
DisplayError  
EnableDraw  
ErrorColor  
ErrorKind  
ErrorString  
LiveHighlightValue  
Location  
OwnerPartDisplayMode  
OwnerPartId  
Selection

#### ISch\_GraphicalObject Methods

##### AddErrorString method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure AddErrorString\(Const AErrorString : WideString; AtEnd : LongBool\);  
__Description__  
This procedure adds an error string to the string whether it is at end or not\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_AreaColor method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_AreaColor : TColor;  
__Description__  
The AreaColor property denotes the filled color region of a closed object\. The AreaColor value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This method obtains the color for the area color of an object and is used in the AreaColor property\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
TColor type

##### GetState\_Color method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_Color : TColor;  
__Description__  
The Color property denotes the color region of a closed object which is usually the border\. The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This method obtains the color for the color of the boundary of an object and is used in the Color property\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
TColor type

##### GetState\_CompilationMasked method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_CompilationMasked : Boolean;  
__Description__  
The CompilationMasked property determines whether the object is masked by the Compiler\. The CompileMask object can be placed on a group of objects on the schematic sheet, and these objects have their CompilationMasked property set to true\.  
This method obtains the boolean value whether the CompilationMasked is true or not and is used in the CompilationMasked property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_Dimmed method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_Dimmed : Boolean;  
__Description__  
This Dimmed property is true when this object is not part of the filter mechanism \(by the Filter panel for example\)\. When objects are found by the Filter mechanism, they stay as is \(Dimmed is false\), and the objects that are not found are dimmed \(Dimmed is true\)\.  
This procedure gets the boolean value of the Dimmed property and is this method used in the Dimmed property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_Disabled method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_Disabled : Boolean;  
__Description__  
This Disabled property is true when this object is not part of the filter mechanism \(by the Filter panel for example\)\. When objects are found by the Filter mechanism, they stay as is \(Disabled is false\), and the objects that are not found are disabled \(Disabled is true\)\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_DisplayError method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_DisplayError : Boolean;  
__Description__  
This property determines whether the DisplayError is displayed or not\. When true, the red squiggly line underneath the graphical object appears when it is subject to a compilation error in Altium Designer\.  
This procedure gets the boolean value for the DisplayError property and is used in the DisplayError property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_EnableDraw method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_EnableDraw : Boolean;  
__Description__  
This property merely determines whether the object can be drawn on the screen or not\. This procedure gets the value for the EnableDraw property and is used as a getter for the EnableDraw property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_ErrorColor method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_ErrorColor : TColor;  
__Description__  
The ErrorColor property determines the error color value that the object is associated with\. The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
The function sets the color for the ErrorColor property and is also used as a setter function in the ErrorColor property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_ErrorKind method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_ErrorKind : TErrorKind;  
__Description__  
This property determines the error kind that the object is associated with, when it is subject to the Compiler in Altium Designer\. This procedure is used for the ErrorKind property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_ErrorString method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_ErrorString : WideString;  
__Description__  
This property returns the Error string that the object is associated with when it is subject to the Compiler in Altium Designer\.  
This procedure is used for the ErrorString property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_LiveHighlightValue method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_LiveHighlightValue : WideString;  
__Description__  
This property toggles the highlight value \(text string\) of the object when it is subject to the probe process in Altium Designer during the Live Design mode\. This method is used for the LiveHighlightValue property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_Location method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_Location : TLocation;  
__Description__  
The Location property defines the reference point of the object \(not necessarily the center of the object\)\. Use the BoundingRectangle and BoundingRectangle\_Full methods to determine the bounding regions of the object\.  
This procedure retrieves the location or the reference point of the object\. This method is used for the Location property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
TLocation type

##### GetState\_OwnerPartDisplayMode method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_OwnerPartDisplayMode : TDisplayMode;  
__Description__  
This property represents schematic components in various graphical representations only\. A schematic component can have up to 255 different graphical representations and a component can be composed of different parts that make up the whole\. A child object is part of the parent object and thus the child object's owner part display mode fetches the parent's \(in this case the component\) part display mode\.  
This procedure gets the owner display mode \(one of the existing modes only\) for the component\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_OwnerPartId method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_OwnerPartId : Integer;  
__Description__  
The OwnerPartId property determines the child object's parent object's part id\. A component can be composed of multiple parts\. Each part is composed of schematic primitives and thus each primitive associated with the part can be queried for its OwnerPartId property\. The owner of the child object is the parent object\.  
This procedure gets the OwnerPartId from the object as part of the component object\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### GetState\_Selection method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function GetState\_Selection : Boolean;  
__Description__  
This property determines whether the object is selected or not\. When an object is selected, a crossed line boundary appears around the object\. This object can then be moved or edited graphically\.  
This method can define the selection state of the object and is used for the Selection property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_AreaColor method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_AreaColor \(AColor : TColor\);  
__Description__  
The AreaColor property denotes the filled color region of a closed object\. The AreaColor value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This method defines the color for the area color of an object and is used in the AreaColor property\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
TColor type

##### SetState\_Color method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_Color \(AColor : TColor\);  
__Description__  
The Color property denotes the color region of a closed object which is usually the border\. The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This method defines the color for the color of the boundary of an object and is used in the Color property\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
TColor type

##### SetState\_CompilationMasked method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_CompilationMasked \(AValue : Boolean\);  
__Description__  
The CompilationMasked property determines whether the object is masked by the Compiler\. The CompileMask object can be placed on a group of objects on the schematic sheet, and these objects have their CompilationMasked property set to true\.  
This method sets the CompilationMasked to true or not and is used in the CompilationMasked property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_Dimmed method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_Dimmed \(B : Boolean\);  
__Description__  
This Dimmed property is true when a parent object is not part of the navigation mechanism \(Navigator panel\)\. When objects are found by the Navigation mechanism, they stay as is \(Dimmed is false\), and the objects that are not part of the Navigation are dimmed \(Dimmed is true\)\.  
This procedure sets the boolean value of the Dimmed property and is this method used in the Dimmed property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_Disabled method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_Disabled \(B : Boolean\);  
__Description__  
This Disabled property is true when this object is not part of the filter mechanism \(by the Filter panel for example\)\. When objects are found by the Filter mechanism, they stay as is \(Disabled is false\), and the objects that are not found are disabled \(Disabled is true\)\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_DisplayError method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_DisplayError \(AValue : Boolean\);  
__Description__  
This property determines whether the DisplayError is displayed or not\. When true, the red squiggly line underneath the graphical object appears when it is subject to a compilation error in Altium Designer\.  
This procedure sets the boolean value for the DisplayError property and is used in the DisplayError property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_EnableDraw method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_EnableDraw \(B : Boolean\);  
__Description__  
This property merely determines whether the object can be drawn on the screen or not\. This procedure sets the value for the EnableDraw property and is used as a setter for the EnableDraw property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_ErrorColor method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_ErrorColor \(AValue : TColor\);  
__Description__  
The ErrorColor property determines the error color value that the object is associated with\.  
The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This procedure obtains the color of the error and this procedure is used as a getter method for the ErrorColor property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_ErrorKind method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_ErrorKind \(AValue : TErrorKind\);  
__Description__  
This property determines the error kind that the object is associated with, when it is subject to the Compiler in Altium Designer\. This procedure is used for the ErrorKind property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_ErrorString method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_ErrorString \(Const AValue : WideString\);  
__Description__  
This property returns the Error string that the object is associated with when it is subject to the Compiler in Altium Designer\.  
This procedure is used for the ErrorString property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_LiveHighlightValue method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_LiveHighlightValue \(AValue : WideString\);  
__Description__  
This property toggles the highlight value \(text string\) of the object when it is subject to the probe process in Altium Designer during the Live Design mode\. This method is used for the LiveHighlightValue property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_Location method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_Location \(ALocation : TLocation\);  
__Description__  
The Location property defines the reference point of the object \(not necessarily the center of the object\)\. Use the BoundingRectangle and BoundingRectangle\_Full methods to determine the bounding regions of the object\.  
This procedure sets the location or the reference point of the object\. This method is used for the Location property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_OwnerPartDisplayMode method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_OwnerPartDisplayMode \(AValue : TDisplayMode\);  
__Description__  
This property represents schematic components in various graphical representations only\. A schematic component can have up to 255 different graphical representations and a component can be composed of different parts that make up the whole\. A child object is part of the parent object and thus the child object's owner part display mode fetches the parent's \(in this case the component\) part display mode\.  
This procedure sets the display mode \(one of the existing modes only\) for the component\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
ISch\_Component interface

##### SetState\_OwnerPartId method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_OwnerPartId \(AValue : Integer\);  
__Description__  
The OwnerPartId property determines the child object's parent object's part id\. A component can be composed of multiple parts\. Each part is composed of schematic primitives and thus each primitive associated with the part can be queried for its OwnerPartId property\. The owner of the child object is the parent object\.  
This procedure sets the OwnerPartId for the object as part of the component object\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_Selection method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_Selection \(B : Boolean\);  
__Description__  
This property determines whether the object is selected or not\. When an object is selected, a crossed line boundary appears around the object\. This object can then be moved or edited graphically\.  
This method can define the selection state of the object and is used for the Selection property\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### SetState\_xSizeySize method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure SetState\_xSizeySize;  
__Description__  
This method sets the X size and the ySize of the graphical bounds of the object\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### BoundingRectangle method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function BoundingRectangle : TCoordRect;  
__Description__  
This function returns the coordinates of the bounds of the parent object itself \(not including the children objects if any\)\. To determine the full bounding rectangle of the object \(including the children object\), invoke the BoundingRectangle\_Full method instead\.  
For example a Schematic component would typically have a rectangle as the outline, the pins and parameters as the children objects\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
BoundingRectangle\_Full method  
TCoordRect type

##### BoundingRectangle\_Full method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Function BoundingRectangle\_Full : TCoordRect;  
__Description__  
This function returns the coordinates of the bounds of the parent object itself and including the children objects if any\.\. To determine the bounding rectangle of the parent object \(excluding the children object\), invoke the BoundingRectangle  method instead\.  
For example a Schematic component would typically have a rectangle as the outline, the pins and parameters as the children objects\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
BoundingRectangle method  
TCoordRect type

##### GraphicallyInvalidate method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure GraphicallyInvalidate;  
__Description__  
This procedure when invoked invalidates the object graphically prompting the system to do a system re\-draw to refresh the screen\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### Mirror method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure Mirror \(Axis : TLocation\);  
__Description__  
The Mirror method flips the object across the axis \(TLocaiton Type\)  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
ISch\_Label interface  
ISch\_Component interface  
TLocation Type

##### MoveByXY method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure MoveByXY \(x,y : TCoord\);  
__Description__  
This MoveByXY procedure moves the object in a linear distance specified by the X,Y coordinates relative to the reference point of the object\.  
__Example__

01

// Add rectangle and pin objects to the component object\.

02

Component\.AddSchObject\(Rect\);

03

Component\.AddSchObject\(Pin\);

04

  

05

// Add the new component to the schematic document\.

06

SchDoc\.AddSchObject\(Component\);

07

Component\.Comment\.IsHidden := True;

08

Component\.Designator\.IsHidden := True;

09

  

10

// Move component by 1,1 inch in respect to document's origin\.

11

Component\.MoveByXY\(InchesToCoord\(1\), InchesToCoord\(1\)\);

__See also__  
ISch\_GraphicalObject interface  
TCoord type  
UndoRedo script example in \\__Example__s\\Scripts\\DelphiScript Scripts\\Sch folder\.

##### MoveToXY method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure MoveToXY \(x,y : TCoord\);  
__Description__  
This MoveToXY procedure moves the object to a new location specified by the X,Y coordinates\.  
__Example__

01

// Add rectangle and pin objects to the component object\.

02

Component\.AddSchObject\(Rect\);

03

Component\.AddSchObject\(Pin\);

04

  

05

// Add the new component to the schematic document\.

06

SchDoc\.AddSchObject\(Component\);

07

Component\.Comment\.IsHidden := True;

08

Component\.Designator\.IsHidden := True;

09

  

10

// Move component to 1,1 inch in respect to document's origin\.

11

Component\.MoveToXY\(InchesToCoord\(1\), InchesToCoord\(1\)\);

__See also__  
ISch\_GraphicalObject interface  
TCoord type  
UndoRedo script example in \\__Example__s\\Scripts\\DelphiScript Scripts\\Sch folder\.

##### ResetErrorFields method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure ResetErrorFields;  
__Description__  
This procedure resets the error fields of the object\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### RotateBy90 method

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Procedure RotateBy90\(Center : TLocation; A : TRotationBy90\);  
__Description__  
The RotateBy90 procedure forces the rotation of the object by its center or a defined location on the schematic sheet and the rotation is done in 90 degree increments \(0, 90, 180, 270\)\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
TLocation type  
TRotationBy90 type

#### ISch\_GraphicalObject Properties

##### AreaColor property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property AreaColor : TColor Read GetState\_AreaColor Write SetState\_AreaColor;  
__Description__  
The AreaColor property denotes the filled color region of a closed object\. The AreaColor value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
This property is supported by the GetState\_AreaColor and SetState\_AreaColor methods\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
ISch\_Port interface  
ISch\_Pie interface  
ISch\_Rectangle interface  
ISch\_RoundRectangle interface  
ISch\_TextFrame interface

##### Color property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property Color : TColor Read GetState\_Color Write SetState\_Color;  
__Description__  
The Color property denotes the color region of a closed object which is usually the border outline\. The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
The Color property is supported by the GetState\_Color and SetState\_Color methods\.  
Notes  
The color format is in blue,green,red \(b,g,r\) primary color format and each primary color has a value of 0 to 255\.  
__Example__

1

Case AnObject\.ObjectId Of

2

    eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

3

    ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

4

End;

__See also__  
ISch\_GraphicalObject interface  
TColor type

##### CompilationMasked property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property CompilationMasked : Boolean Read GetState\_CompilationMasked Write SetState\_CompilationMasked;  
__Description__  
The CompilationMasked property determines whether the object is masked by the Compiler\. The CompileMask object can be placed on a group of objects on the schematic sheet, and these objects have their CompilationMasked property set to true\.  
This property is supported by the GetState\_CompilationMasked and SetState\_CompilationMasked methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### Dimmed property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property Dimmed : Boolean Read GetState\_Dimmed Write SetState\_Dimmed;  
__Description__  
This Dimmed property is true when a parent object is not part of the navigation mechanism \(Navigator panel\)\. When objects are found by the Navigation mechanism, they stay as is \(Dimmed is false\), and the objects that are not part of the Navigation are dimmed \(Dimmed is true\)\.  
This property is supported by the GetState\_Dimmed and SetState\_Dimmed methods\.  
Notes  
The Disabled / Dimmed states of a parent object \(say a component\), all its children \(pins, lines, etc\.\.\.\) will be also set to this state\. Thus when the Disabled/Dimmed property of a child object is being queried, the Disabled/Dimmed state of the parent object will be returned\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### Disabled property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property Disabled : Boolean Read GetState\_Disabled Write SetState\_Disabled;  
__Description__  
The Disabled property determines whether the object is disabled \(due to not being part of the collected objects by the filter mechanism ie the Filter panel\)  
Notes  
The Disabled / Dimmed states of a parent object \(say a component\), all its children \(pins, lines, etc\.\.\.\) will be also set to this state\. Thus when the Disabled/Dimmed property of a child object is being queried, the Disabled/Dimmed state of the parent object will be returned\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### DisplayError property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property DisplayError : Boolean Read GetState\_DisplayError Write SetState\_DisplayError;  
__Description__  
This property determines whether the DisplayError is displayed or not\. When true, the red squiggly line underneath the graphical object appears when it is subject to a compilation error in Altium Designer\.  
This property is supported by the GetState\_DisplayError and SetState\_DisplayError methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### EnableDraw property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property EnableDraw : Boolean Read GetState\_EnableDraw Write SetState\_EnableDraw;  
__Description__  
This property merely determines whether the object can be drawn on the screen or not\. This property is supported by the GetState\_EnableDraw and SetState\_EnableDraw methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### ErrorColor property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property ErrorColor : TColor Read GetState\_ErrorColor Write SetState\_ErrorColor;  
__Description__  
The ErrorColor property determines the error color value that the object is associated with\.  
The Color value is defined as a TColor type from the Borland Delphi's Graphics Unit and has a color range from $00000000 \(black\) to $00FFFFFF \(white\)\.  
The Color property is supported by the GetState\_ErrorColor and SetState\_ErrorColor methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### ErrorKind property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property ErrorKind : TErrorKind Read GetState\_ErrorKind Write SetState\_ErrorKind;  
__Description__  
This property determines the error kind that the object is associated with, when it is subject to the Compiler in Altium Designer\. This property is supported by the GetState\_ErrorKind and the SetState\_ErrorKind methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
TErrorKind type from Workspace Manager API

##### ErrorString property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property ErrorString : WideString Read GetState\_ErrorString Write SetState\_ErrorString;  
__Description__  
This property returns the Error string that the object is associated with when it is subject to the Compiler in Altium Designer\. This property is supported by the GetState\_ErrorString and SetState\_ErrorString methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### LiveHighlightValue property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property LiveHighlightValue : WideString Read GetState\_LiveHighlightValue Write SetState\_LiveHighlightValue;  
__Description__  
This property toggles the highlight value \(text string\) of the object when it is subject to the probe process in Altium Designer during the Live Design mode\. This property is supported by the GetState\_LiveHighlightValue and SetState\_LIveHighlightValue methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### Location property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property Location : TLocation Read GetState\_Location Write SetState\_Location;  
__Description__  
The Location property defines the reference point of the object \(not necessarily the center of the object\)\. Use the BoundingRectangle and BoundingRectangle\_Full methods to determine the bounding regions of the object\.  
This property is supported by the GetState\_Location and SetState\_Location methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
BoundingRectangle method  
BoundingRectangle\_Full method  
TLocation type

##### OwnerPartDisplayMode property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property OwnerPartDisplayMode : TDisplayMode Read GetState\_OwnerPartDisplayMode Write SetState\_OwnerPartDisplayMode;  
__Description__  
This property represents schematic components in various graphical representations only\. A schematic component can have up to 255 different graphical representations and a component can be composed of different parts that make up the whole\. A child object is part of the parent object and thus the child object's owner part display mode fetches the parent's \(in this case the component\) part display mode\.  
This property is supported by the GetState\_OwnerPartDisplayMode and SetState\_OwnerPartDisplayMode methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface  
ISch\_Component interface  
TDisplayMode type \(byte type\) from Workspace Manager API

##### OwnerPartId property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property OwnerPartId : Integer Read GetState\_OwnerPartId Write SetState\_OwnerPartId;  
__Description__  
The OwnerPartId property determines the child object's parent object's part id\. A component can be composed of multiple parts\. Each part is composed of schematic primitives and thus each primitive associated with the part can be queried for its OwnerPartId property\. The owner of the child object is the parent object\. This property is supported by the GetState\_OwnerPartId and SetState\_OwnerPartId methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface

##### Selection property

\(ISch\_GraphicalObject interface\)  
__Syntax__  
Property Selection : Boolean Read GetState\_Selection Write SetState\_Selection;  
__Description__  
This property determines whether the object is selected or not\. When an object is selected, a crossed line boundary appears around the object\. This object can then be moved or edited graphically\.  
This property is supported by the GetState\_Selection and SetState\_Selection methods\.  
__Example__  
__See also__  
ISch\_GraphicalObject interface