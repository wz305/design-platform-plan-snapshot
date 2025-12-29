\(IPCB\_Via interface\)  
__Syntax__  
Function PlaneConnectionStyleForLayer\(ALayer : TLayer\) : TPlaneConnectionStyle;  
__Description__  
Vias automatically connect to an internal power plane layer that is assigned the same net name\. The via will connect to the plane depending on the applicable Power Plane Connect Style design rule\. If you do not want vias to connect to power planes, add another Power Plane Connect Style design rule targeting the specific vias required and with a connection style of No Connect\.

The Connect Style defines the style of the connection from a pin of a component, targeted by the scope \(Full Query\) of the rule, to a power plane\. The following three styles as per the TPlaneConnectionStyle type are available:

- No Connect \- do not connect a component pin to the power plane\.
- Direct Connect \- connect using solid copper to the pin\.
- Relief Connect \(default\) \- connect using a thermal relief connection\.

__Example__  
__See also__  
IPCB\_Via interface  
TPlaneConnectionStyle type

__IntersectLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function IntersectLayer \(ALayer : TLayer\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Via interface

__Properties__

__Cache property__

\(IPCB\_Via interface\)  
__Syntax__  
Property Cache : TPadCache Read GetState\_Cache Write SetState\_Cache;  
__Description__  
This Cache property represents  the global cache that stores various design rule settings for pad and via objects\.  
This property is supported by the GetState\_Cache and SetState\_Cache methods\.  
__Example__

01

Var

02

    PadCache : TPadCache;

03

    Via      : IPCB\_Via;

04

    Board    : IPCB\_Board;

05

Begin

06

    \(\* Create a Via object\*\)

07

    Via := PCBServer\.PCBObjectFactory\(eViaObject, eNoDimension, eCreate\_Default\);

08

    Via\.X  := MilsToCoord\(3000\);

09

    Via\.Y  := MilsToCoord\(3000\);

10

11

    \(\* Setup a pad cache \*\)

12

    Padcache := Via\.Cache;

13

    Padcache\.ReliefAirGap := MilsToCoord\(11\);

14

    Padcache\.PowerPlaneReliefExpansion := MilsToCoord\(11\);

15

    Padcache\.PowerPlaneClearance       := MilsToCoord\(11\);

16

    Padcache\.ReliefConductorWidth      := MilsToCoord\(11\);

17

    Padcache\.SolderMaskExpansion       := MilsToCoord\(11\);

18

    Padcache\.SolderMaskExpansionValid  := eCacheManual;

19

    Padcache\.PasteMaskExpansion        := MilsToCoord\(11\);

20

    Padcache\.PasteMaskExpansionValid   := eCacheManual;

21

22

    \(\* Assign the new pad cache to the via\*\)

23

    Via\.Cache := Padcache;

24

    Board\.AddPCBObject\(Via\);

25

End;

__See also__  
IPCB\_Via interface  
PadViaCacheProperties script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder\.  
DrawObjects script from  \\Examples\\Scripts\\DelphiScript Scripts\\PCB\\ folder\.  
CreateAVia script from  \\Examples\\Scripts\\DelphiScript Scripts\\PCB\\ folder\.

__HighLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property HighLayer : TLayer Read GetState\_HighLayer Write SetState\_HighLayer;  
__Description__  
The HighLayer property denotes the top layer\. This property is supported by the GetState\_HighLayer and SetState\_HighLayer methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__HoleSize property__

\(IPCB\_Via interface\)  
__Syntax__  
Property HoleSize : TCoord Read GetState\_HoleSize Write SetState\_HoleSize;  
__Description__  
This HoleSize property denotes the hole size of the via object\. This property is supported by the GetState\_HighLayer and SetState\_HighLayer methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__IsConnectedToPlane property__

\(IPCB\_Via interface\)  
__Syntax__  
Property IsConnectedToPlane\[L : TLayer\] : Boolean Read GetState\_IsConnectedToPlane Write SetState\_IsConnectedToPlane;  
__Description__  
This property determines whether the via is connected to this specified plane or not by returning a boolean value\.  
This property is supported by the GetState\_IsConnectedToPlane and SetState\_IsConnectedToPlane methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__LowLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property LowLayer : TLayer Read GetState\_LowLayer Write SetState\_LowLayer;  
__Description__  
The LowLayer property denotes the bottom layer\. This property is supported by the GetState\_LowLayer and SetState\_LowLayer methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__ShapeOnLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property ShapeOnLayer\[L : TLayer\] : TShape Read GetState\_ShapeOnLayer;  
__Description__  
The via can have different shapes on layers that the via is connected to\. This read only property is supported by the GetState\_ShapeOnLayer method\.  
__Example__  
__See also__  
IPCB\_Via interface  
TShape type  
TLayer type

__Size property__

\(IPCB\_Via interface\)  
__Syntax__  
Property Size : TCoord Read GetState\_Size Write SetState\_Size;  
__Description__  
The Size property denotes the size of the via object \(the full diamater of the via\)\. This property is supported by the GetState\_Size and SetState\_Size methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__SizeOnLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property SizeOnLayer \[L : TLayer\] : TCoord Read GetState\_SizeOnLayer;  
__Description__  
This property denotes the size of the via on a specified layer\. This read only property is supported by the GetState\_SizeOnLayer method\.  
__Example__  
__See also__  
IPCB\_Via interface

__StartLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property StartLayer : IPCB\_LayerObject Read GetState\_StartLayer;  
__Description__  
This property fetches the start layer of IPCB\_LayerObject type that the via is connected to\.  
This read only property is supported by the GetState\_StartLayer method\.  
__Example__  
__See also__  
IPCB\_Via interface  
IPCB\_LayerObject interface

__StopLayer property__

\(IPCB\_Via interface\)  
__Syntax__  
Property StopLayer : IPCB\_LayerObject Read GetState\_StopLayer;  
__Description__  
This property fetches the last layer of IPCB\_LayerObject type that the via is connected to\.  
This read only property is supported by the GetState\_StopLayer method\.  
__Example__  
__See also__  
IPCB\_Via interface  
IPCB\_LayerObject interface

__X property__

\(IPCB\_Via interface\)  
__Syntax__  
Property X : TCoord Read GetState\_XLocation Write SetState\_XLocation;  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. This property is supported by the GetState\_XLocation and SetState\_XLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__Y property__

\(IPCB\_Via interface\)  
__Syntax__  
Property Y : TCoord Read GetState\_YLocation Write SetState\_YLocation;  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. This property is supported by the GetState\_YLocation and SetState\_YLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

<a id="IPCB_Violation_Interface"></a>__IPCB\_Violation Interface__

__Overview__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.

A violation object has a name and its associated description properties, two primitive place holders for binary rules or the first primitive \(Primitive1\) for unary rules\. Check if the second Primitive2 is valid before invoking its methods or properties\.

The IPCB\_Violation hierarchy;  
IPCB\_Primitive  
IPCB\_Violation

__IPCB\_Violation methods__  
GetState\_Name  
GetState\_Rule  
GetState\_Primitive1  
GetState\_Primitive2  
GetState\_Description  
GetState\_ShortDescriptorString  
IsRedundant

__IPCB\_Violation properties__  
Name  
Rule  
Primitive1  
Primitive2  
Description

__See also__  
IPCB\_Primitive interface  
PCB Design Objects  
Violations script in \\__Example__s\\Scripts\\DelphiScript\\PCB folder\.

__GetState and SetState Methods__

__GetState\_Description method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_Description : TPCBString;  
__Description__  
This method returns the violation description that the violation object is associated with\. This method is used for the __Description__ property\.  
The corresponding __GetState\_Name__ method returns the name of this violation\.  
__Example__

1

If Violation <> Nil Then

2

    ShowMessage\('Violation Name : ' \+ Violation\.Name \+ \#13\#10 \+

3

                'Description    : ' \+ Violation\.Description\);

__See also__  
IPCB\_Violation interface

__GetState\_Name method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_Name : TPCBString;  
__Description__  
This method returns the violation name that the violation object is associated with\. The method is used for the __Name__ property\.  
The corresponding __GetState\_Description__ method returns the description of this violation\.  
__Example__

1

If Violation <> Nil Then

2

    ShowMessage\('Violation Name : ' \+ Violation\.Name \+ \#13\#10 \+

3

                'Description    : ' \+ Violation\.Description\);

__See also__  
IPCB\_Violation interface

__GetState\_Primitive1 method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_Primitive1 : IPCB\_Primitive;  
__Description__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.  
A violation object that deals with unary rules only has a valid Primitive1 property\.  
The Primitive2 property is always void for unary rules\.  
Always check if the second property, Primitive2 is valid before invoking its methods or properties\.  
__Example__  
__See also__  
IPCB\_Violation interface

__GetState\_Primitive2 method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_Primitive2 : IPCB\_Primitive;  
__Description__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.  
Note  
A violation object that deals with unary rules only has a valid Primitive1 property thus the Primitive2 property is always void for unary rules\.  
Therefore always check if the second Primitive2 is valid before invoking its methods or properties\.  
__Example__  
__See also__  
IPCB\_Violation interface

__GetState\_Rule method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_Rule : IPCB\_Primitive;  
__Description__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.  
However the __IPCB\_Primitive__ interface actually represents a __IPCB\_Rule__ ancestor object interface\.  
__Example__  
__See also__  
IPCB\_Violation interface

__GetState\_ShortDescriptorString method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function GetState\_ShortDescriptorString : TPCBString;  
__Description__  
This method returns the shortened version of the description string\.  
__Example__  
__See also__  
IPCB\_Violation interface

__Methods__

__IsRedundant method__

\(IPCB\_Violation interface\)  
__Syntax__  
Function IsRedundant : Boolean;  
__Description__  
This method determines whether the object is redundant \(unused object\) on the PCB document or not\.  
__Example__  
__See also__  
IPCB\_Violation interface

__Properties__

__Rule property__

\(IPCB\_Violation interface\)  
__Syntax__  
Property Rule : IPCB\_Primitive Read GetState\_Rule;  
__Description__  
This Rule property returns a rule object encapsulated by the __IPCB\_Primitive__ interface\. However the __IPCB\_Primitive__ interface actually represents a __IPCB\_Rule__ ancestor object interface\.  
__Example__

01

// Create an iterator to look for violation objects only\.

02

Iterator := Board\.BoardIterator\_Create;

03

Iterator\.AddFilter\_ObjectSet\(MkSet\(eViolationObject\)\);

04

Iterator\.AddFilter\_LayerSet\(AllLayers\);

05

Iterator\.AddFilter\_Method\(eProcessAll\);

06

07

// search for violations

08

Violation := Iterator\.FirstPCBObject;

09

While Violation <> Nil Do

10

Begin

11

    S := 'Violation Name: ' \+ Violation\.Name \+ '  \+\#13\#10 \+ 

12

         'Description: '    \+ Violation\.Description\);

