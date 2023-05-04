# DAB - Course Assignment 1
# Application Installation and Usage Instructions
- Run npm install for the installation of required packages. Be vary of version control.
- Note that nodemon is not required for a functional application, but is reccommended while editing the source code.

    - "cookie-parser": "~1.4.4",
    - "debug": "~2.6.9",
    - "dotenv": "^16.0.3",
    - "ejs": "^3.1.8",
    - "express": "^4.18.2",
    - "express-session": "^1.17.3",
    - "http-errors": "~1.6.3",
    - "morgan": "~1.9.1",
    - "mysql": "^2.18.1",
    - "mysql2": "^3.1.0",
    - "nodemon": "^2.0.22",
    - "passport": "^0.5.3",
    - "passport-local": "^1.0.0",
    - "sequelize": "^6.28.0"

# Environment Variables
- Might need to change port to "localhost" - local ip is used for my macbook.
- sequelize@6.28.0
- mysql2.18.1
- mysql2 @3.1.0
- Nodemon

# Additional Libraries/Packages
## Docker
The Docker Compose file is designed to quickly set up a MySQL database container using the official MySQL Docker Hub image. It includes a named volume for persistent storage of the database files and sets up the root password for the MySQL server.
It allows you to specify the containers, their dependencies, and the network configuration in a single file, making it easy to manage and deploy complex applications.
#### Prerequisites

* Docker installed on your system
* Docker Compose installed on your system

#### Usage

    * Copy the contents of the Docker Compose file into a new file named docker-compose.yml.
    * Open a terminal or command prompt in the directory containing the docker-compose.yml file.
    * Run the command docker-compose up -d to start the MySQL database container in the background.
    * Connect to the MySQL server using your preferred MySQL client, such as MySQL Workbench, and create a new database named "adoptiondb".

#### File details
The Docker Compose file specifies a single service, mysql, which uses the official MySQL Docker Hub image. It sets the root password for the MySQL server using the MYSQL_ROOT_PASSWORD environment variable, and maps port 3306 from the container to port 3306 on the host system. A named volume named mysql-data is created for persistent storage of the MySQL database files.

#### MySQL Database Details
Once the MySQL container is running, you can connect to the MySQL server using your preferred MySQL client and the following details:

    Host: localhost
    Port: 3306
    Username: root
    Password: root

To create a new database named "adoptiondb", run the following SQL command in your MySQL client:
``` CREATE DATABASE adoptiondb; ```

## BCRYPT
Lorem ipsum

#### Prerequisites
* bcrypt installed ```npm install bcrypt```

#### Usage
* Usage information is retrieved from the npm package manager website, https://www.npmjs.com/package/bcrypt
async (recommended):
```
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
```
Hash password:
```
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
    });
});
```

# NodeJS Version Used
For this assignment, version v18.13.0 of NodeJs were used.

# DATABASE
Sequelize in app.js, connect to database and create table 

- 

# DATAINSERTS

The below scripts should be entered in the given order, because of the FK created with relation to the animals table. When inserting into the AnimalsTemperaments table, you have to specifiy the correct name, species and give it the wanted temperament in the script.
Please refer to the table in the DAB assigment resources for a correct list of temperaments for each animal.

```
INSERT INTO Species (species)
VALUES ('Dwarf Hamster'), 
('Teddy bear hamster'), 
('Jack-Russel'), 
('Budgy'), 
('Tortouse'),
('Gold Fish'),
('Lizzard'),
('Beareded Dragon'),
('Parrot'),
('Corn snake');

INSERT INTO Sizes (size)
VALUES ('Small'),
('Medium'),
('Large');

INSERT INTO Animals (Name, Birthday, Adopted, SpeciesId, SizeId)
VALUES ('Coco', '2020-02-12', False, 1, 1),
('Ted', '2021-02-12', False, 2, 1),
('Coco', '2020-02-12', False, 3, 2),
('Everrest', "2019-02-12", False, 4, 1),
('Rocko', "2020-02-12", False, 5, 2),
('Goldy', "2023-02-12", False, 6, 1),
('Lizzy', "2020-02-12", False, 7, 2),
('Goga', '2018-02-12', False, 8, 3),
('Tweet Tweet', '2020-02-12', False, 9, 3),
('Toothless', '2017-02-12', False, 10, 2),
('Sophie', '2020-02-12', False, 1, 1),
('Teddy', '2021-02-12', False, 2, 1),
('Roger', '2020-02-18', False, 9, 3);

INSERT INTO Temperaments (temperament)
VALUES ('Calm'),
('Scared'),
('Energetic'),
('Happy'),
('Lazy');

INSERT INTO AnimalsTemperaments(AnimalId, TemperamentId)
VALUES (
(SELECT id FROM Animals WHERE Name = "AnimalName" AND SpeciesId = (SELECT id FROM Species WHERE Species = "AnimalSpecie")),
(SELECT id FROM Temperaments WHERE Temperament = "SelectTemperament")
)
```

# DATABASEACCESS
Save the following user-access SQL script to your README file, under the heading “DATABASEACCESS”.

Using SQL only:

    Create a new “dabcaowner” login for the database, with the password “dabca1234” with the “database owner” rights and permissions

```
CREATE LOGIN dabcaowner WITH PASSWORD = 'dabca1234', DEFAULT_DATABASE = YourDatabaseName, CHECK_POLICY = OFF;
```
This statement creates a new login with the username "dabcaowner" and the password "dabca1234". The DEFAULT_DATABASE parameter specifies the default database for the login, and CHECK_POLICY = OFF turns off password policy enforcement.

To grant the "database owner" role to the new login, execute the following SQL statement:
```
USE YourDatabaseName;
EXEC sp_addrolemember 'db_owner', 'dabcaowner';
```


# DATABASEQUERIES
1. Query for returning the most popular animal name:
   ```
    SELECT Name FROM Animals
    GROUP BY Name
    ORDER BY COUNT(*) DESC
    LIMIT 1;
   ```
2. Query 2
3. Query 3
4. Query for returning all animals born between 2017-12-31 and 2020-12-31:
   ```
    SELECT Name, Birthday
    FROM Animals
    WHERE Birthday BETWEEN '2017-12-31' AND '2020-12-31';
    ``` 
5. Qurey 5
6. Query 6