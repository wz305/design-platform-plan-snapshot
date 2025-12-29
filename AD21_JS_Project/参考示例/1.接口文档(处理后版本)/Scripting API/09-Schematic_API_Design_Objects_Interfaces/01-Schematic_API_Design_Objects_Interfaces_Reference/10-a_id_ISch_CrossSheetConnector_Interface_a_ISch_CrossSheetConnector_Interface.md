### <a id="ISch_CrossSheetConnector_Interface"></a>ISch\_CrossSheetConnector Interface

__Overview__  
Cross sheet connector objects can be used to link a net from a sheet to other sheets within a project\. This method defines global connections between sheets within a project\.  
__Notes__  
The ISch\_CrossSheetConnector interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Label  
        ISch\_PowerObject  
            ISch\_CrossSheetConnector

__ISch\_CrossSheetConnector methods__  
GetCrossSheetConnectorStyle  
SetCrossSheetConnectorStyle

__ISch\_CrossSheetConnector properties__  
CrossSheetStyle

__See also__  
ISch\_GraphicalObject interface  
ISch\_Label interface  
ISch\_PowerObject interface  
ISch\_CrossSheetConnector interface

#### Methods

##### GetCrossSheetConnectorStyle method

\(ISch\_CrossSheetConnector interface\)  
__Syntax__  
Function GetCrossSheetConnectorStyle : TCrossSheetConnectorStyle;  
__Description__  
The GetCrossSheetConnectorStyle function determines the style or the alignment of the Off Sheet Connector object\.  
__Example__

1

// Port alignment is determined by the CrossConnector's Style\.

2

If CrossConn\.GetCrossSheetStyle = eCrossSheetRight Then

3

    Port\.Alignment := eRightAlign

4

Else

5

    Port\.Alignment := eLeftAlign;

__See also__  
TCrossSheetConnectorStyle type  
ISch\_CrossSheetConnector interface

##### SetCrossSheetConnectorStyle method

\(ISch\_CrossSheetConnector interface\)  
__Syntax__  
Procedure SetCrossSheetConnectorStyle \(Const Value : TCrossSheetConnectorStyle\);  
__Description__  
The SetCrossSheetConnectorStyle function sets the style or the alignment of the off sheet connector object\.  
__Example__

1

// Port alignment is determined by the CrossConnector's Style\.

2

If Port\.Alignment := eRightAlign Then

3

    CrossConn\.CrossSheetStyle := eCrossSheetRight

4

Else

5

    CrossConn\.CrossSheetStyle := eCrossSheetLeft

__See also__  
TCrossSheetConnectorStyle type  
ISch\_CrossSheetConnector interface

#### Properties

##### CrossSheetStyle property

\(ISch\_CrossSheetConnector interface\)  
__Syntax__  
Property CrossSheetStyle : TCrossSheetConnectorStyle Read GetCrossSheetConnectorStyle Write SetCrossSheetConnectorStyle;  
__Description__  
The CrossSheetStyle property represents the style or the alignment of the cross sheet object\. This property is supported by the GetCrossSheetConnectorStyle and SetCrossSheetConnectorStyle methods\.  
__Example__

1

// Port alignment is determined by the CrossConnector's Style\.

2

If CrossConn\.CrossSheetStyle = eCrossSheetRight Then

3

    Port\.Alignment := eRightAlign

4

Else

5

    Port\.Alignment := eLeftAlign;

__See also__  
TCrossSheetConnectorStyle type  
ISch\_CrossSheetConnector interface