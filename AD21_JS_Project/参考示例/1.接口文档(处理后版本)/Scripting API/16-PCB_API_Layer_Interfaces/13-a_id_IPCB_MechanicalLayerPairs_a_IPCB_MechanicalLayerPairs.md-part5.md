\(IPCB\_Polygon interface\)  
__Syntax__  
Property BorderWidth : TCoord Read GetState\_BorderWidth Write SetState\_BorderWidth;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__ClipAcuteCorners property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property ClipAcuteCorners : Boolean Read GetState\_ClipAcuteCorners Write SetState\_ClipAcuteCorners ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__DrawDeadCopper property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property DrawDeadCopper : Boolean Read GetState\_DrawDeadCopper Write SetState\_DrawDeadCopper ;   
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__DrawRemovedIslands property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property DrawRemovedIslands : Boolean Read GetState\_DrawRemovedIslands Write SetState\_DrawRemovedIslands ;   
__Description__  
If this property is true, every time a polygon is created on a PCB document, islands are often created and those islands that are less than the quoted area threshold are not created, otherwise if false, islands are left drawn nonetheless\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__DrawRemovedNecks property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property DrawRemovedNecks : Boolean Read GetState\_DrawRemovedNecks Write SetState\_DrawRemovedNecks ;   
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__ExpandOutline property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property ExpandOutline : Boolean Read GetState\_ExpandOutline Write SetState\_ExpandOutline ;   
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__Grid property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property Grid : TCoord Read GetState\_Grid Write SetState\_Grid;  
__Description__  
The Grid property denotes the grid which the tracks within a polygon are placed\. Ideally this grid is a fraction of the component pin pitch, to allow the most effective placement of the polygon tracks\.  
This property is supported by GetState\_Grid and SetState\_Grid methods\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__IslandAreaThreshold property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property IslandAreaThreshold : Extended Read GetState\_IslandAreaThreshold Write SetState\_IslandAreaThreshold;   
__Description__  
Every time a polygon is created on a PCB document, islands are often created and those islands that are less than the quoted area threshold, these islands are not created\.  
This property represents a value in mils squared that defines the area of an island and the default value is 2500 mils sq\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__MinTrack property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property MinTrack : TCoord Read GetState\_MinTrack Write SetState\_MinTrack;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__MitreCorners property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property MitreCorners : Boolean Read GetState\_MitreCorners Write SetState\_MitreCorners ;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__NeckWidthThreshold property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property NeckWidthThreshold : TCoord Read GetState\_NeckWidthThreshold Write SetState\_NeckWidthThreshold ;  
__Description__  
The minimum width threshold value for the regions of a polygon\. Narrow regions that violate this under width value will be removed by the system\. The default value is 5 mils\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__PointCount property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property PointCount : Integer Read GetState\_PointCount Write SetState\_PointCount;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__PolygonType property__

\(IPCB\_Board interface\)  
__Syntax__  
Property PolygonType : TPolygonType Read GetState\_PolygonType Write SetState\_PolygonType;  
__Description__  
The PolygonType property defines what type the polygon is, whether it is a polygon on a signal layer, or a split plane polygon\.  
__Example__  

__See also__  
IPCB\_Polygon interface  
TPolygonType type

__PolyHatchStyle property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property PolyHatchStyle : TPolyHatchStyle Read GetState\_PolyHatchStyle Write SetState\_PolyHatchStyle;  
__Description__  
The property denotes the style of polygon hatching\. If the hatching style \(__ePolySolid__\) is solid, then a region object is used instead\.  
ePolyHatch90, ePolyHatch45, ePolyVHatch, ePolyHHatch,  
__ePolyNoHatch__ type : the polygon is not filled at all\. Only the boundary tracks will be present\. You may wish to use this option if you want to place a polygon during the design phase, but do not want it to slow system performance\. The  polygon can be before re\-poured with the desired hatching before generating output\.  
__ePolySolid__ type:  the polygon is filled in solid\. You may wish to use this option if you want to place a solid polygon during the design phase\. There are further Solid Fill Options to define and control how a solid polygon is drawn on the PCB document\.  
__Example__  
__See also__  
IPCB\_Polygon interface  
TPolyHatchStyle type  
IPCB\_Region interface

__PourOver property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property PourOver : Boolean Read GetState\_PourOver Write SetState\_PourOver;  
__Description__  
The pourover property if true will indicate that any existing tracks and arcs within the polygon which are part of the net being connected to will be covered by the polygon\.  
If this property is false, the polygon will pour around existing tracks on the same net\.  
__Example__  

__See also__  
IPCB\_Polygon interface

__RemoveDead property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property RemoveDead : Boolean Read GetState\_RemoveDead Write SetState\_RemoveDead;  
__Description__  
If the RemoveDead property is enabled, any regions of "dead" copper within the polygon will be removed\. Dead copper is created when an area of the polygon can not be connected to the selected net\. You can view dead copper as unconnected "islands" of copper within the polygon created when existing tracks, pads and vias prevent the plane pouring as one continuous area\.  
If this property is disabled, any areas of dead copper will not be removed\.  
Note: The entire polygon is removed if it does not enclose any pads on the selected net, as it is all viewed as dead copper\.  
__Example__  

__See also__  
IPCB\_Polygon interface

__RemoveIslandsByArea property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property RemoveIslandsByArea : Boolean Read GetState\_RemoveIslandsByArea Write SetState\_RemoveIslandsByArea;   
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__RemoveNarrowNecks property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property RemoveNarrowNecks : Boolean Read GetState\_RemoveNarrowNecks Write SetState\_RemoveNarrowNecks ;   
__Description__  
If this property is true, thin sections \(composing of tracks and arcs for example\) are removed from this polygon on the PCB document that violate the minimum width threshold value\. If false, narrow necks are left alone\.  
__Example__  
__See also__  
IPCB\_Polygon interface

