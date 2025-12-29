### <a id="ISch_PowerObject_Interface"></a>ISch\_PowerObject Interface

__Overview__  
Power ports are special symbols that represent a power supply and are always identified by their net names\.  The Text property is the net name of the power object\.  
__Notes__  
The ISch\_PowerObject interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Label  
        ISch\_PowerObject

__ISch\_PowerObject methods__  
SetState\_Style  
GetState\_Style  
SetState\_ShowNetName  
GetState\_ShowNetName

__ISch\_PowerObject properties__  
Style  
ShowNetName

__See also__  
ISch\_GraphicalObject interface  
ISch\_Label interface

#### Methods

##### SetState\_ShowNetName method

\(ISch\_PowerObject interface\)  
__Syntax__  
Procedure SetState\_ShowNetName\(AValue : Boolean\)  
__Description__  
__Example__  
__See also__  
ISch\_PowerObject interface

##### SetState\_Style method

\(ISch\_PowerObject interface\)  
__Syntax__  
Procedure SetState\_Style\(AStyle : TPowerObjectStyle\);  
__Description__  
The SetState\_Style procedure sets the style of the power object\. This style is determined by the TPowerObjectStyle type\. This style defines the graphical style of the power object\. Available styles are: Circle, Arrow, Wave, Bar, Power Ground, Signal Ground and Earth\. Note: The graphical style of a power object has no influence on the net to which it is assigned and does not define any electrical characteristics of the object\.  
__Example__  
PowerObject\.SetState\_Style\(ePowerGndEarth\);  
__See also__  
ISch\_PowerObject interface

##### GetState\_Style method

\(ISch\_PowerObject interface\)  
__Syntax__  
Function GetState\_Style : TPowerObjectStyle;  
__Description__  
The GetState\_Style function gets the style of the power object\. This style is determined by the TPowerObjectStyle type\. This style defines the graphical style of the power object\. Available styles are: Circle, Arrow, Wave, Bar, Power Ground, Signal Ground and Earth\. Note: The graphical style of a power object has no influence on the net to which it is assigned and does not define any electrical characteristics of the object\.  
__Example__  
PowerStyle := PowerObject\.GetState\_Style;  
__See also__  
TPowerObjectStyle type  
ISch\_PowerObject interface

##### GetState\_ShowNetName method

\(ISch\_PowerObject interface\)  
__Syntax__  
Function  GetState\_ShowNetName        : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_PowerObject interface

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