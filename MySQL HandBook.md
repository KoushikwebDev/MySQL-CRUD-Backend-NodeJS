<img src="https://bgasparotto.com/wp-content/uploads/2015/05/mysql-logo.png" style="height:64px;margin-right:32px"/>

# MySQL Handbook

## Installing MySQL

### What is MySQL Workbench?

MySQL Workbench is a visual tool for database architects, developers, and DBAs. It provides data modeling, SQL development, and comprehensive administration tools for server configuration, user administration, backup, and more.

### What is a Database Management System (DBMS)?

A Database Management System (DBMS) is software that interacts with end users, applications, and the database to capture and analyze data. It allows creation, retrieval, updating, and management of data in databases. If one DBMS is known, transitioning to another is easier due to similar concepts and functionalities.

### Windows / macOS Installation

- Download from: https://dev.mysql.com/downloads/installer/
- Run the installer and choose Developer Default.
- Set a root password when prompted.
- Install MySQL Workbench (optional but helpful GUI).


### Linux (Ubuntu) Installation

Follow these steps to install MySQL and create a user:

1) Step 1: Update Package Index
```bash
sudo apt update
```

2) Step 2: Install MySQL Server
```bash
sudo apt install mysql-server
```

3) Step 3: Secure the Installation
```bash
sudo mysql_secure_installation
```

- Choose your options (yes to most).

4) Step 4: Create a User 'harry'@'localhost'

- Log into MySQL:

```bash
sudo mysql
```

- Run the following SQL commands:

```sql
CREATE USER 'harry'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'harry'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```

5) Step 5: Test Login
```bash
mysql -u harry -p
```

- Enter the password: password
- Make sure to replace 'password' with a secure password in production environments.

***

## Getting Started with MySQL

### What is a Database?

A database is a container that stores related data in an organized way. In MySQL, a database holds one or more tables.

- Folder analogy:
    - A database is like a folder.
    - Each table is a file inside that folder.
    - The rows in the table are like the content inside each file.
- Excel analogy:
    - A database is like an Excel workbook.
    - Each table is a separate sheet inside that workbook.
    - Each row in the table is like a row in Excel.


### Step 1: Create a Database

```sql
CREATE DATABASE startersql;
USE startersql;
```

After creating the database, either:

- Right-click it in MySQL Workbench and select “Set as Default Schema”, or
- Use the SQL command above.


### Step 2: Create a Table

