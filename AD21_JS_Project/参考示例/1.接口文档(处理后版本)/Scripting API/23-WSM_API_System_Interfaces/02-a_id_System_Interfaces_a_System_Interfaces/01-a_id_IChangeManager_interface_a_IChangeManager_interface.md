### <a id="IChangeManager_interface"></a>IChangeManager interface

__Overview__  
The IChangeManager interface represents the change manager where you can execute an ECO of pins to be swapped for the target component of the target document\.

__Interface Methods__  
Procedure DM\_SetProject1\(AProject : IProject\);                        
Procedure DM\_SetProject2\(AProject : IProject\);                        
Function  DM\_ExecuteChanges\(IsSilent : LongBool\) : LongBool;          
Procedure DM\_CreateECO\_SwapPin        \(TargetDocument : IDocument;  
                                       TargetComponent: IComponent;  
                                       TargetPin      : IPin;  
                                       NewPinNumber   : WideString;  
                                       OldPinNet      : WideString;  
                                       NewPinNet      : WideString\);  
__See also__  
Workspace Manager Interfaces  
IDocument interface  
IComponent interface  
IPin interface