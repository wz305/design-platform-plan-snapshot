#### Properties

##### Width property

\(ISch\_Port interface\)  
__Syntax__  
Property Width : TCoord Read GetState\_Width Write SetState\_Width ;  
__Description__  
__Example__  
__See also__  
ISch\_Port interface

##### UniqueId property

\(ISch\_Port interface\)  
__Syntax__  
Property UniqueId : WideString Read GetState\_UniqueId Write SetState\_UniqueId ;  
__Description__  
The UniqueID property sets the new ID for the port\. All parameters, sheet symbols, ports, pins, components, openbus links, openbus ports and openbus components have Unique IDs\. Unique IDs are used to maintain design synchronization in design projects\.

The Unique ID \(UID\) is an system generated value that uniquely identifies this current port\. It is used for linking to a PCB document and for project management\. Enter a new UID value or click the __Reset__ button to generate a new UID for this design object from the Change Properties dialog\. You can also globally reset UIDs of components and sheet symbols from the Schematic Editor’s __Tools » Convert » Reset Component Unique IDs__ menu\.  
__Example__

1

UID := WSM\.DM\_GenerateUniqueID; // interface and method from Workspace Manager API\.

2

Port\.UniqueID\(UID\);

__See also__  
ISch\_Port interface

##### TextColor property

\(ISch\_Port interface\)  
__Syntax__  
Property TextColor : TColor Read GetState\_TextColor Write SetState\_TextColor;  
__Description__  
The TextColor property determines the color \(a value of TColor type\) of the Port’s Name string\. This property is supported by the GetState\_TextColor and SetState\_TextColor methods\.  
__Notes__  
The TColor value specifies a 6 digit hexadecimal number of the $FFFFFF format\.  For example the color blue would be RGB:0,0,255 and Hex:FF0000 therefore the converted decimal value would be 16711680\.  The following formula may be used to calculate the required value, R\+256\*\(G\+\(256\*B\)\)\.  
__Example__  
Color := Port\.TextColor;  
__See also__  
TColor type  
ISch\_Port interface

##### Style property

\(ISch\_Port interface\)  
__Syntax__  
Property Style : TPortArrowStyle Read GetState\_Style Write SetState\_Style ;  
__Description__  
The Style property determines the style of the port object\. This style is determined by the TPortArrowStyle type\. This style defines the graphical style of the port object\.  
__Example__  
Port\.Style := ePortLeft;  
__See also__  
TPortArrowStyle type  
ISch\_Port interface

##### Name property

\(ISch\_Port interface\)  
__Syntax__  
Property Name : WideString Read GetState\_Name Write SetState\_Name ;  
__Description__  
The Name property determines the name for the port object\. This property is supported by the GetState\_Name and SetState\_Name methods\.  
__Example__  
PortName := Port\.Name;  
__See also__  
ISch\_Port interface

##### IOType property

\(ISch\_Port interface\)  
__Syntax__  
Property IOType : TPortIO Read GetState\_IOType Write SetState\_IOType ;  
__Description__  
The IOType property defines the electrical properties of the port with the TPortIO type\. Available Port IO types are: Input, Output, Bi\-directional and Unspecified\.  
The setting of this IO Type does not influence the connectivity of the circuit, but is considered during the running of an electrical rules check, which can be set to detect incompatible port directions\.  
__Example__  
PortIOType := Port\.IOType;  
__See also__  
TPortIO type  
ISch\_Port interface

##### CrossReference property

\(ISch\_Port interface\)  
__Syntax__  
Property CrossReference : WideString Read GetState\_CrossRef Write SetState\_CrossRef ;  
__Description__  
Port Cross References are text that show which schematic sheets the ports are linked to with the zone reference information in brackets\. For example a port with A\[0\.\.2\] name on 4 Port UART and Line Drivers\.SchDoc will have a string with "ISA and Address Decoding\[4C\]" and the 4C string represents the location \(reference zone markers around the schematic sheet\) of the matching port on ISA and Address Decoding\.SchDoc\. The string in the \[\] bracket is dependent on the Port Cross References options in the __Schematic \- General__ page of the Preferences dialog\.

Port Cross References are generated from the __Reports » Port Cross Reference » Add to Sheet__ or __Reports » Port Cross Reference » Add to Project__ commands in the Schematic Editor\.

