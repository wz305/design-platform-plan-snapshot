#### Methods

##### DM\_CurrentSheetInstanceNumber method

\(IDMObject interface\)  
__Syntax__  
Function DM\_CurrentSheetInstanceNumber : Integer;  
__Description__  
The function returns the current sheet instance number of the schematic document\.  
__See also__  
IDMObject interface

##### DM\_FullCrossProbeString method

\(IDMObject interface\)  
__Syntax__  
Function DM\_FullCrossProbeString : WideString;  
__Description__  
The function returns the full cross probe string\.  
__See also__  
IDMObject interface

##### DM\_GeneralField method

\(IDMObject interface\)  
__Syntax__  
Function DM\_GeneralField : Integer;  
__Description__  
The function can returns an integral value for this general field\. This General Field can be used for any purpose \- as a tag property, as an index property or as a flag to denote something\.  
__See also__  
IDMObject interface

##### DM\_ImageIndex method

\(IDMObject interface\)  
__Syntax__  
Function DM\_ImageIndex : Integer;  
__Description__  
The function returns the image index depending on what type of object the image represents\.  
__See also__  
IDMObject interface

##### DM\_IsInferredObject method

\(IDMObject interface\)  
__Syntax__  
Function DM\_IsInferredObject : Boolean;  
__Description__  
The function denotes whether the object is an inferred object with respect to connective objects\. Bus and Sheet Symbols can be defined in ranges using the NetLabel \[\] and Repeat statements respectively and once the project has been compiled, inferred objects are created in memory for navigation/connective purposes\. For example, a Bus with a range of A\[0\.\.4\] ends up with five wires with A0\.\.\.A5 net labels \(only in memory\)\. This property is useful for multi\-channel projects and for sheets that have Bus objects\.  
__See also__  
IDMObject interface

##### DM\_LocationString method

\(IDMObject interface\)  
__Syntax__  
Function DM\_LocationString : WideString;  
__Description__  
The function returns the Location string formatted as a X,Y format or if the object kind is a Text Documnt set, then the string returned is a formatted Line: LocationY  Offset: XLocation string\.  
__See also__  
IDMObject interface

##### DM\_LocationX method

\(IDMObject interface\)  
__Syntax__  
Function DM\_LocationX : Integer;  
__Description__  
The function returns the location of this interface object on the X axis\.  
__See also__  
IDMObject interface

##### DM\_LocationY method

\(IDMObject interface\)  
__Syntax__  
Function DM\_LocationY : Integer;  
__Description__  
The function returns the location of this interface object on the Y axis\.  
__See also__  
IDMObject interface

##### DM\_LongDescriptorString method

\(IDMObject interface\)  
__Syntax__  
Function DM\_LongDescriptorString : WideString;  
__Description__  
The function returns the long description version string\.  
__See also__  
IDMObject interface

##### DM\_NetIndex\_Flat method

\(IDMObject interface\)  
__Syntax__  
Function DM\_NetIndex\_Flat : Integer;  
__Description__  
The function returns the net index for a flattened design\.  
__See also__  
IDMObject interface

##### DM\_NetIndex\_Sheet method

\(IDMObject interface\)  
__Syntax__  
Function DM\_NetIndex\_Sheet : Integer;  
__Description__  
The function returns the netindex for a schematic sheet\.  
__See also__  
IDMObject interface

##### DM\_NetIndex\_SubNet method

\(IDMObject interface\)  
__Syntax__  
Function DM\_NetIndex\_SubNet : Integer;  
__Description__  
The function returns the net index within a sub net\.  
__See also__  
IDMObject interface

##### DM\_ObjectAdress method

\(IDMObject interface\)  
__Syntax__  
Function DM\_ObjectAdress : Pointer;  
__Description__  
The function returns the pointer of the interface object itself\. Also called a handle\.  
__See also__  
IDMObject interface

##### DM\_ObjectKindString method

\(IDMObject interface\)  
__Syntax__  
Function DM\_ObjectKindString : WideString;  
__Description__  
The function returns the object kind string which denotes the design document type\.  
__See also__  
IDMObject interface

##### DM\_ObjectKindStringForCrossProbe method

