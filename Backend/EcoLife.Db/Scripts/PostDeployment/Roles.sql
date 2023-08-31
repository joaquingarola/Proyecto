SET IDENTITY_INSERT [dbo].[Roles] ON;

MERGE INTO [dbo].[Roles] AS t
USING (VALUES
	(1, 'Administrador'),
	(2, 'Recolector')
) AS s ([Id], [Description])
ON (s.[Id] = t.[Id])

WHEN MATCHED THEN UPDATE SET
	t.[Description] = s.[Description]

WHEN NOT MATCHED BY TARGET THEN INSERT
	([Id], [Description])
	VALUES
	(s.[Id], s.[Description]);

SET IDENTITY_INSERT [dbo].[Roles] OFF;