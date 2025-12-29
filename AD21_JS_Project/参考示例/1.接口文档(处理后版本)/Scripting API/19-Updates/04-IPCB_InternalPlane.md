### IPCB\_InternalPlane

__Inheritance__  
IPCB\_LayerObject  
    IPCB\_PhysicalLayer  
        IPCB\_ElectricalLayer  
            IPCB\_LayerObject\_V7  
            IPCB\_InternalPlane \*  
                IPCB\_InternalPlane\_V7 \*

##### IPCB\_InternalPlane \- Deprecated

##### IPCB\_InternalPlane\_V7

##### IPCB\_InternalPlane

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