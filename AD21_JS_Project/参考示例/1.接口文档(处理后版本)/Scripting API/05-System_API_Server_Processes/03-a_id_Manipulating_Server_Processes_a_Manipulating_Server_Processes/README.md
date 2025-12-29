# <a id="Manipulating_Server_Processes"></a>Manipulating Server Processes

There are server process functions and a TParameterList class in the parameters part of the Altium Designer API that do the manipulation of process strings much more easily\.


__Overview__  
The TParameterList class stores parameter name = value blocks separated by the Pipe symbols in a single null terminated string easily\. For example, Orientation=1|Location\.X=10000000|Location\.Y=20000000 is a typical parameter string\.  
To add parameters in the TParameterlist object, you use one of the following SetState\_AddParameterX methods\. Normally the SetState\_AddParameterAsString method is used in this case\.  
To retrieve a specially formatted null terminated string from the TParameterList object, you can invoke one of the GetState\_ParameterX methods\. The GetState\_ToString or GetState\_ParameterAsPChar methods are used in this case\.  
You create an instance of the TParameterList class and invoke the ClearAllParameters method to reset it\.


Constructor Create;  
Destructor  Destroy; Override;


Procedure   SetState\_FromString \(Const S : TDynamicString\);  
Function    GetState\_ToString            : TDynamicString;


Procedure   SetState\_AddParameter           \(Const AName, AValue : TDynamicString\);  
Procedure   SetState\_AddParameterAsString   \(Const AName : TDynamicString; Const Value : TDynamicString\);  
Procedure   SetState\_AddParameterAsBoolean  \(Const AName : TDynamicString; Value : Boolean\);  
Procedure   SetState\_AddParameterAsInteger  \(Const AName : TDynamicString; Value : Integer\);  
Procedure   SetState\_AddParameterAsInt64    \(Const AName : TDynamicString; Value : Int64\);  
Procedure   SetState\_AddParameterAsDouble   \(Const AName : TDynamicString; Const Value : Double\);


Function    GetState\_ParameterAsString      \(Const Name : TDynamicString; Var Value : TDynamicString \) : Boolean; Overload;  
Function    GetState\_ParameterAsString      \(Const Name : TDynamicString; Var Value : TString \) : Boolean;        Overload;  
Function    GetState\_ParameterAsPChar       \(Const Name : TDynamicString; Var Value : PChar  \) : Boolean;  
Function    GetState\_ParameterAsLongInt     \(Const Name : TDynamicString; Var Value : LongInt\) : Boolean;  
Function    GetState\_ParameterAsInteger     \(Const Name : TDynamicString; Var Value : Integer\) : Boolean;  
Function    GetState\_ParameterAsInt64       \(Const Name : TDynamicString; Var Value : Int64  \) : Boolean;  
Function    GetState\_ParameterAsSmallInt    \(Const Name : TDynamicString; Var Value : SmallInt\) : Boolean;  
Function    GetState\_ParameterAsWord        \(Const Name : TDynamicString; Var Value : Word   \) : Boolean;  
Function    GetState\_ParameterAsBoolean     \(Const Name : TDynamicString; Var Value : Boolean\) : Boolean;  
Function    GetState\_ParameterAsWordBool    \(Const Name : TDynamicString; Var Value : WordBool\) : Boolean;  
Function    GetState\_ParameterAsReal        \(Const Name : TDynamicString; Var Value : Single  \) : Boolean;  
Function    GetState\_ParameterAsDouble      \(Const Name : TDynamicString; Var Value : Double\) : Boolean;


Function    GetState\_ParameterByName  \(Const AName : TDynamicString\) : TParameter;  
Function    SetState\_RemoveByName     \(Const AName : TDynamicString\) : Boolean;  
Procedure   ClearAllParameters;  
Procedure   SetState\(P : PChar\);  
Procedure   GetState\(P : PChar\);  
__Scripting Notes__  
In Scripting, we can only use the following methods SetState\_FromString \(Const S : TDynamicString\); and  GetState\_ToString to process strings\. The SetState and GetState methods cause problems in the scripting engine\.

__Example in DelphiScript__

01

//Parameters = Orientation=1|Location\.X=10000000|Location\.Y=20000000';

02

    P := TParameterList\.Create; // P is of TParameterList type\.

03

    P\.ClearAllParameters;

04

    P\.SetState\_FromString\(Parameters\);

05

    P\.SetState\_AddParameterAsString \('Orientation','1'\);

06

    P\.SetState\_AddParameterAsString \('Location\.X' ,'10000000'\);

07

    P\.SetState\_AddParameterAsString \('Location\.Y' ,'20000000'\);

08

    P\.SetState\_AddParameterAsString \('Designator' ,'dB1'\);

09

    P\.SetState\_AddParameterAsString \('Comment'    ,'50pF'\);

10

    Parameters := P\.GetState\_ToString;

11

  

12

    IntegratedLibraryManager\.PlaceLibraryComponent\(SchLibRef,SchLibpath,Parameters\);

13

    P\.Free;


Function  GetState\_Parameter      \(P : PChar; Const Name : TString; Var Value : TString\) : Boolean; Overload;  
Function  GetState\_Parameter      \(P : PChar; Const Name : TDynamicString; Var Value : TDynamicString\) : Boolean; Overload;  
   
Procedure SetState\_RemoveParameter\(P : PChar; Const Name : TDynamicString\); Overload;  
Function  GetState\_ParameterPChar \(P : PChar; Const Name : TDynamicString;     Value : PChar\)  : Boolean;  
Procedure SetState\_ParameterPChar \(P : PChar; Const Name : TDynamicString;     Value : PChar\);  
Procedure SetState\_Parameter      \(P : PChar; Const Name : TDynamicString; Const Value : TDynamicString\); Overload;  
   
Function  GetState\_Parameter      \(Const S : TDynamicString; Const Name : TDynamicString; Var   Value : TDynamicString\) : Boolean; Overload;  
Procedure SetState\_Parameter      \(Var   S : TDynamicString; Const Name : TDynamicString; Const Value : TDynamicString\); Overload;  
Procedure SetState\_RemoveParameter\(Var   S : TDynamicString; Const Name : TDynamicString\); Overload;

## 子章节

- [<a id="TParameterList_Class"></a>TParameterList Class](01-a_id_TParameterList_Class_a_TParameterList_Class.md.md)
- [<a id="Process_Parameter_Functions"></a>Process Parameter Functions](02-a_id_Process_Parameter_Functions_a_Process_Parameter_Functions.md.md)
