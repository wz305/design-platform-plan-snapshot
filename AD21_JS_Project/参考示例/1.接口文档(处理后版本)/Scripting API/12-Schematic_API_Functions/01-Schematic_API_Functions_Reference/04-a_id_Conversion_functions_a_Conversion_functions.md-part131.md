#### Methods

##### DM\_Attributes method

\(IRule interface\)  
__Syntax__  
Function DM\_Attributes : WideString;  
__Description__  
The function denotes the attributes of the IRule interface\.  
__Example__  
__See also__  
IRule interface

##### DM\_Description method

\(IRule interface\)  
__Syntax__  
Function DM\_Description : WideString;  
__Description__  
The function denotes the description of this IRule interface\.  
__Example__  
__See also__  
IRule interface

##### DM\_MaxViaHole method

\(IRule interface\)  
__Syntax__  
Function DM\_MaxViaHole : Integer;  
__Description__  
The function denotes the max Via Hole rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_MaxViaWidth method

\(IRule interface\)  
__Syntax__  
Function DM\_MaxViaWidth : Integer;  
__Description__  
The function denotes the max Via width rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_MaxWidth method

\(IRule interface\)  
__Syntax__  
Function DM\_MaxWidth : Integer;  
__Description__  
The function denotes the Maximum Width rule property of a PCB rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_MinViaHole method

\(IRule interface\)  
__Syntax__  
Function DM\_MinViaHole : Integer;  
__Description__  
The function denotes the min Via Hole rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_MinViaWidth method

\(IRule interface\)  
__Syntax__  
Function DM\_MinViaWidth : Integer;  
__Description__  
The function denotes the min Via width rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_MinWidth method

\(IRule interface\)  
__Syntax__  
Function DM\_MinWidth : Integer;  
__Description__  
The function denotes the Minimum Width rule property of a PCB Rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_PreferedWidth method

\(IRule interface\)  
__Syntax__  
Function DM\_PreferedWidth : Integer;  
__Description__  
The function denotes the preferred Width rule property of a PCB Rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_Priority method

\(IRule interface\)  
__Syntax__  
Function DM\_Priority : Integer;  
__Description__  
The function denotes the priority of the PCB Design Rule\. The priority value of 1 denotes the highest priority\.  
__Example__  
__See also__  
IRule interface

##### DM\_RoutingLayers method

\(IRule interface\)  
__Syntax__  
Function DM\_RoutingLayers \(IndexLayer : Integer\) : Integer;  
__Description__  
The function denotes the indexed routing layer rule property \(Top layer, Mid1\-Mid30, Bottom Layer\) of a Routing Layers PCB rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_RuleKind method

\(IRule interface\)  
__Syntax__  
Function DM\_RuleKind : Integer;  
__Description__  
The function denotes the type of PCB Rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_RuleName method

\(IRule interface\)  
__Syntax__  
Function DM\_RuleName : WideString;  
__Description__  
The function denotes the name of this IRule interface representing a PCB rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_Scope1Expression method

\(IRule interface\)  
__Syntax__  
Function DM\_Scope1Expression : WideString;  
__Description__  
The function denotes the first scope expression string\. The scope of Design rules are determined by the defined boundary or objects\.  
__Example__  
__See also__  
IRule interface

##### DM\_Scope2Expression method

\(IRule interface\)  
__Syntax__  
Function DM\_Scope2Expression : WideString;  
__Description__  
The function denotes the second scope expression string\. The scope of Design rules are determined by the defined boundary or objects\.  
__Example__  
__See also__  
IRule interface

##### DM\_Topology method

\(IRule interface\)  
__Syntax__  
Function DM\_Topology : Integer;  
__Description__  
The function Denotes the topology \(Shortest, Horizontal, Vertical, Daisy\-Simple, Daisy\-MidDriven, Daisy\-Balanced and Daisy\-StarBurst\) rule property of a Routing Topology PCB Rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_UniqueId method

\(IRule interface\)  
__Syntax__  
Function DM\_UniqueId : WideString;  
__Description__  
Each rule has a Unique ID assigned so that when Schematic and PCB documents are synchronized, the ECO knows which rules to update or apply to/from\.  
__Example__  
__See also__  
IRule interface

##### DM\_ViaHole method

\(IRule interface\)  
__Syntax__  
Function DM\_ViaHole : Integer;  
__Description__  
Denotes the Via Hole rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_ViaStyle method

\(IRule interface\)  
__Syntax__  
Function DM\_ViaStyle : Integer;  
__Description__  
This function denotes the via style rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface

##### DM\_ViaWidth method

\(IRule interface\)  
__Syntax__  
Function DM\_ViaWidth : Integer;  
__Description__  
The function denotes the Via width rule property of a Routing Via style PCB Rule\.  
__Example__  
__See also__  
IRule interface

### <a id="ISheetSymbol_Interface"></a>ISheetSymbol Interface

__Overview__  
The ISheetSymbol interface is a sheet symbol interface to an existing sheet symbol object on the schematic\. Sheet symbols represent other schematic sheets \(often referred to as a child sheet\)\. The link between a sheet symbol and other schematic sheets is the FileName attribute, which must be the same as the name of the child sheet\.

An equivalent Sheet Symbol object representation is the ISch\_SheetSymbol class in Sch API Reference\.

__ISheetSymbol methods__  
DM\_SheetEntries  
DM\_SheetEntryCount  
DM\_ChildSheet  
DM\_ChildSheetCount  
DM\_SheetSymbolFileName  
DM\_LogicalDesignator  
DM\_CalculatedDesignator  
DM\_PhysicalDesignator  
DM\_UniqueId

__ISheetSymbol properties__