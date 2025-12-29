### <a id="IOptionsManager_Interface"></a>IOptionsManager Interface

__Overview__  
The IOptionsManager interface deals with the options of a system wide Preferences dialog or project centric Project Options dialog\.

__Notes__  
A server needs to register its own options pages within the Client module of Altium Designer\. The TServerModule class from the RT\_ServerImplementation unit within the Altium Designer RTL has a RegisterOptionsPageClass procedure for you to override\. You need to pass in the name of the options page and the Options Form of TOptionsForm type\. Normally this form is the same as the server panel form with the controls on it\.

__IOptionsManager methods__  
GetOptionsReader  
GetOptionsWriter  
OptionsExist

__IOptionsManager properties__

__Example__

1

Procedure TGraphicPreferences\.Save;

2

Var

3

    Writer : IOptionsWriter;

4

Begin

5

    Writer := Client\.OptionsManager\.GetOptionsWriter\(CGraphicViewer\);

6

    If Writer = Nil Then Exit;

7

    Writer\.WriteBoolean\(cGraphicPreferences, 'ScaleImage'     , FScaleImage     \);

8

    Writer\.WriteBoolean\(cGraphicPreferences, 'KeepAspectRatio', FKeepAspectRatio\);

9

End;

__See also__  
IOptionsReader interface  
IOptionsWriter interface  
IOptionsPage interface  
GraphicViewer server project from \\Developer Kit\\Examples\\Dxp\\GraphicViewer folder

#### IOptionsManager Methods

##### OptionsExist method

\(IOptionsManager interface\)  
__Syntax__  
Function OptionsExist \(Const ServerName, OldSettingsPath : WideString\) : LongBool;  
__Description__  
This function checks if the options for the specified server exist on the system wide Preference dialog\.  
__Example__  
__See also__  
IOptionsManager interface

##### GetOptionsWriter method

\(IOptionsManager interface\)  
__Syntax__  
Function GetOptionsWriter \(Const ServerName : WideString\) : IOptionsWriter;  
__Description__  
This function retrieves the IOptionsWriter method which enables you to write setting values for the Options of the specified server\.  
__Example__

1

Var

2

    Writer : IOptionsWriter;

3

Begin

4

    Writer := Client\.OptionsManager\.GetOptionsWriter\(CGraphicViewer\);

5

    If Writer = Nil Then Exit;

6

  

7

    Writer\.WriteBoolean\(PreferencesName, OptionName , OptionValue\);

8

End;

__See also__  
IOptionsManager interface  
IOptionsWriter interface  
IOptionsReader interface

##### GetOptionsReader method

\(IOptionsManager interface\)  
__Syntax__  
Function GetOptionsReader \(Const ServerName, OldSettingsPath : WideString\) : IOptionsReader;  
__Description__  
This function retrieves the IOptionsReader method which enables you to read setting values for the Options of the specified server\.  
__Example__

1

Var

2

    Reader : IOptionsReader;

3

Begin

4

    Reader := Client\.OptionsManager\.GetOptionsReader\(NameOfServer,''\);

5

    If Reader = Nil Then Exit;

6

  

7

    OptionValue := Reader\.ReadBoolean\(ServerPreferencesName,OptionName,DefaultValue\);

8

End;

__See also__  
IOptionsManager interface  
IOptionsWriter interface  
IOptionsReader interface