__Segments \[I property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property Segments \[I : Integer\] : TPolySegment Read GetState\_Segments Write SetState\_Segments;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__TrackSize property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property TrackSize : TCoord Read GetState\_TrackSize Write SetState\_TrackSize;  
__Description__  
__Example__  
__See also__  
IPCB\_Polygon interface

__UseOctagons property__

\(IPCB\_Polygon interface\)  
__Syntax__  
Property UseOctagons : Boolean Read GetState\_UseOctagons Write SetState\_UseOctagons;  
__Description__  
The __UseOctagons__ property determines that octagons are to surround pads if true\. If false, pads are surrounded by arcs\. Octagons give smaller Gerber files and faster photoplotting\.  
This property is supported by GetState\_UseOctagons and SetState\_UseOctagons methods\.  
__Example__  
__See also__  
IPCB\_Polygon interface

<a id="IPCB_RectangularPrimitive_Interface"></a>__IPCB\_RectangularPrimitive Interface__

__Overview__  
The __IPCB\_RectangularPrimitive__ interface is the ancestor interface for __IPCB\_Fill__ and __IPCB\_Text__ interfaces and contains the rectangular coordinates as well as the rotation property\.

The __IPCB\_RectangularPrimitive__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_RectangularPrimitive

__IPCB\_RectangularPrimitive methods__  
GetState\_XLocation  
GetState\_YLocation  
GetState\_X1Location  
GetState\_Y1Location  
GetState\_X2Location  
GetState\_Y2Location  
GetState\_Rotation  
SetState\_XLocation  
SetState\_YLocation  
SetState\_X1Location  
SetState\_Y1Location  
SetState\_X2Location  
SetState\_Y2Location  
SetState\_Rotation  
RotateAroundXY  
IsRedundant  
SetState\_XSizeYSize

__IPCB\_RectangularPrimitive properties__  
XLocation  
YLocation  
X1Location  
Y1Location  
X2Location  
Y2Location  
Rotation

__See also__  
IPCB\_Primitive interface

__GetState and SetState Methods__

__SetState\_Rotation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_Rotation \(Rotation : TAngle\);  
__Description__  
This SetState\_Rotation method deals with the rotation of the rectangular primitive \(fill, text, embedded board for example\) object in degrees \(of TAngle type 0 \-360 degrees\)\.  
This method is used for the Rotation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_X1Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_X1Location \(AX1 : TCoord\);  
__Description__  
The SetState\_X1Location method sets the initial X1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the X1Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_X2Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_X2Location \(AX2 : TCoord\);  
__Description__  
The SetState\_X2Location method sets the final X2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the X2Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_XLocation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_XLocation \(AX : TCoord\);  
__Description__  
This method sets the reference X location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
This method is used for the XLocation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_XSizeYSize method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function SetState\_XSizeYSize : Boolean;  
__Description__  
This method sets the XSize and YSize of the rectangular primitive\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_Y1Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_Y1Location \(AY1 : TCoord\);  
__Description__  
The SetState\_Y1Location method sets the initial Y1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the Y1Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_Y2Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_Y2Location \(AY2 : TCoord\);  
__Description__  
The SetState\_Y2Location method sets the initial Y2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the Y2Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__SetState\_YLocation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure SetState\_YLocation \(AY : TCoord\);  
__Description__  
This method sets the reference Y location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
This method is used for the YLocation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_Rotation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_Rotation : TAngle;  
__Description__  
This GetState\_Rotation method deals with the rotation of the rectangular primitive \(fill, text, embedded board for example\) object in degrees \(of TAngle type 0 \-360 degrees\)\.  
This method is used for the Rotation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_X1Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_X1Location : TCoord;  
__Description__  
The GetState\_X1Location method retrieves the initial X1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the X1Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_X2Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_X2Location : TCoord;  
__Description__  
The GetState\_X1Location method retrieves the final X2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the X2Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_XLocation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_XLocation : TCoord;  
__Description__  
This method obtains the reference X location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
This method is used for the XLocation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_Y1Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_Y1Location : TCoord;  
__Description__  
The GetState\_Y1Location method retrieves the initial Y1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the Y1Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_Y2Location method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_Y2Location : TCoord;  
__Description__  
The GetState\_Y2Location method retrieves the final Y2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
This method is used for the Y2Location property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__GetState\_YLocation method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function GetState\_YLocation : TCoord;  
__Description__  
This method obtains the reference Y location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
This method is used for the YLocation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__Methods__

__IsRedundant method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Function IsRedundant : Boolean;  
__Description__  
This method determines whether the object is redundant \(unused object\) on the PCB document or not\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__RotateAroundXY method__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX,AY : TCoord;Angle : TAngle\);  
__Description__  
This method rotates a rectangular primitive object such as a fill or a text object on the PCB document about the AX, AY coordinates with an angle in degrees\.  
To ensure the rectangular primitive rotates without moving about, pass in its midpoint \(between X1,X2 and Y1, Y2\) attributes for the AX,AY parameters or use the Rotation property\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__Rotation property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property Rotation : TAngle Read GetState\_Rotation Write SetState\_Rotation;  
__Description__  
This Rotation property deals with the rotation of the rectangular primitive \(fill, text, embedded board for example\) object in degrees \(of TAngle type 0 \-360 degrees\)\.  
This property is supported by GetState\_Rotation and SetState\_Rotation methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__Properties__

__X1Location property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property X1Location : TCoord Read GetState\_X1Location Write SetState\_X1Location;  
__Description__  
The X1Location property determines the initial X1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
The property is supported by the GetState\_X1Location and SetState\_X1Location methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__X2Location property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property X2Location : TCoord Read GetState\_X2Location Write SetState\_X2Location;  
__Description__  
The X2Location property determines the final X2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
The property is supported by the GetState\_X2Location and SetState\_X2Location methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__XLocation property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property XLocation : TCoord Read GetState\_XLocation Write SetState\_XLocation;  
__Description__  
The XLocation property determines the reference X location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
The property is supported by the GetState\_XLocation and SetState\_XLocation methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__Y1Location property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property Y1Location : TCoord Read GetState\_Y1Location Write SetState\_Y1Location;  
__Description__  
The Y1Location property determines the initial Y1 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
The property is supported by the GetState\_Y1Location and SetState\_Y1Location methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__Y2Location property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property Y2Location : TCoord Read GetState\_Y2Location Write SetState\_Y2Location;  
__Description__  
The Y2Location property determines the final Y2 location of the rectangular primitive\. The X1,Y1 and X2,Y2 coordinates define the boundary of the rectangular primitive\.  
The property is supported by the GetState\_Y2Location and SetState\_Y2Location methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

__YLocation property__

\(IPCB\_RectangularPrimitive interface\)  
__Syntax__  
Property YLocation : TCoord Read GetState\_YLocation Write SetState\_YLocation;  
__Description__  
The YLocation property determines the reference Y location of the rectangular primitive\. The X,Y coordinates define the reference point of the rectangular primitive\.  
The property is supported by the GetState\_YLocation and SetState\_YLocation methods\.  
__Example__  
__See also__  
IPCB\_RectangularPrimitive interface

<a id="IPCB_Region_Interface"></a>__IPCB\_Region Interface__

__Overview__  
The IPCB\_Region interface represents a solid polygon pour as the region object\. This region object allows the creation of multi sided polygon regions on the PCB\. The region object can also be used to create polygonal shaped fills in PCB footprints\.  
__Notes__  
You can use __IPCB\_Primitive__ methods and properties that are relevant to the __IPCB\_Region__ interface\.

The __IPCB\_Region__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Region

__IPCB\_Region methods__  
GetState\_Kind  
SetState\_Kind  
GetState\_Name  
SetState\_Name  
GetState\_Area  
GetRegionData  
GetMainContour  
GetHoleCount  
GetHole  
SetOutlineContour  
SetRegionData

__IPCB\_Region properties__  
Kind  
Name  
RegionData  
MainContour  
HoleCount  
Holes  
Area

__See also__  
IPCB\_Fill Interface  
IPCB\_Polygon interface

__Methods__

__PCB method__

\(IPCB\_Region interface\)  
__Syntax__  
Procedure SetOutlineContour \(Contour : Pgpc\_vertex\_list\)  
__Description__  
__Example__  

__See also__  
IPCB\_Region interface

__GetState and SetState Methods__

__GetHole method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetHole \(I : Integer\) : Pgpc\_vertex\_list;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetHoleCount method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetHoleCount : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetMainContour method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetMainContour : Pgpc\_vertex\_list;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetRegionData method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetRegionData : Pgpc\_polygon;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetState\_Area method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetState\_Area : Int64;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetState\_Kind method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetState\_Kind : TRegionKind;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__GetState\_Name method__

\(IPCB\_Region interface\)  
__Syntax__  
Function GetState\_Name : TDynamicString;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__SetState\_Kind method__

\(IPCB\_Region interface\)  
__Syntax__  
Procedure SetState\_Kind \(Value : TRegionKind\);  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__SetState\_Name method__

