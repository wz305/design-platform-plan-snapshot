#### IConnection Properties

##### ObjectsCount property

\(IConnection interface\)  
__Syntax__  
Property ObjectsCount : Integer Read GetState\_ObjectsCount Write SetState\_ObjectsCount;  
__Description__  
This property retrieves or sets the Objects Count for Bus or Wire connection represented by  the IConnection object\.  
__Example__

01

Var

02

    I,J         : Integer;

03

    WS          : IWorkspace;

04

    Prj         : IProject;

05

    Doc         : IDocument;

06

    CurrentSch  : ISch\_Sheet;

07

    TheWireConnections : IConnectionsArray;

08

    WireConnection     : IConnection;

09

    Connectionslist    : TStringList;

10

    FileName           : String;

11

    FilePath           : String;

12

    ReportDocument     : IServerDocument;

13

Begin

14

    WS  := GetWorkspace;

15

    If WS = Nil Then Exit;

16

    Prj := WS\.DM\_FocusedProject;

17

    If Prj = Nil Then Exit;

18

    Prj\.DM\_Compile;

19

    Doc := WS\.DM\_FocusedDocument;

20

    ConnectionsList := TStringList\.Create;

21

    If Doc\.DM\_DocumentKind = 'SCH' Then

22

    Begin

23

         CurrentSch := SchServer\.GetSchDocumentByPath\(Doc\.DM\_FullPath\);

24

         If CurrentSch <> Nil Then

25

         Begin

26

              TheWireConnections := CurrentSch\.WireConnections;

27

              // Collect data for wire connections \(IConnectionArray\)

28

              ConnectionsList\.Add\('Wire Connections'\);

29

              For J := 0 To TheWireConnections\.ConnectionsCount \- 1 Do

30

              Begin

31

                 WireConnection := TheWireConnections\.Connection\(J\);

32

                 If WireConnection <> Nil Then

33

                 Begin

34

                     ConnectionsList\.Add\('Wire Connection Count: '                 \+ IntToStr     \(WireConnection\.ObjectsCount\)\);

35

                     ConnectionsList\.Add\('Wire Connection Location: '              \+ LocationtoStr\(WireConnection\.Location\)\); // currently 0,0

36

                     ConnectionsList\.Add\('Wire Connection has a manual junction: ' \+ BooleantoStr \(WireConnection\.IsManualJunction\)\);

37

                     ConnectionsList\.Add\('Wire Connection size: '                  \+ SizeToStr    \(WireConnection\.Size\)\);

38

                     ConnectionsList\.Add\(''\);

39

                 End;

40

              End;

41

         End;

42

    End;

43

  

44

    FilePath := ExtractFilePath\(Doc\.DM\_FullPath\);

45

    FileName := FilePath \+ '\\ConnectionsReport\.Txt';;

46

    ConnectionsList\.SaveToFile\(FileName\);

47

    ConnectionsList\.Free;

48

  

49

    ReportDocument := Client\.OpenDocument\('Text', FileName\);

50

    If ReportDocument <> Nil Then

51

        Client\.ShowDocument\(ReportDocument\);

52

End;

__See also__  
IConnection interface

##### Location property

\(IConnection interface\)  
__Syntax__  
Property Location : TLocation Read GetState\_Location Write SetState\_Location;  
__Description__  
This property retrieves or sets the Location of Bus or Wire connection represented by the IConnection object\.  
__Example__

01

    WS  := GetWorkspace;

02

    If WS = Nil Then Exit;

03

    Prj := WS\.DM\_FocusedProject;

04

    If Prj = Nil Then Exit;

05

    Prj\.DM\_Compile;

06

    Doc := WS\.DM\_FocusedDocument;

07

    If Doc\.DM\_DocumentKind = 'SCH' Then

08

    Begin

09

         CurrentSch := SchServer\.GetSchDocumentByPath\(Doc\.DM\_FullPath\);

10

         If CurrentSch <> Nil Then

11

         Begin

12

              TheWireConnections := CurrentSch\.WireConnections;

13

              For J := 0 To TheWireConnections\.ConnectionsCount \- 1 Do

14

              Begin

15

                 WireConnection := TheWireConnections\.Connection\(J\);

16

                 If WireConnection <> Nil Then

17

                 Begin

18

                     X := WireConnection\.Location\.X;

19

                     Y := WireConnection\.Location\.Y;

20

              End;

21

         End;

22

    End;

__See also__  
IConnection interface

##### IsManualJunction property

\(IConnection interface\)  
__Syntax__  
Property IsManualJunction : Boolean Read GetState\_IsManualJunction Write SetState\_IsManualJunction;  
__Description__  
This property retrieves or sets the IsManualJunction setting of Bus or Wire connection represented by the IConnection object\.  
__Example__

01

    WS  := GetWorkspace;

02

    If WS = Nil Then Exit;

03

    Prj := WS\.DM\_FocusedProject;

04

    If Prj = Nil Then Exit;

05

    Prj\.DM\_Compile;

06

    Doc := WS\.DM\_FocusedDocument;

07

    If Doc\.DM\_DocumentKind = 'SCH' Then

08

    Begin

09

         CurrentSch := SchServer\.GetSchDocumentByPath\(Doc\.DM\_FullPath\);

10

         If CurrentSch <> Nil Then

11

         Begin

12

              TheWireConnections := CurrentSch\.WireConnections;

13

              For J := 0 To TheWireConnections\.ConnectionsCount \- 1 Do

14

              Begin

15

                 WireConnection := TheWireConnections\.Connection\(J\);

16

                 If WireConnection <> Nil Then

17

                 Begin

18

                     ManualJunctionAtConnection := WireConnection\.Location\.IsManualJunction;

19

                     //rest of code

20

              End;

21

         End;

22

    End;

__See also__  
IConnection interface

### <a id="IConnectionsArray_Interface"></a>IConnectionsArray Interface

__Overview__  
The IConnectionsArray represents the bus and wire connections in a schematic document\. Bus and wire connections that have more than 3 connections could be connected by an automatic junction or a manual junction \(placed by an user\)\.

A schematic with valid buses and wires will have connections\. An IConnectionsArray interface has all the connections for this schematic sheet and each element in the IConnectionsArray interface is a IConnection interface type\.

__IConnectionsArray Methods and Properties Table__

__IConnectionsArray methods__  
AddConnection  
AddConnectionXY  
GetConnectionAt  
GetState\_Connection  
GetState\_ConnectionsCount  
GraphicallyInvalidate  
RemoveAllConnectionsAt  
RemoveAllConnectionsForLine  
ResetAllConnections

__IConnectionsArray properties__  
ConnectionsCount  
Connection

__See also__  
IConnection interface  
ISch\_Sheet interface