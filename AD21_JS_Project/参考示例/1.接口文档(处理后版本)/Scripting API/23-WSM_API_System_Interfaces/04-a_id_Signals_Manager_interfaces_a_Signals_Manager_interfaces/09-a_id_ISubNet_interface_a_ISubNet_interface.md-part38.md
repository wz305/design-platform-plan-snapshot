#### FindDatafileInStandardLibs method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function FindDatafileInStandardLibs \(ADatafileEntityName : WideString; ADatafileType : WideString; ADatafileLocation : WideString; ForComponentInstance : Boolean; Var FoundInLibraryPath : WideString\) : WideString;  
__Description__  
This function returns the path of the data file for the specified model in an integrated library\. You need to specify the ADataFileEntityName parameter which is the footprint name, 3D model name, Sim name or SI name\.  
The ADataFileType parameter denotes the model type represented by the datafiletype \(PCB, PCB3DLIB, SIM, SI\)\.  
The ADatafileLocation parameter is optional\.  
The ForComponentInstance is a Boolean and is true if it is in an integrated library, false otherwise\.  
The FoundInLibraryPath parameter is a returnable value and returns the location of the data file if all the supplied parameters are valid\.  
__Example__ 

01

Var

02

    IntMan        : IntegratedLibraryManager;

03

InIntLib      : Boolean;

04

FoundLocation : 

05

Begin

06

    IntMan := IntegratedLibraryManager;

07

    If IntMan = Nil Then Exit;

08

  

09

    IntMan\.InstallLibrary\('C:\\Program Files\\Altium Designer\\Examples\\Reference Designs\\4 Port Serial Interface\\Libraries\\4 Port Serial Interface\.PcbLib'\);

10

  

11

    InIntLib := False;

12

    IntMan\.FindDatafileInStandardLibs \('DIP14', 'PCBLIB', '', InIntLib, FoundLocation\);

13

    ShowMessage\(FoundLocation\);

14

End;

__See also__  
IIntegratedLibraryManager interface