#### TimeString\_elapsed

__Declaration__  
Function  TimeString\_Elapsed \(Const TimeRecord   : TTime\) : TDynamicString;  
__Description __  
This function returns the string containing the Time information that has elapsed\. To find the timing information, invoke the GetElapsedTimeDate or GetElapsedTime function\.  
__Example__

1

Var

2

   ElapsedTime : TTime;

3

Begin

4

   GetCurrentTimeRec \(EndTime\);

5

   GetCurrentDate \(EndDate\);

6

   GetElapsedTimeDate \(StartTime, EndTime, ElapsedTime, StartDate, EndDate\);

7

   ShowInfo\('Time Elapsed : ' \+ TimeString\_Elapsed\(ElapsedTime\)\);

8

End;

__See also__  
Time and Date Routines