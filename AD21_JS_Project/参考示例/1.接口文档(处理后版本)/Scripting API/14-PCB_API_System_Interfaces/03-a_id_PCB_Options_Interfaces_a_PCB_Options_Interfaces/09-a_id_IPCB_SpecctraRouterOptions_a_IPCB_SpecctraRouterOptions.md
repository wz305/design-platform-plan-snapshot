### <a id="IPCB_SpecctraRouterOptions"></a>IPCB\_SpecctraRouterOptions

__Overview__  
The IPCB\_SpecctraRouterOptions interface represents the options for the Specctra Router application\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Properties__  
Property Setback      \[I : Integer\]      : TCoord         
Property DoSetback    \[I : Integer\]      : Boolean        
Property DoBus                           : Boolean        
Property BusDiagonal                     : Boolean        
Property DoQuit                          : Boolean        
Property WireGrid                        : TReal          
Property ViaGrid                         : TReal          
Property DoSeedVias                      : Boolean        
Property NoConflicts                     : Boolean        
Property AdvancedDo                      : Boolean        
Property ReorderNets                     : Boolean        
Property ProtectPreRoutes                : Boolean        
Property SeedViaLimit                    : TCoord         
Property RoutePasses                     : Integer        
Property CleanPasses                     : Integer        
Property FilterPasses                    : Integer        
Property LayerCost    \[L : TLayer\]       : TCCTCost       
Property LayerWWCost  \[L : TLayer\]       : TCCTCost       
Property WwCost                          : TCCTCost       
Property CrossCost                       : TCCTCost       
Property ViaCost                         : TCCTCost       
Property OffGridCost                     : TCCTCost       
Property OffCenterCost                   : TCCTCost       
Property SideExitCost                    : TCCTCost       
Property SqueezeCost                     : TCCTCost       
Property LayerTax     \[L : TLayer\]       : TCCTTax        
Property LayerWWTax   \[L : TLayer\]       : TCCTTax        
Property WwTax                           : TCCTTax        
Property CrossTax                        : TCCTTax        
Property ViaTax                          : TCCTTax        
Property OffGridTax                      : TCCTTax        
Property OffCenterTax                    : TCCTTax        
Property SideExitTax                     : TCCTTax        
Property SqueezeTax                      : TCCTTax        
Property DoCritic                        : Boolean        
Property DoMiter                         : Boolean        
Property DoRecorner                      : Boolean        
Property DoFanout                        : Boolean        
Property FoPower                         : Boolean        
Property FoSignal                        : Boolean        
Property FoIn                            : Boolean        
Property FoOut                           : Boolean        
Property FoVias                          : Boolean        
Property FoPads                          : Boolean        
Property FoPasses                        : Integer        
Property ForceVias                       : Boolean        
Property DoSpread                        : Boolean        
Property SortKind                        : TCCTSort       
Property SortDir                         : TCCTSortDir    
Property Adv10                           : Boolean        
Property Dfm10                           : Boolean        
Property Hyb10                           : Boolean        
Property SpVersion                       : Integer        
Property MinimizePads                    : Boolean        
__See also__  
IPCB\_AbstractOptions interface