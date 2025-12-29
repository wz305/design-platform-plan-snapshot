### <a id="IModelType_Methods"></a>IModelType Methods

#### Description method

\(IModelType interface\)  
__Syntax__  
Function Description : PChar;  
__Description__  
The function returns the description of the model type\.

__Model Type Description__

__Model Type Name__

__ServerName__

Simulation

SIM

Sim

Signal Integrity

SI

SignalIntegrity

Footprint

PCBLIB

PCB

PCB3D

PCB3DLIB

PCB3D

__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\)

5

ShowMessage\(AModelType\.Description\);

__See also__  
IModelType interface

#### Editor method

\(IModelType interface\)  
__Syntax__  
Function Editor : IModelEditor;  
__Description__  
This method returns the IModelEditor for this model type\.  
__See also__  
IModelType interface  
IModelEditor interface  
IModelType\.Description method

#### Name method

\(IModelType interface\)  
__Syntax__  
Function Name : PChar;  
__Description__  
The function returns the name of the model type supported by Altium Designer\. The following model names supported by Altium Designer are:

__Model Type Name__

__Model Type Description__

__ServerName__

SIM

Simulation

Sim

SI

Signal Integrity

SignalIntegrity

PCBLIB

Footprint

PCB

PCB3DLIB

PCB3D

PCB3D

__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(AModelType\.Name\);

__See also__  
IModelType interface

#### PortDescriptor method

\(IModelType interface\)  
__Syntax__  
Function PortDescriptor : PChar;  
__Description__  
The PortDescriptor  
__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(AModelType\.Descriptor\);

__See also__  
IModelType interface

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

#### ServerName method

\(IModelType interface\)  
__Syntax__  
Function ServerName : PChar;  
__Description__  
This function returns the Server Name associated with the model type\.

__ServerName__

__Model Type Name__

__Model Type Description__

Sim

SIM

Simulation

SignalIntegrity

SI

Signal Integrity

PCB

PCBLIB

Footprint

PCB3D

PCB3DLIB

PCB3D

__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(AModelType\.ServerName\);

__See also__  
IModelType interface

#### Highlightable method

\(IModelType interface\)  
__Syntax__  
Function Highlightable : Boolean;  
__Description__  
This function returns a boolean value for the model that can be highlightable \(viewable on a document kind\)\. Simulation and Signal Integrity models are not highlightable or previewable and thus they don’t have viewable document kinds\.  
__Example__

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

AModelType := IntMan\.GetModelType\(Libpath, AComponentIndex, AModelIndex\);

5

ShowMessage\(BooleanToStr\(AModelType\.Highlightable\)\);

__See also__  
IModelType interface  
ViewableDocKind method  
Previewable method

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