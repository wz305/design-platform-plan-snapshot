# Updates

Created: June 06, 2016 | __Updated: September 26, 2016__ | Applies to versions: 20\.1, 20\.2 and 21 

__Now reading version 21\.__ For the latest, read: [Updates for version 22](https://www.altium.com/documentation/altium-designer/technical-reference-pcb-apiupdates)

Note

The features available depend on your Altium product access level\. Compare features included in the various levels of [Altium Designer Software Subscription](https://www.altium.com/altium-designer/subscription) and functionality delivered through applications provided by the [Altium 365 platform](https://www.altium365.com/)\.

If you don’t see a discussed feature in your software, [contact Altium Sales](https://www.altium.com/contact-us) to find out more\.

Please note that this documentation was last updated for an older version of Altium Designer\. While many of the principles and approaches will remain the same, be aware that interfaces, objects, methods, properties, and the like will have changed since then, and will not reflect the entirety of those found in later versions of the software\.


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


IPCB\_LayerStackBase  
    IPCB\_LayerStack \*  
IPCB\_LayerStack\_V7 \*




__Method__s  
RemoveFromStack \(L : IPCB\_LayerObject\);    
InsertInStackBelow \(RefL : IPCB\_LayerObject;  
                      L  : IPCB\_LayerObject\);    
InsertInStackAbove \(RefL : IPCB\_LayerObject;  
                      L  : IPCB\_LayerObject\);    
FirstLayer : IPCB\_LayerObject;   
NextLayer \(L : IPCB\_LayerObject\) : IPCB\_LayerObject;   
PreviousLayer \(L : IPCB\_LayerObject\) : IPCB\_LayerObject;   
LastLayer : IPCB\_LayerObject;   
InsertLayer \(L : TLayer\);  
LastInternalPlane : IPCB\_InternalPlane;  
FirstAvailableSignalLayer : IPCB\_LayerObject;   
FirstAvailableInternalPlane : IPCB\_InternalPlane;  
SignalLayerCount : Integer;  
GetState\_LayerStackStyle : TLayerStackStyle;  
SetState\_LayerStackStyle\(SS : TLayerStackStyle\);

__Methods/Functions__  
RemoveFromStack\(L : IPCB\_LayerObject\_V7\);  
InsertInStackBelow \(RefL : IPCB\_LayerObject\_V7;  
                      L : IPCB\_LayerObject\_V7\);  
InsertInStackAbove \(RefL : IPCB\_LayerObject\_V7;  
                      L : IPCB\_LayerObject\_V7\);  
FirstLayer : IPCB\_LayerObject\_V7;  
NextLayer\(L : IPCB\_LayerObject\_V7\) : IPCB\_LayerObject\_V7;  
PreviousLayer\(L : IPCB\_LayerObject\_V7\) : IPCB\_LayerObject\_V7;  
LastLayer : IPCB\_LayerObject\_V7;  
InsertLayer\(L : TV6\_Layer\);  
LastInternalPlane : IPCB\_InternalPlane\_V7;  
FirstAvailableSignalLayer : IPCB\_LayerObject\_V7;  
FirstAvailableInternalPlane : IPCB\_InternalPlane\_V7;  
SignalLayerCount : Integer;  
GetState\_LayerStackStyle : TLayerStackStyle;  
SetState\_LayerStackStyle\(SS : TLayerStackStyle\);  
LayersInStackCount : Integer;

__Methods/Functions__  
I\_ObjectAddress : TPCBObjectHandle;  
ID : WideString;  
StateID : Integer;  
Count : Integer; //three forms \(usage in source\)  
Iterator : IPCB\_LayerObjectIterator; //three forms  
First\(t : TLayerClassID\) : IPCB\_LayerObject;  
Last\(t : TLayerClassID\) : IPCB\_LayerObject;  
Next\(t : TLayerClassID; ARefLayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
Previous\(t : TLayerClassID; ARefLayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
\-\-\- above inherited from IPCB\_LayerStackBase \-\-\-  
Board : IPCB\_Board;  
LayerObject\(ALayer : TV6\_Layer\) : IPCB\_LayerObject;  
LayerObject\(ALayer : TV7\_Layer\) : IPCB\_LayerObject;  
DielectricTop : IPCB\_SolderMaskLayer;  
DielectricBottom : IPCB\_SolderMaskLayer;

__Properties__  
Board : IPCB\_BoardRead  
    \- GetState\_Board;  
LayerObject \[L : TLayer\]: IPCB\_LayerObject  
    \- GetState\_LayerObject;  
DielectricTop : IPCB\_DielectricObject  
    \- GetState\_DielectricTop;  
DielectricBottom: IPCB\_DielectricObject  
    \- GetState\_DielectricBottom;  
ShowDielectricTop : Boolean  
    \- GetState\_ShowTopDielectric;  
    \- SetState\_ShowTopDielectric;  
ShowDielectricBottom: Boolean  
    \- GetState\_ShowBotDielectric;  
    \- SetState\_ShowBotDielectric;

__Properties__  
Board : IPCB\_BoardRead  
    \- GetState\_Board;  
LayerObject \[L : TLayer\]: IPCB\_LayerObject  
    \- GetState\_LayerObject;  
DielectricTop : IPCB\_DielectricObject  
    \- GetState\_DielectricTop;  
DielectricBottom: IPCB\_DielectricObject  
    \- GetState\_DielectricBottom;  
ShowDielectricTop : Boolean  
    \- GetState\_ShowTopDielectric;  
    \- SetState\_ShowTopDielectric;  
ShowDielectricBottom: Boolean  
    \- GetState\_ShowBotDielectric;  
    \- SetState\_ShowBotDielectric;

__Properties__  
Name : TPCBString  
    \- GetState\_Name;  
    \- SetState\_Name;  
IsFlex : Boolean  
    \- GetState\_IsFlex;  
    \- SetState\_IsFlex;  
\-\-\- above inherited from IPCB\_LayerStackBase \-\-\-  
ShowDielectricTop : Boolean  
    \- GetState\_ShowTopDielectric;  
    \- SetState\_ShowTopDielectric;  
ShowDielectricBottom : Boolean  
    \- GetState\_ShowBotDielectric;  
    \- SetState\_ShowBotDielectric;


__Inheritance__  
IPCB\_LayerObject \*  
    IPCB\_PhysicalLayer  
        IPCB\_ElectricalLayer  
            IPCB\_LayerObject\_V7 \*




__Methods__  
I\_ObjectAddress : TPCBObjectHandle;  
IsInLayerStack : Boolean;

__Methods/Functions__  
I\_ObjectAddress : Pointer  
IsInLayerStack : Boolean;  
V7\_LayerID : IDispatch; \(TV7\_Layer\)  
V6\_LayerID : TV6\_Layer;  
LayerStack : IPCB\_LayerStackBase;  
\-\-\- above inherited from IPCB\_LayerObject \-\-\-  
Dielectric : IPCB\_DielectricObject;  
LayerID : TV6\_Layer;

__Methods/Functions__  
I\_ObjectAddress : Pointer  
IsInLayerStack : Boolean;  
V7\_LayerID : IDispatch; \(TV7\_Layer\)  
V6\_LayerID : TV6\_Layer;  
LayerStack : IPCB\_LayerStackBase;

__Properties__  
LayerStack : IPCB\_LayerStack  
    \- GetState\_LayerStack;  
LayerID : TLayer  
    \- GetState\_LayerID;  
    \- Write SetState\_LayerID;  
Name: TPCBString  
    \- GetState\_LayerName;  
    \- SetState\_LayerName;  
CopperThickness : TCoord  
    \- GetState\_CopperThickness;  
    \- SetState\_CopperThickness;  
Dielectric  : IPCB\_DielectricObject  
    \- GetState\_Dielectric;  
UsedByPrims : Boolean  
    \- GetState\_UsedByPrims;  
    \- SetState\_UsedByPrims;  
IsDisplayed\[Board : IPCB\_Board\] : Boolean  
    \- GetState\_IsDisplayed;  
    \- SetState\_IsDisplayed;  
PreviousLayer : TLayer  
    \- GetState\_PreviousLayer;  
    \- SetState\_PreviousLayer;  
NextLayer : TLayer  
    \- GetState\_NextLayer;  
    \- SetState\_NextLayer;

__Properties__  
Name : TPCBString  
    \- GetState\_LayerName;  
    \- SetState\_LayerName;  
UsedByPrims : Boolean  
    \- GetState\_UsedByPrims;  
    \- SetState\_UsedByPrims;  
\-\-\- above inherited from IPCB\_LayerObject \-\-\-  
CopperThickness : Tcoord  
    \- GetState\_CopperThickness;  
    \- SetState\_CopperThickness;  
\-\-\- above inherited from IPCB\_ElectricalLayer \-\-\-  
IsDisplayed \[Board : IPCB\_Board\] : Boolean  
    \- GetState\_IsDisplayed;  
    \- SetState\_IsDisplayed;  
 

__Properties__  
Name : TPCBString  
    \- GetState\_LayerName;  
    \- SetState\_LayerName;  
UsedByPrims : Boolean  
    \- GetState\_UsedByPrims;  
    \- SetState\_UsedByPrims;


__Inheritance__  
IPCB\_LayerObject  
    IPCB\_PhysicalLayer  
        IPCB\_ElectricalLayer  
            IPCB\_LayerObject\_V7  
            IPCB\_InternalPlane \*  
                IPCB\_InternalPlane\_V7 \*




__Methods__  
I\_ObjectAddress : TPCBObjectHandle;  
IsInLayerStack : Boolean;  
\-\- above from IPCB\_LayerObject \-\-

see \->

__Methods__  
I\_ObjectAddress : Pointer  
IsInLayerStack : Boolean;  
V7\_LayerID : IDispatch; \(TV7\_Layer\)  
V6\_LayerID : TV6\_Layer;  
LayerStack : IPCB\_LayerStackBase;

__Properties__  
LayerStack : IPCB\_LayerStack  
    \- GetState\_LayerStack;  
LayerID : TLayer  
    \- GetState\_LayerID;  
    \- Write SetState\_LayerID;  
Name: TPCBString  
    \- GetState\_LayerName;  
    \- SetState\_LayerName;  
CopperThickness : TCoord  
    \- GetState\_CopperThickness;  
    \- SetState\_CopperThickness;  
Dielectric  : IPCB\_DielectricObject  
    \- GetState\_Dielectric;  
UsedByPrims : Boolean  
    \- GetState\_UsedByPrims;  
    \- SetState\_UsedByPrims;  
IsDisplayed\[Board : IPCB\_Board\] : Boolean  
    \- GetState\_IsDisplayed;  
    \- SetState\_IsDisplayed;  
PreviousLayer : TLayer  
    \- GetState\_PreviousLayer;  
    \- SetState\_PreviousLayer;  
NextLayer : TLayer  
    \- GetState\_NextLayer;  
    \- SetState\_NextLayer;  
\-\- above from IPCB\_LayerObject \-\-  
PullBackDistance: TCoord  
    \- GetState\_PullBackDistance;  
    \- SetState\_PullBackDistance;  
NetName : TPCBString  
    \- GetState\_NetName;  
    \- SetState\_NetName;  
FirstPreviousSignalLayer: TLayer  
    \- GetState\_FirstPreviousSignalLayer;  
FirstNextSignalLayer: TLayer  
    \- GetState\_FirstNextSignalLayer;

see \->

__Properties__  
Name : TPCBString  
    \- GetState\_LayerName;  
    \- SetState\_LayerName;  
UsedByPrims : Boolean  
    \- GetState\_UsedByPrims;  
    \- SetState\_UsedByPrims;  
\-\-\- above inherited from IPCB\_LayerObject \-\-\-  
CopperThickness : Tcoord  
    \- GetState\_CopperThickness;  
    \- SetState\_CopperThickness;  
\-\-\- above inherited from IPCB\_ElectricalLayer \-\-\-  
PullBackDistance : Tcoord  
    \- GetState\_PullBackDistance;  
    \- SetState\_PullBackDistance;  
NetName : TPCBString  
    \- GetState\_NetName;  
    \- SetState\_NetName;  
 

 


\- introduced interfaces\.

__Inheritance__  
IPCB\_LayerStackBase  
    IPCB\_MasterLayerStack \*  
    IPCB\_LayerStack \*




__Methods/Functions__  
Contains\(L : TV7\_Layer\) : Boolean;  
IsFinite : Boolean;  
LayerIterator : IPCB\_LayerIterator;  
GetFirstLayer : TV7\_Layer;  
ContainsInternalPlaneLayers : Boolean;  
IsAllLayers : Boolean;  
IsEmpty : Boolean;  
ToString : WideString;  
EqualTo\_1\(ALayerSet : TLayerPartitionSet\) : Boolean;  
SerializeToString : WideString;  
Include\(L : TV7\_Layer\) : IPCB\_LayerSet;  
Exclude\(L : TV7\_Layer\) : IPCB\_LayerSet;  
ExcludeAllLayers : IPCB\_LayerSet;  
ExcludeSignalLayers : IPCB\_LayerSet;  
ExcludeMechanicalLayers : IPCB\_LayerSet;  
ExcludeInternalPlaneLayers : IPCB\_LayerSet;  
IncludeSignalLayers : IPCB\_LayerSet;  
IncludeMiscLayers : IPCB\_LayerSet;  
IncludeMechanicalLayers : IPCB\_LayerSet;  
IncludeInternalPlaneLayers : IPCB\_LayerSet;  
IncludeStandardLayers : IPCB\_LayerSet;  
IncludeAllLayers : IPCB\_LayerSet;  
Complement : IPCB\_LayerSet;  
Intersection\(LayerSet : IPCB\_LayerSet\) : IPCB\_LayerSet;  
Union\(LayerSet : IPCB\_LayerSet\) : IPCB\_LayerSet;  
Replicate : IPCB\_LayerSet;  
EqualTo\(ALayerSet : IPCB\_LayerSet\) : Boolean;

__Methods/Functions__  
I\_ObjectAddress : Pointer  
ID : WideString;  
StateID : Integer;  
Count : Integer;  //three versions \(usage in source\)  
Iterator : IPCB\_LayerObjectIterator;  //three versions  
First\(t : TLayerClassID\) : IPCB\_LayerObject;  
Last\(t : TLayerClassID\) : IPCB\_LayerObject;  
Next\(t : TLayerClassID; ARefLayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
Previous\(t : TLayerClassID; ARefLayer : IPCB\_LayerObject\) : IPCB\_LayerObject;

__Methods/Functions__  
I\_ObjectAddress : Pointer  
ID : WideString;  
StateID : Integer;  
Count : Integer;  //three versions \(usage in source\)  
Iterator : IPCB\_LayerObjectIterator;  //three versions  
First\(t : TLayerClassID\) : IPCB\_LayerObject;  
Last\(t : TLayerClassID\) : IPCB\_LayerObject;  
Next\(t : TLayerClassID; ARefLayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
Previous\(t : TLayerClassID; ARefLayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
\-\-\- above inherited from IPCB\_LayerStackBase \-\-\- 

Board : IPCB\_Board;  
CreateLayer    \(ALayer : TV7\_Layer\) : IPCB\_LayerObject;  
RemoveLayer    \( Layer : IPCB\_LayerObject\) : Boolean;  
InsertOnTop    \(ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
InsertOnBottom \(ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
InsertBelow    \(ARefLayer, ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
InsertAbove    \(ARefLayer, ALayer : IPCB\_LayerObject\) : IPCB\_LayerObject;  
DisableLayer   \(ASubstack : IPCB\_LayerStack; ALayer : IPCB\_LayerObject\);  
EnableLayer    \(ASubstack : IPCB\_LayerStack; ALayer : IPCB\_LayerObject\);  
CreateSubstack : IPCB\_LayerStack;  
RemoveSubstack \( Substack : IPCB\_LayerStack\) : Boolean;  
Import\_FromParameters \(Params : PChar\);  
Export\_ToParameters   \(Params : PChar\);  
GetSubstack\(ASubstackID : TPCBString\) : IPCB\_LayerStack;  
SubstackCount : Integer;

 

__Properties__  
Name : TPCBString  
    \- GetState\_Name;  
    \- SetState\_Name;  
IsFlex : Boolean  
    \- GetState\_IsFlex;  
    \- SetState\_IsFlex;

__Properties__  
Name : TPCBString  
    \- GetState\_Name;  
    \- SetState\_Name;  
IsFlex : Boolean  
    \- GetState\_IsFlex;  
    \- SetState\_IsFlex;  
\-\-\- above inherited from IPCB\_LayerStackBase \-\-\- 

Substacks\[Index : Integer\] : IPCB\_LayerStack  
    \- GetState\_Substacks;  
LayerStackStyle : TLayerStackStyle  
    \- GetState\_LayerStackStyle  
    \- SetState\_LayerStackStyle;

 

IPCB\_LayerSet  
IPCB\_LayerStackBase  
IPCB\_MasterLayerStack  
IPCB\_LayerSetUtils  
IPCB\_LayerUtils

IPCB\_LayerIterator  
IPCB\_LayerListIterator  
IPCB\_LayerObjectIterator

IPCB\_PhysicalLayer \- Note: = IPCB\_LayerObject  
IPCB\_SolderMaskLayer \- Note:  = IPCB\_DielectricLayer  
IPCB\_OverlayLayer \- Note:  = IPCB\_PhysicalLayer  
IPCB\_PasteMaskLayer \- Note:  = IPCB\_PhysicalLayer  
IPCB\_ElectricalLayer  
IPCB\_SignalLayer

IPCB\_InternalPlane\_V7 \- Note: = IPCB\_InternalPlane  
IPCB\_DielectricObject  \- Note: now = IPCB\_DielectricLayer  
IPCB\_SplitPlane \- from IPCB\_Group  
IPCB\_SplitPlaneRegion \- from IPCB\_Region

IPCB\_ObjectClass  
IPCB\_ObjectClass2  
IPCB\_ObjectClassBase  
IPCB\_ObjectClass1

__Note:__

- If Scripting system  
  TLayer = Integer;  
Else  
  TLayer = TV7\_Layer;  
End

Constant definitions:

- If Scripting system  
  eNoLayer = eV6\_NoLayer;  
  eTopLayer = eV6\_TopLayer;  
  etc\.\.\.  
Else  
  eNoLayer = eV7\_NoLayer;  
  eTopLayer = eV7\_TopLayer;  
  etc\.\.\.  
End

     Note: 'Else' indicates SDK  
 

Type: TLayerClassID  
TLayerClassID = \(eLayerClass\_All, eLayerClass\_Mechanical, eLayerClass\_Physical, eLayerClass\_Electrical, eLayerClass\_Dielectric, eLayerClass\_Signal, eLayerClass\_InternalPlane, eLayerClass\_SolderMask, eLayerClass\_Overlay, eLayerClass\_PasteMask\);

Type: TV6\_Layer \- \(equiv TLayer; Enum Type\)  
TV6\_Layer = \( eV6\_NoLayer, eV6\_TopLayer, eV6\_MidLayer1, eV6\_MidLayer2, eV6\_MidLayer3, eV6\_MidLayer4, eV6\_MidLayer5, eV6\_MidLayer6, eV6\_MidLayer7, eV6\_MidLayer8, eV6\_MidLayer9, eV6\_MidLayer10, eV6\_MidLayer11, eV6\_MidLayer12, eV6\_MidLayer13, eV6\_MidLayer14, eV6\_MidLayer15, eV6\_MidLayer16, eV6\_MidLayer17, eV6\_MidLayer18, eV6\_MidLayer19, eV6\_MidLayer20, eV6\_MidLayer21, eV6\_MidLayer22, eV6\_MidLayer23, eV6\_MidLayer24, eV6\_MidLayer25, eV6\_MidLayer26, eV6\_MidLayer27, eV6\_MidLayer28, eV6\_MidLayer29, eV6\_MidLayer30, eV6\_BottomLayer, eV6\_TopOverlay, eV6\_BottomOverlay, eV6\_TopPaste, eV6\_BottomPaste, eV6\_TopSolder, eV6\_BottomSolder, eV6\_InternalPlane1, eV6\_InternalPlane2, eV6\_InternalPlane3, eV6\_InternalPlane4, eV6\_InternalPlane5, eV6\_InternalPlane6, eV6\_InternalPlane7, eV6\_InternalPlane8, eV6\_InternalPlane9, eV6\_InternalPlane10, eV6\_InternalPlane11, eV6\_InternalPlane12, eV6\_InternalPlane13, eV6\_InternalPlane14, eV6\_InternalPlane15, eV6\_InternalPlane16, eV6\_DrillGuide, eV6\_KeepOutLayer, eV6\_Mechanical1, eV6\_Mechanical2, eV6\_Mechanical3, eV6\_Mechanical4, eV6\_Mechanical5, eV6\_Mechanical6, eV6\_Mechanical7, eV6\_Mechanical8, eV6\_Mechanical9, eV6\_Mechanical10, eV6\_Mechanical11, eV6\_Mechanical12, eV6\_Mechanical13, eV6\_Mechanical14, eV6\_Mechanical15, eV6\_Mechanical16, eV6\_DrillDrawing, eV6\_MultiLayer, eV6\_ConnectLayer, eV6\_BackGroundLayer, eV6\_DRCErrorLayer, eV6\_HighlightLayer, eV6\_GridColor1, eV6\_GridColor10, eV6\_PadHoleLayer, eV6\_ViaHoleLayer \);

Enum Type: TV6\_PlotLayer \- \(equiv TPlotLayer\)  
TV6\_PlotLayer = \( eV6\_NullPlot, eV6\_TopLayerPlot, eV6\_MidLayer1Plot, eV6\_MidLayer2Plot, eV6\_MidLayer3Plot, eV6\_MidLayer4Plot, eV6\_MidLayer5Plot, eV6\_MidLayer6Plot, eV6\_MidLayer7Plot, eV6\_MidLayer8Plot, eV6\_MidLayer9Plot, eV6\_MidLayer10Plot, eV6\_MidLayer11Plot, eV6\_MidLayer12Plot, eV6\_MidLayer13Plot, eV6\_MidLayer14Plot, eV6\_MidLayer15Plot, eV6\_MidLayer16Plot, eV6\_MidLayer17Plot, eV6\_MidLayer18Plot, eV6\_MidLayer19Plot, eV6\_MidLayer20Plot, eV6\_MidLayer21Plot, eV6\_MidLayer22Plot, eV6\_MidLayer23Plot, eV6\_MidLayer24Plot, eV6\_MidLayer25Plot, eV6\_MidLayer26Plot, eV6\_MidLayer27Plot, eV6\_MidLayer28Plot, eV6\_MidLayer29Plot, eV6\_MidLayer30Plot, eV6\_BottomLayerPlot, eV6\_TopOverlayPlot, eV6\_BottomOverlayPlot, eV6\_TopPastePlot, eV6\_BottomPastePlot, eV6\_TopSolderPlot, eV6\_BottomSolderPlot, eV6\_InternalPlane1Plot, eV6\_InternalPlane2Plot, eV6\_InternalPlane3Plot, eV6\_InternalPlane4Plot, eV6\_InternalPlane5Plot, eV6\_InternalPlane6Plot, eV6\_InternalPlane7Plot, eV6\_InternalPlane8Plot, eV6\_InternalPlane9Plot, eV6\_InternalPlane10Plot, eV6\_InternalPlane11Plot, eV6\_InternalPlane12Plot, eV6\_InternalPlane13Plot, eV6\_InternalPlane14Plot, eV6\_InternalPlane15Plot, eV6\_InternalPlane16Plot, eV6\_DrillGuide\_Top\_BottomPlot, eV6\_DrillGuide\_Top\_Mid1Plot, eV6\_DrillGuide\_Mid2\_Mid3Plot, eV6\_DrillGuide\_Mid4\_Mid5Plot, eV6\_DrillGuide\_Mid6\_Mid7Plot, eV6\_DrillGuide\_Mid8\_Mid9Plot, eV6\_DrillGuide\_Mid10\_Mid11Plot, eV6\_DrillGuide\_Mid12\_Mid13Plot, eV6\_DrillGuide\_Mid14\_Mid15Plot, eV6\_DrillGuide\_Mid16\_Mid17Plot, eV6\_DrillGuide\_Mid18\_Mid19Plot, eV6\_DrillGuide\_Mid20\_Mid21Plot, eV6\_DrillGuide\_Mid22\_Mid23Plot, eV6\_DrillGuide\_Mid24\_Mid25Plot, eV6\_DrillGuide\_Mid26\_Mid27Plot, eV6\_DrillGuide\_Mid28\_Mid29Plot, eV6\_DrillGuide\_Mid30\_BottomPlot, eV6\_DrillGuide\_SpecialPlot, eV6\_KeepOutLayerPlot, eV6\_Mechanical1Plot, eV6\_Mechanical2Plot, eV6\_Mechanical3Plot, eV6\_Mechanical4Plot, eV6\_Mechanical5Plot, eV6\_Mechanical6Plot, eV6\_Mechanical7Plot, eV6\_Mechanical8Plot, eV6\_Mechanical9Plot, eV6\_Mechanical10Plot, eV6\_Mechanical11Plot, eV6\_Mechanical12Plot, eV6\_Mechanical13Plot, eV6\_Mechanical14Plot, eV6\_Mechanical15Plot, eV6\_Mechanical16Plot, eV6\_DrillDrawing\_Top\_BottomPlot, eV6\_DrillDrawing\_Top\_Mid1Plot, eV6\_DrillDrawing\_Mid2\_Mid3Plot, eV6\_DrillDrawing\_Mid4\_Mid5Plot, eV6\_DrillDrawing\_Mid6\_Mid7Plot, eV6\_DrillDrawing\_Mid8\_Mid9Plot, eV6\_DrillDrawing\_Mid10\_Mid11Plot, eV6\_DrillDrawing\_Mid12\_Mid13Plot, eV6\_DrillDrawing\_Mid14\_Mid15Plot, eV6\_DrillDrawing\_Mid16\_Mid17Plot, eV6\_DrillDrawing\_Mid18\_Mid19Plot, eV6\_DrillDrawing\_Mid20\_Mid21Plot, eV6\_DrillDrawing\_Mid22\_Mid23Plot, eV6\_DrillDrawing\_Mid24\_Mid25Plot, eV6\_DrillDrawing\_Mid26\_Mid27Plot, eV6\_DrillDrawing\_Mid28\_Mid29Plot, eV6\_DrillDrawing\_Mid30\_BottomPlot, eV6\_DrillDrawing\_SpecialPlot, eV6\_TopPadMasterPlot, eV6\_BottomPadMasterPlot \);

Constant: cLayerStrings  \- as before  
cLayerStrings : Array\[TV6\_Layer\] Of TDynamicString = \( 'NoLayer', 'TopLayer', 'MidLayer1', 'MidLayer2', 'MidLayer3', 'MidLayer4', 'MidLayer5', 'MidLayer6', 'MidLayer7', 'MidLayer8', 'MidLayer9', 'MidLayer10', 'MidLayer11', 'MidLayer12', 'MidLayer13', 'MidLayer14', 'MidLayer15', 'MidLayer16', 'MidLayer17', 'MidLayer18', 'MidLayer19', 'MidLayer20', 'MidLayer21', 'MidLayer22', 'MidLayer23', 'MidLayer24', 'MidLayer25', 'MidLayer26', 'MidLayer27', 'MidLayer28', 'MidLayer29', 'MidLayer30', 'BottomLayer', 'TopOverlay', 'BottomOverlay', 'TopPaste', 'BottomPaste', 'TopSolder', 'BottomSolder', 'InternalPlane1', 'InternalPlane2', 'InternalPlane3', 'InternalPlane4', 'InternalPlane5', 'InternalPlane6', 'InternalPlane7', 'InternalPlane8', 'InternalPlane9', 'InternalPlane10', 'InternalPlane11', 'InternalPlane12', 'InternalPlane13', 'InternalPlane14', 'InternalPlane15', 'InternalPlane16', 'DrillGuide', 'KeepOutLayer', 'Mechanical1', 'Mechanical2', 'Mechanical3', 'Mechanical4', 'Mechanical5', 'Mechanical6', 'Mechanical7', 'Mechanical8', 'Mechanical9', 'Mechanical10', 'Mechanical11', 'Mechanical12', 'Mechanical13', 'Mechanical14', 'Mechanical15', 'Mechanical16', 'DrillDrawing', 'MultiLayer', 'ConnectLayer', 'BackGroundLayer', 'DRCErrorLayer', 'HighlightLayer', 'GridColor1', 'GridColor10', 'PadHoleLayer', 'ViaHoleLayer' \);

Constant \(V7\_Layer\): TLayerConstant  
TLayerConstant = \( cNoLayer, cIgnoreLayer, cTopLayer, cMidLayer1, cMidLayer2, cMidLayer3, cMidLayer4, cMidLayer5, cMidLayer6, cMidLayer7, cMidLayer8, cMidLayer9, cMidLayer10, cMidLayer11, cMidLayer12, cMidLayer13, cMidLayer14, cMidLayer15, cMidLayer16, cMidLayer17, cMidLayer18, cMidLayer19, cMidLayer20, cMidLayer21, cMidLayer22, cMidLayer23, cMidLayer24, cMidLayer25, cMidLayer26, cMidLayer27, cMidLayer28, cMidLayer29, cMidLayer30, cBottomLayer, cTopOverlay, cBottomOverlay, cTopPaste, cBottomPaste, cTopSolder, cBottomSolder, cInternalPlane1, cInternalPlane2, cInternalPlane3, cInternalPlane4, cInternalPlane5, cInternalPlane6, cInternalPlane7, cInternalPlane8, cInternalPlane9, cInternalPlane10, cInternalPlane11, cInternalPlane12, cInternalPlane13, cInternalPlane14, cInternalPlane15, cInternalPlane16, cDrillGuide, cKeepOutLayer, cMechanical1, cMechanical2, cMechanical3, cMechanical4, cMechanical5, cMechanical6, cMechanical7, cMechanical8, cMechanical9, cMechanical10, cMechanical11, cMechanical12, cMechanical13, cMechanical14, cMechanical15, cMechanical16, cDrillDrawing, cMultiLayer, cConnectLayer, cBackGroundLayer, cDRCErrorLayer, cDRCDetailLayer, cHighlightLayer, cGridColor1, cGridColor10, cPadHoleLayer, cViaHoleLayer, cTopPadMasterPlot, cBottomPadMasterPlot, cV7\_MidLayers, cAllLayers, cSignalLayers, cInternalPlaneLayers, cElectricalLayers, cMechanicalLayers, cDielectricLayers \);

## 子章节

- [Developed examples:](01-Developed_examples.md.md)
- [IPCB\_LayerStack](02-IPCB_LayerStack.md.md)
- [IPCB\_LayerObject](03-IPCB_LayerObject.md.md)
- [IPCB\_InternalPlane](04-IPCB_InternalPlane.md.md)
- [IPCB\_LayerSet & IPCB\_LayerStackBase](05-IPCB_LayerSet_IPCB_LayerStackBase.md.md)
