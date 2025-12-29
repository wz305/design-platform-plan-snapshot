### <a id="ISheetSymbol_Interface"></a>ISheetSymbol Interface

__Overview__  
The ISheetSymbol interface is a sheet symbol interface to an existing sheet symbol object on the schematic\. Sheet symbols represent other schematic sheets \(often referred to as a child sheet\)\. The link between a sheet symbol and other schematic sheets is the FileName attribute, which must be the same as the name of the child sheet\.

An equivalent Sheet Symbol object representation is the ISch\_SheetSymbol class in Sch API Reference\.

__ISheetSymbol methods__  
DM\_SheetEntries  
DM\_SheetEntryCount  
DM\_ChildSheet  
DM\_ChildSheetCount  
DM\_SheetSymbolFileName  
DM\_LogicalDesignator  
DM\_CalculatedDesignator  
DM\_PhysicalDesignator  
DM\_UniqueId

__ISheetSymbol properties__

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