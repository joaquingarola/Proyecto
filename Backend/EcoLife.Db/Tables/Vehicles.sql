CREATE TABLE [dbo].[Vehicles]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Patent] NVARCHAR(7) NOT NULL, 
    [Description] NVARCHAR(50) NOT NULL, 
    [Model] INT NOT NULL, 
    [BuyDate] DATETIME NOT NULL
)
