\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function IsLayerMember \(L : TLayer\) : Boolean;  
__Description__  
This function checks if this layer is part of the Object Class that is hosting layer classes only \(of eClassMemberKind\_Layer type\)\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind enumerated values

__IsMember method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function IsMember \(S : TPCBString\) : Boolean;  
__Description__  
This function checks if the member \(by name\) is part of the Object Class\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__IsValidObjectKind method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function IsValidObjectKind \(P : IPCB\_Primitive\) : Boolean;  
__Description__  
This function checks if the PCB design object is a valid object kind for this object class\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__RemoveAllMembers method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure RemoveAllMembers;  
__Description__  
This method removes all the members for this object class\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__RemoveLayerMember method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure RemoveLayerMember \(L : TLayer\);  
__Description__  
This method removes the specified layer from the Object Class that hosts the layer classes only\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__RemoveMember method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure RemoveMember \(P : IPCB\_Primitive\);  
__Description__  
This method removes the specified PCB design object from the list of members in this Object class\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__Properties__

__MemberKind property__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Property MemberKind : TClassMemberKind Read GetState\_MemberKind Write SetState\_MemberKind;  
__Description__  
This property denotes which particular objects can be stored in the list\.  
This property is supported by the GetState\_MemberKind and SetState\_MemberKind methods\.  
__Example__

01

Var

02

    Board    : IPCB\_Board;

03

    NetClass : IPCB\_ObjectClass;

04

Begin

05

    Board := PCBServer\.GetCurrentPCBBoard;

06

    If Board = Nil Then Exit;

07

    PCBServer\.PreProcess;

08

    NetClass := PCBServer\.PCBClassFactoryByClassMember\(eClassMemberKind\_Net\);

09

    NetClass\.SuperClass := False;

10

    NetClass\.Name := 'NetGndClass';

11

    NetClass\.AddMemberByName\('GND'\);

12

    Board\.AddPCBObject\(NetClass\);

13

    PCBServer\.PostProcess;

14

End;

__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind type

__MemberName property__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Property MemberName \[I : Integer\] : TPCBString Read GetState\_MemberName;  
__Description__  
This property denotes the member name from the list of members in the IPCB\_Object class interface\. This read only property is supported by the GetState\_MemberName method\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__Name property__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Name Write SetState\_Name;  
__Description__  
This property denotes the name of this Object Class object for the PCB document\. This property is supported by the GetState\_Name and SetState\_Name methods\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__SuperClass property__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Property SuperClass : Boolean Read GetState\_SuperClass Write SetState\_SuperClass;  
__Description__  
The __SuperClass__ property denotes whether or not the interface contains all members of a particular kind\. If this field is set to true, the members of the __IPCB\_ObjectClass__ object cannot be edited\.  
By default, a super class contains all members of the same member kind \- for example, if layer kind is selected, then all layers is included for this Object Class\.  
This property is supported by the GetState\_SuperClass and SetState\_SuperClass methods\.  
__Code Snippet Example__

01

// AObjectClass is a IPCB\_ObjectClass interface type

02

If AObjectClass\.SuperClass Then

03

Begin

04

    // is a super class\!

05

    Case AObjectClass\.MemberKind Of

06

            eClassMemberKind\_Net       : ARpt\.Add\('All Nets'\);

07

            eClassMemberKind\_Component : ARpt\.Add\('All Components'\);

08

            eClassMemberKind\_FromTo    : ARpt\.Add\('All FromTos'\);

09

            eClassMemberKind\_Pad       : ARpt\.Add\('All Pads'\);

10

            eClassMemberKind\_Layer     : ARpt\.Add\('All Layers'\);

11

    End;

12

End;

__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind type

<a id="IPCB_Pad_Interface"></a>__IPCB\_Pad Interface__

__Overview__  
Pad objects are hole connectors for components and for connection to signal tracks\.  Pads can be either multilayered or single layered\.  Pad shapes include circular, rectangular, rounded rectangular or octagonal with X, Y sizes definable from 1 to 10000mils\. 

Hole size can range from 0 \(SMD\) to 1000mils\. 

Pads can be identified with a designator up to four characters long\.  On a multilayer pad, the Top layer, Mid layer and Bottom layer pad shape and size can be independently assigned to define a pad stack\.  Note that the surface mount components and edge connectors have single layer pads on the Top and/or Bottom layers\.

Altium Designer supports a Full Stack Pad mode for ultimate control over the padstack\. This allows different sizes and shapes on all signal layers\. Also pads and vias can be selectively tented on the top or bottom side\. Altium Designer also supports three types of pad definitions: Simple, Top\-Mid\-Bottom and Full Stack\.

__Notes__  
The Corner radius attribute of rounded pads is represented by the IPCB\_Pad2 interface\.  
A Paste Mask expansion property for a pad object is currently relevant just for pads on top and bottom copper layers\.  
Vias do not have a paste mask layer\. Paste mask layers are used to design stencils which will selectively place solder paste on a blank PCB\. Solder paste is only placed on pads where component leads are to be soldered to them\. Vias normally don't have anything soldered onto them\.

__The IPCB\_Pad interface hierarchy;__  
IPCB\_Primitive  
IPCB\_Pad  
IPCB\_Pad2

__IPCB\_Pad methods__  
GetState\_XLocation  
GetState\_YLocation  
SetState\_XLocation  
SetState\_YLocation  
GetState\_PinDescriptorString  
GetState\_IsConnectedToPlane  
SetState\_IsConnectedToPlane  
GetState\_Mode  
SetState\_Mode  
GetState\_XSizeOnLayer  
GetState\_YSizeOnLayer  
GetState\_ShapeOnLayer  
GetState\_XStackSizeOnLayer  
GetState\_YStackSizeOnLayer  
GetState\_StackShapeOnLayer  
GetState\_TopXSize  
GetState\_TopYSize  
GetState\_TopShape  
GetState\_BotXSize  
GetState\_BotYSize  
GetState\_BotShape  
GetState\_MidXSize  
GetState\_MidYSize  
GetState\_MidShape  
GetState\_SwapID\_Pad  
GetState\_SwapID\_Gate  
GetState\_SwappedPadName  
GetState\_GateID  
GetState\_OwnerPart\_ID  
SetState\_BotShape  
SetState\_BotXSize  
SetState\_BotYSize  
SetState\_MidShape  
SetState\_MidXSize  
SetState\_MidYSize  
SetState\_TopShape  
SetState\_TopXSize  
SetState\_TopYSize  
SetState\_XStackSizeOnLayer  
SetState\_YStackSizeOnLayer  
SetState\_StackShapeOnLayer  
SetState\_SwapID\_Pad  
SetState\_SwapID\_Gate  
SetState\_SwappedPadName  
SetState\_OwnerPart\_ID  
GetState\_HoleSize  
SetState\_HoleSize  
GetState\_Rotation  
SetState\_Rotation  
GetState\_Name  
SetState\_Name  
GetState\_WidthOnLayer  
GetState\_Cache  
SetState\_Cache  
GetState\_Plated  
GetState\_DrillType  
GetState\_HoleType  
GetState\_HoleWidth  
GetState\_XPadOffsetOnLayer  
GetState\_YPadOffsetOnLayer  
GetState\_HoleRotation  
SetState\_DrillType  
SetState\_HoleType  
SetState\_HoleWidth  
SetState\_XPadOffsetOnLayer  
SetState\_YPadOffsetOnLayer  
SetState\_HoleRotation  
BoundingRectangleOnLayer  
RotateAroundXY  
IsPadStack  
IsSurfaceMount  
PlaneConnectionStyleForLayer  
InvalidateSizeShape  
ValidateSizeShape  
ReValidateSizeShape  
UpdateCache  
InvalidateCache

