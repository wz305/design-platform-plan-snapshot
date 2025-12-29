#### ValidDosFileName

__Declaration__  
Function ValidDosFileName\(FileName : TSTring\) : TBoolean;  
__Description__  
The ValidDosFileName returns a TBoolean value denoting whether the filename string is a valid DOS filename\. A valid dos filename must not have the following characters \(‘\*’,’?’,’ ‘,’”’,‘/‘,’;’ ,‘|’,‘,’, ‘=’\) and only have one ‘\.’ fullstop character in the entire filename string\.  
__Example__

1

Filename := ForceFileNameExtension\(Board\.FileName, ReportFileExtension\);

2

If GetState\_ParameterUpperCaseString\(Parameters, 'Filename', S\) Then

3

    If \(ValidDosFileName\(S\)\) then Filename := S;

__See also__  
ForceFileNameExtension function

### <a id="Number_Manipulation_Routines"></a>Number Manipulation Routines