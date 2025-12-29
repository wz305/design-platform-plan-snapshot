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