### <a id="IModelTypeManager_Properties"></a>IModelTypeManager Properties

#### ModelDatafileTypes property

\(IModelTypeManager interface\)  
__Syntax__  
Property ModelDatafileTypes\[AnIndex : Integer\] : IModelDatafileType Read ModelDatafileTypeAt;  
__Description__  
This property returns the data file types supported by Altium Designer\. First data file type starts at 0\. This property is supported by the ModelDataFileTypeAt method\.  
__Example__ 

01

Procedure ShowModelDatafileTypes;

02

Var

03

    ModelTypeMan      : IModelTypeManager;

04

    ModelDatafileType : ModelDatafileType;

05

    I                 : Integer;

06

Begin

07

    ModelTypeMan := ModelTypeManager;

08

    If ModelTypeMan = Nil Then Exit;

09

    //6 data file types

10

    For I := 0 To ModelTypeMan\.ModelDatafileTypeCount \- 1 do

11

    Begin

12

        ModelDatafileType := ModelTypeMan\.ModelDatafileTypes\[I\];

13

        ShowMessage\(ModelDatafileType\.FileKind \+ \#13 \+ ModelDatafileType\.Description\);

14

    End;

15

End;

__See also__  
IModelTypeManager interface  
IModelDatafileType interface  
ModelDatafileTypeCount method 

#### ModelTypes property

\(IModelTypeManager interface\)  
__Syntax__  
Property ModelTypes \[AnIndex : Integer\] : IModelType Read ModelTypeAt;  
__Description__  
This function returns the indexed model type\. First model type starts at 0\. This property is supported by the ModelTypeAt method\.  
__Example__ 

01

Procedure ShowModelsFromModelTypeManager;

02

Var

03

    ModelTypeMan : IModelTypeManager;

04

    I            : Integer;

05

Begin

06

    ModelTypeMan := ModelTypeManager;

07

    If ModelTypeMan = Nil Then Exit;

08

  

09

    For i := 0 To ModelTypeMan\.ModelTypeCount \-1 do

10

       ShowMessage\(ModelTypeMan\.ModelTypes\[i\]\.Name\);

11

End;

__See also__  
IModelTypeManager interface  
IModelType interface  
ModelTypeAt method