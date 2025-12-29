#### Methods

##### DrawToMetafile method

\(IComponentMetafilePainter interface\)  
__Syntax__  
Procedure DrawToMetafile\(APartIndex : Integer; APaintColorMode : TPaintColorMode;AScaleMode : TPaintScaleMode; Const AFileName : WideString\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IComponentMetafilePainter interface  
TPaintColorMode type  
TPaintScaleMode type

##### SetComponent method

\(IComponentMetafilePainter interface\)  
__Syntax__  
Procedure SetComponent \(Const ALibReference, ALibraryPath : WideString\);  
__Description__  
This is for internal use\.  
__Example__  
   
__See also__  
IComponentMetafilePainter interface

### <a id="IDocumentPainterView_Interface"></a>IDocumentPainterView Interface

__Overview__  
The IDocumentPainterView interface is an internal interface for the Schematic Editor and it represents the Mini Viewer facility\. This is for internal use\.

__IDocumentPainterView methods__  
DrawCurrentZoomRectangle\_Invert  
PaintSingleObject  
Redraw  
Refresh  
RefreshCurrentZoomWindow  
SetState\_ClickHandler  
SetState\_DbleClickHandler  
SetState\_DocumentToPaint  
SetState\_MouseMoveOverLocationHandler

__IDocumentPainterView properties__

__See also__  
ISch\_ServerInterface interface  
IComponentPainterView interface  
IComponentMetafilePainter interface