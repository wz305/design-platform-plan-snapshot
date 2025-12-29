#### Methods

##### SetState\_UniqueId method

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Procedure SetState\_UniqueId \(Value : WideString\);  
__Description__  
The SetState\_UniqueID procedure sets the new ID for the sheet symbol\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current sheet symbol\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__

1

UID := WSM\.DM\_GenerateUniqueID; // interface and method from Workspace Manager API\.

2

SheetSymbol\.SetState\_UniqueID\(UID\);

__See also__  
ISch\_SheetSymbol interface

##### SetState\_ShowHiddenFields method

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Procedure SetState\_ShowHiddenFields\(Value : Boolean\);  
__Description__  
The SetState\_ShowHiddenFields procedure determines the visibility of the text fields associated with the sheet symbol, such as its name and filename\. If the Value is true, the hidden fields of the sheet symbol will be displayed on the schematic sheet\. If the value is False, the hidden text fields are not shown on the schematic\.  
__Example__  
SSheet\.SetState\_ShowHiddenFields\(True\); //shows hidden text fields for this sheet symbol\.  
__See also__  
ISch\_SheetSymbol interface

##### SetState\_LineWidth method

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Procedure SetState\_LineWidth \(Value : TSize\);  
__Description__  
This SetState\_LineWidth procedure sets the width of the border line around the sheet symbol\. The width is determined by the TSize type\.  
__Example__  
SSheet\.SetState\_LineWidth\(eSmall\);  
__See also__  
TSize type\.  
ISch\_SheetSymbol interface

##### SetState\_IsSolid method

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Procedure SetState\_IsSolid \(Value : Boolean\);  
__Description__  
The SetState\_IsSolid procedure sets a Boolean value which denotes that the sheet symbol object has a solid internal fill or not\.  
__Example__

1

SSymbol\.SetState\_IsSolid\(True\);

2

SSymbol\.AreaColor := 0;

__See also__  
ISch\_SheetSymbol interface

##### GetState\_UniqueId method

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Function GetState\_UniqueId : WideString;  
__Description__  
The GetState\_UniqueID function retrieves the Unique ID for the sheet symbol\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current sheet symbol\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__  
UID := SheetSymbol\.GetState\_UniqueID;  
__See also__  
ISch\_SheetSymbol interface

##### GetState\_ShowHiddenFields method

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Function GetState\_ShowHiddenFields : Boolean;  
__Description__  
The GetState\_ShowHiddenFields procedure determines the visibility of the text fields associated with the sheet symbol, such as its name and filename\. If the Value is true, the hidden fields of the sheet symbol will be displayed on the schematic sheet\. If the value is False, the hidden text fields are not shown on the schematic\.  
__Example__  
ShowHiddenFields := SSheet\.GetState\_ShowHiddenFields;  
__See also__  
ISch\_SheetSymbol interface

##### GetState\_SchSheetName method

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Function GetState\_SchSheetName : ISch\_SheetName;  
__Description__  
The GetState\_SchSheetName function returns the ISch\_SheetName interface object which represents the Designator object associated with the sheet symbol\. The ISch\_Sheetname interface is inherited from the ISch\_ComplexText and ISch\_Label interfaces\.  
__Example__

1

SheetName := SSheet\.GetState\_SchSheetName;

2

If SheetName <> Nil Then

3

    Showmessage\(SheetName\.Text\);

__See also__  
ISch\_SheetName interface;  
ISch\_SheetSymbol interface

##### GetState\_SchSheetFileName method

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Function GetState\_SchSheetFileName : ISch\_SheetFileName;  
__Description__  
The GetState\_SchSheetFileName function returns the ISch\_SheetFileName interface object which represents the FileName text object associated with the sheet symbol\. The ISch\_SheetFileName interface is inherited from the ISch\_ComplexText and ISch\_Label interfaces\.  
__Example__

1

SheetFileName := SSheet\.GetState\_SchSheetFileName;

2

If SheetFileName <> Nil Then

3

    Showmessage\(SheetFileName\.Text\);

__See also__  
ISch\_SheetFileName interface;  
ISch\_SheetSymbol interface

##### GetState\_LineWidth method

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Function GetState\_LineWidth : TSize;  
__Description__  
The GetState\_LineWidth function returns the size of the border of the sheet symbol\. The Size value is of TSize type\.  
__Example__  
LineWidth := SSheet\.GetState\_LineWidth;  
__See also__  
TSize type  
ISch\_SheetSymbol interface

##### GetState\_IsSolid method

\(ISch\_SheetSymbol interface\)  
__Syntax__  
Function GetState\_IsSolid : Boolean;  
__Description__  
The GetState\_IsSolid function returns a Boolean value whether the sheet symbol object has a solid internal fill or not\.  
__Example__

1

If Pie\.GetState\_IsSolid Then

2

    Pie\. AreaColor := 0; // black fill

__See also__  
ISch\_SheetSymbol interface