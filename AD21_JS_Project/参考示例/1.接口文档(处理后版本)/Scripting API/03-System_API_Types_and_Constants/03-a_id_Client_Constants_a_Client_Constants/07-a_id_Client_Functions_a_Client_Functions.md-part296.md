#### Properties

##### Collapsed property

\(ISch\_Note interface\)  
__Syntax__  
Property Collapsed : Boolean Read GetState\_Collapsed Write SetState\_Collapsed;  
__Description__  
__Example__  
__See also__  
ISch\_Note interface

##### Author property

\(ISch\_Note interface\)  
__Syntax__  
Property Author : WideString Read GetState\_Author Write SetState\_Author;  
__Description__  
__Example__  
__See also__  
ISch\_Note interface

### <a id="ISch_Parameter_Interface"></a>ISch\_Parameter Interface

__Overview__  
There are two types of parameters – system parameters which are owned by a schematic document and parameters owned by certain schematic design objects\.

A parameter is a child object of a Parameter Set, Part, Pin, Port, or Sheet Symbol object\. A Parameter object has a Name property and Value property which can be used to store information, thus the parameters are a way of defining and associating information and could include strings that identify component manufacturer, date added to the document and also a string for the component's value \(e\.g\. 100K for a resistor or 10PF for a capacitor\)\.

Each parameter has a Unique Id assigned to it\. This is used for those parameters that have been added as design rule directives\. When transferring the design to the PCB document, any defined rule parameters will be used to generate the relevant design rules in the PCB\. These generated rules will be given the same Unique Ids, allowing you to change rule constraints in either schematic or PCB and push the change across when performing a synchronization\.

To look for system wide parameters \(not associated with a schematic design object\), you would set up an iterator to look for parameters\. WIth DelphiScript, you will have to define the iteration depth with the method SetState\_IterationDepth\(eIterateFirstLevel\)\.

The interface hierarchy for the ISch\_Parameter interface is as follows:  
ISch\_GraphicalObject  
ISch\_Label  
ISch\_ComplexText  
ISch\_Parameter

__ISch\_Parameter methods__  
SetState\_ReadOnlyState  
SetState\_UniqueId  
SetState\_Description  
SetState\_AllowLibrarySynchronize  
SetState\_AllowDatabaseSynchronize  
SetState\_Name  
SetState\_ShowName  
SetState\_ParamType  
GetState\_ReadOnlyState  
GetState\_UniqueId  
GetState\_Description  
GetState\_AllowLibrarySynchronize  
GetState\_AllowDatabaseSynchronize  
GetState\_Name  
GetState\_ShowName  
GetState\_ParamType  
GetState\_NameIsReadOnly  
GetState\_ValueIsReadOnly  
GetState\_IsRule  
GetState\_IsSystemParameter

__ISch\_Parameter properties__  
Name  
ShowName  
ParamType  
ReadOnlyState  
UniqueId  
Description  
AllowLibrarySynchronize  
AllowDatabaseSynchronize  
NameIsReadOnly  
ValueIsReadOnly  
IsRule  
IsSystemParameter

__Fetching system \(standalone\) parameters Example__

01

Procedure FetchParameters;

02

Var

03

    CurrentSch : ISch\_Sheet;

04

    Iterator   : ISch\_Iterator;

05

    Parameter  : ISch\_Parameter;

06

Begin

07

    // Check if schematic server exists or not\.

08

    If SchServer = Nil Then Exit;

09

    // Obtain the current schematic document interface\.

10

    CurrentSch := SchServer\.GetCurrentSchDocument;

11

    If CurrentSch = Nil Then Exit;

12

  

13

    Iterator := CurrentSch\.SchIterator\_Create;

14

    // look for stand alone parameters

15

    Iterator\.SetState\_IterationDepth\(eIterateFirstLevel\); 

16

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eParameter\)\); 

17

  

18

    Try

19

       Parameter := Iterator\.FirstSchObject;

20

       While Parameter <> Nil Do

21

       Begin

22

          // do what you want with the parameter

23

          Parameter := Iterator\.NextSchObject;

24

       End;

25

    Finally

26

        CurrentSch\.SchIterator\_Destroy\(Iterator\);

27

    End;

28

End;

__See also__  
ISch\_GraphicalObject interface  
ISch\_Label interface  
ISch\_ComplexText interface