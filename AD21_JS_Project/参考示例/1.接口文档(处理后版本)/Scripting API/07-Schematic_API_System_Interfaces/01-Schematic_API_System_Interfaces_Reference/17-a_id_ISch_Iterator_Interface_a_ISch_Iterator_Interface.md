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

#### ISch\_Iterator Methods

##### AddFilter\_Area method

\(ISch\_Iterator interface\)  
__Syntax__  
Procedure AddFilter\_Area\(X1, Y1, X2, Y2 : TCoord\);  
__Description__  
The AddFilter\_Area procedure defines the rectangular bounds \(X1,Y1 and X2,Y2\) of the schematic/library document that the iterator will search within\.  
__Example__  
__See also__  
ISch\_Iterator interface  
TCoord type

##### AddFilter\_CurrentDisplayModePrimitives method

\(ISch\_Iterator interface\)  
__Syntax__  
Procedure AddFilter\_CurrentDisplayModePrimitives;  
__Description__  
This procedure sets the iterator to look for current display mode primitives only\. A component can be represented by different modes \- ie there can be different graphical representations of the same component type\.  
__Example__  
__See also__  
ISch\_Iterator interface

##### AddFilter\_CurrentPartPrimitives method

\(ISch\_Iterator interface\)  
__Syntax__  
Procedure AddFilter\_CurrentPartPrimitives;  
__Description__  
This procedure sets up the filter of the iterator to look for the current primitives of a part only\. A component can be composed of multiple parts and each part is identified by its PartID value\.  
__Example__  
__See also__  
ISch\_Iterator interface

##### AddFilter\_ObjectSet method

\(ISch\_Iterator interface\)  
__Syntax__  
Procedure AddFilter\_ObjectSet\(Const AObjectSet : TObjectSet\);  
__Description__  
This procedure defines which objects the iterator will look for on a schematid document or a library document\.  
__Example__  
__See also__  
ISch\_Iterator interface  
TObjectSet type

##### AddFilter\_PartPrimitives method

\(ISch\_Iterator interface\)  
__Syntax__  
Procedure AddFilter\_PartPrimitives\(APartId : Integer; ADisplayMode : TDisplayMode\);  
__Description__  
This procedure sets up the filter of the iterator to look for primitives of a part \(of a component\)\. A component can be a multi\-part component, for example a 74LS04 can have four parts and they are identified by the PartID value\.  
__Example__  
__See also__  
ISch\_Iterator interface  
TDisplayMode type in Workspace Manager API

##### FirstSchObject method

\(ISch\_Iterator interface\)  
__Syntax__  
Function FirstSchObject : ISch\_BasicContainer;  
__Description__  
The FirstSchObject function fetches the first object found by the iterator\. The FirstSchObject method is to be invoked first and then in a While Nil loop, the NextSchObject is called repeatedly until it returns a nil value where the loop is terminated\.  
DelphiScript __Example__

01

Iterator   := CurrentSheet\.SchIterator\_Create;

02

Iterator\.AddFilter\_ObjectSet\(MkSet\(ePort\)\);

03

If Iterator = Nil Then Exit;

04

Try

05

    Port := Iterator\.FirstSchObject;

06

    While Port <> Nil Do

07

    Begin

08

        PortNumber := PortNumber \+ 1;

09

        Port := Iterator\.NextSchObject;

10

    End;

11

Finally

12

    CurrentSheet\.SchIterator\_Detroy\(Iterator\);

13

End;

__See also__  
ISch\_Iterator interface  
NextSchObject interface

##### I\_ObjectAddress method

\(ISch\_Iterator interface\)  
__Syntax__  
Function I\_ObjectAddress : TSCHObjectHandle;  
__Description__  
This function obtains the pointer to the iterator object\.  
__Example__  
__See also__  
ISch\_Iterator interface  
TSchObjectHandle type

##### NextSchObject method

\(ISch\_Iterator interface\)  
__Syntax__  
Function NextSchObject : ISch\_BasicContainer;  
__Description__  
The NextSchObject function fetches the next object found by the iterator\. The FirstSchObject method is to be invoked first and then in a While Nil loop, the NextSchObject is called repeatedly until it returns a nil value where the loop is terminated\.  
DelphiScript __Example__

01

Iterator   := CurrentSheet\.SchIterator\_Create;

02

Iterator\.AddFilter\_ObjectSet\(MkSet\(ePort\)\);

03

If Iterator = Nil Then Exit;

04

Try

05

    Port := Iterator\.FirstSchObject;

06

    While Port <> Nil Do

07

    Begin

08

        PortNumber := PortNumber \+ 1;

09

        Port := Iterator\.NextSchObject;

10

    End;

11

Finally

12

    CurrentSheet\.SchIterator\_Detroy\(Iterator\);

13

End;

__See also__  
ISch\_Iterator interface  
FirstSchObject method

##### SetState\_FilterAll method

\(ISch\_Iterator interface\)  
__Syntax__  
Procedure SetState\_FilterAll;  
__Description__  
This procedure sets the iterator to look for everything on a document\.  
__Example__  
__See also__  
ISch\_Iterator interface

##### SetState\_IterationDepth method

\(ISch\_Iterator interface\)  
__Syntax__  
Procedure SetState\_IterationDepth\(AIterationDepth : TIterationDepth\);  
__Description__  
The TIterationDepth type denotes how deep the iterator can look on a document\.  
Look for first level objects, for example standalone system parameters of the document only, or all levels for example all parameters on the document including system parameters, objects' parameters such as component's parameters\.  
By default, eIterateAllLevels value is used\.  
__Example__  
__See also__  
ISch\_Iterator interface  
TIterationDepth type