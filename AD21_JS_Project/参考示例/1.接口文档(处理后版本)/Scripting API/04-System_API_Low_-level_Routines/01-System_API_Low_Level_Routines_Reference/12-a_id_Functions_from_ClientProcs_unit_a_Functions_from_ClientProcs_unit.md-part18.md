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

### <a id="ISch_RobotManager_Interface"></a>ISch\_RobotManager Interface

__Overview__  
The ISch\_RobotManager interface represents an object that can send Schematic messages into the Schematic Editor server from a script to update the sub\-systems such as the Undo system\.  
__Notes__  
Part of ISch\_ServerInterface object interface  
__MessageID table__  
SCHM\_NullMessage             = 0;  
SCHM\_PrimitiveRegistration   = 1;  
SCHM\_BeginModify             = 2;  
SCHM\_EndModify               = 3;  
SCHM\_YieldToRobots           = 4;  
SCHM\_CancelModify            = 5;  
SCHM\_Create                  = 6;  
SCHM\_Destroy                 = 7;  
SCHM\_ProcessStart            = 8;  
SCHM\_ProcessEnd              = 9;  
SCHM\_ProcessCancel           = 10;  
SCHM\_CycleEnd                = 11;  
SCHM\_CycleStart              = 12;  
SCHM\_SystemInvalid           = 13;  
SCHM\_SystemValid             = 14;  
__Message types table__  
c\_BroadCast     = Nil;  
c\_NoEventData   = Nil;  
c\_FromSystem    = Nil;  
   
The ISch\_RobotManager interface hierarchy is as follows;

__ISch\_RobotManager methods__  
SendMessage

__ISch\_RobotManager properties__

__See also__  
ISch\_ServerInterface interface