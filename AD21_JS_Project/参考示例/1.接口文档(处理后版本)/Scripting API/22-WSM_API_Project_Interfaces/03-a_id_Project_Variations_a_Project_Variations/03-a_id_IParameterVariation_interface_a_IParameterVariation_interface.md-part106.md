#### Previewable method

\(IModelType interface\)  
__Syntax__  
Function Previewable : Boolean;  
__Description__  
This function returns a boolean value for the model that can be previewable\. Simulation and Signal Integrity models are not highlightable or previewable and thus they don’t have viewable document kinds\.  
__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(BooleanToStr\(AModelType\.Previewable\)\);

__See also__  
IModelType interface  
Highlightable method  
ViewableDocKind method