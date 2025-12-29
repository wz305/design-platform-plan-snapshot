#### Methods

##### DM\_AllNetItemCount method

\(INet interface\)  
__Syntax__  
Function DM\_AllNetItemCount : Integer;  
__Description__  
The function returns the number of net aware objects \(that is inherited from the INetItem interface\)\.  
__Example__  
__See also__  
INet interface

##### DM\_AllNetItems method

\(INet interface\)  
__Syntax__  
Function DM\_AllNetItems \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed net aware object\. Use the DM\_AllNetItemCount function for this function\.  
__Example__  
__See also__  
INet interface  
DM\_AllNetItemCount function

##### DM\_AutoNumber method

\(INet interface\)  
__Syntax__  
Function DM\_AutoNumber : Integer;  
__Description__  
The function returns the auto number value used for auto\-numbering nets\.  
__Example__  
__See also__  
INet interface

##### DM\_BusIndex method

\(INet interface\)  
__Syntax__  
Function DM\_BusIndex : Integer;  
__Description__  
The function returns the bus index\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface

##### DM\_BusKind method

\(INet interface\)  
__Syntax__  
Function DM\_BusKind : TBusKind;  
__Description__  
The function returns the bus kind\. which is one of the following enumerated values; eBusKindUndefined, eBusKindLowValueFirst, eBusKindHighValueFirst, eBusKindGeneric\.  
__Example__  
__See also__  
INet interface  
TBusKind type \(from RT\_Unit in Altium Designer RTL\)

##### DM\_BusPrefix method

\(INet interface\)  
__Syntax__  
Function DM\_BusPrefix : WideString;  
__Description__  
The function returns the bus prefix as used in this net\.  
__Example__  
__See also__  
INet interface

##### DM\_BusRange1 method

\(INet interface\)  
__Syntax__  
Function DM\_BusRange1 : WideString;  
__Description__  
The function returns the first index of the Bus range\. Eg\. A\[1\.\.6\], the bus range1 is 1\.  
__Example__  
__See also__  
INet interface

##### DM\_BusRange2 method

\(INet interface\)  
__Syntax__  
Function DM\_BusRange2 : WideString;  
__Description__  
The function returns the last index of the Bus Range\. Eg A\[0\.\.4\], the bus range 2 is 4\.  
__Example__  
__See also__  
INet interface

##### DM\_BusRangeValue1 method

\(INet interface\)  
__Syntax__  
Function DM\_BusRangeValue1 : Integer;  
__Description__  
The function returns the value of the first index of the Bus range  
__Example__  
__See also__  
INet interface

##### DM\_BusRangeValue2 method

\(INet interface\)  
__Syntax__  
Function DM\_BusRangeValue2 : Integer;  
__Description__  
The function returns the value of the second index of the Bus range\.  
__Example__  
__See also__  
INet interface

##### DM\_BusSectionParent method

\(INet interface\)  
__Syntax__  
Function DM\_BusSectionParent : INet;  
__Description__  
This function returns an INet interface for the parent bus section\.  
__Example__  
__See also__  
INet interface

##### DM\_BusWidth method

\(INet interface\)  
__Syntax__  
Function DM\_BusWidth : Integer;  
__Description__  
The function returns the bus width\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface

##### DM\_CalculatedNetName method

\(INet interface\)  
__Syntax__  
Function DM\_CalculatedNetName : WideString;  
__Description__  
The function returns the bus width\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface

##### DM\_CountOfElectricalType method

\(INet interface\)  
__Syntax__  
Function DM\_CountOfElectricalType \(AElectric : TPinElectrical\) : Integer;  
__Description__  
The function returns the number of electrical types used by the current sheet or the project\.  
__Example__  
__See also__  
INet interface

##### DM\_CountOfNonPinItems method

\(INet interface\)  
__Syntax__  
Function DM\_CountOfNonPinItems : Integer;  
__Description__  
The function returns the number of non\-pin objects used on the current sheet or the project\.  
__Example__  
__See also__  
INet interface

