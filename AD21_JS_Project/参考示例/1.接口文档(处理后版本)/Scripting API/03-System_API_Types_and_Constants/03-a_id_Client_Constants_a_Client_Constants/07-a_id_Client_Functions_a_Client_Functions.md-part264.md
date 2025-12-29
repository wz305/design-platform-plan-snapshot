#### Properties

##### LineWidth property

\(ISch\_Circle interface\)  
__Syntax__  
Property LineWidth : TSize Read GetState\_LineWidth Write SetState\_LineWidth;  
__Description__  
The LineWidth property defines the border width of the circle with one of the following values from the TSize enumerated type\. This property is supported by the GetState\_LineWidth and SetState\_LineWidth methods\.  
__Example__  
Circle\.LineWidth := eLarge;  
__See also__  
TSize type\.  
ISch\_Circle interface

##### IsSolid property

\(ISch\_Circle interface\)  
__Syntax__  
Property IsSolid : Boolean Read GetState\_IsSolid Write SetState\_IsSolid;  
__Description__  
This property defines whether the circle is to be filled inside or not\. If it is true, the circle is filled with the color set by the AreaColor property \(from its ancestor ISch\_GraphicalObject interface\)\.  
This property is supported by the GetState\_IsSolid and SetState\_IsSolid methods\.  
__Example__

1

If Circle\.IsSolid Then

2

    Circle\.AreaColor := 0; // black fill\.

__See also__  
ISch\_Circle interface

##### Radius property

\(ISch\_Circle interface\)  
__Syntax__  
Property Radius : TDistance Read GetState\_Radius Write SetState\_Radius;  
__Description__  
The Radius property defines the radius of the circle \(pie chart\)\. This property is supported by the GetState\_Radius and SetState\_Radius methods\.  
__Example__  
__See also__  
ISch\_Circle interface  
TDistance type

##### Transparent property

\(ISch\_Circle interface\)  
__Syntax__  
Property Transparent : Boolean Read GetState\_Transparent Write SetState\_Transparent;  
__Description__  
This transparent property toggles the transparency of this circle object\. This property is supported by the GetState\_Transparent and SetState\_Transparent methods\.  
__Example__  
__See also__  
ISch\_Circle interface

### <a id="ISch_CompileMask_Interface"></a>ISch\_CompileMask Interface

__Overview__  
A compile mask is used to effectively hide the area of the design within the PCB project it contains from the Compiler, allowing you to manually prevent error checking for circuitry that may not yet be complete and you know will generated compile errors\.

This can prove very useful if you need to compile the active document or project to check the integrity of the design in other specific areas, but do not want the clutter of compiler\-generated messages associated with unfinished portions of the design\.

The CompileMask object hold multiple lines of free text that can be collapsed or not\.

The ISch\_CompileMask interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Rectangle  
        ISch\_CompileMask

__ISch\_CompileMask methods__  
SetState\_Collapsed  
GetState\_Collapsed

__ISch\_CompileMask properties__  
Collapsed

__See also__  
ISch\_Rectangle interface