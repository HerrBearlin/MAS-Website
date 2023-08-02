    CREATE SCHEMA IF NOT EXISTS `tin-project`;

    -- Table: Organisation
    CREATE TABLE IF NOT EXISTS  `tin-project`.`Organisation` (
        orgId integer NOT NULL AUTO_INCREMENT,
        orgName varchar(50) NOT NULL,
        leagueName varchar(50) NULL,
        budget double(15,2) NOT NULL,
        CONSTRAINT Organisation_pk PRIMARY KEY (orgId)
    );

    -- Table: Player
    CREATE TABLE IF NOT EXISTS  `tin-project`.`Player` (
        pId integer NOT NULL AUTO_INCREMENT,
        fName varchar(50) NOT NULL,
        lName varchar(50) NOT NULL,
        nName varchar(50) NOT NULL,
        dateOfBirth date NOT NULL,
        isCaptain int NOT NULL,
        pPlayed varchar(50) NULL,
        phNumber varchar(30) NOT NULL,
        password varchar(50) NULL,
        CONSTRAINT Player_pk PRIMARY KEY (pId)
    );

    CREATE TABLE IF NOT EXISTS `tin-project`.`Contract` (
        conId integer NOT NULL AUTO_INCREMENT,
        pId integer NOT NULL,
        orgId integer NOT NULL,
        dateFrom date NOT NULL,
        dateTo date NOT NULL,
        salary decimal(12,2) NOT NULL,
        PRIMARY KEY (conId),
        UNIQUE INDEX contract_id (conId ASC),
        CONSTRAINT player_fk FOREIGN KEY (pId) REFERENCES `tin-project`.`Player` (pId),
        CONSTRAINT organisation_fk FOREIGN KEY (orgId) REFERENCES `tin-project-s22264`.`Organisation` (orgId)
    );


    INSERT INTO `tin-project.`Player` (pId, fName, lName, nName, dateOfBirth, isCaptain, pPlayed, phNumber, password) VALUES
    (001, 'Olga', 'Bayushi', 'Reiha Sama', '2001-02-21', 0, 'Support', '+48111111111', '111'),
    (002, 'Denis', 'Topman', 'Denyakun', '2003-06-30', 0, 'Mid', '+48111111112', '222'),
    (003, 'Kacper', 'Smith', 'Darak', '2001-04-18', 0, 'Top', '+48111111113', '333'),
    (004, 'Julia', 'Goat', 'Misia5', '2002-05-29', 0, 'Jungle', '+48111111114', '444'),
    (005, 'Jan', 'Akodo', 'HrrBearlin', '2001-06-29', 1, 'Bot', '+48111111115', '555'),
    (006, 'Captain', 'Captain', 'Captain', '2001-06-29', 1, 'Bot', '+48111222333', 'captain'),
    (007, 'Test', 'Test', 'Test', '2001-06-29', 0, 'Bot', '+48444555666', 'test');

    INSERT INTO `tin-project`.`Organisation` (orgId,orgName, leagueName,budget) VALUES
    (001, 'Thief', 'LET', 5000000),
    (002, 'Leave 2 Esports', 'LET', 10000000),
    (003, 'Believers', 'LET', 2000000),
    (004, 'Team Solid', 'LCS', 1000000),
    (005, 'Zero Donators', 'LCS', 4000000);


    INSERT INTO `tin-project4`.`Contract` (conId, pId, orgId   ,dateFrom  ,dateTo  ,salary) VALUES
    (001, 001, 001, '2022-02-21','2022-12-21', 100000),
    (002, 002, 003, '2022-06-30','2023-06-30', 100000),
    (003, 003, 001,'2022-04-18','2025-04-18', 100000),
    (004, 004, 002,'2022-05-29','2023-05-29', 100000),
    (005, 005, 003,'2022-06-29','2022-12-29', 100000);

