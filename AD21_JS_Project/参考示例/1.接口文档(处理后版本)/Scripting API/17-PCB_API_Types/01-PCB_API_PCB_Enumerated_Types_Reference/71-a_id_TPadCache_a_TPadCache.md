### <a id="TPadCache"></a>TPadCache

TPadCache                          = Record  
    PlaneConnectionStyle           : TPlaneConnectionStyle;  
    ReliefConductorWidth           : TCoord;  
    ReliefEntries                  : SmallInt;  
    ReliefAirGap                   : TCoord;  
    PowerPlaneReliefExpansion      : TCoord;  
    PowerPlaneClearance            : TCoord;  
    PasteMaskExpansion             : TCoord;  
    SolderMaskExpansion            : TCoord;  
    Planes                         : Word;  
    PlaneConnectionStyleValid      : TCacheState;  
    ReliefConductorWidthValid      : TCacheState;  
    ReliefEntriesValid             : TCacheState;  
    ReliefAirGapValid              : TCacheState;  
    PowerPlaneReliefExpansionValid : TCacheState;  
    PasteMaskExpansionValid        : TCacheState;  
    SolderMaskExpansionValid       : TCacheState;  
    PowerPlaneClearanceValid       : TCacheState;  
    PlanesValid                    : TCacheState;  
End;