\(IPCB\_Region interface\)  
__Syntax__  
Procedure SetState\_Name \(Value : TDynamicString\);  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__Properties__

__Area property__

\(IPCB\_Region interface\)  
__Syntax__  
Property Area : Int64 Read GetState\_Area;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__HoleCount property__

\(IPCB\_Region interface\)  
__Syntax__  
Property HoleCount : Integer Read GetHoleCount;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__Holes \[I property__

\(IPCB\_Region interface\)  
__Syntax__  
Property Holes \[I : Integer\] : Pgpc\_vertex\_list Read GetHole;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__Kind property__

\(IPCB\_Region interface\)  
__Syntax__  
Property Kind : TRegionKind Read GetState\_Kind Write SetState\_Kind;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface  
TRegionKind type

__MainContour property__

\(IPCB\_Region interface\)  
__Syntax__  
Property MainContour : Pgpc\_vertex\_list Read GetMainContour;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__Name property__

\(IPCB\_Region interface\)  
__Syntax__  
Property Name : TDynamicString Read GetState\_Name Write SetState\_Name;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

__RegionData property__

\(IPCB\_Region interface\)  
__Syntax__  
Property RegionData : Pgpc\_polygon Read GetRegionData;  
__Description__  
__Example__  
__See also__  
IPCB\_Region interface

<a id="IPCB_Text_Interface"></a>__IPCB\_Text Interface__

__Overview__  
Text strings can be placed on any layer with any height\. There are two classes of text strings: Free text strings and component text \(designators and comments\)\. Free text strings are standalone strings which could be used as descriptors or labels for any application on the workspace\. There are two component text objects\- designator attribute and comment attribute\. Each component must have a unique designator and thus designators are not globally editable\. The comment attribute is globally editable though\.

The PCB editor includes special strings which are interpreted when output \(printing, plotting or generating gerber files\) is generated\. For example, the string \.PRINT\_DATE will be replaced by the current date when output is generated\.

__Notes__  
The IPCB\_Text Interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_RectangularPrimitive  
IPCB\_Text

Text objects are not inherited from the IPCB\_group interface, therefore fetching child objects within a text object is not possible\.  
Text objects are rectangular primitives with rectangular coordinates properties and the rotation property\.  
Text objects can be converted into a series of strokes using the ConvertToStrokeArray method from the IPCB\_Text interface\.

__IPCB\_RectangularPrimitive methods__  
RotateAroundXY  
IsRedundant  
SetState\_XSizeYSize

__IPCB\_RectangularPrimitive properties__  
XLocation  
YLocation  
X1Location  
Y1Location  
X2Location  
Y2Location  
Rotation

__IPCB\_Text methods__  
GetState\_FontID  
GetState\_Text  
GetState\_Width  
GetState\_Mirror  
GetState\_UnderlyingString  
GetState\_ConvertedString      
GetState\_UseTTFonts  
GetState\_Bold  
GetState\_Italic  
GetState\_FontName  
GetState\_Inverted  
GetState\_InvertedTTTextBorder  
GetState\_CharSet  
SetState\_Size  
SetState\_FontID  
SetState\_Text  
SetState\_Width  
SetState\_Mirror  
SetState\_UnderlyingString  
SetState\_UseTTFonts           
SetState\_Bold                 
SetState\_Italic               
SetState\_FontName             
SetState\_Inverted             
SetState\_InvertedTTTextBorder  
SetState\_CharSet              
IsHidden  
IsDesignator  
IsComment  
InAutoDimension  
GetDesignatorDisplayString  
RotationHandle  
ConvertToStrokeArray  
GetTrueTypeTextOutline

__IPCB\_Text properties__  
Size  
FontID  
Text  
Width  
MirrorFlag  
UnderlyingString  
ConvertedString      
UseTTFonts  
Bold  
Italic  
FontName  
Inverted  
InvertedTTTextBorder  
TTTextOutline  
CharSet

__Example__

01

Var

02

    Board     : IPCB\_Board;

03

    WorkSpace : IWorkSpace;

04

    TextObj   : IPCB\_Text;

05

Begin

06

    //create a new pcb document

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

    // Create a text object on a top overlay layer

15

    Board\.LayerIsDisplayed\[eTopOverLay\] := True;

16

    TextObj := PCBServer\.PCBObjectFactory\(eTextObject, eNoDimension, eCreate\_Default\);

17

    TextObj\.XLocation := MilsToCoord\(Board\.XOrigin \+ 4000\);

18

    TextObj\.YLocation := MilsToCoord\(Board\.YOrigin \+ 2000\);

19

    TextObj\.Layer     := eTopOverlay;

20

    TextObj\.Text      := 'Text Object';

21

    TextObj\.Size      := MilsToCoord\(90\);   // sets the height of the text\.

22

    Board\.AddPCBObject\(TextObj\);

23

End;

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_RectangularPrimitive interface

__GetState and SetState Methods__

__ConvertedString method__

\(IPCB\_ConvertedString interface\)  
__Syntax__  
Function  GetState\_ConvertedString : TPCBString;  
__Description__  
This method is used for the ConvertedString property\.  
__Example__  

__See also__  
IPCB\_Text interface

__GetState\_FontID method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_FontID : TFontID;  
__Description__  
This method retrieves the FontID attribute which represents the font used for this Text Object on a PCB document\. This method is used for the FontID property\.  
__Example__  
__See also__  
IPCB\_Text interface  
TFontID type

__GetState\_Mirror method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_Mirror : Boolean;  
__Description__  
This method retrieves the Mirror attribute which represents the mirrored state of this Text Object on a PCB document\. This method is used for the Mirror property\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetState\_Size method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_Size : TCoord;  
__Description__  
This method retrieves the Size attribute which represents the height of the text used for this Text Object on a PCB document\. This method is used for the Size property\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetState\_Text method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_Text : TPCBString;  
__Description__  
This method retrieves the Text attribute which represents the text used for this Text Object on a PCB document\. This method is used for the Text property\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetState\_UnderlyingString method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_UnderlyingString : TPCBString;  
__Description__  
This method retrieves the Text attribute which represents the text used for this Text Object on a PCB document and is equivalent to the GetState\_Text method\. This method is used for the UnderlyingString property\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetState\_Width method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetState\_Width : TCoord;  
__Description__  
This method retrieves the Width attribute which represents the width used for this Text Object on a PCB document\. This method is used for the Width property\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetState\_UseTTFonts method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_UseTTFonts : Boolean;  
__Description__  
This property toggles the True Type font for the PCB string text on a PCB document\. This property is supported by the GetState\_UseTTFonts and SetState\_UseTTFonts methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__  
IPCB\_Text interface

__GetState\_Bold method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_UseTTFonts : Boolean;  
__Description__  
The Bold property sets or gets the bold property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__  
IPCB\_Text interface

__GetState\_Italic method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_Italic : Boolean;  
__Description__  
The Italic property sets or gets the italic property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Italic and SetState\_Italic methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__  
IPCB\_Text interface

__GetState\_FontName method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_FontName : TPCBString;  
__Description__  
The FontName property sets or gets the FontName property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\. For example one of the True Type font strings could be 'Arial', 'Arial Narrow', 'Courier New' and 'Verdana'\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__  
IPCB\_Text interface

__GetState\_Inverted method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_Inverted : Boolean;  
__Description__  
This property sets or gets the Inverted property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Inverted and SetState\_Inverted methods\.  
The Inverted property inverts the text object and a text boundary is created around the text\. The Inverted and InvertedTTTextBorder properties are useful for situations if IPCB\_Text object is to be placed on a copper region and create a cutout in the region\. The color of the inverted border is the layer color and the text color itself is black\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__  
IPCB\_Text interface

__GetState\_InvertedTTTextBorder method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetState\_InvertedTTTextBorder : TCoord;  
__Description__  
This property sets or gets the InvertedTTTextBorder property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_InvertedTTTextBorder and SetState\_InvertedTTTextBorder methods\.  
The Inverted property inverts the text object and a text boundary is created around the text\. The Inverted and InvertedTTTextBorder properties are useful for situations if IPCB\_Text object is to be placed on a copper region and create a cutout in the region\. The color of the inverted border is the layer color and the text color itself is black\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__  
IPCB\_Text interface

__GetTrueTypeTextOutline method__

\(IPCB\_Text interface\)  
__Syntax__  
Property  TTTextOutline : PGPC\_Polygon Read GetTrueTypeTextOutline;  
__Description__  
This property sets or gets the TTTextOutline property of the PCB string True Type text on a PCB document\. This property is supported by the GetTrueTypeTextOutline method\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__  
IPCB\_Text interface

__SetState\_FontID method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_FontID \(FontID : TFontID\);  
__Description__  
This method sets the FontID attribute which represents the font used for this Text Object on a PCB document\. This method is used for the FontID property\.  
__Example__  
__See also__  
IPCB\_Text interface  
TFontID type

__SetState\_Mirror method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Mirror \(Mirror : Boolean\);  
__Description__  
This method sets the Mirror attribute which represents the mirrored state of this Text Object on a PCB document\. This method is used for the Mirror property\.  
__Example__  
__See also__  
IPCB\_Text interface

__SetState\_Size method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Size \(Size : TCoord\);  
__Description__  
This method sets the Size attribute which represents the height of the text used for this Text Object on a PCB document\. This method is used for the Size property\.  
__Example__  
__See also__  
IPCB\_Text interface

__SetState\_Text method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Text \(Text : TPCBString\);  
__Description__  
This method sets the Text attribute which represents the text used for this Text Object on a PCB document\. This method is used for the Text property\.  
__Example__  
__See also__  
IPCB\_Text interface

__SetState\_UnderlyingString method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_UnderlyingString \(Value : TPCBString\);  
__Description__  
This method retrieves the Text attribute which represents the text used for this Text Object on a PCB document and is equivalent to the SetState\_Text method\. This method is used for the UnderlyingString property\.  
__Example__  
__See also__  
IPCB\_Text interface

__SetState\_Width method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Width \(Width : TCoord\);  
__Description__  
This method sets the Width attribute which represents the width used for this Text Object on a PCB document\. This method is used for the Width property\.  
__Example__  
__See also__  
IPCB\_Text interface

__SetState\_UseTTFonts method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_UseTTFonts\(UseTTFonts : Boolean\);  
__Description__  
This property toggles the True Type font for the PCB string text on a PCB document\. This property is supported by the GetState\_UseTTFonts and SetState\_UseTTFonts methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__

__SetState\_Bold method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Bold\(Bold : Boolean\);  
__Description__  
The Bold property sets or gets the bold property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__  
IPCB\_Text interface

__SetState\_Italic method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Italic\(Italic : Boolean\);  
__Description__  
The Italic property sets or gets the italic property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Italic and SetState\_Italic methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__  
IPCB\_Text interface

__SetState\_FontName method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_FontName\(FontName   : TPCBString\);  
__Description__  
The FontName property sets or gets the FontName property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\. For example one of the True Type font strings could be 'Arial', 'Arial Narrow', 'Courier New' and 'Verdana'\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__  
IPCB\_Text interface

__SetState\_Inverted method__

\(IPCB\_Text interface\)  
__Syntax__  
Procedure SetState\_Inverted\(Inverted : Boolean\);  
__Description__  
This property sets or gets the Inverted property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Inverted and SetState\_Inverted methods\.  
The Inverted property inverts the text object and a text boundary is created around the text\. The Inverted and InvertedTTTextBorder properties are useful for situations if IPCB\_Text object is to be placed on a copper region and create a cutout in the region\. The color of the inverted border is the layer color and the text color itself is black\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  

__See also__  
IPCB\_Text interface

__Methods__

__ConvertToStrokeArray method__

\(IPCB\_Text interface\)  
__Syntax__  
Function ConvertToStrokeArray\(Var Count : Integer; Var Strokes : TStrokeArray\) : Boolean;  
__Description__  
Text objects can be converted into a series of strokes using the __ConvertToStrokeArray__ method\. This is useful for rending text objects as standalone line objects to be used in external programs such as 3D modelling applications\.  
__Example__  
__See also__  
IPCB\_Text interface  
TStrokeArray type

__GetDesignatorDisplayString method__

\(IPCB\_Text interface\)  
__Syntax__  
Function GetDesignatorDisplayString : TPCBString;  
__Description__  
This function retrieves the designator string directly from a text object\.  
__Example__  
__See also__  
IPCB\_Text interface  
TPCBString type

__InAutoDimension method__

\(IPCB\_Text interface\)  
__Syntax__  
Function InAutoDimension : Boolean;  
__Description__  
This function tests whether this text object is used for the auto dimension object or not\.  
__Example__  
__See also__  
IPCB\_Text interface

__IsComment method__

\(IPCB\_Text interface\)  
__Syntax__  
Function IsComment : Boolean;  
__Description__  
This function tests whether this text object is a comment object associated with a component object for example\.  
__Example__  
__See also__  
IPCB\_Text interface

__IsDesignator method__

\(IPCB\_Text interface\)  
__Syntax__  
Function IsDesignator : Boolean;  
__Description__  
This function tests whether this text object is a designator for a object, for example whether a pad object has a designator\.  
__Example__  
__See also__  
IPCB\_Text interface

__IsHidden method__

\(IPCB\_Text interface\)  
__Syntax__  
Function IsHidden : Boolean;  
__Description__  
This function tests whether the text object is hidden or not\.  
__Example__  
__See also__  
IPCB\_Text interface

__RotationHandle method__

\(IPCB\_Text interface\)  
__Syntax__  
Function RotationHandle : TPoint;  
__Description__  
This function returns the rotation handle of the text object as a record of X and Y coordinates \(TPoint\)\.  
Note, the TPoint type is a Borland Delphi record consisting of X and Y coordinates\.  
__Example__  
__See also__  
IPCB\_Text interface

__GetTrueTypeTextOutline method__

\(IPCB\_Text interface\)  
__Syntax__  
Function  GetTrueTypeTextOutline : Pgpc\_polygon;  
__Description__  
__Example__  

__See also__  
IPCB\_Text interface

__Properties__

__FontID property__

\(IPCB\_Text interface\)  
__Syntax__  
Property FontID : TFontID Read GetState\_FontID Write SetState\_FontID;  
__Description__  
The __FontID__ property denotes which Font the text object is using\. The property is supported by __GetState\_FontID__ and __SetState\_FontID__ methods\.  
The __TFontID__ type defines the font ID for a text object\. It is the index to an entry in the font table in the PCB editor\. Each font used in the PCB editor has its own FontID\.  
Thus when a new font is used \(through a Change Font dialog of a Change object dialog\), a new FontID is added to the table in the PCB editor\. The FontID value can be extracted from PCB text objects\.  
__Example__  
__See also__  
IPCB\_Text interface  
TFontID type

__MirrorFlag property__

\(IPCB\_Text interface\)  
__Syntax__  
Property MirrorFlag : Boolean Read GetState\_Mirror Write SetState\_Mirror;  
__Description__  
This method sets the Mirror attribute which represents the mirrored state of this Text Object on a PCB document\. This property supports GetState\_Mirror and SetState\_Mirror methods\.  
__Example__  
__See also__  
IPCB\_Text interface

__Size property__

\(IPCB\_Text interface\)  
__Syntax__  
Property Size : TCoord Read GetState\_Size Write SetState\_Size;  
__Description__  
The Size property sets the height of the text\. This property is supported by GetState\_Size and SetState\_Size methods\.  
__Example__  
__See also__  
IPCB\_Text interface  
TCoord type

__Text property__

\(IPCB\_Text interface\)  
__Syntax__  
Property Text : TPCBString Read GetState\_Text Write SetState\_Text;  
__Description__  
The Text property contains the text for the Text object\. This property is supported by the GetState\_Text and SetState\_Text methods\.  
Note, the PCB editor includes special strings which are interpreted when output \(printing, plotting or generating gerber files\) is generated\. For example, the string \.PRINT\_DATE will be replaced by the current date when output is generated\.  
__Example__

01

Procedure FindSpecialStrings;

02

Var

03

    Board         : IPCB\_Board;

04

    SpecialString : IPCB\_Text;

05

    Iterator      : IPCB\_BoardIterator;

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

    // retrieve the iterator

12

    Iterator        := Board\.BoardIterator\_Create;

13

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eTextObject\)\);

