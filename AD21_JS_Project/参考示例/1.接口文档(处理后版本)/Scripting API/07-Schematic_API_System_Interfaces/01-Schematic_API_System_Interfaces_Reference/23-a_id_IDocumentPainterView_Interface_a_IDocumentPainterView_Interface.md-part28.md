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

### <a id="ISch_HarnessConnectorType_Interface"></a>ISch\_HarnessConnectorType Interface

__Overview__  
The ISchHarnessConnectorType interface represents the text object of the harness connector and defines the harness connector type\. By Default the Type string is Harness\.  
__Notes__  
The ISch\_HarnessConnectorType interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Label  
        ISch\_ComplexT0065t  
            ISch\_HarnessConnectorType

__ISch\_HarnessConnector Methods__

__ISch\_HarnessConnector Properties__

__See also__  
ISch\_HarnessConnector interface  
ISch\_HarnessEntry interface\.

### <a id="ISch_HarnessEntry_Interface"></a>ISch\_HarnessEntry Interface

__Overview__  
The ISch\_HarnessEntry interface is used to represent a harness entry which is a member of the harness system\. Harness Entries are the graphical definition of a Signal Harness member\. They are placed within a Harness Connector and they are the connection point through which actual nets, buses and Signal Harnesses are combined to form a higher level Signal Harness\. Harness Entries along with Harness Connectors, Signal Harnesses and Harness Definition Files make up a complete Signal Harness\.  
__Notes__  
The ISch\_HarnessEntry interface hierarchy is as follows:  
ISch\_GraphicalObject  
                ISch\_HarnessEntry

__ISch\_HarnessEntry methods__  
SetState\_Name  
SetState\_Side  
SetState\_DistanceFromTop  
SetState\_TextColor  
SetState\_OverrideDisplayString  
GetState\_Name  
GetState\_Side  
GetState\_DistanceFromTop  
GetState\_TextColor  
GetState\_OverrideDisplayString  
GetState\_SchOwnerHarnessConnector

__ISch\_HarnessEntry properties__  
IsVertical  
Name  
Side  
DistanceFromTop  
TextColor  
OverrideDisplayString  
OwnerHarnessConnector