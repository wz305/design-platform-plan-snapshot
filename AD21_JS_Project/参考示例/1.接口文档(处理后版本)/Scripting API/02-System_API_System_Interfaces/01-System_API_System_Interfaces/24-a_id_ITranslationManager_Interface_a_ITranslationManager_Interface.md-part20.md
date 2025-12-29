#### TNonRefCountedInterfaceObject

TNonRefCountedInterfacedObject = Class\(TObject, IInterface\)  
  Protected  
    FRefCount : Integer;  
    Function    QueryInterface\(Const IID: TGUID; Out Obj\): HResult; StdCall;  
    Function    \_AddRef: Integer;                                   StdCall;  
    Function    \_Release: Integer;                                  StdCall;  
End;

### <a id="Dialogs"></a>Dialogs