__IPCB\_Pad properties__  
X  
Y  
PinDescriptor  
IsConnectedToPlane  
Mode  
XSizeOnLayer  
YSizeOnLayer  
ShapeOnLayer  
XStackSizeOnLayer  
YStackSizeOnLayer  
StackShapeOnLayer  
TopXSize  
TopYSize  
MidXSize  
MidYSize  
BotXSize  
BotYSize  
TopShape  
MidShape  
BotShape  
HoleSize  
Rotation  
Name  
Width  
SwapID\_Pad  
SwapID\_Gate  
SwappedPadName  
Cache  
WidthOnLayer  
OwnerPart\_ID  
Plated  
DrillType  
HoleType  
HoleWidth  
XPadOffset  
YPadOffset  
HoleRotation

__Example__  
This example creates a new pad object and its associated new pad cache and places it on the current PCB document\.

01

Procedure PlaceAPCBPad;

02

Var

03

    Board         : IPCB\_Board;

04

    WorkSpace     : IWorkSpace;

05

06

    Pad           : IPCB\_Pad;

07

    Padcache      : TPadCache;

08

    TopLayerWidth : TCoord;

09

Begin

10

    //Create a new PCB document

11

    WorkSpace := GetWorkSpace;

12

    If WorkSpace = Nil Then Exit;

13

    Workspace\.DM\_CreateNewDocument\('PCB'\);

14

15

    If PCBServer = Nil Then Exit;

16

    Board := PCBServer\.GetCurrentPCBBoard;

17

    If Board = Nil then exit;

18

19

    // Create a Pad object

20

    Pad := PCBServer\.PCBObjectFactory\(ePadObject, eNoDimension, eCreate\_Default\);

21

    Pad\.SetState\_XLocation  := MilsToCoord\(3000\);

22

    Pad\.SetState\_YLocation  := MilsToCoord\(3000\);

23

24

    // Setup a pad cache which has common values

25

    Padcache := Pad\.GetState\_Cache;

26

    Padcache\.ReliefAirGap := MilsToCoord\(11\);

27

    Padcache\.PowerPlaneReliefExpansion := MilsToCoord\(11\);

28

    Padcache\.PowerPlaneClearance       := MilsToCoord\(11\);

29

    Padcache\.ReliefConductorWidth      := MilsToCoord\(11\);

30

    Padcache\.SolderMaskExpansion       := MilsToCoord\(11\);

31

    Padcache\.SolderMaskExpansionValid  := eCacheManual;

32

    Padcache\.PasteMaskExpansion        := MilsToCoord\(11\);

33

    Padcache\.PasteMaskExpansionValid   := eCacheManual;

34

35

    // Assign a new pad cache to the pad

36

    Pad\.SetState\_Cache := Padcache;

37

    TopLayerWidth      := Pad\.GetState\_WidthOnLayer\(eBottomLayer\);

38

    Board\.AddPCBObject\(Pad\);

39

40

    // Refresh PCB document

41

    ResetParameters;

42

    AddStringParameter\('Action', 'All'\);

43

    RunProcess\('PCB:Zoom'\);

44

End;

__See also__  
IPCB\_Primitive interface  
IPCB\_Via interface  
TPadName value  
TPadCache value  
TPadSwapName value  
TShape enumerated values  
TAngle value  
PCB Design Objects  
Script examples in \\Examples\\Scripts\\DelphiScript\\PCB\\ folder

__GetState and SetState Methods__

__ GetState\_DrillType method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function  GetState\_DrillType : TExtendedDrillType;  
__Description__  
This function obtains the drill type used for this pad’s hole on the PCB\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ GetState\_HoleType method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function  GetState\_HoleType : TExtendedHoleType;  
__Description__  
This function obtains the hole type of the pad’s hole\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ GetState\_HoleWidth method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function  GetState\_HoleWidth : TCoord;  
__Description__  
This function obtains the hole width in TCoord units\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ GetState\_XPadOffsetOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function  GetState\_XPadOffsetOnLayer  \(L : TLayer\) : TCoord;  
__Description__  
This function is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ GetState\_YPadOffsetOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_YPadOffsetOnLayer  \(L : TLayer\) : TCoord;  
__Description__  
This function is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_DrillType method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_DrillType \(DrillType : TExtendedDrillType\);  
__Description__  
This procedure sets the drill type used to drill a hole on the PCB\. This attribute is used by the manufacturing output file such as the CAM files\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TExtendedDrillType type\.

__SetState\_HoleType method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_HoleType \(HoleType  : TExtendedHoleType\);  
__Description__  
This procedure sets the hole type of the pad’s hole\. There are three hole types – Round Hole, Square Hole and Slotted Hole\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TExtendedHoleType type\.

__SetState\_HoleWidth method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_HoleWidth \(HoleWidth : TCoord\);  
__Description__  
This function sets the hole width of a pad’s hole on the PCB\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_XPadOffsetOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_XPadOffsetOnLayer\(L       : TLayer;  
                                     XOffset : TCoord\);  
__Description__  
This function is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_YPadOffsetOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_YPadOffsetOnLayer\(L       : TLayer;  
                                     YOffset : TCoord\);  
__Description__  
This function is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_HoleRotation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_HoleRotation \(HRotation : TAngle\);  
__Description__  
This function sets the rotation property of a pad’s hole\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TAngle type

