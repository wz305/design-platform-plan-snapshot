#### Methods

##### UpdatePrimitivesAccessibility method

\(ISch\_Component interface\)  
__Syntax__  
Procedure UpdatePrimitivesAccessibility;  
__Description__  
When the connection lines have been modified, invoke the UpdatePrimitivesAccessibility to ensure the primitives associated with the connection lines have been refreshed\.  
__Example__  
__See also__  
ISch\_Component interface

##### GetState\_IsInferred method

\(ISch\_ConnectionLine interface\)  
__Syntax__  
Function GetState\_IsInferred : Boolean;  
__Description__  
An inferred property indicates that a connection between documents has been detected by the Schematic Navigation system after the project has been compiled\.

An inferred property denotes whether the object is an inferred object with respect to connective objects\. Bus and Sheet Symbols can be defined in ranges using the NetLabel \[\] and Repeat statements respectively and once the project has been compiled, inferred objects created in memory for navigation/connective purposes\. For example, a Bus with a range of A\[0\.\.4\] ends up with five wires with A0\.\.\.A5 net labels \(only in memory\)\. This property is useful for multi – channel projects and for sheets that have Bus objects\.

This method gets the IsInferred state and is used in the IsInferred property\.  
__Example__  
__See also__  
ISch\_ConnectionLine interface

##### SetState\_IsInferred method

\(ISch\_ConnectionLine interface\)  
__Syntax__  
Procedure SetState\_IsInferred\(B : Boolean\);  
__Description__  
An inferred property indicates that a connection between documents has been detected by the Schematic Navigation system after the project has been compiled\.

An inferred property denotes whether the object is an inferred object with respect to connective objects\. Bus and Sheet Symbols can be defined in ranges using the NetLabel \[\] and Repeat statements respectively and once the project has been compiled, inferred objects created in memory for navigation/connective purposes\. For example, a Bus with a range of A\[0\.\.4\] ends up with five wires with A0\.\.\.A5 net labels \(only in memory\)\. This property is useful for multi – channel projects and for sheets that have Bus objects\.

This method sets the IsInferred state and is used in the IsInferred property\.  
__Example__  
__See also__  
ISch\_ConnectionLine interface