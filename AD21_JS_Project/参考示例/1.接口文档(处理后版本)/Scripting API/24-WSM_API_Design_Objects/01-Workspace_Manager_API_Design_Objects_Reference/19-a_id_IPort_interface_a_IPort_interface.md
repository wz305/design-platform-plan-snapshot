### <a id="IPort_interface"></a>IPort interface

__Overview__  
The IPort interface is a port object interface to an existing port object on the schematic\. A port is used to connect a net on one sheet to Ports with the same name on other sheets\.  Ports can also connect from child sheets to Sheet entries, in the appropriate sheet symbol on the parent sheet\.  
__Notes__  
The IPort interface is inherited from the INetItem interface\.  
An equivalent Port object representation is the ISch\_Port class in Schematic API Reference\.  
__Example__

01

Var

02

    DM\_Port        : IPort;

03

    I              : Integer;

04

    S              : TDynamicString;

05

    ServerDocument : IServerDocument;

06

Begin

07

    If ADM\_Document = Nil Then Exit;

08

    If Not ADM\_Document\.DM\_ValidForNavigation Then Exit;

09

  

10

    S := ADM\_Document\.DM\_FullPath;

11

    ServerDocument := Client\.GetDocumentByPath\(PChar\(S\)\);

12

    If ServerDocument = Nil Then Exit;

13

  

14

    If Not StringsEqual\(TDynamicString\(ServerDocument\.Kind\), 'Sch'\) Then Exit;

15

  

16

    For i := 0 To ADM\_Document\.DM\_PortCount \- 1 Do

17

    Begin

18

        DM\_Port := ADM\_Document\.DM\_Ports\(i\);

19

        If DM\_Port <> Nil Then

20

          If DM\_Port\.DM\_ValidForNavigation Then

21

        Begin

22

           // port is available for manipulation here\. 

23

        End;

24

    End;

25

End;

__See also__  
INetItem interface