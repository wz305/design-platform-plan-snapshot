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

#### Methods

All methods are implemented by the ISch\_CompileMask properties\. More information for each property of the ISch\_CompileMask interface is presented in the Properties section\.

#### Properties

##### Collapsed property

\(ISch\_CompileMask interface\)  
__Syntax__  
Property Collapsed : Boolean Read GetState\_Collapsed Write SetState\_Collapsed;  
__Description__  
When the property is false, the compile mask is collapsed and disabled\. When this property is true, the compile mask is fully expanded and enabled meaning the portion of the schematic covered by the Compile Mask object is not affected by the Compiler\.  
This property is supported by the GetState\_Collapsed and SetState\_Collapsed methods\.  
__Example__  
__See also__  
ISch\_CompileMask interface