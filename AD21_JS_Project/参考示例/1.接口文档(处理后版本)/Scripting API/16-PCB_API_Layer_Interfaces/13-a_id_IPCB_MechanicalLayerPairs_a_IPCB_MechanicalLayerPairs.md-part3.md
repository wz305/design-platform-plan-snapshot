\(IPCB\_Component interface\)  
__Syntax__  
Property UnionIndex : Integer Read GetState\_UnionIndex Write SetState\_UnionIndex;  
__Description__  
The property denotes the union index\. Unions are sets of components that will be manipulated as a block for the PCB placement\. Components in a union maintain their relative positions within the union as they are moved for example\.  
The UnionIndex property is supported by the GetState\_UnionIndex and SetState\_UnionIndex methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__EnablePinSwapping property__

\(IPCB\_Component interface\)  
__Syntax__  
Property  EnablePinSwapping                 : Boolean             Read GetState\_EnablePinSwapping      Write SetState\_EnablePinSwapping ;  
__Description__  
The property denotes the pin swapping for the pins of this component\. In this case, these pins can be swapped if the EnablePinSwapping is set to true\.  
The EnablePinSwapping property is supported by the GetState\_EnablePinSwapping and SetState\_EnablePinSwapping methods\.  
__Example__  
__See also__  
IPCB\_Component interface

__EnablePartSwapping property__

\(IPCB\_Component interface\)  
__Syntax__  
Property  EnablePartSwapping : Boolean Read GetState\_EnablePartSwapping Write SetState\_EnablePartSwapping;  
__Description__  
The property denotes the part swapping\. Components can have multi\-parts and in this case, these multi parts can be swapped if the EnablePartSwapping is set to True\.  
The UnionIndex property is supported by the GetState\_EnablePartSwapping and SetState\_EnablePartSwapping methods\.  
__Example__  
__See also__  
IPCB\_Component interface

<a id="IPCB_ComponentBody_Interface"></a>__IPCB\_ComponentBody Interface__

__Overview__  
A component body is a body that encapsulates a component in 3 dimensions on a PCB document\. Component bodies are handled in the same way as other primitives, and they are contained in the component itself, whether in a library or on a board\. 

A component body object is a group object that contain child objects, thus in order to retrieve component bodies from within a component, use an iterator on this component\.

The __IPCB\_ComponentBody__ interface hierarchy is as follows:

__IPCB\_ComponentBody methods__  
GetStandoffHeight  
GetOverallHeight  
GetBodyProjection  
SetStandoffHeight  
SetOverallHeight  
SetBodyProjection

__IPCB\_ComponentBody properties__  
StandoffHeight  
OverallHeight  
BodyProjection

__See also__  
IPCB\_Component interface

__Methods__

__SetStandoffHeight method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Procedure SetStandoffHeight\(Value : TCoord \);  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__SetOverallHeight method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Procedure SetOverallHeight \(Value : TCoord \);  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__SetBodyProjection method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Procedure SetBodyProjection \(Value : TBoardSide\);  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__GetStandoffHeight method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Function GetStandoffHeight : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__GetOverallHeight method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Function GetOverallHeight : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__GetBodyProjection method__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Function GetBodyProjection : TBoardSide;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__Properties__

__OverallHeight property__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Property OverallHeight : TCoord Read GetOverallHeight Write SetOverallHeight;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__BodyProjection property__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Property BodyProjection : TBoardSide Read GetBodyProjection Write SetBodyProjection;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

__StandoffHeight property__

\(IPCB\_ComponentBody interface\)  
__Syntax__  
Property StandoffHeight : TCoord Read GetStandoffHeight Write SetStandoffHeight;  
__Description__  
__Example__  
__See also__  
IPCB\_ComponentBody interface

<a id="IPCB_Coordinate"></a>__IPCB\_Coordinate__

__Overview__  
Coordinate markers are used to indicate the coordinates of specific points in a PCB workspace\.  A coordinate marker consists of a point marker and the X and Y coordinates of the position\.

The __IPCB\_Coordinate__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Coordinate

I__PCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__IPCB\_Coordinate methods__  
GetState\_Size          
GetState\_LineWidth     
GetState\_TextHeight    
GetState\_TextWidth     
GetState\_TextFont      
GetState\_Style         
GetState\_Rotation      
GetState\_UseTTFonts    
GetState\_Bold          
GetState\_Italic        
GetState\_FontName      

SetState\_Size          
SetState\_LineWidth     
SetState\_TextHeight    
SetState\_TextWidth     
SetState\_TextFont      
SetState\_Style         
SetState\_Rotation      
SetState\_UseTTFonts    
SetState\_Bold          
SetState\_Italic        
SetState\_FontName      

SetState\_xSizeySize  
RotateAroundXY  
Text  
Track1  
Track2  

GetState\_StrictHitTest  

__IPCB\_Coordinate properties__  
Size  
LineWidth  
TextHeight  
TextWidth  
TextFont  
Style  
Rotation  

UseTTFonts  
Bold  
Italic  
FontName

__   
Methods__

SetState\_xSizeySize  
RotateAroundXY  
Text  
Track1  
Track2  
GetState\_StrictHitTest

__Properties__

__Size property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  Size : TCoord Read GetState\_Size Write SetState\_Size;  
__Description__  
The Size property determines the size of the coordinate object\.  
__Example__  
__See also__  
IPCB\_Coordinate interface

__LineWidth property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  LineWidth                         : TCoord              Read GetState\_LineWidth            Write SetState\_LineWidth;  
__Description__  
The LineWidth property determines the line width or the outline of the coordinate object\.  
__Example__  
__See also__  
IPCB\_Coordinate interface

__TextHeight property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  TextHeight : TCoord Read GetState\_TextHeight Write SetState\_TextHeight;  
__Description__  
The TextHeight property determines the text height of the coordinate object\.  
__Example__  
__See also__  
IPCB\_Coordinate interface  

__TextWidth property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  TextWidth : TCoord Read GetState\_TextWidth Write SetState\_TextWidth;  
__Description__  
The TextHeight property determines the text width of the coordinate object\.  
__Example__  
__See also__  
IPCB\_Coordinate interface

__TextFont property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  TextFont : TFontID Read GetState\_TextFont Write SetState\_TextFont;  
__Description__  
The TextFont property determines the font id of TFontID type used for the coordinate object\.  
__Example__  
__See also__  
IPCB\_Coordinate interface  
TFontID

__Style property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  Style : TUnitStyle Read GetState\_Style Write SetState\_Style;  
__Description__  
The Style property determines the style used for the measurement units of the coordinate object\. Display no units, show units as Mils or MM or show Units with parenthesises\.  
__Example__  
__See also__  
IPCB\_Coordinate interface  
TUnitStyle type

__Rotation property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  Rotation : TAngle Read GetState\_Rotation Write SetState\_Rotation;  
__Description__  
The Rotation property determines the coordinate object’s orientation of TAngle type\.  
__Example__  
__See also__  
IPCB\_Coordinate interface  
TAngle type

__UseTTFonts property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  UseTTFonts : Boolean Read GetState\_UseTTFonts Write SetState\_UseTTFonts;  
__Description__  
The UseTTFonts property determines whether the text of the coordinate object is of True Type Font type\.  
__Example__  
__See also__  
IPCB\_Coordinate interface  
TAngle type

__Bold property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property  Bold : Boolean Read GetState\_Bold Write SetState\_Bold;  
__Description__  
This property sets or gets the bold property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Coordinate interface

__Italic property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property Italic : Boolean Read GetState\_Italic Write SetState\_Italic;  
__Description__  
The Italic property sets or gets the italic property of the PCB string True Type text on a PCB document\. This property is supported by the GetState\_Italic and SetState\_Italic methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.  
__Example__  
__See also__  
IPCB\_Coordinate interface

__FontName property__

\(IPCB\_Coordinate interface\)  
__Syntax__  
Property FontName : TPCBString Read GetState\_FontName Write SetState\_FontName;  
__Description__  
This property sets or gets the FontName property of the PCB string True Type text on a PCB document\. For example one of the True Type font strings could be 'Arial', 'Arial Narrow', 'Courier New' and 'Verdana'\. This property is supported by the GetState\_Bold and SetState\_Bold methods\.  
Once the UseTTFonts property is enabled, you can use the Bold, Italic, FontName, Inverted, InvertedTTTextBorder and TTTextOutline properties\.