We’ll create a simple users table for basic user info:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  gender ENUM('Male', 'Female', 'Other'),
  date_of_birth DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```


### Step 3: Drop the Database

Delete the entire database (and all its tables):

```sql
DROP DATABASE startersql;
```

Be careful — this deletes everything in that database.

***

## Data Types Explained

- INT: Integer type for whole numbers.
- VARCHAR(100): Variable-length string up to 100 characters.
- ENUM: A string with a permitted list of values. Example: gender ENUM('Male','Female','Other')
- DATE: Stores date values. Example: date_of_birth DATE
- TIMESTAMP: Date and time; often set to current timestamp when a row is created.
- BOOLEAN: TRUE or FALSE values (e.g., is_active).
- DECIMAL(10,2): Exact numeric data (useful for financial data). First number = total digits, second = digits after decimal.

***

## Constraints Explained

- AUTO_INCREMENT: Automatically generates a unique number for each row.
- PRIMARY KEY: Uniquely identifies each row.
- NOT NULL: Ensures a column cannot have a NULL value.
- UNIQUE: Ensures all values in a column are different.
- DEFAULT: Sets a default value if none is provided.
    - Examples:
        - created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        - is_active BOOLEAN DEFAULT TRUE

***

## Working with Tables in MySQL

### Selecting Data from a Table

- Select All Columns:

```sql
SELECT * FROM users;
```

- Select Specific Columns:

```sql
SELECT name, email FROM users;
```


### Renaming a Table

```sql
RENAME TABLE users TO customers;
RENAME TABLE customers TO users;
```


### Altering a Table

- Add a Column:

```sql
ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
```

- Drop a Column:

```sql
ALTER TABLE users DROP COLUMN is_active;
```

- Modify a Column Type:

```sql
ALTER TABLE users MODIFY COLUMN name VARCHAR(150);
```

- Move a Column to the First Position:

```sql
ALTER TABLE users MODIFY COLUMN email VARCHAR(100) FIRST;
```

- Move a Column After Another:

```sql
ALTER TABLE users MODIFY COLUMN gender ENUM('Male','Female','Other') AFTER name;
```


***

## Inserting Data into MySQL Tables

- Insert Without Specifying Column Names (Full row insert):

```sql
INSERT INTO users VALUES
(1, 'Alice', 'alice@example.com', 'Female', '1995-05-14', DEFAULT);
```

Note: This requires values for all columns in order (except defaults/AUTO_INCREMENT). Not recommended if table structure may change.

- Insert by Specifying Column Names (Best Practice):

```sql
INSERT INTO users (name, email, gender, date_of_birth) VALUES
('Bob', 'bob@example.com', 'Male', '1990-11-23');
```

- Insert Multiple Rows at Once:

```sql
INSERT INTO users (name, email, gender, date_of_birth) VALUES
('Charlie', 'charlie@example.com', 'Other', '1988-02-17'),
('David', 'david@example.com', 'Male', '2000-08-09'),
('Eva', 'eva@example.com', 'Female', '1993-12-30');
```

Note: id (AUTO_INCREMENT) and created_at (DEFAULT) are automatically handled.

***

## Querying Data in MySQL using SELECT

- Basic Syntax:

```sql
SELECT column1, column2 FROM table_name;
SELECT * FROM users;
```

- Filtering with WHERE:

Equal To:

```sql
SELECT * FROM users WHERE gender = 'Male';
```

Not Equal To:

```sql
SELECT * FROM users WHERE gender != 'Female';
-- or
SELECT * FROM users WHERE gender <> 'Female';
```

Greater Than / Less Than:

```sql
SELECT * FROM users WHERE date_of_birth < '1995-01-01';
SELECT * FROM users WHERE id > 10;
```

Greater Than or Equal / Less Than or Equal:

```sql
SELECT * FROM users WHERE id >= 5;
SELECT * FROM users WHERE id <= 20;
```

Working with NULL:

```sql
SELECT * FROM users WHERE date_of_birth IS NULL;
SELECT * FROM users WHERE date_of_birth IS NOT NULL;
```

BETWEEN:

```sql
SELECT * FROM users WHERE date_of_birth BETWEEN '1990-01-01' AND '2000-12-31';
```

IN:

```sql
SELECT * FROM users WHERE gender IN ('Male', 'Other');
```

LIKE (Pattern Matching):

```sql
SELECT * FROM users WHERE name LIKE 'A%';   -- Starts with A
SELECT * FROM users WHERE name LIKE '%a';   -- Ends with a
SELECT * FROM users WHERE name LIKE '%li%'; -- Contains 'li'
```

AND / OR:

```sql
SELECT * FROM users WHERE gender = 'Female' AND date_of_birth > '1990-01-01';
SELECT * FROM users WHERE gender = 'Male' OR gender = 'Other';
```

ORDER BY:

```sql
SELECT * FROM users ORDER BY date_of_birth ASC;
SELECT * FROM users ORDER BY name DESC;
```

LIMIT:

```sql
SELECT * FROM users LIMIT 5;
SELECT * FROM users LIMIT 10 OFFSET 5;
SELECT * FROM users LIMIT 5, 10; -- Start at 6th row, return 10
```


### Quick Quiz

What do these queries do?

```sql
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;
SELECT * FROM users WHERE salary > 60000 ORDER BY created_at DESC LIMIT 5;
SELECT * FROM users ORDER BY salary DESC;
SELECT * FROM users WHERE salary BETWEEN 50000 AND 70000;
```


***

## UPDATE - Modifying Existing Data

- Basic Syntax:

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

- Update One Column:

```sql
UPDATE users SET name = 'Alicia' WHERE id = 1;
```

- Update Multiple Columns:

```sql
UPDATE users SET name = 'Robert', email = 'robert@example.com' WHERE id = 2;
```

- Without WHERE Clause (Warning):

```sql
UPDATE users SET gender = 'Other';
```

This updates every row in the table.

### Quick Quiz: Practice UPDATE

1) Update the salary of user with id=5 to ₹70,000.
```sql
UPDATE users SET salary = 70000 WHERE id = 5;
```

2) Change the name of the user with email aisha@example.com to Aisha Khan.
```sql
UPDATE users SET name = 'Aisha Khan' WHERE email = 'aisha@example.com';
```

3) Increase salary by ₹10,000 for all users whose salary < ₹60,000.
```sql
UPDATE users SET salary = salary + 10000 WHERE salary < 60000;
```

4) Set the gender of user Ishaan to Other.
```sql
UPDATE users SET gender = 'Other' WHERE name = 'Ishaan';
```

5) Reset salary of all users to ₹50,000 (affects all rows).
```sql
UPDATE users SET salary = 50000;
```


***

## DELETE - Removing Data from a Table

- Basic Syntax:

```sql
DELETE FROM table_name WHERE condition;
```

- Delete One Row:

```sql
DELETE FROM users WHERE id = 3;
```

- Delete Multiple Rows:

```sql
DELETE FROM users WHERE gender = 'Other';
```

- Delete All Rows (keep table structure):

```sql
DELETE FROM users;
```

- Drop the Entire Table:

```sql
DROP TABLE users;
```


### Best Practices

- Always use WHERE unless intentionally updating/deleting everything.
- Consider running a SELECT with the same WHERE clause first:

```sql
SELECT * FROM users WHERE id = 3;
```

- Always back up important data before destructive operations.


### Quick Quiz: Practice DELETE

What will happen if you run these?

```sql
DELETE FROM users WHERE salary < 50000;
DELETE FROM users WHERE salary IS NULL;
```


***

## MySQL Constraints

Constraints ensure accuracy, validity, and integrity of data.

### 1) UNIQUE Constraint

- During table creation:

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  email VARCHAR(100) UNIQUE
);
```

