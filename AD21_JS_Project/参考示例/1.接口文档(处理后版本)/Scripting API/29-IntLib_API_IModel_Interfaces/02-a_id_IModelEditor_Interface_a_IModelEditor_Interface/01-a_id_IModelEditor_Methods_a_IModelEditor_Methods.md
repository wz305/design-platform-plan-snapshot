### <a id="IModelEditor_Methods"></a>IModelEditor Methods

#### CreateDatafile method

\(IModelEditor interface\)  
__Syntax__  
Function CreateDatafile \(ADatafilePath : PChar\) : IModelDatafile;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### CreateServerModel method

\(IModelEditor interface\)  
__Syntax__  
Function CreateServerModel \(AModel : IComponentImplementation\) : IServerModel;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### CrossProbeEntity method

\(IModelEditor interface\)  
__Syntax__  
Procedure CrossProbeEntity \(AEntityName : WideString;ADataFilePath : WideString\);  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### DrawModel method

\(IModelEditor interface\)  
__Syntax__  
Procedure DrawModel \(AExternalForm : IExternalForm;AModelName : PChar;ADataFilePath : PChar\);  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### DrawModelToMetaFile method

\(IModelEditor interface\)  
__Syntax__  
Procedure DrawModelToMetaFile \(Const AFileName : WideString;Const AModelName : WideString;Const ADataFilePath : WideString;APaintColorMode : TPaintColorMode;APaintScaleMode : TPaintScaleMode\);  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### EditModel method

\(IModelEditor interface\)  
__Syntax__  
Function EditModel \(SchModel : ISch\_Implementation; SchComp : ISch\_Component;IsLibrary : Boolean\) : Boolean;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### FinishedLibraryCompile method

\(IModelEditor interface\)  
__Syntax__  
Procedure FinishedLibraryCompile;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### GetEntityParameters method

\(IModelEditor interface\)  
__Syntax__  
Function GetEntityParameters \(AEntityName : WideString; ADataFilePath : WideString\) : WideString;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### GetExternalForm method

\(IModelEditor interface\)  
__Syntax__  
Function GetExternalForm : IExternalForm;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### PrepareModel method

\(IModelEditor interface\)  
__Syntax__  
Function PrepareModel \(AModel : IComponentImplementation\) : Boolean;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### StartingLibraryCompile method

\(IModelEditor interface\)  
__Syntax__  
Procedure StartingLibraryCompile;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

#### SetDefaultModelState method

\(IModelEditor interface\)  
__Syntax__  
Function SetDefaultModelState \(SchModel : ISch\_Implementation;SchComp : ISch\_Component;IsLibrary : Boolean\) : Boolean;  
__Description__  
__Example__  
__See also__  
IModelEditor interface