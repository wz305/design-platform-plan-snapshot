### <a id="IPCB_Library_Interface"></a>IPCB\_Library Interface

__Overview__  
The __IPCB\_Library__ interface represents the library document\. A library document has a list of components \(footprints\)\. The component in focus in the PCB library is always the current component\. This current component is represented by the __IPCB\_LibComponent__ interface\.

To obtain the settings of the library document, you obtain the __IPCB\_Board__ interface, to obtain the primitives of a component \(footprint\), you obtain the __IPCB\_LibComponent__ interface via the Library Iterator interface\.

There is a three way relationship: the __IPCB\_Board__, the __IPCB\_LibComponent__ and the __IPCB\_Library__ interfaces that all work together for a PCB library document\.  
The __IPCB\_Library__ interface is a standalone interface\.

__IPCB\_Library methods__  
GetState\_CurrentComponent  
SetState\_CurrentComponent  
GetState\_Board  
RegisterComponent  
DeRegisterComponent  
GetUniqueCompName  
CreateNewComponent  
RemoveComponent  
GetComponentByName  
SetBoardToComponentByName  
Navigate\_FirstComponent  
SetCurrentComponentReference  
LibraryIterator\_Create  
LibraryIterator\_Destroy

__IPCB\_Library properties__  
CurrentComponent  
Board

__Example__

01

Var

02

    CurrentLib    : IPCB\_Library;

03

    NewPCBLibComp : IPCB\_LibComponent;

04

Begin

05

    If PCBServer = Nil Then Exit;

06

    CurrentLib := PcbServer\.GetCurrentPCBLibrary;

07

    If CurrentLib = Nil Then Exit;

08

     

09

    // ditto

10

End;

__See also__  
IPCB\_ServerInterface interface  
IPCB\_LibComponent interface  
IPCB\_LibraryIterator interface

#### GetState and SetState Methods

##### GetState\_Board method

\(IPCB\_Library interface\)  
__Syntax__  
Function GetState\_Board : IPCB\_Board;  
__Description__  
This function retrieves the __IPCB\_Board__ interface where the current component \(footprint\) is in\. This __IPCB\_Board__ interface also contains the system settings such as Snap Grid, Visible and Big Visible Grid Units and Output Options for the PCB library document\.  
There is a three way relationship: the __IPCB\_Board__, the __IPCB\_LibComponent__ and the __IPCB\_Library__ interfaces that all work together for the PCB library document\.  
__Example__  
__See also__  
IPCB\_Library interface

##### GetState\_CurrentComponent method

\(IPCB\_Library interface\)  
__Syntax__  
Function GetState\_CurrentComponent : IPCB\_LibComponent;  
__Description__  
This function fetches the current component that is in focus in the PCB library\. A footprint \(component\) in the library is represented by the__ IPCB\_LibComponent__ interface\. A PCB Library document is represented differently in regards to a PCB document; a pcb library is composed of footprints and each footprint has its own “window”\.  
__Example__  
__See also__  
IPCB\_Library interface  
IPCB\_Group interface

##### SetState\_CurrentComponent method

\(IPCB\_Library interface\)  
__Syntax__  
Procedure SetState\_CurrentComponent \(Const Component : IPcb\_LibComponent\);  
__Description__  
This procedure sets an existing component from the PCB library as the current component \(in focus\)\. Basically a component that is currently in focus in the library is the current component\.  
Note a footprint \(component\) in the library is represented by the __IPCB\_LibComponent__ interface\.  
__Example__  
__See also__  
IPCB\_Library interface

#### Methods

##### DeRegisterComponent method

\(IPCB\_Library interface\)  
__Syntax__  
Function DeRegisterComponent\(Component : IPcb\_LibComponent\) : Boolean;  
__Description__  
This method de\-registers this component from the PCB library\. That is, the library does not recognize this component after it has been de\-registered\.  
__Example__  
__See also__  
IPCB\_Library interface  
IPCB\_LibComponent interface

##### GetUniqueCompName method

