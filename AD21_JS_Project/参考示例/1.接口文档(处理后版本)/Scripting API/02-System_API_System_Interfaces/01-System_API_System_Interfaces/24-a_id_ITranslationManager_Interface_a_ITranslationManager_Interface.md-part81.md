#### RunApplication

__Declaration__  
Function RunApplication\(Const CommandLine : String\) : Integer;  
__Description__  
The RunApplication function executes an application program outside the Altium Designer environment\. You need to supply the full path including the filename to the application you wish to execute\.  
__Example__

1

CommandLine := 'notepad\.exe' \+ NameOfTextFile;

2

ErrorCode   := RunApplication\(CommandLine\);

3

If ErrorCode <> 0 Then

4

    ShowError\('System cannot start : ' \+ CommandLine \+ \#13\#10 \+ GetErrorMessage\(ErrorCode\)\);

__See also__  
Other Routines