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