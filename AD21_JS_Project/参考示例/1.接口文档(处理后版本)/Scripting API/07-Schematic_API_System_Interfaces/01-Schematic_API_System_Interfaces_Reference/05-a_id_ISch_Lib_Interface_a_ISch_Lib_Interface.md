### <a id="ISch_Lib_Interface"></a>ISch\_Lib Interface

__Overview__  
This interface represents an existing library document open in Altium Designer\. A library is composed of library pages and each page represents the symbol \(schematic library component\)\.

- You can modify or set the document's preference settings\.
- You can invoke the ChooseLocationInteractively or ChooseRectangleInteractively methods to obtain coordinates from the Schematic sheet or library sheet\.
- You can check whether objects exist on a particular point on a schematic or library document\.
- You can iterate design objects in a library document, with the library iterator\. This iterator is created by the SchLibIterator\_Create function\.
- You can invoke the LibIsEmpty method to check if the library is empty \(ie no symbols in the library\) or not\.

__Notes__  
Due to the nature of a library document, all symbols \(library components\) are displayed on their library pages, so you iterate through the library to fetch symbols\.

The ISch\_Lib interface hierarchy is as follows;  
ISch\_BasicContainer  
    ISch\_GraphicalObject  
        ISch\_ParameterizedGroup  
            ISch\_Document  
                ISch\_Lib

__ISch\_Lib methods__  
AddSchComponent  
LibIsEmpty  
RemoveSchComponent  
Sch\_LibraryRuleChecker\_Create  
Sch\_LibraryRuleChecker\_Destroy  
SchLibIterator\_Create  
TransferComponentsPrimitivesBackFromEditor  
TransferComponentsPrimitivesToEditor  
GetState\_Current\_SchComponent  
GetState\_CurrentSchComponentDisplayMode  
GetState\_CurrentSchComponentPartId  
GetState\_Description  
GetState\_ShowHiddenPins  
SetState\_Current\_SchComponent  
SetState\_CurrentSchComponentAddDisplayMode  
SetState\_CurrentSchComponentAddPart  
SetState\_CurrentSchComponentDisplayMode  
SetState\_CurrentSchComponentPartId  
SetState\_CurrentSchComponentRemoveDisplayMode  
SetState\_CurrentSchComponentRemovePart  
SetState\_Description  
SetState\_ShowHiddenPins

__ISch\_Lib properties__  
CurrentSchComponent  
Description  
ShowHiddenPins

__See also__  
ISch\_Iterator interface  
ILibCompInfoReader interface  
IComponentINfo interface

#### ISch\_Lib Methods

##### AddSchComponent method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure AddSchComponent \(Const AComponent : ISch\_Component\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### LibIsEmpty method

\(ISch\_Lib interface\)  
__Syntax__  
Function LibIsEmpty : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### SchLibIterator\_Create method

\(ISch\_Lib interface\)  
__Syntax__  
Function SchLibIterator\_Create : ISch\_Iterator;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### RemoveSchComponent method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure RemoveSchComponent\(Const AComponent : ISch\_Component\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### Sch\_LibraryRuleChecker\_Create method

\(ISch\_Lib interface\)  
__Syntax__  
Function Sch\_LibraryRuleChecker\_Create : ISch\_LibraryRuleChecker;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### Sch\_LibraryRuleChecker\_Destroy method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure Sch\_LibraryRuleChecker\_Destroy \(Var ARuleChecker : ISch\_LibraryRuleChecker\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### TransferComponentsPrimitivesToEditor method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure TransferComponentsPrimitivesToEditor;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### TransferComponentsPrimitivesBackFromEditor method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure TransferComponentsPrimitivesBackFromEditor;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### GetState\_Current\_SchComponent method

\(ISch\_Lib interface\)  
__Syntax__  
Function GetState\_Current\_SchComponent: ISch\_Component;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### GetState\_CurrentSchComponentDisplayMode method

\(ISch\_Lib interface\)  
__Syntax__  
Function GetState\_CurrentSchComponentDisplayMode : TDisplayMode;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### GetState\_CurrentSchComponentPartId method

\(ISch\_Lib interface\)  
__Syntax__  
Function GetState\_CurrentSchComponentPartId : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### GetState\_____Description____ method

\(ISch\_Lib interface\)  
__Syntax__  
Function GetState\___Description__ : WideString;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### GetState\_ShowHiddenPins method

\(ISch\_Lib interface\)  
__Syntax__  
Function GetState\_ShowHiddenPins : Boolean;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### SetState\_Current\_SchComponent method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_Current\_SchComponent\(AValue : ISch\_Component\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### SetState\_CurrentSchComponentAddDisplayMode method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentAddDisplayMode;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### SetState\_CurrentSchComponentAddPart method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentAddPart;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### SetState\_CurrentSchComponentDisplayMode method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentDisplayMode\(ADisplayMode : TDisplayMode\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### SetState\_CurrentSchComponentPartId method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentPartId\(APartId : Integer\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### SetState\_CurrentSchComponentRemoveDisplayMode method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentRemoveDisplayMode;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### SetState\_CurrentSchComponentRemovePart method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_CurrentSchComponentRemovePart;  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### SetState\_____Description____ method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_Description \(AValue : WideString\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

##### SetState\_ShowHiddenPins method

\(ISch\_Lib interface\)  
__Syntax__  
Procedure SetState\_ShowHiddenPins \(AValue : Boolean\);  
__Description__  
__Example__  
__See also__  
ISch\_Lib interface

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