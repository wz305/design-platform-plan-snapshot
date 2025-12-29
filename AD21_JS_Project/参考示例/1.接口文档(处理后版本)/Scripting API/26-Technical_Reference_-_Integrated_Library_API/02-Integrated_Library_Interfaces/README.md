# Integrated Library Interfaces

Each method in the object interface is implemented in the corresponding class\. Object Interfaces \(interfaces for short\) are declared like classes but cannot be directly instantiated and do not have their own method definitions\.

Each interface, a class supports is actually a list of pointers to methods\. Therefore, each time a method call is made to an interface, the interface actually diverts that call to one of it's pointers to a method, thus giving the object that really implements it, the chance to act\.

The Integrated Library interfaces exist as long there are associated existing objects in memory, thus when writing a script or server code, you have the responsibility of checking whether the interface you wish to query exists or not before you proceed to invoke the interface's methods\.

To obtain the Integrated Library Manager object interface which represents to the Integrated Library manager object, invoke the IntegratedLibraryManager function in your script or code which returns you the IIntegratedLibraryManager object interface\.

To obtain the model type manager, invoke the ModelTypeManager function in your script which returns you the IModelTypeManger interface\.


There are three main interfaces from the Integrated Library Object Model\.

- IIntegratedLibraryManager Interface
- IModelTypeManager Interface
- IDeviceSheetManager Interface

See the [IntLib API Manager Interfaces](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21) document for information on the above interfaces\.


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


There are script examples in the \\Examples\\Scripts\\ folder of the Altium Designer installation\.

## 子章节

- [What are Object Interfaces?](01-What_are_Object_Interfaces.md.md)
- [Main Integrated Library Interfaces](02-Main_Integrated_Library_Interfaces.md.md)
- [IntegratedLibraryManager Interface Example](03-IntegratedLibraryManager_Interface_Example.md.md)
- [Script Examples](04-Script_Examples.md.md)
