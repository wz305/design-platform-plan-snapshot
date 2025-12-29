### Models

Each schematic component can have models from one or more domains\. A schematic component can also have multiple models per domain, one of which will be the current model for that domain\.

A model represents all the information needed for a component in a given domain, while a datafile entity \(or link\) is the only information which is in an external file\.  See the diagram below for a relationship between a Schematic component and its models\. A model can be represented by external data sources called data file links\. For example, pins of a component can have links to different data files, as for signal integrity models\. We will consider each model type in respect to the data file links for the main editor servers supported in Altium Designer\.

A Model has Ports that are mapped to the pins of a schematic component\. Note that a model can also be called an implementation\. A model/implementation can have its own parameters and data file links\.