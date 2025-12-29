### <a id="IPCB_DrillLayerPair"></a>IPCB\_DrillLayerPair

__Overview__  
The IPCB\_DrillLayerPair interface represents the paired drill layer for the layer stack up for the PCB document\.  
__Notes__  
The IPCB\_DrillLayerPair interface is a standalone interface\.  
The IPCB\_DrillLayerPair interface is a DrillLayerPair property from the IPCB\_Board interface\.

__DrillLayerPair methods__

__DrillLayerPair properties__

I\_ObjectAddress  
GetState\_Description  
IsSimilarTo  
OrderLayers

LowLayer  
HighLayer  
StartLayer  
StopLayer  
Board  
PlotDrillDrawing  
PlotDrillGuide

__Example__

01

Procedure ReportDrillPairs;

02

Var

03

    PCBBoard     : IPCB\_Board;

04

    i            : Integer;

05

    LayerPairs   : TStringList;

06

    PCBLayerPair : IPCB\_DrillLayerPair;

07

    LowLayerObj  : IPCB\_LayerObject;

08

    HighLayerObj : IPCB\_LayerObject;

09

    LowPos       : Integer;

10

    HighPos      : Integer;

11

    LS           : String;

12

 

13

Begin

14

    PCBBoard := PCBServer\.GetCurrentPCBBoard;

15

    If PCBBoard = Nil Then Exit;

16

 

17

    // Show number of drill layer pairs on board

18

    ShowInfo\('Number of Drill Layer pairs: ' \+ IntToStr\(PCBBoard\.DrillLayerPairsCount\)\);

19

 

20

    LayerPairs := TStringList\.Create;

21

    For i := 0 To PCBBoard\.DrillLayerPairsCount \- 1 Do

22

    Begin

23

        PCBLayerPair := PCBBoard\.LayerPair\[i\];

24

        LowLayerObj  := PCBBoard\.LayerStack\.LayerObject\[PCBLayerPair\.LowLayer\];

25

        HighLayerObj := PCBBoard\.LayerStack\.LayerObject\[PCBLayerPair\.HighLayer\];

26

        LowPos       := PCBBoard\.LayerPositionInSet\(SignalLayers, LowLayerObj\);

27

        HighPos      := PCBBoard\.LayerPositionInSet\(SignalLayers, HighLayerObj\);

28

 

29

        If LowPos <= HighPos Then

30

            LayerPairs\.Add\(LowLayerObj \.Name \+ ' \- ' \+ HighLayerObj\.Name\)

31

        Else

32

            LayerPairs\.Add\(HighLayerObj\.Name \+ ' \- ' \+ LowLayerObj \.Name\);

33

    End;

34

 

35

    //Display layer pairs\.

36

    LS := '';

37

    For i := 0 to LayerPairs\.Count \- 1 Do

38

        LS := LS \+ LayerPairs\[i\] \+ \#13\#10;

39

    ShowInfo\('Layer Pairs:'\#13\#10 \+ LS\);

40

    LayerPairs\.Free;

41

End;