\(IDMObject interface\)  
__Syntax__  
Function DM\_ObjectKindStringForCrossProbe : WideString;  
__Description__  
The function returns the specially formatted object kind string for the cross probing mechanism\.  
__See also__  
IDMObject interface

##### DM\_OwnerDocument method

\(IDMObject interface\)  
__Syntax__  
Function DM\_OwnerDocument : IDocument;  
__Description__  
The function returns the document interface object\. Refer to IDocument interface for details\.  
__See also__  
IDMObject interface

##### DM\_OwnerDocumentFullPath method

\(IDMObject interface\)  
__Syntax__  
Function DM\_OwnerDocumentFullPath : WideString;  
__Description__  
The function returns the full path of the document\.  
__See also__  
IDMObject interface

##### DM\_OwnerDocumentName method

\(IDMObject interface\)  
__Syntax__  
Function DM\_OwnerDocumentName : WideString;  
__Description__  
The function returns the name of the document that this object interface is part of\.  
__See also__  
IDMObject interface

##### DM\_ParameterCount method

\(IDMObject interface\)  
__Syntax__  
Function DM\_ParameterCount : Integer;  
__Description__  
The function returns the number of parameters this object has\.  
__See also__  
IDMObject interface

##### DM\_Parameters method

\(IDMObject interface\)  
__Syntax__  
Function DM\_Parameters \(Index : Integer\) : IParameter;  
__Description__  
The function returns the indexed parameter object with the index parameter\. Use the IParameter interface to wrap the returned result\.  
__See also__  
IDMObject interface

##### DM\_PCBObjectHandle method

\(IDMObject interface\)  
__Syntax__  
Function DM\_PCBObjectHandle : Integer;  
__Description__  
The function returns the object handle of a PCB object\. If void, a Nil value is returned\.  
__See also__  
IDMObject interface

##### DM\_PrimaryCrossProbeString method

\(IDMObject interface\)  
__Syntax__  
Function DM\_PrimaryCrossProbeString : WideString;  
__Description__  
The function returns the primary cross probe string\.  
__See also__  
IDMObject interface

##### DM\_SCHObjectHandle method

\(IDMObject interface\)  
__Syntax__  
Function DM\_SCHObjectHandle : Pointer;  
__Description__  
The function returns the object handle of a Schematic object\. If void, a zero value is returned\.  
__See also__  
IDMObject interface

##### DM\_SecondaryCrossProbeString method

\(IDMObject interface\)  
__Syntax__  
Function DM\_SecondaryCrossProbeString : WideString;  
__Description__  
The function returns the secondary cross probe string\.  
__See also__  
IDMObject interface

##### DM\_SheetIndex\_Logical method

\(IDMObject interface\)  
__Syntax__  
Function DM\_SheetIndex\_Logical : Integer;  
__Description__  
The function returns the sheet index for a logical design \(multi – channel designs for example\)\.  
__See also__  
IDMObject interface

##### DM\_SheetIndex\_Physical method

\(IDMObject interface\)  
__Syntax__  
Function DM\_SheetIndex\_Physical : Integer;  
__Description__  
The function returns the sheet index for a physical design\. \(that have unique designators\)  
__See also__  
IDMObject interface

##### DM\_ShortDescriptorString method

\(IDMObject interface\)  
__Syntax__  
Function DM\_ShortDescriptorString : WideString;  
__Description__  
The function returns the short description version string\.  
__See also__  
IDMObject interface

##### DM\_ValidForNavigation method

\(IDMObject interface\)  
__Syntax__  
Function DM\_ValidForNavigation : Boolean;  
__Description__  
The function toggles whether navigation is valid for this object\. Navigation is performed on net aware objects such as components, nets and busses\.  
__See also__  
IDMObject interface

##### DM\_VHDLEntity method

\(IDMObject interface\)  
__Syntax__  
Function DM\_VHDLEntity : IVHDLEntity;  
__Description__  
The function returns the VHDL entity interface object if it exists on a VHDL document\. Basically every object interface has an access to this VHDL entity interface, so to check whether VHDL entity exists for this particular object, you can check out the Name field within the IVHDLEntity interface\.  
__See also__  
IDMObject interface

##### DM\_GetVCSProject

\(IDMObject interface\)  
__Syntax__  
   
__Description__  
__Example__  
   
__See also__  
IClient interface  
IDMObject interface