### TCoordRect

TCoordRect   = Record  
    Case Integer of  
       0 :\(left,bottom,right,top : TCoord\);  
       1 :\(x1,y1,x2,y2           : TCoord\);  
       2 :\(Location1,Location2   : TCoordPoint\);  
End; Note TPoint is a Borland Delphi defined type in the Types\.pas unit\.