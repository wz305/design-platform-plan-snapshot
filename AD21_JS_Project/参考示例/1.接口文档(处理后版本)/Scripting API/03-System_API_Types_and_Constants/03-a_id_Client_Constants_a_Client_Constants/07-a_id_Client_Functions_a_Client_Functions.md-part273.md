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