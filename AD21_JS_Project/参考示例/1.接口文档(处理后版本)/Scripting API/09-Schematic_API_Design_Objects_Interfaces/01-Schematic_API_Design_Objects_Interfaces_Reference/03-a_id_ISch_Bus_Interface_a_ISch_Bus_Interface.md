### <a id="ISch_Bus_Interface"></a>ISch\_Bus Interface

__Overview__  
Buses are special graphical elements that represent a common pathway for multiple signals on a schematic document\.  Buses have no electrical properties, and they must be correctly identified by net labels and ports\.  
__Notes__  
The ISch\_Bus interface hierarchy is as follows:  
ISch\_GraphicalObject  
    ISch\_Polygon  
        ISch\_Polyline  
            ISch\_Wire  
                ISch\_Bus  
Note that the ISch\_Wire interface has no extra properties and methods  but has inherited properties and methods only\.

__ISch\_Bus methods__

__ISch\_Bus properties__

__See also__  
ISch\_Wire  
ISch\_Polyline  
ISCh\_Polygon  
ISch\_GraphicalObject