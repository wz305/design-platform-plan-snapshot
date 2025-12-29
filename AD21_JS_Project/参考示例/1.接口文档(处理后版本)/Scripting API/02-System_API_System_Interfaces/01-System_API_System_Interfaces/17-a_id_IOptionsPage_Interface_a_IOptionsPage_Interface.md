### <a id="IOptionsPage_Interface"></a>IOptionsPage Interface

__Overview__  
The IOptionsPage interface represents the page of controls in the system wide Preferences dialog\. For example, in Altium Designer, the controls on this page in the Preferences dialog are mapped from the controls on a server panel of this server\. The controls on a page is represented by the TOptionsForm object and its IOptionsPage interface\.

__Note__  
The server module \(TServerModule class\) has the RegisterOptionsPageClass method which takes in the TOptionsForm object\. The IOptionsPage interface represents this TOptionsForm object\.  
The TOptionsForm class has methods that you need to override to implement the OptionsPage, OptionsManager, OptionsReader and OptionsWriter interfaces\.  
ClearModified  
GetModified  
GetStateControls  
GetNotificationCode  
DoSetStateControls  
SetDefaultState

__IOptionsPage Methods and Properties table__

__IOptionsPage methods__  
GetModified  
SetModified  
GetStateControls  
SetStateControls  
GetNotificationCode  
SetDefaultState  
PostEditControls

__IOptionsPage properties__  
Modified

__Example__

01

    TGraphicPrefsForm\_General = Class\(TOptionsForm\)

02

        chxScale        : TCheckBox;

03

        chxProportional : TCheckBox;

04

    Private

05

        FScaleStored        : Boolean;

06

        FProportionalStored : Boolean;

07

    Protected

08

        Procedure ClearModified;                        Override;

09

        Function  GetModified : Boolean;                Override;

10

        Procedure GetStateControls;                     Override;

11

        Function  GetNotificationCode : Integer;        Override;

12

        Procedure DoSetStateControls;                   Override;

13

        Procedure SetDefaultState;                      Override;

14

    End;

15

\{\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\}

16

Function TGraphicPrefsForm\_General\.GetNotificationCode: Integer;

17

Begin

18

    Result := cGraphicPreferencesChanged;

19

End;

20

Procedure TGraphicPrefsForm\_General\.GetStateControls;

21

Begin

22

    gv\_GraphicPreferences\.ScaleImage      := chxScale       \.Checked;

23

    gv\_GraphicPreferences\.KeepAspectRatio := chxProportional\.Checked;

24

End;

25

Procedure TGraphicPrefsForm\_General\.DoSetStateControls;

26

Begin

27

    chxScale       \.Checked := gv\_GraphicPreferences\.ScaleImage;

28

    chxProportional\.Checked := gv\_GraphicPreferences\.KeepAspectRatio;

29

End;

30

Procedure TGraphicPrefsForm\_General\.SetDefaultState;

31

Begin

32

    chxScale       \.Checked := False;

33

    chxProportional\.Checked := False;

34

    Inherited;

35

End;

36

Procedure TGraphicPrefsForm\_General\.ClearModified;

37

Begin

38

    FScaleStored        := chxScale\.Checked;

39

    FProportionalStored := chxProportional\.Checked;

40

End;

41

Function TGraphicPrefsForm\_General\.GetModified : Boolean;

42

Begin

43

    Result := \(FScaleStored <> chxScale\.Checked\) Or

44

              \(FProportionalStored <> chxProportional\.Checked\);

45

End;

__See also__  
IOptionsManager interface  
IOptionsReader interface  
IOptionsWriter interface

#### IOptionsPage GetState and SetState Methods

##### GetModified method

\(IOptionsPage interface\)  
__Syntax__  
Function GetModified : Boolean;  
__Description__  
__Example__  
__See also__  
IOptionsPage interface

##### SetModified method

\(IOptionsPage interface\)  
__Syntax__  
Procedure SetModified\(Value : Boolean\);  
__Description__  
__Example__  
__See also__  
IOptionsPage interface

#### IOptionsPage Methods

##### SetStateControls method

\(IOptionsPage interface\)  
__Syntax__  
Procedure SetStateControls;  
__Description__  
This procedure updates the controls on the form from a data structure in a server module\.  
__Example__  
__See also__  
IOptionsPage interface

##### SetDefaultState method

\(IOptionsPage interface\)  
__Syntax__  
Procedure SetDefaultState;  
__Description__  
This procedure sets the controls on a page within the system wide Preferences dialog to their default values\.  
__Note__  
The SetDefaultState procedure is overridden in a server's TOptionsForm object\.  
__Example__  
__See also__  
IOptionsPage interface

##### PostEditControls method

\(IOptionsPage interface\)  
__Syntax__  
Procedure PostEditControls;  
__Description__  
__Example__  
__See also__  
IOptionsPage interface

##### GetStateControls method

\(IOptionsPage interface\)  
__Syntax__  
Procedure GetStateControls;  
__Description__  
This procedure  
__Note__  
__Example__  
__See also__  
IOptionsPage interface

##### GetNotificationCode method

\(IOptionsPage interface\)  
__Syntax__  
Function GetNotificationCode : Integer;  
__Description__  
Each server that handles Option notifications to its server panel and the system wide Preferences dialog in Altium Designer will have its own Notification code which could be a value of 100 upwards\.  
__Note__  
A server module will have a TOptionsForm object registered and this object will have a GetNotificationCode function overridden\. This server module will have its own notification code value\. Ensure these notification codes are unique\.  
__Example__  
__See also__  
IOptionsPage interface

#### IOptionsPage Properties

##### Modified property

\(IOptionsPage interface\)  
__Syntax__  
Property Modified : Boolean Read GetModified Write SetModified;  
__Description__  
__Example__  
__See also__  
IOptionsPage interface