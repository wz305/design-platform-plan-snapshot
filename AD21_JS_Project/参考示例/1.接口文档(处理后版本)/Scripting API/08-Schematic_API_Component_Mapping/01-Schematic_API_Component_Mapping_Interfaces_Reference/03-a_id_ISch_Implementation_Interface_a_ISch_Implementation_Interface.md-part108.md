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