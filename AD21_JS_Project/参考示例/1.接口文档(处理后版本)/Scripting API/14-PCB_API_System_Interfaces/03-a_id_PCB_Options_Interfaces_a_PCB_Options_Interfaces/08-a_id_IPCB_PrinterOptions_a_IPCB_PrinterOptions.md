### <a id="IPCB_PrinterOptions"></a>IPCB\_PrinterOptions

__Overview__  
The __IPCB\_PrinterOptions__ interface represents the Printer options setup in the PCB Editor server\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Methods__  
Procedure Import\_FromParameters\_GeneralOptions        \(DisplayUnit : TUnit;  
                                                       Parameters  : PChar\);  
Procedure Import\_FromParameters\_LayerOptions          \(Parameters  : PChar\);  
Procedure Import\_FromParameters\_LayerOptions\_Version3 \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_GeneralOptions          \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_LayerOptions            \(Parameters  : PChar\);  
Procedure Export\_ToParameters\_LayerOptions\_Version3   \(Parameters  : PChar\);  
__Properties__  
Property Device           : TPCBString  
Property Driver           : TPCBString  
Property OutPut           : TPCBString  
Property OutputDriverType : TOutputDriverType  
Property ShowHoles        : Boolean            
Property ScaleToFitPage   : Boolean            
Property UsePrinterFonts  : Boolean            
Property UseSoftwareArcs  : Boolean            
Property BatchType        : TPrinterBatch      
Property CompositeType    : TPrinterComposite  
Property cBorderSize      : TCoord             
Property Scale            : TGeometry          
Property XCorrect         : TGeometry          
Property YCorrect         : TGeometry          
Property PlotMode \[OId : TObjectId\]            : TDrawMode          
Property PlotPadNets      : Boolean            
Property PlotPadNumbers   : Boolean            
Property PlotterScale     : TGeometry          
Property PlotterXCorrect  : TGeometry          
Property PlotterYCorrect  : TGeometry          
Property PlotterXOffset   : TCoord             
Property PlotterYOffset   : TCoord             
Property PlotterShowHoles : Boolean            
Property PlotterUseSoftwareArcs : Boolean            
Property PlotterWaitBetweenSheets : Boolean            
Property PlotterOutputPort                     : TOutputPort        
Property PlotterLanguage                       : TPlotterLanguage   
Property PlotterPens \[PId : Integer\]           : TPlotterPen        
Property CompositePlotMonoLayers  \[L : TLayer\] : TColor             
Property CompositePlotColorLayers \[L : TLayer\] : TColor             
Property CompositePlotLayers      \[L : TLayer\] : Boolean            
Property CompositePlotPens        \[L : TLayer\] : Integer            
__See also__  
IPCB\_AbstractOptions interface