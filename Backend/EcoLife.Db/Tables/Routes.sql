CREATE TABLE [dbo].[Routes]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [Description] NVARCHAR(200) NOT NULL, 
    [Quantity] INT NOT NULL, 
    [Periodicity] INT NOT NULL
)