14

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

15

    Iterator\.AddFilter\_Method\(eProcessAll\);

16

17

    // Search special strings

18

    SpecialString := Iterator\.FirstPCBObject;

19

    While \(SpecialString <> Nil\) Do

20

    Begin

21

        If SpecialString\.Text = '\.Layer\_Name' Then

22

            ShowMessage\(SpecialString\.ConvertedString\);

23

        SpecialString := Iterator\.NextPCBObject;

24

    End;

25

    Board\.BoardIterator\_Destroy\(Iterator\);

26

End;

__See also__  
IPCB\_Text interface  
TPCBString type

__UnderlyingString property__

\(IPCB\_Text interface\)  
__Syntax__  
Property UnderlyingString : TPCBString Read GetState\_UnderlyingString Write SetState\_UnderlyingString;  
__Description__  
This UnderlyingString property is equivalent to the Text property\. This property is supported by the GetState\_UnderlyingString and SetState\_UnderlyingString methods\.  
Note, the PCB editor includes special strings which are interpreted when output \(printing, plotting or generating gerber files\) is generated\. For example, the string \.PRINT\_DATE will be replaced by the current date when output is generated\.  
__Example__  
__See also__  
IPCB\_Text interface  
TPCBString type

__Width property__

\(IPCB\_Text interface\)  
__Syntax__  
Property Width : TCoord Read GetState\_Width Write SetState\_Width;  
__Description__  
This method sets the Width attribute which represents the width used for this Text Object on a PCB document\. This property is supported by the GetState\_Width and SetState\_Width methods\.  
__Example__  
__See also__  
IPCB\_Text interface

