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