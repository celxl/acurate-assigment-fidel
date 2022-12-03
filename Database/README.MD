# General Information
For simplicity its recommended to use docker images for databases installation, 
note the importance of the environments variables when creating the containers, 
those values are going to be used for the backend application.
1. the database name
2. the database password
3. also important the port used to forward the container 

# Installing postgres
## Using Docker
```
docker run --name accurate-postgres -e POSTGRES_PASSWORD=<postgres> -e POSTGRES_DB=<accurate> -d -p 
5432:5432 postgres
```
* POSTGRES_PASSWORD password the postgres server will use
* POSTGRES_DB name of the database  
    you can always create the database post installation, but that will force you to do extra work

## Regular installation
https://www.postgresguide.com/setup/install/

# Installing mysql
## Using Docker
```
docker run --name accurate-mysql -e MYSQL_ROOT_PASSWORD=<root> -e MYSQL_DATABASE=<accurate> -d -p 3306:3306 mysql
```
* MYSQL_ROOT_PASSWORD password the mysql server will use
* MYSQL_DATABASE name of the database  
    you can always create the database post installation, but that will force you to do extra work

## Regular installation
https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en

# Installing sqlite
https://www.servermania.com/kb/articles/install-sqlite