__ConvertedString method__

\(IPCB\_Text interface\)  
__Syntax__  
Property  ConvertedString : TPCBString Read GetState\_ConvertedString;  
__Description__  
This property is supported by the GetState\_ConvertedString method\. This property converts a special string into a text based string\. The PCB editor includes special strings which are interpreted when output \(printing, plotting or generating gerber files\) is generated\. For example, the string \.PRINT\_DATE will be replaced by the current date when the ConvertedString method is invoked\.  
The available special strings are;  
\.PRINT\_DATE  
\.PRINT\_TIME  
\.PRINT\_SCALE  
\.LAYER\_NAME  
\.PCB\_FILE\_NAME  
\.PCB\_FILE\_NAME\_NO\_PATH  
\.PLOT\_FILE\_NAME  
\.ARC\_COUNT  
\.COMPONENT\_COUNT  
\.FILL\_COUNT  
\.HOLE\_COUNT  
\.NET\_COUNT  
\.PAD\_COUNT  
\.STRING\_COUNT  
\.TRACK\_COUNT  
\.VIA\_COUNT  
\.DESIGNATOR  
\.COMMENT  
\.LEGEND  
\.NET\_NAMES\_ON\_LAYER  
__Example__

01

Procedure FindSpecialStrings;

02

Var

03

    Board         : IPCB\_Board;

04

    SpecialString : IPCB\_Text;

05

    Iterator      : IPCB\_BoardIterator;

06

Begin

07

    // Retrieve the current board

08

    Board := PCBServer\.GetCurrentPCBBoard;

09

    If Board = Nil Then Exit;

10

    // retrieve the iterator

11

    Iterator        := Board\.BoardIterator\_Create;

12

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eTextObject\)\);

13

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

14

    Iterator\.AddFilter\_Method\(eProcessAll\);

15

    // Search special strings

16

    SpecialString := Iterator\.FirstPCBObject;

17

    While \(SpecialString <> Nil\) Do

18

    Begin

19

        If SpecialString\.Text = '\.Layer\_Name' Then

20

            ShowMessage\(SpecialString\.ConvertedString\);

21

        SpecialString := Iterator\.NextPCBObject;

22

    End;

23

    Board\.BoardIterator\_Destroy\(Iterator\);

24

End;

__See also__  
IPCB\_Text interface  
IPCB\_SpecialStringConverter  
IPCB\_ServerInterface and its SpecialStringConverter property\.  
TPCBString type

__UseTTFonts property__

\(IPCB\_Text interface\)  
__Syntax__  
Property  UseTTFonts : Boolean Read GetState\_UseTTFonts Write SetState\_UseTTFonts;  
__Description__  
This property toggles the True Type font property for the PCB string text on a PCB document\. This property is supported by the GetState\_UseTTFonts and SetState\_UseTTFonts methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Delphiscript Script Example__

01

TextObj := PCBServer\.PCBObjectFactory\(eTextObject, eNoDimension, eCreate\_Default\);

02

// notify that the pcb object is going to be modified

03

PCBServer\.SendMessageToRobots\(TextObj\.I\_ObjectAddress, c\_Broadcast, PCBM\_BeginModify, c\_NoEventData\);

04

05

TextObj\.XLocation := Sheet\.SheetX \+ MilsToCoord\(1000\);

06

TextObj\.YLocation := Sheet\.SheetY \+ MilsToCoord\(1000\);

07

TextObj\.Layer     := eBottomOverlay;

08

09

// Can use Open True Type Fonts\.\.\.

10

TextObj\.UseTTFonts := True;

11

TextObj\.Italic := True;

12

TextObj\.Bold := False;

13

TextObj\.FontName := 'ARIAL';

14

TextObj\.Inverted := True;

15

TextObj\.InvertedTTTextBorder := MilsToCoord\(100\);

16

17

TextObj\.Text      := 'Text with True Type Property enabled\.';

18

TextObj\.Size       := MilsToCoord\(200\);    // sets the height of the text\.

19

20

Board\.AddPCBObject\(TextObj\);

21

// notify that the pcb object has been modified

22

PCBServer\.SendMessageToRobots\(TextObj\.I\_ObjectAddress, c\_Broadcast, PCBM\_EndModify , c\_NoEventData\);

23

