#### Properties

##### FontId property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property FontId : Integer Read GetState\_FontId Write SetState\_FontId;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### WordWrap property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property WordWrap : Boolean Read GetState\_WordWrap Write SetState\_WordWrap;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### TextColor property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property TextColor : TColor Read GetState\_TextColor Write SetState\_TextColor;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### Text property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property Text : WideString Read GetState\_Text Write SetState\_Text;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### ShowBorder property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property ShowBorder : Boolean Read GetState\_ShowBorder Write SetState\_ShowBorder;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### ClipToRect property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property ClipToRect : Boolean Read GetState\_ClipToRect Write SetState\_ClipToRect;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

##### Alignment property

\(ISch\_TextFrame interface\)  
__Syntax__  
Property Alignment : THorizontalAlign Read GetState\_Alignment Write SetState\_Alignment;  
__Description__  
__Example__  
__See also__  
ISch\_TextFrame interface

### <a id="ISch_Wire_Interface"></a>ISch\_Wire Interface

__Overview__  
Wires are straight line segments which are placed on a schematic document to create the electrical connections\.  
__Notes__  
The ISch\_Wire interface is descended from the immediate ancestor ISch\_BasicPolyline interface and the interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Polygon  
        ISch\_BasicPolyline  
            ISch\_Wire

__ISch\_Wire methods__  
GetState\_CompilationMaskedSegment  
SetState\_CompilationMaskedSegment

__ISch\_Wire properties__  
CompilationMaskedSegment

__Fetch the vertices of existing wires example__

01

Procedure FetchVertices\(\);

02

Var

03

    Index      : Integer;

04

    Wire       : ISch\_Wire;

05

    Iterator   : ISch\_Iterator;

06

    WireCount  : Integer;

07

    ALocation  : TLocation;

08

    SchDoc     : ISch\_Document;

09

    Document   : IServerDocument;

10

    ReportList : TStringList;

11

Begin

12

    If SchServer = Nil Then Exit;

13

    SchDoc := SchServer\.GetCurrentSchDocument;

14

    If SchDoc = Nil Then Exit;

15

  

16

    // Set up an iterator to look for port objects only\.

17

    Iterator := SchDoc\.SchIterator\_Create;

18

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eWire\)\);

19

  

20

    WireCount := 0;

21

    ReportList := TStringList\.Create;

22

    ReportList\.Add\('Wires'' Vertex report:'\);

23

    ReportList\.Add\('\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_'\);

24

    ReportList\.Add\(''\);

25

  

26

    // Using a Try Finally block to avoid exception errors\.

27

    Try

28

        Wire := Iterator\.FirstSchObject;

29

        While Wire <> Nil Do

30

        Begin

31

            Inc\(WireCount\);

32

            ReportList\.Add\('Wire \#' \+ IntToStr\(WireCount\)\);

33

            For Index := 1 To Wire\.VerticesCount Do

34

            Begin

35

                ALocation := Wire\.Vertex\[Index\];

36

                ReportList\.Add\('X: ' \+ IntToStr\(ALocation\.X\) \+ ', Y: ' \+ IntToStr\(ALocation\.Y\)\);

37

            End;

38

  

39

            ReportList\.Add\(''\);

40

            Wire := Iterator\.NextSchObject;

41

        End;

42

  

43

    Finally

44

        SchDoc\.SchIterator\_Destroy\(Iterator\);

45

    End;

46

  

47

    ReportList\.SaveToFile\('C:\\WireVertexReport\.Txt'\);

48

    ReportList\.Free;

49

  

50

    // Display the report containing parameters for each component found\.

51

    Document := Client\.OpenDocument\('Text','C:\\WireVertexReport\.txt'\);

52

    If Document <> Nil Then

53

        Client\.ShowDocument\(Document\);

54

End;

__See also__  
ISch\_GraphicalObject interface  
ISch\_Polygon interface  
ISch\_BasicPolyline interface