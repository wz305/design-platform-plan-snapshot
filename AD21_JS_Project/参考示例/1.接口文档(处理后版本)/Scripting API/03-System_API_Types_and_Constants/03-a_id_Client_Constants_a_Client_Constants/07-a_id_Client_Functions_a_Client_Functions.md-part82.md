#### RunCommand

__Syntax__  
Procedure RunCommand \(Const IdString : TDynamicString; Const SpecialParameter : TDynamicString\);  
__Description__  
This procedure executes a server process with parameters\. The IdString parameter denotes the servername:serverprocessname\. The SpecialParameter parameter denotes the parametername=parametervalue blocks separated by the | pipe symbol\.  
This RunCommand function is not properly supported by the scripting system in Altium Designer\.  
__Examples__

1

RunCommand\('Client:SetupPreferences', 'Server=PCB|PageName=Models'\);

2

RunCommand\('WorkspaceManager:Configure','ObjectKind=MessageView|Action=ClearAll'\);

3

RunCommand\('PCB:BoardInformation',''\);

4

RunCommand\('PCB:Zoom','Action=Redraw'\);

__See also__  
RunSystemCommand