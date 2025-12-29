# <a id="Client_Enumerated_Types"></a>Client Enumerated Types

The enumerated types are used for many of the client/server interfaces and methods which are covered in this section\.


__Syntax__  
TCommandProc  = Procedure\(Const AContext : IServerDocumentView; AParameters : PChar\);


TDocumentsBarGrouping = \(dbgNone, dbgByDocKind, dbgByProject\);


__Syntax__  
TGetStateProc = Procedure\(Const AContext : IServerDocumentView; AParameters : PChar; Var Enabled, Checked, Visible : LongBool; Caption, ImageFile : PChar\); 


__Syntax__  
THighlightMethod = \(eHighlight\_Filter,eHighlight\_Zoom,eHighlight\_Select,eHighlight\_Graph,eHighlight\_Dim,eHighlight\_Thicken, eHighlight\_ZoomCursor\);


__Syntax__  
THighlightMethodSet = Set Of THighlightMethod;


TSnippetCreationMode = \(eSnippetCreationBySelection, eSnippetCreationByUnionIndex\);


__Syntax__  
TServerModuleFactory = Function \(Const AClient : IClient\) : IServerModule;

## 子章节

- [<a id="TCommandProc_procedure_type"></a>TCommandProc procedure type](01-a_id_TCommandProc_procedure_type_a_TCommandProc_procedure_type.md.md)
- [<a id="TDocumentsBarGrouping_type"></a>TDocumentsBarGrouping type](02-a_id_TDocumentsBarGrouping_type_a_TDocumentsBarGrouping_type.md.md)
- [<a id="TGetStateProc_procedure_type"></a>TGetStateProc procedure type](03-a_id_TGetStateProc_procedure_type_a_TGetStateProc_procedure_type.md.md)
- [<a id="THighlightMethod_type"></a>THighlightMethod type](04-a_id_THighlightMethod_type_a_THighlightMethod_type.md.md)
- [<a id="THighlightMethodSet_type"></a>THighlightMethodSet type](05-a_id_THighlightMethodSet_type_a_THighlightMethodSet_type.md.md)
- [<a id="TSnippetCreationMode_type"></a>TSnippetCreationMode type](06-a_id_TSnippetCreationMode_type_a_TSnippetCreationMode_type.md.md)
- [<a id="TServerModuleFactory_function_type"></a>TServerModuleFactory function type](07-a_id_TServerModuleFactory_function_type_a_TServerModuleFactory_function_type.md.md)
