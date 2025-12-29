### <a id="IRule_Interface"></a>IRule Interface

__Overview__  
The IRule interface represents the one of the rules attached to a parameter within the PCB Layout directive \(as a Parameter Set object with a small flag symbol\) on a net aware object on a schematic object\. A parameter set object can be placed on the schematic sheet by the Place » Directives » PCB Layout menu item\.

This PCB Layout directive allows you to assign PCB layout information to a net in the schematic\. When a PCB is created from the schematic, the information in the PCB layout directive is used to create relevant PCB design rules\.

__IRule methods__  
DM\_RuleKind  
DM\_Scope1Expression  
DM\_Scope2Expression  
DM\_MaxWidth  
DM\_MinWidth  
DM\_PreferedWidth  
DM\_ViaHole  
DM\_ViaWidth  
DM\_MinViaHole  
DM\_MaxViaHole  
DM\_MinViaWidth  
DM\_MaxViaWidth  
DM\_ViaStyle  
DM\_Topology  
DM\_Priority  
DM\_RoutingLayers  
DM\_Attributes  
DM\_Description  
DM\_RuleName  
DM\_UniqueId

__IRule properties__

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