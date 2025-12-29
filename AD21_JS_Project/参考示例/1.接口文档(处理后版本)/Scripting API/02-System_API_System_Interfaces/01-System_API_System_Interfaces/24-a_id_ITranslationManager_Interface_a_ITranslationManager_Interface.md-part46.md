#### ExistAnyWhere

__Declaration__  
Function ExistAnyWhere\(Var S : TDynamicString\) : TBoolean; Overload;  
Function ExistAnyWhere\(Var S : TString       \) : TBoolean; Overload;  
__Description__  
The ExistAnyWhere function returns a TBoolean value denoting whether the file exists or not\. Note that the S parameter is of TDynamicString type\.  
__Example__

1

// Remove the \.SchLib file because it is no longer needed

2

SchLibFileName := GetProjectLibraryPath;

3

If ExistAnyWhere\(SchLibFileName\) Then

4

Begin

5

    Project\.DM\_RemoveSourceDocument\(SchLibFileName\);

6

    Document := Client\.GetDocumentByPath\(SchLibFileName\);

7

    If Document <> Nil Then Document\.ReleaseFileOwnership;

8

    DeleteFile\(SchLibFileName\);

9

End;

__See also__  
ExistAnyWhereAsTemplate function