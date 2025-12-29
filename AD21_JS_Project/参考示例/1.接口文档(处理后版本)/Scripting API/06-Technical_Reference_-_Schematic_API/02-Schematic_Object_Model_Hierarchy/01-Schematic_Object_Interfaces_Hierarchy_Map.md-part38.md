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

### <a id="IComponentPainterView_Interface"></a>IComponentPainterView Interface

__Overview__

__IComponentPainterView Methods and Properties Table__

__IComponentPainterView methods__  
HideComponentTextualDescriptions;  
HighLightComponentPins  
RegisterListener  
RenameSpecifiedPins  
SetComponent  
SetComponentByHandle  
ShowAllPins  
ShowPinsAsSelected  
ShowSpecifiedPinsOnly

__IComponentPainterView properties__

__See also__  
ISch\_ServerInterface interface  
IComponentMetafilePainter interface  
IDocumentPainterView interface