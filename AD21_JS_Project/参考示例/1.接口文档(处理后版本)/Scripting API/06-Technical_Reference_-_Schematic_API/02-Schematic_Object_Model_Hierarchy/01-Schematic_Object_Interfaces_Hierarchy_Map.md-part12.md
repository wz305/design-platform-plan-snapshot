#### ISch\_BasicContainer Methods

##### AddAndPositionSchObject method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure AddAndPositionSchObject\(AObject : ISch\_BasicContainer\);  
__Description__  
The AddSchObject procedure adds and positions a child object into the parent object that the AddSchObject is associated with\. For example adding sheet entries in a sheet symbol, you would use this method\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
AddSchObject method

##### AddSchObject method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure AddSchObject \(AObject : ISch\_BasicContainer\);  
__Description__  
The AddSchObject procedure adds a child object into the parent object that the AddSchObject is associated with\.  
DelphiScript __Example__

01

// Create a parameter object and add it to the new pin object\.

02

Try

03

    SchServer\.ProcessControl\.PreProcess\(SchDoc, ''\);

04

    // Add the parameter to the pin with undo stack also enabled

05

    Param\.Name := 'Added Parameter';

06

    Param\.Text := 'Param added to the pin\. Press Undo and this will disappear\.  Press undo twice to remove the component';

07

    Param\.Location := Point\(InchesToCoord\(3\), InchesToCoord\(2\.4\)\);

08

    Pin\.AddSchObject\(Param\);

09

    SchServer\.RobotManager\.SendMessage\(Component\.I\_ObjectAddress, c\_BroadCast, SCHM\_PrimitiveRegistration, Param\.I\_ObjectAddress\);

10

Finally

11

    SchServer\.ProcessControl\.PostProcess\(SchDoc, ''\);

12

End;

__See also__  
ISch\_BasicContainer interface

##### DeleteAll method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure DeleteAll;  
__Description__  
The DeleteAll procedure removes the contained objects from the container of ISch\_BasicContainer type\. For example, if you just want to get a list of contained objects, and make small changes to them and then move them to a new container\. In this case, you do not want to free and recreate all the contained objects, so you use the DeleteAll method\. To have a clean container, you need to call the FreeAllContainedObjects method instead\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
FreeAllContainedObjects method

##### FreeAllContainedObjects method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure FreeAllContainedObjects;  
__Description__  
The FreeAllContainedObjects procedure removes the contained objects from the container of ISch\_BasicContainer type and the container ends up clean\. To have container that can be reused with the same elements in another container, you need to call the DeleteAll method instead\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
DeleteAll method

##### GetState\_DescriptionString method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_DescriptionString : WideString;  
__Description__  
This function returns you the description string for this object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface

##### GetState\_IdentifierString method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_IdentifierString : WideString;  
__Description__  
This function returns you the identifier string\.  
__Example__  
__See also__  
ISch\_BasicContainer interface

##### GetState\_ObjectId method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_ObjectId : TObjectId;  
__Description__  
The ObjectID property determines what object type the object in question is\. For example when iterating for objects on a schematic document, you would want to modify all objects but update the port objects' locations only, thus you check for the object's ObjectId and if it is a ePort type, then take action\.  
The function retrieves the ObjectId type and this function is used as a getter in the ObjectID property\.  
__DelphiScript Example__

01

AnObject := Iterator\.FirstSchObject;

02

While AnObject <> Nil Do

03

Begin

04

    SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_BeginModify, c\_NoEventData\);

05

  

06

    Case AnObject\.ObjectId Of

07

       eWire   : AnObject\.Color     := $0000FF; //red color in bgr format

08

       ePort   : AnObject\.AreaColor := $00FF00; //green color in bgr format

09

    End;

10

  

11

    SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_EndModify  , c\_NoEventData\);

12

    AnObject := Iterator\.NextSchObject;

13

End;

__See also__  
ISch\_BasicContainer interface

##### GetState\_OwnerSchDocument method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_OwnerSchDocument : ISch\_Document;  
__Description__  
This property returns the ISch\_Document interface that the object is associated with\. It is also said that the document owns the object when the Object has a valid OwnerDocument property\.  
The function returns the ISch\_Document interface that the object is associated with\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
ISch\_Document interface  
ISch\_GraphicalObject interface

##### GetState\_SchBasicContainer method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_SchBasicContainer : ISch\_BasicContainer;  
__Description__  
This function obtains the container of child objects from the parent object itself\. This function is used in the Container property\.  
__Example__  
__See also__  
ISch\_BasicContainer interface

##### GetState\_Text method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Function GetState\_Text : WideString;  
__Description__  
This function retrieves the text string for this object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface

##### I\_ObjectAddress method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Function I\_ObjectAddress : TSCHObjectHandle;  
__Description__  
This function retrieves the object address \(a pointer type\) of the object in question which is of TSchObjectHandle type\. This function is mainly used for the SendMessge method from the ISch\_RobotManager interface\.  
__DelphiScript Example__

1

SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_BeginModify, c\_NoEventData\);

2

AnObject\.Color     := $0000FF; //red color in bgr format

3

SchServer\.RobotManager\.SendMessage\(AnObject\.I\_ObjectAddress, c\_BroadCast, SCHM\_EndModify  , c\_NoEventData\);

4

  

__See also__  
ISch\_BasicContainer interface  
ISch\_RobotManager interface

##### Import\_FromUser method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Function Import\_FromUser : Boolean;  
__Description__  
The Import\_FromUser function invokes the Properties dialog for the object\. This is equivalent to when you double click on an object on the schematic document and the Object Properties dialog appears\. This function returns a True value when the User clicks okay otherwise a False value is returned\.  
An example of using this method is to pop up the Properties dialog programmatically so that the user can modify the object and then the script or the server code can do more processing\.  
__Example__  
__See also__  
ISch\_BasicContainer interface