__Delphiscript Script Example__

01

TextObj := PCBServer\.PCBObjectFactory\(eTextObject, eNoDimension, eCreate\_Default\);

02

03

// notify that the pcb object is going to be modified

04

PCBServer\.SendMessageToRobots\(TextObj\.I\_ObjectAddress, c\_Broadcast, PCBM\_BeginModify, c\_NoEventData\);

05

TextObj\.XLocation := Sheet\.SheetX \+ MilsToCoord\(1000\);

06

TextObj\.YLocation := Sheet\.SheetY \+ MilsToCoord\(1000\);

07

TextObj\.Layer     := eBottomOverlay;

08

TextObj\.UseTTFonts := True;

09

TextObj\.Italic := True;

10

TextObj\.Bold := False;

11

TextObj\.FontName := 'ARIAL';

12

// inverts the text object and a text boundary is created around the text

13

// The Inverted and InvertedTTTextBorder properties are useful for situations

14

// if text is to be placed on a copper region and create a cutout in the region\.

15

// the color of the inverted border is the layer color and the text color itself

16

// is black\.

17

TextObj\.Inverted := True;

18

// The InvertedTTextBorder property determines the distance between the boundary of the

19

// the text object itself to the inverted text border boundary\.

20

TextObj\.InvertedTTTextBorder := MilsToCoord\(100\);

21

TextObj\.Text      := 'Text with True Type Property enabled\.';

22

TextObj\.Size       := MilsToCoord\(200\);    // sets the height of the text\.

__See also__  
IPCB\_Coordinate interface  
__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_GroupIterator interface

<a id="IPCB_Connection_Interface"></a>__IPCB\_Connection Interface__

__Overview__  
The __IPCB\_Connection__ interface represents a connection between two nodes on a PCB document\. The two nodes can be on two different layers and the connection style can be a connected line or a broken specially marked connection\.

__The IPCB\_Connection hierarchy;__  
IPCB\_Primitive  
IPCB\_Connection

__IPCB\_Connection methods__  
GetState\_X1  
GetState\_Y1  
GetState\_X2  
GetState\_Y2  
GetState\_Layer1  
GetState\_Layer2  
GetState\_Mode  
SetState\_X1  
SetState\_Y1  
SetState\_X2  
SetState\_Y2  
SetState\_Layer1  
SetState\_Layer2  
SetState\_Mode  
IsRedundant  
RotateAroundXY

__IPCB\_Connection properties__  
X1  
Y1  
X2  
Y2  
Layer1  
Layer2  
Mode

__See also__  
IPCB\_Primitive interface  
TLayer enumerated values  
TConnectionMode enumerated values  
PCB Design Objects

__GetState and SetState Methods__

__GetState\_Layer2 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_Layer2 : TLayer;  
__Description__  
This method retrieves the Layer 2 attribute which represents a connection from the first layer to the second layer on a PCB document\. This function is used for the Layer2 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__GetState\_Mode method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_Mode : TConnectionMode;  
__Description__  
This method retrieves the connection mode for the connection object\. This method is used for the Mode property\.  
__Example__  
__See also__  
IPCB\_Connection interface  
TConnectionMode type

__GetState\_X1 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_X1 : TCoord;  
__Description__  
This function represents the X1 \(initial X\) coordinate of the connection object\. This method is used by the X1 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__GetState\_X2 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_X2 : TCoord;  
__Description__  
This function represents the X2 \(final X\) coordinate of the connection object\. This method is used by the X2 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__GetState\_Y1 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_Y1 : TCoord;  
__Description__  
This function represents the Y1 \(initial Y\) coordinate of the connection object\. This method is used by the Y1 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__GetState\_Y2 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function GetState\_Y2 : TCoord;  
__Description__  
This function represents the Y2 \(final Y\) coordinate of the connection object\. This method is used by the Y2 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__SetState\_Mode method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure SetState\_Mode \(Value : TConnectionMode\);  
__Description__  
This function represents the Connection Mode for the connection object\. This method is used by the Mode property\.  
__Example__  
__See also__  
IPCB\_Connection interface  
TConnectionMode type

__SetState\_X1 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure SetState\_X1 \(Value : TCoord\);  
__Description__  
This method represents the X1 \(initial X\) coordinate of the connection object\. This method is used by the X1 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__SetState\_X2 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure SetState\_X2 \(Value : TCoord\);  
__Description__  
This method represents the X2 \(finall X\) coordinate of the connection object\. This method is used by the X2 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__SetState\_Y1 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure SetState\_Y1 \(Value : TCoord\);  
__Description__  
This method represents the Y1 \(initial Y\) coordinate of the connection object\. This method is used by the Y1 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__SetState\_Y2 method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure SetState\_Y2 \(Value : TCoord\);  
__Description__  
This method represents the Y2 \(final Y\) coordinate of the connection object\. This method is used by the Y2 property\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Methods__

__RotateAroundXY method__

\(IPCB\_Connection interface\)  
__Syntax__  
Procedure RotateAroundXY \(AX, AY : TCoord;Angle : TAngle\);  
__Description__  
This method rotates a connection object on the PCB document about the AX, AY coordinates with an angle in degrees\. To ensure the connection rotates without moving about, pass in its midpoint \(between X1,X2 and Y1, Y2\) attributes for the AX,AY parameters\.  
__Example__  
__See also__  
IPCB\_Connection interface

__IsRedundant method__

\(IPCB\_Connection interface\)  
__Syntax__  
Function IsRedundant : Boolean;  
__Description__  
This method determines whether the object is redundant \(unused object\) on the PCB document or not\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Properties__

__X1 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property X1 : TCoord Read GetState\_X1 Write SetState\_X1;  
__Description__  
This property represents the X1 \(initial X\) coordinate of the connection object\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Y1 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property Y1 : TCoord Read GetState\_Y1 Write SetState\_Y1;  
__Description__  
This property represents the Y1 \(initial Y\) coordinate of the connection object\.  
__Example__  
__See also__  
IPCB\_Connection interface

__X2 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property X2 : TCoord Read GetState\_X2 Write SetState\_X2;  
__Description__  
This property represents the X2 \(finall X\) coordinate of the connection object\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Y2 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property Y2 : TCoord Read GetState\_Y2 Write SetState\_Y2;  
__Description__  
This property represents the Y2 \(final Y\) coordinate of the connection object\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Mode property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property Mode : TConnectionMode Read GetState\_Mode Write SetState\_Mode;  
__Description__  
The Mode property represents the connection mode type of the connection; whether it is part of the rats nest, or as a broken net marker\.  
__Example__  
__See also__  
IPCB\_Connection interface  
TConnectionMode type

__Layer2 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property Layer2 : TLayer Read GetState\_Layer2;  
__Description__  
This property retrieves the Layer 2 attribute which represents a connection from the first layer to the second layer on a PCB document\.  
__Example__  
__See also__  
IPCB\_Connection interface

__Layer1 property__

\(IPCB\_Connection interface\)  
__Syntax__  
Property Layer1 : TLayer Read GetState\_Layer1;  
__Description__  
This property retrieves the Layer 1 attribute which represents a connection from the first layer to the second layer on a PCB document\.  
__Example__  
__See also__  
IPCB\_Connection interface

<a id="IPCB__DifferentialPair_Interface"></a>__IPCB\_ DifferentialPair Interface__

__Overview__  
A differential signaling system is one where a signal is transmitted down a pair of tightly coupled carriers, one of these carrying the signal, the other carrying an equal but opposite image of the signal\. Differential signaling was developed to cater for situations where the logic reference ground of the signal source could not be well connected to the logic reference ground of the load\. Differential signaling is inherently immune to common mode electrical noise, the most common interference artifact present in an electronic product\. Another major advantage of differential signaling is that it minimizes electromagnetic interference \(EMI\) generated from the signal pair\.

Differential pair routing is a design technique employed to create a balanced transmission system able to carry differential \(equal and opposite\) signals across a printed circuit board\. Typically this differential routing will interface to an external differential transmission system, such as a connector and cable\.

It is important to note that while the coupling ratio achieved in a twisted pair differential cable may be better than 99%, the coupling achieved in differential pair routing will typically be less than 50%\. Current expert opinion is that the PCB routing task is not to try to ensure a specific differential impedance is achieved, rather the objective is to maintain the properties required to ensure the differential signal arrives in good condition at the target component as it travels from the external cabling\.

