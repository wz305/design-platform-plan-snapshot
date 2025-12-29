#### Properties

##### CrossSheetStyle property

\(ISch\_CrossSheetConnector interface\)  
__Syntax__  
Property CrossSheetStyle : TCrossSheetConnectorStyle Read GetCrossSheetConnectorStyle Write SetCrossSheetConnectorStyle;  
__Description__  
The CrossSheetStyle property represents the style or the alignment of the cross sheet object\. This property is supported by the GetCrossSheetConnectorStyle and SetCrossSheetConnectorStyle methods\.  
__Example__

1

// Port alignment is determined by the CrossConnector's Style\.

2

If CrossConn\.CrossSheetStyle = eCrossSheetRight Then

3

    Port\.Alignment := eRightAlign

4

Else

5

    Port\.Alignment := eLeftAlign;

__See also__  
TCrossSheetConnectorStyle type  
ISch\_CrossSheetConnector interface

### <a id="ISch_Designator_Interface"></a>ISch\_Designator Interface

__Overview__  
The ISch\_Designator interface represents a designator object which is part of the component object that identifies it as part of a net\. Refer to the ISch\_Parameter interface for details\.  
__Notes__  
The ISch\_Designator interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Label  
        ISch\_ComplexText  
            ISch\_Parameter  
                ISch\_Designator

__ISch\_Designator methods__

__ISch\_Designator properties__

__See also__  
ISch\_GraphicalObject interface  
ISch\_Label interface  
ISch\_ComplexText interface  
ISch\_Parameter interface  
ISch\_Designator interface

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