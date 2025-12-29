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

### <a id="ISch_ParameterSet_Interface"></a>ISch\_ParameterSet Interface

__Overview__  
The ISch\_ParameterSet interface is a group of parameters as a design parameter set directive for a wire or a net on the schematic document that can be transferred to its corresponding PCB document\.  
__Notes__  
The ISch\_ParameterSet interface hierarchy is as follows  
ISch\_GraphicalObject  
    ISch\_ParametrizedGroup  
        ISch\_ParameterSet

__ISch\_ParameterSet methods__  
SetState\_Orientation  
SetState\_Name  
GetState\_Orientation  
GetState\_Name

__ISch\_ParameterSet properties__  
Orientation  
Name

__See also__  
ISch\_GraphicalObject interface  
ISch\_ParametrizedGroup interface