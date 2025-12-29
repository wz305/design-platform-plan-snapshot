### <a id="IPCB_PrimitiveCounter_Interface"></a>IPCB\_PrimitiveCounter Interface

__Overview__  
The IPCB\_PrimitiveCounter interface gives you the means of obtaining the hole count and string count for the focussed PCB document via the IPCB\_Board's PrimitiveCounter property\.

__IPCB\_PrimitiveCounter methods__  
GetObjectCount  
GetCount  
GetHoleCount  
GetStringCount

__IPCB\_PrimitiveCounter properties__  
HoleCount  
StringCount

__See also__  
IPCB\_Board interface

#### Methods

##### GetCount method

\(IPCB\_PrimitiveCounter interface\)  
__Syntax__  
Function GetCount \(ObjectSet : TObjectSet\) : Cardinal;  
__Description__  
The GetCount function counts the objects of a set of object types specified by the ObjectSet parameter\.  
__Example__  
__See also__  
IPCB\_PrimitiveCounter interface  
TObjectSet type

##### GetHoleCount method

\(IPCB\_PrimitiveCounter interface\)  
__Syntax__  
Function GetHoleCount : Cardinal;  
__Description__  
This function counts the holes \(pads and vias\) on the current PCB document\.  
__Example__  
__See also__  
IPCB\_PrimitiveCounter interface

##### GetObjectCount method

\(IPCB\_PrimitiveCounter interface\)  
__Syntax__  
Function GetObjectCount \(ObjectId: TObjectId\) : Cardinal;  
__Description__  
This function counts objects of a specific object type\.  
__Example__  
__See also__  
IPCB\_PrimitiveCounter interface

##### GetStringCount method

\(IPCB\_PrimitiveCounter interface\)  
__Syntax__  
Function GetStringCount : Cardinal  
__Description__  
This function counts text strings on the PCB document\.  
__Example__  
__See also__  
IPCB\_PrimitiveCounter interface

#### Properties

##### HoleCount property

\(IPCB\_PrimitiveCounter interface\)  
__Syntax__  
Property HoleCount : Cardinal Read GetHoleCount;  
__Description__  
This property obtains the hole count from the PCB document \(Pads and Vias\)\.  
__Example__  
__See also__  
IPCB\_PrimitiveCounter interface

##### StringCount property

\(IPCB\_PrimitiveCounter interface\)  
__Syntax__  
Property StringCount : Cardinal Read GetStringCount;  
__Description__  
This property obtains string \(text object\) count from the PCB document\.  
__Example__  
__See also__  
IPCB\_PrimitiveCounter interface