__SetState\_YStackSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_YStackSizeOnLayer \(L : TLayer;Value : TCoord\);  
__Description__  
This YStackSizeOnLayer procedure determines the size of the pad in Y direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\.  
This method is used for the YStackSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_YLocation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_YLocation \(AY : TCoord\);  
__Description__  
The SetState\_XLocation and SetState\_YLocation methods set the location of the pad with respect to the PCB document it is on\.  
These methods are used for the X and Y properties\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_XStackSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_XStackSizeOnLayer \(L : TLayer;Value : TCoord\);  
__Description__  
This XStackSizeOnLayer procedure determines the size of the pad in X direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\.  
This method is used for the XStackSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_XLocation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_XLocation \(AX : TCoord\);  
__Description__  
The SetState\_XLocation and SetState\_YLocation methods set the location of the pad with respect to the PCB document it is on\.  
These methods are used for the X and Y properties\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_TopYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_TopYSize \(Value : TCoord\);  
__Description__  
This procedure determines the top size in U direction of the pad with a top\-middle\-bottom stack up\. This method is used for the TopYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_TopXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_TopXSize \(Value : TCoord\);  
__Description__  
This procedure determines the top size in X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the TopXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_TopShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_TopShape \(Value : TShape\);  
__Description__  
This procedure determines the top shape of the pad with a top\-middle\-bottom stack up\. This method is used for the TopShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__SetState\_SwappedPadName method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_SwappedPadName \(Value : TPCBString\);  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SetState\_SwapID\_Pad method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_SwapID\_Pad \(Value : TPCBString\);  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SetState\_SwapID\_Gate method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_SwapID\_Gate \(Value : TPCBString\);  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SetState\_StackShapeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_StackShapeOnLayer \(L : TLayer;Value : TShape\);  
__Description__  
This procedure determines what shape the pad stack is on that layer\. This method is used by the StackShapeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_Rotation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_Rotation \(Value : TAngle\);  
__Description__  
This method sets the rotation of the pad object in degrees \(of TAngle type 0 \-360 degrees\)\. This method is used for the Rotation property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_Name method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_Name \(Value : TPCBString\);  
__Description__  
This method sets the name which is the designator of this pad object\. This method is used for the Name property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SetState\_Mode method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_Mode \(Mode : TPadMode\);  
__Description__  
The __Mode__ property determines what type of pad it is \- a simple pad, a pad with three Top, Middle and Bottom layer stack up or a pad with a complex stack up\.  
If Mode is Simple \(ePadMode\_Simple\) then you only deal with X,Y locations and the TopXSize, TopYSize and TopShape properties\.  
If Mode is Top\-Mid\-Bottom stack \(ePadMode\_LocalStack\) then you deal with X,Y Locations, Top\.\., Mid\.\. and Bot\.\. properties\.  
If Mode is Full Stack \(ePadMode\_ExternalStack\) then you deal with XStackSizeOnLayer, YStackSizeOnLayer and StackShapeOnLayer properties\.  
The method is used by the Mode property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_MidYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_MidYSize \(Value : TCoord\);  
__Description__  
This procedure determines the middle size in Y direction of the pad with a top\-middle\-bottom stack up\. This method is used for the MidYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_MidXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_MidXSize \(Value : TCoord\);  
__Description__  
This procedure determines the middle size in X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the MidXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_MidShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_MidShape \(Value : TShape\);  
__Description__  
This procedure determines the middle shape of the pad with a top\-middle\-bottom stack up\. This method is used for the MidShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__SetState\_IsConnectedToPlane method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_IsConnectedToPlane \(Layer : TLayer;Value : Boolean\);  
__Description__  
This method sets a boolean value to connect the pad to the specified plane \(one of the power internal planes\) or not\.  
This method is used by the IsConnectedToPlane property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_HoleSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_HoleSize \(Value : TCoord\);  
__Description__  
This method sets  the hole size of a pad object where component pins or wires can be passed through and soldered in place\.  
This method is used by the HoleSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_GateID method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_GateID \(Value : Integer\);  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_Cache method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_Cache \(Value : TPadCache\);  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_BotYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_BotYSize \(Value : TCoord\);  
__Description__  
This procedure determines the bottom size in the Y direction of the pad with a top\-middle\-bottom stack up\. This method is used for the BotYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_BotXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_BotXSize \(Value : TCoord\);  
__Description__  
This procedure determines the bottom size in the X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the BotXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__SetState\_BotShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_BotShape \(Value : TShape\);  
__Description__  
This procedure determines the bottom shape of the pad with a top\-middle\-bottom stack up\. This method is used for the BotShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_YStackSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_YStackSizeOnLayer \(L : TLayer\) : TCoord;  
__Description__  
This YStackSizeOnLayer function determines the size of the pad in Y direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\.  
This method is used for the YStackSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_YSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_YSizeOnLayer \(L : TLayer\) : TCoord;  
__Description__  
This function determines what size in Y direction the pad is on this specified layer\. This method is used for the YSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_YLocation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_YLocation : TCoord;  
__Description__  
The GetState\_XLocation and GetState\_YLocation methods retrieves  the location of the pad with respect to the PCB document it is on\.  
These methods are used for the X and Y properties\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_XStackSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_XStackSizeOnLayer \(L : TLayer\) : TCoord;  
__Description__  
This XStackSizeOnLayer function determines the size of the pad in X direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\.  
This method is used for the XStackSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_XSizeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_XSizeOnLayer \(L : TLayer\) : TCoord;  
__Description__  
This function determines what size in X direction the pad is on this specified layer\. This method is used for the XSizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_XLocation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_XLocation : TCoord;  
__Description__  
The GetState\_XLocation and GetState\_YLocation methods retrieves  the location of the pad with respect to the PCB document it is on\.  
These methods are used for the X and Y properties\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_WidthOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_WidthOnLayer \(L : TLayer\) : TCoord;  
__Description__  
This WidthOnLayer function retrieves the width of the pad on the specified layer\. This property is used by the WidthOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_TopYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_TopYSize : TCoord;  
__Description__  
This function determines the top size in Y direction of the pad with a top\-middle\-bottom stack up\. This method is used for the TopYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_TopXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_TopXSize : TCoord;  
__Description__  
This function determines the top size in X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the TopXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_TopShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_TopShape : TShape;  
__Description__  
This function determines the top shape of the pad with a top\-middle\-bottom stack up\. This method is used for the TopShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_SwappedPadName method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_SwappedPadName : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__GetState\_SwapID\_Pad method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_SwapID\_Pad : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__GetState\_SwapID\_Gate method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_SwapID\_Gate : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__GetState\_StackShapeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_StackShapeOnLayer \(L : TLayer\) : TShape;  
__Description__  
This function determines what shape the pad stack is on that layer\. This method is used by the StackShapeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_ShapeOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_ShapeOnLayer \(L : TLayer\) : TShape;  
__Description__  
This property determines what shape the pad stack is on that layer\. This method is used by the ShapeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_Rotation method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_Rotation : TAngle;  
__Description__  
This method retrieves the rotation of the pad object in degrees \(of TAngle type 0 \-360 degrees\)\.  
This method is used for the Rotation property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_PinDescriptorString method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_PinDescriptorString : TPCBString;  
__Description__  
This function obtains the description of the pin which represents the pad of a component\. This method is used by the PinDescriptorString property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__GetState\_Name method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_Name : TPCBString;  
__Description__  
This method retrieves the name which is the designator of this pad object\.  
This method is used for the Name property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__GetState\_Mode method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_Mode : TPadMode;  
__Description__  
The __Mode__ function determines what type of pad it is \- a simple pad, a pad with three Top, Middle and Bottom layer stack up or a pad with a complex stack up\.  
If Mode is Simple \(ePadMode\_Simple\) then you only deal with X,Y locations and the TopXSize, TopYSize and TopShape properties\.  
If Mode is Top\-Mid\-Bottom stack \(ePadMode\_LocalStack\) then you deal with X,Y Locations, Top\.\., Mid\.\. and Bot\.\. properties\.  
If Mode is Full Stack \(ePadMode\_ExternalStack\) then you deal with XStackSizeOnLayer, YStackSizeOnLayer and StackShapeOnLayer properties\.  
The method is used by the Mode property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_MidYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_MidYSize : TCoord;  
__Description__  
This function determines the middle size in Y direction of the pad with a top\-middle\-bottom stack up\. This method is used by the MidYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_MidXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_MidXSize : TCoord;  
__Description__  
This function determines the middle size in X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the MidXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_MidShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_MidShape : TShape;  
__Description__  
This function determines the middle shape of the pad with a top\-middle\-bottom stack up\. This method is used for the MidShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_IsConnectedToPlane method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_IsConnectedToPlane \(Layer : TLayer\) : Boolean;  
__Description__  
This method retrieves a boolean value  whether the pad is connected to the specified plane \(one of the power internal planes\) or not\.  
This method is used by the IsConnectedToPlane property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_HoleSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_HoleSize : TCoord;  
__Description__  
This method retrieves  the hole size of a pad object where component pins or wires can be passed through and soldered in place\.  
This method is used by the HoleSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_GateID method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_GateID : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_Cache method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_Cache : TPadCache;  
__Description__  
This method retrieves the global cache that stores various design rule settings for pad and via objects\.  
This method is used for the Cache property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_BotYSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_BotYSize : TCoord;  
__Description__  
This function determines the bottom size in Y direction of the pad with a top\-middle\-bottom stack up\. This method is used for the BotYSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_BotXSize method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_BotXSize : TCoord;  
__Description__  
This function determines the bottom size in X direction of the pad with a top\-middle\-bottom stack up\. This method is used for the BotXSize property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__GetState\_BotShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function GetState\_BotShape : TShape;  
__Description__  
This function determines the bottom shape of the pad with a top\-middle\-bottom stack up\. This method is used for the BotShape property\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__GetState\_Plated method__

