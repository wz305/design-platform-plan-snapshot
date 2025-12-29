#### Properties

##### ShowHiddenFields property

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Property ShowHiddenFields : Boolean Read GetState\_ShowHiddenFields Write SetState\_ShowHiddenFields;  
__Description__  
The ShowHiddenFields property determines the visibility of the text fields associated with the sheet symbol, such as its name and filename\. If the Value is true, the hidden fields of the sheet symbol will be displayed on the schematic sheet\. If the value is False, the hidden text fields are not shown on the schematic\.  
__Example__  
SSheet\.ShowHiddenFields := True;  
__See also__  
ISch\_SheetSymbol interface

##### SheetName property

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Property SheetName : ISch\_SheetName Read GetState\_SchSheetName;  
__Description__  
The SchSheetName property denotes the Designator Name text object which is represented by the ISch\_SheetName interface object associated with the sheet symbol\. The ISch\_SheetName interface is inherited from the ISch\_ComplexText and ISch\_Label interfaces\. This property is supported by GetState\_SchSheetname method\.  
__Example__

1

SheetName := SSheet\.SchSheetName;

2

If SheetName <> Nil Then

3

    Showmessage\(SheetName\.Text\);

__See also__  
ISch\_SheetSymbol interface

##### SheetFileName property

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Property SheetFileName : ISch\_SheetFileName Read GetState\_SchSheetFileName;  
__Description__  
The SchSheetFileName property denotes the FileName text object which is represented by the ISch\_SheetFileName interface object associated with the sheet symbol\. The ISch\_SheetFileName interface is inherited from the ISch\_ComplexText and ISch\_Label interfaces\. This property is supported by GetState\_SchSheetFileName method\.  
__Example__

1

SheetFileName := SSheet\.SchSheetFileName;

2

If SheetFileName <> Nil Then

3

    Showmessage\(SheetFileName\.Text\);

__See also__  
ISch\_SheetSymbol interface

##### LineWidth property

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Property LineWidth : TSize Read GetState\_LineWidth Write SetState\_LineWidth;  
__Description__  
The __LineWidth__ property defines the border width of the sheet symbol with one of the following values from the __TSize__ enumerated type\. This property is supported by the __GetState\_LineWidth__ and __SetState\_LineWidth__ methods\.  
__Example__  
__See also__  
ISch\_SheetSymbol interface  
TSize type

##### IsSolid property

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Property IsSolid : Boolean Read GetState\_IsSolid Write SetState\_IsSolid;  
__Description__  
__Description__  
The IsSolid property denotes whether the sheet symbol object has a solid fill or not\. This property is supported by the GetState\_IsSolid and SetState\_IsSolid methods\.  
__Example__  
SScheet\.IsSolid := True;  
__See also__  
ISch\_SheetSymbol interface

##### UniqueId property

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Property UniqueId : WideString Read GetState\_UniqueId Write SetState\_UniqueId;  
__Description__  
The SetState\_UniqueID property sets the new ID for the sheet symbol\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current sheet symbol\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__  
UID := WSM\.DM\_GenerateUniqueID; // interface and method from Workspace Manager API\.  
SheetSymbol\.UniqueID\(UID\);  
__See also__  
ISch\_SheetSymbol interface

### <a id="ISch_Symbol_Interface"></a>ISch\_Symbol Interface

__Overview__  
The symbol objects are special markers used for components in the Schematic Library\.  
__Notes__  
Descended from ISch\_GraphicalObject

__ISch\_Symbol methods__  
SetState\_Orientation  
SetState\_Symbol  
SetState\_IsMirrored  
SetState\_LineWidth  
SetState\_ScaleFactor  
GetState\_Orientation  
GetState\_Symbol  
GetState\_IsMirrored  
GetState\_LineWidth  
GetState\_ScaleFactor

__ISch\_Symbol properties__  
Orientation  
Symbol  
IsMirrored  
LineWidth  
ScaleFactor

__See also__  
ISch\_GraphicalObject interface