PCBServer\.SendMessageToRobots\(Board\.I\_ObjectAddress, c\_Broadcast, PCBM\_BoardRegisteration,TextObj\.I\_ObjectAddress\);

__See also__  
IPCB\_Text interface

__Bold property__

\(IPCB\_Text interface\)  
__Syntax__  
Property  Bold : Boolean Read GetState\_Bold Write SetState\_Bold;  
__Description__  
This property sets or gets the bold property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Text interface

__Italic property__

\(IPCB\_Text interface\)  
__Syntax__  
Property Italic : Boolean Read GetState\_Italic Write SetState\_Italic;  
__Description__  
The Italic property sets or gets the italic property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Italic and SetState\_Italic methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Text interface

__FontName property__

\(IPCB\_Text interface\)  
__Syntax__  
Property FontName : TPCBString Read GetState\_FontName Write SetState\_FontName;  
__Description__  
This property sets or gets the FontName property of the PCB string True Type text on a PCB document\. For example one of the True Type font strings could be 'Arial', 'Arial Narrow', 'Courier New' and 'Verdana'\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Delphiscript Script Example__

01

TextObj := PCBServer\.PCBObjectFactory\(eTextObject, eNoDimension, eCreate\_Default\);

02

03

// notify that the pcb object is going to be modified

04

PCBServer\.SendMessageToRobots\(TextObj\.I\_ObjectAddress, c\_Broadcast, PCBM\_BeginModify, c\_NoEventData\);

05

TextObj\.XLocation := Sheet\.SheetX \+ MilsToCoord\(1000\);

06

TextObj\.YLocation := Sheet\.SheetY \+ MilsToCoord\(1000\);

07

TextObj\.Layer     := eBottomOverlay;

08

TextObj\.UseTTFonts := True;

09

TextObj\.Italic := True;

10

TextObj\.Bold := False;

11

TextObj\.FontName := 'ARIAL';

12

// inverts the text object and a text boundary is created around the text

13

// The Inverted and InvertedTTTextBorder properties are useful for situations

14

// if text is to be placed on a copper region and create a cutout in the region\.

15

// the color of the inverted border is the layer color and the text color itself

16

// is black\.

17

TextObj\.Inverted := True;

18

// The InvertedTTextBorder property determines the distance between the boundary of the

19

// the text object itself to the inverted text border boundary\.

20

TextObj\.InvertedTTTextBorder := MilsToCoord\(100\);

21

TextObj\.Text      := 'Text with True Type Property enabled\.';

22

TextObj\.Size       := MilsToCoord\(200\);    // sets the height of the text\.

__See also__  
IPCB\_Text interface

__Inverted property__

\(IPCB\_Text interface\)  
__Syntax__  
Property  Inverted : Boolean Read GetState\_Inverted Write SetState\_Inverted;  
__Description__  
This property sets or gets the Inverted property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Inverted and SetState\_Inverted methods\.  
The Inverted property inverts the text object and a text boundary is created around the text\. The Inverted and InvertedTTTextBorder properties are useful for situations if IPCB\_Text object is to be placed on a copper region and create a cutout in the region\. The color of the inverted border is the layer color and the text color itself is black\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Text interface  
InvertedTTTextBorder property

__InvertedTTTextBorder property__

\(IPCB\_Text interface\)  
__Syntax__  
Property InvertedTTTextBorder : TCoord Read GetState\_InvertedTTTextBorder Write SetState\_InvertedTTTextBorder;  
__Description__  
This property sets or gets the __InvertedTTTextBorder__ property of the PCB string True Type text on a PCB document\. This property is supported by the __GetState\_InvertedTTTextBorder__ and __SetState\_InvertedTTTextBorder__ methods\.  
The Inverted property inverts the text object and a text boundary is created around the text\. The __Inverted__ and __InvertedTTTextBorder__ properties are useful for situations if __IPCB\_Text__ object is to be placed on a copper region and create a cutout in the region\. The color of the inverted border is the layer color and the text color itself is black\.  
Once the __UseTTFonts__ property is enabled, you can use the __Bold__, __Italic__, __FontName__, __Inverted__, __InvertedTTTextBorder__ and __TTTextOutline__ properties\.  
__Example__  
__See also__  
IPCB\_Text interface  
Inverted property

__TTTextOutline property__

\(IPCB\_Text interface\)  
__Syntax__  
Property TTTextOutline : PGPC\_Polygon Read GetTrueTypeTextOutline;  
__Description__  
This property sets or gets the TTTextOutline property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_TTTextOutline and SetState\_TTTextOutline methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Text interface

<a id="IPCB_Track_Interface"></a>__IPCB\_Track Interface__

__Overview__  
BoardIterator\_Create The IPCB\_Track hierarchy;  
IPCB\_Primitive  
IPCB\_Track

__IPCB\_Track methods__  
GetState\_X1  
GetState\_Y1  
GetState\_X2  
GetState\_Y2  
GetState\_Width  
SetState\_X1  
SetState\_Y1  
SetState\_X2  
SetState\_Y2  
SetState\_Width

__IPCB\_Track properties__  
X1  
Y1  
X2  
Y2  
Width

__Example__

01

Var

02

    Board     : IPCB\_Board;

03

    WorkSpace : IWorkSpace;

04

    Track     : IPCB\_Track;

05

Begin

06

    //Create a new PCB document

07

    WorkSpace := GetWorkSpace;

08

    If WorkSpace = Nil Then Exit;

09

    Workspace\.DM\_CreateNewDocument\('PCB'\);

10

11

    // Check if the new PCB document exists\.

12

    Board := PCBServer\.GetCurrentPCBBoard;

13

    If Board = Nil then exit;

14

15

    // Create a Track object with 'Mils' dimensions

16

    Track             := PCBServer\.PCBObjectFactory\(eTrackObject, eNoDimension, eCreate\_Default\);

17

    Track\.X1          := MilsToCoord\(X1\);

18

    Track\.Y1          := MilsToCoord\(Y1\);

19

    Track\.X2          := MilsToCoord\(X2\);

20

    Track\.Y2          := MilsToCoord\(Y2\);

21

    Track\.Layer       := Layer;

22

    Track\.Width       := MilsToCoord\(Width\);

23

    // Add the new track into the PCB document

24

    Board\.AddPCBObject\(Track\);

25

26

    // Refresh the PCB document\.

27

    ResetParameters;

28

    AddStringParameter\('Action', 'All'\);

29

    RunProcess\('PCB:Zoom'\);

30

End;

__See also__  
IPCB\_Primitive interface  
PCB Design Objects

__GetState and SetState Methods__

__GetState\_Width method__

\(IPCB\_Track interface\)  
__Syntax__  
Function GetState\_Width : TCoord;  
__Description__  
This method retrieves the width attribute of the track object on a PCB document\. This function is used for the Width property\.  
__Example__  
__See also__  
IPCB\_Track interface

__GetState\_X1 method__

\(IPCB\_Track interface\)  
__Syntax__  
Function GetState\_X1 : TCoord;  
__Description__  
This method retrieves the X1 attribute of the track object on a PCB document\. This function is used for the X1 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__GetState\_X2 method__

\(IPCB\_Track interface\)  
__Syntax__  
Function GetState\_X2 : TCoord;  
__Description__  
This method retrieves the X2 attribute of the track object on a PCB document\. This function is used for the X2 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__GetState\_Y1 method__

