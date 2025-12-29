#### Properties

##### LineWidth property

\(ISch\_Line interface\)  
__Syntax__  
Property LineWidth : TSize Read GetState\_LineWidth Write SetState\_LineWidth;  
__Description__  
The LineWidth property defines the border width of the line with one of the following values from the TSize enumerated type\. This property is supported by the GetState\_LineWidth and SetState\_LineWidth methods\.  
__Example__  
Line\.LineWidth\(eSmall\);  
__See also__  
TSize type\.  
ISch\_Line interface

##### LineStyle property

\(ISch\_Line interface\)  
__Syntax__  
Property LineStyle : TLineStyle Read GetState\_LineStyle Write SetState\_LineStyle;  
__Description__  
__Example__  
__See also__  
ISch\_Line interface

##### Corner property

\(ISch\_Line interface\)  
__Syntax__  
Property Corner : TLocation Read GetState\_Corner Write SetState\_Corner;  
__Description__  
__Example__  
__See also__  
ISch\_Line interface

### <a id="ISch_NetLabel_Interface"></a>ISch\_NetLabel Interface

__Overview__  
A net describes a connection from one component pin, to a second pin, and then to a third pin and so on\. A net label is a text string with the text property that holds the net name that attachs to a connection such as wires\. A net label object is represented by the ISch\_NetLabel interface\.

The ISch\_NetLabel interface hierachy is as follows:  
ISch\_GraphicalObject  
ISch\_Label  
ISch\_NetLabel

Text property is the net name of the net label\.  
ISch\_NetLabel itself has no properties or methods but has inherited properties and methods\.

__ISch\_NetLabel methods__

__ISch\_NetLabel properties__

__See also__  
ISch\_GraphicalObject interface

### <a id="ISch_NoERC_Interface"></a>ISch\_NoERC Interface

__Overview__  
The NoERC directive is a special symbol that identifies a pin as one that you want the Electrical Rules Checker to ignore\.  
The ISch\_NoERC interface hierarchy is as follows:  
ISch\_GraphicalObject  
ISch\_NoERC

__ISch\_NoERC methods__

__ISch\_NoERC properties__

__See also__  
ISch\_GraphicalObject interface

### <a id="ISch_Note_Interface"></a>ISch\_Note Interface

__Overview__  
The ISch\_Note interface represents the note object on the schematic sheet\. This note object stores textual information and can be collapsed upon user's mouse click on the schematic sheet\.  
The interface hierarchy for the ISch\_Note interface is as follows:  
ISch\_GraphicalObject  
ISch\_Rectangle  
ISch\_TextFrame  
ISch\_Note

__ISch\_Note methods__  
SetState\_Author  
SetState\_Collapsed  
GetState\_Author  
GetState\_Collapsed

__ISch\_Note properties__  
Author  
Collapsed

__See also__  
ISch\_GraphicalObject  
ISch\_Rectangle  
ISch\_TextFrame