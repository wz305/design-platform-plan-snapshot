\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_TearDrop \(Value : Boolean\);  
__Description__  
This method determines whether the PCB object \(an arc or track object\) is used for as a tear drop\.  
This TearDrop property is supported by the GetState\_TearDrop and SetState\_TearDrop methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Properties__

__AllowGlobalEdit property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property AllowGlobalEdit : Boolean Read GetState\_AllowGlobalEdit Write SetState\_AllowGlobalEdit;  
__Description__  
This property is supported by the GetState\_AllowGlobalEdit and SetState\_AllowGlobalEdit methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Board property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Board : IPCB\_Board Read GetState\_Board Write SetState\_Board;  
__Description__  
The Board property determines the PCB document that the object itself is associated with\. This property is supported by the GetState\_Board and SetState\_Board methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Component property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Component : IPCB\_Component Read GetState\_Component Write SetState\_Component;  
__Description__  
This property determines whether the object itself is associated with the component or not\. This property is supported by the GetState\_Component and SetState\_Component methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Coordinate property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Coordinate : IPCB\_Coordinate Read GetState\_Coordinate Write SetState\_Coordinate;  
__Description__  
The Coordinate property returns the IPCB\_Coordinate only if this object itself is part of the IPCB\_Coordinate type\. A coordinate object is a group object and is composed of design object primitives such as tracks, arcs and text objects\.  
This property is supported by the GetState\_Coordinate and SetState\_Coordinate methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Detail property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Detail : TPCBString Read GetState\_DetailString;  
__Description__  
This property retrieves the Detail text string for this design object\. This property is supported by the GetState\_Detail method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Dimension property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Dimension : IPCB\_Dimension Read GetState\_Dimension Write SetState\_Dimension;  
__Description__  
The Coordinate property returns the IPCB\_Dimension only if this object itself is part of the IPCB\_Dimension type\. A dimension object is a group object and is composed of design object primitives such as tracks, arcs and text objects\.  
This property is supported by the GetState\_Dimension and SetState\_Dimension methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__DRCError property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property DRCError : Boolean Read GetState\_DRCError Write SetState\_DRCError;  
__Description__  
The DRCError property determines whether the object is affected by the Design Rule Checker and thus if the object breaks one of the design rules, the DRCError is true\.  
This property is supported by the GetState\_DRCError and SetState\_DRCError methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Descriptor property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Descriptor : TPCBString Read GetState\_DescriptorString;  
__Description__  
The Descriptor read only property fetches the Descriptor string\.  
This property is supported by the GetState\_Descriptor methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_Direct property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_Direct : Boolean Read GetState\_Enabled\_Direct Write SetState\_Enabled\_Direct;  
__Description__  
This property is supported by the GetState\_Direct and SetState\_Direct methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled : Boolean Read GetState\_Enabled Write SetState\_Enabled;  
__Description__  
This property is supported by the GetState\_Enabled and SetState\_Enabled methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_vComponent property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_vComponent : Boolean Read GetState\_Enabled\_vComponent Write SetState\_Enabled\_vComponent;  
__Description__  
This property is supported by the GetState\_vComponent and SetState\_vComponent methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_vCoordinate property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_vCoordinate : Boolean Read GetState\_Enabled\_vCoordinate Write SetState\_Enabled\_vCoordinate;  
__Description__  
This property is supported by the GetState\_vCoordinate and SetState\_vCoordinate methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_vDimension property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_vDimension : Boolean Read GetState\_Enabled\_vDimension Write SetState\_Enabled\_vDimension;  
__Description__  
This property is supported by the GetState\_vDimension and SetState\_vDimension methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_vNet property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_vNet : Boolean Read GetState\_Enabled\_vNet Write SetState\_Enabled\_vNet;  
__Description__  
This property is supported by the GetState\_vNet and SetState\_vNet methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Enabled\_vPolygon property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Enabled\_vPolygon : Boolean Read GetState\_Enabled\_vPolygon Write SetState\_Enabled\_vPolygon;  
__Description__  
This property is supported by the GetState\_vPolygon and SetState\_vPolygon methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__EnableDraw property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property EnableDraw : Boolean Read GetState\_EnableDraw Write SetState\_EnableDraw;  
__Description__  
This property is supported by the GetState\_EnableDraw and SetState\_EnableDraw methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InDimension property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InDimension : Boolean Read GetState\_InDimension Write SetState\_InDimension;  
__Description__  
This InDimension property determines whether the obejct itself is part of the dimension object or not\.  
This property is supported by the GetState\_InDimension and SetState\_InDimension methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Identifier property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Identifier : TPCBString Read GetState\_Identifier;  
__Description__  
This property is supported by the GetState\_Identifier  method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InBoard property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InBoard : Boolean Read GetState\_InBoard Write SetState\_InBoard;  
__Description__  
This InBoard property determines whether the object itself is part of the board object or not\.  
This property is supported by the GetState\_InBoard and SetState\_InBoard methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InComponent property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InComponent : Boolean Read GetState\_InComponent Write SetState\_InComponent;  
__Description__  
This InComponent property determines whether the object itself is part of the component object or not\.  
This property is supported by the GetState\_InComponent and SetState\_InComponent methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Index property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Index : Word Read GetState\_Index Write SetState\_Index;  
__Description__  
This property is supported by the GetState\_Index and SetState\_Index methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InNet property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InNet : Boolean Read GetState\_InNet Write SetState\_InNet;  
__Description__  
This property is supported by the GetState\_InNet and SetState\_InNet methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InPolygon property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InPolygon : Boolean Read GetState\_InPolygon Write SetState\_InPolygon;  
__Description__  
This InPolygon property determines whether the object itself is part of the polygon object or not\.  
This property is supported by the GetState\_InPolygon and SetState\_InPolygon methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InSelectionMemory property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InSelectionMemory \[I : Integer\] : Boolean Read GetState\_InSelectionMemory Write SetState\_InSelectionMemory;  
__Description__  
This property is supported by the GetState\_InSelectionMemory and SetState\_InSelectionMemory methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsElectricalPrim property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsElectricalPrim : Boolean Read GetState\_IsElectricalPrim;  
__Description__  
This property determines whether this PCB object possesses an electrical property\- tracks, fills, polygons, arcs, vias all have electrical properties \- basically those objects that have a Net property will possess an electrical property\.  
Embedded boards and Embedded objects etc don't have an electrical property for example\.  
This property is supported by the GetState\_IsElectricalPrim and SetState\_IsElectricalPrim methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__InCoordinate property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property InCoordinate : Boolean Read GetState\_InCoordinate Write SetState\_InCoordinate;  
__Description__  
This InCoordinate property determines whether the object itself is part of the coordinate object or not\.  
This property is supported by the GetState\_InCoordinate and SetState\_InCoordinate methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsKeepout property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsKeepout : Boolean Read GetState\_IsKeepout Write SetState\_IsKeepout;  
__Description__  
This property determines whether a PCB object is used as a keep\-out object\. Currently arc, track and fill objects are used as keep out objects\. The keepout layer generally defines areas on the PCB document that you don't want automatically or manually routed, and this can include clearance areas around mounting hole pads or high voltage components for example\.  
This property is supported by the GetState\_IsKeepOut and SetState\_IsKeepOut methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsPreRoute property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsPreRoute : Boolean Read GetState\_IsPreRoute Write SetState\_IsPreRoute;  
__Description__  
This property is supported by the GetState\_IsPreRoute and SetState\_IsPreRoute methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsTestpoint\_Bottom property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsTestpoint\_Bottom : Boolean Read GetState\_IsTestpoint\_Bottom Write SetState\_IsTestpoint\_Bottom;  
__Description__  
This property determines whether a pad or via is used as a test point on the bottom layer\.  
This property is supported by the GetState\_IsTestpoint\_Bottom and SetState\_IsTestPoint\_Bottom methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsTenting property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsTenting : Boolean Read GetState\_IsTenting Write SetState\_IsTenting;  
__Description__  
This property determines whether the solder mask of pad and via objects are tented on top and bottom layers\.  A tenting closes an opening in the mask of pad or via objects\.  
This property is supported by the GetState\_IsTenting and SetState\_IsTenting methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsTenting\_Top property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsTenting\_Top : Boolean Read GetState\_IsTenting\_Top Write SetState\_IsTenting\_Top;  
__Description__  
This property determines whether the solder mask of pad and via objects are tented or not on the top layer\.  A tenting closes an opening in the mask of pad or via objects\.  
This property is supported by the GetState\_IsTenting\_Top and SetState\_IsTenting\_Top methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsTestpoint\_Top property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsTestpoint\_Top : Boolean Read GetState\_IsTestpoint\_Top Write SetState\_IsTestpoint\_Top;  
__Description__  
This property determines whether a pad or via is used as a test point on the top layer\.  
This property is supported by the GetState\_IsTestpoint\_Top and SetState\_IsTestpoint\_Top methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Layer property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Layer : TLayer Read GetState\_Layer Write SetState\_Layer;  
__Description__  
This layer denotes which layer the object is on\.  
This property is supported by the GetState\_Layer and SetState\_layer methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TLayer type

