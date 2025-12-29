#### Properties

##### DatafileLinkCount property

\(ISch\_Implementation interface\)  
__Syntax__  
Property DatafileLinkCount : Integer Read GetState\_DatafileLinkCount;  
__Description__  
This property fetches the number of data file links for the current implementation of the schematic component\.  
This property is supported by the GetState\_DatafileLinkCount function\.  
__Example__

01

For j := 0 To SchImplementation\.DatafileLinkCount \- 1 Do

02

Begin

03

    ModelDataFile := SchImplementation\.DatafileLink\[j\];

04

    If ModelDataFile <> Nil Then

05

    Begin

06

        ModelsList\.Add\('   Implementation Data File Link Details:'\);

07

        ModelsList\.Add\('   Data File Location: ' \+ ModelDataFile\.Location \+

08

                       ', Entity Name: '         \+ ModelDataFile\.EntityName \+

09

                       ', FileKind: '            \+ ModelDataFile\.FileKind\);

10

        ModelsList\.Add\(''\);

11

    End;

12

End;

__See also__  
ISch\_Implementation interface  
DataFileLink property

##### DatabaseModel property

\(ISch\_Implementation interface\)  
__Syntax__  
Property DatabaseModel : Boolean Read GetState\_DatabaseModel Write SetState\_DatabaseModel;  
__Description__  
 This property is implemented by the GetState\_DatabaseModel and SetState\_DatabaseModel methods\.  
__Example__  
__See also__  
ISch\_Implementation interface  
IntegratedModel property

##### DatafileLink property

\(ISch\_Implementation interface\)  
__Syntax__  
Property DatafileLink \[i : Integer\] : ISch\_ModelDatafileLink Read GetState\_SchDatafileLink;  
__Description__  
The DatafileLink property determines the indexed datafilelink of the model type linked to the component\. A component can have multiple linked models and each model can have multiple external data file links\.  
This property is implemented with the GetState\_SchDatafileLink\(i : Integer\) : ISch\_ModelDatafileLink method\.  
__Example__

01

For j := 0 To SchImplementation\.DatafileLinkCount \- 1 Do

02

Begin

03

    ModelDataFile := SchImplementation\.DatafileLink\[j\];

04

    If ModelDataFile <> Nil Then

05

    Begin

06

        ModelsList\.Add\('   Implementation Data File Link Details:'\);

07

        ModelsList\.Add\('   Data File Location: ' \+ ModelDataFile\.Location \+

08

                       ', Entity Name: '         \+ ModelDataFile\.EntityName \+

09

                       ', FileKind: '            \+ ModelDataFile\.FileKind\);

10

        ModelsList\.Add\(''\);

11

    End;

12

End;

__See also__  
ISch\_Implementation interface

##### DatalinksLocked property

\(ISch\_Implementation interface\)  
__Syntax__  
Property DatalinksLocked : Boolean Read GetState\_DatalinksLocked Write SetState\_DatalinksLocked;  
__Description__  
__Example__  
__See also__  
ISch\_Implementation interface

##### DefinerByInterfaceDesignator property

\(ISch\_Implementation interface\)  
__Syntax__  
Property DefinerByInterfaceDesignator\[S : WideString\] : ISch\_MapDefiner Read GetState\_SchDefinerByInterfaceDesignator;  
__Description__  
__Example__  
__See also__  
ISch\_Implementation interface

##### Description property

\(ISch\_Implementation interface\)  
__Syntax__  
Property Description : WideString Read GetState\_Description Write SetState\_Description ;  
__Description__  
The Description property fetches or sets the Description string for the model\. This is optional and is for reference purposes and do not have any impact on simulation processes\. This property is implemented by the GetState\_Description : WideString and SetState\_Description\(AValue : WideString\) methods\.  
__Example__

1

SchImplementation := ImplIterator\.FirstSchObject;

2

While SchImplementation <> Nil Do

3

Begin

4

    ShowMessage   \('   ModelName: ' \+ SchImplementation\.ModelName \+

5

                   ' ModelType: '   \+ SchImplementation\.ModelType \+

6

                   ' Description: ' \+ SchImplementation\.Description\);

7

End;

__See also__  
ISch\_Implementation interface

##### IntegratedModel property

\(ISch\_Implementation interface\)  
__Syntax__  
Property IntegratedModel : Boolean Read GetState\_IntegratedModel Write SetState\_IntegratedModel;  
__Description__  
The property determines whether the implementation is an integrated model type or not\.  
__Example__  
__See also__  
ISch\_Implementation interface  
DatabaseModel property

##### IsCurrent property

\(ISch\_Implementation interface\)  
__Syntax__  
Property IsCurrent : Boolean Read GetState\_IsCurrent Write SetState\_IsCurrent ;  
__Description__  
__Example__  
__See also__  
ISch\_Implementation interface

##### MapAsString property

\(ISch\_Implementation interface\)  
__Syntax__  
Property MapAsString : WideString Read GetState\_MapAsString Write SetState\_MapAsString ;  
__Description__  
This MapAsString property returns or sets the map of the component pins to a model pins \(simulation ports for example\) as a string of the following format: \(SchematicPinNumber:ModelPinNumber\) for example \(1:1\),\(2:2\), … ,\(X:X\)  
__Example__  
__See also__  
ISch\_Implementation interface

##### ModelName property

\(ISch\_Implementation interface\)  
__Syntax__  
Property ModelName : WideString Read GetState\_ModelName Write SetState\_ModelName ;  
__Description__  
The ModelName property fetches or sets the name of the indexed model name\.This property is implemented with GetState\_ModelName : WideString and SetState\_ModelName\(AValue : WideString\) methods\.  
__Example__  
Result := IntegratedLibraryManager\.ModelName\(Component\.LibReference,PathToLibrary,'SIM',0\);  
__See also__  
ISch\_Implementation interface

