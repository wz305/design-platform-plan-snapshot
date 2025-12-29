### <a id="General_functions"></a>General functions

#### AlignToGridClosest

Function AlignToGridClosest  \(AValue    : TCoord; AGridSize : TCoord\) : TCoord;

#### AlignToGridDecrease

Function AlignToGridDecrease \(AValue    : TCoord; AGridSize : TCoord\) : TCoord;

#### AlignToGridIncrease

Function AlignToGridIncrease \(AValue    : TCoord;  
                              AGridSize : TCoord\) : TCoord;

#### GetState\_AllImplementations

Function GetState\_AllImplementations \(Const ASchComponent  : ISch\_Component\)       : TList;

#### GetState\_PinsForCurrentMode

Function GetState\_PinsForCurrentMode \(Const ASchComponent  : ISch\_Component\)       : TList;

#### GetState\_AllPins

Function GetState\_AllPins            \(Const ASchComponent  : ISch\_Component\)       : TList;

#### GetState\_AllParameters

Function GetState\_AllParameters      \(Const ASchObject     : ISch\_BasicContainer\)  : TList;

#### HitTestResultToCursor

Function  HitTestResultToCursor\(T : THitTestResult\): TCursor;

#### GetDefaultSchSheetStyle

Function  GetDefaultSchSheetStyle : TSheetStyle;

#### GetWholeAndFractionalPart\_DXP2004SP2\_To\_DXP2004SP1

Procedure GetWholeAndFractionalPart\_DXP2004SP2\_To\_DXP2004SP1\(ACoord : TCoord; Var AWholePart, AFractionalPart : Integer\);

#### GetCoord\_DXP2004SP1\_To\_DXP2004SP2

Function  GetCoord\_DXP2004SP1\_To\_DXP2004SP2\(AWholePart, AFractionalPart : Integer\) : TCoord;

#### ConvertFileName\_99SEToDXP2004

Function ConvertFileName\_99SEToDXP2004\(Const AOriginalName, ADocKind : TDynamicString\) : TDynamicString;

#### GetResolvedSheetFileName

Function GetResolvedSheetFileName\(Const AOriginalSFN : TDynamicString; Const AProject : IProject\) : TDynamicString;

#### Sch\_GetOwnerProject

Function Sch\_GetOwnerProject\(Const AContainer : ISch\_BasicContainer\) : IProject;