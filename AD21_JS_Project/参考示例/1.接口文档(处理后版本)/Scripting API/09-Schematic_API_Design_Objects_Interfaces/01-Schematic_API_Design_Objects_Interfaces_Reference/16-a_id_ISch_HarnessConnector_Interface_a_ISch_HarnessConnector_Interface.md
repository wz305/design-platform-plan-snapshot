### <a id="ISch_HarnessConnector_Interface"></a>ISch\_HarnessConnector Interface

__Overview__  
The ISch\_HarnessConnector interface is used to represent a harness connector design obejct which is a member of the harness system\.  
__Notes__  
The ISch\_HarnessEntry interface hierarchy is as follows:  
ISch\_GraphicalObject  
                ISch\_RectangularGroup  
                    ISch\_HarnessConnector

__ISch\_HarnessConnector Methods__  
SetState\_LineWidth  
GetState\_LineWidth  
GetState\_SchHarnessConnectorType  
GetState\_MasterEntryLocation

__ISch\_HarnessConnector Properties__  
LineWidth  
HarnessConnectorType  
MasterEntryLocation

#### Methods

##### SetState\_LineWidth method

\(ISch\_HarnessConnector interface\)  
__Syntax__  
Procedure SetState\_LineWidth\(Value : TSize\);  
__Description__  
The SetState\_LineWidth sets the line width of the harness connector which is based on one of the the TSize values\.  
__Example__  
HarnessConn\.SetState\_LineWidth\(eLarge\);  
__See also__  
TSize type  
ISch\_HarnessConnector interface  
ISch\_HarnessEntry interface

##### GetState\_LineWidth method

\(ISch\_HarnessConnector interface\)  
__Syntax__  
Function GetState\_LineWidth : TSize;  
__Description__  
The GetState\_LineWidth gets the line width of the harness connector which is based on one of the the TSize values\.  
__Example__  
LineWidth := HarnessConn\.GetState\_LineWidth;  
__See also__  
TSize type  
ISch\_HarnessConnector interface  
ISch\_HarnessEntry interface

##### GetState\_SchHarnessConnectorType method

\(ISch\_HarnessConnector interface\)  
__Syntax__  
Function GetState\_SchHarnessConnectorType : ISch\_HarnessConnectorType;  
__Description__  
The GetState\_SchHarnessConnectorType function retrieves the harness connector type of the harness connector\. The default type is ‘Harness’\. This type value can be modified\.  
__Example__

01

Var

02

    HarnessConn : ISch\_HarnessConnector;

03

    ConnType    : ISch\_HarnessConnectorType;

04

    S           : String;

05

Begin

06

    // HarnessConn is a ISch\_harnessConnector interface representing 

07

    // a harness connector design object\.

08

    ConnType := HarnessConn\. GetState\_SchHarnessConnectorType;

09

  

10

    // Display the Text string for this harness connector\.

11

    S := ConnType\.Text;

__See also__  
ISch\_HarnessConnectorType interface  
ISch\_HarnessConnector interface  
ISch\_HarnessEntry interface

##### GetState\_MasterEntryLocation method

\(ISch\_HarnessConnector interface\)  
__Syntax__  
Function  GetState\_MasterEntryLocation : TLocation;  
__Description__  
The GetState\_MasterEntryLocation function returns the location of the master entry of the harness connector\. The master entry represents the tip of the harness connector and the position of the tip is determined from the top side of the connector\.  
__Example__  
Location := HarnessConn\.GetState\_MasterEntryLocation;  
__See also__  
TLocation type  
ISch\_HarnessConnectorType interface  
ISch\_HarnessConnector interface  
ISch\_HarnessEntry interface

#### Properties

##### LineWidth property

\(ISch\_HarnessConnector interface\)  
__Syntax__  
Property LineWidth : TSize Read GetState\_LineWidth Write SetState\_LineWidth;  
__Description__  
The LineWidth property defines the line width of the harness connector which is based on one of the TSize values\. \. This property is supported by the GetState\_LineWidth and SetState\_LineWidth methods\.  
__Example__  
HarnessConn\.LineWidth := eLarge;  
__See also__  
TSize type  
ISch\_HarnessConnector interface

##### HarnessConnectorType property

\(ISch\_HarnessConnector interface\)  
__Syntax__  
Property HarnessConnectorType: ISch\_HarnessConnectorType Read GetState\_SchHarnessConnectorType;  
__Description__  
The HarnessConnectorType property defines the harness connector type of the harness connector and returns the ISch\_HarnessConnectorType interface\. The default connector type is ‘Harness’\. This property is supported by the GetState\_HarnessConnectorType method\.  
__Example__

01

Var

02

    HarnessConn : ISch\_HarnessConnector;

03

    ConnType    : ISch\_HarnessConnectorType;

04

    S           : String;

05

Begin

06

    // HarnessConn is a ISch\_HarnessConnector interface representing 

07

    // a harness connector design object\.

08

    ConnType := HarnessConn\.HarnessConnectorType;

09

  

10

    // Display the Text string for this harness connector\.

11

    S := ConnType\.Text;

__See also__  
TSize type  
ISch\_HarnessConnectorType interface  
ISch\_HarnessConnector interface

##### MasterEntryLocation property

\(ISch\_HarnessConnector interface\)  
__Syntax__  
Property MasterEntryLocation : TLocation Read GetState\_MasterEntryLocation;  
__Description__  
The MasterEntryLocation property defines the location of the master entry of the harness connector\. The master entry represents the tip of the harness connector and the position of the tip is determined from the top side of the connector\.\. This property is supported by the GetState\_LineWidth method\.  
__Example__  
   
__See also__  
TSize type  
ISch\_HarnessConnector interface