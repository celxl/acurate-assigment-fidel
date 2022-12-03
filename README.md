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

## Some explications
The task of the assignment is pretty straight forward but still few things that would like to explain
1. The decision to put the randomize functionality on backend.  
    Even when the data ids are consecutive 1,2,3 etc in a bit of more realistic app records can be remove from db breaking the ids continue sequence, which will end up with a 404 error if randomizing the joke desire returns an id that was removed, of course it could be handle but to re-randomize and do the api call again but not the must efficient thing to do.
2. Since ids are a continue sequence we could just randomize id from 1 to biggest id, and return that joke, But where is the fun on that.  
    Looking for a more realistic approach here (where there is not nice sequence to follow), will randomize the jokes by:  
    1. batch considering a batch paginated result with some limit and some offset(page number), in a way to define a big number for the limit but not too big (went for 100 in this implementation) and to randomize the offset as page number between 0 and totalResult/limit and query for that batch 
    2. use a cache system to store the jokes that have been already randomize for the last x seconds (30 s in this case), to ensure not to repeat same jokes withing x seconds. This cache will clear after x time passed or when all the jokes have been randomized so have to start from scratch
3. Prisma ORM. I use to work a lot with sequelize.js orm for nodejs but recently discover prisma and find it more complete and easy to use, Plus the benefit it can work with several database servers.

## Acknowledge
Want to thanks in advance the time to take go through this evaluation, and spend your time on it.
Also the time and the opportunity to be part of this process, no matter what happen next the I had fun doing the project.  
Chears
