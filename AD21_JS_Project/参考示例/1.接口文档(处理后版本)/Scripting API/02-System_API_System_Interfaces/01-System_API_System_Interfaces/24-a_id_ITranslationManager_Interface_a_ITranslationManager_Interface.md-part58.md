#### IsPathRelative

__Declaration__  
Function IsPathRelative\(Path : TString\) : Boolean;  
__Description__  
This IsPathRelative function checks if the string contains a relative path not a full absolute path\.  
__Example__

01

    If IsPathRelative\(FileName\) Then

02

    Begin

03

        If Not DirectoryExists\(FRootPath\) Then Exit;

04

  

05

        S := GetCurrentDir;

06

        If Not SetCurrentDir\(FRootPath\) Then Exit;

07

        Try

08

            AbsolutePath := ExpandFileName\(FileName\);

09

        Finally

10

            SetCurrentDir\(S\);

11

        End;

12

    End

13

    Else

14

        AbsolutePath := FileName;

__See also__  
ExpandFilename function