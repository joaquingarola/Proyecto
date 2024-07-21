CREATE TABLE [dbo].[RecolectionContainers]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
	[Order] INT NULL,
	[ContainerId] INT NOT NULL,
	[Empty] BIT NOT NULL DEFAULT 0, 
	[RecolectionId] INT NOT NULL

    CONSTRAINT [FK_RecolectionContainers_Containers] FOREIGN KEY ([ContainerId]) REFERENCES [Containers]([Id]),
    CONSTRAINT [FK_RecolectionContainers_Recolections] FOREIGN KEY ([RecolectionId]) REFERENCES [Recolections]([Id])
)
