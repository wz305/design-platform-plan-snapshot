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

### <a id="ISch_Ellipse"></a>ISch\_Ellipse

__Overview__  
An ellipse is a drawing object which is filled or unfilled graphic elements on a schematic sheet\. Refer to the ISch\_Circle interface for details\.  
__Notes__  
The ISch\_Ellipse interface hierarchy is as follows:  
ISch\_GraphicalObject  
                ISch\_Circle  
                                ISch\_Ellipse

__ISch\_Ellipse methods__  
GetState\_SecondaryRadius  
SetState\_SecondaryRadius

__ISch\_Ellipse properties__  
SecondaryRadius