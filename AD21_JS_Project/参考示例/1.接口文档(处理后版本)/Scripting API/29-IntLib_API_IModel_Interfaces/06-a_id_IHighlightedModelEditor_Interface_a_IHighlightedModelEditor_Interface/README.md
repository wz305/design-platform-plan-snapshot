# <a id="IHighlightedModelEditor_Interface"></a>IHighlightedModelEditor Interface

__Overview__  
__IHighlightedModelEditor Methods and Properties Table__

__IHighlightedModelEditor methods__  
HighlightComponentPins  
ShowSpecifiedPinsOnly  
ShowPinsAsSelected  
DrawModel\_PinsSelected  
RegisterListener

__IHighlightedModelEditor properties__

__See also__  
IModelType interface



\(IHighlightedModelEditor interface\)  
__Syntax__  
Procedure HighlightComponentPins\(AExternalForm      : IExternalForm;  
                                 APinNameList       : WideString;  
                                 AHighlightColor    : TColor;  
                                 ANonHighlightColor : TColor\);  
__Description__  
__Example__  
__See also__  
IHighlightedModelEditor interface


\(IHighlightedModelEditor interface\)  
__Syntax__  
Procedure ShowSpecifiedPinsOnly \(AExternalForm      : IExternalForm;  
                                 APinNameList       : WideString\);  
__Description__  
__Example__  
__See also__  
IHighlightedModelEditor interface


\(IHighlightedModelEditor interface\)  
__Syntax__  
Procedure ShowPinsAsSelected\(AExternalForm      : IExternalForm;  
                             APinNameList       : WideString\);  
__Description__  
__Example__  
__See also__  
IHighlightedModelEditor interface


\(IHighlightedModelEditor interface\)  
__Syntax__  
Procedure DrawModel\_PinsSelected\(AExternalForm      : IExternalForm;  
                                 AModelName         : WideString;  
                                 ADataFilePath      : WideString;  
                                 APinNameList       : WideString\);  
__Description__  
__Example__  
__See also__  
IHighlightedModelEditor interface


\(IHighlightedModelEditor interface\)  
__Syntax__  
Procedure RegisterListener\(AExternalForm : IExternalForm;  
                           AListener     : IModelEditorSelectionListener\);  
__Description__  
__Example__  
__See also__  
IHighlightedModelEditor interface

## 子章节

- [<a id="IHighlightedModelEditor_Methods"></a>IHighlightedModelEditor Methods](01-a_id_IHighlightedModelEditor_Methods_a_IHighlightedModelEditor_Methods.md.md)
