### <a id="IPCB_Sheet"></a>IPCB\_Sheet

__Overview__  
The __IPCB\_Sheet__ interface represents the background workspace for the PCB document and can include fabrication and assembly documentation as well as the board outline\. The__ IPCB\_Board__ interface has the __IPCB\_Sheet__ interface as an aggregation interface because a sheet is part of the PCB document\.  
__Notes__  
The sheet behind the PCB can be shown or not\.  
The coordinates of the PCB sheet can be defined programmatically\.

__IPCB\_Sheet methods__  
I\_ObjectAddress

__IPCB\_Sheet properties__  
SheetX  
SheetY  
SheetWidth  
SheetHeight  
ShowSheet  
LockSheet

__See also__  
IPCB\_Board

#### Methods

##### I\_ObjectAddress method

\(IPCB\_AbstractIterator, IPCB\_BoardIterator, IPCB\_SpatialIterator, IPCB\_GroupIterator, IPCB\_Sheet\)  
__Syntax__  
Function I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
The __I\_ObjectAddress__ property retrieves the pointer to the iterator object\. This property is useful for situations where you need to have references to objects \(not to object interfaces\) and store them in a TList container for example\.  
__See also__  
IPCB\_Sheet interface

#### Properties

##### SheetHeight property

\(IPCB\_Board interface\)  
__Syntax__  
Property  SheetHeight : TCoord Read GetState\_SheetHeight Write SetState\_SheetHeight;  
__Description__  
The SheetHeight property represents the sheet's height\.  
__Example__  
   
__See also__  
IPCB\_Sheet interface

##### SheetWidth property

\(IPCB\_Sheet interface\)  
__Syntax__  
Property  SheetWidth : TCoord Read GetState\_SheetWidth Write SetState\_SheetWidth;  
__Description__  
The SheetWidth property represents the width of the sheet\.  
__Example__  
   
__See also__  
IPCB\_Sheet interface

##### SheetX property

\(IPCB\_Sheet interface\)  
__Syntax__  
Property  SheetX : TCoord Read GetState\_SheetX Write SetState\_SheetX;  
__Description__  
The SheetX property represents the X coordinate of the sheet\.  
__Example__  
   
__See also__  
IPCB\_Sheet interface

##### SheetY property

\(IPCB\_Sheet interface\)  
__Syntax__  
Property  SheetY : TCoord Read GetState\_SheetY Write SetState\_SheetY;  
__Description__  
The SheetY property represents the Y coordinate of the sheet\.  
__Example__  
   
__See also__  
IPCB\_Sheet interface

##### ShowSheet method

\(IPCB\_Sheet interface\)  
__Syntax__  
Property  ShowSheet : Boolean Read GetState\_ShowSheet Write SetState\_ShowSheet;  
__Description__  
This property retrieves or sets the boolean value\. The Sheet property represents the bounds where a board outline and assembly / fabrication details are included within\.  
__Example__

01

Function UnitToString\(U : TUnit\) : TPCBString;

02

Begin

03

    Result := '';

04

    Case U of

05

       eImperial : Result := 'Imperial \(mil\)';

06

       eMetric   : Result := 'Metric \(mm\)';

07

    End;

08

End;

09

\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}

10

\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}

11

Function BoolToString\(B : Boolean\) : TPCBString;

12

Begin

13

    Result := 'False';

14

    If B Then Result := True;

15

End;

16

\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}

17

\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}

18

Procedure Query\_Board;

19

Var

20

    Board         : IPCB\_Board;

21

    LibraryExists : TPCBString;

22

    AShowSheet    : TPCBString;

23

    ALockSheet    : TPCBString;

24

Begin

25

    Board := PCBServer\.GetCurrentPCBBoard;

26

    If Board = Nil Then Exit;

27

    LibraryExists := BoolToString\(Board\.IsLibrary\);

28

    AShowSheet    := BoolToString\(Board\.PCBSheet\.ShowSheet\);

29

    ALockSheet    := BoolToString\(Board\.PCBSheet\.LockSheet\);

30

    ShowMessage\(

31

        'Board Handle  = '   \+ IntToStr    \(Board\.I\_ObjectAddress\)      \+ \#13 \+

32

        'Window Handle = '   \+ IntToStr    \(Board\.PCBWindow\)            \+ \#13 \+

33

        'Board Filename ='   \+              Board\.FileName              \+ \#13 \+

34

        'Is a Library = '    \+              LibraryExists               \+ \#13 \+

35

        'Origin X = '        \+ IntToStr    \(Board\.XOrigin\)              \+ \#13 \+

36

        'Origin Y = '        \+ IntToStr    \(Board\.YOrigin\)              \+ \#13 \+

37

        'Board Units = '     \+ UnitToString\(Board\.DisplayUnit\)          \+ \#13 \+

38

        'Current layer = '   \+ Layer2String\(Board\.CurrentLayer\)         \+ \#13 \+

39

        'Sheet\.X = '         \+ IntToStr    \(Board\.PCBSheet\.SheetX\)      \+ \#13 \+

40

        'Sheet\.Y = '         \+ IntToStr    \(Board\.PCBSheet\.SheetY\)      \+ \#13 \+

41

        'Sheet\.Height = '    \+ IntToStr    \(Board\.PCBSheet\.SheetHeight\) \+ \#13 \+

42

        'Sheet\.Width = '     \+ IntToStr    \(Board\.PCBSheet\.SheetWidth\)

43

        'Sheet is shown = '  \+              AShowSheet                  \+ \#13 \+

44

        'Sheet is locked = ' \+              ALockSheet

45

    \);

46

End;

__See also__  
IPCB\_Sheet interface

##### LockSheet method

\(IPCB\_Sheet interface\)  
__Syntax__  
Property  LockSheet : Boolean Read GetState\_LockSheet Write SetState\_LockSheet;  
__Description__  
The LockSheet property represents whether the objects on a mechanical layer linked to the sheet is locked or not\.  
__Example__  
   
__See also__  
IPCB\_Sheet interface