\(IPCB\_Library interface\)  
__Syntax__  
Function  GetUniqueCompName  \(Const ATestCompName : TPCBString       \) : TPCBString;  
__Description__  
This function returns you the unique component name and if the supplied component name parameter is taken, this parameter is modified to guarantee its uniqueness\.  
__Example__  
__See also__  
IPCB\_Library interface  
IPCB\_LibComponent interface

##### CreateNewComponent method

\(IPCB\_Library interface\)  
__Syntax__  
Function  CreateNewComponent : IPCB\_LibComponent;  
__Description__  
This function creates a new component and it is represented by the IPCB\_LibComponent interface\. This is equivalent to the CreatePCBLibComp method from the IPCB\_ServerInterface interface\.  
__Example__  
__See also__  
IPCB\_Library interface  
IPCB\_LibComponent interface

##### RemoveComponent method

\(IPCB\_Library interface\)  
__Syntax__  
Procedure RemoveComponent \(Var AComponent : IPCB\_LibComponent\);  
__Description__  
This procedure removes a component from the current library\.  
__Example__  
__See also__  
IPCB\_Library interface  
IPCB\_LibComponent interface

##### SetBoardToComponentByName method

\(IPCB\_Library interface\)  
__Syntax__  
Function  SetBoardToComponentByName\(Const ACompName : TPCBString\) : Boolean;  
__Description__  
This function sets the current library to the specified component by its component name string\. If it is successful, a true value is returned\.  
__Example__  
__See also__  
IPCB\_Library interface  
IPCB\_LibComponent interface

##### Navigate\_FirstComponent method

\(IPCB\_Library interface\)  
__Syntax__  
Procedure Navigate\_FirstComponent;  
__Description__  
This procedure forces the library to navigate to the first component in the library and set the focus to it\.  
__Example__  
__See also__  
IPCB\_Library interface  
IPCB\_LibComponent interface

##### SetCurrentComponentReference method

\(IPCB\_Library interface\)  
__Syntax__  
Procedure SetCurrentComponentReference \(AX : TCoord;  
                                        AY : TCoord\);  
__Description__  
This procedure sets the component reference of the currently focused component as the center\.  
__Example__  
__See also__  
IPCB\_Library interface  
IPCB\_LibComponent interface

##### GetComponentByName method

\(IPCB\_Library interface\)  
__Syntax__  
Function GetComponentByName \(Const CompName : TPCBString \) : IPCB\_LibComponent;  
__Description__  
This function returns you the__ IPCB\_LibComponent__ of a PCB component \(footprint\) if the CompName string\.  
__Example__  
__See also__  
IPCB\_Library interface  
IPCB\_LibComponent interface

##### LibraryIterator\_Create method

\(IPCB\_Library interface\)  
__Syntax__  
Function LibraryIterator\_Create : IPCB\_LibraryIterator;  
__Description__  
This function creates a library iterator that fetches footprints in a PCB library\. Each footprint fetched by the iterator is a __IPCB\_LibComponent__ interface which is inherited by the__ IPCB\_Group__ interface\.  
__DelphiScript Example__

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

    // For each page of library is a footprint

14

    FootprintIterator := CurrentLib\.LibraryIterator\_Create;

15

    FootprintIterator\.SetState\_FilterAll;

16

  

17

    Try

18

        // Within each footprint page, fetch primitives of the footprint

19

        // A footprint is a IPCB\_LibComponent inherited from

20

        // the IPCB\_Group\. A container object that stores primitives\.

21

        Footprint := FootprintIterator\.FirstPCBObject;

22

        While Footprint <> Nil Do

23

        Begin

24

           // do what you want with the footprint 

25

           Footprint := FootprintIterator\.NextPCBObject;

26

        End;

27

    Finally

28

        CurrentLib\.LibraryIterator\_Destroy\(FootprintIterator\);

29

    End;

30

End;

__See also__  
IPCB\_LibraryIterator interface  
IPCB\_Library interface  
IPCB\_LibComponent interface

##### LibraryIterator\_Destroy method