13

14

    //Get design rule associated with the current violation object

15

    Rule := Violation\.Rule;

16

    If Rule <> Nil Then

17

        ShowMessage\(S \+ \#13\#10 \+ '  Rule Name: ' \+ Rule\.Name\);

18

19

    S := '';

20

    Violation := Iterator\.NextPCBObject;

21

End;

22

Board\.BoardIterator\_Destroy\(Iterator\);

__See also__  
IPCB\_Violation interface  
IPCB\_Rule interface

__Primitive1 property__

\(IPCB\_Violation interface\)  
__Syntax__  
Property Primitive1 : IPCB\_Primitive Read GetState\_Primitive1;  
__Description__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.  
A violation object that deals with unary rules only has a valid Primitive1 property\.  
__Notes__  
The Primitive2 property is always void for unary rules, therefore check if the second Primitive2 is valid before invoking its methods or properties\.  
A read only property  
__Example__

01

// First pcb object associated with a unary/binary design rule\.

02

PCB1Object := Violation\.Primitive1;

03

04

// Second pcb object associated with a binary design rule\.

05

// however there are unary and binary rules, thus, for unary rules,

06

// there will only be one rule object in violation associated with the violation

07

PCB2Object := Violation\.Primitive2;

08

If PCB2Object <> Nil Then

09

Begin

10

    // do what you want with the second object

11

End;

__See also__  
IPCB\_Violation interface

__Primitive2 property__

\(IPCB\_Violation interface\)  
__Syntax__  
Property Primitive2 : IPCB\_Primitive Read GetState\_Primitive2;  
__Description__  
A Violation object captures the rule that has been violated between two PCB objects that are affected by a binary design rule or a PCB object affected by a unary design rule detected in the PCB editor, with the description of the violation and the type of rule used\.  
A violation object that deals with unary rules only has a valid Primitive1 property\.  
The Primitive2 property is always void for unary rules\.  
Check if the second Primitive2 is valid before invoking its methods or properties\.  
A read only property\.  
__Example__

01

// First pcb object associated with a unary/binary design rule\.

02

PCB1Object := Violation\.Primitive1;

03

04

// Second pcb object associated with a binary design rule\.

05

// however there are unary and binary rules, thus, for unary rules,

06

// there will only be one rule object in violation associated with the violation

07

PCB2Object := Violation\.Primitive2;

08

If PCB2Object <> Nil Then

09

Begin

10

    // do what you want with the second object

11

End;

__See also__  
IPCB\_Violation interface

__Name property__

\(IPCB\_Violation interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Name;  
__Description__  
This property returns the violation name that the violation object is associated with\. The corresponding __Description__ property returns the description of this violation \(if any\)\.  
This is a read only property\.  
__Example__

1

If Violation <> Nil Then

2

    ShowMessage\('Violation Name : ' \+ Violation\.Name \+ \#13\#10 \+

3

                'Description    : ' \+ Violation\.Description\);

__See also__  
IPCB\_Violation interface  
__Description__ property

__Description property__

\(IPCB\_Violation interface\)  
__Syntax__  
Property Description : TPCBString Read GetState\_Description;  
__Description__  
This property returns the violation description that the violation object is associated with\. The corresponding __Name__ property returns the name of this violation\. This property is supported by the __GetState\_Description__ method\.  
This is a read only property\.  
__Example__

1

If Violation <> Nil Then

2

    ShowMessage\('Violation Name : ' \+ Violation\.Name \+ \#13\#10 \+

3

                'Description    : ' \+ Violation\.Description\);

__See also__  
IPCB\_Violation interface  
Name property

<a id="IPCB_ContourPoint_Interface"></a>__IPCB\_ContourPoint Interface__

__Overview__  
The __IPCB\_ContourPoint__ interface hierarchy is as follows:

__IPCB\_ContourPoint methods__  
GetState\_X  
SetState\_X  
GetState\_Y  
SetState\_Y

__IPCB\_ContourPoint properties__  
X  
Y

__See also__

__Methods__

__SetState\_Y method__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Procedure SetState\_Y \(AY : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

__SetState\_X method__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Procedure SetState\_X \(AX : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

__GetState\_Y method__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Function GetState\_Y : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

__GetState\_X method__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Function GetState\_X : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

__Properties__

__X property__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Property X : TCoord Read GetState\_X Write SetState\_X;  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

__Y property__

\(IPCB\_ContourPoint interface\)  
__Syntax__  
Property Y : TCoord Read GetState\_Y Write SetState\_Y;  
__Description__  
__Example__  
__See also__  
IPCB\_ContourPoint interface

<a id="IPCB_Contour_Interface"></a>__IPCB\_Contour Interface__

__Overview__  
The __IPCB\_Contour__ interface hierarchy is as follows:

__IPCB\_Contour methods__  
GetState\_Rotation  
SetState\_Rotation  
GetState\_CX  
SetState\_CX  
GetState\_CY  
SetState\_CY  
GetState\_Point  
GetState\_Count  
Clear  
AddPoint  
InsertPoint  
AddContour  
AddArc  
GetGPCVertexList  
FillGPCVertexList  
I\_ObjectAddress

__IPCB\_Contour properties__  
Rotation  
CX  
CY  
Points  
Count

__See also__

__Methods__

__Clear method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure Clear;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__AddPoint method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure AddPoint\(x, y : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__AddContour method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure AddContour\(Const C : IPCB\_Contour; Const i1, i2 : Integer\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__AddArc method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure AddArc\(StartAngle, EndAngle : Double; cx, cy : TCoord; Radius : TCoord;AClockwise : Boolean = False\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__InsertPoint method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure InsertPoint\(Index : Integer; x, y : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__I\_ObjectAddress method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
This function returns the true pointer value of the object interface of a design object\.  
__Notes__  
The IPCB\_ServerInterface\.SendMessageToRobots method needs the I\_ObjectAddress parameter of a design object\.  
__Example__

1

//Notify PCB that the fill object is going to be changed\.

2

PCBServer\.SendMessageToRobots\(

3

        Fill\.I\_ObjectAddress, 

4

        c\_Broadcast, 

5

        PCBM\_BeginModify , 

6

        c\_NoEventData\);

__See also__  
IPCB\_Contour interface

__GetState\_Point method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function GetState\_Point \(I : Integer\) : IPCB\_ContourPoint;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__GetState\_Count method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function GetState\_Count : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__GetGPCVertexList method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure GetGPCVertexList \(Const AContour : Pgpc\_vertex\_list\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__FillGPCVertexList method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure FillGPCVertexList\(Const AContour : Pgpc\_vertex\_list\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__SetState\_Rotation method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure SetState\_Rotation \(ARotation : TAngle\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__SetState\_CY method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure SetState\_CY \(ACY : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__SetState\_CX method__

\(IPCB\_Contour interface\)  
__Syntax__  
Procedure SetState\_CX \(ACX : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__GetState\_Rotation method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function GetState\_Rotation : TAngle;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__GetState\_CY method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function GetState\_CY : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__GetState\_CX method__

\(IPCB\_Contour interface\)  
__Syntax__  
Function GetState\_CX : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__Properties__

__Rotation property__

\(IPCB\_Contour interface\)  
__Syntax__  
Property Rotation : TAngle Read GetState\_Rotation Write SetState\_Rotation;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__Points property__

\(IPCB\_Contour interface\)  
__Syntax__  
Property Points\[I : Integer\] : IPCB\_ContourPoint Read GetState\_Point;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__CY property__

\(IPCB\_Contour interface\)  
__Syntax__  
Property CY : TCoord Read GetState\_CY Write SetState\_CY;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__CX property__

\(IPCB\_Contour interface\)  
__Syntax__  
Property CX : TCoord Read GetState\_CX Write SetState\_CX;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

__Count property__

\(IPCB\_Contour interface\)  
__Syntax__  
Property Count : Integer Read GetState\_Count;  
__Description__  
__Example__  
__See also__  
IPCB\_Contour interface

<a id="IPCB_ContourMaker_Interface"></a>__IPCB\_ContourMaker Interface__

__Overview__

__IPCB\_ContourMaker methods__  
MakeContour  
DestroyPolygon

__IPCB\_ContourMaker properties__

__See also__  
IPCB\_Contour interface

__Methods__

__IPCB\_MakeContour method__

\(IPCB\_ContourMaker interface\)  
__Syntax__  
Function MakeContour\(APrim   : IPCB\_Primitive; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(ATrack  : IPCB\_Track    ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(APad    : IPCB\_Pad      ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(AFill   : IPCB\_Fill     ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(AVia    : IPCB\_Via      ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(AArc    : IPCB\_Arc      ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(ARegion : IPCB\_Region   ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(AText   : IPCB\_Text     ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
Function MakeContour\(APoly   : IPCB\_Polygon  ; AExpansion : TCoord; ALayer : TLayer\) : Pgpc\_Polygon;  
__Description__  
__Example__  
__See also__  
IPCB\_ContourMaker interface

<a id="Dimension_Object_Interfaces"></a>__Dimension Object Interfaces__

__IPCB\_OriginalDimension__

__Overview__  
The IPCB\_OriginalDimension interface represents the dimensioning information on the current PCB layer\. The dimension value is the distance between the start and end markers, measured in the default units\. Note that the original dimension object has been superseded by a new set of dimension objects  
__Notes__  
The IPCB\_OriginalDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_OriginalDimension  
__IPCB\_OriginalDimension Methods__  
Function  Text    : IPCB\_Text;       
Function  Track1  : IPCB\_Primitive;  
Function  Track2  : IPCB\_Primitive;  
Function  Track3  : IPCB\_Primitive;  
Function  Track4  : IPCB\_Primitive;  
Function  Track5  : IPCB\_Primitive;  
Function  Track6  : IPCB\_Primitive;  
Function  Track7  : IPCB\_Primitive;  
Function  Track8  : IPCB\_Primitive;  
__See also__  
IPCB\_Dimension interface  
PCB Design Objects

__IPCB\_Dimension__

__Overview__  
Dimension objects are used for dimensional details of a PCB board in either imperial or metric units and can be placed on any layer\.  To create an original Dimension objects, use the IPCB\_OriginalDimension class which is used in P99SE and earlier versions\.  
Altium Designer introduced several new dimension styles \- Linear, Angular, Radial, Leader, Datum, Baseline, Center, Linear Diameter and Radial Diameter objects  
__Notes__  
The IPCB\_Dimension interface is the ancestor interface for IPCB\_OriginalDimension, IPCB\_LinearDImension, IPCB\_AngularDimension, IPCB\_RadialDimension, IPCB\_LeaderDimension, IPCB\_DatumDimension, IPCB\_BaselineDimension, IPCB\_CenterDimension, IPCB\_LinearDiameterDimension, IPCB\_RadialDiameterDimension interfaces\.  
The DimensionKind property determines the type a dimension object is\.  
A dimension object especially a baseline or a leader dimension has multiple reference points\. The references \(a reference consists of a record of an object along with its x and y coordinate point, an anchor and is a start or end marker\)\.  A reference point is either the start or end marker and the length of two reference points is the dimensional length\.

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__IPCB\_Dimension Methods__  
Procedure MoveTextByXY \(AX,  
                        AY    : TCoord\);  
Procedure MoveTextToXY \(AX,  
                        AY    : TCoord\);  
Procedure RotateAroundXY\(AX,  
                         AY    : TCoord;  
                         Angle : TAngle\);  
Procedure References\_Add\(R : TDimensionReference\);  
Procedure References\_Delete\(Index : Integer\);  
Procedure References\_DeleteLast;  
Function  References\_IndexOf\(P     : IPCB\_Primitive;  
                             Index : Integer\) : Integer;  
Function  References\_Validate : Boolean;  
Procedure ResetPrefixIfNeeded;  
__IPCB\_Dimension Properties__  
DimensionKind      : TDimensionKind            
TextX              : TCoord                    
TextY              : TCoord                    
X1Location         : TCoord                    
Y1Location         : TCoord                    
Size               : TCoord                    
LineWidth          : TCoord                    
TextHeight         : TCoord                    
TextWidth          : TCoord                    
TextFont           : TFontID                   
TextLineWidth      : TCoord                    
TextPosition       : TDimensionTextPosition    
TextGap            : TCoord                    
TextFormat         : TPCBString                   
TextDimensionUnit  : TDimensionUnit            
TextPrecision      : Integer                   
TextPrefix         : TPCBString                   
TextSuffix         : TPCBString                   
TextValue          : TReal                     
ArrowSize          : TCoord                    
ArrowLineWidth     : TCoord                    
ArrowLength        : TCoord                    
ArrowPosition      : TDimensionArrowPosition   
ExtensionOffset    : TCoord                    
ExtensionLineWidth : TCoord                    
ExtensionPickGap   : TCoord                    
Style              : TUnitStyle                
References \[I : Integer\] : TDimensionReference  
References\_Count         : Integer // Read only  
UseTTFonts                        : Boolean     
Bold                              : Boolean     
Italic                            : Boolean     
FontName                          : TPCBString  
__See also__  
IPCB\_Primitive interface  
TDimensionTextPosition enumerated values  
TDimensionUnit enumerated values  
TDimensionArrowPosition enumerated values  
TDimensionReference enumerated values  
TUnitStyle enumerated values  
PCB Design Objects

__IPCB\_AngularDimension__

__Overview__  
The IPCB\_AngularDimension object interface allows for the dimensioning of angular distances\. There are four references \(two reference points associated with two reference objects\) which need to be defined and the dimension text is then placed\. The references may be tracks, fills, or polygons\.  
__Notes__  
The IPCB\_AngularDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_AngularDimension  
The Radius property denotes the radius size of the IPCB\_AngularDimension object\.  
The Sector property denotes which sector the IPCB\_AngularDimension is using\. Sector 1 is the angle between 0 – 90 degrees\. 2 = 90 – 180 degrees\. 3 = 180 =270 degrees\. 4 = 270 = 360 or 0 degrees\.  
__IPCB\_AngularDimension Methods__  
Function  Text              : IPCB\_Text;   
Function  Arc1              : IPCB\_Arc;    
Function  Arc2              : IPCB\_Arc;    
Function  Arrow1\_Track1     : IPCB\_Track;  
Function  Arrow1\_Track2     : IPCB\_Track;  
Function  Arrow2\_Track1     : IPCB\_Track;  
Function  Arrow2\_Track2     : IPCB\_Track;  
Function  Extension1\_Track  : IPCB\_Track;  
Function  Extension2\_Track  : IPCB\_Track;  
__IPCB\_AngularDimension Properties__  
Property Radius  : TCoord   
Property Sector  : Integer  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
IPCB\_Text interface  
IPCB\_Arc interface  
PCB Design Objects

__IPCB\_BaselineDimension__

__Overview__  
The IPCB\_BaselineDimension interface allows for the dimensioning of a linear distance of a collection of references, relative to a single reference\. The first reference point is the base reference and all the subsequent points are relative to this base reference\. The dimension value in each case is the distance between each reference point and the base reference measured in default units\. The references may be objects \(tracks, arcs, pads, vias, text, fills, polygons or components\) or points in free space\.

__Notes__  
The IPCB\_BaselineDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_BaselineDimension

The angle property denotes the angle or rotation of the IPCB\_BaselineDimension object with respect to the horizontal plane\.  
Since a baseline dimension allows for the dimensioning of a linear distance over a collection of references, thus for each reference relative to the base reference, there is a text location\. Use the TextLocationsCount field to obtain the number of  dimension labels\.

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__IPCB\_BaselineDimension Methods__  
Function  Text       : IPCB\_Text;   
Function  Texts        \(I : Integer\) : IPCB\_Text;   
Function  Arrow1\_Track1\(I : Integer\) : IPCB\_Track;   
Function  Arrow1\_Track2\(I : Integer\) : IPCB\_Track;   
Function  Arrow2\_Track1\(I : Integer\) : IPCB\_Track;   
Function  Arrow2\_Track2\(I : Integer\) : IPCB\_Track;   
Function  Line\_Track1  \(I : Integer\) : IPCB\_Track;  
Function  Line\_Track2  \(I : Integer\) : IPCB\_Track;   
Function  Extension1\_Track \(I : Integer\) : IPCB\_Track;   
Function  Extension2\_Track \(I : Integer\) : IPCB\_Track;   
Procedure TextLocations\_Add   \(Point : TCoordPoint\);:  
Procedure TextLocations\_Delete\(Index : Integer\);      
Procedure TextLocations\_DeleteLast;  
Procedure TextLocations\_Clear;

__IPCB\_BaselineDimension Properties__  
Property Angle                       : TAngle  
Property TextLocations \[I : Integer\] : TCoordPoint  
Property TextLocationsCount          : Integer  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
IPCB\_Text interface  
PCB Design Objects

__IPCB\_CenterDimension__

__Overview__  
The IPCB\_CenterDimension object interface allows for the center of an arc or circle to be marked  
__Notes__  
The IPCB\_CenterDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_CenterDimension  
The angle property denotes the angle or rotation of the IPCB\_CenterDimension object with respect to the horizontal plane\.  
__IPCB\_CenterDimension Methods__  
Function  Cross\_Vertical\_Track   : IPCB\_Track;  
Function  Cross\_Horizontal\_Track : IPCB\_Track;  
__IPCB\_CenterDimension Properties__  
Property Angle : TAngle  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
PCB Design Objects

__IPCB\_DatumDimension__

__Overview__  
The IPCB\_DatumDimension interface references the dimensioning of a linear distance of a collection of objects, relative to a single object\. The dimension value is the distance between each reference object and the base object measured in the default units\. The references may be tracks, arcs, pads, vias, text, fills, polygons or components\.  
__Notes__  
The IPCB\_DatumDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_DatumDimension  
__IPCB\_DatumDimension Methods__  
Function  Text                              : IPCB\_Text;   
Function  Texts           \(I     : Integer\) : IPCB\_Text;   
Function  Extension\_Track \(I     : Integer\) : IPCB\_Track;  
__IPCB\_DatumDimension Properties__  
Property Angle : TAngle  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
IPCB\_Text interface  
PCB Design Objects

__IPCB\_LeaderDimension__

__Overview__  
The IPCB\_LeaderDimension object interface allows for the labeling of an object, point or area\. There are three types of leader dimensions available which reflect the label text either being encapsulated by a circle or square or not at all\. The pointer can also be an arrow or a dot which is size \-definable\.

__Notes__  
The IPCB\_LeaderDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_LeaderDimension

There are three types of leaders available: eNoShape = standard leader which means the dimension text is not enclosed at all\. eRectangular  the label text is encapsulated by a square, and eRounded – the dimension text is encapsulated by a circle\.  
The Dot property denotes the dot symbol attached to the pointer of the leader dimension object as a dot or as an arrow\.  
If the Dot field is enabled, then you can specify the size of the dot as a TCoord value\.  
__IPCB\_LeaderDimension Methods__  
Function  Text            : IPCB\_Text;            
Function  Dot\_Arc         : IPCB\_Arc;             
Function  Circle\_Arc      : IPCB\_Arc;             
Function  Arrow\_Track1    : IPCB\_Track;           
Function  Arrow\_Track2    : IPCB\_Track;           
Function  Square\_Track1   : IPCB\_Track;           
Function  Square\_Track2   : IPCB\_Track;           
Function  Square\_Track3   : IPCB\_Track;           
Function  Square\_Track4   : IPCB\_Track;           
Function  Line\_Track \(I : Integer\) : IPCB\_Track;  
__IPCB\_LeaderDimension Properties__  
Property Shape    : TShape  
Property Dot      : Boolean  
Property DotSize  : TCoord  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
IPCB\_Text interface  
IPCB\_Arc interface  
PCB Design Objects

__IPCB\_LinearDiameterDimension__

__Overview__  
The IPCB\_LinearDimension interface references the dimensioning information on the current layer with respect to a linear distance\. The dimension value is the distance between the start and end markers \(reference points\) measured in the default units\. The references may be objects \(tracks, arcs, pads, vias, text fills, polygons or components\) or points in free space\.  
__Notes__  
The IPCB\_LinearDiameterDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_LinearDiameterDimension  
__Immediate ancestor IPCB\_LinearDimension Methods__  
Function  Text               : IPCB\_Text;   
Function  Arrow1\_Track1      : IPCB\_Track;  
Function  Arrow1\_Track2      : IPCB\_Track;  
Function  Arrow2\_Track1      : IPCB\_Track;  
Function  Arrow2\_Track2      : IPCB\_Track;  
Function  Line\_Track1        : IPCB\_Track;  
Function  Line\_Track2        : IPCB\_Track;  
Function  Extension1\_Track   : IPCB\_Track;  
Function  Extension2\_Track   : IPCB\_Track;  
__Immediate ancestor IPCB\_LinearDimension Properties__  
Property Angle : TAngle  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
PCB Design Objects

__IPCB\_LinearDimension__

__Overview__  
The IPCB\_LinearDimension object interface places dimensioning information on the current layer with respect to a linear distance\. The dimension value is the distance between the start and end markers \(reference points\) measured in the default units\. The references may be objects \(tracks, arcs, pads, vias, text fills, polygons or components\) or points in free space\.  
IPCB\_LinearDimension object interface has no introduced methods and properties, therefore refer to the IPCB\_Dimension interface object entry for details\.  
__Notes__  
The IPCB\_LinearDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_LinearDimension  
The angle property denotes the angle or rotation of the TPCBLinearDimension object with respect to the horizontal plane\.  
__IPCB\_LinearDimension Methods__  
Function  Text             : IPCB\_Text;  
Function  Arrow1\_Track1    : IPCB\_Track;  
Function  Arrow1\_Track2    : IPCB\_Track;  
Function  Arrow2\_Track1    : IPCB\_Track;  
Function  Arrow2\_Track2    : IPCB\_Track;  
Function  Line\_Track1      : IPCB\_Track;  
Function  Line\_Track2      : IPCB\_Track;  
Function  Extension1\_Track : IPCB\_Track;  
Function  Extension2\_Track : IPCB\_Track;  
__IPCB\_LinearDimension Properties__  
Property Angle : TAngle  
__See also__  
IPCB\_Dimension interface  
PCB Design Objects

__IPCB\_RadialDimension__

__Overview__  
The IPCB\_RadialDimension object interface allows for the dimensioning of a radius with respect to an arc or a circle\. The dimension can be placed internally or externally on an arc or a circle\.  
__Notes__  
The IPCB\_RadialDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_RadialDimension  
This field shows the current angular step setting for the dimension\. This is the rotation step used when placing the arrow portion of the dimension\. Moving the arrow around the circle or arc during placement of the dimension, the number and position of possible places to anchor the dimension are determined by this angular step value\.  
__IPCB\_RadialDimension Methods__  
Function  Text         : IPCB\_Text;   
Function  Arrow\_Track1 : IPCB\_Track;  
Function  Arrow\_Track2 : IPCB\_Track;  
Function  Line1\_Track  : IPCB\_Track;  
Function  Line2\_Track  : IPCB\_Track;  
__IPCB\_RadialDimension Property__  
Property AngleStep : TAngle  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
IPCB\_Text interface  
PCB Design Objects

__IPCB\_RadialDiameterDimension__

__Overview__  
The IPCB\_RadialDiameterDimension interface references the dimensioning of an arc or circle with respect to the diameter, rather than the radius\. The dimension can be placed either internally or externally with respect to the arc or circle  
__Notes__  
The IPCB\_RadialDiameterDimension interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Dimension  
IPCB\_RadialDiameterDimension  
__IPCB\_RadialDiameterDimension Methods__  
Function  Arrow2\_Track1  : IPCB\_Track;  
Function  Arrow2\_Track2  : IPCB\_Track;  
Function  Line3\_Track    : IPCB\_Track;  
__See also__  
IPCB\_Dimension interface  
IPCB\_Track interface  
PCB Design Objects

<a id="PCB_Rule_Objects_Interfaces"></a>__PCB Rule Objects Interfaces __

The PCB editor incorporates a large set of design rules to help define compliance/constraints regarding the placement of PCB objects, routing methods, and netlists\.

These rules include clearances, object geometry, impedance control, routing priority, routing topology and parallelism\. Rule scope is the extent of each rule determined\.  The scope allows you to define the set of target objects that a particular instance of a rule is to be applied to\.

__See also__  
Rule ancestor interface  
Acute Angle rule interface  
Broken Nets rule interface  
Clearance rule interface  
Confinement Constraint rule interface  
Component Clearance rule interface  
Component Rotations rule interface  
Daisy Chain Stub Length rule interface  
Differential Pairs Routing rule interface  
Fanout Control rule interface  
Layer Pair rule interface  
Layer Stack rule interface  
Matched Lengths rule interface  
Max Min Width rule interface  
Max Min Length rule interface  
Max Min Hole Size rule interface  
Maximum Via Count rule interface  
Minimum Annular Ring rule interface  
NetsToIgnore rule interface  
Parallel Segment rule interface  
Paste Mask Expansion rule interface  
Power Plane Connect Style rule interface  
Power Plane Clearance rule interface  
Polygon Connect Style rule interface  
Permitted Layers rule interface  
Routing Topology rule interface  
Routing Priority rule interface  
Routing Layers rule interface  
Routing Corner Style rule interface  
Routing Via Style rule interface  
SMD To Plane rule interface  
SMD Neck Down rule interface  
SMD To Corner rule interface  
Solder Mask Expansion rule interface  
Short Circuit rule interface  
Test Point Style rule interface  
Test Point Usage rule interface  
Vias Under SMD rule interface  
Unconnected Pin rule interface  
Signal Integrity Rules  
FlightTime\_RisingEdge rule interface  
FlightTime\_FallingEdge rule interface  
MaxMinImpedance rule interface  
MaxSlope\_RisingEdge rule interface  
MaxSlope\_FallingEdge rule interface  
Overshoot\_FallingEdge rule interface  
Overshoot\_RisingEdge rule interface  
SignalTopValue rule interface  
SignalBaseValue rule interface  
SignalStimulus rule interface  
SupplyNets rule interface  
Undershoot\_FallingEdge rule interface  
Undershoot\_RisingEdge rule interface

<a id="IPCB_Rule"></a>__IPCB\_Rule__

__Overview__  
The IPCB\_Rule interface object encapsulates an existing PCB design rule in an opened PCB document in Altium Designer\. Each design rule has its own Unique ID\. To set the scope of a rule, unary or binary scope expressions are defined\.

The PCB editor incorporates a large set of design rules to help define compliance/constraints regarding the placement of PCB objects, routing methods, and netlists\. These rules include clearances, object geometry, impedance control, routing priority, routing topology and parallelism\. Rule scope is the extent of each rule determined\.  The scope allows you to define the set of target objects that a particular instance of a rule is to be applied to\.

__IPCB\_Rule Methods__  
Function  Priority                  : TRulePrecedence;  
Function  ScopeKindIsValid  \(AScopeKind  : TScopeKind\)          : Boolean;  
Function  Scope1Includes    \(P           : IPCB\_Primitive\)      : Boolean;  
Function  Scope2Includes    \(P           : IPCB\_Primitive\)      : Boolean;  
Function  NetScopeMatches   \(P1,  
                             P2          : IPCB\_Primitive\)      : Boolean;  
Function  CheckBinaryScope  \(P1,  
                             P2          : IPCB\_Primitive\)      : Boolean;  
Function  CheckUnaryScope   \(P           : IPCB\_Primitive\)      : Boolean;  
Function  GetState\_DataSummaryString     : TPCBString;  
Function  GetState\_ShortDescriptorString : TPCBString;  
Function  GetState\_ScopeDescriptorString : TPCBString;  
Function  ActualCheck               \(P1,  
                                     P2  : IPCB\_Primitive\)      : IPCB\_Violation;  
__IPCB\_Rule Properties__  
Property Scope1Expression : TPCBString  
Property Scope2Expression : TPCBString  
Property RuleKind         : TRuleKind       
Property NetScope         : TNetScope       
Property LayerKind        : TRuleLayerKind  
Property Comment          : TPCBString         
Property Name             : TPCBString         
Property DRCEnabled       : Boolean         
Property UniqueId         : TPCBString       //Read only  
Enumerated Types  
PCB Design Rules  
IPCB\_Violation interface  
TScopeKind  
TNetScope  
TRuleKind  
TRuleLayerKind

<a id="IPCB_AcuteAngle_rule"></a>__IPCB\_AcuteAngle rule__

__Overview__  
The IPCB\_AcuteAngleRule interface specifies the minimum angle permitted at a track corner\.  
__IPCB\_AcuteAngle Properties__  
Minimum : TAngle

<a id="IPCB_BrokenNetRule_rule"></a>__IPCB\_BrokenNetRule rule__

__Overview__  
The IPCB\_BrokenNetRule rule deals with broken nets in relation to polygons\. Polygons that are affected by the broken net rules are highlighted or not\.  
__IPCB\_BrokenNetRule Properties__  
HighlightPolygons : Boolean

<a id="IPCB_ComponentClearanceConstraint_rule"></a>__IPCB\_ComponentClearanceConstraint rule__

__Overview__  
The Component Clearance Constraint PCB Design rule has available Check Mode setting:

- Quick Check – uses a components’ bounding rectangle to define its shape\. The bounding rectangle is the smallest rectangle that encloses all the primitives that make up a component\.
- Multi Layer Check – also uses a component bounding rectangle, but considers through\-hole component pads on a board with components on both sides, allowing surface mount components to be placed under a through\-hole component\.
- Full Check – uses the exact shape that encloses all the primitives that make up each component\. Use this option if the design includes a large number of circular or irregular shaped components\.

__IPCB\_ComponentClearanceConstraint Properties__  
Property Gap                : TCoord  
Property VerticalGap        : TCoord  
Property CollisionCheckMode : TComponentCollisionCheckMode  
__See also__  
TComponentCollisionCheckMode

<a id="IPCB_ComponentRotationsRule_rule"></a>__IPCB\_ComponentRotationsRule rule__

__Overview__  
The IPCB\_ComponentRotationsRule specifies allowable component orientations\. Multiple orientations are permitted, allowing the autoplacer to use any of the enabled orientations\. The allowed component orientations are: 0,90,180, 270, or AllRotations\. It is possible to have multiple settings, for example setting at 0 and 270 degrees rotations only\.  
__IPCB\_ComponentRotationsRule Properties__  
Property AllowedRotations : Integer

<a id="IPCB_ConfinementConstraint_rule"></a>__IPCB\_ConfinementConstraint rule__

__Overview__  
The IPCB\_ConfinementConstraint interface specifies a rectangular region in which a set of objects is either allowed, or not allowed\. Use this function to define a region that a class of components must be placed in\.  
__IPCB\_ConfinementConstraint Methods__  
Procedure RotateAroundXY \(AX,  
                          AY    : TCoord;  
                          Angle : TAngle\);  
__IPCB\_ConfinementConstraint Properties__  
Property X            : TCoord             
Property Y            : TCoord             
Property Kind         : TConfinementStyle  
Property Layer        : TLayer             
Property BoundingRect : TCoordRect       

<a id="IPCB_ClearanceConstraint_Rule"></a>__IPCB\_ClearanceConstraint Rule__

__Overview__  
This interface defines the minimum clearance between any two primitive objects on a copper layer\.  
__Notes__  
The PrimitivesViolate function checks if two primitives violate the minimum clearance or not\.  
The Gap property determines the gap size of the track segments\.  
__IPCB\_ClearanceConstraint Methods__  
Function  PrimitivesViolate\(P1, P2  : IPCB\_Primitive\) : Boolean;   
__IPCB\_ClearanceConstraint Properties__  
Property Gap  : TCoord

<a id="IPCB_DaisyChainStubLengthConstraint_rule"></a>__IPCB\_DaisyChainStubLengthConstraint rule__

__Overview__  
The daisy chain stub length rule specifies the maximum permissible stub length for a net with a daisy chain topology\.  
__Notes__  
Limit property for the stub length\.  
__IPCB\_DaisyChainStubLengthConstraint Properties__  
Property Limit : TCoord

<a id="IPCB__DifferentialPairsRoutingRule_Inter"></a>__IPCB\_ DifferentialPairsRoutingRule Interface__

__Overview__  
A differential signaling system is one where a signal is transmitted down a pair of tightly coupled carriers, one of these carrying the signal, the other carrying an equal but opposite image of the signal\. Differential signaling was developed to cater for situations where the logic reference ground of the signal source could not be well connected to the logic reference ground of the load\. Differential signaling is inherently immune to common mode electrical noise, the most common interference artifact present in an electronic product\. Another major advantage of differential signaling is that it minimizes electromagnetic interference \(EMI\) generated from the signal pair\.

Differential pair routing is a design technique employed to create a balanced transmission system able to carry differential \(equal and opposite\) signals across a printed circuit board\. Typically this differential routing will interface to an external differential transmission system, such as a connector and cable\.

It is important to note that while the coupling ratio achieved in a twisted pair differential cable may be better than 99%, the coupling achieved in differential pair routing will typically be less than 50%\. Current expert opinion is that the PCB routing task is not to try to ensure a specific *differential impedance *is achieved, rather the objective is to maintain the properties required to ensure the differential signal arrives in good condition at the target component as it travels from the external cabling\.

__Notes__  
The IPCB\_DifferentialPairsRoutingRule Interface hierarchy is as follows:  
IPCB\_Rule  
IPCB\_DifferentialPairsRoutingRule  
This interface defines the minimum clearance between any two primitive objects on a copper layer\.  
__Notes__  
The PrimitivesViolate function checks if two primitives violate the minimum clearance or not\.  
The Gap property determines the gap size of the track segments\.  
__IPCB\_DifferentialPairsRoutingRule Methods__  
Function  GetState\_MaxGap            \(Const L : TLayer\) : TCoord;  
Function  GetState\_MinGap            \(Const L : TLayer\) : TCoord;  
Function  GetState\_PreferedGap       \(Const L : TLayer\) : TCoord;  
Function  GetState\_MaxUncoupledLength : TCoord;   

Procedure SetState\_MaxGap            \(Const L : TLayer;  
                                      Value   : TCoord\);   
Procedure SetState\_MinGap            \(Const L : TLayer;  
                                      Value   : TCoord\);   
Procedure SetState\_PreferedGap       \(Const L : TLayer;  
                                      Value   : TCoord\);   
Procedure SetState\_MaxUncoupledLength\(Value   : TCoord\);  
__IPCB\_DifferentialPairsRoutingRule Properties__  
Property  MaxGap     \[Const L : TLayer\]  : TCoord  Read GetState\_MaxGap Write SetState\_MaxGap;  
Property  MinGap     \[Const L : TLayer\]  : TCoord  Read GetState\_MinGap Write SetState\_MinGap;  
Property  PreferedGap\[Const L : TLayer\]  : TCoord  Read GetState\_PreferedGap Write SetState\_PreferedGap;  
Property  MaxUncoupledLength             : TCoord  Read GetState\_MaxUncoupledLength Write SetState\_MaxUncoupledLength;  
__See also__  
PCB Design Objects

<a id="IPCB_FanoutControlRule_rule"></a>__IPCB\_FanoutControlRule rule__

__Overview__  
The IPCB\_FanoutControl rule determines how BGAs on a PCB document is going to be fanned in respect to vias placement for routing\.  
__IPCB\_FanoutControlRule Properties__  
Property FanoutStyle        : TFanoutStyle  
Property FanoutDirection    : TFanoutDirection  
Property BGAFanoutDirection : TBGAFanoutDirection  
Property BGAFanoutViaMode   : TBGAFanoutViaMode  
Property ViaGrid            : TCoord

<a id="IPCB_LayerPairsRule_rule"></a>__IPCB\_LayerPairsRule rule__

__Overview__  
The IPCB\_LayerPairsRule interface deals with whether the layer pairs are going to be enforced or not on the current PCB document\.  
__IPCB\_LayerPairsRule Properties__  
Property EnforceLayerPairs : Boolean

<a id="IPCB_MatchedNetLengthsConstraint_rule"></a>__IPCB\_MatchedNetLengthsConstraint rule__

__Overview__  
The matched net lengths rule specifies the degree to which nets can have different lengths\.  
__Notes__  
The 90 degree style is the most compact and the Rounded style is the least compact\.  
__IPCB\_MatchedNetLengthsConstraint Methods__  
Function  MatchLengthForFromTo\(P1,P2 : IPCB\_Primitive\) : IPCB\_Violation;  
Function  MatchLengthForNet   \(P1,P2 : IPCB\_Primitive\) : IPCB\_Violation;  
__IPCB\_MatchedNetLengthsConstraint Properties__  
Property Amplitude : TCoord  
Property Gap       : TCoord  
Property Style     : TLengthenerStyle  
Property Tolerance : TCoord

<a id="IPCB_MaxMinHeightConstraint_rule"></a>__IPCB\_MaxMinHeightConstraint rule__

__Overview__  
The IPCB\_MaxMinHeightConstraint rule deals with heights of components, and you can set the maximum, minimum and preferred height values for targeted components on a PCB document\.  
__Notes__  
MaxHeight, MinHeight and PreferedHeight properties\.  
__IPCB\_MaxMinHeightConstraint Properties__  
Property MaxHeight      : TCoord  
Property MinHeight      : TCoord  
Property PreferedHeight : TCoord

<a id="IPCB_MaxMinHoleSizeConstraint_rule"></a>__IPCB\_MaxMinHoleSizeConstraint rule__

__Overview__  
The IPCB\_MaxMinHoleSizeContraint rule deals with the constraints of hole sizes on a PCB document\.  
__IPCB\_MaxMinHoleSizeConstraint Properties__  
Property AbsoluteValues : Boolean  
Property MaxLimit       : TCoord   
Property MinLimit       : TCoord   
Property MaxPercent     : TReal    
Property MinPercent     : TReal  

<a id="IPCB_MaxMinWidthConstraint_rule"></a>__IPCB\_MaxMinWidthConstraint rule__

__Overview__  
This routing width constraint interface defines the minimum, favored and maximum width of tracks and arcs on copper layers\.  
__IPCB\_MaxMinWidth Properties__  
Property  MaxWidth    \[Const L : TLayer\]  : TCoord   
Property  MinWidth    \[Const L : TLayer\]  : TCoord   
Property  FavoredWidth\[Const L : TLayer\]  : TCoord   
Property  ImpedanceDriven                 : Boolean  
Property  MinImpedance                    : TDouble  
Property  FavoredImpedance                : TDouble  
Property  MaxImpedance                    : TDouble

<a id="IPCB_MaxMinLengthConstraint_rule"></a>__IPCB\_MaxMinLengthConstraint rule__

__Overview__  
This IPCB\_MaxMinLengthConstraint rule defines the minimum and maximum lengths of a net\.  
__IPCB\_MaxMinLengthConstraint Properties__  
Property MaxLimit : TCoord  
Property MinLimit : TCoord

<a id="IPCB_MinimumAnnularRing_rule"></a>__IPCB\_MinimumAnnularRing rule__

__Overview__  
The minimum annular ring rule determines the minimum size of an annular ring\.  
__IPCB\_MinimumAnnularRing Properties__  
Property Minimum : TCoord

<a id="IPCB_MaximumViaCountRule_rule"></a>__IPCB\_MaximumViaCountRule rule__

__Overview__  
The maximum via count rule specifies the maximum number of vias permitted on a PCB document\.  
__Notes__  
Set or return the maximum number of vias for the Limit property  
__IPCB\_MaximumViaCount Properties__  
Property Limit : Integer

<a id="IPCB_NetsToIgnoreRule_rule"></a>__IPCB\_NetsToIgnoreRule rule__

__Overview__  
The Nets To Ignore rule determines which nets to ignore during Design Rule Check\.  
__IPCB\_NetsToIgnoreRule Methods__  
No new interface methods  
__IPCB\_NetsToIgnoreRule Properties__  
No new interface properties  
__See also__  
IPCB\_Rule interface

<a id="IPCB_ParallelSegmentConstraint_rule"></a>__IPCB\_ParallelSegmentConstraint rule__

__Overview__  
This rule specifies the distance two track segments can run in parallel, for a given separation\. Note that this rule tests track segments, not collections of track segments\. Apply multiple parallel segment constraints to a net to approximate crosstalk characteristics that vary as a function of length and gap\.  
__Notes__  
The Gap and Limit properties concern the track segments\.  
__IPCB\_ParallelSegmentConstraint Properties__  
Property Gap   : TCoord  
Property Limit : TCoord

<a id="IPCB_PasteMaskExpansionRule_rule"></a>__IPCB\_PasteMaskExpansionRule rule__

__Overview__  
The IPCB\_PasteMaskExpansionRule function returns or sets values for a paste mask expansion rule object\. The Paste Mask Expansion Rule specifies the amount of radial expansion or radial contraction of each pad site\.  
__Notes__  
The Expansion property sets or returns the radial expansion or contraction value \(a negative value denotes contraction\)\.  
__IPCB\_PasteMaskExpansionRule Properties__  
Property Expansion : TCoord

<a id="IPCB_PermittedLayersRule_rule"></a>__IPCB\_PermittedLayersRule rule__

__Overview__  
The IPCB\_PermittedLayersRule function returns or sets the permitted layers rule which specifies the layers components can be placed on during placement with the Cluster Placer\. The Cluster Placer does not change the layer a component is on, you must set the component layer prior to running the placer\.  
__IPCB\_PermittedLayersRule Properties__  
Property PermittedLayers : TLayerSet

<a id="IPCB_PowerPlaneClearanceRule_rule"></a>__IPCB\_PowerPlaneClearanceRule rule__

__Overview__  
The power plane clearance rule determines the clearance of the power plane\.  
__IPCB\_PowerPlaneClearanceRule Properties__  
Property Clearance : TCoord

<a id="IPCB_PowerPlaneConnectStyleRule_rule"></a>__IPCB\_PowerPlaneConnectStyleRule rule__

__Overview__  
This power plane connect style rule specifies the style of the connection from a component pin to a power plane\. There are two connection types \- direct connections \(the pin to solid copper\) or thermal relief connection\.  
__Notes__  
The __TPlaneConnectStyle__ type determines the connection style for a plane\. If Thermal Relief connection is used, then the thermal relief conductor width, the relief expansion, the width of the air gap and the number of relief entries need to be determined\. If direct connection style is used, then the previous parameters are not needed\.  
__IPCB\_PowerPlaneConnectStyleRule Properties__  
Property PlaneConnectStyle    : TPlaneConnectStyle  
Property ReliefExpansion      : TCoord              
Property ReliefConductorWidth : TCoord              
Property ReliefEntries        : Integer             
Property ReliefAirGap         : TCoord            

<a id="IPCB_PolygonConnectStyleRule_rule"></a>__IPCB\_PolygonConnectStyleRule rule__

__Overview__  
The Polygon Connect Style Rule returns or sets the polygon connect style rule which specifies how the polygon is connected to the power plane\.

__Notes__

- The __TPlaneConnectStyle__ type specifies the polygon connect style rule which is relief connection to a polygon, or direct connection to a polygon from a component pin\. That is, the type of connection from a component pin to the polygon\.
- The relief conductor width property denotes the width of the conductor between two air gaps\.
- The relief entries property specifies the number of relief entries \(2 or 4\) for the relief connection of the polygon connection\. For other types of connection, this field is irrelevant\.
- The PolygonReliefAngle type specifies the angle of relief connections in 45 or 90 degrees\.

__IPCB\_PolygonConnectStyleRule Properties__  
Property ConnectStyle         : TPlaneConnectStyle   
Property ReliefConductorWidth : TCoord               
Property ReliefEntries        : Integer              
Property PolygonReliefAngle   : TPolygonReliefAngle

<a id="IPCB_RoutingCornerStyleRule"></a>__IPCB\_RoutingCornerStyleRule__

__Overview__  
This routing corners rule specifies the corner style to be used during autorouting a PCB document\.

__Notes__

- The TCornerStyle type sets or returns the corner style which can be a 45 degree camfer or rounded using an arc\.
- The minsetback and maxsetback properties specify the minimum and maximum distance from the corner location to the start of the corner chamfer or arc\.

__IPCB\_RoutingCornerStyleRule Properties__  
Property Style        TCornerStyle  
Property MinSetBack : TCoord  
Property MaxSetBack : TCoord

<a id="IPCB_RoutingLayersRule_rule"></a>__IPCB\_RoutingLayersRule rule__

__Overview__  
This routing layers rule specifies the preferred routing direction for layer to be used during autorouting\.  
__IPCB\_RoutingLayersRule Properties__  
Property RoutingLayers \[L : TLayer\] : Boolean

<a id="IPCB_RoutingPriorityRule_rule"></a>__IPCB\_RoutingPriorityRule rule__

__Overview__  
This routing priority rule function assigns a routing priority which is used to set the order of how the nets will be auto routed\.  
__IPCB\_RoutingPriorityRule Properties__  
Property RoutingPriority : Integer

<a id="IPCB_RoutingTopologyRule_rule"></a>__IPCB\_RoutingTopologyRule rule__

__Overview__  
This routing topology rule function specifies the topology of the net\. The net compromises a pattern of the pin\-to\-pin connections\. A topology is applied to a net for specific reasons, for example to minimise signal reflections, daisy chain topology is used\.  
__Notes__  
The Topology property sets or returns the topology of the net\. The following topologies can be applied: Shortest, Horizontal, Vertical, Daisy\-Simple, Daisy\-Mid Driven, Daisy\-Balanced, or Star\.  
__IPCB\_RoutingTopologyRule Properties__  
Property Topology: TNetTopology

<a id="IPCB_RoutingViaStyleRule_rule"></a>__IPCB\_RoutingViaStyleRule rule__

__Overview__  
This routing via style rule specifies the via object to be used during autorouting\. Vias can be through\-hole, Blind \(from a surface layer to an inner layer\) or Buried \(between two inner layers\)\.  
__Notes__  
The ViaStyle property sets or returns the via style\. Vias can be thru\-hole, blind \(from a surface layer to an inner layer\) or buried \(between two inner layers\)\.  
__IPCB\_RoutingViaStyleRule Properties__  
Property MinHoleWidth      : TCoord  
Property MaxHoleWidth      : TCoord  
Property PreferedHoleWidth : TCoord  
Property MinWidth          : TCoord  
Property MaxWidth          : TCoord  
Property PreferedWidth     : TCoord  
Property ViaStyle          : TRouteVia

<a id="IPCB_RuleSupplyNets_rule"></a>__IPCB\_RuleSupplyNets rule__

__Overview__  
This IPCB\_RuleSupplyNets interface specifies the supply nets on the board\. The signal integrity analyzer needs to know each supply net name and voltage\.  
__IPCB\_RuleSupplyNets Properties__  
Property Voltage : Double

<a id="IPCB_ShortCircuitConstraint_rule"></a>__IPCB\_ShortCircuitConstraint rule__

__Overview__  
The short circuit constraint rule includes a constraint to test for short circuits between primitive objects on the copper layers\. A short circuit exists when two objects that have different net names touch\.  
__Notes__  
The Allowed property sets or returns the boolean value whether or not the short circuit constraint rule is allowed\.  
__IPCB\_ShortCircuitConstraint Properties__  
Property Allowed : Boolean

<a id="IPCB_SMDNeckDownConstraint_rule"></a>__IPCB\_SMDNeckDownConstraint rule__

__Overview__  
__IPCB\_SMDToPlaneConstraint Properties__  
Property Percent : TReal

<a id="IPCB_SMDToCornerConstraint_rule"></a>__IPCB\_SMDToCornerConstraint rule__

__Overview__  
__Notes__  
The Distance property determines the distance between the SMD and a corner\.  
__IPCB\_SMDToCornerConstraint Properties__  
Property Distance : TCoord

<a id="IPCB_SMDToPlaneConstraint_rule"></a>__IPCB\_SMDToPlaneConstraint rule__

__Overview__  
__IPCB\_SMDToPlaneConstraint Methods__  
Function  IsInternalPlaneNet\(Net   : IPCB\_Net; Board : IPCb\_Board\): Boolean;  
__IPCB\_SMDToPlaneConstraint Properties__  
Property Distance : TCoord

<a id="IPCB_SolderMaskExpansionRule_rule"></a>__IPCB\_SolderMaskExpansionRule rule__

__Overview__  
The solder mask expansion rule defines the shape that is created on the solder mask layer at each pad and via site\. This shape is expanded or contracted radially by the amount specified by this rule\.  
Note, Tenting and solder mask are related\. A negative value allows the solder mask to be reduced\.  
__IPCB\_SolderMaskExpansion Properties__  
Property Expansion : TCoord

<a id="IPCB_TestPointStyleRule_rule"></a>__IPCB\_TestPointStyleRule rule__

__Overview__  
The auto\-router includes a testpoint generator, which can identify existing pads and vias as testpoints, as well as adding testpoint pads to nets which can not be accessed at existing pads and vias\. Generally the testpoint types are used in bare board testing or are used for in\-circuit testing\.  
__IPCB\_TestPointStyleRule Methods__  
Procedure DoDefaultStyleOrder;  
__IPCB\_TestPointStyleRule Properties__  
Property TestpointUnderComponent       : Boolean  
Property MinSize                       : TCoord  
Property MaxSize                       : TCoord  
Property PreferedSize                  : TCoord  
Property MinHoleSize                   : TCoord  
Property MaxHoleSize                   : TCoord  
Property PreferedHoleSize              : TCoord  
Property TestpointGrid                 : TCoord  
Property OrderArray \[I : Integer\]      : TTestPointStyle  
Property AllowedSide                   : TTestpointAllowedSideSet  
Property AllowedStyleSet               : TTestPointStyleSet  
Property Allowed \[I : TTestPointStyle\] : Boolean  
Property TestpointPriority\[I : TTestPointStyle\] : Integer

<a id="IPCB_TestPointUsage_rule"></a>__IPCB\_TestPointUsage rule__

__Overview__  
Altium Designer's autorouter includes a testpoint generator, which can identify existing pads and vias as testpoints, as well as adding testpoint pads to nets which can not be accessed at existing pads and vias\. Generally the testpoint types are used in bare board testing or are used for in\-circuit testing\.  
__IPCB\_TestPointUsage Properties__  
Property Valid              : TTestpointValid  
Property AllowMultipleOnNet : Boolean        

<a id="IPCB_UnConnectedPinRule_rule"></a>__IPCB\_UnConnectedPinRule rule__

__Overview__  
This interface deals with unconnected pins on a PCB document\.  
__IPCB\_UnConnectedPinRule Properties__  
No new properties\.  
__See also__  
IPCB\_Rule interface

<a id="IPCB_ViasUnderSMDConstraint_rule"></a>__IPCB\_ViasUnderSMDConstraint rule__

__Overview__  
The Vias Under SMD constraint rule specifies if vias can be placed under SMD pads during autorouting\.  
__IPCB\_ViasUnderSMDConstraint Properties__  
Property Allowed : Boolean

<a id="Signal_Integrity_Design_Rules"></a>__Signal Integrity Design Rules__

__IPCB\_SignalStimulus rule__

__Overview__  
The IPCB\_SignalStimulus rule concerns with the definition of a signal for stimulus, such as the stimulus type, signal level, start, stop times and the period of the signal\.  
__IPCB\_SignalStimulus Methods__  
Procedure Export\_ToStmFile            \(AFilename : TString\);  
__IPCB\_SignalStimulus Properties__  
Property Kind       : TStimulusType  
Property Level      : TSignalLevel  
Property StartTime  : TReal         
Property StopTime   : TReal         
Property PeriodTime : TReal       

__IPCB\_MaxOvershootFall rule__

__Overview__  
The IPCB\_MaxOvershootFall interface specifies the maximum allowable overshoot \(ringing below the base value\) on the falling edge of the signal\.  
__IPCB\_MaxOvershootFall Properties__  
Property Maximum : TReal

__IPCB\_MaxOvershootRise rule__

__Overview__  
The IPCB\_MaxOvershootRise interface specifies the maximum allowable overshoot \(ringing above the base value\) on the rising edge of the signal\.  
__IPCB\_MaxOvershootRise Properties__  
Property  Maximum : TReal

__IPCB\_MaxUndershootFall__

__Overview__  
The IPCB\_MaxUndershootFall interface specifies the maximum allowable undershoot \(ringing above the base value\) on the falling edge of the signal\.  
__IPCB\_MaxUndershootFall Properties__  
Property  Maximum : TReal

__IPCB\_MaxUndershootRise rule__

__Overview__  
The IPCB\_MaxUndershootRise function specifies the maximum allowable undershoot \(ringing below the top value\) on the rising edge of the signal\.  
__IPCB\_MaxUndershootRise Properties__  
Property Maximum : TReal

__IPCB\_RuleMaxMinImpedance rule__

__Overview__  
The IPCB\_RuleMaxMinImpedance interface returns or sets values for a MaxMin Impedance rule object depending on the query mode \(eGetState or eSetState\)\. This rule specifies the minimum and maximum net impedance allowed\. Net impedance is a function of the conductor geometry and conductivity, the surrounding dielectric material \(the board base material, multilayer insulation, solder mask, etc\) and the physical geometry of the board \(distance to other conductors in the z\-plane\)\. This function defines the minimum and maximum impedance values allowed for the signal integrity rule\.  
__IPCB\_RuleMaxMinImpedance Properties__  
Property Minimum : TReal  
Property Maximum : TReal

__IPCB\_RuleMinSignalTopValue rule__

__Overview__  
The IPCB\_RuleMinSignalTopValue function specifies the minimum allowable signal top value\. The top value is the voltage that a signal settles into the minimum top state\.  
__IPCB\_RuleMinSignalTopValue Properties__  
Property Minimum : TReal

__IPCB\_RuleMaxSignalBaseValue rule__

__Overview__  
The IPCB\_RuleMaxSignalBaseValue function specifies the maximum allowable base value\. The base value is the voltage that a signal settles to in the low state\.  
__IPCB\_ RuleMaxSignalBaseValue Properties__  
Property Maximum : TReal

__IPCB\_RuleFlightTime\_RisingEdge rule__

__Overview__  
The IPCB\_RuleFlightTime\_RisingEdge interface returns or sets values for the flight time of the rising edge of a signal\. The flight time is the signal delay introduced by the interconnect structure\. It is calculated as the time it takes to drive the actual input to the threshold voltage, less the time it would take to drive a reference load \(connected directly to the output\) to the threshold voltage\.  
__IPCB\_RuleFlightTime\_RisingEdge Properties__  
Property MaximumFlightTime : TReal

__IPCB\_RuleFlightTime\_FallingEdge rule__

__Overview__  
The IPCB\_RuleFlightTime\_FallingEdge interface returns or sets values for the flight time of the falling edge of a signal\. The flight time is the signal delay introduced by the interconnect structure\. It is calculated as the time it takes to drive the actual input to the threshold voltage, less the time it would take to drive a reference load \(connected directly to the output\) to the threshold voltage\.  
__IPCB\_RuleFlightTime\_FallingEdge Properties__  
Property MaximumFlightTime : TReal

__IPCB\_RuleMaxSlopeRisingEdge rule__

__Overview__  
The IPCB\_RuleMaxSlope\_RisingEdge interface specifies the maximum allowable slope on the rising edge of the signal\. The slope is the time it takes for a signal to rise from the threshold voltage to a valid high voltage\.  
__IPCB\_RuleMaxSlopeRisingEdge Properties__  
Property MaxSlope : TReal

__IPCB\_RuleMaxSlopeFallingEdge rule__

__Overview__  
The IPCB\_RuleMaxSlope\_FallingEdge interface specifies the maximum allowable slope on the falling edge of the signal\. The slope is the time it takes for a signal to fall from the threshold voltage to a valid low voltage\.  
__IPCB\_RuleMaxSlopeFallingEdge Properties__  
Property MaxSlope : TReal

<a id="PCB_Object_Iterators"></a>__PCB Object Iterators __

An iterator conducts a search through a PCB document's design database to fetch PCB design objects\. With an iterator, you can control which objects on which layers and within specified regions\.

There are four different types of iterators; Board Iterator, Library Iterator, Spatial Iterator and Group Iterator\. The board iterator is for conducting searches on a PCB document, the library iterator on library documents, spatial iterators conducting searches within a restricted boundary on a document and the group iterator conducting searches for primitives within a group object such as tracks and arcs within a component object\.

The scripting system's Delphi Script doesn't support sets, therefore to pass in a set of layers or a set of objects, you need to use the __MkSet__ function to create a pseudo set of objects or layers for the __AddFilter\_ObjectSet__ or __AddFilterLayerSet__ procedures\.

__For example__  
BoardIterator\.AddFilter\_ObjectSet\(MkSet\(eTrackObject,eFillObject\)\);  
__See also__  
IPCB\_AbstractIterator interface  
IPCB\_BoardIterator interface  
IPCB\_LibraryIterator interface  
IPCB\_SpatialIterator interface  
IPCB\_GroupIterator interface

<a id="IPCB_AbstractIterator"></a>__IPCB\_AbstractIterator__

__Overview__  
An abstract iterator object interface which is the ancestor interface for a board, spatial, group and library Iterators\.  
An iterator object iterates through a PCB database representing the PCB document to fetch specified objects within a specified region on a specified layer if necessary\.  
__Notes__  
When using the DelphiScript language set in Scripts, you need to use the MkSet function to specify the object set or the layer set\. The __MkSet__ function creates a set of objects because the Delphiscript language does not support Object Pascal's sets\.  
__Methods__  
Function  I\_ObjectAddress     : TPCBObjectHandle;  
Function  FirstPCBObject      : IPCB\_Primitive;  
Function  NextPCBObject       : IPCB\_Primitive  
Procedure SetState\_FilterAll;  
Procedure AddFilter\_ObjectSet \(AObjectSet  : TObjectSet\);  
Procedure AddFilter\_LayerSet  \(ALayerSet   : TLayerSet\);  
Procedure AddFilter\_Area      \(X1,  
                               Y1,  
                               X2,  
                               Y2 : TCoord\);  
Procedure AddFilter\_AllLayers;  
__See also__  
IPCB\_BoardIterator interface  
IPCB\_LibraryIterator interface  
IPCB\_SpatialIterator interface  
IPCB\_Primitive interface  
TObjectSet set  
TObjectId enumerated values  
TLayerSet set  
TLayer enumerated values  
MkSet function

<a id="IPCB_BoardIterator"></a>__IPCB\_BoardIterator__

__Overview__  
The __IPCB\_BoardIterator__ iterates through a PCB document to fetch PCB design objects on this PCB\.  
With the iterator, you can control which objects on which layers and within specified regions with the __AddFilter\_ObjectSet__, __AddFilter\_LayerSet__ and __AddFilter\_Area__ methods to be fetched\.

The __AddFilter\_method__ controls how design objects are fetched\. The __TIterationMethod__ type has three different values; eProcessAll, eProcessFree, eProcessComponents\.

__Notes__  
The Delphiscript language set doesn't support sets, therefore to pass in a set of layers or a set of objects in a function in a script, you need to use the __MkSet__ function to create a pseudo set of objects or layers for the __AddFilter\_ObjectSet__ or __AddFilterLayerSet__ procedures\. For example __BoardIterator\.AddFilter\_ObjectSet\(MkSet\(eTrackObject,eFillObject\)\);__

__Methods__  
Function  I\_ObjectAddress  : TPCBObjectHandle;  

Function  FirstPCBObject   : IPCB\_Primitive;  
Function  NextPCBObject    : IPCB\_Primitive  

Procedure SetState\_FilterAll;  

Procedure AddFilter\_ObjectSet \(AObjectSet  : TObjectSet\);  
Procedure AddFilter\_LayerSet  \(ALayerSet   : TLayerSet\);  
Procedure AddFilter\_Area      \(X1,  
                               Y1,  
                               X2,  
                               Y2          : TCoord\);  

Procedure AddFilter\_AllLayers;  
Procedure AddFilter\_Method \(AMethod : TIterationMethod\);  
__Example__

01

Var

02

    BoardHandle : IPCB\_Board;

03

    Pad         : IPCB\_Primitive;

04

    Iterator    : IPCB\_BoardIterator;

05

    PadNumber   : Integer;

06

Begin

07

    // Retrieve the current board

08

    Board := PCBServer\.GetCurrentPCBBoard;

09

    If Board = Nil Then Exit;

10

11

    // Setup Board iterator

12

    Iterator        := Board\.BoardIterator\_Create;

13

    Iterator\.AddFilter\_ObjectSet\(MkSet\(ePadObject\)\);

14

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

15

    Iterator\.AddFilter\_Method\(eProcessAll\);

16

17

    PadNumber       := 0;

18