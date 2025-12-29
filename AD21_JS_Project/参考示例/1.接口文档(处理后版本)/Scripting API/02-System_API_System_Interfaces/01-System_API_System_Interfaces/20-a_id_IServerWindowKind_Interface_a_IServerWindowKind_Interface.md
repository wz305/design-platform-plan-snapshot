### <a id="IServerWindowKind_Interface"></a>IServerWindowKind Interface

__Overview__  
This IServerWindowKind interface reports the type of a design document in Altium Designer and it is a composite object used in IServerRecord and IClient interface objects

__IServerWindowKind Methods__  
GetServerRecord  
GetName  
GetNewWindowCaption  
GetNewWindowExtension  
GetWindowKindDescription  
GetIconName  
GetIsDomain  
GetIsDocumentEditor  
FileLoadDescriptionCount  
FileSaveDescriptionCount  
GetFileLoadDescription  
GetFileSaveDescription  
GetWindowKindClassCount  
GetWindowKindClass  
IsOfWindowKindClass

__IServerWindowKind Properties__

__See also__  
IClient interface  
IServerRecord interface

#### IServerWindowKind Methods

##### FileLoadDescriptionCount method

\(IServerWindowKind interface\)  
__Syntax__  
Function FileLoadDescriptionCount : Integer;  
__Description__  
The method returns the number of File Load Descriptions for the document editor type of server\. A document editor can support multiple document types and thus facilitate multiple load functions\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### FileSaveDescriptionCount method

\(IServerWindowKind interface\)  
__Syntax__  
Function FileSaveDescriptionCount : Integer;  
__Description__  
The method returns the number of File Save Descriptions for the document editor server\. A document editor can have multiple document types and thus have multiple corresponding file save functions\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetFileLoadDescription method

\(IServerWindowKind interface\)  
__Syntax__  
Function GetFileLoadDescription\(Index  : Integer\) : Widestring;  
__Description__  
The method returns the indexed file load description\. To be used in conjunction with the FileLoadDescriptionCount function\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetFileSaveDescription method

\(IServerWindowKind interface\)  
__Syntax__  
Function GetFileSaveDescription\(Index  : Integer\) : Widestring;  
__Description__  
The method returns the indexed file save description\. To be used in conjunction with the FileSaveDescriptionCount function\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetIconName method

\(IServerWindowKind interface\)  
__Syntax__  
Function GetIconName : Widestring;  
__Description__  
The method returns the name of the icon associated with the server window of a document in DXP\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetIsDocumentEditor method

\(IServerWindowKind interface\)  
__Syntax__  
Function GetIsDocumentEditor : Boolean;  
__Description__  
The method returns a Boolean value whether this server is a document editor or not\. Addons are not document editors\. A document editor is a server that hosts its own documents and provide editing facilities\. For example the PCB Editor is a Document Editor\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetIsDomain

\(IServerWindowKind interface\)  
__Syntax__  
Function GetIsDomain : LongBool;  
__Description__  
The method returns the Boolean value for this Domain\. Normally false\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetName method

\(IServerWindowKind interface\)  
__Syntax__  
Function GetName : Widestring;  
__Description__  
Returns the name of the window kind\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetNewWindowCaption method

\(IServerWindowKind interface\)  
__Syntax__  
Function GetNewWindowCaption : Widestring;  
__Description__  
The GetNewWindowCaption method returns the new document caption string for the new document in Altium Designer\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetNewWindowExtension method

\(IServerWindowKind interface\)  
__Syntax__  
Function GetNewWindowExtension : Widestring;  
__Description__  
The method returns the new document’s extension string in DXP\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetServerRecord method

\(IServerWindowKind interface\)  
__Syntax__  
Function GetServerRecord : IServerRecord;  
__Description__  
Returns the IServerRecord interface that the IServerWindowKind interface is associated with\. Since the server installation file defines document kinds \(window kinds\) and the IServerRecord interface represents this installation file\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetWindowKindClass

\(IExternalForm interface\)  
__Syntax__  
Function GetWindowKindClass \(Index  : Integer\) : Widestring;  
__Description__  
The method returns the indexed window kind class\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetWIndowKindClassCount

\(IServerWindowKind interface\)  
__Syntax__  
Function GetWindowKindClassCount : Integer;  
__Description__  
The method returns the number of window kind classes\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### GetWindowKindDescription method

\(IServerWIndowKind interface\)  
__Syntax__  
Function GetWindowKindDescription : Widestring;  
__Description__  
The method returns the window kind description string for a window in Altium Designer\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface

##### IsOfWindowKindClass method

\(IServerWindowKind interface\)  
__Syntax__  
Function IsOfWindowKindClass\(Const AClass : Widestring\) : Boolean;  
__Description__  
The method returns a boolean value whether the class string is part of a window kind class or not\.  
__Example__  
   
__See also__  
IClient interface  
IServerWindowKind interface