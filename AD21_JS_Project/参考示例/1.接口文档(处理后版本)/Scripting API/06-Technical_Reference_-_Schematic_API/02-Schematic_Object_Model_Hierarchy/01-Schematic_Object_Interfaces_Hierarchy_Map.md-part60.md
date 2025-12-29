#### Properties

##### IsInferred property

\(ISch\_ConnectionLine interface\)  
__Syntax__  
Property IsInferred : Boolean Read GetState\_IsInferred Write SetState\_IsInferred;  
__Description__  
An inferred property indicates that a connection between documents has been detected by the Schematic Navigation system after the project has been compiled\.

An inferred property denotes whether the object is an inferred object with respect to connective objects\. Bus and Sheet Symbols can be defined in ranges using the NetLabel \[\] and Repeat statements respectively and once the project has been compiled, inferred objects created in memory for navigation/connective purposes\. For example, a Bus with a range of A\[0\.\.4\] ends up with five wires with A0\.\.\.A5 net labels \(only in memory\)\. This property is useful for multi – channel projects and for sheets that have Bus objects\.

This property is supported by the GetState\_IsInferred and SetState\_IsInferred methods\.  
__Example__  
__See also__  
ISch\_ConnectionLine interface

### <a id="ISch_CrossSheetConnector_Interface"></a>ISch\_CrossSheetConnector Interface

__Overview__  
Cross sheet connector objects can be used to link a net from a sheet to other sheets within a project\. This method defines global connections between sheets within a project\.  
__Notes__  
The ISch\_CrossSheetConnector interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Label  
        ISch\_PowerObject  
            ISch\_CrossSheetConnector

__ISch\_CrossSheetConnector methods__  
GetCrossSheetConnectorStyle  
SetCrossSheetConnectorStyle

__ISch\_CrossSheetConnector properties__  
CrossSheetStyle

__See also__  
ISch\_GraphicalObject interface  
ISch\_Label interface  
ISch\_PowerObject interface  
ISch\_CrossSheetConnector interface