### <a id="ISch_RobotManager_Interface"></a>ISch\_RobotManager Interface

__Overview__  
The ISch\_RobotManager interface represents an object that can send Schematic messages into the Schematic Editor server from a script to update the sub\-systems such as the Undo system\.  
__Notes__  
Part of ISch\_ServerInterface object interface  
__MessageID table__  
SCHM\_NullMessage             = 0;  
SCHM\_PrimitiveRegistration   = 1;  
SCHM\_BeginModify             = 2;  
SCHM\_EndModify               = 3;  
SCHM\_YieldToRobots           = 4;  
SCHM\_CancelModify            = 5;  
SCHM\_Create                  = 6;  
SCHM\_Destroy                 = 7;  
SCHM\_ProcessStart            = 8;  
SCHM\_ProcessEnd              = 9;  
SCHM\_ProcessCancel           = 10;  
SCHM\_CycleEnd                = 11;  
SCHM\_CycleStart              = 12;  
SCHM\_SystemInvalid           = 13;  
SCHM\_SystemValid             = 14;  
__Message types table__  
c\_BroadCast     = Nil;  
c\_NoEventData   = Nil;  
c\_FromSystem    = Nil;  
   
The ISch\_RobotManager interface hierarchy is as follows;

__ISch\_RobotManager methods__  
SendMessage

__ISch\_RobotManager properties__

__See also__  
ISch\_ServerInterface interface

#### SendMessage method

\(ISch\_RobotManager interface\)  
__Syntax__  
Procedure SendMessage\(Source,Destination : Pointer; MessageID : Word; MessageData : Pointer\);  
__Description__  
The SendMessage method sends a message into Schematic Editor notifying that the data structures need to be updated and synchronized\. It could be an object being modified, added or deleted from the schematic document\.

Normally when an object is being modified:

- The Source parameter, the current sheet's I\_ObjectAddress value\.
- The Destination parameter has the c\_Broadcast value
- The MessageID parameter has the SchM\_PrimitiveRegistration value
- The MessageData parameter has the new object's I\_ObjectAddress value\.

Normally when a new object is being added:

- The Source parameter, the I\_ObjectAddress of an object needs to be invoked\.
- The Destination parameter has the c\_Broadcast value
- The MessageID parameter has the SchM\_BeginModify and SchM\_EndModify values\.
- The MessageData parameter has the c\_noEventData value

Normally when an object is being removed:

- The Source parameter, the current sheet's I\_ObjectAddress value\.
- The Destination parameter normally has the c\_Broadcast value
- The MessageID parameter has the SchM\_PrimitiveRegistration value\.
- The MessageData parameter has the deleted object's I\_ObjectAddress value\.

DelphiScript example of an object being modified

01

// Initialize the robots in Schematic editor\.

02

SchServer\.ProcessControl\.PreProcess\(Doc, ''\);

03

Iterator        := Doc\.SchIterator\_Create;

04

Iterator\.AddFilter\_ObjectSet\(MkSet\(ePort, eWire\)\);

05

If Iterator = Nil Then Exit;

06

Try

07

    AnObject := Iterator\.FirstSchObject;

08

    While AnObject <> Nil Do

09

    Begin

10

        Case AnObject\.ObjectId Of

11

        SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_BeginModify, c\_NoEventData\);

12

           eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

13

        SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_EndModify  , c\_NoEventData\);

14

        End;

15

        AnObject := Iterator\.NextSchObject;

16

    End;

17

Finally

18

    Doc\.SchIterator\_Destroy\(Iterator\);

19

End;

20

// Clean up the robots in Schematic editor

21

SchServer\.ProcessControl\.PostProcess\(Doc, ''\);

DelphiScript example of an object being removed

01

Try

02

    Port := Iterator\.FirstSchObject;

03

    While Port <> Nil Do

04

    Begin

05

        OldPort := Port;

06

        Port    := Iterator\.NextSchObject;

07

        CurrentSheet\.RemoveSchObject\(OldPort\);

08

         

09

        SchServer\.RobotManager\.SendMessage

10

                               \(CurrentSheet\.I\_ObjectAddress,

11

                                c\_BroadCast,

12

                                SCHM\_PrimitiveRegistration,

13

                                OldPort\.I\_ObjectAddress\);

14

     End;

15

Finally

16

     CurrentSheet\.SchIterator\_Destroy\(Iterator\);

17

End;

__See also__  
ISch\_RobotManager interface