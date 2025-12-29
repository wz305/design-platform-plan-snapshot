#### ViewableDocKind method

\(IModelType interface\)  
__Syntax__  
Function ViewableDocKind : PChar  
__Description__  
This function returns the name of the Document Kind that’s viewable \(related to the Highlightable method\)\. Simulation and Signal Integrity models are not highlightable and thus they don’t have document kinds\.  
__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(AModelType\.ViewableDocKind\);

__See also__  
IModelType interface  
Highlightable method  
Previewable method

 

## <a id="IServerModel_Interface"></a>IServerModel Interface 

__Overview__  
The IServerModel interface represents the model set up by the server to be used by the integrated library server\.

__IServerModel Methods and Properties Table__

__IServerModel methods__  
Name  
PortCount  
PortName  
AddPort  
CheckSchPins  
CheckModelPins

__IServerModel properties__  
PortNames

__See also__  
IModelEditor interface

### <a id="IServerModel_Methods"></a>IServerModel Methods