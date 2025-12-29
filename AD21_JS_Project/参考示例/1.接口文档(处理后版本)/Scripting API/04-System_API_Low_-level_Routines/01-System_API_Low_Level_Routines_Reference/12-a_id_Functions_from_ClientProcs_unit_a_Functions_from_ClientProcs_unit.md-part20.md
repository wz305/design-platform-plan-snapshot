#### ISch\_ServerInterface Methods

##### CreateComponentMetafilePainter method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function CreateComponentMetafilePainter : IComponentMetafilePainter;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface  
IComponentMetafilePainter interface

##### CreateComponentPainter method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function CreateComponentPainter : IComponentPainterView;  
__Description__  
A IComponentPainterView interface represents the surface that a component can be painted on\.  
This interface is a IExternalForm type which represents the TExternalFormComponent object\. The TExternalForm class is defined in the ExternalForm unit from the DXP Run Time Library\.  
Notes  
This IComponentPainterView interface is not supported in the scripting system\.  
This IComponentPainterView interface is for server development purposes and you need to have RT\_IntegratedLIbrary, RT\_Schematic, ExternalForms and the RT\_ClientServerINterfaces units in a server project\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
IComponentPainterView interface

##### CreateDocumentPainter method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function CreateDocumentPainter : IDocumentPainterView;  
__Description__  
This function retrieves the IDocumentPainterView interface that represents the Mini Viewer object in the Schematic Editor\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
IDocumentPainterView interface

##### CreateLibCompInfoReader method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function CreateLibCompInfoReader \(ALibFileName : WideString\) : ILibCompInfoReader;  
__Description__  
The function returns a ILibCompInfoReader interface that represents a library component information reader object\.  
Invoke the CreateLibCompInfoReader function with the path to a schematic library and to obtain the number of components in this library, invoke the ILibCompInfoReader\.NumComponentsInfos method and then to obtain the information for each component in this library invoke the ComponentInfos\[\] method\. When you are done, invoke the DestroyCompInfoReader method\.  
__DelphiScript Example__

01

Procedure LibraryCompInfoReader;

02

Var

03

    CurrentLib     : ISch\_Lib;

04

    ALibCompReader : ILibCompInfoReader;

05

    CompInfo       : IComponentInfo;

06

    FileName       : String;

07

    CompNum, J     : Integer;

08

    ReportInfo     : TStringList;

09

    Document       : IServerDocument;

10

Begin

11

    If SchServer = Nil Then Exit;

12

    CurrentLib := SchServer\.GetCurrentSchDocument;

13

    If CurrentLib = Nil Then Exit;

14

    // CHeck if CurrentLib is a Library document or not

15

    If CurrentLib\.ObjectID <> eSchLib Then

16

    Begin

17

         ShowError\('Please open schematic library\.'\);

18

         Exit;

19

    End;

20

    FileName := CurrentLib\.DocumentName;

21

    // Set up Library Component Reader object\.

22

    ALibCompReader := SchServer\.CreateLibCompInfoReader\(FileName\);

23

    If ALibCompReader = Nil Then Exit;

24

    ALibCompReader\.ReadAllComponentInfo;

25

    ReportInfo := TStringList\.Create;

26

    // Obtain the number of components in the specified sch library\.

27

    CompNum := ALibCompReader\.NumComponentInfos;

28

    // Go thru each component obtained by the LibCompReader interface\.

29

    For J := 0 To CompNum \- 1 Do

30

    Begin

31

        ReportInfo\.Add\(FileName\);

32

        CompInfo := ALibCompReader\.ComponentInfos\[J\];

33

        ReportInfo\.Add\(' Name : '         \+ CompInfo\.CompName\);

34

        ReportInfo\.Add\('  Alias Name : '  \+ CompInfo\.AliasName\);

35

        ReportInfo\.Add\('  Part Count : '  \+ IntToStr\(CompInfo\.PartCount\)\);

36

        ReportInfo\.Add\('  Description : ' \+ CompInfo\.Description\);

37

        ReportInfo\.Add\('  Offset : '      \+ IntToStr\(CompInfo\.Offset\)\);

38

        ReportInfo\.Add\(''\);

39

    End;

40

    SchServer\.DestroyCompInfoReader\(ALibCompReader\);

41

  

42

    ReportInfo\.Add\(''\);

43

    ReportInfo\.Insert\(0,'Schematic Libraries and Their Components Report'\);

44

    ReportInfo\.Insert\(1,'\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-'\);

45

    ReportInfo\.Insert\(2,''\);

46

    ReportInfo\.SaveToFile\('C:\\SchLibCompReport\.txt'\);

47

    // Open and display the Component data in DXP\.

48

    If Client = Nil Then Exit;

49

    Document := Client\.OpenDocument\('Text','c:\\SchLibCompReport\.txt'\);

50

    If Document <> Nil Then

51

        Client\.ShowDocument\(Document\);

52

    ReportInfo\.Free;

53

End;

__See also__  
ISch\_ServerInterface interface  
ILibCompInfoReader interface

##### DestroyCompInfoReader method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Procedure DestroyCompInfoReader \(Var ALibCompReader : ILibCompInfoReader\);  
__Description__  
The function destroys an library component information reader object that is represented by the ILibCompInfoReader interface\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
CreateLibCompInfoReader method  
ILibCompInfoReader interface

##### GetCurrentSchDocument method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetCurrentSchDocument : ISch\_Document;  
__Description__  
This function returns the ISch\_Document interface that represents the current schematic document open in Altium Designer\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
ISch\_Document interface

##### GetSchDocumentByPath method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetSchDocumentByPath\(APath : WideString\) : ISch\_Document;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface

##### GetState\_FontManager method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetState\_FontManager : ISch\_FontManager;  
__Description__  
This function retrieves the ISch\_Font interface which represents the Font Manager object in the Schematic Editor\.  
__Example__  
__See also__  
ISch\_ServerInterface interface  
ISch\_Font interface

##### GetState\_JunctionConvertSettings method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetState\_JunctionConvertSettings : ISch\_JunctionConvertSettings;  
__Description__  
The JunctionConvertSettings property represents a crossing of wiring on a schematic sheet\. When an addition of a wire would create a four\-way junction, this is converted to into two adjacent three way junctions\. If it is disabled and when a four way junction is created, the two wires crossing at the intersection are not joined electrically and if the Display Cross Overs option is enabled, a cross over is shown on this intersection\.  
This property is supported by the GetState\_JunctionConvertSettings method\.  
__Example__  
__See also__  
ISch\_ServerInterface interface

##### GetState\_ProbesTimerEnabled method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetState\_ProbesTimerEnabled : Boolean;  
__Description__  
The ProbesTimerEnabled property determines whether the Probes are active or not\. This feature is used in the LiveDesign process in Altium Designer\.  
This property is supported by the GetState\_ProbesTimerEnabled and SetState\_ProbesTimerEnabled methods\.  
__Example__  
__See also__  
ISch\_ServerInterface interface

##### GetState\_RobotManager method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetState\_RobotManager : ISch\_RobotManager;  
__Description__  
The RobotManager property returns the ISch\_RobotManager interface\. This interface deals with sending Schematic notification messages in the system\. To have the ability to send a specific message when a specific event in the Schematic Editor occurs can be achieved with the ISch\_RobotManager interface\.  
This property is supported by the GetState\_RobotManager method\.  
__Example__  
__See also__  
ISch\_ServerInterface interface

##### GetState\_SchPreferences method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function GetState\_SchPreferences : ISch\_Preferences;  
__Description__  
The Preferences property retrieves the ISch\_Preferences interface which represents the Preferences object for the Schematic Editor\.  
This read only property is supported by the GetState\_SchPreference method\.  
__Example__  
__See also__  
ISch\_ServerInterface interface

##### LoadComponentFromLibrary method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function LoadComponentFromLibrary\(ALibReference : WideString;ALibraryName : WideString\) : ISch\_Component;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface

##### LoadComponentFromDatabaseLibrary method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function  LoadComponentFromDatabaseLibrary\(ALibraryName       : WideString;  
                                           ADatabaseTableName : WideString;  
                                           ADatabaseKeys      : WideString\) : ISch\_Component;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface

##### ReportSchObjectsDifferences method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function ReportSchObjectsDifferences\(Const AObject1, AObject2 : ISch\_BasicContainer;AIgnoreSpatialAttributes : Boolean;ADiffDescription : PChar\) : Integer;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface

##### SchObjectFactory method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function SchObjectFactory\(AObjectId : TObjectId;ACreationMode : TObjectCreationMode\) : ISch\_BasicContainer;  
__Description__  
The SchObjectFactory function creates a new object based on TObjectID and TObjectCreationMode values\.  
When you wish to create a new design object with the ISch\_ServerInterface’s SchObjectFactory method, you will need to have a specific design object type, assign this object with new attribute values and register this object with in the schematic document with the ISch\_Document’s RegisterSchObjectInContainer method\.  
__Example__

01

Var

02

    SchPort     : ISch\_Port;

03

    FSchDoc     : ISch\_Document;

04

    CurView     : IServerDocumentView;

05

Begin

06

    // Check if Schematic server exists or not\.

07

    If SchServer = Nil Then Exit;

08

  

09

    // Obtain the Schematid sheet interfac\.e

10

    FSchDoc := SchServer\.GetCurrentSchDocument;

11

    If FSchDoc = Nil Then Exit;

12

  

13

    // Create a new port object

14

    SchPort := SchServer\.SchObjectFactory\(ePort,eCreate\_GlobalCopy\);

15

    If SchPort = Nil Then Exit;

16

  

17

    // Set up parameters for the port object\.

18

    // the port is placed at 500,500 mils respectively\.

19

    SchPort\.Location  := Point\(MilsToCoord\(500\),MilsToCoord\(500\)\);

20

    SchPort\.Style     := ePortRight;

21

    SchPort\.IOType    := ePortBidirectional;

22

    SchPort\.Alignment := eHorizontalCentreAlign;

23

  

24

    SchPort\.Width     := MilsToCoord\(1000\);

25

  

26

    SchPort\.AreaColor := 0;

27

    SchPort\.TextColor := $FFFFFF;

28

    SchPort\.Name      := 'A new port with no net\.';

29

  

30

    // Add a port object onto the existing schematic document

31

    FSchDoc\.RegisterSchObjectInContainer\(SchPort\);

32

  

33

    // Refresh the schematic sheet\.

34

    FSchDoc\.GraphicallyInvalidate;

35

End;

__See also__  
ISch\_ServerInterface interface  
TObjectCreationMode type

##### DestroySchObject method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Procedure DestroySchObject\(Var ASchObject : ISch\_BasicContainer\);  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface

##### SetState\_ProbesTimerEnabled method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Procedure SetState\_ProbesTimerEnabled\(AValue : Boolean\);  
__Description__  
The ProbesTimerEnabled property determines whether the Probes are active or not\. This feature is used in the LiveDesign process in Altium Designer\.  
This property is supported by the GetState\_ProbesTimerEnabled and SetState\_ProbesTimerEnabled methods\.  
__Example__  
__See also__  
ISch\_ServerInterface interface

##### UpdateSignalValueDisplay method

\(ISch\_ServerInterface interface\)  
__Syntax__  
Function UpdateSignalValueDisplay\(DMObject : IDMObject; Value : Integer; BitIndex : Integer\) : LongBool;  
__Description__  
__Example__  
__See also__  
ISch\_ServerInterface interface