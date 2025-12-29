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

#### IComponentInfo Methods

##### GetState\_AliasName method

\(IComponentInfo interface\)  
__Syntax__  
Function GetState\_AliasName : WideString;  
__Description__  
This function returns the alias name for this component\. Ie a component can be referred to by one of its multiple names\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.GetState\_AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface

##### GetState\_CompName method

\(IComponentInfo interface\)  
__Syntax__  
Function GetState\_CompName : WideString;  
__Description__  
This function returns the name string for this component from the IComponentInfo object interface\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.GetState\_CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.GetState\_AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.GetState\_PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Getstate\_Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.GetState\_Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface

##### GetState\_Description method

\(IComponentInfo interface\)  
__Syntax__  
Function GetState\_Description : WideString;  
__Description__  
This function returns the description string for this component from the IComponentInfo object interface\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.GetState\_CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.GetState\_AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.GetStatePartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.GetState\_Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.GetState\_Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface

##### GetState\_Offset method

\(IComponentInfo interface\)  
__Syntax__  
Function GetState\_Offset : Integer;  
__Description__  
This function returns the offset as a number \- each part of a component whole has an offset to denote its place within the component\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.GetState\_CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.GetState\_AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.GetState\_PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.GetState\_Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.GetState\_Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface

##### GetState\_PartCount method

\(IComponentInfo interface\)  
__Syntax__  
Function GetState\_PartCount : Integer;  
__Description__  
This function obtains the number of parts \(multiple types of the same component type as an example\)\. For example an Integrated circuit may have multiple smaller modules, such as a 74LS00 has multiple OR gates\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.GetState\_CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.GetState\_AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.GetState\_PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.GetState\_Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.GetState\_Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface

#### IComponentInfo Properties

##### AliasName property

\(IComponentInfo interface\)  
__Syntax__  
Property AliasName : WideString Read GetState\_AliasName;  
__Description__  
This property returns the alias name for this component\. Ie a component can be referred to by one of its multiple names\. This property is supported by the GetState\_AliasName method\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.GetState\_ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface

##### CompName property

\(IComponentInfo interface\)  
__Syntax__  
Property CompName : WideString Read GetState\_CompName;  
__Description__  
This property returns the name string for this component from the IComponentInfo object interface\. This property is supported by the GetState\_CompName function\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.GetState\_ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface

##### Description property

\(IComponentInfo interface\)  
__Syntax__  
Property Description : WideString Read GetState\_Description;  
__Description__  
This property returns the description string for this component from the IComponentInfo object interface\. This property is supported by the GetState\_Description method\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.GetState\_ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface

##### Offset property

\(IComponentInfo interface\)  
__Syntax__  
Property Offset : Integer Read GetState\_Offset;  
__Description__  
This property returns the offset as a number \- each part of a component whole has an offset to denote its place within the component\. This property is supported by the GetState\_Offset function\.  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.GetState\_ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\(''\);

15

End;

__See also__  
IComponentInfo interface

##### PartCount property

\(IComponentInfo interface\)  
__Syntax__  
Property PartCount : Integer Read GetState\_PartCount;  
__Description__  
__Example__

01

// Obtain the number of components in the specified sch library\.

02

CompNum := ALibCompReader\.NumComponentInfos;

03

  

04

// Go thru each component obtained by the LibCompReader interface\.

05

For J := 0 To CompNum \- 1 Do

06

Begin

07

    ReportInfo\.Add\(FileName\);

08

    CompInfo := ALibCompReader\.ComponentInfos\[J\];

09

    ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

10

    ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

11

    ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

12

    ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

13

    ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

14

    ReportInfo\.Add\('  Filename : '      \+ CompInfo\.Filename\);

15

    ReportInfo\.Add\(''\);

16

End;

__See also__  
IComponentInfo interface