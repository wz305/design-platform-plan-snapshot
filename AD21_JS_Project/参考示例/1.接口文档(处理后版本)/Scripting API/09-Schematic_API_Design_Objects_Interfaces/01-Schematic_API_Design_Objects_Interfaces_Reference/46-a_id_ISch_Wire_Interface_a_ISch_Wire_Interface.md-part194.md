#### InstalledLibraryCount method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function InstalledLibraryCount : Integer;  
__Description__  
This InstalledLibraryCount function reports the number of installed libraries as in the __Installed__ tab of the Available Libraries dialog in Altium Designer\.  
__Example__ 

01

Procedure RemoveOriginalInstalledFiles;

02

Var

03

    I : Integer;

04

Begin

05

    IntMan := IntegratedLibraryManager;

06

    If IntMan = Nil then Exit;

07

  

08

    OriginalInstalledList := TStringList\.Create;

09

    For I := 0 to IntMan\.InstalledLibraryCount \- 1 Do

10

    Begin

11

        OriginalInstalledList\.Add\(IntMan\.InstalledLibraryPath\(I\)\);

12

        IntMan\.UnInstallLibrary\(IntMan\.InstalledLibraryPath\(I\)\);

13

    End;

14

End;

__See also__  
IIntegratedLibraryManager interface  
InstalledLibraryPath method  
AvailableLibraryPath method  
AvailableLibraryCount method