__Notes__  
The IPCB\_DifferentialPair Interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_DifferentialPair

__IPCB\_DifferentialPair methods__  
GetState\_Name           
GetState\_PositiveNet    
GetState\_NegativeNet    
GetState\_GatherControl  

SetState\_Name           
SetState\_PositiveNet    
SetState\_NegativeNet    
SetState\_GatherControl

__IPCB\_DifferentialPair properties__  
Name           
PositiveNet    
NegativeNet    
GatherControl

__ __  
__Example__  

__See also__  
PCB Design Objects

__Methods__

__Properties__

<a id="IPCB_Embedded_Interface"></a>__IPCB\_Embedded Interface__

__Overview__  
An IPCB\_Embedded interface represents an embedded object in a PCB document\. An embedded object is not a visible object and cannot be manipulated by normal means in Altium Designer\. An embedded object can be used to store information which gets saved in the PCB document file when this file is saved\. Each embedded object is identified by its Name property and the __Description__ property can be used to store information\.  
The IPCB\_Embedded hierarchy;  
IPCB\_Primitive  
IPCB\_Embedded

__IPCB\_Embedded methods__  
GetState\_Name  
GetState\_Description  
SetState\_Name  
SetState\_Description

__IPCB\_Embedded properties__  
Name  
Description

__Example__

01

Var

02

    Board      : IPCB\_Board;

03

    EmbdObject : IPCB\_Embedded;

04

Begin

05

    // Check if PCB board exists

06

    Board := PCBServer\.GetCurrentPCBBoard;

07

    If Board = Nil Then

08

    Begin

09

        ShowWarning\('This document is not a PCB document\!'\);

10

        Exit;

11

    End;

12

13

    // Embedded object created\.

14

    EmbdObject := PCBServer\.PCBObjectFactory\(eEmbeddedObject, eNoDimension, eCreate\_Default\);

15

    EmbdObject\.Name        := 'Embedded Object Name';

16

    EmbdObject\.Description := 'Embedded object  can store many chars\.';

17

    Board\.AddPCBObject\(EmbdObject\);

__See also__  
IPCB\_Primitive interface  
PCB Design Objects  
The EmbeddedObjects script in the Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder

__Methods__

__SetState\_Name method__

\(IPCB\_Embedded interface\)  
__Syntax__  
Procedure SetState\_Name \(Value : TPCBString\);  
__Description__  
This method sets the name for the embedded object\. This method represents the Name property\.  
__Example__  
__See also__  
IPCB\_Embedded interface

__SetState\_Description method__

\(IPCB\_Embedded interface\)  
__Syntax__  
Procedure SetState\_Description \(Value : TPCBString\);  
__Description__  
This method sets the description for the embedded object\. This method represents the __Description__ property\. The __Description__ field can be used to store data\.  
__Example__  
__See also__  
IPCB\_Embedded interface

__GetState\_Name method__

\(IPCB\_Embedded interface\)  
__Syntax__  
Function GetState\_Name : TPCBString;  
__Description__  
This method gets the name for the embedded object\. This method represents the Name property\.  
__Example__  
__See also__  
IPCB\_Embedded interface

__GetState\_Description method__

\(IPCB\_Embedded interface\)  
__Syntax__  
Function GetState\_Description : TPCBString;  
__Description__  
This method gets the description for the embedded object\. This method represents the __Description__ property\. The __Description__ field can be used to store data\.  
__Example__  
__See also__  
IPCB\_Embedded interface

__Properties__

__Name property__

\(IPCB\_Embedded interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Name Write SetState\_Name;  
__Description__  
The Name property represents the name identifier of the embedded object\. This property is supported by its GetState\_Name and SetState\_Name methods\.  
__Example__

01

Var

02

    Board    : IPCB\_Board;

03

    Iterator : IPCB\_BoardIterator;

04

    Embd     : IPCB\_Embedded;

05

Begin

06

    Iterator := PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Create;

07

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eEmbeddedObject\)\);

08

    Iterator\.AddFilter\_LayerSet \(AllLayers\);

09

    Iterator\.AddFilter\_Method   \(eProcessAll\);

10

11

    Embd   := Iterator\.FirstPCBObject;

12

    While Embd <> Nil Do

13

    Begin

14

        ShowInfo\('Name : '        \+ Embd\.Name \+ \#13\#10 \+

15

                 'Description : ' \+ Embd\.Description\);

16

        Embd := Iterator\.NextPCBObject;

17

    End;

18

    PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Destroy\(Iterator\);

19

End;

__See also__  
IPCB\_Embedded interface  
TPCBString type

__Description property__

\(IPCB\_Embedded interface\)  
__Syntax__  
Property Description : TPCBString Read GetState\_Description Write SetState\_Description;  
__Description__  
The __Description__ property represents the __Description__ field of the embedded object\. This property is supported by its GetState\___Description__ and SetState\___Description__ methods\.  
The __Description__ field can be used to store data that represents this embedded object\.  
__Example__

01

Var

02

    Board    : IPCB\_Board;

03

    Iterator : IPCB\_BoardIterator;

04

    Embd     : IPCB\_Embedded;

05

Begin

06

    Iterator := PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Create;

07

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eEmbeddedObject\)\);

08

    Iterator\.AddFilter\_LayerSet \(AllLayers\);

09

    Iterator\.AddFilter\_Method   \(eProcessAll\);

10

11

    Embd   := Iterator\.FirstPCBObject;

12

    While Embd <> Nil Do

13

    Begin

14

        ShowInfo\('Name : '        \+ Embd\.Name \+ \#13\#10 \+

15

                 'Description : ' \+ Embd\.Description\);

16

        Embd := Iterator\.NextPCBObject;

17

    End;

18

    PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Destroy\(Iterator\);

19

End;

__See also__  
IPCB\_Embedded interface  
TPCBString type

<a id="IPCB_EmbeddedBoard_Interface"></a>__IPCB\_EmbeddedBoard Interface__

__Overview__  
The IPCB\_EmbeddedBoard interface represents an embedded board object consisting of multiple child PCBs in a matrix of rows and columns which is an embedded board array feature\. Each board array can reference a different pcb file\.

__Notes__

- The IPCB\_EmbeddedBoard interface is inherited from the IPCB\_RectangularPrimitive interface\.
- The RowSpacing and ColSpacing values determine the gap between items in the matrix of rows and columns\.
- The DocumentPath string refers to the referenced PCB file\. The corresponding ChildBoard interface represents the child referenced PCB\.
- The OriginMode property denotes how the array is referenced from the origin of the embedded board or let the PCB editor build the array based on the bottom left of the objects in the referenced board’s workspace\.
- The MirrorFlag denotes whether the embedded board is to be flipped over or not\.

The __IPCB\_EmbeddedBoard__ hierarchy;  
IPCB\_RectangularPrimitive  
IPCB\_EmbeddedBoard

IPCB\_RectangularPrimitive methods  
RotateAroundXY  
IsRedundant  
SetState\_XSizeYSize

IPCB\_RectangularPrimitive properties  
XLocation  
YLocation  
X1Location  
Y1Location  
X2Location  
Y2Location  
Rotation

IPCB\_EmbeddedBoard methods  
GetState\_RowCount  
GetState\_ColCount  
GetState\_RowSpacing  
GetState\_ColSpacing  
GetState\_DocumentPath  
GetState\_ChildBoard  
GetState\_Mirror  
GetState\_OriginMode  
SetState\_RowCount  
SetState\_ColCount  
SetState\_RowSpacing  
SetState\_ColSpacing  
SetState\_DocumentPath  
SetState\_Mirror  
SetState\_OriginMode

IPCB\_EmbeddedBoard properties  
RowCount  
ColCount  
RowSpacing  
ColSpacing  
DocumentPath  
ChildBoard  
MirrorFlag  
OriginMode

__See also__  
IPCB\_RectangularPrimitive interface  
PCB Design Objects

__Methods__

