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