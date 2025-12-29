#### DocumentIsReadOnly

__Declaration__  
Function DocumentIsReadOnly      \(FullPath : TDynamicString\) : Boolean;  
__Description __  
The DocumentIsReadOnly function returns True if a design document file has a read only property set true\.  
__Example__

1

If DocumentIsReadOnly\(Document\.FileName\) Then

2

Begin

3

    ShowError\(ExtractFileName\(Document\.FileName\) \+ ' is read\-only\.'\);

4

    Exit;

5

End;

__See also__  
ExtractFilename function