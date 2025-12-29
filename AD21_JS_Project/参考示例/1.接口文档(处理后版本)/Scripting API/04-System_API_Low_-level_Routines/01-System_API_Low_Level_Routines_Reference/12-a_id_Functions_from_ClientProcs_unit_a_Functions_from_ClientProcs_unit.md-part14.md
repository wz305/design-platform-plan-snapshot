#### Properties

##### Description property

\(ISch\_Lib interface\)  
__Syntax__  
Property Description : WideString Read GetState\_Description Write SetState\_Description;  
__Description__  
This property gets or sets the description of the library document\. This property is supported by its GetState\_Description and SetState\_Description methods\.  
__Example__  
__See also__  
ISch\_Lib interface

##### ShowHiddenPins property

\(ISch\_Lib interface\)  
__Syntax__  
Property ShowHiddenPins : Boolean Read GetState\_ShowHiddenPins Write SetState\_ShowHiddenPins;  
__Description__  
This property gets or sets the visible property of hidden pins of the component in the library document\. This property is supported by its GetState\_ShowHiddenPins and SetState\_ShowHiddenPins methods\.  
__Example__  
__See also__  
ISch\_Lib interface

##### CurrentSchComponent property

\(ISch\_Lib interface\)  
__Syntax__  
Property CurrentSchComponent : ISch\_Component Read GetState\_Current\_SchComponent Write SetState\_Current\_SchComponent;  
__Description__  
This property gets or sets the component as the current component in the library document\. This property is supported by its GetState\_CurrentSchComponent and SetState\_CurrentSchComponent methods\.  
__Example__  
__See also__  
ISch\_Lib interface

### <a id="ISch_BasicContainer_Interface"></a>ISch\_BasicContainer Interface

__Overview__  
The ISch\_BasicContainer interface represents as a parent object or a child object for a schematic object in Altium Designer\.

- A sheet symbol object for example is a parent object, and its child objects are sheet entries, thus to fetch the sheet entries, you would create an iterator for the sheet symbol and iterate for sheet entry objects\.
- A schematic document is a parent object as well thus you also create an iterator for this document and iterate for objects on this document\.

__Notes__  
ISch\_BasicContainer is the ancestor interface object for schematic object interfaces\.  
ISch\_BasicContainer is the ancestor interface object for ISch\_MapDefiner and ISch\_Implementation interfaces\.  
ISch\_Document is inherited from ISch\_BasicContainer and is a container for storing design objects and in turn each design object is inherited from the ISch\_BasicContainer interface\.  
ISch\_Iterator fetches design objects which are inherited from the ISch\_BasicContainer interface\.

__ISch\_BasicContainer methods__  
GetState\_ObjectId  
GetState\_SchBasicContainer  
GetState\_OwnerSchDocument  
GetState\_Text  
GetState\_IdentifierString  
GetState\_DescriptionString  
Setstate\_Default  
SetState\_Text  
I\_ObjectAddress  
AddSchObject  
AddAndPositionSchObject  
RemoveSchObject  
SchIterator\_Create  
SchIterator\_Destroy  
DeleteAll  
FreeAllContainedObjects  
Import\_FromUser  
Replicate

__ISch\_BasicContainer properties__  
Container  
ObjectId  
OwnerDocument

__See also__  
ISch\_GraphicalObject interface  
ISch\_Document interface  
ISch\_Implementation interface  
ISch\_MapDefiner interface