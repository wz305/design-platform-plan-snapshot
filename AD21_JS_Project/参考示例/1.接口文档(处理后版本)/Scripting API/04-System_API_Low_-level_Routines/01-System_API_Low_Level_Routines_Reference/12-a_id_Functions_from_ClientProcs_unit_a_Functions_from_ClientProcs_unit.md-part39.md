#### ILibCompInfoReader Properties

##### ComponentInfos property

\(ILibCompInfoReader interface\)  
__Syntax__  
Property ComponentInfos\[i : Integer\] : IComponentInfo Read GetState\_ComponentInfo;  
__Description__  
This ComponentInfos property retrieves the indexed IComponentInfo data structure\. This property is supported by the GetState\_ComponentInfo method\. The ComponentInfo interface contains information such as component name, alias name, part count and offset for the indexed schematic symbol \(component\) in the library\.  
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

##### FileName property

\(ILibCompInfoReader interface\)  
__Syntax__  
Property FileName : WideString Read GetState\_FileName;  
__Description__  
This FileName property gets the temporary filename of the datastructure\. The FileName property is supported by the GetState\_FileName function\.  
__Example__  
ShowMessage\(ALibCompReader\.Filename\)  
__See also__  
ILibCompInfoReader interface

### <a id="IComponentInfo_Interface"></a>IComponentInfo Interface

__Overview__  
The IComponentInfo interface is an item within the ILibCompInfoReader interface\. This IComponentInfo interface represents a schematic symbol in a specified schematic library file with a SchLib extension\.

The steps required to load a schematic library and its components\.  
1\. Create an object and pass in the filename of a schematic library file\. This object is represented by the ILibCompInfoReader interface by the SchServer\.CreateLibCompInfoReader\(FileName\);  
2\. Invoke the ReadAllComponentInfo method to load the library and its components\.  
3\. Invoke the NumComponentInfos method to obtain the number of components for this library  
4\. Obtain the indexed ComponentInfos method\. This ComponentInfos method returns the indexed IComponentInfo interface\.

__Notes__  
The IComponentInfo interface is extracted from the ILibCompInfoReader\.ComponentInfos\[Index\] method\.

__IComponentInfo methods__  
GetState\_Offset  
GetState\_AliasName  
GetState\_CompName  
GetState\_PartCount  
GetState\_Description

__IComponentInfo properties__  
Offset  
AliasName  
CompName  
PartCount  
Description

__See also__  
ILibCompInfoReader interface