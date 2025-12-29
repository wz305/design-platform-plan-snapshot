#### Properties

##### Style property

\(ISch\_PowerObject interface\)  
__Syntax__  
Property Style : TPowerObjectStyle Read GetState\_Style Write SetState\_Style;  
__Description__  
This property denotes the style of the power object\. This property is supported by the GetState\_Style and SetState\_Style methods\.  
__Example__  
__See also__  
ISch\_PowerObject interface  
TPowerObjectStyle type

##### ShowNetName property

\(ISch\_PowerObject interface\)  
__Syntax__  
Property ShowNetName : Boolean Read GetState\_ShowNetName Write SetState\_ShowNetName;  
__Description__  
This property denotes the visibility of the net name of the power object\. This property is supported by the GetState\_ShowNetName and SetState\_ShowNetName methods\.  
__Example__  
__See also__  
ISch\_PowerObject interface  
TPowerObjectStyle type

### <a id="ISch_Probe_Interface"></a>ISch\_Probe Interface

__Overview__  
A probe is a special marker which is placed on a schematic document to identify nodes for digital simulation\.  
__Notes__  
The ISch\_Probe interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_ParametrizedGroup  
        ISch\_ParameterSet  
            ISch\_Probe

__ISch\_Probe methods__

__ISch\_Probe properties__

__See also__  
ISch\_GraphicalObject interface  
ISch\_ParametrizedGroup interface  
ISch\_ParameterSet interface

### <a id="ISch_Rectangle_Interface"></a>ISch\_Rectangle Interface

__Overview__  
Rectangles are drawing objects which are unfilled or filled graphic elements\.  
__Notes__  
The ISch\_Rectangle interface hierarchy is as follows:  
ISch\_GraphicalObject interface  
    ISch\_Rectangle interface

__ISch\_Rectangle methods__  
SetState\_Corner  
SetState\_LineWidth  
SetState\_IsSolid  
SetState\_Transparent  
GetState\_Corner  
GetState\_LineWidth  
GetState\_IsSolid  
GetState\_Transparent

__ISch\_Rectangle properties__  
Corner  
LineWidth  
IsSolid  
Transparent

__See also__  
ISch\_GraphicalObject interface