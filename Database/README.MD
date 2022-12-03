# Installing postgres with docker
docker run --name accurate-postgres -e POSTGRES_PASSWORD=<postgres> -e POSTGRES_DB=<accurate> -d -p 5432:5432 postgres