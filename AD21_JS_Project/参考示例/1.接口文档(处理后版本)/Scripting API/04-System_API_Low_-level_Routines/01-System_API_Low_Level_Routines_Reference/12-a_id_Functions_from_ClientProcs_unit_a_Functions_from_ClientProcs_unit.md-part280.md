#### Methods

##### DM\_CalculatedDesignator method

\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_CalculatedDesignator : WideString;  
__Description__  
This function returns the calculated designator string which contains the hierarchical path and the logical designator strings\. Only when a project is compiled and up to date, designators of sheet symbols are calculated based on the physical documents they are on\.  
__Example__  
__See also__  
ISheetSymbol interface

##### DM\_ChildSheet method

\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_ChildSheet \(Index : Integer\) : IDocument;  
__Description__  
Returns the indexed child sheet associated with this sheet symbol object\. Use in conjunction with the DM\_ChildSheetCount method\.  
__Example__  
__See also__  
ISheetSymbol interface

##### DM\_ChildSheetCount method

\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_ChildSheetCount : Integer;  
__Description__  
Returns the number of child sheets associated with this sheet symbol object\.  
__Example__  
__See also__  
ISheetSymbol interface

##### DM\_LogicalDesignator method

\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_LogicalDesignator : WideString;  
__Description__  
Returns the logical designator of this sheet symbol\. A logical designator is not unique, since logical designators are used in multi channel designs\.  
__Example__  
__See also__  
ISheetSymbol interface

##### DM\_PhysicalDesignator method

\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_PhysicalDesignator : WideString;  
__Description__  
Returns the designator of this sheet symbol\. Every physical designator is unique\.  
__Example__  
__See also__  
ISheetSymbol interface

##### DM\_SheetEntries method

\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_SheetEntries \(Index : Integer\) : INetItem;  
__Description__  
Returns the number of sheet entries that are associated with this sheet symbol\. Since a sheet entry is of a INetItem type, thus a INetItem interface is returned\.  
__Example__  
__See also__  
ISheetSymbol interface

##### DM\_SheetEntryCount method

\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_SheetEntryCount : Integer;  
__Description__  
Returns the number of sheet entries associated with this sheet symbol object\.  
__Example__  
__See also__  
ISheetSymbol interface

##### DM\_SheetSymbolFileName method

\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_SheetSymbolFileName : WideString;  
__Description__  
Returns the filename which is a link between this sheet symbol object and the other schematic sheet\.  
__Example__  
__See also__  
ISheetSymbol interface

##### DM\_UniqueId method

\(ISheetSymbol interface\)  
__Syntax__  
Function DM\_UniqueId : WideString;  
__Description__  
Returns the unique ID of this sheet symbol object\.  
__Example__  
__See also__  
ISheetSymbol interface

### <a id="ISheetEntry_interface"></a>ISheetEntry interface

__Overview__  
The __ISheetEntry__ interface is a sheet entry object interface to an existing sheet entry object on the schematic\. A sheet entry creates a connection between the net touching on the parent sheet, to a Port with the same name on the child sheet\.  
__Notes__  
The __ISheetEntry__ interface is inherited from the __INetItem__ interface\.  
An equivalent SheetEntry object representation is the __ISch\_SheetEntry__ class in Sch API Reference\.  
__See also__  
INetItem interface\.

### <a id="ITextFrame_Interface"></a>ITextFrame Interface

__Overview__  
The ITextFrame interface is a text frame object for an existing text frame on a schematic document\. It is a container holding lines of text like a memo\.

An equivalent TextFrame object representation is the ISch\_TextFrame interface in the Schematic API reference\.

__ITextFrame methods__  
DM\_Text

__ITextFrame properties__