# Run postgress
docker run --name some-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=accurate -d -p 5432:5432 postgres