__MiscFlag1 property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property MiscFlag1 : Boolean Read GetState\_MiscFlag1 Write SetState\_MiscFlag1;  
__Description__  
This property determines the boolean value from the MiscFlag1 property and can be used for custom purposes\.  
This property is supported by the GetState\_MiscFlag1 and SetState\_MiscFlag1 methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__MiscFlag2 property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property MiscFlag2 : Boolean Read GetState\_MiscFlag2 Write SetState\_MiscFlag2;  
__Description__  
This property determines the boolean value from the MiscFlag2 property and can be used for custom purposes\.  
This property is supported by the GetState\_MiscFlag2 and SetState\_MiscFlag2 methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__MiscFlag3 property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property MiscFlag3 : Boolean Read GetState\_MiscFlag3 Write SetState\_MiscFlag3;  
__Description__  
This property determines the boolean value from the MiscFlag3 property and can be used for custom purposes\.  
This property is supported by the GetState\_MiscFlag3 and SetState\_MiscFlag3 methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsTenting\_Bottom property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property IsTenting\_Bottom : Boolean Read GetState\_IsTenting\_Bottom Write SetState\_IsTenting\_Bottom;  
__Description__  
This property determines whether the solder mask of pad and via objects are tented or not on the bottom layer\.  A tenting closes an opening in the mask of pad or via objects\.  
This property is supported by the GetState\_IsTenting\_Bottom and SetState\_IsTenting\_Bottom methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Moveable property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Moveable : Boolean Read GetState\_Moveable Write SetState\_Moveable;  
__Description__  
This property determines whether this design object can be moved or not \(by the autorouter for example\)\.  
This property is supported by the GetState\_Moveable and SetState\_Moveable methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Net property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Net : IPCB\_Net Read GetState\_Net Write SetState\_Net;  
__Description__  
The Net property of an object denotes it has an electrical property, meaning it is connected from one node to another\.  
This property is supported by the GetState\_Net and SetState\_Net methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
NetObjectAssign script from the \\__Example__s\\Scripts\\Delphiscript Scripts\\Pcb\\

__ObjectId property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ObjectId : TObjectId Read GetState\_ObjectId;  
__Description__  
This ObjectId property determines what Object Id this object is\. Please note that this ObjectId type is a limited set and to have a wider range of Object IDs, check the TViewableObjectId type\.  
This read only property is supported by the GetState\_ObjectId method\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
ViewableObjectId property

__ObjectIDString property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ObjectIDString : TPCBString Read GetState\_ObjectIDString;  
__Description__  
This ObjectIDString property returns the Object Id string\. For example eTrackObject type will yield a Track string\.  
This read only property is supported by the GetState\_ObjectIDString method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PadCacheRobotFlag property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PadCacheRobotFlag : Boolean Read GetState\_PadCacheRobotFlag Write SetState\_PadCacheRobotFlag;  
__Description__  
This property is supported by the GetState\_PadCacheRobotFlag and SetState\_PadCacheRobotFlag methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PasteMaskExpansion property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PasteMaskExpansion : TCoord Read GetState\_PasteMaskExpansion;  
__Description__  
This property is supported by the GetState\_PasteMaskExpansion and SetState\_PasteMaskExpansion methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Polygon property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Polygon : IPCB\_Polygon Read GetState\_Polygon Write SetState\_Polygon;  
__Description__  
This property is supported by the GetState\_Polygon and SetState\_Polygon methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PolygonOutline property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PolygonOutline : Boolean Read GetState\_PolygonOutline Write SetState\_PolygonOutline;  
__Description__  
This property is supported by the GetState\_PolygonOutline and SetState\_PolygonOutline methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PowerPlaneReliefExpansion property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PowerPlaneReliefExpansion : TCoord Read GetState\_PowerPlaneReliefExpansion;  
__Description__  
This property is supported by the GetState\_PowerPlaneReliefExpansion method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PowerPlaneClearance property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PowerPlaneClearance : TCoord Read GetState\_PowerPlaneClearance;  
__Description__  
This property is supported by the GetState\_PowerPlaneClearance method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__PowerPlaneConnectStyle property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property PowerPlaneConnectStyle : TPlaneConnectStyle Read GetState\_PowerPlaneConnectStyle;  
__Description__  
This property is supported by the GetState\_PowerPlaneConnectStyle method\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TPlaneConnectStyle type

__ReliefAirGap property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ReliefAirGap : TCoord Read GetState\_ReliefAirGap;  
__Description__  
The ReliefAirGap property retrieves the relief air gap value for this pad/via object\.  
This read only property is supported by the GetState\_ReliefAirGap method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__ReliefConductorWidth property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ReliefConductorWidth : TCoord Read GetState\_ReliefConductorWidth;  
__Description__  
The ReliefConductorWidth property retrieves the relief conductor width value for a this pad/via object\.  
This read only property is supported by the GetState\_ReliefConductorWidth method  
__Example__  
__See also__  
IPCB\_Primitive interface

