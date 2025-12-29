### IConnection Interface

__Overview__  
The IConnection interface represents whether the wire or bus connection has a manual junction on it or not, with location, wire or bus objects count and the thickness of wire or bus objects\.

The object count denotes the number of connections from this connection location for example one end of a capacitor can have two or more wire connections because it is tied to the Ground as well as to other points on the schematic\.

A connection that has 3 or more wire / bus objects denotes that a junction \(system generated or manually placed\) is required to tied the connections together\. Thus you can use the IConnection interface to determine the number of wire or bus connections at the specified location\.

The project that has schematics need to be compiled first before IConnection interfaces can be extracted with valid data\.

__Notes__  
The ISch\_Sheet interface has the IConnectionsArray interface which in turn has the IConnection interface\.  
The ISch\_Document can be either ISch\_Sheet or ISch\_Lib interfaces depending on which document \(Schematic Sheet or Schematic Library\) you are working with\.  
A manual junction \(placed by an user\) may signify a forced connection of at least 3 or more connections on a schematic document\.

__IConnection Methods and Properties Table__

__IConnection methods__  
GetState\_Location  
GetState\_ObjectsCount  
GetState\_IsManualJunction  
SetState\_Location  
SetState\_ObjectsCount  
SetState\_IsManualJunction

__IConnection properties__  
Location  
ObjectsCount  
IsManualJunction

__See also__  
IConnectionsArray interface  
ISch\_Junction interface  
ISch\_Sheet interface

#### IConnection GetState and SetState Methods

##### GetState\_Location method

\(ISch\_Connection interface\)  
__Syntax__  
Function GetState\_Location : TLocation;  
__Description__  
The GetState\_Location method retrieves the X,Y location of the wire or bus connection on the schematic document\. This method is used by the Location property\.  
__See also__  
ISch\_Connection interface  
Location Property and Example  
TLocation type

##### GetState\_ObjectsCount method

\(ISch\_Connection interface\)  
__Syntax__  
Function GetState\_ObjectsCount  
__Description__  
The GetState\_ObjectsCount method reports the number of wire or bus connections at a location on the schematic sheet\.  
__See also__  
ISch\_Connection interface  
ObjectsCount Property and Example

##### GetState\_Location method

\(ISch\_Connection interface\)  
__Syntax__  
Function  GetState\_IsManualJunction  : Boolean;  
__Description__  
The GetState\_IsManualJunction function determines whether the connection has a manual junction or not\.  
__See also__  
ISch\_Connection interface  
Location property and example

##### SetState\_Location method

\(ISch\_Connection interface\)  
__Syntax__  
Procedure SetState\_Location \(AValue : TLocation\);  
__Description__  
The procedure adds a location to the IConnection object\.  
__See also__  
ISch\_Connection interface

##### SetState\_ObjectsCount method

\(ISch\_Connection interface\)  
__Syntax__  
Procedure SetState\_ObjectsCount \(AValue : Integer\);  
__Description__  
This procedure sets the objects count for the IConnection object\.  
__See also__  
ISch\_Connection interface

##### SetState\_IsManualJunction method

\(ISch\_Connection interface\)  
__Syntax__  
Procedure SetState\_IsManualJunction\(AValue : Boolean\);  
__Description__  
This procedure sets the IsManualJunction Boolean setting for the IConnection object\.  
__See also__  
ISch\_Connection interface

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