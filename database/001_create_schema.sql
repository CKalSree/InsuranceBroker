START TRANSACTION;

CREATE TABLE Brokers (
    BrokerID INT NOT NULL AUTO_INCREMENT,
    BrokerName VARCHAR(150) NOT NULL,
    LicenseNumber VARCHAR(80) NOT NULL,
    Email VARCHAR(254) NOT NULL,
    Phone VARCHAR(30) NULL,
    Status VARCHAR(20) NOT NULL DEFAULT 'Active',
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (BrokerID),
    UNIQUE KEY UQ_Brokers_LicenseNumber (LicenseNumber),
    UNIQUE KEY UQ_Brokers_Email (Email),

    CHECK (Status IN ('Active', 'Inactive', 'Suspended'))
);

CREATE TABLE Employees (
    EmployeeID INT NOT NULL AUTO_INCREMENT,
    BrokerID INT NOT NULL,
    FirstName VARCHAR(80) NOT NULL,
    LastName VARCHAR(80) NOT NULL,
    Email VARCHAR(254) NOT NULL,
    DateOfBirth DATE NULL,
    EmploymentStatus VARCHAR(20) NOT NULL DEFAULT 'Active',
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),

    PRIMARY KEY (EmployeeID),
    UNIQUE KEY UQ_Employees_Email (Email),

    CONSTRAINT FK_Employees_Brokers
        FOREIGN KEY (BrokerID)
        REFERENCES Brokers(BrokerID),

    CHECK (EmploymentStatus IN ('Active', 'Inactive', 'OnLeave'))
);

CREATE TABLE InsuranceProviders (
    ProviderID INT NOT NULL AUTO_INCREMENT,
    ProviderName VARCHAR(150) NOT NULL,
    ProviderType VARCHAR(50) NOT NULL,
    ContactEmail VARCHAR(254) NULL,
    Phone VARCHAR(30) NULL,
    Status VARCHAR(20) NOT NULL DEFAULT 'Active',
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (ProviderID),
    UNIQUE KEY UQ_Providers_Name (ProviderName),

    CHECK (Status IN ('Active', 'Inactive'))
);

CREATE TABLE InsurancePolicies (
    PolicyID INT NOT NULL AUTO_INCREMENT,
    ProviderID INT NOT NULL,
    PolicyName VARCHAR(150) NOT NULL,
    PolicyType VARCHAR(50) NOT NULL,
    PremiumAmount DECIMAL(12,2) NOT NULL,
    CoverageAmount DECIMAL(14,2) NOT NULL,
    CurrencyCode CHAR(3) NOT NULL DEFAULT 'INR',
    Status VARCHAR(20) NOT NULL DEFAULT 'Active',
    CreatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (PolicyID),

    CONSTRAINT FK_Policies_Providers
        FOREIGN KEY (ProviderID)
        REFERENCES InsuranceProviders(ProviderID),

    CHECK (PremiumAmount >= 0),
    CHECK (CoverageAmount >= 0),
    CHECK (Status IN ('Active', 'Inactive', 'Withdrawn'))
);

CREATE TABLE Enrollments (
    EnrollmentID INT NOT NULL AUTO_INCREMENT,
    EmployeeID INT NOT NULL,
    PolicyID INT NOT NULL,
    BrokerID INT NOT NULL,
    EnrollmentDate DATE NOT NULL DEFAULT (CURRENT_DATE),
    EffectiveDate DATE NULL,
    EndDate DATE NULL,
    Status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (EnrollmentID),

    CONSTRAINT FK_Enrollments_Employees
        FOREIGN KEY (EmployeeID)
        REFERENCES Employees(EmployeeID),

    CONSTRAINT FK_Enrollments_Policies
        FOREIGN KEY (PolicyID)
        REFERENCES InsurancePolicies(PolicyID),

    CONSTRAINT FK_Enrollments_Brokers
        FOREIGN KEY (BrokerID)
        REFERENCES Brokers(BrokerID),

    CHECK (Status IN ('Pending','Active','Rejected','Cancelled','Expired')),
    CHECK (
        EndDate IS NULL
        OR EffectiveDate IS NULL
        OR EndDate >= EffectiveDate
    )
);

CREATE INDEX IX_Employees_BrokerID
    ON Employees(BrokerID);

CREATE INDEX IX_Policies_ProviderID
    ON InsurancePolicies(ProviderID);

CREATE INDEX IX_Enrollments_EmployeeID
    ON Enrollments(EmployeeID);

CREATE INDEX IX_Enrollments_PolicyID
    ON Enrollments(PolicyID);

CREATE INDEX IX_Enrollments_BrokerID_Status
    ON Enrollments(BrokerID, Status);

INSERT INTO Brokers
(BrokerName, LicenseNumber, Email, Phone)
VALUES
('Northstar Benefits Brokerage',
'DEV-BROKER-001',
'broker@example.test',
'+91-80000-00001');

INSERT INTO Employees
(BrokerID, FirstName, LastName, Email, DateOfBirth)
SELECT BrokerID,
'Asha',
'Rao',
'asha.rao@example.test',
'1995-04-12'
FROM Brokers
WHERE LicenseNumber = 'DEV-BROKER-001';

INSERT INTO InsuranceProviders
(ProviderName, ProviderType, ContactEmail, Phone)
VALUES
('Example Health Assurance',
'Health',
'provider@example.test',
'+91-80000-00002');

INSERT INTO InsurancePolicies
(ProviderID, PolicyName, PolicyType, PremiumAmount, CoverageAmount)
SELECT ProviderID,
'Employee Health Basic',
'Health',
12000.00,
500000.00
FROM InsuranceProviders
WHERE ProviderName = 'Example Health Assurance';

INSERT INTO Enrollments
(EmployeeID, PolicyID, BrokerID, Status)
SELECT e.EmployeeID,
    p.PolicyID,
    e.BrokerID,
    'Pending'
FROM Employees e
CROSS JOIN InsurancePolicies p
WHERE e.Email = 'asha.rao@example.test'
AND p.PolicyName = 'Employee Health Basic';

COMMIT;
