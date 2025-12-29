# <a id="Signals_Manager_interfaces"></a>Signals Manager interfaces

__Overview__  
__Important notes__  
·          Inherited from ISignalNode interface  
__Interface Methods__  
·          All methods from ISignalNode interface\.  
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignalNode interface


__Overview__  
The IExternalParameter interface defines the external parameter object\.

__Interface Methods__

__Method__

__Description__

Function  DM\_GetSection : WideString;

Returns the Section string of the external parameter interface\.

Function  DM\_GetName : WideString;

Returns the Name string of the external parameter interface\.

Function  DM\_GetValue : WideString;

Returns the Value string of the external parameter interface\.

Procedure DM\_SetValue\(AValue : WideString\);

Sets the new value string for this external parameter\.


__Overview__  
__Interface Methods__  
Function    DM\_Part         : IPart;                       
Function    DM\_SheetSymbol  : ISheetSymbol;                
Function    DM\_Ports \(Index : Integer\) :  IInstancePort;   
Function    DM\_PortCount    : Integer;                     
Function    DM\_Designator   : WideString;                  
Function    DM\_InstanceType : WideString;                  
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
IPart interface  
ISheetSymbol interface  
IInstancePort interface


__Overview__  
__Important notes__  
·          Inherited from ISignalNode interface  
__Interface Methods__  
·          All methods from ISignalNode interface\.  
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignalNode interface


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


__Overview__  
__Interface Methods__  
Function    DM\_DriverNode              : ISignalNode;  
Function    DM\_TargetNode              : ISignalNode;  
Function    DM\_DriverSignal            : ISignal;      
Function    DM\_DriverNodeRange1        : WideString;   
Function    DM\_DriverNodeRange2        : WideString;   
Function    DM\_DriverNodeRangeValue1   : Integer;      
Function    DM\_DriverNodeRangeValue2   : Integer;      
Function    DM\_TargetSignal            : ISignal;      
Function    DM\_TargetNodeRange1        : WideString;   
Function    DM\_TargetNodeRange2        : WideString;   
Function    DM\_TargetNodeRangeValue1   : Integer;      
Function    DM\_TargetNodeRangeValue2   : Integer;      
Function    DM\_DriverRangeMax          : Integer;      
Function    DM\_DriverRangeMin          : Integer;      
Function    DM\_TargetRangeMax          : Integer;      
Function    DM\_TargetRangeMin          : Integer;      
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignal interface  
ISignalNode interface


__Overview__  
__Interface Methods__  
Function    DM\_SubNets       \(Index : Integer\) : ISubNet;      
Function    DM\_Instances     \(Index : Integer\) : IInstance;    
Function    DM\_InstanceKinds \(Index : Integer\) : IInstance;    
Function    DM\_Signals       \(Index : Integer\) : ISignal;      
Function    DM\_EntityPorts   \(Index : Integer\) : IEntityPort;  
   
Function    DM\_SubNetCount       : Integer;                    
Function    DM\_InstanceCount     : Integer;                    
Function    DM\_InstanceKindCount : Integer;                    
Function    DM\_SignalCount       : Integer;                    
Function    DM\_EntityPortCount   : Integer;                    
__See also__  
Workspace Manager Interfaces  
ISubNet interface  
IInstance interface  
ISignal interface  
IEntityPort interface


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


__Overview__  
__Interface Methods__  
Function    DM\_Lines            \(Index : Integer\) : ILine;        
Function    DM\_SignalLinks      \(Index : Integer\) : ISignalLink;  
Function    DM\_Signals          \(Index : Integer\) : ISignal;      
Function    DM\_Nodes            \(Index : Integer\) : ISignalNode;  
Function    DM\_PinNodes         \(Index : Integer\) : ISignalNode;  
Function    DM\_PowerObjectNodes \(Index : Integer\) : ISignalNode;  
Function    DM\_PortNodes        \(Index : Integer\) : ISignalNode;  
Function    DM\_NetLabelNodes    \(Index : Integer\) : ISignalNode;  
Function    DM\_SheetEntryNodes  \(Index : Integer\) : ISignalNode;  
Function    DM\_CrossSheetNodes  \(Index : Integer\) : ISignalNode;  
Function    DM\_LineCount            : Integer;                    
Function    DM\_SignalLinkCount      : Integer;                    
Function    DM\_SignalCount          : Integer;                    
Function    DM\_NodeCount            : Integer;                    
Function    DM\_PinNodeCount         : Integer;                    
Function    DM\_PowerObjectNodeCount : Integer;                    
Function    DM\_PortNodeCount        : Integer;                    
Function    DM\_NetLabelNodeCount    : Integer;                    
Function    DM\_SheetEntryNodeCount  : Integer;                    
Function    DM\_CrossSheetNodeCount  : Integer;                    
Function    DM\_Net                  : INet;                       
__See also__  
Workspace Manager Interfaces  
ISignalManager interface  
ISignal interface  
ISignalNode interface  
ISignalLink interface  
ILine interface  
INet interface

## 子章节

- [<a id="IEntityPort_interface"></a>IEntityPort interface](01-a_id_IEntityPort_interface_a_IEntityPort_interface.md.md)
- [<a id="IExternalParameter_interface"></a>IExternalParameter interface](02-a_id_IExternalParameter_interface_a_IExternalParameter_interface.md.md)
- [<a id="IInstance_interface"></a>IInstance interface](03-a_id_IInstance_interface_a_IInstance_interface.md.md)
- [<a id="IInstancePort_interface"></a>IInstancePort interface](04-a_id_IInstancePort_interface_a_IInstancePort_interface.md.md)
- [<a id="ISignal_interface"></a>ISignal interface](05-a_id_ISignal_interface_a_ISignal_interface.md.md)
- [<a id="ISignalLink"></a>ISignalLink](06-a_id_ISignalLink_a_ISignalLink.md.md)
- [<a id="ISignalManager_interface"></a>ISignalManager interface](07-a_id_ISignalManager_interface_a_ISignalManager_interface.md.md)
- [<a id="ISignalNode"></a>ISignalNode](08-a_id_ISignalNode_a_ISignalNode.md.md)
- [<a id="ISubNet_interface"></a>ISubNet interface](09-a_id_ISubNet_interface_a_ISubNet_interface.md.md)
