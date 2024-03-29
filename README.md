# DAB - Course Assignment 1
# Application Installation and Usage Instructions
- Run npm install for the installation of required packages listed below. Be vary of version control, as the passport package should not be of version 0.5.0 due to a bug with the logout router.
- Note that nodemon is not required for a functional application, but is reccommended while editing the source code. To use nodemon, simply run ```npm test``` in the terminal.

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
- ADMIN_USERNAME = "YOUR_USERNAME"
- ADMIN_PASSWORD = "YOUR_PASSWORD"
- DATABASE_NAME = "YOUR_DATABASE"
- DIALECT = "mysql"
- DIALECTMODEL = "mysql2"
- PORT = "YOUR_PORT"
- HOST = "YOUR_HOST"
# Additional Libraries/Packages
## Docker
The Docker Compose file is designed to quickly set up a MySQL database container using the latest official MySQL Docker Hub image. It includes a named volume for persistent storage of the database files and sets up the root password for the MySQL server.
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

Using SQL only for creating a new "dabcaowner" login for the database, use this script:


```
CREATE LOGIN dabcaowner WITH PASSWORD = 'dabca1234', DEFAULT_DATABASE = adoptiondb, CHECK_POLICY = OFF;
```
This statement creates a new login with the username "dabcaowner" and the password "dabca1234". 
DEFAULT_DATABASE parameter specifies the default database for the login, and CHECK_POLICY = OFF turns off password policy enforcement.

To grant the "database owner" role to the new login, execute the following SQL statement:
```
USE adoptiondb;
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
2. Query for returning a list of adopted animals, and name of the user that adopted them:
    ```
    SELECT Animals.Name AS AnimalName, Users.fullName AS UserName
    FROM Animals
    INNER JOIN Adoptions ON Animals.id = Adoptions.AnimalId
    INNER JOIN Users ON Adoptions.UserId = Users.id
    WHERE Animals.Adopted = true;
    ```
3. Query for returning all animals sorted by age from youngest to oldest:
   ```
   SELECT Name, Birthday, TIMESTAMPDIFF(YEAR, Birthday, CURDATE()) AS age_in_years
    FROM Animals
    ORDER BY Birthday ASC;
    ```
4. Query for returning all animals born between 2017-12-31 and 2020-12-31:
   ```
    SELECT Name, Birthday
    FROM Animals
    WHERE Birthday BETWEEN '2017-12-31' AND '2020-12-31';
    ``` 
5. Query for returning the number of animals per size with each size and the number:
   ```
    SELECT Size.Size, COUNT(Animals.id) AS num_animals
    FROM Animals
    INNER JOIN Size ON Animals.SizeId = Size.id
    GROUP BY Size.id;
    ```
6. Query for a trigger, where whenever a new animal of Species type "Lizzard" is added to the database, the last created user will automatically adopt the animal:
    ```
    CREATE TRIGGER new_lizard_adopter
    AFTER INSERT ON Animals
    FOR EACH ROW
    BEGIN
    IF NEW.species_id = (SELECT id FROM Species WHERE name = 'Lizard') THEN
    UPDATE Animals SET adopted = true, created_by = (SELECT id FROM Users ORDER BY id DESC LIMIT 1) WHERE id = NEW.id;
    END IF;
    END;
    ``` 