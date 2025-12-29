#### ExtractSources method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure ExtractSources \(ALibraryPath : WideString\);  
__Description__  
This ExtractSources procedure extracts the source files such as PCBLIB and PCB3DLIb files from the Integrated Library specified by its ALibraryPath parameter\.  
__Example__ 

01

Program ExtractSourceLibsFromIntLibs;

02

Var

03

   SourceFolder : String;

04

   FilesList    : TStringList;

05

   i            : Integer;

06

Begin

07

    If IntegratedLibraryManager = Nil then Exit;

08

    If \(InputQuery\('Extract IntLib Files','Enter folder containing IntLib files',SourceFolder\)\) Then

09

    Begin

10

        If \(SourceFolder <> ''\) Then

11

            If \(SourceFolder\[Length\(SourceFolder\)\] <> '\\'\) Then

12

                SourceFolder := SourceFolder \+ '\\';

13

        If \(DirectoryExists\(SourceFolder\)\) Then

14

        Begin

15

           Try

16

                  FilesList            := TStringList\.Create;

17

                  FilesList\.Sorted     := True;

18

                  FilesList\.Duplicates := dupIgnore;

19

                  // FindFiles function is a built in function from Scripting\.\.\.

20

                  FindFiles\(SourceFolder,'\*\.IntLib',faAnyFile,False,FilesList\);

21

                  For i := 0 To FilesList\.Count \- 1 Do

22

                       IntegratedLibraryManager\.ExtractSources\(FilesList\.Strings\[i\]\);

23

           Finally

24

                      FilesList\.Free;

25

           End;

26

        End;

27

    End;

28

End\.

__See also__  
IIntegratedLibraryManager interface