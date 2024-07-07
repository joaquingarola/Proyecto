CREATE TABLE [dbo].[Recolections]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Description] NVARCHAR(200) NOT NULL,
    [EstimatedStartDate] DATETIME NOT NULL, 
    [RealStartDate] DATETIME NULL, 
    [EstimatedEndDate] DATETIME NOT NULL, 
    [RealEndDate] DATETIME NULL, 
    [Status] NVARCHAR(50) NOT NULL, 
    [VehicleCenterId] INT NOT NULL, 
    [VehicleId] INT NOT NULL, 
    [EmployeeId] INT NOT NULL, 
    [WasteCenterId] INT NOT NULL,
    [RouteId] INT NOT NULL

    CONSTRAINT [FK_Recolections_VehicleCenters] FOREIGN KEY ([VehicleCenterId]) REFERENCES [VehicleCenters]([Id])
    CONSTRAINT [FK_Recolections_Vehicles] FOREIGN KEY ([VehicleId]) REFERENCES [Vehicles]([Id])
    CONSTRAINT [FK_Recolections_Employees] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees]([Id])
    CONSTRAINT [FK_Recolections_WasteCenters] FOREIGN KEY ([WasteCenterId]) REFERENCES [WasteCenters]([Id]),
    CONSTRAINT [FK_Recolections_Routes] FOREIGN KEY ([RouteId]) REFERENCES [Routes]([Id])
)