__GetState\_ChildBoard method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_ChildBoard : IPCB\_Board;  
__Description__  
This method retrieves  the reference PCB document to be used for the embedded board panellization\. This method is used for the ChildBoard property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_ColCount method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_ColCount : Integer;  
__Description__  
This method retrieves the number of columns that the board array will have\. You can also obtain the RowCount  as well to determine the size of the matrix for the board array\.  
This method is used for the ColCount property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_ColSpacing method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_ColSpacing : TCoord;  
__Description__  
This method sets the height of the first board and the gap between two boards\. This row spacing and the column spacing values are used to generate an embedded board array\.  
This method is used by the ColSpacing property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_DocumentPath method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_DocumentPath : TPCBString;  
__Description__  
This method obtains the path to the referenced PCB for the board panellization\. This method is used by the __DocumentPath__ property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_Mirror method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_Mirror : Boolean;  
__Description__  
The MirrorFlag property obtains the mirrored state of the embedded board panel of PCBs\. Set true to mirror it, or False to leave the embedded board panel as is\.  
This method is used by the MirrorFlag property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_OriginMode method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_OriginMode : TEmbeddedBoardOriginMode;  
__Description__  
This method obtains the board array from the origin of the embedded board or from the bottom left of the referenced board's workspace\.  
From the bottom left is the default value which has the software build the array based on the bottom left of the objects in the referenced board's workspace \(which is the child PCB document\)\.  
This method is used by the __OriginMode__ property\.  
Note that the reference point \(as a red cross\) of the board array is defined by the child PCB document that is used as the base for the board array to place on a PCB document\. To change the reference point \(origin\) of the child board object, click Edit » Origin » Reset / Set menu items to set the origin marker from the PCB menu\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_RowCount method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_RowCount : Integer;  
__Description__  
This method retrieves the number of rows that the board array will have\. You can also obtain the RowCount  as well to determine the size of the matrix for the board array\.  
This method is used for the RowCount property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__GetState\_RowSpacing method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Function GetState\_RowSpacing : TCoord;  
__Description__  
This method obtains the width of the first board and the gap between two boards\. This row spacing and the column spacing values are used to generate an embedded board array\.  
This method is used by the RowSpacing property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_ColCount method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_ColCount \(Value : Integer\);  
__Description__  
This method sets the number of columns that the board array will have\. You can also set the RowCount  as well to determine the size of the matrix for the board array\.  
This method is used for the ColCount property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_ColSpacing method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_ColSpacing \(Value : TCoord \);  
__Description__  
This method sets the width of the first board and the gap between two boards\. This row spacing and the column spacing values are used to generate an embedded board array\.  
This method is used by the ColSpacing property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_DocumentPath method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_DocumentPath \(Value : TPCBString\);  
__Description__  
This method sets the path to the referenced PCB for the board panellization\. This method is used by the DocumentPath property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_Mirror method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_Mirror \(Value : Boolean\);  
__Description__  
The MirrorFlag property sets the mirrored state of the embedded board panel of PCBs\. Set true to mirror it, or False to leave the embedded board panel as is\.  
This method is used by the MirrorFlag property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_OriginMode method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_OriginMode \(Value : TEmbeddedBoardOriginMode\);  
__Description__  
This method sets the board array from the origin of the embedded board or from the bottom left of the referenced board's workspace\.  
From the bottom left is the default value which has the software build the array based on the bottom left of the objects in the referenced board's workspace \(which is the child PCB document\)\.  
This method is used by the __OriginMode__ property\.\.  
Note that the reference point \(as a red cross\) of the board array is defined by the child PCB document that is used as the base for the board array to place on a PCB document\. To change the reference point \(origin\) of the child board object, click Edit » Origin » Reset / Set menu items to set the origin marker from the PCB menu\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_RowCount method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_RowCount \(Value : Integer\);  
__Description__  
This method sets the number of rows that the board array will have\. You can also set the ColCount  as well to determine the size of the matrix for the board array\.  
This method is used for the RowCount property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__SetState\_RowSpacing method__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Procedure SetState\_RowSpacing \(Value : TCoord \);  
__Description__  
This method sets the width of the first board and the gap between two boards\. This row spacing and the column spacing values are used to generate an embedded board array\.  
This method is used by the RowSpacing property\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__Properties__

__ChildBoard property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property ChildBoard : IPCB\_Board Read GetState\_ChildBoard;  
__Description__  
This __ChildBoard__ property represents the reference PCB document to be used for the embedded board panellization\.  
This read only property is supported by the GetState\_ChildBoard method\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__ColCount property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property ColCount : Integer Read GetState\_ColCount Write SetState\_ColCount;  
__Description__  
This __ColCount__ property represents the number of columns that the board array will have\. You can also define the RowCount property as well to define the size of the matrix for the board array\.  
This property is represented by the GetState\_ColCount and SetState\_ColCount methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__ColSpacing property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property ColSpacing : TCoord Read GetState\_ColSpacing Write SetState\_ColSpacing;  
__Description__  
The __ColSpacing__ property determines the height of the first board and the gap between two boards\. This column spacing and the row spacing values are used to generate an embedded board array\.  
This property is supported by the GetState\_ColSpacing and SetState\_ColSpacing methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__DocumentPath property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property DocumentPath : TPCBString Read GetState\_DocumentPath Write SetState\_DocumentPath;  
__Description__  
This __DocumentPath__ property represents the path to the referenced PCB for the board panellization\. This property is supported by the __GetState\_DocumentPath__ and __SetState\_DocumentPath__ methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__MirrorFlag property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property MirrorFlag : Boolean Read GetState\_Mirror Write SetState\_Mirror;  
__Description__  
The __MirrorFlag__ property represents the mirrored state of the embedded board panel of PCBs\. Set true to mirror it, or False to leave the embedded board panel as is\.  
This property is supported by the GetState\_MirrorFlag and SetState\_MirrorFlag methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__OriginMode property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property OriginMode : TEmbeddedBoardOriginMode Read GetState\_OriginMode Write SetState\_OriginMode;  
__Description__  
This __OriginMode__ property references the board array from the origin of the embedded board or from the bottom left of the referenced board's workspace\.  
From the bottom left is the default value which has the software build the array based on the bottom left of the objects in the referenced board's workspace \(which is the child PCB document\)\.  
This __OriginMode__ property is supported by the __GetState\_OriginMode__ and __SetState\_OriginMode__ methods\.  
Note that the reference point \(as a red cross\) of the board array is defined by the child PCB document that is used as the base for the board array to place on a PCB document\. To change the reference point \(origin\) of the child board object, click Edit » Origin » Reset / Set menu items to set the origin marker from the PCB menu\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface  
TEmbeddedBoardOriginMode type

__RowCount property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property RowCount : Integer Read GetState\_RowCount Write SetState\_RowCount;  
__Description__  
This __RowCount__ property represents the number of rows that the board array will have\. You can also define the ColCount property as well to define the size of the matrix for the board array\.  
This property is represented by the GetState\_RowCount and SetState\_RowCount methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

__RowSpacing property__

\(IPCB\_EmbeddedBoard interface\)  
__Syntax__  
Property RowSpacing : TCoord Read GetState\_RowSpacing Write SetState\_RowSpacing;  
__Description__  
The __RowSpacing__ property determines the width of the first board and the gap between two boards\. This row spacing and the column spacing values are used to generate an embedded board array\.  
This property is supported by the GetState\_RowSpacing and SetState\_RowSpacing methods\.  
__Example__  
__See also__  
IPCB\_EmbeddedBoard interface

<a id="IPCB_Fill"></a>__IPCB\_Fill__

__Overview__  
The __IPCB\_Fill__ interface represents a PCB fill object on a PCB document\. A fill object is a rectangular object and thus is inherited from the IPCB\_RectangularPrimitive interface\.

__Notes__  
The IPCB\_Fill interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_RectangularPrimitive  
IPCB\_Fill

__IPCB\_RectangularPrimitive methods__  
RotateAroundXY  
IsRedundant  
SetState\_XSizeYSize

__IPCB\_RectangularPrimitive properties__  
XLocation  
YLocation  
X1Location  
Y1Location  
X2Location  
Y2Location  
Rotation

IPCB\_Fill methods

IPCB\_Fill properties

__Example__

01

Var

02

    WorkSpace : IWorkSpace;

03

    Board     : IPCB\_Board;

04

    Fill      : IPCB\_Fill;

05

Begin

06

    //Create a new PCB document

07

    WorkSpace := GetWorkSpace;

08

    If WorkSpace = Nil Then Exit;

09

    Workspace\.DM\_CreateNewDocument\('PCB'\);

10

11

    Board := PCBServer\.GetCurrentPCBBoard;

12

    If Board = Nil then exit;

13

14

    // Create a Fill object

