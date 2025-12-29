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

### <a id="ILibCompInfoReader_Interface"></a>ILibCompInfoReader Interface

__Overview__  
The ILibCompInfoReader interface represents the object which has the list of library components \(symbols\) of a loaded schematic library\.

A Schematic library file with a SchLib extension can be loaded in the object represented by the  ILibCompInfoReader interface and to obtain each component \(Symbol\), invoke the indexed ComponentInfos method\. This method fetches the object which is represented by the IComponentInfo interface\.

The steps required to load a schematic library and its components\.  
1\. Create an object and pass in the filename of a schematic library file\. This object is represented by the ILibCompInfoReader interface\. This object is created by the SchServer\.CreateLibCompInfoReader\(LibraryFileName\);  
2\. Invoke the ReadAllComponentInfo method to load the components specified by the library name\.  
3\. Invoke the NumComponentInfos method to obtain the number of components for this library  
4\. Obtain the indexed ComponentInfos method\. This ComponentInfos method returns the indexed IComponentInfo interface\.

__ILibCompInfoReader methods__  
GetState\_ComponentInfo  
GetState\_FileName  
ReadAllComponentInfo  
NumComponentInfos  
I\_ObjectAddress

__ILibCompInfoReader properties__  
ComponentInfos  
FileName