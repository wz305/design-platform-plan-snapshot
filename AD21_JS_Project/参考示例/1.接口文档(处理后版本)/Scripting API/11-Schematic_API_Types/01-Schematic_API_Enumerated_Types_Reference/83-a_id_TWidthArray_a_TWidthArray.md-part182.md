#### InstalledLibraryPath method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function InstalledLibraryPath \(anIndex : Integer\) : WideString;  
__Description__  
This InstalledLibraryPath function retrieves the path of the indexed installed library in Altium Designer\. An installed library appears in the installed libraries list box in the__ Installed__ tab of the Available Libraries dialog\.  
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

    // do what you want with the OriginalInstalledList

15

    OriginalInstalledList\.Free;

16

End;

__See also__  
IIntegratedLibraryManager interface