##### DM\_CrossSheetConnectorCount method

\(INet interface\)  
__Syntax__  
Function DM\_CrossSheetConnectorCount : Integer;  
__Description__  
The function returns the number of cross sheet connectors associated with this net\.  
__Example__  
__See also__  
INet interface

##### DM\_CrossSheetConnectors method

\(INet interface\)  
__Syntax__  
Function DM\_CrossSheetConnectors \(Index : Integer\) : ICrossSheet;  
__Description__  
The function returns an indexed cross sheet connector that is part of the current net\. Use the DM\_CrossSheetConnectorCount function\.  
__Example__  
__See also__  
INet interface

##### DM\_DirectiveCount method

\(INet interface\)  
__Syntax__  
Function DM\_DirectiveCount : Integer;  
__Description__  
The function returns the number of directives associated with this net\.  
__Example__  
__See also__  
INet interface

##### DM\_Directives method

\(INet interface\)  
__Syntax__  
Function DM\_Directives \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed directive \(which could be a PCB layout directive that contains PCB fules\)\. Use the DM\_DirectiveCount function\.  
__Example__  
__See also__  
INet interface

##### DM\_Electric method

\(INet interface\)  
__Syntax__  
Function DM\_Electric : TPinElectrical;  
__Description__  
The function returns the type of electrical property the pin is associated with\. Various values include :eElectricInput, eElectricIO, eElectricOutput, eElectricOpenCollector, eElectricPassive, eElectricHiZ, eElectricOpenEmitter, eElectricPower  
__Example__  
__See also__  
INet interface  
TPinElectrical type

##### DM\_ElectricalString method

\(INet interface\)  
__Syntax__  
Function DM\_ElectricalString : WideString;  
__Description__  
The function returns the electrical property associated with this net\.  
__Example__  
__See also__  
INet interface

##### DM\_FullNetName method

\(INet interface\)  
__Syntax__  
Function DM\_FullNetName : WideString; \{Including Bus Index etc\}  
__Description__  
The function denotes the full net name \(includes the bus index and so on\)\.  
__Example__  
__See also__  
INet interface

##### DM\_HiddenNetName method

\(INet interface\)  
__Syntax__  
Function DM\_HiddenNetName : WideString;  
__Description__  
The function denotes the hidden net name \(like power nets\)\.  
__Example__  
__See also__  
INet interface

##### DM\_IsAutoGenerated method

\(INet interface\)  
__Syntax__  
Function DM\_IsAutoGenerated : Boolean;  
__Description__  
The function denotes a boolean value whether this net has been system generated or not\.  
__Example__  
__See also__  
INet interface

##### DM\_IsBusElement method

\(INet interface\)  
__Syntax__  
Function DM\_IsBusElement : Boolean;  
__Description__  
The function returns a Boolean value whether this bus element exists or not for this INetItem interface\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface

##### DM\_IsBusMember method

\(INet interface\)  
__Syntax__  
Function DM\_IsBusMember : Boolean;  
__Description__  
The function returns a Boolean value whether this bus member exists or not for this INetItem interface\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface

##### DM\_IsBusSection method

\(INet interface\)  
__Syntax__  
Function DM\_IsBusSection : Boolean;  
__Description__  
The function returns a Boolean value whether the bus section exists or not for this INetItem interface\. An IBus interface is inherited from a INetItem interface\.  
__Example__  
__See also__  
INet interface

##### DM\_IsLocal method

\(INet interface\)  
__Syntax__  
Function DM\_IsLocal : Boolean;  
__Description__  
The function denotes whether this net is a local net restricted to the document or not\.  
__Example__  
__See also__  
INet interface

##### DM\_LineCount method

\(INet interface\)  
__Syntax__  
Function DM\_LineCount : Integer;  
__Description__  
The function returns the number of lines associated with this net\.  
__Example__  
__See also__  
INet interface