The CrossReference property is supported by the GetState\_CrossRef and SetState\_CrossRef methods\. The CrossRef string is also represented as a parameter associated with this port object AFTER the port cross reference command from the Reports menu has been invoked\.  
__Example__

01

Var

02

    Port         : ISch\_Port;

03

    CurrentSheet : ISch\_Document;

04

    Iterator     : ISch\_Iterator;

05

    Report         : TStringList;

06

    ReportDocument : IServerDocument;

07

    S              : WideString;

08

Begin

09

    // Obtain the current schematic sheet interface\.

10

    CurrentSheet := SchServer\.GetCurrentSchDocument;

11

    If CurrentSheet = Nil Then Exit;

12

  

13

    Report := TStringList\.Create;

14

    Iterator := CurrentSheet\.SchIterator\_Create;

15

    Iterator\.AddFilter\_ObjectSet\(MkSet\(ePort\)\);

16

  

17

    Try

18

        Port := Iterator\.FirstSchObject;

19

        While Port <> Nil Do

20

        Begin

21

            If Port\.Getstate\_CrossRef <> '' Then

22

                Report\.Add\('Port:' \+ Port\.Name \+ '''s cross reference: ' \+ Port\.GetState\_CrossRef\)

23

            Else

24

                Report\.Add\('Port:' \+ Port\.Name \+ ' does not have a cross reference\.'\);

25

  

26

            Port := Iterator\.NextSchObject;

27

        End;

28

    Finally

29

        CurrentSheet\.SchIterator\_Destroy\(Iterator\);

30

    End;

31

  

32

    S := 'C:\\PortReport\.Txt';

33

    Report\.SaveToFile\(S\);

34

    Report\.Free;

35

  

36

    ReportDocument := Client\.OpenDocument\('Text', S\);

37

    If ReportDocument <> Nil Then

38

        Client\.ShowDocument\(ReportDocument\);

39

End;

__See also__  
ISch\_Port interface  
GetState\_CrossRef and SetState\_CrossRef methods of ISch\_Port interface\.

##### ConnectedEnd property

\(ISch\_Port interface\)  
__Syntax__  
Property ConnectedEnd : TPortConnectedEnd Read GetState\_ConnectedEnd Write SetState\_ConnectedEnd;  
__Description__  
The ConnectedEnd property determines how a port object is connected graphically with the TPortConnectedEnd type\. This property is supported by the GetState\_ConnectedEnd and SetState\_ConnectedEnd methods\.  
__Example__  
Port\.ConnectedEnd := ePortConnectedEnd\_Extremity; // connected at the other end  
__See also__  
TPortConnectedEnd type  
ISch\_Port interface

##### Alignment property

\(ISch\_Port interface\)  
__Syntax__  
Property Alignment : THorizontalAlign Read GetState\_Alignment Write SetState\_Alignment;  
__Description__  
The Alignment property determines how the port’s Name is aligned with respect to the ends of the port itself\. The Name string can be left justified, centered or right justified\. This property is supported by the GetState\_Alignment and SetState\_Alignment methods\.  
__Example__  
Port\.Alignment := eHorizontalCentreAlign;  
__See also__  
THorizontalAlign type  
ISch\_Port interface

##### OverrideDisplayString property

\(ISch\_Port interface\)  
__Syntax__  
Property OverrideDisplayString : WideString        Read GetState\_OverrideDisplayString Write SetState\_OverrideDisplayString;  
    End;  
__Description__  
The OverrrideDisplayString property determines the override display string which overrides the Name string\. This property is supported by the GetState\_OverrideDisplayString and SetState\_OverrideDisplayString methoes\.  
__Example__  
DisplayString := SheetEntry\.GetState\_OverrideDisplayString;  
__See also__  
ISch\_Port interface

### <a id="ISch_PowerObject_Interface"></a>ISch\_PowerObject Interface

__Overview__  
Power ports are special symbols that represent a power supply and are always identified by their net names\.  The Text property is the net name of the power object\.  
__Notes__  
The ISch\_PowerObject interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Label  
        ISch\_PowerObject

__ISch\_PowerObject methods__  
SetState\_Style  
GetState\_Style  
SetState\_ShowNetName  
GetState\_ShowNetName

__ISch\_PowerObject properties__  
Style  
ShowNetName

__See also__  
ISch\_GraphicalObject interface  
ISch\_Label interface