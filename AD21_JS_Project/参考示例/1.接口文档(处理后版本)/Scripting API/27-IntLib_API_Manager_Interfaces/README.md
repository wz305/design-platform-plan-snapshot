# IntLib API Manager Interfaces

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [IntLib API Manager Interfaces for version 22](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Parent page: [Technical Reference \- Integrated Library API](https://www.altium.com/documentation/altium-designer/technical-reference-integrated-library-api?version=21) 

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\. 


The Integrated Library API Manager Interfaces Reference includes the following sections and content: 

[__IIntegratedLibraryManager Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IIntegratedLibraryManager Interface)

[__IModelTypeManager Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IModelTypeManager Interface)

[__IDeviceSheetManager Interface__](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IDeviceSheetManager Interface)

[Integrated Library Manager Methods](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#Integrated Library Manager Methods)

[IModelTypeManager Methods](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IModelTypeManager Methods)  
[IModelTypeManager Properties](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IModelTypeManager Properties)

[IDeviceSheetManager Methods](https://www.altium.com/documentation/altium-designer/intlib-api-manager-interfaces?version=21#IDeviceSheetManager Methods)

  


__Overview__  
The IIntegratedLibraryManager interface represents the integrated library manager that manages schematic components and its models from installed libraries in Altium Designer\. 

Invoke the IntegratedLibraryManager function to fetch the IIntegratedLibraryManager interface\. 

__Integrated Library Manager Methods and Properties Table__ 

__IIntegratedLibraryManager methods__  
AddRemoveLibraries  
AvailableLibraryCount  
AvailableLibraryPath  
AvailableLibraryType  
BrowseComponent  
BrowseDatafileEntity  
BrowseDatafileEntityInDatafile  
BrowseForComponent  
BrowseForComponentAndPart  
BrowseForComponentAndPartCheckDBLibs  
BrowseForComponentCheckDBLibs  
BrowseForDatafile  
BrowseModel  
BrowseSymbol  
ComponentHasModelOfType  
CreateIntegratedLibrary  
ExtractSources  
ExtractSourcesToDatabaseLib  
ExtractSourcesToPath  
FindDatafileInStandardLibs  
FindComponentLibraryPath  
FindComponentDisplayPath  
FindComponentSymbol  
FindDatafileEntityDatafilePath  
FindDatafileEntitySourceDatafilePath  
FindDatafileEntitySourceLibraryPath  
FindDatafileEntityLibraryPath  
FindLibraryInformation  
FindModelLibraryPath  
GetAllParametersFromSourceLib  
GetAvailableDBLibDocAtPath  
GetComponentCount  
GetComponentDatafileLocation  
GetComponentLocation  
GetComponentLocationFromDatabase  
GetComponentName  
GetDatabaseDatafileLocation  
GetDatafileEntityCount  
GetDatafilePath  
GetModelCount  
GetModelName  
GetModelType  
GetParametersForDBComponent  
GetSchLibPathForDBComponent  
GetSchLibRefForDBComponent  
GetParameterCount  
GetParameterName  
GetParameterValue  
GetComponentPlacementParameters  
InstalledLibraryCount  
InstalledLibraryPath  
InstallLibrary  
IsParameterDatabaseKey  
MakeCurrentProject  
ModelCount  
ModelName  
ParseDatabaseKeys  
PlaceLibraryComponent  
UninstallLibrary

__IIntegratedLibraryManager properties__

__See also__  
Examples\\Scripts\\DXP\_Scripts\\ folder of Altium Designer installation 



\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure AddRemoveLibraries;  
__Description__  
This method invokes the Available Libraries dialog with a list of installed libraries if any and their activated, path and type values\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

IntMan\.AddRemoveLibraries;

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function AvailableLibraryType \(LibraryIndex : Integer\) : TLibraryType;  
__Description__  
The AvailableLibraryType function determines what type the indexed library is\. Note, the first installed library in the Available Libraries dialog is indexed zero \(0\)\.  
__Notes__  
An available library is one of the libraries on the Installed, Project and Search path tabs within the Available Libraries dialog\.  
An installed library appears in the __Installed__ tab of the Available Libraries dialog\.  
TLibraryType = \(eLibIntegrated, eLibSource, eLibDatafile, eLibDatabase, eLibNone, eLibQuery, eLibDesignItems\);  
__Example__ 

01

    IntMan := IntegratedLibraryManager;

02

    If IntMan = Nil Then Exit;

03

  

04

    LibType := IntMan\.AvailableLibraryType\(0\);

05

    Case LibType Of

06

        eLibIntegrated  : ShowMessage\('Integrated'\);

07

        eLibSource      : ShowMessage\('Lib Source'\);

08

        eLibDatafile    : ShowMessage\('Lib data File'\);

09

        eLibDatabase    : ShowMessage\('Database'\);

10

        eLibNone        : ShowMessage\('None'\);

11

        eLibQuery       : ShowMessage\('Query'\);

12

        eLibDesignItems : ShowMessage\('Design Items'\);

13

    End;

__See also__  
IIntegratedLibraryManager interface  
TLibraryType type 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function AvailableLibraryPath \(LibraryIndex : Integer\) : WideString;  
__Description__  
The AvailableLibraryPath function retrieves the file path of the indexed library in the Available Libraries dialog\. Note, the first installed library in the Available Libraries dialog is indexed zero \(0\)\.  
Notes  
An available library is one of the libraries on the Installed, Project and Search path tabs within the Available Libraries dialog\.  
An installed library appears in the __Installed__ tab of the Available Libraries dialog\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

ShowMessage\(IntMan\.AvailableLibraryPath\(0\)\);

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function AvailableLibraryCount : Integer;  
__Description__  
The AvailableLibraryCount function determines the number of available libraries\. Note, the first installed library in the Available Libraries dialog is indexed zero \(0\)\.  
Notes  
An available library is one of the libraries on the Installed, Project and Search path tabs within the Available Libraries dialog\.  
An installed library appears in the __Installed__ tab of the Available Libraries dialog\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

ShowMessage\(IntToStr\(IntMan\.AvailableLibraryCount\)\);

__See also__  
IIntegratedLibraryManager interface  
AvailableLibraryPath method  
AvailableLibraryType method 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure BrowseForDatafile \(AModelName : PChar;AModelPath : PChar; LibPath : PChar; ModelType : PChar; ForComponentInstance : LongBool\);  
__Description__  
This BrowseForDataFile procedure invokes the Browse Libraries dialog\.  
__Example__ 

1

LibraryPath := 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

2

ComponentName  := 'XC3S100E\-4TQ144I';

3

ModelType      := 'PCBLIB';

4

AFootprintName := 'TQ144\_N';

5

IntMan\.BrowseForDatafile\(AFootprintName, LibraryPath, Librarypath,ModelType, True\);

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure BrowseForComponentAndPart \(ALibReference : PChar;ASCHLibraryPath : PChar;SelModelName : PChar;SelModelLib : PChar;LibPath : PChar;ModelType : PChar;Var PartID : Integer\);  
__Description__  
This BrowseForComponentAndPart procedure invokes the Browse for Parts dialog\.  
__Example__  
__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure BrowseForComponent \(ALibReference : PChar; ASCHLibraryPath : PChar; SelModelName : PChar; SelModelLib : PChar; LibPath : PChar; ModelType : PChar\);  
__Description__  
This BrowseForDataFile procedure invokes the Browse for Components dialog\.  
__Example__  
__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure BrowseForComponentAndPartCheckDBLibs \(ALibReference : PChar; ASCHLibraryPath : PChar; SelModelName : PChar;  SelModelLib : PChar; LibPath : PChar; ModelType : PChar;  ADatabaseTableName : PChar; ADatabaseKeys : PChar; Var PartID : Integer\);  
__Description__  
This BrowseForComponentAndPartCheckDBLibs procedure invokes the Browse for Components dialog\.  
__Example__  
__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function ComponentHasModelOfType \(LibraryPath : WideString; ComponentIndex : Integer; AModelType : WideString\) : Boolean;  
__Description__  
This function checks if this indexed component from the specified library has this model type\. Model Types include: 

- PCBLIB 
- PCB3DLIB 
- SIM 
- SI 

__Example__ 

1

ComponentIndex := 0;

2

Status := IntMan\.ComponentHasModelOfType\(LibraryPath, ComponentIndex, 'PCBLIB'\);

3

If Status Then ShowMessage\('True'\) Else ShowMessage\('False'\);

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure CreateIntegratedLibrary \(AProject : IProject; AnOutputPath : WideString; Install : Boolean\);  
__Description__  
This CreateIntegratedLibrary procedure creates an integrated library from a project into the specified AnOutputPath path and depending on the Install parameter is installed in the Available Libraries dialog\.  
__Example__ 

01

IntMan := IntegratedLibraryManager;                            

02

If IntMan = Nil Then Exit;                                     

03

WSM := GetWorkSpace;                                           

04

If WSM = Nil Then Exit;                                        

05

                                                                

06

Project := WSM\.DM\_FocusedProject;                              

07

If Project = Nil Then Exit;                                    

08

LibPath := ChangeFileExt\(Project\.DM\_ProjectFullPath,'\.INTLIB'\);

09

IntMan\.CreateIntegratedLibrary\(Project,LibPath,True\);          

10

IntMan\.MakeCurrentProject\(Project\);

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure ExtractSourcesToPath \(ALibraryPath : WideString ;ADestinationPath : WideString\);  
__Description__  
This ExtractSources procedure extracts the source files such as PCBLIB and PCB3DLIb files to the destination path \(ADestinationPath parameter\) from the Integrated Library specified by its ALibraryPath parameter\.  
__Example__  
See example for ExtractSources method\.  
__See also__  
IIntegratedLibraryManager interface 


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


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function FindComponentDisplayPath\(ALibIdentifierKind  : TLibIdentifierKind;  
                            Const ALibraryIdentifier  : WideString;  
                            Const ADesignItemID       : WideString\) : WideString;  
__Description__  
The function returns the full path of the library that the supplied component is part of\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

// Component is a ISch\_Component interface from Schematic API

4

If Component\.LibraryIdentifier <> '' Then

5

    ShowMessage\(IntMan\. FindComponentDisplayPath\(Component\.LibIdentifierKind, Component\.LibraryIdentifier, Component\.DesignItemID\)\);

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function  FindComponentLibraryPath\(ALibIdentifierKind  : TLibIdentifierKind;  
                             Const ALibraryIdentifier  : WideString;  
                             Const ADesignItemID       : WideString\)  : WideString;  
__Description__  
The function returns the path of the library the component is part of\.  
The ALibIdentifierKind parameter denotes which type of library the component is from\.  
TLibIdentifierKind = \(eLibIdentifierKind\_Any,  
                      eLibIdentifierKind\_NameNoType,  
                      eLibIdentifierKind\_NameWithType,  
                      eLibIdentifierKind\_FullPath\);  
The ALIbraryIdentifier parameter is the library identifier string that the component is associated with\.  
The ADesignItemID parameter is the symbol reference \(library reference\) of the component from a Schematic or Integrated Library or an unique part number from a record within a table of a Database\.  
__Example__ 

01

// For each component found on the schematic, you can iterate for its implementations\.

02

//SchImplementation  : ISch\_Implementation;

03

If SchImplementation\.UseComponentLibrary Then

04

Begin

05

    ComponentPath  := IntegratedLibraryManager\.FindComponentLibraryPath\(Component\.LibIdentifierKind, Component\.LibraryIdentifier, Component\.DesignItemID\); 

06

    ModelPath      := IntegratedLibraryManager\.FindModelLibraryPath    \(Component\.LibIdentifierKind, Component\.LibraryIdentifier, Component\.DesignItemID, SchImplementation\.ModelName, SchImplementation\.ModelType\);

07

  

08

    ModelsList\.Add\(' The Component is in Integrated Library'\); 

09

    ModelsList\.Add\('  Component path: ' \+ ComponentPath\); 

10

    ModelsList\.Add\('  Model path: '     \+ ModelPath\); 

11

End

__See also__  
IIntegratedLibraryManager interface  
TLibIdentifierKind type  
SimModelsOfComponents script from \\Examples\\Scripts\\DelphiScript Scripts\\Sch folder of the Altium Designer installation 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function FindComponentSymbol\(ALibIdentifierKind  : TLibIdentifierKind;  
                       Const ALibraryIdentifier  : WideString;  
                       Const ADesignItemID       : WideString;  
                       Out   ASymbolLibraryPath  : WideString;  
                       Out   ASymbolReference    : WideString\)  : Boolean;  
__Description__  
The function validates whether if the component symbol is available or not dependent on the supplied parameters\.  
The ALibIdentifierKind parameter denotes which type of library the component is from\.  
TLibIdentifierKind = \(eLibIdentifierKind\_Any,  
                      eLibIdentifierKind\_NameNoType,  
                      eLibIdentifierKind\_NameWithType,  
                      eLibIdentifierKind\_FullPath\);  
The ALibraryIdentifier parameter is the library identifier string that the component is associated with\.  
The ADesignItemID parameter is the symbol reference \(library reference\) of the component from a Schematic or Integrated Library or an unique part number from a record within a table of a Database\.  
The ASymbolLibraryPath is the library\.  
The ASymbolReference is the name of the component symbol\.  
__Example__ 

01

If IntegratedLibraryManager\.FindComponentSymbol\(APart\.LibIdentifierKind, APart\.LibraryIdentifier, APart\.DesignItemID, SymbolLibraryPath, SymbolReference\) Then

02

Begin

03

    NewSymbolLibrarypath := SymbolLibrarypath;

04

    NewSymbolReference   := SymbolReference;

05

End

06

Else

07

Begin

08

    NewSymbolLibrarypath := '';

09

    NewSymbolReference   := '';

10

End;

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function  FindDatafileEntityDatafilePath\(ALibIdentifierKind  : TLibIdentifierKind;  
                                   Const ALibraryIdentifier  : WideString;  
                                   Const ADatafileEntityName : WideString;  
                                   Const ADatafileType       : WideString;  
                                         AUseIntAndDBLibrary : Boolean\)     : WideString;  
__Description__  
The function returns the path of the library the component is part of\.  
The ALibIdentifierKind parameter denotes which type of library the component is from\.  
TLibIdentifierKind = \(eLibIdentifierKind\_Any,  
                      eLibIdentifierKind\_NameNoType,  
                      eLibIdentifierKind\_NameWithType,  
                      eLibIdentifierKind\_FullPath\);  
The ALibraryIdentifier parameter is the library identifier string that the component is associated with\.  
The ADatafileEntityName parameter  
The ADatafileType parameter  
The AUseIntAndDBLibrary parameter  
__Example__ 

01

// For each component found on the schematic, you can iterate for its implementations\.

02

If SchImplementation\.DatafileLinkCount > 0 Then

03

Begin

04

    // Assumption: use the first data file link for the simulation model since we 

05

    // normally only use one sim model per component\. 

06

    ModelDataFile := SchImplementation\.DatafileLink\[0\]; 

07

  

08

    SourceLibraryPath := IntegratedLibraryManager\.FindDatafileEntitySourceLibraryPath\(ModelDataFile\.LibIdentifierKind, ModelDataFile\.LibraryIdentifier, ModelDataFile\.EntityName, ModelDataFile\.FileKind\);         

09

    LibraryPath       := IntegratedLibraryManager\.FindDatafileEntityLibraryPath      \(ModelDataFile\.LibIdentifierKind, ModelDataFile\.LibraryIdentifier, ModelDataFile\.EntityName, ModelDataFile\.FileKind\);

10

  

11

    SourceDatafilePath := IntegratedLibrarymanager\.FindDatafileEntitySourceDatafilePath\(ModelDataFile\.LibIdentifierKind, ModelDataFile\.LibraryIdentifier, ModelDataFile\.EntityName, ModelDataFile\.FileKind, True\); 

12

    Datafilepath       := IntegratedLibrarymanager\.FindDatafileEntityDatafilePath      \(ModelDataFile\.LibIdentifierKind, ModelDataFile\.LibraryIdentifier, ModeldataFile\.EntityName, ModelDataFile\.FileKind, True\); 

13

  

14

    ModelsList\.Add\(' Model : DatafilelinkCount > 0'\); 

15

    ModelsList\.Add\('  Source Library path: '  \+ SourceLibraryPath\); 

16

    ModelsList\.Add\('  Library path: '         \+ LibraryPath\); 

17

    ModelsList\.Add\('  Source datafile path: ' \+ SourceDatafilePath\); 

18

    ModelsList\.Add\('  Datafile path: '        \+ DataFilePath\); 

19

End;

__See also__  
IIntegratedLibraryManager interface  
TLibIdentifierKind type  
SimModelsOfComponents script from \\Examples\\Scripts\\DelphiScript Scripts\\Sch folder of the Altium Designer installation 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function FindDatafileEntitySourceDatafilePath\(ALibIdentifierKind  : TLibIdentifierKind;  
                                        Const ALibraryIdentifier  : WideString;  
                                        Const ADatafileEntityName : WideString;  
                                        Const ADatafileType       : WideString;  
                                              AUseIntAndDBLibrary : Boolean\) : WideString;  
__Description__  
This function returns the path of the data file in library \.  
__Example__ 

01

// For each component found on the schematic, you can iterate for its implementations\.

02

If SchImplementation\.DatafileLinkCount > 0 Then

03

Begin

04

    // Assumption: use the first data file link for the simulation model since we 

05

    // normally only use one sim model per component\. 

06

    ModelDataFile := SchImplementation\.DatafileLink\[0\]; 

07

  

08

    SourceLibraryPath := IntegratedLibraryManager\.FindDatafileEntitySourceLibraryPath\(ModelDataFile\.LibIdentifierKind, ModelDataFile\.LibraryIdentifier, ModelDataFile\.EntityName, ModelDataFile\.FileKind\);         

09

    LibraryPath       := IntegratedLibraryManager\.FindDatafileEntityLibraryPath      \(ModelDataFile\.LibIdentifierKind, ModelDataFile\.LibraryIdentifier, ModelDataFile\.EntityName, ModelDataFile\.FileKind\);

10

  

11

    SourceDatafilePath := IntegratedLibrarymanager\.FindDatafileEntitySourceDatafilePath\(ModelDataFile\.LibIdentifierKind, ModelDataFile\.LibraryIdentifier, ModelDataFile\.EntityName, ModelDataFile\.FileKind, True\); 

12

    Datafilepath       := IntegratedLibrarymanager\.FindDatafileEntityDatafilePath      \(ModelDataFile\.LibIdentifierKind, ModelDataFile\.LibraryIdentifier, ModeldataFile\.EntityName, ModelDataFile\.FileKind, True\); 

13

  

14

    ModelsList\.Add\(' Model : DatafilelinkCount > 0'\); 

15

    ModelsList\.Add\('  Source Library path: '  \+ SourceLibraryPath\); 

16

    ModelsList\.Add\('  Library path: '         \+ LibraryPath\); 

17

    ModelsList\.Add\('  Source datafile path: ' \+ SourceDatafilePath\); 

18

    ModelsList\.Add\('  Datafile path: '        \+ DataFilePath\); 

19

End;

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
   
__Description__  
__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
   
__Description__  
__See also__  
IIntegratedLibraryManager interface 


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


\(IIntegratedLibraryManager interface\)  
__Syntax__  
   
__Description__  
__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function  FindModelLibraryPath\(ALibIdentifierKind : TLibIdentifierKind;  
                         Const ALibraryIdentifier : WideString;  
                         Const ADesignItemID      : WideString;  
                         Const AModelName         : WideString;  
                         Const AModelType         : WideString\)  : WideString;  
__Description__  
The function returns the path of the library the model is part of\.  
The ALibIdentifierKind parameter denotes which type of library the component is from\.  
TLibIdentifierKind = \(eLibIdentifierKind\_Any,  
                      eLibIdentifierKind\_NameNoType,  
                      eLibIdentifierKind\_NameWithType,  
                      eLibIdentifierKind\_FullPath\);  
The ALIbraryIdentifier parameter is the library identifier string that the component is associated with\.  
The ADesignItemID parameter is the symbol reference \(library reference\) of the component from a Schematic or Integrated Library or an unique part number from a record within a table of a Database\.  
The AModelName parameter is the name of the implementation \(model\) linked to this component\.  
The AModelType parameter is the model type of the implementation \(model\) linked to this component\.  
__Example__ 

01

// For each component found on the schematic, you can iterate for its implementations\.

02

//SchImplementation  : ISch\_Implementation;

03

If SchImplementation\.UseComponentLibrary Then

04

Begin

05

    ComponentPath  := IntegratedLibraryManager\.FindComponentLibraryPath\(Component\.LibIdentifierKind, Component\.LibraryIdentifier, Component\.DesignItemID\); 

06

    ModelPath      := IntegratedLibraryManager\.FindModelLibraryPath    \(Component\.LibIdentifierKind, Component\.LibraryIdentifier, Component\.DesignItemID, SchImplementation\.ModelName, SchImplementation\.ModelType\);

07

  

08

    ModelsList\.Add\(' The Component is in Integrated Library'\); 

09

    ModelsList\.Add\('  Component path: ' \+ ComponentPath\); 

10

    ModelsList\.Add\('  Model path: '     \+ ModelPath\); 

11

End

__See also__  
IIntegratedLibraryManager interface  
TLibIdentifierKind type  
SimModelsOfComponents script from \\Examples\\Scripts\\DelphiScript Scripts\\Sch folder of the Altium Designer installation 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function  FindLibraryInformation\(ALibIdentifierKind  : TLibIdentifierKind;  
                           Const ALibraryIdentifier  : WideString;  
                           Const ADesignItemID       : WideString;  
                           Out   ALibraryPath        : WideString;  
                           Out   ADBTableName        : WideString\) : Boolean;  
__Description__  
The function validates the existence of the library\.  
The ALibIdentifierKind parameter denotes which type of library the component is from\.  
TLibIdentifierKind = \(eLibIdentifierKind\_Any,  
                      eLibIdentifierKind\_NameNoType,  
                      eLibIdentifierKind\_NameWithType,  
                      eLibIdentifierKind\_FullPath\);  
The ALIbraryIdentifier parameter is the library identifier string that the component is associated with\. Normally a path to a library\.  
The ADesignItemID parameter is the symbol reference \(library reference\) of the component from a Schematic or Integrated Library or an unique part number from a record within a table of a Database\.  
The ALibraryPath parameter is returned for the valid design item of a component\.  
The ADBTableName is returned if a component is from a database\.  
__Example__  
If Not IntegratedLibraryManager\.FindLibraryInformation\(eLibIdentifierKind\_NameWithType, ALibraryIdentifier, ADesignItemID, ALibraryPath, Path, DBTableName\) Then Path := '';  
__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetComponentLocation \(ALibraryName : WideString;  
AComponentName : WideString;  
Var FoundInLibraryPath : WideString\) : WideString;  
__Description__  
This GetComponentLocation returns the path of the specified component name within the specified library\.  
__Example__ 

1

IntMan\.GetComponentLocation\('Xilinx Spartan\-3E\.IntLib',ComponentName, FoundLocation\);

2

ShowMessage\(FoundLocation \+ \#13 \+ 'for ' \+ ComponentName\);

3

//C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetComponentDatafileLocation\(DatafileIndex : Integer; AModelName : WideString; AModelType : WideString; AComponentName : WideString; AComponentLibraryName : WideString; Var FoundInLibraryPath : WideString\) : WideString;  
__Description__  
This GetComponentDatafileLocation function obtains the location of the datafile for the component with the specified data file index, model name and its model type, component name and the full library\. The result is returned in the FoundInLibraryPath parameter or by the function itself\.  
__Example__ 

1

LibraryPath := 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

2

ComponentName  := 'XC3S100E\-4TQ144I';

3

IntMan\.GetComponentDatafileLocation\(0, 'TQ144\_L', 'PCBLIB', ComponentName, LibraryPath, FoundLocation\);

4

ShowMessage\(FoundLocation \+ ' for Component Datafile location'\);

5

// 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetModelType \(LibraryPath : WideString; ComponentIndex : Integer; ModelIndex : Integer\) : IModelType;  
__Description__  
This function retrieves the model type for the indexed component within the specified library\. The first indexed component is 0\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

LibraryPath := 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

5

// when ComponentIndex = 0, Component = 'XC3S100E\-4TQ144I';

6

  

7

ModelType := IntMan\.GetModelType\(LibraryPath, 0, 2\); //0 = PCBLIB, 1 = PCB3DLIB 2 = SI

8

Showmessage\(ModelType\.Name\);

__See also__  
IIntegratedLibraryManager interface  
IModelType interface  
GetModelName method  
GetModelCount method 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetModelName \(LibraryPath : WideString; ComponentIndex : Integer; ModelIndex : Integer\) : WideString;  
__Description__  
This function retrieves the model name for the indexed component within the specified library\. The first indexed component is 0\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

  

4

LibraryPath := 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

5

// when ComponentIndex = 0, Component = 'XC3S100E\-4TQ144I';

6

Showmessage\(IntMan\.GetModelName\(LibraryPath, 0, 0\)\); //0 = CP132, 1 = XC3S100E\-CP132 2 = XC3S100E\_CP132

__See also__  
IIntegratedLibraryManager interface  
GetModelCount method  
GetModelType method 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetModelCount \(LibraryPath : WideString; ComponentIndex : Integer\) : Integer;  
__Description__  
This function retrieves the model count for the indexed component within the specified library\. The first indexed component is 0\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

LibraryPath := 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

4

// when ComponentIndex = 0, Component = 'XC3S100E\-4TQ144I';

5

Showmessage\(IntMan\.GetModelName\(LibraryPath, 0\)\); //3 models for this component

__See also__  
IIntegratedLibraryManager interface  
GetModelName method  
GetModelType method 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetDatafilePath \(LibraryPath : WideString; ComponentIndex : Integer; ModelIndex : Integer; DatafileIndex : Integer\) : WideString;  
__Description__  
This function gets datafile path for the specified component, its indexed model and its indexed datafile in the specified library path\. Remember first index is 0\.  
__Example__  
__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetDatafileEntityCount \(LibraryPath : WideString; ComponentIndex : Integer; ModelIndex : Integer\) : Integer;  
__Description__  
This function gets datafile entity count for the specified component and its indexed model in the specified library path\. Remember first index is 0\.  
__Example__ 

1

DataEntityCount := IntLib\.GetDatafileEntityCount\(Librarypath,I,0\); 

2

ShowMessage\(IntToStr\(DataEntityCount\);

3

// indexed component is I and 0 is the first model for the component\.

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetComponentName \(LibraryPath : WideString; ComponentIndex : Integer\) : WideString;  
__Description__  
This function retrieves the name for the indexed component within the specified integrated library\. Remember first index is 0\.  
__Example__ 

01

IntMan := IntegratedLibraryManager;

02

If IntMan = Nil Then Exit;

03

  

04

S :=  '';

05

AvailLibPath := IntMan\.AvailableLibraryPath\(1\);

06

AComponentIndex := IntMan\.GetComponentCount\(IntMan\.AvailableLibraryPath\(1\)\);

07

  

08

For I := 0 To AComponentIndex Do

09

    S := S \+ ' ' \+ Intman\.GetComponentName \(AvailLibpath,I\);

10

  

11

ShowMessage\(s\);

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetComponentCount \(LibraryPath : WideString\) : Integer;  
__Description__  
This function retrieves the count of components within the integrated library specified by the LibraryPath parameter\.  
__Example__ 

1

IntMan := IntegratedLibraryManager;

2

If IntMan = Nil Then Exit;

3

ShowMessage\(IntMan\.GetComponentCount\(IntMan\.AvailableLibraryPath\(1\)\)\);

__See also__  
IIntegratedLibraryManager interface 


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


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure InstallLibrary \(ALibraryPath : WideString\);  
__Description__  
This procedure installs the library \(full path\) in the Available Libraries dialog \(in the __Installed__ page\) in Altium Designer\.  
__Example__  
IntegratedLibraryManager\.InstallLibrary\('C:\\Program Files\\Altium Designer\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib'\);  
__See also__  
IIntegratedLibraryManager interface  
UnInstallLibrary method 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure MakeCurrentProject \(AProject : IProject\);  
__Description__  
This procedure makes the current library in the Libraries panel  based on the project\.  
__Example__ 

01

IntMan := IntegratedLibraryManager;                            

02

If IntMan = Nil Then Exit;                                     

03

WSM := GetWorkSpace;                                           

04

If WSM = Nil Then Exit;                                        

05

                                                                

06

Project := WSM\.DM\_FocusedProject;                              

07

If Project = Nil Then Exit;                                    

08

LibPath := ChangeFileExt\(Project\.DM\_ProjectFullPath,'\.INTLIB'\);

09

IntMan\.CreateIntegratedLibrary\(Project,LibPath,True\);          

10

IntMan\.MakeCurrentProject\(Project\);

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function ModelName \(AComponentName : WideString; AComponentLibraryName : WideString; AModelType : WideString; AnIndex : Integer\) : WideString;  
__Description__  
This ModelName function returns the name of the model type associated with the component within a specified library\.  
__Example__ 

01

LibraryPath := 'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib';

02

ModelCount := IntMan\.ModelCount\(ComponentName,LibraryPath, 'PCBLIB'\);

03

ShowMessage\(ComponentName \+ '''s ModelCount : ' \+ IntToStr\(ModelCount\)\);

04

  

05

S := '';

06

For I := 0 to ModelCount \- 1 Do

07

S := S \+ \#13 \+ IntMan\.ModelName \(ComponentName, LibraryPath, 'PCBLIB', I\);

08

  

09

ShowMessage\(S\);

10

// TQ144\_L, TQ144\_M, TQ144\_N

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function ModelCount \(AComponentName : WideString; AComponentLibraryName : WideString; AModelType : WideString\) : Integer;  
__Description__  
This ModelCount function returns the number of models of the same type associated with the component within the specified library\. The AComponentName parameter is the name of the component\. The AComponentLibraryName parameter is the full path of the library the component is from, and the AModelType parameter is the model type you wish to find how many\.  
__Example__ 

1

ModelCount := IntMan\.ModelCount\(ComponentName,'C:\\Program Files\\Altium Designer Summer 08\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib', 'PCBLIB'\);

2

ShowMessage\(ComponentName \+ '''s ModelCount : ' \+ IntToStr\(ModelCount\)\);

3

// XC3S100E\-4TQ144I’s Model count: 3

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function PlaceLibraryComponent \(ALibReference : PChar; ALibraryPath : PChar; Parameters : PChar\) : Boolean;  
__Description__  
This method places a component from a specified library with Library Reference and Parameters that describe/define this component\.  
The ALIbReference parameter defines the component\. For example ‘Res2’  
The ALibraryPath parameter defines the path to the library that the component is from\. For example ‘Miscellaneous Devices\.IntLib’  
The Parameters parameter defines the parameters needed for the component to be able to be placed on the schematic sheet\. For example 'ModelType=SIM|ModelParameterName0=Value|ModelParameterValue0=1K|Orientation=1|Location\.X=10000000|Location\.Y=20000000'\. Normally you will need Location\.X and Location\.Y parameters at the least to be able to place this component on the schematic sheet\.  
__Example__ 

01

Procedure PlaceAPartProgrammatically;

02

Begin

03

    If SchServer = Nil Then Exit;

04

    If SchServer\.GetCurrentSchDocument = Nil Then Exit;

05

    If IntegratedLibraryManager = Nil Then Exit;

06

  

07

    // Integrated Library object model is used to place a

08

    // component from the library onto the schematic sheet\.

09

    IntegratedLibraryManager\.PlaceLibraryComponent\(

10

        'Res2',

11

        'Miscellaneous Devices\.IntLib',

12

        'ModelType=SIM|ModelParameterName0=Value|' \+

13

        'ModelParameterValue0=1K|Orientation=1|Location\.X=10000000|Location\.Y=20000000'\);

14

  

15

     // Refresh screen

16

    SchServer\.GetCurrentSchDocument\.GraphicallyInvalidate;

17

End;

__See also__  
IIntegratedLibraryManager interface 


\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure UninstallLibrary \(ALibraryPath : WideString\);  
__Description__  
This procedure removes the specified library \(full path\) in the Available Libraries dialog \(in the __Installed__ page\) in Altium Designer  
__Example__  
IntegratedLibraryManager\.UnInstallLibrary\('C:\\Program Files\\Altium Designer\\Library\\Xilinx\\Xilinx Spartan\-3E\.IntLib'\);  
__See also__  
IIntegratedLibraryManager interface  
InstallLibrary method 

  


__Overview__  
The IModelTypeManager interface represents a repository of available model types in Altium Designer\. The Implementation files \(\*\.IMP\) from the System folder of Altium Designer Installation are collected and processed by this manager\. 

Each model that can be linked to a schematic component has a model type and model data file\(s\)\. 

- PCB Model has one model data file – footprints \(\*\.PCBLIB\) 
- PCB 3D Model has one model data file –3D models \(\*\.PCB3DLib\) 
- Signal Integrity Model has one model data file – pin model library\. 
- Simulation has 3 model data files – Model File\(\*\.MDL\), Subcircuit file \(\*\.CKT\) and SIMetrix Model Library file \(\*\.LB\)\. 

This IModelTypeManager interface uses IModelType and IModelDataType interfaces to store different model types and their model data types\.  
Invoke the ModelTypeManager function to fetch the IModelTypeManager interface\.  
__IModelTypeManager Methods and Properties Table__ 

__IModelTypeManager methods__  
ModelTypeCount  
ModelTypeAt  
ModelTypeFromName  
ModelTypeFromServerName  
ModelDatafileTypeCount  
ModelDatafileTypeAt  
ModelDatafileTypeFromKind

__IModelTypeManager properties__  
ModelTypes  
ModelDatafileTypes

__See also__  
IModelType interface  
IModelDataType interface  
Examples\\Scripts\\DXP\_Scripts\\ folder of Altium Designer installation 



\(IModelTypeManager interface\)  
__Syntax__  
Function ModelTypeFromServerName \(AName : PChar\) : IModelType;  
__Description__  
This function returns the model type interface based on the server name\. The Server names can be: 

- PCB3D 
- PCB 
- Sim 
- SignalIntegrity 

__Example__ 

01

Procedure ShowAModelFromModelTypeManager;

02

Var

03

    ModelTypeMan : IModelTypeManager;

04

    I            : Integer;

05

    ModelType    : IModelType;

06

Begin

07

    ModelTypeMan := ModelTypeManager;

08

    If ModelTypeMan = Nil Then Exit;

09

    ModelType := ModelTypeMan\.ModelTypeFromServerName\('SIM'\); 

10

    ShowMessage\(ModelType\.Description\); //Simulation

11

End;

__See also__  
IModelTypeManager interface 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelTypeFromName \(AName : PChar\) : IModelType;  
__Description__  
This function returns the model type interface based on the model type name\. The names can be: 

- PCB3DLIB 
- PCBLIB 
- SI 
- SIM 

__Example__ 

01

Procedure DisplayModelTypeFromName;

02

Var

03

    AModelTypeManager : IModelTypeManager;

04

    AModelType        : IModelType;

05

Begin

06

    AModelTypeManager := ModelTypeManager;

07

    If AModelTypeManager = Nil Then Exit;

08

  

09

    //AModelType := AModelTypeManager\.ModelTypeFromName\('PCBLIB'\);

10

    //AModelType := AModelTypeManager\.ModelTypeFromName\('PCB3DLib'\);

11

    //AModelType := AModelTypeManager\.ModelTypeFromName\('SI'\);

12

    AModelType := AModelTypeManager\.ModelTypeFromName\('SIM'\);

13

    If AModelType <> Nil Then

14

        ShowMessage\(AModelType\.Description\);

15

End;

__See also__  
IModelTypeManager interface 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelTypeCount : Integer;  
__Description__  
This function returns the number of models supported by Altium Designer\. The available models are PCBLIB, SI, SIM and PCB3DLIB types\.  
__Example__ 

01

Procedure ShowModelTypesFromModelTypeManager;

02

Var

03

    ModelTypeMan : IModelTypeManager;

04

    I            : Integer;

05

Begin

06

    ModelTypeMan := ModelTypeManager;

07

    If ModelTypeMan = Nil Then Exit;

08

  

09

    For I := 0 To ModelTypeMan\.ModelTypeCount \-1 do

10

       ShowMessage\(ModelTypeMan\.ModelTypes\[i\]\.Name\); // 4 model types supported

11

End;

__See also__  
IModelTypeManager interface 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelTypeAt \(AnIndex : Integer\) : IModelType;  
__Description__  
This function returns the indexed model type\. First model type starts at 0\. This method is used by the ModelTypes property\.  
__Example__ 

1

Procedure ShowFirstModelTypeFromModelTypeManager;

2

Var

3

    ModelTypeMan : IModelTypeManager;

4

    I            : Integer;

5

Begin

6

    ModelTypeMan := ModelTypeManager;

7

    If ModelTypeMan = Nil Then Exit;

8

    ShowMessage\(ModelTypeMan\.ModelTypeAt\(0\)\.Name\);

9

End;

__See also__  
IModelTypeManager interface  
ModelTypeCount method 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelDatafileTypeFromKind \(AKind : PChar\) : IModelDatafileType;  
__Description__  
This function returns the IModelDatafileType based on the datafile kind\. The datafile kinds for: 

__Model Type \(Kind\)__

__DatafileType Description__

MDL

Sim Model File

CKT

Sim Subcircuit File

LB

SIMetrix Model Library File

SIPinModelLibrary

SI Pin Model Library

PCBLIB

Protel Footprint Library

PCB3DLIB

PCB3D Model Library

__Example__ 

1

Procedure ShowDataFileTypeFromModelTypeManager;

2

Var

3

    ModelTypeMan : IModelTypeManager;

4

Begin

5

    ModelTypeMan := ModelTypeManager;

6

    If ModelTypeMan = Nil Then Exit;

7

Showmessage\(ModelTypeMan\.ModelDatafileTypeFromKind\('SIPinModelLibrary'\)\.Description\); 

8

//SI Pin Model Library

9

End;

__See also__  
IModelTypeManager interface 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelDatafileTypeCount : Integer;  
__Description__  
This function reports the number of model data file types used by Altium Designer\. Since there are four models supported and Simulation model has 3 types while the other 3 models has one type each making 6 in total\.  
__Example__ 

1

Procedure ShowModelDatafileTypeCount;

2

Var

3

    ModelTypeMan : IModelTypeManager;

4

    I            : Integer;

5

Begin

6

    ModelTypeMan := ModelTypeManager;

7

    If ModelTypeMan = Nil Then Exit;

8

    Showmessage\(IntToStr\(ModelTypeMan\.ModelDatafileTypeCount\)\); //6 data file types

9

End;

__See also__  
IModelTypeManager interface 


\(IModelTypeManager interface\)  
__Syntax__  
Function ModelDatafileTypeAt \(AnIndex : Integer\) : IModelDatafileType;  
__Description__  
This method returns the data file types supported by Altium Designer\. First data file type starts at 0\. This method is used by the ModelDataFileTypes property\.  
__Example__ 

01

Procedure ShowModelDatafileTypes;

02

Var

03

    ModelTypeMan      : IModelTypeManager;

04

    ModelDatafileType : ModelDatafileType;

05

    I                 : Integer;

06

Begin

07

    ModelTypeMan := ModelTypeManager;

08

    If ModelTypeMan = Nil Then Exit;

09

    //6 data file types

10

    For I := 0 To ModelTypeMan\.ModelDatafileTypeCount \- 1 do

11

    Begin

12

        ModelDatafileType := ModelTypeMan\.ModelDatafileTypeAt\(I\);

13

        ShowMessage\(ModelDatafileType\.FileKind \+ \#13 \+ ModelDatafileType\.Description\);

14

    End;

15

End;

__See also__  
IModelTypeManager interface  
ModelDatafileTypes property  
ModelDatafileTypeCount method 



\(IModelTypeManager interface\)  
__Syntax__  
Property ModelDatafileTypes\[AnIndex : Integer\] : IModelDatafileType Read ModelDatafileTypeAt;  
__Description__  
This property returns the data file types supported by Altium Designer\. First data file type starts at 0\. This property is supported by the ModelDataFileTypeAt method\.  
__Example__ 

01

Procedure ShowModelDatafileTypes;

02

Var

03

    ModelTypeMan      : IModelTypeManager;

04

    ModelDatafileType : ModelDatafileType;

05

    I                 : Integer;

06

Begin

07

    ModelTypeMan := ModelTypeManager;

08

    If ModelTypeMan = Nil Then Exit;

09

    //6 data file types

10

    For I := 0 To ModelTypeMan\.ModelDatafileTypeCount \- 1 do

11

    Begin

12

        ModelDatafileType := ModelTypeMan\.ModelDatafileTypes\[I\];

13

        ShowMessage\(ModelDatafileType\.FileKind \+ \#13 \+ ModelDatafileType\.Description\);

14

    End;

15

End;

__See also__  
IModelTypeManager interface  
IModelDatafileType interface  
ModelDatafileTypeCount method 


\(IModelTypeManager interface\)  
__Syntax__  
Property ModelTypes \[AnIndex : Integer\] : IModelType Read ModelTypeAt;  
__Description__  
This function returns the indexed model type\. First model type starts at 0\. This property is supported by the ModelTypeAt method\.  
__Example__ 

01

Procedure ShowModelsFromModelTypeManager;

02

Var

03

    ModelTypeMan : IModelTypeManager;

04

    I            : Integer;

05

Begin

06

    ModelTypeMan := ModelTypeManager;

07

    If ModelTypeMan = Nil Then Exit;

08

  

09

    For i := 0 To ModelTypeMan\.ModelTypeCount \-1 do

10

       ShowMessage\(ModelTypeMan\.ModelTypes\[i\]\.Name\);

11

End;

__See also__  
IModelTypeManager interface  
IModelType interface  
ModelTypeAt method 

  


__Overview__  
The IDeviceSheetManager interface represents the Device Sheets Folder dialog in Altium Designer\. Invoke the DeviceSheetManager function to fetch the IDeviceSheetManager object interface\. 

__IDeviceSheetManager Methods and Properties Table__ 

__IDeviceSheetManager methods__  
EditDeviceFolderList  
FindDeviceSheetPath  
BrowseDeviceSheet  
GetFoldersCount  
GetFolders\_FolderPath  
GetFolders\_SearchSubFolders  
WillSearchDeviceFolder  
AddDeviceFolder  
ChooseDeviceFolder  
ConvertDeviceSheetPathToName

__IDeviceSheetManager properties__

__See also__  
DeviceSheetManager function\. 



\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function  AddDeviceFolder\(Const AFolderPath : WideString; ASearchSubfolder : Boolean\) : Boolean;  
__Description__  
This function adds a new device folder into the existing top level Device Folder and whether sub folders can be searched from that folder\.  
__Example__ 

1

If Not DeviceSheetManager\.WillSearchDeviceFolder\(ExtractFilePath\(ASheetPath\)\) Then

2

    DeviceSheetManager\.AddDeviceFolder\(ExtractFilePath\(ASheetPath\), False\);

__See also__  
IDeviceSheetManagerManager interface 


\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function BrowseDeviceSheet \(Var   AFileName : WideString; Out AFilePath : WideString\) : Boolean;  
__Description__  
The function BrowseDeviceSheet invokes the Select Device Sheet dialog and when you select a device sheet, the filename \(without the file extension\) is returned for the device sheet you chose from this dialog\. This filename is returned in the AFilename parameter\.  
__Example__ 

1

DeviceSheetMan := DeviceSheetManager;

2

If DeviceSheetMan = Nil Then Exit;

3

AFilepath := ''; Afilepath is returned blank\.

4

DeviceSheetMan\.BrowseDeviceSheet\(AFileName,AFilepath\);

5

ShowMessage\('Filename ' \+ AFileName\);

__See also__  
IDeviceSheetManagerManager interface 


\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function  ChooseDeviceFolder\(Var AFolderPath : WideString\) : Boolean;  
__Description__  
This function invokes the Choose Device Sheet Folder dialog and returns you the valid device folder via the AFolderPath parameter\. The function returns a false value if the dialog is cancelled\.  
__Example__ 

1

FolderPath := ExtractFilePath\(DeviceSheetPathText\);

2

If DeviceSheetManager\.ChooseDeviceFolder\(FolderPath\) Then

3

     DeviceSheetPathText := AddSlash\(FolderPath\) \+ ExtractFileName\(DeviceSheetPathText\);

__See also__  
IDeviceSheetManagerManager interface 


\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function ConvertDeviceSheetPathToName \(Const AFilePath : WideString\) : WideString;  
__Description__  
The function converts the full file path \(the AFilePath parameter\) of the device sheet to the valid device sheet filename \(without the file extension\)\. If the AFilePath parameter is invalid, an empty string is returned\.  
__Example__ 

1

ShowMessage\(DeviceSheetMan\.ConvertDeviceSheetPathToName\('C:\\Program Files\\Altium Designer Summer 08\\Library\\Device Sheets\\Audio\\AUDIO\_AMP\_LM4849\.Harness'\)\); 

2

//Returns the filename of the valid device sheet \(without the file extension\)\.

__See also__  
IDeviceSheetManagerManager interface 


\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Procedure EditDeviceFolderList;  
__Description__  
This procedure invokes the Device Sheet Folders dialog with all Device Sheet Folders if any\.  
__Example__ 

1

DeviceSheetMan := DeviceSheetManager;

2

If DeviceSheetMan = Nil Then Exit;

3

DeviceSheetMan\.EditDeviceFolderList;

__See also__  
IDeviceSheetManagerManager interface 


\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function FindDeviceSheetPath \(Const AFileName : WideString\) : WideString;  
__Description__  
This function finds the Device Sheet path for the valid device sheet \(without the file extension\)\. The valid device sheet is defined by the AFilename parameter\. If the AFileName is invalid, a blank string is returned\.  
__Example__  
ShowMessage\(DeviceSheetMan\.FindDeviceSheetPath\('AUDIO\_AMP\_LM4849'\)\);  
__See also__  
IDeviceSheetManagerManager interface 


\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function  GetFoldersCount : Integer;  
__Description__  
The GetFoldersCount function returns the number of Device Sheet Folders in Altium Designer\.  
__Example__ 

1

DeviceSheetMan := DeviceSheetManager;

2

If DeviceSheetMan = Nil Then Exit;

3

Count := DeviceSheetMan\.GetFoldersCount;

4

ShowMessage\(IntToStr\(Count\)\);

__See also__  
IDeviceSheetManagerManager interface 


\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function  GetFolders\_FolderPath\(AIndex : Integer\) : WideString;  
__Description__  
This function returns the indexed path of device sheets \(as in the Device Sheet Folders dialog\)\. The first entry starts at zero \(0\)\.  
__Example__ 

1

DeviceSheetMan := DeviceSheetManager;

2

If DeviceSheetMan = Nil Then Exit;

3

Count := DeviceSheetMan\.GetFoldersCount;

4

ShowMessage\(DeviceSheetMan\.GetFolders\_FolderPath\(Count\-1\)\);

__See also__  
IDeviceSheetManagerManager interface  
GetFoldersCount method 


\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function GetFolders\_SearchSubFolders\(AIndex : Integer\): Boolean;  
__Description__  
This function returns a boolean result for sub folders of the indexed path of device sheets \(as in the Device Sheet Folders dialog\)\. The first entry starts at zero \(0\)\.  
__Example__ 

1

DeviceSheetMan := DeviceSheetManager;

2

If DeviceSheetMan = Nil Then Exit;

3

Result := DeviceSheetMan\.GetFolders\_SearchSubFolders\(0\);

4

If Result Then

5

    ShowMessage\(DeviceSheetMan\.GetFolders\_FolderPath\(0\) \+ ‘has its sub folders’\);

__See also__  
IDeviceSheetManagerManager interface  
GetFoldersCount method 


\(IDeviceSheetManagerManager interface\)  
__Syntax__  
Function WillSearchDeviceFolder\(Const AFolderPath : WideString\) : Boolean;  
__Description__  
This function determines whether the Device Sheet Folder represented by the AFolderPath parameter exists or not\.  
__Example__ 

1

If Not DeviceSheetManager\.WillSearchDeviceFolder\(ExtractFilePath\(ASheetPath\)\) Then

2

    DeviceSheetManager\.AddDeviceFolder\(ExtractFilePath\(ASheetPath\), False\);

__See also__  
IDeviceSheetManagerManager interface

## 子章节

- [Integrated Library API: Manager Interfaces](01-Integrated_Library_API_Manager_Interfaces.md/README.md)
- [<a id="IIntegratedLibraryManager_Interface"></a>IIntegratedLibraryManager Interface](02-a_id_IIntegratedLibraryManager_Interface_a_IIntegratedLibraryManager_Interface.md/README.md)
- [<a id="IModelTypeManager_Interface"></a>IModelTypeManager Interface](03-a_id_IModelTypeManager_Interface_a_IModelTypeManager_Interface.md/README.md)
- [<a id="IDeviceSheetManager_Interface"></a>IDeviceSheetManager Interface](04-a_id_IDeviceSheetManager_Interface_a_IDeviceSheetManager_Interface.md/README.md)
