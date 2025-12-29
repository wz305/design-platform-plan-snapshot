### <a id="IGridSetting_interface"></a>IGridSetting interface

__Overview__  
The IGridSetting interface represents the grid settings for the Schematic documents part of a project\.

The IGridSetting interface hierarchy is a standalone\.

__IGridSetting methods__  
GetState\_SnapGridOn  
GetState\_HotspotGridOn  
GetState\_VisibleGridOn  
GetState\_SnapGridSize  
GetState\_HotspotGridSize  
GetState\_VisibleGridSize  
SetState\_SnapGridOn  
SetState\_HotspotGridOn  
SetState\_VisibleGridOn  
SetState\_SnapGridSize  
SetState\_HotspotGridSize  
SetState\_VisibleGridSize  
I\_ObjectAddress  
CopyTo  
SameAs

__IGridSetting properties__  
SnapGridOn  
HotspotGridOn  
VisibleGridOn  
SnapGridSize  
HotspotGridSize  
VisibleGridSize

__See also__  
ISch\_Preferences interface

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

#### IGridSetting Properties

##### HotspotGridOn property

\(IGridSetting interface\)  
__Syntax__  
Property HotspotGridOn : Boolean Read GetState\_HotspotGridOn Write SetState\_HotspotGridOn ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### HotspotGridSize property

\(IGridSetting interface\)  
__Syntax__  
Property HotspotGridSize : TCoord Read GetState\_HotspotGridSize Write SetState\_HotspotGridSize ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### SnapGridOn property

\(IGridSetting interface\)  
__Syntax__  
Property SnapGridOn : Boolean Read GetState\_SnapGridOn Write SetState\_SnapGridOn ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### SnapGridSize property

\(IGridSetting interface\)  
__Syntax__  
Property SnapGridSize : TCoord Read GetState\_SnapGridSize Write SetState\_SnapGridSize ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### VisibleGridOn property

\(IGridSetting interface\)  
__Syntax__  
Property VisibleGridOn : Boolean Read GetState\_VisibleGridOn Write SetState\_VisibleGridOn ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface

##### VisibleGridSize property

\(IGridSetting interface\)  
__Syntax__  
Property VisibleGridSize : TCoord Read GetState\_VisibleGridSize Write SetState\_VisibleGridSize ;  
__Description__  
__Example__  
__See also__  
IGridSetting interface