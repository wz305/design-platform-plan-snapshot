### IntegratedLibraryManager Interface Example

01

Procedure CheckDataFilesInIntLibrary;

02

Var

03

    IntMan         : IIntegratedLibraryManager;

04

    FoundLocation  : String;

05

    AFootprintName : String;

06

    InIntLib       : Boolean;

07

    AModelType      : String;

08

Begin

09

    IntMan := IntegratedLibraryManager;

10

    If IntMan = Nil Then Exit;

11

    IntMan\.InstallLibrary\('C:\\Program Files\\Altium Designer\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib'\);

12

    //Look for a footprint in a Xilinx Spartan\-3E\.IntLib

13

    AModelType     := 'PCBLIB';

14

    AFootprintName := 'TQ144';

15

    InIntLib       := True;

16

    IntMan\.FindDatafileInStandardLibs \(AFootprintName, AModelType, '', InIntLib, FoundLocation\);

17

    ShowMessage\(FoundLocation\);

18

    IntMan\.UnInstallLibrary\('C:\\Program Files\\Altium Designer 6\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib'\);

19

End;