### Developed examples:

__Use of new IPCB\_LayerStack inteface to show available layers:__

01

\{\-\-\-\-\- for reference \-\-\-\-\-\- 

02

TLayerClassID:

03

  eLayerClass\_All

04

  eLayerClass\_Mechanical

05

  eLayerClass\_Physical

06

  eLayerClass\_Electrical

07

  eLayerClass\_Dielectric

08

  eLayerClass\_Signal

09

  eLayerClass\_InternalPlane

10

  eLayerClass\_SolderMask

11

  eLayerClass\_Overlay

12

  eLayerClass\_PasteMask

13

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\}

14

 

15

Procedure LayerInfo;

16

Var

17

  Board      : IPCB\_Board;

18

  Stack      : IPCB\_LayerStack;

19

  LyrObj     : IPCB\_LayerObject;

20

  LyrClass   : string;

21

 

22

Begin

23

  // layer class type nominated \(see TLayerClassID list above\)\.

24

  LyrClass : = eLayerClass\_Signal;

25

 

26

  Board := PCBServer\.GetCurrentPCBBoard;

27

  Stack := Board\.LayerStack;

28

 

29

  // get first layer of the class type\.

30

  LyrObj := Stack\.First\(LyrClass\);

31

 

32

  // exit if layer type is not available in stack

33

  If LyrObj = Nil then Exit;

34

 

35

  // iterate through layers and display each layer name

36

  Repeat

37

    ShowMessage\(LyrObj\.Name\);

38

    LyrObj := Stack\.Next\(LyrClass, LyrObj\);

39

  Until LyrObj = Nil;

40

 

41

End;

__Use of IPCB\_MasterLayerStack interface to show Sub Stack infomation:__

01

Procedure SubStackInfo;

02

Var

03

  Board       : IPCB\_Board;

04

  masterStack : IPCB\_MasterLayerStack;

05

  subStack    : IPCB\_LayerStack;

06

 

07

Begin

08

  Board := PCBServer\.GetCurrentPCBBoard;

09

  masterStack := Board\.MasterLayerStack;

10

  subStack := masterStack\.Substacks\[0\]; // nominate first substack: 0

11

 

12

  ShowInfo\('Number of sub stacks: ' \+ OleStrToString\(masterStack\.SubstackCount\)\);

13

  ShowInfo\('Layers in first sub stack: ' \+ OleStrToString\(subStack\.Count\)\);

14

  ShowInfo\('Is a flex layer: ' \+ OleStrToString\(subStack\.IsFlex\)\);

15

 

16

// if available, select second substack: 1

17

  if masterStack\.SubstackCount > 1 then

18

  begin

19

    subStack := masterStack\.Substacks\[1\];

20

    ShowInfo\('Layers in second sub stack: ' \+ OleStrToString\(subStack\.Count\)\);

21

    ShowInfo\('Is a flex layer: ' \+ OleStrToString\(subStack\.IsFlex\)\);

22

  end

23

  else Exit;

24

 

25

End;

__IPCB\_MechanicalLayer interface used to display enabled mechanical layers__:

01

Procedure MechLayerInfo;

02

Var

03

  Board      : IPCB\_Board;

04

  Stack      : IPCB\_LayerStack;

05

  mLyrObj    : IPCB\_MechanicalLayer;

06

  Lyr        : TLayer;

07

 

08

Begin

09

  Board := PCBServer\.GetCurrentPCBBoard;

10

  Stack := Board\.LayerStack;

11

 

12

  for Lyr := eMechanical1 to eMechanical16 do

13

  begin

14

    mLyrObj := Stack\.LayerObject\[Lyr\];

15

    If mLyrObj\.MechanicalLayerEnabled then ShowInfo\(mLyrObj\.Name\);

16

  end;

17

 

18

End;