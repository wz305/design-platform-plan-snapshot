### <a id="IProcessControl_Interface"></a>IProcessControl Interface

__Overview__  
The IProcessControl interface controls the process depth for each design document in Altium Designer\. Every time a process is launched on a document, the process depth is increased by one and once this same process has finished executing, the process depth is decreased by one\. When the process depth is zero, it denotes that nothing is taking place on the current design document\. This is necessary if you wish to keep the environment synchronized, especially the Undo system\.

__Process Depths for Schematic and PCB documents__  
When you are using Schematic API or PCB API to modify/manipulate objects on a Schematic or PCB document respectively, you will need to set the PreProcess and PostProcess methods so that the environment is updated correctly when you are adding, deleting or modifying objects on a Schematic or PCB document\.

__IProcessControl Methods__  
PostProcess  
PreProcess

__IProcessControl Properties__  
ProcessDepth

__See also__  
IPCB\_ServerInterface for PostProcess and PreProcess methods  
ISch\_ServerInterface for PostProcess and PreProcess methods

#### IProcessControl Methods

##### PostProcess method

\(IProcessControl interface\)  
__Syntax__  
Procedure PostProcess \(Const AContext : IInterface; AParameters : PChar\);  
__Description__  
This procedure performs a post processing within in a main server which could involve finalizing the states of  the environment of the server such as the Undo system\. The AContext parameter is usually the focussed document in Altium Designer such as the ISch\_Document and IPCB\_Board interfaces\.  
__Example__

01

    // Initialize the robots in Schematic editor\.

02

    SchServer\.ProcessControl\.PreProcess\(Doc, ''\);

03

  

04

    // Create a new port and place on current Schematic document\.

05

    SchPort := SchServer\.SchObjectFactory\(ePort,eCreate\_GlobalCopy\);

06

    If SchPort = Nil Then Exit;

07

    SchPort\.Location  := Point\(100,100\);

08

    SchPort\.Style     := ePortRight;

09

    SchPort\.IOType    := ePortBidirectional;

10

    SchPort\.Alignment := eHorizontalCentreAlign;

11

    SchPort\.Width     := 100;

12

    SchPort\.AreaColor := 0;

13

    SchPort\.TextColor := $FFFF00;

14

    SchPort\.Name      := 'New Port 1';

15

  

16

    // Add a new port object in the existing Schematic document\.

17

    Doc\.RegisterSchObjectInContainer\(SchPort\);

18

    SchServer\.RobotManager\.SendMessage\(Doc\.I\_ObjectAddress,c\_BroadCast,

19

                                       SCHM\_PrimitiveRegistration,SchPort\.I\_ObjectAddress\);

20

  

21

    // Clean up the robots in Schematic editor

22

    SchServer\.ProcessControl\.PostProcess\(Doc, ''\);

__See also__  
PreProcess method

##### PreProcess method

\(IProcessControl interface\)  
__Syntax__  
Procedure PreProcess      \(Const AContext : IInterface; AParameters : PChar\);  
__Description__  
Performs pre processing within in a main server which could involve resetting the environment of the server\. The AContext parameter is usually the focussed document in Altium Designer such as the ISch\_Document and IPCB\_Board interfaces  
__Example__

01

    // Initialize the robots in Schematic editor\.

02

    SchServer\.ProcessControl\.PreProcess\(Doc, ''\);

03

  

04

    // Create a new port and place on current Schematic document\.

05

    SchPort := SchServer\.SchObjectFactory\(ePort,eCreate\_GlobalCopy\);

06

    If SchPort = Nil Then Exit;

07

    SchPort\.Location  := Point\(100,100\);

08

    SchPort\.Style     := ePortRight;

09

    SchPort\.IOType    := ePortBidirectional;

10

    SchPort\.Alignment := eHorizontalCentreAlign;

11

    SchPort\.Width     := 100;

12

    SchPort\.AreaColor := 0;

13

    SchPort\.TextColor := $FFFF00;

14

    SchPort\.Name      := 'New Port 1';

15

  

16

    // Add a new port object in the existing Schematic document\.

17

    Doc\.RegisterSchObjectInContainer\(SchPort\);

18

    SchServer\.RobotManager\.SendMessage\(Doc\.I\_ObjectAddress,c\_BroadCast,

19

                                       SCHM\_PrimitiveRegistration,SchPort\.I\_ObjectAddress\);

20

  

21

    // Clean up the robots in Schematic editor

22

    SchServer\.ProcessControl\.PostProcess\(Doc, ''\);

__See also__  
PostProcess method

#### IProcessControl Properties

##### ProcessDepth property

\(IProcessControl interface\)  
__Syntax__  
Property  ProcessDepth : Integer;  
__Description__  
Sets or gets the process depth\. The depth value is an integer value\.0 = inactive, and 1 onwards denotes the number of stacked processes\.  
__ProcessDepth Example__  
ShowMessage\('Current process depth ',IntToStr\(Client\.ProcessControl\.ProcessDepth\)\);