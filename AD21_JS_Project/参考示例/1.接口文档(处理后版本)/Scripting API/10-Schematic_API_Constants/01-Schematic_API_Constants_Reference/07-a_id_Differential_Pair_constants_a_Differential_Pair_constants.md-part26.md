#### Methods

##### I\_ObjectAddress method

\(IPCB\_AbstractIterator, IPCB\_BoardIterator, IPCB\_SpatialIterator, IPCB\_GroupIterator, IPCB\_Sheet\)  
__Syntax__  
Function I\_ObjectAddress : TPCBObjectHandle;  
__Description__  
The __I\_ObjectAddress__ property retrieves the pointer to the iterator object\. This property is useful for situations where you need to have references to objects \(not to object interfaces\) and store them in a TList container for example\.  
__See also__  
IPCB\_Sheet interface