__ReliefEntries property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ReliefEntries : Integer Read GetState\_ReliefEntries;  
__Description__  
This property retrieves the number of relief entries for a pad/via object\.  
This read only property is supported by the GetState\_ReliefEntries method\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Selected property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Selected : Boolean Read GetState\_Selected Write SetState\_Selected;  
__Description__  
This property determines whether this object is selected or not on the PCB document\.  
This property is supported by the GetState\_Selected and SetState\_Selected methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SolderMaskExpansion property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property SolderMaskExpansion : TCoord Read GetState\_SolderMaskExpansion;  
__Description__  
The solder mask expansion property determines the shape that is created on the solder mask layer at each pad and via site\. This shape is expanded or contracted radially by the amount specified by this rule\. This property over\-rides the solder mask expansion design rule\.  
This read\-only property is supported by the GetState\_SolderMaskExpansion method\.  
__Notes__  
A Solder Mask expansion property for a pad object is currently relevant just for pads on top and bottom copper layers\.   
Paste mask layers are used to design stencils which will selectively place solder paste on a blank PCB\.  Vias do not have a paste mask layer\.  
Solder paste is only placed on pads where component leads are to be soldered to them\. Vias normally don't have anything soldered onto them\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__TearDrop property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property TearDrop : Boolean Read GetState\_TearDrop Write SetState\_TearDrop;  
__Description__  
This property determines whether the PCB object \(an arc or track object\) is used for as a tear drop\.  
This property is supported by the GetState\_TearDrop and SetState\_TearDrop methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__Used property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property Used : Boolean Read GetState\_Used Write SetState\_Used;  
__Description__  
This property is supported by the GetState\_Used and SetState\_Used methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__UserRouted property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property UserRouted : Boolean Read GetState\_UserRouted Write SetState\_UserRouted;  
__Description__  
This property is supported by the GetState\_UserRouted and SetState\_UserRouted methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__ViewableObjectID property__

\(IPCB\_Primitive interface\)  
__Syntax__  
Property ViewableObjectID : TViewableObjectID Read GetState\_ViewableObjectID;  
__Description__  
The read only property determines the ViewableObjectID of the design object\. The TViewableObjectID type is a more descriptive ID of a design object  than the TObjectID type\.  
For example any type of dimension object is a eDimension type according to the TObjectID but could be one of the eViewableObject\_LinearDimension\.\.\.eViewableObject\_RadialDiameterDimension value\.  
This property is supported by the GetState\_ViewableObjectID and SetState\_ViewableObjectId methods\.  
__Notes__  
This __TViewableObjectID__ type is mainly used by the Inspector and List views in Altium Designer and is an extension of __TObjectID__ type\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TViewableObjectID type  
TObjectID type

<a id="IPCB_Arc_Interface"></a>__IPCB\_Arc Interface__

__Overview__  
Arcs are circular track segments with a definable width and can be placed on any layer\.  Arcs can have resizeable angles\. You can set the angles to 0 and 360 respectively to obtain a circle object\. Arcs have a variety of uses in the PCB design layout\. 

For example, arcs can be used to outline component shapes\. Arcs can also be placed on a signal layer and be electrically connected to tracks\.

__Note__  
You can use __IPCB\_Primitive__ methods and properties that are relevant to the __IPCB\_Arc__ interface\.  
The __IPCB\_Arc__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Arc

__IPCB\_Arc methods__  
GetState\_CenterX  
GetState\_CenterY  
GetState\_Radius  
GetState\_LineWidth  
GetState\_StartAngle  
GetState\_EndAngle  
GetState\_StartX  
GetState\_StartY  
GetState\_EndX  
GetState\_EndY  
SetState\_CenterX  
SetState\_CenterY  
SetState\_Radius  
SetState\_LineWidth  
SetState\_StartAngle  
SetState\_EndAngle  
RotateAroundXY  
GetState\_StrictHitTest

__IPCB\_Arc properties__  
XCenter  
YCenter  
Radius  
LineWidth  
StartAngle  
EndAngle  
StartX  
StartY  
EndX  
EndY

__Example__

01

Var

02

    Board     : IPCB\_Board;

03

    WorkSpace : IWorkSpace;

04

    Arc       : IPCB\_Arc;

05

Begin

06

    // Create a new PCB documen

07

    WorkSpace := GetWorkSpace;

08

    If WorkSpace = Nil Then Exit;

09

    Workspace\.DM\_CreateNewDocument\('PCB'\);

10

11

    Board := PCBServer\.GetCurrentPCBBoard;

12

    If Board = Nil then exit;

13

14

    Arc := PCBServer\.PCBObjectFactory\(eArcObject, eNoDimension, eCreate\_Default\);

15

    // need the board origin marker to appear on the PCB document

16

    // in order to obtain the Board\.Xorigin and YOrigin values\.

17

    Arc\.XCenter    := MilsToCoord\(Board\.XOrigin \+ 1800\);

18

    Arc\.YCenter    := MilsToCoord\(Board\.YOrigin \+ 1800\);

19

    Arc\.Radius     := MilsToCoord\(200\);

20

    Arc\.LineWidth  := MilsToCoord\(50\);

21

    Arc\.StartAngle := 0;

22

    Arc\.EndAngle   := 270;

23

    Arc\.Layer      := eBottomLayer;

24

25

    // Add the new arc object to the PCB database\.

26

    Board\.AddPCBObject\(Arc\);

27

28

    // Repaint the PCB Worksheet

29

    ResetParameters;

30

    AddStringParameter\('Action', 'All'\);

31

    RunProcess\('PCB:Zoom'\);

32

End;

__See also__  
IPCB\_Primitive interface  
PCB Design Objects

__Methods__

__RotateAroundXY method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX,AY : TCoord; Angle : TAngle\);  
__Description__  
This method rotates an arc on the PCB document about the AX, AY coordinates with an angle in degrees\. To ensure the arc rotates without moving about, pass in its XCenter and YCenter attributes for the AX,AY parameters\.  
__Example__

1

//rotate the arc about its original center

2

Arc\.RotateAroundXY\(Arc\.XCenter,Arc\.YCenter,45\);

__See also__  
IPCB\_Arc interface

__GetState and SetState Methods__

__GetState\_CenterX method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_CenterX : TCoord;  
__Description__  
This method is used for the CenterX property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_CenterY method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_CenterY : TCoord;  
__Description__  
This method is used for the CenterY property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_EndAngle method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_EndAngle : TAngle;  
__Description__  
This method is used for the EndAngle property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_EndX method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_EndX : TCoord;  
__Description__  
This method is used for the EndX property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_EndY method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_EndY : TCoord;  
__Description__  
This method is used for the EndY property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_LineWidth method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_LineWidth : TCoord;  
__Description__  
This method is used for the LineWidth property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_Radius method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_Radius : TCoord;  
__Description__  
This method is used for the Radius property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_StartAngle method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_StartAngle : TAngle;  
__Description__  
This method is used for the StartAngle property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_StartX method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_StartX : TCoord;  
__Description__  
This method is used for the StartX property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_StartY method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_StartY : TCoord;  
__Description__  
This method is used for the StartY property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__GetState\_StrictHitTest method__

