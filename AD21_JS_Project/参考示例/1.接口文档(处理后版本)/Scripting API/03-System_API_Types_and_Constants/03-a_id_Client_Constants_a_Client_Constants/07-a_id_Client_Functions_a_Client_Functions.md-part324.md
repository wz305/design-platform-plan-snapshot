#### Properties

##### TextColor

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property TextColor : TColor Read GetState\_TextColor Write SetState\_TextColor;  
__Description__  
The TextColor property defines the color \(a value of TColor type\) for the Harness Entry’s Name string\. This property is supported by the GetState\_TextColor and SetState\_TextColor methods\.  
__Notes__  
The TColor value specifies a 6 digit hexadecimal number of the $FFFFFF format\.  For example the color blue would be RGB:0,0,255 and Hex:FF0000 therefore the converted decimal value would be 16711680\.  The following formula may be used to calculate the required value, R\+256\*\(G\+\(256\*B\)\)\.  
__Example__  
SheetEntry\.TextColor := 0; // sets the name color to black\.  
__See also__  
TColor type  
ISch\_SheetEntry interface

##### Style property

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property Style : TPortArrowStyle Read GetState\_Style Write SetState\_Style;  
__Description__  
The Style property determines the style of the sheet entry and is determined by the TPortArrowStyle type\. This style defines the graphical style of the sheet entry only if the__ I/O Type__ property is set to Unspecified\. The __IO Type__ of the Sheet Entry overrides the __Style__ property if the I/O Type is set to one of the specified IO types then changing the Style will not update the graphical content of the sheet entry\.  
__Example__  
SEntry\.Style := ePortLeft;  
__See also__  
TPortArrowStyle type  
ISch\_SheetEntry interface

##### Side

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property Side : TLeftRightSide Read GetState\_Side Write SetState\_Side;  
__Description__  
The Side property defines the orientation of the sheet entry in respect to the associated sheet symbol\. This property is supported by the GetState\_Side and SetState\_Side methods\.  
__Example__  
SheetEntry\.Side := eLeftSide;  
__See also__  
ISch\_SheetEntry interface

##### OwnerSheetSymbol property

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property OwnerSheetSymbol : ISch\_SheetSymbol Read GetState\_SchOwnerSheetSymbol;  
__Description__  
The OwnerSheetSymbol property retrieves the Sheet Symbol interface this Sheet entry is associated with\. This property is supported by the GetState\_OwnerSheetSymbol method\.  
__Example__  
SheetSymbol := SheetEntry\.GetState\_OwnerSheetSymbol;  
__See also__  
ISch\_SheetEntry interface

##### Name

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property Name : WideString Read GetState\_Name Write SetState\_Name;  
__Description__  
The Name property defines the name of the sheet entry\. Normally the name property is a number but can be alphanumeric\. This property is supported by the GetState\_Name and SetState\_Name methods\.  
__Example__  
SheetEntry\.Name := ‘EntryType\_2’;  
__See also__  
ISch\_SheetEntry interface

##### IOType property

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property IOType : TPortIO Read GetState\_IOType Write SetState\_IOType;  
__Description__  
The IOType property determines the IO of the sheet entry\. This IO Type defines the electrical properties of the sheet entry\. Available IOs are: Input, Output, Bi\-directional and Unspecified\. The IO setting does not influence the connectivity of the circuit, but is considered during the running of an electrical rules check, which can be set to detect incompatible port directions\.

Note, the I/O Type of the Sheet Entry overrides the Style property\. If the I/O Type is set to Unspecified you can set the appropriate Style for this sheet entry\. However if the I/O Type is set to one of the specified I/O types then changing the Style will not update the graphical content of the sheet entry\.  
__Example__  
SheetEntry\.IOType := ePortOutput;  
__See also__  
ISch\_SheetEntry interface

##### DistanceFromTop

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property DistanceFromTop : TCoord Read GetState\_DistanceFromTop Write SetState\_DistanceFromTop;  
__Description__  
The DistanceFromTop property defines the location of the sheet entry in respect to the associated sheet symbol\. This property is supported by the GetState\_DistanceFromTop and SetState\_DistanceFromTop methods\.  
__Example__  
SheetEntry\.DistanceFromTop := DxpsToCoord\(10\);  
__See also__  
ISch\_SheetEntry interface

##### OverrideDisplayString property

\(ISch\_SheetEntry interface\)  
__Syntax__  
Property OverrideDisplayString : WideString Read GetState\_OverrideDisplayString Write SetState\_OverrideDisplayString;  
__Description__  
The OverrideDisplayString property defines the OverRideDisplayString property\. This property is supported by the GetState\_OverrirdeDisplayString and SetState\_OverrirdeDisplayString methods\.  
__Example__  
SheetEntry\.OverrideDisplayString\(‘Display String overridden\.’\);  
__See also__  
ISch\_SheetEntry interface

### <a id="ISch_SheetFileName_Interface"></a>ISch\_SheetFileName Interface

__Overview__  
A sheet filename object is part of a complex text object interface and is attached to the sheet symbol object\.  
__Notes__  
The ISch\_SheetFileName interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Label  
        ISch\_ComplexText  
            ISch\_SheetFileName

__ISch\_SheetFileName methods__

__ISch\_SheetFileName properties__

__See also__  
ISch\_GraphicalObject interface  
ISch\_Label interface  
ISch\_ComplexText interface

### <a id="ISch_SheetName_Interface"></a>ISch\_SheetName Interface

__Overview__  
A sheetname is part of a complex text object interface and is associated with a sheet symbol object\.  
__Notes__  
The ISch\_SheetName interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Label  
        ISch\_ComplexText  
            ISch\_SheetName

__ISch\_SheetName methods__

__ISch\_SheetName properties__

__See also__  
ISch\_GraphicalObject interface  
ISch\_Label interface  
ISch\_ComplexText interface

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