### <a id="Process_Parameter_Functions"></a>Process Parameter Functions

Function  GetState\_Parameter      \(P : PChar; Const Name : TString; Var Value : TString\) : Boolean; Overload;  
Function  GetState\_Parameter      \(P : PChar; Const Name : TDynamicString; Var Value : TDynamicString\) : Boolean; Overload;  
   
Procedure SetState\_RemoveParameter\(P : PChar; Const Name : TDynamicString\); Overload;  
Function  GetState\_ParameterPChar \(P : PChar; Const Name : TDynamicString;     Value : PChar\)  : Boolean;  
Procedure SetState\_ParameterPChar \(P : PChar; Const Name : TDynamicString;     Value : PChar\);  
Procedure SetState\_Parameter      \(P : PChar; Const Name : TDynamicString; Const Value : TDynamicString\); Overload;  
   
Function  GetState\_Parameter      \(Const S : TDynamicString; Const Name : TDynamicString; Var   Value : TDynamicString\) : Boolean; Overload;  
Procedure SetState\_Parameter      \(Var   S : TDynamicString; Const Name : TDynamicString; Const Value : TDynamicString\); Overload;  
Procedure SetState\_RemoveParameter\(Var   S : TDynamicString; Const Name : TDynamicString\); Overload;