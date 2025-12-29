#### FindDatafileEntitySourceDatafilePath

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