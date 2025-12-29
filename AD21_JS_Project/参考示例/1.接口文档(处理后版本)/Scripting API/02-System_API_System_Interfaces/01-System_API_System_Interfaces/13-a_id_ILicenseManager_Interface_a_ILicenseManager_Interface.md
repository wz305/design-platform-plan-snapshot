### <a id="ILicenseManager_Interface"></a>ILicenseManager Interface

__Overview__  
The __ILicenseManager__ interface hierarchy is as follows;

__ILicenseManager methods__  
UseLicense  
ReleaseLicense  
ChangeToNetwork  
ChangeToStandalone  
UseLicenseByName  
GetLicenses

__ILicenseManager properties__

__See also__

#### ILicenseManager Methods

##### UseLicense method

\(ILicenseManager interface\)  
__Syntax__  
Procedure UseLicense \(Const LicenseFileName : Widestring\);  
__Description__  
__Example__  
__See also__  
ILicenseManager interface

##### ReleaseLicense method

\(ILicenseManager interface\)  
__Syntax__  
Procedure ReleaseLicense \(Const LicenseFileName : Widestring\);  
__Description__  
__Example__  
__See also__  
ILicenseManager interface

##### GetLicenses method

\(ILicenseManager interface\)  
__Syntax__  
Procedure GetLicenses \(Licenses : TList\);  
__Description__  
__Example__  
__See also__  
ILicenseManager interface

##### ChangeToStandalone method

\(ILicenseManager interface\)  
__Syntax__  
Procedure ChangeToStandalone;  
__Description__  
This procedure changes from a networked license to a standalone license for a copy of Altium Designer that's running on a computer\. A standalone computer is a computer that is not connected to the internet\.  
__Example__  
__See also__  
ILicenseManager interface

##### ChangeToNetwork method

\(ILicenseManager interface\)  
__Syntax__  
Procedure ChangeToNetwork \(Const ServerName : Widestring\);  
__Description__  
This procedure changes from a standalone license to a networked license for a copy of Altium Designer that's running on a computer\. You will need to supply the server name as a string\.  
A standalone computer is a computer that is not connected to the internet\.  
__Example__  
__See also__  
ILicenseManager interface

##### UseLicenseByName method

\(ILicenseManager interface\)  
__Syntax__  
Procedure UseLicenseByName \(Const LicenseName : Widestring\);  
__Description__  
__Example__  
__See also__  
ILicenseManager interface