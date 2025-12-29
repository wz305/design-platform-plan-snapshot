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