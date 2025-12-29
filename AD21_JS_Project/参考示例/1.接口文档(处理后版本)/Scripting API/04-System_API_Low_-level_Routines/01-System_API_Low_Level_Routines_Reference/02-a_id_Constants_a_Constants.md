### <a id="Constants"></a>Constants

cMeasureUnitSuffixes : Array\[TMeasureUnit\] Of TDynamicString = \('mil', 'mm', 'in', 'cm', 'dxp', 'm'\);  
cMeasureUnitConvert  : Array\[TMeasureUnit, TMeasureUnit\] Of Double =  
\(// to  mil           mm         in        cm          dxp         m  
        \(1          , 2\.54/100 , 1/1000  , 2\.54/1000 , 1/10      , 2\.54/100000\), // from mils  
        \(100/2\.54   , 1        , 1/25\.4  , 1/10      , 10/2\.54   , 1/1000     \), // from mm  
        \(1000       , 25\.4     , 1       , 2\.54      , 100       , 0\.0254     \), // from in  
        \(1000/2\.54  , 10       , 1/2\.54  , 1         , 100/2\.54  , 1/100      \), // from cm  
        \(10         , 2\.54/10  , 1/100   , 2\.54/100  , 1         , 2\.54/10000 \), // from dxp  
        \(100000/2\.54, 1000     , 100/2\.54, 100       , 10000/2\.54, 1          \)  // from m  
\);

cPaintColorModes : Array\[TPaintColorMode\] Of TDynamicString = \('FullColor', 'GrayScale', 'Monochrome'\);  
   
  CaseSensitive   = True;  
  CaseInSensitive = False;  
  OrdNumOfZero    = 48;  
  cDefThumbnailSizeX = 96;  
  cDefThumbnailSizeY = 72;  
   
   Delimiter       : Set of char = \[\#0,\#39,',',' ',\#10,\#13,\#9,'\(','\)'\];  
   StringDelimiter = \#39;  
   
  cm\_Share\_Compat     = $0;  
  cm\_Share\_DenyRW     = $10;  
  cm\_Share\_DenyW      = $20;  
  cm\_Share\_DenyR      = $30;  
  cm\_Share\_DenyN      = $40;  
  cm\_Access\_ReadOnly  = $0;  
  cm\_Access\_WriteOnly = $1;  
  cm\_Access\_ReadWrite = $2;  
  cm\_NoInheritance    = $80; \{A child process would not inherit file handle and mode\}  
   
  fe\_NoAccessError                 = $0;  
  fe\_FunctionInvalid               = $1;  
  fe\_FileNotFound                  = $2;  
  fe\_PathNotFoundOrFileDoesntExist = $3;  
  fe\_NoHandleIsAvalible            = $4;  
  fe\_AccessIsDenied                = $5;  
  fe\_FileAccessCodeInvalid         = $C;  
   
   FileExtension\_Temp         = '$$$';  
   
   cPathSeparator         = '\\';  
   
    cBooleanStrings : Array\[False\.\.True\] Of TString = \('False','True'\);