### <a id="IOptionsWriter_Interface"></a>IOptionsWriter Interface

__Overview__  
The IOptionsWriter interface writes values for options on a page in the system wide Preferences or Project options dialog to a registry storage\.

__IOptionsWriter methods__  
EraseSection  
WriteBoolean  
WriteDouble  
WriteInteger  
WriteString

__IOptionsWriter properties__

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

    Writer\.WriteBoolean\(cGraphicPreferences, 'ScaleImage'     , FScaleImage     \);

7

    Writer\.WriteBoolean\(cGraphicPreferences, 'KeepAspectRatio', FKeepAspectRatio\);

8

End;

__See also__  
IClient interface  
IOptionsManager interface

#### IOptionsWriter Methods

##### EraseSection method

\(IOptionsWriter interface\)  
__Syntax__  
Procedure EraseSection\(Const SectionName : WideString\);  
__Description__  
This procedure removes all the option values for the section \(targetted page in the system wide preferences dialog\)\.  
__Example__  
__See also__  
IOptionsWriter interface

##### WriteInteger method

\(IOptionsWriter interface\)  
__Syntax__  
Procedure WriteInteger\(Const SectionName, ValueName : WideString; Value : Integer\);  
__Description__  
This WriteInteger procedure writes an integral value for the option name used by the specified server \(SectionName\) which is represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsWriter interface

##### WriteDouble method

\(IOptionsWriter interface\)  
__Syntax__  
Procedure WriteDouble \(Const SectionName, ValueName : WideString; Value : Double\);  
__Description__  
This WriteDouble procedure writes a double value for the option name used by the specified server \(SectionName\) which is represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsWriter interface

##### WriteBoolean method

\(IOptionsWriter interface\)  
__Syntax__  
Procedure WriteBoolean\(Const SectionName, ValueName : WideString; Value : LongBool\);  
__Description__  
This WriteBoolean procedure writes a boolean option value for the option name used by the specified server \(SectionName\) which is represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
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

    Writer\.WriteBoolean\(cGraphicPreferences, 'ScaleImage'     , FScaleImage     \);

8

    Writer\.WriteBoolean\(cGraphicPreferences, 'KeepAspectRatio', FKeepAspectRatio\);

9

End;

__See also__  
IOptionsWriter interface

##### WriteString method

\(IOptionsWriter interface\)  
__Syntax__  
Procedure WriteString \(Const SectionName, ValueName, Value : WideString\);  
__Description__  
This WriteString procedure writes a string option value for the option name used by the specified server \(SectionName\) which is represented by the system wide Preferences dialog\.  
The section name is the targetted page in the system wide preferences dialog\.  
__Example__  
__See also__  
IOptionsWriter interface