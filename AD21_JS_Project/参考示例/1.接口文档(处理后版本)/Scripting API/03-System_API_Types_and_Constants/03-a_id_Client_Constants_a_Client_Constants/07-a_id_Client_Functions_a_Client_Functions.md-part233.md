#### IGridSetting Methods

##### CopyTo method

\(IGridSetting interface\)  
__Syntax__  
Procedure CopyTo\(AGridSetting : IGridSetting\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### GetState\_HotspotGridOn method

\(IGridSetting interface\)  
__Syntax__  
Function GetState\_HotspotGridOn : Boolean;  
__Description__  
This function determines whether the hot spot grid is enabled or not and returns a True or False value\.  
__Example__

1

If GridSetting\.GetState\_HotspotGridOn = True Then

2

    HotspotGridSize := MilsToCoord\(4\);

__See also__  
IGridSetting interface

##### GetState\_HotspotGridSize method

\(IGridSetting interface\)  
__Syntax__  
Function GetState\_HotspotGridSize : TCoord;  
__Description__  
This function determines the size of the hot spot grid size\.  
__Example__

1

If GridSetting\.GetState\_HotspotGridOn = True Then

2

    HotspotGridSize := MilsToCoord\(4\);

__See also__  
IGridSetting interface

##### GetState\_SnapGridOn method

\(IGridSetting interface\)  
__Syntax__  
Function GetState\_SnapGridOn : Boolean;  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### GetState\_SnapGridSize method

\(IGridSetting interface\)  
__Syntax__  
Function GetState\_SnapGridSize : TCoord;  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### GetState\_VisibleGridOn method

\(IGridSetting interface\)  
__Syntax__  
Function GetState\_VisibleGridOn : Boolean;  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### GetState\_VisibleGridSize method

\(IGridSetting interface\)  
__Syntax__  
Function GetState\_VisibleGridSize : TCoord;  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### I\_ObjectAddress method

\(IGridSetting interface\)  
__Syntax__  
Function I\_ObjectAddress : Pointer;  
__Description__  
This function returns the object address of the IGridSetting interface as a pointer type\.  
__Example__  
If GridSetting\.I\_ObjectAddress <> Nil Then ShowMessage\(IntToStr\(GridSetting\.I\_ObjectAddress\)\);  
__See also__  
IGridSetting interface

##### SameAs method

\(IGridSetting interface\)  
__Syntax__  
Function SameAs\(AGridSetting : IGridSetting\) : Boolean;  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### SetState\_HotspotGridOn method

\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_HotspotGridOn \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### SetState\_HotspotGridSize method

\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_HotspotGridSize \(C : TCoord\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### SetState\_SnapGridOn method

\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_SnapGridOn \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### SetState\_SnapGridSize method

\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_SnapGridSize \(C : TCoord\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### SetState\_VisibleGridOn method

\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_VisibleGridOn \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### SetState\_VisibleGridSize method

\(IGridSetting interface\)  
__Syntax__  
Procedure SetState\_VisibleGridSize \(C : TCoord\);  
__Description__  
__Example__  
__See also__  
IGridSetting interface