### <a id="Time_and_Date_Routines"></a>Time and Date Routines

#### DateString

__Declaration__  
Function DateString \(Const DateRecord   : TDate\) : TDynamicString;  
__Description __  
The DateString function returns a TString representing a date in ‘12\-Jan\-1985’ format\.  
__See also__  
Time and Date Routines

#### GetCurrentDate

__Declaration__  
Procedure GetCurrentDate     \(Var   DateRecord   : TDate\);  
__Description __  
The GetCurrentDate procedure is based on the Window API’s DecodeDate procedure which breaks the value specified as the Date parameter into Year, Month, and Day values\. If the given TDateTime value is less than or equal to zero, the year, month, and day return parameters are all set to zero\.  
__See also__  
Time and Date Routines

#### GetCurrentDateString

__Declaration__  
Function  GetCurrentDateString : TDynamicString;  
__Description __  
The GetCurrentDateString function returns a TString representing date in ‘12\-Jan\-1985’ format  
__See also__  
Time and Date Routines

#### GetCurrentTimeString

__Declaration__  
Function GetCurrentTimeString : TDynamicString;  
__Description __  
The GetCurrentTimeString function returns a TString representing a time of day in HH:MM:SS format\.  
__See also__  
Time and Date Routines

#### GetCurrentTimeRec

__Declaration__  
Procedure GetCurrentTimeRec \(Var TimeRecord : TTime\);  
__Description __  
The GetCurrentTimeRec procedure is based on WinAPI’s DecodeTime function which breaks the TDateTime record into hours, minutes, seconds, and milliseconds\.  
__See also__  
Time and Date Routines

#### GetDateAndTimeStamp

__Declaration__  
Function  GetDateAndTimeStamp : TDynamicString;  
__Description __  
This function returns the string containing the current date and the time\.  
__See also__  
Time and Date Routines

#### GetElapsedTime

__Declaration__  
Procedure GetElapsedTime \(Const Start : TTime; Const Stop : TTime;Var Elapsed : TTime\);  
__Description __  
The GetElapsedTime procedure returns the Elapsed value in seconds between the Start and Stop timing intervals\.  
__See also__  
Time and Date Routines

#### GetElapsedTimeDate

__Declaration__  
Procedure GetElapsedTimeDate \(Const Start     : TTime;  
                              Const Stop      : TTime;  
                              Var   Elapsed   : TTime;  
                              Const StartDate : TDate;  
                              Const StopDate  : TDate\);  
__Description __  
The GetElapsedTimeDate procedure returns the Elapsed value derived from the StartDate, StopDate dates and Start, Stop times\. The results can be retrieved as a string by the TimeString\_Elapsed function\.  
__See also__  
Time and Date Routines

#### GetFileDateString

__Declaration__  
Function  GetFileDateString\(Const AFileName : TDynamicString\) : TDynamicString;  
__Description __  
The GetCurrentDateString function returns a String representing date in ‘12\-Jan\-1985’ format for example\.  
__See also__  
Time and Date Routines

#### GetMilliSecondTime

__Declaration__  
Function GetMilliSecondTime : Integer;  
__Description __  
The GetMilliSecondTime function retrieves the number of milliseconds that have elapsed since Windows was started\.  
__See also__  
Time and Date Routines

#### MakeDateAndTimeStampedFileName

__Declaration__  
Function  MakeDateAndTimeStampedFileName\(BaseName : TDynamicString\) : TDynamicString;  
__Description __  
This function returns the date and time inserted in the base file name string\.  
__See also__  
Time and Date Routines

#### SecondsToTimeRecord

__Declaration__  
Procedure SecondsToTimeRecord\(Var TimeRecord : TTime; Const Seconds : Integer\);  
__Description __  
This procedure does the reverse of the TimeRecordToSeconds procedure\. It converts the seconds information into the TTime structure type\.  
__See also__  
Time and Date Routines

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

#### TimeString

__Declaration__  
Function  TimeString         \(Const TimeRecord   : TTime\) : TDynamicString;  
__Description __  
The TimeString function returns a TString representing a time of day in HH:MM:SS format\.  
__See also__  
Time and Date Routines

#### TimeRecordToSeconds

__Declaration__  
Procedure TimeRecordToSeconds\(Const TimeRecord   : TTime;  Var   Seconds      : Integer\);  
__Description __  
This procedure converts a TTime type structure into number of seconds\. This procedure is used for GetElapsedTime and GetElapsedTimeDate procedures\.  
__See also__  
Time and Date Routines

#### WaitMilliSecondDelay

__Declaration__  
Procedure WaitMilliSecondDelay\(N : Integer\);  
__Description __  
The WaitMilliSecondDelay function provides a delay in the code in milli\-seconds as specified by the N integer value\. This is useful if a function in the software needs delaying for a while before doing something else giving the software a chance to catch up\. This function uses the GetMilliSecondTime function\.  
__Example__  
WaitMilliSecondDelay\(1000\); // waits for 1 second\. 1000 milliseconds = 1 second\.  
__See also__  
Time and Date Routines