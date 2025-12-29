#### DM\_ScrapCompile method

\(IDocument interface\)  
__Syntax__  
Function DM\_ScrapCompile\(ForceCompile : Boolean\) : LongBool;  
__Description__  
The function invokes a scrap compile \(by force or not\)\. A scrap compile is the background compile in Altium Designer on a design document and does all the auto \- junctions for bus and wire objects\. Also the scrap compile does the online rule checks in schematics\. It is totally separate from the main compile which compile projects\.  
__See also__  
IDocument interface