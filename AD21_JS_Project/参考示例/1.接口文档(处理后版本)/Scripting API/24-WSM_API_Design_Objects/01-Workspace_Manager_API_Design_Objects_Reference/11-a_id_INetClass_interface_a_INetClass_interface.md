### <a id="INetClass_interface"></a>INetClass interface

__Overview__  
The INetClass interface is a PCB Net Class object interface for an existing NetClass on a PCB document\. An existing Net class contains members of specific Net objects\. Each Net within a NetClass object can either be a member, or not\. The 'All Nets' Net Class exists in every PCB file by default; it includes all Nets in the document\. It is not possible to change which Nets are members of that Net Class, but the user has full control over which Nets are members of any other Net Classes \(which are created and named by the user\)\.  
__Notes__  
An INetClass interface is inherited from the IObjectClass interface\.  
__See also__  
IObjectClass