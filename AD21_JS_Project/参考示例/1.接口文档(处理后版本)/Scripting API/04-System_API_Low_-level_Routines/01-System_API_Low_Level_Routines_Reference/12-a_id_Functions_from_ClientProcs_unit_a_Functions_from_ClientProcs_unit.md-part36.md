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

### <a id="ISch_Iterator_Interface"></a>ISch\_Iterator Interface

__Overview__  
An iterator object interface represents an existing iterator object which iterates through a design database to fetch specified objects within a specified region if necessary\.

__Important Notes__  
Delphi Script does not support sets\. Therefore, to specify the object set or the layer set, you need to use the MkSet function to create a set of objects, for example Iterator\.AddFilter\_ObjectSet\(MkSet\(ePort\)\);

The TIterationDepth type denotes how deep the iterator can look \- look for first level objects \(for example standalone system parameters of the document only, or all levels for example all parameters on the document including system parameters, objects' parameters such as component's parameters\. By default, eIterateAllLevels value is used\.

SetState\_FilterAll denotes that all objects and the whole schematic document is to be searched within\. Otherwise, use the following AddFilter\_ObjectSet, AddFilter\_Area etc methods to set up a restricted search\.

The ISch\_Iterator interface hierarchy is as follows;

__ISch\_Iterator Methods and Properties Table__

__ISch\_Iterator methods__  
I\_ObjectAddress  
SetState\_FilterAll  
AddFilter\_ObjectSet  
AddFilter\_CurrentPartPrimitives  
AddFilter\_CurrentDisplayModePrimitives  
AddFilter\_PartPrimitives  
AddFilter\_Area  
SetState\_IterationDepth  
FirstSchObject  
NextSchObject

__ISch\_Iterator properties__

__See also__  
ISch\_BasicContainer interface  
ISch\_Lib interface