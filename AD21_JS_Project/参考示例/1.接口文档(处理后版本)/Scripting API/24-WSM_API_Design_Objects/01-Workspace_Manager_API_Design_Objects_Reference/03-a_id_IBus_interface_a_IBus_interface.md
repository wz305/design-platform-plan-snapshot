### <a id="IBus_interface"></a>IBus interface

__Overview__  
The IBus interface represents a bus object on the schematic sheet\. Buses are special graphical elements that represent a common pathway for multiple signals on a schematic document\. Buses have no electrical properties, and they must be correctly identified by net labels and ports\.

When a schematic document is compiled, bus objects have inferred objects \(wires with netlabels on them\) in memory that aids the connectivity and navigation features within Altium Designer\.

__IBus methods__  
DM\_Wires  
DM\_Sections  
DM\_WireCount  
DM\_SectionCount  
DM\_Scope  
DM\_Electric  
DM\_SignalType  
DM\_FullBusName  
DM\_BusName  
DM\_BusRange1  
DM\_BusRange2  
DM\_BusRangeValue1  
DM\_BusRangeValue2  
DM\_BusKind  
DM\_BusWidth  
DM\_RangeDefinedByValue  
DM\_IsLocal

__IBus properties__

#### Methods

##### DM\_BusKind method

\(IBus interface\)  
__Syntax__  
Function DM\_BusKind : TBusKind;  
__Description__  
The function returns the bus kind which is one of the following enumerated values; eBusKindUndefined, eBusKindLowValueFirst, eBusKindHighValueFirst, eBusKindGeneric\.  
__Example__  
__See also__  
IBus interface  
TBusKind type \(from RT\_Unit in Altium Designer RTL\)

##### DM\_BusName method

\(IBus interface\)  
__Syntax__  
Function DM\_BusName : WideString;  
__Description__  
This function returns the full bus name of this bus interface\.  
__Example__  
__See also__  
IBus interface

##### DM\_BusRange1 method

\(IBus interface\)  
__Syntax__  
Function DM\_BusRange1 : WideString;  
__Description__  
This function returns the Bus range 1 value\. Eg\. A\[1\.\.6\], the bus range1 is 1\.  
__Example__  
__See also__  
IBus interface

##### DM\_BusRange2 method

\(IBus interface\)  
__Syntax__  
Function DM\_BusRange2 : WideString;  
__Description__  
The function returns the Bus range 2 value\. Eg\. A\[1\.\.6\], the bus range2 is 6\.  
__Example__  
__See also__  
IBus interface

##### DM\_BusRangeValue1 method

\(IBus interface\)  
__Syntax__  
Function DM\_BusRangeValue1 : Integer;  
__Description__  
The function returns the Bus range 1 value\.  
__Example__  
__See also__  
IBus interface

##### DM\_BusRangeValue2 method

\(IBus interface\)  
__Syntax__  
Function DM\_BusRangeValue2 : Integer;  
__Description__  
The function returns the Bus range 2 value\.  
__Example__  
__See also__  
IBus interface

##### DM\_BusWidth method

\(IBus interface\)  
__Syntax__  
Function DM\_BusWidth : Integer;  
__Description__  
The function returns the bus width\.  
__Example__  
__See also__  
IBus interface

##### DM\_Electric method

\(IBus interface\)  
__Syntax__  
Function DM\_Electric : TPinElectrical;  
__Description__  
The function returns the electrical property for this bus\. Various values include :eElectricInput, eElectricIO, eElectricOutput, eElectricOpenCollector, eElectricPassive, eElectricHiZ, eElectricOpenEmitter, eElectricPower  
__Example__  
__See also__  
IBus interface  
TPinElectrical type

##### DM\_FullBusName method

\(IBus interface\)  
__Syntax__  
Function DM\_FullBusName : WideString;  
__Description__  
The function returns the full bus name of this bus interface\.  
__Example__  
__See also__  
IBus interface

##### DM\_IsLocal method

\(IBus interface\)  
__Syntax__  
Function DM\_IsLocal : Boolean;  
__Description__  
The function returns a Boolean value whether this bus is a local object or not\.  
__Example__  
__See also__  
IBus interface

##### DM\_RangeDefinedByValue method

\(IBus interface\)  
__Syntax__  
Function DM\_RangeDefinedByValue : Boolean;  
__Description__  
The function returns a Boolean value whether this range is defined by a two specific range values or not\.  
__Example__  
__See also__  
IBus interface

##### DM\_Scope method

\(IBus interface\)  
__Syntax__  
Function DM\_Scope : TNetScope;  
__Description__  
The function denotes the net scope of this IBus interface\.  
__Example__  
__See also__  
IBus interface  
TNetScope type

##### DM\_SectionCount method

\(IBus interface\)  
__Syntax__  
Function DM\_SectionCount : Integer;  
__Description__  
The function returns the number of sections for this IBus interface\. This is used for the DM\_Sections function\.  
__Example__  
__See also__  
IBus interface

##### DM\_Sections method

\(IBus interface\)  
__Syntax__  
Function DM\_Sections \(Index : Integer\) : INet;  
__Description__  
The function returns the indexed section of the bus\. Used in conjunction with the DM\_SectionCount function\.  
__Example__  
__See also__  
IBus interface

##### DM\_SignalType method

\(IBus interface\)  
__Syntax__  
Function DM\_SignalType : WideString;  
__Description__  
The function returns the signal type string for this bus\.  
__Example__  
__See also__  
IBus interface

##### DM\_WireCount method

\(IBus interface\)  
__Syntax__  
Function DM\_WireCount : Integer;  
__Description__  
The function returns the number of wires for this IBus interface\. This is used for the DM\_Wires function\.  
__Example__  
__See also__  
IBus interface

##### DM\_Wires method

\(IBus interface\)  
__Syntax__  
Function DM\_Wires \(Index : Integer\) : INet;  
__Description__  
The function returns the indexed wire\. Used in conjunction with the DM\_WireCount function\.  
__Example__  
__See also__  
IBus interface