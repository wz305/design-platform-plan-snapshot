### IPCB\_LayerStack

IPCB\_LayerStackBase  
    IPCB\_LayerStack \*  
IPCB\_LayerStack\_V7 \*

##### IPCB\_LayerStack \- Deprecated

##### IPCB\_LayerStack\_V7

##### IPCB\_LayerStack    \(inherits from IPCB\_LayerStackBase\)

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