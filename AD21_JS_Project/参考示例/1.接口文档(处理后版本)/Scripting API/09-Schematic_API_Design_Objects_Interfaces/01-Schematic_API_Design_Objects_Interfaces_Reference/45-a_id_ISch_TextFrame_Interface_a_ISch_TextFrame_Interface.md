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

#### Methods

##### SetState\_WordWrap method

\(ISch\_TextFrame interface\)  
__Syntax__  
Procedure SetState\_WordWrap \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### SetState\_TextColor method

\(ISch\_TextFrame interface\)  
__Syntax__  
Procedure SetState\_TextColor \(AValue : TColor\);  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### SetState\_ShowBorder method

\(ISch\_TextFrame interface\)  
__Syntax__  
Procedure SetState\_ShowBorder \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### SetState\_FontId method

\(ISch\_TextFrame interface\)  
__Syntax__  
Procedure SetState\_FontId \(AValue : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### SetState\_ClipToRect method

\(ISch\_TextFrame interface\)  
__Syntax__  
Procedure SetState\_ClipToRect \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### SetState\_Alignment method

\(ISch\_TextFrame interface\)  
__Syntax__  
Procedure SetState\_Alignment \(AValue : THorizontalAlign\);  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### GetState\_WordWrap method

\(ISch\_TextFrame interface\)  
__Syntax__  
Function GetState\_WordWrap : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### GetState\_TextColor method

\(ISch\_TextFrame interface\)  
__Syntax__  
Function GetState\_TextColor : TColor;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### GetState\_ShowBorder method

\(ISch\_TextFrame interface\)  
__Syntax__  
Function GetState\_ShowBorder : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### GetState\_FontId method

\(ISch\_TextFrame interface\)  
__Syntax__  
Function GetState\_FontId : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### GetState\_ClipToRect method

\(ISch\_TextFrame interface\)  
__Syntax__  
Function GetState\_ClipToRect : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### GetState\_Alignment method

\(ISch\_TextFrame interface\)  
__Syntax__  
Function GetState\_Alignment : THorizontalAlign;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

#### Properties

##### FontId property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property FontId : Integer Read GetState\_FontId Write SetState\_FontId;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### WordWrap property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property WordWrap : Boolean Read GetState\_WordWrap Write SetState\_WordWrap;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### TextColor property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property TextColor : TColor Read GetState\_TextColor Write SetState\_TextColor;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### Text property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property Text : WideString Read GetState\_Text Write SetState\_Text;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### ShowBorder property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property ShowBorder : Boolean Read GetState\_ShowBorder Write SetState\_ShowBorder;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### ClipToRect property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property ClipToRect : Boolean Read GetState\_ClipToRect Write SetState\_ClipToRect;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### Alignment property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property Alignment : THorizontalAlign Read GetState\_Alignment Write SetState\_Alignment;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface