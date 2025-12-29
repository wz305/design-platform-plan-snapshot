### <a id="IPCB_ServerInterface"></a>IPCB\_ServerInterface

__Overview__  
When you need to work with PCB design objects in Altium Designer, the starting point is to invoke the __PCBServer__ function which returns the __IPCB\_ServerInterface__ interface\. You can extract the all other derived PCB interfaces that are exposed in the __IPCB\_ServerInterface__ interface\.

Note that these __IServerModule__ interfaces represent loaded servers in Altium Designer\. The Altium Designer application manages single instances of different server modules\. Each server can have multiple server document kinds, for example the PCB server supports two server document kinds – PCB and PCBLIB design documents\. A loaded server in Altium Designer  typically hosts documents and each document in turn hosts a document view and panel views\. Thus a PCB server also has the __IServerModule__ interface along with the__ IPCB\_ServerInterface__ interface\.

__Notes__  
To get an access to the current PCB document open in Altium Designer, you would invoke the __GetCurrentPCBBoard__ method from the __IPCB\_ServerInterface__ interface object to obtain the __IPCB\_Board__ interface\.

The factory methods produce specialized objects\. For example the __PCBObjectFactory__ method is invoked to produce a new PCB object\. You will need to add this object in a PCB board\. The__ TObjectCreationKind__ type denotes how the attributes of a new PCB object is set \(either from software default settings or from global settings as defined in the Preferences dialog within PCB\)\.

The __SendMessageToRobots__, __PreProcess and__ __PostProcess__ methods are used when you need to keep the Undo system and other sub systems of the PCB editor in synchronization, when you are adding, deleting or modifying objects to/from  the PCB document\.

__IPCB\_ServerInterface methods__  
GetState\_SystemOptions  
GetState\_InteractiveRoutingOptions  
GetState\_CanFastCrossSelect\_Emit  
GetState\_CanFastCrossSelect\_Receive  
SetState\_CanFastCrossSelect\_Emit  
SetState\_CanFastCrossSelect\_Receive  
GetState\_SpecialStringConverter  
  
CreatePCBLibComp  
DestroyPCBLibObject  
PCBDestroyObject  
GetCurrentPCBBoard  
GetCurrentPCBLibrary property  
GetPCBBoardByPath  
GetPCBLibraryByPath  
ObjectSupports  
PCBClassObjectFactory  
PCBClassObjectFactoryByClassMember  
LoadCompFromLibrary  
PCBObjectFactory  
PCBRuleFactory  
PostProcess  
Preprocess  
SendMessageToRobots  
PCBContourFactory  
DestroyPCBContour      

__IPCB\_ServerInterface properties__  
InteractiveRoutingOptions  
SystemOptions  
InteractiveRoutingOptions   
CanFastCrossSelect\_Emit     
CanFastCrossSelect\_Receive  
SpecialStringConverter      
TTFLettersCache             
TTFontsCache                
 

__See also__  
Creating/Deleting PCB objects and updating the Undo system  
Modifying PCB objects and updating the Undo system  
TObjectId enumerated values  
TDimensionKind enumerated values  
TObjectCreationMode enumerated values  
IPCB\_ObjectClass interface  
IPCB\_Rule interface  
IPCB\_LibComponent interface  
IPCB\_Primitive interface  
IPCB\_Board interface  
IPCB\_SystemOptions interface  
IPCB\_InteractiveRoutingOptions interface  
PCB Scripts from \\Examples\\Scripts\\Delphiscript\\PCB folder\.

#### GetState and SetState Methods

##### GetState\_SystemOptions method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  GetState\_SystemOptions : IPCB\_SystemOptions;  
__Description__  
The function returns the IPCB\_SystemOptions interface\.  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface  
IPCB\_SystemOptions interface

##### GetState\_InteractiveRoutingOptions method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  GetState\_InteractiveRoutingOptions : IPCB\_InteractiveRoutingOptions;  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### GetState\_CanFastCrossSelect\_Emit method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  GetState\_CanFastCrossSelect\_Emit     : Boolean;      
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### GetState\_CanFastCrossSelect\_Receive method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  GetState\_CanFastCrossSelect\_Receive  : Boolean;  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### SetState\_CanFastCrossSelect\_Emit method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Procedure SetState\_CanFastCrossSelect\_Emit   \(B : Boolean\);  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### SetState\_CanFastCrossSelect\_Receive method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Procedure SetState\_CanFastCrossSelect\_Receive\(B : Boolean\);  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### GetState\_SpecialStringConverter method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  GetState\_SpecialStringConverter  : IPCB\_SpecialStringConverter  
__Description__  
This function returns the Special String converter interface which deals with special string formats of PCB text objects\.  
__Example__  
   
__See also__  
IPCB\_SpecialStringConverter interface  
SpecialStringConverter property

#### Methods

##### CreatePCBLibComp method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  CreatePCBLibComp : IPCB\_LibComponent;  
__Description__  
The CreatePCBLibComp method creates a IPCB\_LibComponent based object interface that represents a library component within a library document\.  
__Example__

01

Var

02

    CurrentLib    : IPCB\_Library;

03

    NewPCBLibComp : IPCB\_LibComponent;

04

    NewPad        : IPCB\_Pad;

05

Begin

06

    If PCBServer        = Nil Then Exit;

07

    CurrentLib         := PcbServer\.GetCurrentPCBLibrary;

08

    If CurrentLib       = Nil Then Exit;

09

  

10

    NewPCBLibComp      := PCBServer\.CreatePCBLibComp;

11

    NewPcbLibComp\.Name := 'ANewComponent';

12

  

13

    CurrentLib\.RegisterComponent\(NewPCBLibComp\);

14

    PCBServer\.PreProcess;

15

  

16

    NewPad := PcbServer\.PCBObjectFactory\(ePadObject,eNoDimension,eCreate\_Default\);

17

    NewPad\.X        := MilsToCoord\(0\);

18

    NewPad\.Y        := MilsToCoord\(0\);

19

    NewPad\.TopXSize := MilsToCoord\(62\);

20

    NewPad\.TopYSize := MilsToCoord\(62\);

21

    NewPad\.HoleSize := MilsToCoord\(28\);

22

    NewPad\.Layer    := eMultiLayer;

23

    NewPad\.Name     := '1';

24

    NewPCBLibComp\.AddPCBObject\(NewPad\);

25

  

26

    PCBServer\.SendMessageToRobots\(CurrentLib\.Board\.I\_ObjectAddress,

27

        c\_Broadcast,

28

        PCBM\_BoardRegisteration,

29

        NewPCBLibComp\.I\_ObjectAddress\);

30

  

31

    PCBServer\.PostProcess;

32

  

33

    CurrentLib\.CurrentComponent := NewPcbLibComp;

34

    CurrentLib\.Board\.ViewManager\_FullUpdate;

35

End;

__See also__  
IPCB\_ServerInterface interface  
IPCB\_LibComponent interface  
DestroyPCBLibComp method  
IPCB\_Board and its ViewManager\_FullUpdate method\.

##### DestroyPCBLibObject method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Procedure DestroyPCBLibComp  \(Var APCBLibComp : IPCB\_LibComponent\);  
__Description__  
This procedure destroys a footprint within a library but it is not eliminated from the computer's memory\. A library is composed of footprints as pages and each footprint is represented by the __IPCB\_LibComponent__ interface\.  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### PCBDestroyObject method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Procedure DestroyPCBObject   \(Var APCBObject       : IPCB\_Primitive\);  
__Description__  
This procedure destroys a PCB object from the PCB document\. It is removed but not eliminated from computer memory\. For instance, the Undo system can bring this object back\.  
__Example__

01

var

02

    CurrentPCBBoard : IPCB\_Board;

03

    Iterator        : IPCB\_BoardIterator;

04

    Track           : IPCB\_Track;

05

    OldTrack        : IPCB\_Track;

06

Begin

07

    CurrentPCBBoard := PCBServer\.GetCurrentPCBBoard;

08

    If CurrentPCBBoard = Nil Then Exit;

09

  

10

    Iterator := CurrentPCBBoard\.BoardIterator\_Create;

11

    If Iterator = Nil Then Exit;

12

    Iterator\.AddFilter\_ObjectSet\(MkSet\(eTrackObject\)\);

13

    Iterator\.AddFilter\_LayerSet\(MkSet\(eTopLayer\)\);

14

    PCBServer\.PreProcess;

15

  

16

    Try

17

        Track := Iterator\.FirstPCBObject;

18

        While Track <> Nil Do

19

        Begin

20

            OldTrack := Track;

21

            Track := Iterator\.NextPCBObject;

22

            CurrentPCBBoard\.RemovePCBObject\(OldTrack\);

23

            PCBServer\.SendMessageToRobots\(CurrentPCBBoard\.I\_ObjectAddress,

24

                                          c\_BroadCast,

25

                                          PCBM\_BoardRegisteration,

26

                                          OldTrack\.I\_ObjectAddress\);

27

        End;

28

    Finally

29

        CurrentPCBBoard\.BoardIterator\_Destroy\(Iterator\);

30

    End;

31

    PCBServer\.PostProcess;

32

  

33

    // Refresh PCB screen

34

    Client\.SendMessage\('PCB:Zoom', 'Action=Redraw' , 255, Client\.CurrentView\);

35

End;

__See also__  
IPCB\_ServerInterface interface  
IPCB\_LibComponent interface

##### GetCurrentPCBBoard method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  GetCurrentPCBBoard : IPCB\_Board;  
__Description__  
This function returns you the __IPCB\_Board__ interface which represents the PCB document OR the PCB Library document\. The __IPCB\_Board__ interface has a __IsLibrary__ function which determines which type the document is; the PCB or PCBLib document\.  
__Example__

01

Var

02

    Board : IPCB\_Board;

03

Begin

04

    Board := PCBServer\.GetCurrentPCBBoard;

05

    If Board = Nil Then Exit;

06

  

07

    If Not Board\.IsLibrary Then

08

    Begin

09

        showMessage\('This is not a PCB library document\.'\);

10

        Exit;

11

    End;

12

End;

__See also__  
IPCB\_ServerInterface interface

##### GetCurrentPCBLibrary property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  GetCurrentPCBLibrary : IPCB\_Library;  
__Description__  
This function returns the IPCB\_Library interface which represents the PCB library document\.  
__Example__

01

Var

02

    CurrentLib        : IPCB\_Library;

03

    FootprintIterator : IPCB\_LibraryIterator;

04

    Footprint         : IPCB\_LibComponent;

05

Begin

06

    CurrentLib := PCBServer\.GetCurrentPCBLibrary;

07

    If CurrentLib = Nil Then

08

    Begin

09

        ShowMessage\('This is not a PCB Library document'\);

10

        Exit;

11

    End;

12

  

13

    // Each page of library is a footprint

14

    FootprintIterator := CurrentLib\.LibraryIterator\_Create;

15

    FootprintIterator\.SetState\_FilterAll;

16

    Footprint := FootprintIterator\.FirstPCBObject;

17

    While Footprint <> Nil Do

18

    Begin

19

       // do what you want with the footprint\.\.\.

20

       Footprint := FootprintIterator\.NextPCBObject;

21

    End;

22

Finally

23

    CurrentLib\.LibraryIterator\_Destroy\(FootprintIterator\);

24

End;

__See also__  
IPCB\_ServerInterface interface  
IPCB\_Library interface

##### GetPCBBoardByPath method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function GetPCBBoardByPath \(APath : TPCBString\) : IPCB\_Board;  
__Description__  
This function returns you the __IPCB\_Board__ interface representing the PCB document only if the path \(APath parameter\) represents a valid PCB document\.  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### GetPCBLibraryByPath method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  GetPCBLibraryByPath \(Const APath : TPCBString\) : IPCB\_Library;  
__Description__  
This function returns you the __IPCB\_Library__ interface representing the PCB document only if the path \(APath parameter\) represents this document\.  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface  
IPCB\_Library interface

##### ObjectSupports method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function ObjectSupports\(Const Instance : TObject; Const IID : TGUID; Out Intf\) : Boolean;  
__Description__  
This function checks if the PCB object in question is in fact one of the valid PCB object interfaces\.  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### PCBClassObjectFactory method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  PCBClassFactory\(Const AClassKind : TObjectId\) : IPCB\_ObjectClass;  
__Description__  
This function produces an object represented by the__ IPCB\_ObjectClass__ interface\. An Object class is a Design Rules Class that can store members which represent a group of design objects targetted by the design rules system in the PCB editor\.  
__Example__

01

Procedure CreateANewNetClass;

02

Var

03

    Board    : IPCB\_Board;

04

    NetClass : IPCB\_ObjectClass;

05

Begin

06

    Board := PCBServer\.GetCurrentPCBBoard;

07

    If Board = Nil Then Exit;

08

  

09

    Try

10

        PCBServer\.PreProcess;

11

        NetClass := PCBServer\.PCBClassFactoryByClassMember\(eClassMemberKind\_Net\);

12

        NetClass\.SuperClass := False;

13

        NetClass\.Name := 'NetGndClass';

14

        NetClass\.AddMemberByName\('GND'\);

15

        Board\.AddPCBObject\(NetClass\);

16

  

17

    Finally

18

        PCBServer\.PostProcess;

19

    End;

20

End;

__See also__  
IPCB\_ServerInterface interface  
PCBClassObjectFactoryByClassMember method

##### PCBClassObjectFactoryByClassMember method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  PCBClassFactoryByClassMember \(Const AClassKind : TClassMemberKind\) : IPCB\_ObjectClass;  
__Description__  
This function produces an object represented by the IPCB\_ObjectClass interface\. An Object class is a Design Rules Class that can store members which represent a group of design objects targetted by the design rules system in the PCB editor\.  
__Example__

01

Procedure CreateANewNetClass;

02

Var

03

    Board    : IPCB\_Board;

04

    NetClass : IPCB\_ObjectClass;

05

Begin

06

    Board := PCBServer\.GetCurrentPCBBoard;

07

    If Board = Nil Then Exit;

08

  

09

    Try

10

        PCBServer\.PreProcess;

11

        NetClass := PCBServer\.PCBClassFactoryByClassMember\(eClassMemberKind\_Net\);

12

        NetClass\.SuperClass := False;

13

        NetClass\.Name := 'NetGndClass';

14

        NetClass\.AddMemberByName\('GND'\);

15

        Board\.AddPCBObject\(NetClass\);

16

  

17

    Finally

18

        PCBServer\.PostProcess;

19

    End;

20

End;

__See also__  
IPCB\_ServerInterface interface  
PCBClassObjectFactory method

##### LoadCompFromLibrary method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  LoadCompFromLibrary\(Const APattern : TPCBString;  
                              Const ALibPath : TPCBString\) : IPCB\_LibComponent;  
__Description__  
This function produces an object which is represented by the __IPCB\_LibComponent__ interface\. A footprint in a library is also represented by the __IPCB\_LibComponent__ interface\.  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface  
IPCB\_LibComponent interface

##### PCBObjectFactory method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
PCBObjectFactory\(Const AObjectId      : TObjectId;  
                 Const ADimensionKind : TDimensionKind = eNoDimension;  
                 Const ACreationMode  : TObjectCreationMode = eCreate\_Default\) : IPCB\_Primitive;  
__Description__  
This function produces a PCB design object which is represented by the IPCB\_Primitive interface\. The IPCB\_Primitive interface is the ancestor interface for all PCB design objects in Altium Designer\.

- The __TObjectID__ value determines which object you wish to produce\.
- The __TDimensionKind__ value determines which dimension object you wish to produce\. By default it is eNoDimension\.
- The __TObjectCreationMode__ type determines which default values are used \- from the PCB Preferences dialog or default values used internally from the PCB Editor\.

__Example__

01

Var

02

    Board : IPCB\_Board;

03

    Via   : IPCB\_Via;

04

Begin

05

    Board := PCBServer\.GetCurrentPCBBoard;

06

    If Board = Nil Then Exit;

07

    // Create a Via object

08

    Via := PCBServer\.PCBObjectFactory\(eViaObject, eNoDimension, eCreate\_Default\);

09

    Via\.X         := MilsToCoord\(7500\);

10

    Via\.Y         := MilsToCoord\(7500\);

11

    Via\.Size      := MilsToCoord\(50\);

12

    Via\.HoleSize  := MilsToCoord\(20\);

13

    Via\.LowLayer  := eTopLayer;

14

    Via\.HighLayer := eBottomLayer;

15

    // Put the new Via object in the board object

16

    Board\.AddPCBObject\(Via\);

17

  

18

    // Refresh the PCB screen

19

    Client\.SendMessage\('PCB:Zoom', 'Action=Redraw' , 255, Client\.CurrentView\);

20

End;

__See also__  
IPCB\_ServerInterface interface

##### PCBRuleFactory method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  PCBRuleFactory\(Const ARuleKind : TRuleKind\) : IPCB\_Rule;  
__Description__  
This function produces a design rule object which is represented by the __IPCB\_Rule__ interface\.  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### PostProcess method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Procedure PostProcess;  
__Description__  
This procedure cleans up the robots process in the PCB editor, after a __PreProcess__ method and __SendMessageToRobots__ messages have been invoked\. This also stops the robots from listening to any more PCB messages\.  
__Example__

01

PCBServer\.PreProcess;

02

  

03

//Notify PCB that the fill object is going to be changed\.

04

PCBServer\.SendMessageToRobots\(

05

        Fill\.I\_ObjectAddress, 

06

        c\_Broadcast, 

07

        PCBM\_BeginModify , 

08

        c\_NoEventData\);

09

  

10

Fill\.Layer := eBottomLayer;

11

  

12

//Notify PCB that the fill object has been changed\.

13

PCBServer\.SendMessageToRobots\(

14

        Fill\.I\_ObjectAddress, 

15

        c\_Broadcast, 

16

        PCBM\_EndModify , 

17

        c\_NoEventData\);

18

  

19

PCBServer\.PostProcess;

__See also__  
IPCB\_ServerInterface interface  
PreProcess method  
SendMessageToRobots method

##### Preprocess method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Procedure PreProcess;  
__Description__  
This procedure initializes the PCB robots in the PCB editor so that the robots can listen to any PCB messages being broadcasted\. It is highly recommended to use Try Finally End blocks in your scripts or server code so that __PreProcess__ and __PostProcess__ methods can always be executed\. This is imperative to ensure that the PCB editor is in the correct state\.  
__Example__

01

Try

02

    PCBServer\.PreProcess;

03

  

04

    //Notify PCB that the fill object is going to be changed\.

05

    PCBServer\.SendMessageToRobots\(

06

        Fill\.I\_ObjectAddress, 

07

        c\_Broadcast, 

08

        PCBM\_BeginModify , 

09

        c\_NoEventData\);

10

  

11

    Fill\.Layer := eBottomLayer;

12

  

13

    //Notify PCB that the fill object has been changed\.

14

    PCBServer\.SendMessageToRobots\(

15

        Fill\.I\_ObjectAddress, 

16

        c\_Broadcast, 

17

        PCBM\_EndModify , 

18

        c\_NoEventData\);

19

Finally

20

    PCBServer\.PostProcess;

21

End;

__See also__  
IPCB\_ServerInterface interface  
PostProcess method  
SendMessageToRobots method

##### SendMessageToRobots method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Procedure SendMessageToRobots\(Source, Destination : Pointer; MessageID : Word; MessageData : Pointer\);  
__Description__  
The __SendMessageToRobots__ method sends a specific Message with the Source and Designation parameters into the PCB editor where the PCB robots are listening\. It is necessary to invoke the __PreProcess__ method first, and to invoke the  __PostProcess__ method after the __SendMessageToRobots__ methods\.  
__Parameters__

- The __Source__ parameter represents the PCB object\. You need to pass in the address of this object, thus the __I\_ObjectAddress__ method of a PCB Object Interface returns the address\.
- The __Destination__ parameter normally has the  __c\_Broadcast__ constant which denotes that the message is being broadcasted into the PCB editor\.
- The __MessageId__ parameter represents one of the PCB message constants\. See PCB Messages section for more details\.
- The __MessageData__ parameter can be one of the following values \- __c\_NoEventData__ when a PCB object is being modified, or when this object is being registered into the PCB editor, and you need to pass in the address of this object, thus the __I\_ObjectAddress__ method of a PCB Object Interface need to be invoked to return the address\.

__Notes__  
The PCB Messages are messages that are broadcasted into the PCB Editor server by the __SendMessageToRobots__ method\. There are different types of messages that describe a specific action within the PCB server\.

__Example 1__ \- SendMessageToRobots with BeginModify and EndModify calls

01

//Initialize robots in PCB

02

PCBServer\.PreProcess;

03

  

04

//Notify PCB that the fill object is going to be changed\.

05

PCBServer\.SendMessageToRobots\(

06

        Fill\.I\_ObjectAddress, 

07

        c\_Broadcast, 

08

        PCBM\_BeginModify , 

09

        c\_NoEventData\);

10

  

11

Fill\.Layer := eBottomLayer;

12

  

13

//Notify PCB that the fill object has been changed\.

14

PCBServer\.SendMessageToRobots\(

15

        Fill\.I\_ObjectAddress, 

16

        c\_Broadcast, 

17

        PCBM\_EndModify , 

18

        c\_NoEventData\);

19

  

20

// Clean up robots in PCB

21

PCBServer\.PostProcess;

__Example 2__ \- SendMessageToRobots with BoardRegistration call

01

//Initialize robots in PCB

02

