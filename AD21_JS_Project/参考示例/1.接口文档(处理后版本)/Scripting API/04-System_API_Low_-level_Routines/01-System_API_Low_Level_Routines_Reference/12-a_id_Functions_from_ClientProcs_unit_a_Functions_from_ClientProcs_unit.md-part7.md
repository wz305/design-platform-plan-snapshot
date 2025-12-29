#### IConnectionsArray Properties

##### Connection property

\(IConnectionsArray interface\)  
__Syntax__  
Property Connection\[i : Integer\] : IConnection Read GetState\_Connection;  
__Description__  
__Example__

1

For J := 0 To TheBusConnections\.GetState\_ConnectionsCount \- 1 Do

2

Begin

3

    BusConnection := TheBusConnections\.GetState\_Connection\(J\); //IConnection

4

    If BusConnection <> Nil Then

5

    Begin

6

        // statements here

7

    End; 

8

End;

__See also__  
IConnectionsArray interface

##### ConnectionsCount property

\(IConnectionsArray interface\)  
__Syntax__  
Property ConnectionsCount : Integer Read GetState\_ConnectionsCount;  
__Description__  
__Example__

1

For J := 0 To TheBusConnections\.GetState\_ConnectionsCount \- 1 Do

2

Begin

3

    BusConnection := TheBusConnections\.GetState\_Connection\(J\); //IConnection

4

    If BusConnection <> Nil Then

5

    Begin

6

        // statements here

7

    End; 

8

End;

__See also__  
IConnectionsArray interface

### <a id="ISch_Document_Interface"></a>ISch\_Document Interface

__Overview__  
This interface is the immediate ancestor interface for ISch\_Sheet and ISch\_Lib interfaces\.

__Notes__

- You can modify or set the document's preference settings\.
- You can iterate design objects in a Schematic or library document, see ISch\_Iterator interface for details\.
- You can invoke the ChooseLocationInteractively or ChooseRectangleInteractively methods to obtain coordinates from the Schematic sheet or library sheet\.
- You can create a library from a project that has components
- You can check whether objects exist on a particular point on a schematic or library document\.

The ISch\_Document interface hierarchy is as follows;  
ISch\_BasicContainer  
    ISch\_GraphicalObject  
        ISch\_ParameterizedGroup  
            ISch\_Document

__ISch\_Document Methods and Properties Table__

__ISch\_Document methods__  
BoundingRectangle\_Selected  
ChooseLocationInteractively  
ChooseRectangleInteractively  
CountContextMenuObjects  
CreateHitTest  
CreateLibraryFromProject  
Graphical\_VirtualRectangle  
LockViewUpdate  
ObjectReferenceZone  
PlaceSchComponent  
PopupMenuHitTest  
RedrawToDC  
RegisterSchObjectInContainer  
UnLockViewUpdate  
UnregisterAndFreeAllConnectionLines  
UnRegisterSchObjectFromContainer  
UpdateDocumentProperties  
GetState\_BorderOn  
GetState\_CustomMarginWidth  
GetState\_CustomSheetStyle  
GetState\_CustomX  
GetState\_CustomXZones  
GetState\_CustomY  
GetState\_CustomYZones  
GetState\_DocumentBorderStyle  
GetState\_DocumentName  
GetState\_HotSpotGridOn  
GetState\_HotSpotGridSize  
GetState\_InternalTolerance  
GetState\_LoadFormat  
GetState\_ReferenceZonesOn  
GetState\_SheetMarginWidth  
GetState\_SheetSizeX  
GetState\_SheetSizeY  
GetState\_SheetStyle  
GetState\_SheetZonesX  
GetState\_SheetZonesY  
GetState\_ShowTemplateGraphics  
GetState\_SnapGridOn  
GetState\_SnapGridSize  
GetState\_SystemFont  
GetState\_TemplateFileName  
GetState\_TitleBlockOn  
GetState\_Unit  
GetState\_UnitSystem  
GetState\_UseCustomSheet  
GetState\_VisibleGridOn  
GetState\_VisibleGridSize  
GetState\_WorkspaceOrientation  
SetState\_BorderOn  
SetState\_CustomMarginWidth  
SetState\_CustomSheetStyle  
SetState\_CustomX  
SetState\_CustomXZones  
SetState\_CustomY  
SetState\_CustomYZones  
SetState\_DocumentBorderStyle  
SetState\_HotSpotGridOn  
SetState\_HotSpotGridSize  
SetState\_LoadFormat  
SetState\_ReferenceZonesOn  
SetState\_SheetMarginWidth  
SetState\_SheetSizeX  
SetState\_SheetSizeY  
SetState\_SheetStyle  
SetState\_SheetZonesX  
SetState\_SheetZonesY  
SetState\_ShowTemplateGraphics  
SetState\_SnapGridOn  
SetState\_SnapGridSize  
SetState\_SystemFont  
SetState\_TemplateFileName  
SetState\_TitleBlockOn  
SetState\_Unit  
SetState\_UseCustomSheet  
SetState\_VisibleGridOn  
SetState\_VisibleGridSize  
SetState\_WorkspaceOrientation

__ISch\_Document properties__  
BorderOn  
CustomMarginWidth  
CustomSheetStyle  
CustomX  
CustomXZones  
CustomY  
CustomYZones  
DisplayUnit  
DocumentBorderStyle  
DocumentName  
HotSpotGridOn  
HotSpotGridSize  
InternalTolerance  
LoadFormat  
ReferenceZonesOn  
SheetMarginWidth  
SheetSizeX  
SheetSizeY  
SheetStyle  
SheetZonesX  
SheetZonesY  
ShowTemplateGraphics  
SnapGridOn  
SnapGridSize  
SystemFont  
TemplateFileName  
TitleBlockOn  
UnitSystem  
UseCustomSheet  
VisibleGridOn  
VisibleGridSize  
WorkspaceOrientation

__See also__  
ISch\_Sheet interface  
ISch\_Lib interface