\(IPCB\_Track interface\)  
__Syntax__  
Function GetState\_Y1 : TCoord;  
__Description__  
This method retrieves the Y1 attribute of the track object on a PCB document\. This function is used for the Y1 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__GetState\_Y2 method__

\(IPCB\_Track interface\)  
__Syntax__  
Function GetState\_Y2 : TCoord;  
__Description__  
This method retrieves the Y2 attribute of the track object on a PCB document\. This function is used for the Y2 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__SetState\_Width method__

\(IPCB\_Track interface\)  
__Syntax__  
Procedure SetState\_Width \(Value : TCoord\);  
__Description__  
This method sets the width attribute of the track object on a PCB document\. This function is used for the Width property\.  
__Example__  
__See also__  
IPCB\_Track interface

__SetState\_X1 method__

\(IPCB\_Track interface\)  
__Syntax__  
Procedure SetState\_X1 \(Value : TCoord\);  
__Description__  
This method sets the X1 attribute of the track object on a PCB document\. This function is used for the X1 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__SetState\_X2 method__

\(IPCB\_Track interface\)  
__Syntax__  
Procedure SetState\_X2 \(Value : TCoord\);  
__Description__  
This method sets the X2 attribute of the track object on a PCB document\. This function is used for the X2 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__SetState\_Y1 method__

\(IPCB\_Track interface\)  
__Syntax__  
Procedure SetState\_Y1 \(Value : TCoord\);  
__Description__  
This method sets the Y1 attribute of the track object on a PCB document\. This function is used for the Y1 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__SetState\_Y2 method__

\(IPCB\_Track interface\)  
__Syntax__  
Procedure SetState\_Y2 \(Value : TCoord\);  
__Description__  
This method sets the Y2 attribute of the track object on a PCB document\. This function is used for the Y2 property\.  
__Example__  
__See also__  
IPCB\_Track interface

__Properties__

__Width property__

\(IPCB\_Track interface\)  
__Syntax__  
Property Width : TCoord Read GetState\_Width Write SetState\_Width;  
__Description__  
The property represents the width attribute of a track object on the PCB document\. This property is supported by the GetState\_Width and SetState\_Width methods\.  
__Example__  
__See also__  
IPCB\_Track interface

__X1 property__

\(IPCB\_Track interface\)  
__Syntax__  
Property X1 : TCoord Read GetState\_X1 Write SetState\_X1;  
__Description__  
The property represents the X1 or the initial X coordinate of a track object on the PCB document\. This property is supported by the GetState\_X1 and SetState\_X1 methods\.  
__Example__  
__See also__  
IPCB\_Track interface

__X2 property__

\(IPCB\_Track interface\)  
__Syntax__  
Property X2 : TCoord Read GetState\_X2 Write SetState\_X2;  
__Description__  
The property represents the X2 or the final X coordinate of a track object on the PCB document\. This property is supported by the GetState\_X2 and SetState\_X2 methods\.  
__Example__  
__See also__  
IPCB\_Track interface

__Y1 property__

\(IPCB\_Track interface\)  
__Syntax__  
Property Y1 : TCoord Read GetState\_Y1 Write SetState\_Y1;  
__Description__  
The property represents the Y1 or the initial Y coordinate of a track object on the PCB document\. This property is supported by the GetState\_Y1 and SetState\_Y1 methods\.  
__Example__  
__See also__  
IPCB\_Track interface

__Y2 property__

\(IPCB\_Track interface\)  
__Syntax__  
Property Y2 : TCoord Read GetState\_Y2 Write SetState\_Y2;  
__Description__  
The property represents the Y2 or the final Y coordinate of a track object on the PCB document\. This property is supported by the GetState\_Y2 and SetState\_Y2 methods\.  
__Example__  
__See also__  
IPCB\_Track interface

<a id="IPCB_TTFontsCache_Interface"></a>__IPCB\_TTFontsCache Interface__

__Overview__

__IPCB\_TTFontsCache methods__  
I\_ObjectAddress  
GetState\_FontsCount  
GetState\_EmbeddedFont  
GetState\_Font  
AddFont  
AddEmbeddedFont  
GetFont  
GetNextEmbeddedFont  
ExportFontsToList  
GetLocalizedFontName

__IPCB\_TTFontCache properties__  
FontsCount  
EmbeddedFontsCount  
Font

__Methods__

__Properties__

__FontCount property__

\(IPCB\_TTFontsCache interface\)  
__Syntax__  
Property FontsCount : Integer Read GetState\_FontsCount;  
__Description__  
__Example__  
__See also__  
IPCB\_TTFontsCache interface

__EmbeddedFontCount property__

\(IPCB\_TTFontsCache interface\)  
__Syntax__  
Property  EmbeddedFontsCount \[ABoard : Pointer\]    : Integer         Read GetState\_EmbeddedFontsCount;  
__Description__  
__Example__  
__See also__  
IPCB\_TTFontsCache interface

__Font property__

\(IPCB\_TTFontsCache interface\)  
__Syntax__  
Property  Font \[I      : Integer\]    : IPCB\_TTFontData Read GetState\_Font;  
__Description__  
__Example__  
__See also__  
IPCB\_TTFontsCache interface

<a id="IPCB_TTFontData_Interface"></a>__IPCB\_TTFontData Interface__

__Overview__

__IPCB\_TTFontData methods__  
I\_ObjectAddress  
GetEmbeddedFontData  
IsEmbedded  
IsEmbeddedInDocument  
FontExists  
IsSame  
GetState\_FontFullName  
GetState\_FontFaceName  
GetState\_FontStyleName  
GetState\_Bold  
GetState\_Italic  
GetState\_CanEmbed  
GetState\_EmbeddedFontHandle  
GetState\_Charset  
GetState\_RefCount  
AddRef  
vRelease

__IPCB\_TTFontData properties__  
FontFullName  
FontFaceName  
FontStyleName  
Bold  
Italic  
CanEmbed  
EmbeddedFontHandle  
Charset  
RefCount

__Methods__

__I\_ObjectAddress method__

\(IPCB\_TTFontData interface\)  
__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__GetEmbeddedFontData method__

\(IPCB\_TTFontData interface\)  
__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__IsEmbedded method__

\(IPCB\_TTFontData interface\)  
__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__IsEmbeddedInDocument method__

\(IPCB\_TTFontData interface\)  
__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__IsEmbedded method__

\(IPCB\_TTFontData interface\)  
__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__FontExists method__

\(IPCB\_TTFontData interface\)  
__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__IsSame method__

\(IPCB\_TTFontData interface\)  
__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__GetState and SetState Methods__

__GetState\_Width method__

\(IPCB\_TTFontData interface\)  
__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__Properties__

__FontFullName Property__

__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__FontFaceName property__

__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__FontStyleName property__

__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__Bold property__

__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__Italic property__

__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__CanEmbed property__

__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__EmbeddedFontHandle property__

__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__Charset property__

__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

__RefCount__

__Syntax__  

__Description__  
__Example__  
__See also__  
IPCB\_TTFontData interface

<a id="IPCB_Via_Interface"></a>__IPCB\_Via Interface__

__Overview__  
When tracks from two layers need to be connected, vias are placed to carry a signal from one layer to the other\.  Vias are like round pads, which are drilled and usually through\-plated when the board is fabricated\.  Vias can be multi\-layered, blind or buried\. 

A multi\-layer via passes through the board from the Top layer to the Bottom layer and allows connections to all other signal layers\. 

