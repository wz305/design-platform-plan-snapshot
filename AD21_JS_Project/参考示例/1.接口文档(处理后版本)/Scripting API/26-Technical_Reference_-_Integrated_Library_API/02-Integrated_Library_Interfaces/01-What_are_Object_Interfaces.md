### What are Object Interfaces?

Each method in the object interface is implemented in the corresponding class\. Object Interfaces \(interfaces for short\) are declared like classes but cannot be directly instantiated and do not have their own method definitions\.

Each interface, a class supports is actually a list of pointers to methods\. Therefore, each time a method call is made to an interface, the interface actually diverts that call to one of it's pointers to a method, thus giving the object that really implements it, the chance to act\.

The Integrated Library interfaces exist as long there are associated existing objects in memory, thus when writing a script or server code, you have the responsibility of checking whether the interface you wish to query exists or not before you proceed to invoke the interface's methods\.

To obtain the Integrated Library Manager object interface which represents to the Integrated Library manager object, invoke the IntegratedLibraryManager function in your script or code which returns you the IIntegratedLibraryManager object interface\.

To obtain the model type manager, invoke the ModelTypeManager function in your script which returns you the IModelTypeManger interface\.