- Add UNIQUE using ALTER:

```sql
ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);
```


### 2) NOT NULL Constraint

- Example:

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);
```

- Change existing column to NOT NULL:

```sql
ALTER TABLE users
MODIFY COLUMN name VARCHAR(100) NOT NULL;
```

- Make a column nullable again:

```sql
ALTER TABLE users
MODIFY COLUMN name VARCHAR(100) NULL;
```


### 3) CHECK Constraint

- Example:

```sql
ALTER TABLE users
ADD CONSTRAINT chk_dob CHECK (date_of_birth > '2000-01-01');
```


### 4) DEFAULT Constraint

- Example:

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  is_active BOOLEAN DEFAULT TRUE
);
```

- Add DEFAULT using ALTER:

```sql
ALTER TABLE users
ALTER COLUMN is_active SET DEFAULT TRUE;
```


### 5) PRIMARY KEY Constraint

- Example:

```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);
```

- Add later with ALTER:

```sql
ALTER TABLE users
ADD PRIMARY KEY (id);
```


### 6) AUTO_INCREMENT

- Example:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);
```

- Each new row gets the next integer in id.


#### Summary Table

- UNIQUE: Prevents duplicate values
- NOT NULL: Ensures value is not NULL
- CHECK: Restricts values using a condition
- DEFAULT: Sets a default value
- PRIMARY KEY: Uniquely identifies each row
- AUTO_INCREMENT: Automatically generates unique numbers

***

## SQL Functions (MySQL)

Assume users(id, name, email, gender, date_of_birth, salary, created_at)

### 1) Aggregate Functions

- COUNT():

```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM users WHERE gender = 'Female';
```

- MIN() and MAX():

```sql
SELECT MIN(salary) AS min_salary, MAX(salary) AS max_salary FROM users;
```

- SUM():

```sql
SELECT SUM(salary) AS total_payroll FROM users;
```

- AVG():

```sql
SELECT AVG(salary) AS avg_salary FROM users;
```

- GROUP BY:

```sql
SELECT gender, AVG(salary) AS avg_salary
FROM users
GROUP BY gender;
```


### 2) String Functions

- LENGTH():

```sql
SELECT name, LENGTH(name) AS name_length FROM users;
```

- LOWER() and UPPER():

```sql
SELECT name, LOWER(name) AS lowercase_name FROM users;
SELECT name, UPPER(name) AS uppercase_name FROM users;
```

- CONCAT():

```sql
SELECT CONCAT(name, ' <', email, '>') AS user_contact FROM users;
```


### 3) Date Functions

- NOW():

```sql
SELECT NOW();
```

- YEAR(), MONTH(), DAY():

```sql
SELECT name, YEAR(date_of_birth) AS birth_year FROM users;
```

- DATEDIFF():

```sql
SELECT name, DATEDIFF(CURDATE(), date_of_birth) AS days_lived FROM users;
```

- TIMESTAMPDIFF():

```sql
SELECT name, TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS age FROM users;
```


### 4) Mathematical Functions

- ROUND(), FLOOR(), CEIL():

```sql
SELECT salary,
       ROUND(salary) AS rounded,
       FLOOR(salary) AS floored,
       CEIL(salary) AS ceiled
