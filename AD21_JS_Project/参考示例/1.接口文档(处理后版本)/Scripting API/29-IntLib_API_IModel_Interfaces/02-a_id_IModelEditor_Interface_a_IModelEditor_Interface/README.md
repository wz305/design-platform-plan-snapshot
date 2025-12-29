# <a id="IModelEditor_Interface"></a>IModelEditor Interface

__Overview__  
The IModelEditor interface represents the Model Editor hosted by a server which normally has a dialog that displays data about the model properties in Altium Designer\. This IModelEditor interface is the front end for the actual implementation of a Model Editor for a specific model domain \(PCB, Signal Integrity and other model types\)\.

__IModelEditor Methods and Properties Table__

__IModelEditor methods__  
EditModel  
CreateDatafile  
StartingLibraryCompile  
FinishedLibraryCompile  
PrepareModel  
CreateServerModel  
GetExternalForm  
DrawModel  
GetEntityParameters  
SetDefaultModelState  
CrossProbeEntity  
DrawModelToMetaFile

__IModelEditor properties__



\(IModelEditor interface\)  
__Syntax__  
Function CreateDatafile \(ADatafilePath : PChar\) : IModelDatafile;  
__Description__  
__Example__  
__See also__  
IModelEditor interface


\(IModelEditor interface\)  
__Syntax__  
Function CreateServerModel \(AModel : IComponentImplementation\) : IServerModel;  
__Description__  
__Example__  
__See also__  
IModelEditor interface


\(IModelEditor interface\)  
__Syntax__  
Procedure CrossProbeEntity \(AEntityName : WideString;ADataFilePath : WideString\);  
__Description__  
__Example__  
__See also__  
IModelEditor interface


\(IModelEditor interface\)  
__Syntax__  
Procedure DrawModel \(AExternalForm : IExternalForm;AModelName : PChar;ADataFilePath : PChar\);  
__Description__  
__Example__  
__See also__  
IModelEditor interface


\(IModelEditor interface\)  
__Syntax__  
Procedure DrawModelToMetaFile \(Const AFileName : WideString;Const AModelName : WideString;Const ADataFilePath : WideString;APaintColorMode : TPaintColorMode;APaintScaleMode : TPaintScaleMode\);  
__Description__  
__Example__  
__See also__  
IModelEditor interface


\(IModelEditor interface\)  
__Syntax__  
Function EditModel \(SchModel : ISch\_Implementation; SchComp : ISch\_Component;IsLibrary : Boolean\) : Boolean;  
__Description__  
__Example__  
__See also__  
IModelEditor interface


\(IModelEditor interface\)  
__Syntax__  
Procedure FinishedLibraryCompile;  
__Description__  
__Example__  
__See also__  
IModelEditor interface


\(IModelEditor interface\)  
__Syntax__  
Function GetEntityParameters \(AEntityName : WideString; ADataFilePath : WideString\) : WideString;  
__Description__  
__Example__  
__See also__  
IModelEditor interface


\(IModelEditor interface\)  
__Syntax__  
Function GetExternalForm : IExternalForm;  
__Description__  
__Example__  
__See also__  
IModelEditor interface


\(IModelEditor interface\)  
__Syntax__  
Function PrepareModel \(AModel : IComponentImplementation\) : Boolean;  
__Description__  
__Example__  
__See also__  
IModelEditor interface


\(IModelEditor interface\)  
__Syntax__  
Procedure StartingLibraryCompile;  
__Description__  
__Example__  
__See also__  
IModelEditor interface


\(IModelEditor interface\)  
__Syntax__  
Function SetDefaultModelState \(SchModel : ISch\_Implementation;SchComp : ISch\_Component;IsLibrary : Boolean\) : Boolean;  
__Description__  
__Example__  
__See also__  
IModelEditor interface

## 子章节

- [<a id="IModelEditor_Methods"></a>IModelEditor Methods](01-a_id_IModelEditor_Methods_a_IModelEditor_Methods.md.md)
