#### IComponentPainterView Methods

##### SetComponent method

\(IComponentPainterView interface\)  
__Syntax__  
Procedure SetComponent\(LibReference, LibraryPath : WideString; APartIndex: Integer\);  
__Description__  
The SetComponent procedure sets the ComponentPainter object to display the specific part of a component from the library with the specified library path\. Note a component can be a multi\-part component and the first part is numbered 1 and so on\.  
A component painter object can also be set with the component's handle of ISch\_Component type\.  
__Example__

1

// display Schematic model on the 3d panel

2

// cLibraryPath\_Sch = 'C:\\Program Files\\Altium Designer\\Developer Kit\\Examples\\Sch\\View Models\\Xilinx CoolRunner II\.SchLib';

3

 

4

// cLibraryReference\_Sch = 'XC2C32\-3CP56C';

5

  

6

FExternalFormComponent\_Sch\.Visible := True;

7

ComponentPainter := FExternalForm\_Sch As IComponentPainterView;

8

ComponentPainter\.SetComponent\(cLibraryReference\_Sch, cLibraryPath\_Sch, 1\);

__See also__  
IComponentPainterView interface  
ViewModel server example in \\Developer Kit\\Examples\\Sch\\ViewModel folder of SDK installation\.

##### SetComponentByHandle method

\(IComponentPainterView interface\)  
__Syntax__  
Procedure SetComponentByHandle\(AHandle : ISch\_Component; APartIndex : Integer\);  
__Description__  
The SetComponentByHandle procedure sets the ComponentPainter object to display the specific part of a component\. Note a component can be a multi\-part component and the first part is numbered 1 and so on\.  
A component painter object can also be set with the full path to a library and its component\.  
__Example__

1

FExternalFormComponent\_Sch\.Visible := True;

2

ComponentPainter := FExternalForm\_Sch As IComponentPainterView;

3

ComponentPainter\.SetComponent\(ACompHandle, 1\);

__See also__  
IComponentPainterView interface  
CreateComponentPainter method  
SetComponent method  
IExternalForm interface in RT\_ClientServerInterface unit\.  
TExternalFormComponent in ExternalForms unit\.

##### HighLightComponentPins method

\(IComponentPainterView interface\)  
__Syntax__  
Procedure HighLightComponentPins\(APinNameList : WideString; AHighlightColor : TColor; ANonHighlightColor : TColor\);  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface

##### ShowSpecifiedPinsOnly method

\(IComponentPainterView interface\)  
__Syntax__  
Procedure ShowSpecifiedPinsOnly\(APinNameList : WideString\);  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface

##### ShowAllPins method

\(IComponentPainterView interface\)  
__Syntax__  
Procedure ShowAllPins;  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface

##### RenameSpecifiedPins method

\(IComponentPainterView interface\)  
__Syntax__  
Procedure RenameSpecifiedPins\(APinNamesParam : WideString\);  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface

##### HideComponentTextualDescriptions method

\(IComponentPainterView interface\)  
__Syntax__  
Procedure HideComponentTextualDescriptions;  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface

##### ShowPinsAsSelected method

\(IComponentPainterView interface\)  
__Syntax__  
Procedure ShowPinsAsSelected\(APinNameList : WideString\);  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface

##### RegisterListener method

\(IComponentPainterView interface\)  
__Syntax__  
Procedure RegisterListener  \(APinSelectionListener : IComponentPinSelectionListener\);  
__Description__  
__Example__  
   
__See also__  
IComponentPainterView interface

### <a id="IComponentPinSelectionListener_Interface"></a>IComponentPinSelectionListener Interface

__Overview__  
This is for internal use\.

__IComponentPinSelectionListener__ methods  
ComponentPinSelectionChanged

__IComponentPinSelectionListener__ properties

__See also__  
ISch\_ServerInterface interface  
IComopnentPainterView interface