### <a id="IOptionsReader_Interface"></a>IOptionsReader Interface

__Overview__  
The IOptionsReader interface reads values for options on a page in the system wide Preferences dialog or Project options dialog from the registry storage\.

__IOptionsReader methods__  
ReadBoolean  
ReadDouble  
ReadInteger  
ReadString  
ReadSection  
SectionExists  
ValueExists

__IOptionsReader properties__

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

    AValue := Reader\.ReadBoolean\(NameOfServerPreferences,SettingName,DefaultValue\);

8

End;

__See also__  
IClient interface  
IOptionsManager interface

#### IOptionsReader Methods

##### ValueExists method

\(IOptionsReader interface\)  
__Syntax__  
Function ValueExists \(Const SectionName, ValueName : WideString\) : LongBool;  
__Description__  
This function determines whether the value name exists for this section name\. This is useful if you need to check if a value name exists in the registry storage before you commit a value to this location\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsReader interface

##### SectionExists method

\(IOptionsReader interface\)  
__Syntax__  
Function SectionExists\(Const SectionName : WideString\) : LongBool;  
__Description__  
This function checks whether the section \(or the targetted page\) exists or not\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
See also  
IOptionsReader interface

##### ReadString method

\(IOptionsReader interface\)  
__Syntax__  
Function ReadString \(Const SectionName, ValueName, DefaultValue : WideString\) : WideString;  
__Description__  
This ReadString function retrieves a string value for the specified server and the setting name that are represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsReader interface

##### ReadSection method

\(IOptionsReader interface\)  
__Syntax__  
Function ReadSection \(Const SectionName : WideString\) : WideString;  
__Description__  
This function retrieves the data for the section which is the targetted page in the system wide Preferences dialog\.  
Note the section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsReader interface

##### ReadInteger method

\(IOptionsReader interface\)  
__Syntax__  
Function ReadInteger \(Const SectionName, ValueName : WideString; DefaultValue : Integer\) : Integer;  
__Description__  
This ReadInteger function retrieves an integral value for the specified server and the setting name that are represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsReader interface

##### ReadDouble method

\(IOptionsReader interface\)  
__Syntax__  
Function ReadDouble \(Const SectionName, ValueName : WideString; DefaultValue : Double\) : Double;  
__Description__  
This ReadDouble function retrieves a double value for the specified server and the setting name that are represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsReader interface

##### ReadBoolean method

\(IOptionsReader interface\)  
__Syntax__  
Function ReadBoolean \(Const SectionName, ValueName : WideString; DefaultValue : LongBool\) : LongBool;  
__Description__  
This ReadBoolean function retrieves a boolean value for the specified server and the setting name that are represented by the system wide Preferences dialog\.  
The DefaultValue parameter for the ReadBoolean method returns a default Boolean value if the specific control on the Preferences dialog is not returning a valid Boolean value\.  
The section name represents the target server’s page in the system wide preferences dialog\.  
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

    AValue := Reader\.ReadBoolean\(NameOfServerPreferences,SettingName,DefaultValue\);

8

End;

__See also__  
IOptionsReader interface