\(IPCB\_Arc interface\)  
__Syntax__  
Function GetState\_StrictHitTest \(HitX,HitY : TCoord\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_CenterX method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_CenterX \(AX : TCoord\);  
__Description__  
This method is used for the CenterX property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_CenterY method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_CenterY \(AY : TCoord\);  
__Description__  
This method is used for the CenterY property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_EndAngle method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_EndAngle \(Angle : TAngle\);  
__Description__  
This method is used for the EndAngle property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_LineWidth method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_LineWidth \(Width : TCoord\);  
__Description__  
This method is used for the Linewidth property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_Radius method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_Radius \(Radius : TCoord\);  
__Description__  
This method is used for the Radius property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__SetState\_StartAngle method__

\(IPCB\_Arc interface\)  
__Syntax__  
Procedure SetState\_StartAngle \(Angle : TAngle\);  
__Description__  
This method is used for the StartAngle property\.  
__Example__  
__See also__  
IPCB\_Arc interface

__Properties__

__EndAngle property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property EndAngle : TAngle Read GetState\_EndAngle Write SetState\_EndAngle;  
__Description__  
The EndAngle property denotes the end angle of the arc\. It is supported by the GetState\_EndAngle / SetState\_EndAngle and complemented by the GetState\_StartAngle/SetState\_StartAngle methods\.  
__Example__  
__See also__  
IPCB\_Arc interface

__EndX property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property EndX : TCoord Read GetState\_EndX;  
__Description__  
The EndX property denotes the end X coordinate of the arc\. It is supported by the GetState\_EndX method\.  
__Example__  
__See also__  
IPCB\_Arc interface

__EndY property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property EndY : TCoord Read GetState\_EndY;  
__Description__  
The EndY property denotes the end Y coordinate of the arc\. It is supported by the GetState\_EndY method\.  
__Example__  
__See also__  
IPCB\_Arc interface

__LineWidth property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property LineWidth : TCoord Read GetState\_LineWidth Write SetState\_LineWidth;  
__Description__  
The LineWidth property denotes the line thickness or width of the arc\. It is supported by the GetState\_LineWidth and SetState\_LineWidth methods\.  
__Example__  
__See also__  
IPCB\_Arc interface

__Radius property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property Radius : TCoord Read GetState\_Radius Write SetState\_Radius;  
__Description__  
The Radius property denotes the radius of the arc\. It is supported by the GetState\_Radius and SetState\_Radius methods\.  
__Example__  
__See also__  
IPCB\_Arc interface

__StartY property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property StartY : TCoord Read GetState\_StartY;  
__Description__  
The StartY property denotes the end Y coordinate of the arc\. It is supported by the GetState\_StartY method\.  
__Example__  
__See also__  
IPCB\_Arc interface

__StartX property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property StartX : TCoord Read GetState\_StartX;  
__Description__  
The StartX property denotes the starting X coordinate of the arc\. It is supported by the GetState\_StartX method\.  
__Example__  
__See also__  
IPCB\_Arc interface

__StartAngle property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property StartAngle : TAngle Read GetState\_StartAngle Write SetState\_StartAngle;  
__Description__  
The StartAngle property denotes the initial angle of the arc\. It is supported by the GetState\_StartAngle / SetState\_StartAngle and complemented by the GetState\_EndAngle/SetState\_EndAngle methods\.  
__Example__

1

    Arc := PCBServer\.PCBObjectFactory\(eArcObject,eNoDimension,eCreate\_Default\);

2

    Arc\.XCenter    := MilsToCoord\(Board\.XOrigin \+ 1800\);

3

    Arc\.YCenter    := MilsToCoord\(Board\.YOrigin \+ 1800\);

4

    Arc\.Radius     := MilsToCoord\(200\);

5

    Arc\.LineWidth  := MilsToCoord\(50\);

6

    Arc\.StartAngle := 0;

7

    Arc\.EndAngle   := 270;

8

    Arc\.Layer      := eBottomLayer;

__See also__  
IPCB\_Arc interface

__XCenter property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property XCenter : TCoord Read GetState\_CenterX Write SetState\_CenterX;  
__Description__  
The XCenter property denotes the X coordinate of the center of the arc\. It is supported by the GetState\_CenterX and SetState\_CenterX methods\.  
__Example__  
__See also__  
IPCB\_Arc interface

__YCenter property__

\(IPCB\_Arc interface\)  
__Syntax__  
Property YCenter : TCoord Read GetState\_CenterY Write SetState\_CenterY;  
__Description__  
The YCenter property denotes the X coordinate of the center of the arc\. It is supported by the GetState\_CenterY and SetState\_CenterY methods\.  
__Example__  
__See also__  
IPCB\_Arc interface

<a id="IPCB_BoardOutline"></a>__IPCB\_BoardOutline__

__Overview__  
The board outline object represents the board shape which defines the extents or boundary of the board in the PCB Editor\. A board outline object is essentially a closed polygon and is inherited from the __IPCB\_Polygon__ interface\.  
The PCB Editor uses the board outline shape to determine the extents of the power planes for plane edge pull back, used when splitting power planes and for calculating the board edge when design data is exported to other tools such as the 3D viewer tool\.

A board outline is a group object therefore it is composed of pull back primitives namely tracks and arcs as the vertices for the closed polygon of the board outline\. Although the board outline object interface is inherited from the __IPCB\_Polygon__ interface, you cannot use layer, net assignment and repour polygon behaviours for a board outline\.

The __IPCB\_BoardOutline__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_BoardOutline

__Notes__  
The __IPCB\_BoardOutline__ interface is inherited from __IPCB\_Polygon__ interface and in turn from __IPCB\_Group__ interface\.  
To iterate the board outline for the pullback primitives, you create and use a group iterator because the board outline is a group object which in turn is composed of child objects\.  
The __IPCB\_BoardOutline__ interface is used by the __BoardOutline__ property from the __IPCB\_Board__ interface\.  
Each new PCB document in Altium Designer is created with a board outline, so if you wish to update a board outline of a PCB document, you modify the existing board outline by massaging the board outline's vertices and then update the board outline\.

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

__IPCB\_BoardOutline methods__  
GetState\_HitPrimitive  
Rebuild  
Validate  
Invalidate  
InvalidatePlane

__IPCB\_BoardOutline properties__

__Example__

01

Procedure Query\_Board\_Outline;

02

Var

03

    PCB\_Board : IPCB\_Board;

04

    BR        : TCoordRect;

05

    NewUnit   : TUnit;

06

Begin

07

08

    PCB\_Board := PCBServer\.GetCurrentPCBBoard;

09

    If PCB\_Board = Nil Then Exit;

10

    If PCB\_Board\.IsLibrary Then Exit;

11

12

    PCB\_Board\.BoardOutline\.Invalidate;

13

    PCB\_Board\.BoardOutline\.Rebuild;

14

    PCB\_Board\.BoardOutline\.Validate;

15

16

    // The BoundingRectangle method is defined in IPCB\_Primitive interface

17

    BR := PCB\_Board\.BoardOutline\.BoundingRectangle;

18

    If PCB\_Board\.DisplayUnit = eImperial Then NewUnit := eMetric

19

                                         Else NewUnit := eImperial;

20

    ShowMessage\(

21

        'Board Outline Width  : ' \+

22

        CoordUnitToString\(BR\.right \- BR\.left,

23

                          PCB\_Board\.DisplayUnit\) \+ \#13 \+

24

        'Board Outline Height : ' \+

25

        CoordUnitToString\(BR\.top \- BR\.bottom,

26

                          PCB\_Board\.DisplayUnit\)\);

27

End;

__See also__  
PCB Design Objects  
PCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_Polygon interface  
IPCB\_GroupIterator interface  
PCB\_Outline script in \\Examples\\Scripts\\Delphiscript\\PCB folder\.  
BoardOutlineDetails script in \\Examples\\Scripts\\Delphiscript\\PCB folder\.

__Methods__

__GetState\_HitPrimitive method__

\(IPCB\_BoardOutline interface\)  
__Syntax__  
Function  GetState\_HitPrimitive \(APrimitive : IPCB\_Primitive\)  : Boolean;  
__Description__  
This function checks if a primitive that is not part of the board outline is touching or overlapping on the edge of the outline \(whether being touched or enclosed by the outline\)\.  
This primitive could be placed by the user or created and placed programmatically\. If the result is false, it means the primitive is definitely outside the outline\.  
__Example__  

__See also__  
IPCB\_BoardOutline interface

__Invalidate method__

\(IPCB\_BoardOutline interface\)  
__Syntax__  
Procedure Invalidate;  
__Description__  
This procedure renders the board outline in an invalidated state\. This state needs to be rebuilt and validated by the system\.  
__Example__  

__See also__  
IPCB\_BoardOutline interface  
Validate method

__InvalidatePlane method__

\(IPCB\_BoardOutline interface\)  
__Syntax__  
Procedure InvalidatePlane\(Layer : TLayer\);  
__Description__  
This procedure invalidates the specified layer the board outline is connected to, because the outline has been modified and this particular layer needs to be rebuilt\.  
__Example__  

__See also__  
IPCB\_BoardOutline interface

__Rebuild method__

\(IPCB\_BoardOutline interface\)  
__Syntax__  
Procedure Rebuild;  
__Description__  
This Rebuild procedure is called by the Validate method\. This method rebuilds the board outline after it has been graphically altered which potentially could affect the internal/split planes that are connected to this outline\.  
__Example__  
__See also__  
IPCB\_BoardOutline interface

__Validate method__

\(IPCB\_BoardOutline interface\)  
__Syntax__  
Procedure Validate;  
__Description__  
The Validate method refreshes and updates  the board outline object and its connections to the internal/split planes after it has been altered programmatically \(layers or the coordinates of the outline\)\.  
The Rebuild method is called implicitly by the Validate method, so executing the Invalidate then the Valid methods are sufficient when the coordinates of a board outline has been modified programmatically\.  
__Example__  

__See also__  
IPCB\_BoardOutline interface

<a id="IPCB_Component_Interface"></a>__IPCB\_Component Interface__

__Overview__  
Components are defined by footprints, which are stored in a PCB library \(or part of an integrated library\)\. Note, a footprint can be linked to a schematic component\.

When a footprint is placed in the workspace, it is assigned a designator \(and optional comment\)\.  It is then referred to as a component\. A component is composed of primitives \(normally tracks, arcs, and pads\)\.

Components are defined by footprints, which are stored in a PCB library\. When a footprint is placed in the workspace, it is assigned a designator \(and optional comment\)\. It is then referred to as a component with the defined reference\. The origin in the library editor defines the reference point of a footprint\.

The __IPCB\_Component__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Component

__Notes__  
The reference point of a component is set by the X,Y fields inherited from __IPCB\_Group__ interface\. You can obtain the bounding rectangle of the component and calculate the mid point X and Y values to enable rotation about the center of the component if desired\.  
The rotation property of a component is set according to the reference point of a component, therefore the Rotation property and the RotateAroundXY method are equivalent only if you use the X,Y parameters for the RotateAroundXY method that are the same as the reference point of the component\.  
A component is a group object and therefore composes of child objects such as arcs and tracks\. You use a group iterator to fetch the child objects for that component\.  
The __IPCB\_Component__ interface hierarchy is as follows:

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

__IPCB\_Component methods__  
GetState\_ChannelOffset  
GetState\_ComponentKind  
GetState\_Name  
GetState\_Comment  
GetState\_Pattern  
GetState\_NameOn  
GetState\_CommentOn  
GetState\_LockStrings  
GetState\_GroupNum  
GetState\_UnionIndex  
GetState\_Rotation  
GetState\_Height  
GetState\_NameAutoPos  
GetState\_CommentAutoPos  
GetState\_SourceDesignator  
GetState\_SourceUniqueId  
GetState\_SourceHierarchicalPath  
GetState\_SourceFootprintLibrary  
GetState\_SourceComponentLibrary  
GetState\_SourceLibReference  
GetState\_SourceDescription  
GetState\_FootprintDescription  
GetState\_DefaultPCB3DModel  
GetState\_IsBGA  
BoundingRectangleNoNameComment  
BoundingRectangleNoNameCommentForSignals  
SetState\_ChannelOffset  
SetState\_ComponentKind  
SetState\_Pattern  
SetState\_NameOn  
SetState\_CommentOn  
SetState\_LockStrings  
SetState\_GroupNum  
SetState\_UnionIndex  
SetState\_Rotation  
SetState\_Height  
SetState\_NameAutoPos  
SetState\_CommentAutoPos  
SetState\_SourceDesignator  
SetState\_SourceUniqueId  
SetState\_SourceHierarchicalPath  
SetState\_SourceFootprintLibrary  
SetState\_SourceComponentLibrary  
SetState\_SourceLibReference  
SetState\_SourceDescription  
SetState\_FootprintDescription  
SetState\_DefaultPCB3DModel  
ChangeNameAutoposition  
ChangeCommentAutoposition  
SetState\_xSizeySize  
RotateAroundXY  
FlipComponent  
Rebuild  
Getstate\_PadByName  
LoadCompFromLibrary  
LoadFromLibrary  
AutoPosition\_NameComment  
SetState\_EnablePinSwapping  
SetState\_EnablePartSwapping  
GetState\_EnablePinSwapping  
GetState\_EnablePartSwapping

__IPCB\_Component properties__  
ChannelOffset  
ComponentKind  
Name  
Comment  
Pattern  
NameOn  
CommentOn  
LockStrings  
GroupNum  
UnionIndex  
Rotation  
Height  
NameAutoPosition  
CommentAutoPosition  
SourceDesignator  
SourceUniqueId  
SourceHierarchicalPath  
SourceFootprintLibrary  
SourceComponentLibrary  
SourceLibReference  
SourceDescription  
FootprintDescription  
DefaultPCB3DModel  
IsBGA  
EnablePinSwapping  
EnablePartSwapping

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_GroupIterator interface  
IPCB\_Text interface  
TComponentKind enumerated values  
TTextAutoposition enumerated values

__Methods__

__AutoPosition\_NameComment method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure AutoPosition\_NameComment;  
__Description__  
This procedure invokes the auto positioning of the name and comment objects associated with the component after the Name and Comment objects' positions have been updated\.  
__Example__  
__See also__  
IPCB\_Component interface

__ChangeCommentAutoposition method__

\(IPCB\_Component interface\)  
__Syntax__  
Function ChangeCommentAutoposition \(Value : TTextAutoposition\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Component interface

__ChangeNameAutoposition method__

\(IPCB\_Component interface\)  
__Syntax__  
Function ChangeNameAutoposition \(Value : TTextAutoposition\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Component interface

__FlipComponent method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure FlipComponent;  
__Description__  
This method flips the component from one layer to the other, for example top layer to the bottom layer\.  
__Example__  
__See also__  
IPCB\_Component interface

__Getstate\_PadByName method__

\(IPCB\_Component interface\)  
__Syntax__  
Function Getstate\_PadByName \(S : TPCBString\) : IPCB\_Primitive;  
__Description__  
This method retrieves the pad object interface only if the pad's name is found which is associated with this component\.  
__Example__  
__See also__  
IPCB\_Component interface

__LoadFromLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Function LoadFromLibrary : Boolean;  
__Description__  
This function refreshes the specified component from the library\. If it is successful a true value is returned otherwise false\.  
__Example__  
__See also__  
IPCB\_Component interface

__LoadCompFromLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Function LoadCompFromLibrary : Boolean;  
__Description__  
This function refreshes the component from the library\. If it is successful a true value is returned otherwise false\.  
__Example__  
__See also__  
IPCB\_Component interface

__Rebuild method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure Rebuild;  
__Description__  
This procedure forces a rebuild of the whole component graphically\.  
__Example__  
__See also__  
IPCB\_Component interface

__RotateAroundXY method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX,AY : TCoord;Angle : TAngle\);  
__Description__  
This method rotates a component object on the PCB document about the AX, AY coordinates with an angle in degrees\. To ensure the component rotates without moving about, pass in its midpoint \(between X1,X2 and Y1, Y2\) attributes for the AX,AY parameters or use the __Rotation__ property\.  
__Example__  
__See also__  
IPCB\_Component interface  
Rotation property

__SetState\_xSizeySize method__

\(IPCB\_Component interface\)  
__Syntax__  
Function SetState\_xSizeySize : Boolean;  
__Description__  
After a component has been rebuilt programmatically for example the name and comment positions have changed, do a SetState\_xSizeySize method to update the bounding rectangle of the whole component\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState and SetState Methods__

__GetState\_ChannelOffset method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_ChannelOffset : TChannelOffset;  
__Description__  
The ChannelOffset represents the Channel Offset parameter for the component\. A channel offset denotes where the component is in a room especially when a room is being copied and a copy is created on the same document\. The copies of rooms containing components are created based on their offsets\.  
This method is used for the ChannelOffset property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_Comment method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_Comment : IPCB\_Text;  
__Description__  
This property denotes the comment object associated with the IPCB\_Component component object on the PCB document\.  
This method is used for the Comment property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_CommentAutoPos method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_CommentAutoPos : TTextAutoposition;  
__Description__  
This property denotes that the Comment text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This method is used by the __CommentAutoPos__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_CommentOn method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_CommentOn : Boolean;  
__Description__  
The CommentOn property denotes the visibility of the Name object associated with the component\.  
This method is used for the CommentOn property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_ComponentKind method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_ComponentKind : TComponentKind;  
__Description__  
A component kind can be one of the following:  
eComponentKind\_Standard: These components possess standard electrical properties, are always synchronized and are the type most commonly used on a board\.  
eComponentKind\_Mechanical: These components do not have electrical properties and will appear in the BOM\. They are synchronized if the same components exist on both the Schematic and PCB documents\. An example is a heatsink\.  
eComponentKind\_Graphical: These components are not used during synchronization or checked for electrical errors\. These components are used, for example, when adding company logos to documents\.  
eComponentKind\_NetTie\_BOM: These components short two or more different nets for routing and these components will appear in the BOM and are maintained during synchronization\.  
eComponentKind\_NetTie\_NoBOM: These components short two or more different nets for routing and these components will NOT appear in the BOM and are maintained during synchronization\. Note  
Note, the TComponentKind type is defined from RT\_Workspace unit\.  
This method is used by the ComponentKind property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_DefaultPCB3DModel method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_DefaultPCB3DModel : TPCBString;  
__Description__  
The DefaultPCB3DModel method denotes the default PCB 3D Model name as the default to be linked to this PCB component\.  
This method is used for the DeafultPCB3DModel property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_FootprintDescription method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_FootprintDescription : TPCBString;  
__Description__  
This property denotes the descriptive account of the footprint\. This method is used for the Footprint__Description__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_GroupNum method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_GroupNum : Integer;  
__Description__  
This GroupNum is not used internally\. Can use for specific purposes such as a tag or an index\.  
This GroupNum method is used for the GroupNum property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_Height method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_Height : TCoord;  
__Description__  
The height of the component denotes the height of the component\. It is used for the 3D viewer which works out the heights of components before displaying components in a 3D view\.  
This method is used for the Height property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_LockStrings method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_LockStrings : Boolean;  
__Description__  
The LockStrings property of the component denotes whether the strings of a component can be locked or not\. This method is used for the LockStrings property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_Name method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_Name : IPCB\_Text;  
__Description__  
This property denotes the name object associated with the IPCB\_Component component object on the PCB document\.  
This method is used for the Name property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_NameAutoPos method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_NameAutoPos : TTextAutoposition;  
__Description__  
The CommentAutoPos denotes that the Comment text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This method is used for the CommentAutoPos property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_NameOn method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_NameOn : Boolean;  
__Description__  
The NameOn property denotes the visibility of the Name object associated with the component\.  
This method is used for the NameOn property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_Pattern method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_Pattern : TPCBString;  
__Description__  
The Pattern denotes the footprint name of this component which is a widestring\. This method is used for the Pattern property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_Rotation method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_Rotation : TAngle;  
__Description__  
The Rotation of the component denotes the angle of the component with respect to the horizontal axis\. The rotation parameter of __TAngle__ type is between 0 and 360 degrees inclusive\.  
This method is used for the __Rotation__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceComponentLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceComponentLibrary : TPCBString;  
__Description__  
This source library field denotes the integrated library where the PCB component comes from\. Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This method is used for the SourceComponentLibrary property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceDescription method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceDescription : TPCBString;  
__Description__  
This method can include a descriptive account of the reference link to a source component or a device name\.  
This method is used for the SourceDescription property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceDesignator method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceDesignator : TPCBString;  
__Description__  
This method represents the current designator of the source component from the corresponding schematic\.  
This method is used for the SourceDesignator property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceFootprintLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceFootprintLibrary : TPCBString;  
__Description__  
This method denotes the descriptive account of the footprint\. This method is used for the SourceFootprintLibrary property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceHierarchicalPath method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceHierarchicalPath : TPCBString;  
__Description__  
This uniquely identifies the source reference path to the PCB component\. The path can be multi\-level depending on whether it is a multi channel \(sheet symbols\) or a normal design \(schematic sheets\)\.  
Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This method is used for the SourceHierarchicalPath property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceLibReference method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceLibReference : TPCBString;  
__Description__  
The source library reference property  is the name of the component from the library\. This method is used for the SourceLibReference property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_SourceUniqueId method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_SourceUniqueId : TPCBString;  
__Description__  
Unique IDs \(UIDs\) are used to match each schematic component to the corresponding PCB component\. When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library pathnames\.  
The Unique Identifier \(UID\) is a system generated value that uniquely identifies the source component\.  
This method is used for the SourceUniqueID property\.  
__Example__  
__See also__  
IPCB\_Component interface

__GetState\_UnionIndex method__

\(IPCB\_Component interface\)  
__Syntax__  
Function GetState\_UnionIndex : Integer;  
__Description__  
The UnionIndex property denotes the union index\. Unions are sets of components that will be manipulated as a block for the PCB placement\. Components in a union maintain their relative positions within the union as they are moved for example\.  
This method is used for the UnionIndex property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_ChannelOffset method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_ChannelOffset \(Value : TChannelOffset\);  
__Description__  
The ChannelOffset represents the Channel Offset parameter for the component\. A channel offset denotes where the component is in a room especially when a room is being copied and a copy is created on the same document\. The copies of rooms containing components are created based on their offsets\.  
This method is used for the ChannelOffset property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_CommentAutoPos method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_CommentAutoPos \(Value : TTextAutoposition\);  
__Description__  
This property denotes that the Comment text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This method is used by the __CommentAutoPos__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_CommentOn method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_CommentOn \(Value : Boolean\);  
__Description__  
The CommentOn property denotes the visibility of the Comment object associated with the component\. This method is used for the CommentOn property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_ComponentKind method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_ComponentKind \(Value : TComponentKind\);  
__Description__  
A component kind can be one of the following:

- eComponentKind\_Standard: These components possess standard electrical properties, are always synchronized and are the type most commonly used on a board\.
- eComponentKind\_Mechanical: These components do not have electrical properties and will appear in the BOM\. They are synchronized if the same components exist on both the Schematic and PCB documents\. An example is a heatsink\.
- eComponentKind\_Graphical: These components are not used during synchronization or checked for electrical errors\. These components are used, for example, when adding company logos to documents\.
- eComponentKind\_NetTie\_BOM: These components short two or more different nets for routing and these components will appear in the BOM and are maintained during synchronization\.
- eComponentKind\_NetTie\_NoBOM: These components short two or more different nets for routing and these components will NOT appear in the BOM and are maintained during synchronization\.

This method is used by the ComponentKind property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_DefaultPCB3DModel method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_DefaultPCB3DModel \(Value : TPCBString\);  
__Description__  
The DefaultPCB3DModel method denotes the default PCB 3D Model name as the default to be linked to this PCB component\.  
This method is used for the DeafultPCB3DModel property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_FootprintDescription method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_FootprintDescription \(Value : TPCBString\);  
__Description__  
This property denotes the descriptive account of the footprint\. This method is used for the Footprint__Description__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_GroupNum method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_GroupNum \(Value : Integer\);  
__Description__  
This GroupNum is not used internally\. Can use for specific purposes such as a tag or an index\.  
This GroupNum method is used for the GroupNum property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_Height method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_Height \(Value : TCoord\);  
__Description__  
The height of the component denotes the height of the component\. It is used for the 3D viewer which works out the heights of components before displaying components in a 3D view\.  
This method is used for the Height property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_LockStrings method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_LockStrings \(Value : Boolean\);  
__Description__  
The LockStrings property of the component denotes whether the strings of a component can be locked or not\. This method is used for the LockStrings property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_NameAutoPos method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_NameAutoPos \(Value : TTextAutoposition\);  
__Description__  
The NameAutoPos denotes that the Name text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This method is used for the NameAutoPos property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_NameOn method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_NameOn \(Value : Boolean\);  
__Description__  
The NameOn property denotes the visibility of the Name object associated with the component\.  
This method is used for the NameOn property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_Pattern method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_Pattern \(Value : TPCBString\);  
__Description__  
The Pattern denotes the footprint name of this component which is a widestring\. This method is used for the Pattern property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_Rotation method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_Rotation \(Value : TAngle\);  
__Description__  
The Rotation of the component denotes the angle of the component with respect to the horizontal axis\. The rotation parameter of __TAngle__ type is between 0 and 360 degrees inclusive\.  
This method is used for the Rotation property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceComponentLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceComponentLibrary\(Value : TPCBString\);  
__Description__  
This source library field denotes the integrated library where the PCB component comes from\. Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This method is used for the SourceComponentLibrary property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceDescription method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceDescription \(Value : TPCBString\);  
__Description__  
This method can include a descriptive account of the reference link to a source component or a device name\.  
This method is used for the Source__Description__ property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceDesignator method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceDesignator \(Value : TPCBString\);  
__Description__  
This method represents the current designator of the source component from the corresponding schematic\.  
This method is used for the SourceDesignator property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceFootprintLibrary method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceFootprintLibrary\(Value : TPCBString\);  
__Description__  
This method denotes the descriptive account of the footprint\. This method is used for the SourceFootprintLibrary property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceHierarchicalPath method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceHierarchicalPath\(Value : TPCBString\);  
__Description__  
This uniquely identifies the source reference path to the PCB component\. The path can be multi\-level depending on whether it is a multi channel \(sheet symbols\) or a normal design \(schematic sheets\)\.  
Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This method is used for the SourceHierarchicalPath property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceLibReference method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceLibReference \(Value : TPCBString\);  
__Description__  
The source library reference property is the name of the component from the library\. This method is used for the SourceLibReference property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_SourceUniqueId method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_SourceUniqueId \(Value : TPCBString\);  
__Description__  
Unique IDs \(UIDs\) are used to match each schematic component to the corresponding PCB component\. When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library pathnames\.  
The Unique Identifier \(UID\) is a system generated value that uniquely identifies the source component\.  
This method is used for the SourceUniqueId property\.  
__Example__  
__See also__  
IPCB\_Component interface

__SetState\_UnionIndex method__

\(IPCB\_Component interface\)  
__Syntax__  
Procedure SetState\_UnionIndex \(Value : Integer\);  
__Description__  
The UnionIndex property denotes the union index\. Unions are sets of components that will be manipulated as a block for the PCB placement\. Components in a union maintain their relative positions within the union as they are moved for example\.  
This method is used for the UnionIndex property\.  
__Example__  
__See also__  
IPCB\_Component interface

__Properties__

__ChannelOffset property__

\(IPCB\_Component interface\)  
__Syntax__  
Property ChannelOffset : TChannelOffset Read GetState\_ChannelOffset Write SetState\_ChannelOffset;  
__Description__  
The ChannelOffset represents the Channel Offset parameter for the component\. A channel offset denotes where the component is in a room especially when a room is being copied and a copy is created on the same document\. The copies of rooms containing components are created based on their offsets\.  
This property is supported by the GetState\_ChannelOffset and SetState\_ChannelOffset methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__Comment property__

\(IPCB\_Component interface\)  
__Syntax__  
Property Comment : IPCB\_Text Read GetState\_Comment;  
__Description__  
This property denotes the comment object associated with the IPCB\_Component component object on the PCB document\.  
This read only property is supported by the GetState\_Comment method\.  
__Example__  
__See also__  
IPCB\_Component interface  
IPCB\_Text interface

__CommentAutoPosition property__

\(IPCB\_Component interface\)  
__Syntax__  
Property CommentAutoPosition : TTextAutoposition Read GetState\_CommentAutoPos Write SetState\_CommentAutoPos;  
__Description__  
This property denotes that the Comment text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This property is supported by the GetState\_CommentAutoPosition and SetState\_CommentAutoPosition methods\.  
__Example__  
__See also__  
IPCB\_Component interface  
TTextAutoposition type

__CommentOn property__

\(IPCB\_Component interface\)  
__Syntax__  
Property CommentOn : Boolean Read GetState\_CommentOn Write SetState\_CommentOn;  
__Description__  
The CommentOn property denotes the visibility of the Comment object associated with the component\.  
This property is supported by the GetState\_CommentOn and SetState\_CommentOn methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__ComponentKind property__

\(IPCB\_Component interface\)  
__Syntax__  
Property ComponentKind : TComponentKind Read GetState\_ComponentKind Write SetState\_ComponentKind;  
__Description__  
A component kind can be one of the following:

- eComponentKind\_Standard: These components possess standard electrical properties, are always synchronized and are the type most commonly used on a board\.
- eComponentKind\_Mechanical: These components do not have electrical properties and will appear in the BOM\. They are synchronized if the same components exist on both the Schematic and PCB documents\. An example is a heatsink\.
- eComponentKind\_Graphical: These components are not used during synchronization or checked for electrical errors\. These components are used, for example, when adding company logos to documents\.
- eComponentKind\_NetTie\_BOM: These components short two or more different nets for routing and these components will appear in the BOM and are maintained during synchronization\.
- eComponentKind\_NetTie\_NoBOM: These components short two or more different nets for routing and these components will NOT appear in the BOM and are maintained during synchronization\.

This property is supported by the GetState\_ComponentKind and SetState\_ComponentKind methods\.  
__Example__  
__See also__  
IPCB\_Component interface  
TComponentKind type in the RT\_Workspace unit\.

__DefaultPCB3DModel property__

\(IPCB\_Component interface\)  
__Syntax__  
Property DefaultPCB3DModel : TPCBString Read GetState\_DefaultPCB3DModel Write SetState\_DefaultPCB3DModel;  
__Description__  
The property denotes the default PCB 3D Model name as the default to be linked to this PCB component\.  
This property is supported by the GetState\_DefaultPCB3DModel and SetState\_DefaultPCB3DModel methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__FootprintDescription property__

\(IPCB\_Component interface\)  
__Syntax__  
Property FootprintDescription : TPCBString Read GetState\_FootprintDescription Write SetState\_FootprintDescription;  
__Description__  
This property denotes the descriptive account of the footprint\.  
This property is supported by the GetState\_Footprint__Description__ and SetState\_Footprint__Description__ methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__GroupNum property__

\(IPCB\_Component interface\)  
__Syntax__  
Property GroupNum : Integer Read GetState\_GroupNum Write SetState\_GroupNum;  
__Description__  
This property is not used internally\. Can use for specific purposes such as a tag or an index\.  
This property is supported by the GetState\_GroupNum and SetState\_GroupNum methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__Height property__

\(IPCB\_Component interface\)  
__Syntax__  
Property Height : TCoord Read GetState\_Height Write SetState\_Height;  
__Description__  
The height property denotes the height of the component\. It is used for the 3D viewer which works out the heights of components before displaying components in a 3D view\.  
This property is supported by the GetState\_Height and SetState\_Height methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__LockStrings property__

\(IPCB\_Component interface\)  
__Syntax__  
Property LockStrings : Boolean Read GetState\_LockStrings Write SetState\_LockStrings;  
__Description__  
The LockStrings property denotes whether the strings of a component can be locked or not\.  
This property is supported by the GetState\_LockStrings and SetState\_LockStrings methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__Name property__

\(IPCB\_Component interface\)  
__Syntax__  
Property Name : IPCB\_Text Read GetState\_Name;  
__Description__  
This property denotes the name object associated with the IPCB\_Component object on the PCB document and represents the pattern string\.  
This read only property is supported by the GetState\_Name method\.  
__Example__  
__See also__  
IPCB\_Component interface  
IPCB\_Text interface

__NameAutoPosition property__

\(IPCB\_Component interface\)  
__Syntax__  
Property NameAutoPosition : TTextAutoposition Read GetState\_NameAutoPos Write SetState\_NameAutoPos;  
__Description__  
This property denotes that the Name text object is to be positioned relative to the component object depending on what the __TTextAutoposition__ parameter is\.  
This property is supported by the GetState\_NameAutoPos and SetState\_NameAutoPos methods\.  
__Example__  
__See also__  
IPCB\_Component interface  
TTextAutoposition type

__NameOn property__

\(IPCB\_Component interface\)  
__Syntax__  
Property NameOn : Boolean Read GetState\_NameOn Write SetState\_NameOn;  
__Description__  
The NameOn property denotes the visibility of the Name object associated with the component\.  
This property is supported by the GetState\_NameOn and SetState\_NameOn methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__Pattern property__

\(IPCB\_Component interface\)  
__Syntax__  
Property Pattern : TPCBString Read GetState\_Pattern Write SetState\_Pattern;  
__Description__  
The property denotes the footprint name of this component which is a widestring\.  
This property is supported by the GetState\_Pattern and SetState\_Pattern methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__Rotation property__

\(IPCB\_Component interface\)  
__Syntax__  
Property Rotation : TAngle Read GetState\_Rotation Write SetState\_Rotation;  
__Description__  
This property denotes the angle of the component with respect to the horizontal axis\. The rotation parameter of __TAngle__ type is between 0 and 360 degrees inclusive\.  
This property is supported by the GetState\_Rotation and SetState\_Rotation methods\.  
__Example__  
__See also__  
IPCB\_Component interface  
TAngle type

__SourceComponentLibrary property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceComponentLibrary : TPCBString Read GetState\_SourceComponentLibrary Write SetState\_SourceComponentLibrary;  
__Description__  
This source library field denotes the integrated library where the PCB component comes from\. Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This property is supported by the GetState\_SourceComponentLibrary and SetState\_SourceComponentLibrary methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceDescription property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceDescription : TPCBString Read GetState\_SourceDescription Write SetState\_SourceDescription;  
__Description__  
This property can include a descriptive account of the reference link to a source component or a device name\.  
This property is supported by the GetState\_Source__Description__ and SetState\_Source__Description__ methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceDesignator property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceDesignator : TPCBString Read GetState\_SourceDesignator Write SetState\_SourceDesignator;  
__Description__  
This property represents the current designator of the source component from the corresponding schematic\.  
This property is supported by the GetState\_SourceDesignator and SetState\_SourceDesignator methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceFootprintLibrary property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceFootprintLibrary : TPCBString Read GetState\_SourceFootprintLibrary Write SetState\_SourceFootprintLibrary;  
__Description__  
This field shows the name of the footprint\. The footprint is the graphical representation of a PCB component and is used to display it on the PCB, and usually contains component outline and connection pads along with an unique designator\.  
Footprints are stored in PCB library files or Integrated libraries, which can be edited using the PCB Library Editor to create new footprints or edit existing ones\.  
This property is supported by the GetState\_SourceFootprintLibrary and SetState\_SourceFootprintLibrary methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceHierarchicalPath property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceHierarchicalPath : TPCBString Read GetState\_SourceHierarchicalPath Write SetState\_SourceHierarchicalPath;  
__Description__  
This property uniquely identifies the source reference path to the PCB component\. The path can be multi\-level depending on whether it is a multi channel \(sheet symbols\) or a normal design \(schematic sheets\)\.  
Note: When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library path names\.  
This property is supported by the GetState\_SourceHierarchicalPath and SetState\_SourceHierarchicalPath methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceLibReference property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceLibReference : TPCBString Read GetState\_SourceLibReference Write SetState\_SourceLibReference;  
__Description__  
The source library reference property  is the name of the component from the library\.  
This property is supported by the GetState\_SourceLibReference and SetState\_SourceLibReference methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__SourceUniqueId property__

\(IPCB\_Component interface\)  
__Syntax__  
Property SourceUniqueId : TPCBString Read GetState\_SourceUniqueId Write SetState\_SourceUniqueId;  
__Description__  
Unique IDs \(UIDs\) are used to match each schematic component to the corresponding PCB component\. When a schematic is transferred to a blank PCB using the Update command, the source reference links for each PCB footprint is populated with source library pathnames\.  
The Unique Identifier \(UID\) is a system generated value that uniquely identifies the source component\.  
This property is supported by the GetState\_SourceUniqueId and SetState\_SourceUniqueId methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__UnionIndex property__