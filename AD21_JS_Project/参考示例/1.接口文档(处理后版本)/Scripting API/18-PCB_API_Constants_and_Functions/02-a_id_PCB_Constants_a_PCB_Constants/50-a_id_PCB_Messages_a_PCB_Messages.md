### <a id="PCB_Messages"></a>PCB Messages

__Overview__  
The PCB Messages are messages that are broadcasted by the PCB Editor server\. There are different types of messages that describe a specific action within the PCB server\.  
Normally the PCB message constants are used for the __IPCB\_ServerInterface\.SendMessageToRobots__ method\.  
__Syntax__  
PCBM\_NullMessage         = 0;  
PCBM\_BeginModify         = 1;  
PCBM\_BoardRegisteration  = 2;  
PCBM\_EndModify           = 3;  
PCBM\_CancelModify        = 4;  
PCBM\_Create              = 5;  
PCBM\_Destroy             = 6;  
PCBM\_ProcessStart        = 7;  
PCBM\_ProcessEnd          = 8;  
PCBM\_ProcessCancel       = 9;  
PCBM\_YieldToRobots       = 10;  
PCBM\_CycleEnd            = 11;  
PCBM\_CycleStart          = 12;  
PCBM\_SystemInvalid       = 13;  
PCBM\_SystemValid         = 14;  
PCBM\_ViewUpdate          = 15;  
PCBM\_UnDoRegister        = 16;  
c\_BroadCast   = Nil;  
c\_NoEventData = Nil;  
c\_FromSystem  = Nil;  
__See also__  
SendMessageToRobots method