FROM users;
```

- MOD():

```sql
SELECT id, MOD(id, 2) AS remainder FROM users;
```


### 5) Conditional Functions

- IF():

```sql
SELECT name, gender,
       IF(gender = 'Female', 'Yes', 'No') AS is_female
FROM users;
```


#### Summary Table

- COUNT(): Count rows
- SUM(): Total of a column
- AVG(): Average of values
- MIN()/MAX(): Lowest/highest value
- LENGTH(): String length
- CONCAT(): Merge strings
- YEAR()/DATEDIFF(): Date breakdown / age
- ROUND(): Rounding numbers
- IF(): Conditional logic

***

## MySQL Transactions and AutoCommit

By default, MySQL uses AutoCommit (each statement is committed automatically).

### 1) Disabling AutoCommit

```sql
SET autocommit = 0;
```

Changes won’t be saved until COMMIT.

### 2) COMMIT — Save Changes

```sql
COMMIT;
```


### 3) ROLLBACK — Revert Changes

```sql
ROLLBACK;
```


### Example Workflow

```sql
SET autocommit = 0;
UPDATE users SET salary = 80000 WHERE id = 5;
-- If satisfied:
COMMIT;
-- If not:
ROLLBACK;
```


### 4) Enabling AutoCommit Again

```sql
SET autocommit = 1;
```

Best Practices:

- Use COMMIT to make changes permanent.
- Use ROLLBACK to discard changes.
- Consider disabling AutoCommit during complex updates.

***

## Understanding PRIMARY KEY in MySQL

A PRIMARY KEY uniquely identifies each row, must be unique and NOT NULL, can be single or composite, and only one per table.

### Example

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);
```


### PRIMARY KEY vs UNIQUE

| Feature | PRIMARY KEY | UNIQUE |
| :-- | :-- | :-- |
| Must be unique | Yes | Yes |
| Allows NULL values | No | Yes (one or more NULLs) |
| How many per table | Only one | Multiple allowed |
| Required | Recommended/often req | Optional |
| Dropping | Restricted | Can be dropped anytime |

### Example with UNIQUE

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE,
  name VARCHAR(100)
);
```


### Dropping Keys

- Drop PRIMARY KEY:

```sql
ALTER TABLE users DROP PRIMARY KEY;
```

May fail if used by foreign key or auto_increment.

- Drop UNIQUE:

```sql
ALTER TABLE users DROP INDEX email;
```


### AUTO_INCREMENT and Start Value

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);
ALTER TABLE users AUTO_INCREMENT = 1000;
```

Key Takeaways:

- Use PRIMARY KEY for main identifier.
- Use UNIQUE to enforce non-duplicates (email/phone).
- Only one primary key; many unique constraints allowed.

***

## Foreign Keys in MySQL

A foreign key creates a link between two tables, ensuring values match a parent table, maintaining referential integrity.

### Example: addresses linked to users

```sql
CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  street VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```


### Naming and Dropping a Foreign Key

```sql
CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE addresses DROP FOREIGN KEY fk_user;
```


### Adding a Foreign Key Later

```sql
ALTER TABLE addresses
ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);
```


