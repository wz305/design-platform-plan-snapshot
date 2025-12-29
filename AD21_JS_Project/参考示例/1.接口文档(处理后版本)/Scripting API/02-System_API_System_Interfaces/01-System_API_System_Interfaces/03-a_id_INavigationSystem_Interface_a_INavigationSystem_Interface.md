### <a id="INavigationSystem_Interface"></a>INavigationSystem Interface

__Overview__  
The navigation system is the workhouse for the Navigation panel which is the center\-piece for net connectivity for the design project\. There are three ways a design can be arranged \- as a list of compiled sheets, flattened hierarchy and as a structural tree\.

__INavigationSystem Methods and Properties Table__

__INavigationSystem methods__  
RegisterNavigationProvider  
UnregisterNavigationProtocol  
RegisterSpecialURLString  
UnregisterSpecialURLString  
ParseDestinationString  
NavigateTo  
ExpandTargets  
ValidatedTarget

__INavigationSystem properties__

__See also__  
IClient interface

#### INavigationSystem Methods

##### UnregisterNavigationProtocol method

\(INavigationSystem interface\)  
__Syntax__  
Procedure UnregisterNavigationProtocol\(Const Protocol : WideString; Handle : THandle\);  
__Description__  
__Example__  
__See also__  
INavigationSystem interface

##### RegisterSpecialURLString method

\(INavigationSystem interface\)  
__Syntax__  
Procedure RegisterSpecialURLString \(Const SpecialString : WideString; SpecialStringFunc : TSpecialStringFunc\);  
__Description__  
__Example__  
__See also__  
INavigationSystem interface

##### RegisterNavigationProvider method

\(INavigationSystem interface\)  
__Syntax__  
Function RegisterNavigationProvider \(Const ProtocolName : WideString; Const NavigationProvider : INavigationProvider\) : THandle;  
__Description__  
__Example__  
__See also__  
INavigationSystem interface

##### ParseDestinationString method

\(INavigationSystem interface\)  
__Syntax__  
Procedure ParseDestinationString\(Const Destination : WideString; Var Protocol, Target, Parameters : WideString\);  
__Description__  
__Example__  
__See also__  
INavigationSystem interface

##### NavigateTo method

\(INavigationSystem interface\)  
__Syntax__  
Function NavigateTo \(Const CurrentView : IExternalForm; Var Destination : WideString; Out TargetView : IExternalForm\) : LongBool;  
__Description__  
__Example__  
__See also__  
INavigationSystem interface

##### ExpandTargets method

\(INavigationSystem interface\)  
__Syntax__  
Procedure ExpandTargets \(Var Target : WideString\);  
__Description__  
__Example__  
__See also__  
INavigationSystem interface

##### ValidatedTarget method

\(INavigationSystem interface\)  
__Syntax__  
Function ValidatedTarget \( Target : WideString\) : WideString;  
__Description__  
__Example__  
__See also__  
INavigationSystem interface

##### UnregisterSpecialURLString method

\(INavigationSystem interface\)  
__Syntax__  
Procedure UnregisterSpecialURLString \(Const SpecialString : WideString; SpecialStringFunc : TSpecialStringFunc\);  
__Description__  
__Example__  
__See also__  
INavigationSystem interface