### <a id="ISch_HitTest_Interface"></a>ISch\_HitTest Interface

__Overview__  
This ISch\_HitTest interface returns you the number of objects and object type at a particular point on the schematic document\.

__Notes__  
To specify the location where the objects can be checked on the schematic document, pass in the location \(of TLocation type\) and invoke the CreateHitTest method from the ISchDocument interface\. This location parameter can be set either programmatically or by the ChooseLocationInteractively method form the ISch\_Document interface\.

__ISch\_HitTest methods__  
GetState\_HitTestCount  
GetState\_HitObject

__ISch\_HitTest properties__  
HitTestCount  
HitObject

__See also__  
ISch\_Document interface  
CreateHitTest method  
ChooseLocationInteractively method  
ChooseRectangleInteractively method  
TLocation type

#### ISch\_HitTest Methods

##### GetState\_HitObject method

\(ISch\_HitTest interface\)  
__Syntax__  
Function GetState\_HitObject \(i : Integer\) : ISch\_GraphicalObject;  
__Description__  
This function returns you the indexed object at the particular point on the schematic document\. This method is used in the HitObject property\.  
__Example__  
__See also__  
ISch\_HitTest interface

##### GetState\_HitTestCount method

\(ISch\_HitTest interface\)  
__Syntax__  
Function GetState\_HitTestCount : Integer;  
__Description__  
This function returns you the number of objects at the particular point on the schematic document\. This method is used in the HitTestCount property\.  
__Example__  
__See also__  
ISch\_HitTest interface

#### ISch\_HitTest Properties

##### HitObject property

\(ISch\_HitTest interface\)  
__Syntax__  
Property HitObject\[i : Integer\] : ISch\_GraphicalObject Read GetState\_HitObject;  
__Description__  
This property returns you the indexed object at the particular point on the schematic document\. This property is supported by the GetState\_HitObject method\.  
__Example__  
__See also__  
ISch\_HitTest interface  
HitTestCount property

##### HitTestCount property

\(ISch\_HitTest interface\)  
__Syntax__  
Property HitTestCount : Integer Read GetState\_HitTestCount;  
__Description__  
This property returns you the number of objects at the particular point on the schematic document\. This property is supported by the GetState\_HitTestCount method\.  
__Example__  
__See also__  
ISch\_HitTest interface