##### DM\_Lines method

\(INet interface\)  
__Syntax__  
Function DM\_Lines \(Index : Integer\) : ILine;  
__Description__  
The function returns an indexed line that is part of the current net\. use the DM\_LineCount function\.  
__Example__  
__See also__  
INet interface

##### DM\_NetLabelCount method

\(INet interface\)  
__Syntax__  
Function DM\_NetLabelCount : Integer;  
__Description__  
The function returns the number of net labels associated with this net\.  
__Example__  
__See also__  
INet interface  
INetLabel interface

##### DM\_NetLabels method

\(INet interface\)  
__Syntax__  
Function DM\_NetLabels \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed net label that is part of the current net\. Use DM\_NetLabelCount function\.  
__Example__  
__See also__  
INet interface  
INetItem interface  
INetLabel interface

##### DM\_NetName method

\(INet interface\)  
__Syntax__  
Function DM\_NetName : WideString;  
__Description__  
The function denotes the net name of this net\.  
__Example__  
__See also__  
INet interface

##### DM\_NetNumber method

\(INet interface\)  
__Syntax__  
Function DM\_NetNumber : WideString;  
__Description__  
The function denotes the net number of this net\.  
__Example__  
__See also__  
INet interface

##### DM\_PinCount method

\(INet interface\)  
__Syntax__  
Function DM\_PinCount : Integer;  
__Description__  
The function returns the number of pins associated with this net\.  
__Example__  
__See also__  
INet interface

##### DM\_Pins method

\(INet interface\)  
__Syntax__  
Function DM\_Pins \(Index : Integer\) : INetItem;  
__Description__  
The function reurns an indexed pin that is part of the current net\. Use the DM\_PinCount function\.  
__Example__  
__See also__  
INet interface

##### DM\_PortCount method

\(INet interface\)  
__Syntax__  
Function DM\_PortCount : Integer;  
__Description__  
The function returns the number of ports associated with this net\.  
__Example__  
__See also__  
INet interface

##### DM\_Ports method

\(INet interface\)  
__Syntax__  
Function DM\_Ports \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed port that is part of the current net\. Use the DM\_PortCount function\.  
__Example__  
__See also__  
INet interface

##### DM\_PowerObjectCount method

\(INet interface\)  
__Syntax__  
Function DM\_PowerObjectCount : Integer;  
__Description__  
The function returns the number of power objects associated with this net\.  
__Example__  
__See also__  
INet interface

##### DM\_PowerObjects method

\(INet interface\)  
__Syntax__  
Function DM\_PowerObjects \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed power object that is part of the current net\. Use the DM\_PowerObjectCount function\.  
__Example__  
__See also__  
INet interface

##### DM\_RangeDefinedByValue method

\(INet interface\)  
__Syntax__  
Function DM\_RangeDefinedByValue : Boolean;  
__Description__  
The function returns a boolean value whether the range has been defined by a two specific range values or not\.  
__Example__  
__See also__  
INet interface

##### DM\_RemovedNetItemCount method

\(INet interface\)  
__Syntax__  
Function DM\_RemovedNetItemCount : Integer;  
__Description__  
The function returns the number of net items that have been removed from the nets\.  
__Example__  
__See also__  
INet interface

##### DM\_RemovedNetItems method

\(INet interface\)  
__Syntax__  
Function DM\_RemovedNetItems \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed net item that has been removed from net of the schematic document\.  
__Example__  
__See also__  
INet interface

##### DM\_Scope method

\(INet interface\)  
__Syntax__  
Function DM\_Scope : TNetScope;  
__Description__  
The funciton denotes the scope of this net as defined by the TNetScope type\.  
__Example__  
__See also__  
INet interface  
TNetScope type

##### DM\_SheetEntryCount method

\(INet interface\)  
__Syntax__  
Function DM\_SheetEntryCount : Integer;  
__Description__  
The function returns the number of sheet entries associated with this net\.  
__Example__  
__See also__  
INet interface

