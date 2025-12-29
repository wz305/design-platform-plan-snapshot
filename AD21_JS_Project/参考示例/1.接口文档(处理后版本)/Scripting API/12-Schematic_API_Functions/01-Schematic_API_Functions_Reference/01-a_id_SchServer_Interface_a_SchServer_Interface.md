### <a id="SchServer_Interface"></a>SchServer Interface

Function SchServer : ISch\_ServerInterface;

__Description__  
The SchServer function returns the interface of the loaded Schematic Editor module in Altium Designer\. To work with Schematic objects, you need to have access to the ISch\_ServerInterface interface first\. To obtain the current schematic document, invoke the SchServer\.GetCurrentSchDocument for instance\.

Refer to the ISch\_ServerInterface’s methods and properties for more information\.

__Example 1__

1

    // Grab current schematic document\.

2

    SchDoc := SchServer\.GetCurrentSchDocument;

3

    If SchDoc = Nil Then Exit;

4

  

5

    // Component is a container that has child objects

6

    // Create component, and its rectangle, pin and parameter objects\.

7

    Component := SchServer\.SchObjectFactory \(eSchComponent, eCreate\_Default\);

__Example 2__

01

   Try

02

       SchServer\.ProcessControl\.PreProcess\(SchDoc, ''\);

03

  

04

       // Add the parameter to the pin with undo stack also enabled

05

       Param\.Name := 'Added Parameter';

06

       Param\.Text := 'Param added to the pin\. Press Undo and this will disappear\.  Press undo twice to remove the component';

07

       Param\.Location := Point\(InchesToCoord\(3\), InchesToCoord\(2\.4\)\);

08

  

09

       Pin\.AddSchObject\(Param\);

10

       SchServer\.RobotManager\.SendMessage\(Component\.I\_ObjectAddress, c\_BroadCast, SCHM\_PrimitiveRegistration, Param\.I\_ObjectAddress\);

11

   Finally

12

       SchServer\.ProcessControl\.PostProcess\(SchDoc, ''\);

13

   End;

__See also__  
ISch\_ServerInterface interface