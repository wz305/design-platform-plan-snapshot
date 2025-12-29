### <a id="IVhdlEntity_interface"></a>IVhdlEntity interface

__Overview__  
The IVhdlEntity interface represents the existing VHDL entity object on a VHDL document\. Basically a VHDL document can contain many VHDL entities and each entity corresponds to a schematic document\.

Since every object interface \(inherited from the IDMObject interface\) has a DM\_VHDLEntity method\. This method can be useful in cases such as determining which ports correspond to VHDL entities\.

__Interface Methods__

__Method__

__Description__

Function DM\_Name : WideString;

Returns the name of the VHDL entity\.