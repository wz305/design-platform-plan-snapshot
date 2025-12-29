### <a id="IPCB_GerberOptions"></a>IPCB\_GerberOptions

__Overview__  
The tolerance range used when matching apertures for each item in the plots\. If no exact match for an item is available in the current aperture list, the software checks to see if a larger aperture exists within this tolerance range and uses it instead\.  
If no suitable aperture exists within the tolerance range, the software will attempt to "paint" with a larger aperture to create the required shape\. This requires that a suitable larger aperture is available, and that this aperture can be used for "painting"\.  
Note: Match tolerances are normally only used when you are targeting a vector photoplotter, which require a fixed, or supplied aperture file\. They will not be required if the apertures have been created from the PCB\. If match tolerances are not required they should be left at the default of 0\.005 mil\.  
__Notes__  
Derived from IPCB\_AbstractOptions interface  
__Properties__  
Property SortOutput          : Boolean  
Property UseSoftwareArcs     : Boolean  
Property CenterPhotoPlots    : Boolean  
Property EmbedApertures      : Boolean  
Property Panelize            : Boolean  
Property G54                 : Boolean  
Property PlusTol             : TCoord   
Property MinusTol            : TCoord   
Property FilmSizeX           : TCoord   
Property FilmSizeY           : TCoord   
Property BorderSize          : TCoord   
Property AptTable            : TPCBString  
Property MaxAperSize         : TCoord   
Property ReliefShapesAllowed : Boolean  
Property PadsFlashOnly       : Boolean  
Property GerberUnits         : Integer  
Property GerberDecs          : Integer  
__See also__  
IPCB\_AbstractOptions interface