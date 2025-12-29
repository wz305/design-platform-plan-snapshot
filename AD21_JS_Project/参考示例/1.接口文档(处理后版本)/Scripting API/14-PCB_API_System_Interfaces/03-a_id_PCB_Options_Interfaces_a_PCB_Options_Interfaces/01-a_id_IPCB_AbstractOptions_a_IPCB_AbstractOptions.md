### <a id="IPCB_AbstractOptions"></a>IPCB\_AbstractOptions

__Overview__  
The IPCB\_AbstractOptions interface is the base interface for other options related interfaces such as SystemOptions and InteractiveRoutingOptions through IPCB\_ServerInterface\. These option objects are global objects created by the PCB Server\.

The other OutputOptions, ECOOptions, GerberOptions, PrinterOptions and PlacerOptions interfaces are referenced through IPCB\_Board interface\.

__Notes__  
Ancestor interface for ECO Options, Output Options, Gerber Options, Printer Options, Advanced Placer Options, SystemOptions, Design Rule Checker Options, SpecctraRouter Options and Interactive Routing options interfaces\.

__Methods__  
Procedure Import\_FromParameters          \(DisplayUnit : TUnit;  
                                          Parameters  : PChar\);  
Procedure Export\_ToParameters            \(Parameters  : PChar\);  
Procedure Import\_FromParameters\_Version4 \(DisplayUnit : TUnit;  
                                          Parameters  : PChar\);  
Procedure Export\_ToParameters\_Version4   \(Parameters  : PChar\);  
Procedure Import\_FromParameters\_Version3 \(DisplayUnit : TUnit;  
                                          Parameters  : PChar\);  
Procedure Export\_ToParameters\_Version3   \(Parameters  : PChar\);  
Function  I\_ObjectAddress : TPCBObjectHandle;  
__Properties__  
OptionsObjectID : TOptionsObjectId  
__See also__  
IPCB\_ECOOptions interface  
IPCB\_OutputOptions interface  
IPCB\_GerberOptions interface  
IPCB\_PrinterOptions interface  
IPCB\_AdvancedPlacerOptions interface  
IPCB\_SystemOptions interface  
IPCB\_DesignRuleCheckerOptions interface  
IPCB\_SpecctraRouterOptions interface  
IPCB\_InteractiveRoutingOptions interface