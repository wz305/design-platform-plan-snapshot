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