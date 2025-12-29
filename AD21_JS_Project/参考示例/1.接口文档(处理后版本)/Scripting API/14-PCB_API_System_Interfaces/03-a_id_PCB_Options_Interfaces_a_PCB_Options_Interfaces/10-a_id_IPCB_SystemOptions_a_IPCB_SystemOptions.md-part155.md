#### MakeCurrentProject method

\(IIntegratedLibraryManager interface\)  
__Syntax__  
Procedure MakeCurrentProject \(AProject : IProject\);  
__Description__  
This procedure makes the current library in the Libraries panel  based on the project\.  
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