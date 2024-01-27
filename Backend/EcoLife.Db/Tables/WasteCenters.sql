CREATE TABLE [dbo].[WasteCenters]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
	[Latitude] FLOAT NOT NULL, 
    [Longitude] FLOAT NOT NULL, 
	[Address] NVARCHAR(200) NOT NULL,
	[Description] NVARCHAR(200) NOT NULL,
	[WasteType] NVARCHAR(50) NOT NULL
)