\(IPCB\_PCB interface\)  
__Syntax__  
Function  GetState\_Plated : Boolean;  
__Description__  
This method determines whether the pad is plated or not\. This method is used for the Plated property\.  
__Example__  

__See also__  
IPCB\_Pad interface

__SetState\_Plated method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure SetState\_Plated \(Value  : Boolean\);  
__Description__  
This method determines whether the pad is plated or not\. This method is used for the Plated property\.  
__Example__  

__See also__  
IPCB\_Pad interface

__Methods__

__BoundingRectangleOnLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function BoundingRectangleOnLayer \(ALayer : TLayer\) : TCoordRect;  
__Description__  
This function retrieves the bounding rectangle \(of TCoordRect type\) of the component on the specified layer of the PCB document\.  
__Example__  
__See also__  
IPCB\_Pad interface

__IsPadStack method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function IsPadStack : Boolean;  
__Description__  
This function determines whether the pad is a full stack up pad or not\. Use this function before you change the properties of a pad stack\. You can also use the Mode property to check what type of stack up the pad is\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPadMode property

__IsSurfaceMount method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function IsSurfaceMount : Boolean;  
__Description__  
The pad is a surface mount if the holesize is 0 in size and is on top and/or bottom layers only\.  
__Example__  
__See also__  
IPCB\_Pad interface

__PlaneConnectionStyleForLayer method__

\(IPCB\_Pad interface\)  
__Syntax__  
Function PlaneConnectionStyleForLayer\(ALayer : TLayer\) : TPlaneConnectionStyle;  
__Description__  
Pads automatically connect to an internal power plane layer that is assigned the same net name\. The pad will connect to the plane depending on the applicable Power Plane Connect Style design rule\. If you do not want pads to connect to power planes, add another Power Plane Connect Style design rule targeting the specific pads required and with a connection style of No Connect\.  
The Connect Style defines the style of the connection from a pin of a component, targeted by the scope \(Full Query\) of the rule, to a power plane\.

The following three styles as per the TPlaneConnectionStyle type are available:

- __ePlaneNoConnect__ \- do not connect a component pin to the power plane\.
- __ePlaneReliefConnect__ \- connect using solid copper to the pin\.
- __ePlaneDirectConnect__ \(default\) \- connect using a thermal relief connection\.

__Example__  
__See also__  
IPCB\_Pad interface  
TPlaneConnectionStyle type

__RotateAroundXY method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX, AY : TCoord;Angle : TAngle\);  
__Description__  
This method rotates a pad object on the PCB document about the AX, AY coordinates with an angle in degrees\.  
To ensure the pad rotates without moving about, pass in its midpoint \(between X1,X2 and Y1, Y2\) attributes for the AX,AY parameters or use the Rotation property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__Invalidate method__

\(IPCB\_PCB interface\)  
__Syntax__  
Procedure InvalidateSizeShape;  
__Description__  
__Example__  

__See also__  
IPCB\_Pad interface

__ValidateSizeShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure ValidateSizeShape;  
__Description__  
__Example__  

__See also__  
IPCB\_Pad interface

__RevalidateSizeShape method__

\(IPCB\_Pad interface\)  
__Syntax__  
Procedure ReValidateSizeShape;  
__Description__  
__Example__  

__See also__  
IPCB\_Pad interface

__Properties__

__BotShape property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property BotShape : TShape Read GetState\_BotShape Write SetState\_BotShape;  
__Description__  
This property determines the bottom shape of the pad with a top\-middle\-bottom stack up\. This property is supported by the GetState\_BotShape and SetState\_BotShape methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type  
TShape type

__BotXSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property BotXSize : TCoord Read GetState\_BotXSize Write SetState\_BotXSize;  
__Description__  
This property determines the bottom X Size of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_BotXSize and SetState\_BotXSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__BotYSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property BotYSize : TCoord Read GetState\_BotYSize Write SetState\_BotYSize;  
__Description__  
This property determines the bottom Y Size of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_BotYSize and SetState\_BotYSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__Cache property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Cache : TPadCache Read GetState\_Cache Write SetState\_Cache;  
__Description__  
This Cache property represents  the global cache that stores various design rule settings for pad and via objects\. This property is supported by the GetState\_Cache and SetState\_Cache methods\.  
__Example__

01

    \(\* Create a Pad object\*\)

02

    Pad := PCBServer\.PCBObjectFactory\(ePadObject, eNoDimension, eCreate\_Default\);

03

    Pad\.X  := MilsToCoord\(3000\);

04

    Pad\.Y  := MilsToCoord\(3000\);

05

06

    \(\* Setup a pad cache \*\)

07

    Padcache := Pad\.Cache;

08

    Padcache\.ReliefAirGap := MilsToCoord\(11\);

09

    Padcache\.PowerPlaneReliefExpansion := MilsToCoord\(11\);

10

    Padcache\.PowerPlaneClearance       := MilsToCoord\(11\);

11

    Padcache\.ReliefConductorWidth      := MilsToCoord\(11\);

12

    Padcache\.SolderMaskExpansion       := MilsToCoord\(11\);

13

    Padcache\.SolderMaskExpansionValid  := eCacheManual;

14

    Padcache\.PasteMaskExpansion        := MilsToCoord\(11\);

15

    Padcache\.PasteMaskExpansionValid   := eCacheManual;

16

17

    \(\* Assign the new pad cache to the pad\*\)

18

    Pad\.Cache := Padcache;

19

    Board\.AddPCBObject\(Pad\);

__See also__  
IPCB\_Pad interface  
TPadCache type  
PadViaCacheProperties script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder\.  
DrawObjects script from  \\Examples\\Scripts\\DelphiScript Scripts\\PCB\\ folder\.

__GateID property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property GateID : Integer Read GetState\_GateID Write SetState\_GateID;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__HoleSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property HoleSize : TCoord Read GetState\_HoleSize Write SetState\_HoleSize;  
__Description__  
This property represents the hole size of a pad object where component pins or wires can be passed through and soldered in place\.  
This property is supported by the GetState\_HoleSize and SetState\_HoleSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__Name property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Name Write SetState\_Name;  
__Description__  
This Name property represents the designator of a pad object\.  
This method is supported by the GetState\_Name and SetState\_Name methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__Rotation property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Rotation : TAngle Read GetState\_Rotation Write SetState\_Rotation;  
__Description__  
This Rotation property deals with the rotation of the pad object in degrees \(of TAngle type 0 \-360 degrees\)\.  
This property is supported by GetState\_Rotation and SetState\_Rotation methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TAngle type

