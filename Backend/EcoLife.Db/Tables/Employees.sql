CREATE TABLE [dbo].[Employees]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Dni] NVARCHAR(8) NOT NULL, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Surname] NVARCHAR(50) NOT NULL, 
    [Email] NVARCHAR(70) NOT NULL, 
    [PhoneNumber] NVARCHAR(10) NOT NULL, 
    [BirthDate] DATETIME NOT NULL, 
    [AdmissionDate] DATETIME NOT NULL, 
    [RoleId] INT NOT NULL

    CONSTRAINT [FK_Employees_Roles] FOREIGN KEY ([RoleId]) REFERENCES [Roles]([Id])
)