15

    Fill             := PCBServer\.PCBObjectFactory\(eFillObject, eNoDimension,eCreate\_Default\);

16

17

    Fill\.X1Location  := MilsToCoord\(2000\);

18

    Fill\.Y1Location  := MilsToCoord\(2000\);

19

    Fill\.X2Location  := MilsToCoord\(2500\);

20

    Fill\.Y2Location  := MilsToCoord\(2500\);

21

    Fill\.Layer       := eBottomLayer;

22

    Fill\.Rotation    := 45;

23

24

    // Add a new Fill into the PCB design database\.

25

    Board\.AddPCBObject\(Fill\);

26

27

    // Refresh the PCB document

28

    ResetParameters;

29

    AddStringParameter\('Action', 'All'\);

30

    RunProcess\('PCB:Zoom'\);

31

End;

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_RectangularPrimitive interface  
Undo script in \\Examples\\Scripts\\PCB folder\.

<a id="IPCB_FromTo_Interface"></a>__IPCB\_FromTo Interface__

__Overview__  
The __IPCB\_FromTo__ interface represents a FromTo object on a PCB document, as a node to a node \(a pad of a component to a pad of another component for example\) and has a NetName property\.

The IPCB\_FromTo hierarchy;  
IPCB\_Primitive  
IPCB\_FromTo

__IPCB\_FromTo methods__  
GetState\_FromPad  
GetState\_ToPad  
GetState\_NetName  
SetState\_FromPad  
SetState\_ToPad  
SetState\_NetName  
GetNet  
GetFromPad  
GetToPad  
GetState\_RoutedLength

__IPCB\_FromTo properties__  
FromPad  
ToPad  
NetName

__See also__  
IPCB\_Primitive interface  
IPCB\_Pad interface  
IPCB\_Net interface  
PCB Design Objects

__GetState and SetState Methods__

__GetState\_FromPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetState\_FromPad : TPCBString;  
__Description__  
A FromTo object has a node to a node \(a pin to a pin for example\) represented FromPad and ToPad properties\.  
This method is used for the FromPad property\.  
__Example__  
__See also__  
IPCB\_FromTo interface  
TPCBString

__GetState\_NetName method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetState\_NetName : TPCBString;  
__Description__  
The FromTo object has two nodes, FromPad and ToPad\. These __Notes__ have their Net Name properties\.  
This method gets the net name for the FromTo object and is for the NetName property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__GetState\_ToPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetState\_ToPad : TPCBString;  
__Description__  
A FromTo object has a node to a node \(a pin to a pin for example\) represented FromPad and ToPad properties\.  
This method is used for the ToPad property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__SetState\_FromPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Procedure SetState\_FromPad \(Value : TPCBString\);  
__Description__  
A FromTo object has a node to a node \(a pin to a pin for example\) represented FromPad and ToPad properties\.  
This method sets the FromPad and is for the FromPad property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__SetState\_NetName method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Procedure SetState\_NetName \(Value : TPCBString\);  
__Description__  
The FromTo object has two nodes, FromPad and ToPad\. These __Notes__ have their Net Name properties\.  
This method sets the net name for the FromTo object and is for the NetName property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__SetState\_ToPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Procedure SetState\_ToPad \(Value : TPCBString\);  
__Description__  
A FromTo object has a node to a node \(a pin to a pin for example\) represented FromPad and ToPad properties\.  
This method sets the ToPad and is for the ToPad property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__Methods__

__GetFromPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetFromPad : IPCB\_Pad;  
__Description__  
This function returns the pad  interface associated with the FromPad of the FromTo object\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__GetNet method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetNet : IPCB\_Net;  
__Description__  
This function returns the net interface associated with the net of the FromTo object\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__GetToPad method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetToPad : IPCB\_Pad;  
__Description__  
This function returns the pad  interface associated with the ToPad of the FromTo object\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__GetState\_RoutedLength method__

\(IPCB\_FromTo interface\)  
__Syntax__  
Function GetState\_RoutedLength : TCoord;  
__Description__  
This function returns the routed length of the FromTo object in TCoord units\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__Properties__

__FromPad property__

\(IPCB\_FromTo interface\)  
__Syntax__  
Property FromPad : TPCBString Read GetState\_FromPad Write SetState\_FromPad;  
__Description__  
The FromTo object has two nodes, FromPad and ToPad\. These Nodes have their Net Name properties\.  
This property represents the FromPad node and returns the name of the FromPad property\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__NetName property__

\(IPCB\_FromTo interface\)  
__Syntax__  
Property NetName : TPCBString Read GetState\_NetName Write SetState\_NetName;  
__Description__  
The FromTo object has two nodes, FromPad and ToPad\. These Nodes have their Net Name properties\.  
This property represents the net name of the FromTo object\.  
__Example__  
__See also__  
IPCB\_FromTo interface

__ToPad property__

\(IPCB\_FromTo interface\)  
__Syntax__  
Property ToPad : TPCBString Read GetState\_ToPad Write SetState\_ToPad;  
__Description__  
The FromTo object has two nodes, FromPad and ToPad\. These Nodes have their Net Name properties\.  
This property represents the ToPad node and returns the name of the ToPad property\.\.  
__Example__  
__See also__  
IPCB\_FromTo interface

<a id="IPCB_Group"></a>__IPCB\_Group__

__Overview__  
The__ IPCB\_Group__ interface is an immediate ancestor for __IPCB\_Net__, __IPCB\_LibComponent__, __IPCB\_Polygon__, __IPCB\_Coordinate__, __IPCB\_Dimension__ and its descendant interfaces\.

The __IPCB\_Group__ interface is a composite object interface which means it can store objects\. Thus a group object is an object composed of primitives such as arcs, tracks and fills\.  For example a polygon consists of child tracks and arcs\. A footprint in a PCB library consists of child objects such as arcs, pads and tracks\.

The __IPCB\_Group__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group

__Notes__  
To fetch objects of a group object, you employ the Group Iterator with the __GroupIterator\_Create__ and __GroupIterator\_Destroy__ methods\.  
To add or remove child objects from a group object, you employ the __AddPCBObject__ or the __RemovePCBObject__ methods\.  
To fetch the reference coordinates of a group object, the X,Y properties define the reference point\.

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__See also__  
IPCB\_Primitive interface  
IPCB\_Net interface  
IPCB\_LibComponent interface  
IPCB\_Polygon interface  
IPCB\_Coordinate interface  
IPCB\_Dimension interface  
IPCB\_GroupIterator interface  
PCB Design Objects

__Methods__

__AddPCBObject method__

\(IPCB\_Group interface\)  
__Syntax__  
Procedure AddPCBObject\(PCBObject : IPCB\_Primitive\);  
__Description__  
__Example__  

__See also__  
IPCB\_Group interface

__FastSetState\_XSizeYSize method__

\(IPCB\_Group interface\)  
__Syntax__  
Function FastSetState\_XSizeYSize : Boolean;   
__Description__  
__Example__  

__See also__  
IPCB\_Group interface

__FreePrimitives method__

\(IPCB\_Group interface\)  
__Syntax__  
Procedure FreePrimitives;  
__Description__  
__Example__  

__See also__  
IPCB\_Group

__GetPrimitiveAt method__

\(IPCB\_Group interface\)  
__Syntax__  
Function  GetPrimitiveAt\(I        : Integer;  
                         ObjectId : TObjectId\) : IPCB\_Primitive;  
__Description__  
__Example__  

__See also__  
IPCB\_Group interface

__GetPrimitiveCount method__

\(IPCB\_Group interface\)  
__Syntax__  
Function GetPrimitiveAt\(I        : Integer;  
                        ObjectId : TObjectId\): IPCB\_Primitive;  
__Description__  
__Example__  

__See also__  
IPCB\_Group

__GroupIterator\_Create__

\(IPCB\_Group interface\)  
__Syntax__  
Function GroupIterator\_Create : IPCB\_GroupIterator;  
__Description__  
The GroupIterator\_Create method creates a group iterator for the group object, so that the child objects can be searched from within the group object\. This group iterator searches for child objects of a group object, such as a component, footprint, polygon, dimension, board layout and so on\.  
__Example__

01

Var

02

    Track                   : IPCB\_Primitive;

03

    TrackIteratorHandle     : IPCB\_GroupIterator;

04

    Component               : IPCB\_Component;

05

    ComponentIteratorHandle : IPCB\_BoardIterator;

06

    TrackCount              : Integer;

