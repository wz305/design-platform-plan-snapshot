### <a id="IPin_interface"></a>IPin interface

__Overview__  
The IPin interface is a pin object interface to an existing pin object on the schematic\. Pins are special objects that have electrical characteristics and are used to direct signals in and out of components\. Pins connect directly to other pins, wires, net labels, sheet entries or ports\.  
__Notes__  
The IPin interface is inherited from the INetItem interface\.  
The pins are part of a schematic component, thus if you wish to have access to the pins, invoke the DM\_Pins and DM\_PinCount method call from the part object interface\.  
An equivalent Pin object representation is the ISch\_Pin interface in Schematic API Reference  
__Example__

01

For J := 0 to Doc\.DM\_ComponentCount \- 1 Do

02

Begin

03

    Comp := Doc\.DM\_Components\(J\);

04

    //Comp\.DM\_Footprint;

05

    //Comp\.DM\_Comment;

06

    For K := 0 to Comp\.DM\_PinCount \- 1 Do

07

    Begin

08

        Pin := Comp\.DM\_Pins\(K\);

09

        PinName := Pin\.DM\_PinNumber;

10

        // Check for parts of a multi\-part component that are not used in the project

11

        // then add 'No Net' for unused pins\.\.\.

12

        If Pin\.DM\_FlattenedNetName = '?' Then

13

           // these pins of the part is not used on the schematic\.

14

    End;

15

End;

__See also__  
INetItem interface