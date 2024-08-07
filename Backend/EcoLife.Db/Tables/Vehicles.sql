﻿CREATE TABLE [dbo].[Vehicles]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Patent] NVARCHAR(7) NOT NULL, 
    [Description] NVARCHAR(50) NOT NULL, 
    [Status] NVARCHAR(50) NOT NULL DEFAULT 'Disponible',
    [Model] INT NOT NULL, 
    [BuyDate] DATETIME NOT NULL,
    [VehicleCenterId] INT NULL

    CONSTRAINT [FK_Vehicles_VehicleCenters] FOREIGN KEY ([VehicleCenterId]) REFERENCES [VehicleCenters]([Id])
)
