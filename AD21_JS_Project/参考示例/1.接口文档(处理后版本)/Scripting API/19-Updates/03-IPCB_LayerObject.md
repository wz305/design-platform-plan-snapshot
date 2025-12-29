### IPCB\_LayerObject

__Inheritance__  
IPCB\_LayerObject \*  
    IPCB\_PhysicalLayer  
        IPCB\_ElectricalLayer  
            IPCB\_LayerObject\_V7 \*

##### IPCB\_LayerObject \- Deprecated

##### IPCB\_LayerObject\_V7    \(inherits from \-\->> \)

##### IPCB\_LayerObject

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