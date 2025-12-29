#### ISch\_BasicContainer Properties

##### Container property

\(ISch\_BasicContainer interface\)  
__Syntax__  
Property Container : ISch\_BasicContainer Read GetState\_SchBasicContainer;  
__Description__  
This property represents the container within the parent object \(such as a document, component or sheet symbol\)\. This property is supported by the GetState\_SchBasicContainer method\. If the container is empty it implies that this object itself is a standalone or child object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface

##### ObjectId property

\(ISch\_BasicContainer interface\)  
__Syntax__  
Property ObjectId : TObjectId Read GetState\_ObjectId;  
__Description__  
The ObjectID property determines what object type the object in question is\. For example when iterating for objects on a schematic document, you would want to modify all objects but update the port objects' locations only, thus you check for the object's ObjectId and if it is a ePort type, then take action\.  
__DelphiScript Example__

01

AnObject := Iterator\.FirstSchObject;

02

While AnObject <> Nil Do

03

Begin

04

    SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_BeginModify, c\_NoEventData\);

05

  

06

    Case AnObject\.ObjectId Of

07

       eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

08

       ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

09

    End;

10

  

11

    SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_EndModify  , c\_NoEventData\);

12

    AnObject := Iterator\.NextSchObject;

13

End;

__See also__  
ISch\_BasicContainer interface  
TObjectID type

##### OwnerDocument property

\(ISch\_BasicContainer interface\)  
__Syntax__  
Property OwnerDocument : ISch\_Document Read GetState\_OwnerSchDocument;  
__Description__  
This property returns the ISch\_Document interface that the object is associated with\. It is also said that the document owns the object when the Object has a valid OwnerDocument property\.  
This property is supported by the GetState\_OwnerSchDocument method\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
ISch\_Document interface

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