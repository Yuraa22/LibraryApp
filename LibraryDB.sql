USE [LibraryDB]

CREATE TABLE [dbo].[User] (
    [Id]          INT IDENTITY (1,1)          NOT NULL PRIMARY KEY,
    [FirstName]   NVARCHAR (50) NOT NULL,
    [LastName]    NVARCHAR (50) NOT NULL,
    [DateOfBirth] DATETIME      NOT NULL,
    [IsValid]     BIT           NULL
);

CREATE TABLE [dbo].[Book] (
    [ISBN]     CHAR (13)     NOT NULL PRIMARY KEY,
    [Title]    NVARCHAR (50) NOT NULL,
    [Quantity] INT           NOT NULL
);

CREATE TABLE [dbo].[Rent] (
    [UserId]     INT       NOT NULL,
    [ISBN]       CHAR (13) NOT NULL,
    [DateRented] DATETIME  NOT NULL,
    [Duration]   INT       NOT NULL,
	PRIMARY KEY ([UserId], [ISBN])
);

CREATE TABLE [dbo].[UserContact] (
	[Id]     INT IDENTITY (1,1)	NOT NULL PRIMARY KEY,
    [UserId] INT           NOT NULL,
    [Type]   NVARCHAR (50) NOT NULL,
    [Value]  NVARCHAR (50) NULL
);

ALTER TABLE [dbo].[UserContact]
    ADD CONSTRAINT [FK_UserContact_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]);
ALTER TABLE [dbo].[Rent]
    ADD CONSTRAINT [FK_Rent_Book] FOREIGN KEY ([ISBN]) REFERENCES [dbo].[Book] ([ISBN]);
ALTER TABLE [dbo].[Rent]
    ADD CONSTRAINT [FK_Rent_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[User] ([Id]);