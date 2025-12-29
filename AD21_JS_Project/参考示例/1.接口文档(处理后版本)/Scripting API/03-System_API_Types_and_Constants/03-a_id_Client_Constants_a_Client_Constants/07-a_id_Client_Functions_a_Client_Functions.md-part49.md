#### FileExists

__Declaration__  
Function FileExists\(const FileName: string\): Boolean;  
__Description __  
The FileExists function returns True if the file specified by FileName exists\. If the file does not exist, FileExists returns False\.  
__Example__

01

Function OpenProject\(ProjectName : String\) : Boolean;

02

Begin

03

    Result := True;

04

    If Not FileExists\(ProjectName\) Then Result := False;

05

  

06

    ResetParameters;

07

    AddStringParameter\('ObjectKind','Project'\);

08

    AddStringParameter\('FileName', ProjectName\);

09

    RunProcess\('WorkspaceManager:OpenObject'\);

10

End;

__See also__