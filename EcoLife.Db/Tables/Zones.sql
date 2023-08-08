CREATE TABLE [dbo].[Zone]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Description] NVARCHAR(100) NOT NULL, 
    [MaximumHours] INT NOT NULL 
)
