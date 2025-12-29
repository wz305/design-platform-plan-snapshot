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

#### Methods

##### SetState\_UniqueId method

\(ISch\_Parameter interface\)  
__Syntax__  
Procedure SetState\_UniqueId \(S : WideString\);  
__Description__  
The SetState\_UniqueID procedure sets the new ID for the parameter\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current parameter\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__  
UID := WSM\.DM\_GenerateUniqueID; // interface and method from Workspace Manager API\.  
Parameter\.SetState\_UniqueID\(UID\);  
__See also__  
ISch\_Parameter interface

##### SetState\_ShowName method

\(ISch\_Parameter interface\)  
__Syntax__  
Procedure SetState\_ShowName \(N : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### SetState\_ReadOnlyState method

\(ISch\_Parameter interface\)  
__Syntax__  
Procedure SetState\_ReadOnlyState \(R : TParameter\_ReadOnlyState\);  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### SetState\_ParamType method

\(ISch\_Parameter interface\)  
__Syntax__  
Procedure SetState\_ParamType \(N : TParameterType\);  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### SetState\_Name method

\(ISch\_Parameter interface\)  
__Syntax__  
Procedure SetState\_Name \(S : WideString\);  
__Description__  
The SetState\_Name procedure sets the new name for the parameter object\.  
__Example__  
Parameter\.SetState\_Name\(‘Parameter Name’\);  
__See also__  
ISch\_Parameter interface

##### SetState\_Description method

\(ISch\_Parameter interface\)  
__Syntax__  
Procedure SetState\___Description__ \(S : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### SetState\_AllowLibrarySynchronize method

\(ISch\_Parameter interface\)  
__Syntax__  
Procedure SetState\_AllowLibrarySynchronize \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### SetState\_AllowDatabaseSynchronize method

\(ISch\_Parameter interface\)  
__Syntax__  
Procedure SetState\_AllowDatabaseSynchronize\(B : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### GetState\_UniqueId method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\_UniqueId : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### GetState\_ReadOnlyState method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\_ReadOnlyState : TParameter\_ReadOnlyState;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### GetState\_____Description____ method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\___Description__ : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### GetState\_AllowLibrarySynchronize method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\_AllowLibrarySynchronize : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### GetState\_AllowDatabaseSynchronize method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\_AllowDatabaseSynchronize : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### GetState\_ValueIsReadOnly method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\_ValueIsReadOnly : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### GetState\_ShowName method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\_ShowName : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### GetState\_ParamType method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\_ParamType : TParameterType;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### GetState\_NameIsReadOnly method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\_NameIsReadOnly : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### GetState\_Name method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\_Name : WideString;  
__Description__  
The GetState\_Name procedure gets the Parameter Object’s name\.  
__Example__  
ParamName := Parameter\.GetState\_Name;  
__See also__  
ISch\_Parameter interface

##### GetState\_IsSystemParameter method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\_IsSystemParameter : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### GetState\_IsRule method

\(ISch\_Parameter interface\)  
__Syntax__  
Function GetState\_IsRule : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

#### Properties

##### ValueIsReadOnly property

\(ISch\_Parameter interface\)  
__Syntax__  
Property ValueIsReadOnly : Boolean Read GetState\_ValueIsReadOnly;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### UniqueId property

\(ISch\_Parameter interface\)  
__Syntax__  
Property UniqueId : WideString Read GetState\_UniqueId Write SetState\_UniqueId;  
__Description__  
The UniqueID property sets the new ID for the parameter\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current parameter\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__  
UID := WSM\.DM\_GenerateUniqueID; // interface and method from Workspace Manager API\.  
Parameter\.UniqueID\(UID\);  
__See also__  
ISch\_Parameter interface

##### ShowName property

\(ISch\_Parameter interface\)  
__Syntax__  
Property ShowName : Boolean Read GetState\_ShowName Write SetState\_ShowName;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### ReadOnlyState property

\(ISch\_Parameter interface\)  
__Syntax__  
Property ReadOnlyState : TParameter\_ReadOnlyState Read GetState\_ReadOnlyState Write SetState\_ReadOnlyState;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### ParamType property

\(ISch\_Parameter interface\)  
__Syntax__  
Property ParamType : TParameterType Read GetState\_ParamType Write SetState\_ParamType;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### NameIsReadOnly property

\(ISch\_Parameter interface\)  
__Syntax__  
Property NameIsReadOnly : Boolean Read GetState\_NameIsReadOnly;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### Name property

\(ISch\_Parameter interface\)  
__Syntax__  
Property Name : WideString Read GetState\_Name Write SetState\_Name;  
__Description__  
The Name property determines the name for the parameter object\.  
__Example__  
ParamName := Parameter\.Name;  
__See also__  
ISch\_Parameter interface

##### Description property

\(ISch\_Parameter interface\)  
__Syntax__  
Property Description : WideString Read GetState\_Description Write SetState\_Description;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### AllowLibrarySynchronize property

\(ISch\_Parameter interface\)  
__Syntax__  
Property AllowLibrarySynchronize : Boolean Read GetState\_AllowLibrarySynchronize Write SetState\_AllowLibrarySynchronize;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### AllowDatabaseSynchronize property

\(ISch\_Parameter interface\)  
__Syntax__  
Property AllowDatabaseSynchronize : Boolean Read GetState\_AllowDatabaseSynchronize Write SetState\_AllowDatabaseSynchronize;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### IsSystemParameter property

\(ISch\_Parameter interface\)  
__Syntax__  
Property IsSystemParameter : Boolean Read GetState\_IsSystemParameter;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface

##### IsRule property

\(ISch\_Parameter interface\)  
__Syntax__  
Property IsRule : Boolean Read GetState\_IsRule;  
__Description__  
__Example__  
__See also__  
ISch\_Parameter interface