__SwapID\_Gate property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property SwapID\_Gate : TPCBString Read GetState\_SwapID\_Gate Write SetState\_SwapID\_Gate;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SwapID\_Pad property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property SwapID\_Pad : TPCBString Read GetState\_SwapID\_Pad Write SetState\_SwapID\_Pad;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__SwappedPadName property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property SwappedPadName : TPCBString Read GetState\_SwappedPadName Write SetState\_SwappedPadName;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__Width property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Width \[L : TLayer\] : TCoord Read GetState\_WidthOnLayer;  
__Description__  
This read only property is supported by the GetState\_WidthOnLayer method and is equivalent to the WidthOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__WidthOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property WidthOnLayer\[L : TLayer\] : TCoord Read GetState\_WidthOnLayer;  
__Description__  
This property retrieves the width of the pad on the specified layer\. This read only property is supported by the GetState\_WidthOnLayer method and is equivalent to the Width property\.  
__Example__  
__See also__  
IPCB\_Pad interface

__IsConnectedToPlane property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property IsConnectedToPlane\[L : TLayer\] : Boolean Read GetState\_IsConnectedToPlane Write SetState\_IsConnectedToPlane;  
__Description__  
This property determines whether the pad is connected to the specified plane \(one of the power internal planes\)\.  
This property is supported by GetState\_IsConnectedToPlane and SetState\_IsConnectedToPlane methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__MidShape property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property MidShape : TShape Read GetState\_MidShape Write SetState\_MidShape;  
__Description__  
This property determines the middle shape of the pad with a top\-middle\-bottom stack up\. This property is supported by the GetState\_MidShape and SetState\_MidShape methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__MidXSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property MidXSize : TCoord Read GetState\_MidXSize Write SetState\_MidXSize;  
__Description__  
This property determines the middle shape of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_MidXSize and SetState\_MidXSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__MidYSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property MidYSize : TCoord Read GetState\_MidYSize Write SetState\_MidYSize;  
__Description__  
This property determines the middle Y Size of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_MidYSize and SetState\_MidYSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__Mode property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Mode : TPadMode Read GetState\_Mode Write SetState\_Mode;  
__Description__  
The __Mode__ property determines what type of pad it is \- a simple pad, a pad with three Top, Middle and Bottom layer stack up or a pad with a complex stack up\.

- If Mode is Simple \(ePadMode\_Simple\) then you only deal with X,Y locations and the TopXSize, TopYSize and TopShape properties\.
- If Mode is Top\-Mid\-Bottom stack \(ePadMode\_LocalStack\) then you deal with X,Y Locations, Top\.\., Mid\.\. and Bot\.\. properties\.
- If Mode is Full Stack \(ePadMode\_ExternalStack\) then you deal with XStackSizeOnLayer, YStackSizeOnLayer and StackShapeOnLayer properties\.

This property is supported by GetState\_mode and SetState\_mode methods\.  
__Example__

01

PadObject := Board\.GetObjectAtCursor\(MkSet\(ePadObject\), 

02

                                     AllLayers, 

03

                                    'Choose a pad'\);

04

While PadObject <> 0 Do

05

Begin

06

    Ls := 'Pad Designator/Name: ' \+ PadObject\.Name \+ \#13\#10;

07

08

    // work out the pad stack style

09

    If PadObject\.Mode = ePadMode\_Simple Then

10

        ProcessSimplePad   \(PadObject,LS\)

11

    Else If PadObject\.Mode = ePadMode\_LocalStack    Then

12

        ProcessTopMidBotPad\(PadObject,LS\)

13

    Else If PadObject\.Mode = ePadMode\_ExternalStack Then

14

        ProcessFullStackPad\(PadObject,LS\);

15

16

    // Display the results

17

    ShowInfo\(LS\);

18

19

    // Continue the loop ie user can click on another pad\.

20

    PadObject := Board\.GetObjectAtCursor\(MkSet\(ePadObject\), AllLayers, 'Choose a pad'\);

21

End;

__See also__  
IPCB\_Pad interface  
TPadMode type  
IsPadStack method  
PadStackInfo script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder

__Plated method__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Plated : Boolean Read GetState\_Plated Write SetState\_Plated;  
__Description__  
This property denotes whether the pad is plated or not\.  
__Example__  

__See also__  
IPCB\_Pad interface

__PinDescriptor property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property PinDescriptor : TPCBString Read GetState\_PinDescriptorString;  
__Description__  
This property obtains the description of the pin which represents the pad of a component\. This read only property is supported by the GetState\_PinDescriptorString method\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPCBString type

__ShapeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property ShapeOnLayer\[L : TLayer\] : TShape Read GetState\_ShapeOnLayer;  
__Description__  
This property determines what shape the pad is on this specified layer\. This read only property is supported by the GetState\_ShapeOnlayer method\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__StackShapeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property StackShapeOnLayer\[L : TLayer\] : TShape Read GetState\_StackShapeOnLayer Write SetState\_StackShapeOnLayer;  
__Description__  
This property determines what shape the pad stack is on that layer\. This property is supported by GetState\_StackShapeOnLayer and SetState\_StackShapeOnLayer methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__TopShape property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property TopShape : TShape Read GetState\_TopShape Write SetState\_TopShape;  
__Description__  
This property determines the top layer shape  of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_TopShape and SetState\_TopShape methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TShape type

__TopXSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property TopXSize : TCoord Read GetState\_TopXSize Write SetState\_TopXSize;  
__Description__  
This property determines the Top layer X Size of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_TopXSize and SetState\_TopXSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__TopYSize property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property TopYSize : TCoord Read GetState\_TopYSize Write SetState\_TopYSize;  
__Description__  
This property determines the Top layer Y Size of the pad with a top\-middle\-bottom stack up\.  
This property is supported by the GetState\_TopYSize and SetState\_TopYSize methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__X property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property X : TCoord Read GetState\_XLocation Write SetState\_XLocation;  
__Description__  
The Properties X and Y set the location of the pad with respect to the PCB document it is on\.  
These properties are supported by GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetState\_YLocation methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__XSizeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property XSizeOnLayer\[L : TLayer\] : TCoord Read GetState\_XSizeOnLayer;  
__Description__  
This property determines what size in X direction the pad is on this specified layer\. This read only property is supported by the GetState\_XSizeOnlayer method\.  
__Example__  
__See also__  
IPCB\_Pad interface

__XStackSizeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property XStackSizeOnLayer\[L : TLayer\] : TCoord Read GetState\_XStackSizeOnLayer Write SetState\_XStackSizeOnLayer;  
__Description__  
This XStackSizeOnLayer property determines the size of the pad in X direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\. This property is supported by the GetState\_XStackSizeOnLayer and SetState\_XStackSizeOnLayer methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TPadMode type

