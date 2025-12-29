### <a id="IPCB_DesignRuleCheckerOptions"></a>IPCB\_DesignRuleCheckerOptions

__Overview__  
The IPCB\_DesignRuleCheckerOptions interface deals with the DRC options\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__IPCB\_DesignRuleCheckerOptions Methods__  
Procedure Export\_ToParameters\_GeneralOptions        \(Parameters : PChar\);   
Procedure Export\_ToParameters\_RulesToCheck          \(Parameters : PChar\);   
Procedure Export\_ToParameters\_RulesToCheck\_Version3 \(Parameters : PChar\);   
Procedure Import\_FromParameters\_GeneralOptions      \(Parameters : PChar\);   
Procedure Import\_FromParameters\_RulesToCheck        \(Parameters : PChar\);  
__IPCB\_DesignRuleCheckerOptions Properties__  
Property OnLineRuleSetToCheck            : TRuleSet  
Property DoMakeDRCFile                   : Boolean   
Property DoMakeDRCErrorList              : Boolean   
Property DoSubNetDetails                 : Boolean   
Property RuleSetToCheck                  : TRuleSet  
Property ReportFilename                  : TPCBString   
Property ExternalNetListFileName         : TPCBString   
Property CheckExternalNetList            : Boolean   
Property MaxViolationCount               : Integer   
Property InternalPlaneWarnings           : Boolean   
Property VerifyShortingCopper            : Boolean  
__See also__  
IPCB\_AbstractOptions interface