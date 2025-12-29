### <a id="IPCB_InteractiveRoutingOptions"></a>IPCB\_InteractiveRoutingOptions

__Overview__  
The IPCB\_InteractiveRoutingOptions interface represents the options for the interactive routing module in the PCB editor\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Methods__  
Procedure Export\_ToParameters\_GeneralOptions\(Parameters : PChar\);  
Procedure Export\_ToParameters\_LayerOptions  \(Parameters : PChar\);  
Procedure Export\_ToParameters\_LayerOptions\_Version3\(Parameters : PChar\);  
__Properties__  
PlaceTrackMode    : TPlaceTrackMode  
OldTrackDrawLayer : TLayer  
TrackArcX         : TCoord  
TrackArcY         : TCoord  
TrackArcRadius    : TCoord  
TrackArcAngle1    : TCoord  
TrackArcAngle2    : TCoord  
OldTrackArcX      : TCoord  
OldTrackArcY      : TCoord  
OldTrackArcRadius : TCoord  
OldTrackArcAngle1 : TCoord  
OldTrackArcAngle2 : TCoord  
OldTrackDrawSize  : TCoord  
OldMidx           : TCoord  
OldMidy           : TCoord  
OldCx             : TCoord  
OldCy             : TCoord  
EndLineX          : TCoord  
EndLineY          : TCoord  
Midx              : TCoord  
MidY              : TCoord  
StartX            : TCoord  
StartY            : TCoord  
Beginx            : TCoord  
Beginy            : TCoord  
__See also__  
IPCB\_AbstractOptions interface