__Y property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property Y : TCoord Read GetState\_YLocation Write SetState\_YLocation;  
__Description__  
The Properties X and Y set the location of the pad with respect to the PCB document it is on\.  
These properties are supported by GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetState\_YLocation methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__YSizeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property YSizeOnLayer\[L : TLayer\] : TCoord Read GetState\_YSizeOnLayer;  
__Description__  
This property determines what size in Y direction the pad is on this specified layer\. This read only property is supported by the GetState\_YSizeOnlayer method\.  
__Example__  
__See also__  
IPCB\_Pad interface

__YStackSizeOnLayer property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property YStackSizeOnLayer\[L : TLayer\] : TCoord Read GetState\_YStackSizeOnLayer Write SetState\_YStackSizeOnLayer;  
__Description__  
This YStackSizeOnLayer property determines the size of the pad in Y direction on the specified layer only if the pad has an external stack \(ePadMode\_ExternalStack type\)\. This property is supported by the GetState\_YStackSizeOnLayer and SetState\_YStackSizeOnLayer methods\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ DrillType property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property DrillType : TExtendedDrillType Read GetState\_DrillType Write SetState\_DrillType;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__ HoleType property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property  HoleType : TExtendedHoleType  Read GetState\_HoleType Write SetState\_HoleType;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__ HoleWidth property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property  HoleWidth : TCoord Read GetState\_HoleWidth Write SetState\_HoleWidth;  
__Description__  
__Example__  
__See also__  
IPCB\_Pad interface

__ XPadOffset property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property  XPadOffset\[L : TLayer\]          : TCoord             Read GetState\_XPadOffsetOnLayer   Write SetState\_XPadOffsetOnLayer;  
__Description__  
This property is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ YPadOffset property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property YPadOffset\[L : TLayer\] : TCoord Read GetState\_YPadOffsetOnLayer Write SetState\_YPadOffsetOnLayer;  
__Description__  
This property is not implemented\.  
__Example__  
__See also__  
IPCB\_Pad interface

__ HoleRotation property__

\(IPCB\_Pad interface\)  
__Syntax__  
Property  HoleRotation : TAngle Read GetState\_HoleRotation Write SetState\_HoleRotation;  
__Description__  
This property defines the rotation attribute of the hole within a pad object\. This applies to square and slotted holes\. This property is supported by the GetState\_HoleRotation and SetState\_HoleRotation methods\.  
__Example__  
__See also__  
IPCB\_Pad interface  
TAngle type

<a id="IPCB_Pad2_Interface"></a>__IPCB\_Pad2 Interface__

__Overview__  
Pad objects are hole connectors for components and for connection to signal tracks\. The IPCB\_Pad2 interface represents the extra attributes such as the Corner radius attribute of rounded rectangular pads\.

__The IPCB\_Pad2 interface hierarchy;__  
IPCB\_Primitive  
IPCB\_Pad  
IPCB\_Pad2

__IPCB\_Pad2 methods__  
GetState\_CornerRadiusOnLayer  
GetState\_CRPercentageOnLayer  
GetState\_StackCRPctOnLayer  
SetState\_StackCRPctOnLayer

__IPCB\_Pad2 properties__  
CornerRadius  
CRPercentage  
StackCRPctOnLayer

__Methods__

__ GetState\_CornerRadiusOnLayer method__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Function  GetState\_CornerRadiusOnLayer\(L : TLayer\) : TCoord;  
__Description__  
This function returns the corner radius of a rectangular pad on the specified layer in TCoord units\. This function is used by the CornerRadiusOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__ GetState\_CRPercentageOnLayer method__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Function  GetState\_CRPercentageOnLayer\(L : TLayer\) : Byte;  
__Description__  
This function returns the percentage of the corner radius of a rectangular pad on the specified layer as a byte value \(0\-100\)\.  
The corner radius percentage of the rounded corners of a pad on the bottom layer and the radius percentage is per layer and is a percentage of half of the shortest side of a pad object\. The value of 0% corresponds to a rectangular pad and 100% to a normal rounded pad shape\. This value only applies when the Shape field is set to Rounded Rectangle\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__ GetState\_StackCRPctOnLayer method__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Function GetState\_StackCRPctOnLayer \(L : TLayer\) : Byte;  
__Description__  
This function returns the percentage of the corner radius of a stack up pad on the specified layer as a byte value \(0\-100\)\.  
The corner radius percentage of the rounded corners of a pad on the bottom layer and the radius percentage is per layer and is a percentage of half of the shortest side of a pad object\. The value of 0% corresponds to a rectangular pad and 100% to a normal rounded pad shape\. This value only applies when the Shape field is set to Rounded Rectangle\.  
This function is used by the StackCRPctOnLayer property\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__ SetState\_StackCRPctOnLayer method__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Procedure SetState\_StackCRPctOnLayer \(L : TLayer; Value  : Byte\);  
__Description__  
This function sets the percentage of the corner radius of a rectangular pad on the specified layer as a byte value \(0\-100\)\.  
The corner radius percentage of the rounded corners of a pad on the bottom layer and the radius percentage is per layer and is a percentage of half of the shortest side of a pad object\. The value of 0% corresponds to a rectangular pad and 100% to a normal rounded pad shape\. This value only applies when the Shape field is set to Rounded Rectangle\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__Properties__

__CornerRadius property__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Property  CornerRadius     \[L : TLayer\]   : TCoord       Read GetState\_CornerRadiusOnLayer;  
__Description__  
This property returns the corner radius of a rectangular pad on the specified layer in TCoord units\. This property is implemented by the GetState\_CornerRadiusOnLayer function\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__CRPercentage property__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Property  CRPercentage     \[L : TLayer\] : Byte Read GetState\_CRPercentageOnLayer;  
__Description__  
This function returns the percentage of the corner radius of a rectangular pad on the specified layer as a byte value \(0\-100\)\.  
The corner radius percentage of the rounded corners of a pad on the bottom layer and the radius percentage is per layer and is a percentage of half of the shortest side of a pad object\. The value of 0% corresponds to a rectangular pad and 100% to a normal rounded pad shape\. This value only applies when the Shape field is set to Rounded Rectangle\.  
The Property uses GetState\_CRPercentageOnLayer function\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

__StackCRPctOnLayer property__

\(IPCB\_Pad2 interface\)  
__Syntax__  
Property  StackCRPctOnLayer\[L : TLayer\]   : Byte         Read GetState\_StackCRPctOnLayer   Write SetState\_StackCRPctOnLayer;  
__Description__  
This property returns the percentage of the corner radius of a stack up pad on the specified layer as a byte value \(0\-100\)\.  
The corner radius percentage of the rounded corners of a pad on the bottom layer and the radius percentage is per layer and is a percentage of half of the shortest side of a pad object\. The value of 0% corresponds to a rectangular pad and 100% to a normal rounded pad shape\. This value only applies when the Shape field is set to Rounded Rectangle\.  
This property uses GetState\_StackCRPctOnLayer and SetState\_StackCRPctOnLayer methods\.  
__Example__  
__See also__  
IPCB\_Pad2 interface

<a id="IPCB_Polygon_Interface"></a>__IPCB\_Polygon Interface__

__Overview__  
Polygons are similar to area fills, except that they can fill irregular shaped areas of a board and can connect to a specified net as they are poured\. By adjusting the grid and track size, a polygon plane can be either solid \(copper\) areas or a cross hatched lattice\. Polygons can be poured on any layer, however if a polygon is placed on a non signal layer, it will not be poured around existing objects\.

