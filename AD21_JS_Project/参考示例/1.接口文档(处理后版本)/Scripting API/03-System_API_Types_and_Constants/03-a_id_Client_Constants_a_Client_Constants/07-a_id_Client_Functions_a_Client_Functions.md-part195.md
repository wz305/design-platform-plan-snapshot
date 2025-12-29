#### GetCurrentDate

__Declaration__  
Procedure GetCurrentDate     \(Var   DateRecord   : TDate\);  
__Description __  
The GetCurrentDate procedure is based on the Window API’s DecodeDate procedure which breaks the value specified as the Date parameter into Year, Month, and Day values\. If the given TDateTime value is less than or equal to zero, the year, month, and day return parameters are all set to zero\.  
__See also__  
Time and Date Routines