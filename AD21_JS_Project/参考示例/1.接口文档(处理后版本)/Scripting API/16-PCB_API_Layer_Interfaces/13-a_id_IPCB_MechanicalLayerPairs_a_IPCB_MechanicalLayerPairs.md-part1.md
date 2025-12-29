### <a id="IPCB_MechanicalLayerPairs"></a>IPCB\_MechanicalLayerPairs

__Overview__  
In Altium Designer there are 32 general purpose mechanical layers for defining the board layout, placing dimensions on, including fabrication details on, or any other mechanical details the design requires\. The purpose of the IPCB\_MechanicalLayerPairs Interface is to see and manipulate which Mechanical layers are paired to one another\.

When a component incorporates objects on one or more Mechanical layers that have been paired, the Layer property of those objects changes when the Layer property of the component is toggled \(between the Top and Bottom layers\), just like objects on the non\-Mechanical layers that have always been paired to one another, such as the Top and Bottom \(copper\) layers, the Top and Bottom Overlay layers, the Top and Bottom Paste Mask layers, and the Top and Bottom Solder Mask layers\.

__Notes__  
The IPCB\_MechanicalLayerPairs interface is a MechanicalPairs property of the IPCB\_Board interface — IPCB\_Board\.MechanicalPairs returns the IPCB\_MechanicalLayerPairs interface\.

Invoke the Count method to obtain the number of mechanical layer pairs for the existing PCB document\. The LayerPair\[I : Integer\] property defines indexed layer pairs and returns a TMechanicalLayerPair record of two PCB layers\.

__Methods and properties__

__IPCB\_MechanicalLayerPairs methods__

__IPCB\_MechanicalLayerPairs properties__

Clear  
Count  
AddPair  
RemovePair  
PairDefined  
LayerUsed  
FlipLayer  
FlipLayerV7  
Import\_FromParameters  
Export\_ToParameters

LayerPair

__Example__

01

Procedure AddMechPairs;

02

Var

03

    Board     : IPCB\_Board;

04

    MechPairs : IPCB\_MechanicalLayerPairs;

05

06

Begin

07

    Board := PCBServer\.GetCurrentPCBBoard;

08

    If Board = Nil Then Exit;

09

10

    MechPairs := Board\.MechanicalPairs;

11