Polygons are group objects, therefore they have child objects such as tracks and arcs\. You can use the __IPCB\_GroupIterator__ interface with the __GroupIterator\_Create__ and __GroupIterator\_Destroy__ methods from the __IPCB\_Polygon__ to fetch child objects\.

__The IPCB\_Polygon interface hierarchy;__  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Polygon

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

The __IPCB\_Polygon__ interface hierarchy is as follows:

__IPCB\_Polygon methods__  
GetState\_AreaSize  
GetState\_PolygonType  
GetState\_RemoveDead  
GetState\_UseOctagons  
GetState\_AvoidObsticles  
GetState\_PourOver  
GetState\_Grid  
GetState\_TrackSize  
GetState\_MinTrack  
GetState\_PointCount  
GetState\_Segments  
GetState\_PolyHatchStyle  
GetState\_BorderWidth  
GetState\_ExpandOutline  
GetState\_RemoveIslandsByArea  
GetState\_IslandAreaThreshold  
GetState\_RemoveNarrowNecks  
GetState\_NeckWidthThreshold  
GetState\_ClipAcuteCorners  
GetState\_MitreCorners  
GetState\_DrawRemovedNecks  
GetState\_DrawRemovedIslands  
GetState\_DrawDeadCopper  
GetState\_ArcApproximation  
SetState\_AreaSize  
SetState\_PolygonType  
SetState\_RemoveDead  
SetState\_UseOctagons  
SetState\_AvoidObsticles  
SetState\_PourOver  
SetState\_Grid  
SetState\_TrackSize  
SetState\_MinTrack  
SetState\_PointCount  
SetState\_Segments  
SetState\_PolyHatchStyle  
SetState\_BorderWidth  
SetState\_ExpandOutline  
SetState\_RemoveIslandsByArea  
SetState\_IslandAreaThreshold  
SetState\_RemoveNarrowNecks  
SetState\_NeckWidthThreshold  
SetState\_ClipAcuteCorners  
SetState\_MitreCorners  
SetState\_DrawRemovedNecks  
SetState\_DrawRemovedIslands  
SetState\_DrawDeadCopper  
SetState\_ArcApproximation  
GetState\_HitPrimitive  
PrimitiveInsidePoly  
Rebuild  
SetState\_XSizeYSize  
SetState\_CopperPourInvalid  
SetState\_CopperPourValid  
GetState\_CopperPourInvalid  
GetState\_InRepour  
CopperPourValidate  
AcceptsLayer  
PointInPolygon  
xBoundingRectangle  
GetState\_StrictHitTest  
GrowPolyshape  
RotateAroundXY

