#### LibPrimitiveSet

LibPrimitiveSet:  TObjectSet = \[eRectangle,  
                                eLine,  
                                eArc,  
                                eBus,  
                                eBusEntry,  
                                eEllipticalArc,  
                                eRoundRectangle,  
                                eImage,  
                                ePie,  
                                eEllipse,  
                                ePolygon,  
                                ePolyline,  
                                ePort,  
                                eBezier,  
                                eLabel,  
                                eNetlabel,  
                                eTextFrame,  
                                eSymbol,  
                                ePin,  
                                eParameterSet  
                                eWire\];  
   
cObjectInspectorViewname    = 'SchObjectInspector';  
cLibObjectInspectorViewname = 'SchLibObjectInspector';  
   
cGroundTypeSet = \[ePowerGndPower, ePowerGndSignal, ePowerGndEarth\];  
   
CLineShapeArrowRatio = 2;  
CLineShapeSizeCoefs : Array\[TSize\] Of Integer = \(1, 2, 3, 4\);  
   
cNoUnionIndex = 0;  
   
cStringIncrementStyleStrings : Array\[TStringIncrementStyle\] Of String = \('None','Horizontal First', 'Vertical First'\);