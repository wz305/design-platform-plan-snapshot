### <a id="General_constants"></a>General constants

    cDXPHomePage = 'DXP://Home';  
    cDXPProcess  = 'DXPProcess';  
    cDXPDocument = 'DXPDoc';  
    cViewNameParam = 'ViewName';  
    cContextHelpDelimiter = '\.';  
   
\{$IFDEF ALTIUMINTERNAL\}  
   cWebUpdate\_DefaultURL            = 'http://intranet\.altium\.com\.au/rd/AltiumDesigner6/Updates/';  
\{$ELSE\}  
   cWebUpdate\_DefaultURL            = 'https://www\.altium\.com/webupdate/';  
\{$ENDIF\}  
   cWebUpdate\_DefaultNetworkPath    = '';  
   cWebUpdate\_DefaultUseNetworkPath = False;  
   cWebUpdate\_DefaultCheckFrequency = wucfEveryDay;  
   
    cWebUpdate\_CheckFrequencyNames : Array\[TWebUpdate\_CheckFrequency\] Of AnsiString =  
    \(  
        'Never',  
        'On Altium Designer startup',  
        'Every day',  
        'Every 3 days',  
        'Every week',  
        'Every 2 weeks',  
        'Every month'\);