12

    ShowInfo\('This Board has ' \+ IntToStr\(MechPairs\.Count\) \+ ' Mechanical Pairs'

13

              \+ \#13\#10 \+ 'Add a new pair?'\);

14

    // Pair mechanical layers 10 and 12 

15

    MechPairs\.AddPair\(66, 68\);

16

    ShowInfo\('Board now has ' \+ IntToStr\(MechPairs\.Count \) \+ ' Mechanical Pairs'

17

              \+ \#13\#10 \+ 'Clear mechanical pairs?'\);

18

    MechPairs\.Clear;

19

    ShowInfo\('Board now has ' \+ IntToStr\(MechPairs\.Count\) \+ ' Mechanical Pairs'\);

20

End;

__PCB API Design Objects Interfaces__

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [PCB API Design Objects Interfaces for version 22](https://www.altium.com/documentation/altium-designer/pcb-api-design-objects-interfaces)

*Parent page:* [Technical Reference \- PCB API](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

__PCB API: Design Objects Reference __

The PCB API Design Objects reference includes the following sections and content:

[__PCB Design Objects Interfaces__](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#PCB Design Objects Interfaces)

[__PCB Rule Objects Interfaces__](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#PCB Rule Objects Interfaces)

[__PCB Object Iterators__](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#PCB Object Iterators)

[IPCB\_Primitive Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Primitive Interface)  
[IPCB\_Arc Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Arc Interface)  
[IPCB\_BoardOutline](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_BoardOutline)  
[IPCB\_Component Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Component Interface)  
[IPCB\_ComponentBody Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ComponentBody Interface)  
[IPCB\_Coordinate](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Coordinate)  
[IPCB\_Connection Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Connection Interface)  
[IPCB\_ DifferentialPair Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ DifferentialPair Interface)  
[IPCB\_Embedded Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Embedded Interface)  
[IPCB\_EmbeddedBoard Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_EmbeddedBoard Interface)  
[IPCB\_Fill](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Fill)  
[IPCB\_FromTo Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_FromTo Interface)  
[IPCB\_Group](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Group)  
[IPCB\_LettersCache Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_LettersCache Interface)  
[IPCB\_LibComponent Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_LibComponent Interface)  
[IPCB\_Net Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Net Interface)  
[IPCB\_ObjectClass Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ObjectClass Interface)  
[IPCB\_Pad Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Pad Interface)  
[IPCB\_Pad2 Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Pad2 Interface)  
[IPCB\_Polygon Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Polygon Interface)  
[IPCB\_RectangularPrimitive Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RectangularPrimitive Interface)  
[IPCB\_Region Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Region Interface)  
[IPCB\_Text Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Text Interface)  
[IPCB\_Track Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Track Interface)  
[IPCB\_TTFontsCache Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_TTFontsCache Interface)  
[IPCB\_TTFontData Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_TTFontData Interface)  
[IPCB\_Via Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Via Interface)  
[IPCB\_Violation Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Violation Interface)  
[IPCB\_ContourPoint Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ContourPoint Interface)  
[IPCB\_Contour Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Contour Interface)  
[IPCB\_ContourMaker Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ContourMaker Interface)  
[Dimension Object Interfaces](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#Dimension Object Interfaces)

[IPCB\_Rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Rule)  
[IPCB\_AcuteAngle rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_AcuteAngle rule)  
[IPCB\_BrokenNetRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_BrokenNetRule rule)  
[IPCB\_ComponentClearanceConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ComponentClearanceConstraint rule)  
[IPCB\_ComponentRotationsRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ComponentRotationsRule rule)  
[IPCB\_ConfinementConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ConfinementConstraint rule)  
[IPCB\_ClearanceConstraint Rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ClearanceConstraint Rule)  
[IPCB\_DaisyChainStubLengthConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_DaisyChainStubLengthConstraint rule)  
[IPCB\_ DifferentialPairsRoutingRule Interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ DifferentialPairsRoutingRule Interface)  
[IPCB\_FanoutControlRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_FanoutControlRule rule)  
[IPCB\_LayerPairsRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_LayerPairsRule rule)  
[IPCB\_MatchedNetLengthsConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MatchedNetLengthsConstraint rule)  
[IPCB\_MaxMinHeightConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MaxMinHeightConstraint rule)  
[IPCB\_MaxMinHoleSizeConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MaxMinHoleSizeConstraint rule)  
[IPCB\_MaxMinWidthConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MaxMinWidthConstraint rule)  
[IPCB\_MaxMinLengthConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MaxMinLengthConstraint rule)  
[IPCB\_MinimumAnnularRing rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MinimumAnnularRing rule)  
[IPCB\_MaximumViaCountRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_MaximumViaCountRule rule)  
[IPCB\_NetsToIgnoreRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_NetsToIgnoreRule rule)  
[IPCB\_ParallelSegmentConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ParallelSegmentConstraint rule)  
[IPCB\_PasteMaskExpansionRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_PasteMaskExpansionRule rule)  
[IPCB\_PermittedLayersRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_PermittedLayersRule rule)  
[IPCB\_PowerPlaneClearanceRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_PowerPlaneClearanceRule rule)  
[IPCB\_PowerPlaneConnectStyleRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_PowerPlaneConnectStyleRule rule)  
[IPCB\_PolygonConnectStyleRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_PolygonConnectStyleRule rule)  
[IPCB\_RoutingCornerStyleRule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RoutingCornerStyleRule)  
[IPCB\_RoutingLayersRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RoutingLayersRule rule)  
[IPCB\_RoutingPriorityRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RoutingPriorityRule rule)  
[IPCB\_RoutingTopologyRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RoutingTopologyRule rule)  
[IPCB\_RoutingViaStyleRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RoutingViaStyleRule rule)  
[IPCB\_RuleSupplyNets rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_RuleSupplyNets rule)  
[IPCB\_ShortCircuitConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ShortCircuitConstraint rule)  
[IPCB\_SMDNeckDownConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_SMDNeckDownConstraint rule)  
[IPCB\_SMDToCornerConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_SMDToCornerConstraint rule)  
[IPCB\_SMDToPlaneConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_SMDToPlaneConstraint rule)  
[IPCB\_SolderMaskExpansionRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_SolderMaskExpansionRule rule)  
[IPCB\_TestPointStyleRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_TestPointStyleRule rule)  
[IPCB\_TestPointUsage rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_TestPointUsage rule)  
[IPCB\_UnConnectedPinRule rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_UnConnectedPinRule rule)  
[IPCB\_ViasUnderSMDConstraint rule](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ViasUnderSMDConstraint rule)  
[Signal Integrity Design Rules](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#Signal Integrity Design Rules)

[IPCB\_AbstractIterator](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_AbstractIterator)  
[IPCB\_BoardIterator](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_BoardIterator)  
[IPCB\_LibraryIterator](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_LibraryIterator)  
[IPCB\_SpatialIterator](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_SpatialIterator)  
[IPCB\_GroupIterator](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_GroupIterator)

<a id="PCB_Design_Objects_Interfaces"></a>__PCB Design Objects Interfaces __

A PCB design object on a PCB document is represented by its interface\. An interface represents an existing object in memory and its properties and methods can be invoked\.

A PCB design object is basically a primitive or a group object\. A primitive can be a track or an arc object\. A group object is an object that is composed of child objects\. For example a board outline or a component is a group object\.  
Since many design objects are descended from ancestor interfaces and thus the ancestor methods and properties are also available to use\.

For example the IPCB\_Text interface is inherited from an immediate IPCB\_RectangularPrimitive interface and in turn inherited from the IPCB\_Primitive interface\. If you check the IPCB\_Text entry in this document you will see the following information:  
__The IPCB\_Text Interface hierarchy is as follows:__  
IPCB\_Primitive  
IPCB\_RectangularPrimitive  
IPCB\_Text  
and so on\.

This PCB Design Objects section is broken up into several categories — Primitives, Dimensions, Group Objects and Rectangular Objects:

- Primitives include arcs, embedded objects, fills, fromtos, pads, nets, tracks, vias, violations, object classes and connections\.
- Dimensions include Linear, Angular, Radial, Leader, Datum, Baseline, Center, Linear Diameter and Radial Diameter objects
- Group objects include board outlines, coordinates, components, polygons, library components \(footprints\) and nets\.
- Rectangular objects include text objects\.

__See also__  
[IPCB\_Primitive interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Primitive Interface)  
[IPCB\_Group interface](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Group)  
[IPCB\_Arc](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Arc Interface)  
[IPCB\_ObjectClass](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_ObjectClass Interface)  
[IPCB\_Pad](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Pad Interface)  
[IPCB\_Via](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Via Interface)  
[IPCB\_Track](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Track Interface)  
[IPCB\_Embedded](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Embedded Interface)  
[IPCB\_Violation](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Violation Interface)  
[IPCB\_Text](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Text Interface)  
[IPCB\_Fill](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Fill)  
[IPCB\_Coordinate](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Coordinate)  
[IPCB\_Dimension](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#Dimension Object Interfaces)  
[IPCB\_Component](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Component Interface)  
[IPCB\_Polygon](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Polygon Interface)  
[IPCB\_Net](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_Net Interface)  
[IPCB\_LibComponent](file:///D:\System_Files\Documents\!AD19\peixun\%E5%BC%A0%E5%A4%A9%E5%81%A5\%E7%A8%8B%E5%BA%8F\Altium%20Designer%20Script\Altium%20Designer%2021%20%E8%84%9A%E6%9C%AC\%E7%BA%A6%E5%AE%9A%E4%B8%8E%E7%BB%84%E6%88%90\!%E5%AD%98%E6%A1%A3\PCB%20API%20Design%20Objects%20Interfaces%20_%20Altium%20Designer%2021,%2020.2%20and%2020.1%20Technical%20Documentation.htm#IPCB_LibComponent Interface)

<a id="IPCB_Primitive_Interface"></a>__IPCB\_Primitive Interface__

__Overview__  
The __IPCB\_Primitive__ interface is the ancestor interface object for all other PCB interface objects and therefore the methods and properties declared in the __IPCB\_Primitive__ interface are also declared in the descendant interfaces\.

__Notes__  
Every PCB object has an unique object address stored in a PCB design database for that document this object resides on\. Each PCB object address has the __TPCBObjectHandle__ type\.  
Every existing PCB design object on a PCB document has the Board owner which represents the specific board document\.  
Each existing PCB design object on a PCB document has Query Rule Properties which can be queried\.  
A primitive has a bounding rectangle which encapsulates the region of the primitive\. There are two other bounding rectangles which are for selection and for painting \(refreshing and updating\)\.

__IPCB\_Primitive methods__  
GetState\_Board  
GetState\_ObjectId  
GetState\_Layer  
GetState\_Selected  
SetState\_Selected  
GetState\_IsPreRoute  
SetState\_IsPreRoute  
GetState\_InSelectionMemory  
SetState\_InSelectionMemory  
GetState\_PadCacheRobotFlag  
SetState\_PadCacheRobotFlag  
GetState\_Enabled  
SetState\_Enabled  
GetState\_Enabled\_Direct  
SetState\_Enabled\_Direct  
GetState\_Enabled\_vNet  
SetState\_Enabled\_vNet  
GetState\_Enabled\_vPolygon  
SetState\_Enabled\_vPolygon  
GetState\_Enabled\_vComponent  
SetState\_Enabled\_vComponent  
GetState\_Enabled\_vCoordinate  
SetState\_Enabled\_vCoordinate  
GetState\_Enabled\_vDimension  
SetState\_Enabled\_vDimension  
GetState\_Used  
SetState\_Used  
GetState\_DRCError  
SetState\_DRCError  
GetState\_MiscFlag1  
SetState\_MiscFlag1  
GetState\_MiscFlag2  
SetState\_MiscFlag2  
GetState\_MiscFlag3  
SetState\_MiscFlag3  
GetState\_EnableDraw  
SetState\_EnableDraw  
GetState\_Moveable  
SetState\_Moveable  
GetState\_UserRouted  
SetState\_UserRouted  
GetState\_TearDrop  
SetState\_TearDrop  
GetState\_IsTenting  
SetState\_IsTenting  
GetState\_IsTenting\_Top  
SetState\_IsTenting\_Top  
GetState\_IsTenting\_Bottom  
SetState\_IsTenting\_Bottom  
GetState\_IsTestPoint\_Top  
SetState\_IsTestPoint\_Top  
GetState\_IsTestPoint\_Bottom  
SetState\_IsTestPoint\_Bottom  
GetState\_IsKeepout  
SetState\_IsKeepout  
GetState\_AllowGlobalEdit  
SetState\_AllowGlobalEdit  
GetState\_PolygonOutline  
SetState\_PolygonOutline  
GetState\_InBoard  
SetState\_InBoard  
GetState\_InPolygon  
SetState\_InPolygon  
GetState\_InComponent  
SetState\_InComponent  
GetState\_InNet  
SetState\_InNet  
GetState\_InCoordinate  
SetState\_InCoordinate  
GetState\_InDimension  
SetState\_InDimension  
GetState\_IsElectricalPrim  
SetState\_Board  
SetState\_Layer  
GetState\_ObjectIDString  
GetState\_Identifier  
GetState\_DescriptorString  
GetState\_DetailString  
GetState\_Index  
SetState\_Index  

GetState\_UnionIndex  
SetState\_UnionIndex  

GetState\_PowerPlaneConnectStyle  
GetState\_ReliefConductorWidth  
GetState\_ReliefEntries  
GetState\_ReliefAirGap  
GetState\_PasteMaskExpansion  
GetState\_SolderMaskExpansion  
GetState\_PowerPlaneClearance  
GetState\_PowerPlaneReliefExpansion  
GetState\_Net  
GetState\_Component  
GetState\_Polygon  
GetState\_Coordinate  
GetState\_Dimension  
GetState\_ViewableObjectID  
SetState\_Net  
SetState\_Component  
SetState\_Polygon  
SetState\_Coordinate  
SetState\_Dimension  

I\_ObjectAddress  
BoundingRectangle  
BoundingRectangleForSelection  
BoundingRectangleForPainting  
IsHidden  
IsFreePrimitive  
IsSaveable  
AddPCBObject  
RemovePCBObject  

MoveByXY  
MoveToXY  
RotateBy  
FlipXY  
Mirror  
SwapLayerPairs  
GraphicallyInvalidate  

BeginModify  
EndModify  
CancelModify  

Export\_ToParameters  
RequiredParamterSpace

__IPCB\_Primitive properties__  
Board  
ObjectId  
Layer  
Index  
Selected  
IsPreRoute  
InSelectionMemory  
PadCacheRobotFlag  
Enabled  
Enabled\_Direct  
Enabled\_vNet  
Enabled\_vPolygon  
Enabled\_vComponent  
Enabled\_vCoordinate  
Enabled\_vDimension  
Used  
DRCError  
MiscFlag1  
MiscFlag2  
MiscFlag3  
EnableDraw  
Moveable  
UserRouted  
TearDrop  
IsTenting  
IsTenting\_Top  
IsTenting\_Bottom  
IsTestpoint\_Top  
IsTestpoint\_Bottom  
IsKeepout  
AllowGlobalEdit  
PolygonOutline  
InBoard  
InPolygon  
InComponent  
InNet  
InCoordinate  
InDimension  
IsElectricalPrim  
ObjectIDString  
Identifier  
Descriptor  
Detail  
PowerPlaneConnectStyle  
ReliefConductorWidth  
ReliefEntries  
ReliefAirGap  
PasteMaskExpansion  
SolderMaskExpansion  
PowerPlaneClearance  
PowerPlaneReliefExpansion  
Net  
Component  
Polygon  
Coordinate  
Dimension  
ViewableObjectID  
UnionIndex

__See also__  
PCB Design Objects

__Methods__

__BeginModify method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure BeginModify;  
__Description__  
__Example__  

__See also__  
IPCB\_Primitive interface

__BoundingRectangle method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function BoundingRectangle : TCoordRect;  
__Description__  
This function returns the coordinates of the bounding rectangle that encapsulates the design object on a PCB document\. There are other two bounding rectangle methods\.  
__Example__

01

Var

02

    R : TCoordRect;

03

Begin

04

    // check for comment / name objects

05

    If P\.ObjectId <> eTextObject Then

06

    Begin

07

        R := P\.BoundingRectangle;

08

        If R\.left   < MinX Then MinX := R\.left;

09

        If R\.bottom < MinY Then MinY := R\.bottom;

10

        If R\.right  > MaxX Then MaxX := R\.right;

11

        If R\.top    > MaxY Then MaxY := R\.top;

12

    End;

13

End;

__See also__  
IPCB\_Primitive interface  
TCoordRect type  
BoundingRectangle script from \\Examples\\Scripts\\Delphiscript Scripts\\Pcb\\ folder\.

__BoundingRectangleForSelection method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function BoundingRectangleForSelection : TCoordRect;  
__Description__  
The bounding rectangle of a design object used for selection is a bit bigger than the bounding rectangle of a design object itself\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__BoundingRectangleForPainting method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function BoundingRectangleForPainting : TCoordRect;  
__Description__  
The bounding rectangle of a design object for painting is potentially the largest of all bounding rectangles because for example a component can have comment and designator objects as well\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__CancelModify method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure CancelModify;  
__Description__  
__Example__  

__See also__  
IPCB\_Primitive interface

__EndModify method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure EndModify;  
__Description__  
__Example__  

__See also__  
IPCB\_Primitive interface

__FlipXY method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure FlipXY \(Axis : TCoord;MirrOp : TMirrorOperation\);  
__Description__  
This procedure flips the object about the axis depending on Axis and MirrOp parameters\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TMirrorOperation type

__GraphicallyInvalidate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure GraphicallyInvalidate;  
__Description__  
This procedure renders the object graphically invalidate which forces a system graphical update /refresh on the PCB document\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__I\_ObjectAddress method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
This function returns the true pointer value of the object interface of a design object\.  
Note  
The IPCB\_ServerInterface\.__SendMessageToRobots__ method needs the __I\_ObjectAddress__ parameter which is the handle of a design object\.  
__Example__

1

//Notify PCB that the fill object is going to be changed\.

2

PCBServer\.SendMessageToRobots\(

3

        Fill\.I\_ObjectAddress, 

4

        c\_Broadcast, 

5

        PCBM\_BeginModify , 

6

        c\_NoEventData\);

__See also__  
IPCB\_Primitive interface

__IsFreePrimitive method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function IsFreePrimitive : Boolean;  
__Description__  
This function determines whether the object is a free primitive \(not connected to a net\) or just a standalone object\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsHidden method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function IsHidden : Boolean;  
__Description__  
This function determines whether this object is hidden from view or not\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__IsSaveable method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function IsSaveable \(AVer : TAdvPCBFileFormatVersion\) : Boolean;  
__Description__  
This function determines whether this particular object can be saved in a specified file format version according to the __TAdvPCBFileFormatVersion__ type\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TAdvPCBFileFormatVersion type

__Mirror method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure Mirror \(Axis : TCoord;MirrOp : TMirrorOperation\);  
__Description__  
This procedure mirrors the design object across the axis depending on the mirror operation\.  
__Example__  
__See also__  
IPCB\_Primitive interface  
TMirrorOperation type

__MoveByXY method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure MoveByXY \(AX, AY : TCoord\);  
__Description__  
This procedure moves the design object by an offset in horizontal and vertical directions specified by the AX and AY parameters\.  
__Example__

1

//Move the object by a specified offset

2

XStep := DistanceStep \* Cos\(AngleStep\);

3

YStep := DistanceStep \* Sin\(AngleStep\);

4

PcbObject\.MoveByXY\(XStep,YStep\);

__See also__  
IPCB\_Primitive interface

__MoveToXY method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure MoveToXY \(AX, AY : TCoord\);  
__Description__  
This procedure moves the design object to a new location specified by the AX and AY parameters\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__RotateBy method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure RotateBy \(Angle : TAngle\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SwapLayerPairs method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SwapLayerPairs;  
__Description__  
This procedure swaps the current layer pair that the PCB design object \(vias and pads only\) has\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState and SetState Methods__

__GetState\_AllowGlobalEdit method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_AllowGlobalEdit : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Board method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Board : IPCB\_Board;  
__Description__  
The Board property determines the PCB document that the object itself is associated with\. This method is used by the Board property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Component method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Component : IPCB\_Component;  
__Description__  
This property determines whether the object itself is associated with the component or not\. This method retrieves the Component and is used in the Component property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Coordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Coordinate : IPCB\_Coordinate;  
__Description__  
This property determines whether the object itself is associated with the coordinate object or not\. This method retrieves the coordinate object and is used in the Coordinate property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_DescriptorString method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_DescriptorString : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_DetailString method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_DetailString : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Dimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Dimension : IPCB\_Dimension;  
__Description__  
This property determines whether the object itself is associated with the dimension object or not\. This method retrieves the Dimension and is used in the Dimension property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_EnableDraw method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_EnableDraw : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Identifier method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Identifier : TPCBString;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InBoard method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InBoard : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InComponent method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InComponent : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InCoordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InCoordinate : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Index method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Index : Word;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InDimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InDimension : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_vDimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_vDimension : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InNet method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InNet : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_vPolygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_vPolygon : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_vNet method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_vNet : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_DRCError method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_DRCError : Boolean;  
__Description__  
The DRCError property determines whether the object is affected by the Design Rule Checker and thus if the object breaks one of the design rules, the DRCError is true\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_Direct method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_Direct : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_vComponent method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_vComponent : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Enabled\_vCoordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Enabled\_vCoordinate : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InPolygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InPolygon : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_InSelectionMemory method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_InSelectionMemory \(Index : Integer\) : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsElectricalPrim method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsElectricalPrim : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsTenting method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsTenting : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsKeepout method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsKeepout : Boolean;  
__Description__  
The keepout layer generally defines areas on the PCB document that you don't want automatically or manually routed, and this can include clearance areas around mounting hole pads or high voltage components for example\.  
This function determines whether the object itself is used for the keep out boundary\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Moveable method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Moveable : Boolean;  
__Description__  
This method determines whether this design object can be moved or not \(by the autorouter for example\)\.  
This method is used by the Moveable property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsTenting\_Bottom method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsTenting\_Bottom : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsTenting\_Top method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsTenting\_Top : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsTestPoint\_Bottom method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsTestPoint\_Bottom : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsTestPoint\_Top method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsTestPoint\_Top : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Layer method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Layer : TLayer;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_MiscFlag1 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_MiscFlag1 : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_MiscFlag3 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_MiscFlag3 : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Net method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Net : IPCB\_Net;  
__Description__  
The net property of an object denotes it has an electrical property, meaning it is connected from one node to another\. The method fetches the net of an object \(if it has one\)\.  
This method is used for the Net property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_MiscFlag2 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_MiscFlag2 : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_IsPreRoute method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_IsPreRoute : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ReliefEntries method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ReliefEntries : Integer;  
__Description__  
This method retrieves the number of relief entries for a pad/via object\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PasteMaskExpansion method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PasteMaskExpansion : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Polygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Polygon : IPCB\_Polygon;  
__Description__  
This function retrieves the IPCB\_Polygon interface that the design object primitive is associated with\. For example, a polygon may contain arcs and tracks, and when you only have the arc, you can retreive the polygon the arc is associated with\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PolygonOutline method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PolygonOutline : Boolean;  
__Description__  
This function determines whether the design object primitive is part of the polygon outline or not\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PowerPlaneClearance method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PowerPlaneClearance : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PowerPlaneConnectStyle method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PowerPlaneConnectStyle : TPlaneConnectStyle;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PowerPlaneReliefExpansion method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PowerPlaneReliefExpansion : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ObjectIDString method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ObjectIDString : TPCBString;  
__Description__  
This __ObjectIDString__ property returns the Object Id string\. For example eTrackObject type will yield a Track string\.  
The method returns a object id string for the associated object and is used in the ObjectIDString property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ReliefConductorWidth method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ReliefConductorWidth : TCoord;  
__Description__  
This method retrieves the relief conductor width of a pad or via object as a TCoord value\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ObjectId method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ObjectId : TObjectId;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Selected method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Selected : Boolean;  
__Description__  
This method determines whether this object is selected or not on the PCB document\. This method is used by the Selected property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_SolderMaskExpansion method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_SolderMaskExpansion : TCoord;  
__Description__  
The solder mask expansion property determines the shape that is created on the solder mask layer at each pad and via site\. This shape is expanded or contracted radially by the amount specified by this rule\. This property over\-rides the solder mask expansion design rule\.  
This method is used for the SolderMaskExpansion property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_TearDrop method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_TearDrop : Boolean;  
__Description__  
This method determines whether the PCB object \(an arc or track object\) is used for as a tear drop\.  
This TearDrop property is supported by the GetState\_TearDrop and SetState\_TearDrop methods\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_Used method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_Used : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ReliefAirGap method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ReliefAirGap : TCoord;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_PadCacheRobotFlag method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_PadCacheRobotFlag : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_UserRouted method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_UserRouted : Boolean;  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__GetState\_ViewableObjectID method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Function GetState\_ViewableObjectID : TViewableObjectID;  
__Description__  
The property determines the ViewableObjectID of the design object\. The TViewableObjectID type is a more descriptive ID of a design object  than the TObjectID type\.  
For example any type of dimension object is a eDimension type according to the TObjectID but could be one of the eViewableObject\_LinearDimension\.\.\.eViewableObject\_RadialDiameterDimension value\.  
This function returns the TViewableObjectID and is used in the ViewableObjectID property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InComponent method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InComponent \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_Direct method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_Direct \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_vComponent method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_vComponent \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_vCoordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_vCoordinate\(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_vDimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_vDimension \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_vNet method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_vNet \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled\_vPolygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled\_vPolygon \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_DRCError method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_DRCError \(Value : Boolean\);  
__Description__  
The DRCError property determines whether the object is affected by the Design Rule Checker and thus if the object breaks one of the design rules, the DRCError property is true\. This method is used in the DRCError property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InBoard method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InBoard \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Dimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Dimension \(Value : IPCB\_Dimension\);  
__Description__  
This property determines whether the object itself is associated with the dimension object or not\. This method sets the dimension object and is used in the Dimension property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_EnableDraw method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_EnableDraw \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Enabled method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Enabled \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_AllowGlobalEdit method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_AllowGlobalEdit \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Board method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Board \(ABoard : IPCB\_Board\);  
__Description__  
The Board property determines the PCB document that the object itself is associated with\. This method sets the PCB document that the object is associated with and is used in the Board property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Component method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Component \(Value : IPCB\_Component\);  
__Description__  
This property determines whether the object itself is associated with the component or not\. This method sets the Component and is used in the Component property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Coordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Coordinate \(Value : IPCB\_Coordinate\);  
__Description__  
This property determines whether the object itself is associated with the coordinate object or not\. This method retrieves the Coordinate object and is used in the Coordinate property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InDimension method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InDimension \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InCoordinate method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InCoordinate \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InNet method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InNet \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Index method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Index \(AIndex : Word\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Layer method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Layer \(ALayer : TLayer\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InPolygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InPolygon \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_InSelectionMemory method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_InSelectionMemory \(Index : Integer;Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsKeepout method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsKeepout \(Value : Boolean\);  
__Description__  
The keepout layer generally defines areas on the PCB document that you don't want automatically or manually routed, and this can include clearance areas around mounting hole pads or high voltage components for example\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsPreRoute method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsPreRoute \(B : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsTenting method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsTenting \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsTenting\_Bottom method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsTenting\_Bottom \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsTenting\_Top method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsTenting\_Top \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsTestPoint\_Top method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsTestPoint\_Top \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_MiscFlag1 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_MiscFlag1 \(Value : Boolean\);  
__Description__  
This method sets a boolean value to the MiscFlag1 field and can be used for custom purposes\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_MiscFlag2 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_MiscFlag2 \(Value : Boolean\);  
__Description__  
This method sets a boolean value to the MiscFlag2 field and can be used for custom purposes\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_IsTestPoint\_Bottom method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_IsTestPoint\_Bottom \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_UserRouted method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_UserRouted \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_MiscFlag3 method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_MiscFlag3 \(Value : Boolean\);  
__Description__  
This method sets a boolean value to the MiscFlag3 field and can be used for custom purposes\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Moveable method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Moveable \(Value : Boolean\);  
__Description__  
This method sets whether this design object can be moved or not \(by the autorouter for example\)\.  
This method is used by the Moveable property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Net method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Net \(Value : IPCB\_Net\);  
__Description__  
The net property of an object denotes it has an electrical property, meaning it is connected from one node to another\. The method sets the valid net to an object\.  
This method is used for the Net property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_PadCacheRobotFlag method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_PadCacheRobotFlag \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Polygon method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Polygon \(Value : IPCB\_Polygon\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_PolygonOutline method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_PolygonOutline \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Selected method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Selected \(B : Boolean\);  
__Description__  
This method determines whether this object is selected or not on the PCB document by passing in a boolean parameter\.  
This method  is used by the Selected property\.  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_Used method__

\(IPCB\_Primitive interface\)  
__Syntax__  
Procedure SetState\_Used \(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IPCB\_Primitive interface

__SetState\_TearDrop method__