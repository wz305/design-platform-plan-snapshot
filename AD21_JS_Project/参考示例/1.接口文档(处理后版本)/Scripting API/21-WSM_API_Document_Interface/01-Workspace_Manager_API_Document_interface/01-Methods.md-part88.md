#### AvailableLibraryType method

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