﻿CREATE TABLE [dbo].[News]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Title] NVARCHAR(100) NOT NULL, 
    [Description] NVARCHAR(400) NOT NULL, 
    [Date] DATETIME NOT NULL
)
