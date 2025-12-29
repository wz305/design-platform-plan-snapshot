### <a id="ITimerManager_Interface"></a>ITimerManager Interface

__Overview__  
The ITimerManager interface manages the timing mechanisms efficiently in Altium Designer which registers timer objects and calls them when used\. Normally a Timer object needs a window to run and responds to WM\_Timer messages\. This is for internal use\.

__ITimerManager methods__  
AddHandler  
RemoveHandler  
GetHandlerEnabled  
SetHandlerEnabled  
SetGlobalEnabled

__ITimerManager Properties__

__See also__  
ITimerHandler interface

#### ITimerManager Methods

##### AddHandler method

\(ITimerManager interface\)  
__Syntax__  
Function  AddHandler\(Const AHandler : ITimerHandler; AInterval : Cardinal; AEnabled : Boolean = True\) : DWord;  
__Description__  
Internal Use only  
__Example__  
   
__See also__  
ITimerIManager interface

##### GetHandlerEnabled method

\(ITimerManager interface\)  
__Syntax__  
Function GetHandlerEnabled\(ID : DWord\) : Boolean;  
__Description__  
Internal Use only  
__Example__  
   
__See also__  
ITimerManager interface

##### RemoveHandler method

\(ITimerManager interface\)  
__Syntax__  
Procedure RemoveHandler    \(ID : DWord\);  
__Description__  
Internal Use only  
__Example__  
   
__See also__  
ITimerManager interface

##### SetGlobalEnabled method

\(ITimerManager interface\)  
__Syntax__  
Procedure SetGlobalEnabled \(AEnabled : Boolean\);  
__Description__  
Internal Use only  
__Example__  
   
__See also__  
ITimerManager interface

##### SetHandlerEnabled method

\(ITimerManager interface\)  
__Syntax__  
Procedure SetHandlerEnabled\(ID : DWord; AEnabled : Boolean\);  
__Description__  
Internal Use only  
__Example__  
   
__See also__  
ITimerManager interface