07

    ComponentCount          : Integer;

08

Begin

09

    TrackCount     := 0;

10

    ComponentCount := 0;

11

    If PCBServer\.GetCurrentPCBBoard = Nil Then Exit;

12

13

    ComponentIteratorHandle := PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Create;

14

    ComponentIteratorHandle\.AddFilter\_ObjectSet\(MkSet\(eComponentObject\)\);

15

    ComponentIteratorHandle\.AddFilter\_LayerSet\(AllLayers\);

16

    ComponentIteratorHandle\.AddFilter\_Method\(eProcessAll\);

17

    Component := ComponentIteratorHandle\.FirstPCBObject;

18

19

    While \(Component <> Nil\) Do

20

    Begin

21

        TrackIteratorHandle := Component\.GroupIterator\_Create;

22

        TrackIteratorHandle\.AddFilter\_ObjectSet\(MkSet\(eTrackObject\)\);

23

        TrackIteratorHandle\.AddFilter\_LayerSet\(MkSet\(eTopOverlay\)\);

24

        Track := TrackIteratorHandle\.FirstPCBObject;

25

        While \(Track <> Nil\) Do

26

        Begin

27

            Inc\(TrackCount\);

28

            Track := TrackIteratorHandle\.NextPCBObject;

29

        End;

30

        ShowInfo\('This component ' \+ Component\.SourceDesignator  \+ ' has ' \+  IntToStr\(TrackCount\)  \+ ' tracks\.'\);

31

        TrackCount := 0;

32

        Component\.GroupIterator\_Destroy\(TrackIteratorHandle\);

33

        Component := ComponentIteratorHandle\.NextPCBObject;

34

        Inc\(ComponentCount\);

35

        If \(ComponentCount > 5\) Then Break;

36

    End;

37

    PCBServer\.GetCurrentPCBBoard\.BoardIterator\_Destroy\(ComponentIteratorHandle\);

38

End;

__See also__  
IPCB\_Group interface  
IPCB\_GroupIterator interface

__GroupIterator\_Destroy__

\(IPCB\_Group interface\)  
__Syntax__  
Procedure GroupIterator\_Destroy\(Var AIterator : IPCB\_GroupIterator\);  
__Description__  
__Example__  

__See also__  
IPCB\_Group interface  
IPCB\_GroupIterator interface

__RemovePCBObject method__

\(IPCB\_Group interface\)  
__Syntax__  
Procedure RemovePCBObject\(PCBObject : IPCB\_Primitive\);  
__Description__  
__Example__  

__See also__  
IPCB\_Group interface

__SetState\_LayersUsedArray method__

\(IPCB\_Group interface\)  
__Syntax__  
Procedure SetState\_LayersUsedArray;  
__Description__  
__Example__  

__See also__  
IPCB\_Group interface

__SetState\_XSizeYSize method__

\(IPCB\_Group interface\)  
__Syntax__  
Function  SetState\_XSizeYSize : Boolean;   
__Description__  
__Example__  

__See also__  
IPCB\_Group interface

__Properties__

__LayerIsUsed property__

\(IPCB\_Group interface\)  
__Syntax__  
Property  LayerUsed \[L : TLayer\] : Boolean Read GetState\_LayerUsed Write SetState\_LayerUsed;  
__Description__  
__Example__  

__See also__  
IPCB\_Group

__PrimitiveLock property__

\(IPCB\_Group interface\)  
__Syntax__  
Property PrimitiveLock : Boolean Read GetState\_PrimitiveLock Write SetState\_PrimitiveLock;  
__Description__  
The PrimitiveLock property denotes whether the primitives of the group object can be edited individually or not\. Normally all the child objects or primitives of a group can only be accessed as a group object\.  
__Example__  

__See also__  
IPCB\_Group

__X property__

\(IPCB\_Group interface\)  
__Syntax__  
Property X : TCoord Read GetState\_XLocation Write SetState\_XLocation;  
__Description__  
The X property defines the reference point of the group object\.  
__Example__  

__See also__  
IPCB\_Group interface

__Y property__

\(IPCB\_Group interface\)  
__Syntax__  
Property Y : TCoord Read GetState\_YLocation Write SetState\_YLocation;  
__Description__  
The Y property defines the reference point of the group object\.  
__Example__  

__See also__  
IPCB\_Group interface

<a id="IPCB_LettersCache_Interface"></a>__IPCB\_LettersCache Interface__

__Overview__

__IPCB\_LettersCache methods__  
I\_ObjectAddress  
PlotText

__IPCB\_LettersCache properties__

__ __  
__Example__  
Var  
__See also__  
PCB Design Objects

__Methods__

__I\_ObjectAddress method__

\(IPCB\_LettersCache interface\)  
__Syntax__  
Function  I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
__Example__  
__See also__  
IPCB\_LettersCache interface

__PlotText method__

\(IPCB\_LettersCache interface\)  
__Syntax__  
Procedure PlotText\(ATextHandle  : TPCBObjectHandle;  
                   PlotProc     : TPlotPolygonProc;  
             Const ADisplayText : TPCBString\);  
__Description__  
__Example__  
__See also__  
IPCB\_LettersCache interface

<a id="IPCB_LibComponent_Interface"></a>__IPCB\_LibComponent Interface__

__Overview__  
The __IPCB\_LibComponent__ object represents the current footprint in a PCB library document\. The footprints of a PCB library is equivalent to "pages" of a library\.

The library document is represented by two interfaces \- the current footprint and the IPCB\_Library document\.

The __IPCB\_LibraryIterator__ object interface iterates through a loaded PCB library in Altium Designer to fetch PCB footprints which are represented by the __IPCB\_LibComponent__ interfaces\. The IPCB\_LibraryIterator interface is used in the IPCB\_Library interface \- LibraryIterator\_Create and LibraryIterator\_Destory methods\.

__Notes__  
A library is represented by the IPCB\_Library interface\.  
A PCB footprint \(as a page of the library\) is represented by its IPCB\_LibComponent interface which is inherited from the IPCB\_Group object interface\.  
A PCB footprint is composed of child objects such as pads and tracks\. Therefore the footprint has its own IPCB\_GroupIterator to fetch its own child objects\.  
DelphiScript doesnt support sets, therefore to pass in a set of layers or a set of objects, you need to use the __MkSet__ function to create a pseudo set of objects or layers for the __AddFilter\_ObjectSet__ or __AddFilterLayerSet__ methods\. For example LibraryIterator\.AddFilter\_ObjectSet\(MkSet\(eTrackObject,eFillObject\)\);

The __IPCB\_LibComponent__ interface hierarchy is as follows:  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_LibComponent

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  

GroupIterator\_Create  
GroupIterator\_Destroy  

AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__IPCB\_LibComponent methods__  
GetState\_Pattern  
GetState\_Height  
GetState\_Description  
SetState\_Pattern  
SetState\_Height  
SetState\_Description

__IPCB\_LibComponent properties__  
Name  
Height  
Description

__DelphiScript Example__

01

Procedure ReportFootprintInfo;

02

Var

03

    CurrentLib        : IPCB\_Library;

04

    FootprintIterator : IPCB\_LibraryIterator;

05

    Footprint         : IPCB\_LibComponent;

06

    FootprintList     : TStringList;

07

    ReportDocument    : IServerDocument;

08

    Filename          : TString;

09

    S                 : TString;

10

    I                 : Integer;

11

Begin

12

    CurrentLib := PCBServer\.GetCurrentPCBLibrary;

13

    If CurrentLib = Nil Then Exit;

14

15

    Filename := ExtractFilePath\(CurrentLib\.Board\.FileName\) \+ 'PCBLib\_Report\.csv';

16

    S := '';

17

    FootprintList := TStringList\.Create;

18

19

    FootprintIterator := CurrentLib\.LibraryIterator\_Create;

20

    FootprintIterator\.SetState\_FilterAll;

21

    Try

22

        Footprint := FootprintIterator\.FirstPCBObject;

23

        While Footprint <> Nil Do

24

        Begin

25

            // Determine which units are in use\. at the mo it is the other way around\!\!\!

26

            If CurrentLib\.Board\.DisplayUnit = eMetric Then

27

                S := footprint\.name \+ ',' \+ FloatToStr\(CoordToMils\(Footprint\.Height\)\) \+ ',' \+ Footprint\.Description

28

            Else