### ON DELETE Actions

- Example with CASCADE on create:

```sql
CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  street VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

- Add via ALTER:

```sql
ALTER TABLE addresses
ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
```

Options:

- CASCADE: Delete related rows in child table
- SET NULL: Set foreign key to NULL in child
- RESTRICT: Prevent deletion if child exists (default)

Summary:

- Foreign keys connect tables and enforce valid references.
- Create inline or with ALTER.
- Drop by constraint name.
- Use ON DELETE to control parent deletion behavior.

***

## SQL JOINs in MySQL

Tables:

- users(id, name)
- addresses(id, user_id, city), with user_id referencing users.id

Example data:

- users: (1,Aarav), (2,Sneha), (3,Raj)
- addresses: (1,1,Mumbai), (2,2,Kolkata), (3,4,Delhi)


### 1) INNER JOIN

Returns only matching rows:

```sql
SELECT users.name, addresses.city
FROM users
INNER JOIN addresses ON users.id = addresses.user_id;
```

- Raj excluded (no address).
- Delhi excluded (user_id=4 not in users).


### 2) LEFT JOIN

Returns all from left (users) and matching from addresses:

```sql
SELECT users.name, addresses.city
FROM users
LEFT JOIN addresses ON users.id = addresses.user_id;
```

- Raj appears with NULL city.


### 3) RIGHT JOIN

Returns all from right (addresses) and matching users:

```sql
SELECT users.name, addresses.city
FROM users
RIGHT JOIN addresses ON users.id = addresses.user_id;
```

- Delhi appears with NULL user name if no matching user.

Summary:

- INNER JOIN: Only matching rows.
- LEFT JOIN: All left + matching right (or NULL).
- RIGHT JOIN: All right + matching left (or NULL).

***

## SQL UNION and UNION ALL

UNION combines results of SELECT statements, removing duplicates by default. UNION ALL keeps duplicates.

### Step 1: Create admin_users

```sql
CREATE TABLE admin_users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  gender ENUM('Male','Female','Other'),
  date_of_birth DATE,
  salary INT
);
```


### Step 2: Insert Sample Data

```sql
INSERT INTO admin_users (id, name, email, gender, date_of_birth, salary) VALUES
(101, 'Anil Kumar', 'anil@example.com', 'Male', '1985-04-12', 60000),
(102, 'Pooja Sharma', 'pooja@example.com', 'Female', '1992-09-20', 58000),
(103, 'Rakesh Yadav', 'rakesh@example.com', 'Male', '1989-11-05', 54000),
(104, 'Fatima Begum', 'fatima@example.com', 'Female', '1990-06-30', 62000);
```


### Step 3: Combine Data

- Unique names:

```sql
SELECT name FROM users
UNION
SELECT name FROM admin_users;
```

- Keep duplicates:

```sql
SELECT name FROM users
UNION ALL
SELECT name FROM admin_users;
```

- Multiple columns (compatible types, same count):

```sql
SELECT name, salary FROM users
UNION
SELECT name, salary FROM admin_users;
```

- Add roles:

```sql
SELECT name, 'User' AS role FROM users
UNION
SELECT name, 'Admin' AS role FROM admin_users;
```

- Order:

```sql
SELECT name FROM users
UNION
SELECT name FROM admin_users
ORDER BY name;
```

Rules:

1) Same number of columns
2) Compatible data types
3) UNION removes duplicates, UNION ALL keeps them

Use UNION when combining similar tables or cross-category reporting.

***

## Self JOIN in MySQL

A Self JOIN joins a table with itself. Useful for referral relationships.

### Step 1: Add referred_by_id

```sql
ALTER TABLE users ADD COLUMN referred_by_id INT;
```


### Step 2: Insert Referral Data (optional)

```sql
UPDATE users SET referred_by_id = 1 WHERE id IN (2, 3);
UPDATE users SET referred_by_id = 2 WHERE id = 4;
```


### Step 3: Self JOIN to Get Referrer Names

```sql
SELECT 
  a.id,
  a.name AS user_name,
  b.name AS referred_by