##### RemoveSchObject method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure RemoveSchObject \(AObject : ISch\_BasicContainer\);  
__Description__  
The RemoveSchObject method removes the Schematic object from the database associated with the document or the parent object but it is not removed from memory\. Therefore an Undo action will be able to restore this object only if the RobotManager's SendMessage methods are invoked\.  
__DelphiScript Example__

01

// Initialize the robots in Schematic editor\.

02

SchServer\.ProcessControl\.PreProcess\(CurrentSheet, ''\);

03

  

04

// Set up iterator to look for Port objects only

05

Iterator := CurrentSheet\.SchIterator\_Create;

06

If Iterator = Nil Then Exit;

07

Iterator\.AddFilter\_ObjectSet\(MkSet\(ePort\)\);

08

Try

09

    Port := Iterator\.FirstSchObject;

10

    While Port <> Nil Do

11

    Begin

12

        OldPort := Port;

13

        Port    := Iterator\.NextSchObject;

14

        CurrentSheet\.RemoveSchObject\(OldPort\);

15

             

16

        SchServer\.RobotManager\.SendMessage\(CurrentSheet\.I\_ObjectAddress,c\_BroadCast,

17

                               SCHM\_PrimitiveRegistration,OldPort\.I\_ObjectAddress\);

18

    End;

19

Finally

20

    CurrentSheet\.SchIterator\_Destroy\(Iterator\);

21

End;

22

// Clean up robots in Schematic editor\.

23

SchServer\.ProcessControl\.PostProcess\(CurrentSheet, ''\);

__See also__  
ISch\_BasicContainer interface

##### Replicate method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Function Replicate : ISch\_BasicContainer;  
__Description__  
This functions makes another copy of this object but with an unique object address \(a new memory location\) but with same attributes as this object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface

##### SchIterator\_Create method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Function SchIterator\_Create : ISch\_Iterator;  
__Description__  
The SchIterator\_Create function creates an iterator for the parent object \(such as the document, component or the sheet symbol\) and with this iterator, you have the ability to iterate the child objects within, such as pins of a component\. Once you have finished using the iterator, invoke the SchIterator\_Destroy method to free the iterator from memory\.  
__Example__

01

Try

02

    SheetSymbol := ParentIterator\.FirstSchObject;

03

    While SheetSymbol <> Nil Do

04

    Begin

05

        // Look for sheet entries \(child objects\) within a sheet symbol object\.

06

        ChildIterator := SheetSymbol\.SchIterator\_Create;

07

        If ChildIterator <> Nil Then

08

        Begin

09

            ChildIterator\.AddFilter\_ObjectSet\(MkSet\(eSheetEntry\)\);

10

            Try

11

                SheetEntry := ChildIterator\.FirstSchObject;

12

                While SheetEntry <> Nil Do

13

                Begin

14

                    EntriesNames := SheetEntry\.Name \+ \#13 \+ EntriesNames;

15

                    SheetEntry := ChildIterator\.NextSchObject;

16

                End;

17

            Finally

18

                SheetSymbol\.SchIterator\_Destroy\(ChildIterator\);

19

            End;

20

        End;

21

        SheetSymbol := ParentIterator\.NextSchObject;

22

    End;

23

Finally

24

    CurrentSheet\.SchIterator\_Destroy\(ParentIterator\);

25

End;

__See also__  
ISch\_BasicContainer interface  
ISch\_Iterator interface  
SchIterator\_Destroy

##### SchIterator\_Destroy method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure SchIterator\_Destroy\(Var AIterator : ISch\_Iterator\);  
__Description__  
The SchIterator\_Destroy function destroys the iterator from the parent object \(such as the document, component or the sheet symbol\)\. This iterator once created with the SchIterator\_Create method, has the ability to iterate the child objects within, such as pins of a component\.  
__DelphiScript Example__

01

Try

02

    SheetSymbol := ParentIterator\.FirstSchObject;

03

    While SheetSymbol <> Nil Do

04

    Begin

05

        // Look for sheet entries \(child objects\) within a sheet symbol object\.

06

        ChildIterator := SheetSymbol\.SchIterator\_Create;

07

        If ChildIterator <> Nil Then

08

        Begin

09

            ChildIterator\.AddFilter\_ObjectSet\(MkSet\(eSheetEntry\)\);

10

            Try

11

                SheetEntry := ChildIterator\.FirstSchObject;

12

                While SheetEntry <> Nil Do

13

                Begin

14

                    EntriesNames := SheetEntry\.Name \+ \#13 \+ EntriesNames;

15

                    SheetEntry := ChildIterator\.NextSchObject;

16

                End;

17

            Finally

18

                SheetSymbol\.SchIterator\_Destroy\(ChildIterator\);

19

            End;

20

        End;

21

        SheetSymbol := ParentIterator\.NextSchObject;

22

    End;

23

Finally

24

    CurrentSheet\.SchIterator\_Destroy\(ParentIterator\);

25

End;

__See also__  
ISch\_BasicContainer interface  
SchIterator\_Create;

##### Setstate\_Default method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure Setstate\_Default\(AUnit : TUnitSystem\);  
__Description__  
This procedure sets the default unit system for this object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface  
TUnitSystem type

##### SetState\_Text method

\(ISch\_BasicContainer interface\)  
__Syntax__  
Procedure SetState\_Text \(AValue : WideString\);  
__Description__  
This procedure sets the text string for this object\.  
__Example__  
__See also__  
ISch\_BasicContainer interface