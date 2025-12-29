#### Justification functions

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
 

# Technical Reference \- PCB API

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Technical Reference \- PCB API for version 22](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-api)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Altium Designer API Reference](https://www.altium.com/documentation/altium-designer/altium-design-software-api-reference?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

The PCB Application Programming Interface \(API\) reference details the object interfaces for PCB objects such as PCB documents and PCB design objects\.

The Altium Designer scripting system implements a subset of the complete Altium Designer API and its Object Interfaces\. The [Altium DXP Developer](https://www.altium.com/en/developer), used for developing Altium Designer server Extensions, has access to the full Altium Designer API via a set of API SDK source units\.

The PCB API consists of the PCB Object model and the API functions\. The PCB Object Model part of the PCB API is made accessible by the PCB Editor\.

The PCB design objects and methods are available in all script languages supported by Altium Designer\. The PCB design objects are wrapped by their corresponding PCB interfaces which makes it possible to manipulate those objects by scripts and server code\.