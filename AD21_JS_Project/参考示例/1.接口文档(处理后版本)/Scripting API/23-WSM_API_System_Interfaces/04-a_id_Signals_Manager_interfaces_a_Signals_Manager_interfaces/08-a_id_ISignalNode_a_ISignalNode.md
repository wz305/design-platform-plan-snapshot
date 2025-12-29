### <a id="ISignalNode"></a>ISignalNode

__Overview__  
__Interface Methods__  
Function    DM\_NetItem              : INetItem;                
Function    DM\_SubNet               : ISubNet;                 
Function    DM\_GetDescription       : WideString;              
Function    DM\_GetName              : WideString;              
Function    DM\_Direction            : TSignalDirection;        
Function    DM\_IsDriver             : LongBool;                
Function    DM\_Range1               : WideString;              
Function    DM\_Range2               : WideString;              
Function    DM\_RangeValue1          : Integer;                 
Function    DM\_RangeValue2          : Integer;                 
Function    DM\_RangeMax             : Integer;                 
Function    DM\_RangeMin             : Integer;                 
Function    DM\_BusIndex             : Integer;                 
Function    DM\_Width                : Integer;                 
   
Function    DM\_TargetLinks   \(Index : Integer\) : ISignalLink;  
Function    DM\_DriverLinks   \(Index : Integer\) : ISignalLink;  
Function    DM\_TargetLinkCount      : Integer;                 
Function    DM\_DriverLinkCount      : Integer;                 
Function    DM\_Signal               : ISignal;                 
Function    DM\_EntityPort           : IEntityPort;             
Function    DM\_ConstantExpression   : WideString;              
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignal interface  
ISignalLink interface  
IEntityPort interface  
TSignalDirection interface