FROM users a
INNER JOIN users b ON a.referred_by_id = b.id;
```

Notes:

- a refers to the user.
- b refers to the referrer.
- Use LEFT JOIN if including users with NULL referred_by_id.

Summary:

- Use Self JOIN when a table references itself.
- Store referrer’s id in the same table.
- Use aliases (a, b) to differentiate.

***

## MySQL Views

A view is a virtual table based on a SELECT query. It reflects current data in base tables.

### Create a View

```sql
CREATE VIEW high_salary_users AS
SELECT id, name, salary
FROM users
WHERE salary > 70000;
```


### Query the View

```sql
SELECT * FROM high_salary_users;
```


### Demonstration (Live Data Reflection)

- Before update:

```sql
SELECT * FROM high_salary_users;
```

- Update:

```sql
UPDATE users SET salary = 72000 WHERE name = 'Raj';
```

- Query again:

```sql
SELECT * FROM high_salary_users;
```

Raj will now appear if salary > 70000.

### Drop a View

```sql
DROP VIEW high_salary_users;
```

Summary:

- Views are saved SELECT queries.
- No duplicate data; always reflects base tables.
- Simplifies complex queries and filtered access.

***

## MySQL Indexes

Indexes speed up data retrieval for searches, filters, and joins.

### View Indexes

```sql
SHOW INDEXES FROM users;
```


### Create a Single-Column Index

```sql
CREATE INDEX idx_email ON users(email);
```

Improves:

```sql
SELECT * FROM users WHERE email = 'example@example.com';
```

Notes:

- Indexes use disk space.
- Slightly slow INSERT/UPDATE/DELETE due to maintenance.
- Use on columns in WHERE, JOIN, ORDER BY.


### Multi-Column Index

```sql
CREATE INDEX idx_gender_salary ON users(gender, salary);
```

Example usage:

```sql
SELECT * FROM users
WHERE gender = 'Female' AND salary > 70000;
```

Index order matters:

- Good: filter includes gender then salary
- Less effective: filtering only salary (missing leading column)


### Drop an Index

```sql
DROP INDEX idx_email ON users;
```

Summary:

- SHOW INDEXES: view current indexes
- CREATE INDEX: single or multi-column
- DROP INDEX: remove an index
- Use when performance on large tables is a concern; avoid unnecessary indexes

***

## Subqueries in MySQL

A subquery is a query nested inside another.

### Scalar Subquery: Salary > Average

```sql
SELECT id, name, salary
FROM users
WHERE salary > (SELECT AVG(salary) FROM users);
```


### Subquery with IN: Referred by High Earners

```sql
SELECT id, name, referred_by_id
FROM users
WHERE referred_by_id IN (
  SELECT id FROM users WHERE salary > 75000
);
```


### Subquery in SELECT

```sql
SELECT name, salary,
  (SELECT AVG(salary) FROM users) AS average_salary
FROM users;
```

Summary:

- Scalar subquery: returns one value (e.g., AVG)
- IN subquery: returns multiple values
- SELECT/ FROM subqueries: derived values or virtual tables

***

## GROUP BY and HAVING in MySQL

GROUP BY groups rows by column values, used with aggregates. HAVING filters groups after aggregation.

Assume users table:

- id, name, gender, salary, referred_by_id


### Average Salary by Gender

```sql
SELECT gender, AVG(salary) AS average_salary
FROM users
GROUP BY gender;
```


### Count Referrals

```sql
SELECT referred_by_id, COUNT(*) AS total_referred
FROM users
WHERE referred_by_id IS NOT NULL
GROUP BY referred_by_id;
```


### HAVING: Average Salary > ₹75,000

```sql
SELECT gender, AVG(salary) AS avg_salary
FROM users
GROUP BY gender
HAVING AVG(salary) > 75000;
```

Why not WHERE?

- WHERE filters rows before grouping.
- HAVING filters groups after aggregation.


### Groups with More Than 1 Referral

```sql
SELECT referred_by_id, COUNT(*) AS total_referred
FROM users
WHERE referred_by_id IS NOT NULL
GROUP BY referred_by_id
HAVING COUNT(*) > 1;
```


### ROLLUP: Subtotals and Grand Total

```sql
SELECT gender, COUNT(*) AS total_users
FROM users
GROUP BY gender WITH ROLLUP;
```

Summary:

- WHERE: Filters rows (no aggregates)
- GROUP BY: Groups rows
- HAVING: Filters groups (uses aggregates)

***

## Stored Procedures in MySQL

Stored procedures are saved SQL blocks executed later; useful for reusable logic.

### Delimiter

Change delimiter to define procedures using ; inside body:

```sql
DELIMITER $$
CREATE PROCEDURE procedure_name()
BEGIN
  -- SQL statements
