### <a id="ISignal_interface"></a>ISignal interface

__Overview__  
__Interface Methods__  
Function    DM\_Namers     \(Index : Integer\) : ISignalNode;         
Function    DM\_SubNets    \(Index : Integer\) : ISubNet;             
Function    DM\_DriverLinks\(Index : Integer\) : ISignalLink;         
Function    DM\_TargetLinks\(Index : Integer\) : ISignalLink;         
Function    DM\_NamerCount      : Integer;                          
Function    DM\_SubNetCount     : Integer;                          
Function    DM\_DriverLinkCount : Integer;                          
Function    DM\_TargetLinkCount : Integer;                          
Function    DM\_DriverBits \(BitNo,Index : Integer\) : ISignalNode;   
Function    DM\_TargetBits \(BitNo,Index : Integer\) : ISignalNode;   
Function    DM\_DriverBitCount\(BitNo : Integer\) : Integer;          
Function    DM\_TargetBitCount\(BitNo : Integer\) : Integer;          
Function    DM\_Prefix          : WideString;                       
Function    DM\_Range1          : WideString;                       
Function    DM\_Range2          : WideString;                       
Function    DM\_RangeValue1     : Integer;                          
Function    DM\_RangeValue2     : Integer;                          
Function    DM\_BusKind         : TBusKind;                         
Function    DM\_Width           : Integer;                          
Function    DM\_RangeMax        : Integer;                          
Function    DM\_RangeMin        : Integer;                          
Function    DM\_PrimaryNode     : ISignalNode;                      
Function    DM\_PowerNode       : ISignalNode;                      
Function    DM\_PowerName       : WideString;                       
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignalNode interface  
ISubNet interface  
ISignalLink interface  
TBusKind interface