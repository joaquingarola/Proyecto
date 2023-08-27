CREATE TABLE [dbo].[Maintenances]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [VehicleId] INT NOT NULL,
    [StartDate] DATETIME NOT NULL,
    [EndDate] DATETIME NULL,
    [Description] NVARCHAR(200) NOT NULL, 

    CONSTRAINT [FK_Maintenances_Vehicles] FOREIGN KEY ([VehicleId]) REFERENCES [Vehicles]([Id])
)
