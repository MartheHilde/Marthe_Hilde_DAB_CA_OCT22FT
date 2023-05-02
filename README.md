# DAB - Course Assignment 1
# Application Installation and Usage Instructions
- Installed nodemon for rapid update between save
- Run npm install for the installation of required packages. Be vary of version control.
- nodemon is not required

# Environment Variables
- Might need to change port to "localhost" - local ip is used for my macbook.
- sequelize@6.28.0
- mysql2.18.1
- mysql2 @3.1.0

# Additional Libraries/Packages
The Docker Compose file is designed to quickly set up a MySQL database container using the official MySQL Docker Hub image. It includes a named volume for persistent storage of the database files and sets up the root password for the MySQL server.
It allows you to specify the containers, their dependencies, and the network configuration in a single file, making it easy to manage and deploy complex applications.

### Prerequisites

* Docker installed on your system
* Docker Compose installed on your system

#### Usage

    Copy the contents of the Docker Compose file into a new file named docker-compose.yml.
    Open a terminal or command prompt in the directory containing the docker-compose.yml file.
    Run the command docker-compose up -d to start the MySQL database container in the background.
    Connect to the MySQL server using your preferred MySQL client, such as MySQL Workbench, and create a new database named "adoptiondb".

#### File details
The Docker Compose file specifies a single service, mysql, which uses the official MySQL Docker Hub image. It sets the root password for the MySQL server using the MYSQL_ROOT_PASSWORD environment variable, and maps port 3306 from the container to port 3306 on the host system. A named volume named mysql-data is created for persistent storage of the MySQL database files.

#### MySQL Database Details
Once the MySQL container is running, you can connect to the MySQL server using your preferred MySQL client and the following details:

    Host: localhost
    Port: 3306
    Username: root
    Password: root

To create a new database named "adoptiondb", run the following SQL command in your MySQL client:
* CREATE DATABASE adoptiondb; *

bcrypt for password?

# NodeJS Version Used
Version v18.13.0.

# DATABASE
Sequelize in app.js, connect to database and create table 

- 

# DATAINSERTS


# DATABASEACCESS


# DATABASEQUERIES