##### DM\_SheetEntrys method

\(INet interface\)  
__Syntax__  
Function DM\_SheetEntrys \(Index : Integer\) : INetItem;  
__Description__  
The function returns an indexed sheet entry that is part of the current net\. Use DM\_SheetEntryCount function\.  
__Example__  
__See also__  
INet interface  
INetItem interface  
DM\_SheetEntryCount function

##### DM\_SignalType method

\(INet interface\)  
__Syntax__  
Function DM\_SignalType : WideString;  
__Description__  
The function returns the signal type property associated with this net\.  
__Example__  
__See also__  
INet interface

##### DM\_SubWireCount method

\(INet interface\)  
__Syntax__  
Function DM\_SubWireCount : Integer;  
__Description__  
The function returns the number of sub wires associated with this net\.  
__Example__  
__See also__  
INet interface

##### DM\_SubWires method

\(INet interface\)  
__Syntax__  
Function DM\_SubWires \(Index : Integer\) : INet; \{For BusSections only\}  
__Description__  
The function Returns an indexed sub wire \(part of a bus object\)\. Use the DM\_SubWireCount\. A bus object conceptually carries multiple wires\.  
__Example__  
__See also__  
INet interface

##### DM\_SuppressERC method

\(INet interface\)  
__Syntax__  
Function DM\_SuppressERC : Boolean;  
__Description__  
The function returns a boolean value whether the ERC has been suppressed for this net or not\.  
__Example__  
__See also__  
INet interface

### <a id="INetClass_interface"></a>INetClass interface

__Overview__  
The INetClass interface is a PCB Net Class object interface for an existing NetClass on a PCB document\. An existing Net class contains members of specific Net objects\. Each Net within a NetClass object can either be a member, or not\. The 'All Nets' Net Class exists in every PCB file by default; it includes all Nets in the document\. It is not possible to change which Nets are members of that Net Class, but the user has full control over which Nets are members of any other Net Classes \(which are created and named by the user\)\.  
__Notes__  
An INetClass interface is inherited from the IObjectClass interface\.  
__See also__  
IObjectClass

### <a id="INetItem_Interface"></a>INetItem Interface

__Overview__  
The INetItem interface represents the ancestor or parent interface for the following interfaces – IBus, ICrossSheetConnector, IPin, IPort, INetlabel, ISheetEntry and IPowerObject interfaces that have a Net property\.  
These interface objects have a net property and thus these objects can be part of a net\.

__INetItem methods__  
DM\_OwnerNetLogical  
DM\_OwnerNetPhysical  
DM\_ParentID  
DM\_Electric  
DM\_Id  
DM\_NetName  
DM\_FlattenedNetName  
DM\_NetNumber  
DM\_Electrical  
DM\_ElectricalString  
DM\_SignalType  
DM\_BusRange1  
DM\_BusRange2  
DM\_BusRangeValue1  
DM\_BusRangeValue2  
DM\_BusKind  
DM\_BusIndex  
DM\_BusWidth  
DM\_BusPrefix  
DM\_IsAutoGenerated  
DM\_IsBusMember  
DM\_IsBusElement  
DM\_IsBusSection  
DM\_RangeDefinedByValue  
DM\_Part  
DM\_PartId  
DM\_DisplayMode  
DM\_PinName  
DM\_PinNumber  
DM\_FullPinName  
DM\_IsHidden  
DM\_LogicalPartDesignator  
DM\_FullLogicalPartDesignator  
DM\_PhysicalPartDesignator  
DM\_FullPhysicalPartDesignator  
DM\_PartUniqueId  
DM\_PartType  
DM\_FootPrint  
DM\_PinNameNoPartId  
DM\_FullUniqueId  
DM\_PartSwapId  
DM\_PinSwapId  
DM\_SheetSymbol  
DM\_ParentSheetSymbolSheetName  
DM\_ParentSheetSymbolName  
DM\_LinkObject

__INetItem properties__