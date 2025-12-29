### <a id="IViolation_Interface"></a>IViolation Interface

__Overview__  
The IViolation interface represents a violation object on a design document in the Workspace Manager of Altium Designer\.

__IViolation methods__  
DM\_ErrorKind  
DM\_ErrorLevel  
DM\_CompilationStage  
DM\_AddRelatedObject  
DM\_RelatedObjectCount  
DM\_RelatedObjects  
DM\_DescriptorString  
DM\_DetailString

__IViolation properties__

#### Methods

##### DM\_AddRelatedObject method

\(IViolation interface\)  
__Syntax__  
Procedure DM\_AddRelatedObject \(AnObject : IDMObject\);  
__Description__  
This procedure adds the object that is part of the violation\.  
__Example__  
__See also__  
IViolation interface

##### DM\_CompilationStage method

\(IViolation interface\)  
__Syntax__  
Function DM\_CompilationStage : TCompilationStage;  
__Description__  
This function returns the status of the complation stage: during compilation or during flattening process\.  
__Example__  
__See also__  
IViolation interface

##### DM\_DescriptorString method

\(IViolation interface\)  
__Syntax__  
Function DM\_DescriptorString : WideString;  
__Description__  
This function returns the description string for this violation interface\.  
__Example__  
__See also__  
IViolation interface

##### DM\_DetailString method

\(IViolation interface\)  
__Syntax__  
Function DM\_DetailString : WideString;  
__Description__  
This function returns the detailed description stirng of this violation interface\.  
__Example__  
__See also__  
IViolation interface

##### DM\_ErrorKind method

\(IViolation interface\)  
__Syntax__  
Function DM\_ErrorKind : TErrorKind;  
__Description__  
Returns the kind of error this violation has been assigned to\.  
__Example__  
__See also__  
IViolation interface

##### DM\_ErrorLevel method

\(IViolation interface\)  
__Syntax__  
Function DM\_ErrorLevel : TErrorLevel;  
__Description__  
Returns the level of error this violation has been assigned to\. Various error levels include : eErrorLevelNoReport,eErrorLevelWarning,eErrorLevelError,eErrorLevelFatal  
__Example__  
__See also__  
IViolation interface  
TErrorLevel type

##### DM\_RelatedObjectCount method

\(IViolation interface\)  
__Syntax__  
Function DM\_RelatedObjectCount : Integer;  
__Description__  
This function returns the number of related objects of the violation\.  
__Example__  
__See also__  
IViolation interface

##### DM\_RelatedObjects method

\(IViolation interface\)  
__Syntax__  
Function DM\_RelatedObjects \(Index : Integer\) : IDMObject;  
__Description__  
This function returns the indexed related object of the violation\.  
__Example__  
__See also__  
IViolation interface