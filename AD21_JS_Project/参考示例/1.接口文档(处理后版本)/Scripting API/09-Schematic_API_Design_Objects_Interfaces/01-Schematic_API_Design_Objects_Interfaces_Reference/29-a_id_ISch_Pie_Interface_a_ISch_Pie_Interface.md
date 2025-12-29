### <a id="ISch_Pie_Interface"></a>ISch\_Pie Interface

__Overview__  
Pie objects are unfilled or filled graphic elements\.  
__Notes__  
The ISch\_Pie interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Arc  
        ISch\_Pie

__ISch\_Pie methods__  
GetState\_IsSolid  
SetState\_IsSolid

I__Sch\_Pie properties__  
IsSolid

__See also__  
ISch\_Arc interface\.

#### Methods

##### GetState\_IsSolid method

\(ISch\_Pie interface\)  
__Syntax__  
Function GetState\_IsSolid : Boolean;  
__Description__  
The GetState\_IsSolid function returns a Boolean value whether the pie object has a solid internal fill or not\.  
__Example__

1

If Pie\.GetState\_IsSolid Then

2

    Pie\. AreaColor := 0; // black fill

__See also__  
ISch\_Pie interface

##### SetState\_IsSolid method

\(ISch\_Pie interface\)  
__Syntax__  
Procedure SetState\_IsSolid\(B : Boolean\);  
__Description__  
The SetState\_IsSolid procedure sets a Boolean value which denotes that the pie object has a solid internal fill or not\.  
__Example__

1

Pie\.SetState\_IsSolid\(True\);

2

Pie\.AreaColor := 0;

__See also__  
ISch\_Pie interface

#### Properties

##### IsSolid property

\(ISch\_Pie interface\)  
__Syntax__  
Property IsSolid : Boolean Read GetState\_IsSolid Write SetState\_IsSolid;  
__Description__  
The IsSolid property denotes whether the pie object has a solid fill or not\. This property is supported by the GetState\_IsSolid and SetState\_IsSolid methods\.  
__Example__  
Pie\.IsSolid := True;  
__See also__  
ISch\_Pie interface