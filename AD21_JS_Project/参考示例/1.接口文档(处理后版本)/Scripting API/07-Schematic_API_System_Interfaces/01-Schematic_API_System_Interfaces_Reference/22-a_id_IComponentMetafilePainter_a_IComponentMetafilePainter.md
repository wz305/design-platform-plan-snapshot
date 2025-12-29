### <a id="IComponentMetafilePainter"></a>IComponentMetafilePainter

__Overview__  
The IComponentMetaFilePainter interface is an internal interface that provides a mechanism to generate images into library reports within the Schematic Library Editor\.

The IComponentMetafilePainter interface hierarchy is as follows;

__IComponentMetafilePainter methods__  
SetComponent  
DrawToMetafile

__IComponentMetafilePainter properties__

__See also__  
ISch\_ServerInterface interface  
IComponentPainterView interface  
IComponentMetafilePainter interface

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