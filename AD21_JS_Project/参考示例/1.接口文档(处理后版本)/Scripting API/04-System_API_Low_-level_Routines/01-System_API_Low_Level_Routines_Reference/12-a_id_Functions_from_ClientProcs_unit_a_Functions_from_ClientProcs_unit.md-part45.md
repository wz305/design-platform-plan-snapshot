#### Methods

##### SetState\_MouseMoveOverLocationHandler method

\(IDocumentPainterView interface\)  
__Syntax__  
Procedure SetState\_MouseMoveOverLocationHandler\(ALocationProcedure : TLocationProcedure\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface

##### SetState\_DocumentToPaint method

\(IDocumentPainterView interface\)  
__Syntax__  
Procedure SetState\_DocumentToPaint\(Const ADocument : ISch\_Document\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface

##### SetState\_DbleClickHandler method

\(IDocumentPainterView interface\)  
__Syntax__  
Procedure SetState\_DbleClickHandler \(ALocationProcedure : TLocationProcedure\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface

##### SetState\_ClickHandler method

\(IDocumentPainterView interface\)  
__Syntax__  
Procedure SetState\_ClickHandler \(ALocationProcedure : TLocationProcedure\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface

##### RefreshCurrentZoomWindow method

\(IDocumentPainterView interface\)  
__Syntax__  
Procedure RefreshCurrentZoomWindow;  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface

##### Refresh method

\(IDocumentPainterView interface\)  
__Syntax__  
Procedure Refresh;  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface

##### Redraw method

\(IDocumentPainterView interface\)  
__Syntax__  
Procedure Redraw \(Const AGraphicalObject : ISch\_GraphicalObject\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface

##### PaintSingleObject method

\(IDocumentPainterView interface\)  
__Syntax__  
Procedure PaintSingleObject \(Const AGraphicalObject : ISch\_GraphicalObject\);  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface

##### DrawCurrentZoomRectangle\_Invert method

\(IDocumentPainterView interface\)  
__Syntax__  
Procedure DrawCurrentZoomRectangle\_Invert;  
__Description__  
This is for internal use\.  
__Example__  
__See also__  
IDocumentPainterView interface

# Schematic API Component Mapping

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Schematic API Component Mapping for version 22](https://www.altium.com/documentation/altium-designer/schematic-api-component-mapping)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Schematic API](https://www.altium.com/documentation/altium-designer/technical-reference-schematic-api?version=21)

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.

## Schematic API: Component Mapping Interfaces Reference 

The Schematic API Component Mapping Interfaces reference includes the following content:

[ISch\_MapDefiner](https://www.altium.com/documentation/altium-designer/schematic-api-component-mapping?version=21#ISch_MapDefiner)  
[ISch\_ModelDatafileLink Interface](https://www.altium.com/documentation/altium-designer/schematic-api-component-mapping?version=21#ISch_ModelDatafileLink Interface)  
[ISch\_Implementation Interface](https://www.altium.com/documentation/altium-designer/schematic-api-component-mapping?version=21#ISch_Implementation Interface)

### <a id="ISch_MapDefiner"></a>ISch\_MapDefiner

__Overview__  
The ISch\_MapDefiner interface represents the object that is used to define a mapping between schematic pins of a schematic component and its model for example the associated PCB pad objects of the PCB component in the same PCB project\.

This interface is part of the ISch\_Implementation interface\. Each component can have a number of implementations \(models of the same type and/or different types as well\)\.

The ISch\_Implementation\.DefinerByInterfaceDesignator returns you theISch\_MapDefiner interface with the Designator string representing the component’s designator text string\.

__Notes__  
A model represents all the information needed for a component in a given domain, while a datafile entity \(or link\) is the only information which is in an external file\.

A model can be represented by external data sources called data file links\. For example, pins of a component can have links to different data files, as for signal integrity models\. We will consider each model type in respect to the data file links for the main editor servers supported in Altium Designer\.

For the PCB footprints, the model and the data file are both the same\.

With the simulation models, you can have a simulation model which is a 4ohm resistor for example, there is a simulation model but there is no information is coming from an external file, therefore, a no external file is needed for this as the resistor model is built from spice\. This is the case where you have a model with no data file entity\. Thus the parameters are used for these types of simulation models that don’t have data file links\.

With signal integrity models, it can have information required for each pin\. If we used IBIS datafiles, not the Altium Designer’s central database, then each signal integrity model would then have multiple data files, each one for each type of pin\.

The __ISch\_MapDefiner__ interface hierarchy is as follows;

__ISch\_MapDefiner methods__  
GetState\_Designator\_Implementation  
GetState\_Designator\_ImplementationCount  
GetState\_Designator\_Interface  
GetState\_Designators\_Implementation\_AsString  
GetState\_IsTrivial  
SetState\_AllFromString  
SetState\_Designator\_ImplementationAdd  
SetState\_Designator\_ImplementationClear  
SetState\_Designator\_Interface

__ISch\_MapDefiner properties__  
Designator\_Interface  
Designator\_ImplementationCount  
Designator\_Implementation  
Designator\_Implementations\_AsString  
IsTrivial

__See also__  
ISch\_BasicContainer interface  
ISch\_Component interface  
ISch\_Implementation interface