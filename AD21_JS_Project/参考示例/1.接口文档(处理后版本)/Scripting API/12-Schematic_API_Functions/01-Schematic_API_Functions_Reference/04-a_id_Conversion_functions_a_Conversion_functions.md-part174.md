#### PlaceLibraryComponent method

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