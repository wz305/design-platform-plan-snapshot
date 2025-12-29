#### RunSystemCommandInSystemDirectory

__Syntax__  
Function  RunSystemCommandInSystemDirectory\(Const S : TDynamicString\) : TBoolean;  
__Description__  
The RunSystemCommandInSystemDirectory function runs the specified application in the Windows directory and the application’s filename is denoted by the string, S\.  
__Example__  
RunSystemCommandInSystemDirectory\(‘Notepad\.Exe’\);  
__See also__  
RunCommand procedure  
RunSystemCommand procedure