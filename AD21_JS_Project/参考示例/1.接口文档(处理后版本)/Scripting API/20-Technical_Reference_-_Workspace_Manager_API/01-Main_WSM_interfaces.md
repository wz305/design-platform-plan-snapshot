### Main WSM interfaces

- The __IDMObject__ interface is a generic interface used for all other WorkSpace interfaces\.
- The __IWorkSpace__ interface is the top level interface and contains many interfaces within\. For example the __IWorkSpace__ interface has a __DM\_OpenProject__ function which returns a currently open or currently focused __IProject__ interface\.
- The __IProject__ interface represents the current project in Altium Designer\.
- The __IDocument__ interface represents a document in Altium Designer\.