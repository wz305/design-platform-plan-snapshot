### <a id="ISch_SheetSymbol_Interface"></a>ISch\_SheetSymbol Interface

__Overview__  
Sheet symbols represent other schematic sheets \(often referred to as a child sheet\)\.  The link between a sheet symbol and other schematic sheets is the FileName attribute, which must be the same as the name of the child sheet\.  
__Notes__  
The ISch\_SheetSymbol interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_ParametrizedGroup  
        ISch\_RectangularGroup  
            ISch\_SheetSymbol

__ISch\_SheetSymbol methods__  
SetState\_UniqueId  
SetState\_LineWidth  
SetState\_IsSolid  
SetState\_ShowHiddenFields  
GetState\_UniqueId  
GetState\_LineWidth  
GetState\_IsSolid  
GetState\_ShowHiddenFields  
GetState\_SchSheetFileName  
GetState\_SchSheetName

__ISch\_SheetSymbol properties__  
UniqueId  
LineWidth  
IsSolid  
ShowHiddenFields  
SheetFileName  
SheetName

__See also__  
ISch\_GraphicalObject interface  
ISch\_ParametrizedGroup interface  
ISch\_RectangularGroup interface

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