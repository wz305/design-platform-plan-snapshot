#### GetDatafileEntityCount method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Function GetDatafileEntityCount \(LibraryPath : WideString; ComponentIndex : Integer; ModelIndex : Integer\) : Integer;  
__Description__  
This function gets datafile entity count for the specified component and its indexed model in the specified library path\. Remember first index is 0\.  
__Example__ 

1

DataEntityCount := IntLib\.GetDatafileEntityCount\(Librarypath,I,0\); 

2

ShowMessage\(IntToStr\(DataEntityCount\);

3

// indexed component is I and 0 is the first model for the component\.

__See also__  
IIntegratedLibraryManager interface