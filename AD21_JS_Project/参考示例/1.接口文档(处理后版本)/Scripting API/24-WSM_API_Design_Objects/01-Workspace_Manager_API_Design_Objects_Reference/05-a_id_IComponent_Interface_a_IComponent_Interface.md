### <a id="IComponent_Interface"></a>IComponent Interface

__Overview__  
The IChannelClass interface is a PCB Channel class object interface for an existing Channel Class on a PCB document\. An existing Channel \(room\) class contains members of specific components\.

Each component within a Channel Class object can either be a member or not\. The ‘All Components’ Channel Class exists in every PCB document by default, it includes all Components in the document\.

It is not possible to change which components are members of that Channel class, but the user has full control over which components are members of any other Channel classes \(which are created and named by the User\)

__IComponent methods__  
DM\_SubParts  
DM\_PhysicalComponents  
DM\_SubPartCount  
DM\_PhysicalComponentCount  
DM\_PhysicalPath  
DM\_UniqueId  
DM\_UniqueIdName  
DM\_UniqueIdPath

__IComponent properties__

#### Methods

##### DM\_SubParts method

\(IComponent interface\)  
__Syntax__  
Function DM\_SubParts \(Index : Integer\) : IPart;  
__Description__  
The function returns the indexed sub\-part of a multi\-part component\. Use the DM\_SubPartCount function\.  
__Example__  
__See also__  
IComponent interface

##### DM\_SubPartCount method

\(IComponent interface\)  
__Syntax__  
Function DM\_SubPartCount : Integer;  
__Description__  
The function returns the number of parts for this multi\-part component\. A standalone component returns 1 \(only one part for a standalone component\)\.  
__Example__  
__See also__  
IComponent interface

##### DM\_PhysicalComponents method

\(IComponent interface\)  
__Syntax__  
Function DM\_PhysicalComponents \(Index : Integer\) : IComponent;  
__Description__  
The function returns the indexed physical component\. Use this in conjunction with the DM\_PhysicalComponentCount function\.  
__Example__  
__See also__  
IComponent interface

##### DM\_PhysicalComponentCount method

\(IComponent interface\)  
__Syntax__  
Function DM\_PhysicalComponentCount : Integer;  
__Description__  
The function returns the number of physical components\.  
__Example__  
__See also__  
IComponent interface

##### DM\_UniqueIdPath method

\(IComponent interface\)  
__Syntax__  
Function DM\_UniqueIdPath : WideString;  
__Description__  
The function returns the unique path portion of the Unique ID for this component\. Includes the back slash\.  
__Example__  
__See also__  
IComponent interface

##### DM\_UniqueIdName method

\(IComponent interface\)  
__Syntax__  
Function DM\_UniqueIdName : WideString;  
__Description__  
The function returns the unique name portion of the Unique ID for this component\.  
__Example__  
__See also__  
IComponent interface

##### DM\_UniqueId method

\(IComponent interface\)  
__Syntax__  
Function DM\_UniqueId : WideString;  
__Description__  
The function returns the Unique ID string for this component so this component can be synchronized on the source document and the primary implementation document \(PCB\)\.  
__Example__  
__See also__  
IComponent interface

##### DM\_PhysicalPath method

\(IComponent interface\)  
__Syntax__  
Function DM\_PhysicalPath : WideString;  
__Description__  
The function returns the full physical path for this component\. For example the string can consist of the schematic filename \\ channel name and instance\.  
__Example__  
__See also__  
IComponent interface