29

                S := footprint\.name \+ ',' \+ FloatToStr\(CoordToMMs\(Footprint\.Height\)\) \+ ',' \+ Footprint\.Description;

30

31

            FootprintList\.Add\(S\);

32

            Footprint := FootprintIterator\.NextPCBObject;

33

        End;

34

     Finally

35

        CurrentLib\.LibraryIterator\_Destroy\(FootprintIterator\);

36

        FootprintList\.SaveToFile\(FileName\);

37

        FootprintList\.Free;

38

    End;

39

40

    //Display and save report\.

41

    ReportDocument := Client\.OpenDocument\('Text', FileName\);

42

    If ReportDocument <> Nil Then

43

        Client\.ShowDocument\(ReportDocument\);

44

End;

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_GroupIterator interface  
LibraryIterator example from \\Examples\\Scripts\\DelphiScript\\PCB\\ folder\.

__GetState and SetState Methods__

__GetState\_Description method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Function GetState\_Description : TPCBString;  
__Description__  
The __Description__ property denotes the footprint's description\. This method is used for the Description property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__GetState\_Height method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Function GetState\_Height : TCoord;  
__Description__  
The Height property denotes the footprint's height\. This method is used by the Height property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__GetState\_Pattern method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Function GetState\_Pattern : TPCBString;  
__Description__  
The Name property denotes the pattern name of the footprint\. This pattern method is used by the Name property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__SetState\_Description method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Procedure SetState\_Description \(Value : TPCBString\);  
__Description__  
The __Description__ property denotes the footprint's description\. This method is used for the Description property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__SetState\_Height method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Procedure SetState\_Height \(Value : TCoord\);  
__Description__  
The Height property denotes the footprint's height\. This method is used by the Height property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__SetState\_Pattern method__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Procedure SetState\_Pattern \(Value : TPCBString\);  
__Description__  
The Name property denotes the pattern name of the footprint\. This pattern method is used by the Name property\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__Properties__

__Description property__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Property Description : TPCBString Read getState\_Description Write SetState\_Description;  
__Description__  
The __Description__ property denotes the footprint's description\. This Description property is supported by the GetState\_Description and SetState\_Description methods\.  
Note, the IPCB\_LibComponent interface represents the current footprint in the PCB Library editor workspace\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__Height property__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Property Height : TCoord Read GetState\_Height Write SetState\_Height;  
__Description__  
The Height property denotes the footprint's height\. This Height property is supported by the GetState\_Height and SetState\_Height methods\.  
Note, the IPCB\_LibComponent interface represents the current footprint in the PCB Library editor workspace\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

__Name property__

\(IPCB\_LibComponent interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Pattern Write SetState\_Pattern;  
__Description__  
The Name property denotes the pattern name of the footprint\. This Name property is supported by the GetState\_Pattern and SetState\_Pattern methods\.  
Note, the __IPCB\_LibComponent__ interface represents the current footprint in the PCB Library editor workspace\.  
__Example__  
__See also__  
IPCB\_LibComponent interface

<a id="IPCB_Net_Interface"></a>__IPCB\_Net Interface__

__Overview__  
A net object can store net information from a PCB document\.  The net object contains information about the components used in the design, and the connectivity created in the design, stored in the form of nets\.  A net object is a list of pin to pin connections that are electrically connected in the design\.  The arrangement of the pin to pin connections is called the net topology\.

The net objects are system generated objects, which means, you can retrieve the net names of PCB objects that have a net property on a PCB document\.

By default the PCB editor arranges the pin to pin connections of each net to give the shortest overall connection length\.  To have control of the arrangement of the pin to pin connections in a net, the PCB editor allows the user to define a set of From\-Tos\.

__The IPCB\_Net interface hierarchy is as follows:__  
IPCB\_Primitive  
IPCB\_Group  
IPCB\_Net

__Notes__  
The ConnectsVisible property denotes the visibility of a net\. If True, connections are visible\.  
IPCB\_Group table

__IPCB\_Group methods__  
FreePrimitives  
GetPrimitiveAt  
GetPrimitiveCount  
SetState\_XSizeYSize  
FastSetState\_XSizeYSize  
SetState\_LayersUsedArray  
GroupIterator\_Create  
GroupIterator\_Destroy  
AddPCBObject  
RemovePCBObject

__IPCB\_Group properties__  
X  
Y  
PrimitiveLock  
LayerUsed

__IPCB\_Net table__

__IPCB\_Net methods__  
GetState\_Color  
GetState\_Name  
GetState\_ConnectsVisible  
GetState\_ConnectivelyInvalid  
GetState\_RoutedLength  
GetState\_ViaCount  
GetState\_PinCount  
Getstate\_PadByName  
Getstate\_PadByPinDescription  
GetState\_IsHighlighted  
GetState\_LoopRemoval  
GetState\_DifferentialPair  
GetState\_InDifferentialPair  
GetState\_LiveHighlightMode  
SetState\_Color  
SetState\_Name  
SetState\_ConnectsVisible  
SetState\_IsHighlighted  
SetState LoopRemoval  
SetState\_DifferentialPair  
SetState\_LiveHighlightMode  
Rebuild  
HideNetConnects  
ShowNetConnects  
ConnectivelyInValidate;Procedure CancelGroupWarehouseRegistration  
CancelGroupWarehouseRegistration  
RegisterWithGroupWarehouse  
GetLogicalNet  
SubnetIndices\_Set  
SubnetIndices\_Reset

__IPCB\_Net properties__  
Color  
Name  
ConnectsVisible  
ConnectivelyInvalid  
RoutedLength  
ViaCount  
PinCount  
PadByName  
PadByPinDescription  
IsHighlighted  
LoopRemoval  
DifferentialPair  
InDifferentialPair  
LiveHighlightMode

__Example__

01

Procedure IterateNetObjects;

02

Var

03

    Board       : IPCB\_Board;

04

    Net         : IPCB\_Net;

05

    Iterator    : IPCB\_BoardIterator;

06

    LS          : TPCBString;

07

Begin

08

    // Retrieve the current board

09

    Board := PCBServer\.GetCurrentPCBBoard;

10

    If Board = Nil Then Exit;

11

    // Create the iterator that will look for Net objects only

12

    Iterator        := Board\.BoardIterator\_Create;

13

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eNetObject\)\);

14

    Iterator\.AddFilter\_LayerSet\(AllLayers\);

15

    Iterator\.AddFilter\_Method\(eProcessAll\);

16

    // Search for Net objects and get their Net Name values

17

    LS := '';

18

    Net := Iterator\.FirstPCBObject;

19

    While \(Net <> Nil\) Do

20

    Begin

21

        LS := LS \+ Net\.Name \+ ', ';

22

        Net := Iterator\.NextPCBObject;

23

    End;

24

    Board\.BoardIterator\_Destroy\(Iterator\);

25

    // Display the Net Names on a dialog\.

26

    ShowInfo\('Nets = ' \+ LS\);

27

 End;

__See also__  
PCB Design Objects  
IPCB\_Primitive interface  
IPCB\_Group interface  
IPCB\_GroupIterator interface  
IterateNets example from the \\Examples\\Scripts\\DelphiScript\\PCB\\ folder\.  
NetObjectAssign example from the \\Examples\\Scripts\\DelphiScript\\PCB\\ folder\.

__GetState and SetState methods__

__GetState\_Color method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_Color : TColor;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_ConnectivelyInvalid method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_ConnectivelyInvalid : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_ConnectsVisible method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_ConnectsVisible : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_IsHighlighted method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_IsHighlighted : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_Name method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_Name : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Getstate\_PadByName method__

\(IPCB\_Net interface\)  
__Syntax__  
Function Getstate\_PadByName \(PadName : TPCBString\) : IPCB\_Primitive;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Getstate\_PadByPinDescription method__

