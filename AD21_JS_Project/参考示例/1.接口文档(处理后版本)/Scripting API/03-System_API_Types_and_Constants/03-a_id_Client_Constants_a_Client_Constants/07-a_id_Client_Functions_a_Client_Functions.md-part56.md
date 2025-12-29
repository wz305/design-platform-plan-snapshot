#### IsFullPathToExistingStructuredStorage Function

__Declaration__  
Function IsFullPathToExistingStructuredStorage\(Const FullPath : TDynamicString\) : Boolean;  
__Description__  
This function indicates whether a particular disk file contains a storage object\. This function returns True if the path including the filename to an existing structured storage exists\.  
__Example__

1

If IsFullPathToExistingStructuredStorage\(GetFileName\) Then

2

    Result := fmShareDenyNone

3

Else

4

    Result := Inherited GetFileShareMode;

__See also__  
IsFullPathToExistingFile function