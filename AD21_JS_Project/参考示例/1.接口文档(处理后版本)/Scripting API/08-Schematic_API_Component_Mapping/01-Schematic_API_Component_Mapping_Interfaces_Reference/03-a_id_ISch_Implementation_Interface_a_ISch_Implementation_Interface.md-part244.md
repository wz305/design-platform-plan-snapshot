#### CreateIntegratedLibrary method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure CreateIntegratedLibrary \(AProject : IProject; AnOutputPath : WideString; Install : Boolean\);  
__Description__  
This CreateIntegratedLibrary procedure creates an integrated library from a project into the specified AnOutputPath path and depending on the Install parameter is installed in the Available Libraries dialog\.  
__Example__ 

01

IntMan := IntegratedLibraryManager;                            

02

If IntMan = Nil Then Exit;                                     

03

WSM := GetWorkSpace;                                           

04

If WSM = Nil Then Exit;                                        

05

                                                                

06

Project := WSM\.DM\_FocusedProject;                              

07

If Project = Nil Then Exit;                                    

08

LibPath := ChangeFileExt\(Project\.DM\_ProjectFullPath,'\.INTLIB'\);

09

IntMan\.CreateIntegratedLibrary\(Project,LibPath,True\);          

10

IntMan\.MakeCurrentProject\(Project\);

__See also__  
IIntegratedLibraryManager interface