__IPCB\_Polygon properties__  
AreaSize  
PolygonType  
RemoveDead  
UseOctagons  
AvoidObsticles  
PourOver  
Grid  
TrackSize  
MinTrack  
PointCount  
Segments \[I  
PolyHatchStyle  
BorderWidth  
ExpandOutline  
RemoveIslandsByArea  
IslandAreaThreshold  
RemoveNarrowNecks  
NeckWidthThreshold  
ClipAcuteCorners  
MitreCorners  
DrawRemovedNecks  
DrawRemovedIslands  
DrawDeadCopper  
ArcApproximation

__Notes__  
Polygons can be on internal planes\. For example if there are multi layer pads on a PCB document, then all the internal planes are connected to these multi\-layer pads as split planes and are called split plane polygons\. Check the __PolygonType__ property\.  
The grid property denotes the grid which the tracks within a polygon are placed\. Ideally this grid is a fraction of the component pin pitch, to allow the most effective placement of the polygon tracks\.

The segments property denotes the array of segments used to construct a polygon\. Each segment consists of a record consisting of one group of points in X, Y coordinates as a line \(__ePolySegmentline__ type\) or an arc, a radius and two angles \( __ePolySegmentArc__ type\)\. Each segment record has a __Kind__ field which denotes the type of segment it is\.

A segment of a polygon either as an arc or a track is encapsulated as a __TPolySegment__ record as shown below;  
  TPolySegment = Record  
      Kind      : TPolySegmentType;  

      \{Vertex\}  
      vx,vy      : TCoord;  

      \{Arc\}  
      cx,cy      : TCoord;  
      Radius     : TCoord;  
      Angle1     : TAngle;  
      Angle2     : TAngle;  
  End;

__Example__

01

Procedure IteratePolygons;

02

Var

03

    Board      : IPCB\_Board;

04

    Polygon    : IPCB\_Polygon;

05

    Iterator   : IPCB\_BoardIterator;

06

    PolygonRpt : TStringList;

07

    FileName   : TPCBString;

08

    Document   : IServerDocument;

09

    PolyNo     : Integer;

10

    I          : Integer;

11

Begin

12

    // Retrieve the current board

13

    Board := PCBServer\.GetCurrentPCBBoard;

14

    If Board = Nil Then Exit;

15

16

    // Search for Polygons and for each polygon found

17

    // get its attributes and put them in a TStringList object

18

    // to be saved as a text file\.

19

    Iterator        := Board\.BoardIterator\_Create;

20

    Iterator\.AddFilter\_ObjectSet\(MkSet\(ePolyObject\)\);

21

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

22

    Iterator\.AddFilter\_Method\(eProcessAll\);

23

24

    PolyNo     := 0;

25

    PolygonRpt := TStringList\.Create;

26

27

    Polygon := Iterator\.FirstPCBObject;

28

    While \(Polygon <> Nil\) Do

29

    Begin

30

        Inc\(PolyNo\);

31

        PolygonRpt\.Add\('Polygon No : '           \+ IntToStr\(PolyNo\)\);

32

        //Check if Net exists before getting the Name property\.

33

        If Polygon\.Net <> Nil Then

34

            PolygonRpt\.Add\(' Polygon Net : '     \+ Polygon\.Net\.Name\);

35

36

        If Polygon\.PolygonType = eSignalLayerPolygon Then

37

            PolygonRpt\.Add\(' Polygon type : '        \+ 'Polygon on Signal Layer'\)

38

        Else

39

            PolygonRpt\.Add\(' Polygon type : '        \+ 'Split plane polygon'\)

40

41

        PolygonRpt\.Add\(' Polygon BorderWidth : ' \+ FloatToStr\(Polygon\.BorderWidth\)\);

42

        PolygonRpt\.Add\('  Area size : '          \+ FloatToStr\(Polygon\.AreaSize\)\);

43

44

        // Segments of a polygon

45

        For I := 0 To Polygon\.PointCount \- 1 Do

46

        Begin

47

            If Polygon\.Segments\[I\]\.Kind = ePolySegmentLine Then

48

            Begin

49

                PolygonRpt\.Add\(' Polygon Segment Line at X: ' \+ IntToStr\(Polygon\.Segments\[I\]\.vx\)\);

50

                PolygonRpt\.Add\(' Polygon Segment Line at Y: ' \+ IntToStr\(Polygon\.Segments\[I\]\.vy\)\);

51

            End

52

            Else

53

            Begin

54

                PolygonRpt\.Add\(' Polygon Segment Arc 1  : ' \+ FloatToStr\(Polygon\.Segments\[I\]\.Angle1\)\);

55

                PolygonRpt\.Add\(' Polygon Segment Arc 2  : ' \+ FloatToStr\(Polygon\.Segments\[I\]\.Angle2\)\);

56

                PolygonRpt\.Add\(' Polygon Segment Radius : ' \+ FloatToStr\(Polygon\.Segments\[I\]\.Radius\)\);

57

            End;

58

        End;

59

        PolygonRpt\.Add\(''\);

60

        Polygon := Iterator\.NextPCBObject;

61

    End;

62

    Board\.BoardIterator\_Destroy\(Iterator\);

63

64

    // The TStringList contains Polygon data and is saved as

65

    // a text file\.

66

    FileName := ChangeFileExt\(Board\.FileName,'\.pol'\);

67

    PolygonRpt\.SaveToFile\(Filename\);

68

    PolygonRpt\.Free;

69

70

    // Display the Polygons report

71

    Document  := Client\.OpenDocument\('Text', FileName\);

72

    If Document <> Nil Then

73

        Client\.ShowDocument\(Document\);

74

End;

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_GroupIterator interface  
TPolygonType enumerated values  
TPolySegment enumerated values  
TPolyHatchStyle enumerated values  
IteratePolygons example from the \\Examples\\Scripts\\DelphiScript\\PCB\\ folder\.  
OutlinePerimeter example from the \\Examples\\Scripts\\DelphiScript\\PCB\\ folder\.

__Methods__

__AcceptsLayer method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function AcceptsLayer \(Layer : TLayer\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__CopperPourValidate method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure CopperPourValidate;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_CopperPourInvalid method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_CopperPourInvalid : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_StrictHitTest method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_StrictHitTest \(HitX,HitY : TCoord\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GrowPolyshape method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure GrowPolyshape \(ADist : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__PointInPolygon method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function PointInPolygon \(HitX,HitY : TCoord\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__PrimitiveInsidePoly method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function PrimitiveInsidePoly \(APrimitive : IPCB\_Primitive\) : Boolean;  
__Description__  
This function determines whether a primitive is indeed part of a polygon or not\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__Rebuild method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure Rebuild;  
__Description__  
This procedure forces a rebuild of the polygon especially after it has been poured\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_CopperPourInvalid method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_CopperPourInvalid;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_CopperPourValid method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_CopperPourValid;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_XSizeYSize method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function SetState\_XSizeYSize : Boolean;  
__Description__  
This method sets the X and Y size of the polygon\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__xBoundingRectangle method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function xBoundingRectangle : TCoordRect;  
__Description__  
This function obtains the bounding rectangle of the polygon in TCoordRect\.  
__Example__  
__See also__  
IPCB\_Polygon interface  
TCoordRect

__ RotateAroundXY method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure RotateAroundXY\(AX,  
                         AY         : TCoord;  
                         Angle      : TAngle\);     
__Description__  
This function rotates the polygon about its reference point by an angle\.  
__Example__  
__See also__  
IPCB\_Polygon interface  
TCoord type  
TAngle type

__GetState and SetState Methods__

__GetState\_ArcApproximation method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_ArcApproximation : TCoord ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_AreaSize method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_AreaSize : Extended;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_AvoidObsticles method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_AvoidObsticles : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_BorderWidth method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_BorderWidth : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_ClipAcuteCorners method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_ClipAcuteCorners : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_DrawDeadCopper method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_DrawDeadCopper : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_DrawRemovedIslands method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_DrawRemovedIslands : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_DrawRemovedNecks method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_DrawRemovedNecks : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_ExpandOutline method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_ExpandOutline : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_Grid method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_Grid : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_HitPrimitive method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_HitPrimitive \(APrimitive : IPCB\_Primitive\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_InRepour method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_InRepour : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_IslandAreaThreshold method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_IslandAreaThreshold : Extended ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_MinTrack method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_MinTrack : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_MitreCorners method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_MitreCorners : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_NeckWidthThreshold method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_NeckWidthThreshold : TCoord ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_PointCount method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_PointCount : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_PolygonType method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_PolygonType : TPolygonType;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_PolyHatchStyle method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_PolyHatchStyle : TPolyHatchStyle;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_PourOver method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_PourOver : TPolygonPourOver;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_RemoveDead method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_RemoveDead : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_RemoveIslandsByArea method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_RemoveIslandsByArea : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_RemoveNarrowNecks method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_RemoveNarrowNecks : Boolean ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_Segments method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_Segments \(I : Integer\) : TPolySegment;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_TrackSize method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_TrackSize : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__GetState\_UseOctagons method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Function GetState\_UseOctagons : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_ArcApproximation method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_ArcApproximation \(Value : TCoord \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_AreaSize method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_AreaSize \(Value : Extended\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_AvoidObsticles method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_AvoidObsticles \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_BorderWidth method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_BorderWidth \(Value : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_ClipAcuteCorners method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_ClipAcuteCorners \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_DrawDeadCopper method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_DrawDeadCopper \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_DrawRemovedIslands method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_DrawRemovedIslands \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_DrawRemovedNecks method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_DrawRemovedNecks \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_ExpandOutline method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_ExpandOutline \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_Grid method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_Grid \(Value : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_IslandAreaThreshold method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_IslandAreaThreshold \(Value : Extended \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_MinTrack method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_MinTrack \(Value : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_MitreCorners method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_MitreCorners \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_NeckWidthThreshold method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_NeckWidthThreshold \(Value : TCoord \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_PointCount method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_PointCount \(Value : Integer\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_PolygonType method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_PolygonType \(Value : TPolygonType\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_PolyHatchStyle method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_PolyHatchStyle \(Value : TPolyHatchStyle\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_PourOver method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_PourOver \(Value : TPolygonPourOver\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_RemoveDead method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_RemoveDead \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_RemoveIslandsByArea method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_RemoveIslandsByArea \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_RemoveNarrowNecks method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_RemoveNarrowNecks \(Value : Boolean \);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_Segments method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_Segments \(I : Integer;Value : TPolySegment\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_TrackSize method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_TrackSize \(Value : TCoord\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__SetState\_UseOctagons method__

\(IPCB\_Polygon interface\)  
__Syntax__  
Procedure SetState\_UseOctagons \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__Properties__

__ArcApproximation property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property ArcApproximation : TCoord Read GetState\_ArcApproximation Write SetState\_ArcApproximation ;   
__Description__  
The polygon drawn around a pad or via is drawn by line segments\. The arc resolution value dictates how accurate the polygon is drawn around a pad for example\. The segments are drawn between a system defined outer circle and inner circle with a radial distance between these two circles being equal to the arc resolution\.  
The default value is 0\.5mil\. The lower the value the more smooth the arc is and the higher the value, the more coarse the arc is with longer line segments\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__AreaSize property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property AreaSize : Extended Read GetState\_AreaSize Write SetState\_AreaSize;  
__Description__  
The AreaSize property returns the size of the polygon in Extended type\. The GetState\_AreaSize and SetState\_AreaSize are methods for this property\.  
__Example__  

__See also__  
IPCB\_Polygon interface

__AvoidObsticles property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property  AvoidObsticles : Boolean  Read GetState\_AvoidObsticles Write SetState\_AvoidObsticles;  
__Description__  
__Example__  

__See also__  
IPCB\_Polygon interface

__BorderWidth property__