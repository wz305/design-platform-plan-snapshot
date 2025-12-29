#### ILibCompInfoReader Methods

##### GetState\_ComponentInfo method

\(ILibCompInfoReader interface\)  
__Syntax__  
Function GetState\_ComponentInfo \(i : Integer\) : IComponentInfo;  
__Description__  
This GetState\_ComponentInfo function retrieves the indexed IComponentInfo interface representing the component information datastructure\. The ComponentInfo interface contains information such as component name, alias name, part count and offset for the indexed schematic symbol \(component\) in the library\.  
__Example__

01

Var

02

    ALibCompReader : ICompInfoReader;

03

    CompInfo       : IComponentInfo;

04

    CompNum, J     : Integer;

05

Begin

06

    ALibCompReader := SchServer\.CreateLibCompInfoReader\(FileName\);

07

    ALibCompReader\.ReadAllComponentInfo;

08

    CompNum := ALIbCompReader\.NumComponentInfos;

09

    For J := 0 To CompNum \-1 Do

10

    Begin

11

        ReportInfo\.Add\(FileName\);

12

        CompInfo := ALibCompReader\.ComponentInfos\[J\];

13

        ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

14

        ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

15

        ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

16

        ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

17

        ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

18

        ReportInfo\.Add\('  FileName : '    \+ CompInfo\.FileName\);

19

        ReportInfo\.Add\(''\);

20

    End;

__See also__  
ILibCompInfoReader interface  
IComponentInfo interface

##### GetState\_FileName method

\(ILibCompInfoReader interface\)  
__Syntax__  
Function GetState\_FileName : WideString;  
__Description__  
This GetState\_FileName function gets the temporary filename of the datastructure\.  
__Example__

01

Var

02

    ALibCompReader : ICompInfoReader;

03

    CompInfo       : IComponentInfo;

04

    CompNum, J     : Integer;

05

Begin

06

    ALibCompReader := SchServer\.CreateLibCompInfoReader\(FileName\);

07

    ALibCompReader\.ReadAllComponentInfo;

08

    ShowMessage\(ALibCompReader\.GetState\_FileName\);

09

    CompNum := ALIbCompReader\.NumComponentInfos;

10

    For J := 0 To CompNum \-1 Do

11

    Begin

12

        ReportInfo\.Add\(FileName\);

13

        CompInfo := ALibCompReader\.ComponentInfos\[J\];

14

        ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

15

        ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

16

        ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

17

        ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

18

        ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

19

        ReportInfo\.Add\('  FileName : '    \+ CompInfo\.FileName\);

20

        ReportInfo\.Add\(''\);

21

    End;

22

  

__See also__  
ILibCompInfoReader interface  
IComponentInfo interface

##### I\_ObjectAddress method

\(ILibCompInfoReader interface\)  
__Syntax__  
Function I\_ObjectAddress : TSCHObjectHandle;  
__Description__  
This function obtains the pointer to the ILibCompInfoReader object\.  
__Example__  
__See also__  
ILibCompInfoReader interface

##### NumComponentInfos method

\(ILibCompInfoReader interface\)  
__Syntax__  
Function NumComponentInfos : Integer;  
__Description__  
This NumComponentInfos function retrieves the number of component information data structures\. This method is also used by the ComponentInfos property\. The ComponentInfo interface contains information such as component name, alias name, part count and offset for the indexed schematic symbol \(component\) in the library\.  
__Example__

01

Var

02

    ALibCompReader : ICompInfoReader;

03

    CompInfo       : IComponentInfo;

04

    CompNum, J     : Integer;

05

Begin

06

    ALibCompReader := SchServer\.CreateLibCompInfoReader\(FileName\);

07

    ALibCompReader\.ReadAllComponentInfo;

08

    ShowMessage\(ALibCompReader\.GetState\_FileName\);

09

    CompNum := ALIbCompReader\.NumComponentInfos;

10

    For J := 0 To CompNum \-1 Do

11

    Begin

12

        ReportInfo\.Add\(FileName\);

13

        CompInfo := ALibCompReader\.ComponentInfos\[J\];

14

        ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

15

        ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

16

        ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

17

        ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

18

        ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

19

        ReportInfo\.Add\('  FileName : '    \+ CompInfo\.FileName\);

20

        ReportInfo\.Add\(''\);

21

    End;

__See also__  
ILibCompInfoReader interface

##### ReadAllComponentInfo method

\(ILibCompInfoReader interface\)  
__Syntax__  
Procedure ReadAllComponentInfo;  
__Description__  
The ReadAllComponentInfo retrieves all the IComponentInfo data structures for the ILibCompInfoReader interface\. The ComponentInfo interface contains information such as component name, alias name, part count and offset for the indexed schematic symbol \(component\) in the library\.  
__Example__

01

Var

02

    ALibCompReader : ICompInfoReader;

03

    CompInfo       : IComponentInfo;

04

    CompNum, J     : Integer;

05

Begin

06

    ALibCompReader := SchServer\.CreateLibCompInfoReader\(FileName\);

07

    ALibCompReader\.ReadAllComponentInfo;

08

    ShowMessage\(ALibCompReader\.GetState\_FileName\);

09

    CompNum := ALIbCompReader\.NumComponentInfos;

10

    For J := 0 To CompNum \-1 Do

11

    Begin

12

        ReportInfo\.Add\(FileName\);

13

        CompInfo := ALibCompReader\.ComponentInfos\[J\];

14

        ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

15

        ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

16

        ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

17

        ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

18

        ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

19

        ReportInfo\.Add\('  FileName : '    \+ CompInfo\.FileName\);

20

        ReportInfo\.Add\(''\);

21

    End;

__See also__  
ILibCompInfoReader interface