### <a id="ISch_Arc_Interface"></a>ISch\_Arc Interface

__Overview__  
An arc object is a circular curve used to place on the schematic sheet\.  
__Notes__  
The ISch\_Arc interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Arc

__ISch\_Arc methods__  
GetState\_Radius  
GetState\_StartAngle  
GetState\_EndAngle  
GetState\_LineWidth  
SetState\_Radius  
SetState\_StartAngle  
SetState\_EndAngle  
SetState\_LineWidth

__ISch\_Arc properties__  
Radius  
StartAngle  
EndAngle  
LineWidth

__See also__

#### Methods

All methods are implemented by the ISch\_Arc properties\. More information for each property of the ISch\_Arc interface is presented in the Properties section\.

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