A blind via connects from the surface of the board to an internal layer, a buried via connects from one internal layer to another internal layer\. In Altium Designer, Vias, including blind and buried, can connect to internal planes\.  
Vias do not have a paste mask layer\.

The IPCB\_Via hierarchy;  
IPCB\_Primitive  
IPCB\_Via

__IPCB\_Via methods__  
GetState\_XLocation  
GetState\_YLocation  
GetState\_IsConnectedToPlane  
GetState\_LowLayer  
GetState\_HighLayer  
GetState\_StartLayer  
GetState\_StopLayer  
GetState\_HoleSize  
GetState\_Size  
GetState\_SizeOnLayer  
GetState\_ShapeOnLayer  
GetState\_Cache  
SetState\_XLocation  
SetState\_YLocation  
SetState\_LowLayer  
SetState\_HighLayer  
SetState\_IsConnectedToPlane  
SetState\_HoleSize  
SetState\_Size  
SetState\_Cache  
PlaneConnectionStyleForLayer  
RotateAroundXY  
IntersectLayer

__IPCB\_Via properties__  
X  
Y  
IsConnectedToPlane  
LowLayer  
HighLayer  
StartLayer  
StopLayer  
HoleSize  
Size  
SizeOnLayer  
ShapeOnLayer  
Cache

__Example__

01

Var

02

    Board     : IPCB\_Board;

03

    WorkSpace : IWorkSpace;

04

    Via       : IPCB\_Via;

05

    ViaCache  : TPadCache;

06

Begin

07

    // Create a new PCB document

08

    WorkSpace := GetWorkSpace;

09

    If WorkSpace = Nil Then Exit;

10

    Workspace\.DM\_CreateNewDocument\('PCB'\);

11

12

    // Check if the new PCB document exists or not\.

13

    Board := PCBServer\.GetCurrentPCBBoard;

14

    If Board = Nil then exit;

15

16

    // Create a Via object

17

    Via           := PCBServer\.PCBObjectFactory\(eViaObject, eNoDimension, eCreate\_Default\);

18

    Via\.X         := MilsToCoord\(2000\);

19

    Via\.Y         := MilsToCoord\(2000\);

20

    Via\.Size      := MilsToCoord\(50\);

21

    Via\.HoleSize  := MilsToCoord\(20\);

22

    Via\.LowLayer  := eTopLayer;

23

    Via\.HighLayer := eBottomLayer;

24

25

    // Setup a pad cache

26

    Viacache := Via\.GetState\_Cache;

27

    Viacache\.ReliefAirGap := MilsToCoord\(11\);

28

    Viacache\.PowerPlaneReliefExpansion := MilsToCoord\(11\);

29

    Viacache\.PowerPlaneClearance       := MilsToCoord\(11\);

30

    Viacache\.ReliefConductorWidth      := MilsToCoord\(11\);

31

    Viacache\.SolderMaskExpansion       := MilsToCoord\(11\);

32

    Viacache\.SolderMaskExpansionValid  := eCacheManual;

33

    Viacache\.PasteMaskExpansion        := MilsToCoord\(11\);

34

    Viacache\.PasteMaskExpansionValid   := eCacheManual;

35

36

    // Assign the new Via cache to the via 

37

    Via\.SetState\_Cache := Viacache;

38

    Board\.AddPCBObject\(Via\);

39

40

    // Refresh PCB document\.

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
IPCB\_Pad interface  
TLayer enumerated values  
TPlaneConnectionStyle enumerated values  
TCoord value  
TAngle value  
TPadCache values

__GetState and SetState Methods__

__GetState\_Cache method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_Cache : TPadCache;  
__Description__  
This Cache property represents  the global cache that stores various design rule settings for pad and via objects\. The method is used by the Cache property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_HighLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_HighLayer : TLayer;  
__Description__  
The HighLayer property denotes the bottom layer\. The method is used for the HighLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_HoleSize method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_HoleSize : TCoord;  
__Description__  
This HoleSize property denotes the hole size of the via object\. This method is used by the HoleSize property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_IsConnectedToPlane method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_IsConnectedToPlane \(Layer : TLayer\) : Boolean;  
__Description__  
This property determines whether the via is connected to this specified plane or not by returning a boolean value\. This method is used by the IsConnectedToPlane property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_LowLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_LowLayer : TLayer;  
__Description__  
The LowLayer property denotes the bottom layer\. The method is used for the LowLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_ShapeOnLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_ShapeOnLayer \(Layer : TLayer\) : TShape;  
__Description__  
The ShapeOnLayer property determines the shape of the via on the specified layer\. This read only property is supported by the GetState\_ShapeOnLayer method\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_Size method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_Size : TCoord;  
__Description__  
The Size property denotes the size of the via object \(the full diameter\)\. The method is used for the Size property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_SizeOnLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_SizeOnLayer \(Layer : TLayer\) : TCoord;  
__Description__  
This SizeOnLayer property denotes the size of the via on a specified layer\. This method is used for the SizeOnLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_StartLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_StartLayer : IPCB\_LayerObject;  
__Description__  
This StartLayer property fetches the Start layer of IPCB\_LayerObject type that the via is connected to\. This method is used for the StartLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_StopLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_StopLayer : IPCB\_LayerObject;  
__Description__  
This StartLayer property fetches the Stop layer of IPCB\_LayerObject type that the via is connected to\. This method is used for the StopLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_XLocation method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_XLocation : TCoord;  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. The GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetStateYLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__GetState\_YLocation method__

\(IPCB\_Via interface\)  
__Syntax__  
Function GetState\_YLocation : TCoord;  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. The GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetStateYLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_Cache method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_Cache \(Value : TPadCache\);  
__Description__  
This Cache property represents  the global cache that stores various design rule settings for pad and via objects\. The method is used by the Cache property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_HighLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_HighLayer \(L : TLayer\);  
__Description__  
The HighLayer property denotes the bottom layer\. The method is used for the HighLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_HoleSize method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_HoleSize \(Value : TCoord\);  
__Description__  
This HoleSize property denotes the hole size of the via object\. This method is used by the HoleSize property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_IsConnectedToPlane method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_IsConnectedToPlane \(Layer : TLayer;Value : Boolean\);  
__Description__  
This property determines whether the via is connected to this specified plane or not by returning a boolean value\. This method is used by the IsConnectedToPlane property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_LowLayer method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_LowLayer \(L : TLayer\);  
__Description__  
The LowLayer property denotes the bottom layer\. The method is used for the LowLayer property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_Size method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_Size \(Size : TCoord\);  
__Description__  
The Size property denotes the size of the via object\. The method is used for the Size property\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_XLocation method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_XLocation \(AX : TCoord\);  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. The GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetStateYLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__SetState\_YLocation method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure SetState\_YLocation \(AY : TCoord\);  
__Description__  
The X and Y properties define the location of the Via object with respect to the PCB document\. The GetState\_XLocation, GetState\_YLocation and SetState\_XLocation, SetStateYLocation methods\.  
__Example__  
__See also__  
IPCB\_Via interface

__Methods__

__RotateAroundXY method__

\(IPCB\_Via interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX, AY : TCoord;Angle : TAngle\);  
__Description__  
This method rotates a via object on the PCB document about the AX, AY coordinates with an angle in degrees\. To ensure the via rotates without moving about, pass in its midpoint \(between X1,X2 and Y1, Y2\) attributes for the AX,AY parameters\.  
__Example__  
__See also__  
IPCB\_Via interface

__PlaneConnectionStyleForLayer method__

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