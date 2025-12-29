# Schematic API: Functions Reference

The Schematic API Functions reference includes the following content:

[SchServer Interface](https://www.altium.com/documentation/altium-designer/schematic-api-functions?version=21#SchServer Interface)  
[General functions](https://www.altium.com/documentation/altium-designer/schematic-api-functions?version=21#General functions)  
[Measurement Conversion functions](https://www.altium.com/documentation/altium-designer/schematic-api-functions?version=21#Measurement Conversion functions)  
[Conversion functions](https://www.altium.com/documentation/altium-designer/schematic-api-functions?version=21#Conversion functions)


Function SchServer : ISch\_ServerInterface;

__Description__  
The SchServer function returns the interface of the loaded Schematic Editor module in Altium Designer\. To work with Schematic objects, you need to have access to the ISch\_ServerInterface interface first\. To obtain the current schematic document, invoke the SchServer\.GetCurrentSchDocument for instance\.

Refer to the ISch\_ServerInterface’s methods and properties for more information\.

__Example 1__

1

    // Grab current schematic document\.

2

    SchDoc := SchServer\.GetCurrentSchDocument;

3

    If SchDoc = Nil Then Exit;

4

  

5

    // Component is a container that has child objects

6

    // Create component, and its rectangle, pin and parameter objects\.

7

    Component := SchServer\.SchObjectFactory \(eSchComponent, eCreate\_Default\);

__Example 2__

01

   Try

02

       SchServer\.ProcessControl\.PreProcess\(SchDoc, ''\);

03

  

04

       // Add the parameter to the pin with undo stack also enabled

05

       Param\.Name := 'Added Parameter';

06

       Param\.Text := 'Param added to the pin\. Press Undo and this will disappear\.  Press undo twice to remove the component';

07

       Param\.Location := Point\(InchesToCoord\(3\), InchesToCoord\(2\.4\)\);

08

  

09

       Pin\.AddSchObject\(Param\);

10

       SchServer\.RobotManager\.SendMessage\(Component\.I\_ObjectAddress, c\_BroadCast, SCHM\_PrimitiveRegistration, Param\.I\_ObjectAddress\);

11

   Finally

12

       SchServer\.ProcessControl\.PostProcess\(SchDoc, ''\);

13

   End;

__See also__  
ISch\_ServerInterface interface



Function AlignToGridClosest  \(AValue    : TCoord; AGridSize : TCoord\) : TCoord;


Function AlignToGridDecrease \(AValue    : TCoord; AGridSize : TCoord\) : TCoord;


Function AlignToGridIncrease \(AValue    : TCoord;  
                              AGridSize : TCoord\) : TCoord;


Function GetState\_AllImplementations \(Const ASchComponent  : ISch\_Component\)       : TList;


Function GetState\_PinsForCurrentMode \(Const ASchComponent  : ISch\_Component\)       : TList;


Function GetState\_AllPins            \(Const ASchComponent  : ISch\_Component\)       : TList;


Function GetState\_AllParameters      \(Const ASchObject     : ISch\_BasicContainer\)  : TList;


Function  HitTestResultToCursor\(T : THitTestResult\): TCursor;


Function  GetDefaultSchSheetStyle : TSheetStyle;


Procedure GetWholeAndFractionalPart\_DXP2004SP2\_To\_DXP2004SP1\(ACoord : TCoord; Var AWholePart, AFractionalPart : Integer\);


Function  GetCoord\_DXP2004SP1\_To\_DXP2004SP2\(AWholePart, AFractionalPart : Integer\) : TCoord;


Function ConvertFileName\_99SEToDXP2004\(Const AOriginalName, ADocKind : TDynamicString\) : TDynamicString;


Function GetResolvedSheetFileName\(Const AOriginalSFN : TDynamicString; Const AProject : IProject\) : TDynamicString;


Function Sch\_GetOwnerProject\(Const AContainer : ISch\_BasicContainer\) : IProject;


//Imperial functions  
Function  CoordToMils        \(    C : TCoord\) : TReal;  
Function  CoordToDxps        \(    C : TCoord\) : TReal;  
Function  CoordToInches      \(    C : TCoord\) : TReal;  
Function  MilsToCoord        \(    M : TReal\)  : TCoord;  
Function  DxpsToCoord        \(    M : TReal\)  : TCoord;  
Function  InchesToCoord      \(    M : TReal\)  : TCoord;  
   
//Metric functions  
Function  CoordToMMs         \(    C : TCoord\) : TReal;  
Function  CoordToCMs         \(    C : TCoord\) : TReal;  
Function  CoordToMs          \(    C : TCoord\) : TReal;  
Function  MMsToCoord         \(    M : TReal\)  : TCoord;  
Function  CMsToCoord         \(    M : TReal\)  : TCoord;  
Function   MsToCoord         \(    M : TReal\)  : TCoord;  
   
Function  MetricString\(Var S : TDynamicString; DefaultUnits : TUnit\) : Boolean;  
Function  ImperialString\(Var S : TDynamicString; DefaultUnits : TUnit\) : Boolean;  
   
Function  CoordUnitToString       \(C : TCoord; U : TUnit\) : TDynamicString;  
   
Function  CoordUnitToStringWithAccuracy  \(ACoord         : TCoord;  
                                          AUnit          : TUnit;  
                                          ARounding      : Integer;  
                                          AFixedDecimals : Integer\) : TDynamicString;  
   
Function  ExtractValueAndUnitFromString\(AInString : TDynamicString;  
                                        ADefaultUnit : TUnit;  
                                    Var AValue       : TDynamicString;  
                                    Var AUnit        : TUnit\) : Boolean;  
   
Function  StringToCoordUnit       \(S : TDynamicString; Var C : TCoord; ADefaultUnit : TUnit\) : Boolean;  
   
Function  CoordUnitToString       \(C : TCoord; U : TUnit\) : TDynamicString;  
   
Function  CoordUnitToStringFixedDecimals \(C : TCoord; U : TUnit; AFixedDecimals : Integer\) : TDynamicString;  
   
Function  CoordUnitToStringNoUnit \(C : TCoord; U : TUnit\) : TDynamicString;  
Function  CoordUnitToStringWithAccuracy  \(ACoord         : TCoord;  
                                          AUnit          : TUnit;  
                                          ARounding      : Integer;  
                                          AFixedDecimals : Integer\) : TDynamicString;  
   
Function  GetDisplayStringFromLocation\(ALocation : TLocation; AUnit : TUnit\) : TDynamicString;  
   
Function GetCurrentDocumentUnit : TUnit;  
Function GetCurrentDocumentUnitSystem : TUnitSystem;  
Function GetSchObjectOwnerDocumentUnit\(Const AObject : ISch\_BasicContainer\) : TUnit;


Function  GetStateString\_ObjectId                 \(N : TObjectId                 \) : TString;  
Function  GetStateString\_HorizontalAlign          \(N : THorizontalAlign          \) : TString;  
Function  GetStateString\_IeeeSymbol               \(N : TIeeeSymbol               \) : TString;  
Function  GetStateString\_LeftRightSide            \(N : TLeftRightSide            \) : TString;  
Function  GetStateString\_LineStyle                \(N : TLineStyle                \) : TString;  
Function  GetStateString\_PinElectrical            \(N : TPinElectrical            \) : TString;  
Function  GetStateString\_PortArrowStyle           \(N : TPortArrowStyle           \) : TString;  
Function  GetStateString\_PortIO                   \(N : TPortIO                   \) : TString;  
Function  GetStateString\_PowerObjectStyle         \(N : TPowerObjectStyle         \) : TString;  
Function  GetStateString\_CrossSheetConnectorStyle \(N : TCrossSheetConnectorStyle \) : TString;  
Function  GetStateString\_RotationBy90             \(N : TRotationBy90             \) : TString;  
Function  GetStateString\_Justification            \(N : TTextJustification        \) : TString;  
Function  GetStateString\_HorizontalJustification  \(N : TTextJustification        \) : TString;  
Function  GetStateString\_VerticalJustification    \(N : TTextJustification        \) : TString;  
Function  GetStateString\_SheetStyle               \(N : TSheetStyle               \) : TString;  
Function  GetStateString\_Size                     \(N : TSize                     \) : TString;  
Function  GetStateString\_Location                 \(N : TLocation                 \) : TString;  
Function  GetStateString\_DisplayMode              \(N : TDisplayMode              \) : TString;  
   
Function  GetStateString\_LineShape    \(N : TLineShape\) : TString;  
Function  GetStateString\_ObjectIdPlural\(N : TObjectId\) : TString;


Function  IsJustified\_Left    \(N : TTextJustification\) : Boolean;  
Function  IsJustified\_HCenter \(N : TTextJustification\) : Boolean;  
Function  IsJustified\_Right   \(N : TTextJustification\) : Boolean;  
Function  IsJustified\_Bottom  \(N : TTextJustification\) : Boolean;  
Function  IsJustified\_VCenter \(N : TTextJustification\) : Boolean;  
Function  IsJustified\_Top     \(N : TTextJustification\) : Boolean;  
Procedure GetOrdinalValueFromHorizontalJustification\(J : TTextJustification;Var I : Integer\);  
Procedure GetOrdinalValueFromVerticalJustification  \(J : TTextJustification;Var I : Integer\);  
Procedure GetHorizontalJustificationFromOrdinalValue\(I : Integer; Var J : TTextJustification\);  
Procedure GetVerticalJustificationFromOrdinalValue  \(I : Integer; Var J : TTextJustification\);

## 子章节

- [<a id="SchServer_Interface"></a>SchServer Interface](01-a_id_SchServer_Interface_a_SchServer_Interface.md.md)
- [<a id="General_functions"></a>General functions](02-a_id_General_functions_a_General_functions.md.md)
- [<a id="Measurement_Conversion_functions"></a>Measurement Conversion functions](03-a_id_Measurement_Conversion_functions_a_Measurement_Conversion_functions.md.md)
- [<a id="Conversion_functions"></a>Conversion functions](04-a_id_Conversion_functions_a_Conversion_functions.md.md)
