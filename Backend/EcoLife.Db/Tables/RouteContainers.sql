CREATE TABLE [dbo].[RouteContainers]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
	[Order] INT NULL,
	[ContainerId] INT NOT NULL,
	[Empty] BIT NOT NULL DEFAULT 0, 
	[RouteId] INT NOT NULL

    CONSTRAINT [FK_RouteContainers_Containers] FOREIGN KEY ([ContainerId]) REFERENCES [Containers]([Id]),
    CONSTRAINT [FK_RouteContainers_Routes] FOREIGN KEY ([RouteId]) REFERENCES [Routes]([Id])
)
