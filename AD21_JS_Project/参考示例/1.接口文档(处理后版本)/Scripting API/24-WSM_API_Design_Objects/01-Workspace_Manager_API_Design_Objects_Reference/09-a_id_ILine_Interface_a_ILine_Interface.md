### <a id="ILine_Interface"></a>ILine Interface

__Overview__  
The ILine interface is a line object interface for an existing line object on a Schematic document\. A line is a graphical drawing object with any number of joined segments\.

An equivalent Line object representation is the ISch\_Line interface in the Schematic API reference\.

The __ILine__ interface hierarchy is as follows;  
IDMObject  
    ILine

__ILine methods__  
DM\_LX  
DM\_LY  
DM\_HX  
DM\_HY

__ILine properties__

__See also__  
IDMObject interface

#### Methods

##### DM\_LX method

\(ILine interface\)  
__Syntax__  
Function DM\_LX : Integer;  
__Description__  
This function returns the lower left coordinate of the line\.  
__Example__  
__See also__  
ILine interface

##### DM\_LY method

\(ILine interface\)  
__Syntax__  
Function DM\_LY : Integer;  
__Description__  
This function returns the lower left coordinate of the line\.  
__Example__  
__See also__  
ILine interface

##### DM\_HY method

\(ILine interface\)  
__Syntax__  
Function DM\_HY : Integer;  
__Description__  
This function returns the upper right coordinate of the line\.  
__Example__  
__See also__  
ILine interface

##### DM\_HX method

\(ILine interface\)  
__Syntax__  
Function DM\_HX : Integer;  
__Description__  
This function returns the upper right coordinate of the line\.  
__Example__  
__See also__  
ILine interface