PCBServer\.PreProcess;

03

  

04

//Create a text object;

05

TextObj := PCBServer\.PCBObjectFactory\(eTextObject, eNoDimension, eCreate\_Default\);

06

  

07

// notify the event manager that the pcb object is going to be modified

08

PCBServer\.SendMessageToRobots\(TextObj\.I\_ObjectAddress ,c\_Broadcast, PCBM\_BeginModify , c\_NoEventData\);

09

  

10

TextObj\.XLocation := Sheet\.SheetX \+ MilsToCoord\(100\);

11

TextObj\.YLocation := Sheet\.SheetY \+ MilsToCoord\(100\);

12

TextObj\.Layer     := eTopOverlay;

13

TextObj\.Text      := 'Text1';

14

TextObj\.Size      := MilsToCoord\(90\);   // sets the height of the text\.

15

Board\.AddPCBObject\(TextObj\);

16

// notify the event manager that the pcb object has been modified

17

PCBServer\.SendMessageToRobots\(TextObj\.I\_ObjectAddress, c\_Broadcast, PCBM\_EndModify         , c\_NoEventData\);

18

  

19

// notify that the pcb object has been registered in PCB\.

20

PCBServer\.SendMessageToRobots\(Board\.I\_ObjectAddress, c\_Broadcast, PCBM\_BoardRegisteration, TextObj\.I\_ObjectAddress\);

21

  

22

// Clean up robots in PCB

23

PCBServer\.PostProcess;

24

  

__See also__  
IPCB\_ServerInterface interface  
PostProcess method  
SendMessageToRobots method  
PCB Message Constants

##### PCBContourFactory method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Function  PCBContourFactory \(AArcResolution       : TCoord;  
                             Const ACX            : TCoord = 0;  
                             Const ACY            : TCoord = 0;  
                             Const ARotation      : TAngle = 0\) : IPCB\_Contour;

__Description__  
The PCBContourFactory function creates a contour object based on the Arc resolution, the centre X and Y coordinates and the orientation of the contour\.  
__Example__  
   
__See also__  
IPCB\_Contour interface  
DestroyPCBContour method

##### DestroyPCBContour method

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Procedure DestroyPCBContour  \(Var APCBContour      : IPCB\_Contour\);  
__Description__  
This DestroyPCBContour method destroys the object represented by the IPCB\_Contour interface which was created by the PCBContourFactory method\.  
__Example__  
   
__See also__  
IPCB\_Contour interface  
PCBContourFactory method

#### Properties

##### InteractiveRoutingOptions property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  InteractiveRoutingOptions  : IPCB\_InteractiveRoutingOptions Read GetState\_InteractiveRoutingOptions;  
__Description__  
This property returns you the __IPCB\_InteractiveRoutingOptions__ interface which represents the interactive routing options in the PCB editor\.  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface  
IPCB\_InteractiveRoutingOptions interface

##### SystemOptions property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  SystemOptions : IPCB\_SystemOptions Read GetState\_SystemOptions;  
__Description__  
The property returns you the __IPCB\_SystemOptions__ interface\. This interface is represented by the System Options in the PCB editor such as PCB document display options,  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface  
IPCB\_SystemOptions interface

##### CanFastCrossSelect\_Emit property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  CanFastCrossSelect\_Emit    : Boolean                        Read GetState\_CanFastCrossSelect\_Emit    Write SetState\_CanFastCrossSelect\_Emit;  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### CanFastCrossSelect\_Receive property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  CanFastCrossSelect\_Receive : Boolean                        Read GetState\_CanFastCrossSelect\_Receive Write SetState\_CanFastCrossSelect\_Receive;  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### SpecialStringConverter property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  SpecialStringConverter  : IPCB\_SpecialStringConverter    Read GetState\_SpecialStringConverter;  
__Description__  
This property is a read only property, however if you obtain the IPCB\_SpecialStringConverter interface, then you can invoke methods or properties to change the data within\.  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface  
IPCB\_SpecialStringConverter interface

##### TTFLettersCache property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  TTFLettersCache  : IPCB\_LettersCache              Read GetState\_TTFLettersCache;  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface

##### TTFontsCache property

\(IPCB\_ServerInterface interface\)  
__Syntax__  
Property  TTFontsCache : IPCB\_TTFontsCache Read GetState\_TTFontsCache;  
__Description__  
__Example__  
   
__See also__  
IPCB\_ServerInterface interface