CREATE TABLE [dbo].[Containers]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Latitude] FLOAT NOT NULL, 
    [Longitude] FLOAT NOT NULL, 
    [Capacity] FLOAT NOT NULL, 
    [WasteType] NVARCHAR(50) NOT NULL, 
    [LastEmptying] DATETIME NOT NULL, 
    [Status] NVARCHAR(50) NOT NULL, 
    [Zone] NVARCHAR(200) NULL,
    [Address] NVARCHAR(200) NOT NULL,
    [RouteId] INT NULL

    CONSTRAINT [FK_Containers_Routes] FOREIGN KEY ([RouteId]) REFERENCES [Routes]([Id])
)