\(IPCB\_Net interface\)  
__Syntax__  
Function Getstate\_PadByPinDescription \(PinDes : TPCBString\) : IPCB\_Primitive;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_PinCount method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_PinCount : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_RoutedLength method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_RoutedLength : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetState\_ViaCount method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetState\_ViaCount : Integer;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__SetState\_Color method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure SetState\_Color \(Color : TColor\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__SetState\_ConnectsVisible method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure SetState\_ConnectsVisible \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__SetState\_IsHighlighted method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure SetState\_IsHighlighted \(Dummy : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__SetState\_Name method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure SetState\_Name \(Name : TPCBString\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Methods__

__CancelGroupWarehouseRegistration method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure CancelGroupWarehouseRegistration \(iPad : IPCB\_Pad\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__ConnectivelyInValidate method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure ConnectivelyInValidate;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__GetLogicalNet method__

\(IPCB\_Net interface\)  
__Syntax__  
Function GetLogicalNet : IPCB\_Group;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__HideNetConnects method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure HideNetConnects;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Rebuild method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure Rebuild;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__ShowNetConnects method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure ShowNetConnects;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__RegisterWithGroupWarehouse method__

\(IPCB\_Net interface\)  
__Syntax__  
Procedure RegisterWithGroupWarehouse \(iPad : IPCB\_Pad\);  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Properties__

__Color property__

\(IPCB\_Net interface\)  
__Syntax__  
Property Color : TColor Read GetState\_Color Write SetState\_Color;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__ConnectivelyInvalid property__

\(IPCB\_Net interface\)  
__Syntax__  
Property ConnectivelyInvalid : Boolean Read GetState\_ConnectivelyInvalid;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__ConnectsVisible property__

\(IPCB\_Net interface\)  
__Syntax__  
Property ConnectsVisible : Boolean Read GetState\_ConnectsVisible Write SetState\_ConnectsVisible;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__IsHighlighted property__

\(IPCB\_Net interface\)  
__Syntax__  
Property IsHighlighted : Boolean Read GetState\_IsHighlighted Write SetState\_IsHighlighted;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__Name property__

\(IPCB\_Net interface\)  
__Syntax__  
Property Name : TPCBString Read GetState\_Name Write SetState\_Name;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__PadByName \[N property__

\(IPCB\_Net interface\)  
__Syntax__  
Property PadByName \[N : TPCBString \] : IPCB\_Primitive Read Getstate\_PadByName;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__PadByPinDescription \[N property__

\(IPCB\_Net interface\)  
__Syntax__  
Property PadByPinDescription \[N : TPCBString \] : IPCB\_Primitive Read Getstate\_PadByPinDescription;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__PinCount property__

\(IPCB\_Net interface\)  
__Syntax__  
Property PinCount : Integer Read GetState\_PinCount;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__RoutedLength property__

\(IPCB\_Net interface\)  
__Syntax__  
Property RoutedLength : TCoord Read GetState\_RoutedLength;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

__ViaCount property__

\(IPCB\_Net interface\)  
__Syntax__  
Property ViaCount : Integer Read GetState\_ViaCount;  
__Description__  
__Example__  
__See also__  
IPCB\_Net interface

<a id="IPCB_ObjectClass_Interface"></a>__IPCB\_ObjectClass Interface__

__Overview__  
A class is defined as a group or set of objects, identified by its unique class name\. The PCB editor in the Altium Designer supports Net Classes, Component Classes and From\-To Classes\.

An object can belong to more than one class\. You can create classes \(or groups\) of objects\. Classes of Components, Nets and From\-Tos can be created, and multiple membership is permitted\.  Classes are used to quickly identify a group of objects\. For example, you could create a class of components called Surface Mount\.

When you set up a paste mask expansion rule for the surface mount components, you simply set the rule scope to Component Class and select the Surface Mount class\. Or you may have a set of nets, such as the power nets, which have different clearance requirements from the signal nets\. You can create a Net Class which includes all these nets, and then use the Net Class scope when you define the clearance design rule for these nets\.

__Notes__  
An ObjectClass object can be created from the PCBClassFactoryByClassMember or PCBObjectFactory methods from the __IPCB\_ServerInterface__ interface\.

The IPCB\_ObjectClass hierarchy;  
IPCB\_Primitive  
IPCB\_ObjectClass

__IPCB\_ObjectClass methods__  
GetState\_MemberKind  
GetState\_Name  
GetState\_SuperClass  
GetState\_MemberName  
SetState\_MemberKind  
SetState\_Name  
SetState\_SuperClass  
AddMemberByName  
AddMember  
RemoveMember  
RemoveAllMembers  
IsMember  
IsLayerMember  
AddLayerMember  
RemoveLayerMember  
IsValidObjectKind

__IPCB\_ObjectClass properties__  
MemberKind  
Name  
SuperClass  
MemberName \[I

__Example__

01

Var

02

    Board    : IPCB\_Board;

03

    NetClass : IPCB\_ObjectClass;

04

Begin

05

    Board := PCBServer\.GetCurrentPCBBoard;

06

    If Board = Nil Then Exit;

07

    PCBServer\.PreProcess;

08

    NetClass := PCBServer\.PCBClassFactoryByClassMember\(eClassMemberKind\_Net\);

09

    NetClass\.SuperClass := False;

10

    NetClass\.Name := 'NetGndClass';

11

    NetClass\.AddMemberByName\('GND'\);

12

    Board\.AddPCBObject\(NetClass\);

13

    PCBServer\.PostProcess;

14

End;

__See also__  
IPCB\_Primitive interface  
IPCB\_ServerInterface interface  
TClassMemberKind enumerated values  
PCB Design Objects  
Object Class Reporter script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\Object Class Report  
UnrouteNetClass script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\UnRoute Net Class\\ folder\.  
CreateNetClass script from  \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder\.  
ComponentClassInfo script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\

__GetState and SetState Methods__

__SetState\_SuperClass method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure SetState\_SuperClass \(Value : Boolean\);  
__Description__  
The SuperClass property denotes whether or not the interface contains all members of a particular kind\. If this field is set to true, the members of the IPCB\_ObjectClass object cannot be edited\.  
This Setter method is used by the SuperClass property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__SetState\_Name method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure SetState\_Name \(Value : TPCBString\);  
__Description__  
This property denotes the name of this Object Class object for the PCB document\. This setter method is used by the Name property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__SetState\_MemberKind method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure SetState\_MemberKind \(Value : TClassMemberKind\);  
__Description__  
This property denotes which particular objects can be stored in the list\. This setter method is used by the MemberKind property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__GetState\_SuperClass method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function GetState\_SuperClass : Boolean;  
__Description__  
The SuperClass property denotes whether or not the interface contains all members of a particular kind\. If this field is set to true, the members of the IPCB\_ObjectClass object cannot be edited and contains all the names of the objects of the particular kind\.  
This Getter method is used by the SuperClass property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind enumerated values

__GetState\_Name method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function GetState\_Name : TPCBString;  
__Description__  
This property denotes the name of this Object Class object for the PCB document\. This getter method is used by the Name property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__GetState\_MemberName method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function GetState\_MemberName \(I : Integer\) : TPCBString;  
__Description__  
This property denotes the member name from the list of members in the IPCB\_Object class interface\. This getter method is used by the MemberName property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__GetState\_MemberKind method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Function GetState\_MemberKind : TClassMemberKind;  
__Description__  
This method denotes which particular objects can be stored in the list\. This getstate\_MemberKind method is used by the __MemberKind__ property\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind type

__Methods__

__AddLayerMember method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure AddLayerMember \(L : TLayer\);  
__Description__  
This __AddLayerMember__ method adds a layer to the object class of eClassMemberKind\_Layer type\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__AddMember method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure AddMember \(P : IPCB\_Primitive\);  
__Description__  
The __AddMember__ method adds a primitive that belongs to the same member kind in the Object Class\.  
__Example__  
__See also__  
IPCB\_ObjectClass interface

__AddMemberByName method__

\(IPCB\_ObjectClass interface\)  
__Syntax__  
Procedure AddMemberByName \(AName : TPCBString\);  
__Description__  
This AddMemberByName adds a member by its name of the member kind in the object class\.  
__Example__

01

Var

02

    Board    : IPCB\_Board;

03

    NetClass : IPCB\_ObjectClass;

04

Begin

05

    Board := PCBServer\.GetCurrentPCBBoard;

06

    If Board = Nil Then Exit;

07

    PCBServer\.PreProcess;

08

    NetClass := PCBServer\.PCBClassFactoryByClassMember\(eClassMemberKind\_Net\);

09

    NetClass\.SuperClass := False;

10

    NetClass\.Name := 'NetGndClass';

11

    NetClass\.AddMemberByName\('GND'\);

12

    Board\.AddPCBObject\(NetClass\);

13

    PCBServer\.PostProcess;

14

End;

__See also__  
IPCB\_ObjectClass interface  
TClassMemberKind enumerated values

__IsLayerMember method__