\(IPCB\_Library interface\)  
__Syntax__  
Procedure LibraryIterator\_Destroy\(Var AIterator : IPCB\_LibraryIterator\);  
__Description__  
This __LibraryIterator\_Destroy__ method destroys the library iterator after it was used in iterating for footprints in a PCB library document\.  
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

    // For each page of library is a footprint

14

    FootprintIterator := CurrentLib\.LibraryIterator\_Create;

15

    FootprintIterator\.SetState\_FilterAll;

16

  

17

    Try

18

        // Within each page, fetch primitives of the footprint

19

        // A footprint is a IPCB\_LibComponent inherited from

20

        // IPCB\_Group which is a container object that stores primitives\.

21

        Footprint := FootprintIterator\.FirstPCBObject;

22

        While Footprint <> Nil Do

23

        Begin

24

           // do what you want with the footprint 

25

           Footprint := FootprintIterator\.NextPCBObject;

26

        End;

27

    Finally

28

        CurrentLib\.LibraryIterator\_Destroy\(FootprintIterator\);

29

    End;

30

End;

__See also__  
IPCB\_Library interface  
IPCB\_LibComponent interface  
IPCB\_LibraryIterator interface

##### RegisterComponent method

\(IPCB\_Library interface\)  
__Syntax__  
Function RegisterComponent \(Component : IPcb\_LibComponent\) : Boolean;  
__Description__  
The __RegisterComponent__ method registers the new footprint in the PCB library document, so that the PCB system is aware of this new footprint\.  
For example when creating a new footprint programmatically, this footprint needs to be registered in the PCB library first before setting it to be the current component\.  
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

    If PCBServer = Nil Then Exit;

07

    CurrentLib := PcbServer\.GetCurrentPCBLibrary;

08

    If CurrentLib = Nil Then Exit;

09

  

10

    NewPCBLibComp := PCBServer\.CreatePCBLibComp;

11

    NewPcbLibComp\.Name := 'ANewComponent';

12

  

13

    CurrentLib\.RegisterComponent\(NewPCBLibComp\);

14

    CurrentLib\.CurrentComponent := NewPcbLibComp;

15

    // ditto

16

End;

__See also__  
IPCB\_Library interface  
IPCB\_LibComponent interface

#### Properties

##### Board property

\(IPCB\_Library interface\)  
__Syntax__  
Property Board : IPCB\_Board Read GetState\_Board;  
__Description__  
The property represents the board that the current component is residing on in the PCB library document\. This __IPCB\_Board__ interface also contains the system settings such as Snap Grid, Visible and Big Visible Grid Units and Output Options for the PCB library document\.  
The read only __Board__ property is supported by the __GetState\_Board__ method\.  
There is a three way relationship: the __IPCB\_Board__, the __IPCB\_LibComponent__ and the __IPCB\_Library__ interfaces that all work together for a PCB library document\.  
__Example__  
__See also__  
IPCB\_Library interface

##### CurrentComponent property

\(IPCB\_Library interface\)  
__Syntax__  
Property CurrentComponent : IPCB\_LibComponent Read GetState\_CurrentComponent Write SetState\_CurrentComponent;  
__Description__  
This property determines the current component \(footprint\) that is in focus or displayed in the PCB library document in Altium Designer\.  
When creating a new footprint programmatically, this footprint needs to be registered in the PCB library first before setting it to be the current component\.  
This CurrentComponent property is supported by GetState\_CurrentComponent and SetState\_CurrentComponent methods\.  
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

    If PCBServer = Nil Then Exit;

07

    CurrentLib := PcbServer\.GetCurrentPCBLibrary;

08

    If CurrentLib = Nil Then Exit;

09

  

10

    NewPCBLibComp := PCBServer\.CreatePCBLibComp;

11

    NewPcbLibComp\.Name := 'ANewComponent';

12

  

13

    CurrentLib\.RegisterComponent\(NewPCBLibComp\);

14

    CurrentLib\.CurrentComponent := NewPcbLibComp;

15

    // ditto

16

End;

__See also__  
IPCB\_Library interface  
IPCB\_LibComponent interface