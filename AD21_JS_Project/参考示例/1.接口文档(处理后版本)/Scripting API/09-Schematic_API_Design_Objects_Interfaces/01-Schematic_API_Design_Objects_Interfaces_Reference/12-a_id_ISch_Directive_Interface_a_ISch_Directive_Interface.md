### <a id="ISch_Directive_Interface"></a>ISch\_Directive Interface

__Overview__  
An ISch\_Directive interface represents an object that stores a text string\. It is an ancestor interface for the ISch\_ErrorMarker interface\. Design constraints \(rules\) can be defined prior to PCB layout, by adding parameters that are configured as design rule directives to the schematic source document\(s\)\.  
__Notes__  
The ISch\_Directive interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Directive

__ISch\_Directive methods__

__ISch\_Directive properties__  
Text

__See also__  
ISchGraphicalObject interface

#### Properties

##### Text property

\(ISch\_Directive interface\)  
__Syntax__  
Property Text : WideString Read GetState\_Text Write SetState\_Text;  
__Description__  
The Text property represents the text information for the directive objects and the error marker objects\.  
__Example__  
Directive\.Text := ‘Schematic Directive’;  
__See also__  
ISch\_Directive interface  
ISch\_ErrorMarker interface