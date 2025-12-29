#### Properties

##### StartAngle property

\(ISch\_Arc interface\)  
__Syntax__  
Property StartAngle : TAngle Read GetState\_StartAngle Write SetState\_StartAngle;  
__Description__  
This property defines the start angle of the arc in degrees from the horizontal\. The arc is drawn in an anti\-clockwise direction from the start angle to the end angle\. The value can be between \-360 to 360 to define the start angle directly\.  
__Example__  
__See also__  
ISch\_Arc interface  
TAngle type

##### Radius property

\(ISch\_Arc interface\)  
__Syntax__  
Property Radius : TDistance Read GetState\_Radius Write SetState\_Radius ;  
__Description__  
The Radius property defines the radius of the arc\. This property is supported by the GetState\_Radius and SetState\_Radius methods\.  
__Example__  
__See also__  
ISch\_Arc interface  
TDistance type

##### LineWidth property

\(ISch\_Arc interface\)  
__Syntax__  
Property LineWidth : TSize Read GetState\_LineWidth Write SetState\_LineWidth ;  
__Description__  
The LineWidth property defines the border width of the arc with one of the following values from the TSize enumerated type\. This property is supported by the GetState\_LineWidth and SetState\_LineWidth methods\.  
__Example__  
Arc\.LineWidth := eMedium;  
__See also__  
TSize Type  
ISch\_Arc interface

##### EndAngle property

\(ISch\_Arc interface\)  
__Syntax__  
Property EndAngle : TAngle Read GetState\_EndAngle Write SetState\_EndAngle ;  
__Description__  
This property defines the end angle of the arc in degrees from the horizontal\. The arc is drawn in an anti\-clockwise direction from the start angle to the end angle\. The value can be between \-360 to 360 to define the end angle directly\.  
__Example__  
__See also__  
ISch\_Arc interface  
TAngle type

### <a id="ISch_Bezier_Interface"></a>ISch\_Bezier Interface

__Overview__  
A bezier curve is used to create curved line shapes \(For example a section of a sine wave or a pulse\)\.  At least four points are required to define a bezier curve\.  More than four points used will define another bezier curve and so on\.  
The ISch\_Bezier interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Polygon  
        ISch\_BasicPolyline  
            ISch\_Bezier

__ISch\_Bezier methods__

__ISch\_Bezier properties__

__See also__

### <a id="ISch_Bus_Interface"></a>ISch\_Bus Interface

__Overview__  
Buses are special graphical elements that represent a common pathway for multiple signals on a schematic document\.  Buses have no electrical properties, and they must be correctly identified by net labels and ports\.  
__Notes__  
The ISch\_Bus interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Polygon  
        ISch\_Polyline  
            ISch\_Wire  
                ISch\_Bus  
Note that the ISch\_Wire interface has no extra properties and methods  but has inherited properties and methods only\.

__ISch\_Bus methods__

__ISch\_Bus properties__

__See also__  
ISch\_Wire  
ISch\_Polyline  
ISCh\_Polygon  
ISch\_GraphicalObject

### <a id="ISch_BusEntry_Interface"></a>ISch\_BusEntry Interface

__Overview__  
A bus entry is a special wire at an angle of 45 degrees which is used to connect a wire to the bus line\.  
The ISch\_BusEntry interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Line  
        ISch\_BusEntry

__ISch\_BusEntry methods__

__ISch\_BusEntry properties__

__See also__  
ISch\_Line interface

### <a id="ISch_Circle_Interface"></a>ISch\_Circle Interface

__Overview__  
A circle is a closed arc object\.  
The ISch\_Circle interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Circle

__ISch\_Circle methods__  
SetState\_LineWidth  
SetState\_IsSolid  
SetState\_Radius  
SetState\_Transparent  
GetState\_LineWidth  
GetState\_IsSolid  
GetState\_Radius  
GetState\_Transparent

__ISch\_Circle properties__  
LineWidth  
IsSolid  
Radius  
Transparent

__See also__  
ISch\_GraphicalObject interface  
TSize type  
TDistance type