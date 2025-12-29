### <a id="IMessagesManager"></a>IMessagesManager

__Overview__  
The IMessagesManager interface represents the Messages panel in Altium Designer\.

__IMessagesManager interface table__

__IMessagesManager methods__  
AddMessage  
AddMessageParametric  
ClearMessages  
ClearMessagesOfClass  
ClearMessagesForDocument  
ClearMessageByIndex  
BeginUpdate  
EndUpdate  
MessagesCount  
Messages

__IMessagesManager properties__

__Example__

01

//Populating the Message Panel using the Workspace manager’s functionality

02

Procedure InsertMessagesIntoMessagePanel;

03

Var

04

    WSM         : IWorkSpace;

05

    MM          : IMessagesManager;

06

    ImageIndex  : Integer;

07

    F           : Boolean;

08

Begin

09

    WSM := GetWorkSpace;

10

    If WSM = Nil Then Exit;

11

     

12

    // Tick icon for the lines in the Message panel

13

    // Refer to the Image Index table in the

14

    // Workspace Manager API reference online help\.

15

    ImageIndex := 3;

16

     

17

    MM := WSM\.DM\_MessagesManager;

18

    If MM = Nil Then Exit;

19

  

20

    // Clear out messages from the Message panel\.\.\.

21

    MM\.ClearMessages;

22

    WSM\.DM\_ShowMessageView;

23

    MM\.BeginUpdate;

24

     

25

    F := False;

26

    MM\.AddMessage\(\{MessageClass             \} 'MessageClass 1',

27

                      \{MessageText              \} 'MessageText 1',

28

                      \{MessageSource            \} 'Altium Designer Message',

29

                      \{MessageDocument          \} 'Pseudo Doc 1',

30

                      \{MessageCallBackProcess   \} '',

31

                      \{MessageCallBackParameters\} '',

32

                      ImageIndex,

33

                      F\);

34

  

35

    MM\.AddMessage\(\{MessageClass             \} 'MessageClass 2',

36

                      \{MessageText              \} 'MessageText 2',

37

                      \{MessageSource            \} 'Altium Designer Message 2',

38

                      \{MessageDocument          \} 'Pseudo Doc 2',

39

                      \{MessageCallBackProcess   \} '',

40

                      \{MessageCallBackParameters\} '',

41

                      ImageIndex,

42

                      F\);

43

  

44

    MM\.EndUpdate;

45

End;

__See also__  
Image Index Table

#### Methods

##### AddMessage method

\(IMessagesManager interface\)  
__Syntax__  
Procedure AddMessage  
\(Const MessageClass,  
       MessageText,  
       MessageSource,  
       MessageDocument,  
       MessageCallBackProcess,  
       MessageCallBackParameters     : WideString;  
       ImageIndex                    : Integer;  
       ReplaceLastMessageIfSameClass : Boolean = False;  
       MessageCallBackProcess2       : WideString = '';  
       MessageCallBackParameters2    : WideString = ''\);  
__Description__  
This method gives you the ability to access an Altium Designer Message on the Message panel:

- __MessageClass__ \- which sort of message it belongs to\. \(User defined\)
- __MessageText__ \- the message text to appears in the Message panel\.
- __MessageSource__ \- could be one of the following pre\-defined strings such as : Comparator, Back\-Annotate, Output Generator, Compiler or you can define your own MessageSource string\.
- __MessageDocument__ \- Owner Document name – normally a full path name of the document that the Message is associated with\.
- __MessageCallBackProcess__ \- process name to call back\.
- __MessageCallbackParameters__ \- parameters for the CallBackProcess\.
- __ImageIndex__ \- the index to the image depending on which Message Class\. Refer to the Image Index Table topic to check out the appropriate image for each message\.
- __ReplaceLastMessageIfSameClass__ \- \(defaults to false\)\.
- __MessageCallBackProcess2 __
- __MessageCallBackParameters2 __

__Example__  
__See also__  
IMessagesManager Interfaces

##### AddMessageParametric method

\(IMessagesManager interface\)  
__Syntax__  
Procedure AddMessageParametric\(MessageParams : PChar;MessageCallBackParameters : PChar\);  
__Description__  
Inserts a Altium Designer message in the Message panel\. Similar to the DM\_AddMessage only that you define the Name / Value blocks in the MessageParams nullterminated string:

- __Class__ – Back\-Annotate class, Error level, Differences\.
- __Text__ \- text displayed in the Message panel\.
- __Source__ \- could be one of the following: Comparator, Back\-Annotate, Output Generator, Compiler,\.
- __Document__ \- Owner Document name
- __CallBackProcess__ \- process name to call back\.
- __UserId __\- Unique ID
- __HelpFileName__ \- Name of the Help file
- __HelpTopic__ \- specific help topic string
- __ImageIndex__ \- the index to the image depending on which Message Class\.
- __'ReplaceLastMessageIfSameClass __\- Boolean\. If Same MessageClass, specify whether this class is to be overridden or not by the current message class information\.
- __MessageCallBackParameters__ – parameters for the CallBackProcess\.

__Example__  
__See also__  
IMessagesManager

##### BeginUpdate method

\(IMessagesManager interface\)  
__Syntax__  
Procedure BeginUpdate;  
__Description__  
 Invoke this method before you wish to add Messages \(DM\_AddMessage or DM\_AddMessageParameteric methods\) to the Message panel\.  
__Example__  
__See also__  
IMessagesManager

##### ClearMessageByIndex method

\(IMessagesManager interface\)  
__Syntax__  
Procedure ClearMessageByIndex \( AIndex : Integer \);  
__Description__  
__Example__  
__See also__  
IMessagesManager

##### ClearMessages method

\(IMessagesManager interface\)  
__Syntax__  
Procedure ClearMessages;  
__Description__  
Clears out the Messages panel\.  
__Example__  
__See also__  
IMessagesManager

##### ClearMessagesForDocument method

\(IMessagesManager interface\)  
__Syntax__  
Procedure ClearMessagesForDocument\(Const DocumentPath : WideString\);  
__Description__  
__Example__  
__See also__  
IMessagesManager

##### ClearMessagesOfClass method

\(IMessagesManager interface\)  
__Syntax__  
Procedure ClearMessagesOfClass \(Const AMsgClass : WideString\);  
__Description__  
This method gives you the ability to clear messages of the same class type\. Various class types include Back\-Annotate class, Error level, Differences  
__Example__  
__See also__  
IMessagesManager

##### EndUpdate method

\(IMessagesManager interface\)  
__Syntax__  
Procedure EndUpdate;  
__Description__  
Invoke this method after you have added Messages to the Message panel\.  
__Example__  
__See also__  
IMessagesManager

##### Messages method

\(IMessagesManager interface\)  
__Syntax__  
Function Messages\(Index : Integer\) : IMessageItem;  
__Description__  
__Example__  
__See also__  
IMessagesManager

##### MessagesCount method

\(IMessagesManager interface\)  
__Syntax__  
Function MessagesCount : Integer;  
__Description__  
__Example__  
__See also__  
IMessagesManager