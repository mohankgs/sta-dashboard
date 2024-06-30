-- Active: 1718510024373@@127.0.0.1@3306@event_management
CREATE TABLE Address(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    StreetAddress1 VARCHAR(255),
    StreetAddress2 VARCHAR(255),
    City VARCHAR(100),
    State VARCHAR(100),
    PostalCode VARCHAR(50),
    Country VARCHAR(100),
    RegistrationID int(11),
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time'
) COMMENT '';

CREATE TABLE Payment(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentType VARCHAR(100) NOT NULL,
    RegistrationID int(11) NOT NULL,
    PaymentTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time'
) COMMENT '';

ALTER TABLE `EventRegistrations` ADD Title varchar(10);

ALTER TABLE `EventRegistrations` ADD AgeCategory varchar(10);

ALTER TABLE `EventRegistrations` ADD Age INT;

