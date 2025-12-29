### <a id="IPCB_OutputOptions"></a>IPCB\_OutputOptions

__Overview__  
The IPCB\_OutputOptions interface represents the options for the generation of PCB output such as including mechanical layers in plots etc\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Methods__  
Procedure Import\_FromParameters\_GeneralOptions \(DisplayUnit : TUnit;  
                                                       Parameters  : PChar\);  
Procedure Import\_FromParameters\_LayerOptions   \(Parameters  : PChar\);  
Procedure Import\_FromParameters\_LayerOptions\_Version3 \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_GeneralOptions   \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_LayerOptions     \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_LayerOptions\_Version3   \(Parameters  : PChar\);  
__Properties__  
Property DrillGuideHoleSize              : TCoord   
Property DrillDrawSymbolSize             : TCoord   
Property DrillSymbolKind                 : TDrillS  
Property MultiLayerOnPadMaster           : Boolean  
Property TopLayerOnPadMaster             : Boolean  
Property BottomLayerOnPadMaster          : Boolean  
Property IncludeViasInSolderMask         : Boolean  
   
Property IncludeUnconnectedPads          : Boolean  
Property PlotLayer \[PL : TPlotLayer\]     : Boolean  
Property FlipLayer \[PL : TPlotLayer\]     : Boolean  
__See also__  
IPCB\_AbstractOptions interface