CREATE TABLE [dbo].[Users]
(
	[Id] INT IDENTITY(1,1) NOT NULL PRIMARY KEY, 
    [Username] NVARCHAR(70) NOT NULL, 
    [Password] NVARCHAR(200) NOT NULL, 
    [EmployeeId] INT NOT NULL,
    [IsFirstEntry] BIT NOT NULL DEFAULT 1

    CONSTRAINT [FK_Users_Employees] FOREIGN KEY ([EmployeeId]) REFERENCES [Employees]([Id])
)