END$$
DELIMITER ;
```


### Procedure with Input Parameters

```sql
DELIMITER $$
CREATE PROCEDURE AddUser(
  IN p_name VARCHAR(100),
  IN p_email VARCHAR(100),
  IN p_gender ENUM('Male','Female','Other'),
  IN p_dob DATE,
  IN p_salary INT
)
BEGIN
  INSERT INTO users (name, email, gender, date_of_birth, salary)
  VALUES (p_name, p_email, p_gender, p_dob, p_salary);
END$$
DELIMITER ;
```


### Call the Procedure

```sql
CALL AddUser('Kiran Sharma', 'kiran@example.com', 'Female', '1994-06-15', 72000);
```


### View Procedures

```sql
SHOW PROCEDURE STATUS WHERE Db = 'startersql';
```


### Drop Procedure

```sql
DROP PROCEDURE IF EXISTS AddUser;
```


***

## Triggers in MySQL

Triggers are executed automatically on INSERT, UPDATE, or DELETE.

Common uses:

- Logging changes
- Enforcing business rules
- Updating related data


### Basic Structure

```sql
CREATE TRIGGER trigger_name
AFTER INSERT ON table_name
FOR EACH ROW
BEGIN
  -- statements
END;
```


### Scenario: Log Every New User Insertion

- Create Log Table:

```sql
CREATE TABLE user_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100),
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- Create Trigger:

```sql
DELIMITER $$
CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
BEGIN
  INSERT INTO user_log (user_id, name)
  VALUES (NEW.id, NEW.name);
END$$
DELIMITER ;
```

- Test:

```sql
CALL AddUser('Ritika Jain', 'ritika@example.com', 'Female', '1996-03-12', 74000);
SELECT * FROM user_log;
```

- Drop Trigger:

```sql
DROP TRIGGER IF EXISTS after_user_insert;
```

Key components:

- BEFORE/AFTER: when it runs
- INSERT/UPDATE/DELETE: event type
- NEW.column: new row values
- OLD.column: old row values
- FOR EACH ROW: per affected row

***

## More on MySQL

### 1) Logical Operators

- AND: all conditions true
- OR: at least one condition true
- NOT: reverses a condition

Examples:

```sql
-- salary > 50000 AND gender = 'Male'
-- gender = 'Male' OR gender = 'Other'
-- NOT gender = 'Female'
```


### 2) Add a Column

```sql
ALTER TABLE users ADD COLUMN city VARCHAR(100);
```


### 3) Wildcards with LIKE

- %: any sequence
- _: single character

Examples:

```sql
WHERE name LIKE 'A%'
WHERE name LIKE '_a%'
```


### 4) LIMIT with OFFSET

```sql
SELECT * FROM users
ORDER BY id
LIMIT 5 OFFSET 10;

-- Alternative
SELECT * FROM users
ORDER BY id
LIMIT 10, 5;
```


### 5) DISTINCT

```sql
SELECT DISTINCT gender FROM users;
```


### 6) TRUNCATE

```sql
TRUNCATE TABLE users;
```

- Removes all rows; keeps structure.
- Faster than DELETE FROM users.
- Cannot be rolled back (unless transaction-safe).


### 7) CHANGE vs MODIFY Column

- CHANGE: rename and change datatype

```sql
ALTER TABLE users
CHANGE COLUMN city location VARCHAR(150);
```

- MODIFY: change datatype only

```sql
ALTER TABLE users
MODIFY COLUMN salary BIGINT;
```


***

End of MySQL Handbook Markdown.

<div style="text-align: center">⁂</div>

[^1]: MySQL-Handbook.pdf

