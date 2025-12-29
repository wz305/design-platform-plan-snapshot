#### Properties

##### FileName property

\(ISch\_Template interface\)  
__Syntax__  
Property FileName : WideString Read GetState\_FileName Write SetState\_FileName;  
__Description__  
__Example__  
__See also__  
ISch\_Template interface

### <a id="ISch_TextFrame_Interface"></a>ISch\_TextFrame Interface

__Overview__  
Text frames hold multiple lines of free text\.  
__Notes__  
ISch\_TextFrame interface hierarchy is as follows:  
ISch\_GraphicalObject  
ISch\_Rectangle  
ISch\_TextFrame

- The FontID property denotes the font type of the TextFrame object\.  Windows True Type fonts are fully supported\. The FontID value denotes which font has been used\.  The FontID is the index to an entry in the font table in the Schematic editor\.  Each font used in the Schematic editor has its own FontID\. 
- When a new font is used \(through a Change Font dialog\), a new FontID is added to the internal table in the Schematic editor\. The FontID value can be extracted from the following Schematic objects \(TextField, Sheet, Annotation, TextFrame and NetLabel objects\)\.

__ISch\_TextFrame methods__  
SetState\_FontId  
SetState\_TextColor  
SetState\_Alignment  
SetState\_WordWrap  
SetState\_ShowBorder  
SetState\_ClipToRect  
GetState\_FontId  
GetState\_TextColor  
GetState\_Alignment  
GetState\_WordWrap  
GetState\_ShowBorder  
GetState\_ClipToRect

__ISch\_TextFrame properties__  
FontId  
TextColor  
Alignment  
WordWrap  
ShowBorder  
ClipToRect  
Text

__See also__