##### ModelType property

\(ISch\_Implementation interface\)  
__Syntax__  
Property ModelType : WideString Read GetState\_ModelType Write SetState\_ModelType ;  
__Description__  
__Example__  
__See also__  
ISch\_Implementation interface

##### UseComponentLibrary

\(ISch\_Implementation interface\)  
__Syntax__  
Property UseComponentLibrary     : Boolean    Read GetState\_UseComponentLibrary     Write SetState\_UseComponentLibrary;  
__Description__  
This UseComponentLibrary property determines whether the component is from an integrated library or not \(either as an installed library or part of the Project Libraries\. This is accessed from the Available Libraries dialog in Altium Designer\)\. A Boolean value is returned\. This property is implemented with GetState\_UseComponentLibrary : Boolean and SetState\_UseComponentLibrary\(AValue : Boolean\) methods\.  
__Example__  
__See also__  
ISch\_Implementation interface

# Schematic API Design Objects Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Schematic API Design Objects Interfaces for version 22](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Schematic API](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## Schematic API: Design Objects Interfaces Reference 

The Schematic API Design Objects reference includes the following content:

[ISch\_Arc Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Arc Interface)  
[ISch\_Bezier Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Bezier Interface)  
[ISch\_Bus Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Bus Interface)  
[ISch\_BusEntry Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_BusEntry Interface)  
[ISch\_Circle Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Circle Interface)  
[ISch\_CompileMask Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_CompileMask Interface)  
[ISch\_ComplexText Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_ComplexText Interface)  
[ISch\_Component Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Component Interface)  
[ISch\_ConnectionLine Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_ConnectionLine Interface)  
[ISch\_CrossSheetConnector Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_CrossSheetConnector Interface)  
[ISch\_Designator Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Designator Interface)  
[ISch\_Directive Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Directive Interface)  
[ISch\_Ellipse](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Ellipse)  
[ISch\_EllipticalArc Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_EllipticalArc Interface)  
[ISch\_ErrorMarker Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_ErrorMarker Interface)  
[ISch\_HarnessConnector Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_HarnessConnector Interface)

[ISch\_HarnessConnectorType Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_HarnessConnectorType Interface)  
[ISch\_HarnessEntry Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_HarnessEntry Interface)  
[ISch\_Image Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Image Interface)  
[ISch\_Junction Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Junction Interface)  
[ISch\_Label Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Label Interface)  
[ISch\_Line Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Line Interface)  
[ISch\_NetLabel Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_NetLabel Interface)  
[ISch\_NoERC Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_NoERC Interface)  
[ISch\_Note Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Note Interface)  
[ISch\_Parameter Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Parameter Interface)  
[ISch\_ParameterSet Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_ParameterSet Interface)  
[ISch\_ParametrizedGroup Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_ParametrizedGroup Interface)  
[ISch\_Pie Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Pie Interface)  
[ISch\_Pin Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Pin Interface)  
[ISch\_Polygon Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Polygon Interface)  
[ISch\_Polyline Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Polyline Interface)

[ISch\_Port Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Port Interface)  
[ISch\_PowerObject Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_PowerObject Interface)  
[ISch\_Probe Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Probe Interface)  
[ISch\_Rectangle Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Rectangle Interface)  
[ISch\_RectangularGroup Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_RectangularGroup Interface)  
[ISch\_RoundRectangle Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_RoundRectangle Interface)  
[ISch\_SheetEntry Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_SheetEntry Interface)  
[ISch\_SheetFileName Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_SheetFileName Interface)  
[ISch\_SheetName Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_SheetName Interface)  
[ISch\_SheetSymbol Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_SheetSymbol Interface)  
[ISch\_Symbol Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Symbol Interface)  
[ISch\_Template Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Template Interface)  
[ISch\_TextFrame Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_TextFrame Interface)  
[ISch\_Wire Interface](https://www.altium.com/documentation/altium-designer/schematic-api-design-objects-interfaces?version=21#ISch_Wire Interface)

A schematic design object on a schematic document is represented by its interface\. An interface represents an existing object in memory and its properties and methods can be invoked\.

Since many design objects are descended from ancestor interfaces and thus the ancestor methods and properties are also available to use\. For example the ISch\_Image interface is inherited from an immediate ISch\_Rectangle interface and in turn inherited from the ISch\_GraphicalObject interface\. If you check the ISCh\_Image entry in this reference you will see the following information:

The ISch\_Image interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Rectangle  
        ISch\_Image

__ISch\_Rectangle properties__  
Corner    : TLocation  
LineWidth : TSize      
IsSolid   : Boolean  

__ISch\_Image Properties__  
EmbedImage : Boolean     
FileName   : WideString  
KeepAspect : Boolean   

Therefore you have the Image object properties, along with ISch\_Rectangle methods and properties AND the ISch\_GraphicalObject methods and properties to use in scripts\.

### <a id="ISch_Arc_Interface"></a>ISch\_Arc Interface

__Overview__  
An arc object is a circular curve used to place on the schematic sheet\.  
__Notes__  
The ISch\_Arc interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Arc

__ISch\_Arc methods__  
GetState\_Radius  
GetState\_StartAngle  
GetState\_EndAngle  
GetState\_LineWidth  
SetState\_Radius  
SetState\_StartAngle  
SetState\_EndAngle  
SetState\_LineWidth

__ISch\_Arc properties__  
Radius  
StartAngle  
EndAngle  
LineWidth

__See also__