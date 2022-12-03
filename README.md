# Accurate Assignment Test Solution
## Tech
* Database server: Postgresql
* Backend application: Nodejs with express
* Frontend application: Angular

*Note:* I'm not fullstack or frontend developer, as explained during the technical interview, however, didn't feel like leaving that part unattended. There for ended up creating an Angular UI in which have done some small personal projects in the past,

## Requirement
Node.js version 16+

## Structure & Usage
This repository is structured as follow
 ```
 /Backend
 /Database
 /Frontend
 ```
### Database (this is bonus to simplify evaluation)
* An extra readme in case the evaluator decide to use other db for his comfort
* sqlite db file just in case you feel like use it to simplify evaluation
* Default just need to install postgresql, recommended docker installation
```
docker run --name accurate-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=accurate -d -p 
5432:5432 postgres

#In case of using your onw  POSTGRES_PASSWORD, POSTGRES_DB and port, make sure to update with that later in backend .env

```

### Backend
Backend implantation use Nodejs with expressjs framework and Prisma ORM  
To follow below instructions first navigate to the Backend root
ex **cd /Backend**
1. Install dependencies 
    ```
    npm run install
    ```
    * Now, even when postgres is the selected DB, it might be easier and faster to run the test for evaluation with something else. Thanks the goodness of Prisma ORM you can also use mysql and sqlite.
    Assuming prefer to evaluate with mysql or sqlite go to the file */Backend/prisma/schema.prisma* where you can choose which db server to use from the ones configured there. (File has clear comments on what to do)
    * Database connection is set in *Backend/.env* make sure the user, password, db_name and port are correct (or even host if db server isn't not locally )
2. Setup database and ORM requirements
    ```
    npx prisma generate
    ```
3. Create Database table from Defined Model
    ```
    npx prisma db push
    ```
4. Insert test data from https://github.com/15Dkatz/official_joke_api/blob/master/jokes/index.json  
    Well to save some time here there is no need to manually insert the data in to DB, once you run application for first time that will be done for you. for details check */Backend/app/utils/init.js*
5. Run Backend and ensure everything is in correct
    ```
    npm run dev
    ```
Considering the Backend installation was success you must a table "joke" created and the data inserted
### Frontend
Frontend implementation use Angular framework  
To follow below instructions first navigate to the Frontend root
ex **cd /Frontend**
1. Install dependencies 
    ```
    npm run install
    ```
2. Run angular project
    ```
    ng serve
    ```
**Note:** Before run the angular app check */Frontend/src/environments/environment.ts* and make sure  
**baseUrl** is pointing to backend server (host and port)